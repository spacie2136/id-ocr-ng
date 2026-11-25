import type { VizLineBox, VizParsedData } from './types';
export declare function normalizeVisualDate(raw: string): string | null;
/**
 * Parses the Visual Inspection Zone (VIZ) text extracted by Tesseract.
 * When `lineBoxes` are provided, uses 2D column-aligned spatial grouping so
 * multi-column ID cards (e.g. German Personalausweis back) never interleave fields.
 */
export declare function parseVizText(rawText: string, lineBoxes?: VizLineBox[]): VizParsedData;
