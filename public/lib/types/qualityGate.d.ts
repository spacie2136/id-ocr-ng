import type { CameraAutoCaptureOptions, ImageInput, ImageQualityReport, QualityGateOptions } from './types';
export declare class QualityGateError extends Error {
    readonly report: ImageQualityReport;
    constructor(report: ImageQualityReport);
}
/**
 * Evaluates sharpness/focus, specular glare hotspots, brightness/exposure,
 * document framing presence, and optional frame-to-frame motion steadiness
 * directly from a canvas surface.
 */
export declare function assessCanvasQuality(canvas: HTMLCanvasElement, previousSignature?: Uint8Array | null, options?: QualityGateOptions, optionsInternal?: {
    detectQuad?: boolean;
}): {
    report: ImageQualityReport;
    signature: Uint8Array;
};
/**
 * Runs the client-side Image Quality Gate (sharpness/focus, specular glare,
 * exposure, and document framing detection) on any image File, Blob, Data URL,
 * HTMLImageElement, HTMLCanvasElement, or HTMLVideoElement.
 */
export declare function assessImageQuality(input: ImageInput | HTMLVideoElement, options?: QualityGateOptions): Promise<ImageQualityReport>;
/**
 * Watches a live `<video>` stream, evaluates sharpness, glare, exposure, framing,
 * and motion stability every `sampleIntervalMs`, emits telemetry via `onQualityUpdate`,
 * and automatically triggers a full-resolution capture (`onAutoCapture`) once
 * `requiredStableFrames` consecutive crisp & aligned frames pass the quality gate.
 */
export declare class CameraAutoCapture {
    private video;
    private options;
    private timerId;
    private running;
    private capturing;
    private consecutivePassFrames;
    private previousSignature;
    private latestReport;
    private analysisCanvas;
    constructor(video: HTMLVideoElement, options?: CameraAutoCaptureOptions);
    isRunning(): boolean;
    getLatestReport(): ImageQualityReport | null;
    start(): void;
    stop(): void;
    /** Updates quality gate or callback options on the fly without recreating the watcher. */
    updateOptions(next: Partial<CameraAutoCaptureOptions>): void;
    private scheduleNextTick;
    private tick;
    private captureFullFrame;
}
export declare function watchCameraAutoCapture(video: HTMLVideoElement, options?: CameraAutoCaptureOptions): CameraAutoCapture;
