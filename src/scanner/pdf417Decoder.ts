import BinaryBitmap from '@zxing/library/esm/core/BinaryBitmap';
import DecodeHintType from '@zxing/library/esm/core/DecodeHintType';
import RGBLuminanceSource from '@zxing/library/esm/core/RGBLuminanceSource';
import GlobalHistogramBinarizer from '@zxing/library/esm/core/common/GlobalHistogramBinarizer';
import HybridBinarizer from '@zxing/library/esm/core/common/HybridBinarizer';
import PDF417Reader from '@zxing/library/esm/core/pdf417/PDF417Reader';
import { parseAamvaPayload } from './aamvaParser';
import { throwIfScanAborted } from './preprocessWorker';
import type { BarcodeParsedData, ImageSurface } from './types';

interface NativeDetectedBarcode {
  format?: string;
  rawValue?: string;
}

interface NativeBarcodeDetectorConstructor {
  new (options?: { formats?: string[] }): {
    detect: (image: CanvasImageSource) => Promise<NativeDetectedBarcode[]>;
  };
  getSupportedFormats?: () => Promise<string[]>;
}

let cachedNativePdf417Supported: boolean | null = null;

async function isNativePdf417Supported(): Promise<boolean> {
  if (cachedNativePdf417Supported !== null) {
    return cachedNativePdf417Supported;
  }
  const Ctor = (globalThis as { BarcodeDetector?: NativeBarcodeDetectorConstructor })
    .BarcodeDetector;
  if (!Ctor) {
    cachedNativePdf417Supported = false;
    return false;
  }
  try {
    if (typeof Ctor.getSupportedFormats === 'function') {
      const formats = await Ctor.getSupportedFormats();
      cachedNativePdf417Supported = formats.includes('pdf417');
    } else {
      cachedNativePdf417Supported = true;
    }
  } catch {
    cachedNativePdf417Supported = false;
  }
  return cachedNativePdf417Supported;
}

function getSourceDimensions(source: ImageSurface): {
  width: number;
  height: number;
} {
  if (typeof HTMLImageElement !== 'undefined' && source instanceof HTMLImageElement) {
    return {
      width: Math.max(1, source.naturalWidth || source.width),
      height: Math.max(1, source.naturalHeight || source.height),
    };
  }
  return {
    width: Math.max(1, source.width),
    height: Math.max(1, source.height),
  };
}

function renderScaledCanvas(
  source: ImageSurface,
  maxDim: number,
  rotationDeg: 0 | 90 | 180 | 270 = 0
): HTMLCanvasElement {
  const { width: srcW, height: srcH } = getSourceDimensions(source);
  const scale = Math.min(1, maxDim / Math.max(srcW, srcH));
  const scaledW = Math.max(1, Math.round(srcW * scale));
  const scaledH = Math.max(1, Math.round(srcH * scale));
  const swapped = rotationDeg === 90 || rotationDeg === 270;

  const canvas = document.createElement('canvas');
  canvas.width = swapped ? scaledH : scaledW;
  canvas.height = swapped ? scaledW : scaledH;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('2D canvas context unavailable');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotationDeg * Math.PI) / 180);
  ctx.drawImage(source, -scaledW / 2, -scaledH / 2, scaledW, scaledH);
  ctx.restore();

  return canvas;
}

function extractGrayscaleLuminance(
  canvas: HTMLCanvasElement,
  region?: { x: number; y: number; w: number; h: number },
  stretchContrast = false
): { luminances: Uint8ClampedArray; width: number; height: number } {
  const cw = canvas.width;
  const ch = canvas.height;
  const rx = region ? Math.max(0, Math.floor(region.x * cw)) : 0;
  const ry = region ? Math.max(0, Math.floor(region.y * ch)) : 0;
  const rw = region ? Math.min(cw - rx, Math.max(32, Math.floor(region.w * cw))) : cw;
  const rh = region ? Math.min(ch - ry, Math.max(32, Math.floor(region.h * ch))) : ch;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('2D canvas context unavailable');

  const rgba = ctx.getImageData(rx, ry, rw, rh).data;
  const nPix = rw * rh;
  const luminances = new Uint8ClampedArray(nPix);

  let minLum = 255;
  let maxLum = 0;
  for (let i = 0, p = 0; i < rgba.length; i += 4, p++) {
    const lum = Math.round(0.299 * rgba[i] + 0.587 * rgba[i + 1] + 0.114 * rgba[i + 2]);
    luminances[p] = lum;
    if (lum < minLum) minLum = lum;
    if (lum > maxLum) maxLum = lum;
  }

  if (stretchContrast && maxLum - minLum >= 24) {
    const span = maxLum - minLum;
    for (let p = 0; p < nPix; p++) {
      luminances[p] = Math.round(((luminances[p] - minLum) / span) * 255);
    }
  }

  return { luminances, width: rw, height: rh };
}

function tryZxingPdf417Decode(
  luminances: Uint8ClampedArray,
  width: number,
  height: number
): string | null {
  if (width < 40 || height < 20) return null;

  const reader = new PDF417Reader();
  const hints = new Map<DecodeHintType, unknown>();
  hints.set(DecodeHintType.TRY_HARDER, true);

  const lumSource = new RGBLuminanceSource(luminances, width, height);

  try {
    const hybrid = new BinaryBitmap(new HybridBinarizer(lumSource));
    const res = reader.decode(hybrid, hints);
    const txt = res?.getText();
    if (txt) return txt;
  } catch {
    // Expected NotFound / Format / Checksum exception when no barcode matches in this pass
  } finally {
    reader.reset();
  }

  try {
    const globalHist = new BinaryBitmap(new GlobalHistogramBinarizer(lumSource));
    const res = reader.decode(globalHist, hints);
    const txt = res?.getText();
    if (txt) return txt;
  } catch {
    // Expected when no barcode matches
  } finally {
    reader.reset();
  }

  return null;
}

async function tryNativeBarcodeDetector(
  surface: ImageSurface,
  rotationOrder: Array<0 | 90 | 180 | 270>,
  signal?: AbortSignal
): Promise<string | null> {
  throwIfScanAborted(signal);
  const supported = await isNativePdf417Supported();
  if (!supported) return null;

  const Ctor = (globalThis as { BarcodeDetector?: NativeBarcodeDetectorConstructor })
    .BarcodeDetector;
  if (!Ctor) return null;

  try {
    const detector = new Ctor({ formats: ['pdf417'] });

    // First try directly on original surface
    throwIfScanAborted(signal);
    const directHits = await detector.detect(surface);
    for (const hit of directHits) {
      if (hit.rawValue && hit.rawValue.trim().length > 0) {
        return hit.rawValue;
      }
    }

    // Fallback: rotated 90°/180°/270° renders when stream is sideways
    for (const rot of rotationOrder) {
      if (rot === 0) continue;
      throwIfScanAborted(signal);
      const rotCanvas = renderScaledCanvas(surface, 1800, rot);
      const hits = await detector.detect(rotCanvas);
      for (const hit of hits) {
        if (hit.rawValue && hit.rawValue.trim().length > 0) {
          return hit.rawValue;
        }
      }
    }
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw err;
    }
    // Fall through cleanly to pure-JS ZXing decoder
  }

  return null;
}

/**
 * Pure-JS + optional hardware BarcodeDetector PDF417 decoder.
 * Detects and decodes 2D PDF417 barcodes on US/Canadian/international driver licenses
 * and ID cards across rotations and lighting variations, returning structured AAMVA data.
 */
export async function detectPdf417Barcode(
  surface: ImageSurface,
  options: {
    coarseRotation?: 0 | 90 | 180 | 270;
    preferNative?: boolean;
    signal?: AbortSignal;
  } = {}
): Promise<BarcodeParsedData | null> {
  const { coarseRotation = 0, preferNative = true, signal } = options;
  throwIfScanAborted(signal);

  const allRotations: Array<0 | 90 | 180 | 270> = [0, 90, 180, 270];
  const rotationOrder: Array<0 | 90 | 180 | 270> = [
    coarseRotation,
    ...allRotations.filter((r) => r !== coarseRotation),
  ];

  if (preferNative) {
    const nativeText = await tryNativeBarcodeDetector(surface, rotationOrder, signal);
    if (nativeText) {
      return {
        format: 'PDF417',
        rawText: nativeText,
        detector: 'native',
        aamva: parseAamvaPayload(nativeText),
      };
    }
  }

  // Targeted sub-crops cover typical upper, middle, and lower DL back barcode placements
  const roiCandidates: Array<{ x: number; y: number; w: number; h: number } | undefined> = [
    undefined,
    { x: 0, y: 0, w: 1, h: 0.56 },
    { x: 0, y: 0.44, w: 1, h: 0.56 },
    { x: 0, y: 0.22, w: 1, h: 0.56 },
  ];

  // Pass A: Full canvas across all 4 orientations (upright + rotated cards)
  const rotatedCanvases = new Map<0 | 90 | 180 | 270, HTMLCanvasElement>();
  for (const rot of rotationOrder) {
    throwIfScanAborted(signal);
    const canvas = renderScaledCanvas(surface, 1600, rot);
    rotatedCanvases.set(rot, canvas);

    const plain = extractGrayscaleLuminance(canvas, undefined, false);
    const hitPlain = tryZxingPdf417Decode(plain.luminances, plain.width, plain.height);
    if (hitPlain) {
      return {
        format: 'PDF417',
        rawText: hitPlain,
        detector: 'zxing',
        aamva: parseAamvaPayload(hitPlain),
      };
    }

    const stretched = extractGrayscaleLuminance(canvas, undefined, true);
    const hitStretched = tryZxingPdf417Decode(
      stretched.luminances,
      stretched.width,
      stretched.height
    );
    if (hitStretched) {
      return {
        format: 'PDF417',
        rawText: hitStretched,
        detector: 'zxing',
        aamva: parseAamvaPayload(hitStretched),
      };
    }
  }

  // Pass B: Targeted bands + contrast normalization on primary orientations
  for (const rot of rotationOrder.slice(0, 2)) {
    throwIfScanAborted(signal);
    const canvas = rotatedCanvases.get(rot);
    if (!canvas) continue;
    for (const roi of roiCandidates.slice(1)) {
      throwIfScanAborted(signal);
      const band = extractGrayscaleLuminance(canvas, roi, true);
      const hit = tryZxingPdf417Decode(band.luminances, band.width, band.height);
      if (hit) {
        return {
          format: 'PDF417',
          rawText: hit,
          detector: 'zxing',
          aamva: parseAamvaPayload(hit),
        };
      }
    }
  }

  return null;
}
