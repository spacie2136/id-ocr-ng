import type { AamvaParsedData } from './types';

interface JurisdictionEntry {
  country: 'USA' | 'CAN' | 'MEX';
  code: string;
  name: string;
}

/**
 * Standard AAMVA Issuer Identification Number (IIN) directory for North American
 * driver licenses and identification cards.
 */
export const AAMVA_IIN_DIRECTORY: Record<string, JurisdictionEntry> = {
  '636033': { country: 'USA', code: 'AL', name: 'Alabama' },
  '636059': { country: 'USA', code: 'AK', name: 'Alaska' },
  '636026': { country: 'USA', code: 'AZ', name: 'Arizona' },
  '636021': { country: 'USA', code: 'AR', name: 'Arkansas' },
  '636014': { country: 'USA', code: 'CA', name: 'California' },
  '636020': { country: 'USA', code: 'CO', name: 'Colorado' },
  '636006': { country: 'USA', code: 'CT', name: 'Connecticut' },
  '636011': { country: 'USA', code: 'DE', name: 'Delaware' },
  '636043': { country: 'USA', code: 'DC', name: 'District of Columbia' },
  '636010': { country: 'USA', code: 'FL', name: 'Florida' },
  '636055': { country: 'USA', code: 'GA', name: 'Georgia' },
  '636047': { country: 'USA', code: 'HI', name: 'Hawaii' },
  '636050': { country: 'USA', code: 'ID', name: 'Idaho' },
  '636035': { country: 'USA', code: 'IL', name: 'Illinois' },
  '636037': { country: 'USA', code: 'IN', name: 'Indiana' },
  '636018': { country: 'USA', code: 'IA', name: 'Iowa' },
  '636022': { country: 'USA', code: 'KS', name: 'Kansas' },
  '636046': { country: 'USA', code: 'KY', name: 'Kentucky' },
  '636007': { country: 'USA', code: 'LA', name: 'Louisiana' },
  '636041': { country: 'USA', code: 'ME', name: 'Maine' },
  '636003': { country: 'USA', code: 'MD', name: 'Maryland' },
  '636002': { country: 'USA', code: 'MA', name: 'Massachusetts' },
  '636032': { country: 'USA', code: 'MI', name: 'Michigan' },
  '636038': { country: 'USA', code: 'MN', name: 'Minnesota' },
  '636051': { country: 'USA', code: 'MS', name: 'Mississippi' },
  '636030': { country: 'USA', code: 'MO', name: 'Missouri' },
  '636008': { country: 'USA', code: 'MT', name: 'Montana' },
  '636054': { country: 'USA', code: 'NE', name: 'Nebraska' },
  '636049': { country: 'USA', code: 'NV', name: 'Nevada' },
  '636039': { country: 'USA', code: 'NH', name: 'New Hampshire' },
  '636036': { country: 'USA', code: 'NJ', name: 'New Jersey' },
  '636009': { country: 'USA', code: 'NM', name: 'New Mexico' },
  '636001': { country: 'USA', code: 'NY', name: 'New York' },
  '636004': { country: 'USA', code: 'NC', name: 'North Carolina' },
  '636034': { country: 'USA', code: 'ND', name: 'North Dakota' },
  '636023': { country: 'USA', code: 'OH', name: 'Ohio' },
  '636058': { country: 'USA', code: 'OK', name: 'Oklahoma' },
  '636029': { country: 'USA', code: 'OR', name: 'Oregon' },
  '636025': { country: 'USA', code: 'PA', name: 'Pennsylvania' },
  '636052': { country: 'USA', code: 'RI', name: 'Rhode Island' },
  '636005': { country: 'USA', code: 'SC', name: 'South Carolina' },
  '636042': { country: 'USA', code: 'SD', name: 'South Dakota' },
  '636053': { country: 'USA', code: 'TN', name: 'Tennessee' },
  '636015': { country: 'USA', code: 'TX', name: 'Texas' },
  '636040': { country: 'USA', code: 'UT', name: 'Utah' },
  '636024': { country: 'USA', code: 'VT', name: 'Vermont' },
  '636000': { country: 'USA', code: 'VA', name: 'Virginia' },
  '636045': { country: 'USA', code: 'WA', name: 'Washington' },
  '636061': { country: 'USA', code: 'WV', name: 'West Virginia' },
  '636031': { country: 'USA', code: 'WI', name: 'Wisconsin' },
  '636060': { country: 'USA', code: 'WY', name: 'Wyoming' },
  '604426': { country: 'USA', code: 'PR', name: 'Puerto Rico' },
  '604429': { country: 'USA', code: 'VI', name: 'U.S. Virgin Islands' },
  '636019': { country: 'USA', code: 'GU', name: 'Guam' },
  // Canadian provinces
  '636012': { country: 'CAN', code: 'ON', name: 'Ontario' },
  '636028': { country: 'CAN', code: 'BC', name: 'British Columbia' },
  '604432': { country: 'CAN', code: 'AB', name: 'Alberta' },
  '636044': { country: 'CAN', code: 'SK', name: 'Saskatchewan' },
  '636048': { country: 'CAN', code: 'MB', name: 'Manitoba' },
  '636016': { country: 'CAN', code: 'QC', name: 'Quebec' },
  '636017': { country: 'CAN', code: 'NB', name: 'New Brunswick' },
  '636056': { country: 'CAN', code: 'NL', name: 'Newfoundland and Labrador' },
  '636065': { country: 'CAN', code: 'NS', name: 'Nova Scotia' },
  '604430': { country: 'CAN', code: 'PE', name: 'Prince Edward Island' },
  '604431': { country: 'CAN', code: 'YT', name: 'Yukon' },
  '604434': { country: 'CAN', code: 'NT', name: 'Northwest Territories' },
};

const KNOWN_AAMVA_CODES = new Set([
  'DAA', 'DAB', 'DAC', 'DAD', 'DAE', 'DAF', 'DAG', 'DAH', 'DAI', 'DAJ', 'DAK', 'DAL',
  'DAM', 'DAN', 'DAO', 'DAP', 'DAQ', 'DAR', 'DAS', 'DAT', 'DAU', 'DAV', 'DAW', 'DAX',
  'DAY', 'DAZ', 'DBA', 'DBB', 'DBC', 'DBD', 'DBE', 'DBF', 'DBG', 'DBH', 'DBI', 'DBJ',
  'DBK', 'DBL', 'DBM', 'DBN', 'DBO', 'DBP', 'DBQ', 'DBR', 'DBS',
  'DCA', 'DCB', 'DCC', 'DCD', 'DCE', 'DCF', 'DCG', 'DCH', 'DCI', 'DCJ', 'DCK', 'DCL',
  'DCM', 'DCN', 'DCO', 'DCP', 'DCQ', 'DCR', 'DCS', 'DCT', 'DCU',
  'DDA', 'DDB', 'DDC', 'DDD', 'DDE', 'DDF', 'DDG', 'DDH', 'DDI', 'DDJ', 'DDK', 'DDL',
]);

function isValidCalendarDate(year: number, month: number, day: number): boolean {
  if (year < 1900 || year > 2120 || month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }
  const dt = new Date(Date.UTC(year, month - 1, day));
  return (
    dt.getUTCFullYear() === year &&
    dt.getUTCMonth() === month - 1 &&
    dt.getUTCDate() === day
  );
}

function formatIsoDate(year: number, month: number, day: number): string {
  return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function normalizeAamvaDate(
  raw: string | undefined | null,
  countryHint?: string | null
): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  const digits = trimmed.replace(/\D/g, '');

  if (digits.length === 8) {
    const first4 = Number(digits.slice(0, 4));
    const yyyymmddValid = isValidCalendarDate(
      first4,
      Number(digits.slice(4, 6)),
      Number(digits.slice(6, 8))
    );
    const mmddyyyyValid = isValidCalendarDate(
      Number(digits.slice(4, 8)),
      Number(digits.slice(0, 2)),
      Number(digits.slice(2, 4))
    );

    if (countryHint === 'CAN') {
      if (yyyymmddValid) {
        return formatIsoDate(first4, Number(digits.slice(4, 6)), Number(digits.slice(6, 8)));
      }
      if (mmddyyyyValid) {
        return formatIsoDate(
          Number(digits.slice(4, 8)),
          Number(digits.slice(0, 2)),
          Number(digits.slice(2, 4))
        );
      }
    } else {
      if (mmddyyyyValid && !(first4 >= 1900 && first4 <= 2099 && !mmddyyyyValid)) {
        return formatIsoDate(
          Number(digits.slice(4, 8)),
          Number(digits.slice(0, 2)),
          Number(digits.slice(2, 4))
        );
      }
      if (yyyymmddValid) {
        return formatIsoDate(first4, Number(digits.slice(4, 6)), Number(digits.slice(6, 8)));
      }
    }
  }

  const isoMatch = trimmed.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
  if (isoMatch) {
    const y = Number(isoMatch[1]);
    const m = Number(isoMatch[2]);
    const d = Number(isoMatch[3]);
    if (isValidCalendarDate(y, m, d)) return formatIsoDate(y, m, d);
  }

  const slashMatch = trimmed.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (slashMatch) {
    const m = Number(slashMatch[1]);
    const d = Number(slashMatch[2]);
    const y = Number(slashMatch[3]);
    if (isValidCalendarDate(y, m, d)) return formatIsoDate(y, m, d);
  }

  return null;
}

function normalizePostalCode(raw: string | undefined, country: string | null): string | null {
  if (!raw) return null;
  const cleaned = raw.trim().replace(/\s+/g, '');
  if (!cleaned) return null;

  if (country !== 'CAN' && /^\d{9}$/.test(cleaned)) {
    const zip5 = cleaned.slice(0, 5);
    const zip4 = cleaned.slice(5);
    return zip4 === '0000' ? zip5 : `${zip5}-${zip4}`;
  }
  if (country === 'CAN' && /^[A-Z]\d[A-Z]\d[A-Z]\d$/i.test(cleaned)) {
    return `${cleaned.slice(0, 3).toUpperCase()} ${cleaned.slice(3).toUpperCase()}`;
  }
  return raw.trim();
}

function normalizeHeight(raw: string | undefined): string | null {
  if (!raw) return null;
  const t = raw.trim();
  const inMatch = t.match(/^(\d{2,3})\s*in$/i);
  if (inMatch) {
    const totalIn = Number(inMatch[1]);
    if (totalIn > 24 && totalIn < 110) {
      const feet = Math.floor(totalIn / 12);
      const inches = totalIn % 12;
      const cm = Math.round(totalIn * 2.54);
      return `${feet}'${inches}" (${cm} cm)`;
    }
  }
  const cmMatch = t.match(/^(\d{2,3})\s*cm$/i);
  if (cmMatch) {
    return `${cmMatch[1]} cm`;
  }
  if (/^\d{3}$/.test(t)) {
    // AAMVA 2000 3-digit FII (e.g. 510 = 5'10")
    const feet = Number(t[0]);
    const inches = Number(t.slice(1));
    if (feet >= 3 && feet <= 8 && inches < 12) {
      return `${feet}'${inches}"`;
    }
  }
  return t || null;
}

function cleanFieldValue(val: string | undefined): string | null {
  if (!val) return null;
  const cleaned = val.trim().replace(/\s+/g, ' ');
  if (!cleaned || cleaned === 'NONE' || cleaned === 'N/A' || /^<+$/.test(cleaned)) {
    return cleaned === 'NONE' ? 'NONE' : null;
  }
  return cleaned;
}

/**
 * Parses an AAMVA DL/ID PDF417 barcode raw text payload into structured fields.
 * Supports AAMVA CDS versions 01 through 10+ across US states, Canadian provinces,
 * and territories, as well as legacy `DAA`/`DAB`/`DCT` payloads.
 */
export function parseAamvaPayload(rawText: string): AamvaParsedData | null {
  if (!rawText || typeof rawText !== 'string') return null;

  // Quickly verify signature (standard `@` + ANSI/AAMVA header or unmistakable AAMVA field cluster)
  const hasAnsiHeader = /(?:^|[\r\n\x1e])(?:@\s*[\r\n\x1e]*)?(?:ANSI|AAMVA)\s*\d{6}/i.test(
    rawText
  );
  const subfileHits = (
    rawText.match(/(?:^|[\r\n\x1e])(?:DL|ID)?(?:DCS|DAC|DAQ|DBB|DBA|DAA)[A-Z0-9]/g) || []
  ).length;

  if (!hasAnsiHeader && subfileHits < 2) {
    return null;
  }

  let iin: string | null = null;
  let version: string | null = null;
  let jurisdictionVersion: string | null = null;
  let primarySubfileType: string | null = null;

  const headerMatch = rawText.match(
    /(?:ANSI|AAMVA)\s*(\d{6})(\d{2})(\d{2})(\d{2})?([A-Z]{2})?/i
  );
  if (headerMatch) {
    iin = headerMatch[1] || null;
    version = headerMatch[2] || null;
    jurisdictionVersion = headerMatch[3] || null;
    if (headerMatch[5]) {
      primarySubfileType = headerMatch[5].toUpperCase();
    }
  }

  // Extract subfile type cleanly if offset/length table is immediately after entries count
  const subfileMatch = rawText.match(
    /(?:ANSI|AAMVA)\s*\d{10}(?:\d{2})?([A-Z]{2})\d{8}/i
  );
  if (subfileMatch) {
    primarySubfileType = subfileMatch[1].toUpperCase();
  }

  // Split segments on CR / LF / RS (0x1E) / GS (0x1D)
  const rawSegments = rawText
    .split(/[\r\n\x1e\x1d]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const fields: Record<string, string> = {};

  for (let i = 0; i < rawSegments.length; i++) {
    let seg = rawSegments[i];

    // First segment of a subfile may begin with `DL` or `ID` prefix attached to the first element (e.g. `DLDCSDOE` or `DLDAQ12345`)
    if (/^(?:DL|ID|EN)D[A-Z]{2}/.test(seg)) {
      if (!primarySubfileType) {
        primarySubfileType = seg.slice(0, 2);
      }
      seg = seg.slice(2);
    }

    // If an AAMVA payload omits ANSI header offset table cleanly, check `...DLDAQ...` at end of header line
    if (/^(?:@|ANSI|AAMVA)/.test(seg)) {
      const embedded = seg.match(/(?:DL|ID)(D[A-Z]{2}.*)$/);
      if (embedded) {
        if (!primarySubfileType) {
          primarySubfileType = seg.slice(embedded.index!, embedded.index! + 2);
        }
        seg = embedded[1];
      } else {
        continue;
      }
    }

    const code = seg.slice(0, 3).toUpperCase();
    const value = seg.slice(3).trim();

    if (/^D[A-Z]{2}$/.test(code) && (KNOWN_AAMVA_CODES.has(code) || value.length > 0)) {
      if (!(code in fields) && value !== '') {
        fields[code] = value;
      }
    }
  }

  // Must have at least 2 decoded identity elements to count as valid AAMVA data
  if (Object.keys(fields).length < 2) {
    return null;
  }

  const iinInfo = iin ? AAMVA_IIN_DIRECTORY[iin] : undefined;
  const rawCountry = fields.DCG?.toUpperCase() || null;
  const issuingCountry =
    rawCountry && rawCountry.length === 3
      ? rawCountry
      : iinInfo?.country ?? (rawCountry === 'US' ? 'USA' : rawCountry === 'CA' ? 'CAN' : null);

  const state = fields.DAJ?.trim().toUpperCase() || iinInfo?.code || null;
  const jurisdictionName = iinInfo?.name ?? state;

  // Name parsing (modern DCS/DAC/DAD + legacy DAA/DAB/DCT)
  let surname = cleanFieldValue(fields.DCS) ?? cleanFieldValue(fields.DAB);
  let firstName = cleanFieldValue(fields.DAC);
  let middleName = cleanFieldValue(fields.DAD);
  const nameSuffix = cleanFieldValue(fields.DCU);
  let givenNames = [firstName, middleName].filter(Boolean).join(' ').trim() || cleanFieldValue(fields.DCT);

  if ((!surname || !givenNames) && fields.DAA) {
    const daa = fields.DAA.trim();
    if (daa.includes(',')) {
      const parts = daa
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean);
      if (parts.length >= 2) {
        surname = surname ?? parts[0];
        firstName = firstName ?? parts[1];
        middleName = middleName ?? (parts.slice(2).join(' ') || null);
        givenNames = givenNames ?? ([firstName, middleName].filter(Boolean).join(' ').trim() || null);
      }
    } else {
      const words = daa.split(/\s+/).filter(Boolean);
      if (words.length >= 2) {
        surname = surname ?? words[words.length - 1];
        givenNames = givenNames ?? words.slice(0, -1).join(' ');
        firstName = firstName ?? words[0];
        if (words.length > 2) middleName = middleName ?? words.slice(1, -1).join(' ');
      }
    }
  }

  if (givenNames && !firstName) {
    const parts = givenNames.split(/\s+/).filter(Boolean);
    firstName = parts[0] ?? null;
    if (parts.length > 1) {
      middleName = parts.slice(1).join(' ');
    }
  }

  const fullName =
    [givenNames, surname, nameSuffix].filter(Boolean).join(' ').trim() ||
    cleanFieldValue(fields.DAA) ||
    null;

  const surnames = surname ? surname.split(/\s+/).filter(Boolean) : [];
  const givenNamesList = givenNames ? givenNames.split(/\s+/).filter(Boolean) : [];

  const documentNumber = cleanFieldValue(fields.DAQ);
  const documentDiscriminator = cleanFieldValue(fields.DCF);
  const inventoryControlNumber = cleanFieldValue(fields.DCK);

  const dateOfBirth = normalizeAamvaDate(fields.DBB, issuingCountry);
  const dateOfExpiry = normalizeAamvaDate(fields.DBA, issuingCountry);
  const dateOfIssue = normalizeAamvaDate(fields.DBD, issuingCountry);

  let sex: AamvaParsedData['sex'] = null;
  const rawSex = fields.DBC?.trim().toUpperCase();
  if (rawSex === '1' || rawSex === 'M') sex = 'M';
  else if (rawSex === '2' || rawSex === 'F') sex = 'F';
  else if (rawSex === '9' || rawSex === 'X') sex = 'X';

  const street1 = cleanFieldValue(fields.DAG) ?? cleanFieldValue(fields.DAL);
  const street2 = cleanFieldValue(fields.DAH);
  const streetAddress = [street1, street2].filter(Boolean).join(', ') || null;
  const city = cleanFieldValue(fields.DAI);
  const postalCode = normalizePostalCode(fields.DAK, issuingCountry);
  const cityStateZip = [city, [state, postalCode].filter(Boolean).join(' ').trim()]
    .filter(Boolean)
    .join(', ');
  const address = [streetAddress, cityStateZip].filter(Boolean).join(', ') || null;

  const licenseClass = cleanFieldValue(fields.DCA) ?? cleanFieldValue(fields.DAR);
  const restrictions = cleanFieldValue(fields.DCB) ?? cleanFieldValue(fields.DAS);
  const endorsements = cleanFieldValue(fields.DCD) ?? cleanFieldValue(fields.DAT);

  const height = normalizeHeight(fields.DAU);
  let weight: string | null = null;
  if (fields.DAW) {
    weight = `${fields.DAW.trim()} lbs`;
  } else if (fields.DAX) {
    weight = `${fields.DAX.trim()} kg`;
  }

  const eyeColor = cleanFieldValue(fields.DAY);
  const hairColor = cleanFieldValue(fields.DAZ);

  const organDonor =
    fields.DDK === '1' || fields.DDK === 'Y'
      ? true
      : fields.DDK === '0' || fields.DDK === 'N'
        ? false
        : null;
  const veteran =
    fields.DDL === '1' || fields.DDL === 'Y'
      ? true
      : fields.DDL === '0' || fields.DDL === 'N'
        ? false
        : null;
  const realIdCompliance = cleanFieldValue(fields.DDA);

  return {
    iin,
    version,
    jurisdictionVersion,
    subfileType: primarySubfileType,
    jurisdictionName,
    issuingCountry,
    surname,
    surnames,
    firstName,
    middleName,
    givenNames,
    givenNamesList,
    nameSuffix,
    fullName,
    documentNumber,
    documentDiscriminator,
    inventoryControlNumber,
    dateOfBirth,
    dateOfIssue,
    dateOfExpiry,
    sex,
    streetAddress,
    city,
    state,
    postalCode,
    address,
    licenseClass,
    restrictions,
    endorsements,
    height,
    weight,
    eyeColor,
    hairColor,
    organDonor,
    veteran,
    realIdCompliance,
    fields,
  };
}
