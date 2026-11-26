import type { BarcodeParsedData, CroppedRegionInfo, DocumentType, ImageSurface, MrzParsedData, NormalizedRect, VizLineBox } from './types';
export interface ExtractMediaOptions {
    documentType?: DocumentType;
    mrz?: MrzParsedData | null;
    barcode?: BarcodeParsedData | null;
    vizLineBoxes?: VizLineBox[];
    extractPortrait?: boolean;
    extractSignature?: boolean;
    checkColoredWatermark?: boolean;
}
export interface ExtractedDocumentMedia {
    portrait: CroppedRegionInfo | null;
    signature: CroppedRegionInfo | null;
    watermarkProbeCanvas?: HTMLCanvasElement | null;
}
/**
 * Pure RGBA buffer portrait region detector. Exposed for deterministic unit testing
 * in both browser and Node.js environments.
 */
export declare function detectPortraitBoundsFromRgba(rgba: Uint8ClampedArray, w: number, h: number, options?: {
    mrz?: MrzParsedData | null;
    barcode?: BarcodeParsedData | null;
    vizLineBoxes?: VizLineBox[];
    docWidth?: number;
    docHeight?: number;
}): {
    bbox: NormalizedRect;
    method: 'pixel_contour';
} | null;
/**
 * Pure RGBA buffer signature region detector.
 * Prioritizes VIZ signature labels (e.g., "Holder's signature", "Firma del titular",
 * "Unterschrift") and falls back to cursive ink-cluster detection above the MRZ zone.
 */
export declare function detectSignatureBoundsFromRgba(rgba: Uint8ClampedArray, w: number, h: number, options?: {
    mrz?: MrzParsedData | null;
    vizLineBoxes?: VizLineBox[];
    docWidth?: number;
    docHeight?: number;
    portraitRect?: NormalizedRect | null;
}): {
    bbox: NormalizedRect;
    method: 'viz_label' | 'layout_heuristic';
} | null;
/**
 * Checks whether the upright document contains a prominent crimson/red stamp or diagonal
 * watermark overlay (e.g. diagonal "SPECIMEN" or "MUSTER" stamp) and isolates it as a
 * crisp deskewed black-on-white canvas for secondary OCR verification.
 * Returns null immediately (~2ms) on clean documents without red stamp overlays.
 */
export declare function buildColoredWatermarkOcrCanvas(sourceCanvas: HTMLCanvasElement): HTMLCanvasElement | null;
/**
 * Extracts cropped portrait (`portraitDataUrl`), holder signature (`signatureDataUrl`),
 * and optional red-stamp watermark probe canvas from an upright, deskewed document image.
 */
export declare function extractPortraitAndSignature(imageSource: string | ImageSurface, options?: ExtractMediaOptions): Promise<ExtractedDocumentMedia>;
