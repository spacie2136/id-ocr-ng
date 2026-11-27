import type { BarcodeParsedData, MrzParsedData, SingleSideCrossValidation, SpecimenDetectionResult, VizParsedData } from './types';
/**
 * Resolves the exact surname / given-name boundary when an MRZ omits the double-chevron (`<<`)
 * delimiter (e.g. `P<UTOQUEST<AMELIA<MARY`) and prints only single `<` separators, causing
 * MRZ parsing alone to place all name tokens inside `mrz.surnames`.
 */
export declare function matchUnsplitMrzNameWithViz(mrz: MrzParsedData, viz: VizParsedData): {
    surname: string;
    surnames: string[];
    givenNames: string;
    givenNamesList: string[];
} | null;
/**
 * Pure single-side MRZ vs. VIZ consistency validator.
 * Compares decoded ICAO 9303 MRZ values against Visual Inspection Zone OCR values
 * on the same document image to flag tampering, OCR hallucinations, or mismatched fields.
 */
export declare function crossValidateMrzAndViz(mrz: MrzParsedData | null, viz: VizParsedData | null): SingleSideCrossValidation;
export interface SpecimenDetectionInput {
    rawOcrText: string;
    rawMrzText?: string;
    mrz?: MrzParsedData | null;
    viz?: VizParsedData | null;
    barcode?: BarcodeParsedData | null;
    unmappedFields?: Record<string, string>;
    watermarkOcrText?: string;
}
/**
 * Pure multilingual detector for specimen, sample, void, and ICAO test documents.
 * Inspects full-page OCR text, optional red/diagonal watermark OCR text, decoded MRZ,
 * VIZ parsed names/fields, and PDF417/AAMVA payloads.
 */
export declare function detectSpecimenWatermark(input: SpecimenDetectionInput): SpecimenDetectionResult;
export declare function mergeSpecimenResults(front?: SpecimenDetectionResult, back?: SpecimenDetectionResult): SpecimenDetectionResult | undefined;
