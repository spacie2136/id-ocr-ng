import type { ExtractedIdentity, MergedDocumentResult } from './types';
/**
 * Pure two-sided identity merger. Combines extracted data from the front and back
 * of an ID card, residence permit, or driver license (even if uploaded swapped),
 * preserving valid ICAO 9303 MRZ check digits, deterministic AAMVA PDF417 barcode
 * fields, cropped portrait/signature assets, and specimen watermark flags.
 */
export declare function mergeDocumentSides(front: ExtractedIdentity, back: ExtractedIdentity): MergedDocumentResult;
