import { useCallback, useEffect, useRef, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { DocumentViewport } from './components/DocumentViewport';
import { ExtractedResultsPanel } from './components/ExtractedResultsPanel';
import { IntegrationGuide } from './components/IntegrationGuide';
import {
  DocumentScanner,
  type ExtractedIdentity,
  type ScanProgress,
} from './scanner';

type AppView = 'workbench' | 'history' | 'integration';

interface SessionScanRecord {
  id: string;
  fileName: string;
  file: File;
  scannedAt: string;
  result: ExtractedIdentity;
}

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('workbench');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [rotation, setRotation] = useState<0 | 90 | 180 | 270>(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [preprocess, setPreprocess] = useState(true);
  const [enhanceMrzPass, setEnhanceMrzPass] = useState(true);

  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState<ScanProgress | null>(null);
  const [result, setResult] = useState<ExtractedIdentity | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SessionScanRecord[]>([]);

  const scannerRef = useRef<DocumentScanner | null>(null);

  useEffect(() => {
    scannerRef.current = new DocumentScanner();
    return () => {
      scannerRef.current?.terminate();
      scannerRef.current = null;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const runScan = useCallback(
    async (
      fileToScan: File,
      opts: {
        rot: 0 | 90 | 180 | 270;
        autoRot: boolean;
        prep: boolean;
        mrzPass: boolean;
      }
    ) => {
      if (!scannerRef.current) {
        scannerRef.current = new DocumentScanner();
      }
      setIsScanning(true);
      setError(null);
      setProgress({
        stage: 'preprocessing',
        progress: 2,
        message: 'Preparing image for client-side OCR…',
      });

      try {
        const extracted = await scannerRef.current.scan(fileToScan, {
          language: 'eng',
          preprocess: opts.prep,
          enhanceMrzPass: opts.mrzPass,
          autoRotate: opts.autoRot,
          rotation: opts.rot,
          includePreviews: true,
          onProgress: (p) => setProgress(p),
        });

        setResult(extracted);
        setHistory((prev) => [
          {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            fileName: fileToScan.name,
            file: fileToScan,
            scannedAt: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
            result: extracted,
          },
          ...prev,
        ]);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'An unexpected error occurred while running Tesseract OCR.'
        );
      } finally {
        setIsScanning(false);
      }
    },
    []
  );

  const handleSelectFile = (file: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const nextUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(nextUrl);
    setRotation(0);
    setAutoRotate(true);
    setResult(null);
    setError(null);
    setActiveView('workbench');
    void runScan(file, {
      rot: 0,
      autoRot: true,
      prep: preprocess,
      mrzPass: enhanceMrzPass,
    });
  };

  const handleClearFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setRotation(0);
    setResult(null);
    setError(null);
    setProgress(null);
  };

  const handleRotate = () => {
    const baseRotation = result?.orientation?.coarseDegrees ?? rotation;
    const nextRotation = ((baseRotation + 90) % 360) as 0 | 90 | 180 | 270;
    setAutoRotate(false);
    setRotation(nextRotation);
    setResult(null);
  };

  const handleToggleAutoRotate = (enabled: boolean) => {
    setAutoRotate(enabled);
    if (enabled) {
      setRotation(0);
    }
  };

  const handleTriggerScan = () => {
    if (!selectedFile || isScanning) return;
    void runScan(selectedFile, {
      rot: rotation,
      autoRot: autoRotate,
      prep: preprocess,
      mrzPass: enhanceMrzPass,
    });
  };

  const handleExportJson = () => {
    if (!result) return;
    const payload = JSON.stringify({ ...result, previews: undefined }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `identity-scan-${result.documentNumber || Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Bar Contract: Brand wordmark — Nav links — 1 Primary action */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-15 flex items-center justify-between gap-8">
          <a
            href="#workbench"
            onClick={(e) => {
              e.preventDefault();
              setActiveView('workbench');
            }}
            className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            DocScan OCR
          </a>

          <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={() => setActiveView('workbench')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                activeView === 'workbench'
                  ? 'text-slate-900 border-blue-600'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Scanner Workbench
            </button>
            <button
              type="button"
              onClick={() => setActiveView('history')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                activeView === 'history'
                  ? 'text-slate-900 border-blue-600'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Session Scans ({history.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveView('integration')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                activeView === 'integration'
                  ? 'text-slate-900 border-blue-600'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Integration Guide
            </button>
          </nav>

          <div className="flex items-center shrink-0">
            {result ? (
              <button
                type="button"
                onClick={handleExportJson}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                Download JSON
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setActiveView('workbench');
                  handleClearFile();
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                New Scan
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-slate-900 text-balance">
            {activeView === 'workbench'
              ? 'Browser Passport & ID Card OCR Scanner'
              : activeView === 'history'
                ? 'Session Scan Log'
                : 'Modular SDK & Integration Reference'}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            {activeView === 'workbench'
              ? 'Auto-straightens rotated documents and extracts Machine Readable Zone (TD1, TD2, TD3) check digits and Visual Inspection Zone personal fields client-side using Tesseract.js.'
              : activeView === 'history'
                ? 'In-memory scans processed during this browser session. No document images or personal data leave your device.'
                : 'Drop-in TypeScript module architecture designed to be copied straight into future web applications.'}
          </p>
        </div>

        {activeView === 'workbench' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-6 flex flex-col">
              <DocumentViewport
                selectedFile={selectedFile}
                previewUrl={previewUrl}
                result={result}
                isScanning={isScanning}
                progress={progress}
                rotation={rotation}
                autoRotate={autoRotate}
                preprocess={preprocess}
                enhanceMrzPass={enhanceMrzPass}
                onSelectFile={handleSelectFile}
                onClearFile={handleClearFile}
                onRotate={handleRotate}
                onToggleAutoRotate={handleToggleAutoRotate}
                onTogglePreprocess={setPreprocess}
                onToggleMrzPass={setEnhanceMrzPass}
                onTriggerScan={handleTriggerScan}
              />
            </div>

            <div className="lg:col-span-6 flex flex-col">
              <ExtractedResultsPanel
                result={result}
                isScanning={isScanning}
                error={error}
                onExportJson={handleExportJson}
              />
            </div>
          </div>
        )}

        {activeView === 'history' && (
          <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            {history.length === 0 ? (
              <div className="py-16 px-6 text-center">
                <p className="text-sm font-semibold text-slate-900">
                  No documents scanned in this session yet
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Run a scan in the Scanner Workbench to inspect extracted records here.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveView('workbench')}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Go to Scanner Workbench
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                      <th className="py-3 px-4 font-semibold">Time</th>
                      <th className="py-3 px-4 font-semibold">File</th>
                      <th className="py-3 px-4 font-semibold">Holder Name</th>
                      <th className="py-3 px-4 font-semibold">Document No.</th>
                      <th className="py-3 px-4 font-semibold">Format</th>
                      <th className="py-3 px-4 font-semibold text-right">Confidence</th>
                      <th className="py-3 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {history.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70">
                        <td className="py-3 px-4 font-mono tabular-nums text-slate-500 whitespace-nowrap">
                          {item.scannedAt}
                        </td>
                        <td className="py-3 px-4 text-slate-700 max-w-[180px] truncate">
                          {item.fileName}
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-900">
                          {item.result.fullName || 'Unrecognized'}
                        </td>
                        <td className="py-3 px-4 font-mono tabular-nums text-slate-700">
                          {item.result.documentNumber || '—'}
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-600">
                          {item.result.documentFormat}
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-700">
                          {item.result.confidence}%
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedFile(item.file);
                              setRotation(0);
                              setAutoRotate(item.result.orientation?.autoDetected ?? true);
                              setResult(item.result);
                              if (item.result.previews?.originalDataUrl) {
                                setPreviewUrl(item.result.previews.originalDataUrl);
                              }
                              setActiveView('workbench');
                            }}
                            className="text-xs font-medium text-blue-600 hover:text-blue-700 mr-3"
                          >
                            Inspect
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setHistory((prev) => prev.filter((r) => r.id !== item.id))
                            }
                            title="Delete record"
                            className="text-slate-400 hover:text-red-600 inline-flex items-center align-middle"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {activeView === 'integration' && <IntegrationGuide />}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-auto">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <span>Client-side document OCR workbench · Tesseract.js + ICAO 9303 MRZ</span>
          <span>All image processing stays in browser memory</span>
        </div>
      </footer>
    </div>
  );
}
