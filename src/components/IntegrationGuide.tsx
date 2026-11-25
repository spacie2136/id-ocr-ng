import React, { useState } from 'react';
import { Check, Copy, FolderTree, Globe, Package, Terminal } from 'lucide-react';
import { SCANNER_VERSION } from '../scanner';

const UMD_SNIPPET = `<!-- Always use the latest build via GitHub + jsDelivr (or pin @v${SCANNER_VERSION}/.../docscan-ocr.v${SCANNER_VERSION}.umd.js) -->
<script src="https://cdn.jsdelivr.net/gh/<USERNAME>/<REPO>@main/public/lib/docscan-ocr.latest.umd.js"></script>
<script>
  const { DocumentScanner, SCANNER_VERSION } = window.DocScanOCR;
  console.log('Loaded DocScan OCR v' + SCANNER_VERSION);

  const scanner = new DocumentScanner();

  // Single document with 4-corner perspective correction + auto-rotate
  const identity = await scanner.scan(file, {
    perspectiveCorrection: true,
    autoRotate: true,
    preprocess: true,
    enhanceMrzPass: true,
  });

  // Or scan & merge front + back sides of a national ID / residence permit
  const merged = await scanner.scanPair(frontFile, backFile, {
    perspectiveCorrection: true,
    autoRotate: true,
  });
  console.log(merged.fullName, merged.address, merged.sidesConsistent, merged.conflicts);
</script>`;

const ESM_REMOTE_SNIPPET = `<script type="module">
  import {
    DocumentScanner,
    scanDocumentImage,
    scanDocumentPair,
    SCANNER_VERSION,
  } from 'https://cdn.jsdelivr.net/gh/<USERNAME>/<REPO>@main/public/lib/docscan-ocr.latest.es.js';

  // Optional: point Tesseract assets to your own origin for strict CSP / offline hosting
  const scanner = new DocumentScanner({
    workerPath: '/tesseract/worker.min.js',
    corePath: '/tesseract/tesseract-core-simd.wasm.js',
    langPath: '/tesseract/lang-data',
    workerBlobURL: false,
  });

  // One-shot two-sided ID scan & merge
  const merged = await scanDocumentPair(frontFile, backFile, {
    perspectiveCorrection: true,
    autoRotate: true,
    includePreviews: false,
  });

  console.log(\`v\${SCANNER_VERSION}\`, merged);
</script>`;

const SOURCE_SNIPPET = `import {
  DocumentScanner,
  analyzeDocumentOrientation,
  detectDocumentQuad,
  mergeDocumentSides,
  parseMrzFromText,
  parseVizText,
} from './scanner';

// Keep one scanner instance to reuse the WebAssembly worker across scans
const scanner = new DocumentScanner();
const front = await scanner.scan(frontFile, { perspectiveCorrection: true, autoRotate: true });
const back = await scanner.scan(backFile, { perspectiveCorrection: true, autoRotate: true });

// Merge separately scanned sides cleanly & check cross-side consistency
const merged = mergeDocumentSides(front, back);

// Or pass explicit normalized [0..1] corners to warp a tilted photo before OCR
const customWarped = await scanner.scan(angledPhoto, {
  corners: {
    topLeft: { x: 0.08, y: 0.12 },
    topRight: { x: 0.91, y: 0.09 },
    bottomRight: { x: 0.94, y: 0.88 },
    bottomLeft: { x: 0.06, y: 0.85 },
  },
});`;

const MODULES = [
  {
    name: 'ocrEngine.ts',
    role: 'Tesseract.js worker orchestration, perspective & orientation probing, scanPair(), and dual-pass MRZ merging.',
  },
  {
    name: 'perspective.ts',
    role: 'Pure-JS 4-corner document quadrilateral detector, orthogonal boundary refiner, and 3×3 homography bilinear warp.',
  },
  {
    name: 'pairMerger.ts',
    role: 'Two-sided Front + Back identity merger with swapped-side detection, accented VIZ enrichment, and consistency conflict checks.',
  },
  {
    name: 'orientation.ts',
    role: 'Pure-JS fine skew estimator ([-45°, +45°]) and 4-way orientation ranker using local ink contrast & projection profiles.',
  },
  {
    name: 'imagePreprocessor.ts',
    role: 'Browser Canvas scaling, arbitrary-angle rotation/deskewing, contrast stretching, and flat-field MRZ isolation.',
  },
  {
    name: 'mrzParser.ts',
    role: 'Pure TypeScript ICAO 9303 parser for TD1 (3×30), TD2 (2×36), TD3 (2×44), MRV-A/B + Modulo-10 check digits.',
  },
  {
    name: 'vizParser.ts',
    role: 'Multilingual Visual Inspection Zone extractor for names, dates, addresses, authorities, and license details.',
  },
  {
    name: 'countries.ts, version.ts & types.ts',
    role: `ISO 3166-1/ICAO country lookup, v${SCANNER_VERSION} version export, and framework-agnostic TypeScript interfaces.`,
  },
];

const ARTIFACTS = [
  {
    path: '/lib/docscan-ocr.latest.umd.js',
    desc: 'Always-latest UMD script (exposes window.DocScanOCR) so remote apps update automatically.',
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
                01. Remote Website &lt;script&gt; Embed (UMD latest / v{SCANNER_VERSION})
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
                02. Remote ES Module, Pair Scan &amp; Worker Config
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
                03. Two-Sided Merging &amp; Manual Perspective Corners
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
