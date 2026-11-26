import type { MrzParsedData } from './types';
export declare function computeCheckDigit(input: string): string;
/**
 * Synthesizes a cross-candidate consensus MRZ parse by performing weighted per-column
 * character voting across multiple OCR/grid candidates sharing the same ICAO format.
 * Helps recover lines where individual passes disagree on 1-2 isolated characters.
 */
export declare function synthesizeConsensusMrz(candidates: MrzParsedData[]): MrzParsedData | null;
export declare function parseMrzFromText(rawText: string): MrzParsedData | null;
