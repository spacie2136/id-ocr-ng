export type DocumentType = 'passport' | 'id_card' | 'driver_license' | 'residence_permit' | 'visa' | 'unknown';
export type MrzFormat = 'TD1' | 'TD2' | 'TD3' | 'MRVA' | 'MRVB';
export type FieldSource = 'MRZ' | 'VIZ' | 'MRZ+VIZ' | 'COMPUTED';
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
    documentFormat: MrzFormat | 'VISUAL_ONLY';
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
    previews?: {
        originalDataUrl: string;
        enhancedDataUrl: string;
        mrzCropDataUrl: string;
    };
}
export type ScanStage = 'detecting_orientation' | 'preprocessing' | 'initializing_ocr' | 'recognizing_full' | 'recognizing_mrz' | 'parsing' | 'complete';
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
}
export interface ScannerOptions extends TesseractWorkerConfig {
    /** Tesseract language code(s), defaults to 'eng' */
    language?: string;
    /** Apply grayscale & contrast stretching before OCR (default: true) */
    preprocess?: boolean;
    /** Run a dedicated high-contrast MRZ bottom-strip OCR pass (default: true) */
    enhanceMrzPass?: boolean;
    /** Automatically detect rotation (0/90/180/270) and deskew tilted documents (default: true) */
    autoRotate?: boolean;
    /** Rotate input image clockwise in degrees before processing (0 | 90 | 180 | 270) */
    rotation?: 0 | 90 | 180 | 270;
    /** Fine clockwise deskew override in degrees when autoRotate is disabled (default: 0) */
    deskewDegrees?: number;
    /** Include processed preview data URLs in the result (default: true) */
    includePreviews?: boolean;
    /** Progress listener callback */
    onProgress?: (progress: ScanProgress) => void;
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
export type ImageInput = File | Blob | string | HTMLImageElement | HTMLCanvasElement;
