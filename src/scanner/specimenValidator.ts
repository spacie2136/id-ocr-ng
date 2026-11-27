import type {
  BarcodeParsedData,
  CrossValidationDiscrepancy,
  MrzParsedData,
  SingleSideCrossValidation,
  SpecimenDetectionResult,
  VizParsedData,
} from './types';

function stripDiacriticsUpper(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function toMrzTransliteratedUpper(str: string): string {
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
  return stripDiacriticsUpper(expanded);
}

function normalizeAlnum(str: string | null | undefined): string {
  return (str ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

function normalizeOcrConfusables(str: string): string {
  return str
    .toUpperCase()
    .replace(/[ODQ]/g, '0')
    .replace(/[ILT]/g, '1')
    .replace(/Z/g, '2')
    .replace(/S/g, '5')
    .replace(/G/g, '6')
    .replace(/B/g, '8');
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[] = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      if (a[i - 1] === b[j - 1]) {
        dp[j] = prev;
      } else {
        dp[j] = 1 + Math.min(prev, dp[j], dp[j - 1]);
      }
      prev = tmp;
    }
  }
  return dp[n];
}

function namesAgree(mrzName: string, vizName: string, allowPrefix = false): boolean {
  const mRaw = stripDiacriticsUpper(mrzName);
  const vAscii = stripDiacriticsUpper(vizName);
  const vTranslit = toMrzTransliteratedUpper(vizName);

  if (!mRaw || !vAscii) return true;

  for (const vCandidate of [vAscii, vTranslit]) {
    if (mRaw === vCandidate) return true;

    const mCompact = mRaw.replace(/\s+/g, '');
    const vCompact = vCandidate.replace(/\s+/g, '');
    if (mCompact === vCompact) return true;

    if (allowPrefix) {
      const minLen = Math.min(mCompact.length, vCompact.length);
      if (minLen >= 6 && (vCompact.startsWith(mCompact.slice(0, minLen)) || mCompact.startsWith(vCompact.slice(0, minLen)))) {
        return true;
      }
    } else if (mCompact.length >= 6 && vCompact.length >= 6) {
      if (vCompact.includes(mCompact) || mCompact.includes(vCompact)) return true;
    }

    const mTokens = mRaw.split(' ').filter((t) => t.length >= 2);
    const vTokens = vCandidate.split(' ').filter((t) => t.length >= 2);
    if (mTokens.length > 0 && vTokens.length > 0) {
      const shared = mTokens.some((mt) =>
        vTokens.some((vt) => {
          if (mt === vt) return true;
          if (allowPrefix && Math.min(mt.length, vt.length) >= 4) {
            if (mt.startsWith(vt) || vt.startsWith(mt)) return true;
          }
          const maxLen = Math.max(mt.length, vt.length);
          return maxLen >= 4 && levenshtein(mt, vt) <= 1;
        })
      );
      if (shared) return true;
    }
  }

  return false;
}

/**
 * Resolves the exact surname / given-name boundary when an MRZ omits the double-chevron (`<<`)
 * delimiter (e.g. `P<UTOQUEST<AMELIA<MARY`) and prints only single `<` separators, causing
 * MRZ parsing alone to place all name tokens inside `mrz.surnames`.
 */
export function matchUnsplitMrzNameWithViz(
  mrz: MrzParsedData,
  viz: VizParsedData
): {
  surname: string;
  surnames: string[];
  givenNames: string;
  givenNamesList: string[];
} | null {
  if (mrz.givenNames.trim() !== '' || mrz.surnames.length < 2) {
    return null;
  }
  const vizSurRaw = viz.surname?.trim();
  const vizGivRaw = viz.givenNames?.trim();
  if (!vizSurRaw || !vizGivRaw) {
    return null;
  }

  const mrzTokens = mrz.surnames.map((t) => stripDiacriticsUpper(t)).filter(Boolean);
  const vSurTokens = toMrzTransliteratedUpper(vizSurRaw).split(' ').filter(Boolean);
  const vGivTokens = toMrzTransliteratedUpper(vizGivRaw).split(' ').filter(Boolean);

  if (mrzTokens.length < 2 || vSurTokens.length === 0 || vGivTokens.length === 0) {
    return null;
  }

  const vAllTokens = [...vSurTokens, ...vGivTokens];
  let tokenMatch = mrzTokens.length >= vSurTokens.length + 1 && mrzTokens.length <= vAllTokens.length;

  if (tokenMatch) {
    for (let i = 0; i < mrzTokens.length; i++) {
      const mt = mrzTokens[i];
      const vt = vAllTokens[i];
      const isLastMrz = i === mrzTokens.length - 1;
      const exactOrFuzzy =
        mt === vt || (Math.max(mt.length, vt.length) >= 4 && levenshtein(mt, vt) <= 1);
      const truncatedPrefix = isLastMrz && mt.length >= 2 && vt.startsWith(mt);
      if (!exactOrFuzzy && !truncatedPrefix) {
        tokenMatch = false;
        break;
      }
    }
  }

  if (!tokenMatch) {
    const mCompact = mrzTokens.join('');
    const vSurCompact = vSurTokens.join('');
    const vAllCompact = vAllTokens.join('');
    if (
      !(
        mCompact.length >= vSurCompact.length + 2 &&
        mCompact.startsWith(vSurCompact) &&
        (mCompact === vAllCompact || vAllCompact.startsWith(mCompact))
      )
    ) {
      return null;
    }
  }

  const cleanSurnames =
    viz.surnames.length > 0 ? viz.surnames : vizSurRaw.split(/\s+/).filter(Boolean);
  const cleanGivenList = vizGivRaw.split(/\s+/).filter(Boolean);

  return {
    surname: vizSurRaw,
    surnames: cleanSurnames,
    givenNames: vizGivRaw,
    givenNamesList: cleanGivenList,
  };
}

/**
 * Pure single-side MRZ vs. VIZ consistency validator.
 * Compares decoded ICAO 9303 MRZ values against Visual Inspection Zone OCR values
 * on the same document image to flag tampering, OCR hallucinations, or mismatched fields.
 */
export function crossValidateMrzAndViz(
  mrz: MrzParsedData | null,
  viz: VizParsedData | null
): SingleSideCrossValidation {
  if (!mrz || !viz) {
    return {
      performed: false,
      matchedFields: [],
      discrepancies: [],
      consistent: true,
    };
  }

  const matchedFields: string[] = [];
  const discrepancies: CrossValidationDiscrepancy[] = [];

  // 1. Document Number
  const mDoc = normalizeAlnum(mrz.documentNumber);
  const vDoc = normalizeAlnum(viz.documentNumber);
  if (mDoc && vDoc) {
    if (mDoc === vDoc) {
      matchedFields.push('documentNumber');
    } else if (
      mDoc.length === vDoc.length &&
      normalizeOcrConfusables(mDoc) === normalizeOcrConfusables(vDoc)
    ) {
      discrepancies.push({
        field: 'documentNumber',
        mrzValue: mrz.documentNumber,
        vizValue: viz.documentNumber!,
        severity: 'warning',
      });
    } else {
      discrepancies.push({
        field: 'documentNumber',
        mrzValue: mrz.documentNumber,
        vizValue: viz.documentNumber!,
        severity: 'critical',
      });
    }
  }

  // 2. Date of Birth
  if (mrz.dateOfBirth && viz.dateOfBirth) {
    if (mrz.dateOfBirth === viz.dateOfBirth) {
      matchedFields.push('dateOfBirth');
    } else {
      discrepancies.push({
        field: 'dateOfBirth',
        mrzValue: mrz.dateOfBirth,
        vizValue: viz.dateOfBirth,
        severity: 'critical',
      });
    }
  }

  // 3. Date of Expiry
  if (mrz.dateOfExpiry && viz.dateOfExpiry) {
    if (mrz.dateOfExpiry === viz.dateOfExpiry) {
      matchedFields.push('dateOfExpiry');
    } else {
      discrepancies.push({
        field: 'dateOfExpiry',
        mrzValue: mrz.dateOfExpiry,
        vizValue: viz.dateOfExpiry,
        severity: 'critical',
      });
    }
  }

  // 4. Sex
  if (mrz.sex !== 'Unspecified' && viz.sex) {
    if (mrz.sex === viz.sex) {
      matchedFields.push('sex');
    } else {
      discrepancies.push({
        field: 'sex',
        mrzValue: mrz.sex,
        vizValue: viz.sex,
        severity: 'warning',
      });
    }
  }

  // 5 & 6. Surname and Given Names (handling MRZ lacking '<<' split when confirmed by VIZ)
  const unsplitSplitMatch = matchUnsplitMrzNameWithViz(mrz, viz);
  if (unsplitSplitMatch) {
    matchedFields.push('surname');
    matchedFields.push('givenNames');
  } else {
    if (mrz.surname && viz.surname) {
      if (namesAgree(mrz.surname, viz.surname, false)) {
        matchedFields.push('surname');
      } else {
        discrepancies.push({
          field: 'surname',
          mrzValue: mrz.surname,
          vizValue: viz.surname,
          severity: 'critical',
        });
      }
    }

    if (mrz.givenNames && viz.givenNames) {
      if (namesAgree(mrz.givenNames, viz.givenNames, true)) {
        matchedFields.push('givenNames');
      } else {
        discrepancies.push({
          field: 'givenNames',
          mrzValue: mrz.givenNames,
          vizValue: viz.givenNames,
          severity: 'warning',
        });
      }
    }
  }

  // 7. Issuing Country (only when VIZ extracted an explicit 3-letter country code)
  const vIss = viz.issuingCountry?.trim().toUpperCase();
  if (mrz.issuingCountry && vIss && /^[A-Z]{3}$/.test(vIss)) {
    const mIss = mrz.issuingCountry.trim().toUpperCase();
    const sameGermany = (mIss === 'D' && vIss === 'DEU') || (mIss === 'DEU' && vIss === 'D');
    if (mIss === vIss || sameGermany) {
      matchedFields.push('issuingCountry');
    } else {
      discrepancies.push({
        field: 'issuingCountry',
        mrzValue: mIss,
        vizValue: vIss,
        severity: 'warning',
      });
    }
  }

  return {
    performed: true,
    matchedFields,
    discrepancies,
    consistent: discrepancies.length === 0,
  };
}

export interface SpecimenDetectionInput {
  rawOcrText: string;
  rawMrzText?: string;
  mrz?: MrzParsedData | null;
  viz?: VizParsedData | null;
  barcode?: BarcodeParsedData | null;
  unmappedFields?: Record<string, string>;
  watermarkOcrText?: string;
}

interface SpecimenPatternRule {
  label: string;
  regex: RegExp;
  weight: number;
}

const SPECIMEN_RULES: SpecimenPatternRule[] = [
  {
    label: 'SPECIMEN watermark',
    regex: /\bSPECIMEN\b|\bESPECIMEN\b|\bSPÉCIMEN\b/,
    weight: 95,
  },
  {
    label: 'SPECIMEN watermark (OCR fuzzy)',
    regex: /\b[S5]P[E3]C[IL1|]M[E3]N\b/,
    weight: 80,
  },
  {
    label: 'MUSTER watermark (DE)',
    regex: /\bMUSTER\b(?!\s*(?:STRASSE|STR\.?|WEG|PLATZ))/,
    weight: 92,
  },
  {
    label: 'MUSTERMANN specimen persona',
    regex: /\b(?:ERIKA|MAX)\s+MUSTERMANN\b|\bMUSTERMANN\b/,
    weight: 88,
  },
  {
    label: 'WZÓR watermark (PL)',
    regex: /\bWZOR\b|\bWZÓR\b/,
    weight: 90,
  },
  {
    label: 'VZOR watermark (CZ/SK)',
    regex: /\bVZOR\b/,
    weight: 90,
  },
  {
    label: 'MUESTRA watermark (ES)',
    regex: /\bMUESTRA\b|\bSIN VALOR\b/,
    weight: 88,
  },
  {
    label: 'ÉCHANTILLON watermark (FR)',
    regex: /\bECHANTILLON\b|\bÉCHANTILLON\b/,
    weight: 90,
  },
  {
    label: 'VOID watermark',
    regex: /\bVOID\b(?:\s+(?:DOCUMENT|ID|CARD|PASSPORT))?/,
    weight: 85,
  },
  {
    label: 'SAMPLE watermark',
    regex: /\bSAMPLE\b(?:\s+(?:DOCUMENT|ID|CARD|PASSPORT|ONLY))?/,
    weight: 82,
  },
  {
    label: 'FACSIMILE watermark',
    regex: /\bFACSIMILE\b/,
    weight: 88,
  },
  {
    label: 'MINTA / MALLI / CAMPIONE / VOORBEELD watermark',
    regex: /\b(?:MINTA|MALLI|CAMPIONE|VOORBEELD|PROBEDRUCK|ENTWURF)\b/,
    weight: 85,
  },
  {
    label: 'NOT VALID FOR TRAVEL notice',
    regex: /\bNOT\s+VALID\s+FOR\s+TRAVEL\b|\bTEST\s+DOCUMENT\b/,
    weight: 92,
  },
];

function collectMatches(
  text: string,
  source: SpecimenDetectionResult['sources'][number],
  indicators: Map<string, number>,
  sources: Set<SpecimenDetectionResult['sources'][number]>
) {
  if (!text || !text.trim()) return;
  const upper = text.toUpperCase();
  const ascii = stripDiacriticsUpper(text);

  for (const rule of SPECIMEN_RULES) {
    if (rule.regex.test(upper) || rule.regex.test(ascii)) {
      const prev = indicators.get(rule.label) ?? 0;
      if (rule.weight > prev) indicators.set(rule.label, rule.weight);
      sources.add(source);
    }
  }
}

/**
 * Pure multilingual detector for specimen, sample, void, and ICAO test documents.
 * Inspects full-page OCR text, optional red/diagonal watermark OCR text, decoded MRZ,
 * VIZ parsed names/fields, and PDF417/AAMVA payloads.
 */
export function detectSpecimenWatermark(
  input: SpecimenDetectionInput
): SpecimenDetectionResult {
  const indicators = new Map<string, number>();
  const sources = new Set<SpecimenDetectionResult['sources'][number]>();

  const vizCombined = [
    input.viz?.surname,
    input.viz?.givenNames,
    input.viz?.fullName,
    input.viz?.issuingAuthority,
    input.viz?.address,
    ...(input.viz?.detectedLines ?? []),
    ...Object.entries(input.unmappedFields ?? {}).flat(),
  ]
    .filter(Boolean)
    .join('\n');

  collectMatches(input.rawOcrText, 'ocr_text', indicators, sources);
  if (vizCombined) {
    collectMatches(vizCombined, 'ocr_text', indicators, sources);
  }
  if (input.watermarkOcrText) {
    collectMatches(input.watermarkOcrText, 'watermark_visual', indicators, sources);
  }

  if (input.rawMrzText) {
    collectMatches(input.rawMrzText.replace(/</g, ' '), 'mrz', indicators, sources);
  }

  if (input.mrz) {
    if (
      input.mrz.issuingCountry.toUpperCase() === 'UTO' ||
      input.mrz.nationality.toUpperCase() === 'UTO'
    ) {
      indicators.set('ICAO Utopia (UTO) test country code', 96);
      sources.add('mrz');
    }
    const mrzNameText = `${input.mrz.surname} ${input.mrz.givenNames} ${input.mrz.rawLines.join(' ').replace(/</g, ' ')}`;
    collectMatches(mrzNameText, 'mrz', indicators, sources);
  }

  if (input.barcode) {
    const aamvaText = input.barcode.aamva
      ? `${input.barcode.aamva.fullName ?? ''} ${input.barcode.aamva.address ?? ''} ${Object.values(input.barcode.aamva.fields).join(' ')}`
      : input.barcode.rawText;
    collectMatches(aamvaText, 'barcode', indicators, sources);
  }

  const matchedIndicators = Array.from(indicators.keys());
  const maxWeight = matchedIndicators.reduce(
    (max, key) => Math.max(max, indicators.get(key) ?? 0),
    0
  );
  const bonus = Math.min(8, Math.max(0, matchedIndicators.length - 1) * 4);
  const confidence = matchedIndicators.length > 0 ? Math.min(99, maxWeight + bonus) : 0;

  return {
    isSpecimen: matchedIndicators.length > 0,
    confidence,
    matchedIndicators,
    sources: Array.from(sources),
  };
}

export function mergeSpecimenResults(
  front?: SpecimenDetectionResult,
  back?: SpecimenDetectionResult
): SpecimenDetectionResult | undefined {
  if (!front && !back) return undefined;
  const matchedIndicators = Array.from(
    new Set([...(front?.matchedIndicators ?? []), ...(back?.matchedIndicators ?? [])])
  );
  const sources = Array.from(
    new Set([...(front?.sources ?? []), ...(back?.sources ?? [])])
  );
  return {
    isSpecimen: Boolean(front?.isSpecimen || back?.isSpecimen),
    confidence: Math.max(front?.confidence ?? 0, back?.confidence ?? 0),
    matchedIndicators,
    sources,
  };
}
