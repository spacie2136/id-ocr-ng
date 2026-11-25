export { SCANNER_VERSION } from './version';
export { DocumentScanner, scanDocumentImage } from './ocrEngine';
export { parseMrzFromText, computeCheckDigit } from './mrzParser';
export { parseVizText, normalizeVisualDate } from './vizParser';
export {
  loadImageElement,
  preprocessDocumentImage,
  sampleDownscaledGrayscale,
} from './imagePreprocessor';
export { analyzeDocumentOrientation, type OrientationAnalysis } from './orientation';
export { ICAO_COUNTRY_CODES, resolveCountryName } from './countries';
export type {
  CheckDigitStatus,
  DocumentType,
  ExtractedIdentity,
  FieldSource,
  GrayscaleBuffer,
  ImageInput,
  MrzFormat,
  MrzParsedData,
  OrientationInfo,
  PreprocessedResult,
  ScanProgress,
  ScanStage,
  ScannerOptions,
  TesseractWorkerConfig,
  VizLineBox,
  VizParsedData,
} from './types';
