import type { GrayscaleBuffer, ImageInput, PreprocessedResult } from './types';

function loadImageElement(input: ImageInput): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (input instanceof HTMLImageElement) {
      if (input.complete && input.naturalWidth > 0) {
        resolve(input);
      } else {
        input.onload = () => resolve(input);
        input.onerror = () => reject(new Error('Failed to load HTMLImageElement'));
      }
      return;
    }

    if (input instanceof HTMLCanvasElement) {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to convert canvas to image'));
      img.src = input.toDataURL('image/png');
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    let objectUrl: string | null = null;

    img.onload = () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      resolve(img);
    };
    img.onerror = () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      reject(new Error('Unable to decode image file for OCR preprocessing'));
    };

    if (typeof input === 'string') {
      img.src = input;
    } else {
      objectUrl = URL.createObjectURL(input);
      img.src = objectUrl;
    }
  });
}

function applyContrastGrayscale(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const histogram = new Uint32Array(256);

  const marginX = Math.floor(width * 0.02);
  const marginY = Math.floor(height * 0.02);
  let samplePixels = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const lum = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
      data[i] = lum;
      data[i + 1] = lum;
      data[i + 2] = lum;
      if (x >= marginX && x < width - marginX && y >= marginY && y < height - marginY) {
        histogram[lum]++;
        samplePixels++;
      }
    }
  }

  let low = 0;
  let high = 255;
  let cum = 0;
  const lowTarget = samplePixels * 0.006;
  const highTarget = samplePixels * 0.96;

  for (let v = 0; v < 256; v++) {
    cum += histogram[v];
    if (cum >= lowTarget) {
      low = v;
      break;
    }
  }

  cum = 0;
  for (let v = 255; v >= 0; v--) {
    cum += histogram[v];
    if (samplePixels - cum <= highTarget) {
      high = v;
      break;
    }
  }

  // Clamp black/white points into [12..36, 225..246] so light guilloche backgrounds
  // whiten cleanly without eroding fine VIZ characters near security holograms
  low = Math.min(36, Math.max(12, low));
  high = Math.min(246, Math.max(225, high));

  const range = Math.max(1, high - low);
  for (let i = 0; i < data.length; i += 4) {
    const stretched = Math.max(0, Math.min(255, ((data[i] - low) * 255) / range));
    data[i] = stretched;
    data[i + 1] = stretched;
    data[i + 2] = stretched;
  }

  ctx.putImageData(imageData, 0, 0);
}

/**
 * Applies gentle row-wise 88th-percentile flat-field background normalization.
 * Uses conservative black/white points (p1.5..p88) so tinted/highlighted MRZ bands
 * whiten cleanly without eroding thin strokes like Z, 7, or <.
 */
function applyRowFlatFieldMrzNormalization(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  borderPad: number,
  enhance: boolean
): GrayscaleBuffer {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const totalPixels = width * height;
  const gray = new Uint8ClampedArray(totalPixels);

  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    gray[p] = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
  }

  if (!enhance) {
    return { data: gray, width, height };
  }

  const xStart = Math.max(borderPad, Math.floor(width * 0.03));
  const xEnd = Math.min(width - borderPad, Math.ceil(width * 0.97));
  const yStart = borderPad;
  const yEnd = height - borderPad;

  const normBuf = new Uint8ClampedArray(totalPixels);
  normBuf.fill(255);

  const allSamples: number[] = [];

  for (let y = yStart; y < yEnd; y++) {
    const rowOffset = y * width;
    const rowVals: number[] = [];
    for (let x = xStart; x < xEnd; x += 2) {
      rowVals.push(gray[rowOffset + x]);
    }
    if (rowVals.length === 0) continue;
    rowVals.sort((a, b) => a - b);

    const rowBg = rowVals[Math.floor(rowVals.length * 0.88)] || 255;
    const rowLow = rowVals[Math.floor(rowVals.length * 0.02)] ?? 0;
    const rowRange = rowBg - rowLow;

    if (rowRange < 18) continue;

    const denom = Math.max(40, rowBg);
    for (let x = borderPad; x < width - borderPad; x++) {
      const normalized = Math.max(0, Math.min(255, Math.round((gray[rowOffset + x] / denom) * 255)));
      normBuf[rowOffset + x] = normalized;
      if ((x & 3) === 0) {
        allSamples.push(normalized);
      }
    }
  }

  allSamples.sort((a, b) => a - b);
  const p1_5 = allSamples[Math.floor(allSamples.length * 0.015)] ?? 20;
  const p88 = allSamples[Math.floor(allSamples.length * 0.88)] ?? 245;

  const blackPoint = Math.min(125, Math.max(15, p1_5 + 15));
  const whitePoint = Math.min(248, Math.max(215, p88));
  const span = Math.max(1, whitePoint - blackPoint);

  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    const v = normBuf[p];
    let out: number;
    if (v <= blackPoint) {
      out = 0;
    } else if (v >= whitePoint) {
      out = 255;
    } else {
      out = Math.round(((v - blackPoint) / span) * 255);
    }
    gray[p] = out;
    data[i] = out;
    data[i + 1] = out;
    data[i + 2] = out;
  }

  ctx.putImageData(imageData, 0, 0);
  return { data: gray, width, height };
}

function buildMrzStrip(
  origCanvas: HTMLCanvasElement,
  targetW: number,
  targetH: number,
  topRatio: number,
  bottomRatio: number,
  enhance: boolean
): { dataUrl: string; grayscale: GrayscaleBuffer } {
  const srcX = Math.round(targetW * 0.018);
  const srcW = Math.max(1, targetW - srcX * 2);
  const srcY = Math.round(targetH * topRatio);
  const srcH = Math.max(1, Math.round(targetH * bottomRatio) - srcY);

  const borderPad = 32;
  const scaleFactor = srcW < 1500 ? 1800 / srcW : 1.15;
  const innerW = Math.round(srcW * scaleFactor);
  const innerH = Math.round(srcH * scaleFactor);
  const outW = innerW + borderPad * 2;
  const outH = innerH + borderPad * 2;

  const mrzCanvas = document.createElement('canvas');
  mrzCanvas.width = outW;
  mrzCanvas.height = outH;
  const mrzCtx = mrzCanvas.getContext('2d', { willReadFrequently: true });
  if (!mrzCtx) throw new Error('2D canvas context unavailable');

  mrzCtx.fillStyle = '#ffffff';
  mrzCtx.fillRect(0, 0, outW, outH);
  mrzCtx.imageSmoothingEnabled = true;
  mrzCtx.imageSmoothingQuality = 'high';
  mrzCtx.drawImage(origCanvas, srcX, srcY, srcW, srcH, borderPad, borderPad, innerW, innerH);

  const grayscale = applyRowFlatFieldMrzNormalization(mrzCtx, outW, outH, borderPad, enhance);
  return {
    dataUrl: mrzCanvas.toDataURL('image/png'),
    grayscale,
  };
}

/**
 * Prepares original, contrast-enhanced full-document, and dual MRZ-strip
 * canvases directly inside the browser.
 */
export async function preprocessDocumentImage(
  input: ImageInput,
  options: { preprocess?: boolean; rotation?: 0 | 90 | 180 | 270 } = {}
): Promise<PreprocessedResult> {
  const { preprocess = true, rotation = 0 } = options;
  const img = await loadImageElement(input);

  const srcW = img.naturalWidth || img.width;
  const srcH = img.naturalHeight || img.height;

  const swapped = rotation === 90 || rotation === 270;
  const rotatedW = swapped ? srcH : srcW;
  const rotatedH = swapped ? srcW : srcH;

  let scale = 1;
  if (rotatedW < 1600) {
    scale = Math.min(3.0, 1800 / Math.max(1, rotatedW));
  } else if (rotatedW > 2200) {
    scale = 2200 / rotatedW;
  }

  const targetW = Math.round(rotatedW * scale);
  const targetH = Math.round(rotatedH * scale);

  const origCanvas = document.createElement('canvas');
  origCanvas.width = targetW;
  origCanvas.height = targetH;
  const origCtx = origCanvas.getContext('2d', { willReadFrequently: true });
  if (!origCtx) throw new Error('2D canvas context unavailable');

  origCtx.fillStyle = '#ffffff';
  origCtx.fillRect(0, 0, targetW, targetH);
  origCtx.save();
  origCtx.translate(targetW / 2, targetH / 2);
  origCtx.rotate((rotation * Math.PI) / 180);
  const drawW = swapped ? targetH : targetW;
  const drawH = swapped ? targetW : targetH;
  origCtx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
  origCtx.restore();

  const originalDataUrl = origCanvas.toDataURL('image/png');

  const enhCanvas = document.createElement('canvas');
  enhCanvas.width = targetW;
  enhCanvas.height = targetH;
  const enhCtx = enhCanvas.getContext('2d', { willReadFrequently: true });
  if (!enhCtx) throw new Error('2D canvas context unavailable');
  enhCtx.drawImage(origCanvas, 0, 0);

  if (preprocess) {
    applyContrastGrayscale(enhCtx, targetW, targetH);
  }
  const enhancedDataUrl = enhCanvas.toDataURL('image/png');

  // Broad strip (60% to 98.2% — avoids holographic mirror strips above ~58% on ID cards while covering all 3 TD1 lines)
  const broadStrip = buildMrzStrip(origCanvas, targetW, targetH, 0.60, 0.982, preprocess);

  // Tight strip (70% to 98.2% — isolates 2-line TD3 passport MRZ cleanly)
  const tightStrip = buildMrzStrip(origCanvas, targetW, targetH, 0.70, 0.982, preprocess);

  return {
    originalDataUrl,
    enhancedDataUrl,
    mrzCropDataUrl: broadStrip.dataUrl,
    mrzGrayscale: broadStrip.grayscale,
    mrzTightCropDataUrl: tightStrip.dataUrl,
    mrzTightGrayscale: tightStrip.grayscale,
    width: targetW,
    height: targetH,
  };
}
