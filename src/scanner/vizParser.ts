import type { DocumentType, VizLineBox, VizParsedData } from './types';

const MONTHS: Record<string, string> = {
  JAN: '01',
  FEB: '02',
  MAR: '03',
  APR: '04',
  MAY: '05',
  JUN: '06',
  JUL: '07',
  AUG: '08',
  SEP: '09',
  SEPT: '09',
  OCT: '10',
  NOV: '11',
  DEC: '12',
  JANV: '01',
  FEV: '02',
  FEVR: '02',
  AVR: '04',
  MAI: '05',
  JUIN: '06',
  JUIL: '07',
  AOUT: '08',
  DECEMB: '12',
  MRZ: '03',
  OKT: '10',
  DEZ: '12',
  ENE: '01',
  ABR: '04',
  AGO: '08',
  DIC: '12',
};

export function normalizeVisualDate(raw: string): string | null {
  if (!raw) return null;
  const cleaned = raw
    .toUpperCase()
    .replace(/\s+/g, ' ')
    .trim();

  let m = cleaned.match(/\b((?:19|20)\d{2})[-./](\d{1,2})[-./](\d{1,2})\b/);
  if (m) {
    const [, y, mo, d] = m;
    if (+mo >= 1 && +mo <= 12 && +d >= 1 && +d <= 31) {
      return `${y}-${mo.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }
  }

  m = cleaned.match(/\b(\d{1,2})\s+([A-Z]{3,5})(?:\/[A-Z]{2,5})?\s+((?:19|20)\d{2})\b/);
  if (m) {
    const [, d, mon, y] = m;
    const monthNum = MONTHS[mon];
    if (monthNum && +d >= 1 && +d <= 31) {
      return `${y}-${monthNum}-${d.padStart(2, '0')}`;
    }
  }

  m = cleaned.match(/\b([A-Z]{3,5})\s+(\d{1,2}),?\s+((?:19|20)\d{2})\b/);
  if (m) {
    const [, mon, d, y] = m;
    const monthNum = MONTHS[mon];
    if (monthNum && +d >= 1 && +d <= 31) {
      return `${y}-${monthNum}-${d.padStart(2, '0')}`;
    }
  }

  m = cleaned.match(/\b(\d{1,2})(?:[-./]|\s+)(\d{1,2})(?:[-./]|\s+)((?:19|20)\d{2})\b/);
  if (m) {
    const a = parseInt(m[1], 10);
    const b = parseInt(m[2], 10);
    const y = m[3];
    if (a > 12 && b >= 1 && b <= 12 && a <= 31) {
      return `${y}-${String(b).padStart(2, '0')}-${String(a).padStart(2, '0')}`;
    }
    if (b > 12 && a >= 1 && a <= 12 && b <= 31) {
      return `${y}-${String(a).padStart(2, '0')}-${String(b).padStart(2, '0')}`;
    }
    if (a >= 1 && a <= 31 && b >= 1 && b <= 12) {
      return `${y}-${String(b).padStart(2, '0')}-${String(a).padStart(2, '0')}`;
    }
  }

  // Handle 2-digit year dates like DD.MM.YY (common on German ID card back)
  m = cleaned.match(/\b(\d{1,2})[-./](\d{1,2})[-./](\d{2})\b/);
  if (m) {
    const d = parseInt(m[1], 10);
    const mo = parseInt(m[2], 10);
    const yy = parseInt(m[3], 10);
    if (mo >= 1 && mo <= 12 && d >= 1 && d <= 31) {
      const fullYear = yy <= 40 ? 2000 + yy : 1900 + yy;
      return `${fullYear}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    }
  }

  return null;
}

function extractAllDatesFromText(text: string): string[] {
  const results: string[] = [];
  const patterns = [
    /\b(?:19|20)\d{2}[-./]\d{1,2}[-./]\d{1,2}\b/g,
    /\b\d{1,2}\s+[A-Za-z]{3,5}(?:\/[A-Za-z]{2,5})?\s+(?:19|20)\d{2}\b/g,
    /\b[A-Za-z]{3,5}\s+\d{1,2},?\s+(?:19|20)\d{2}\b/g,
    /\b\d{1,2}(?:[-./]|\s+)\d{1,2}(?:[-./]|\s+)(?:19|20)\d{2}\b/g,
  ];
  for (const p of patterns) {
    const matches = text.match(p);
    if (matches) {
      for (const raw of matches) {
        const iso = normalizeVisualDate(raw);
        if (iso && !results.includes(iso)) {
          results.push(iso);
        }
      }
    }
  }
  return results;
}

interface LabelRule {
  field: keyof Pick<
    VizParsedData,
    | 'surname'
    | 'givenNames'
    | 'fullName'
    | 'documentNumber'
    | 'personalNumber'
    | 'nationality'
    | 'issuingCountry'
    | 'dateOfBirth'
    | 'dateOfIssue'
    | 'dateOfExpiry'
    | 'sex'
    | 'placeOfBirth'
    | 'address'
    | 'parents'
    | 'issuingAuthority'
    | 'licenseClass'
    | 'restrictions'
    | 'endorsements'
    | 'height'
    | 'eyeColor'
    | 'hairColor'
  >;
  patterns: RegExp[];
}

const LABEL_RULES: LabelRule[] = [
  {
    field: 'surname',
    patterns: [
      /\b(?:primer\s*apellido|segundo\s*apellido|1er\.?\s*apellido|2[oº]\.?\s*apellido)\b/i,
      /\b(?:surname|sumarre|sumame|last\s*name|family\s*name|nom(?:\s*de\s*famille)?|familienname|nachname|apell?i?dos?|cognome|nazwisko|achternaam)\b/i,
      /^(?:1[.)]?\s*)?(?:surname|nom|name)\b/i,
    ],
  },
  {
    field: 'givenNames',
    patterns: [
      /\b(?:given\s*names?|first\s*names?|forenames?|pr[eé]noms?|vornamen?|vorname|nombres?|nome|imiona|voornamen)\b/i,
      /^(?:2[.)]?\s*)?(?:given\s*names?|first\s*name)\b/i,
    ],
  },
  {
    field: 'fullName',
    patterns: [
      /\b(?:full\s*name|holder(?:'s)?\s*name|cardholder|name\s*of\s*bearer)\b/i,
    ],
  },
  {
    field: 'documentNumber',
    patterns: [
      /\b(?:passport\s*no\.?|pasaporte\s*n[°o]?|passeport\s*n[°o]?|pass-?nr\.?|document\s*(?:no\.?|number|id)|card\s*no\.?|id\s*number|dl\s*no\.?|licen[cs]e\s*(?:no\.?|number)|no\.?\s*du\s*passeport|reisepass\s*nr|numero\s*(?:del\s*)?documento)\b/i,
      /^(?:4d|5)[.)]\s*/i,
    ],
  },
  {
    field: 'personalNumber',
    patterns: [
      /\b(?:personal\s*(?:no\.?|number|id)|national\s*(?:id|no\.?|number)|identity\s*no\.?|id\.?\s*no\.?|pesel|ssn|social\s*security|tax\s*id|cnp|dni|nif|nie|bsn|fiscal\s*code|codice\s*fiscale)\b/i,
    ],
  },
  {
    field: 'nationality',
    patterns: [
      /\b(?:nationalit[yé]|naticnalt[yé]|staatsangeh[oö]rigkeit|nacionalidad|nazionalit[aà]|obywatelstwo|citizenship)\b/i,
    ],
  },
  {
    field: 'issuingCountry',
    patterns: [
      /\b(?:issuing\s*(?:state|country)|country\s*code|state\s*of\s*issue|pays\s*[eé]metteur|c[oó]digo|cdigo|code\s*\/\s*code)\b/i,
    ],
  },
  {
    field: 'dateOfBirth',
    patterns: [
      /\b(?:date\s*of\s*birth|birth\s*date|dob|born\s*on|date\s*de\s*naissance|geburtsdatum|geburtstag|fecha\s*de\s*nacimiento|data\s*di\s*nascita|data\s*urodzenia)\b/i,
      /^(?:3)[.)]\s*/i,
    ],
  },
  {
    field: 'placeOfBirth',
    patterns: [
      /\b(?:place\s*of\s*b(?:ir|e)th|birth\s*place|birthplace|lieu\s*de\s*naissance|geburtsort|lugar\s*de\s*nacimiento|luogo\s*di\s*nascita|miejsce\s*urodzenia)\b/i,
    ],
  },
  {
    field: 'parents',
    patterns: [
      /\b(?:h[iy]j?o\s*\/?\s*a?\s*de|hijos?\s*de|parents?|filiation|nom\s*des\s*parents|imiona\s*rodzic[oó]w)\b/i,
    ],
  },
  {
    field: 'dateOfIssue',
    patterns: [
      /\b(?:date\s*of\s*issue|issue\s*date|issued(?:\s*on)?|iss|date\s*de\s*d[eé]livrance|ausstellungsdatum|fecha\s*de\s*expedici[oó]n|rilasciato\s*il|data\s*wydania|datum\s*[\/|]\s*[do]?[ao]te)\b/i,
      /^(?:4a)[.)]\s*/i,
    ],
  },
  {
    field: 'dateOfExpiry',
    patterns: [
      /\b(?:date\s*of\s*expir(?:y|ation)|expir(?:y|es|ation)(?:\s*date)?|valid\s*(?:until|thru|to)|exp|date\s*d['’]expiration|g[uü]ltig\s*bis|fecha\s*de\s*caducidad|scadenza|data\s*wa[zż]no[sś]ci)\b/i,
      /^(?:4b)[.)]\s*/i,
    ],
  },
  {
    field: 'sex',
    patterns: [/\b(?:sex|gender|sexe|geschlecht|sexo|sesso|p[lł]e[cć])\b/i],
  },
  {
    field: 'issuingAuthority',
    patterns: [
      /\b(?:authorit(?:y|ies)|issuing\s*(?:authority|office|agency)|autorit[eéa]|beh[oö]rde|behdrde|autoridad|wydany\s*przez|organ\s*wydaj[aą]cy|equipo)\b/i,
      /^(?:4c|9)[.)]\s*/i,
    ],
  },
  {
    field: 'address',
    patterns: [
      /\b(?:address|anschrift|residence|domicilio|domicile|adresse|wohnsitz|direcci[oó]n|indirizzo|adres)\b/i,
      /^(?:8)[.)]\s*/i,
    ],
  },
  {
    field: 'licenseClass',
    patterns: [
      /\b(?:class|category|categories|cat[eé]gorie|klasse|categor[ií]a)\b/i,
      /^(?:9)[.)]\s*/i,
    ],
  },
  {
    field: 'restrictions',
    patterns: [/\b(?:restrictions?|rest|conditions|auflagen)\b/i, /^(?:12)[.)]\s*/i],
  },
  {
    field: 'endorsements',
    patterns: [/\b(?:endorsements?|end)\b/i],
  },
  {
    field: 'height',
    patterns: [/\b(?:height|hgt|haigh|gr[oö][sß]e|grobe|taille|estatura|statura|wzrost)\b/i],
  },
  {
    field: 'eyeColor',
    patterns: [
      /\b(?:eye\s*colou?r|colour\s*of\s*[es]yes|augenfarbe|avgenfarbe|avg[eo]n\w*|couleur\s*des\s*yeux|covl[eo]ur\s*des\s*ye\w*|yeux|augen|ojos|occhi)\b/i,
    ],
  },
  {
    field: 'hairColor',
    patterns: [/\b(?:hair|hair\s*colou?r|cheveux|haare)\b/i],
  },
];

// Secondary non-target label headers that must be skipped and terminate column collection
const STOP_LABEL_PATTERNS: RegExp[] = [
  /\b(?:doktorgrad|doctoral\s*degr|degn?\s*ree|grade\s*de\s*docteur|ordens|rdens|oder\s*k[uü]nst|k[uü]nstlername|kinermamo|kinlenamo|kintlemamo|lername|no[em]\s+de\s+religion|rotgious|otgious|religious\s*name|stage\s*or\s*pen|nom\s*d['’]?artiste|pseudonyn|pseudonym|signature|unterschrift|firma\s*del\s*titular|holder['’]?s\s*signature)\b/i,
];

function stripMatchedLabel(line: string, patterns: RegExp[]): string {
  const colonIdx = line.indexOf(':');
  if (colonIdx !== -1 && colonIdx < 40) {
    return line.slice(colonIdx + 1).trim();
  }

  let stripped = line;
  for (const pattern of patterns) {
    const globalPat = new RegExp(
      pattern.source,
      pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`
    );
    stripped = stripped.replace(globalPat, '');
  }

  return stripped
    .replace(/^[\s/:|.\-–—]+/, '')
    .replace(/^(?:[\/|][A-Za-zÀ-ÿ\s]+)+[:\-]?\s*/, '')
    .trim();
}

function isMultilingualHeaderLine(line: string, matchedRule: LabelRule): boolean {
  if (line.includes(':')) return false;
  if (/[\/|]/.test(line) && !/\d{1,2}\/\d{1,2}/.test(line)) {
    return true;
  }
  const remainder = stripMatchedLabel(line, matchedRule.patterns);
  if (remainder.length <= 2) return true;
  if (
    (matchedRule.field === 'height' ||
      matchedRule.field === 'dateOfIssue' ||
      matchedRule.field === 'dateOfBirth' ||
      matchedRule.field === 'dateOfExpiry') &&
    !/\d/.test(remainder)
  ) {
    return true;
  }
  return false;
}

function isPureLabelLine(line: string): boolean {
  if (STOP_LABEL_PATTERNS.some((p) => p.test(line))) return true;
  return LABEL_RULES.some((rule) =>
    rule.patterns.some((p) => p.test(line) && isMultilingualHeaderLine(line, rule))
  );
}

function isAnyLabelLine(line: string): boolean {
  if (STOP_LABEL_PATTERNS.some((p) => p.test(line))) return true;
  return LABEL_RULES.some((rule) => rule.patterns.some((p) => p.test(line)));
}

function isLikelyMrzNoise(line: string): boolean {
  const compact = line.replace(/\s+/g, '');
  if (/^[A-Z0-9<]{22,}$/.test(compact) && (compact.includes('<') || /\d{5,}/.test(compact))) {
    return true;
  }
  return false;
}

function cleanVisualValue(val: string, preserveTrailingDigit = false): string {
  let out = val
    .replace(/^[\s=•·|>~_-]+/g, '')
    .replace(/\s+[*•·|>~]+$/g, '')
    .replace(/~/g, '');
  if (!preserveTrailingDigit) {
    out = out.replace(/\s+\d$/g, '');
  } else {
    // Strip watermark hyphens/dots right before house numbers while preserving "DORFSTR. 23"
    out = out
      .replace(/([A-ZÄÖÜ]{2,}STRASSE)[-.\s]+\s*(\d)/gi, '$1 $2')
      .replace(/([A-ZÄÖÜ]{3,})[-~]\s+(\d)/gi, '$1 $2')
      .replace(/(\d)\.$/, '$1');
  }
  return out.replace(/\s+/g, ' ').trim();
}

function detectDocumentTypeHint(text: string): DocumentType | null {
  const upper = text.toUpperCase();
  if (/\b(?:PASSPORT|PASSEPORT|PASAPORTE|REISEPASS|PASSAPORTO|PASZPORT)\b/.test(upper)) {
    return 'passport';
  }
  if (
    /\b(?:DRIVER(?:'S)?\s*LICEN[CS]E|DRIVING\s*LICEN[CS]E|PERMIS\s*DE\s*CONDUIRE|F[UÜ]HRERSCHEIN|PRAWO\s*JAZDY)\b/.test(
      upper
    )
  ) {
    return 'driver_license';
  }
  if (/\b(?:RESIDENCE\s*PERMIT|TITRE\s*DE\s*S[EÉ]JOUR|AUFENTHALTSTITEL|KARTA\s*POBYTU)\b/.test(upper)) {
    return 'residence_permit';
  }
  if (/\b(?:VISA|VISUM)\b/.test(upper)) {
    return 'visa';
  }
  if (
    /\b(?:IDENTITY\s*CARD|ID\s*CARD|NATIONAL\s*ID|CARTE\s*NATIONALE|PERSONALAUSWEIS|ANSCHRIFT|AUGENFARBE|DOW[OÓ]D\s*OSOBISTY|CARTA\s*D'IDENTIT[AÀ]|DNI)\b/.test(
      upper
    )
  ) {
    return 'id_card';
  }
  return null;
}

function parseSexValue(val: string): 'M' | 'F' | 'X' | null {
  const upper = val.trim().toUpperCase();
  if (/^(?:M|MALE|HOMME|M[AÄ]NNLICH|MASCULINO|M[EĘ][ZŻ]CZYZNA)$/.test(upper)) return 'M';
  if (/^(?:F|FEMALE|FEMME|WEIBLICH|FEMENINO|KOBIETA)$/.test(upper)) return 'F';
  if (/^(?:X|NON[- ]?BINARY|OTHER|DIVERS)$/.test(upper)) return 'X';
  if (upper.startsWith('M/') || upper === 'M') return 'M';
  if (upper.startsWith('F/') || upper === 'F') return 'F';
  return null;
}

/**
 * Checks if candidate line `cand` sits spatially below `label` in the same horizontal column.
 */
function isInSameColumnBelow(label: VizLineBox, cand: VizLineBox): boolean {
  const lHeight = Math.max(12, label.bbox.y1 - label.bbox.y0);
  if (cand.bbox.y0 < label.bbox.y0 + lHeight * 0.25) return false;

  const colLeft = label.bbox.x0 - 120;
  const colRight = Math.max(label.bbox.x1 + 60, label.bbox.x0 + 360);
  const candCenter = (cand.bbox.x0 + cand.bbox.x1) / 2;

  const startsAligned = Math.abs(cand.bbox.x0 - label.bbox.x0) <= 130;
  const insideColSpan = cand.bbox.x0 >= colLeft && candCenter <= colRight;
  return startsAligned || insideColSpan;
}

function isCleanPlacePart(text: string): boolean {
  if (text.length < 2) return false;
  if (/[{}|\[\]<>~]/.test(text)) return false;
  if (!/[A-ZÄÖÜÑ]{2,}/.test(text)) return false;
  return true;
}

/**
 * Parses the Visual Inspection Zone (VIZ) text extracted by Tesseract.
 * When `lineBoxes` are provided, uses 2D column-aligned spatial grouping so
 * multi-column ID cards (e.g. German Personalausweis back) never interleave fields.
 */
export function parseVizText(
  rawText: string,
  lineBoxes?: VizLineBox[]
): VizParsedData {
  const cleanBoxes: VizLineBox[] = (lineBoxes ?? [])
    .map((b) => ({
      text: b.text.replace(/\s+/g, ' ').trim(),
      bbox: b.bbox,
    }))
    .filter((b) => b.text.length > 0 && !isLikelyMrzNoise(b.text))
    .sort((a, b) => a.bbox.y0 - b.bbox.y0 || a.bbox.x0 - b.bbox.x0);

  const lines =
    cleanBoxes.length > 0
      ? cleanBoxes.map((b) => b.text)
      : rawText
          .split(/\r?\n/)
          .map((l) => l.replace(/\s+/g, ' ').trim())
          .filter((l) => l.length > 0 && !isLikelyMrzNoise(l));

  const data: VizParsedData = {
    documentTypeHint: detectDocumentTypeHint(rawText),
    surname: null,
    surnames: [],
    givenNames: null,
    fullName: null,
    documentNumber: null,
    personalNumber: null,
    nationality: null,
    issuingCountry: null,
    dateOfBirth: null,
    dateOfIssue: null,
    dateOfExpiry: null,
    sex: null,
    placeOfBirth: null,
    address: null,
    parents: null,
    issuingAuthority: null,
    licenseClass: null,
    restrictions: null,
    endorsements: null,
    height: null,
    eyeColor: null,
    hairColor: null,
    detectedLines: lines,
    unmappedKeyValues: {},
  };

  const hasBoxes = cleanBoxes.length > 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (STOP_LABEL_PATTERNS.some((p) => p.test(line))) continue;

    const box = hasBoxes ? cleanBoxes[i] : null;
    const kvMatch = line.match(/^([A-Za-z][A-Za-z0-9\s/().'-]{1,32}):\s*(.+)$/);
    let matchedKnownRule = false;

    for (const rule of LABEL_RULES) {
      for (const pattern of rule.patterns) {
        if (pattern.test(line)) {
          matchedKnownRule = true;

          const minCandLen = rule.field === 'sex' ? 1 : 2;
          const columnCandidates: string[] = [];
          let firstCandX: number | null = null;
          let lastCandBox: VizLineBox['bbox'] | null = null;
          if (box) {
            for (let j = i + 1; j < cleanBoxes.length; j++) {
              const cand = cleanBoxes[j];
              if (!isInSameColumnBelow(box, cand)) continue;
              if (isAnyLabelLine(cand.text)) break;
              if (cand.text.length < minCandLen) continue;

              if (rule.field === 'placeOfBirth' && !isCleanPlacePart(cand.text)) {
                if (columnCandidates.length > 0) break;
                continue;
              }

              if (rule.field === 'surname') {
                // Skip secondary birth-name markers like "[b] GABLER" or "» GABLER"
                if (/^(?:\[b\]|[»*])/i.test(cand.text)) break;
                if (lastCandBox !== null) {
                  const prevLineH = Math.max(14, lastCandBox.y1 - lastCandBox.y0);
                  if (cand.bbox.y0 - lastCandBox.y1 > prevLineH * 1.4) break;
                }
              }

              if (rule.field === 'address') {
                // Multi-line address lines are left-aligned and tightly stacked vertically;
                // stop if a large vertical gap separates the address block from lower watermark noise
                if (cand.text.length < 3 && !/^\d+$/.test(cand.text)) continue;
                if (firstCandX !== null && Math.abs(cand.bbox.x0 - firstCandX) > 85) {
                  continue;
                }
                if (lastCandBox !== null) {
                  const prevLineH = Math.max(18, lastCandBox.y1 - lastCandBox.y0);
                  if (cand.bbox.y0 - lastCandBox.y1 > prevLineH * 1.8) {
                    break;
                  }
                }
              }

              if (firstCandX === null) firstCandX = cand.bbox.x0;
              lastCandBox = cand.bbox;
              columnCandidates.push(cand.text);
              const maxLines =
                rule.field === 'address'
                  ? 4
                  : rule.field === 'placeOfBirth' || rule.field === 'surname'
                    ? 2
                    : 1;
              if (columnCandidates.length >= maxLines) break;
            }
          }

          let inlineValue = isMultilingualHeaderLine(line, rule)
            ? ''
            : stripMatchedLabel(line, rule.patterns);

          let value = inlineValue;
          let consumedOffset = 0;

          if (!value || value.length < minCandLen) {
            if (columnCandidates.length > 0) {
              value = columnCandidates[0];
            } else if (!hasBoxes && i + 1 < lines.length && !isPureLabelLine(lines[i + 1])) {
              value = lines[i + 1];
              consumedOffset = 1;
            }
          }

          if (!value) continue;

          if (
            rule.field === 'dateOfBirth' ||
            rule.field === 'dateOfIssue' ||
            rule.field === 'dateOfExpiry'
          ) {
            const iso = normalizeVisualDate(value);
            if (iso && !data[rule.field]) {
              data[rule.field] = iso;
            }
          } else if (rule.field === 'sex') {
            const parsedSex = parseSexValue(value);
            if (parsedSex && !data.sex) {
              data.sex = parsedSex;
            }
          } else if (rule.field === 'address' || rule.field === 'placeOfBirth') {
            const preserveDigit = rule.field === 'address';
            let parts: string[] = [];

            if (hasBoxes && !inlineValue && columnCandidates.length > 0) {
              parts = columnCandidates
                .map((c) => cleanVisualValue(c, preserveDigit))
                .filter((c) => c.length >= 2);
            } else {
              parts = [cleanVisualValue(value, preserveDigit)];
              const maxExtra = rule.field === 'address' ? 3 : 2;
              let cursor = i + consumedOffset + 1;
              while (
                parts.length < maxExtra &&
                cursor < lines.length &&
                !isAnyLabelLine(lines[cursor])
              ) {
                const extra = cleanVisualValue(lines[cursor], preserveDigit);
                if (extra.length >= 2 && !/^\d{1,2}$/.test(extra)) {
                  if (rule.field === 'placeOfBirth' && !isCleanPlacePart(extra)) {
                    break;
                  }
                  parts.push(extra);
                }
                cursor++;
              }
            }

            if (!data[rule.field] && parts.length > 0) {
              data[rule.field] = parts.join(', ');
            }
          } else if (rule.field === 'parents') {
            if (!data.parents) {
              data.parents = cleanVisualValue(value);
            }
          } else if (rule.field === 'height') {
            const cleanedHeight = cleanVisualValue(value);
            if (/\d/.test(cleanedHeight) && !data.height) {
              data.height = cleanedHeight;
            }
          } else if (rule.field === 'surname') {
            const cleanedParts =
              hasBoxes && !inlineValue && columnCandidates.length > 0
                ? columnCandidates.map((c) => cleanVisualValue(c)).filter(Boolean)
                : [cleanVisualValue(value)].filter(Boolean);
            const combined = cleanedParts.join(' ');
            if (combined) {
              if (!data.surname) {
                data.surname = combined;
                data.surnames = combined.split(/\s+/).filter(Boolean);
              } else if (
                /segundo\s*apellido|2[oº]\.?\s*apellido/i.test(line) &&
                !data.surnames.includes(combined)
              ) {
                data.surnames = [...data.surnames, combined];
                data.surname = data.surnames.join(' ');
              }
            }
          } else {
            if (!data[rule.field]) {
              data[rule.field] = cleanVisualValue(value);
            }
          }
          break;
        }
      }
      if (matchedKnownRule) break;
    }

    if (!matchedKnownRule && kvMatch) {
      const k = kvMatch[1].trim();
      const v = cleanVisualValue(kvMatch[2]);
      if (k && v && v.length <= 100) {
        data.unmappedKeyValues[k] = v;
      }
    }
  }

  const allDates = extractAllDatesFromText(lines.join('\n')).sort();
  if (allDates.length > 0) {
    const currentYear = new Date().getFullYear();
    if (!data.dateOfBirth) {
      const birthCandidate = allDates.find((d) => parseInt(d.slice(0, 4), 10) <= currentYear - 12);
      if (birthCandidate) data.dateOfBirth = birthCandidate;
    }
    if (!data.dateOfExpiry) {
      const expiryCandidate = [...allDates]
        .reverse()
        .find((d) => parseInt(d.slice(0, 4), 10) >= currentYear - 2);
      if (expiryCandidate && expiryCandidate !== data.dateOfBirth) {
        data.dateOfExpiry = expiryCandidate;
      }
    }
    if (!data.dateOfIssue && allDates.length >= 2) {
      const middleDates = allDates.filter(
        (d) =>
          d !== data.dateOfBirth &&
          d !== data.dateOfExpiry &&
          parseInt(d.slice(0, 4), 10) <= currentYear
      );
      if (middleDates.length > 0) {
        data.dateOfIssue = middleDates[0];
      }
    }
  }

  if (!data.documentNumber) {
    for (const line of lines) {
      const dlMatch = line.match(/\b(?:DL|ID|NO\.?|DOC)\s*[:#]?\s*([A-Z0-9-]{6,18})\b/i);
      if (dlMatch && /\d/.test(dlMatch[1])) {
        data.documentNumber = dlMatch[1].toUpperCase();
        break;
      }
    }
  }

  if (!data.fullName && (data.givenNames || data.surname)) {
    data.fullName = [data.givenNames, data.surname].filter(Boolean).join(' ');
  }

  if (!data.height) {
    const hMatch = rawText.match(/\b(\d['′]\s*-?\s*\d{1,2}["″]?|\d{3}\s*cm)\b/i);
    if (hMatch) data.height = hMatch[1];
  }

  return data;
}
