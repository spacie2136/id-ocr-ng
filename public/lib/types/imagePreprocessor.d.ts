import type { GrayscaleBuffer, ImageInput, PreprocessedResult } from './types';
export declare function loadImageElement(input: ImageInput): Promise<HTMLImageElement>;
/**
 * Renders a compact downscaled grayscale buffer (max dimension ~400px)
 * for fast client-side orientation and skew estimation.
 */
export declare function sampleDownscaledGrayscale(img: HTMLImageElement, maxDim?: number): GrayscaleBuffer;
/**
 * Prepares original, contrast-enhanced full-document, and dual MRZ-strip
 * canvases directly inside the browser with support for coarse 90-degree
 * rotation and arbitrary-angle fine deskewing.
 */
export declare function preprocessDocumentImage(input: ImageInput, options?: {
    preprocess?: boolean;
    rotation?: 0 | 90 | 180 | 270;
    deskewDegrees?: number;
}): Promise<PreprocessedResult>;
