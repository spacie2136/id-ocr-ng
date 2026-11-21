export { DocumentScanner, scanDocumentImage } from './ocrEngine';
export { parseMrzFromText, computeCheckDigit } from './mrzParser';
export { parseVizText, normalizeVisualDate } from './vizParser';
export { preprocessDocumentImage } from './imagePreprocessor';
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
  PreprocessedResult,
  ScanProgress,
  ScanStage,
  ScannerOptions,
  VizLineBox,
  VizParsedData,
} from './types';
