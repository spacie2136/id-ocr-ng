import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';

const rootDir = import.meta.dirname;
const pkg = JSON.parse(
  fs.readFileSync(path.resolve(rootDir, 'package.json'), 'utf8')
) as { version?: string };

const version = pkg.version || '0.0.1';

export default defineConfig({
  publicDir: false,
  build: {
    outDir: path.resolve(rootDir, 'public/lib'),
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: path.resolve(rootDir, 'src/scanner/index.ts'),
      name: 'DocScanOCR',
      formats: ['es', 'umd'],
      fileName: (format) => `docscan-ocr.v${version}.${format}.js`,
    },
    rollupOptions: {
      output: {
        banner: `/* DocScan OCR v${version} | Client-Side Browser Passport & ID Scanner */`,
      },
    },
  },
});
