import type { VizLanguageMode } from './types';
export declare const DEFAULT_MULTILINGUAL_VIZ_LANGUAGES = "eng+deu+spa+fra";
/**
 * English-primary issuing states where standard `eng` traineddata already
 * covers VIZ labels and diacritics with zero extra download overhead.
 */
export declare const ENGLISH_PRIMARY_COUNTRY_CODES: Set<string>;
/**
 * Default mapping from ICAO 9303 alpha-3 (and special `'D'`) issuing-state
 * codes to native-script Tesseract traineddata packs for VIZ refinement.
 */
export declare const DEFAULT_COUNTRY_VIZ_LANGUAGES: Record<string, string>;
/**
 * Infers an issuing state & native Tesseract language pack from visual VIZ
 * header cues when no MRZ is present (e.g., front-only ID cards or licenses).
 */
export declare function inferNativeVizLanguageFromText(rawText: string): {
    countryCode: string | null;
    nativeLang: string | null;
};
/**
 * Resolves a combined Tesseract language string (e.g. `'eng+deu'`) for a
 * country-routed native VIZ refinement pass, or `null` when English/primary
 * OCR already covers the document.
 */
export declare function resolveNativeVizLanguage(params: {
    issuingCountry?: string | null;
    nationality?: string | null;
    rawText?: string;
    customMap?: Record<string, string>;
    baseLanguage?: string;
}): string | null;
export interface VizPassStrategy {
    primaryLanguage: string;
    effectiveMode: VizLanguageMode;
    allowAutoFollowUp: boolean;
}
/**
 * Resolves the active VIZ OCR language strategy while honoring explicit user
 * overrides (`vizLanguages`, `vizLanguageMode`, or custom non-`'eng'` `language`).
 */
export declare function resolveVizPassStrategy(params: {
    language?: string;
    vizLanguageMode?: VizLanguageMode;
    vizLanguages?: string;
}): VizPassStrategy;
