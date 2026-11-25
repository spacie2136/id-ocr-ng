export interface OrientationAnalysis {
  /** Fine clockwise angle in degrees ([-45, 45]) needed to align text lines to horizontal/vertical axes */
  deskewDegrees: number;
  /** Candidate coarse clockwise rotations ordered from most likely upright to least likely */
  rankedCoarseRotations: Array<0 | 90 | 180 | 270>;
  /** Ratio comparing dominant axis projection strength vs secondary axis */
  axisConfidence: number;
  /** Where an MRZ-like wide monospace text band appears before coarse rotation */
  mrzEdgeHint: 'bottom' | 'top' | 'left' | 'right' | 'none';
}

interface InkSample {
  dx: number;
  dy: number;
  weight: number;
}

function buildIntegralImage(gray: Uint8ClampedArray, width: number, height: number): Float64Array {
  const stride = width + 1;
  const integral = new Float64Array(stride * (height + 1));
  for (let y = 1; y <= height; y++) {
    let rowSum = 0;
    const srcOffset = (y - 1) * width;
    const dstOffset = y * stride;
    const prevOffset = (y - 1) * stride;
    for (let x = 1; x <= width; x++) {
      rowSum += gray[srcOffset + x - 1];
      integral[dstOffset + x] = integral[prevOffset + x] + rowSum;
    }
  }
  return integral;
}

function extractInkSamples(
  gray: Uint8ClampedArray,
  width: number,
  height: number
): InkSample[] {
  const integral = buildIntegralImage(gray, width, height);
  const stride = width + 1;
  const radius = Math.max(3, Math.round(Math.min(width, height) / 70));

  const marginX = Math.max(2, Math.floor(width * 0.025));
  const marginY = Math.max(2, Math.floor(height * 0.025));
  const halfW = width / 2;
  const halfH = height / 2;

  const rawPoints: InkSample[] = [];

  for (let y = marginY; y < height - marginY; y++) {
    const y0 = Math.max(0, y - radius);
    const y1 = Math.min(height, y + radius + 1);
    const rowTop = y0 * stride;
    const rowBot = y1 * stride;
    const rowOffset = y * width;

    for (let x = marginX; x < width - marginX; x++) {
      const lum = gray[rowOffset + x];
      if (lum > 218) continue;

      const x0 = Math.max(0, x - radius);
      const x1 = Math.min(width, x + radius + 1);
      const area = (x1 - x0) * (y1 - y0);
      const localSum =
        integral[rowBot + x1] -
        integral[rowTop + x1] -
        integral[rowBot + x0] +
        integral[rowTop + x0];
      const localMean = localSum / area;
      const contrast = localMean - lum;

      if (contrast >= 14) {
        rawPoints.push({
          dx: x - halfW,
          dy: y - halfH,
          weight: Math.min(4, contrast / 16),
        });
      }
    }
  }

  // Fallback for low-contrast / washed-out scans
  if (rawPoints.length < 120) {
    for (let y = marginY; y < height - marginY; y += 2) {
      const y0 = Math.max(0, y - radius);
      const y1 = Math.min(height, y + radius + 1);
      const rowTop = y0 * stride;
      const rowBot = y1 * stride;
      const rowOffset = y * width;
      for (let x = marginX; x < width - marginX; x += 2) {
        const lum = gray[rowOffset + x];
        if (lum > 230) continue;
        const x0 = Math.max(0, x - radius);
        const x1 = Math.min(width, x + radius + 1);
        const area = (x1 - x0) * (y1 - y0);
        const localSum =
          integral[rowBot + x1] -
          integral[rowTop + x1] -
          integral[rowBot + x0] +
          integral[rowTop + x0];
        const contrast = localSum / area - lum;
        if (contrast >= 7) {
          rawPoints.push({
            dx: x - halfW,
            dy: y - halfH,
            weight: Math.min(3, contrast / 12),
          });
        }
      }
    }
  }

  const maxSamples = 4500;
  if (rawPoints.length <= maxSamples) return rawPoints;

  const sampled: InkSample[] = [];
  const step = rawPoints.length / maxSamples;
  for (let i = 0; i < maxSamples; i++) {
    sampled.push(rawPoints[Math.floor(i * step)]);
  }
  return sampled;
}

function scoreProjectionAngle(
  samples: InkSample[],
  angleDeg: number,
  binSize: number,
  maxRadius: number
): { hScore: number; vScore: number } {
  const rad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const numBins = Math.ceil((maxRadius * 2) / binSize) + 4;
  const offset = Math.floor(numBins / 2);
  const hBins = new Float32Array(numBins);
  const vBins = new Float32Array(numBins);

  for (let i = 0; i < samples.length; i++) {
    const s = samples[i];
    // Canvas clockwise rotation by -angleDeg maps (dx, dy) to:
    //   u =  dx * cos + dy * sin
    //   v = -dx * sin + dy * cos
    const u = s.dx * cos + s.dy * sin;
    const v = -s.dx * sin + s.dy * cos;

    const vIdx = Math.round(v / binSize) + offset;
    if (vIdx >= 0 && vIdx < numBins) {
      hBins[vIdx] += s.weight;
    }

    const uIdx = Math.round(u / binSize) + offset;
    if (uIdx >= 0 && uIdx < numBins) {
      vBins[uIdx] += s.weight;
    }
  }

  let hEnergy = 0;
  let vEnergy = 0;
  for (let b = 0; b < numBins; b++) {
    const hv = hBins[b];
    const vv = vBins[b];
    hEnergy += hv * hv;
    vEnergy += vv * vv;
  }

  return { hScore: hEnergy, vScore: vEnergy };
}

function computeEdgeBandScore(
  samples: InkSample[],
  deskewDegrees: number,
  width: number,
  height: number
): {
  bottom: number;
  top: number;
  right: number;
  left: number;
  hint: 'bottom' | 'top' | 'left' | 'right' | 'none';
} {
  const rad = (deskewDegrees * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const rotW = Math.abs(width * cos) + Math.abs(height * sin);
  const rotH = Math.abs(width * sin) + Math.abs(height * cos);
  const halfRotW = rotW / 2;
  const halfRotH = rotH / 2;

  const slices = 40;
  const buckets = 48;

  const hGrid = Array.from({ length: slices }, () => new Uint8Array(buckets));
  const vGrid = Array.from({ length: slices }, () => new Uint8Array(buckets));
  const hWeights = new Float32Array(slices);
  const vWeights = new Float32Array(slices);

  for (let i = 0; i < samples.length; i++) {
    const s = samples[i];
    const rx = s.dx * cos - s.dy * sin + halfRotW;
    const ry = s.dx * sin + s.dy * cos + halfRotH;
    const nx = rx / Math.max(1, rotW);
    const ny = ry / Math.max(1, rotH);
    if (nx < 0 || nx >= 1 || ny < 0 || ny >= 1) continue;

    const sy = Math.min(slices - 1, Math.floor(ny * slices));
    const bx = Math.min(buckets - 1, Math.floor(nx * buckets));
    hGrid[sy][bx] = 1;
    hWeights[sy] += s.weight;

    const sx = Math.min(slices - 1, Math.floor(nx * slices));
    const by = Math.min(buckets - 1, Math.floor(ny * buckets));
    vGrid[sx][by] = 1;
    vWeights[sx] += s.weight;
  }

  const scoreEdgeBand = (
    grid: Uint8Array[],
    weights: Float32Array,
    fromSlice: number,
    toSlice: number
  ): number => {
    let best = 0;
    let wideCount = 0;
    for (let s = fromSlice; s <= toSlice; s++) {
      let cov = 0;
      for (let b = 0; b < buckets; b++) cov += grid[s][b];
      const covFrac = cov / buckets;
      if (covFrac >= 0.42) {
        wideCount++;
        const sliceScore = covFrac * weights[s];
        if (sliceScore > best) best = sliceScore;
      }
    }
    return best * (1 + Math.min(wideCount, 6) * 0.22);
  };

  // Top edge (0..34%) vs Bottom edge (66..99%)
  const top = scoreEdgeBand(hGrid, hWeights, 1, Math.floor(slices * 0.34));
  const bottom = scoreEdgeBand(hGrid, hWeights, Math.floor(slices * 0.66), slices - 1);

  // Left edge (0..34%) vs Right edge (66..99%)
  const left = scoreEdgeBand(vGrid, vWeights, 1, Math.floor(slices * 0.34));
  const right = scoreEdgeBand(vGrid, vWeights, Math.floor(slices * 0.66), slices - 1);

  const maxEdge = Math.max(top, bottom, left, right);
  let hint: 'bottom' | 'top' | 'left' | 'right' | 'none' = 'none';
  if (maxEdge > 0) {
    if (bottom === maxEdge) hint = 'bottom';
    else if (top === maxEdge) hint = 'top';
    else if (right === maxEdge) hint = 'right';
    else if (left === maxEdge) hint = 'left';
  }

  return { bottom, top, right, left, hint };
}

/**
 * Pure-JS pixel geometry analyzer that estimates fine skew angle ([-45°, +45°])
 * and ranks the 4 coarse clockwise rotations (0, 90, 180, 270) by text-line axis
 * sharpness and MRZ edge localization.
 */
export function analyzeDocumentOrientation(
  gray: Uint8ClampedArray,
  width: number,
  height: number
): OrientationAnalysis {
  if (width < 24 || height < 24 || gray.length < width * height) {
    return {
      deskewDegrees: 0,
      rankedCoarseRotations: [0, 180, 90, 270],
      axisConfidence: 1,
      mrzEdgeHint: 'none',
    };
  }

  const samples = extractInkSamples(gray, width, height);
  if (samples.length < 40) {
    return {
      deskewDegrees: 0,
      rankedCoarseRotations: [0, 180, 90, 270],
      axisConfidence: 1,
      mrzEdgeHint: 'none',
    };
  }

  const maxRadius = Math.hypot(width / 2, height / 2);
  const binSize = Math.max(2, Math.round(Math.min(width, height) / 130));

  let bestHAngle = 0;
  let bestHScore = -1;
  let bestVAngle = 0;
  let bestVScore = -1;

  for (let angle = -45; angle <= 44; angle += 1.5) {
    const { hScore, vScore } = scoreProjectionAngle(samples, angle, binSize, maxRadius);
    if (hScore > bestHScore) {
      bestHScore = hScore;
      bestHAngle = angle;
    }
    if (vScore > bestVScore) {
      bestVScore = vScore;
      bestVAngle = angle;
    }
  }

  // Fine refinement around winning coarse peak
  const primarySeed = bestHScore >= bestVScore ? bestHAngle : bestVAngle;
  let refinedHAngle = bestHAngle;
  let refinedHScore = bestHScore;
  let refinedVAngle = bestVAngle;
  let refinedVScore = bestVScore;

  for (let delta = -1.8; delta <= 1.801; delta += 0.2) {
    const cand = primarySeed + delta;
    if (cand < -45 || cand > 45) continue;
    const { hScore, vScore } = scoreProjectionAngle(samples, cand, binSize, maxRadius);
    if (hScore > refinedHScore) {
      refinedHScore = hScore;
      refinedHAngle = cand;
    }
    if (vScore > refinedVScore) {
      refinedVScore = vScore;
      refinedVAngle = cand;
    }
  }

  const horizontalDominant = refinedHScore >= refinedVScore;
  const winningTheta = horizontalDominant ? refinedHAngle : refinedVAngle;

  // Rotating canvas clockwise by -winningTheta levels the text lines onto 0°/90° axes
  let deskewDegrees = Math.round(-winningTheta * 10) / 10;
  if (Math.abs(deskewDegrees) < 0.7) {
    deskewDegrees = 0;
  }

  const axisConfidence =
    Math.max(refinedHScore, refinedVScore) /
    Math.max(1, Math.min(refinedHScore, refinedVScore));

  const edge = computeEdgeBandScore(samples, deskewDegrees, width, height);

  // Build ordered list of coarse rotations [c0, c1, c2, c3]:
  // - If MRZ edge is on bottom -> upright is 0°
  // - If MRZ edge is on top -> upright is 180°
  // - If MRZ edge is on right -> +90° clockwise moves right edge to bottom
  // - If MRZ edge is on left -> +270° clockwise moves left edge to bottom
  const hPair: [0 | 180, 0 | 180] =
    edge.top > edge.bottom * 1.15 ? [180, 0] : [0, 180];
  const vPair: [90 | 270, 90 | 270] =
    edge.left > edge.right * 1.08 ? [270, 90] : [90, 270];

  const rankedCoarseRotations: Array<0 | 90 | 180 | 270> =
    refinedHScore >= refinedVScore
      ? [hPair[0], hPair[1], vPair[0], vPair[1]]
      : [vPair[0], vPair[1], hPair[0], hPair[1]];

  return {
    deskewDegrees,
    rankedCoarseRotations,
    axisConfidence,
    mrzEdgeHint: edge.hint,
  };
}
