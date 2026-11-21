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
  I: ['1', '9'],
  L: ['1'],
  T: ['1'],
  Z: ['2'],
  S: ['5'],
  G: ['6'],
  B: ['8'],
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
    .replace(/Z/g, '2')
    .replace(/S/g, '5')
    .replace(/G/g, '6')
    .replace(/B/g, '8');
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

function repairFieldWithCheckDigit(raw: string, actualCheckDigit: string): string {
  const check = fixNumericField(actualCheckDigit);
  if (!/^\d$/.test(check)) return raw;
  if (computeCheckDigit(raw) === check) return raw;

  const zeroFixed = raw.replace(/[ODQ]/g, '0');
  if (computeCheckDigit(zeroFixed) === check) return zeroFixed;

  const softNumericFix = (s: string) =>
    s
      .replace(/[ODQ]/g, '0')
      .replace(/[IL]/g, '1')
      .replace(/Z/g, '2')
      .replace(/S/g, '5')
      .replace(/G/g, '6')
      .replace(/B/g, '8');

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
    cleaned = cleaned.replace(/(?:<+[KL]{2,}|<<[KL])$/g, '').replace(/<+$/g, '');
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
  return line
    .replace(/\s+/g, '')
    .split('')
    .map(normalizeMrzChar)
    .join('');
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
  const actual = fixNumericField(actualDigitRaw);
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

function parseTD3(line1Raw: string, line2Raw: string, isVisaA = false): MrzParsedData {
  const line1 = padOrTrim(line1Raw, 44);
  const line2 = padOrTrim(line2Raw, 44);

  const documentCode = fixAlphaField(line1.slice(0, 2)).replace(/</g, '');
  let issuingCountry = fixAlphaField(line1.slice(2, 5)).replace(/</g, '');
  const { surname, surnames, givenNames, givenNamesList } = parseNames(line1.slice(5, 44));

  const documentNumberCheck = line2.slice(9, 10);
  const documentNumberRaw = repairFieldWithCheckDigit(line2.slice(0, 9), documentNumberCheck);
  const nationality = fixAlphaField(line2.slice(10, 13)).replace(/</g, '');
  issuingCountry = resolveSingleLetterIssuingCountry(issuingCountry, nationality);
  if (!issuingCountry && nationality) {
    issuingCountry = nationality;
  }

  const dobRaw = fixNumericField(line2.slice(13, 19));
  const dobCheck = line2.slice(19, 20);
  const sex = parseSex(line2.slice(20, 21));
  const expiryRaw = fixNumericField(line2.slice(21, 27));
  const expiryCheck = line2.slice(27, 28);

  const optionalData1 = isVisaA ? line2.slice(28, 44) : line2.slice(28, 42);
  const personalCheck = isVisaA ? '' : line2.slice(42, 43);
  const compositeCheck = isVisaA ? '' : line2.slice(43, 44);

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

  const repairedLine2 =
    documentNumberRaw +
    documentNumberCheck +
    line2.slice(10, 13) +
    dobRaw +
    dobCheck +
    line2.slice(20, 21) +
    expiryRaw +
    expiryCheck +
    line2.slice(28, 44);

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

function parseTD1(line1Raw: string, line2Raw: string, line3Raw: string): MrzParsedData {
  const line1 = padOrTrim(line1Raw, 30);
  const line2 = padOrTrim(line2Raw, 30);
  const line3 = padOrTrim(line3Raw, 30);

  const documentCode = fixAlphaField(line1.slice(0, 2)).replace(/</g, '');
  let issuingCountry = fixAlphaField(line1.slice(2, 5)).replace(/</g, '');
  const documentNumberCheck = line1.slice(14, 15);
  const documentNumberRaw = repairFieldWithCheckDigit(line1.slice(5, 14), documentNumberCheck);
  const optionalData1 = line1.slice(15, 30);

  const dobRaw = fixNumericField(line2.slice(0, 6));
  const dobCheck = line2.slice(6, 7);
  const sex = parseSex(line2.slice(7, 8));
  const expiryRaw = fixNumericField(line2.slice(8, 14));
  const expiryCheck = line2.slice(14, 15);
  const nationality = fixAlphaField(line2.slice(15, 18)).replace(/</g, '');
  issuingCountry = resolveSingleLetterIssuingCountry(issuingCountry, nationality);
  if (!issuingCountry && nationality) {
    issuingCountry = nationality;
  }

  const optionalData2 = line2.slice(18, 29);
  const compositeCheck = line2.slice(29, 30);

  const { surname, surnames, givenNames, givenNamesList } = parseNames(line3);

  const repairedLine1 =
    line1.slice(0, 5) + documentNumberRaw + documentNumberCheck + optionalData1;
  const repairedLine2 =
    dobRaw + dobCheck + line2.slice(7, 8) + expiryRaw + expiryCheck + line2.slice(15, 30);

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

  const documentNumberCheck = line2.slice(9, 10);
  const documentNumberRaw = repairFieldWithCheckDigit(line2.slice(0, 9), documentNumberCheck);
  const nationality = fixAlphaField(line2.slice(10, 13)).replace(/</g, '');
  issuingCountry = resolveSingleLetterIssuingCountry(issuingCountry, nationality);
  if (!issuingCountry && nationality) {
    issuingCountry = nationality;
  }

  const dobRaw = fixNumericField(line2.slice(13, 19));
  const dobCheck = line2.slice(19, 20);
  const sex = parseSex(line2.slice(20, 21));
  const expiryRaw = fixNumericField(line2.slice(21, 27));
  const expiryCheck = line2.slice(27, 28);
  const optionalData1 = isVisaB ? line2.slice(28, 36) : line2.slice(28, 35);
  const compositeCheck = isVisaB ? '' : line2.slice(35, 36);

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

  return {
    format: isVisaB ? 'MRVB' : 'TD2',
    documentCode,
    rawLines: [line1, line2],
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
