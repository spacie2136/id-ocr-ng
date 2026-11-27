import type { ExtractedIdentity, ImageInput, MergedDocumentResult, PairScanOptions, ScannerOptions, TesseractWorkerConfig } from './types';
export declare class DocumentScanner {
    private worker;
    private workerLang;
    private workerConfigKey;
    private workerInitPromise;
    private workerInitKey;
    private vizNativeWorker;
    private vizNativeLang;
    private vizNativeConfigKey;
    private vizNativeFailedLangs;
    private mrzWorker;
    private mrzWorkerConfigKey;
    private mrzWorkerInitPromise;
    private mrzWorkerInitKey;
    private mrzOcrbFailed;
    private preprocessWorker;
    private defaultWorkerConfig;
    private activeStageCallback;
    private activeStage;
    constructor(workerConfig?: TesseractWorkerConfig);
    private mergeWorkerConfig;
    private abortInFlightWorkers;
    private createLoggerOption;
    private ensureWorker;
    private ensureNativeVizWorker;
    private ensureMrzWorker;
    /**
     * Pre-warms both the primary Tesseract VIZ worker and the dedicated OCR-B MRZ worker
     * concurrently before a user drops a file or clicks capture.
     */
    warmup(options?: TesseractWorkerConfig & {
        language?: string;
        preloadMrz?: boolean;
        preloadViz?: boolean;
    }): Promise<void>;
    private preprocessWithWorkerOrFallback;
    private runOrientationPass;
    private runLightweightProbe;
    scan(input: ImageInput, options?: ScannerOptions): Promise<ExtractedIdentity>;
    scanPair(front: ImageInput, back: ImageInput, options?: PairScanOptions): Promise<MergedDocumentResult>;
    terminate(): Promise<void>;
}
export declare function scanDocumentImage(input: ImageInput, options?: ScannerOptions): Promise<ExtractedIdentity>;
export declare function scanDocumentPair(front: ImageInput, back: ImageInput, options?: PairScanOptions): Promise<MergedDocumentResult>;
