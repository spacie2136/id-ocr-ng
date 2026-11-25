import type { ExtractedIdentity, ImageInput, MergedDocumentResult, PairScanOptions, ScannerOptions, TesseractWorkerConfig } from './types';
export declare class DocumentScanner {
    private worker;
    private workerLang;
    private workerConfigKey;
    private mrzWorker;
    private mrzWorkerConfigKey;
    private mrzOcrbFailed;
    private defaultWorkerConfig;
    private activeStageCallback;
    private activeStage;
    constructor(workerConfig?: TesseractWorkerConfig);
    private mergeWorkerConfig;
    private createLoggerOption;
    private ensureWorker;
    private ensureMrzWorker;
    private runOrientationPass;
    private runLightweightProbe;
    scan(input: ImageInput, options?: ScannerOptions): Promise<ExtractedIdentity>;
    /**
     * Scans both the front and back images of a two-sided document (ID card, residence permit,
     * or driver license) reusing warm OCR workers across both sides and merges them into one
     * unified ExtractedIdentity with cross-side consistency checks.
     */
    scanPair(front: ImageInput, back: ImageInput, options?: PairScanOptions): Promise<MergedDocumentResult>;
    terminate(): Promise<void>;
}
export declare function scanDocumentImage(input: ImageInput, options?: ScannerOptions): Promise<ExtractedIdentity>;
export declare function scanDocumentPair(front: ImageInput, back: ImageInput, options?: PairScanOptions): Promise<MergedDocumentResult>;
