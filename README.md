# DocScan Browser OCR (`v0.0.8`)

Client-side browser OCR and 2D barcode identity parser for **passports, national ID cards, residence permits, visas, and US/Canadian/international driver licenses** — running 100% in the browser with WebAssembly (`tesseract.js`), off-thread `OffscreenCanvas` Web Workers, and PDF417 decoding (`BarcodeDetector` / `@zxing/library`) with zero document uploads to external servers.

## Features

- **Accuracy-Hardened VIZ & MRZ Pipeline (`v0.0.8`)**:
  - **Shadow-Resilient Illumination Flattening (`flattenShadowIlluminationBuffer`)**: Uses a 16×12 tile 88th-percentile background surface with 3×3 neighborhood smoothing (engaged automatically only when uneven lighting spread `>= 28`) so harsh shadows and finger/phone casts clear cleanly without washing out crisp flat scans.
  - **Dynamic MRZ Band Localization (`detectDynamicMrzBand`)**: Automatically locates contiguous monospace MRZ ink rows in the lower half of the document to tighten both MRZ crops—preventing TD1 line-1 clipping while avoiding upper passport holograms.
  - **Cross-Candidate MRZ Consensus Voting & Joint Check-Digit Solver (`synthesizeConsensusMrz`)**: Synthesizes weighted per-column character consensus across Pass 1 VIZ, Pass 2 OCR-B strip, symbol-repaired, and monospace grid candidates, paired with joint date calendar/check-digit & TD1/TD2/TD3 composite check-digit repair.
  - **Bilateral Portrait Symmetry & Signature Rule Filtering**: Prefers bilaterally symmetric facial portraits while penalizing neon security holograms/stamps, and strips thin horizontal printed rules/underlines from cursive signature crops.
- **Portrait & Signature Crop (Default)**: Automatically isolates and returns high-resolution cropped PNG data URLs and normalized bounding boxes for the holder's face portrait (`portraitDataUrl`, `portraitRegion`) and handwritten signature (`signatureDataUrl`, `signatureRegion`) from upright, perspective-corrected documents while masking out VIZ text lines and MRZ strips. Toggle independently via `extractPortrait` and `extractSignature` (both default `true`).
- **Specimen Watermark Detection (Default)**: Flags sample, demo, void, or test documents across OCR text, MRZ, 2D barcodes, and diagonal colored watermark stamps (`SPECIMEN`, `MUSTER`, `MUSTERMANN`, `WZÓR`, `VZOR`, `MUESTRA`, `ÉCHANTILLON`, `VOID`, `SAMPLE`, `FACSIMILE`, `NOT VALID FOR TRAVEL`, and ICAO `UTO` Utopia issuer code). Performs a fast crimson/red stamp deskewing OCR probe only when red stamp ink is detected (`detectSpecimen: true` by default; returns structured `specimen: SpecimenDetectionResult`).
- **Single-Side MRZ ↔ VIZ Cross-Validation**: Automatically cross-checks overlapping Machine Readable Zone and Visual Inspection Zone fields (`documentNumber`, `dateOfBirth`, `dateOfExpiry`, `sex`, `surname`, `givenNames`, `issuingCountry`) on single-side scans and exposes mismatches & OCR-confusable warnings in `result.crossValidation`. Supports diacritic normalization, German transliterations (`Ä/Ö/Ü/ß` ↔ `AE/OE/UE/SS`), and MRZ given-name truncation.
- **OffscreenCanvas / Web Worker Preprocessing (Default)**: Offloads heavy pixel pipelines—2400px 4-corner perspective homography warping, 2200px image scaling/deskewing/trimming, shadow-flattened contrast normalization, dynamic MRZ band detection, and dual 1800px flat-field MRZ strips—off the main UI thread into a dedicated self-contained Blob Web Worker (`OffscreenCanvas` + transferable `ImageBitmap` / `ArrayBuffer`). Compatible out of the box with Vite, UMD, ESM, jsDelivr CDN, and standalone `src/scanner/` copies, with automatic transparent fallback to main-thread `HTMLCanvasElement` (`useWorkerPreprocessing: false` to disable; reports `result.workerPreprocessed`).
- **`AbortSignal` Scan Cancellation**: Pass `signal: controller.signal` into `scanner.scan()`, `scanDocumentImage()`, `scanner.scanPair()`, or `scanDocumentPair()` to abort cleanly at any stage (decoding, perspective warp, quality gate, barcode scan, Tesseract OCR, media crop, or between sides). Immediately terminates active Tesseract & preprocessing workers without poisoning fallback state and rejects with `ScanAbortedError` (`name === 'AbortError'`, `isScanAbortedError(err)`).
- **PDF417 / AAMVA 2D Barcode Decoding (Default)**: Automatically detects and decodes PDF417 barcodes on the back of US, Canadian, and international driver licenses & ID cards using hardware-accelerated `BarcodeDetector` when supported, backed by a multi-rotation / multi-crop pure-JS `@zxing/library` fallback. Parses **AAMVA CDS v01–v10+** payloads (`parseAamvaPayload()`), resolves 6-digit US/Canadian IIN issuing jurisdictions, handles `MMDDYYYY` vs. Canadian `YYYYMMDD` dates, and fuses deterministic barcode fields (`BARCODE` / `BARCODE+VIZ`) cleanly with front-side OCR in `scanPair()`. Disable anytime via `enableBarcodePass: false`.
- **WYSIWYG Mobile Camera Auto-Capture & Image Quality Gate**: Real-time `<video>` stream watcher (`CameraAutoCapture` / `watchCameraAutoCapture`) with `computeVisibleVideoCrop()` / `captureRegion` so tall mobile portrait sensors (`object-cover`) crop strictly to the visible viewfinder rectangle instead of capturing large top/bottom backgrounds. Calibrated for handheld phones (`requiredStableFrames: 2`, `minSharpness: 22`, leaky motion tolerance) while checking focus sharpness, specular glare hotspots, lighting exposure, 4-corner framing, and hold stability.
- **Multilingual VIZ Language Passes (`auto` Native Default)**: Automatically routes non-English documents (detected via MRZ issuing state/nationality or visual VIZ header cues) to a targeted native-script Tesseract VIZ pass (`eng+deu`, `eng+spa`, `eng+fra`, `eng+ces`, `eng+lit`, etc.) while keeping English documents at 0ms overhead. Restores native diacritics (`ÄÖÜß`, `Ñ`, `ÉÈÇ`, `ČĖŠŽ`) and enriches single-side MRZ names without manual setup. Supports switching to single-pass `vizLanguageMode: 'multilingual'` (`eng+deu+spa+fra`), `'standard'` (`eng` only), or forcing any language pack via `vizLanguages` / `vizLanguageMap`.
- **Dedicated OCR-B MRZ Engine (Default)**: Uses an integer-quantized OCR-B traineddata model (`ocrb_int`, ~1.45 MB cached in IndexedDB) for the dedicated MRZ strip pass—yielding ~30% more valid ICAO check digits than `eng` across varied passport/ID specimens. Pass `mrzModel: 'standard'` anytime to switch MRZ recognition back to the standard language model (`eng`).
- **ICAO 9303 MRZ Parsing**: Supports `TD1` (3×30 ID cards), `TD2` (2×36), `TD3` (2×44 passports), and `MRV-A` / `MRV-B` (visas) with Modulo-10 check-digit validation and joint DOB/expiry/composite recovery.
- **Visual Inspection Zone (VIZ) Extraction**: Pan-European multilingual field extraction for names (including compound/double surnames), dates, residential addresses, place of birth, issuing authority, sex, height, eye color, and driver license categories.
- **4-Corner Perspective Correction**: Pure-JS automatic document quadrilateral detection + 3×3 homography bilinear dewarping (tuned for both tight document scans and smaller tilted ID cards inside mobile camera photos, plus optional manual `corners` override).
- **Two-Sided Document Merging**: `scanPair()` / `scanDocumentPair()` / `mergeDocumentSides()` combine front and back scans (even if swapped), fuse PDF417 AAMVA barcodes with front-side VIZ fields, propagate extracted portraits/signatures and specimen warnings, enrich diacritics, and validate cross-side consistency.
- **Auto-Rotate & Deskew**: Pure-JS fine tilt estimation (`±45°`) + 4-way orientation detection (`0°`, `90°`, `180°`, `270°`) with upright OCR verification.
- **Framework-Agnostic SDK (`src/scanner/`)**: Zero React or UI dependencies; ships with ready-compiled `latest` and version-pinned (`v0.0.8`) ESM & UMD browser bundles plus TypeScript `.d.ts` declarations in `public/lib/`.

See [ROADMAP.md](./ROADMAP.md) for shipped capabilities and upcoming enhancements.

---

## Using jsDelivr Directly From GitHub (`latest` or Pinned Version)

Once `public/lib/` is pushed to your public GitHub repository, remote websites can load either the **always-latest** bundle (`docscan-ocr.latest.*`) or a **version-pinned** bundle (`docscan-ocr.v0.0.8.*`) directly through jsDelivr.

### Option A: Classic `<script>` Tag (UMD Bundle)

Always load the latest build from your `main` branch:

```html
<script src="https://cdn.jsdelivr.net/gh/<USERNAME>/<REPO>@main/public/lib/docscan-ocr.latest.umd.js"></script>
<script>
  const {
    DocumentScanner,
    watchCameraAutoCapture,
    computeVisibleVideoCrop,
    isScanAbortedError,
    SCANNER_VERSION,
  } = window.DocScanOCR;
  console.log('DocScan OCR v' + SCANNER_VERSION);

  const scanner = new DocumentScanner({
    useWorkerPreprocessing: true, // default: offloads pixel ops via OffscreenCanvas Web Worker
  });
  let currentAbortController = null;

  // Scan an uploaded file (Passports, IDs, or Driver Licenses with PDF417)
  document.getElementById('doc-file').addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    currentAbortController?.abort('Superseded by new upload');
    currentAbortController = new AbortController();

    try {
      const identity = await scanner.scan(file, {
        perspectiveCorrection: true,
        autoRotate: true,
        enableBarcodePass: true, // default: decodes AAMVA / PDF417 2D barcodes
        extractPortrait: true,   // default: crops portrait PNG into identity.portraitDataUrl
        extractSignature: true,  // default: crops signature PNG into identity.signatureDataUrl
        detectSpecimen: true,    // default: flags MUSTER / SPECIMEN / VOID / UTO watermarks
        mrzModel: 'ocrb',        // default; set to 'standard' to use eng for MRZ
        vizLanguageMode: 'auto', // default; routes non-English docs to native scripts
        signal: currentAbortController.signal,
        onProgress: ({ stage, progress, message }) => {
          console.log(`[${stage}] ${progress}% - ${message}`);
        },
      });

      if (identity.specimen?.isSpecimen) {
        console.warn('Specimen / Sample document detected:', identity.specimen.matchedIndicators);
      }
      if (identity.crossValidation && !identity.crossValidation.consistent) {
        console.warn('MRZ vs VIZ discrepancy:', identity.crossValidation.discrepancies);
      }
      console.log(
        identity.fullName,
        identity.portraitDataUrl,
        identity.signatureDataUrl,
        identity.barcode?.aamva,
        identity,
      );
    } catch (err) {
      if (isScanAbortedError(err)) {
        console.log('Scan cancelled cleanly');
      } else {
        throw err;
      }
    }
  });

  // Or attach WYSIWYG live auto-capture to a <video> camera element
  // const video = document.getElementById('webcam');
  // const watcher = watchCameraAutoCapture(video, {
  //   captureRegion: () => computeVisibleVideoCrop(video),
  //   onQualityUpdate: (report, lockProgress) => console.log(report.guidance, lockProgress),
  //   onAutoCapture: async (file) => console.log(await scanner.scan(file)),
  // });
</script>
```

Or pin a specific Git tag/version for immutable production caching:

```html
<script src="https://cdn.jsdelivr.net/gh/<USERNAME>/<REPO>@v0.0.8/public/lib/docscan-ocr.v0.0.8.umd.js"></script>
```

### Option B: Native Browser ES Module (`<script type="module">`)

```html
<script type="module">
  import {
    DocumentScanner,
    assessImageQuality,
    scanDocumentImage,
    scanDocumentPair,
    isScanAbortedError,
    supportsWorkerPreprocessing,
    SCANNER_VERSION,
  } from 'https://cdn.jsdelivr.net/gh/<USERNAME>/<REPO>@main/public/lib/docscan-ocr.latest.es.js';

  console.log('Worker preprocessing available:', supportsWorkerPreprocessing());

  // Single document (OffscreenCanvas + perspective + auto-rotate + PDF417 + portrait/signature + specimen audit)
  const controller = new AbortController();
  const identity = await scanDocumentImage(fileOrDataUrl, {
    perspectiveCorrection: true,
    autoRotate: true,
    enableBarcodePass: true,
    extractPortrait: true,
    extractSignature: true,
    detectSpecimen: true,
    includeQualityReport: true,
    includePreviews: false,
    signal: controller.signal,
  });

  // Or reject blurry / glared images before OCR runs:
  // const verified = await scanDocumentImage(fileOrDataUrl, { enforceQualityGate: true });

  // Or scan & merge front + back (e.g. Driver License front photo + PDF417 back photo)
  // const merged = await scanDocumentPair(frontFile, backFile, { signal: controller.signal });

  console.log(
    `v${SCANNER_VERSION}`,
    identity.documentFormat,
    identity.portraitDataUrl,
    identity.specimen,
    identity.crossValidation,
  );
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
   If you want a minimal `npm install docscan-ocr` package with zero demo-app dependencies, copy `public/lib/` (or `src/scanner/`), create a dedicated `package.json` containing only `tesseract.js` and `@zxing/library` (or zero runtime dependencies if shipping the pre-bundled `public/lib/docscan-ocr.latest.*.js` files), remove `"private": true`, and run `npm publish`.

### Install via `npm` from GitHub or Local Path

```bash
# Install the latest commit on main directly from GitHub
npm install github:<your-username>/<your-repo>

# Or pin a release tag / commit
npm install github:<your-username>/<your-repo>#v0.0.8

# Or install from a local clone on your machine
npm install ../path/to/docscan-ocr
```

Then import it in your TypeScript/JavaScript project:

```ts
import {
  CameraAutoCapture,
  DocumentScanner,
  computeVisibleVideoCrop,
  isScanAbortedError,
  scanDocumentPair,
  SCANNER_VERSION,
} from 'docscan-ocr';

const scanner = new DocumentScanner({
  useWorkerPreprocessing: true, // default OffscreenCanvas Web Worker preprocessing
  enableBarcodePass: true,      // default (set false for OCR-only)
  extractPortrait: true,        // default (crops portraitDataUrl & portraitRegion)
  extractSignature: true,       // default (crops signatureDataUrl & signatureRegion)
  detectSpecimen: true,         // default (flags MUSTER / SPECIMEN / VOID / UTO)
  mrzModel: 'ocrb',             // default ('standard' reverts MRZ to eng)
  vizLanguageMode: 'auto',      // default ('multilingual' | 'standard')
});

const controller = new AbortController();

try {
  // Single document (passport, national ID, or driver license with PDF417)
  const identity = await scanner.scan(file, {
    perspectiveCorrection: true,
    autoRotate: true,
    preprocess: true,
    enhanceMrzPass: true,
    signal: controller.signal,
  });

  // Two-sided ID or Driver License (reuses warm Tesseract workers across both sides)
  const merged = await scanner.scanPair(frontFile, backFile, { signal: controller.signal });
  console.log(
    merged.fullName,
    merged.portraitDataUrl,
    merged.signatureDataUrl,
    merged.specimen,
    merged.crossValidation,
    merged.sidesConsistent,
  );
} catch (err) {
  if (!isScanAbortedError(err)) throw err;
}

// Call when unmounting / done scanning
await scanner.terminate();
```

---

## Other Integration Methods

### 1. Portrait / Signature Cropping, Cross-Validation & Specimen Watermarks

- **Portrait & Signature Cropping (`extractPortrait`, `extractSignature`, both default `true`)**: After 4-corner rectification and upright auto-rotation, `extractPortraitAndSignature()` scans standard front/data-page zones while masking out detected VIZ text boxes and MRZ rows. Portraits are isolated using bilateral vertical symmetry + border-aware contour segmentation while penalizing neon holograms (`portraitDataUrl`, `portraitRegion`). Signatures anchor onto localized labels (`Signature`, `Unterschrift`, `Firma del titular`, `Podpis`, etc.) or fall back to high-ink cursive stroke clusters above the MRZ while suppressing printed horizontal divider rules (`signatureDataUrl`, `signatureRegion`).
- **Specimen Watermark Detection (`detectSpecimen`, default `true`)**: Inspects VIZ OCR text, MRZ names/document numbers, 2D barcode payloads, and optional diagonal/colored crimson stamp ink (`buildColoredWatermarkOcrCanvas()`) for multilingual sample indicators (`SPECIMEN`, `MUSTER`, `MUSTERMANN`, `WZÓR`, `VZOR`, `MUESTRA`, `ÉCHANTILLON`, `VOID`, `SAMPLE`, `FACSIMILE`, `NOT VALID FOR TRAVEL`, and ICAO `UTO` Utopia issuer codes). Check `result.specimen?.isSpecimen` (`confidence: 0..100`, `matchedIndicators`).
- **Single-Side MRZ ↔ VIZ Cross-Validation**: On any document with both MRZ and VIZ content, `crossValidateMrzAndViz()` audits `documentNumber`, `dateOfBirth`, `dateOfExpiry`, `sex`, `surname`, `givenNames`, and `issuingCountry`—tolerating native diacritics (`ESPAÑOLA` ↔ `ESPANOLA`), German transliterations (`MÜLLER` ↔ `MUELLER`), and truncated MRZ given names while surfacing mismatches or OCR-confusable (`0`/`O`) warnings in `result.crossValidation`.

### 2. OffscreenCanvas Web Worker Preprocessing & `AbortSignal` Cancellation

- **OffscreenCanvas Worker (`useWorkerPreprocessing`, default `true`)**: When the browser supports `Worker`, `OffscreenCanvas`, and `createImageBitmap` (all modern Chromium, Firefox, and Safari releases), `PreprocessWorkerClient` executes perspective homography warping, downscaled grayscale sampling, rotation/deskewing, shadow-flattened illumination normalization, dynamic MRZ band localization, and dual flat-field MRZ PNG encoding inside an isolated self-contained Blob Web Worker with zero Vite-specific `?worker` imports. If running in an older browser or strict CSP (`worker-src` blocking `blob:`), it degrades seamlessly to main-thread `HTMLCanvasElement` without throwing. Check `result.workerPreprocessed` to verify off-thread execution or pass `useWorkerPreprocessing: false` to stay on the main thread.
- **`AbortSignal` (`signal?: AbortSignal`)**: Passing an `AbortController`'s `signal` into `scan()` or `scanPair()` guards every pipeline phase and immediately terminates any active Tesseract OCR workers + preprocessing Blob worker when `.abort()` is called, throwing `ScanAbortedError` (`name === 'AbortError'`, `code === 'SCAN_ABORTED'`). Aborting mid-scan never poisons OCR-B or native language fallback caches for subsequent scans.

### 3. PDF417 / AAMVA Barcode Decoding & Field Precedence

`enableBarcodePass` is enabled by default (`true`). On every scan:

1. The scanner first probes the browser's native `BarcodeDetector` (`formats: ['pdf417']`) when supported, and falls back across `0° / 90° / 180° / 270°` rotations and targeted regions using `@zxing/library`'s pure-JS `PDF417Reader` with adaptive binarization and contrast stretching.
2. Any `@\n\x1E\rANSI ...` AAMVA payload is parsed by `parseAamvaPayload()`, resolving the 6-digit Issuer Identification Number (`AAMVA_IIN_DIRECTORY`) across all 50 US states, DC, US territories, and 12 Canadian provinces, normalizing `MMDDYYYY` vs. Canadian `YYYYMMDD` dates, and mapping `DCS`/`DAC`/`DAD`, `DAG`–`DAK`, `DAQ`, `DAU`, `DAY`, `DCA`/`DCB`/`DCD`, and `DDK`/`DDL`/`DDA`.
3. Identity field precedence follows **ICAO MRZ > AAMVA Barcode > VIZ OCR**, with deterministic `BARCODE` / `BARCODE+VIZ` provenance tags when AAMVA data is present. In `scanPair()`, if a back-side PDF417 barcode is scanned alongside a front-side VIZ photo, AAMVA fields deterministically override noisy front OCR and validate cross-side consistency.

### 4. Multilingual VIZ Language Modes & Custom Overrides

Three VIZ language modes are available (plus direct `vizLanguages` / `vizLanguageMap` overrides):

- `'auto'` **(Default)**: Runs fast primary recognition (`eng`) + MRZ decoding first, then inspects the MRZ issuing country / nationality or visual card headers (e.g., `REINO DE ESPAÑA`, `BUNDESREPUBLIK DEUTSCHLAND`, `LIETUVOS RESPUBLIKA`) and lazily runs a warm native-script VIZ pass (`eng+deu`, `eng+spa`, `eng+fra`, `eng+ces`, `eng+lit`, etc.) only for non-English documents. Restores native diacritics into both VIZ fields and single-side MRZ names (`BASANAVIČIENĖ`, `ESPAÑOLA`, `KÖLN`), with silent offline fallback if traineddata cannot be fetched.
- `'multilingual'`: Single-pass bundled traineddata (`eng+deu+spa+fra`) loaded directly on the primary worker without country routing.
- `'standard'`: Classic English-only VIZ recognition (`eng`) with zero extra traineddata downloads.

```ts
// Single-pass EFIGS multi-script mode
await scanner.scan(file, { vizLanguageMode: 'multilingual' });

// Classic English-only VIZ mode
await scanner.scan(file, { vizLanguageMode: 'standard' });

// Explicit traineddata override for a specific scan
await scanner.scan(file, { vizLanguages: 'eng+pol' });

// Extend or override country -> traineddata mapping on Auto Native mode
const customScanner = new DocumentScanner({
  vizLanguageMap: {
    POL: 'pol',
    UKR: 'ukr',
  },
});
```

### 5. Live Camera Auto-Capture & Mobile `captureRegion`

`CameraAutoCapture` evaluates live video frames (~5–6 FPS on a 480px sample canvas) for focus sharpness, specular glare hotspots, brightness/exposure, structured document framing, and frame-to-frame steadiness. Passing `captureRegion: () => computeVisibleVideoCrop(videoElement)` guarantees that what mobile users see inside an `object-cover` preview matches both the quality analyzer and the full-resolution frame passed to OCR—avoiding tall background strips on portrait phone sensors:

```ts
import {
  CameraAutoCapture,
  DocumentScanner,
  computeVisibleVideoCrop,
} from 'docscan-ocr';

const scanner = new DocumentScanner();
const autoCapture = new CameraAutoCapture(videoElement, {
  captureRegion: () => computeVisibleVideoCrop(videoElement),
  minSharpness: 22,
  maxMotionDelta: 8.5,
  maxGlareRatio: 0.055,
  requiredStableFrames: 2,
  onQualityUpdate: (report, lockProgress) => {
    statusLabel.textContent = report.guidance;
    progressBar.style.width = `${Math.round(lockProgress * 100)}%`;
  },
  onAutoCapture: async (file) => {
    const identity = await scanner.scan(file);
    console.log(identity);
  },
});
autoCapture.start();
```

### 6. Selecting the MRZ OCR Model (`ocrb` vs `standard`)

By default (`mrzModel: 'ocrb'`), the dedicated MRZ strip pass lazily initializes a lightweight `ocrb_int` worker (`https://cdn.jsdelivr.net/gh/Shreeshrii/tessdata_ocrb@master`, uncompressed `gzip: false`) while full-page VIZ OCR runs on the configured VIZ language mode. If loading `ocrb_int` fails (e.g., strict offline environment without self-hosted `.traineddata`), the scanner silently falls back to the standard worker.

To explicitly use the standard language model (`eng` or `language`) for MRZ as well:

```ts
const scanner = new DocumentScanner({ mrzModel: 'standard' });
// or override per scan:
const identity = await scanner.scan(file, { mrzModel: 'standard' });
```

### 7. Manual 4-Corner Perspective Override

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

### 8. Copy the Standalone Source Folder (`src/scanner/`)

1. Copy the `src/scanner/` directory into your project.
2. Install the two runtime dependencies:
   ```bash
   npm install tesseract.js @zxing/library
   ```
3. Import from `./scanner`.

### 9. Self-Hosting Tesseract Worker, WASM & Language Data (Strict CSP / Offline)

```ts
import { DocumentScanner } from 'docscan-ocr';

const scanner = new DocumentScanner({
  workerPath: '/tesseract/worker.min.js',
  corePath: '/tesseract/tesseract-core-simd.wasm.js',
  langPath: '/tesseract/lang-data',
  mrzModel: 'ocrb',
  mrzLanguage: 'ocrb_int',
  mrzLangPath: '/tesseract/lang-data',
  mrzGzip: false,
  workerBlobURL: false,
  useWorkerPreprocessing: false, // disable Blob Worker if blob: workers are blocked by CSP
});
```

### 10. Standalone Pure Helpers (No OCR Worker Needed)

```ts
import {
  ScanAbortedError,
  analyzeDocumentOrientation,
  assessImageQuality,
  computeVisibleVideoCrop,
  crossValidateMrzAndViz,
  detectDocumentQuad,
  detectDynamicMrzBand,
  detectPdf417Barcode,
  detectPortraitBoundsFromRgba,
  detectSignatureBoundsFromRgba,
  detectSpecimenWatermark,
  extractPortraitAndSignature,
  flattenShadowIlluminationBuffer,
  inferNativeVizLanguageFromText,
  isScanAbortedError,
  mergeDocumentSides,
  parseAamvaPayload,
  parseMrzFromText,
  parseVizText,
  resolveNativeVizLanguage,
  supportsWorkerPreprocessing,
  synthesizeConsensusMrz,
} from 'docscan-ocr';
```

---

## Library Artifacts (`public/lib/`)

| File | Purpose |
| --- | --- |
| `public/lib/docscan-ocr.latest.umd.js` | Always-latest browser UMD bundle (exposes global `window.DocScanOCR`) |
| `public/lib/docscan-ocr.latest.es.js` | Always-latest browser native ES module bundle |
| `public/lib/docscan-ocr.v0.0.8.umd.js` | Version-pinned (`v0.0.8`) UMD bundle |
| `public/lib/docscan-ocr.v0.0.8.es.js` | Version-pinned (`v0.0.8`) ES module bundle |
| `public/lib/types/index.d.ts` | TypeScript declaration files for all exports |

---

## Development & Build Scripts

```bash
npm install       # Install dependencies
npm run dev       # Run interactive demo workbench (port 3000)
npm run lint      # Type-check with TypeScript
npm run build     # Build demo web application (dist/)
npm run build:lib # Rebuild latest + versioned ESM/UMD bundles & .d.ts types (public/lib/)
```

## Project Structure

```text
├── public/
│   └── lib/                     # Ready-compiled latest & v0.0.8 UMD/ESM bundles & .d.ts types
├── src/
│   ├── scanner/                 # Framework-agnostic OCR, barcode & parser SDK
│   │   ├── index.ts             # Public library entry point
│   │   ├── version.ts           # SCANNER_VERSION ('0.0.8')
│   │   ├── mediaExtractor.ts    # Portrait symmetry/hologram cropper, rule-filtered signature & watermark isolator
│   │   ├── specimenValidator.ts # Specimen watermark detector & single-side MRZ↔VIZ validator
│   │   ├── preprocessWorker.ts  # OffscreenCanvas Web Worker client & AbortSignal helpers
│   │   ├── pdf417Decoder.ts     # Native BarcodeDetector + @zxing/library PDF417 decoder
│   │   ├── aamvaParser.ts       # AAMVA CDS v01-v10+ parser & US/CA IIN directory
│   │   ├── vizLanguages.ts      # Country-routed native VIZ language resolver & overrides
│   │   ├── qualityGate.ts       # CameraAutoCapture, computeVisibleVideoCrop & quality gate
│   │   ├── ocrEngine.ts         # DocumentScanner class, consensus MRZ voting, AbortSignal & scanPair()
│   │   ├── perspective.ts       # 4-corner quad detection & 3x3 homography perspective warp
│   │   ├── pairMerger.ts        # Front + back ID merging & consistency conflict detection
│   │   ├── orientation.ts       # Fine deskew & 4-way orientation analyzer
│   │   ├── imagePreprocessor.ts # Shadow illumination flattening, dynamic MRZ band locator & canvas fallback
│   │   ├── mrzParser.ts         # ICAO 9303 MRZ parser, consensus voter & joint check-digit repair
│   │   ├── vizParser.ts         # Multilingual pan-European Visual Inspection Zone extractor
│   │   ├── countries.ts         # ISO 3166-1 alpha-3 & ICAO issuing state codes
│   │   └── types.ts             # TypeScript interfaces
│   ├── components/              # React workbench UI components
│   └── App.tsx                  # Interactive demo application
├── ROADMAP.md                   # Feature roadmap and progress tracker
├── vite.config.ts               # Web application Vite config
├── vite.lib.config.ts           # Standalone library Vite build config
└── tsconfig.lib.json            # Declaration (.d.ts) compiler config
```
