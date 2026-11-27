import type { DocumentQuad, GrayscaleBuffer, PreprocessedResult } from './types';
import type { PreprocessDocumentOptions } from './imagePreprocessor';
export declare class ScanAbortedError extends Error {
    readonly name = "AbortError";
    readonly code = "SCAN_ABORTED";
    constructor(message?: string);
}
export declare function isScanAbortedError(err: unknown): err is ScanAbortedError;
export declare function throwIfScanAborted(signal?: AbortSignal): void;
export declare function raceWithAbort<T>(promise: Promise<T>, signal?: AbortSignal, onAbort?: () => void): Promise<T>;
export declare function supportsWorkerPreprocessing(): boolean;
export declare class PreprocessWorkerClient {
    private worker;
    private workerUrl;
    private nextJobId;
    private pending;
    private permanentlyUnavailable;
    isAvailable(): boolean;
    private ensureWorker;
    private destroyWorkerInstance;
    /**
     * Immediately stops the active preprocessing worker thread (e.g. when AbortSignal triggers)
     * without permanently disabling worker preprocessing for future scans.
     */
    abortActiveWorker(): void;
    private runJob;
    warpPerspective(surface: HTMLImageElement | HTMLCanvasElement | ImageBitmap, corners: DocumentQuad, signal?: AbortSignal): Promise<ImageBitmap | null>;
    sampleDownscaledGrayscale(surface: HTMLImageElement | HTMLCanvasElement | ImageBitmap, maxDim?: number, signal?: AbortSignal): Promise<GrayscaleBuffer | null>;
    preprocessDocument(surface: HTMLImageElement | HTMLCanvasElement | ImageBitmap, options: PreprocessDocumentOptions, signal?: AbortSignal): Promise<PreprocessedResult | null>;
    terminate(): void;
}
