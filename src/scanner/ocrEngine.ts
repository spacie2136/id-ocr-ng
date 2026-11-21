import { createWorker, PSM, type Block, type Symbol as TessSymbol, type Worker } from 'tesseract.js';
import { resolveCountryName } from './countries';
import { preprocessDocumentImage } from './imagePreprocessor';
import { parseMrzFromText } from './mrzParser';
import type {
  DocumentType,
  ExtractedIdentity,
  FieldSource,
  GrayscaleBuffer,
  ImageInput,
  MrzParsedData,
  ScanProgress,
  ScannerOptions,
  VizLineBox,
} from './types';
import { parseVizText } from './vizParser';

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
  return vizHint ?? 'unknown';
}

function pickField<T>(
  mrzVal: T | null | undefined,
  vizVal: T | null | undefined,
  fieldKey: string,
  sources: Record<string, FieldSource>
): T | null {
  const hasMrz = mrzVal !== null && mrzVal !== undefined && String(mrzVal).trim() !== '';
  const hasViz = vizVal !== null && vizVal !== undefined && String(vizVal).trim() !== '';

  if (hasMrz && hasViz) {
    sources[fieldKey] = 'MRZ+VIZ';
    return mrzVal as T;
  }
  if (hasMrz) {
    sources[fieldKey] = 'MRZ';
    return mrzVal as T;
  }
  if (hasViz) {
    sources[fieldKey] = 'VIZ';
    return vizVal as T;
  }
  return null;
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
  vizDocNum: string | null,
  sources: Record<string, FieldSource>
): string | null {
  if (mrz?.documentNumber && vizDocNum) {
    const docCheck = mrz.checkDigits.find((c) => c.field === 'documentNumber');
    const mrzNorm = mrz.documentNumber.trim().toUpperCase();
    const vizNorm = vizDocNum.trim().toUpperCase();
    // If MRZ document check digit failed (e.g. specimen mismatch or B/8 ambiguity)
    // and VIZ matches length & confusable skeleton, prefer the crisp VIZ reading
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
  return pickField(mrz?.documentNumber, vizDocNum, 'documentNumber', sources);
}

/**
 * Extracts spatial VIZ line boxes from Tesseract blocks while stitching
 * tiny intra-word gaps caused by card watermarks (e.g. "MUND INGEN" -> "MUNDINGEN")
 * and horizontally split DD.MM + YYYY date fragments on the same row.
 */
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
                /^[A-ZÄÖÜÑ]{2,}$/.test(prevText) && /^[A-ZÄÖÜÑ]{2,}$/.test(wText);
              // Join split word fragments when gap is smaller than an actual word space (~1.02 char width)
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

  // Rejoin split DD.MM + YYYY date fragments placed in adjacent paragraphs on the same row
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
    d(0, 0) <= 0.22 &&
    d(2, 0) <= 0.22 &&
    d(1, 0) >= 0.48 &&
    d(1, 2) <= 0.22 &&
    d(0, 2) >= 0.35 &&
    d(2, 2) >= 0.35;

  const hasCenterStem = d(0, 1) >= 0.35 && d(1, 1) >= 0.5 && d(2, 1) >= 0.35;
  // OCR-B '1' has a left-pointing top serif that shifts the vertical stem into col 2
  const hasRightStem =
    d(0, 2) >= 0.55 && d(1, 2) >= 0.65 && d(2, 2) >= 0.55 && d(1, 0) <= 0.15 && d(2, 0) <= 0.15;
  const isThinBar = gw <= gh * 0.48 && (hasCenterStem || hasRightStem);

  // '9' has a wide closed top loop (hollow center) + open lower corners + bottom-center tail,
  // distinguishing it cleanly from narrow solid-stem 'I' or '1'.
  const isNine =
    gw >= gh * 0.54 &&
    d(1, 1) <= 0.5 &&
    d(0, 0) >= 0.4 &&
    d(0, 2) >= 0.4 &&
    d(1, 2) >= 0.45 &&
    d(2, 0) <= 0.25 &&
    d(2, 2) <= 0.25 &&
    d(2, 1) >= 0.4;

  // 'Z' has full top and bottom horizontal bars + diagonal center, with open mid-left and mid-right
  const isZee =
    gw >= gh * 0.48 &&
    d(0, 1) >= 0.38 &&
    d(0, 2) >= 0.38 &&
    d(1, 0) <= 0.28 &&
    d(1, 2) <= 0.22 &&
    d(1, 1) >= 0.30 &&
    d(2, 0) >= 0.38 &&
    d(2, 1) >= 0.30 &&
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
  // Stay strictly inside Tesseract's line bbox and require >=2 vertical ink pixels
  // per column so stray 1px background dots never shift the 44-col MRZ pitch.
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

        // If Tesseract emits a phantom overlapping symbol (e.g. K) on a chevron glyph,
        // collapse the entire overlapping span to a single '<'
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

      // Some synthetic specimens print 45 glyphs per TD3 line instead of 44;
      // align to 45 columns when both lines already show 45 repaired symbols.
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
          // 0.36 pitch half-width isolates each glyph cell without bleeding into neighboring glyphs
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

export class DocumentScanner {
  private worker: Worker | null = null;
  private workerLang: string | null = null;
  private activeStageCallback: ((p: ScanProgress) => void) | null = null;
  private activeStage: ScanProgress['stage'] = 'initializing_ocr';

  private async ensureWorker(
    language: string,
    onProgress?: (p: ScanProgress) => void
  ): Promise<Worker> {
    this.activeStageCallback = onProgress ?? null;

    if (this.worker && this.workerLang === language) {
      return this.worker;
    }

    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
    }

    this.activeStage = 'initializing_ocr';
    onProgress?.({
      stage: 'initializing_ocr',
      progress: 12,
      message: 'Initializing client-side Tesseract OCR engine…',
    });

    const worker = await createWorker(
      language,
      1,
      {
        logger: (info) => {
          if (!this.activeStageCallback) return;
          if (info.status === 'recognizing text') {
            const base = this.activeStage === 'recognizing_full' ? 25 : 65;
            const span = this.activeStage === 'recognizing_full' ? 35 : 25;
            const pct = Math.round(base + (info.progress || 0) * span);
            this.activeStageCallback({
              stage: this.activeStage,
              progress: pct,
              message:
                this.activeStage === 'recognizing_full'
                  ? 'Reading document text & visual inspection zone…'
                  : 'Running high-contrast MRZ strip verification…',
            });
          }
        },
      },
      {
        load_system_dawg: '0',
        load_freq_dawg: '0',
      }
    );

    this.worker = worker;
    this.workerLang = language;
    return worker;
  }

  async scan(input: ImageInput, options: ScannerOptions = {}): Promise<ExtractedIdentity> {
    const startTime = performance.now();
    const {
      language = 'eng',
      preprocess = true,
      enhanceMrzPass = true,
      rotation = 0,
      includePreviews = true,
      onProgress,
    } = options;

    onProgress?.({
      stage: 'preprocessing',
      progress: 5,
      message: 'Preprocessing image & isolating MRZ region…',
    });

    const preprocessed = await preprocessDocumentImage(input, { preprocess, rotation });
    const worker = await this.ensureWorker(language, onProgress);

    this.activeStage = 'recognizing_full';
    onProgress?.({
      stage: 'recognizing_full',
      progress: 25,
      message: 'Reading document text & visual inspection zone…',
    });

    await worker.setParameters({
      tessedit_pageseg_mode: PSM.SPARSE_TEXT,
      tessedit_char_whitelist: '',
    });

    const fullInputUrl = preprocess
      ? preprocessed.enhancedDataUrl
      : preprocessed.originalDataUrl;
    let fullResult = await worker.recognize(fullInputUrl, {}, { blocks: true });
    let fullText = fullResult.data.text || '';
    let fullConfidence = fullResult.data.confidence || 0;

    if (fullText.trim().split(/\r?\n/).filter(Boolean).length < 2) {
      await worker.setParameters({
        tessedit_pageseg_mode: PSM.AUTO,
        tessedit_char_whitelist: '',
      });
      const autoResult = await worker.recognize(fullInputUrl, {}, { blocks: true });
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

    if (enhanceMrzPass) {
      this.activeStage = 'recognizing_mrz';
      onProgress?.({
        stage: 'recognizing_mrz',
        progress: 65,
        message: 'Running high-contrast MRZ strip verification…',
      });

      await worker.setParameters({
        tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<',
      });

      const runMrzStrip = async (stripUrl: string, stripGray: GrayscaleBuffer) => {
        const mrzResult = await worker.recognize(stripUrl, {}, { blocks: true });
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
        onProgress?.({
          stage: 'recognizing_mrz',
          progress: 80,
          message: 'Isolating lower passport MRZ band…',
        });
        await runMrzStrip(preprocessed.mrzTightCropDataUrl, preprocessed.mrzTightGrayscale);
      }
    }

    onProgress?.({
      stage: 'parsing',
      progress: 92,
      message: 'Extracting personal fields & verifying ICAO 9303 check digits…',
    });

    let mrzData: MrzParsedData | null = null;
    if (candidates.length > 0) {
      candidates.sort((a, b) => scoreMrzCandidate(b) - scoreMrzCandidate(a));
      mrzData = candidates[0];
    }

    const vizData = parseVizText(cleanedFullText, vizLineBoxes);
    const fieldSources: Record<string, FieldSource> = {};

    const issuingCountry = pickField(
      mrzData?.issuingCountry,
      vizData.issuingCountry,
      'issuingCountry',
      fieldSources
    );
    const nationality = pickField(
      mrzData?.nationality,
      vizData.nationality,
      'nationality',
      fieldSources
    );

    const surname = pickField(mrzData?.surname, vizData.surname, 'surname', fieldSources);
    const surnames =
      mrzData?.surnames && mrzData.surnames.length > 0
        ? mrzData.surnames
        : vizData.surnames.length > 0
          ? vizData.surnames
          : surname
            ? surname.split(/\s+/).filter(Boolean)
            : [];

    const givenNames = pickField(
      mrzData?.givenNames,
      vizData.givenNames,
      'givenNames',
      fieldSources
    );
    const givenNamesList =
      mrzData?.givenNamesList && mrzData.givenNamesList.length > 0
        ? mrzData.givenNamesList
        : givenNames
          ? givenNames.split(/\s+/).filter(Boolean)
          : [];

    const mrzFullName =
      mrzData && (mrzData.givenNames || mrzData.surname)
        ? [mrzData.givenNames, mrzData.surname].filter(Boolean).join(' ')
        : null;
    const fullName = pickField(mrzFullName, vizData.fullName, 'fullName', fieldSources);

    const documentNumber = reconcileDocumentNumber(
      mrzData,
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
      fieldSources
    );

    const dateOfBirth = pickField(
      mrzData?.dateOfBirth,
      vizData.dateOfBirth,
      'dateOfBirth',
      fieldSources
    );
    const dateOfExpiry = pickField(
      mrzData?.dateOfExpiry,
      vizData.dateOfExpiry,
      'dateOfExpiry',
      fieldSources
    );
    const dateOfIssue = pickField(null, vizData.dateOfIssue, 'dateOfIssue', fieldSources);

    const sexValue =
      mrzData?.sex && mrzData.sex !== 'Unspecified'
        ? (mrzData.sex as 'M' | 'F' | 'X')
        : vizData.sex ?? 'Unspecified';
    if (mrzData?.sex && mrzData.sex !== 'Unspecified' && vizData.sex) {
      fieldSources.sex = 'MRZ+VIZ';
    } else if (mrzData?.sex && mrzData.sex !== 'Unspecified') {
      fieldSources.sex = 'MRZ';
    } else if (vizData.sex) {
      fieldSources.sex = 'VIZ';
    }

    const placeOfBirth = pickField(null, vizData.placeOfBirth, 'placeOfBirth', fieldSources);
    const address = pickField(null, vizData.address, 'address', fieldSources);
    const parents = pickField(null, vizData.parents, 'parents', fieldSources);
    const issuingAuthority = pickField(
      null,
      vizData.issuingAuthority,
      'issuingAuthority',
      fieldSources
    );
    const licenseClass = pickField(null, vizData.licenseClass, 'licenseClass', fieldSources);
    const restrictions = pickField(null, vizData.restrictions, 'restrictions', fieldSources);
    const endorsements = pickField(null, vizData.endorsements, 'endorsements', fieldSources);
    const height = pickField(null, vizData.height, 'height', fieldSources);
    const eyeColor = pickField(null, vizData.eyeColor, 'eyeColor', fieldSources);
    const hairColor = pickField(null, vizData.hairColor, 'hairColor', fieldSources);

    const age = computeAge(dateOfBirth);
    if (age !== null) fieldSources.age = 'COMPUTED';

    const isExpired = computeIsExpired(dateOfExpiry);
    if (isExpired !== null) fieldSources.isExpired = 'COMPUTED';

    const documentType = inferDocumentType(mrzData, vizData.documentTypeHint);
    const issuingCountryName = resolveCountryName(issuingCountry);
    const nationalityName = resolveCountryName(nationality) ?? nationality;

    const processingTimeMs = Math.round(performance.now() - startTime);

    onProgress?.({
      stage: 'complete',
      progress: 100,
      message: 'Scan complete',
    });

    return {
      documentType,
      documentFormat: mrzData ? mrzData.format : 'VISUAL_ONLY',
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
      unmappedFields: vizData.unmappedKeyValues,
      fieldSources,
      rawOcrText: cleanedFullText.trim(),
      rawMrzText: mrzRawText,
      confidence: Math.round(fullConfidence),
      processingTimeMs,
      sourceDimensions: {
        width: preprocessed.width,
        height: preprocessed.height,
      },
      previews: includePreviews
        ? {
            originalDataUrl: preprocessed.originalDataUrl,
            enhancedDataUrl: preprocessed.enhancedDataUrl,
            mrzCropDataUrl: preprocessed.mrzCropDataUrl,
          }
        : undefined,
    };
  }

  async terminate(): Promise<void> {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
      this.workerLang = null;
    }
  }
}

export async function scanDocumentImage(
  input: ImageInput,
  options: ScannerOptions = {}
): Promise<ExtractedIdentity> {
  const scanner = new DocumentScanner();
  try {
    return await scanner.scan(input, options);
  } finally {
    await scanner.terminate();
  }
}
