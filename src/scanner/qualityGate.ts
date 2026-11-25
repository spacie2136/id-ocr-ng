import { loadImageElement } from './imagePreprocessor';
import { detectDocumentQuad } from './perspective';
import type {
  CameraAutoCaptureOptions,
  DocumentQuad,
  ImageInput,
  ImageQualityReport,
  QualityGateOptions,
  QualityIssueCode,
} from './types';

export class QualityGateError extends Error {
  readonly report: ImageQualityReport;

  constructor(report: ImageQualityReport) {
    super(`Image quality gate failed: ${report.guidance}`);
    this.name = 'QualityGateError';
    this.report = report;
  }
}

const SIG_W = 32;
const SIG_H = 24;

function isVideoElement(input: ImageInput | HTMLVideoElement): input is HTMLVideoElement {
  return typeof HTMLVideoElement !== 'undefined' && input instanceof HTMLVideoElement;
}

function computeFrameSignature(
  gray: Uint8ClampedArray,
  w: number,
  h: number
): Uint8Array {
  const sig = new Uint8Array(SIG_W * SIG_H);
  const xStart = Math.floor(w * 0.1);
  const yStart = Math.floor(h * 0.12);
  const roiW = Math.max(1, Math.floor(w * 0.8));
  const roiH = Math.max(1, Math.floor(h * 0.76));

  for (let sy = 0; sy < SIG_H; sy++) {
    const srcY = Math.min(h - 1, yStart + Math.floor(((sy + 0.5) / SIG_H) * roiH));
    for (let sx = 0; sx < SIG_W; sx++) {
      const srcX = Math.min(w - 1, xStart + Math.floor(((sx + 0.5) / SIG_W) * roiW));
      sig[sy * SIG_W + sx] = gray[srcY * w + srcX];
    }
  }
  return sig;
}

function buildGuidance(issues: QualityIssueCode[], documentDetected: boolean): string {
  if (issues.length === 0) {
    return documentDetected
      ? 'Crisp, glare-free frame ready'
      : 'Image quality acceptable';
  }
  if (issues.includes('no_document')) {
    return 'Position passport or ID card inside the frame';
  }
  if (issues.includes('too_dark')) {
    return 'Too dark — move to brighter, even lighting';
  }
  if (issues.includes('too_bright')) {
    return 'Overexposed — reduce direct light on document';
  }
  if (issues.includes('glare_detected')) {
    return 'Glare hotspot detected — tilt card or avoid direct reflections';
  }
  if (issues.includes('camera_moving')) {
    return 'Hold steady — stabilizing frame…';
  }
  if (issues.includes('too_blurry')) {
    return 'Image looks blurry — hold steady or adjust distance to focus';
  }
  return 'Adjust framing and lighting';
}

/**
 * Evaluates sharpness/focus, specular glare hotspots, brightness/exposure,
 * document framing presence, and optional frame-to-frame motion steadiness
 * directly from a canvas surface.
 */
export function assessCanvasQuality(
  canvas: HTMLCanvasElement,
  previousSignature?: Uint8Array | null,
  options: QualityGateOptions = {},
  optionsInternal?: { detectQuad?: boolean }
): { report: ImageQualityReport; signature: Uint8Array } {
  const {
    minSharpness = 34,
    maxGlareRatio = 0.045,
    minBrightness = 48,
    maxBrightness = 242,
    requireDocument = true,
    maxMotionDelta = 5.5,
  } = options;

  const srcW = Math.max(1, canvas.width);
  const srcH = Math.max(1, canvas.height);

  // Downscale cleanly to ~360px max dim so Laplacian/glare/motion run in ~3-6ms per frame
  const maxDim = 360;
  const scale = Math.min(1, maxDim / Math.max(srcW, srcH));
  const w = Math.max(32, Math.round(srcW * scale));
  const h = Math.max(32, Math.round(srcH * scale));

  const workCanvas =
    scale === 1
      ? canvas
      : (() => {
          const c = document.createElement('canvas');
          c.width = w;
          c.height = h;
          const ctx = c.getContext('2d', { willReadFrequently: true });
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'medium';
            ctx.drawImage(canvas, 0, 0, w, h);
          }
          return c;
        })();

  const ctx = workCanvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    throw new Error('2D canvas context unavailable for quality assessment');
  }

  const rgba = ctx.getImageData(0, 0, w, h).data;
  const nPix = w * h;
  const gray = new Uint8ClampedArray(nPix);

  for (let i = 0, p = 0; i < rgba.length; i += 4, p++) {
    gray[p] = Math.round(0.299 * rgba[i] + 0.587 * rgba[i + 1] + 0.114 * rgba[i + 2]);
  }

  const signature = computeFrameSignature(gray, w, h);

  // Analyze central document ROI [10%..90% X, 12%..88% Y]
  const x0 = Math.max(1, Math.floor(w * 0.1));
  const x1 = Math.min(w - 2, Math.ceil(w * 0.9));
  const y0 = Math.max(1, Math.floor(h * 0.12));
  const y1 = Math.min(h - 2, Math.ceil(h * 0.88));

  const roiW = Math.max(8, x1 - x0);
  const roiH = Math.max(8, y1 - y0);
  const roiPixels = roiW * roiH;

  const histogram = new Uint32Array(256);
  let lumSum = 0;
  let highEdgeCount = 0;
  let clippedWhiteCount = 0;

  // Tile-based sharpness grid (8 x 6) so smooth blank borders don't mask sharp text regions
  const gridCols = 8;
  const gridRows = 6;
  const tileCount = gridCols * gridRows;
  const tileLapSum = new Float64Array(tileCount);
  const tileLapSqSum = new Float64Array(tileCount);
  const tileEdgeSum = new Float64Array(tileCount);
  const tileCounts = new Uint32Array(tileCount);

  for (let y = y0; y < y1; y++) {
    const ty = Math.min(gridRows - 1, Math.floor(((y - y0) / roiH) * gridRows));
    const rowOff = y * w;
    for (let x = x0; x < x1; x++) {
      const idx = rowOff + x;
      const lum = gray[idx];
      lumSum += lum;
      histogram[lum]++;

      const pOff = idx * 4;
      const r = rgba[pOff];
      const g = rgba[pOff + 1];
      const b = rgba[pOff + 2];
      const minRgb = Math.min(r, g, b);
      const maxRgb = Math.max(r, g, b);
      if (minRgb >= 248 && maxRgb - minRgb <= 10) {
        clippedWhiteCount++;
      }

      // Discrete 3x3 Laplacian & gradient energy
      const lap =
        Math.abs(4 * lum - gray[idx - 1] - gray[idx + 1] - gray[idx - w] - gray[idx + w]);
      const gx = Math.abs(gray[idx + 1] - gray[idx - 1]);
      const gy = Math.abs(gray[idx + w] - gray[idx - w]);
      const grad = (gx + gy) * 0.5;
      if (grad >= 16) highEdgeCount++;

      const tx = Math.min(gridCols - 1, Math.floor(((x - x0) / roiW) * gridCols));
      const tIdx = ty * gridCols + tx;
      tileLapSum[tIdx] += lap;
      tileLapSqSum[tIdx] += lap * lap;
      tileEdgeSum[tIdx] += grad;
      tileCounts[tIdx]++;
    }
  }

  const meanBrightness = Math.round(lumSum / Math.max(1, roiPixels));

  // Compute percentiles from histogram for exposure & glare background checks
  let p10 = 0;
  let p60 = 128;
  let p95 = 255;
  let cum = 0;
  let set10 = false;
  let set60 = false;
  for (let v = 0; v < 256; v++) {
    cum += histogram[v];
    if (!set10 && cum >= roiPixels * 0.1) {
      p10 = v;
      set10 = true;
    }
    if (!set60 && cum >= roiPixels * 0.6) {
      p60 = v;
      set60 = true;
    }
    if (cum >= roiPixels * 0.95) {
      p95 = v;
      break;
    }
  }
  const dynamicRange = p95 - p10;

  // Score sharpness from the top quartile of high-detail tiles (text/MRZ tiles)
  const tileScores: number[] = [];
  for (let t = 0; t < tileCount; t++) {
    const cnt = tileCounts[t];
    if (cnt < 8) continue;
    const meanLap = tileLapSum[t] / cnt;
    const varLap = Math.max(0, tileLapSqSum[t] / cnt - meanLap * meanLap);
    const meanGrad = tileEdgeSum[t] / cnt;
    const rawDetail = Math.sqrt(varLap) * 0.72 + meanGrad * 1.15;
    tileScores.push(rawDetail);
  }
  tileScores.sort((a, b) => b - a);
  const topN = Math.max(1, Math.ceil(tileScores.length * 0.25));
  let topDetailSum = 0;
  for (let i = 0; i < topN; i++) {
    topDetailSum += tileScores[i] ?? 0;
  }
  const topDetail = topDetailSum / topN;
  const sharpnessScore = Math.max(
    0,
    Math.min(100, Math.round(((topDetail - 2) / 30) * 100))
  );
  const isSharp = sharpnessScore >= minSharpness;

  // Glare hotspot check: distinguish bright glare reflections over a document
  // from pure-white digital/paper full-page backgrounds (where p60 >= 236).
  const rawClippedRatio = clippedWhiteCount / Math.max(1, roiPixels);
  const glareRatio =
    p60 < 236
      ? Math.round(rawClippedRatio * 1000) / 1000
      : Math.round(Math.max(0, rawClippedRatio - 0.55) * 1000) / 1000;
  const hasGlare = p60 < 236 && rawClippedRatio > maxGlareRatio && rawClippedRatio < 0.78;

  // Exposure check (allow clean white-paper documents when crisp dark ink keeps dynamicRange healthy)
  let exposureStatus: ImageQualityReport['exposureStatus'] = 'ok';
  if (meanBrightness < minBrightness) {
    exposureStatus = 'too_dark';
  } else if (meanBrightness > maxBrightness && dynamicRange < 70) {
    exposureStatus = 'too_bright';
  }

  // Quad & structured document detection
  let detectedCorners: DocumentQuad | null = null;
  if (optionsInternal?.detectQuad !== false) {
    const quadResult = detectDocumentQuad(workCanvas);
    if (quadResult && quadResult.sourceQuadAreaRatio >= 0.2) {
      detectedCorners = quadResult.corners;
    }
  }

  const edgeDensity = highEdgeCount / Math.max(1, roiPixels);
  const documentDetected =
    detectedCorners !== null || (edgeDensity >= 0.015 && dynamicRange >= 40);

  // Frame-to-frame motion steadiness
  let motionDelta = 0;
  let isStable = true;
  let stabilityScore = 100;
  if (previousSignature && previousSignature.length === signature.length) {
    let diffSum = 0;
    for (let i = 0; i < signature.length; i++) {
      diffSum += Math.abs(signature[i] - previousSignature[i]);
    }
    motionDelta = Math.round((diffSum / signature.length) * 10) / 10;
    isStable = motionDelta <= maxMotionDelta;
    stabilityScore = Math.max(
      0,
      Math.min(100, Math.round(100 - (motionDelta / (maxMotionDelta * 2.5)) * 100))
    );
  }

  const issues: QualityIssueCode[] = [];
  if (requireDocument && !documentDetected) {
    issues.push('no_document');
  }
  if (exposureStatus === 'too_dark') {
    issues.push('too_dark');
  } else if (exposureStatus === 'too_bright') {
    issues.push('too_bright');
  }
  if (hasGlare) {
    issues.push('glare_detected');
  }
  if (!isSharp) {
    issues.push('too_blurry');
  }
  if (!isStable) {
    issues.push('camera_moving');
  }

  const glareScore = Math.max(0, Math.min(100, Math.round((1 - glareRatio * 6) * 100)));
  const exposureScore =
    exposureStatus === 'ok'
      ? Math.max(40, Math.min(100, Math.round(100 - Math.abs(meanBrightness - 148) * 0.4)))
      : 20;

  const overallScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        sharpnessScore * 0.48 +
          glareScore * 0.22 +
          exposureScore * 0.15 +
          stabilityScore * 0.15
      )
    )
  );

  const passed = issues.length === 0;
  const guidance = buildGuidance(issues, documentDetected);

  return {
    report: {
      passed,
      overallScore,
      sharpnessScore,
      isSharp,
      glareRatio,
      hasGlare,
      meanBrightness,
      exposureStatus,
      documentDetected,
      detectedCorners,
      stabilityScore,
      isStable,
      motionDelta,
      issues,
      guidance,
    },
    signature,
  };
}

/**
 * Runs the client-side Image Quality Gate (sharpness/focus, specular glare,
 * exposure, and document framing detection) on any image File, Blob, Data URL,
 * HTMLImageElement, HTMLCanvasElement, or HTMLVideoElement.
 */
export async function assessImageQuality(
  input: ImageInput | HTMLVideoElement,
  options: QualityGateOptions = {}
): Promise<ImageQualityReport> {
  if (input instanceof HTMLCanvasElement) {
    return assessCanvasQuality(input, null, options).report;
  }

  let canvas: HTMLCanvasElement;
  if (isVideoElement(input)) {
    const vw = Math.max(1, input.videoWidth || input.clientWidth);
    const vh = Math.max(1, input.videoHeight || input.clientHeight);
    const scale = Math.min(1, 480 / Math.max(vw, vh));
    canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(vw * scale));
    canvas.height = Math.max(1, Math.round(vh * scale));
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('2D canvas context unavailable');
    ctx.drawImage(input, 0, 0, canvas.width, canvas.height);
  } else {
    const img = await loadImageElement(input);
    const nw = Math.max(1, img.naturalWidth || img.width);
    const nh = Math.max(1, img.naturalHeight || img.height);
    const scale = Math.min(1, 480 / Math.max(nw, nh));
    canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(nw * scale));
    canvas.height = Math.max(1, Math.round(nh * scale));
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('2D canvas context unavailable');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }

  return assessCanvasQuality(canvas, null, options).report;
}

/**
 * Watches a live `<video>` stream, evaluates sharpness, glare, exposure, framing,
 * and motion stability every `sampleIntervalMs`, emits telemetry via `onQualityUpdate`,
 * and automatically triggers a full-resolution capture (`onAutoCapture`) once
 * `requiredStableFrames` consecutive crisp & aligned frames pass the quality gate.
 */
export class CameraAutoCapture {
  private video: HTMLVideoElement;
  private options: Required<
    Pick<
      CameraAutoCaptureOptions,
      | 'sampleIntervalMs'
      | 'requiredStableFrames'
      | 'mimeType'
      | 'captureQuality'
      | 'stopOnCapture'
    >
  > &
    CameraAutoCaptureOptions;

  private timerId: number | null = null;
  private running = false;
  private capturing = false;
  private consecutivePassFrames = 0;
  private previousSignature: Uint8Array | null = null;
  private latestReport: ImageQualityReport | null = null;
  private analysisCanvas: HTMLCanvasElement;

  constructor(video: HTMLVideoElement, options: CameraAutoCaptureOptions = {}) {
    this.video = video;
    this.options = {
      sampleIntervalMs: 180,
      requiredStableFrames: 3,
      mimeType: 'image/png',
      captureQuality: 0.94,
      stopOnCapture: true,
      ...options,
    };
    this.analysisCanvas = document.createElement('canvas');
  }

  isRunning(): boolean {
    return this.running;
  }

  getLatestReport(): ImageQualityReport | null {
    return this.latestReport;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.capturing = false;
    this.consecutivePassFrames = 0;
    this.previousSignature = null;
    this.scheduleNextTick(80);
  }

  stop(): void {
    this.running = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.consecutivePassFrames = 0;
    this.previousSignature = null;
  }

  /** Updates quality gate or callback options on the fly without recreating the watcher. */
  updateOptions(next: Partial<CameraAutoCaptureOptions>): void {
    this.options = {
      ...this.options,
      ...next,
    };
  }

  private scheduleNextTick(delayMs: number): void {
    if (!this.running) return;
    this.timerId = window.setTimeout(() => {
      void this.tick();
    }, delayMs);
  }

  private async tick(): Promise<void> {
    if (!this.running) return;
    if (this.capturing) {
      this.scheduleNextTick(this.options.sampleIntervalMs);
      return;
    }

    const vw = this.video.videoWidth;
    const vh = this.video.videoHeight;
    if (this.video.readyState < 2 || vw <= 0 || vh <= 0) {
      this.scheduleNextTick(this.options.sampleIntervalMs);
      return;
    }

    try {
      const scale = Math.min(1, 360 / Math.max(vw, vh));
      const aw = Math.max(32, Math.round(vw * scale));
      const ah = Math.max(32, Math.round(vh * scale));
      if (this.analysisCanvas.width !== aw || this.analysisCanvas.height !== ah) {
        this.analysisCanvas.width = aw;
        this.analysisCanvas.height = ah;
      }
      const aCtx = this.analysisCanvas.getContext('2d', { willReadFrequently: true });
      if (!aCtx) {
        this.scheduleNextTick(this.options.sampleIntervalMs);
        return;
      }
      aCtx.drawImage(this.video, 0, 0, aw, ah);

      const { report, signature } = assessCanvasQuality(
        this.analysisCanvas,
        this.previousSignature,
        this.options
      );
      this.previousSignature = signature;
      this.latestReport = report;

      if (report.passed) {
        this.consecutivePassFrames++;
      } else {
        this.consecutivePassFrames = 0;
      }

      const required = Math.max(1, this.options.requiredStableFrames);
      const stabilityProgress = Math.min(1, this.consecutivePassFrames / required);
      this.options.onQualityUpdate?.(report, stabilityProgress);

      if (this.consecutivePassFrames >= required) {
        this.capturing = true;
        this.consecutivePassFrames = 0;
        const file = await this.captureFullFrame();
        if (this.options.stopOnCapture) {
          this.stop();
        }
        this.options.onAutoCapture?.(file, report);
        this.capturing = false;
        if (!this.running) return;
      }
    } catch (err) {
      this.capturing = false;
      this.options.onError?.(
        err instanceof Error ? err : new Error('Camera auto-capture frame check failed')
      );
    }

    if (this.running) {
      this.scheduleNextTick(this.options.sampleIntervalMs);
    }
  }

  private captureFullFrame(): Promise<File> {
    return new Promise((resolve, reject) => {
      const vw = this.video.videoWidth;
      const vh = this.video.videoHeight;
      if (!vw || !vh) {
        reject(new Error('Camera stream has no active video frame'));
        return;
      }
      const fullCanvas = document.createElement('canvas');
      fullCanvas.width = vw;
      fullCanvas.height = vh;
      const ctx = fullCanvas.getContext('2d');
      if (!ctx) {
        reject(new Error('2D canvas context unavailable'));
        return;
      }
      ctx.drawImage(this.video, 0, 0, vw, vh);
      const mimeType = this.options.mimeType;
      const ext =
        mimeType === 'image/jpeg' ? 'jpg' : mimeType === 'image/webp' ? 'webp' : 'png';
      fullCanvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to encode captured camera frame'));
            return;
          }
          resolve(
            new File([blob], `auto-capture-${Date.now()}.${ext}`, {
              type: mimeType,
            })
          );
        },
        mimeType,
        this.options.captureQuality
      );
    });
  }
}

export function watchCameraAutoCapture(
  video: HTMLVideoElement,
  options: CameraAutoCaptureOptions = {}
): CameraAutoCapture {
  const controller = new CameraAutoCapture(video, options);
  controller.start();
  return controller;
}
