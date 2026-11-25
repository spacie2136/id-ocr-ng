import React, { useEffect, useRef, useState } from 'react';
import {
  Camera,
  Compass,
  FileImage,
  Loader2,
  RotateCw,
  ScanLine,
  ScanText,
  SlidersHorizontal,
  Upload,
  X,
} from 'lucide-react';
import type { ExtractedIdentity, ScanProgress } from '../scanner';
import { generateTestDocumentFile, type SpecimenKind } from '../utils/sampleDocuments';

export type InputMode = 'upload' | 'camera' | 'specimen';
export type PreviewLayer = 'original' | 'enhanced' | 'mrz';

interface DocumentViewportProps {
  selectedFile: File | null;
  previewUrl: string | null;
  result: ExtractedIdentity | null;
  isScanning: boolean;
  progress: ScanProgress | null;
  rotation: 0 | 90 | 180 | 270;
  autoRotate: boolean;
  preprocess: boolean;
  enhanceMrzPass: boolean;
  onSelectFile: (file: File) => void;
  onClearFile: () => void;
  onRotate: () => void;
  onToggleAutoRotate: (val: boolean) => void;
  onTogglePreprocess: (val: boolean) => void;
  onToggleMrzPass: (val: boolean) => void;
  onTriggerScan: () => void;
}

export const DocumentViewport: React.FC<DocumentViewportProps> = ({
  selectedFile,
  previewUrl,
  result,
  isScanning,
  progress,
  rotation,
  autoRotate,
  preprocess,
  enhanceMrzPass,
  onSelectFile,
  onClearFile,
  onRotate,
  onToggleAutoRotate,
  onTogglePreprocess,
  onToggleMrzPass,
  onTriggerScan,
}) => {
  const [inputMode, setInputMode] = useState<InputMode>('upload');
  const [previewLayer, setPreviewLayer] = useState<PreviewLayer>('original');
  const [isDragging, setIsDragging] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [generatingSpecimen, setGeneratingSpecimen] = useState<SpecimenKind | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    if (inputMode !== 'camera') {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [inputMode]);

  useEffect(() => {
    if (!result?.previews) {
      setPreviewLayer('original');
    }
  }, [result]);

  const startCamera = async () => {
    setCameraError(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError('Camera capture is not supported in this browser context.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });
      streamRef.current = stream;
      setCameraActive(true);
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });
    } catch (err) {
      setCameraError(
        err instanceof Error
          ? err.message
          : 'Unable to access camera. Check browser permissions.'
      );
    }
  };

  const captureCameraFrame = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `camera-capture-${Date.now()}.png`, {
        type: 'image/png',
      });
      stopCamera();
      setInputMode('upload');
      onSelectFile(file);
    }, 'image/png');
  };

  const handleLoadSpecimen = async (kind: SpecimenKind) => {
    setGeneratingSpecimen(kind);
    try {
      const file = await generateTestDocumentFile(kind);
      onSelectFile(file);
    } finally {
      setGeneratingSpecimen(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onSelectFile(file);
    }
  };

  const activePreviewSrc = (() => {
    if (result?.previews) {
      if (previewLayer === 'enhanced') return result.previews.enhancedDataUrl;
      if (previewLayer === 'mrz') return result.previews.mrzCropDataUrl;
      return result.previews.originalDataUrl;
    }
    return previewUrl;
  })();

  const appliedAngleLabel = (() => {
    if (result?.orientation) {
      const { coarseDegrees, deskewDegrees, totalDegrees, autoDetected } = result.orientation;
      if (totalDegrees !== 0) {
        const prefix = autoDetected ? 'Auto-straightened' : 'Rotated';
        if (coarseDegrees !== 0 && deskewDegrees !== 0) {
          return `${prefix} ${coarseDegrees}° (${deskewDegrees > 0 ? '+' : ''}${deskewDegrees}° skew)`;
        }
        if (coarseDegrees !== 0) {
          return `${prefix} ${coarseDegrees}°`;
        }
        return `${prefix} ${deskewDegrees > 0 ? '+' : ''}${deskewDegrees}°`;
      }
      return null;
    }
    return rotation !== 0 ? `${rotation}°` : null;
  })();

  return (
    <section className="flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden">
      {/* Header & Source Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-200">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Document Source</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Processed 100% locally in your browser · Zero server uploads
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            type="button"
            onClick={() => setInputMode('upload')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              inputMode === 'upload'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload Image
          </button>
          <button
            type="button"
            onClick={() => setInputMode('camera')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              inputMode === 'camera'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            Camera
          </button>
          <button
            type="button"
            onClick={() => setInputMode('specimen')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              inputMode === 'specimen'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileImage className="w-3.5 h-3.5" />
            Test Specimens
          </button>
        </div>
      </div>

      {/* Main Viewport Area */}
      <div className="p-5 flex flex-col gap-4">
        {inputMode === 'camera' && (
          <div className="border border-slate-200 rounded-lg bg-slate-950 overflow-hidden">
            {cameraActive ? (
              <div className="relative aspect-16/10 w-full bg-slate-950">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {/* Document alignment reticle */}
                <div className="pointer-events-none absolute inset-6 border-2 border-dashed border-white/70 rounded-lg flex items-end justify-center pb-3">
                  <span className="text-xs font-medium text-white bg-slate-900/75 px-3 py-1 rounded">
                    Align passport or ID card inside frame · Keep MRZ sharp
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="px-3 py-2 text-xs font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Stop
                  </button>
                  <button
                    type="button"
                    onClick={captureCameraFrame}
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Capture Photo
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-16 px-6 text-center flex flex-col items-center gap-3">
                <Camera className="w-8 h-8 text-slate-400" />
                <div className="max-w-sm">
                  <p className="text-sm font-medium text-white">
                    Capture Passport or ID Card via Webcam
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Works best under even lighting without glare over the MRZ lines.
                  </p>
                </div>
                {cameraError && (
                  <p className="text-xs text-red-400 max-w-md">{cameraError}</p>
                )}
                <button
                  type="button"
                  onClick={startCamera}
                  className="mt-1 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap"
                >
                  Enable Camera
                </button>
              </div>
            )}
          </div>
        )}

        {inputMode === 'specimen' && (
          <div className="border border-slate-200 rounded-lg bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Canvas-Rendered Test Documents
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Generates a real PNG image in-browser and runs the actual Tesseract OCR + MRZ/VIZ parser on its pixels.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                disabled={generatingSpecimen !== null || isScanning}
                onClick={() => handleLoadSpecimen('passport_td3')}
                className="flex flex-col items-start text-left p-3 bg-white border border-slate-200 hover:border-blue-400 rounded-lg transition-colors disabled:opacity-50"
              >
                <span className="text-xs font-semibold text-slate-900">
                  {generatingSpecimen === 'passport_td3' ? 'Rendering…' : 'Passport (TD3)'}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">
                  2×44 MRZ + Visual Zone
                </span>
              </button>
              <button
                type="button"
                disabled={generatingSpecimen !== null || isScanning}
                onClick={() => handleLoadSpecimen('id_card_td1')}
                className="flex flex-col items-start text-left p-3 bg-white border border-slate-200 hover:border-blue-400 rounded-lg transition-colors disabled:opacity-50"
              >
                <span className="text-xs font-semibold text-slate-900">
                  {generatingSpecimen === 'id_card_td1' ? 'Rendering…' : 'National ID (TD1)'}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">
                  3×30 MRZ + Personal ID
                </span>
              </button>
              <button
                type="button"
                disabled={generatingSpecimen !== null || isScanning}
                onClick={() => handleLoadSpecimen('driver_license')}
                className="flex flex-col items-start text-left p-3 bg-white border border-slate-200 hover:border-blue-400 rounded-lg transition-colors disabled:opacity-50"
              >
                <span className="text-xs font-semibold text-slate-900">
                  {generatingSpecimen === 'driver_license'
                    ? 'Rendering…'
                    : "Driver's License"}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">
                  Visual Zone (No MRZ)
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Active Image Preview or Upload Dropzone */}
        {activePreviewSrc ? (
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-slate-600 min-w-0">
                <span className="font-medium text-slate-900 truncate max-w-[200px]">
                  {selectedFile?.name ?? 'Captured Document'}
                </span>
                {result?.sourceDimensions && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">
                      {result.sourceDimensions.width}×{result.sourceDimensions.height}px
                    </span>
                  </>
                )}
                {appliedAngleLabel && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums text-blue-700 font-medium">
                      {appliedAngleLabel}
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                {result?.previews && (
                  <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-md mr-1">
                    {(['original', 'enhanced', 'mrz'] as const).map((layer) => (
                      <button
                        key={layer}
                        type="button"
                        onClick={() => setPreviewLayer(layer)}
                        className={`px-2 py-1 text-[11px] font-medium rounded transition-colors whitespace-nowrap ${
                          previewLayer === layer
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {layer === 'original'
                          ? 'Original'
                          : layer === 'enhanced'
                            ? 'OCR Grayscale'
                            : 'MRZ Strip'}
                      </button>
                    ))}
                  </div>
                )}
                <button
                  type="button"
                  onClick={onRotate}
                  disabled={isScanning}
                  title="Manual rotate 90° clockwise (disables auto-rotate)"
                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors disabled:opacity-40"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onClearFile}
                  disabled={isScanning}
                  title="Remove document"
                  className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-40"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative border border-slate-200 rounded-lg bg-slate-100 overflow-hidden flex items-center justify-center min-h-[280px] max-h-[440px]">
              <img
                src={activePreviewSrc}
                alt="Document preview for client-side OCR"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[420px] object-contain transition-transform duration-150"
                style={{
                  transform: result?.previews ? undefined : `rotate(${rotation}deg)`,
                }}
              />
              {isScanning && (
                <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[1px] flex flex-col items-center justify-center p-6 text-center">
                  <div className="bg-white border border-slate-200 rounded-xl p-5 w-full max-w-xs shadow-lg">
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-900">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                      <span>Running Browser OCR</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5">
                      {progress?.message ?? 'Processing image…'}
                    </p>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-3">
                      <div
                        className="h-full bg-blue-600 transition-all duration-200"
                        style={{ width: `${progress?.progress ?? 10}%` }}
                      />
                    </div>
                    <div className="mt-1.5 text-right text-[11px] font-mono tabular-nums text-slate-500">
                      {progress?.progress ?? 0}%
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          inputMode === 'upload' && (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              className={`border-2 border-dashed rounded-lg py-16 px-6 text-center cursor-pointer transition-colors ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/50'
                  : 'border-slate-300 hover:border-slate-400 bg-slate-50/60'
              }`}
            >
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-900">
                Drop a passport, ID card, or driver&apos;s license image here
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Supports PNG, JPG, WebP, AVIF · Auto-straightens rotated scans
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-slate-900 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap"
              >
                Select Image File
              </button>
            </div>
          )
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onSelectFile(file);
            e.target.value = '';
          }}
        />

        {/* Scanner Preprocessing Options & Run Trigger */}
        <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoRotate}
                onChange={(e) => onToggleAutoRotate(e.target.checked)}
                disabled={isScanning}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-slate-400" />
                Auto-Rotate &amp; Deskew
              </span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={preprocess}
                onChange={(e) => onTogglePreprocess(e.target.checked)}
                disabled={isScanning}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                Contrast &amp; Grayscale
              </span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={enhanceMrzPass}
                onChange={(e) => onToggleMrzPass(e.target.checked)}
                disabled={isScanning}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="flex items-center gap-1">
                <ScanText className="w-3.5 h-3.5 text-slate-400" />
                Dedicated MRZ Strip Pass
              </span>
            </label>
          </div>

          <button
            type="button"
            disabled={!selectedFile || isScanning}
            onClick={onTriggerScan}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            {isScanning ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Scanning…
              </>
            ) : (
              <>
                <ScanLine className="w-3.5 h-3.5" />
                {result ? 'Re-Scan Document' : 'Run Client-Side OCR'}
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
