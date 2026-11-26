import type {
  DocumentQuad,
  GrayscaleBuffer,
  PreprocessedResult,
} from './types';

export class ScanAbortedError extends Error {
  readonly name = 'AbortError';
  readonly code = 'SCAN_ABORTED';

  constructor(message = 'Document scan was cancelled') {
    super(message);
    Object.setPrototypeOf(this, ScanAbortedError.prototype);
  }
}

export function isScanAbortedError(err: unknown): err is ScanAbortedError {
  return (
    err instanceof ScanAbortedError ||
    (err instanceof Error && err.name === 'AbortError')
  );
}

export function throwIfScanAborted(signal?: AbortSignal): void {
  if (signal?.aborted) {
    throw new ScanAbortedError(
      typeof signal.reason === 'string' && signal.reason
        ? signal.reason
        : 'Document scan was cancelled'
    );
  }
}

export async function raceWithAbort<T>(
  promise: Promise<T>,
  signal?: AbortSignal,
  onAbort?: () => void
): Promise<T> {
  throwIfScanAborted(signal);
  if (!signal) {
    return promise;
  }

  return new Promise<T>((resolve, reject) => {
    let settled = false;

    const handleAbort = () => {
      if (settled) return;
      settled = true;
      try {
        onAbort?.();
      } catch {
        // Ignore cleanup errors on abort
      }
      reject(
        new ScanAbortedError(
          typeof signal.reason === 'string' && signal.reason
            ? signal.reason
            : 'Document scan was cancelled'
        )
      );
    };

    signal.addEventListener('abort', handleAbort, { once: true });

    promise.then(
      (val) => {
        if (settled) return;
        settled = true;
        signal.removeEventListener('abort', handleAbort);
        resolve(val);
      },
      (err) => {
        if (settled) return;
        settled = true;
        signal.removeEventListener('abort', handleAbort);
        reject(err);
      }
    );
  });
}

export function supportsWorkerPreprocessing(): boolean {
  return (
    typeof Worker !== 'undefined' &&
    typeof Blob !== 'undefined' &&
    typeof URL !== 'undefined' &&
    typeof URL.createObjectURL === 'function' &&
    typeof OffscreenCanvas !== 'undefined' &&
    typeof createImageBitmap === 'function'
  );
}

const PREPROCESS_WORKER_SOURCE = `
'use strict';

async function canvasToDataUrl(canvas) {
  if (typeof canvas.convertToBlob !== 'function') {
    throw new Error('OffscreenCanvas.convertToBlob is not supported');
  }
  const blob = await canvas.convertToBlob({ type: 'image/png' });
  if (typeof FileReaderSync !== 'undefined') {
    return new FileReaderSync().readAsDataURL(blob);
  }
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Failed to encode PNG blob in worker'));
    reader.readAsDataURL(blob);
  });
}

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function solveHomography(srcPts, dstPts) {
  const A = [];
  const b = [];
  for (let i = 0; i < 4; i++) {
    const u = dstPts[i].x;
    const v = dstPts[i].y;
    const x = srcPts[i].x;
    const y = srcPts[i].y;
    A.push([u, v, 1, 0, 0, 0, -x * u, -x * v]);
    b.push(x);
    A.push([0, 0, 0, u, v, 1, -y * u, -y * v]);
    b.push(y);
  }
  const n = 8;
  for (let col = 0; col < n; col++) {
    let pivotRow = col;
    let maxVal = Math.abs(A[col][col]);
    for (let row = col + 1; row < n; row++) {
      const val = Math.abs(A[row][col]);
      if (val > maxVal) {
        maxVal = val;
        pivotRow = row;
      }
    }
    if (pivotRow !== col) {
      const tmpRow = A[col]; A[col] = A[pivotRow]; A[pivotRow] = tmpRow;
      const tmpB = b[col]; b[col] = b[pivotRow]; b[pivotRow] = tmpB;
    }
    const pivot = A[col][col] || 1e-12;
    for (let row = col + 1; row < n; row++) {
      const factor = A[row][col] / pivot;
      if (factor === 0) continue;
      for (let k = col; k < n; k++) {
        A[row][k] -= factor * A[col][k];
      }
      b[row] -= factor * b[col];
    }
  }
  const h = new Float64Array(9);
  for (let row = n - 1; row >= 0; row--) {
    let sum = b[row];
    for (let k = row + 1; k < n; k++) {
      sum -= A[row][k] * h[k];
    }
    h[row] = sum / (A[row][row] || 1e-12);
  }
  h[8] = 1;
  return h;
}

function handleWarpPerspective(bitmap, corners) {
  const natW = Math.max(1, bitmap.width);
  const natH = Math.max(1, bitmap.height);
  const srcScale = Math.min(1, 2400 / Math.max(1, natW, natH));
  const sw = Math.max(1, Math.round(natW * srcScale));
  const sh = Math.max(1, Math.round(natH * srcScale));

  const srcCanvas = new OffscreenCanvas(sw, sh);
  const sCtx = srcCanvas.getContext('2d', { willReadFrequently: true });
  if (!sCtx) throw new Error('OffscreenCanvas 2D context unavailable');
  sCtx.drawImage(bitmap, 0, 0, sw, sh);
  const srcData = sCtx.getImageData(0, 0, sw, sh).data;

  const tl = { x: corners.topLeft.x * sw, y: corners.topLeft.y * sh };
  const tr = { x: corners.topRight.x * sw, y: corners.topRight.y * sh };
  const br = { x: corners.bottomRight.x * sw, y: corners.bottomRight.y * sh };
  const bl = { x: corners.bottomLeft.x * sw, y: corners.bottomLeft.y * sh };

  const widthTop = dist(tl, tr);
  const widthBot = dist(bl, br);
  const heightLeft = dist(tl, bl);
  const heightRight = dist(tr, br);

  const rawOutW = Math.max(64, Math.round(Math.max(widthTop, widthBot)));
  const rawOutH = Math.max(64, Math.round(Math.max(heightLeft, heightRight)));

  let outScale = 1;
  if (rawOutW < 1500) {
    outScale = Math.min(2.6, 1750 / rawOutW);
  } else if (rawOutW > 2100) {
    outScale = 2100 / rawOutW;
  }

  const outW = Math.max(64, Math.round(rawOutW * outScale));
  const outH = Math.max(64, Math.round(rawOutH * outScale));

  const H = solveHomography(
    [tl, tr, br, bl],
    [
      { x: 0, y: 0 },
      { x: outW - 1, y: 0 },
      { x: outW - 1, y: outH - 1 },
      { x: 0, y: outH - 1 },
    ]
  );

  const outCanvas = new OffscreenCanvas(outW, outH);
  const oCtx = outCanvas.getContext('2d', { willReadFrequently: true });
  if (!oCtx) throw new Error('OffscreenCanvas 2D context unavailable');

  const outImg = oCtx.createImageData(outW, outH);
  const dst = outImg.data;
  const h0 = H[0], h1 = H[1], h2 = H[2];
  const h3 = H[3], h4 = H[4], h5 = H[5];
  const h6 = H[6], h7 = H[7], h8 = H[8];
  const maxX = sw - 1;
  const maxY = sh - 1;

  for (let v = 0; v < outH; v++) {
    const rowBaseX = h1 * v + h2;
    const rowBaseY = h4 * v + h5;
    const rowBaseW = h7 * v + h8;
    let dstOff = v * outW * 4;

    for (let u = 0; u < outW; u++) {
      const denom = h6 * u + rowBaseW;
      const invW = denom !== 0 ? 1 / denom : 1;
      let sx = (h0 * u + rowBaseX) * invW;
      let sy = (h3 * u + rowBaseY) * invW;

      if (sx < 0) sx = 0;
      else if (sx > maxX) sx = maxX;
      if (sy < 0) sy = 0;
      else if (sy > maxY) sy = maxY;

      const x0 = sx | 0;
      const y0 = sy | 0;
      const x1 = x0 < maxX ? x0 + 1 : maxX;
      const y1 = y0 < maxY ? y0 + 1 : maxY;
      const fx = sx - x0;
      const fy = sy - y0;
      const w00 = (1 - fx) * (1 - fy);
      const w10 = fx * (1 - fy);
      const w01 = (1 - fx) * fy;
      const w11 = fx * fy;

      const i00 = (y0 * sw + x0) * 4;
      const i10 = (y0 * sw + x1) * 4;
      const i01 = (y1 * sw + x0) * 4;
      const i11 = (y1 * sw + x1) * 4;

      dst[dstOff] = srcData[i00] * w00 + srcData[i10] * w10 + srcData[i01] * w01 + srcData[i11] * w11;
      dst[dstOff + 1] = srcData[i00 + 1] * w00 + srcData[i10 + 1] * w10 + srcData[i01 + 1] * w01 + srcData[i11 + 1] * w11;
      dst[dstOff + 2] = srcData[i00 + 2] * w00 + srcData[i10 + 2] * w10 + srcData[i01 + 2] * w01 + srcData[i11 + 2] * w11;
      dst[dstOff + 3] = 255;
      dstOff += 4;
    }
  }

  oCtx.putImageData(outImg, 0, 0);
  const outBitmap = outCanvas.transferToImageBitmap();
  return outBitmap;
}

function handleSampleGrayscale(bitmap, maxDim) {
  const srcW = Math.max(1, bitmap.width);
  const srcH = Math.max(1, bitmap.height);
  const scale = Math.min(1, maxDim / Math.max(srcW, srcH));
  const width = Math.max(1, Math.round(srcW * scale));
  const height = Math.max(1, Math.round(srcH * scale));

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('OffscreenCanvas 2D context unavailable');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'medium';
  ctx.drawImage(bitmap, 0, 0, width, height);

  const rgba = ctx.getImageData(0, 0, width, height).data;
  const gray = new Uint8ClampedArray(width * height);
  for (let i = 0, p = 0; i < rgba.length; i += 4, p++) {
    gray[p] = Math.round(0.299 * rgba[i] + 0.587 * rgba[i + 1] + 0.114 * rgba[i + 2]);
  }
  return { gray, width, height };
}

function applyContrastGrayscale(ctx, width, height) {
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

function applyRowFlatFieldMrzNormalization(ctx, width, height, borderPad, enhance) {
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
  const allSamples = [];

  for (let y = yStart; y < yEnd; y++) {
    const rowOffset = y * width;
    const rowVals = [];
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
      if ((x & 3) === 0) allSamples.push(normalized);
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
    let out;
    if (v <= blackPoint) out = 0;
    else if (v >= whitePoint) out = 255;
    else out = Math.round(((v - blackPoint) / span) * 255);
    gray[p] = out;
    data[i] = out;
    data[i + 1] = out;
    data[i + 2] = out;
  }

  ctx.putImageData(imageData, 0, 0);
  return { data: gray, width, height };
}

function trimWhiteRotationMargins(canvas) {
  const w = canvas.width;
  const h = canvas.height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return canvas;

  const data = ctx.getImageData(0, 0, w, h).data;
  const isContentPixel = (idx) => data[idx] < 248 || data[idx + 1] < 248 || data[idx + 2] < 248;

  const rowHasContent = (y) => {
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

  const colHasContent = (x, yTop, yBot) => {
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

  const trimmed = new OffscreenCanvas(cropW, cropH);
  const tCtx = trimmed.getContext('2d', { willReadFrequently: true });
  if (!tCtx) return canvas;
  tCtx.drawImage(canvas, left, top, cropW, cropH, 0, 0, cropW, cropH);
  return trimmed;
}

async function buildMrzStrip(origCanvas, targetW, targetH, topRatio, bottomRatio, enhance) {
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

  const mrzCanvas = new OffscreenCanvas(outW, outH);
  const mrzCtx = mrzCanvas.getContext('2d', { willReadFrequently: true });
  if (!mrzCtx) throw new Error('OffscreenCanvas 2D context unavailable');

  mrzCtx.fillStyle = '#ffffff';
  mrzCtx.fillRect(0, 0, outW, outH);
  mrzCtx.imageSmoothingEnabled = true;
  mrzCtx.imageSmoothingQuality = 'high';
  mrzCtx.drawImage(origCanvas, srcX, srcY, srcW, srcH, borderPad, borderPad, innerW, innerH);

  const grayscale = applyRowFlatFieldMrzNormalization(mrzCtx, outW, outH, borderPad, enhance);
  const dataUrl = await canvasToDataUrl(mrzCanvas);
  return { dataUrl, grayscale };
}

async function handlePreprocessDocument(bitmap, opts) {
  const preprocess = opts.preprocess !== false;
  const rotation = opts.rotation || 0;
  const deskewDegrees = opts.deskewDegrees || 0;
  const srcW = Math.max(1, bitmap.width);
  const srcH = Math.max(1, bitmap.height);

  const totalDeg = rotation + deskewDegrees;
  const hasFineSkew = Math.abs(deskewDegrees) >= 0.1;

  let rotatedW;
  let rotatedH;
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

  let origCanvas = new OffscreenCanvas(Math.round(rotatedW * scale), Math.round(rotatedH * scale));
  const origCtx = origCanvas.getContext('2d', { willReadFrequently: true });
  if (!origCtx) throw new Error('OffscreenCanvas 2D context unavailable');

  origCtx.fillStyle = '#ffffff';
  origCtx.fillRect(0, 0, origCanvas.width, origCanvas.height);
  origCtx.imageSmoothingEnabled = true;
  origCtx.imageSmoothingQuality = 'high';
  origCtx.save();
  origCtx.translate(origCanvas.width / 2, origCanvas.height / 2);
  origCtx.rotate((totalDeg * Math.PI) / 180);
  const drawW = Math.round(srcW * scale);
  const drawH = Math.round(srcH * scale);
  origCtx.drawImage(bitmap, -drawW / 2, -drawH / 2, drawW, drawH);
  origCtx.restore();

  if (hasFineSkew) {
    origCanvas = trimWhiteRotationMargins(origCanvas);
  }

  const targetW = origCanvas.width;
  const targetH = origCanvas.height;
  const originalDataUrl = await canvasToDataUrl(origCanvas);

  const enhCanvas = new OffscreenCanvas(targetW, targetH);
  const enhCtx = enhCanvas.getContext('2d', { willReadFrequently: true });
  if (!enhCtx) throw new Error('OffscreenCanvas 2D context unavailable');
  enhCtx.drawImage(origCanvas, 0, 0);
  if (preprocess) {
    applyContrastGrayscale(enhCtx, targetW, targetH);
  }
  const enhancedDataUrl = await canvasToDataUrl(enhCanvas);

  const [broadStrip, tightStrip] = await Promise.all([
    buildMrzStrip(origCanvas, targetW, targetH, 0.60, 0.982, preprocess),
    buildMrzStrip(origCanvas, targetW, targetH, 0.70, 0.982, preprocess),
  ]);

  return {
    originalDataUrl,
    enhancedDataUrl,
    mrzCropDataUrl: broadStrip.dataUrl,
    mrzGrayscale: {
      buffer: broadStrip.grayscale.data.buffer,
      width: broadStrip.grayscale.width,
      height: broadStrip.grayscale.height,
    },
    mrzTightCropDataUrl: tightStrip.dataUrl,
    mrzTightGrayscale: {
      buffer: tightStrip.grayscale.data.buffer,
      width: tightStrip.grayscale.width,
      height: tightStrip.grayscale.height,
    },
    width: targetW,
    height: targetH,
  };
}

self.onmessage = async (event) => {
  const msg = event.data;
  const id = msg.id;
  try {
    if (msg.type === 'warp') {
      const outBitmap = handleWarpPerspective(msg.bitmap, msg.corners);
      try { msg.bitmap.close(); } catch {}
      self.postMessage({ id, ok: true, result: { bitmap: outBitmap } }, [outBitmap]);
      return;
    }

    if (msg.type === 'sampleGrayscale') {
      const res = handleSampleGrayscale(msg.bitmap, msg.maxDim || 400);
      try { msg.bitmap.close(); } catch {}
      const buf = res.gray.buffer;
      self.postMessage(
        { id, ok: true, result: { buffer: buf, width: res.width, height: res.height } },
        [buf]
      );
      return;
    }

    if (msg.type === 'preprocess') {
      const res = await handlePreprocessDocument(msg.bitmap, msg.options || {});
      try { msg.bitmap.close(); } catch {}
      self.postMessage(
        { id, ok: true, result: res },
        [res.mrzGrayscale.buffer, res.mrzTightGrayscale.buffer]
      );
      return;
    }

    throw new Error('Unknown preprocessing worker task type: ' + String(msg.type));
  } catch (err) {
    try { if (msg.bitmap && typeof msg.bitmap.close === 'function') msg.bitmap.close(); } catch {}
    self.postMessage({
      id,
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    });
  }
};
`;

interface PendingJob {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}

export class PreprocessWorkerClient {
  private worker: Worker | null = null;
  private workerUrl: string | null = null;
  private nextJobId = 1;
  private pending = new Map<number, PendingJob>();
  private permanentlyUnavailable = false;

  isAvailable(): boolean {
    return !this.permanentlyUnavailable && supportsWorkerPreprocessing();
  }

  private ensureWorker(): Worker | null {
    if (this.permanentlyUnavailable || !supportsWorkerPreprocessing()) {
      return null;
    }
    if (this.worker) {
      return this.worker;
    }
    try {
      const blob = new Blob([PREPROCESS_WORKER_SOURCE], { type: 'application/javascript' });
      const url = URL.createObjectURL(blob);
      const worker = new Worker(url);
      worker.onmessage = (event: MessageEvent<{ id: number; ok: boolean; result?: unknown; error?: string }>) => {
        const { id, ok, result, error } = event.data;
        const job = this.pending.get(id);
        if (!job) return;
        this.pending.delete(id);
        if (ok) {
          job.resolve(result);
        } else {
          job.reject(new Error(error || 'OffscreenCanvas preprocessing worker failed'));
        }
      };
      worker.onerror = () => {
        this.permanentlyUnavailable = true;
        const err = new Error('Preprocessing Web Worker failed to initialize');
        for (const job of this.pending.values()) {
          job.reject(err);
        }
        this.pending.clear();
        this.destroyWorkerInstance();
      };
      this.workerUrl = url;
      this.worker = worker;
      return worker;
    } catch {
      this.permanentlyUnavailable = true;
      this.destroyWorkerInstance();
      return null;
    }
  }

  private destroyWorkerInstance(): void {
    if (this.worker) {
      try {
        this.worker.terminate();
      } catch {
        // Ignore termination errors
      }
      this.worker = null;
    }
    if (this.workerUrl) {
      try {
        URL.revokeObjectURL(this.workerUrl);
      } catch {
        // Ignore URL cleanup errors
      }
      this.workerUrl = null;
    }
  }

  /**
   * Immediately stops the active preprocessing worker thread (e.g. when AbortSignal triggers)
   * without permanently disabling worker preprocessing for future scans.
   */
  abortActiveWorker(): void {
    for (const job of this.pending.values()) {
      job.reject(new ScanAbortedError());
    }
    this.pending.clear();
    this.destroyWorkerInstance();
  }

  private runJob<T>(
    payload: Record<string, unknown>,
    transferables: Transferable[],
    signal?: AbortSignal
  ): Promise<T> {
    throwIfScanAborted(signal);
    const worker = this.ensureWorker();
    if (!worker) {
      return Promise.reject(new Error('WORKER_UNAVAILABLE'));
    }

    const id = this.nextJobId++;
    const jobPromise = new Promise<T>((resolve, reject) => {
      this.pending.set(id, {
        resolve: resolve as (value: unknown) => void,
        reject,
      });
      try {
        worker.postMessage({ ...payload, id }, transferables);
      } catch (err) {
        this.pending.delete(id);
        reject(err);
      }
    });

    return raceWithAbort(jobPromise, signal, () => {
      this.abortActiveWorker();
    });
  }

  async warpPerspective(
    surface: HTMLImageElement | HTMLCanvasElement | ImageBitmap,
    corners: DocumentQuad,
    signal?: AbortSignal
  ): Promise<ImageBitmap | null> {
    if (!this.isAvailable()) return null;
    let clone: ImageBitmap | null = null;
    try {
      clone = await raceWithAbort(createImageBitmap(surface), signal);
      throwIfScanAborted(signal);
      const res = await this.runJob<{ bitmap: ImageBitmap }>(
        { type: 'warp', bitmap: clone, corners },
        [clone],
        signal
      );
      clone = null; // transferred
      return res.bitmap;
    } catch (err) {
      if (clone) {
        try { clone.close(); } catch {}
      }
      if (isScanAbortedError(err)) throw err;
      this.permanentlyUnavailable = true;
      this.destroyWorkerInstance();
      return null;
    }
  }

  async sampleDownscaledGrayscale(
    surface: HTMLImageElement | HTMLCanvasElement | ImageBitmap,
    maxDim = 400,
    signal?: AbortSignal
  ): Promise<GrayscaleBuffer | null> {
    if (!this.isAvailable()) return null;
    let clone: ImageBitmap | null = null;
    try {
      clone = await raceWithAbort(createImageBitmap(surface), signal);
      throwIfScanAborted(signal);
      const res = await this.runJob<{ buffer: ArrayBuffer; width: number; height: number }>(
        { type: 'sampleGrayscale', bitmap: clone, maxDim },
        [clone],
        signal
      );
      clone = null;
      return {
        data: new Uint8ClampedArray(res.buffer),
        width: res.width,
        height: res.height,
      };
    } catch (err) {
      if (clone) {
        try { clone.close(); } catch {}
      }
      if (isScanAbortedError(err)) throw err;
      this.permanentlyUnavailable = true;
      this.destroyWorkerInstance();
      return null;
    }
  }

  async preprocessDocument(
    surface: HTMLImageElement | HTMLCanvasElement | ImageBitmap,
    options: {
      preprocess?: boolean;
      rotation?: 0 | 90 | 180 | 270;
      deskewDegrees?: number;
    },
    signal?: AbortSignal
  ): Promise<PreprocessedResult | null> {
    if (!this.isAvailable()) return null;
    let clone: ImageBitmap | null = null;
    try {
      clone = await raceWithAbort(createImageBitmap(surface), signal);
      throwIfScanAborted(signal);
      const raw = await this.runJob<{
        originalDataUrl: string;
        enhancedDataUrl: string;
        mrzCropDataUrl: string;
        mrzGrayscale: { buffer: ArrayBuffer; width: number; height: number };
        mrzTightCropDataUrl: string;
        mrzTightGrayscale: { buffer: ArrayBuffer; width: number; height: number };
        width: number;
        height: number;
      }>(
        { type: 'preprocess', bitmap: clone, options },
        [clone],
        signal
      );
      clone = null;
      return {
        originalDataUrl: raw.originalDataUrl,
        enhancedDataUrl: raw.enhancedDataUrl,
        mrzCropDataUrl: raw.mrzCropDataUrl,
        mrzGrayscale: {
          data: new Uint8ClampedArray(raw.mrzGrayscale.buffer),
          width: raw.mrzGrayscale.width,
          height: raw.mrzGrayscale.height,
        },
        mrzTightCropDataUrl: raw.mrzTightCropDataUrl,
        mrzTightGrayscale: {
          data: new Uint8ClampedArray(raw.mrzTightGrayscale.buffer),
          width: raw.mrzTightGrayscale.width,
          height: raw.mrzTightGrayscale.height,
        },
        width: raw.width,
        height: raw.height,
      };
    } catch (err) {
      if (clone) {
        try { clone.close(); } catch {}
      }
      if (isScanAbortedError(err)) throw err;
      this.permanentlyUnavailable = true;
      this.destroyWorkerInstance();
      return null;
    }
  }

  terminate(): void {
    for (const job of this.pending.values()) {
      job.reject(new ScanAbortedError('Preprocessing worker terminated'));
    }
    this.pending.clear();
    this.destroyWorkerInstance();
  }
}
