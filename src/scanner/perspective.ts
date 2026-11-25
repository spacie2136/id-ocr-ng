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
 * Signed margin test: returns true if point (px, py) lies inside the convex quad
 * OR within `marginPx` outside any edge. Works regardless of clockwise/CCW ring winding.
 */
function isNearOrInsideConvexQuad(
  px: number,
  py: number,
  ringPx: [Point2D, Point2D, Point2D, Point2D],
  marginPx: number
): boolean {
  let sign = 0;
  let minDist = Infinity;
  let inside = true;

  for (let i = 0; i < 4; i++) {
    const a = ringPx[i];
    const b = ringPx[(i + 1) % 4];
    const c = (b.x - a.x) * (py - a.y) - (b.y - a.y) * (px - a.x);
    if (Math.abs(c) > 1e-5) {
      const s = c > 0 ? 1 : -1;
      if (sign === 0) sign = s;
      else if (s !== sign) inside = false;
    }
    const segD = pointToSegmentDistance({ x: px, y: py }, a, b).d;
    if (segD < minDist) minDist = segD;
  }

  return inside || minDist <= marginPx;
}

/**
 * Evaluates whether a quad side is genuinely supported by a continuous edge gradient
 * ridge in the image along its interior span, rather than slicing arbitrarily across a page.
 */
function computeSideEdgeSupport(
  aPx: Point2D,
  bPx: Point2D,
  edge: Float32Array,
  w: number,
  h: number
): number {
  const dx = bPx.x - aPx.x;
  const dy = bPx.y - aPx.y;
  const len = Math.hypot(dx, dy);
  if (len < 12) return 0;

  const nx = -dy / len;
  const ny = dx / len;
  const steps = Math.min(48, Math.max(18, Math.round(len * 0.4)));
  let hits = 0;

  for (let s = 0; s < steps; s++) {
    const t = 0.08 + (0.84 * s) / Math.max(1, steps - 1);
    const sx = aPx.x + dx * t;
    const sy = aPx.y + dy * t;
    let bestEdge = 0;

    for (let off = -3; off <= 3; off += 1) {
      const rx = Math.round(sx + nx * off);
      const ry = Math.round(sy + ny * off);
      if (rx >= 1 && rx < w - 1 && ry >= 1 && ry < h - 1) {
        const val = edge[ry * w + rx];
        if (val > bestEdge) bestEdge = val;
      }
    }

    if (bestEdge >= 8.2) {
      hits++;
    }
  }

  return hits / steps;
}

/**
 * Pure-JS 4-corner document quadrilateral detector.
 * Returns null if the image is already a tightly cropped / full-bleed flat scan
 * (or if no reliable document quad exists) so flat scans and MRZ zones are never over-cropped.
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

  // 3x3 lightly smoothed R, G, B & luminance suppresses camera sensor noise and wood grain
  // while keeping background homogeneity intact.
  const smoothR = new Float32Array(nPix);
  const smoothG = new Float32Array(nPix);
  const smoothB = new Float32Array(nPix);
  const smoothLum = new Float32Array(nPix);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let sr = 0;
      let sg = 0;
      let sb = 0;
      let cnt = 0;
      for (let dy = -1; dy <= 1; dy++) {
        const yy = y + dy;
        if (yy < 0 || yy >= h) continue;
        for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx;
          if (xx < 0 || xx >= w) continue;
          const o = (yy * w + xx) * 4;
          sr += rgba[o];
          sg += rgba[o + 1];
          sb += rgba[o + 2];
          cnt++;
        }
      }
      const p = y * w + x;
      const r = sr / cnt;
      const g = sg / cnt;
      const b = sb / cnt;
      smoothR[p] = r;
      smoothG[p] = g;
      smoothB[p] = b;
      smoothLum[p] = 0.299 * r + 0.587 * g + 0.114 * b;
    }
  }

  // Smoothed Sobel gradient + weighted unblurred max-RGB step gradient:
  // keeps subtle 1px card edges on light desks sharp while ignoring single-pixel noise.
  const smoothGrad = new Float32Array(nPix);
  const smoothRgbEdge = new Float32Array(nPix);
  const edge = new Float32Array(nPix);

  const sobelMax = (arr: Float32Array, rowM: number, row0: number, rowP: number, x: number) => {
    const gx =
      -arr[rowM + x - 1] +
      arr[rowM + x + 1] -
      2 * arr[row0 + x - 1] +
      2 * arr[row0 + x + 1] -
      arr[rowP + x - 1] +
      arr[rowP + x + 1];
    const gy =
      -arr[rowM + x - 1] -
      2 * arr[rowM + x] -
      arr[rowM + x + 1] +
      arr[rowP + x - 1] +
      2 * arr[rowP + x] +
      arr[rowP + x + 1];
    return Math.hypot(gx, gy) * 0.25;
  };

  for (let y = 1; y < h - 1; y++) {
    const rowM = (y - 1) * w;
    const row0 = y * w;
    const rowP = (y + 1) * w;
    for (let x = 1; x < w - 1; x++) {
      const idx = row0 + x;
      const lg = sobelMax(smoothLum, rowM, row0, rowP, x);
      const rg = sobelMax(smoothR, rowM, row0, rowP, x);
      const gg = sobelMax(smoothG, rowM, row0, rowP, x);
      const bg = sobelMax(smoothB, rowM, row0, rowP, x);
      const sEdge = Math.max(lg, rg, gg, bg);

      let rawMaxG = 0;
      const iTL = (rowM + x - 1) * 4;
      const iT = (rowM + x) * 4;
      const iTR = (rowM + x + 1) * 4;
      const iL = (row0 + x - 1) * 4;
      const iR = (row0 + x + 1) * 4;
      const iBL = (rowP + x - 1) * 4;
      const iB = (rowP + x) * 4;
      const iBR = (rowP + x + 1) * 4;

      for (let c = 0; c < 3; c++) {
        const cx =
          -rgba[iTL + c] +
          rgba[iTR + c] -
          2 * rgba[iL + c] +
          2 * rgba[iR + c] -
          rgba[iBL + c] +
          rgba[iBR + c];
        const cy =
          -rgba[iTL + c] -
          2 * rgba[iT + c] -
          rgba[iTR + c] +
          rgba[iBL + c] +
          2 * rgba[iB + c] +
          rgba[iBR + c];
        const cg = Math.hypot(cx, cy) * 0.25;
        if (cg > rawMaxG) rawMaxG = cg;
      }

      smoothGrad[idx] = lg;
      smoothRgbEdge[idx] = sEdge;
      edge[idx] = Math.max(sEdge, rawMaxG * 0.72);
    }
  }

  // Sample all 4 border strips individually to test whether a consistent desk/table
  // background actually surrounds the document rather than full-bleed printing.
  interface BorderSample {
    r: number;
    g: number;
    b: number;
    grad: number;
    side: 0 | 1 | 2 | 3; // 0=top, 1=right, 2=bottom, 3=left
  }
  const borderSamples: BorderSample[] = [];
  const pushBorderSample = (idx: number, side: 0 | 1 | 2 | 3) => {
    borderSamples.push({
      r: smoothR[idx],
      g: smoothG[idx],
      b: smoothB[idx],
      grad: smoothGrad[idx],
      side,
    });
  };

  for (let x = 2; x < w - 2; x += 2) {
    pushBorderSample(2 * w + x, 0);
    pushBorderSample((h - 3) * w + x, 2);
  }
  for (let y = 2; y < h - 2; y += 2) {
    pushBorderSample(y * w + (w - 3), 1);
    pushBorderSample(y * w + 2, 3);
  }

  const smoothBorder = borderSamples.filter((s) => s.grad < 10.5);
  if (smoothBorder.length < borderSamples.length * 0.45) {
    return null;
  }

  // Find median RGB of smooth border pixels
  const rs = smoothBorder.map((s) => s.r).sort((a, b) => a - b);
  const gs = smoothBorder.map((s) => s.g).sort((a, b) => a - b);
  const bs = smoothBorder.map((s) => s.b).sort((a, b) => a - b);
  const bgR = rs[Math.floor(rs.length / 2)];
  const bgG = gs[Math.floor(gs.length / 2)];
  const bgB = bs[Math.floor(bs.length / 2)];

  const sideTotals = [0, 0, 0, 0];
  const sideMatches = [0, 0, 0, 0];
  let totalBgMatches = 0;

  for (const s of borderSamples) {
    sideTotals[s.side]++;
    const diff = Math.max(Math.abs(s.r - bgR), Math.abs(s.g - bgG), Math.abs(s.b - bgB));
    if (s.grad < 12 && diff < 44) {
      sideMatches[s.side]++;
      totalBgMatches++;
    }
  }

  const sideMatchRatios = sideTotals.map((tot, i) => (tot > 0 ? sideMatches[i] / tot : 0));
  const bgSidesCount = sideMatchRatios.filter((r) => r >= 0.45).length;
  const strongBgSides = sideMatchRatios.filter((r) => r >= 0.65).length;
  const overallBgRatio = totalBgMatches / Math.max(1, borderSamples.length);

  // Full-bleed passports (like a bottom cream MRZ margin + blue top + portrait left) only match
  // background on 1-2 sides. A framed/skewed photo on a desk has background on >=3 sides.
  if (bgSidesCount < 3 || (strongBgSides < 2 && overallBgRatio < 0.68)) {
    return null;
  }

  // Precompute anti-pinhole edge ridge mask: blocks strong edges (>= 9.5) AND pixels (>= 6.5)
  // sandwiched inside >= 2 strong 8-connected edge neighbors so 1px anti-aliased corner gaps
  // cannot leak flood-fill into cream MRZ paper on light-colored desks.
  const strongBarrier = new Uint8Array(nPix);
  for (let i = 0; i < nPix; i++) {
    if (edge[i] >= 9.5) strongBarrier[i] = 1;
  }
  const barrierMask = new Uint8Array(strongBarrier);
  for (let y = 1; y < h - 1; y++) {
    const rowM = (y - 1) * w;
    const row0 = y * w;
    const rowP = (y + 1) * w;
    for (let x = 1; x < w - 1; x++) {
      const idx = row0 + x;
      if (barrierMask[idx] || edge[idx] < 6.5) continue;
      const edgeNeighbors =
        strongBarrier[rowM + x - 1] +
        strongBarrier[rowM + x] +
        strongBarrier[rowM + x + 1] +
        strongBarrier[row0 + x - 1] +
        strongBarrier[row0 + x + 1] +
        strongBarrier[rowP + x - 1] +
        strongBarrier[rowP + x] +
        strongBarrier[rowP + x + 1];
      if (edgeNeighbors >= 2) {
        barrierMask[idx] = 1;
      }
    }
  }

  // Flood-fill background from perimeter seeds using smoothed colors so camera grain on desks
  // traverses cleanly while document border edges stop the fill tightly.
  const bgMask = new Uint8Array(nPix);
  const queue = new Int32Array(nPix);
  let qHead = 0;
  let qTail = 0;

  const colorDistToBg = (pixIdx: number) =>
    Math.max(
      Math.abs(smoothR[pixIdx] - bgR),
      Math.abs(smoothG[pixIdx] - bgG),
      Math.abs(smoothB[pixIdx] - bgB)
    );

  const trySeed = (pixIdx: number) => {
    if (bgMask[pixIdx] || barrierMask[pixIdx]) return;
    if (edge[pixIdx] < 10.5 && colorDistToBg(pixIdx) < 42) {
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

  const maxBgColorShift = 46;
  const stepColorJump = 14;

  while (qHead < qTail) {
    const curr = queue[qHead++];
    const cx = curr % w;
    const cy = (curr / w) | 0;
    const cr = smoothR[curr];
    const cg = smoothG[curr];
    const cb = smoothB[curr];

    const neighbors = [
      cx > 0 ? curr - 1 : -1,
      cx < w - 1 ? curr + 1 : -1,
      cy > 0 ? curr - w : -1,
      cy < h - 1 ? curr + w : -1,
    ];

    for (let k = 0; k < 4; k++) {
      const nxt = neighbors[k];
      if (nxt < 0 || bgMask[nxt] || barrierMask[nxt]) continue;

      const stepDelta = Math.max(
        Math.abs(smoothR[nxt] - cr),
        Math.abs(smoothG[nxt] - cg),
        Math.abs(smoothB[nxt] - cb)
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
  if (rawAreaRatio < 0.14 || rawAreaRatio > 0.93) {
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
  if (quadAreaRatio < 0.14 || quadAreaRatio > 0.93) {
    return null;
  }

  // Guard 1: Reject frame-hugging partial cuts (e.g. top+left+right hugging borders while slicing MRZ)
  const borderTol = 0.028;
  const nearTop = (p: Point2D) => p.y <= borderTol;
  const nearRight = (p: Point2D) => p.x >= 1 - borderTol;
  const nearBottom = (p: Point2D) => p.y >= 1 - borderTol;
  const nearLeft = (p: Point2D) => p.x <= borderTol;

  const sideHugsFrame = [
    nearTop(quad.topLeft) && nearTop(quad.topRight),
    nearRight(quad.topRight) && nearRight(quad.bottomRight),
    nearBottom(quad.bottomRight) && nearBottom(quad.bottomLeft),
    nearLeft(quad.bottomLeft) && nearLeft(quad.topLeft),
  ];
  const frameHuggingSides = sideHugsFrame.filter(Boolean).length;

  const insetCornersCount = [
    quad.topLeft,
    quad.topRight,
    quad.bottomRight,
    quad.bottomLeft,
  ].filter(
    (p) => p.x > 0.028 && p.x < 0.972 && p.y > 0.028 && p.y < 0.972
  ).length;

  if (frameHuggingSides >= 2 || insetCornersCount < 2) {
    return null;
  }

  // Guard 2: Verify every interior quad side follows a real collinear physical edge
  const ringPx: [Point2D, Point2D, Point2D, Point2D] = [
    { x: quad.topLeft.x * w, y: quad.topLeft.y * h },
    { x: quad.topRight.x * w, y: quad.topRight.y * h },
    { x: quad.bottomRight.x * w, y: quad.bottomRight.y * h },
    { x: quad.bottomLeft.x * w, y: quad.bottomLeft.y * h },
  ];

  const interiorEdgeSupports: number[] = [];
  for (let i = 0; i < 4; i++) {
    if (sideHugsFrame[i]) continue;
    const sup = computeSideEdgeSupport(ringPx[i], ringPx[(i + 1) % 4], edge, w, h);
    interiorEdgeSupports.push(sup);
  }
  if (interiorEdgeSupports.length > 0) {
    const minEdgeSup = Math.min(...interiorEdgeSupports);
    const meanEdgeSup =
      interiorEdgeSupports.reduce((s, v) => s + v, 0) / interiorEdgeSupports.length;
    if (minEdgeSup < 0.42 || meanEdgeSup < 0.56) {
      return null;
    }
  }

  // Guard 3: Excluded-region ink & disconnected glyph-island check using smoothed pixels so
  // camera sensor grain / wood desk texture passes cleanly while cropped MRZ text/ink is rejected.
  const marginPx = 3.5;
  const outsideVisited = new Uint8Array(nPix);
  const bgLum = 0.299 * bgR + 0.587 * bgG + 0.114 * bgB;
  let outsidePixels = 0;
  let outsideHighContrastEdges = 0;
  let outsideDarkInk = 0;
  let outsideFgComponents = 0;

  for (let y = 1; y < h - 1; y++) {
    const rowOff = y * w;
    for (let x = 1; x < w - 1; x++) {
      const idx = rowOff + x;
      if (isNearOrInsideConvexQuad(x, y, ringPx, marginPx)) continue;

      outsidePixels++;
      const gVal = smoothRgbEdge[idx];
      const bgDiff = colorDistToBg(idx);
      const lumDiff = bgLum - smoothLum[idx];

      if (gVal >= 14 && bgDiff >= 24) {
        outsideHighContrastEdges++;
      }
      if (lumDiff >= 38 && gVal >= 10) {
        outsideDarkInk++;
      }

      if (!bgMask[idx] && !outsideVisited[idx]) {
        // Count compact disconnected foreground islands strictly outside the expanded quad
        let head = 0;
        let tail = 0;
        outsideVisited[idx] = 1;
        compQueue[tail++] = idx;
        let strongCount = 0;

        while (head < tail) {
          const curr = compQueue[head++];
          if (smoothRgbEdge[curr] >= 10 || colorDistToBg(curr) >= 32) {
            strongCount++;
          }
          const cx = curr % w;
          const cy = (curr / w) | 0;
          const nbrs = [
            cx > 1 ? curr - 1 : -1,
            cx < w - 2 ? curr + 1 : -1,
            cy > 1 ? curr - w : -1,
            cy < h - 2 ? curr + w : -1,
          ];
          for (let k = 0; k < 4; k++) {
            const nxt = nbrs[k];
            if (
              nxt >= 0 &&
              !bgMask[nxt] &&
              !outsideVisited[nxt] &&
              !isNearOrInsideConvexQuad(nxt % w, (nxt / w) | 0, ringPx, marginPx)
            ) {
              outsideVisited[nxt] = 1;
              compQueue[tail++] = nxt;
            }
          }
        }

        if (tail >= 3 && strongCount >= 3) {
          outsideFgComponents++;
        }
      }
    }
  }

  if (outsidePixels > 0) {
    const outsideEdgeRatio = outsideHighContrastEdges / outsidePixels;
    if (
      outsideFgComponents >= 7 ||
      outsideDarkInk >= Math.max(24, Math.round(nPix * 0.0025)) ||
      outsideEdgeRatio > 0.015 ||
      outsideHighContrastEdges > Math.max(48, Math.round(nPix * 0.0055))
    ) {
      return null;
    }
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

  const hasPerspectiveSkew =
    trapezoidDeltaDeg >= 1.8 || lenSkewRatio >= 0.04 || tiltDeg >= 2.2;
  const hasSignificantBackgroundCrop =
    quadAreaRatio <= 0.88 && insetCornersCount >= 3;

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
