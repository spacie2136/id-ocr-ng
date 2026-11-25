import type { MrzParsedData } from './types';
export declare function computeCheckDigit(input: string): string;
export declare function parseMrzFromText(rawText: string): MrzParsedData | null;
