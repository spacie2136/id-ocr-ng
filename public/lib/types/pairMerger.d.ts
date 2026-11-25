import type { ExtractedIdentity, MergedDocumentResult } from './types';
/**
 * Pure two-sided identity merger. Combines extracted data from the front and back
 * of an ID card, residence permit, or driver license (even if uploaded swapped),
 * preserving valid ICAO 9303 MRZ check digits while enriching addresses, diacritics,
 * sex, issue dates, and cross-checking overlapping fields for consistency.
 */
export declare function mergeDocumentSides(front: ExtractedIdentity, back: ExtractedIdentity): MergedDocumentResult;
