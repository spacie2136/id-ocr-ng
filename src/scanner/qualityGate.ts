import { getSurfaceDimensions, loadImageElement } from './imagePreprocessor';
import { detectDocumentQuad } from './perspective';
import type {
  CameraAutoCaptureOptions,
  DocumentQuad,
  ImageInput,
  ImageQualityReport,
  ImageSurface,
  NormalizedRect,
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

function clampRect(rect: NormalizedRect): NormalizedRect {
  const x = Math.max(0, Math.min(0.95, rect.x));
  const y = Math.max(0, Math.min(0.95, rect.y));
  const width = Math.max(0.05, Math.min(1 - x, rect.width));
  const height = Math.max(0.05, Math.min(1 - y, rect.height));
  return { x, y, width, height };
}

/**
 * Computes the normalized [0..1] source rectangle actually visible inside a `<video>` element
 * rendered with `object-cover` CSS (e.g. a tall 9:16 portrait stream inside a 4:3/16:10 viewfinder).
 * Includes a small safety margin (`padRatio`) so card edges near the viewfinder border never clip.
 * Returns `null` when the stream aspect ratio already matches the displayed box cleanly.
 */
export function computeVisibleVideoCrop(
  video: HTMLVideoElement,
  padRatio = 0.03
): NormalizedRect | null {
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  const cw = video.clientWidth;
  const ch = video.clientHeight;
  if (!vw || !vh || !cw || !ch) return null;

  const videoAspect = vw / vh;
  const boxAspect = cw / ch;
  if (Math.abs(videoAspect - boxAspect) / Math.max(videoAspect, boxAspect) < 0.04) {
    return null;
  }

  let visW = 1;
  let visH = 1;
  if (videoAspect < boxAspect) {
    // Portrait stream inside wider box -> object-cover crops top & bottom background
    visH = Math.min(1, (videoAspect / boxAspect) * (1 + padRatio * 2));
  } else {
    // Ultra-wide stream inside narrower box -> object-cover crops left & right margins
    visW = Math.min(1, (boxAspect / videoAspect) * (1 + padRatio * 2));
  }

  return clampRect({
    x: (1 - visW) * 0.5,
    y: (1 - visH) * 0.5,
    width: visW,
    height: visH,
  });
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
    return 'Image looks blurry — hold steady or move slightly back to focus';
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
    minSharpness = 26,
    maxGlareRatio = 0.045,
    minBrightness = 45,
    maxBrightness = 244,
    requireDocument = true,
    maxMotionDelta = 7.5,
  } = options;

  const srcW = Math.max(1, canvas.width);
  const srcH = Math.max(1, canvas.height);

  // Downscale to ~480px max dim so phone camera text edges stay crisp during sharpness scoring
  const maxDim = 480;
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

  // Score sharpness from the top quartile of high-detail tiles (text/MRZ/barcode tiles)
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
    Math.min(100, Math.round(((topDetail - 2) / 28) * 100))
  );
  const isSharp = sharpnessScore >= minSharpness;

  const rawClippedRatio = clippedWhiteCount / Math.max(1, roiPixels);
  const glareRatio =
    p60 < 236
      ? Math.round(rawClippedRatio * 1000) / 1000
      : Math.round(Math.max(0, rawClippedRatio - 0.55) * 1000) / 1000;
  const hasGlare = p60 < 236 && rawClippedRatio > maxGlareRatio && rawClippedRatio < 0.78;

  let exposureStatus: ImageQualityReport['exposureStatus'] = 'ok';
  if (meanBrightness < minBrightness) {
    exposureStatus = 'too_dark';
  } else if (meanBrightness > maxBrightness && dynamicRange < 70) {
    exposureStatus = 'too_bright';
  }

  let detectedCorners: DocumentQuad | null = null;
  if (optionsInternal?.detectQuad !== false) {
    const quadResult = detectDocumentQuad(workCanvas);
    if (quadResult && quadResult.sourceQuadAreaRatio >= 0.1) {
      detectedCorners = quadResult.corners;
    }
  }

  const edgeDensity = highEdgeCount / Math.max(1, roiPixels);
  const documentDetected =
    detectedCorners !== null || (edgeDensity >= 0.011 && dynamicRange >= 32);

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
 * HTMLImageElement, HTMLCanvasElement, ImageBitmap, or HTMLVideoElement.
 */
export async function assessImageQuality(
  input: ImageInput | HTMLVideoElement,
  options: QualityGateOptions = {}
): Promise<ImageQualityReport> {
  if (typeof HTMLCanvasElement !== 'undefined' && input instanceof HTMLCanvasElement) {
    return assessCanvasQuality(input, null, options).report;
  }

  let canvas: HTMLCanvasElement;
  if (isVideoElement(input)) {
    const crop = computeVisibleVideoCrop(input);
    const vw = Math.max(1, input.videoWidth || input.clientWidth);
    const vh = Math.max(1, input.videoHeight || input.clientHeight);
    const sx = crop ? Math.round(crop.x * vw) : 0;
    const sy = crop ? Math.round(crop.y * vh) : 0;
    const sw = crop ? Math.max(1, Math.round(crop.width * vw)) : vw;
    const sh = crop ? Math.max(1, Math.round(crop.height * vh)) : vh;

    const scale = Math.min(1, 480 / Math.max(sw, sh));
    canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(sw * scale));
    canvas.height = Math.max(1, Math.round(sh * scale));
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('2D canvas context unavailable');
    ctx.drawImage(input, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  } else {
    const isBitmap = typeof ImageBitmap !== 'undefined' && input instanceof ImageBitmap;
    const surface: ImageSurface = isBitmap ? input : await loadImageElement(input);
    const { width: nw, height: nh } = getSurfaceDimensions(surface);
    const scale = Math.min(1, 480 / Math.max(nw, nh));
    canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(nw * scale));
    canvas.height = Math.max(1, Math.round(nh * scale));
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('2D canvas context unavailable');
    ctx.drawImage(surface, 0, 0, canvas.width, canvas.height);
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
      sampleIntervalMs: 170,
      requiredStableFrames: 2,
      minSharpness: 22,
      maxMotionDelta: 8.5,
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

  private resolveSourceCrop(vw: number, vh: number): {
    sx: number;
    sy: number;
    sw: number;
    sh: number;
  } {
    const rawRegion =
      typeof this.options.captureRegion === 'function'
        ? this.options.captureRegion()
        : this.options.captureRegion ?? null;

    if (!rawRegion) {
      return { sx: 0, sy: 0, sw: vw, sh: vh };
    }
    const rect = clampRect(rawRegion);
    const sx = Math.max(0, Math.round(rect.x * vw));
    const sy = Math.max(0, Math.round(rect.y * vh));
    const sw = Math.min(vw - sx, Math.max(16, Math.round(rect.width * vw)));
    const sh = Math.min(vh - sy, Math.max(16, Math.round(rect.height * vh)));
    return { sx, sy, sw, sh };
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
      const { sx, sy, sw, sh } = this.resolveSourceCrop(vw, vh);
      const scale = Math.min(1, 480 / Math.max(sw, sh));
      const aw = Math.max(32, Math.round(sw * scale));
      const ah = Math.max(32, Math.round(sh * scale));
      if (this.analysisCanvas.width !== aw || this.analysisCanvas.height !== ah) {
        this.analysisCanvas.width = aw;
        this.analysisCanvas.height = ah;
      }
      const aCtx = this.analysisCanvas.getContext('2d', { willReadFrequently: true });
      if (!aCtx) {
        this.scheduleNextTick(this.options.sampleIntervalMs);
        return;
      }
      aCtx.drawImage(this.video, sx, sy, sw, sh, 0, 0, aw, ah);

      const { report, signature } = assessCanvasQuality(
        this.analysisCanvas,
        this.previousSignature,
        this.options
      );
      this.previousSignature = signature;
      this.latestReport = report;

      if (report.passed) {
        this.consecutivePassFrames++;
      } else if (report.issues.length === 1 && report.issues[0] === 'camera_moving') {
        // Gentle leaky hysteresis prevents minor mobile autofocus/hand tremor from erasing progress
        this.consecutivePassFrames = Math.max(0, this.consecutivePassFrames - 1);
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
      const { sx, sy, sw, sh } = this.resolveSourceCrop(vw, vh);
      const fullCanvas = document.createElement('canvas');
      fullCanvas.width = sw;
      fullCanvas.height = sh;
      const ctx = fullCanvas.getContext('2d');
      if (!ctx) {
        reject(new Error('2D canvas context unavailable'));
        return;
      }
      ctx.drawImage(this.video, sx, sy, sw, sh, 0, 0, sw, sh);
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
