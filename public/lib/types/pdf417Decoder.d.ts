import type { BarcodeParsedData, ImageSurface } from './types';
/**
 * Pure-JS + optional hardware BarcodeDetector PDF417 decoder.
 * Detects and decodes 2D PDF417 barcodes on US/Canadian/international driver licenses
 * and ID cards across rotations and lighting variations, returning structured AAMVA data.
 */
export declare function detectPdf417Barcode(surface: ImageSurface, options?: {
    coarseRotation?: 0 | 90 | 180 | 270;
    preferNative?: boolean;
    signal?: AbortSignal;
}): Promise<BarcodeParsedData | null>;
