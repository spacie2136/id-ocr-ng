import React, { useState } from 'react';
import { Check, Copy, FolderTree, Terminal } from 'lucide-react';

const USAGE_SNIPPET = `import { DocumentScanner } from './scanner';

// Keep one scanner instance to reuse the WebAssembly worker across scans
const scanner = new DocumentScanner();

export async function handleDocumentUpload(file: File) {
  const identity = await scanner.scan(file, {
    language: 'eng',
    preprocess: true,
    enhanceMrzPass: true,
    onProgress: ({ stage, progress, message }) => {
      console.log(\`[\${stage}] \${progress}% — \${message}\`);
    },
  });

  console.log({
    fullName: identity.fullName,
    documentNumber: identity.documentNumber,
    personalNumber: identity.personalNumber,
    dateOfBirth: identity.dateOfBirth,
    dateOfExpiry: identity.dateOfExpiry,
    nationality: identity.nationalityName,
    mrzValid: identity.mrz?.allCheckDigitsValid ?? null,
    address: identity.address,
  });

  return identity;
}

// Call scanner.terminate() when unmounting or shutting down`;

const ONE_SHOT_SNIPPET = `import { scanDocumentImage, parseMrzFromText, parseVizText } from './scanner';

// 1. One-shot image scan (creates and terminates worker automatically)
const result = await scanDocumentImage(imageFileOrDataUrl);

// 2. Or use the pure text parsers standalone with any OCR text
const mrz = parseMrzFromText(rawText);
const viz = parseVizText(rawText);`;

const MODULES = [
  {
    name: 'ocrEngine.ts',
    role: 'Tesseract.js worker orchestration, dual-pass (full page + MRZ strip) scanning, and field merging.',
  },
  {
    name: 'imagePreprocessor.ts',
    role: 'Browser Canvas scaling, rotation, 2nd–98th percentile contrast stretching, and bottom MRZ isolation.',
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
    name: 'countries.ts',
    role: 'ISO 3166-1 alpha-3 and ICAO special issuing-state lookup dictionary.',
  },
  {
    name: 'types.ts',
    role: 'Strict framework-agnostic TypeScript interfaces for ExtractedIdentity and ScannerOptions.',
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
      {/* Architecture overview */}
      <section className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <FolderTree className="w-4 h-4 text-blue-600" />
          <h2 className="text-base font-semibold text-slate-900">
            Standalone Module Architecture
          </h2>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          The entire OCR pipeline lives in a framework-agnostic directory with zero React dependencies. Only{' '}
          <code className="font-mono text-slate-800 bg-slate-100 px-1 py-0.5 rounded">
            tesseract.js
          </code>{' '}
          is required as a runtime dependency—copy the folder directly into any React, Next.js, Vue, or vanilla TypeScript project.
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

      {/* Integration snippets */}
      <section className="lg:col-span-7 flex flex-col gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-slate-900">
                01. Drop-In Integration (Persistent Worker)
              </h3>
            </div>
            <button
              type="button"
              onClick={() => copyBlock('persistent', USAGE_SNIPPET)}
              className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1.5"
            >
              {copiedId === 'persistent' ? (
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
            {USAGE_SNIPPET}
          </pre>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between gap-4 mb-3">
            <h3 className="text-sm font-semibold text-slate-900">
              02. One-Shot Helper &amp; Standalone Parsers
            </h3>
            <button
              type="button"
              onClick={() => copyBlock('oneshot', ONE_SHOT_SNIPPET)}
              className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1.5"
            >
              {copiedId === 'oneshot' ? (
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
            {ONE_SHOT_SNIPPET}
          </pre>
        </div>
      </section>
    </div>
  );
};
