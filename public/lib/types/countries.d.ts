/**
 * ISO 3166-1 alpha-3 and ICAO 9303 special issuing-state / nationality codes.
 */
export declare const ICAO_COUNTRY_CODES: Record<string, string>;
export declare function resolveCountryName(code: string | null | undefined): string | null;
