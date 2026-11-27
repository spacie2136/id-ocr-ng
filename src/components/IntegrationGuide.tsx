import React, { useState } from 'react';
import { Check, Copy, FolderTree, Globe, Package, Terminal } from 'lucide-react';
import { SCANNER_VERSION } from '../scanner';

const UMD_SNIPPET = `<!-- Always use the latest build via GitHub + jsDelivr (or pin @v${SCANNER_VERSION}/.../docscan-ocr.v${SCANNER_VERSION}.umd.js) -->
<script src="https://cdn.jsdelivr.net/gh/<USERNAME>/<REPO>@main/public/lib/docscan-ocr.latest.umd.js"></script>
<script>
  const {
    DocumentScanner,
    watchCameraAutoCapture,
    computeVisibleVideoCrop,
    isScanAbortedError,
    SCANNER_VERSION,
  } = window.DocScanOCR;
  console.log('Loaded DocScan OCR v' + SCANNER_VERSION);

  const scanner = new DocumentScanner({
    useWorkerPreprocessing: true, // default: OffscreenCanvas worker (shadow-resilient VIZ & dynamic MRZ framing)
  });

  // Optional: pre-warm VIZ + OCR-B WASM workers while opening the camera or upload screen
  void scanner.warmup();

  // Live camera auto-capture locked to the visible viewfinder crop (object-cover safe on phones)
  let activeController = null;
  const watcher = watchCameraAutoCapture(videoElement, {
    captureRegion: () => computeVisibleVideoCrop(videoElement),
    requiredStableFrames: 2,
    onQualityUpdate: (report, lockProgress) => {
      console.log(report.guidance, 'Sharpness:', report.sharpnessScore, Math.round(lockProgress * 100) + '%');
    },
    onAutoCapture: async (capturedFile) => {
      activeController?.abort('Superseded by newer capture');
      activeController = new AbortController();
      try {
        const identity = await scanner.scan(capturedFile, {
          perspectiveCorrection: true,
          autoRotate: true,
          enableBarcodePass: true, // default: PDF417 + AAMVA decoding for US/CA driver licenses & IDs
          extractPortrait: true,   // default: returns portraitDataUrl & portraitRegion
          extractSignature: true,  // default: returns signatureDataUrl & signatureRegion
          detectSpecimen: true,    // default: flags MUSTER/SPECIMEN/VOID/UTO watermarks
          mrzModel: 'ocrb',        // default OCR-B MRZ traineddata + consensus check-digit voting
          vizLanguageMode: 'auto', // default: routes non-English docs to native scripts (eng+deu, eng+spa, etc.)
          signal: activeController.signal,
        });
        console.log(
          identity.fullName,
          identity.portraitDataUrl,
          identity.signatureDataUrl,
          identity.specimen?.isSpecimen,
          identity.crossValidation?.consistent,
          identity.barcode?.aamva,
        );
      } catch (err) {
        if (!isScanAbortedError(err)) console.error(err);
      }
    },
  });
</script>`;

const ESM_REMOTE_SNIPPET = `<script type="module">
  import {
    DocumentScanner,
    assessImageQuality,
    scanDocumentPair,
    isScanAbortedError,
    supportsWorkerPreprocessing,
    SCANNER_VERSION,
  } from 'https://cdn.jsdelivr.net/gh/<USERNAME>/<REPO>@main/public/lib/docscan-ocr.latest.es.js';

  console.log('OffscreenCanvas worker support:', supportsWorkerPreprocessing());

  // Pre-flight quality check on uploaded files (or enforce directly inside scan())
  const quality = await assessImageQuality(file);
  if (!quality.passed) {
    console.warn('Quality warning:', quality.guidance, quality.issues);
  }

  const scanner = new DocumentScanner({
    useWorkerPreprocessing: true, // default (falls back automatically to main-thread canvas if unsupported)
    enableBarcodePass: true,      // default: native BarcodeDetector + @zxing/library PDF417/AAMVA fallback
    extractPortrait: true,        // default: crops face photo into result.portraitDataUrl
    extractSignature: true,       // default: crops signature strip into result.signatureDataUrl
    detectSpecimen: true,         // default: flags MUSTER / SPECIMEN / WZÓR / VZOR / VOID / UTO samples
    mrzModel: 'ocrb',             // default ('standard' switches MRZ back to eng)
    vizLanguageMode: 'auto',      // default ('multilingual' bundles eng+deu+spa+fra; 'standard' uses eng only)
    vizLanguageMap: { POL: 'pol' }, // optional custom issuing-state -> traineddata override
  });

  // Cancel any in-flight two-sided scan cleanly after a timeout or user click
  const controller = new AbortController();
  try {
    const merged = await scanDocumentPair(frontFile, backFile, {
      enforceQualityGate: false,
      perspectiveCorrection: true,
      autoRotate: true,
      signal: controller.signal,
    });
    console.log(
      \`v\${SCANNER_VERSION}\`,
      merged.documentFormat,
      merged.portraitDataUrl,
      merged.specimen,
      merged.crossValidation,
      merged.barcode?.aamva,
    );
  } catch (err) {
    if (isScanAbortedError(err)) {
      console.log('Two-sided scan aborted cleanly');
    } else {
      throw err;
    }
  }
</script>`;

const SOURCE_SNIPPET = `import {
  CameraAutoCapture,
  DocumentScanner,
  computeVisibleVideoCrop,
  crossValidateMrzAndViz,
  detectSpecimenWatermark,
  isScanAbortedError,
  parseAamvaPayload,
  synthesizeConsensusMrz,
} from './scanner';

const scanner = new DocumentScanner({
  useWorkerPreprocessing: true, // default: OffscreenCanvas Blob Worker (zero Vite/bundler config required)
  enableBarcodePass: true,
  extractPortrait: true,
  extractSignature: true,
  detectSpecimen: true,
  mrzModel: 'ocrb',
  vizLanguageMode: 'auto',
});

// Pre-warm both VIZ & OCR-B Tesseract workers concurrently before user uploads/captures
await scanner.warmup();

// 1. Mobile-calibrated live <video> auto-capture + AbortController scan cancellation
let abortController: AbortController | null = null;

const controller = new CameraAutoCapture(videoEl, {
  captureRegion: () => computeVisibleVideoCrop(videoEl),
  minSharpness: 22,
  maxMotionDelta: 8.5,
  maxGlareRatio: 0.055,
  requiredStableFrames: 2,
  onQualityUpdate: (report, progress) => updateHud(report, progress),
  onAutoCapture: async (file) => {
    abortController?.abort('Restarting scan');
    abortController = new AbortController();
    try {
      const res = await scanner.scan(file, { signal: abortController.signal });
      if (res.specimen?.isSpecimen) {
        console.warn('Sample/Specimen rejected:', res.specimen.matchedIndicators);
      }
      if (res.crossValidation && !res.crossValidation.consistent) {
        console.warn('MRZ vs VIZ mismatch:', res.crossValidation.discrepancies);
      }
      console.log(res.fullName, res.portraitDataUrl, res.signatureDataUrl);
    } catch (err) {
      if (!isScanAbortedError(err)) throw err;
    }
  },
});
controller.start();

// 2. Standalone pure-TS AAMVA, consensus MRZ voting, MRZ↔VIZ validation, and specimen helpers
const aamva = parseAamvaPayload(rawPdf417Text);
const consensusMrz = synthesizeConsensusMrz([pass1Mrz, pass2Mrz, gridMrz]);
const specimenCheck = detectSpecimenWatermark({ rawOcrText: ocrText, mrz: consensusMrz });
const mrzVizAudit = crossValidateMrzAndViz(consensusMrz, viz);
console.log(aamva?.fullName, specimenCheck.isSpecimen, mrzVizAudit.discrepancies);

// 3. Fast MRZ-Only mode (skips full-page VIZ OCR & media crops) or skipVizPass with portrait crop
const fastMrz = await scanner.scan(uploadedFile, {
  mrzOnly: true,
  includePreviews: false,
});
const mrzAndPortrait = await scanner.scan(uploadedFile, {
  skipVizPass: true,
  extractPortrait: true,
  extractSignature: false,
});`;

const MODULES = [
  {
    name: 'mediaExtractor.ts',
    role: 'Pure-JS RGBA face portrait detector (with bilateral symmetry & neon hologram weighting), multilingual VIZ-anchored holder signature cropper (with horizontal-rule filtering), PNG exporter, and crimson watermark OCR isolator.',
  },
  {
    name: 'specimenValidator.ts',
    role: 'Single-side MRZ vs. VIZ cross-validator (diacritic & German transliteration aware, OCR-confusable severity grading) plus multilingual MUSTER / SPECIMEN / WZÓR / VZOR / VOID / ICAO UTO watermark detector.',
  },
  {
    name: 'preprocessWorker.ts',
    role: 'Self-contained OffscreenCanvas + ImageBitmap Web Worker client (PreprocessWorkerClient) offloading 2400px perspective homography, shadow illumination flattening, dynamic MRZ band detection, and zero-base64 PNG Blob + transferable grayscale strips off the main thread, plus AbortSignal helpers.',
  },
  {
    name: 'pdf417Decoder.ts & aamvaParser.ts',
    role: 'Hybrid PDF417 2D barcode detector (native BarcodeDetector + pure-JS @zxing/library multi-rotation/crop fallback) and full AAMVA CDS v01–v10+ parser with 6-digit US/Canadian IIN jurisdiction lookup.',
  },
  {
    name: 'qualityGate.ts',
    role: 'Sharpness/Laplacian focus scoring, glare hotspot & exposure checks, WYSIWYG object-cover crop helper (computeVisibleVideoCrop), and handheld-calibrated CameraAutoCapture / watchCameraAutoCapture controller.',
  },
  {
    name: 'ocrEngine.ts & vizLanguages.ts',
    role: 'Concurrent VIZ + OCR-B worker pre-warming (scanner.warmup()), parallel VIZ+MRZ execution, binary Blob Tesseract transfers, tight-strip-first MRZ recognition, fast mrzOnly / skipVizPass modes, early-exit orientation probes, OffscreenCanvas dispatch, portrait/signature crop & watermark probe, and scanPair().',
  },
  {
    name: 'perspective.ts',
    role: 'Pure-JS 4-corner document quadrilateral detector (supporting both full-bleed scans and small framed ID cards in tall phone photos), orthogonal refiner, and 3×3 homography bilinear warp.',
  },
  {
    name: 'pairMerger.ts',
    role: 'Two-sided Front + Back identity merger with swapped-side detection, BARCODE+VIZ fusion, portrait/signature/specimen propagation, accented diacritic enrichment, and consistency conflict checks.',
  },
  {
    name: 'orientation.ts',
    role: 'Pure-JS fine skew estimator ([-45°, +45°]) and 4-way orientation ranker using local ink contrast & projection profiles.',
  },
  {
    name: 'imagePreprocessor.ts',
    role: 'Main-thread HTMLCanvasElement fallback + transferable ImageBitmap loader with 16×12 shadow illumination flattening, dynamic monospace MRZ band localization, skipFullPage/skipMrzStrips fast paths, and flat-field MRZ isolation.',
  },
  {
    name: 'mrzParser.ts & vizParser.ts',
    role: 'Pure TypeScript ICAO 9303 MRZ parser (TD1/TD2/TD3/MRV) with cross-candidate consensus voting & joint DOB/composite check-digit repair, plus multilingual Visual Inspection Zone extractor.',
  },
  {
    name: 'countries.ts, version.ts & types.ts',
    role: `ISO 3166-1/ICAO country lookup, v${SCANNER_VERSION} version export, and framework-agnostic TypeScript interfaces.`,
  },
];

const ARTIFACTS = [
  {
    path: '/lib/docscan-ocr.latest.umd.js',
    desc: 'Always-latest UMD script (exposes global window.DocScanOCR) so remote apps update automatically.',
  },
  {
    path: '/lib/docscan-ocr.latest.es.js',
    desc: 'Always-latest native ES module bundle for remote imports and modern browsers.',
  },
  {
    path: `/lib/docscan-ocr.v${SCANNER_VERSION}.umd.js`,
    desc: `Version-pinned UMD bundle for v${SCANNER_VERSION}.`,
  },
  {
    path: `/lib/docscan-ocr.v${SCANNER_VERSION}.es.js`,
    desc: `Version-pinned ES module bundle for v${SCANNER_VERSION}.`,
  },
  {
    path: '/lib/types/index.d.ts',
    desc: 'Generated TypeScript declaration files for all exported classes, helpers, and interfaces.',
  },
];

export const IntegrationGuide: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyBlock = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1600);
    } catch {
      // Ignore clipboard permissions
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-5 flex flex-col gap-6">
        <section className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-600" />
              <h2 className="text-base font-semibold text-slate-900">
                Compiled Library Artifacts
              </h2>
            </div>
            <span className="font-mono text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
              v{SCANNER_VERSION} / latest
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            Pre-built browser bundles live in{' '}
            <code className="font-mono text-slate-800 bg-slate-100 px-1 py-0.5 rounded">
              public/lib/
            </code>{' '}
            and are served directly from{' '}
            <code className="font-mono text-slate-800 bg-slate-100 px-1 py-0.5 rounded">
              /lib/
            </code>
            . Rebuild anytime with{' '}
            <code className="font-mono text-slate-800 bg-slate-100 px-1 py-0.5 rounded">
              npm run build:lib
            </code>
            .
          </p>

          <div className="divide-y divide-slate-100 border-t border-slate-200">
            {ARTIFACTS.map((item) => (
              <div key={item.path} className="py-3">
                <div className="font-mono text-xs font-semibold text-slate-900">
                  {item.path}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <FolderTree className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-semibold text-slate-900">
              Standalone Module Architecture
            </h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            The source pipeline lives in{' '}
            <code className="font-mono text-slate-800 bg-slate-100 px-1 py-0.5 rounded">
              src/scanner/
            </code>{' '}
            with zero React or build-tool dependencies.
          </p>

          <div className="divide-y divide-slate-100 border-t border-slate-200">
            {MODULES.map((mod) => (
              <div key={mod.name} className="py-3">
                <div className="font-mono text-xs font-semibold text-slate-900">
                  src/scanner/{mod.name}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{mod.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="lg:col-span-7 flex flex-col gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-slate-900">
                01. Remote Website &lt;script&gt; + Worker Warmup &amp; Specimen Detection (v{SCANNER_VERSION})
              </h3>
            </div>
            <button
              type="button"
              onClick={() => copyBlock('umd', UMD_SNIPPET)}
              className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1.5"
            >
              {copiedId === 'umd' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Code
                </>
              )}
            </button>
          </div>
          <pre className="p-4 bg-slate-950 text-slate-100 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
            {UMD_SNIPPET}
          </pre>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-slate-900">
                02. Remote ES Module, Pair Scan &amp; Cancellation
              </h3>
            </div>
            <button
              type="button"
              onClick={() => copyBlock('esm', ESM_REMOTE_SNIPPET)}
              className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1.5"
            >
              {copiedId === 'esm' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Code
                </>
              )}
            </button>
          </div>
          <pre className="p-4 bg-slate-950 text-slate-100 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
            {ESM_REMOTE_SNIPPET}
          </pre>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-slate-900">
                03. Standalone Validation, Fast MRZ-Only &amp; Consensus Helpers
              </h3>
            </div>
            <button
              type="button"
              onClick={() => copyBlock('source', SOURCE_SNIPPET)}
              className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1.5"
            >
              {copiedId === 'source' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Code
                </>
              )}
            </button>
          </div>
          <pre className="p-4 bg-slate-950 text-slate-100 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
            {SOURCE_SNIPPET}
          </pre>
        </div>
      </section>
    </div>
  );
};
