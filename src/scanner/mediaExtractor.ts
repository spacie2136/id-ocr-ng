import type {
  BarcodeParsedData,
  CroppedRegionInfo,
  DocumentType,
  ImageSurface,
  MrzParsedData,
  NormalizedRect,
  VizLineBox,
} from './types';

const WORK_WIDTH = 360;

const SIGNATURE_LABEL_RE =
  /\b(?:signature|holder['’`]?s?\s*sig(?:nature)?|unterschrift|firma(?:\s*del\s*titular)?|(?:vlastoru[cč]n[io]\s*)?p[ao]tp[il]{1,2}[sz]?|para[sš]as|podpis|assinatura|handtekening|allkiri|al[aá][ií]r[aá]s|semn[aă]tur[aă]|allekirjoitus|underskrift|paraksts)\b/i;

export interface ExtractMediaOptions {
  documentType?: DocumentType;
  mrz?: MrzParsedData | null;
  barcode?: BarcodeParsedData | null;
  vizLineBoxes?: VizLineBox[];
  extractPortrait?: boolean;
  extractSignature?: boolean;
  checkColoredWatermark?: boolean;
}

export interface ExtractedDocumentMedia {
  portrait: CroppedRegionInfo | null;
  signature: CroppedRegionInfo | null;
  watermarkProbeCanvas?: HTMLCanvasElement | null;
}

function getSurfaceDimensions(surface: ImageSurface): { width: number; height: number } {
  if (typeof HTMLImageElement !== 'undefined' && surface instanceof HTMLImageElement) {
    return {
      width: surface.naturalWidth || surface.width,
      height: surface.naturalHeight || surface.height,
    };
  }
  return { width: surface.width, height: surface.height };
}

function loadDataUrlAsCanvas(dataUrl: string): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas 2D context unavailable'));
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas);
    };
    img.onerror = () => reject(new Error('Failed to decode document image for media extraction'));
    img.src = dataUrl;
  });
}

function surfaceToCanvas(surface: ImageSurface): HTMLCanvasElement | null {
  if (typeof document === 'undefined') return null;
  if (typeof HTMLCanvasElement !== 'undefined' && surface instanceof HTMLCanvasElement) {
    return surface;
  }
  const { width, height } = getSurfaceDimensions(surface);
  if (!width || !height) return null;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.drawImage(surface, 0, 0, width, height);
  return canvas;
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function normalizeTextBoxes(
  vizLineBoxes: VizLineBox[],
  docWidth: number,
  docHeight: number,
  workW: number,
  workH: number
): Array<{ x0: number; y0: number; x1: number; y1: number; text: string }> {
  if (!vizLineBoxes.length || docWidth <= 0 || docHeight <= 0) return [];
  const sx = workW / docWidth;
  const sy = workH / docHeight;
  return vizLineBoxes
    .filter((b) => b.text.trim().length > 0 && b.bbox.x1 > b.bbox.x0 && b.bbox.y1 > b.bbox.y0)
    .map((b) => ({
      text: b.text,
      x0: Math.max(0, Math.floor(b.bbox.x0 * sx)),
      y0: Math.max(0, Math.floor(b.bbox.y0 * sy)),
      x1: Math.min(workW - 1, Math.ceil(b.bbox.x1 * sx)),
      y1: Math.min(workH - 1, Math.ceil(b.bbox.y1 * sy)),
    }));
}

function buildTextMask(
  boxes: Array<{ x0: number; y0: number; x1: number; y1: number; text: string }>,
  workW: number,
  workH: number
): Uint8Array {
  const mask = new Uint8Array(workW * workH);
  for (const b of boxes) {
    const bw = b.x1 - b.x0;
    const bh = b.y1 - b.y0;
    const cleaned = b.text.replace(/[^A-Za-z0-9\u00C0-\u024F]/g, '');
    // Skip 1-2 char OCR boxes so hallucinated portrait noise ("EA") or cursive strokes ("7", "s") aren't erased
    if (cleaned.length <= 2) continue;
    if (bw > workW * 0.45 && bh > workH * 0.25) continue;

    const padX = 2;
    const padY = 2;
    const rx0 = Math.max(0, b.x0 - padX);
    const ry0 = Math.max(0, b.y0 - padY);
    const rx1 = Math.min(workW - 1, b.x1 + padX);
    const ry1 = Math.min(workH - 1, b.y1 + padY);
    for (let y = ry0; y <= ry1; y++) {
      const row = y * workW;
      for (let x = rx0; x <= rx1; x++) {
        mask[row + x] = 1;
      }
    }
  }
  return mask;
}

function estimateMrzTopRatio(
  boxes: Array<{ x0: number; y0: number; x1: number; y1: number; text: string }>,
  workW: number,
  workH: number,
  mrz?: MrzParsedData | null
): number {
  let observedMrzTop: number | null = null;

  for (const b of boxes) {
    const norm = b.text.replace(/\s+/g, '').toUpperCase();
    const yRatio = b.y0 / workH;
    const wRatio = (b.x1 - b.x0) / workW;
    if (yRatio >= 0.52 && wRatio >= 0.42 && norm.length >= 20 && norm.includes('<')) {
      const candTop = Math.max(0.5, yRatio - 0.018);
      observedMrzTop = observedMrzTop === null ? candTop : Math.min(observedMrzTop, candTop);
    }
  }

  if (observedMrzTop !== null) {
    return observedMrzTop;
  }

  if (mrz) {
    return mrz.format === 'TD1' ? 0.62 : 0.74;
  }
  return 0.94;
}

function estimatePaperColor(
  rgba: Uint8ClampedArray,
  w: number,
  h: number
): { r: number; g: number; b: number; luma: number; chroma: number } {
  const rs: number[] = [];
  const gs: number[] = [];
  const bs: number[] = [];
  const chromas: number[] = [];
  const x0 = Math.floor(w * 0.06);
  const x1 = Math.ceil(w * 0.94);
  const y0 = Math.floor(h * 0.08);
  const y1 = Math.ceil(h * 0.88);

  for (let y = y0; y < y1; y += 3) {
    for (let x = x0; x < x1; x += 3) {
      const i = (y * w + x) * 4;
      const r = rgba[i];
      const g = rgba[i + 1];
      const b = rgba[i + 2];
      const luma = 0.299 * r + 0.587 * g + 0.114 * b;
      if (luma >= 165) {
        rs.push(r);
        gs.push(g);
        bs.push(b);
        chromas.push(Math.max(r, g, b) - Math.min(r, g, b));
      }
    }
  }

  if (rs.length < 20) {
    return { r: 242, g: 242, b: 242, luma: 242, chroma: 8 };
  }
  rs.sort((a, b) => a - b);
  gs.sort((a, b) => a - b);
  bs.sort((a, b) => a - b);
  chromas.sort((a, b) => a - b);
  const mid = Math.floor(rs.length * 0.65);
  const r = rs[mid];
  const g = gs[mid];
  const b = bs[mid];
  return {
    r,
    g,
    b,
    luma: 0.299 * r + 0.587 * g + 0.114 * b,
    chroma: chromas[mid],
  };
}

function estimateZonePaperColor(
  rgba: Uint8ClampedArray,
  w: number,
  textMask: Uint8Array,
  zx0: number,
  zy0: number,
  zw: number,
  zh: number,
  fallback: { r: number; g: number; b: number; luma: number; chroma: number }
): { r: number; g: number; b: number; luma: number; chroma: number } {
  const rs: number[] = [];
  const gs: number[] = [];
  const bs: number[] = [];
  const chromas: number[] = [];

  for (let ly = 0; ly < zh; ly += 2) {
    const gy = zy0 + ly;
    for (let lx = 0; lx < zw; lx += 2) {
      const gIdx = gy * w + (zx0 + lx);
      if (textMask[gIdx]) continue;
      const i = gIdx * 4;
      const r = rgba[i];
      const g = rgba[i + 1];
      const b = rgba[i + 2];
      const luma = 0.299 * r + 0.587 * g + 0.114 * b;
      if (luma >= 135) {
        rs.push(r);
        gs.push(g);
        bs.push(b);
        chromas.push(Math.max(r, g, b) - Math.min(r, g, b));
      }
    }
  }

  if (rs.length < 30) {
    return fallback;
  }

  rs.sort((a, b) => a - b);
  gs.sort((a, b) => a - b);
  bs.sort((a, b) => a - b);
  chromas.sort((a, b) => a - b);

  // 72nd percentile inside the zone represents the local security-tinted background paper
  const idx = Math.floor(rs.length * 0.72);
  const r = rs[idx];
  const g = gs[idx];
  const b = bs[idx];
  return {
    r,
    g,
    b,
    luma: 0.299 * r + 0.587 * g + 0.114 * b,
    chroma: chromas[idx],
  };
}

interface PortraitCandidate {
  bbox: NormalizedRect;
  score: number;
  method: 'pixel_contour';
}

function scorePortraitComponents(
  rgba: Uint8ClampedArray,
  w: number,
  h: number,
  textMask: Uint8Array,
  zoneBg: { r: number; g: number; b: number; luma: number; chroma: number },
  core: Uint8Array,
  soft: Uint8Array,
  binaryMask: Uint8Array,
  zx0: number,
  zy0: number,
  zx1: number,
  zy1: number,
  zw: number,
  zh: number,
  sidePriorityBonus: number
): PortraitCandidate | null {
  const visited = new Uint8Array(zw * zh);
  const queue = new Int32Array(zw * zh);
  let bestCandidate: PortraitCandidate | null = null;

  for (let startY = 0; startY < zh; startY++) {
    for (let startX = 0; startX < zw; startX++) {
      const startIdx = startY * zw + startX;
      if (!binaryMask[startIdx] || visited[startIdx]) continue;

      let head = 0;
      let tail = 0;
      queue[tail++] = startIdx;
      visited[startIdx] = 1;

      let minX = startX;
      let maxX = startX;
      let minY = startY;
      let maxY = startY;
      let corePixels = 0;

      while (head < tail) {
        const idx = queue[head++];
        const cx = idx % zw;
        const cy = (idx - cx) / zw;
        if (core[idx]) corePixels++;
        if (cx < minX) minX = cx;
        if (cx > maxX) maxX = cx;
        if (cy < minY) minY = cy;
        if (cy > maxY) maxY = cy;

        const neighbors = [
          cx > 0 ? idx - 1 : -1,
          cx + 1 < zw ? idx + 1 : -1,
          cy > 0 ? idx - zw : -1,
          cy + 1 < zh ? idx + zw : -1,
        ];
        for (const nIdx of neighbors) {
          if (nIdx >= 0 && binaryMask[nIdx] && !visited[nIdx]) {
            visited[nIdx] = 1;
            queue[tail++] = nIdx;
          }
        }
      }

      let expX0 = minX;
      let expX1 = maxX;
      let expY0 = minY;
      let expY1 = maxY;
      for (let step = 0; step < 14; step++) {
        let grew = false;
        if (expX0 > 0) {
          let hits = 0;
          for (let y = expY0; y <= expY1; y++) {
            if (soft[y * zw + (expX0 - 1)]) hits++;
          }
          if (hits >= Math.max(4, (expY1 - expY0 + 1) * 0.48)) {
            expX0--;
            grew = true;
          }
        }
        if (expX1 + 1 < zw) {
          let hits = 0;
          for (let y = expY0; y <= expY1; y++) {
            if (soft[y * zw + (expX1 + 1)]) hits++;
          }
          if (hits >= Math.max(4, (expY1 - expY0 + 1) * 0.48)) {
            expX1++;
            grew = true;
          }
        }
        if (expY0 > 0) {
          let hits = 0;
          for (let x = expX0; x <= expX1; x++) {
            if (soft[(expY0 - 1) * zw + x]) hits++;
          }
          if (hits >= Math.max(4, (expX1 - expX0 + 1) * 0.48)) {
            expY0--;
            grew = true;
          }
        }
        if (expY1 + 1 < zh) {
          let hits = 0;
          for (let x = expX0; x <= expX1; x++) {
            if (soft[(expY1 + 1) * zw + x]) hits++;
          }
          if (hits >= Math.max(4, (expX1 - expX0 + 1) * 0.48)) {
            expY1++;
            grew = true;
          }
        }
        if (!grew) break;
      }

      const bw = expX1 - expX0 + 1;
      const bh = expY1 - expY0 + 1;
      const widthRatio = bw / w;
      const heightRatio = bh / h;
      const aspect = bw / Math.max(1, bh);

      if (widthRatio < 0.095 || widthRatio > 0.345 || heightRatio < 0.16 || heightRatio > 0.58) {
        continue;
      }
      if (aspect < 0.48 || aspect > 1.2) continue;

      const boxArea = bw * bh;
      const areaRatio = boxArea / (w * h);
      if (areaRatio > 0.21) continue;
      if (bw >= zw * 0.92 && bh >= zh * 0.86) continue;

      const fillRatio = corePixels / Math.max(1, boxArea);
      if (fillRatio < 0.22) continue;

      let textCovered = 0;
      let sumLuma = 0;
      let sumSqLuma = 0;
      let highTransitionRows = 0;
      let sampledRows = 0;
      let skinPixels = 0;
      let neonPixels = 0;

      for (let ly = expY0; ly <= expY1; ly++) {
        const gy = zy0 + ly;
        let rowTransitions = 0;
        let prevDark = false;
        const sampleRow = (ly - expY0) % 2 === 0;
        if (sampleRow) sampledRows++;

        for (let lx = expX0; lx <= expX1; lx++) {
          const gx = zx0 + lx;
          const gIdx = gy * w + gx;
          if (textMask[gIdx]) textCovered++;
          const pIdx = gIdx * 4;
          const r = rgba[pIdx];
          const g = rgba[pIdx + 1];
          const b = rgba[pIdx + 2];
          const luma = 0.299 * r + 0.587 * g + 0.114 * b;
          const chroma = Math.max(r, g, b) - Math.min(r, g, b);
          const distFromBg = Math.abs(r - zoneBg.r) + Math.abs(g - zoneBg.g) + Math.abs(b - zoneBg.b);

          sumLuma += luma;
          sumSqLuma += luma * luma;

          if (distFromBg > 28) {
            if (r > g && g >= b * 0.85 && r - b >= 14 && r - b <= 105 && r >= 80 && luma < 230) {
              skinPixels++;
            }
            if (chroma > 110) {
              neonPixels++;
            }
          }

          if (sampleRow) {
            const isDark = luma < 120;
            if (lx > expX0 && isDark !== prevDark) {
              rowTransitions++;
            }
            prevDark = isDark;
          }
        }

        if (sampleRow && rowTransitions >= 14) {
          highTransitionRows++;
        }
      }

      const textOverlapRatio = textCovered / Math.max(1, boxArea);
      if (textOverlapRatio > 0.22) continue;
      if (sampledRows > 0 && highTransitionRows / sampledRows > 0.34) continue;

      const meanLuma = sumLuma / Math.max(1, boxArea);
      const variance = Math.max(0, sumSqLuma / Math.max(1, boxArea) - meanLuma * meanLuma);
      const stdDev = Math.sqrt(variance);
      if (stdDev < 13) continue;

      // Measure vertical bilateral symmetry (real portraits are strongly symmetric along X midpoint)
      const symY0 = expY0 + Math.floor(bh * 0.12);
      const symY1 = expY1 - Math.floor(bh * 0.14);
      const halfW = Math.floor(bw * 0.38);
      const midX = (expX0 + expX1) * 0.5;
      let symDiffSum = 0;
      let symPairs = 0;

      for (let ly = symY0; ly <= symY1; ly += 2) {
        const gy = zy0 + ly;
        const rowOff = gy * w;
        for (let dx = 2; dx <= halfW; dx += 2) {
          const lxLeft = Math.max(expX0, Math.round(midX - dx));
          const lxRight = Math.min(expX1, Math.round(midX + dx));
          const iL = (rowOff + zx0 + lxLeft) * 4;
          const iR = (rowOff + zx0 + lxRight) * 4;
          const lL = 0.299 * rgba[iL] + 0.587 * rgba[iL + 1] + 0.114 * rgba[iL + 2];
          const lR = 0.299 * rgba[iR] + 0.587 * rgba[iR + 1] + 0.114 * rgba[iR + 2];
          symDiffSum += Math.abs(lL - lR);
          symPairs++;
        }
      }
      const meanSymDiff = symPairs > 0 ? symDiffSum / symPairs : stdDev * 1.5;
      const symmetryScore = Math.max(0, Math.min(1, 1 - meanSymDiff / Math.max(36, stdDev * 2.2)));

      const skinRatio = skinPixels / Math.max(1, boxArea);
      const neonRatio = neonPixels / Math.max(1, boxArea);

      const gx0 = zx0 + expX0;
      const gy0 = zy0 + expY0;
      const gx1 = zx0 + expX1;
      const gy1 = zy0 + expY1;

      const padX = Math.max(2, Math.round(bw * 0.03));
      const padY = Math.max(2, Math.round(bh * 0.025));

      const fx0 = Math.max(zx0, gx0 - padX);
      const fx1 = Math.min(zx1, gx1 + padX);
      let fy0 = Math.max(zy0, gy0 - padY);
      const fy1 = Math.min(zy1, gy1 + padY);

      while (fy0 < gy0) {
        let hitsText = false;
        for (let x = fx0; x <= fx1; x++) {
          if (textMask[fy0 * w + x]) {
            hitsText = true;
            break;
          }
        }
        if (hitsText) fy0++;
        else break;
      }

      const finalW = fx1 - fx0 + 1;
      const finalH = fy1 - fy0 + 1;
      const aspectPenalty = Math.abs(finalW / Math.max(1, finalH) - 0.77) * 45;
      const areaScore = Math.min(areaRatio, 0.13) * 580 - Math.max(0, areaRatio - 0.15) * 650;
      const score =
        (areaScore +
          stdDev * 0.8 +
          fillRatio * 40 +
          symmetryScore * 65 +
          Math.min(skinRatio * 45, 22) -
          neonRatio * 160 -
          aspectPenalty -
          textOverlapRatio * 120) *
        sidePriorityBonus;

      if (!bestCandidate || score > bestCandidate.score) {
        bestCandidate = {
          bbox: {
            x: clamp01(fx0 / w),
            y: clamp01(fy0 / h),
            width: clamp01(finalW / w),
            height: clamp01(finalH / h),
          },
          score,
          method: 'pixel_contour',
        };
      }
    }
  }

  return bestCandidate;
}

function findPortraitInZone(
  rgba: Uint8ClampedArray,
  w: number,
  h: number,
  textMask: Uint8Array,
  paper: { r: number; g: number; b: number; luma: number; chroma: number },
  zoneX0Ratio: number,
  zoneX1Ratio: number,
  zoneY0Ratio: number,
  zoneY1Ratio: number,
  sidePriorityBonus: number
): PortraitCandidate | null {
  const zx0 = Math.max(0, Math.floor(zoneX0Ratio * w));
  const zx1 = Math.min(w - 1, Math.ceil(zoneX1Ratio * w));
  const zy0 = Math.max(0, Math.floor(zoneY0Ratio * h));
  const zy1 = Math.min(h - 1, Math.ceil(zoneY1Ratio * h));
  const zw = zx1 - zx0 + 1;
  const zh = zy1 - zy0 + 1;
  if (zw < 28 || zh < 36) return null;

  const zoneBg = estimateZonePaperColor(rgba, w, textMask, zx0, zy0, zw, zh, paper);
  const core = new Uint8Array(zw * zh);
  const soft = new Uint8Array(zw * zh);

  for (let ly = 0; ly < zh; ly++) {
    const gy = zy0 + ly;
    for (let lx = 0; lx < zw; lx++) {
      const gx = zx0 + lx;
      const gIdx = gy * w + gx;
      if (textMask[gIdx]) continue;
      const pIdx = gIdx * 4;
      const r = rgba[pIdx];
      const g = rgba[pIdx + 1];
      const b = rgba[pIdx + 2];
      const luma = 0.299 * r + 0.587 * g + 0.114 * b;
      const chroma = Math.max(r, g, b) - Math.min(r, g, b);
      const dist = Math.abs(r - zoneBg.r) + Math.abs(g - zoneBg.g) + Math.abs(b - zoneBg.b);
      const darker = zoneBg.luma - luma;
      const lumaDiff = Math.abs(luma - zoneBg.luma);
      const excessChroma = Math.max(0, chroma - zoneBg.chroma);

      if (dist > 58 || darker > 24 || excessChroma > 24) {
        core[ly * zw + lx] = 1;
        soft[ly * zw + lx] = 1;
      } else if (dist > 36 || lumaDiff > 15 || excessChroma > 16) {
        soft[ly * zw + lx] = 1;
      }
    }
  }

  // Try crisp un-dilated core components first so guilloche borders never bridge to the portrait
  const directCandidate = scorePortraitComponents(
    rgba,
    w,
    h,
    textMask,
    zoneBg,
    core,
    soft,
    core,
    zx0,
    zy0,
    zx1,
    zy1,
    zw,
    zh,
    sidePriorityBonus
  );
  if (directCandidate) return directCandidate;

  // Fallback: true 3x3 morphological closing (dilate -> erode) to reconnect low-contrast fragmented portraits
  const dilated = new Uint8Array(zw * zh);
  for (let y = 0; y < zh; y++) {
    for (let x = 0; x < zw; x++) {
      if (!core[y * zw + x]) continue;
      for (let dy = -1; dy <= 1; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= zh) continue;
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          if (nx < 0 || nx >= zw) continue;
          dilated[ny * zw + nx] = 1;
        }
      }
    }
  }
  const closed = new Uint8Array(zw * zh);
  for (let y = 0; y < zh; y++) {
    for (let x = 0; x < zw; x++) {
      let all = 1;
      for (let dy = -1; dy <= 1 && all; dy++) {
        const ny = y + dy;
        for (let dx = -1; dx <= 1 && all; dx++) {
          const nx = x + dx;
          if (ny < 0 || ny >= zh || nx < 0 || nx >= zw || !dilated[ny * zw + nx]) {
            all = 0;
          }
        }
      }
      closed[y * zw + x] = all;
    }
  }

  return scorePortraitComponents(
    rgba,
    w,
    h,
    textMask,
    zoneBg,
    core,
    soft,
    closed,
    zx0,
    zy0,
    zx1,
    zy1,
    zw,
    zh,
    sidePriorityBonus
  );
}

/**
 * Pure RGBA buffer portrait region detector. Exposed for deterministic unit testing
 * in both browser and Node.js environments.
 */
export function detectPortraitBoundsFromRgba(
  rgba: Uint8ClampedArray,
  w: number,
  h: number,
  options: {
    mrz?: MrzParsedData | null;
    barcode?: BarcodeParsedData | null;
    vizLineBoxes?: VizLineBox[];
    docWidth?: number;
    docHeight?: number;
  } = {}
): { bbox: NormalizedRect; method: 'pixel_contour' } | null {
  if (w < 40 || h < 40 || rgba.length < w * h * 4) return null;

  const boxes = normalizeTextBoxes(
    options.vizLineBoxes ?? [],
    options.docWidth ?? w,
    options.docHeight ?? h,
    w,
    h
  );
  const textMask = buildTextMask(boxes, w, h);
  const mrzTop = estimateMrzTopRatio(boxes, w, h, options.mrz);
  const paper = estimatePaperColor(rgba, w, h);

  const maxY = Math.min(0.86, Math.max(0.55, mrzTop - 0.015));

  const left = findPortraitInZone(rgba, w, h, textMask, paper, 0.015, 0.37, 0.07, maxY, 1.15);
  const right = findPortraitInZone(rgba, w, h, textMask, paper, 0.63, 0.985, 0.07, maxY, 0.92);

  const winner = !left
    ? right
    : !right
      ? left
      : left.score >= right.score
        ? left
        : right;

  if (!winner) return null;
  return { bbox: winner.bbox, method: winner.method };
}

function findInkClusterInBinaryMap(
  ink: Uint8Array,
  bw: number,
  bh: number,
  bx0: number,
  by0: number,
  bx1: number,
  by1: number,
  w: number,
  h: number,
  minAspect: number
): { bbox: NormalizedRect; score: number } | null {
  const bridged = new Uint8Array(bw * bh);
  for (let ly = 0; ly < bh; ly++) {
    for (let lx = 0; lx < bw; lx++) {
      if (!ink[ly * bw + lx]) continue;
      for (let dy = -2; dy <= 2; dy++) {
        const ny = ly + dy;
        if (ny < 0 || ny >= bh) continue;
        for (let dx = -4; dx <= 4; dx++) {
          const nx = lx + dx;
          if (nx < 0 || nx >= bw) continue;
          bridged[ny * bw + nx] = 1;
        }
      }
    }
  }

  const visited = new Uint8Array(bw * bh);
  const queue = new Int32Array(bw * bh);
  let best: { bbox: NormalizedRect; score: number } | null = null;

  for (let sy = 0; sy < bh; sy++) {
    for (let sx = 0; sx < bw; sx++) {
      const start = sy * bw + sx;
      if (!bridged[start] || visited[start]) continue;

      let head = 0;
      let tail = 0;
      queue[tail++] = start;
      visited[start] = 1;

      let minX = bw;
      let maxX = -1;
      let minY = bh;
      let maxY = -1;
      let inkCount = 0;

      while (head < tail) {
        const idx = queue[head++];
        const cx = idx % bw;
        const cy = (idx - cx) / bw;
        if (ink[idx]) {
          inkCount++;
          if (cx < minX) minX = cx;
          if (cx > maxX) maxX = cx;
          if (cy < minY) minY = cy;
          if (cy > maxY) maxY = cy;
        }

        const nbs = [
          cx > 0 ? idx - 1 : -1,
          cx + 1 < bw ? idx + 1 : -1,
          cy > 0 ? idx - bw : -1,
          cy + 1 < bh ? idx + bw : -1,
        ];
        for (const n of nbs) {
          if (n >= 0 && bridged[n] && !visited[n]) {
            visited[n] = 1;
            queue[tail++] = n;
          }
        }
      }

      if (inkCount < 16 || maxX <= minX || maxY <= minY) continue;
      const sigW = maxX - minX + 1;
      const sigH = maxY - minY + 1;
      const wRatio = sigW / w;
      const hRatio = sigH / h;
      const aspect = sigW / sigH;
      const fillDensity = inkCount / (sigW * sigH);

      if (wRatio < 0.055 || wRatio > 0.36 || sigH < 5 || hRatio > 0.135) continue;
      if (aspect < minAspect || aspect > 8.5) continue;
      if (fillDensity < 0.03 || fillDensity > 0.45) continue;

      const padX = Math.max(4, Math.round(sigW * 0.06));
      const padY = Math.max(3, Math.round(sigH * 0.14));
      const gx0 = Math.max(bx0, bx0 + minX - padX);
      const gy0 = Math.max(by0, by0 + minY - padY);
      const gx1 = Math.min(bx1, bx0 + maxX + padX);
      const gy1 = Math.min(by1, by0 + maxY + padY);

      const score =
        inkCount * 0.5 +
        (aspect >= 1.6 && aspect <= 5.5 ? 25 : 5) -
        Math.abs(fillDensity - 0.16) * 40;

      if (!best || score > best.score) {
        best = {
          bbox: {
            x: clamp01(gx0 / w),
            y: clamp01(gy0 / h),
            width: clamp01((gx1 - gx0 + 1) / w),
            height: clamp01((gy1 - gy0 + 1) / h),
          },
          score,
        };
      }
    }
  }

  return best;
}

function findInkBoundingBoxInSearchRect(
  rgba: Uint8ClampedArray,
  w: number,
  h: number,
  textMask: Uint8Array,
  portraitRect: NormalizedRect | null,
  sx0: number,
  sy0: number,
  sx1: number,
  sy1: number,
  darkDeltaThreshold: number,
  minAspect: number,
  preferClusterMode = false
): { bbox: NormalizedRect; score: number } | null {
  const edgeMarginX = Math.max(2, Math.round(w * 0.02));
  const bx0 = Math.max(edgeMarginX, Math.floor(sx0));
  const by0 = Math.max(1, Math.floor(sy0));
  const bx1 = Math.min(w - edgeMarginX - 1, Math.ceil(sx1));
  const by1 = Math.min(h - 2, Math.ceil(sy1));
  const bw = bx1 - bx0 + 1;
  const bh = by1 - by0 + 1;
  if (bw < 18 || bh < 8) return null;

  const px0 = portraitRect ? Math.floor(portraitRect.x * w) - 3 : -1;
  const py0 = portraitRect ? Math.floor(portraitRect.y * h) - 3 : -1;
  const px1 = portraitRect ? Math.ceil((portraitRect.x + portraitRect.width) * w) + 3 : -1;
  const py1 = portraitRect ? Math.ceil((portraitRect.y + portraitRect.height) * h) + 3 : -1;

  const lumas: number[] = [];
  for (let y = by0; y <= by1; y++) {
    for (let x = bx0; x <= bx1; x++) {
      if (textMask[y * w + x]) continue;
      if (portraitRect && x >= px0 && x <= px1 && y >= py0 && y <= py1) continue;
      const i = (y * w + x) * 4;
      lumas.push(0.299 * rgba[i] + 0.587 * rgba[i + 1] + 0.114 * rgba[i + 2]);
    }
  }
  if (lumas.length < 30) return null;
  lumas.sort((a, b) => a - b);
  const localPaperLuma = lumas[Math.floor(lumas.length * 0.8)];
  if (localPaperLuma < 110) return null;

  const ink = new Uint8Array(bw * bh);
  for (let ly = 0; ly < bh; ly++) {
    const gy = by0 + ly;
    for (let lx = 0; lx < bw; lx++) {
      const gx = bx0 + lx;
      if (textMask[gy * w + gx]) continue;
      if (portraitRect && gx >= px0 && gx <= px1 && gy >= py0 && gy <= py1) continue;
      const i = (gy * w + gx) * 4;
      const r = rgba[i];
      const g = rgba[i + 1];
      const b = rgba[i + 2];
      const luma = 0.299 * r + 0.587 * g + 0.114 * b;
      const chroma = Math.max(r, g, b) - Math.min(r, g, b);
      if (localPaperLuma - luma >= darkDeltaThreshold && (luma < 140 || chroma < 42)) {
        ink[ly * bw + lx] = 1;
      }
    }
  }

  // Suppress continuous horizontal separator rules / printed signature baselines (<=3 rows tall, >=68% width)
  const isRuleRow = new Uint8Array(bh);
  for (let ly = 0; ly < bh; ly++) {
    let rowSum = 0;
    let maxRun = 0;
    let curRun = 0;
    const off = ly * bw;
    for (let lx = 0; lx < bw; lx++) {
      if (ink[off + lx]) {
        rowSum++;
        curRun++;
        if (curRun > maxRun) maxRun = curRun;
      } else {
        curRun = 0;
      }
    }
    if (rowSum >= Math.max(12, Math.floor(bw * 0.7)) && maxRun >= Math.floor(bw * 0.6)) {
      isRuleRow[ly] = 1;
    }
  }

  for (let ly = 0; ly < bh; ly++) {
    if (!isRuleRow[ly]) continue;
    let runEnd = ly;
    while (runEnd + 1 < bh && isRuleRow[runEnd + 1]) runEnd++;
    const runHeight = runEnd - ly + 1;
    if (runHeight <= 3) {
      for (let ry = ly; ry <= runEnd; ry++) {
        ink.fill(0, ry * bw, (ry + 1) * bw);
      }
    }
    ly = runEnd;
  }

  // Denoise isolated single pixels in-place
  const cleanInk = new Uint8Array(bw * bh);
  let minX = bw;
  let maxX = -1;
  let minY = bh;
  let maxY = -1;
  let inkCount = 0;

  for (let ly = 0; ly < bh; ly++) {
    for (let lx = 0; lx < bw; lx++) {
      if (!ink[ly * bw + lx]) continue;
      let neighbors = 0;
      for (let dy = -1; dy <= 1; dy++) {
        const ny = ly + dy;
        if (ny < 0 || ny >= bh) continue;
        for (let dx = -1; dx <= 1; dx++) {
          const nx = lx + dx;
          if (nx < 0 || nx >= bw || (dx === 0 && dy === 0)) continue;
          if (ink[ny * bw + nx]) neighbors++;
        }
      }
      if (neighbors === 0) continue;
      cleanInk[ly * bw + lx] = 1;
      inkCount++;
      if (lx < minX) minX = lx;
      if (lx > maxX) maxX = lx;
      if (ly < minY) minY = ly;
      if (ly > maxY) maxY = ly;
    }
  }

  if (inkCount < 16 || maxX <= minX || maxY <= minY) return null;

  const sigW = maxX - minX + 1;
  const sigH = maxY - minY + 1;
  if (preferClusterMode || sigW > w * 0.34 || sigH > h * 0.14) {
    return findInkClusterInBinaryMap(cleanInk, bw, bh, bx0, by0, bx1, by1, w, h, minAspect);
  }

  const fillDensity = inkCount / (sigW * sigH);
  const aspect = sigW / sigH;

  if (sigW < w * 0.055 || sigH < 5) return null;
  if (aspect < minAspect) return null;
  if (fillDensity < 0.03 || fillDensity > 0.55) return null;

  const padX = Math.max(4, Math.round(sigW * 0.06));
  const padY = Math.max(3, Math.round(sigH * 0.14));
  const gx0 = Math.max(bx0, bx0 + minX - padX);
  const gy0 = Math.max(by0, by0 + minY - padY);
  const gx1 = Math.min(bx1, bx0 + maxX + padX);
  const gy1 = Math.min(by1, by0 + maxY + padY);

  return {
    bbox: {
      x: clamp01(gx0 / w),
      y: clamp01(gy0 / h),
      width: clamp01((gx1 - gx0 + 1) / w),
      height: clamp01((gy1 - gy0 + 1) / h),
    },
    score: inkCount,
  };
}

/**
 * Pure RGBA buffer signature region detector.
 * Prioritizes VIZ signature labels (e.g., "Holder's signature", "Vlastoručni potpis",
 * "Firma del titular", "Unterschrift") and falls back to cursive ink-cluster detection above the MRZ zone.
 */
export function detectSignatureBoundsFromRgba(
  rgba: Uint8ClampedArray,
  w: number,
  h: number,
  options: {
    mrz?: MrzParsedData | null;
    vizLineBoxes?: VizLineBox[];
    docWidth?: number;
    docHeight?: number;
    portraitRect?: NormalizedRect | null;
  } = {}
): { bbox: NormalizedRect; method: 'viz_label' | 'layout_heuristic' } | null {
  if (w < 40 || h < 40 || rgba.length < w * h * 4) return null;

  const boxes = normalizeTextBoxes(
    options.vizLineBoxes ?? [],
    options.docWidth ?? w,
    options.docHeight ?? h,
    w,
    h
  );
  const textMask = buildTextMask(boxes, w, h);
  const mrzTop = estimateMrzTopRatio(boxes, w, h, options.mrz);
  const maxAllowedY = Math.min(h - 2, Math.floor((mrzTop - 0.015) * h));

  const sigLabels = boxes.filter((b) => SIGNATURE_LABEL_RE.test(b.text));
  for (const lbl of sigLabels) {
    const belowY0 = lbl.y1 + 2;
    const belowY1 = Math.min(maxAllowedY, lbl.y1 + Math.round(h * 0.165));
    const belowX0 = Math.max(0, lbl.x0 - Math.round(w * 0.03));
    const belowX1 = Math.min(
      w - 1,
      Math.max(lbl.x1 + Math.round(w * 0.12), lbl.x0 + Math.round(w * 0.38))
    );

    if (belowY1 - belowY0 >= 8) {
      const foundBelow = findInkBoundingBoxInSearchRect(
        rgba,
        w,
        h,
        textMask,
        options.portraitRect ?? null,
        belowX0,
        belowY0,
        belowX1,
        belowY1,
        36,
        1.25
      );
      if (foundBelow) {
        return { bbox: foundBelow.bbox, method: 'viz_label' };
      }
    }

    const rightX0 = lbl.x1 + 4;
    const rightX1 = Math.min(w - 1, lbl.x1 + Math.round(w * 0.34));
    const rightY0 = Math.max(0, lbl.y0 - Math.round(h * 0.02));
    const rightY1 = Math.min(maxAllowedY, lbl.y1 + Math.round(h * 0.03));
    if (rightX1 - rightX0 >= 20 && rightY1 - rightY0 >= 8) {
      const foundRight = findInkBoundingBoxInSearchRect(
        rgba,
        w,
        h,
        textMask,
        options.portraitRect ?? null,
        rightX0,
        rightY0,
        rightX1,
        rightY1,
        36,
        1.25
      );
      if (foundRight) {
        return { bbox: foundRight.bbox, method: 'viz_label' };
      }
    }
  }

  const heuristicY0 = Math.round(h * (options.mrz ? 0.53 : 0.62));
  const heuristicY1 = Math.min(Math.round(h * 0.88), maxAllowedY);

  if (heuristicY1 - heuristicY0 >= 12) {
    const regions = [
      { x0: Math.round(w * 0.30), x1: Math.round(w * 0.78) },
      { x0: Math.round(w * 0.56), x1: Math.round(w * 0.95) },
    ];
    let bestHeuristic: { bbox: NormalizedRect; score: number } | null = null;
    for (const reg of regions) {
      const match = findInkBoundingBoxInSearchRect(
        rgba,
        w,
        h,
        textMask,
        options.portraitRect ?? null,
        reg.x0,
        heuristicY0,
        reg.x1,
        heuristicY1,
        52,
        1.65,
        true
      );
      if (match && match.bbox.height * h >= 7 && match.bbox.width >= 0.08) {
        if (!bestHeuristic || match.score > bestHeuristic.score) {
          bestHeuristic = match;
        }
      }
    }
    if (bestHeuristic) {
      return { bbox: bestHeuristic.bbox, method: 'layout_heuristic' };
    }
  }

  return null;
}

function cropNormalizedRectFromCanvas(
  sourceCanvas: HTMLCanvasElement,
  bbox: NormalizedRect,
  method: CroppedRegionInfo['detectionMethod']
): CroppedRegionInfo | null {
  const sw = sourceCanvas.width;
  const sh = sourceCanvas.height;
  if (!sw || !sh) return null;

  const sx = Math.max(0, Math.round(bbox.x * sw));
  const sy = Math.max(0, Math.round(bbox.y * sh));
  const cw = Math.min(sw - sx, Math.max(4, Math.round(bbox.width * sw)));
  const ch = Math.min(sh - sy, Math.max(4, Math.round(bbox.height * sh)));
  if (cw < 12 || ch < 8) return null;

  const outCanvas = document.createElement('canvas');
  outCanvas.width = cw;
  outCanvas.height = ch;
  const ctx = outCanvas.getContext('2d');
  if (!ctx) return null;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(sourceCanvas, sx, sy, cw, ch, 0, 0, cw, ch);

  return {
    dataUrl: outCanvas.toDataURL('image/png'),
    bbox,
    width: cw,
    height: ch,
    detectionMethod: method,
  };
}

/**
 * Checks whether the upright document contains a prominent crimson/red stamp or diagonal
 * watermark overlay (e.g. diagonal "SPECIMEN" or "MUSTER" stamp) and isolates it as a
 * crisp deskewed black-on-white canvas for secondary OCR verification.
 * Returns null immediately (~2ms) on clean documents without red stamp overlays.
 */
export function buildColoredWatermarkOcrCanvas(
  sourceCanvas: HTMLCanvasElement
): HTMLCanvasElement | null {
  if (typeof document === 'undefined') return null;
  const sw = sourceCanvas.width;
  const sh = sourceCanvas.height;
  if (!sw || !sh) return null;

  const sampleW = Math.min(540, sw);
  const sampleH = Math.max(1, Math.round((sh * sampleW) / sw));
  const probeCanvas = document.createElement('canvas');
  probeCanvas.width = sampleW;
  probeCanvas.height = sampleH;
  const pCtx = probeCanvas.getContext('2d', { willReadFrequently: true });
  if (!pCtx) return null;
  pCtx.drawImage(sourceCanvas, 0, 0, sampleW, sampleH);

  const img = pCtx.getImageData(0, 0, sampleW, sampleH);
  const data = img.data;
  let redStampPixels = 0;
  const cx0 = Math.floor(sampleW * 0.1);
  const cx1 = Math.ceil(sampleW * 0.9);
  const cy0 = Math.floor(sampleH * 0.12);
  const cy1 = Math.ceil(sampleH * 0.84);
  const totalCenterPixels = Math.max(1, (cx1 - cx0) * (cy1 - cy0));

  for (let y = cy0; y < cy1; y++) {
    for (let x = cx0; x < cx1; x++) {
      const i = (y * sampleW + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (r >= 120 && r - Math.max(g, b) >= 52) {
        redStampPixels++;
      }
    }
  }

  const ratio = redStampPixels / totalCenterPixels;
  if (ratio < 0.0035 || ratio > 0.22) {
    return null;
  }

  const maskCanvas = document.createElement('canvas');
  maskCanvas.width = sampleW;
  maskCanvas.height = sampleH;
  const mCtx = maskCanvas.getContext('2d');
  if (!mCtx) return null;

  const outData = mCtx.createImageData(sampleW, sampleH);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const isRedStamp = r >= 115 && r - Math.max(g, b) >= 46;
    const val = isRedStamp ? 0 : 255;
    outData.data[i] = val;
    outData.data[i + 1] = val;
    outData.data[i + 2] = val;
    outData.data[i + 3] = 255;
  }
  mCtx.putImageData(outData, 0, 0);

  // Estimate dominant orientation (-28°, 0°, or +28°) via horizontal projection variance
  const candidates: Array<{ angle: number; score: number }> = [];
  for (const angle of [0, 26, -26]) {
    const rad = (angle * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const bins = new Int32Array(sampleH + 40);
    const halfW = sampleW / 2;
    const halfH = sampleH / 2;
    for (let y = cy0; y < cy1; y += 2) {
      for (let x = cx0; x < cx1; x += 2) {
        if (outData.data[(y * sampleW + x) * 4] === 0) {
          const ry = Math.round((x - halfW) * sin + (y - halfH) * cos + halfH + 20);
          if (ry >= 0 && ry < bins.length) bins[ry]++;
        }
      }
    }
    let energy = 0;
    for (let k = 0; k < bins.length; k++) {
      energy += bins[k] * bins[k];
    }
    candidates.push({ angle, score: energy });
  }
  candidates.sort((a, b) => b.score - a.score);
  const bestAngle = candidates[0]?.angle ?? 0;
  if (bestAngle === 0) return maskCanvas;

  const rad = (bestAngle * Math.PI) / 180;
  const cos = Math.abs(Math.cos(rad));
  const sin = Math.abs(Math.sin(rad));
  const rotW = Math.ceil(sampleW * cos + sampleH * sin);
  const rotH = Math.ceil(sampleW * sin + sampleH * cos);
  const rotCanvas = document.createElement('canvas');
  rotCanvas.width = rotW;
  rotCanvas.height = rotH;
  const rCtx = rotCanvas.getContext('2d');
  if (!rCtx) return maskCanvas;
  rCtx.fillStyle = '#FFFFFF';
  rCtx.fillRect(0, 0, rotW, rotH);
  rCtx.translate(rotW / 2, rotH / 2);
  rCtx.rotate(rad);
  rCtx.drawImage(maskCanvas, -sampleW / 2, -sampleH / 2);
  return rotCanvas;
}

/**
 * Extracts cropped portrait (`portraitDataUrl`), holder signature (`signatureDataUrl`),
 * and optional red-stamp watermark probe canvas from an upright, deskewed document image.
 */
export async function extractPortraitAndSignature(
  imageSource: string | ImageSurface,
  options: ExtractMediaOptions = {}
): Promise<ExtractedDocumentMedia> {
  const {
    extractPortrait = true,
    extractSignature = true,
    checkColoredWatermark = false,
  } = options;

  if (
    (!extractPortrait && !extractSignature && !checkColoredWatermark) ||
    typeof document === 'undefined'
  ) {
    return { portrait: null, signature: null, watermarkProbeCanvas: null };
  }

  let fullCanvas: HTMLCanvasElement | null = null;
  if (typeof imageSource === 'string') {
    fullCanvas = await loadDataUrlAsCanvas(imageSource);
  } else {
    fullCanvas = surfaceToCanvas(imageSource);
  }

  if (!fullCanvas || !fullCanvas.width || !fullCanvas.height) {
    return { portrait: null, signature: null, watermarkProbeCanvas: null };
  }

  let portrait: CroppedRegionInfo | null = null;
  let signature: CroppedRegionInfo | null = null;

  if (extractPortrait || extractSignature) {
    const workW = Math.min(WORK_WIDTH, fullCanvas.width);
    const workH = Math.max(1, Math.round((fullCanvas.height * workW) / fullCanvas.width));

    const workCanvas = document.createElement('canvas');
    workCanvas.width = workW;
    workCanvas.height = workH;
    const wCtx = workCanvas.getContext('2d', { willReadFrequently: true });

    if (wCtx) {
      wCtx.drawImage(fullCanvas, 0, 0, workW, workH);
      const imgData = wCtx.getImageData(0, 0, workW, workH);

      if (extractPortrait) {
        const pMatch = detectPortraitBoundsFromRgba(imgData.data, workW, workH, {
          mrz: options.mrz,
          barcode: options.barcode,
          vizLineBoxes: options.vizLineBoxes,
          docWidth: fullCanvas.width,
          docHeight: fullCanvas.height,
        });
        if (pMatch) {
          portrait = cropNormalizedRectFromCanvas(fullCanvas, pMatch.bbox, pMatch.method);
        }
      }

      if (extractSignature) {
        const sMatch = detectSignatureBoundsFromRgba(imgData.data, workW, workH, {
          mrz: options.mrz,
          vizLineBoxes: options.vizLineBoxes,
          docWidth: fullCanvas.width,
          docHeight: fullCanvas.height,
          portraitRect: portrait?.bbox ?? null,
        });
        if (sMatch) {
          signature = cropNormalizedRectFromCanvas(fullCanvas, sMatch.bbox, sMatch.method);
        }
      }
    }
  }

  const watermarkProbeCanvas = checkColoredWatermark
    ? buildColoredWatermarkOcrCanvas(fullCanvas)
    : null;

  return { portrait, signature, watermarkProbeCanvas };
}
