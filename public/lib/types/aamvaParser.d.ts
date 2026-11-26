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
export declare const AAMVA_IIN_DIRECTORY: Record<string, JurisdictionEntry>;
export declare function normalizeAamvaDate(raw: string | undefined | null, countryHint?: string | null): string | null;
/**
 * Parses an AAMVA DL/ID PDF417 barcode raw text payload into structured fields.
 * Supports AAMVA CDS versions 01 through 10+ across US states, Canadian provinces,
 * and territories, as well as legacy `DAA`/`DAB`/`DCT` payloads.
 */
export declare function parseAamvaPayload(rawText: string): AamvaParsedData | null;
export {};
