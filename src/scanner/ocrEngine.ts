import { createWorker, PSM, type Block, type Symbol as TessSymbol, type Worker } from 'tesseract.js';
import { resolveCountryName } from './countries';
import {
  loadImageSurface,
  preprocessDocumentImage,
  sampleDownscaledGrayscale,
} from './imagePreprocessor';
import { extractPortraitAndSignature } from './mediaExtractor';
import { parseMrzFromText, synthesizeConsensusMrz } from './mrzParser';
import { analyzeDocumentOrientation } from './orientation';
import { mergeDocumentSides } from './pairMerger';
import { detectPdf417Barcode } from './pdf417Decoder';
import {
  detectDocumentQuad,
  orderQuadCorners,
  warpDocumentPerspective,
} from './perspective';
import {
  isScanAbortedError,
  PreprocessWorkerClient,
  raceWithAbort,
  throwIfScanAborted,
} from './preprocessWorker';
import { assessImageQuality, QualityGateError } from './qualityGate';
import { crossValidateMrzAndViz, detectSpecimenWatermark } from './specimenValidator';
import type {
  BarcodeParsedData,
  CroppedRegionInfo,
  DocumentType,
  ExtractedIdentity,
  FieldSource,
  GrayscaleBuffer,
  ImageInput,
  ImageQualityReport,
  ImageSurface,
  MergedDocumentResult,
  MrzOcrModel,
  MrzParsedData,
  OrientationInfo,
  PairScanOptions,
  PerspectiveInfo,
  PreprocessedResult,
  ScanProgress,
  ScannerOptions,
  SpecimenDetectionResult,
  TesseractWorkerConfig,
  VizLanguageMode,
  VizLineBox,
  VizParsedData,
} from './types';
import { resolveNativeVizLanguage, resolveVizPassStrategy } from './vizLanguages';
import { parseVizText } from './vizParser';

const DEFAULT_MRZ_OCRB_LANG = 'ocrb_int';
const DEFAULT_MRZ_OCRB_LANG_PATH = 'https://cdn.jsdelivr.net/gh/Shreeshrii/tessdata_ocrb@master';

function computeAge(dobIso: string | null): number | null {
  if (!dobIso) return null;
  const match = dobIso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const birth = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  if (Number.isNaN(birth.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age >= 0 && age <= 130 ? age : null;
}

function computeIsExpired(expiryIso: string | null): boolean | null {
  if (!expiryIso) return null;
  const match = expiryIso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const expiry = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  if (Number.isNaN(expiry.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return expiry < today;
}

function inferDocumentType(
  mrz: MrzParsedData | null,
  barcode: BarcodeParsedData | null,
  vizHint: DocumentType | null
): DocumentType {
  if (mrz) {
    const code = mrz.documentCode.toUpperCase();
    if (code.startsWith('P')) return 'passport';
    if (code.startsWith('V')) return 'visa';
    if (code.startsWith('AC') || code.startsWith('AR') || vizHint === 'residence_permit') {
      return 'residence_permit';
    }
    if (code.startsWith('I') || code.startsWith('A') || code.startsWith('C')) {
      return 'id_card';
    }
  }
  if (barcode?.aamva) {
    if (barcode.aamva.subfileType === 'ID') return 'id_card';
    if (barcode.aamva.subfileType === 'DL' || barcode.aamva.licenseClass) {
      return 'driver_license';
    }
  }
  return vizHint ?? 'unknown';
}

function stripDiacritics(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function toMrzTransliteration(str: string): string {
  const expanded = str
    .replace(/[Ää]/g, 'AE')
    .replace(/[Öö]/g, 'OE')
    .replace(/[Üü]/g, 'UE')
    .replace(/ß/g, 'SS')
    .replace(/[Øø]/g, 'OE')
    .replace(/[Ææ]/g, 'AE')
    .replace(/[Åå]/g, 'AA')
    .replace(/[Łł]/g, 'L')
    .replace(/[Đđ]/g, 'D');
  return stripDiacritics(expanded);
}

function hasDiacritics(str: string): boolean {
  return /[^\u0000-\u007F]/.test(str);
}

function pickField<T>(
  mrzVal: T | null | undefined,
  vizVal: T | null | undefined,
  fieldKey: string,
  sources: Record<string, FieldSource>,
  barcodeVal?: T | null | undefined
): T | null {
  const hasMrz = mrzVal !== null && mrzVal !== undefined && String(mrzVal).trim() !== '';
  const hasBarcode =
    barcodeVal !== null && barcodeVal !== undefined && String(barcodeVal).trim() !== '';
  const hasViz = vizVal !== null && vizVal !== undefined && String(vizVal).trim() !== '';

  if (hasMrz) {
    sources[fieldKey] = hasViz ? 'MRZ+VIZ' : 'MRZ';
    return mrzVal as T;
  }
  if (hasBarcode) {
    sources[fieldKey] = hasViz ? 'BARCODE+VIZ' : 'BARCODE';
    return barcodeVal as T;
  }
  if (hasViz) {
    sources[fieldKey] = 'VIZ';
    return vizVal as T;
  }
  return null;
}

function pickSingleSideName(
  mrzVal: string | null | undefined,
  barcodeVal: string | null | undefined,
  vizVal: string | null | undefined,
  fieldKey: string,
  sources: Record<string, FieldSource>
): string | null {
  const m = mrzVal?.trim() || null;
  const b = barcodeVal?.trim() || null;
  const v = vizVal?.trim() || null;

  if (m && v) {
    sources[fieldKey] = 'MRZ+VIZ';
    const mAscii = stripDiacritics(m);
    const vAscii = stripDiacritics(v);
    const vTranslit = toMrzTransliteration(v);
    if (hasDiacritics(v) && (vAscii === mAscii || vTranslit === mAscii)) {
      return v;
    }
    if (
      vAscii.length > mAscii.length &&
      mAscii.length >= 8 &&
      vAscii.startsWith(mAscii.slice(0, 8))
    ) {
      return v;
    }
    return m;
  }

  if (m) {
    sources[fieldKey] = 'MRZ';
    return m;
  }

  if (b) {
    sources[fieldKey] = v ? 'BARCODE+VIZ' : 'BARCODE';
    return b;
  }

  if (v) {
    sources[fieldKey] = 'VIZ';
    return v;
  }
  return null;
}

function pickMergedVizString(
  primaryVal: string | null,
  nativeVal: string | null,
  primaryConf: number,
  nativeConf: number
): string | null {
  const p = primaryVal?.trim() || null;
  const n = nativeVal?.trim() || null;
  if (!p) return n;
  if (!n) return p;

  const pAscii = stripDiacritics(p);
  const nAscii = stripDiacritics(n);
  if (pAscii === nAscii) {
    if (hasDiacritics(n) && !hasDiacritics(p)) return n;
    if (hasDiacritics(p) && !hasDiacritics(n)) return p;
  }
  if (hasDiacritics(n) && !hasDiacritics(p) && nativeConf >= primaryConf - 5) {
    return n;
  }
  if (nativeConf >= primaryConf + 4 && n.length >= Math.max(2, p.length - 1)) {
    return n;
  }
  if (nativeConf >= primaryConf - 2 && n.length > p.length + 2) {
    return n;
  }
  return nativeConf > primaryConf ? n : p;
}

function mergeVizData(
  primary: VizParsedData,
  primaryConf: number,
  nativeViz: VizParsedData,
  nativeConf: number
): VizParsedData {
  const surname = pickMergedVizString(primary.surname, nativeViz.surname, primaryConf, nativeConf);
  const surnames =
    surname === nativeViz.surname && nativeViz.surnames.length > 0
      ? nativeViz.surnames
      : primary.surnames.length > 0
        ? primary.surnames
        : surname
          ? surname.split(/\s+/).filter(Boolean)
          : [];

  return {
    documentTypeHint: primary.documentTypeHint ?? nativeViz.documentTypeHint,
    surname,
    surnames,
    givenNames: pickMergedVizString(primary.givenNames, nativeViz.givenNames, primaryConf, nativeConf),
    fullName: pickMergedVizString(primary.fullName, nativeViz.fullName, primaryConf, nativeConf),
    documentNumber: primary.documentNumber ?? nativeViz.documentNumber,
    personalNumber: primary.personalNumber ?? nativeViz.personalNumber,
    nationality: pickMergedVizString(primary.nationality, nativeViz.nationality, primaryConf, nativeConf),
    issuingCountry: pickMergedVizString(primary.issuingCountry, nativeViz.issuingCountry, primaryConf, nativeConf),
    dateOfBirth: primary.dateOfBirth ?? nativeViz.dateOfBirth,
    dateOfIssue: primary.dateOfIssue ?? nativeViz.dateOfIssue,
    dateOfExpiry: primary.dateOfExpiry ?? nativeViz.dateOfExpiry,
    sex: primary.sex ?? nativeViz.sex,
    placeOfBirth: pickMergedVizString(primary.placeOfBirth, nativeViz.placeOfBirth, primaryConf, nativeConf),
    address: pickMergedVizString(primary.address, nativeViz.address, primaryConf, nativeConf),
    parents: pickMergedVizString(primary.parents, nativeViz.parents, primaryConf, nativeConf),
    issuingAuthority: pickMergedVizString(
      primary.issuingAuthority,
      nativeViz.issuingAuthority,
      primaryConf,
      nativeConf
    ),
    licenseClass: primary.licenseClass ?? nativeViz.licenseClass,
    restrictions: pickMergedVizString(primary.restrictions, nativeViz.restrictions, primaryConf, nativeConf),
    endorsements: pickMergedVizString(primary.endorsements, nativeViz.endorsements, primaryConf, nativeConf),
    height: primary.height ?? nativeViz.height,
    eyeColor: pickMergedVizString(primary.eyeColor, nativeViz.eyeColor, primaryConf, nativeConf),
    hairColor: pickMergedVizString(primary.hairColor, nativeViz.hairColor, primaryConf, nativeConf),
    detectedLines:
      nativeConf >= primaryConf && nativeViz.detectedLines.length > 0
        ? nativeViz.detectedLines
        : primary.detectedLines,
    unmappedKeyValues: {
      ...primary.unmappedKeyValues,
      ...nativeViz.unmappedKeyValues,
    },
  };
}

function normalizeConfusableChars(val: string): string {
  return val
    .toUpperCase()
    .replace(/[ODQ]/g, '0')
    .replace(/[ILT]/g, '1')
    .replace(/Z/g, '2')
    .replace(/S/g, '5')
    .replace(/G/g, '6')
    .replace(/B/g, '8');
}

function reconcileDocumentNumber(
  mrz: MrzParsedData | null,
  barcodeDocNum: string | null | undefined,
  vizDocNum: string | null,
  sources: Record<string, FieldSource>
): string | null {
  if (mrz?.documentNumber && vizDocNum) {
    const docCheck = mrz.checkDigits.find((c) => c.field === 'documentNumber');
    const mrzNorm = mrz.documentNumber.trim().toUpperCase();
    const vizNorm = vizDocNum.trim().toUpperCase();
    if (
      docCheck &&
      !docCheck.valid &&
      mrzNorm.length === vizNorm.length &&
      normalizeConfusableChars(mrzNorm) === normalizeConfusableChars(vizNorm)
    ) {
      sources.documentNumber = 'MRZ+VIZ';
      return vizNorm;
    }
  }
  return pickField(mrz?.documentNumber, vizDocNum, 'documentNumber', sources, barcodeDocNum);
}

function extractVizLineBoxes(blocks: Block[] | null): VizLineBox[] {
  if (!blocks) return [];
  const boxes: VizLineBox[] = [];

  for (const b of blocks) {
    for (const p of b.paragraphs) {
      for (const l of p.lines) {
        let text = '';
        if (l.words && l.words.length > 0) {
          for (let i = 0; i < l.words.length; i++) {
            const w = l.words[i];
            const wText = (w.text || '').trim();
            if (!wText) continue;
            if (i > 0 && text.length > 0) {
              const prev = l.words[i - 1];
              const prevText = (prev.text || '').trim();
              const gap = w.bbox.x0 - prev.bbox.x1;
              const prevCharW = (prev.bbox.x1 - prev.bbox.x0) / Math.max(1, prevText.length);
              const currCharW = (w.bbox.x1 - w.bbox.x0) / Math.max(1, wText.length);
              const avgCharW = (prevCharW + currCharW) / 2;
              const bothAlphaUpper =
                /^[A-Z\u00C0-\u024F]{2,}$/.test(prevText) &&
                /^[A-Z\u00C0-\u024F]{2,}$/.test(wText);
              if (bothAlphaUpper && gap < avgCharW * 1.02) {
                text += wText;
              } else {
                text += ' ' + wText;
              }
            } else {
              text += wText;
            }
          }
        } else {
          text = l.text.trim();
        }

        const cleaned = text.replace(/\s+/g, ' ').trim();
        if (cleaned) {
          boxes.push({
            text: cleaned,
            bbox: {
              x0: l.bbox.x0,
              y0: l.bbox.y0,
              x1: l.bbox.x1,
              y1: l.bbox.y1,
            },
          });
        }
      }
    }
  }

  boxes.sort((a, b) => a.bbox.y0 - b.bbox.y0 || a.bbox.x0 - b.bbox.x0);
  const merged: VizLineBox[] = [];
  for (let i = 0; i < boxes.length; i++) {
    const cur = boxes[i];
    if (i + 1 < boxes.length) {
      const next = boxes[i + 1];
      const curH = Math.max(12, cur.bbox.y1 - cur.bbox.y0);
      const sameRow = Math.abs(cur.bbox.y0 - next.bbox.y0) <= curH * 0.45;
      const gap = next.bbox.x0 - cur.bbox.x1;
      if (
        sameRow &&
        gap >= -4 &&
        gap <= curH * 1.0 &&
        /^\d{1,2}\.\d{1,2}\.?$/.test(cur.text) &&
        /^(?:19|20)\d{2}$/.test(next.text)
      ) {
        merged.push({
          text: `${cur.text} ${next.text}`,
          bbox: {
            x0: Math.min(cur.bbox.x0, next.bbox.x0),
            y0: Math.min(cur.bbox.y0, next.bbox.y0),
            x1: Math.max(cur.bbox.x1, next.bbox.x1),
            y1: Math.max(cur.bbox.y1, next.bbox.y1),
          },
        });
        i++;
        continue;
      }
    }
    merged.push(cur);
  }

  return merged;
}

function inspectInkBox(
  gray: GrayscaleBuffer,
  x0: number,
  y0: number,
  x1: number,
  y1: number
): {
  empty: boolean;
  gw: number;
  gh: number;
  isChevron: boolean;
  isThinBar: boolean;
  isNine: boolean;
  isZee: boolean;
} {
  const bx0 = Math.max(0, Math.floor(x0));
  const by0 = Math.max(0, Math.floor(y0));
  const bx1 = Math.min(gray.width - 1, Math.ceil(x1));
  const by1 = Math.min(gray.height - 1, Math.ceil(y1));

  let ix0 = bx1;
  let iy0 = by1;
  let ix1 = bx0;
  let iy1 = by0;

  for (let y = by0; y <= by1; y++) {
    const rowOffset = y * gray.width;
    for (let x = bx0; x <= bx1; x++) {
      if (gray.data[rowOffset + x] < 165) {
        if (x < ix0) ix0 = x;
        if (x > ix1) ix1 = x;
        if (y < iy0) iy0 = y;
        if (y > iy1) iy1 = y;
      }
    }
  }

  if (ix1 <= ix0 || iy1 <= iy0) {
    return {
      empty: true,
      gw: 0,
      gh: 0,
      isChevron: false,
      isThinBar: false,
      isNine: false,
      isZee: false,
    };
  }

  const gw = ix1 - ix0 + 1;
  const gh = iy1 - iy0 + 1;

  const grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const counts = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  for (let y = iy0; y <= iy1; y++) {
    const gy = Math.min(2, Math.floor(((y - iy0) / gh) * 3));
    const rowOffset = y * gray.width;
    for (let x = ix0; x <= ix1; x++) {
      const gx = Math.min(2, Math.floor(((x - ix0) / gw) * 3));
      counts[gy][gx]++;
      if (gray.data[rowOffset + x] < 165) {
        grid[gy][gx]++;
      }
    }
  }

  const d = (r: number, c: number) => grid[r][c] / Math.max(1, counts[r][c]);

  const isChevron =
    gw >= 10 &&
    gh >= 14 &&
    d(0, 0) <= 0.24 &&
    d(2, 0) <= 0.24 &&
    d(1, 0) >= 0.38 &&
    d(1, 2) <= 0.24 &&
    d(0, 2) >= 0.28 &&
    d(2, 2) >= 0.28;

  const hasCenterStem = d(0, 1) >= 0.35 && d(1, 1) >= 0.5 && d(2, 1) >= 0.35;
  const hasRightStem =
    d(0, 2) >= 0.55 && d(1, 2) >= 0.65 && d(2, 2) >= 0.55 && d(1, 0) <= 0.15 && d(2, 0) <= 0.15;
  const isThinBar = gw <= gh * 0.48 && (hasCenterStem || hasRightStem);

  const isNine =
    gw >= gh * 0.54 &&
    d(1, 1) <= 0.5 &&
    d(0, 0) >= 0.4 &&
    d(0, 2) >= 0.4 &&
    d(1, 2) >= 0.45 &&
    d(2, 0) <= 0.25 &&
    d(2, 2) <= 0.25 &&
    d(2, 1) >= 0.4;

  const isZee =
    gw >= gh * 0.48 &&
    d(0, 1) >= 0.38 &&
    d(0, 2) >= 0.38 &&
    d(1, 0) <= 0.28 &&
    d(1, 2) <= 0.22 &&
    d(1, 1) >= 0.3 &&
    d(2, 0) >= 0.38 &&
    d(2, 1) >= 0.3 &&
    d(2, 2) >= 0.25;

  return { empty: false, gw, gh, isChevron, isThinBar, isNine, isZee };
}

function findInkHorizontalBounds(
  gray: GrayscaleBuffer,
  x0: number,
  y0: number,
  x1: number,
  y1: number
): { inkX0: number; inkX1: number } {
  const bx0 = Math.max(0, Math.floor(x0));
  const bx1 = Math.min(gray.width - 1, Math.ceil(x1));
  const by0 = Math.max(0, Math.floor(y0));
  const by1 = Math.min(gray.height - 1, Math.ceil(y1));

  let inkX0 = bx1;
  let inkX1 = bx0;
  for (let x = bx0; x <= bx1; x++) {
    let darkCount = 0;
    for (let y = by0; y <= by1; y++) {
      if (gray.data[y * gray.width + x] < 165) {
        darkCount++;
        if (darkCount >= 2) break;
      }
    }
    if (darkCount >= 2) {
      if (x < inkX0) inkX0 = x;
      if (x > inkX1) inkX1 = x;
    }
  }
  if (inkX1 <= inkX0) {
    return { inkX0: x0, inkX1: x1 };
  }
  return { inkX0, inkX1 };
}

function reconstructMrzCandidatesFromBlocks(
  blocks: Block[] | null,
  gray: GrayscaleBuffer
): { symbolRepairedText: string; gridRepairedText: string } {
  if (!blocks || blocks.length === 0) {
    return { symbolRepairedText: '', gridRepairedText: '' };
  }

  interface LineEntry {
    text: string;
    bbox: { x0: number; y0: number; x1: number; y1: number };
    syms: TessSymbol[];
  }

  const allLines: LineEntry[] = [];
  for (const b of blocks) {
    for (const p of b.paragraphs) {
      for (const l of p.lines) {
        const syms = l.words.flatMap((w) => w.symbols || []);
        const cleaned = l.text.replace(/\s+/g, '').toUpperCase();
        if (cleaned.length >= 22 && syms.length >= 20) {
          allLines.push({ text: cleaned, bbox: l.bbox, syms });
        }
      }
    }
  }

  if (allLines.length === 0) {
    return { symbolRepairedText: '', gridRepairedText: '' };
  }

  const symbolLines: string[] = [];
  for (const line of allLines) {
    const widths = line.syms
      .map((s) => s.bbox.x1 - s.bbox.x0)
      .filter((w) => w > 12)
      .sort((a, b) => a - b);
    const medW = widths[Math.floor(widths.length / 2)] || 34;

    let out = '';
    for (let i = 0; i < line.syms.length; i++) {
      const s = line.syms[i];
      const sw = s.bbox.x1 - s.bbox.x0;
      const single = inspectInkBox(gray, s.bbox.x0, s.bbox.y0, s.bbox.x1, s.bbox.y1);

      if (i + 1 < line.syms.length) {
        const n = line.syms[i + 1];
        const nw = n.bbox.x1 - n.bbox.x0;
        const mergedW = n.bbox.x1 - s.bbox.x0;
        const overlaps = n.bbox.x0 <= s.bbox.x1 + 2;

        if (overlaps && mergedW <= medW * 1.75) {
          const nextSingle = inspectInkBox(gray, n.bbox.x0, n.bbox.y0, n.bbox.x1, n.bbox.y1);
          if (single.isChevron || nextSingle.isChevron) {
            out += '<';
            let spanEnd = Math.max(s.bbox.x1, n.bbox.x1);
            i++;
            while (
              i + 1 < line.syms.length &&
              line.syms[i + 1].bbox.x0 <= spanEnd + 2 &&
              line.syms[i + 1].bbox.x1 - s.bbox.x0 <= medW * 1.75
            ) {
              spanEnd = Math.max(spanEnd, line.syms[i + 1].bbox.x1);
              i++;
            }
            continue;
          }
        }

        if (mergedW <= medW * 1.45 && (sw < medW * 0.8 || nw < medW * 0.48)) {
          const box = inspectInkBox(
            gray,
            s.bbox.x0,
            Math.min(s.bbox.y0, n.bbox.y0),
            n.bbox.x1,
            Math.max(s.bbox.y1, n.bbox.y1)
          );
          if (box.isChevron) {
            out += '<';
            i++;
            continue;
          }
        }
      }

      if (single.isChevron) {
        out += '<';
      } else {
        out += s.text.toUpperCase();
      }
    }
    symbolLines.push(out);
  }

  const gridLines: string[] = [];
  if (allLines.length >= 2) {
    const startIdx = allLines.length - Math.min(3, allLines.length);
    const mrzBlock = allLines.slice(startIdx);
    const mrzSymLines = symbolLines.slice(startIdx);
    const lineWidths = mrzBlock.map((l) => l.bbox.x1 - l.bbox.x0);
    const maxW = Math.max(...lineWidths);
    const minW = Math.min(...lineWidths);

    if (maxW > 0 && minW / maxW >= 0.85) {
      const firstText = mrzSymLines[0] ?? '';
      const sampleLine = mrzBlock[0];
      const lineH = Math.max(18, sampleLine.bbox.y1 - sampleLine.bbox.y0);
      const estCols = maxW / lineH;

      let targetCols: 30 | 36 | 44 | 45 = 30;
      if (mrzBlock.length === 3 && estCols < 35) {
        targetCols = 30;
      } else if (/^[PV]/.test(firstText) && estCols >= 39) {
        targetCols = 44;
      } else if (estCols >= 40) {
        targetCols = 44;
      } else if (estCols >= 33.5 && mrzBlock.length === 2) {
        targetCols = 36;
      } else if (mrzBlock.length === 2 && /^[PV]/.test(firstText)) {
        targetCols = estCols >= 38 ? 44 : 36;
      } else if (mrzBlock.length === 2 && estCols >= 38) {
        targetCols = 44;
      }

      const activeBlock =
        targetCols === 30 && mrzBlock.length === 3 ? mrzBlock : mrzBlock.slice(-2);
      const activeSyms =
        targetCols === 30 && mrzBlock.length === 3 ? mrzSymLines : mrzSymLines.slice(-2);

      if (targetCols === 44 && activeSyms.length === 2 && activeSyms.every((s) => s.length === 45)) {
        targetCols = 45;
      }

      for (const line of activeBlock) {
        const widths = line.syms
          .map((s) => s.bbox.x1 - s.bbox.x0)
          .filter((w) => w > 12)
          .sort((a, b) => a - b);
        const glyphW = widths[Math.floor(widths.length / 2)] || 30;
        const { inkX0, inkX1 } = findInkHorizontalBounds(
          gray,
          line.bbox.x0,
          line.bbox.y0,
          line.bbox.x1,
          line.bbox.y1
        );

        const center0 = inkX0 + glyphW / 2;
        const centerLast = inkX1 - glyphW / 2;
        const pitch = (centerLast - center0) / (targetCols - 1);

        let reconstructed = '';
        for (let col = 0; col < targetCols; col++) {
          const mid = center0 + col * pitch;
          const cx0 = mid - pitch * 0.36;
          const cx1 = mid + pitch * 0.36;
          const cellBox = inspectInkBox(gray, cx0, line.bbox.y0, cx1, line.bbox.y1);

          if (cellBox.empty || cellBox.isChevron) {
            reconstructed += '<';
            continue;
          }

          let matches = line.syms.filter((s) => {
            const smid = (s.bbox.x0 + s.bbox.x1) / 2;
            return smid >= mid - pitch * 0.45 && smid <= mid + pitch * 0.45;
          });
          if (matches.length === 0) {
            matches = line.syms.filter((s) => {
              const smid = (s.bbox.x0 + s.bbox.x1) / 2;
              return smid >= mid - pitch * 0.62 && smid <= mid + pitch * 0.62;
            });
          }
          matches.sort(
            (a, b) =>
              Math.abs((a.bbox.x0 + a.bbox.x1) / 2 - mid) -
              Math.abs((b.bbox.x0 + b.bbox.x1) / 2 - mid)
          );
          const match = matches[0];

          if (match) {
            const matchWidth = match.bbox.x1 - match.bbox.x0;
            const ch = match.text.toUpperCase();
            const matchBox = inspectInkBox(
              gray,
              match.bbox.x0,
              match.bbox.y0,
              match.bbox.x1,
              match.bbox.y1
            );
            if (matchBox.isChevron) {
              reconstructed += '<';
            } else if (matchWidth > glyphW * 1.45 && cellBox.isThinBar) {
              reconstructed += '1';
            } else if ((ch === 'T' || ch === 'K' || ch === 'L') && cellBox.isThinBar) {
              reconstructed += '1';
            } else if (ch === 'T' && cellBox.gw <= cellBox.gh * 0.48) {
              reconstructed += '1';
            } else if (ch === 'L' && cellBox.isZee) {
              reconstructed += 'Z';
            } else if ((ch === 'I' || ch === '1' || ch === 'L') && cellBox.isNine) {
              reconstructed += '9';
            } else {
              reconstructed += ch;
            }
          } else if (cellBox.isThinBar) {
            reconstructed += '1';
          } else {
            reconstructed += '<';
          }
        }
        gridLines.push(reconstructed);
      }
    }
  }

  return {
    symbolRepairedText: symbolLines.join('\n'),
    gridRepairedText: gridLines.join('\n'),
  };
}

function scoreMrzCandidate(m: MrzParsedData): number {
  const chevCount = m.rawLines.join('').split('<').length - 1;
  const hasRealCountry = /^[A-Z]{1,3}$/.test(m.issuingCountry);
  return (
    m.validCount * 100 +
    (m.allCheckDigitsValid ? 50 : 0) +
    (hasRealCountry ? 20 : 0) +
    (m.dateOfBirth ? 15 : 0) +
    (m.dateOfExpiry ? 15 : 0) +
    (m.surname ? 10 : 0) +
    (m.givenNames ? 10 : 0) +
    Math.min(chevCount, 60)
  );
}

interface OrientationPassResult {
  coarse: 0 | 90 | 180 | 270;
  preprocessed: PreprocessedResult;
  usedWorkerPreprocess: boolean;
  cleanedFullText: string;
  vizLineBoxes: VizLineBox[];
  vizData: VizParsedData;
  mrzData: MrzParsedData | null;
  mrzRawText: string;
  mrzModelUsed: MrzOcrModel;
  confidence: number;
  probeScore: number;
  isConfidentUpright: boolean;
}

function countPopulatedVizFields(viz: VizParsedData): number {
  return [
    viz.surname,
    viz.givenNames,
    viz.fullName,
    viz.documentNumber,
    viz.dateOfBirth,
    viz.dateOfExpiry,
    viz.dateOfIssue,
    viz.address,
    viz.nationality,
    viz.issuingAuthority,
    viz.placeOfBirth,
  ].filter((v) => v !== null && String(v).trim() !== '').length;
}

function scoreOrientationPass(
  mrz: MrzParsedData | null,
  viz: VizParsedData,
  confidence: number,
  rawText: string
): number {
  let score = 0;
  if (mrz) {
    score += mrz.validCount * 120;
    if (mrz.allCheckDigitsValid) score += 200;
    if (/^[PVIAC]/.test(mrz.documentCode)) score += 60;
    if (mrz.dateOfBirth) score += 35;
    if (mrz.dateOfExpiry) score += 35;
    if (mrz.surname) score += 30;
    if (mrz.givenNames) score += 25;
    if (mrz.documentNumber) score += 25;
  }
  const vizFields = countPopulatedVizFields(viz);
  score += vizFields * 28;
  if (viz.documentTypeHint) score += 25;
  score += confidence * 0.8;
  const readableWords = (rawText.match(/[A-Za-z\u00C0-\u024F]{3,}/g) || []).length;
  score += Math.min(readableWords, 30) * 1.5;
  return score;
}

function normalizeDegrees360(deg: number): number {
  const norm = ((deg % 360) + 360) % 360;
  return Math.round(norm * 10) / 10;
}

function scaleProgressCallback(
  base: number,
  span: number,
  cb?: (p: ScanProgress) => void,
  labelPrefix?: string
): ((p: ScanProgress) => void) | undefined {
  if (!cb) return undefined;
  return (p: ScanProgress) => {
    cb({
      stage: p.stage,
      progress: Math.min(99, Math.round(base + (p.progress / 100) * span)),
      message: labelPrefix ? `${labelPrefix}: ${p.message}` : p.message,
    });
  };
}

export class DocumentScanner {
  private worker: Worker | null = null;
  private workerLang: string | null = null;
  private workerConfigKey: string | null = null;

  private vizNativeWorker: Worker | null = null;
  private vizNativeLang: string | null = null;
  private vizNativeConfigKey: string | null = null;
  private vizNativeFailedLangs = new Set<string>();

  private mrzWorker: Worker | null = null;
  private mrzWorkerConfigKey: string | null = null;
  private mrzOcrbFailed = false;

  private preprocessWorker = new PreprocessWorkerClient();

  private defaultWorkerConfig: TesseractWorkerConfig;
  private activeStageCallback: ((p: ScanProgress) => void) | null = null;
  private activeStage: ScanProgress['stage'] = 'initializing_ocr';

  constructor(workerConfig: TesseractWorkerConfig = {}) {
    this.defaultWorkerConfig = { ...workerConfig };
  }

  private mergeWorkerConfig(override: TesseractWorkerConfig): TesseractWorkerConfig {
    return {
      workerPath: override.workerPath ?? this.defaultWorkerConfig.workerPath,
      corePath: override.corePath ?? this.defaultWorkerConfig.corePath,
      langPath: override.langPath ?? this.defaultWorkerConfig.langPath,
      workerBlobURL: override.workerBlobURL ?? this.defaultWorkerConfig.workerBlobURL,
      useWorkerPreprocessing:
        override.useWorkerPreprocessing ??
        this.defaultWorkerConfig.useWorkerPreprocessing ??
        true,
      mrzModel: override.mrzModel ?? this.defaultWorkerConfig.mrzModel ?? 'ocrb',
      mrzLanguage: override.mrzLanguage ?? this.defaultWorkerConfig.mrzLanguage,
      mrzLangPath: override.mrzLangPath ?? this.defaultWorkerConfig.mrzLangPath,
      mrzGzip: override.mrzGzip ?? this.defaultWorkerConfig.mrzGzip,
      vizLanguageMode: override.vizLanguageMode ?? this.defaultWorkerConfig.vizLanguageMode,
      vizLanguages: override.vizLanguages ?? this.defaultWorkerConfig.vizLanguages,
      vizLanguageMap: override.vizLanguageMap ?? this.defaultWorkerConfig.vizLanguageMap,
    };
  }

  private abortInFlightWorkers(): void {
    this.preprocessWorker.abortActiveWorker();

    if (this.worker) {
      const w = this.worker;
      this.worker = null;
      this.workerLang = null;
      this.workerConfigKey = null;
      void w.terminate().catch(() => {});
    }
    if (this.vizNativeWorker) {
      const w = this.vizNativeWorker;
      this.vizNativeWorker = null;
      this.vizNativeLang = null;
      this.vizNativeConfigKey = null;
      void w.terminate().catch(() => {});
    }
    if (this.mrzWorker) {
      const w = this.mrzWorker;
      this.mrzWorker = null;
      this.mrzWorkerConfigKey = null;
      void w.terminate().catch(() => {});
    }
  }

  private createLoggerOption(stageFilter: 'full' | 'native' | 'mrz') {
    return (info: { status: string; progress?: number }) => {
      if (!this.activeStageCallback) return;
      if (info.status === 'recognizing text') {
        if (stageFilter === 'full' && this.activeStage !== 'recognizing_full') return;
        if (stageFilter === 'native' && this.activeStage !== 'recognizing_viz_native') return;
        if (stageFilter === 'mrz' && this.activeStage !== 'recognizing_mrz') return;
        const base =
          this.activeStage === 'recognizing_full'
            ? 25
            : this.activeStage === 'recognizing_viz_native'
              ? 82
              : 65;
        const span =
          this.activeStage === 'recognizing_full'
            ? 35
            : this.activeStage === 'recognizing_viz_native'
              ? 10
              : 25;
        const pct = Math.round(base + (info.progress || 0) * span);
        this.activeStageCallback({
          stage: this.activeStage,
          progress: pct,
          message:
            this.activeStage === 'recognizing_full'
              ? 'Reading document text & visual inspection zone…'
              : this.activeStage === 'recognizing_viz_native'
                ? 'Refining native-script diacritics & labels…'
                : 'Running dedicated OCR-B MRZ strip verification…',
        });
      }
    };
  }

  private async ensureWorker(
    language: string,
    workerConfig: TesseractWorkerConfig,
    onProgress?: (p: ScanProgress) => void,
    signal?: AbortSignal
  ): Promise<Worker> {
    throwIfScanAborted(signal);
    this.activeStageCallback = onProgress ?? null;

    const mergedConfig = this.mergeWorkerConfig(workerConfig);
    const configKey = JSON.stringify({
      workerPath: mergedConfig.workerPath,
      corePath: mergedConfig.corePath,
      langPath: mergedConfig.langPath,
      workerBlobURL: mergedConfig.workerBlobURL,
    });

    if (
      this.worker &&
      this.workerLang === language &&
      this.workerConfigKey === configKey
    ) {
      return this.worker;
    }

    if (this.worker) {
      const staleWorker = this.worker;
      this.worker = null;
      this.workerLang = null;
      this.workerConfigKey = null;
      await raceWithAbort(staleWorker.terminate(), signal, () => this.abortInFlightWorkers());
    }

    throwIfScanAborted(signal);
    this.activeStage = 'initializing_ocr';
    onProgress?.({
      stage: 'initializing_ocr',
      progress: 14,
      message: 'Initializing client-side Tesseract OCR engine…',
    });

    const tesseractWorkerOptions: Record<string, unknown> = {
      logger: this.createLoggerOption('full'),
    };

    if (mergedConfig.workerPath) tesseractWorkerOptions.workerPath = mergedConfig.workerPath;
    if (mergedConfig.corePath) tesseractWorkerOptions.corePath = mergedConfig.corePath;
    if (mergedConfig.langPath) tesseractWorkerOptions.langPath = mergedConfig.langPath;
    if (mergedConfig.workerBlobURL !== undefined) {
      tesseractWorkerOptions.workerBlobURL = mergedConfig.workerBlobURL;
    }

    const createPromise = createWorker(
      language,
      1,
      tesseractWorkerOptions,
      {
        load_system_dawg: '0',
        load_freq_dawg: '0',
      }
    ).then((created) => {
      if (signal?.aborted) {
        void created.terminate().catch(() => {});
      }
      return created;
    });

    const worker = await raceWithAbort(createPromise, signal, () => this.abortInFlightWorkers());
    throwIfScanAborted(signal);

    this.worker = worker;
    this.workerLang = language;
    this.workerConfigKey = configKey;
    return worker;
  }

  private async ensureNativeVizWorker(
    nativeLanguage: string,
    workerConfig: TesseractWorkerConfig,
    onProgress?: (p: ScanProgress) => void,
    signal?: AbortSignal
  ): Promise<Worker | null> {
    throwIfScanAborted(signal);
    this.activeStageCallback = onProgress ?? null;
    const mergedConfig = this.mergeWorkerConfig(workerConfig);
    const configKey = JSON.stringify({
      workerPath: mergedConfig.workerPath,
      corePath: mergedConfig.corePath,
      langPath: mergedConfig.langPath,
      workerBlobURL: mergedConfig.workerBlobURL,
    });

    if (this.vizNativeFailedLangs.has(`${nativeLanguage}:${configKey}`)) {
      return null;
    }

    if (
      this.vizNativeWorker &&
      this.vizNativeLang === nativeLanguage &&
      this.vizNativeConfigKey === configKey
    ) {
      return this.vizNativeWorker;
    }

    if (this.vizNativeWorker) {
      const stale = this.vizNativeWorker;
      this.vizNativeWorker = null;
      this.vizNativeLang = null;
      this.vizNativeConfigKey = null;
      await raceWithAbort(stale.terminate(), signal, () => this.abortInFlightWorkers());
    }

    try {
      throwIfScanAborted(signal);
      this.activeStage = 'recognizing_viz_native';
      onProgress?.({
        stage: 'recognizing_viz_native',
        progress: 82,
        message: `Loading native VIZ language pack (${nativeLanguage})…`,
      });

      const nativeOptions: Record<string, unknown> = {
        logger: this.createLoggerOption('native'),
      };
      if (mergedConfig.workerPath) nativeOptions.workerPath = mergedConfig.workerPath;
      if (mergedConfig.corePath) nativeOptions.corePath = mergedConfig.corePath;
      if (mergedConfig.langPath) nativeOptions.langPath = mergedConfig.langPath;
      if (mergedConfig.workerBlobURL !== undefined) {
        nativeOptions.workerBlobURL = mergedConfig.workerBlobURL;
      }

      const createPromise = createWorker(
        nativeLanguage,
        1,
        nativeOptions,
        {
          load_system_dawg: '0',
          load_freq_dawg: '0',
        }
      ).then((created) => {
        if (signal?.aborted) {
          void created.terminate().catch(() => {});
        }
        return created;
      });

      const worker = await raceWithAbort(createPromise, signal, () => this.abortInFlightWorkers());
      throwIfScanAborted(signal);

      this.vizNativeWorker = worker;
      this.vizNativeLang = nativeLanguage;
      this.vizNativeConfigKey = configKey;
      return worker;
    } catch (err) {
      if (isScanAbortedError(err)) throw err;
      this.vizNativeFailedLangs.add(`${nativeLanguage}:${configKey}`);
      return null;
    }
  }

  private async ensureMrzWorker(
    fallbackWorker: Worker,
    workerConfig: TesseractWorkerConfig,
    onProgress?: (p: ScanProgress) => void,
    signal?: AbortSignal
  ): Promise<{ worker: Worker; modelUsed: MrzOcrModel }> {
    throwIfScanAborted(signal);
    this.activeStageCallback = onProgress ?? null;
    const merged = this.mergeWorkerConfig(workerConfig);
    const requestedModel: MrzOcrModel = merged.mrzModel ?? 'ocrb';

    if (requestedModel === 'standard') {
      return { worker: fallbackWorker, modelUsed: 'standard' };
    }

    const mrzLang = merged.mrzLanguage ?? DEFAULT_MRZ_OCRB_LANG;
    const mrzLangPath = merged.mrzLangPath ?? DEFAULT_MRZ_OCRB_LANG_PATH;
    const mrzGzip = merged.mrzGzip ?? false;

    const mrzConfigKey = JSON.stringify({
      workerPath: merged.workerPath,
      corePath: merged.corePath,
      workerBlobURL: merged.workerBlobURL,
      mrzLang,
      mrzLangPath,
      mrzGzip,
    });

    if (this.mrzWorker && this.mrzWorkerConfigKey === mrzConfigKey) {
      return { worker: this.mrzWorker, modelUsed: 'ocrb' };
    }

    if (this.mrzOcrbFailed && this.mrzWorkerConfigKey === mrzConfigKey) {
      return { worker: fallbackWorker, modelUsed: 'standard' };
    }

    if (this.mrzWorker) {
      const stale = this.mrzWorker;
      this.mrzWorker = null;
      this.mrzWorkerConfigKey = null;
      await raceWithAbort(stale.terminate(), signal, () => this.abortInFlightWorkers());
    }

    try {
      throwIfScanAborted(signal);
      this.activeStage = 'initializing_ocr';
      onProgress?.({
        stage: 'initializing_ocr',
        progress: 16,
        message: 'Loading specialized OCR-B MRZ recognition model…',
      });

      const mrzOptions: Record<string, unknown> = {
        langPath: mrzLangPath,
        gzip: mrzGzip,
        logger: this.createLoggerOption('mrz'),
      };
      if (merged.workerPath) mrzOptions.workerPath = merged.workerPath;
      if (merged.corePath) mrzOptions.corePath = merged.corePath;
      if (merged.workerBlobURL !== undefined) {
        mrzOptions.workerBlobURL = merged.workerBlobURL;
      }

      const createPromise = createWorker(
        mrzLang,
        1,
        mrzOptions,
        {
          load_system_dawg: '0',
          load_freq_dawg: '0',
        }
      ).then((created) => {
        if (signal?.aborted) {
          void created.terminate().catch(() => {});
        }
        return created;
      });

      const worker = await raceWithAbort(createPromise, signal, () => this.abortInFlightWorkers());
      throwIfScanAborted(signal);

      this.mrzWorker = worker;
      this.mrzWorkerConfigKey = mrzConfigKey;
      this.mrzOcrbFailed = false;
      return { worker, modelUsed: 'ocrb' };
    } catch (err) {
      if (isScanAbortedError(err)) throw err;
      this.mrzWorkerConfigKey = mrzConfigKey;
      this.mrzOcrbFailed = true;
      return { worker: fallbackWorker, modelUsed: 'standard' };
    }
  }

  private async preprocessWithWorkerOrFallback(
    surface: ImageSurface,
    opts: {
      preprocess: boolean;
      rotation: 0 | 90 | 180 | 270;
      deskewDegrees: number;
    },
    useWorker: boolean,
    signal?: AbortSignal
  ): Promise<{ preprocessed: PreprocessedResult; viaWorker: boolean }> {
    throwIfScanAborted(signal);

    if (useWorker && this.preprocessWorker.isAvailable()) {
      const workerResult = await this.preprocessWorker.preprocessDocument(surface, opts, signal);
      if (workerResult) {
        return { preprocessed: workerResult, viaWorker: true };
      }
    }

    throwIfScanAborted(signal);
    const fallbackResult = await raceWithAbort(
      preprocessDocumentImage(surface, opts),
      signal
    );
    return { preprocessed: fallbackResult, viaWorker: false };
  }

  private async runOrientationPass(
    surface: ImageSurface,
    vizWorker: Worker,
    workerConfig: TesseractWorkerConfig,
    coarse: 0 | 90 | 180 | 270,
    deskewDegrees: number,
    preprocess: boolean,
    enhanceMrzPass: boolean,
    useWorkerPreprocess: boolean,
    onProgress?: (p: ScanProgress) => void,
    emitProgress = true,
    signal?: AbortSignal
  ): Promise<OrientationPassResult> {
    throwIfScanAborted(signal);

    const { preprocessed, viaWorker } = await this.preprocessWithWorkerOrFallback(
      surface,
      {
        preprocess,
        rotation: coarse,
        deskewDegrees,
      },
      useWorkerPreprocess,
      signal
    );

    throwIfScanAborted(signal);

    if (emitProgress) {
      this.activeStage = 'recognizing_full';
      onProgress?.({
        stage: 'recognizing_full',
        progress: 25,
        message: 'Reading document text & visual inspection zone…',
      });
    }

    await raceWithAbort(
      vizWorker.setParameters({
        tessedit_pageseg_mode: PSM.SPARSE_TEXT,
        tessedit_char_whitelist: '',
      }),
      signal,
      () => this.abortInFlightWorkers()
    );

    const fullInputUrl = preprocess
      ? preprocessed.enhancedDataUrl
      : preprocessed.originalDataUrl;
    let fullResult = await raceWithAbort(
      vizWorker.recognize(fullInputUrl, {}, { blocks: true }),
      signal,
      () => this.abortInFlightWorkers()
    );
    let fullText = fullResult.data.text || '';
    let fullConfidence = fullResult.data.confidence || 0;

    if (fullText.trim().split(/\r?\n/).filter(Boolean).length < 2) {
      throwIfScanAborted(signal);
      await raceWithAbort(
        vizWorker.setParameters({
          tessedit_pageseg_mode: PSM.AUTO,
          tessedit_char_whitelist: '',
        }),
        signal,
        () => this.abortInFlightWorkers()
      );
      const autoResult = await raceWithAbort(
        vizWorker.recognize(fullInputUrl, {}, { blocks: true }),
        signal,
        () => this.abortInFlightWorkers()
      );
      if ((autoResult.data.text || '').trim().length > fullText.trim().length) {
        fullResult = autoResult;
        fullText = autoResult.data.text || '';
        fullConfidence = autoResult.data.confidence || 0;
      }
    }

    const vizLineBoxes = extractVizLineBoxes(fullResult.data.blocks);
    const cleanedFullText =
      vizLineBoxes.length > 0 ? vizLineBoxes.map((b) => b.text).join('\n') : fullText;

    const candidates: MrzParsedData[] = [];
    const pass1Mrz = parseMrzFromText(fullText);
    if (pass1Mrz) candidates.push(pass1Mrz);

    let mrzRawText = '';
    let mrzModelUsed: MrzOcrModel =
      workerConfig.mrzModel ?? this.defaultWorkerConfig.mrzModel ?? 'ocrb';

    if (enhanceMrzPass) {
      throwIfScanAborted(signal);
      const mrzResolved = await this.ensureMrzWorker(vizWorker, workerConfig, onProgress, signal);
      const mrzWorker = mrzResolved.worker;
      mrzModelUsed = mrzResolved.modelUsed;

      if (emitProgress) {
        this.activeStage = 'recognizing_mrz';
        onProgress?.({
          stage: 'recognizing_mrz',
          progress: 65,
          message:
            mrzModelUsed === 'ocrb'
              ? 'Running dedicated OCR-B MRZ strip verification…'
              : 'Running high-contrast MRZ strip verification…',
        });
      }

      await raceWithAbort(
        mrzWorker.setParameters({
          tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
          tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<',
        }),
        signal,
        () => this.abortInFlightWorkers()
      );

      const runMrzStrip = async (stripUrl: string, stripGray: GrayscaleBuffer) => {
        throwIfScanAborted(signal);
        const mrzResult = await raceWithAbort(
          mrzWorker.recognize(stripUrl, {}, { blocks: true }),
          signal,
          () => this.abortInFlightWorkers()
        );
        const rawTxt = (mrzResult.data.text || '').trim();
        if (rawTxt && !mrzRawText) mrzRawText = rawTxt;

        const rawParsed = parseMrzFromText(rawTxt);
        if (rawParsed) candidates.push(rawParsed);

        const reconstructed = reconstructMrzCandidatesFromBlocks(
          mrzResult.data.blocks,
          stripGray
        );

        if (reconstructed.symbolRepairedText) {
          const symParsed = parseMrzFromText(reconstructed.symbolRepairedText);
          if (symParsed) candidates.push(symParsed);
        }

        if (reconstructed.gridRepairedText) {
          const gridParsed = parseMrzFromText(reconstructed.gridRepairedText);
          if (gridParsed) {
            candidates.push(gridParsed);
            mrzRawText = reconstructed.gridRepairedText;
          }
        }
      };

      await runMrzStrip(preprocessed.mrzCropDataUrl, preprocessed.mrzGrayscale);

      const hasPerfectMrz = candidates.some((c) => c.allCheckDigitsValid);
      if (!hasPerfectMrz) {
        if (emitProgress) {
          onProgress?.({
            stage: 'recognizing_mrz',
            progress: 80,
            message: 'Isolating lower passport MRZ band…',
          });
        }
        await runMrzStrip(preprocessed.mrzTightCropDataUrl, preprocessed.mrzTightGrayscale);
      }
    }

    let mrzData: MrzParsedData | null = null;
    if (candidates.length > 0) {
      const consensus = synthesizeConsensusMrz(candidates);
      if (consensus) {
        candidates.push(consensus);
      }
      candidates.sort((a, b) => scoreMrzCandidate(b) - scoreMrzCandidate(a));
      mrzData = candidates[0];
    }

    const vizData = parseVizText(cleanedFullText, vizLineBoxes);
    const vizFieldCount = countPopulatedVizFields(vizData);
    const probeScore = scoreOrientationPass(mrzData, vizData, fullConfidence, cleanedFullText);

    const isConfidentUpright =
      (mrzData !== null &&
        (mrzData.allCheckDigitsValid ||
          mrzData.validCount >= 2 ||
          (mrzData.validCount >= 1 &&
            Boolean(mrzData.surname || mrzData.documentNumber) &&
            fullConfidence >= 48))) ||
      (mrzData === null && fullConfidence >= 65 && vizFieldCount >= 4);

    return {
      coarse,
      preprocessed,
      usedWorkerPreprocess: viaWorker,
      cleanedFullText,
      vizLineBoxes,
      vizData,
      mrzData,
      mrzRawText,
      mrzModelUsed,
      confidence: fullConfidence,
      probeScore,
      isConfidentUpright,
    };
  }

  private async runLightweightProbe(
    surface: ImageSurface,
    worker: Worker,
    coarse: 0 | 90 | 180 | 270,
    deskewDegrees: number,
    preprocess: boolean,
    useWorkerPreprocess: boolean,
    signal?: AbortSignal
  ): Promise<{ score: number; viaWorker: boolean }> {
    throwIfScanAborted(signal);

    const { preprocessed, viaWorker } = await this.preprocessWithWorkerOrFallback(
      surface,
      {
        preprocess,
        rotation: coarse,
        deskewDegrees,
      },
      useWorkerPreprocess,
      signal
    );

    await raceWithAbort(
      worker.setParameters({
        tessedit_pageseg_mode: PSM.SPARSE_TEXT,
        tessedit_char_whitelist: '',
      }),
      signal,
      () => this.abortInFlightWorkers()
    );

    const inputUrl = preprocess ? preprocessed.enhancedDataUrl : preprocessed.originalDataUrl;
    const res = await raceWithAbort(
      worker.recognize(inputUrl, {}, { blocks: true }),
      signal,
      () => this.abortInFlightWorkers()
    );
    const rawText = res.data.text || '';
    const conf = res.data.confidence || 0;
    const boxes = extractVizLineBoxes(res.data.blocks);
    const cleaned = boxes.length > 0 ? boxes.map((b) => b.text).join('\n') : rawText;
    const viz = parseVizText(cleaned, boxes);
    const mrz = parseMrzFromText(rawText);

    return {
      score: scoreOrientationPass(mrz, viz, conf, cleaned),
      viaWorker,
    };
  }

  async scan(input: ImageInput, options: ScannerOptions = {}): Promise<ExtractedIdentity> {
    const startTime = performance.now();
    const {
      language = 'eng',
      preprocess = true,
      enhanceMrzPass = true,
      enableBarcodePass = true,
      extractPortrait = true,
      extractSignature = true,
      detectSpecimen = true,
      perspectiveCorrection = true,
      corners: manualCorners,
      rotation = 0,
      deskewDegrees: manualDeskew = 0,
      includeQualityReport = true,
      enforceQualityGate = false,
      qualityGateOptions,
      includePreviews = true,
      signal,
      workerPath,
      corePath,
      langPath,
      workerBlobURL,
      useWorkerPreprocessing,
      mrzModel,
      mrzLanguage,
      mrzLangPath,
      mrzGzip,
      vizLanguageMode,
      vizLanguages,
      vizLanguageMap,
      onProgress,
    } = options;

    throwIfScanAborted(signal);

    const workerConfig = this.mergeWorkerConfig({
      workerPath,
      corePath,
      langPath,
      workerBlobURL,
      useWorkerPreprocessing,
      mrzModel,
      mrzLanguage,
      mrzLangPath,
      mrzGzip,
      vizLanguageMode,
      vizLanguages,
      vizLanguageMap,
    });

    const useWorker =
      workerConfig.useWorkerPreprocessing !== false && this.preprocessWorker.isAvailable();

    const vizStrategy = resolveVizPassStrategy({
      language,
      vizLanguageMode: workerConfig.vizLanguageMode,
      vizLanguages: workerConfig.vizLanguages,
    });

    const autoRotate =
      options.autoRotate !== undefined
        ? options.autoRotate
        : rotation === 0 && manualDeskew === 0;

    onProgress?.({
      stage: 'preprocessing',
      progress: 4,
      message: perspectiveCorrection || manualCorners
        ? 'Decoding document & checking 4-corner perspective…'
        : autoRotate
          ? 'Decoding document & analyzing orientation…'
          : 'Preprocessing image & isolating MRZ region…',
    });

    let ownedBitmap: ImageBitmap | null = null;
    let warpedBitmap: ImageBitmap | null = null;
    let usedWorkerPreprocessing = false;

    try {
      const loaded = await raceWithAbort(loadImageSurface(input, useWorker), signal);
      const rawSurface = loaded.surface;
      ownedBitmap = loaded.ownedBitmap;
      throwIfScanAborted(signal);

      let workingSurface: ImageSurface = rawSurface;
      let perspectiveInfo: PerspectiveInfo | undefined;

      if (manualCorners) {
        onProgress?.({
          stage: 'detecting_perspective',
          progress: 8,
          message: 'Applying 4-corner perspective rectification…',
        });
        const ordered = orderQuadCorners([
          manualCorners.topLeft,
          manualCorners.topRight,
          manualCorners.bottomRight,
          manualCorners.bottomLeft,
        ]);

        if (useWorker) {
          const workerWarped = await this.preprocessWorker.warpPerspective(
            rawSurface,
            ordered,
            signal
          );
          if (workerWarped) {
            warpedBitmap = workerWarped;
            workingSurface = workerWarped;
            usedWorkerPreprocessing = true;
          } else {
            workingSurface = warpDocumentPerspective(rawSurface, ordered);
          }
        } else {
          workingSurface = warpDocumentPerspective(rawSurface, ordered);
        }

        const area =
          Math.abs(
            (ordered.topLeft.x * ordered.topRight.y - ordered.topRight.x * ordered.topLeft.y) +
              (ordered.topRight.x * ordered.bottomRight.y - ordered.bottomRight.x * ordered.topRight.y) +
              (ordered.bottomRight.x * ordered.bottomLeft.y - ordered.bottomLeft.x * ordered.bottomRight.y) +
              (ordered.bottomLeft.x * ordered.topLeft.y - ordered.topLeft.x * ordered.bottomLeft.y)
          ) / 2;
        perspectiveInfo = {
          applied: true,
          autoDetected: false,
          corners: ordered,
          sourceQuadAreaRatio: Math.round(area * 1000) / 1000,
        };
      } else if (perspectiveCorrection) {
        onProgress?.({
          stage: 'detecting_perspective',
          progress: 8,
          message: 'Detecting document borders for perspective correction…',
        });
        const detected = detectDocumentQuad(rawSurface);
        throwIfScanAborted(signal);
        if (detected) {
          if (useWorker) {
            const workerWarped = await this.preprocessWorker.warpPerspective(
              rawSurface,
              detected.corners,
              signal
            );
            if (workerWarped) {
              warpedBitmap = workerWarped;
              workingSurface = workerWarped;
              usedWorkerPreprocessing = true;
            } else {
              workingSurface = warpDocumentPerspective(rawSurface, detected.corners);
            }
          } else {
            workingSurface = warpDocumentPerspective(rawSurface, detected.corners);
          }
          perspectiveInfo = detected;
        } else {
          perspectiveInfo = {
            applied: false,
            autoDetected: true,
            corners: {
              topLeft: { x: 0, y: 0 },
              topRight: { x: 1, y: 0 },
              bottomRight: { x: 1, y: 1 },
              bottomLeft: { x: 0, y: 1 },
            },
            sourceQuadAreaRatio: 1,
          };
        }
      }

      throwIfScanAborted(signal);

      let qualityReport: ImageQualityReport | undefined;
      if (includeQualityReport || enforceQualityGate) {
        if (enforceQualityGate) {
          onProgress?.({
            stage: 'quality_check',
            progress: 10,
            message: 'Evaluating sharpness, glare & exposure quality gate…',
          });
        }
        qualityReport = await raceWithAbort(
          assessImageQuality(workingSurface, qualityGateOptions),
          signal
        );
        throwIfScanAborted(signal);
        if (enforceQualityGate && !qualityReport.passed) {
          throw new QualityGateError(qualityReport);
        }
      }

      let deskewDegrees = manualDeskew;
      let candidateOrder: Array<0 | 90 | 180 | 270> = [rotation];

      if (autoRotate) {
        throwIfScanAborted(signal);
        onProgress?.({
          stage: 'detecting_orientation',
          progress: 12,
          message: 'Detecting document rotation & skew angle…',
        });

        let smallGray: GrayscaleBuffer | null = null;
        if (useWorker) {
          smallGray = await this.preprocessWorker.sampleDownscaledGrayscale(
            workingSurface,
            400,
            signal
          );
          if (smallGray) usedWorkerPreprocessing = true;
        }
        if (!smallGray) {
          smallGray = sampleDownscaledGrayscale(workingSurface, 400);
        }

        throwIfScanAborted(signal);
        const orient = analyzeDocumentOrientation(
          smallGray.data,
          smallGray.width,
          smallGray.height
        );
        deskewDegrees = orient.deskewDegrees;
        candidateOrder = orient.rankedCoarseRotations;
      }

      let barcodeData: BarcodeParsedData | null = null;
      if (enableBarcodePass) {
        throwIfScanAborted(signal);
        onProgress?.({
          stage: 'detecting_barcode',
          progress: 14,
          message: 'Scanning for 2D PDF417 / AAMVA barcode…',
        });
        barcodeData = await detectPdf417Barcode(workingSurface, {
          coarseRotation: candidateOrder[0],
          signal,
        });
      }

      throwIfScanAborted(signal);
      const worker = await this.ensureWorker(
        vizStrategy.primaryLanguage,
        workerConfig,
        onProgress,
        signal
      );

      let bestPass = await this.runOrientationPass(
        workingSurface,
        worker,
        workerConfig,
        candidateOrder[0],
        deskewDegrees,
        preprocess,
        enhanceMrzPass,
        useWorker,
        onProgress,
        true,
        signal
      );
      if (bestPass.usedWorkerPreprocess) usedWorkerPreprocessing = true;

      if (autoRotate && !bestPass.isConfidentUpright && !barcodeData?.aamva) {
        let bestProbeRot = bestPass.coarse;
        let bestProbeScore = bestPass.probeScore;

        for (let idx = 1; idx < candidateOrder.length; idx++) {
          throwIfScanAborted(signal);
          const rot = candidateOrder[idx];
          onProgress?.({
            stage: 'detecting_orientation',
            progress: 75 + idx * 2,
            message: `Checking ${rot}° orientation alignment…`,
          });

          const probe = await this.runLightweightProbe(
            workingSurface,
            worker,
            rot,
            deskewDegrees,
            preprocess,
            useWorker,
            signal
          );
          if (probe.viaWorker) usedWorkerPreprocessing = true;

          if (probe.score > bestProbeScore) {
            bestProbeScore = probe.score;
            bestProbeRot = rot;
            if (probe.score >= 240) {
              break;
            }
          }
        }

        if (bestProbeRot !== bestPass.coarse) {
          throwIfScanAborted(signal);
          bestPass = await this.runOrientationPass(
            workingSurface,
            worker,
            workerConfig,
            bestProbeRot,
            deskewDegrees,
            preprocess,
            enhanceMrzPass,
            useWorker,
            onProgress,
            false,
            signal
          );
          if (bestPass.usedWorkerPreprocess) usedWorkerPreprocessing = true;
        }
      }

      throwIfScanAborted(signal);

      const { preprocessed, mrzData, mrzRawText, mrzModelUsed } = bestPass;
      let cleanedFullText = bestPass.cleanedFullText;
      let vizData = bestPass.vizData;
      let activeVizLineBoxes = bestPass.vizLineBoxes;
      let confidence = bestPass.confidence;
      let activeVizLanguage = vizStrategy.primaryLanguage;
      const effectiveVizMode: VizLanguageMode = vizStrategy.effectiveMode;

      if (vizStrategy.allowAutoFollowUp) {
        const targetNativeLang = resolveNativeVizLanguage({
          issuingCountry:
            mrzData?.issuingCountry ??
            barcodeData?.aamva?.issuingCountry ??
            vizData.issuingCountry,
          nationality: mrzData?.nationality ?? vizData.nationality,
          rawText: cleanedFullText,
          customMap: workerConfig.vizLanguageMap,
          baseLanguage: vizStrategy.primaryLanguage,
        });

        if (targetNativeLang) {
          const nativeWorker = await this.ensureNativeVizWorker(
            targetNativeLang,
            workerConfig,
            onProgress,
            signal
          );

          if (nativeWorker) {
            try {
              throwIfScanAborted(signal);
              this.activeStage = 'recognizing_viz_native';
              onProgress?.({
                stage: 'recognizing_viz_native',
                progress: 85,
                message: `Running native-script VIZ pass (${targetNativeLang})…`,
              });

              await raceWithAbort(
                nativeWorker.setParameters({
                  tessedit_pageseg_mode: PSM.SPARSE_TEXT,
                  tessedit_char_whitelist: '',
                }),
                signal,
                () => this.abortInFlightWorkers()
              );

              const fullInputUrl = preprocess
                ? preprocessed.enhancedDataUrl
                : preprocessed.originalDataUrl;
              let nativeResult = await raceWithAbort(
                nativeWorker.recognize(fullInputUrl, {}, { blocks: true }),
                signal,
                () => this.abortInFlightWorkers()
              );
              let nativeText = nativeResult.data.text || '';
              let nativeConfidence = nativeResult.data.confidence || 0;

              if (nativeText.trim().split(/\r?\n/).filter(Boolean).length < 2) {
                throwIfScanAborted(signal);
                await raceWithAbort(
                  nativeWorker.setParameters({
                    tessedit_pageseg_mode: PSM.AUTO,
                    tessedit_char_whitelist: '',
                  }),
                  signal,
                  () => this.abortInFlightWorkers()
                );
                const autoNative = await raceWithAbort(
                  nativeWorker.recognize(fullInputUrl, {}, { blocks: true }),
                  signal,
                  () => this.abortInFlightWorkers()
                );
                if ((autoNative.data.text || '').trim().length > nativeText.trim().length) {
                  nativeResult = autoNative;
                  nativeText = autoNative.data.text || '';
                  nativeConfidence = autoNative.data.confidence || 0;
                }
              }

              const nativeBoxes = extractVizLineBoxes(nativeResult.data.blocks);
              const cleanedNativeText =
                nativeBoxes.length > 0 ? nativeBoxes.map((b) => b.text).join('\n') : nativeText;
              const nativeVizData = parseVizText(cleanedNativeText, nativeBoxes);

              vizData = mergeVizData(vizData, confidence, nativeVizData, nativeConfidence);
              if (
                nativeConfidence >= confidence - 2 ||
                countPopulatedVizFields(nativeVizData) >= countPopulatedVizFields(bestPass.vizData)
              ) {
                cleanedFullText = cleanedNativeText || cleanedFullText;
                if (nativeBoxes.length > 0) {
                  activeVizLineBoxes = nativeBoxes;
                }
              }
              confidence = Math.max(confidence, nativeConfidence);
              activeVizLanguage = targetNativeLang;
            } catch (err) {
              if (isScanAbortedError(err)) throw err;
            }
          }
        }
      }

      throwIfScanAborted(signal);

      onProgress?.({
        stage: 'parsing',
        progress: 94,
        message: 'Cropping portrait & signature, validating MRZ/VIZ & watermarks…',
      });

      const documentType = inferDocumentType(mrzData, barcodeData, vizData.documentTypeHint);
      const crossValidation = crossValidateMrzAndViz(mrzData, vizData);

      let portraitRegion: CroppedRegionInfo | null = null;
      let signatureRegion: CroppedRegionInfo | null = null;
      let watermarkProbeCanvas: HTMLCanvasElement | null = null;

      if (extractPortrait || extractSignature || detectSpecimen) {
        const media = await raceWithAbort(
          extractPortraitAndSignature(preprocessed.originalDataUrl, {
            documentType,
            mrz: mrzData,
            barcode: barcodeData,
            vizLineBoxes: activeVizLineBoxes,
            extractPortrait,
            extractSignature,
            checkColoredWatermark: detectSpecimen,
          }),
          signal
        );
        portraitRegion = media.portrait;
        signatureRegion = media.signature;
        watermarkProbeCanvas = media.watermarkProbeCanvas ?? null;
      }

      throwIfScanAborted(signal);

      let specimenResult: SpecimenDetectionResult | undefined;
      if (detectSpecimen) {
        specimenResult = detectSpecimenWatermark({
          rawOcrText: cleanedFullText,
          rawMrzText: mrzRawText,
          mrz: mrzData,
          viz: vizData,
          barcode: barcodeData,
          unmappedFields: vizData.unmappedKeyValues,
        });

        // If no watermark found in main OCR text and a red/colored stamp overlay was spotted,
        // run a fast deskewed stamp-mask OCR check on the already-warm worker.
        if (!specimenResult.isSpecimen && watermarkProbeCanvas) {
          try {
            throwIfScanAborted(signal);
            await raceWithAbort(
              worker.setParameters({
                tessedit_pageseg_mode: PSM.SPARSE_TEXT,
                tessedit_char_whitelist: '',
              }),
              signal,
              () => this.abortInFlightWorkers()
            );
            const stampRes = await raceWithAbort(
              worker.recognize(watermarkProbeCanvas),
              signal,
              () => this.abortInFlightWorkers()
            );
            const stampText = stampRes.data.text || '';
            if (stampText.trim()) {
              specimenResult = detectSpecimenWatermark({
                rawOcrText: cleanedFullText,
                rawMrzText: mrzRawText,
                mrz: mrzData,
                viz: vizData,
                barcode: barcodeData,
                unmappedFields: vizData.unmappedKeyValues,
                watermarkOcrText: stampText,
              });
            }
          } catch (err) {
            if (isScanAbortedError(err)) throw err;
          }
        }
      }

      const aamva = barcodeData?.aamva ?? null;
      const fieldSources: Record<string, FieldSource> = {};

      const issuingCountry = pickField(
        mrzData?.issuingCountry,
        vizData.issuingCountry,
        'issuingCountry',
        fieldSources,
        aamva?.issuingCountry
      );
      const nationality = pickField(
        mrzData?.nationality,
        vizData.nationality,
        'nationality',
        fieldSources
      );

      const surname = pickSingleSideName(
        mrzData?.surname,
        aamva?.surname,
        vizData.surname,
        'surname',
        fieldSources
      );
      const surnames =
        surname && mrzData?.surname && surname !== mrzData.surname
          ? surname.split(/\s+/).filter(Boolean)
          : mrzData?.surnames && mrzData.surnames.length > 0
            ? mrzData.surnames
            : aamva?.surnames && aamva.surnames.length > 0
              ? aamva.surnames
              : vizData.surnames.length > 0
                ? vizData.surnames
                : surname
                  ? surname.split(/\s+/).filter(Boolean)
                  : [];

      const givenNames = pickSingleSideName(
        mrzData?.givenNames,
        aamva?.givenNames,
        vizData.givenNames,
        'givenNames',
        fieldSources
      );
      const givenNamesList =
        givenNames && mrzData?.givenNames && givenNames !== mrzData.givenNames
          ? givenNames.split(/\s+/).filter(Boolean)
          : mrzData?.givenNamesList && mrzData.givenNamesList.length > 0
            ? mrzData.givenNamesList
            : aamva?.givenNamesList && aamva.givenNamesList.length > 0
              ? aamva.givenNamesList
              : givenNames
                ? givenNames.split(/\s+/).filter(Boolean)
                : [];

      const fullName =
        givenNames || surname
          ? [givenNames, surname].filter(Boolean).join(' ')
          : pickField(null, vizData.fullName, 'fullName', fieldSources, aamva?.fullName);
      if (fullName && !fieldSources.fullName) {
        fieldSources.fullName =
          fieldSources.givenNames === 'MRZ+VIZ' || fieldSources.surname === 'MRZ+VIZ'
            ? 'MRZ+VIZ'
            : fieldSources.givenNames === 'BARCODE+VIZ' || fieldSources.surname === 'BARCODE+VIZ'
              ? 'BARCODE+VIZ'
              : fieldSources.givenNames ?? fieldSources.surname ?? 'VIZ';
      }

      const documentNumber = reconcileDocumentNumber(
        mrzData,
        aamva?.documentNumber,
        vizData.documentNumber,
        fieldSources
      );

      const mrzPersonal =
        mrzData && (mrzData.optionalData1 || mrzData.optionalData2)
          ? [mrzData.optionalData1, mrzData.optionalData2].filter(Boolean).join(' ')
          : null;
      const personalNumber = pickField(
        mrzPersonal,
        vizData.personalNumber,
        'personalNumber',
        fieldSources,
        aamva?.documentDiscriminator
      );

      const dateOfBirth = pickField(
        mrzData?.dateOfBirth,
        vizData.dateOfBirth,
        'dateOfBirth',
        fieldSources,
        aamva?.dateOfBirth
      );
      const dateOfExpiry = pickField(
        mrzData?.dateOfExpiry,
        vizData.dateOfExpiry,
        'dateOfExpiry',
        fieldSources,
        aamva?.dateOfExpiry
      );
      const dateOfIssue = pickField(
        null,
        vizData.dateOfIssue,
        'dateOfIssue',
        fieldSources,
        aamva?.dateOfIssue
      );

      const sexValue =
        mrzData?.sex && mrzData.sex !== 'Unspecified'
          ? (mrzData.sex as 'M' | 'F' | 'X')
          : aamva?.sex ?? vizData.sex ?? 'Unspecified';
      if (mrzData?.sex && mrzData.sex !== 'Unspecified' && vizData.sex) {
        fieldSources.sex = 'MRZ+VIZ';
      } else if (mrzData?.sex && mrzData.sex !== 'Unspecified') {
        fieldSources.sex = 'MRZ';
      } else if (aamva?.sex) {
        fieldSources.sex = vizData.sex ? 'BARCODE+VIZ' : 'BARCODE';
      } else if (vizData.sex) {
        fieldSources.sex = 'VIZ';
      }

      const placeOfBirth = pickField(null, vizData.placeOfBirth, 'placeOfBirth', fieldSources);
      const address = pickField(null, vizData.address, 'address', fieldSources, aamva?.address);
      const parents = pickField(null, vizData.parents, 'parents', fieldSources);
      const issuingAuthority = pickField(
        null,
        vizData.issuingAuthority,
        'issuingAuthority',
        fieldSources,
        aamva?.jurisdictionName ? `${aamva.jurisdictionName} DMV / Licensing` : null
      );
      const licenseClass = pickField(
        null,
        vizData.licenseClass,
        'licenseClass',
        fieldSources,
        aamva?.licenseClass
      );
      const restrictions = pickField(
        null,
        vizData.restrictions,
        'restrictions',
        fieldSources,
        aamva?.restrictions
      );
      const endorsements = pickField(
        null,
        vizData.endorsements,
        'endorsements',
        fieldSources,
        aamva?.endorsements
      );
      const height = pickField(null, vizData.height, 'height', fieldSources, aamva?.height);
      const eyeColor = pickField(null, vizData.eyeColor, 'eyeColor', fieldSources, aamva?.eyeColor);
      const hairColor = pickField(
        null,
        vizData.hairColor,
        'hairColor',
        fieldSources,
        aamva?.hairColor
      );

      const age = computeAge(dateOfBirth);
      if (age !== null) fieldSources.age = 'COMPUTED';

      const isExpired = computeIsExpired(dateOfExpiry);
      if (isExpired !== null) fieldSources.isExpired = 'COMPUTED';

      const issuingCountryName = resolveCountryName(issuingCountry);
      const nationalityName = resolveCountryName(nationality) ?? nationality;
      const processingTimeMs = Math.round(performance.now() - startTime);

      const orientation: OrientationInfo = {
        coarseDegrees: bestPass.coarse,
        deskewDegrees,
        totalDegrees: normalizeDegrees360(bestPass.coarse + deskewDegrees),
        autoDetected: autoRotate,
      };

      const finalConfidence = aamva ? Math.max(Math.round(confidence), 94) : Math.round(confidence);

      onProgress?.({
        stage: 'complete',
        progress: 100,
        message: 'Scan complete',
      });

      return {
        documentType,
        documentFormat: mrzData
          ? mrzData.format
          : aamva
            ? 'AAMVA_PDF417'
            : barcodeData
              ? 'PDF417'
              : 'VISUAL_ONLY',
        issuingCountry,
        issuingCountryName,
        documentNumber,
        personalNumber,
        surname,
        surnames,
        givenNames,
        givenNamesList,
        fullName,
        nationality,
        nationalityName,
        dateOfBirth,
        age,
        sex: sexValue,
        dateOfIssue,
        dateOfExpiry,
        isExpired,
        placeOfBirth,
        address,
        parents,
        issuingAuthority,
        licenseClass,
        restrictions,
        endorsements,
        height,
        eyeColor,
        hairColor,
        mrz: mrzData,
        barcode: barcodeData,
        portraitDataUrl: extractPortrait ? (portraitRegion?.dataUrl ?? null) : undefined,
        portraitRegion: extractPortrait ? portraitRegion : undefined,
        signatureDataUrl: extractSignature ? (signatureRegion?.dataUrl ?? null) : undefined,
        signatureRegion: extractSignature ? signatureRegion : undefined,
        specimen: detectSpecimen ? specimenResult : undefined,
        crossValidation,
        mrzModel: mrzModelUsed,
        vizLanguageMode: effectiveVizMode,
        vizLanguage: activeVizLanguage,
        workerPreprocessed: usedWorkerPreprocessing,
        unmappedFields: vizData.unmappedKeyValues,
        fieldSources,
        rawOcrText: cleanedFullText.trim(),
        rawMrzText: mrzRawText,
        confidence: finalConfidence,
        processingTimeMs,
        sourceDimensions: {
          width: preprocessed.width,
          height: preprocessed.height,
        },
        orientation,
        perspective: perspectiveInfo,
        quality: includeQualityReport ? qualityReport : undefined,
        previews: includePreviews
          ? {
              originalDataUrl: preprocessed.originalDataUrl,
              enhancedDataUrl: preprocessed.enhancedDataUrl,
              mrzCropDataUrl: preprocessed.mrzCropDataUrl,
            }
          : undefined,
      };
    } finally {
      if (warpedBitmap && warpedBitmap !== ownedBitmap) {
        try {
          warpedBitmap.close();
        } catch {
          // Ignore already-closed bitmaps
        }
      }
      if (ownedBitmap) {
        try {
          ownedBitmap.close();
        } catch {
          // Ignore already-closed bitmaps
        }
      }
    }
  }

  async scanPair(
    front: ImageInput,
    back: ImageInput,
    options: PairScanOptions = {}
  ): Promise<MergedDocumentResult> {
    const { frontOptions, backOptions, onProgress, signal, ...shared } = options;

    throwIfScanAborted(signal);

    const frontResult = await this.scan(front, {
      ...shared,
      ...frontOptions,
      signal: frontOptions?.signal ?? signal,
      onProgress: scaleProgressCallback(0, 48, onProgress, 'Front'),
    });

    throwIfScanAborted(signal);

    const backResult = await this.scan(back, {
      ...shared,
      ...backOptions,
      signal: backOptions?.signal ?? signal,
      onProgress: scaleProgressCallback(50, 46, onProgress, 'Back'),
    });

    throwIfScanAborted(signal);

    onProgress?.({
      stage: 'parsing',
      progress: 98,
      message: 'Merging front & back fields and verifying consistency…',
    });

    const merged = mergeDocumentSides(frontResult, backResult);

    onProgress?.({
      stage: 'complete',
      progress: 100,
      message: 'Two-sided scan complete',
    });

    return merged;
  }

  async terminate(): Promise<void> {
    this.preprocessWorker.terminate();
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
      this.workerLang = null;
      this.workerConfigKey = null;
    }
    if (this.vizNativeWorker) {
      await this.vizNativeWorker.terminate();
      this.vizNativeWorker = null;
      this.vizNativeLang = null;
      this.vizNativeConfigKey = null;
    }
    this.vizNativeFailedLangs.clear();
    if (this.mrzWorker) {
      await this.mrzWorker.terminate();
      this.mrzWorker = null;
      this.mrzWorkerConfigKey = null;
    }
    this.mrzOcrbFailed = false;
  }
}

export async function scanDocumentImage(
  input: ImageInput,
  options: ScannerOptions = {}
): Promise<ExtractedIdentity> {
  const scanner = new DocumentScanner({
    workerPath: options.workerPath,
    corePath: options.corePath,
    langPath: options.langPath,
    workerBlobURL: options.workerBlobURL,
    useWorkerPreprocessing: options.useWorkerPreprocessing,
    mrzModel: options.mrzModel,
    mrzLanguage: options.mrzLanguage,
    mrzLangPath: options.mrzLangPath,
    mrzGzip: options.mrzGzip,
    vizLanguageMode: options.vizLanguageMode,
    vizLanguages: options.vizLanguages,
    vizLanguageMap: options.vizLanguageMap,
  });
  try {
    return await scanner.scan(input, options);
  } finally {
    await scanner.terminate();
  }
}

export async function scanDocumentPair(
  front: ImageInput,
  back: ImageInput,
  options: PairScanOptions = {}
): Promise<MergedDocumentResult> {
  const scanner = new DocumentScanner({
    workerPath: options.workerPath,
    corePath: options.corePath,
    langPath: options.langPath,
    workerBlobURL: options.workerBlobURL,
    useWorkerPreprocessing: options.useWorkerPreprocessing,
    mrzModel: options.mrzModel,
    mrzLanguage: options.mrzLanguage,
    mrzLangPath: options.mrzLangPath,
    mrzGzip: options.mrzGzip,
    vizLanguageMode: options.vizLanguageMode,
    vizLanguages: options.vizLanguages,
    vizLanguageMap: options.vizLanguageMap,
  });
  try {
    return await scanner.scanPair(front, back, options);
  } finally {
    await scanner.terminate();
  }
}
