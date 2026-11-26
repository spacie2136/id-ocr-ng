import type { GrayscaleBuffer, ImageInput, ImageSurface, PreprocessedResult } from './types';
export interface DynamicMrzBandResult {
    detected: boolean;
    broadTop: number;
    broadBottom: number;
    tightTop: number;
    tightBottom: number;
}
export declare function getSurfaceDimensions(surface: ImageSurface): {
    width: number;
    height: number;
};
export declare function loadImageElement(input: ImageInput): Promise<HTMLImageElement>;
/**
 * Decodes an ImageInput directly to a transferable ImageBitmap (off the main thread for Blob/File inputs)
 * when supported, falling back cleanly to HTMLImageElement / HTMLCanvasElement.
 */
export declare function loadImageSurface(input: ImageInput, preferBitmap?: boolean): Promise<{
    surface: ImageSurface;
    ownedBitmap: ImageBitmap | null;
}>;
/**
 * Renders a compact downscaled grayscale buffer (max dimension ~400px)
 * for fast client-side orientation and skew estimation.
 */
export declare function sampleDownscaledGrayscale(img: ImageSurface, maxDim?: number): GrayscaleBuffer;
/**
 * Estimates a 16x12 coarse 88th-percentile illumination surface with 3x3 max smoothing
 * so dark portrait boxes borrow paper brightness from neighboring tiles.
 * Only flattens uneven lighting when tile spread >= 28 so flat digital scans remain untouched.
 */
export declare function flattenShadowIlluminationBuffer(gray: Uint8ClampedArray, width: number, height: number): {
    applied: boolean;
    spread: number;
};
/**
 * Locates dense monospace MRZ rows inside the lower half of a rectified upright document.
 * Requires strong dark ink contrast (>= 52) so pastel guilloche backgrounds never bridge
 * across the lower half, tightening strips cleanly around TD1/TD3 MRZ lines.
 */
export declare function detectDynamicMrzBand(gray: Uint8ClampedArray, width: number, height: number): DynamicMrzBandResult;
/**
 * Prepares original, shadow-flattened contrast-enhanced full-document, and dynamically
 * localized dual MRZ-strip canvases directly inside the browser with support for coarse
 * 90-degree rotation and arbitrary-angle fine deskewing.
 */
export declare function preprocessDocumentImage(input: ImageInput, options?: {
    preprocess?: boolean;
    rotation?: 0 | 90 | 180 | 270;
    deskewDegrees?: number;
}): Promise<PreprocessedResult>;
