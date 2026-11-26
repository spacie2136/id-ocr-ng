export type DocumentType = 'passport' | 'id_card' | 'driver_license' | 'residence_permit' | 'visa' | 'unknown';
export type MrzFormat = 'TD1' | 'TD2' | 'TD3' | 'MRVA' | 'MRVB';
export type FieldSource = 'MRZ' | 'VIZ' | 'MRZ+VIZ' | 'BARCODE' | 'BARCODE+VIZ' | 'COMPUTED';
export type MrzOcrModel = 'ocrb' | 'standard';
export type VizLanguageMode = 'auto' | 'multilingual' | 'standard';
export type QualityIssueCode = 'too_blurry' | 'glare_detected' | 'too_dark' | 'too_bright' | 'no_document' | 'camera_moving';
export interface NormalizedRect {
    /** Normalized left offset [0..1] */
    x: number;
    /** Normalized top offset [0..1] */
    y: number;
    /** Normalized width [0..1] */
    width: number;
    /** Normalized height [0..1] */
    height: number;
}
export interface CroppedRegionInfo {
    /** Base64 PNG data URL of the cropped upright region */
    dataUrl: string;
    /** Normalized [0..1] bounding box in the upright, perspective-corrected document image */
    bbox: NormalizedRect;
    /** Cropped pixel width */
    width: number;
    /** Cropped pixel height */
    height: number;
    /** Strategy used to isolate the region */
    detectionMethod: 'viz_label' | 'pixel_contour' | 'layout_heuristic';
}
export interface SpecimenDetectionResult {
    /** True when specimen/sample/void watermark or reserved ICAO test indicators were found */
    isSpecimen: boolean;
    /** Heuristic confidence score [0..100] */
    confidence: number;
    /** Human-readable matched indicators (e.g. 'SPECIMEN watermark', 'MUSTER', 'ICAO UTO test code') */
    matchedIndicators: string[];
    /** Pipeline sources that triggered specimen detection */
    sources: Array<'ocr_text' | 'mrz' | 'barcode' | 'watermark_visual'>;
}
export interface CrossValidationDiscrepancy {
    field: string;
    mrzValue: string;
    vizValue: string;
    severity: 'warning' | 'critical';
}
export interface SingleSideCrossValidation {
    /** True when an MRZ zone was present and cross-checked against Visual Inspection Zone fields */
    performed: boolean;
    /** Field keys whose MRZ and VIZ values agreed */
    matchedFields: string[];
    /** Fields where MRZ and VIZ disagreed on this document side */
    discrepancies: CrossValidationDiscrepancy[];
    /** True when zero discrepancies were detected */
    consistent: boolean;
}
export interface QualityGateOptions {
    /** Minimum focus/edge sharpness score [0..100] required to pass (default: 26) */
    minSharpness?: number;
    /** Maximum fraction [0..1] of specular glare hotspot pixels inside ROI (default: 0.045) */
    maxGlareRatio?: number;
    /** Minimum mean luminance [0..255] before flagging underexposure (default: 45) */
    minBrightness?: number;
    /** Maximum mean luminance [0..255] before flagging washed-out overexposure (default: 244) */
    maxBrightness?: number;
    /** Require structured document text/edges or a detected card border (default: true) */
    requireDocument?: boolean;
    /** Maximum frame-to-frame luminance delta [0..255] for live camera stability (default: 7.5) */
    maxMotionDelta?: number;
}
export interface ImageQualityReport {
    /** True when all evaluated quality gates pass */
    passed: boolean;
    /** Combined quality score in [0..100] */
    overallScore: number;
    /** Focus / text-edge sharpness score in [0..100] */
    sharpnessScore: number;
    isSharp: boolean;
    /** Fraction of document ROI affected by bright specular glare [0..1] */
    glareRatio: number;
    hasGlare: boolean;
    /** Mean luminance [0..255] in the document ROI */
    meanBrightness: number;
    exposureStatus: 'ok' | 'too_dark' | 'too_bright';
    /** Whether a card/document or readable text structure was found in frame */
    documentDetected: boolean;
    /** Automatically detected 4-corner document quad if visible against background */
    detectedCorners: DocumentQuad | null;
    /** Frame-to-frame steadiness [0..100] (100 for static single images) */
    stabilityScore: number;
    isStable: boolean;
    motionDelta: number;
    /** Active quality blockers preventing capture/pass */
    issues: QualityIssueCode[];
    /** Actionable human-readable prompt for live camera or upload UI */
    guidance: string;
}
export interface CameraAutoCaptureOptions extends QualityGateOptions {
    /** Frame sampling interval in milliseconds (default: 170) */
    sampleIntervalMs?: number;
    /** Number of consecutive passing stable frames before auto-shutter triggers (default: 2) */
    requiredStableFrames?: number;
    /**
     * Optional normalized [0..1] sub-region of the video frame matching the visible UI viewfinder
     * (e.g. `object-cover` crop on portrait mobile cameras). When supplied, both live quality checks
     * and full-res captures crop cleanly to this rectangle instead of saving hidden background margins.
     */
    captureRegion?: NormalizedRect | (() => NormalizedRect | null);
    /** Output File MIME type on auto-capture (default: 'image/png') */
    mimeType?: 'image/png' | 'image/jpeg' | 'image/webp';
    /** Encoder quality [0..1] for JPEG/WebP captures (default: 0.94) */
    captureQuality?: number;
    /** Stop watching automatically once onAutoCapture fires (default: true) */
    stopOnCapture?: boolean;
    /** Fired every sampling tick with live quality metrics & lock progress [0..1] */
    onQualityUpdate?: (report: ImageQualityReport, stabilityProgress: number) => void;
    /** Fired when consecutive sharp, glare-free, aligned frames trigger auto-capture */
    onAutoCapture?: (file: File, report: ImageQualityReport) => void;
    /** Fired if frame capture encounters an error */
    onError?: (error: Error) => void;
}
export interface Point2D {
    /** Normalized X coordinate in [0..1] relative to source image width */
    x: number;
    /** Normalized Y coordinate in [0..1] relative to source image height */
    y: number;
}
export interface DocumentQuad {
    topLeft: Point2D;
    topRight: Point2D;
    bottomRight: Point2D;
    bottomLeft: Point2D;
}
export interface PerspectiveInfo {
    /** Whether a 4-corner perspective warp was applied */
    applied: boolean;
    /** True when corners were detected automatically vs supplied manually */
    autoDetected: boolean;
    /** Normalized [0..1] corners in the original source image */
    corners: DocumentQuad;
    /** Fraction of source image area occupied by the detected quadrilateral */
    sourceQuadAreaRatio: number;
}
export interface CheckDigitStatus {
    label: string;
    field: string;
    expected: string;
    actual: string;
    valid: boolean;
}
export interface MrzParsedData {
    format: MrzFormat;
    documentCode: string;
    rawLines: string[];
    issuingCountry: string;
    surname: string;
    surnames: string[];
    givenNames: string;
    givenNamesList: string[];
    documentNumber: string;
    nationality: string;
    dateOfBirth: string | null;
    rawDateOfBirth: string;
    sex: 'M' | 'F' | 'X' | 'Unspecified';
    dateOfExpiry: string | null;
    rawDateOfExpiry: string;
    optionalData1: string;
    optionalData2: string;
    checkDigits: CheckDigitStatus[];
    allCheckDigitsValid: boolean;
    validCount: number;
    totalChecks: number;
}
export interface AamvaParsedData {
    /** 6-digit AAMVA Issuer Identification Number (e.g. '636014' for California) */
    iin: string | null;
    /** AAMVA CDS version number (e.g. '08', '09', '10') */
    version: string | null;
    /** Jurisdiction version number */
    jurisdictionVersion: string | null;
    /** Primary subfile type ('DL' = Driver License, 'ID' = Identification Card, etc.) */
    subfileType: 'DL' | 'ID' | string | null;
    /** Resolved issuing state/province name from IIN or DAJ (e.g. 'California') */
    jurisdictionName: string | null;
    /** ISO 3166-1 alpha-3 issuing country ('USA' | 'CAN' | 'MEX' | ...) */
    issuingCountry: string | null;
    surname: string | null;
    surnames: string[];
    firstName: string | null;
    middleName: string | null;
    givenNames: string | null;
    givenNamesList: string[];
    nameSuffix: string | null;
    fullName: string | null;
    /** Customer / Driver License number (DAQ) */
    documentNumber: string | null;
    /** Document discriminator (DCF) */
    documentDiscriminator: string | null;
    /** Inventory control number (DCK) */
    inventoryControlNumber: string | null;
    dateOfBirth: string | null;
    dateOfIssue: string | null;
    dateOfExpiry: string | null;
    sex: 'M' | 'F' | 'X' | null;
    streetAddress: string | null;
    city: string | null;
    state: string | null;
    postalCode: string | null;
    address: string | null;
    licenseClass: string | null;
    restrictions: string | null;
    endorsements: string | null;
    height: string | null;
    weight: string | null;
    eyeColor: string | null;
    hairColor: string | null;
    organDonor: boolean | null;
    veteran: boolean | null;
    realIdCompliance: string | null;
    /** Raw decoded AAMVA 3-letter element code -> trimmed string dictionary */
    fields: Record<string, string>;
}
export interface BarcodeParsedData {
    format: 'PDF417';
    rawText: string;
    detector: 'native' | 'zxing';
    aamva: AamvaParsedData | null;
}
export interface VizLineBox {
    text: string;
    bbox: {
        x0: number;
        y0: number;
        x1: number;
        y1: number;
    };
}
export interface VizParsedData {
    documentTypeHint: DocumentType | null;
    surname: string | null;
    surnames: string[];
    givenNames: string | null;
    fullName: string | null;
    documentNumber: string | null;
    personalNumber: string | null;
    nationality: string | null;
    issuingCountry: string | null;
    dateOfBirth: string | null;
    dateOfIssue: string | null;
    dateOfExpiry: string | null;
    sex: 'M' | 'F' | 'X' | null;
    placeOfBirth: string | null;
    address: string | null;
    parents: string | null;
    issuingAuthority: string | null;
    licenseClass: string | null;
    restrictions: string | null;
    endorsements: string | null;
    height: string | null;
    eyeColor: string | null;
    hairColor: string | null;
    detectedLines: string[];
    unmappedKeyValues: Record<string, string>;
}
export interface OrientationInfo {
    /** Coarse clockwise rotation applied (0 | 90 | 180 | 270) */
    coarseDegrees: 0 | 90 | 180 | 270;
    /** Fine deskew clockwise angle applied in degrees ([-45, 45]) */
    deskewDegrees: number;
    /** Combined clockwise straightening rotation in degrees */
    totalDegrees: number;
    /** Whether orientation was automatically detected vs fixed manual rotation */
    autoDetected: boolean;
}
export interface ExtractedIdentity {
    documentType: DocumentType;
    documentFormat: MrzFormat | 'AAMVA_PDF417' | 'PDF417' | 'VISUAL_ONLY';
    issuingCountry: string | null;
    issuingCountryName: string | null;
    documentNumber: string | null;
    personalNumber: string | null;
    surname: string | null;
    surnames: string[];
    givenNames: string | null;
    givenNamesList: string[];
    fullName: string | null;
    nationality: string | null;
    nationalityName: string | null;
    dateOfBirth: string | null;
    age: number | null;
    sex: 'M' | 'F' | 'X' | 'Unspecified';
    dateOfIssue: string | null;
    dateOfExpiry: string | null;
    isExpired: boolean | null;
    placeOfBirth: string | null;
    address: string | null;
    parents: string | null;
    issuingAuthority: string | null;
    licenseClass: string | null;
    restrictions: string | null;
    endorsements: string | null;
    height: string | null;
    eyeColor: string | null;
    hairColor: string | null;
    mrz: MrzParsedData | null;
    /** Decoded PDF417 / AAMVA barcode payload if present (e.g., US/CA Driver License or ID back) */
    barcode: BarcodeParsedData | null;
    /** Cropped upright holder face portrait PNG data URL when detected */
    portraitDataUrl?: string | null;
    /** Normalized crop coordinates & metadata for the extracted holder portrait */
    portraitRegion?: CroppedRegionInfo | null;
    /** Cropped upright holder signature PNG data URL when detected */
    signatureDataUrl?: string | null;
    /** Normalized crop coordinates & metadata for the extracted holder signature */
    signatureRegion?: CroppedRegionInfo | null;
    /** Specimen / sample / void watermark & test-document detection result */
    specimen?: SpecimenDetectionResult;
    /** Single-side consistency check between decoded MRZ fields and VIZ OCR fields */
    crossValidation?: SingleSideCrossValidation;
    /** MRZ OCR model actually used for the dedicated MRZ pass ('ocrb' or 'standard') */
    mrzModel?: MrzOcrModel;
    /** VIZ language strategy used for Visual Inspection Zone extraction */
    vizLanguageMode?: VizLanguageMode;
    /** Final Tesseract language pack string used for VIZ OCR (e.g. 'eng', 'eng+deu', 'eng+deu+spa+fra') */
    vizLanguage?: string;
    /** True when OffscreenCanvas + Web Worker preprocessing offloaded pixel operations off the main thread */
    workerPreprocessed?: boolean;
    unmappedFields: Record<string, string>;
    fieldSources: Record<string, FieldSource>;
    rawOcrText: string;
    rawMrzText: string;
    confidence: number;
    processingTimeMs: number;
    sourceDimensions: {
        width: number;
        height: number;
    };
    orientation?: OrientationInfo;
    perspective?: PerspectiveInfo;
    /** Client-side sharpness, glare, exposure, and framing evaluation */
    quality?: ImageQualityReport;
    previews?: {
        originalDataUrl: string;
        enhancedDataUrl: string;
        mrzCropDataUrl: string;
    };
}
export interface SideConsistencyConflict {
    field: string;
    frontValue: string;
    backValue: string;
    resolution: string;
}
export interface MergedDocumentResult extends ExtractedIdentity {
    sides: {
        front: ExtractedIdentity;
        back: ExtractedIdentity;
    };
    /** Indicates how front and back sides were matched during merging */
    sideAssignment: 'front+back' | 'swapped_detected' | 'both_mrz' | 'barcode_back' | 'visual_only';
    /** Cross-side verification warnings when front and back disagree (e.g. different doc number or DOB) */
    conflicts: SideConsistencyConflict[];
    /** True when no key identity conflicts exist between front and back */
    sidesConsistent: boolean;
}
export type ScanStage = 'quality_check' | 'detecting_perspective' | 'detecting_barcode' | 'detecting_orientation' | 'preprocessing' | 'initializing_ocr' | 'recognizing_full' | 'recognizing_viz_native' | 'recognizing_mrz' | 'parsing' | 'complete';
export interface ScanProgress {
    stage: ScanStage;
    progress: number;
    message: string;
}
export interface TesseractWorkerConfig {
    /** Custom URL/path to Tesseract worker.min.js (useful for strict CSP or self-hosting) */
    workerPath?: string;
    /** Custom URL/path to Tesseract WASM core directory */
    corePath?: string;
    /** Custom URL/path to directory containing *.traineddata.gz files */
    langPath?: string;
    /** Set false when loading workerPath directly without wrapping in a Blob URL */
    workerBlobURL?: boolean;
    /** Offload perspective warp & grayscale/MRZ preprocessing to a Web Worker with OffscreenCanvas when available (default: true) */
    useWorkerPreprocessing?: boolean;
    /** MRZ model to use for dedicated MRZ pass: 'ocrb' (default) or 'standard' (uses main language model) */
    mrzModel?: MrzOcrModel;
    /** Traineddata code for dedicated OCR-B MRZ worker (defaults to 'ocrb_int') */
    mrzLanguage?: string;
    /** Custom URL/path containing the OCR-B traineddata file (defaults to jsDelivr Shreeshrii/tessdata_ocrb) */
    mrzLangPath?: string;
    /** Whether the MRZ traineddata at mrzLangPath is .gz compressed (defaults to false) */
    mrzGzip?: boolean;
    /** VIZ language strategy: 'auto' (country-routed native pass default), 'multilingual' (single-pass bundle), or 'standard' (eng only) */
    vizLanguageMode?: VizLanguageMode;
    /** Explicit Tesseract VIZ language string override (e.g. 'eng+deu', 'pol+eng', 'eng+deu+spa+fra') */
    vizLanguages?: string;
    /** Custom/override ICAO alpha-3 country -> Tesseract traineddata map (e.g. { POL: 'pol' }) */
    vizLanguageMap?: Record<string, string>;
}
export interface ScannerOptions extends TesseractWorkerConfig {
    /** Primary Tesseract language code(s) for full-page VIZ OCR (and MRZ fallback), defaults to 'eng' */
    language?: string;
    /** Apply grayscale & contrast stretching before OCR (default: true) */
    preprocess?: boolean;
    /** Run a dedicated high-contrast MRZ bottom-strip OCR pass (default: true) */
    enhanceMrzPass?: boolean;
    /** Scan for PDF417 / AAMVA 2D barcodes via native BarcodeDetector + ZXing fallback (default: true) */
    enableBarcodePass?: boolean;
    /** Extract and return a cropped PNG portrait data URL (`portraitDataUrl`) from the upright document (default: true) */
    extractPortrait?: boolean;
    /** Extract and return a cropped PNG holder signature data URL (`signatureDataUrl`) when present (default: true) */
    extractSignature?: boolean;
    /** Flag specimen / sample / void watermarks & reserved ICAO test codes (`specimen`) (default: true) */
    detectSpecimen?: boolean;
    /** Automatically detect and dewarp 4-corner perspective distortion (default: true) */
    perspectiveCorrection?: boolean;
    /** Explicit normalized [0..1] 4-corner quad override to warp before OCR */
    corners?: DocumentQuad;
    /** Automatically detect rotation (0/90/180/270) and deskew tilted documents (default: true) */
    autoRotate?: boolean;
    /** Rotate input image clockwise in degrees before processing (0 | 90 | 180 | 270) */
    rotation?: 0 | 90 | 180 | 270;
    /** Fine clockwise deskew override in degrees when autoRotate is disabled (default: 0) */
    deskewDegrees?: number;
    /** Evaluate sharpness, glare & exposure and attach `result.quality` (default: true) */
    includeQualityReport?: boolean;
    /** Throw QualityGateError before OCR if image quality fails thresholds (default: false) */
    enforceQualityGate?: boolean;
    /** Custom thresholds used by includeQualityReport and enforceQualityGate */
    qualityGateOptions?: QualityGateOptions;
    /** Include processed preview data URLs in the result (default: true) */
    includePreviews?: boolean;
    /** Optional AbortSignal to cleanly cancel an in-flight scan across preprocessing & OCR stages */
    signal?: AbortSignal;
    /** Progress listener callback */
    onProgress?: (progress: ScanProgress) => void;
}
export interface PairScanOptions extends Omit<ScannerOptions, 'corners' | 'rotation' | 'deskewDegrees'> {
    /** Per-side options overriding shared options for the front image */
    frontOptions?: ScannerOptions;
    /** Per-side options overriding shared options for the back image */
    backOptions?: ScannerOptions;
}
export interface GrayscaleBuffer {
    data: Uint8ClampedArray;
    width: number;
    height: number;
}
export interface PreprocessedResult {
    originalDataUrl: string;
    enhancedDataUrl: string;
    mrzCropDataUrl: string;
    mrzGrayscale: GrayscaleBuffer;
    mrzTightCropDataUrl: string;
    mrzTightGrayscale: GrayscaleBuffer;
    width: number;
    height: number;
}
export type ImageSurface = HTMLImageElement | HTMLCanvasElement | ImageBitmap;
export type ImageInput = File | Blob | string | HTMLImageElement | HTMLCanvasElement | ImageBitmap;
