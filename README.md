# DocScan Browser OCR (`v0.0.1`)

Client-side browser OCR and identity document parser for **passports, national ID cards, residence permits, visas, and driver licenses** — running 100% in the browser with WebAssembly (`tesseract.js`) and zero document uploads to external servers.

## Features

- **ICAO 9303 MRZ Parsing**: Supports `TD1` (3×30 ID cards), `TD2` (2×36), `TD3` (2×44 passports), and `MRV-A` / `MRV-B` (visas) with Modulo-10 check-digit validation.
- **Visual Inspection Zone (VIZ) Extraction**: Multilingual field extraction for names (including compound/double surnames), dates, residential addresses, place of birth, issuing authority, sex, height, eye color, and driver license categories.
- **4-Corner Perspective Correction**: Pure-JS automatic document quadrilateral detection + 3×3 homography bilinear dewarping (plus optional manual `corners` override) for angled mobile or tabletop photos.
- **Two-Sided Document Merging**: `scanPair()` / `scanDocumentPair()` / `mergeDocumentSides()` combine front and back scans (even if swapped), enrich diacritics & missing fields, and validate cross-side consistency.
- **Auto-Rotate & Deskew**: Pure-JS fine tilt estimation (`±45°`) + 4-way orientation detection (`0°`, `90°`, `180°`, `270°`) with upright OCR verification.
- **Dual-Pass Image Preprocessing**: Adaptive contrast stretching, flat-field lighting normalization, and dedicated MRZ strip isolation.
- **Framework-Agnostic SDK (`src/scanner/`)**: Zero React or UI dependencies; ships with ready-compiled `latest` and version-pinned (`v0.0.1`) ESM & UMD browser bundles plus TypeScript `.d.ts` declarations in `public/lib/`.

See [ROADMAP.md](./ROADMAP.md) for shipped capabilities and upcoming enhancements.

---

## Using jsDelivr Directly From GitHub (`latest` or Pinned Version)

Once `public/lib/` is pushed to your public GitHub repository, remote websites can load either the **always-latest** bundle (`docscan-ocr.latest.*`) or a **version-pinned** bundle (`docscan-ocr.v0.0.1.*`) directly through jsDelivr.

### Option A: Classic `<script>` Tag (UMD Bundle)

Always load the latest build from your `main` branch:

```html
<script src="https://cdn.jsdelivr.net/gh/<USERNAME>/<REPO>@main/public/lib/docscan-ocr.latest.umd.js"></script>
<script>
  const { DocumentScanner, SCANNER_VERSION } = window.DocScanOCR;
  console.log('DocScan OCR v' + SCANNER_VERSION);

  const scanner = new DocumentScanner();

  document.getElementById('doc-file').addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const identity = await scanner.scan(file, {
      perspectiveCorrection: true,
      autoRotate: true,
      onProgress: ({ stage, progress, message }) => {
        console.log(`[${stage}] ${progress}% - ${message}`);
      },
    });

    console.log(identity);
  });
</script>
```

Or pin a specific Git tag/version for immutable production caching:

```html
<script src="https://cdn.jsdelivr.net/gh/<USERNAME>/<REPO>@v0.0.1/public/lib/docscan-ocr.v0.0.1.umd.js"></script>
```

### Option B: Native Browser ES Module (`<script type="module">`)

```html
<script type="module">
  import {
    DocumentScanner,
    scanDocumentImage,
    scanDocumentPair,
    SCANNER_VERSION,
  } from 'https://cdn.jsdelivr.net/gh/<USERNAME>/<REPO>@main/public/lib/docscan-ocr.latest.es.js';

  // Single document (auto perspective + auto-rotate)
  const identity = await scanDocumentImage(fileOrDataUrl, {
    perspectiveCorrection: true,
    autoRotate: true,
    includePreviews: false,
  });

  // Or scan & merge a two-sided national ID (front + back)
  // const merged = await scanDocumentPair(frontFile, backFile);

  console.log(`v${SCANNER_VERSION}`, identity);
</script>
```

> **jsDelivr Caching Note:** Branch URLs like `@main` are cached by jsDelivr for several hours after a push. To refresh remote apps immediately after pushing a new `docscan-ocr.latest.*` build to `main`, trigger a purge request:
> `https://purge.jsdelivr.net/gh/<USERNAME>/<REPO>@main/public/lib/docscan-ocr.latest.umd.js`
> (and `.es.js`). If you prefer `@latest` as the Git ref in the URL (`@latest/public/lib/docscan-ocr.latest.umd.js`), push/move a Git tag named `latest` alongside each release.

---

## Can I Use `npm` to Install It in Another Project?

**Yes — with an important distinction:**

1. **Directly from GitHub or a local folder (works right now):**
   `package.json` defines `main`, `module`, `types`, and `exports` pointing to `public/lib/docscan-ocr.latest.*` (and `./source` pointing to `src/scanner/index.ts`), so `npm` can install this repository directly without running a build step on install.
   - **Caveat:** Because this repository also hosts the interactive React workbench app, installing the root repository via `npm install github:...` will also install the demo app's `dependencies` (such as `react`, `vite`, `express`, etc.), and `"private": true` is set so it is not published on `npmjs.com`.
2. **Publishing a clean standalone package to npm (optional):**
   If you want a minimal `npm install docscan-ocr` package with zero demo-app dependencies, copy `public/lib/` (or `src/scanner/`), create a dedicated `package.json` containing only `tesseract.js` (or zero runtime dependencies if shipping the pre-bundled `public/lib/docscan-ocr.latest.*.js` files), remove `"private": true`, and run `npm publish`.

### Install via `npm` from GitHub or Local Path

```bash
# Install the latest commit on main directly from GitHub
npm install github:<your-username>/<your-repo>

# Or pin a release tag / commit
npm install github:<your-username>/<your-repo>#v0.0.1

# Or install from a local clone on your machine
npm install ../path/to/docscan-ocr
```

Then import it in your TypeScript/JavaScript project:

```ts
import {
  DocumentScanner,
  scanDocumentImage,
  scanDocumentPair,
  SCANNER_VERSION,
} from 'docscan-ocr';

const scanner = new DocumentScanner();

// Single document
const identity = await scanner.scan(file, {
  perspectiveCorrection: true,
  autoRotate: true,
  preprocess: true,
  enhanceMrzPass: true,
});

// Two-sided ID (reuses warm Tesseract worker across both sides)
const merged = await scanner.scanPair(frontFile, backFile);
console.log(merged.fullName, merged.address, merged.sidesConsistent, merged.conflicts);

// Call when unmounting / done scanning
await scanner.terminate();
```

---

## Other Integration Methods

### 1. Manual 4-Corner Perspective Override

If you want users to manually adjust corners in a custom UI, pass normalized `[0..1]` coordinates via `corners`:

```ts
const identity = await scanner.scan(angledPhoto, {
  corners: {
    topLeft: { x: 0.08, y: 0.12 },
    topRight: { x: 0.91, y: 0.09 },
    bottomRight: { x: 0.94, y: 0.88 },
    bottomLeft: { x: 0.06, y: 0.85 },
  },
});
```

### 2. Copy the Standalone Source Folder (`src/scanner/`)

1. Copy the `src/scanner/` directory into your project.
2. Install only the single runtime dependency:
   ```bash
   npm install tesseract.js
   ```
3. Import from `./scanner`.

### 3. Self-Hosting Tesseract Worker, WASM & Language Data (Strict CSP / Offline)

```ts
import { DocumentScanner } from 'docscan-ocr';

const scanner = new DocumentScanner({
  workerPath: '/tesseract/worker.min.js',
  corePath: '/tesseract/tesseract-core-simd.wasm.js',
  langPath: '/tesseract/lang-data',
  workerBlobURL: false,
});
```

### 4. Standalone Pure Helpers (No OCR Worker Needed)

```ts
import {
  analyzeDocumentOrientation,
  detectDocumentQuad,
  mergeDocumentSides,
  parseMrzFromText,
  parseVizText,
} from 'docscan-ocr';
```

---

## Library Artifacts (`public/lib/`)

| File | Purpose |
| --- | --- |
| `public/lib/docscan-ocr.latest.umd.js` | Always-latest browser UMD bundle (exposes global `window.DocScanOCR`) |
| `public/lib/docscan-ocr.latest.es.js` | Always-latest browser native ES module bundle |
| `public/lib/docscan-ocr.v0.0.1.umd.js` | Version-pinned (`v0.0.1`) UMD bundle |
| `public/lib/docscan-ocr.v0.0.1.es.js` | Version-pinned (`v0.0.1`) ES module bundle |
| `public/lib/types/index.d.ts` | TypeScript declaration files for all exports |

---

## Development & Build Scripts

```bash
npm install      # Install dependencies
npm run dev      # Run interactive demo workbench (port 3000)
npm run lint     # Type-check with TypeScript
npm run build    # Build demo web application (dist/)
npm run build:lib # Rebuild latest + versioned ESM/UMD bundles & .d.ts types (public/lib/)
```

## Project Structure

```text
├── public/
│   └── lib/                     # Ready-compiled latest & v0.0.1 UMD/ESM bundles & .d.ts types
├── src/
│   ├── scanner/                 # Framework-agnostic OCR & parser SDK
│   │   ├── index.ts             # Public library entry point
│   │   ├── version.ts           # SCANNER_VERSION ('0.0.1')
│   │   ├── ocrEngine.ts         # DocumentScanner class, scanDocumentImage & scanDocumentPair
│   │   ├── perspective.ts       # 4-corner quad detection & 3x3 homography perspective warp
│   │   ├── pairMerger.ts        # Front + back ID merging & consistency conflict detection
│   │   ├── orientation.ts       # Fine deskew & 4-way orientation analyzer
│   │   ├── imagePreprocessor.ts # Canvas scaling, rotation & MRZ contrast enhancement
│   │   ├── mrzParser.ts         # ICAO 9303 MRZ parser & Modulo-10 check digits
│   │   ├── vizParser.ts         # Multilingual Visual Inspection Zone extractor
│   │   ├── countries.ts         # ISO 3166-1 alpha-3 & ICAO issuing state codes
│   │   └── types.ts             # TypeScript interfaces
│   ├── components/              # React workbench UI components
│   └── App.tsx                  # Interactive demo application
├── ROADMAP.md                   # Feature roadmap and progress tracker
├── vite.config.ts               # Web application Vite config
├── vite.lib.config.ts           # Standalone library Vite build config
└── tsconfig.lib.json            # Declaration (.d.ts) compiler config
```
