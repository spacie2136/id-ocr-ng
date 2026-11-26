import { useCallback, useEffect, useRef, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { DocumentViewport, type ScanMode } from './components/DocumentViewport';
import { ExtractedResultsPanel } from './components/ExtractedResultsPanel';
import { IntegrationGuide } from './components/IntegrationGuide';
import {
  DocumentScanner,
  isScanAbortedError,
  type DocumentQuad,
  type ExtractedIdentity,
  type MergedDocumentResult,
  type MrzOcrModel,
  type ScanProgress,
  type VizLanguageMode,
} from './scanner';

type AppView = 'workbench' | 'history' | 'integration';

interface SessionScanRecord {
  id: string;
  fileName: string;
  file: File;
  backFile?: File;
  scannedAt: string;
  result: ExtractedIdentity | MergedDocumentResult;
}

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('workbench');
  const [scanMode, setScanMode] = useState<ScanMode>('single');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [frontPreviewUrl, setFrontPreviewUrl] = useState<string | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [backPreviewUrl, setBackPreviewUrl] = useState<string | null>(null);

  const [rotation, setRotation] = useState<0 | 90 | 180 | 270>(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [perspectiveCorrection, setPerspectiveCorrection] = useState(true);
  const [manualCorners, setManualCorners] = useState<DocumentQuad | null>(null);
  const [preprocess, setPreprocess] = useState(true);
  const [enhanceMrzPass, setEnhanceMrzPass] = useState(true);
  const [enableBarcodePass, setEnableBarcodePass] = useState(true);
  const [extractMedia, setExtractMedia] = useState(true);
  const [mrzModel, setMrzModel] = useState<MrzOcrModel>('ocrb');
  const [vizLanguageMode, setVizLanguageMode] = useState<VizLanguageMode>('auto');
  const [useCustomVizLanguages, setUseCustomVizLanguages] = useState(false);
  const [customVizLanguages, setCustomVizLanguages] = useState('eng+deu');

  const [isScanning, setIsScanning] = useState(false);
  const [scanCancelled, setScanCancelled] = useState(false);
  const [progress, setProgress] = useState<ScanProgress | null>(null);
  const [result, setResult] = useState<ExtractedIdentity | MergedDocumentResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SessionScanRecord[]>([]);

  const scannerRef = useRef<DocumentScanner | null>(null);
  const scanAbortControllerRef = useRef<AbortController | null>(null);

  const abortActiveScan = useCallback(() => {
    if (scanAbortControllerRef.current) {
      scanAbortControllerRef.current.abort('Scan cancelled by user');
      scanAbortControllerRef.current = null;
    }
  }, []);

  useEffect(() => {
    scannerRef.current = new DocumentScanner();
    return () => {
      abortActiveScan();
      void scannerRef.current?.terminate();
      scannerRef.current = null;
    };
  }, [abortActiveScan]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      if (frontPreviewUrl) URL.revokeObjectURL(frontPreviewUrl);
    };
  }, [frontPreviewUrl]);

  useEffect(() => {
    return () => {
      if (backPreviewUrl) URL.revokeObjectURL(backPreviewUrl);
    };
  }, [backPreviewUrl]);

  const runScan = useCallback(
    async (
      fileToScan: File,
      opts: {
        rot: 0 | 90 | 180 | 270;
        autoRot: boolean;
        persp: boolean;
        corners: DocumentQuad | null;
        prep: boolean;
        mrzPass: boolean;
        barcodePass: boolean;
        mediaCrop: boolean;
        mrzModel: MrzOcrModel;
        vizMode: VizLanguageMode;
        customViz: string | undefined;
      }
    ) => {
      abortActiveScan();
      const controller = new AbortController();
      scanAbortControllerRef.current = controller;

      if (!scannerRef.current) {
        scannerRef.current = new DocumentScanner();
      }
      setIsScanning(true);
      setScanCancelled(false);
      setError(null);
      setProgress({
        stage: 'preprocessing',
        progress: 2,
        message: 'Preparing image for off-thread OCR preprocessing…',
      });

      try {
        const extracted = await scannerRef.current.scan(fileToScan, {
          language: 'eng',
          mrzModel: opts.mrzModel,
          vizLanguageMode: opts.vizMode,
          vizLanguages: opts.customViz,
          preprocess: opts.prep,
          enhanceMrzPass: opts.mrzPass,
          enableBarcodePass: opts.barcodePass,
          extractPortrait: opts.mediaCrop,
          extractSignature: opts.mediaCrop,
          detectSpecimen: true,
          perspectiveCorrection: opts.persp,
          corners: opts.corners ?? undefined,
          autoRotate: opts.autoRot,
          rotation: opts.rot,
          includePreviews: true,
          signal: controller.signal,
          onProgress: (p) => {
            if (scanAbortControllerRef.current === controller) {
              setProgress(p);
            }
          },
        });

        if (scanAbortControllerRef.current !== controller) return;

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
        if (isScanAbortedError(err)) {
          if (scanAbortControllerRef.current === controller) {
            setScanCancelled(true);
            setProgress(null);
          }
          return;
        }
        if (scanAbortControllerRef.current === controller) {
          setError(
            err instanceof Error
              ? err.message
              : 'An unexpected error occurred while running Tesseract OCR.'
          );
        }
      } finally {
        if (scanAbortControllerRef.current === controller) {
          scanAbortControllerRef.current = null;
          setIsScanning(false);
        }
      }
    },
    [abortActiveScan]
  );

  const runPairScan = useCallback(
    async (
      fFile: File,
      bFile: File,
      opts: {
        autoRot: boolean;
        persp: boolean;
        prep: boolean;
        mrzPass: boolean;
        barcodePass: boolean;
        mediaCrop: boolean;
        mrzModel: MrzOcrModel;
        vizMode: VizLanguageMode;
        customViz: string | undefined;
      }
    ) => {
      abortActiveScan();
      const controller = new AbortController();
      scanAbortControllerRef.current = controller;

      if (!scannerRef.current) {
        scannerRef.current = new DocumentScanner();
      }
      setIsScanning(true);
      setScanCancelled(false);
      setError(null);
      setProgress({
        stage: 'preprocessing',
        progress: 2,
        message: 'Scanning front & back sides…',
      });

      try {
        const merged = await scannerRef.current.scanPair(fFile, bFile, {
          language: 'eng',
          mrzModel: opts.mrzModel,
          vizLanguageMode: opts.vizMode,
          vizLanguages: opts.customViz,
          preprocess: opts.prep,
          enhanceMrzPass: opts.mrzPass,
          enableBarcodePass: opts.barcodePass,
          extractPortrait: opts.mediaCrop,
          extractSignature: opts.mediaCrop,
          detectSpecimen: true,
          perspectiveCorrection: opts.persp,
          autoRotate: opts.autoRot,
          includePreviews: true,
          signal: controller.signal,
          onProgress: (p) => {
            if (scanAbortControllerRef.current === controller) {
              setProgress(p);
            }
          },
        });

        if (scanAbortControllerRef.current !== controller) return;

        setResult(merged);
        setHistory((prev) => [
          {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            fileName: `${fFile.name} + ${bFile.name}`,
            file: fFile,
            backFile: bFile,
            scannedAt: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
            result: merged,
          },
          ...prev,
        ]);
      } catch (err) {
        if (isScanAbortedError(err)) {
          if (scanAbortControllerRef.current === controller) {
            setScanCancelled(true);
            setProgress(null);
          }
          return;
        }
        if (scanAbortControllerRef.current === controller) {
          setError(
            err instanceof Error
              ? err.message
              : 'An unexpected error occurred while scanning front & back sides.'
          );
        }
      } finally {
        if (scanAbortControllerRef.current === controller) {
          scanAbortControllerRef.current = null;
          setIsScanning(false);
        }
      }
    },
    [abortActiveScan]
  );

  const handleCancelScan = useCallback(() => {
    abortActiveScan();
    setIsScanning(false);
    setProgress(null);
    setScanCancelled(true);
  }, [abortActiveScan]);

  const activeCustomViz = useCustomVizLanguages ? customVizLanguages.trim() || 'eng' : undefined;

  const handleSelectFile = (file: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const nextUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(nextUrl);
    setRotation(0);
    setAutoRotate(true);
    setManualCorners(null);
    setResult(null);
    setError(null);
    setScanCancelled(false);
    setActiveView('workbench');
    void runScan(file, {
      rot: 0,
      autoRot: true,
      persp: perspectiveCorrection,
      corners: null,
      prep: preprocess,
      mrzPass: enhanceMrzPass,
      barcodePass: enableBarcodePass,
      mediaCrop: extractMedia,
      mrzModel,
      vizMode: vizLanguageMode,
      customViz: activeCustomViz,
    });
  };

  const handleClearFile = () => {
    abortActiveScan();
    setIsScanning(false);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setRotation(0);
    setManualCorners(null);
    setResult(null);
    setError(null);
    setScanCancelled(false);
    setProgress(null);
  };

  const handleSelectPairFile = (side: 'front' | 'back', file: File) => {
    const nextUrl = URL.createObjectURL(file);
    setResult(null);
    setError(null);
    setScanCancelled(false);
    setActiveView('workbench');

    if (side === 'front') {
      if (frontPreviewUrl) URL.revokeObjectURL(frontPreviewUrl);
      setFrontFile(file);
      setFrontPreviewUrl(nextUrl);
      if (backFile) {
        void runPairScan(file, backFile, {
          autoRot: autoRotate,
          persp: perspectiveCorrection,
          prep: preprocess,
          mrzPass: enhanceMrzPass,
          barcodePass: enableBarcodePass,
          mediaCrop: extractMedia,
          mrzModel,
          vizMode: vizLanguageMode,
          customViz: activeCustomViz,
        });
      }
    } else {
      if (backPreviewUrl) URL.revokeObjectURL(backPreviewUrl);
      setBackFile(file);
      setBackPreviewUrl(nextUrl);
      if (frontFile) {
        void runPairScan(frontFile, file, {
          autoRot: autoRotate,
          persp: perspectiveCorrection,
          prep: preprocess,
          mrzPass: enhanceMrzPass,
          barcodePass: enableBarcodePass,
          mediaCrop: extractMedia,
          mrzModel,
          vizMode: vizLanguageMode,
          customViz: activeCustomViz,
        });
      }
    }
  };

  const handleClearPairFile = (side: 'front' | 'back') => {
    abortActiveScan();
    setIsScanning(false);
    setResult(null);
    setError(null);
    setScanCancelled(false);
    setProgress(null);
    if (side === 'front') {
      if (frontPreviewUrl) URL.revokeObjectURL(frontPreviewUrl);
      setFrontFile(null);
      setFrontPreviewUrl(null);
    } else {
      if (backPreviewUrl) URL.revokeObjectURL(backPreviewUrl);
      setBackFile(null);
      setBackPreviewUrl(null);
    }
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
    if (isScanning) return;
    if (scanMode === 'pair') {
      if (!frontFile || !backFile) return;
      void runPairScan(frontFile, backFile, {
        autoRot: autoRotate,
        persp: perspectiveCorrection,
        prep: preprocess,
        mrzPass: enhanceMrzPass,
        barcodePass: enableBarcodePass,
        mediaCrop: extractMedia,
        mrzModel,
        vizMode: vizLanguageMode,
        customViz: activeCustomViz,
      });
      return;
    }

    if (!selectedFile) return;
    void runScan(selectedFile, {
      rot: rotation,
      autoRot: autoRotate,
      persp: perspectiveCorrection,
      corners: manualCorners,
      prep: preprocess,
      mrzPass: enhanceMrzPass,
      barcodePass: enableBarcodePass,
      mediaCrop: extractMedia,
      mrzModel,
      vizMode: vizLanguageMode,
      customViz: activeCustomViz,
    });
  };

  const handleExportJson = () => {
    if (!result) return;
    const sanitized =
      'sides' in result
        ? {
            ...result,
            previews: undefined,
            sides: {
              front: { ...result.sides.front, previews: undefined },
              back: { ...result.sides.back, previews: undefined },
            },
          }
        : { ...result, previews: undefined };
    const payload = JSON.stringify(sanitized, null, 2);
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
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-15 flex items-center justify-between gap-4 sm:gap-8">
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

          <nav className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-slate-600 overflow-x-auto">
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

          <div className="hidden sm:flex items-center shrink-0">
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
                  handleClearPairFile('front');
                  handleClearPairFile('back');
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
              ? 'Offloads 4-corner perspective, orientation & MRZ preprocessing to OffscreenCanvas Web Workers, crops portraits & signatures, detects specimen watermarks, decodes PDF417 barcodes, and extracts OCR-B MRZ & native VIZ fields client-side.'
              : activeView === 'history'
                ? 'In-memory scans processed during this browser session. No document images or personal data leave your device.'
                : 'Drop-in TypeScript module architecture designed to be copied or embedded via CDN straight into web applications.'}
          </p>
        </div>

        {activeView === 'workbench' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-6 flex flex-col">
              <DocumentViewport
                scanMode={scanMode}
                selectedFile={selectedFile}
                previewUrl={previewUrl}
                frontFile={frontFile}
                frontPreviewUrl={frontPreviewUrl}
                backFile={backFile}
                backPreviewUrl={backPreviewUrl}
                result={result}
                isScanning={isScanning}
                progress={progress}
                rotation={rotation}
                autoRotate={autoRotate}
                perspectiveCorrection={perspectiveCorrection}
                manualCorners={manualCorners}
                preprocess={preprocess}
                enhanceMrzPass={enhanceMrzPass}
                enableBarcodePass={enableBarcodePass}
                extractMedia={extractMedia}
                mrzModel={mrzModel}
                vizLanguageMode={vizLanguageMode}
                useCustomVizLanguages={useCustomVizLanguages}
                customVizLanguages={customVizLanguages}
                onChangeScanMode={(mode) => {
                  abortActiveScan();
                  setIsScanning(false);
                  setProgress(null);
                  setScanMode(mode);
                  setResult(null);
                  setError(null);
                  setScanCancelled(false);
                }}
                onSelectFile={handleSelectFile}
                onClearFile={handleClearFile}
                onSelectPairFile={handleSelectPairFile}
                onClearPairFile={handleClearPairFile}
                onRotate={handleRotate}
                onToggleAutoRotate={handleToggleAutoRotate}
                onTogglePerspective={setPerspectiveCorrection}
                onChangeManualCorners={setManualCorners}
                onTogglePreprocess={setPreprocess}
                onToggleMrzPass={setEnhanceMrzPass}
                onToggleBarcodePass={setEnableBarcodePass}
                onToggleExtractMedia={setExtractMedia}
                onChangeMrzModel={setMrzModel}
                onChangeVizLanguageMode={(mode) => {
                  setUseCustomVizLanguages(false);
                  setVizLanguageMode(mode);
                }}
                onToggleCustomVizLanguages={setUseCustomVizLanguages}
                onChangeCustomVizLanguages={setCustomVizLanguages}
                onTriggerScan={handleTriggerScan}
                onCancelScan={handleCancelScan}
              />
            </div>

            <div className="lg:col-span-6 flex flex-col">
              <ExtractedResultsPanel
                result={result}
                isScanning={isScanning}
                scanCancelled={scanCancelled}
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
                              if ('sides' in item.result && item.backFile) {
                                setScanMode('pair');
                                setFrontFile(item.file);
                                setBackFile(item.backFile);
                                setFrontPreviewUrl(
                                  item.result.sides.front.previews?.originalDataUrl ?? null
                                );
                                setBackPreviewUrl(
                                  item.result.sides.back.previews?.originalDataUrl ?? null
                                );
                              } else {
                                setScanMode('single');
                                setSelectedFile(item.file);
                                setRotation(0);
                                setAutoRotate(item.result.orientation?.autoDetected ?? true);
                                if (item.result.previews?.originalDataUrl) {
                                  setPreviewUrl(item.result.previews.originalDataUrl);
                                }
                              }
                              if (item.result.mrzModel) {
                                setMrzModel(item.result.mrzModel);
                              }
                              if (item.result.vizLanguageMode) {
                                setVizLanguageMode(item.result.vizLanguageMode);
                              }
                              setScanCancelled(false);
                              setError(null);
                              setResult(item.result);
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
          <span>Client-side document OCR workbench · Tesseract.js + OffscreenCanvas + PDF417 AAMVA</span>
          <span>All image processing stays in browser memory</span>
        </div>
      </footer>
    </div>
  );
}
