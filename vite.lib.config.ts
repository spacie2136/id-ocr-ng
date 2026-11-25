import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';

const rootDir = import.meta.dirname;
const pkg = JSON.parse(
  fs.readFileSync(path.resolve(rootDir, 'package.json'), 'utf8')
) as { version?: string };

const version = pkg.version || '0.0.1';
const outDir = path.resolve(rootDir, 'public/lib');

function createLatestAliasesPlugin(ver: string): Plugin {
  return {
    name: 'create-latest-library-aliases',
    apply: 'build',
    closeBundle(error?: Error): void {
      if (error) return;
      for (const format of ['es', 'umd'] as const) {
        const versionedBase = `docscan-ocr.v${ver}.${format}.js`;
        const latestBase = `docscan-ocr.latest.${format}.js`;

        const versionedPath = path.join(outDir, versionedBase);
        const latestPath = path.join(outDir, latestBase);
        if (fs.existsSync(versionedPath)) {
          const jsContent = fs
            .readFileSync(versionedPath, 'utf8')
            .replaceAll(`${versionedBase}.map`, `${latestBase}.map`);
          fs.writeFileSync(latestPath, jsContent, 'utf8');
        }

        const versionedMapPath = path.join(outDir, `${versionedBase}.map`);
        const latestMapPath = path.join(outDir, `${latestBase}.map`);
        if (fs.existsSync(versionedMapPath)) {
          const mapContent = fs
            .readFileSync(versionedMapPath, 'utf8')
            .replace(`"file":"${versionedBase}"`, `"file":"${latestBase}"`);
          fs.writeFileSync(latestMapPath, mapContent, 'utf8');
        }
      }
    },
  };
}

export default defineConfig({
  publicDir: false,
  plugins: [createLatestAliasesPlugin(version)],
  build: {
    outDir,
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
