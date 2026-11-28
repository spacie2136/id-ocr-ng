import type { GrayscaleBuffer, ImageInput, ImageSurface, PreprocessedResult } from './types';

export interface DynamicMrzBandResult {
  detected: boolean;
  broadTop: number;
  broadBottom: number;
  tightTop: number;
  tightBottom: number;
}

export interface PreprocessDocumentOptions {
  preprocess?: boolean;
  rotation?: 0 | 90 | 180 | 270;
  deskewDegrees?: number;
  includePreviews?: boolean;
  skipFullPage?: boolean;
  skipMrzStrips?: boolean;
  needOriginal?: boolean;
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | undefined> {
  if (typeof canvas.toBlob !== 'function') {
    return Promise.resolve(undefined);
  }
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob ?? undefined), 'image/png');
  });
}

function computeChromaCompensatedLuma(r: number, g: number, b: number, alpha: number): number {
  const max = r > g ? (r > b ? r : b) : g > b ? g : b;
  const min = r < g ? (r < b ? r : b) : g < b ? g : b;
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return Math.min(255, Math.round(lum + alpha * (max - min)));
}

export function getSurfaceDimensions(surface: ImageSurface): { width: number; height: number } {
  if (typeof HTMLImageElement !== 'undefined' && surface instanceof HTMLImageElement) {
    return {
      width: Math.max(1, surface.naturalWidth || surface.width),
      height: Math.max(1, surface.naturalHeight || surface.height),
    };
  }
  return {
    width: Math.max(1, surface.width),
    height: Math.max(1, surface.height),
  };
}

export function loadImageElement(input: ImageInput): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (typeof HTMLImageElement !== 'undefined' && input instanceof HTMLImageElement) {
      if (input.complete && input.naturalWidth > 0) {
        resolve(input);
      } else {
        input.onload = () => resolve(input);
        input.onerror = () => reject(new Error('Failed to load HTMLImageElement'));
      }
      return;
    }

    if (typeof HTMLCanvasElement !== 'undefined' && input instanceof HTMLCanvasElement) {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to convert canvas to image'));
      img.src = input.toDataURL('image/png');
      return;
    }

    if (typeof ImageBitmap !== 'undefined' && input instanceof ImageBitmap) {
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, input.width);
      canvas.height = Math.max(1, input.height);
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('2D canvas context unavailable'));
        return;
      }
      ctx.drawImage(input, 0, 0);
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to convert ImageBitmap to image'));
      img.src = canvas.toDataURL('image/png');
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
    } else if (typeof Blob !== 'undefined' && input instanceof Blob) {
      objectUrl = URL.createObjectURL(input);
      img.src = objectUrl;
    } else {
      reject(new Error('Unsupported image input type'));
    }
  });
}

/**
 * Decodes an ImageInput directly to a transferable ImageBitmap (off the main thread for Blob/File inputs)
 * when supported, falling back cleanly to HTMLImageElement / HTMLCanvasElement.
 */
export async function loadImageSurface(
  input: ImageInput,
  preferBitmap = true
): Promise<{ surface: ImageSurface; ownedBitmap: ImageBitmap | null }> {
  if (typeof ImageBitmap !== 'undefined' && input instanceof ImageBitmap) {
    return { surface: input, ownedBitmap: null };
  }
  if (typeof HTMLCanvasElement !== 'undefined' && input instanceof HTMLCanvasElement) {
    return { surface: input, ownedBitmap: null };
  }
  if (typeof HTMLImageElement !== 'undefined' && input instanceof HTMLImageElement) {
    const img = await loadImageElement(input);
    return { surface: img, ownedBitmap: null };
  }
  if (
    preferBitmap &&
    typeof Blob !== 'undefined' &&
    input instanceof Blob &&
    typeof createImageBitmap === 'function'
  ) {
    try {
      const bitmap = await createImageBitmap(input);
      return { surface: bitmap, ownedBitmap: bitmap };
    } catch {
      // Fallback cleanly to HTMLImageElement decoding
    }
  }
  const img = await loadImageElement(input);
  return { surface: img, ownedBitmap: null };
}

/**
 * Renders a compact downscaled grayscale buffer (max dimension ~400px)
 * for fast client-side orientation and skew estimation.
 */
export function sampleDownscaledGrayscale(
  img: ImageSurface,
  maxDim = 400
): GrayscaleBuffer {
  const { width: srcW, height: srcH } = getSurfaceDimensions(img);
  const scale = Math.min(1, maxDim / Math.max(srcW, srcH));
  const width = Math.max(1, Math.round(srcW * scale));
  const height = Math.max(1, Math.round(srcH * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('2D canvas context unavailable');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'medium';
  ctx.drawImage(img, 0, 0, width, height);

  const rgba = ctx.getImageData(0, 0, width, height).data;
  const gray = new Uint8ClampedArray(width * height);
  for (let i = 0, p = 0; i < rgba.length; i += 4, p++) {
    gray[p] = Math.round(0.299 * rgba[i] + 0.587 * rgba[i + 1] + 0.114 * rgba[i + 2]);
  }
  return { data: gray, width, height };
}

/**
 * Estimates a 16x12 coarse 88th-percentile illumination surface with 3x3 max smoothing
 * so dark portrait boxes borrow paper brightness from neighboring tiles.
 * Only flattens uneven lighting when tile spread >= minSpread (default 28) so flat digital scans remain untouched.
 */
export function flattenShadowIlluminationBuffer(
  gray: Uint8ClampedArray,
  width: number,
  height: number,
  minSpread = 28
): { applied: boolean; spread: number } {
  if (width < 32 || height < 24 || gray.length < width * height) {
    return { applied: false, spread: 0 };
  }

  const cols = 16;
  const rows = 12;
  const tileBg = new Float32Array(rows * cols);
  const sampleBuf: number[] = [];

  for (let r = 0; r < rows; r++) {
    const y0 = Math.floor((r * height) / rows);
    const y1 = Math.max(y0 + 1, Math.floor(((r + 1) * height) / rows));
    const stepY = Math.max(1, Math.floor((y1 - y0) / 14));
    for (let c = 0; c < cols; c++) {
      const x0 = Math.floor((c * width) / cols);
      const x1 = Math.max(x0 + 1, Math.floor(((c + 1) * width) / cols));
      const stepX = Math.max(1, Math.floor((x1 - x0) / 14));
      sampleBuf.length = 0;
      for (let y = y0; y < y1; y += stepY) {
        const rowOff = y * width;
        for (let x = x0; x < x1; x += stepX) {
          sampleBuf.push(gray[rowOff + x]);
        }
      }
      sampleBuf.sort((a, b) => a - b);
      tileBg[r * cols + c] =
        sampleBuf.length > 0 ? sampleBuf[Math.floor(sampleBuf.length * 0.88)] : 255;
    }
  }

  const smoothed = new Float32Array(rows * cols);
  let bgMin = 255;
  let bgMax = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let localMax = 0;
      for (let dr = -1; dr <= 1; dr++) {
        const rr = Math.max(0, Math.min(rows - 1, r + dr));
        for (let dc = -1; dc <= 1; dc++) {
          const cc = Math.max(0, Math.min(cols - 1, c + dc));
          const val = tileBg[rr * cols + cc];
          if (val > localMax) localMax = val;
        }
      }
      const clamped = Math.max(64, localMax);
      smoothed[r * cols + c] = clamped;
      if (clamped < bgMin) bgMin = clamped;
      if (clamped > bgMax) bgMax = clamped;
    }
  }

  const spread = bgMax - bgMin;
  if (spread < minSpread) {
    return { applied: false, spread };
  }

  const tileW = width / cols;
  const tileH = height / rows;

  for (let y = 0; y < height; y++) {
    const gy = y / tileH - 0.5;
    const r0 = Math.max(0, Math.min(rows - 1, Math.floor(gy)));
    const r1 = Math.max(0, Math.min(rows - 1, r0 + 1));
    const fy = Math.max(0, Math.min(1, gy - r0));
    const rowOff = y * width;

    for (let x = 0; x < width; x++) {
      const gx = x / tileW - 0.5;
      const c0 = Math.max(0, Math.min(cols - 1, Math.floor(gx)));
      const c1 = Math.max(0, Math.min(cols - 1, c0 + 1));
      const fx = Math.max(0, Math.min(1, gx - c0));

      const b00 = smoothed[r0 * cols + c0];
      const b10 = smoothed[r0 * cols + c1];
      const b01 = smoothed[r1 * cols + c0];
      const b11 = smoothed[r1 * cols + c1];

      const top = b00 + (b10 - b00) * fx;
      const bot = b01 + (b11 - b01) * fx;
      const localBg = Math.max(48, top + (bot - top) * fy);

      const idx = rowOff + x;
      const flattened = Math.min(255, Math.round((gray[idx] * 244) / localBg));
      gray[idx] = flattened;
    }
  }

  return { applied: true, spread };
}

/**
 * Locates dense monospace MRZ rows inside the lower half of a rectified upright document.
 * Requires strong dark ink contrast (>= 52) and falls back to strong-ink refinement when
 * dense colored guilloche waves or security patterns bridge VIZ and MRZ rows into a tall cluster.
 */
export function detectDynamicMrzBand(
  gray: Uint8ClampedArray,
  width: number,
  height: number
): DynamicMrzBandResult {
  const fallback: DynamicMrzBandResult = {
    detected: false,
    broadTop: 0.6,
    broadBottom: 0.982,
    tightTop: 0.7,
    tightBottom: 0.982,
  };

  if (width < 120 || height < 80 || gray.length < width * height) {
    return fallback;
  }

  const yStart = Math.floor(height * 0.48);
  const yEnd = Math.min(height - 2, Math.floor(height * 0.99));
  const xStart = Math.floor(width * 0.02);
  const xEnd = Math.ceil(width * 0.98);
  const stepX = Math.max(1, Math.floor((xEnd - xStart) / 480));

  interface CandidateRow {
    y: number;
    transitions: number;
    spanRatio: number;
    diff: number;
  }
  const candidateRows: CandidateRow[] = [];
  const rowSamples: number[] = [];

  for (let y = yStart; y <= yEnd; y++) {
    const rowOff = y * width;
    rowSamples.length = 0;
    for (let x = xStart; x < xEnd; x += stepX) {
      rowSamples.push(gray[rowOff + x]);
    }
    if (rowSamples.length < 24) continue;
    rowSamples.sort((a, b) => a - b);
    const rowBg = rowSamples[Math.floor(rowSamples.length * 0.88)];
    const rowLow = rowSamples[Math.floor(rowSamples.length * 0.02)];
    const diff = rowBg - rowLow;
    if (diff < 52) continue;

    const threshold = Math.max(42, rowBg - Math.max(36, diff * 0.46));
    let transitions = 0;
    let inkSamples = 0;
    let prevDark = false;
    let firstInkX = xEnd;
    let lastInkX = xStart;

    for (let x = xStart; x < xEnd; x += stepX) {
      const dark = gray[rowOff + x] < threshold;
      if (dark) {
        inkSamples++;
        if (x < firstInkX) firstInkX = x;
        if (x > lastInkX) lastInkX = x;
      }
      if (x > xStart && dark !== prevDark) {
        transitions++;
      }
      prevDark = dark;
    }

    const inkFrac = inkSamples / rowSamples.length;
    const spanRatio = (lastInkX - firstInkX) / width;

    if (transitions >= 34 && inkFrac >= 0.03 && inkFrac <= 0.46 && spanRatio >= 0.56) {
      candidateRows.push({ y, transitions, spanRatio, diff });
    }
  }

  if (candidateRows.length < 4) {
    return fallback;
  }

  const maxGap = Math.max(6, Math.round(height * 0.055));
  interface Cluster {
    top: number;
    bottom: number;
    count: number;
    transSum: number;
    spanSum: number;
  }

  const selectBestCluster = (rows: CandidateRow[]): Cluster | null => {
    if (rows.length < 4) return null;
    const clusters: Cluster[] = [];
    let cur: Cluster = {
      top: rows[0].y,
      bottom: rows[0].y,
      count: 1,
      transSum: rows[0].transitions,
      spanSum: rows[0].spanRatio,
    };

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.y - cur.bottom <= maxGap) {
        cur.bottom = row.y;
        cur.count++;
        cur.transSum += row.transitions;
        cur.spanSum += row.spanRatio;
      } else {
        clusters.push(cur);
        cur = {
          top: row.y,
          bottom: row.y,
          count: 1,
          transSum: row.transitions,
          spanSum: row.spanRatio,
        };
      }
    }
    clusters.push(cur);

    let best: Cluster | null = null;
    let bestScore = -1;
    const maxCountCap = Math.max(24, Math.round(height * 0.14));

    for (const c of clusters) {
      const spanNorm = (c.bottom - c.top + 1) / height;
      const topNorm = c.top / height;
      const bottomNorm = c.bottom / height;
      if (spanNorm < 0.04 || spanNorm > 0.44 || bottomNorm < 0.75 || c.count < 6) {
        continue;
      }

      const avgTrans = c.transSum / c.count;
      const avgSpan = c.spanSum / c.count;
      const effectiveRows = Math.min(c.count, maxCountCap);

      // Strongly prefer true bottom-edge MRZ clusters (bottomNorm >= 0.82, topNorm >= 0.58)
      // over taller mid-page VIZ + portrait bands that sit higher on the page.
      const zoneWeight =
        bottomNorm >= 0.82 && topNorm >= 0.58
          ? 3.2
          : bottomNorm >= 0.82
            ? 1.8
            : 0.75;
      const metricWeight =
        (0.6 + Math.min(1.4, avgTrans / 90)) * (avgSpan >= 0.74 ? 1.25 : 1.0);
      const score = effectiveRows * zoneWeight * metricWeight;

      if (score > bestScore) {
        bestScore = score;
        best = c;
      }
    }
    return best;
  };

  let best = selectBestCluster(candidateRows);

  const needsStrongInkRefinement =
    !best ||
    (best.bottom - best.top + 1) / height > 0.25 ||
    best.top / height < 0.58;

  if (needsStrongInkRefinement && candidateRows.length >= 10) {
    const diffs = candidateRows.map((r) => r.diff).sort((a, b) => a - b);
    const p90Diff = diffs[Math.floor(diffs.length * 0.9)] ?? 0;
    if (p90Diff >= 120) {
      const minDiff = Math.max(95, p90Diff * 0.62);
      const refined = selectBestCluster(
        candidateRows.filter((r) => r.diff >= minDiff && r.transitions >= 52)
      );
      if (refined) {
        const refinedSpan = (refined.bottom - refined.top + 1) / height;
        const refinedTop = refined.top / height;
        const refinedBottom = refined.bottom / height;
        if (
          !best ||
          (refinedSpan >= 0.05 &&
            refinedSpan <= 0.26 &&
            refinedBottom >= 0.82 &&
            refinedTop >= 0.58)
        ) {
          best = refined;
        }
      }
    }
  }

  if (!best) {
    return fallback;
  }

  const bandTop = best.top / height;
  const bandBottom = best.bottom / height;

  const tightTop = Math.max(0.54, Math.min(0.84, bandTop - 0.035));
  const tightBottom = Math.min(0.995, Math.max(tightTop + 0.1, bandBottom + 0.035));

  const broadTop = Math.max(0.48, Math.min(0.66, bandTop - 0.065));
  const broadBottom = Math.min(0.996, Math.max(0.982, bandBottom + 0.04));

  return {
    detected: true,
    broadTop,
    broadBottom,
    tightTop,
    tightBottom,
  };
}

function buildMrzLocatorGrayscale(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  applyFlatten: boolean
): Uint8ClampedArray {
  const rgba = ctx.getImageData(0, 0, width, height).data;
  const gray = new Uint8ClampedArray(width * height);
  for (let i = 0, p = 0; i < rgba.length; i += 4, p++) {
    gray[p] = computeChromaCompensatedLuma(rgba[i], rgba[i + 1], rgba[i + 2], 0.68);
  }
  if (applyFlatten) {
    flattenShadowIlluminationBuffer(gray, width, height, 28);
  }
  return gray;
}

function applyContrastGrayscale(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  writeBackPixels = true
): GrayscaleBuffer {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const gray = new Uint8ClampedArray(width * height);

  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    gray[p] = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
  }

  flattenShadowIlluminationBuffer(gray, width, height, 28);

  if (!writeBackPixels) {
    return { data: gray, width, height };
  }

  const histogram = new Uint32Array(256);
  const marginX = Math.floor(width * 0.02);
  const marginY = Math.floor(height * 0.02);
  let samplePixels = 0;

  for (let y = 0; y < height; y++) {
    const rowOff = y * width;
    for (let x = 0; x < width; x++) {
      const lum = gray[rowOff + x];
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
  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    const stretched = Math.max(0, Math.min(255, Math.round(((gray[p] - low) * 255) / range)));
    gray[p] = stretched;
    data[i] = stretched;
    data[i + 1] = stretched;
    data[i + 2] = stretched;
  }

  ctx.putImageData(imageData, 0, 0);
  return { data: gray, width, height };
}

/**
 * Applies chroma-compensated guilloche suppression, uneven-shadow flattening, and
 * row-wise 88th-percentile flat-field background normalization so tinted or patterned
 * security waves behind MRZ lines whiten cleanly without eroding dark OCR-B ink.
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

  if (!enhance) {
    for (let i = 0, p = 0; i < data.length; i += 4, p++) {
      gray[p] = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
    }
    return { data: gray, width, height };
  }

  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    gray[p] = computeChromaCompensatedLuma(data[i], data[i + 1], data[i + 2], 0.68);
  }

  flattenShadowIlluminationBuffer(gray, width, height, 36);

  const xStart = Math.max(borderPad, Math.floor(width * 0.02));
  const xEnd = Math.min(width - borderPad, Math.ceil(width * 0.98));
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

/**
 * Trims pure-white triangular margins introduced by arbitrary-angle deskew rotation
 * without cropping any actual document content.
 */
function trimWhiteRotationMargins(canvas: HTMLCanvasElement): HTMLCanvasElement {
  const w = canvas.width;
  const h = canvas.height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return canvas;

  const data = ctx.getImageData(0, 0, w, h).data;
  const isContentPixel = (idx: number) =>
    data[idx] < 248 || data[idx + 1] < 248 || data[idx + 2] < 248;

  const rowHasContent = (y: number) => {
    let hits = 0;
    const minHits = Math.max(3, Math.floor(w * 0.01));
    const step = Math.max(1, Math.floor(w / 160));
    const rowOff = y * w;
    for (let x = 0; x < w; x += step) {
      if (isContentPixel((rowOff + x) * 4)) {
        hits++;
        if (hits >= minHits) return true;
      }
    }
    return false;
  };

  const colHasContent = (x: number, yTop: number, yBot: number) => {
    let hits = 0;
    const minHits = Math.max(3, Math.floor((yBot - yTop) * 0.01));
    const step = Math.max(1, Math.floor((yBot - yTop) / 160));
    for (let y = yTop; y <= yBot; y += step) {
      if (isContentPixel((y * w + x) * 4)) {
        hits++;
        if (hits >= minHits) return true;
      }
    }
    return false;
  };

  let top = 0;
  while (top < h - 10 && !rowHasContent(top)) top++;
  let bottom = h - 1;
  while (bottom > top + 10 && !rowHasContent(bottom)) bottom--;

  let left = 0;
  while (left < w - 10 && !colHasContent(left, top, bottom)) left++;
  let right = w - 1;
  while (right > left + 10 && !colHasContent(right, top, bottom)) right--;

  const pad = 8;
  top = Math.max(0, top - pad);
  left = Math.max(0, left - pad);
  bottom = Math.min(h - 1, bottom + pad);
  right = Math.min(w - 1, right + pad);

  const cropW = right - left + 1;
  const cropH = bottom - top + 1;

  if (cropW < w * 0.35 || cropH < h * 0.35 || (cropW >= w - 16 && cropH >= h - 16)) {
    return canvas;
  }

  const trimmed = document.createElement('canvas');
  trimmed.width = cropW;
  trimmed.height = cropH;
  const tCtx = trimmed.getContext('2d', { willReadFrequently: true });
  if (!tCtx) return canvas;
  tCtx.drawImage(canvas, left, top, cropW, cropH, 0, 0, cropW, cropH);
  return trimmed;
}

async function buildMrzStrip(
  origCanvas: HTMLCanvasElement,
  targetW: number,
  targetH: number,
  topRatio: number,
  bottomRatio: number,
  enhance: boolean,
  encodeDataUrl: boolean
): Promise<{ dataUrl: string; blob?: Blob; grayscale: GrayscaleBuffer }> {
  const srcX = Math.round(targetW * 0.004);
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
  const blob = await canvasToBlob(mrzCanvas);
  const dataUrl = encodeDataUrl || !blob ? mrzCanvas.toDataURL('image/png') : '';
  return {
    dataUrl,
    blob,
    grayscale,
  };
}

/**
 * Prepares original, shadow-flattened contrast-enhanced full-document, and dynamically
 * localized dual MRZ-strip canvases directly inside the browser with support for coarse
 * 90-degree rotation and arbitrary-angle fine deskewing.
 */
export async function preprocessDocumentImage(
  input: ImageInput,
  options: PreprocessDocumentOptions = {}
): Promise<PreprocessedResult> {
  const {
    preprocess = true,
    rotation = 0,
    deskewDegrees = 0,
    includePreviews = true,
    skipFullPage = false,
    skipMrzStrips = false,
    needOriginal = true,
  } = options;

  const isCanvas =
    typeof HTMLCanvasElement !== 'undefined' && input instanceof HTMLCanvasElement;
  const isBitmap = typeof ImageBitmap !== 'undefined' && input instanceof ImageBitmap;
  const surface: ImageSurface = isCanvas || isBitmap ? input : await loadImageElement(input);

  const { width: srcW, height: srcH } = getSurfaceDimensions(surface);

  const totalDeg = rotation + deskewDegrees;
  const hasFineSkew = Math.abs(deskewDegrees) >= 0.1;

  let rotatedW: number;
  let rotatedH: number;
  if (!hasFineSkew) {
    const swapped = rotation === 90 || rotation === 270;
    rotatedW = swapped ? srcH : srcW;
    rotatedH = swapped ? srcW : srcH;
  } else {
    const rad = (totalDeg * Math.PI) / 180;
    const absCos = Math.abs(Math.cos(rad));
    const absSin = Math.abs(Math.sin(rad));
    rotatedW = Math.max(1, Math.round(srcW * absCos + srcH * absSin));
    rotatedH = Math.max(1, Math.round(srcW * absSin + srcH * absCos));
  }

  let scale = 1;
  if (rotatedW < 1600) {
    scale = Math.min(3.0, 1800 / Math.max(1, rotatedW));
  } else if (rotatedW > 2200) {
    scale = 2200 / rotatedW;
  }

  let origCanvas = document.createElement('canvas');
  origCanvas.width = Math.round(rotatedW * scale);
  origCanvas.height = Math.round(rotatedH * scale);
  const origCtx = origCanvas.getContext('2d', { willReadFrequently: true });
  if (!origCtx) throw new Error('2D canvas context unavailable');

  origCtx.fillStyle = '#ffffff';
  origCtx.fillRect(0, 0, origCanvas.width, origCanvas.height);
  origCtx.imageSmoothingEnabled = true;
  origCtx.imageSmoothingQuality = 'high';
  origCtx.save();
  origCtx.translate(origCanvas.width / 2, origCanvas.height / 2);
  origCtx.rotate((totalDeg * Math.PI) / 180);
  const drawW = Math.round(srcW * scale);
  const drawH = Math.round(srcH * scale);
  origCtx.drawImage(surface, -drawW / 2, -drawH / 2, drawW, drawH);
  origCtx.restore();

  if (hasFineSkew) {
    origCanvas = trimWhiteRotationMargins(origCanvas);
  }

  const activeOrigCtx = origCanvas.getContext('2d', { willReadFrequently: true });
  if (!activeOrigCtx) throw new Error('2D canvas context unavailable');

  const targetW = origCanvas.width;
  const targetH = origCanvas.height;

  let originalBlob: Blob | undefined;
  let originalDataUrl = '';
  if (needOriginal) {
    originalBlob = await canvasToBlob(origCanvas);
    if (includePreviews || !originalBlob) {
      originalDataUrl = origCanvas.toDataURL('image/png');
    }
  }

  let mrzBand: DynamicMrzBandResult = {
    detected: false,
    broadTop: 0.6,
    broadBottom: 0.982,
    tightTop: 0.7,
    tightBottom: 0.982,
  };
  let enhancedBlob: Blob | undefined;
  let enhancedDataUrl = '';

  if (skipFullPage) {
    if (!skipMrzStrips) {
      const locatorGray = buildMrzLocatorGrayscale(activeOrigCtx, targetW, targetH, preprocess);
      mrzBand = detectDynamicMrzBand(locatorGray, targetW, targetH);
    }
  } else {
    const enhCanvas = document.createElement('canvas');
    enhCanvas.width = targetW;
    enhCanvas.height = targetH;
    const enhCtx = enhCanvas.getContext('2d', { willReadFrequently: true });
    if (!enhCtx) throw new Error('2D canvas context unavailable');
    enhCtx.drawImage(origCanvas, 0, 0);

    if (preprocess) {
      applyContrastGrayscale(enhCtx, targetW, targetH, true);
      if (!skipMrzStrips) {
        const locatorGray = buildMrzLocatorGrayscale(activeOrigCtx, targetW, targetH, true);
        mrzBand = detectDynamicMrzBand(locatorGray, targetW, targetH);
      }
      enhancedBlob = await canvasToBlob(enhCanvas);
      if (includePreviews || !enhancedBlob) {
        enhancedDataUrl = enhCanvas.toDataURL('image/png');
      }
    } else {
      if (!skipMrzStrips) {
        const locatorGray = buildMrzLocatorGrayscale(activeOrigCtx, targetW, targetH, false);
        mrzBand = detectDynamicMrzBand(locatorGray, targetW, targetH);
      }
      if (!needOriginal) {
        originalBlob = await canvasToBlob(origCanvas);
      }
      enhancedBlob = originalBlob;
      enhancedDataUrl =
        includePreviews || !enhancedBlob
          ? originalDataUrl || enhCanvas.toDataURL('image/png')
          : '';
    }
  }

  const emptyGray: GrayscaleBuffer = {
    data: new Uint8ClampedArray(0),
    width: 0,
    height: 0,
  };

  if (skipMrzStrips) {
    return {
      originalDataUrl,
      enhancedDataUrl,
      mrzCropDataUrl: '',
      mrzGrayscale: emptyGray,
      mrzTightCropDataUrl: '',
      mrzTightGrayscale: emptyGray,
      width: targetW,
      height: targetH,
      originalBlob,
      enhancedBlob,
    };
  }

  const [broadStrip, tightStrip] = await Promise.all([
    buildMrzStrip(
      origCanvas,
      targetW,
      targetH,
      mrzBand.broadTop,
      mrzBand.broadBottom,
      preprocess,
      includePreviews
    ),
    buildMrzStrip(
      origCanvas,
      targetW,
      targetH,
      mrzBand.tightTop,
      mrzBand.tightBottom,
      preprocess,
      false
    ),
  ]);

  return {
    originalDataUrl,
    enhancedDataUrl,
    mrzCropDataUrl: broadStrip.dataUrl,
    mrzGrayscale: broadStrip.grayscale,
    mrzTightCropDataUrl: tightStrip.dataUrl,
    mrzTightGrayscale: tightStrip.grayscale,
    width: targetW,
    height: targetH,
    originalBlob,
    enhancedBlob,
    mrzCropBlob: broadStrip.blob,
    mrzTightCropBlob: tightStrip.blob,
  };
}
