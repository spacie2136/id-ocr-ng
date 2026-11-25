import type { VizLanguageMode } from './types';

export const DEFAULT_MULTILINGUAL_VIZ_LANGUAGES = 'eng+deu+spa+fra';

/**
 * English-primary issuing states where standard `eng` traineddata already
 * covers VIZ labels and diacritics with zero extra download overhead.
 */
export const ENGLISH_PRIMARY_COUNTRY_CODES = new Set<string>([
  'USA',
  'GBR',
  'GBD',
  'GBN',
  'GBO',
  'GBP',
  'GBS',
  'CAN',
  'AUS',
  'NZL',
  'IRL',
  'IND',
  'SGP',
  'MLT',
  'ZAF',
  'JAM',
  'BHS',
  'BRB',
  'TTO',
  'BLZ',
  'GUY',
  'GIB',
]);

/**
 * Default mapping from ICAO 9303 alpha-3 (and special `'D'`) issuing-state
 * codes to native-script Tesseract traineddata packs for VIZ refinement.
 */
export const DEFAULT_COUNTRY_VIZ_LANGUAGES: Record<string, string> = {
  // German
  D: 'deu',
  DEU: 'deu',
  AUT: 'deu',
  LIE: 'deu',
  CHE: 'deu+fra',

  // Spanish
  ESP: 'spa',
  MEX: 'spa',
  ARG: 'spa',
  COL: 'spa',
  CHL: 'spa',
  PER: 'spa',
  VEN: 'spa',
  ECU: 'spa',
  GTM: 'spa',
  CUB: 'spa',
  DOM: 'spa',
  HND: 'spa',
  PRY: 'spa',
  SLV: 'spa',
  NIC: 'spa',
  CRI: 'spa',
  PAN: 'spa',
  URY: 'spa',
  BOL: 'spa',

  // French
  FRA: 'fra',
  MCO: 'fra',
  LUX: 'fra+deu',
  BEL: 'fra+nld',
  MAR: 'fra',
  TUN: 'fra',
  DZA: 'fra',
  SEN: 'fra',
  CIV: 'fra',
  CMR: 'fra',

  // Italian
  ITA: 'ita',
  SMR: 'ita',
  VAT: 'ita',

  // Portuguese
  PRT: 'por',
  BRA: 'por',
  AGO: 'por',
  MOZ: 'por',
  CPV: 'por',

  // Dutch
  NLD: 'nld',
  SUR: 'nld',

  // Central, Baltic, Nordic & Eastern European Latin scripts
  POL: 'pol',
  CZE: 'ces',
  SVK: 'slk',
  LTU: 'lit',
  LVA: 'lav',
  EST: 'est',
  HUN: 'hun',
  ROU: 'ron',
  MDA: 'ron',
  HRV: 'hrv',
  BIH: 'hrv',
  SVN: 'slv',
  SWE: 'swe',
  NOR: 'nor',
  DNK: 'dan',
  FIN: 'fin',
  ISL: 'isl',
  TUR: 'tur',
};

const VISUAL_COUNTRY_CUE_RULES: Array<{ countryCode: string; pattern: RegExp }> = [
  {
    countryCode: 'DEU',
    pattern:
      /\b(?:BUNDESREPUBLIK\s+DEUTSCHLAND|PERSONALAUSWEIS|REISEPASS|FAHRERLAUBNIS|F[UÜ]HRERSCHEIN|STAATSANGEH[OÖ]RIGKEIT|GEBURTSORT|ANSCHRIFT|AUGENFARBE|FAMILIENNAME|BEH[OÖ]RDE)\b/i,
  },
  {
    countryCode: 'AUT',
    pattern: /\b(?:REPUBLIK\s+[OÖ]STERREICH|OSTERREICHISCHER)\b/i,
  },
  {
    countryCode: 'CHE',
    pattern: /\b(?:SCHWEIZERISCHE\s+EIDGENOSSENSCHAFT|CONF[EÉ]D[EÉ]RATION\s+SUISSE)\b/i,
  },
  {
    countryCode: 'ESP',
    pattern:
      /\b(?:REINO\s+DE\s+ESPA[NÑ]A|ESPA[NÑ]OLA|DOCUMENTO\s+NACIONAL\s+DE\s+IDENTIDAD|PRIMER\s+APELLIDO|SEGUNDO\s+APELLIDO|FECHA\s+DE\s+CADUCIDAD|LUGAR\s+DE\s+NACIMIENTO|PASAPORTE)\b/i,
  },
  {
    countryCode: 'FRA',
    pattern:
      /\b(?:R[EÉ]PUBLIQUE\s+FRAN[CÇ]AISE|CARTE\s+NATIONALE\s+D['’]IDENTIT[EÉ]|PASSEPORT\s+FRAN[CÇ]AIS|PERMIS\s+DE\s+CONDUIRE|DATE\s+DE\s+D[EÉ]LIVRANCE|LIEU\s+DE\s+NAISSANCE)\b/i,
  },
  {
    countryCode: 'ITA',
    pattern:
      /\b(?:REPUBBLICA\s+ITALIANA|CARTA\s+D['’]IDENTIT[AÀ]|PASSAPORTO|LUOGO\s+DI\s+NASCITA|DATA\s+DI\s+NASCITA|COGNOME)\b/i,
  },
  {
    countryCode: 'PRT',
    pattern:
      /\b(?:REP[UÚ]BLICA\s+PORTUGUESA|CART[AÃ]O\s+DE\s+CIDAD[AÃ]O|PASSAPORTE\s+PORTUGU[EÊ]S|NACIONALIDADE|DATA\s+DE\s+VALIDADE)\b/i,
  },
  {
    countryCode: 'NLD',
    pattern:
      /\b(?:KONINKRIJK\s+DER\s+NEDERLANDEN|NEDERLANDSE\s+IDENTITEITSKAART|RIJBEWIJS|GESLACHTSNAAM|VOORNAMEN)\b/i,
  },
  {
    countryCode: 'POL',
    pattern:
      /\b(?:RZECZPOSPOLITA\s+POLSKA|DOW[OÓ]D\s+OSOBISTY|PASZPORT|PRAWO\s+JAZDY|IMIONA\s+RODZIC[OÓ]W)\b/i,
  },
  {
    countryCode: 'CZE',
    pattern:
      /\b(?:[CČ]ESK[AÁ]\s+REPUBLIKA|OB[CČ]ANSK[YÝ]\s+PR[UŮ]KAZ|CESTOVN[IÍ]\s+PAS|P[RŘ][IÍ]JMEN[IÍ])\b/i,
  },
  {
    countryCode: 'SVK',
    pattern: /\b(?:SLOVENSK[AÁ]\s+REPUBLIKA|OB[CČ]IANSKY\s+PREUKAZ)\b/i,
  },
  {
    countryCode: 'LTU',
    pattern:
      /\b(?:LIETUVOS\s+RESPUBLIKA|ASMENS\s+TAPATYB[EĖ]S|PILIETYB[EĖ]|PAVARD[EĖ]|GALIOJA\s+IKI)\b/i,
  },
  {
    countryCode: 'HUN',
    pattern: /\b(?:MAGYARORSZ[AÁ]G|SZEM[EÉ]LYI\s+AZONOS[IÍ]T[OÓ])\b/i,
  },
  {
    countryCode: 'ROU',
    pattern: /\b(?:ROM[AÂ]NIA|CARTE\s+DE\s+IDENTITATE|PA[SȘ]APORT)\b/i,
  },
  {
    countryCode: 'SWE',
    pattern: /\b(?:SVERIGE|NATIONELLT\s+IDENTITETSKORT|K[OÖ]RKORT)\b/i,
  },
  {
    countryCode: 'NOR',
    pattern: /\b(?:KONGERIKET\s+NORGE|F[OØ]RERKORT)\b/i,
  },
  {
    countryCode: 'DNK',
    pattern: /\b(?:KONGERIGET\s+DANMARK|K[OØ]REKORT)\b/i,
  },
  {
    countryCode: 'FIN',
    pattern: /\b(?:SUOMI\s+FINLAND|HENKIL[OÖ]KORTTI|AJOKORTTI)\b/i,
  },
  {
    countryCode: 'TUR',
    pattern: /\b(?:T[UÜ]RK[Iİ]YE\s+CUMHUR[Iİ]YET[Iİ]|K[Iİ]ML[Iİ]K\s+KARTI)\b/i,
  },
];

function normalizeCountryCode(code: string | null | undefined): string | null {
  if (!code) return null;
  const cleaned = code.trim().replace(/<+$/g, '').toUpperCase();
  return cleaned || null;
}

function combineTesseractLanguages(baseLanguage: string, extraLanguage: string): string | null {
  const baseParts = baseLanguage
    .split('+')
    .map((p) => p.trim())
    .filter(Boolean);
  const extraParts = extraLanguage
    .split('+')
    .map((p) => p.trim())
    .filter(Boolean);

  if (extraParts.length === 0) return null;
  const missing = extraParts.filter((part) => !baseParts.includes(part));
  if (missing.length === 0) return null;

  return [...baseParts, ...missing].join('+');
}

/**
 * Infers an issuing state & native Tesseract language pack from visual VIZ
 * header cues when no MRZ is present (e.g., front-only ID cards or licenses).
 */
export function inferNativeVizLanguageFromText(rawText: string): {
  countryCode: string | null;
  nativeLang: string | null;
} {
  if (!rawText) return { countryCode: null, nativeLang: null };
  for (const rule of VISUAL_COUNTRY_CUE_RULES) {
    if (rule.pattern.test(rawText)) {
      return {
        countryCode: rule.countryCode,
        nativeLang: DEFAULT_COUNTRY_VIZ_LANGUAGES[rule.countryCode] ?? null,
      };
    }
  }
  return { countryCode: null, nativeLang: null };
}

/**
 * Resolves a combined Tesseract language string (e.g. `'eng+deu'`) for a
 * country-routed native VIZ refinement pass, or `null` when English/primary
 * OCR already covers the document.
 */
export function resolveNativeVizLanguage(params: {
  issuingCountry?: string | null;
  nationality?: string | null;
  rawText?: string;
  customMap?: Record<string, string>;
  baseLanguage?: string;
}): string | null {
  const baseLang = params.baseLanguage?.trim() || 'eng';
  const normalizedCustom: Record<string, string> = {};
  if (params.customMap) {
    for (const [k, v] of Object.entries(params.customMap)) {
      const code = normalizeCountryCode(k);
      if (code && v.trim()) {
        normalizedCustom[code] = v.trim();
      }
    }
  }

  const candidates = [
    normalizeCountryCode(params.issuingCountry),
    normalizeCountryCode(params.nationality),
  ].filter((c): c is string => Boolean(c));

  for (const code of candidates) {
    if (normalizedCustom[code]) {
      return combineTesseractLanguages(baseLang, normalizedCustom[code]);
    }
    if (ENGLISH_PRIMARY_COUNTRY_CODES.has(code)) {
      return null;
    }
    if (DEFAULT_COUNTRY_VIZ_LANGUAGES[code]) {
      return combineTesseractLanguages(baseLang, DEFAULT_COUNTRY_VIZ_LANGUAGES[code]);
    }
  }

  if (params.rawText) {
    const inferred = inferNativeVizLanguageFromText(params.rawText);
    if (inferred.countryCode && normalizedCustom[inferred.countryCode]) {
      return combineTesseractLanguages(baseLang, normalizedCustom[inferred.countryCode]);
    }
    if (inferred.nativeLang) {
      return combineTesseractLanguages(baseLang, inferred.nativeLang);
    }
  }

  return null;
}

export interface VizPassStrategy {
  primaryLanguage: string;
  effectiveMode: VizLanguageMode;
  allowAutoFollowUp: boolean;
}

/**
 * Resolves the active VIZ OCR language strategy while honoring explicit user
 * overrides (`vizLanguages`, `vizLanguageMode`, or custom non-`'eng'` `language`).
 */
export function resolveVizPassStrategy(params: {
  language?: string;
  vizLanguageMode?: VizLanguageMode;
  vizLanguages?: string;
}): VizPassStrategy {
  const customLangs = params.vizLanguages?.trim();
  const baseLang = params.language?.trim() || 'eng';

  if (customLangs) {
    return {
      primaryLanguage: customLangs,
      effectiveMode: params.vizLanguageMode ?? 'standard',
      allowAutoFollowUp: false,
    };
  }

  if (params.vizLanguageMode === 'standard') {
    return {
      primaryLanguage: baseLang,
      effectiveMode: 'standard',
      allowAutoFollowUp: false,
    };
  }

  if (params.vizLanguageMode === 'multilingual') {
    return {
      primaryLanguage: DEFAULT_MULTILINGUAL_VIZ_LANGUAGES,
      effectiveMode: 'multilingual',
      allowAutoFollowUp: false,
    };
  }

  // If the caller manually specified a custom Tesseract `language` (e.g. 'spa' or 'eng+deu')
  // without explicitly requesting `vizLanguageMode: 'auto'`, honor `language` directly.
  if (baseLang !== 'eng' && params.vizLanguageMode !== 'auto') {
    return {
      primaryLanguage: baseLang,
      effectiveMode: 'standard',
      allowAutoFollowUp: false,
    };
  }

  return {
    primaryLanguage: baseLang,
    effectiveMode: 'auto',
    allowAutoFollowUp: true,
  };
}
