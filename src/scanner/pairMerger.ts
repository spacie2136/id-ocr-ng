import { resolveCountryName } from './countries';
import type {
  DocumentType,
  ExtractedIdentity,
  FieldSource,
  MrzParsedData,
  SideConsistencyConflict,
  MergedDocumentResult,
} from './types';

function computeAge(dobIso: string | null): number | null {
  if (!dobIso) return null;
  const m = dobIso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const birth = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  if (Number.isNaN(birth.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const md = today.getMonth() - birth.getMonth();
  if (md < 0 || (md === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age >= 0 && age <= 130 ? age : null;
}

function computeIsExpired(expiryIso: string | null): boolean | null {
  if (!expiryIso) return null;
  const m = expiryIso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const expiry = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  if (Number.isNaN(expiry.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return expiry < today;
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

function normalizeDocNumber(val: string | null | undefined): string {
  return (val ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

function hasDiacritics(str: string): boolean {
  return /[^\u0000-\u007F]/.test(str);
}

function mrzScore(mrz: MrzParsedData | null): number {
  if (!mrz) return -1;
  return (
    (mrz.allCheckDigitsValid ? 100 : 0) +
    mrz.validCount * 18 +
    (mrz.surname ? 10 : 0) +
    (mrz.documentNumber ? 10 : 0)
  );
}

function pickRichTextField(
  frontVal: string | null,
  backVal: string | null,
  frontConf: number,
  backConf: number,
  fieldKey: string,
  sources: Record<string, FieldSource>,
  frontSource?: FieldSource,
  backSource?: FieldSource
): string | null {
  const f = frontVal?.trim() || null;
  const b = backVal?.trim() || null;

  if (f && b) {
    // Preserve MRZ+VIZ tag if either side had MRZ, otherwise VIZ
    const mergedSrc: FieldSource =
      frontSource?.includes('MRZ') || backSource?.includes('MRZ') ? 'MRZ+VIZ' : 'VIZ';
    sources[fieldKey] = mergedSrc;

    // Prefer whichever string contains native diacritics if ASCII skeletons match
    const fAscii = stripDiacritics(f);
    const bAscii = stripDiacritics(b);
    if (fAscii === bAscii) {
      if (hasDiacritics(f) && !hasDiacritics(b)) return f;
      if (hasDiacritics(b) && !hasDiacritics(f)) return b;
    }

    // Prefer MRZ-backed value when only one side had MRZ, unless VIZ has fuller non-truncated match
    if (frontSource === 'MRZ' && backSource !== 'MRZ') return f;
    if (backSource === 'MRZ' && frontSource !== 'MRZ') return b;

    if (f.length !== b.length && Math.abs(f.length - b.length) >= 3) {
      return f.length > b.length ? f : b;
    }
    return frontConf >= backConf ? f : b;
  }

  if (f) {
    sources[fieldKey] = frontSource ?? 'VIZ';
    return f;
  }
  if (b) {
    sources[fieldKey] = backSource ?? 'VIZ';
    return b;
  }
  return null;
}

function pickNamePart(
  mrzName: string | null | undefined,
  vizFrontName: string | null | undefined,
  vizBackName: string | null | undefined,
  fieldKey: string,
  sources: Record<string, FieldSource>
): string | null {
  const m = mrzName?.trim() || null;
  const vf = vizFrontName?.trim() || null;
  const vb = vizBackName?.trim() || null;
  const bestViz = vf && vb ? (vf.length >= vb.length ? vf : vb) : vf || vb;

  if (m && bestViz) {
    sources[fieldKey] = 'MRZ+VIZ';
    const mAscii = stripDiacritics(m);
    const vAscii = stripDiacritics(bestViz);
    // Enrich with native accents (e.g. GARCÍA MARTÍNEZ / LUCÍA) or full untruncated name if VIZ starts with or matches MRZ
    if (vAscii === mAscii && hasDiacritics(bestViz)) {
      return bestViz;
    }
    if (
      vAscii.length > mAscii.length &&
      mAscii.length >= 8 &&
      vAscii.startsWith(mAscii.slice(0, Math.min(8, mAscii.length)))
    ) {
      return bestViz;
    }
    return m;
  }

  if (m) {
    sources[fieldKey] = 'MRZ';
    return m;
  }
  if (bestViz) {
    sources[fieldKey] = 'VIZ';
    return bestViz;
  }
  return null;
}

function resolveDocumentType(front: ExtractedIdentity, back: ExtractedIdentity): DocumentType {
  if (front.documentType !== 'unknown') return front.documentType;
  if (back.documentType !== 'unknown') return back.documentType;
  return 'unknown';
}

/**
 * Pure two-sided identity merger. Combines extracted data from the front and back
 * of an ID card, residence permit, or driver license (even if uploaded swapped),
 * preserving valid ICAO 9303 MRZ check digits while enriching addresses, diacritics,
 * sex, issue dates, and cross-checking overlapping fields for consistency.
 */
export function mergeDocumentSides(
  front: ExtractedIdentity,
  back: ExtractedIdentity
): MergedDocumentResult {
  const frontHasMrz = front.mrz !== null;
  const backHasMrz = back.mrz !== null;

  let sideAssignment: MergedDocumentResult['sideAssignment'] = 'front+back';
  if (frontHasMrz && backHasMrz) {
    sideAssignment = 'both_mrz';
  } else if (frontHasMrz && !backHasMrz) {
    sideAssignment = 'swapped_detected';
  } else if (!frontHasMrz && !backHasMrz) {
    sideAssignment = 'visual_only';
  }

  // Pick winning MRZ (from whichever side has the stronger valid MRZ)
  const winningMrz =
    mrzScore(back.mrz) >= mrzScore(front.mrz) ? back.mrz : front.mrz;
  const mrzRawText =
    mrzScore(back.mrz) >= mrzScore(front.mrz)
      ? back.rawMrzText || front.rawMrzText
      : front.rawMrzText || back.rawMrzText;

  // Determine VIZ-only side vs MRZ side for accented name enrichment
  const frontVizOnly = frontHasMrz ? null : front;
  const backVizOnly = backHasMrz ? null : back;

  const fieldSources: Record<string, FieldSource> = {};
  const conflicts: SideConsistencyConflict[] = [];

  // Cross-side consistency checks
  const fDoc = normalizeDocNumber(front.documentNumber);
  const bDoc = normalizeDocNumber(back.documentNumber);
  if (fDoc && bDoc && fDoc !== bDoc && !fDoc.includes(bDoc) && !bDoc.includes(fDoc)) {
    conflicts.push({
      field: 'documentNumber',
      frontValue: front.documentNumber!,
      backValue: back.documentNumber!,
      resolution: back.mrz?.allCheckDigitsValid
        ? `Used back MRZ value (${back.documentNumber})`
        : front.mrz?.allCheckDigitsValid
          ? `Used front MRZ value (${front.documentNumber})`
          : `Used higher-confidence side`,
    });
  }

  if (front.dateOfBirth && back.dateOfBirth && front.dateOfBirth !== back.dateOfBirth) {
    conflicts.push({
      field: 'dateOfBirth',
      frontValue: front.dateOfBirth,
      backValue: back.dateOfBirth,
      resolution: winningMrz?.dateOfBirth
        ? `Used MRZ date of birth (${winningMrz.dateOfBirth})`
        : `Used higher-confidence side`,
    });
  }

  if (front.dateOfExpiry && back.dateOfExpiry && front.dateOfExpiry !== back.dateOfExpiry) {
    conflicts.push({
      field: 'dateOfExpiry',
      frontValue: front.dateOfExpiry,
      backValue: back.dateOfExpiry,
      resolution: winningMrz?.dateOfExpiry
        ? `Used MRZ date of expiry (${winningMrz.dateOfExpiry})`
        : `Used higher-confidence side`,
    });
  }

  if (
    front.sex !== 'Unspecified' &&
    back.sex !== 'Unspecified' &&
    front.sex !== back.sex
  ) {
    conflicts.push({
      field: 'sex',
      frontValue: front.sex,
      backValue: back.sex,
      resolution: winningMrz?.sex && winningMrz.sex !== 'Unspecified'
        ? `Used MRZ sex (${winningMrz.sex})`
        : `Used front side (${front.sex})`,
    });
  }

  if (front.surname && back.surname) {
    const fSur = stripDiacritics(front.surname);
    const bSur = stripDiacritics(back.surname);
    const fTokens = new Set(fSur.split(' ').filter((t) => t.length >= 2));
    const bTokens = bSur.split(' ').filter((t) => t.length >= 2);
    const sharesToken = bTokens.some((t) => fTokens.has(t));
    if (fSur && bSur && !sharesToken && !fSur.includes(bSur) && !bSur.includes(fSur)) {
      conflicts.push({
        field: 'surname',
        frontValue: front.surname,
        backValue: back.surname,
        resolution: winningMrz?.surname
          ? `Used MRZ surname (${winningMrz.surname})`
          : `Used higher-confidence side`,
      });
    }
  }

  const issuingCountry = pickRichTextField(
    front.issuingCountry,
    back.issuingCountry,
    front.confidence,
    back.confidence,
    'issuingCountry',
    fieldSources,
    front.fieldSources.issuingCountry,
    back.fieldSources.issuingCountry
  );

  const nationality = pickRichTextField(
    front.nationality,
    back.nationality,
    front.confidence,
    back.confidence,
    'nationality',
    fieldSources,
    front.fieldSources.nationality,
    back.fieldSources.nationality
  );

  const surname = pickNamePart(
    winningMrz?.surname,
    frontVizOnly?.surname ?? (!frontHasMrz ? front.surname : null),
    backVizOnly?.surname ?? (!backHasMrz ? back.surname : null),
    'surname',
    fieldSources
  ) ?? pickRichTextField(
    front.surname,
    back.surname,
    front.confidence,
    back.confidence,
    'surname',
    fieldSources,
    front.fieldSources.surname,
    back.fieldSources.surname
  );

  const givenNames = pickNamePart(
    winningMrz?.givenNames,
    frontVizOnly?.givenNames ?? (!frontHasMrz ? front.givenNames : null),
    backVizOnly?.givenNames ?? (!backHasMrz ? back.givenNames : null),
    'givenNames',
    fieldSources
  ) ?? pickRichTextField(
    front.givenNames,
    back.givenNames,
    front.confidence,
    back.confidence,
    'givenNames',
    fieldSources,
    front.fieldSources.givenNames,
    back.fieldSources.givenNames
  );

  const surnames =
    winningMrz?.surnames && winningMrz.surnames.length > 0 && surname === winningMrz.surname
      ? winningMrz.surnames
      : surname
        ? surname.split(/\s+/).filter(Boolean)
        : [];

  const givenNamesList =
    winningMrz?.givenNamesList &&
    winningMrz.givenNamesList.length > 0 &&
    givenNames === winningMrz.givenNames
      ? winningMrz.givenNamesList
      : givenNames
        ? givenNames.split(/\s+/).filter(Boolean)
        : [];

  const fullName =
    givenNames || surname
      ? [givenNames, surname].filter(Boolean).join(' ')
      : pickRichTextField(
          front.fullName,
          back.fullName,
          front.confidence,
          back.confidence,
          'fullName',
          fieldSources,
          front.fieldSources.fullName,
          back.fieldSources.fullName
        );
  if (fullName && !fieldSources.fullName) {
    fieldSources.fullName =
      fieldSources.givenNames === 'MRZ+VIZ' || fieldSources.surname === 'MRZ+VIZ'
        ? 'MRZ+VIZ'
        : fieldSources.givenNames ?? fieldSources.surname ?? 'VIZ';
  }

  const documentNumber = winningMrz?.documentNumber
    ? (fieldSources.documentNumber =
        front.documentNumber && back.documentNumber ? 'MRZ+VIZ' : 'MRZ',
      winningMrz.documentNumber)
    : pickRichTextField(
        front.documentNumber,
        back.documentNumber,
        front.confidence,
        back.confidence,
        'documentNumber',
        fieldSources,
        front.fieldSources.documentNumber,
        back.fieldSources.documentNumber
      );

  const personalNumber = pickRichTextField(
    front.personalNumber,
    back.personalNumber,
    front.confidence,
    back.confidence,
    'personalNumber',
    fieldSources,
    front.fieldSources.personalNumber,
    back.fieldSources.personalNumber
  );

  const dateOfBirth = winningMrz?.dateOfBirth
    ? (fieldSources.dateOfBirth =
        (frontVizOnly?.dateOfBirth || backVizOnly?.dateOfBirth) ? 'MRZ+VIZ' : 'MRZ',
      winningMrz.dateOfBirth)
    : pickRichTextField(
        front.dateOfBirth,
        back.dateOfBirth,
        front.confidence,
        back.confidence,
        'dateOfBirth',
        fieldSources,
        front.fieldSources.dateOfBirth,
        back.fieldSources.dateOfBirth
      );

  const dateOfExpiry = winningMrz?.dateOfExpiry
    ? (fieldSources.dateOfExpiry =
        (frontVizOnly?.dateOfExpiry || backVizOnly?.dateOfExpiry) ? 'MRZ+VIZ' : 'MRZ',
      winningMrz.dateOfExpiry)
    : pickRichTextField(
        front.dateOfExpiry,
        back.dateOfExpiry,
        front.confidence,
        back.confidence,
        'dateOfExpiry',
        fieldSources,
        front.fieldSources.dateOfExpiry,
        back.fieldSources.dateOfExpiry
      );

  const dateOfIssue = pickRichTextField(
    front.dateOfIssue,
    back.dateOfIssue,
    front.confidence,
    back.confidence,
    'dateOfIssue',
    fieldSources,
    front.fieldSources.dateOfIssue,
    back.fieldSources.dateOfIssue
  );

  let sex: ExtractedIdentity['sex'] = 'Unspecified';
  if (winningMrz?.sex && winningMrz.sex !== 'Unspecified') {
    sex = winningMrz.sex;
    fieldSources.sex =
      frontVizOnly?.sex || backVizOnly?.sex ? 'MRZ+VIZ' : 'MRZ';
  } else if (front.sex !== 'Unspecified' && back.sex !== 'Unspecified') {
    sex = front.confidence >= back.confidence ? front.sex : back.sex;
    fieldSources.sex = 'VIZ';
  } else if (front.sex !== 'Unspecified') {
    sex = front.sex;
    fieldSources.sex = front.fieldSources.sex ?? 'VIZ';
  } else if (back.sex !== 'Unspecified') {
    sex = back.sex;
    fieldSources.sex = back.fieldSources.sex ?? 'VIZ';
  }

  const placeOfBirth = pickRichTextField(
    front.placeOfBirth,
    back.placeOfBirth,
    front.confidence,
    back.confidence,
    'placeOfBirth',
    fieldSources,
    front.fieldSources.placeOfBirth,
    back.fieldSources.placeOfBirth
  );
  const address = pickRichTextField(
    front.address,
    back.address,
    front.confidence,
    back.confidence,
    'address',
    fieldSources,
    front.fieldSources.address,
    back.fieldSources.address
  );
  const parents = pickRichTextField(
    front.parents,
    back.parents,
    front.confidence,
    back.confidence,
    'parents',
    fieldSources,
    front.fieldSources.parents,
    back.fieldSources.parents
  );
  const issuingAuthority = pickRichTextField(
    front.issuingAuthority,
    back.issuingAuthority,
    front.confidence,
    back.confidence,
    'issuingAuthority',
    fieldSources,
    front.fieldSources.issuingAuthority,
    back.fieldSources.issuingAuthority
  );
  const licenseClass = pickRichTextField(
    front.licenseClass,
    back.licenseClass,
    front.confidence,
    back.confidence,
    'licenseClass',
    fieldSources,
    front.fieldSources.licenseClass,
    back.fieldSources.licenseClass
  );
  const restrictions = pickRichTextField(
    front.restrictions,
    back.restrictions,
    front.confidence,
    back.confidence,
    'restrictions',
    fieldSources,
    front.fieldSources.restrictions,
    back.fieldSources.restrictions
  );
  const endorsements = pickRichTextField(
    front.endorsements,
    back.endorsements,
    front.confidence,
    back.confidence,
    'endorsements',
    fieldSources,
    front.fieldSources.endorsements,
    back.fieldSources.endorsements
  );
  const height = pickRichTextField(
    front.height,
    back.height,
    front.confidence,
    back.confidence,
    'height',
    fieldSources,
    front.fieldSources.height,
    back.fieldSources.height
  );
  const eyeColor = pickRichTextField(
    front.eyeColor,
    back.eyeColor,
    front.confidence,
    back.confidence,
    'eyeColor',
    fieldSources,
    front.fieldSources.eyeColor,
    back.fieldSources.eyeColor
  );
  const hairColor = pickRichTextField(
    front.hairColor,
    back.hairColor,
    front.confidence,
    back.confidence,
    'hairColor',
    fieldSources,
    front.fieldSources.hairColor,
    back.fieldSources.hairColor
  );

  const age = computeAge(dateOfBirth);
  if (age !== null) fieldSources.age = 'COMPUTED';
  const isExpired = computeIsExpired(dateOfExpiry);
  if (isExpired !== null) fieldSources.isExpired = 'COMPUTED';

  const unmappedFields: Record<string, string> = {
    ...front.unmappedFields,
    ...back.unmappedFields,
  };

  const mergedRawOcrText = [
    front.rawOcrText ? `--- FRONT SIDE ---\n${front.rawOcrText}` : '',
    back.rawOcrText ? `--- BACK SIDE ---\n${back.rawOcrText}` : '',
  ]
    .filter(Boolean)
    .join('\n\n');

  const confidence = Math.round((front.confidence + back.confidence) / 2);
  const processingTimeMs = front.processingTimeMs + back.processingTimeMs;

  return {
    documentType: resolveDocumentType(front, back),
    documentFormat: winningMrz ? winningMrz.format : 'VISUAL_ONLY',
    issuingCountry,
    issuingCountryName: resolveCountryName(issuingCountry),
    documentNumber,
    personalNumber,
    surname,
    surnames,
    givenNames,
    givenNamesList,
    fullName,
    nationality,
    nationalityName: resolveCountryName(nationality) ?? nationality,
    dateOfBirth,
    age,
    sex,
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
    mrz: winningMrz,
    unmappedFields,
    fieldSources,
    rawOcrText: mergedRawOcrText,
    rawMrzText: mrzRawText,
    confidence,
    processingTimeMs,
    sourceDimensions: backHasMrz ? back.sourceDimensions : front.sourceDimensions,
    orientation: backHasMrz ? back.orientation : front.orientation,
    perspective: backHasMrz ? back.perspective : front.perspective,
    previews: backHasMrz ? (back.previews ?? front.previews) : (front.previews ?? back.previews),
    sides: { front, back },
    sideAssignment,
    conflicts,
    sidesConsistent: conflicts.length === 0,
  };
}
