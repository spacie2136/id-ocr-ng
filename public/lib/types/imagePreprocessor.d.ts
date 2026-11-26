import type { GrayscaleBuffer, ImageInput, ImageSurface, PreprocessedResult } from './types';
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
 * Prepares original, contrast-enhanced full-document, and dual MRZ-strip
 * canvases directly inside the browser with support for coarse 90-degree
 * rotation and arbitrary-angle fine deskewing.
 */
export declare function preprocessDocumentImage(input: ImageInput, options?: {
    preprocess?: boolean;
    rotation?: 0 | 90 | 180 | 270;
    deskewDegrees?: number;
}): Promise<PreprocessedResult>;
