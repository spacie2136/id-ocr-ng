import type { DocumentQuad, PerspectiveInfo, Point2D } from './types';

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function dist(a: Point2D, b: Point2D): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function cross(o: Point2D, a: Point2D, b: Point2D): number {
  return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

function polygonArea(pts: Point2D[]): number {
  let area = 0;
  for (let i = 0; i < pts.length; i++) {
    const p1 = pts[i];
    const p2 = pts[(i + 1) % pts.length];
    area += p1.x * p2.y - p2.x * p1.y;
  }
  return Math.abs(area) / 2;
}

/**
 * Orders 4 arbitrary 2D points into consistent clockwise document quad corners:
 * [topLeft, topRight, bottomRight, bottomLeft].
 */
export function orderQuadCorners(points: Point2D[]): DocumentQuad {
  if (points.length !== 4) {
    throw new Error('orderQuadCorners requires exactly 4 points');
  }
  const bySum = [...points].sort((a, b) => a.x + a.y - (b.x + b.y));
  const byDiff = [...points].sort((a, b) => a.x - a.y - (b.x - b.y));

  const topLeft = bySum[0];
  const bottomRight = bySum[3];
  const bottomLeft = byDiff[0];
  const topRight = byDiff[3];

  const distinct = new Set([topLeft, topRight, bottomRight, bottomLeft]);
  if (distinct.size === 4) {
    return { topLeft, topRight, bottomRight, bottomLeft };
  }

  // Fallback by centroid polar angle if a rotated diamond causes sum/diff tie
  const cx = points.reduce((s, p) => s + p.x, 0) / 4;
  const cy = points.reduce((s, p) => s + p.y, 0) / 4;
  const sorted = [...points].sort(
    (a, b) => Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx)
  );
  // Angles around centroid start from top-left quadrant (-PI..-PI/2)
  const tlIdx = sorted.reduce(
    (bestIdx, p, idx, arr) =>
      p.x + p.y < arr[bestIdx].x + arr[bestIdx].y ? idx : bestIdx,
    0
  );
  return {
    topLeft: sorted[tlIdx],
    topRight: sorted[(tlIdx + 1) % 4],
    bottomRight: sorted[(tlIdx + 2) % 4],
    bottomLeft: sorted[(tlIdx + 3) % 4],
  };
}

function convexHull(points: Point2D[]): Point2D[] {
  if (points.length <= 3) return points;
  const sorted = [...points].sort((a, b) => (a.x === b.x ? a.y - b.y : a.x - b.x));
  const lower: Point2D[] = [];
  for (const p of sorted) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
      lower.pop();
    }
    lower.push(p);
  }
  const upper: Point2D[] = [];
  for (let i = sorted.length - 1; i >= 0; i--) {
    const p = sorted[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
      upper.pop();
    }
    upper.push(p);
  }
  lower.pop();
  upper.pop();
  return lower.concat(upper);
}

/**
 * Visvalingam-Whyatt simplification on a closed convex polygon down to 4 corner vertices.
 */
function simplifyHullToQuad(hull: Point2D[]): Point2D[] {
  if (hull.length <= 4) return hull;
  const pts = [...hull];
  while (pts.length > 4) {
    let minArea = Infinity;
    let removeIdx = 0;
    const n = pts.length;
    for (let i = 0; i < n; i++) {
      const prev = pts[(i - 1 + n) % n];
      const curr = pts[i];
      const next = pts[(i + 1) % n];
      const triArea = Math.abs(cross(prev, curr, next)) * 0.5;
      if (triArea < minArea) {
        minArea = triArea;
        removeIdx = i;
      }
    }
    pts.splice(removeIdx, 1);
  }
  return pts;
}

interface Line2D {
  nx: number;
  ny: number;
  c: number;
}

function fitOrthogonalLine(pts: Point2D[], fallbackA: Point2D, fallbackB: Point2D): Line2D {
  if (pts.length < 6) {
    const dx = fallbackB.x - fallbackA.x;
    const dy = fallbackB.y - fallbackA.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    return { nx, ny, c: -(nx * fallbackA.x + ny * fallbackA.y) };
  }

  let mx = 0;
  let my = 0;
  for (const p of pts) {
    mx += p.x;
    my += p.y;
  }
  mx /= pts.length;
  my /= pts.length;

  let cxx = 0;
  let cxy = 0;
  let cyy = 0;
  for (const p of pts) {
    const dx = p.x - mx;
    const dy = p.y - my;
    cxx += dx * dx;
    cxy += dx * dy;
    cyy += dy * dy;
  }

  // Normal corresponds to eigenvector of smallest eigenvalue of covariance matrix
  const trace = cxx + cyy;
  const detTerm = Math.sqrt(Math.max(0, (cxx - cyy) * (cxx - cyy) + 4 * cxy * cxy));
  const lambdaMin = 0.5 * (trace - detTerm);
  let nx = cxy;
  let ny = lambdaMin - cxx;
  if (Math.hypot(nx, ny) < 1e-9) {
    nx = lambdaMin - cyy;
    ny = cxy;
  }
  const len = Math.hypot(nx, ny) || 1;
  nx /= len;
  ny /= len;

  return { nx, ny, c: -(nx * mx + ny * my) };
}

function intersectLines(l1: Line2D, l2: Line2D): Point2D | null {
  const det = l1.nx * l2.ny - l2.nx * l1.ny;
  if (Math.abs(det) < 1e-6) return null;
  const x = (l1.ny * l2.c - l2.ny * l1.c) / det;
  const y = (l2.nx * l1.c - l1.nx * l2.c) / det;
  return { x, y };
}

function pointToSegmentDistance(p: Point2D, a: Point2D, b: Point2D): { d: number; t: number } {
  const vx = b.x - a.x;
  const vy = b.y - a.y;
  const len2 = vx * vx + vy * vy;
  if (len2 < 1e-9) return { d: dist(p, a), t: 0 };
  const t = ((p.x - a.x) * vx + (p.y - a.y) * vy) / len2;
  const tc = Math.max(0, Math.min(1, t));
  const px = a.x + tc * vx;
  const py = a.y + tc * vy;
  return { d: Math.hypot(p.x - px, p.y - py), t };
}

function refineQuadWithBoundaryLines(
  coarseCorners: Point2D[],
  boundary: Point2D[],
  tolerance: number
): Point2D[] {
  const ordered = orderQuadCorners(coarseCorners);
  const ring = [ordered.topLeft, ordered.topRight, ordered.bottomRight, ordered.bottomLeft];

  const lines: Line2D[] = [];
  for (let i = 0; i < 4; i++) {
    const a = ring[i];
    const b = ring[(i + 1) % 4];
    const edgePts: Point2D[] = [];
    for (const p of boundary) {
      const { d, t } = pointToSegmentDistance(p, a, b);
      if (d <= tolerance && t >= 0.12 && t <= 0.88) {
        edgePts.push(p);
      }
    }
    lines.push(fitOrthogonalLine(edgePts, a, b));
  }

  const refined: Point2D[] = [];
  for (let i = 0; i < 4; i++) {
    const prevLine = lines[(i + 3) % 4];
    const currLine = lines[i];
    const inter = intersectLines(prevLine, currLine);
    if (!inter || dist(inter, ring[i]) > tolerance * 4) {
      return ring;
    }
    refined.push(inter);
  }
  return refined;
}

function interiorAnglesDeg(quad: DocumentQuad): number[] {
  const ring = [quad.topLeft, quad.topRight, quad.bottomRight, quad.bottomLeft];
  const angles: number[] = [];
  for (let i = 0; i < 4; i++) {
    const prev = ring[(i + 3) % 4];
    const curr = ring[i];
    const next = ring[(i + 1) % 4];
    const v1x = prev.x - curr.x;
    const v1y = prev.y - curr.y;
    const v2x = next.x - curr.x;
    const v2y = next.y - curr.y;
    const denom = Math.hypot(v1x, v1y) * Math.hypot(v2x, v2y);
    if (denom < 1e-8) return [0, 0, 0, 0];
    const cos = Math.max(-1, Math.min(1, (v1x * v2x + v1y * v2y) / denom));
    angles.push((Math.acos(cos) * 180) / Math.PI);
  }
  return angles;
}

/**
 * Pure-JS 4-corner document quadrilateral detector.
 * Returns null if the image is already a tightly cropped flat scan (or no reliable quad exists)
 * so flat full-bleed scans are never over-cropped.
 */
export function detectDocumentQuad(
  source: HTMLImageElement | HTMLCanvasElement
): PerspectiveInfo | null {
  const srcW = source instanceof HTMLImageElement ? source.naturalWidth || source.width : source.width;
  const srcH = source instanceof HTMLImageElement ? source.naturalHeight || source.height : source.height;
  if (srcW < 64 || srcH < 64) return null;

  const maxDim = 320;
  const scale = Math.min(1, maxDim / Math.max(srcW, srcH));
  const w = Math.max(32, Math.round(srcW * scale));
  const h = Math.max(32, Math.round(srcH * scale));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(source, 0, 0, w, h);

  const rgba = ctx.getImageData(0, 0, w, h).data;
  const nPix = w * h;
  const gray = new Float32Array(nPix);
  for (let i = 0, p = 0; i < rgba.length; i += 4, p++) {
    gray[p] = 0.299 * rgba[i] + 0.587 * rgba[i + 1] + 0.114 * rgba[i + 2];
  }

  // 3x3 light blur to suppress guilloche/micro-noise while preserving document borders
  const smooth = new Float32Array(nPix);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let sum = 0;
      let cnt = 0;
      for (let dy = -1; dy <= 1; dy++) {
        const yy = y + dy;
        if (yy < 0 || yy >= h) continue;
        for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx;
          if (xx < 0 || xx >= w) continue;
          sum += gray[yy * w + xx];
          cnt++;
        }
      }
      smooth[y * w + x] = sum / cnt;
    }
  }

  // Compute Sobel gradient magnitude on smooth luminance + max RGB gradient
  const grad = new Float32Array(nPix);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = y * w + x;
      const gx =
        -smooth[(y - 1) * w + (x - 1)] +
        smooth[(y - 1) * w + (x + 1)] -
        2 * smooth[y * w + (x - 1)] +
        2 * smooth[y * w + (x + 1)] -
        smooth[(y + 1) * w + (x - 1)] +
        smooth[(y + 1) * w + (x + 1)];
      const gy =
        -smooth[(y - 1) * w + (x - 1)] -
        2 * smooth[(y - 1) * w + x] -
        smooth[(y - 1) * w + (x + 1)] +
        smooth[(y + 1) * w + (x - 1)] +
        2 * smooth[(y + 1) * w + x] +
        smooth[(y + 1) * w + (x + 1)];
      grad[idx] = Math.hypot(gx, gy) * 0.25;
    }
  }

  // Estimate dominant border background color & check whether outer perimeter looks like background
  const borderSamples: Array<{ r: number; g: number; b: number; grad: number; idx: number }> = [];
  for (let x = 2; x < w - 2; x += 2) {
    borderSamples.push({ r: rgba[(2 * w + x) * 4], g: rgba[(2 * w + x) * 4 + 1], b: rgba[(2 * w + x) * 4 + 2], grad: grad[2 * w + x], idx: 2 * w + x });
    const bot = (h - 3) * w + x;
    borderSamples.push({ r: rgba[bot * 4], g: rgba[bot * 4 + 1], b: rgba[bot * 4 + 2], grad: grad[bot], idx: bot });
  }
  for (let y = 2; y < h - 2; y += 2) {
    const left = y * w + 2;
    borderSamples.push({ r: rgba[left * 4], g: rgba[left * 4 + 1], b: rgba[left * 4 + 2], grad: grad[left], idx: left });
    const right = y * w + (w - 3);
    borderSamples.push({ r: rgba[right * 4], g: rgba[right * 4 + 1], b: rgba[right * 4 + 2], grad: grad[right], idx: right });
  }

  const smoothBorder = borderSamples.filter((s) => s.grad < 10);
  // If less than 40% of border perimeter is smooth background, this is already a tight full-bleed scan
  if (smoothBorder.length < borderSamples.length * 0.4) {
    return null;
  }

  // Find median RGB of smooth border pixels
  const rs = smoothBorder.map((s) => s.r).sort((a, b) => a - b);
  const gs = smoothBorder.map((s) => s.g).sort((a, b) => a - b);
  const bs = smoothBorder.map((s) => s.b).sort((a, b) => a - b);
  const bgR = rs[Math.floor(rs.length / 2)];
  const bgG = gs[Math.floor(gs.length / 2)];
  const bgB = bs[Math.floor(bs.length / 2)];

  // Flood-fill background from perimeter seeds stopped by edges or color shift
  const bgMask = new Uint8Array(nPix);
  const queue = new Int32Array(nPix);
  let qHead = 0;
  let qTail = 0;

  const colorDistToBg = (pixIdx: number) => {
    const o = pixIdx * 4;
    return Math.max(
      Math.abs(rgba[o] - bgR),
      Math.abs(rgba[o + 1] - bgG),
      Math.abs(rgba[o + 2] - bgB)
    );
  };

  const trySeed = (pixIdx: number) => {
    if (bgMask[pixIdx]) return;
    if (grad[pixIdx] < 12 && colorDistToBg(pixIdx) < 42) {
      bgMask[pixIdx] = 1;
      queue[qTail++] = pixIdx;
    }
  };

  for (let x = 0; x < w; x++) {
    trySeed(x);
    trySeed((h - 1) * w + x);
  }
  for (let y = 0; y < h; y++) {
    trySeed(y * w);
    trySeed(y * w + (w - 1));
  }

  if (qTail === 0) return null;

  const edgeBarrier = 13.5;
  const maxBgColorShift = 46;
  const stepColorJump = 18;

  while (qHead < qTail) {
    const curr = queue[qHead++];
    const cx = curr % w;
    const cy = (curr / w) | 0;
    const co = curr * 4;
    const cr = rgba[co];
    const cg = rgba[co + 1];
    const cb = rgba[co + 2];

    const neighbors = [
      cx > 0 ? curr - 1 : -1,
      cx < w - 1 ? curr + 1 : -1,
      cy > 0 ? curr - w : -1,
      cy < h - 1 ? curr + w : -1,
    ];

    for (let k = 0; k < 4; k++) {
      const nxt = neighbors[k];
      if (nxt < 0 || bgMask[nxt]) continue;
      if (grad[nxt] >= edgeBarrier) continue;

      const no = nxt * 4;
      const stepDelta = Math.max(
        Math.abs(rgba[no] - cr),
        Math.abs(rgba[no + 1] - cg),
        Math.abs(rgba[no + 2] - cb)
      );
      if (stepDelta > stepColorJump) continue;
      if (colorDistToBg(nxt) > maxBgColorShift) continue;

      bgMask[nxt] = 1;
      queue[qTail++] = nxt;
    }
  }

  // Foreground is everything NOT reached by background flood-fill.
  // Find largest 4-connected foreground component.
  const visited = new Uint8Array(nPix);
  const compQueue = new Int32Array(nPix);
  let bestPixels: number[] = [];

  for (let i = 0; i < nPix; i++) {
    if (bgMask[i] || visited[i]) continue;
    let head = 0;
    let tail = 0;
    visited[i] = 1;
    compQueue[tail++] = i;
    const members: number[] = [];

    while (head < tail) {
      const curr = compQueue[head++];
      members.push(curr);
      const cx = curr % w;
      const cy = (curr / w) | 0;
      if (cx > 0 && !bgMask[curr - 1] && !visited[curr - 1]) {
        visited[curr - 1] = 1;
        compQueue[tail++] = curr - 1;
      }
      if (cx < w - 1 && !bgMask[curr + 1] && !visited[curr + 1]) {
        visited[curr + 1] = 1;
        compQueue[tail++] = curr + 1;
      }
      if (cy > 0 && !bgMask[curr - w] && !visited[curr - w]) {
        visited[curr - w] = 1;
        compQueue[tail++] = curr - w;
      }
      if (cy < h - 1 && !bgMask[curr + w] && !visited[curr + w]) {
        visited[curr + w] = 1;
        compQueue[tail++] = curr + w;
      }
    }

    if (members.length > bestPixels.length) {
      bestPixels = members;
    }
  }

  const rawAreaRatio = bestPixels.length / nPix;
  if (rawAreaRatio < 0.14 || rawAreaRatio > 0.94) {
    return null;
  }

  // Build mask for largest component and extract perimeter boundary points
  const fgMask = new Uint8Array(nPix);
  for (let i = 0; i < bestPixels.length; i++) {
    fgMask[bestPixels[i]] = 1;
  }

  const boundary: Point2D[] = [];
  for (let i = 0; i < bestPixels.length; i++) {
    const idx = bestPixels[i];
    const x = idx % w;
    const y = (idx / w) | 0;
    if (
      x === 0 ||
      x === w - 1 ||
      y === 0 ||
      y === h - 1 ||
      !fgMask[idx - 1] ||
      !fgMask[idx + 1] ||
      !fgMask[idx - w] ||
      !fgMask[idx + w]
    ) {
      boundary.push({ x, y });
    }
  }

  if (boundary.length < 24) return null;

  const hull = convexHull(boundary);
  if (hull.length < 4) return null;

  const coarseQuad = simplifyHullToQuad(hull);
  const refinedPx = refineQuadWithBoundaryLines(
    coarseQuad,
    boundary,
    Math.max(4, Math.min(w, h) * 0.035)
  );

  // Convert back to normalized [0..1] coordinates
  const normPts = refinedPx.map((p) => ({
    x: clamp01(p.x / w),
    y: clamp01(p.y / h),
  }));
  const quad = orderQuadCorners(normPts);

  // Geometric validity checks
  const angles = interiorAnglesDeg(quad);
  if (angles.some((a) => a < 46 || a > 134)) {
    return null;
  }

  const quadAreaRatio = polygonArea([
    quad.topLeft,
    quad.topRight,
    quad.bottomRight,
    quad.bottomLeft,
  ]);
  if (quadAreaRatio < 0.14 || quadAreaRatio > 0.95) {
    return null;
  }

  const topLenPx = dist(
    { x: quad.topLeft.x * srcW, y: quad.topLeft.y * srcH },
    { x: quad.topRight.x * srcW, y: quad.topRight.y * srcH }
  );
  const botLenPx = dist(
    { x: quad.bottomLeft.x * srcW, y: quad.bottomLeft.y * srcH },
    { x: quad.bottomRight.x * srcW, y: quad.bottomRight.y * srcH }
  );
  const leftLenPx = dist(
    { x: quad.topLeft.x * srcW, y: quad.topLeft.y * srcH },
    { x: quad.bottomLeft.x * srcW, y: quad.bottomLeft.y * srcH }
  );
  const rightLenPx = dist(
    { x: quad.topRight.x * srcW, y: quad.topRight.y * srcH },
    { x: quad.bottomRight.x * srcW, y: quad.bottomRight.y * srcH }
  );

  const estW = Math.max(topLenPx, botLenPx);
  const estH = Math.max(leftLenPx, rightLenPx);
  const aspect = estW / Math.max(1, estH);
  if (aspect < 0.42 || aspect > 2.45) {
    return null;
  }

  // Decide whether perspective warp / background crop is actually meaningful
  const topAngle = Math.atan2(
    (quad.topRight.y - quad.topLeft.y) * srcH,
    (quad.topRight.x - quad.topLeft.x) * srcW
  );
  const botAngle = Math.atan2(
    (quad.bottomRight.y - quad.bottomLeft.y) * srcH,
    (quad.bottomRight.x - quad.bottomLeft.x) * srcW
  );
  const leftAngle = Math.atan2(
    (quad.bottomLeft.y - quad.topLeft.y) * srcH,
    (quad.bottomLeft.x - quad.topLeft.x) * srcW
  );
  const rightAngle = Math.atan2(
    (quad.bottomRight.y - quad.topRight.y) * srcH,
    (quad.bottomRight.x - quad.topRight.x) * srcW
  );

  const radToDeg = 180 / Math.PI;
  const trapezoidDeltaDeg = Math.max(
    Math.abs((topAngle - botAngle) * radToDeg),
    Math.abs((leftAngle - rightAngle) * radToDeg)
  );
  const lenSkewRatio = Math.max(
    Math.abs(topLenPx - botLenPx) / Math.max(1, estW),
    Math.abs(leftLenPx - rightLenPx) / Math.max(1, estH)
  );
  const tiltDeg = Math.max(
    Math.abs(topAngle * radToDeg),
    Math.abs(botAngle * radToDeg)
  );

  const insetCornersCount = [
    quad.topLeft,
    quad.topRight,
    quad.bottomRight,
    quad.bottomLeft,
  ].filter((p) => p.x > 0.03 && p.x < 0.97 && p.y > 0.03 && p.y < 0.97).length;

  const hasPerspectiveSkew =
    trapezoidDeltaDeg >= 1.8 || lenSkewRatio >= 0.04 || tiltDeg >= 2.2;
  const hasSignificantBackgroundCrop =
    quadAreaRatio <= 0.86 && insetCornersCount >= 3;

  if (!hasPerspectiveSkew && !hasSignificantBackgroundCrop) {
    return null;
  }

  return {
    applied: true,
    autoDetected: true,
    corners: quad,
    sourceQuadAreaRatio: Math.round(quadAreaRatio * 1000) / 1000,
  };
}

/**
 * Solves an 8x8 linear system A * x = b via Gaussian elimination with partial pivoting
 * to find the 3x3 planar homography mapping dst (u, v) -> src (x, y).
 */
function solveHomography(
  srcPts: [Point2D, Point2D, Point2D, Point2D],
  dstPts: [Point2D, Point2D, Point2D, Point2D]
): Float64Array {
  const A: number[][] = [];
  const b: number[] = [];

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
      [A[col], A[pivotRow]] = [A[pivotRow], A[col]];
      [b[col], b[pivotRow]] = [b[pivotRow], b[col]];
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

/**
 * Applies exact 4-corner homography perspective rectification using bilinear interpolation
 * and returns a crisp rectangular canvas sized for high-accuracy OCR.
 */
export function warpDocumentPerspective(
  source: HTMLImageElement | HTMLCanvasElement,
  corners: DocumentQuad
): HTMLCanvasElement {
  const natW = source instanceof HTMLImageElement ? source.naturalWidth || source.width : source.width;
  const natH = source instanceof HTMLImageElement ? source.naturalHeight || source.height : source.height;

  // Render source onto an accessible canvas capped at 2400px max dim for fast bilinear sampling
  const srcScale = Math.min(1, 2400 / Math.max(1, natW, natH));
  const sw = Math.max(1, Math.round(natW * srcScale));
  const sh = Math.max(1, Math.round(natH * srcScale));

  const srcCanvas = document.createElement('canvas');
  srcCanvas.width = sw;
  srcCanvas.height = sh;
  const sCtx = srcCanvas.getContext('2d', { willReadFrequently: true });
  if (!sCtx) throw new Error('2D canvas context unavailable');
  sCtx.drawImage(source, 0, 0, sw, sh);
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

  // Normalize output resolution into [1500..2100] longest/width range for crisp OCR
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

  const outCanvas = document.createElement('canvas');
  outCanvas.width = outW;
  outCanvas.height = outH;
  const oCtx = outCanvas.getContext('2d', { willReadFrequently: true });
  if (!oCtx) throw new Error('2D canvas context unavailable');

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
  return outCanvas;
}
