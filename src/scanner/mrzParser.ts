import type { CheckDigitStatus, MrzFormat, MrzParsedData } from './types';

const WEIGHTS = [7, 3, 1];

const CHAR_VALUES: Record<string, number> = {
  '<': 0,
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
  G: 16,
  H: 17,
  I: 18,
  J: 19,
  K: 20,
  L: 21,
  M: 22,
  N: 23,
  O: 24,
  P: 25,
  Q: 26,
  R: 27,
  S: 28,
  T: 29,
  U: 30,
  V: 31,
  W: 32,
  X: 33,
  Y: 34,
  Z: 35,
};

const DIGIT_CONFUSIONS: Record<string, string[]> = {
  O: ['0'],
  D: ['0'],
  Q: ['0'],
  C: ['0'],
  I: ['1', '9'],
  L: ['1'],
  T: ['1', '7'],
  Z: ['2'],
  A: ['4'],
  S: ['5'],
  G: ['6'],
  B: ['8'],
};

const DATE_DIGIT_CONFUSIONS: Record<string, string[]> = {
  '0': ['8', '6', '9'],
  '1': ['7', '4', '9'],
  '2': ['7'],
  '3': ['8', '5'],
  '4': ['1', '9'],
  '5': ['6', '8', '3'],
  '6': ['5', '8', '0'],
  '7': ['1', '2'],
  '8': ['3', '6', '0', '9'],
  '9': ['8', '4', '0', '1'],
};

export function computeCheckDigit(input: string): string {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    const val = CHAR_VALUES[ch] ?? 0;
    sum += val * WEIGHTS[i % 3];
  }
  return String(sum % 10);
}

function normalizeMrzChar(ch: string): string {
  const upper = ch.toUpperCase();
  if (/[A-Z0-9<]/.test(upper)) return upper;
  if (upper === '«' || upper === '‹' || upper === '(' || upper === '{' || upper === '[') {
    return '<';
  }
  return '<';
}

function fixNumericField(raw: string): string {
  return raw
    .replace(/O/g, '0')
    .replace(/Q/g, '0')
    .replace(/D/g, '0')
    .replace(/I/g, '1')
    .replace(/L/g, '1')
    .replace(/T/g, '1')
    .replace(/Z/g, '2')
    .replace(/S/g, '5')
    .replace(/G/g, '6')
    .replace(/B/g, '8');
}

function fixCheckDigitChar(raw: string): string {
  return fixNumericField(raw).replace(/C/g, '0');
}

function fixAlphaField(raw: string): string {
  return raw
    .replace(/0/g, 'O')
    .replace(/1/g, 'I')
    .replace(/2/g, 'Z')
    .replace(/5/g, 'S')
    .replace(/6/g, 'G')
    .replace(/8/g, 'B');
}

function isValidMrzSixDigitDate(digits: string): boolean {
  if (!/^\d{6}$/.test(digits)) return false;
  const mm = parseInt(digits.slice(2, 4), 10);
  const dd = parseInt(digits.slice(4, 6), 10);
  return mm >= 1 && mm <= 12 && dd >= 1 && dd <= 31;
}

function repairDateFieldWithCheckDigit(raw: string, actualCheckDigit: string): string {
  const check = fixCheckDigitChar(actualCheckDigit);
  const baseDigits = fixNumericField(raw);
  if (!/^\d$/.test(check) || raw.length !== 6) return baseDigits;

  if (isValidMrzSixDigitDate(baseDigits) && computeCheckDigit(baseDigits) === check) {
    return baseDigits;
  }

  // Try raw-letter confusions (e.g. 'I' -> '9', 'A' -> '4', 'T' -> '7') then 1-digit shape confusions
  const slotOptions: string[][] = [];
  for (let i = 0; i < 6; i++) {
    const orig = raw[i];
    const mapped = baseDigits[i];
    const opts = new Set<string>();
    if (/^\d$/.test(mapped)) opts.add(mapped);
    for (const alt of DIGIT_CONFUSIONS[orig] ?? []) {
      if (/^\d$/.test(alt)) opts.add(alt);
    }
    for (const alt of DATE_DIGIT_CONFUSIONS[mapped] ?? []) {
      opts.add(alt);
    }
    slotOptions.push(Array.from(opts));
  }

  for (let i = 0; i < 6; i++) {
    for (const rep of slotOptions[i]) {
      if (rep === baseDigits[i]) continue;
      const cand = baseDigits.slice(0, i) + rep + baseDigits.slice(i + 1);
      if (isValidMrzSixDigitDate(cand) && computeCheckDigit(cand) === check) {
        return cand;
      }
    }
  }

  // Try 2-position repairs only using direct letter->digit confusion table
  const letterPositions: Array<{ idx: number; reps: string[] }> = [];
  for (let i = 0; i < 6; i++) {
    const alts = DIGIT_CONFUSIONS[raw[i]];
    if (alts && alts.length > 0) {
      letterPositions.push({ idx: i, reps: alts });
    }
  }
  for (let a = 0; a < letterPositions.length; a++) {
    for (let b = a + 1; b < letterPositions.length; b++) {
      for (const r1 of letterPositions[a].reps) {
        for (const r2 of letterPositions[b].reps) {
          const chars = baseDigits.split('');
          chars[letterPositions[a].idx] = r1;
          chars[letterPositions[b].idx] = r2;
          const cand = chars.join('');
          if (isValidMrzSixDigitDate(cand) && computeCheckDigit(cand) === check) {
            return cand;
          }
        }
      }
    }
  }

  return baseDigits;
}

function softNumericFix(s: string): string {
  return s
    .replace(/[ODQ]/g, '0')
    .replace(/[IL]/g, '1')
    .replace(/Z/g, '2')
    .replace(/S/g, '5')
    .replace(/G/g, '6')
    .replace(/B/g, '8');
}

function repairFieldWithCheckDigit(raw: string, actualCheckDigit: string): string {
  const check = fixCheckDigitChar(actualCheckDigit);
  if (!/^\d$/.test(check)) return raw;
  if (computeCheckDigit(raw) === check) return raw;

  const roundZeroFixed = raw.replace(/[OQ]/g, '0');
  if (computeCheckDigit(roundZeroFixed) === check) return roundZeroFixed;

  const zeroFixed = raw.replace(/[ODQ]/g, '0');
  if (computeCheckDigit(zeroFixed) === check) return zeroFixed;

  const prefixMatch = raw.match(/^([A-Z]{1,3})(.*)$/);
  if (prefixMatch) {
    const candidate = prefixMatch[1] + softNumericFix(prefixMatch[2]);
    if (computeCheckDigit(candidate) === check) return candidate;
  }

  const fullFixed = softNumericFix(raw);
  if (computeCheckDigit(fullFixed) === check) return fullFixed;

  const positions: Array<{ idx: number; reps: string[] }> = [];
  for (let i = raw.length - 1; i >= 0; i--) {
    const reps = DIGIT_CONFUSIONS[raw[i]];
    if (reps) positions.push({ idx: i, reps });
  }

  for (const pos of positions) {
    for (const rep of pos.reps) {
      const candidate = raw.slice(0, pos.idx) + rep + raw.slice(pos.idx + 1);
      if (computeCheckDigit(candidate) === check) return candidate;
    }
  }

  for (let a = 0; a < positions.length; a++) {
    for (let b = a + 1; b < positions.length; b++) {
      const p1 = positions[a];
      const p2 = positions[b];
      for (const r1 of p1.reps) {
        for (const r2 of p2.reps) {
          const chars = raw.split('');
          chars[p1.idx] = r1;
          chars[p2.idx] = r2;
          const candidate = chars.join('');
          if (computeCheckDigit(candidate) === check) return candidate;
        }
      }
    }
  }

  return raw;
}

/**
 * Repairs OCR-confusable characters in an optional personal-data slice when all primary
 * check digits are valid and a single/double confusion explains a failing composite check digit.
 */
function repairSliceForCompositeCheck(
  prefix: string,
  targetSlice: string,
  suffix: string,
  compositeCheckRaw: string
): string {
  const compositeCheck = fixCheckDigitChar(compositeCheckRaw);
  if (!/^\d$/.test(compositeCheck)) return targetSlice;
  if (computeCheckDigit(prefix + targetSlice + suffix) === compositeCheck) {
    return targetSlice;
  }
  if (!targetSlice || targetSlice.replace(/</g, '').length === 0) {
    return targetSlice;
  }

  const zeroFixed = targetSlice.replace(/[ODQ]/g, '0');
  if (computeCheckDigit(prefix + zeroFixed + suffix) === compositeCheck) {
    return zeroFixed;
  }

  const softFixed = fixNumericField(targetSlice);
  if (computeCheckDigit(prefix + softFixed + suffix) === compositeCheck) {
    return softFixed;
  }

  const positions: Array<{ idx: number; reps: string[] }> = [];
  for (let i = targetSlice.length - 1; i >= 0; i--) {
    const ch = targetSlice[i];
    if (ch === '<') continue;
    const reps = DIGIT_CONFUSIONS[ch] ?? DATE_DIGIT_CONFUSIONS[ch];
    if (reps) positions.push({ idx: i, reps });
  }

  for (const pos of positions) {
    for (const rep of pos.reps) {
      const cand = targetSlice.slice(0, pos.idx) + rep + targetSlice.slice(pos.idx + 1);
      if (computeCheckDigit(prefix + cand + suffix) === compositeCheck) {
        return cand;
      }
    }
  }

  return targetSlice;
}

function parseMrzDate(yymmdd: string, kind: 'birth' | 'expiry'): string | null {
  const digits = fixNumericField(yymmdd);
  if (!/^\d{6}$/.test(digits)) return null;
  const yy = parseInt(digits.slice(0, 2), 10);
  const mm = parseInt(digits.slice(2, 4), 10);
  const dd = parseInt(digits.slice(4, 6), 10);
  if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return null;

  const currentYear = new Date().getFullYear();
  const currentTwoDigit = currentYear % 100;
  const currentCentury = Math.floor(currentYear / 100) * 100;

  let fullYear: number;
  if (kind === 'birth') {
    fullYear = yy > currentTwoDigit ? currentCentury - 100 + yy : currentCentury + yy;
  } else {
    fullYear = yy <= currentTwoDigit + 50 ? currentCentury + yy : currentCentury - 100 + yy;
  }

  return `${fullYear}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;
}

function stripTrailingFillerNoise(rawField: string): string {
  let cleaned = rawField.replace(/<+$/g, '');
  let prev = '';
  while (cleaned !== prev) {
    prev = cleaned;
    cleaned = cleaned
      .replace(/<+$/g, '')
      .replace(/(?:<+[KL]){2,}[KLC<]*$/g, '')
      .replace(/<<<+[KLC<]*$/g, '')
      .replace(/<+[KL]{3,}[KLC<]*$/g, '')
      .replace(/<+[KL]{2,}[KL<]*$/g, '')
      .replace(/<<[KL]$/g, '')
      .replace(/<+$/g, '');
  }
  return cleaned;
}

function parseNames(nameField: string): {
  surname: string;
  surnames: string[];
  givenNames: string;
  givenNamesList: string[];
} {
  const cleanedField = stripTrailingFillerNoise(nameField);
  const parts = cleanedField.split('<<');
  const rawSurname = parts[0] ?? '';
  const rawGiven = parts.slice(1).join('<');

  const splitParts = (value: string): string[] =>
    fixAlphaField(value)
      .split(/<+/)
      .map((token) => token.trim())
      .filter(Boolean);

  const surnames = splitParts(rawSurname);
  const givenNamesList = splitParts(rawGiven);

  return {
    surname: surnames.join(' '),
    surnames,
    givenNames: givenNamesList.join(' '),
    givenNamesList,
  };
}

function parseSex(raw: string): 'M' | 'F' | 'X' | 'Unspecified' {
  const ch = raw.toUpperCase();
  if (ch === 'M') return 'M';
  if (ch === 'F') return 'F';
  if (ch === 'X') return 'X';
  return 'Unspecified';
}

function isMixedCaseVizSentence(rawLine: string): boolean {
  const trimmed = rawLine.trim();
  if (!trimmed) return true;
  // Multi-word mixed-case VIZ labels (e.g. "(4) Fecha de nacimiento / Date of birth") are never MRZ
  if (/[a-z]{3,}/.test(trimmed) && !trimmed.includes('<')) {
    return true;
  }
  if (/[/()]/.test(trimmed) && !trimmed.includes('<')) {
    return true;
  }
  return false;
}

function cleanMrzLine(line: string): string {
  const cleaned = line
    .replace(/\s+/g, '')
    .split('')
    .map(normalizeMrzChar)
    .join('');
  // Strip 1-2 leading '<' left-edge specks ahead of valid >=28-char MRZ content
  const leadingArtifact = cleaned.match(/^<{1,2}([A-Z0-9][A-Z0-9<]{27,})$/);
  if (leadingArtifact) {
    const tail = leadingArtifact[1];
    const chevrons = (tail.match(/</g) || []).length;
    const digits = (tail.match(/\d/g) || []).length;
    if (chevrons >= 2 || digits >= 5) {
      return tail;
    }
  }
  return cleaned;
}

function isLikelyMrzLine(line: string): boolean {
  if (line.length < 26) return false;
  if (!/^[A-Z0-9<]+$/.test(line)) return false;
  // A valid MRZ line never begins with '<'
  if (line.startsWith('<')) return false;
  const chevronCount = (line.match(/</g) || []).length;
  const digitCount = (line.match(/\d/g) || []).length;
  return chevronCount >= 2 || (digitCount >= 4 && line.length >= 28);
}

function padOrTrim(line: string, targetLength: number): string {
  if (line.length === targetLength) return line;
  if (line.length > targetLength) return line.slice(0, targetLength);
  return line.padEnd(targetLength, '<');
}

function checkDigitEntry(
  label: string,
  field: string,
  sourceSlice: string,
  actualDigitRaw: string
): CheckDigitStatus {
  const actual = fixCheckDigitChar(actualDigitRaw);
  const expected = computeCheckDigit(sourceSlice);
  return {
    label,
    field,
    expected,
    actual,
    valid: actual === expected,
  };
}

function resolveSingleLetterIssuingCountry(rawCountry: string, nationality: string): string {
  // Single-letter ICAO codes (notably Germany 'D<<') can pick up noise on col 4 (e.g. 'DS')
  if (nationality === 'D' && rawCountry.startsWith('D') && rawCountry.length === 2) {
    return 'D';
  }
  return rawCountry;
}

function parseTD3Single(line1Raw: string, line2Raw: string, isVisaA = false): MrzParsedData {
  const line1 = padOrTrim(line1Raw, 44);
  const line2 = padOrTrim(line2Raw, 44);

  const documentCode = fixAlphaField(line1.slice(0, 2)).replace(/</g, '');
  let issuingCountry = fixAlphaField(line1.slice(2, 5)).replace(/</g, '');
  const { surname, surnames, givenNames, givenNamesList } = parseNames(line1.slice(5, 44));

  const rawDocSlice = line2.slice(0, 9);
  const rawDocCheckChar = line2.slice(9, 10);
  let documentNumberCheck = fixCheckDigitChar(rawDocCheckChar);
  let documentNumberRaw = repairFieldWithCheckDigit(rawDocSlice, documentNumberCheck);
  const nationality = fixAlphaField(line2.slice(10, 13)).replace(/</g, '');
  issuingCountry = resolveSingleLetterIssuingCountry(issuingCountry, nationality);
  if (!issuingCountry && nationality) {
    issuingCountry = nationality;
  }

  const dobCheck = fixCheckDigitChar(line2.slice(19, 20));
  const dobRaw = repairDateFieldWithCheckDigit(line2.slice(13, 19), dobCheck);
  const sex = parseSex(line2.slice(20, 21));
  const expiryCheck = fixCheckDigitChar(line2.slice(27, 28));
  const expiryRaw = repairDateFieldWithCheckDigit(line2.slice(21, 27), expiryCheck);

  let optionalData1 = isVisaA ? line2.slice(28, 44) : line2.slice(28, 42);
  let personalCheck = isVisaA ? '' : fixCheckDigitChar(line2.slice(42, 43));
  const compositeCheck = isVisaA ? '' : fixCheckDigitChar(line2.slice(43, 44));

  if (!isVisaA && optionalData1.replace(/</g, '').length > 0) {
    optionalData1 = repairFieldWithCheckDigit(optionalData1, personalCheck);
  }

  if (
    !isVisaA &&
    computeCheckDigit(documentNumberRaw) === documentNumberCheck &&
    computeCheckDigit(dobRaw) === dobCheck &&
    computeCheckDigit(expiryRaw) === expiryCheck
  ) {
    const compositePrefix =
      documentNumberRaw +
      documentNumberCheck +
      dobRaw +
      dobCheck +
      expiryRaw +
      expiryCheck;
    const repairedOpt = repairSliceForCompositeCheck(
      compositePrefix,
      optionalData1,
      personalCheck,
      compositeCheck
    );
    if (repairedOpt !== optionalData1) {
      optionalData1 = repairedOpt;
      personalCheck = computeCheckDigit(optionalData1);
    }
  }

  // Recover document number + corrupted non-numeric check digit (e.g. '3' misread as 'I')
  // or mutated leading 2-letter alpha prefix using the verified composite check digit.
  if (
    !isVisaA &&
    computeCheckDigit(dobRaw) === dobCheck &&
    computeCheckDigit(expiryRaw) === expiryCheck &&
    /^\d$/.test(compositeCheck)
  ) {
    const currentComp =
      documentNumberRaw +
      documentNumberCheck +
      dobRaw +
      dobCheck +
      expiryRaw +
      expiryCheck +
      optionalData1 +
      personalCheck;
    const compFails = computeCheckDigit(currentComp) !== compositeCheck;
    const mutatedLeadingAlpha =
      /^[A-Z]{2}/.test(rawDocSlice) && !/^[A-Z]{2}/.test(documentNumberRaw);
    const docCheckCorruptedAlpha = /[^0-9]/.test(rawDocCheckChar);

    if (compFails && (docCheckCorruptedAlpha || mutatedLeadingAlpha)) {
      const docCands: string[] = [];
      for (const prefixLen of [2, 1, 3, 0]) {
        const prefix = rawDocSlice.slice(0, prefixLen);
        if (prefixLen > 0 && !/^[A-Z]+$/.test(prefix)) continue;
        docCands.push(prefix + softNumericFix(rawDocSlice.slice(prefixLen)));
      }
      docCands.push(rawDocSlice.replace(/[OQ]/g, '0'), rawDocSlice.replace(/[ODQ]/g, '0'));

      for (const cand of docCands) {
        const c = computeCheckDigit(cand);
        const compCandidate =
          cand + c + dobRaw + dobCheck + expiryRaw + expiryCheck + optionalData1 + personalCheck;
        if (computeCheckDigit(compCandidate) === compositeCheck) {
          documentNumberRaw = cand;
          documentNumberCheck = c;
          break;
        }
      }
    }
  }

  const checks: CheckDigitStatus[] = [
    checkDigitEntry('Document Number', 'documentNumber', documentNumberRaw, documentNumberCheck),
    checkDigitEntry('Date of Birth', 'dateOfBirth', dobRaw, dobCheck),
    checkDigitEntry('Date of Expiry', 'dateOfExpiry', expiryRaw, expiryCheck),
  ];

  if (!isVisaA) {
    if (optionalData1.replace(/</g, '').length > 0) {
      checks.push(
        checkDigitEntry('Personal Number', 'optionalData1', optionalData1, personalCheck)
      );
    }
    const compositeInput =
      documentNumberRaw +
      documentNumberCheck +
      dobRaw +
      dobCheck +
      expiryRaw +
      expiryCheck +
      optionalData1 +
      personalCheck;
    checks.push(
      checkDigitEntry('Composite Check', 'composite', compositeInput, compositeCheck)
    );
  }

  const validCount = checks.filter((c) => c.valid).length;
  const format: MrzFormat = isVisaA ? 'MRVA' : 'TD3';

  const repairedLine2 = isVisaA
    ? documentNumberRaw +
      documentNumberCheck +
      line2.slice(10, 13) +
      dobRaw +
      dobCheck +
      line2.slice(20, 21) +
      expiryRaw +
      expiryCheck +
      optionalData1
    : documentNumberRaw +
      documentNumberCheck +
      line2.slice(10, 13) +
      dobRaw +
      dobCheck +
      line2.slice(20, 21) +
      expiryRaw +
      expiryCheck +
      optionalData1 +
      personalCheck +
      compositeCheck;

  return {
    format,
    documentCode: documentCode || 'P',
    rawLines: [line1, repairedLine2],
    issuingCountry,
    surname,
    surnames,
    givenNames,
    givenNamesList,
    documentNumber: documentNumberRaw.replace(/</g, ''),
    nationality,
    dateOfBirth: parseMrzDate(dobRaw, 'birth'),
    rawDateOfBirth: dobRaw,
    sex,
    dateOfExpiry: parseMrzDate(expiryRaw, 'expiry'),
    rawDateOfExpiry: expiryRaw,
    optionalData1: optionalData1.replace(/</g, ''),
    optionalData2: '',
    checkDigits: checks,
    allCheckDigitsValid: validCount === checks.length,
    validCount,
    totalChecks: checks.length,
  };
}

function buildTd3TailVariants(prefixAdjustedLine2: string): string[] {
  const variants = [prefixAdjustedLine2];
  if (prefixAdjustedLine2.length <= 29) return variants;

  const head28 = prefixAdjustedLine2.slice(0, 28);
  const tail = prefixAdjustedLine2.slice(28);
  const body = tail.slice(0, -1);
  const lastChar = tail[tail.length - 1];

  if (tail.length > 16 && /^[<KL]+$/.test(body)) {
    variants.push(head28 + '<'.repeat(15) + lastChar);
  }

  const collapsed = body.replace(/(?:KL|LK)/g, '<');
  if (collapsed !== body || tail.length !== 16) {
    variants.push(head28 + padOrTrim(collapsed, 15) + lastChar);
  }

  const fillerDigits = tail.match(/^([<KL]+)(\d{1,2})$/);
  if (fillerDigits) {
    const digits = fillerDigits[2];
    if (digits.length === 2) {
      variants.push(head28 + '<'.repeat(14) + digits);
    }
    variants.push(head28 + '<'.repeat(15) + digits[digits.length - 1]);
  }

  return variants;
}

function scoreTd3Candidate(
  cand: MrzParsedData,
  line1Country: string,
  line2Raw?: string
): number {
  let score = cand.validCount * 10 + (cand.allCheckDigitsValid ? 5 : 0);
  if (cand.dateOfBirth) score += 2;
  if (cand.dateOfExpiry) score += 2;
  if (cand.sex !== 'Unspecified') score += 1;
  if (line1Country.length >= 2 && cand.nationality === line1Country) score += 1;
  if (
    line2Raw &&
    /^[A-Z]{2}/.test(cand.documentNumber) &&
    line2Raw.startsWith(cand.documentNumber.slice(0, 2))
  ) {
    score += 2;
  }
  return score;
}

function parseTD3(line1Raw: string, line2Raw: string, isVisaA = false): MrzParsedData {
  const line1Country = fixAlphaField(line1Raw.slice(2, 5)).replace(/</g, '');
  const base = parseTD3Single(line1Raw, line2Raw, isVisaA);
  if (isVisaA || base.allCheckDigitsValid) {
    return base;
  }

  const prefixVariants = new Set<string>([line2Raw]);

  // Recover 1-2 extra OCR characters inserted inside the document-number slice (0..9)
  // when the 3-letter country code + 6-digit DOB + sex clearly sit shifted at col 11 or 12.
  for (const shift of [1, 2]) {
    if (line2Raw.length < 28 + shift || line2Raw.length > 52) continue;
    const shiftedCountry = fixAlphaField(line2Raw.slice(10 + shift, 13 + shift)).replace(/</g, '');
    const shiftedRest = line2Raw.slice(13 + shift, 27 + shift);
    const countryMatches = line1Country.length >= 2 && shiftedCountry.startsWith(line1Country.slice(0, 2));
    const dateBandMatches = /^[A-Z0-9]{7}[MFX<][A-Z0-9]{6}/.test(shiftedRest);

    if (countryMatches || dateBandMatches) {
      prefixVariants.add(line2Raw.slice(shift));
      if (shift === 1) {
        for (let k = 1; k < 10; k++) {
          prefixVariants.add(line2Raw.slice(0, k) + line2Raw.slice(k + 1));
        }
      }
    }
  }

  // Recover a single stray OCR insertion inside nationality/DOB/sex/expiry (cols 10..27)
  // or optional data (cols 28..41), e.g. '0400210397R0OUB001014F...' or '0400210397R0U8B001014F...'
  if (line2Raw.length >= 45 && line2Raw.length <= 47) {
    const shiftedSexHint = /[MFX<]/.test(line2Raw[21] ?? '') || /[MFX<]/.test(line2Raw[22] ?? '');
    const shiftedExpiryDigits = /^\d{6}/.test(fixNumericField(line2Raw.slice(22, 28)));
    const shiftedNationalityMatch =
      line1Country.length >= 2 &&
      fixAlphaField(line2Raw.slice(10, 14)).includes(line1Country.slice(0, 2));

    if (shiftedSexHint || shiftedExpiryDigits || shiftedNationalityMatch) {
      for (let k = 10; k <= 27 && k < line2Raw.length; k++) {
        prefixVariants.add(line2Raw.slice(0, k) + line2Raw.slice(k + 1));
      }
    }

    const docCheckMatches =
      computeCheckDigit(padOrTrim(line2Raw, 44).slice(0, 9)) === fixCheckDigitChar(line2Raw[9] ?? '');
    if (docCheckMatches) {
      for (let k = 28; k < Math.min(42, line2Raw.length); k++) {
        prefixVariants.add(line2Raw.slice(0, k) + line2Raw.slice(k + 1));
      }
    }
  }

  // Recover dual insertions (one inside document number 0..9 + one before nationality/DOB 10..15),
  // e.g. 'TADOOOODO<3IXXB8412254F1903278<<<<<<<<<<<<<<04'.
  if (line2Raw.length >= 46 && line2Raw.length <= 47) {
    const shifted2Sex = /[MFX<]/.test(line2Raw[22] ?? '');
    const shifted2Expiry = /^\d{6}/.test(fixNumericField(line2Raw.slice(23, 29)));
    const shifted2Nat =
      line1Country.length >= 2 &&
      fixAlphaField(line2Raw.slice(11, 16)).includes(line1Country.slice(0, 2));
    if (shifted2Sex || shifted2Expiry || shifted2Nat) {
      for (let k1 = 1; k1 < 10; k1++) {
        const s1 = line2Raw.slice(0, k1) + line2Raw.slice(k1 + 1);
        for (let k2 = 10; k2 <= 15 && k2 < s1.length; k2++) {
          prefixVariants.add(s1.slice(0, k2) + s1.slice(k2 + 1));
        }
      }
    }
  }

  const candidateLines = new Set<string>();
  for (const pv of prefixVariants) {
    for (const v of buildTd3TailVariants(pv)) {
      candidateLines.add(v);
    }
  }

  let best = base;
  let bestScore = scoreTd3Candidate(base, line1Country, line2Raw);
  for (const altLine2 of candidateLines) {
    if (altLine2 === line2Raw) continue;
    const cand = parseTD3Single(line1Raw, altLine2, false);
    const candScore = scoreTd3Candidate(cand, line1Country, line2Raw);
    if (candScore > bestScore) {
      bestScore = candScore;
      best = cand;
    }
  }

  return best;
}

function parseTD1(line1Raw: string, line2Raw: string, line3Raw: string): MrzParsedData {
  const line1 = padOrTrim(line1Raw, 30);
  const line2 = padOrTrim(line2Raw, 30);
  const line3 = padOrTrim(line3Raw, 30);

  const documentCode = fixAlphaField(line1.slice(0, 2)).replace(/</g, '');
  let issuingCountry = fixAlphaField(line1.slice(2, 5)).replace(/</g, '');
  const documentNumberCheck = fixCheckDigitChar(line1.slice(14, 15));
  const documentNumberRaw = repairFieldWithCheckDigit(line1.slice(5, 14), documentNumberCheck);
  let optionalData1 = line1.slice(15, 30);

  const dobCheck = fixCheckDigitChar(line2.slice(6, 7));
  const dobRaw = repairDateFieldWithCheckDigit(line2.slice(0, 6), dobCheck);
  const sex = parseSex(line2.slice(7, 8));
  const expiryCheck = fixCheckDigitChar(line2.slice(14, 15));
  const expiryRaw = repairDateFieldWithCheckDigit(line2.slice(8, 14), expiryCheck);
  const nationality = fixAlphaField(line2.slice(15, 18)).replace(/</g, '');
  issuingCountry = resolveSingleLetterIssuingCountry(issuingCountry, nationality);
  if (!issuingCountry && nationality) {
    issuingCountry = nationality;
  }

  let optionalData2 = line2.slice(18, 29);
  const compositeCheck = fixCheckDigitChar(line2.slice(29, 30));

  if (
    computeCheckDigit(documentNumberRaw) === documentNumberCheck &&
    computeCheckDigit(dobRaw) === dobCheck &&
    computeCheckDigit(expiryRaw) === expiryCheck
  ) {
    optionalData1 = repairSliceForCompositeCheck(
      documentNumberRaw + documentNumberCheck,
      optionalData1,
      dobRaw + dobCheck + expiryRaw + expiryCheck + optionalData2,
      compositeCheck
    );
    optionalData2 = repairSliceForCompositeCheck(
      documentNumberRaw + documentNumberCheck + optionalData1 + dobRaw + dobCheck + expiryRaw + expiryCheck,
      optionalData2,
      '',
      compositeCheck
    );
  }

  const { surname, surnames, givenNames, givenNamesList } = parseNames(line3);

  const repairedLine1 =
    line1.slice(0, 5) + documentNumberRaw + documentNumberCheck + optionalData1;
  const repairedLine2 =
    dobRaw + dobCheck + line2.slice(7, 8) + expiryRaw + expiryCheck + line2.slice(15, 18) + optionalData2 + compositeCheck;

  const compositeInput =
    documentNumberRaw +
    documentNumberCheck +
    optionalData1 +
    dobRaw +
    dobCheck +
    expiryRaw +
    expiryCheck +
    optionalData2;

  const checks: CheckDigitStatus[] = [
    checkDigitEntry('Document Number', 'documentNumber', documentNumberRaw, documentNumberCheck),
    checkDigitEntry('Date of Birth', 'dateOfBirth', dobRaw, dobCheck),
    checkDigitEntry('Date of Expiry', 'dateOfExpiry', expiryRaw, expiryCheck),
    checkDigitEntry('Composite Check', 'composite', compositeInput, compositeCheck),
  ];

  const validCount = checks.filter((c) => c.valid).length;

  return {
    format: 'TD1',
    documentCode,
    rawLines: [repairedLine1, repairedLine2, line3],
    issuingCountry,
    surname,
    surnames,
    givenNames,
    givenNamesList,
    documentNumber: documentNumberRaw.replace(/</g, ''),
    nationality,
    dateOfBirth: parseMrzDate(dobRaw, 'birth'),
    rawDateOfBirth: dobRaw,
    sex,
    dateOfExpiry: parseMrzDate(expiryRaw, 'expiry'),
    rawDateOfExpiry: expiryRaw,
    optionalData1: optionalData1.replace(/</g, ''),
    optionalData2: optionalData2.replace(/</g, ''),
    checkDigits: checks,
    allCheckDigitsValid: validCount === checks.length,
    validCount,
    totalChecks: checks.length,
  };
}

function parseTD2(line1Raw: string, line2Raw: string, isVisaB = false): MrzParsedData {
  const line1 = padOrTrim(line1Raw, 36);
  const line2 = padOrTrim(line2Raw, 36);

  const documentCode = fixAlphaField(line1.slice(0, 2)).replace(/</g, '');
  let issuingCountry = fixAlphaField(line1.slice(2, 5)).replace(/</g, '');
  const { surname, surnames, givenNames, givenNamesList } = parseNames(line1.slice(5, 36));

  const documentNumberCheck = fixCheckDigitChar(line2.slice(9, 10));
  const documentNumberRaw = repairFieldWithCheckDigit(line2.slice(0, 9), documentNumberCheck);
  const nationality = fixAlphaField(line2.slice(10, 13)).replace(/</g, '');
  issuingCountry = resolveSingleLetterIssuingCountry(issuingCountry, nationality);
  if (!issuingCountry && nationality) {
    issuingCountry = nationality;
  }

  const dobCheck = fixCheckDigitChar(line2.slice(19, 20));
  const dobRaw = repairDateFieldWithCheckDigit(line2.slice(13, 19), dobCheck);
  const sex = parseSex(line2.slice(20, 21));
  const expiryCheck = fixCheckDigitChar(line2.slice(27, 28));
  const expiryRaw = repairDateFieldWithCheckDigit(line2.slice(21, 27), expiryCheck);
  let optionalData1 = isVisaB ? line2.slice(28, 36) : line2.slice(28, 35);
  const compositeCheck = isVisaB ? '' : fixCheckDigitChar(line2.slice(35, 36));

  if (
    !isVisaB &&
    computeCheckDigit(documentNumberRaw) === documentNumberCheck &&
    computeCheckDigit(dobRaw) === dobCheck &&
    computeCheckDigit(expiryRaw) === expiryCheck
  ) {
    optionalData1 = repairSliceForCompositeCheck(
      documentNumberRaw + documentNumberCheck + dobRaw + dobCheck + expiryRaw + expiryCheck,
      optionalData1,
      '',
      compositeCheck
    );
  }

  const checks: CheckDigitStatus[] = [
    checkDigitEntry('Document Number', 'documentNumber', documentNumberRaw, documentNumberCheck),
    checkDigitEntry('Date of Birth', 'dateOfBirth', dobRaw, dobCheck),
    checkDigitEntry('Date of Expiry', 'dateOfExpiry', expiryRaw, expiryCheck),
  ];

  if (!isVisaB) {
    const compositeInput =
      documentNumberRaw +
      documentNumberCheck +
      dobRaw +
      dobCheck +
      expiryRaw +
      expiryCheck +
      optionalData1;
    checks.push(
      checkDigitEntry('Composite Check', 'composite', compositeInput, compositeCheck)
    );
  }

  const validCount = checks.filter((c) => c.valid).length;
  const repairedLine2 = isVisaB
    ? documentNumberRaw +
      documentNumberCheck +
      line2.slice(10, 13) +
      dobRaw +
      dobCheck +
      line2.slice(20, 21) +
      expiryRaw +
      expiryCheck +
      optionalData1
    : documentNumberRaw +
      documentNumberCheck +
      line2.slice(10, 13) +
      dobRaw +
      dobCheck +
      line2.slice(20, 21) +
      expiryRaw +
      expiryCheck +
      optionalData1 +
      compositeCheck;

  return {
    format: isVisaB ? 'MRVB' : 'TD2',
    documentCode,
    rawLines: [line1, repairedLine2],
    issuingCountry,
    surname,
    surnames,
    givenNames,
    givenNamesList,
    documentNumber: documentNumberRaw.replace(/</g, ''),
    nationality,
    dateOfBirth: parseMrzDate(dobRaw, 'birth'),
    rawDateOfBirth: dobRaw,
    sex,
    dateOfExpiry: parseMrzDate(expiryRaw, 'expiry'),
    rawDateOfExpiry: expiryRaw,
    optionalData1: optionalData1.replace(/</g, ''),
    optionalData2: '',
    checkDigits: checks,
    allCheckDigitsValid: validCount === checks.length,
    validCount,
    totalChecks: checks.length,
  };
}

/**
 * Synthesizes a cross-candidate consensus MRZ parse by performing weighted per-column
 * character voting across multiple OCR/grid candidates sharing the same ICAO format.
 * Helps recover lines where individual passes disagree on 1-2 isolated characters.
 */
export function synthesizeConsensusMrz(candidates: MrzParsedData[]): MrzParsedData | null {
  if (candidates.length < 2) return null;

  const groups = new Map<MrzFormat, MrzParsedData[]>();
  for (const cand of candidates) {
    const bucket = groups.get(cand.format) ?? [];
    bucket.push(cand);
    groups.set(cand.format, bucket);
  }

  let bestFormat: MrzFormat | null = null;
  let bestGroupScore = -1;
  for (const [fmt, group] of groups.entries()) {
    if (group.length < 2) continue;
    const totalWeight = group.reduce((acc, g) => acc + g.validCount * 3 + 1, 0);
    if (totalWeight > bestGroupScore) {
      bestGroupScore = totalWeight;
      bestFormat = fmt;
    }
  }

  if (!bestFormat) return null;
  const group = groups.get(bestFormat)!;
  const lineCount = bestFormat === 'TD1' ? 3 : 2;
  const lineLen = bestFormat === 'TD1' ? 30 : bestFormat === 'TD2' || bestFormat === 'MRVB' ? 36 : 44;

  const votedLines: string[] = [];
  for (let row = 0; row < lineCount; row++) {
    let lineOut = '';
    for (let col = 0; col < lineLen; col++) {
      const counts = new Map<string, number>();
      for (const cand of group) {
        const line = cand.rawLines[row] ?? '';
        const ch = line[col] ?? '<';
        const weight = cand.validCount * 2 + (cand.allCheckDigitsValid ? 4 : 1);
        counts.set(ch, (counts.get(ch) ?? 0) + weight);
      }
      let bestChar = '<';
      let bestCharWeight = -1;
      for (const [ch, w] of counts.entries()) {
        if (w > bestCharWeight) {
          bestCharWeight = w;
          bestChar = ch;
        }
      }
      lineOut += bestChar;
    }
    votedLines.push(lineOut);
  }

  if (bestFormat === 'TD1') {
    return parseTD1(votedLines[0], votedLines[1], votedLines[2]);
  }
  if (bestFormat === 'TD2' || bestFormat === 'MRVB') {
    return parseTD2(votedLines[0], votedLines[1], bestFormat === 'MRVB');
  }
  return parseTD3(votedLines[0], votedLines[1], bestFormat === 'MRVA');
}

export function parseMrzFromText(rawText: string): MrzParsedData | null {
  const lines = rawText
    .split(/\r?\n/)
    .filter((l) => !isMixedCaseVizSentence(l))
    .map(cleanMrzLine)
    .filter(isLikelyMrzLine);

  if (lines.length < 2) return null;

  const candidates: MrzParsedData[] = [];

  for (let i = 0; i <= lines.length - 3; i++) {
    const l1 = lines[i];
    const l2 = lines[i + 1];
    const l3 = lines[i + 2];
    const avgLen = (l1.length + l2.length + l3.length) / 3;
    if (avgLen >= 27 && avgLen <= 35 && /^[IAC]/.test(l1)) {
      candidates.push(parseTD1(l1, l2, l3));
    }
  }

  for (let i = 0; i <= lines.length - 2; i++) {
    const l1 = lines[i];
    const l2 = lines[i + 1];
    const maxLen = Math.max(l1.length, l2.length);
    const minLen = Math.min(l1.length, l2.length);

    if (maxLen >= 40 && minLen >= 38 && /^[PV]/.test(l1)) {
      const isVisa = l1.startsWith('V');
      candidates.push(parseTD3(l1, l2, isVisa));
    } else if (minLen >= 33 && maxLen <= 39 && /^[PVIAC]/.test(l1) && !/^[IAC]/.test(l1)) {
      const isVisa = l1.startsWith('V');
      candidates.push(parseTD2(l1, l2, isVisa));
    }
  }

  if (candidates.length === 0) {
    if (lines.length >= 3 && lines[lines.length - 3].length <= 36 && /^[IAC]/.test(lines[lines.length - 3])) {
      candidates.push(
        parseTD1(
          lines[lines.length - 3],
          lines[lines.length - 2],
          lines[lines.length - 1]
        )
      );
    } else {
      const l1 = lines[lines.length - 2];
      const l2 = lines[lines.length - 1];
      if (/^[PVIAC]/.test(l1)) {
        if (Math.max(l1.length, l2.length) >= 39) {
          candidates.push(parseTD3(l1, l2, l1.startsWith('V')));
        } else {
          candidates.push(parseTD2(l1, l2, l1.startsWith('V')));
        }
      }
    }
  }

  if (candidates.length === 0) return null;

  candidates.sort((a, b) => {
    const scoreA =
      a.validCount * 10 +
      (a.dateOfBirth ? 3 : 0) +
      (a.dateOfExpiry ? 3 : 0) +
      (a.surname ? 2 : 0) +
      (a.givenNames ? 2 : 0);
    const scoreB =
      b.validCount * 10 +
      (b.dateOfBirth ? 3 : 0) +
      (b.dateOfExpiry ? 3 : 0) +
      (b.surname ? 2 : 0) +
      (b.givenNames ? 2 : 0);
    return scoreB - scoreA;
  });

  return candidates[0];
}
