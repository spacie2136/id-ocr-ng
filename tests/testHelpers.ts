import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export interface DecodedRgbaImage {
  width: number;
  height: number;
  data: Uint8ClampedArray;
}

const IMAGE_DIM_CACHE = new Map<string, { width: number; height: number }>();

export function resolveRepoPath(relPath: string): string {
  return path.resolve(process.cwd(), relPath);
}

export function loadImageRgbaFromFile(filePath: string): DecodedRgbaImage {
  const abs = path.resolve(filePath);
  const meta = execFileSync('identify', ['-format', '%w %h', abs], {
    encoding: 'utf8',
    maxBuffer: 1024 * 1024,
  })
    .trim()
    .split(/\s+/);
  const width = parseInt(meta[0] ?? '0', 10);
  const height = parseInt(meta[1] ?? '0', 10);
  if (!width || !height) {
    throw new Error(`Unable to inspect image dimensions for ${abs}`);
  }
  const rgbaBuf = execFileSync('convert', [abs, '-alpha', 'on', '-depth', '8', 'rgba:-'], {
    maxBuffer: Math.max(16 * 1024 * 1024, width * height * 4 + 4096),
  });
  return {
    width,
    height,
    data: new Uint8ClampedArray(rgbaBuf.buffer, rgbaBuf.byteOffset, width * height * 4),
  };
}

export function decodePngDataUrlToRgba(dataUrl: string): DecodedRgbaImage {
  const commaIdx = dataUrl.indexOf(',');
  const base64 = commaIdx >= 0 ? dataUrl.slice(commaIdx + 1) : dataUrl;
  const bin = Buffer.from(base64, 'base64');
  const tmpFile = path.join(
    os.tmpdir(),
    `docscan-decode-${process.pid}-${Math.random().toString(36).slice(2)}.img`
  );
  fs.writeFileSync(tmpFile, bin);
  try {
    return loadImageRgbaFromFile(tmpFile);
  } finally {
    try {
      fs.unlinkSync(tmpFile);
    } catch {
      // Ignore cleanup errors
    }
  }
}

export function encodeRgbaToPngBuffer(
  rgba: Uint8ClampedArray,
  width: number,
  height: number
): Buffer {
  return execFileSync(
    'convert',
    ['-size', `${width}x${height}`, '-depth', '8', 'rgba:-', 'png:-'],
    {
      input: Buffer.from(rgba.buffer, rgba.byteOffset, width * height * 4),
      maxBuffer: Math.max(16 * 1024 * 1024, width * height * 4 + 4096),
    }
  );
}

export function sampleDownscaledGrayFromRgba(
  rgba: Uint8ClampedArray,
  srcW: number,
  srcH: number,
  maxWidth: number
): { data: Uint8ClampedArray; width: number; height: number } {
  const scale = Math.min(1, maxWidth / Math.max(1, srcW));
  const w = Math.max(1, Math.round(srcW * scale));
  const h = Math.max(1, Math.round(srcH * scale));
  const data = new Uint8ClampedArray(w * h);

  for (let y = 0; y < h; y++) {
    const sy = Math.min(srcH - 1, Math.floor((y * srcH) / h));
    for (let x = 0; x < w; x++) {
      const sx = Math.min(srcW - 1, Math.floor((x * srcW) / w));
      const idx = (sy * srcW + sx) * 4;
      data[y * w + x] = Math.round(
        0.299 * rgba[idx] + 0.587 * rgba[idx + 1] + 0.114 * rgba[idx + 2]
      );
    }
  }

  return { data, width: w, height: h };
}

interface Matrix2D {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

class ShimImageData {
  readonly width: number;
  readonly height: number;
  readonly data: Uint8ClampedArray;

  constructor(data: Uint8ClampedArray | number, width?: number, height?: number) {
    if (typeof data === 'number') {
      this.width = data;
      this.height = width ?? 1;
      this.data = new Uint8ClampedArray(this.width * this.height * 4);
    } else {
      this.width = width ?? 1;
      this.height = height ?? Math.max(1, Math.floor(data.length / (4 * this.width)));
      this.data = data;
    }
  }
}

class ShimImage {
  private _src = '';
  crossOrigin: string | null = null;
  width = 0;
  height = 0;
  naturalWidth = 0;
  naturalHeight = 0;
  complete = false;
  onload: (() => void) | null = null;
  onerror: ((err?: unknown) => void) | null = null;
  _rgba: Uint8ClampedArray | null = null;

  get src(): string {
    return this._src;
  }

  set src(value: string) {
    this._src = value;
    if (!value) return;
    queueMicrotask(() => {
      try {
        const decoded = value.startsWith('data:')
          ? decodePngDataUrlToRgba(value)
          : loadImageRgbaFromFile(value);
        this.width = decoded.width;
        this.height = decoded.height;
        this.naturalWidth = decoded.width;
        this.naturalHeight = decoded.height;
        this._rgba = decoded.data;
        this.complete = true;
        this.onload?.();
      } catch (err) {
        this.onerror?.(err);
      }
    });
  }

  setSourceFromFile(filePath: string): void {
    const decoded = loadImageRgbaFromFile(filePath);
    this._src = filePath;
    this.width = decoded.width;
    this.height = decoded.height;
    this.naturalWidth = decoded.width;
    this.naturalHeight = decoded.height;
    this._rgba = decoded.data;
    this.complete = true;
    IMAGE_DIM_CACHE.set(filePath, { width: decoded.width, height: decoded.height });
  }
}

class ShimCanvasRenderingContext2D {
  fillStyle = '#000000';
  imageSmoothingEnabled = true;
  imageSmoothingQuality: ImageSmoothingQuality = 'high';
  private canvas: ShimCanvas;
  private matrix: Matrix2D = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
  private stack: Matrix2D[] = [];

  constructor(canvas: ShimCanvas) {
    this.canvas = canvas;
  }

  save(): void {
    this.stack.push({ ...this.matrix });
  }

  restore(): void {
    const prev = this.stack.pop();
    if (prev) this.matrix = prev;
  }

  translate(x: number, y: number): void {
    this.transform(1, 0, 0, 1, x, y);
  }

  scale(sx: number, sy: number): void {
    this.transform(sx, 0, 0, sy, 0, 0);
  }

  rotate(angle: number): void {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    this.transform(cos, sin, -sin, cos, 0, 0);
  }

  transform(a: number, b: number, c: number, d: number, e: number, f: number): void {
    const m = this.matrix;
    this.matrix = {
      a: m.a * a + m.c * b,
      b: m.b * a + m.d * b,
      c: m.a * c + m.c * d,
      d: m.b * c + m.d * d,
      e: m.a * e + m.c * f + m.e,
      f: m.b * e + m.d * f + m.f,
    };
  }

  fillRect(x: number, y: number, w: number, h: number): void {
    const hex = this.fillStyle.trim().toLowerCase();
    let r = 0;
    let g = 0;
    let b = 0;
    if (hex === '#ffffff' || hex === '#fff' || hex === 'white') {
      r = 255;
      g = 255;
      b = 255;
    } else if (/^#[0-9a-f]{6}$/.test(hex)) {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
    }

    const x0 = Math.max(0, Math.floor(x));
    const y0 = Math.max(0, Math.floor(y));
    const x1 = Math.min(this.canvas.width, Math.ceil(x + w));
    const y1 = Math.min(this.canvas.height, Math.ceil(y + h));
    const dst = this.canvas._data;

    for (let py = y0; py < y1; py++) {
      let off = (py * this.canvas.width + x0) * 4;
      for (let px = x0; px < x1; px++) {
        dst[off++] = r;
        dst[off++] = g;
        dst[off++] = b;
        dst[off++] = 255;
      }
    }
  }

  createImageData(w: number, h: number): ImageData {
    return new ShimImageData(w, h) as unknown as ImageData;
  }

  getImageData(sx: number, sy: number, sw: number, sh: number): ImageData {
    const out = new Uint8ClampedArray(sw * sh * 4);
    const src = this.canvas._data;
    const cw = this.canvas.width;
    const ch = this.canvas.height;
    const x0 = Math.round(sx);
    const y0 = Math.round(sy);

    for (let row = 0; row < sh; row++) {
      const yy = y0 + row;
      if (yy < 0 || yy >= ch) continue;
      for (let col = 0; col < sw; col++) {
        const xx = x0 + col;
        if (xx < 0 || xx >= cw) continue;
        const sOff = (yy * cw + xx) * 4;
        const dOff = (row * sw + col) * 4;
        out[dOff] = src[sOff];
        out[dOff + 1] = src[sOff + 1];
        out[dOff + 2] = src[sOff + 2];
        out[dOff + 3] = src[sOff + 3];
      }
    }
    return new ShimImageData(out, sw, sh) as unknown as ImageData;
  }

  putImageData(imgData: ImageData | ShimImageData, dx: number, dy: number): void {
    const sw = imgData.width;
    const sh = imgData.height;
    const src = imgData.data;
    const cw = this.canvas.width;
    const ch = this.canvas.height;
    const dst = this.canvas._data;
    const x0 = Math.round(dx);
    const y0 = Math.round(dy);

    for (let row = 0; row < sh; row++) {
      const yy = y0 + row;
      if (yy < 0 || yy >= ch) continue;
      for (let col = 0; col < sw; col++) {
        const xx = x0 + col;
        if (xx < 0 || xx >= cw) continue;
        const sOff = (row * sw + col) * 4;
        const dOff = (yy * cw + xx) * 4;
        dst[dOff] = src[sOff];
        dst[dOff + 1] = src[sOff + 1];
        dst[dOff + 2] = src[sOff + 2];
        dst[dOff + 3] = src[sOff + 3];
      }
    }
  }

  drawImage(
    image: unknown,
    a: number,
    b: number,
    c?: number,
    d?: number,
    e?: number,
    f?: number,
    g?: number,
    h?: number
  ): void {
    let srcData: Uint8ClampedArray | null = null;
    let srcW = 0;
    let srcH = 0;

    if (image instanceof ShimCanvas) {
      srcData = image._data;
      srcW = image.width;
      srcH = image.height;
    } else if (image instanceof ShimImage && image._rgba) {
      srcData = image._rgba;
      srcW = image.width;
      srcH = image.height;
    }
    if (!srcData || !srcW || !srcH) return;

    let sx = 0;
    let sy = 0;
    let sw = srcW;
    let sh = srcH;
    let dx = a;
    let dy = b;
    let dw = srcW;
    let dh = srcH;

    if (e !== undefined && f !== undefined && g !== undefined && h !== undefined) {
      sx = a;
      sy = b;
      sw = c ?? srcW;
      sh = d ?? srcH;
      dx = e;
      dy = f;
      dw = g;
      dh = h;
    } else if (c !== undefined && d !== undefined) {
      dw = c;
      dh = d;
    }

    const m = this.matrix;
    const isIdentity =
      Math.abs(m.a - 1) < 1e-6 &&
      Math.abs(m.b) < 1e-6 &&
      Math.abs(m.c) < 1e-6 &&
      Math.abs(m.d - 1) < 1e-6 &&
      Math.abs(m.e) < 1e-6 &&
      Math.abs(m.f) < 1e-6;

    const dst = this.canvas._data;
    const cw = this.canvas.width;
    const ch = this.canvas.height;

    if (isIdentity) {
      const startX = Math.max(0, Math.floor(dx));
      const startY = Math.max(0, Math.floor(dy));
      const endX = Math.min(cw - 1, Math.ceil(dx + dw - 1));
      const endY = Math.min(ch - 1, Math.ceil(dy + dh - 1));

      for (let py = startY; py <= endY; py++) {
        const uY = ((py + 0.5 - dy) / dh) * sh + sy - 0.5;
        const y0 = Math.max(0, Math.min(srcH - 1, Math.floor(uY)));
        const y1 = Math.min(srcH - 1, y0 + 1);
        const fy = Math.max(0, Math.min(1, uY - y0));

        for (let px = startX; px <= endX; px++) {
          const uX = ((px + 0.5 - dx) / dw) * sw + sx - 0.5;
          const x0 = Math.max(0, Math.min(srcW - 1, Math.floor(uX)));
          const x1 = Math.min(srcW - 1, x0 + 1);
          const fx = Math.max(0, Math.min(1, uX - x0));

          const i00 = (y0 * srcW + x0) * 4;
          const i10 = (y0 * srcW + x1) * 4;
          const i01 = (y1 * srcW + x0) * 4;
          const i11 = (y1 * srcW + x1) * 4;

          const w00 = (1 - fx) * (1 - fy);
          const w10 = fx * (1 - fy);
          const w01 = (1 - fx) * fy;
          const w11 = fx * fy;

          const dOff = (py * cw + px) * 4;
          dst[dOff] =
            srcData[i00] * w00 + srcData[i10] * w10 + srcData[i01] * w01 + srcData[i11] * w11;
          dst[dOff + 1] =
            srcData[i00 + 1] * w00 +
            srcData[i10 + 1] * w10 +
            srcData[i01 + 1] * w01 +
            srcData[i11 + 1] * w11;
          dst[dOff + 2] =
            srcData[i00 + 2] * w00 +
            srcData[i10 + 2] * w10 +
            srcData[i01 + 2] * w01 +
            srcData[i11 + 2] * w11;
          dst[dOff + 3] = 255;
        }
      }
      return;
    }

    const det = m.a * m.d - m.b * m.c;
    if (Math.abs(det) < 1e-10) return;
    const invA = m.d / det;
    const invB = -m.b / det;
    const invC = -m.c / det;
    const invD = m.a / det;
    const invE = (m.c * m.f - m.d * m.e) / det;
    const invF = (m.b * m.e - m.a * m.f) / det;

    for (let py = 0; py < ch; py++) {
      for (let px = 0; px < cw; px++) {
        const lx = invA * (px + 0.5) + invC * (py + 0.5) + invE;
        const ly = invB * (px + 0.5) + invD * (py + 0.5) + invF;
        if (lx < dx || lx >= dx + dw || ly < dy || ly >= dy + dh) continue;

        const uX = ((lx - dx) / dw) * sw + sx - 0.5;
        const uY = ((ly - dy) / dh) * sh + sy - 0.5;
        const x0 = Math.max(0, Math.min(srcW - 1, Math.floor(uX)));
        const y0 = Math.max(0, Math.min(srcH - 1, Math.floor(uY)));
        const x1 = Math.min(srcW - 1, x0 + 1);
        const y1 = Math.min(srcH - 1, y0 + 1);
        const fx = Math.max(0, Math.min(1, uX - x0));
        const fy = Math.max(0, Math.min(1, uY - y0));

        const i00 = (y0 * srcW + x0) * 4;
        const i10 = (y0 * srcW + x1) * 4;
        const i01 = (y1 * srcW + x0) * 4;
        const i11 = (y1 * srcW + x1) * 4;

        const w00 = (1 - fx) * (1 - fy);
        const w10 = fx * (1 - fy);
        const w01 = (1 - fx) * fy;
        const w11 = fx * fy;

        const dOff = (py * cw + px) * 4;
        dst[dOff] =
          srcData[i00] * w00 + srcData[i10] * w10 + srcData[i01] * w01 + srcData[i11] * w11;
        dst[dOff + 1] =
          srcData[i00 + 1] * w00 +
          srcData[i10 + 1] * w10 +
          srcData[i01 + 1] * w01 +
          srcData[i11 + 1] * w11;
        dst[dOff + 2] =
          srcData[i00 + 2] * w00 +
          srcData[i10 + 2] * w10 +
          srcData[i01 + 2] * w01 +
          srcData[i11 + 2] * w11;
        dst[dOff + 3] = 255;
      }
    }
  }
}

export class ShimCanvas {
  private _width = 1;
  private _height = 1;
  _data = new Uint8ClampedArray(4);
  private _ctx: ShimCanvasRenderingContext2D | null = null;

  get width(): number {
    return this._width;
  }

  set width(w: number) {
    this._width = Math.max(1, Math.floor(w));
    this._data = new Uint8ClampedArray(this._width * this._height * 4);
  }

  get height(): number {
    return this._height;
  }

  set height(h: number) {
    this._height = Math.max(1, Math.floor(h));
    this._data = new Uint8ClampedArray(this._width * this._height * 4);
  }

  getContext(type: string): ShimCanvasRenderingContext2D | null {
    if (type !== '2d') return null;
    if (!this._ctx) {
      this._ctx = new ShimCanvasRenderingContext2D(this);
    }
    return this._ctx;
  }

  toDataURL(_mime = 'image/png'): string {
    const png = encodeRgbaToPngBuffer(this._data, this._width, this._height);
    return `data:image/png;base64,${png.toString('base64')}`;
  }
}

let installedDomShim = false;

/**
 * Installs a lightweight pure-Node HTMLCanvasElement / Image / document shim backed by ImageMagick
 * so the real browser DocScanOCR pipeline can execute unaltered in Vitest without native addons.
 */
export function installNodeCanvasShim(): void {
  if (installedDomShim) return;
  installedDomShim = true;

  const g = globalThis as Record<string, unknown>;
  g.HTMLCanvasElement = ShimCanvas;
  g.HTMLImageElement = ShimImage;
  g.Image = ShimImage;
  g.ImageData = ShimImageData;
  g.document = {
    createElement: (tag: string) => {
      if (tag === 'canvas') return new ShimCanvas();
      return {};
    },
  };
}

export function loadFileAsCanvasInput(filePath: string): HTMLCanvasElement {
  installNodeCanvasShim();
  const decoded = loadImageRgbaFromFile(filePath);
  const canvas = new ShimCanvas();
  canvas.width = decoded.width;
  canvas.height = decoded.height;
  canvas._data.set(decoded.data);
  return canvas as unknown as HTMLCanvasElement;
}

export function loadFileAsImageInput(filePath: string): HTMLImageElement {
  installNodeCanvasShim();
  const img = new ShimImage();
  img.setSourceFromFile(filePath);
  return img as unknown as HTMLImageElement;
}

export function createTempWorkDir(prefix = 'docscan-regression-'): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

export function generateImageVariants(
  srcPath: string,
  outDir: string,
  tag: string
): {
  rot90: string;
  rot180: string;
  rot270: string;
  tilted10: string;
  shadowed: string;
  warpedTabletop: string;
} {
  const abs = path.resolve(srcPath);
  const rot90 = path.join(outDir, `${tag}-rot90.png`);
  const rot180 = path.join(outDir, `${tag}-rot180.png`);
  const rot270 = path.join(outDir, `${tag}-rot270.png`);
  const tilted10 = path.join(outDir, `${tag}-tilted10.png`);
  const shadowed = path.join(outDir, `${tag}-shadowed.png`);
  const warpedTabletop = path.join(outDir, `${tag}-warped.png`);

  execFileSync('convert', [abs, '-rotate', '90', rot90]);
  execFileSync('convert', [abs, '-rotate', '180', rot180]);
  execFileSync('convert', [abs, '-rotate', '270', rot270]);
  execFileSync('convert', [abs, '-background', '#ffffff', '-rotate', '9', '+repage', tilted10]);

  const { width, height } = loadImageRgbaFromFile(abs);
  execFileSync('convert', [
    abs,
    '(',
    '-size',
    `${width}x${height}`,
    'gradient:rgb(105,105,105)-rgb(255,255,255)',
    '-rotate',
    '25',
    '-gravity',
    'center',
    '-crop',
    `${width}x${height}+0+0`,
    '+repage',
    ')',
    '-compose',
    'Multiply',
    '-composite',
    shadowed,
  ]);

  const w = Math.min(1200, width);
  const h = Math.round((height / Math.max(1, width)) * w);
  const bgW = Math.round(w * 1.36);
  const bgH = Math.round(h * 1.44);
  const tlX = Math.round(bgW * 0.14);
  const tlY = Math.round(bgH * 0.14);
  const trX = Math.round(bgW * 0.85);
  const trY = Math.round(bgH * 0.16);
  const brX = Math.round(bgW * 0.89);
  const brY = Math.round(bgH * 0.86);
  const blX = Math.round(bgW * 0.11);
  const blY = Math.round(bgH * 0.84);

  // Extend onto a full bgW x bgH transparent viewport before applying -distort Perspective
  // so ImageMagick does not clip the bottom MRZ or right edge to the smaller w x h bounds.
  execFileSync('convert', [
    abs,
    '-resize',
    `${w}x${h}!`,
    '-background',
    'none',
    '-gravity',
    'northwest',
    '-extent',
    `${bgW}x${bgH}`,
    '-virtual-pixel',
    'transparent',
    '-distort',
    'Perspective',
    `0,0 ${tlX},${tlY} ${w},0 ${trX},${trY} ${w},${h} ${brX},${brY} 0,${h} ${blX},${blY}`,
    '-background',
    '#18202c',
    '-flatten',
    '-alpha',
    'off',
    warpedTabletop,
  ]);

  return { rot90, rot180, rot270, tilted10, shadowed, warpedTabletop };
}
