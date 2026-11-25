import type { ExtractedIdentity, ImageInput, ScannerOptions, TesseractWorkerConfig } from './types';
export declare class DocumentScanner {
    private worker;
    private workerLang;
    private workerConfigKey;
    private defaultWorkerConfig;
    private activeStageCallback;
    private activeStage;
    constructor(workerConfig?: TesseractWorkerConfig);
    private ensureWorker;
    private runOrientationPass;
    private runLightweightProbe;
    scan(input: ImageInput, options?: ScannerOptions): Promise<ExtractedIdentity>;
    terminate(): Promise<void>;
}
export declare function scanDocumentImage(input: ImageInput, options?: ScannerOptions): Promise<ExtractedIdentity>;
