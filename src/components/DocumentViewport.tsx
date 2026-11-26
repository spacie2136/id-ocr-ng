import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Camera,
  CheckCircle2,
  Compass,
  Crop,
  FileImage,
  Layers,
  Loader2,
  QrCode,
  RotateCw,
  ScanLine,
  ScanText,
  SlidersHorizontal,
  Sparkles,
  SwitchCamera,
  Upload,
  UserSquare2,
  X,
} from 'lucide-react';
import {
  CameraAutoCapture,
  computeVisibleVideoCrop,
  type DocumentQuad,
  type ExtractedIdentity,
  type ImageQualityReport,
  type MergedDocumentResult,
  type MrzOcrModel,
  type ScanProgress,
  type VizLanguageMode,
} from '../scanner';
import { generateTestDocumentFile, type SpecimenKind } from '../utils/sampleDocuments';

export type InputMode = 'upload' | 'camera' | 'specimen';
export type ScanMode = 'single' | 'pair';
export type PreviewLayer = 'original' | 'enhanced' | 'mrz';

interface CameraDeviceOption {
  deviceId: string;
  label: string;
  facingHint: 'back' | 'front' | 'other';
}

const DEFAULT_QUAD: DocumentQuad = {
  topLeft: { x: 0.08, y: 0.08 },
  topRight: { x: 0.92, y: 0.08 },
  bottomRight: { x: 0.92, y: 0.92 },
  bottomLeft: { x: 0.08, y: 0.92 },
};

type CornerKey = keyof DocumentQuad;

function classifyCameraFacing(label: string): 'back' | 'front' | 'other' {
  if (/\b(?:back|rear|environment|macro|tele|wide)\b/i.test(label)) {
    return 'back';
  }
  if (/\b(?:front|user|selfie|facetime)\b/i.test(label)) {
    return 'front';
  }
  return 'other';
}

function buildCameraOptions(devices: MediaDeviceInfo[]): CameraDeviceOption[] {
  const videoInputs = devices.filter((d) => d.kind === 'videoinput' && d.deviceId.trim().length > 0);
  const rawList = videoInputs.map((device, index) => {
    const trimmed = device.label.trim();
    const facingHint = classifyCameraFacing(trimmed);
    return {
      deviceId: device.deviceId,
      rawLabel: trimmed,
      facingHint,
      originalIndex: index,
    };
  });

  const labelCounts = new Map<string, number>();
  for (const item of rawList) {
    if (item.rawLabel) {
      labelCounts.set(item.rawLabel, (labelCounts.get(item.rawLabel) ?? 0) + 1);
    }
  }
  const seenCounts = new Map<string, number>();

  const formatted: Array<CameraDeviceOption & { originalIndex: number }> = rawList.map((item) => {
    let label = item.rawLabel;
    if (!label) {
      label = `Camera ${item.originalIndex + 1}`;
    } else if ((labelCounts.get(label) ?? 0) > 1) {
      const next = (seenCounts.get(label) ?? 0) + 1;
      seenCounts.set(label, next);
      label = `${label} (#${next})`;
    }
    return {
      deviceId: item.deviceId,
      label,
      facingHint: item.facingHint,
      originalIndex: item.originalIndex,
    };
  });

  const rank: Record<CameraDeviceOption['facingHint'], number> = {
    back: 0,
    other: 1,
    front: 2,
  };

  formatted.sort((a, b) => {
    const rDiff = rank[a.facingHint] - rank[b.facingHint];
    return rDiff !== 0 ? rDiff : a.originalIndex - b.originalIndex;
  });

  return formatted.map(({ deviceId, label, facingHint }) => ({
    deviceId,
    label,
    facingHint,
  }));
}

interface DocumentViewportProps {
  scanMode: ScanMode;
  selectedFile: File | null;
  previewUrl: string | null;
  frontFile: File | null;
  frontPreviewUrl: string | null;
  backFile: File | null;
  backPreviewUrl: string | null;
  result: ExtractedIdentity | MergedDocumentResult | null;
  isScanning: boolean;
  progress: ScanProgress | null;
  rotation: 0 | 90 | 180 | 270;
  autoRotate: boolean;
  perspectiveCorrection: boolean;
  manualCorners: DocumentQuad | null;
  preprocess: boolean;
  enhanceMrzPass: boolean;
  enableBarcodePass: boolean;
  extractMedia: boolean;
  mrzModel: MrzOcrModel;
  vizLanguageMode: VizLanguageMode;
  useCustomVizLanguages: boolean;
  customVizLanguages: string;
  onChangeScanMode: (mode: ScanMode) => void;
  onSelectFile: (file: File) => void;
  onClearFile: () => void;
  onSelectPairFile: (side: 'front' | 'back', file: File) => void;
  onClearPairFile: (side: 'front' | 'back') => void;
  onRotate: () => void;
  onToggleAutoRotate: (val: boolean) => void;
  onTogglePerspective: (val: boolean) => void;
  onChangeManualCorners: (corners: DocumentQuad | null) => void;
  onTogglePreprocess: (val: boolean) => void;
  onToggleMrzPass: (val: boolean) => void;
  onToggleBarcodePass: (val: boolean) => void;
  onToggleExtractMedia: (val: boolean) => void;
  onChangeMrzModel: (model: MrzOcrModel) => void;
  onChangeVizLanguageMode: (mode: VizLanguageMode) => void;
  onToggleCustomVizLanguages: (enabled: boolean) => void;
  onChangeCustomVizLanguages: (lang: string) => void;
  onTriggerScan: () => void;
  onCancelScan: () => void;
}

export const DocumentViewport: React.FC<DocumentViewportProps> = ({
  scanMode,
  selectedFile,
  previewUrl,
  frontFile,
  frontPreviewUrl,
  backFile,
  backPreviewUrl,
  result,
  isScanning,
  progress,
  rotation,
  autoRotate,
  perspectiveCorrection,
  manualCorners,
  preprocess,
  enhanceMrzPass,
  enableBarcodePass,
  extractMedia,
  mrzModel,
  vizLanguageMode,
  useCustomVizLanguages,
  customVizLanguages,
  onChangeScanMode,
  onSelectFile,
  onClearFile,
  onSelectPairFile,
  onClearPairFile,
  onRotate,
  onToggleAutoRotate,
  onTogglePerspective,
  onChangeManualCorners,
  onTogglePreprocess,
  onToggleMrzPass,
  onToggleBarcodePass,
  onToggleExtractMedia,
  onChangeMrzModel,
  onChangeVizLanguageMode,
  onToggleCustomVizLanguages,
  onChangeCustomVizLanguages,
  onTriggerScan,
  onCancelScan,
}) => {
  const [inputMode, setInputMode] = useState<InputMode>('upload');
  const [previewLayer, setPreviewLayer] = useState<PreviewLayer>('original');
  const [isDragging, setIsDragging] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [isSwitchingCamera, setIsSwitchingCamera] = useState(false);
  const [availableCameras, setAvailableCameras] = useState<CameraDeviceOption[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');
  const [cameraTargetSide, setCameraTargetSide] = useState<'single' | 'front' | 'back'>('single');
  const [autoCaptureEnabled, setAutoCaptureEnabled] = useState(true);
  const [liveQuality, setLiveQuality] = useState<ImageQualityReport | null>(null);
  const [stabilityProgress, setStabilityProgress] = useState(0);
  const [generatingSpecimen, setGeneratingSpecimen] = useState<SpecimenKind | null>(null);
  const [editingCorners, setEditingCorners] = useState(false);
  const [activeDragCorner, setActiveDragCorner] = useState<CornerKey | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const frontInputRef = useRef<HTMLInputElement | null>(null);
  const backInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const autoCaptureRef = useRef<CameraAutoCapture | null>(null);
  const autoCaptureEnabledRef = useRef(autoCaptureEnabled);
  const cameraTargetRef = useRef(cameraTargetSide);
  const selectedCameraIdRef = useRef(selectedCameraId);
  const cameraRequestSeqRef = useRef(0);
  const cornerOverlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    autoCaptureEnabledRef.current = autoCaptureEnabled;
  }, [autoCaptureEnabled]);

  useEffect(() => {
    cameraTargetRef.current = cameraTargetSide;
  }, [cameraTargetSide]);

  useEffect(() => {
    selectedCameraIdRef.current = selectedCameraId;
  }, [selectedCameraId]);

  const refreshCameraDevices = useCallback(async (): Promise<CameraDeviceOption[]> => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.enumerateDevices) {
      return [];
    }
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const options = buildCameraOptions(devices);
      setAvailableCameras(options);
      return options;
    } catch {
      return [];
    }
  }, []);

  useEffect(() => {
    void refreshCameraDevices();
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.addEventListener) {
      return;
    }
    const handleDeviceChange = () => {
      void refreshCameraDevices();
    };
    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);
    };
  }, [refreshCameraDevices]);

  const stopStreamOnly = useCallback(() => {
    if (autoCaptureRef.current) {
      autoCaptureRef.current.stop();
      autoCaptureRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const stopCamera = useCallback(() => {
    cameraRequestSeqRef.current += 1;
    stopStreamOnly();
    setCameraActive(false);
    setIsSwitchingCamera(false);
    setLiveQuality(null);
    setStabilityProgress(0);
  }, [stopStreamOnly]);

  useEffect(() => {
    if (inputMode !== 'camera') {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [inputMode, stopCamera]);

  useEffect(() => {
    if (!result?.previews) {
      setPreviewLayer('original');
    }
  }, [result]);

  useEffect(() => {
    if (!selectedFile) {
      setEditingCorners(false);
    }
  }, [selectedFile]);

  const startAutoCaptureWatcher = (videoEl: HTMLVideoElement) => {
    if (autoCaptureRef.current) {
      autoCaptureRef.current.stop();
    }
    const watcher = new CameraAutoCapture(videoEl, {
      sampleIntervalMs: 170,
      requiredStableFrames: 2,
      minSharpness: 22,
      maxMotionDelta: 8.5,
      stopOnCapture: false,
      captureRegion: () => computeVisibleVideoCrop(videoEl),
      onQualityUpdate: (report, stabProgress) => {
        setLiveQuality(report);
        setStabilityProgress(autoCaptureEnabledRef.current ? stabProgress : 0);
      },
      onAutoCapture: (file) => {
        if (!autoCaptureEnabledRef.current) return;
        const target = cameraTargetRef.current;
        stopCamera();
        setInputMode('upload');
        if (target === 'front' || target === 'back') {
          onSelectPairFile(target, file);
        } else {
          onSelectFile(file);
        }
      },
    });
    autoCaptureRef.current = watcher;
    watcher.start();
  };

  const startCamera = async (
    target: 'single' | 'front' | 'back' = 'single',
    overrideDeviceId?: string
  ) => {
    setCameraTargetSide(target);
    cameraTargetRef.current = target;
    setCameraError(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError('Camera capture is not supported in this browser context.');
      return;
    }

    const requestId = ++cameraRequestSeqRef.current;
    const desiredDeviceId =
      overrideDeviceId !== undefined ? overrideDeviceId : selectedCameraIdRef.current;

    // Release active hardware session before requesting a new camera lens (avoids Android NotReadableError)
    stopStreamOnly();
    setIsSwitchingCamera(true);

    const acquireStream = async (): Promise<MediaStream> => {
      if (desiredDeviceId) {
        try {
          return await navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: { exact: desiredDeviceId },
              width: { ideal: 1920 },
              height: { ideal: 1080 },
            },
            audio: false,
          });
        } catch {
          return await navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: { ideal: desiredDeviceId },
              width: { ideal: 1920 },
              height: { ideal: 1080 },
            },
            audio: false,
          });
        }
      }
      return await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });
    };

    try {
      const stream = await acquireStream();

      if (cameraRequestSeqRef.current !== requestId) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack && typeof videoTrack.applyConstraints === 'function') {
        try {
          await videoTrack.applyConstraints({
            advanced: [{ focusMode: 'continuous' } as unknown as MediaTrackConstraintSet],
          });
        } catch {
          // Ignore unsupported focusMode constraints on desktop webcams
        }
      }

      streamRef.current = stream;
      setCameraActive(true);
      setIsSwitchingCamera(false);

      // Permission is now granted — enumerate all rear/wide/macro/front lenses on the phone
      const enumerated = await refreshCameraDevices();
      if (cameraRequestSeqRef.current !== requestId) {
        return;
      }

      const activeDeviceId = videoTrack?.getSettings?.().deviceId;
      if (activeDeviceId && enumerated.some((cam) => cam.deviceId === activeDeviceId)) {
        setSelectedCameraId(activeDeviceId);
        selectedCameraIdRef.current = activeDeviceId;
      } else if (desiredDeviceId && enumerated.some((cam) => cam.deviceId === desiredDeviceId)) {
        setSelectedCameraId(desiredDeviceId);
        selectedCameraIdRef.current = desiredDeviceId;
      }

      requestAnimationFrame(() => {
        if (cameraRequestSeqRef.current !== requestId) return;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          void videoRef.current.play().catch(() => {
            // Ignore autoplay restriction errors when already user-initiated
          });
          startAutoCaptureWatcher(videoRef.current);
        }
      });
    } catch (err) {
      if (cameraRequestSeqRef.current !== requestId) return;
      setIsSwitchingCamera(false);
      setCameraActive(false);
      setCameraError(
        err instanceof Error
          ? err.message
          : 'Unable to access camera. Check browser permissions.'
      );
    }
  };

  const handleSelectCamera = (nextDeviceId: string) => {
    setSelectedCameraId(nextDeviceId);
    selectedCameraIdRef.current = nextDeviceId;
    if (cameraActive) {
      void startCamera(cameraTargetRef.current, nextDeviceId);
    }
  };

  const handleCycleCamera = () => {
    if (availableCameras.length <= 1 || isSwitchingCamera) return;
    const currentIdx = availableCameras.findIndex((cam) => cam.deviceId === selectedCameraId);
    const nextIdx = currentIdx >= 0 ? (currentIdx + 1) % availableCameras.length : 0;
    const nextCam = availableCameras[nextIdx];
    if (nextCam) {
      handleSelectCamera(nextCam.deviceId);
    }
  };

  const captureCameraFrame = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) return;

    const vw = video.videoWidth;
    const vh = video.videoHeight;
    const visibleCrop = computeVisibleVideoCrop(video);
    const sx = visibleCrop ? Math.max(0, Math.round(visibleCrop.x * vw)) : 0;
    const sy = visibleCrop ? Math.max(0, Math.round(visibleCrop.y * vh)) : 0;
    const sw = visibleCrop ? Math.min(vw - sx, Math.max(16, Math.round(visibleCrop.width * vw))) : vw;
    const sh = visibleCrop ? Math.min(vh - sy, Math.max(16, Math.round(visibleCrop.height * vh))) : vh;

    const canvas = document.createElement('canvas');
    canvas.width = sw;
    canvas.height = sh;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, sw, sh);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const target = cameraTargetRef.current;
      const file = new File([blob], `camera-capture-${Date.now()}.png`, {
        type: 'image/png',
      });
      stopCamera();
      setInputMode('upload');
      if (target === 'front' || target === 'back') {
        onSelectPairFile(target, file);
      } else {
        onSelectFile(file);
      }
    }, 'image/png');
  };

  const handleLoadSpecimen = async (kind: SpecimenKind) => {
    setGeneratingSpecimen(kind);
    try {
      const file = await generateTestDocumentFile(kind);
      onChangeScanMode('single');
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

  const toggleCornerEditor = () => {
    if (!editingCorners) {
      const seed = manualCorners ?? result?.perspective?.corners ?? DEFAULT_QUAD;
      onChangeManualCorners(seed);
      setEditingCorners(true);
    } else {
      setEditingCorners(false);
    }
  };

  const handlePointerMoveOverlay = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activeDragCorner || !cornerOverlayRef.current) return;
    const rect = cornerOverlayRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    const base = manualCorners ?? DEFAULT_QUAD;
    onChangeManualCorners({
      ...base,
      [activeDragCorner]: { x, y },
    });
  };

  const activePreviewSrc = (() => {
    if (editingCorners) {
      return previewUrl;
    }
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

  const mergedResult = result && 'sides' in result ? result : null;
  const activeQuad = manualCorners ?? DEFAULT_QUAD;
  const canRunScan =
    scanMode === 'pair' ? Boolean(frontFile && backFile) : Boolean(selectedFile);
  const vizSelectValue = useCustomVizLanguages ? 'custom' : vizLanguageMode;

  const renderPairSideSlot = (
    side: 'front' | 'back',
    title: string,
    subtitle: string,
    file: File | null,
    sidePreviewUrl: string | null,
    inputRef: React.RefObject<HTMLInputElement | null>
  ) => {
    const sideResult = mergedResult ? mergedResult.sides[side] : null;
    const displaySrc = sideResult?.previews?.originalDataUrl ?? sidePreviewUrl;

    return (
      <div className="border border-slate-200 rounded-lg bg-slate-50/70 p-3 flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-xs font-semibold text-slate-900">{title}</div>
            <div className="text-[11px] text-slate-500">{subtitle}</div>
          </div>
          <div className="flex items-center gap-1">
            {!file && (
              <button
                type="button"
                onClick={() => {
                  setInputMode('camera');
                  void startCamera(side);
                }}
                disabled={isScanning}
                title={`Capture ${side} with camera`}
                className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 rounded transition-colors disabled:opacity-40"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            )}
            {file && (
              <button
                type="button"
                onClick={() => onClearPairFile(side)}
                disabled={isScanning}
                title={`Remove ${side} image`}
                className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-40"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {displaySrc ? (
          <div className="relative border border-slate-200 rounded-md bg-slate-100 h-44 flex items-center justify-center overflow-hidden">
            <img
              src={displaySrc}
              alt={`${title} preview`}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ) : (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const dropped = e.dataTransfer.files?.[0];
              if (dropped && dropped.type.startsWith('image/')) {
                onSelectPairFile(side, dropped);
              }
            }}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                inputRef.current?.click();
              }
            }}
            className="border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-md h-44 flex flex-col items-center justify-center p-4 text-center cursor-pointer bg-white transition-colors"
          >
            <Upload className="w-6 h-6 text-slate-400 mb-2" />
            <span className="text-xs font-medium text-slate-800">
              Select or drop {side} image
            </span>
          </div>
        )}

        {file && (
          <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500">
            <span className="truncate font-medium text-slate-700">{file.name}</span>
            <div className="flex items-center gap-2 shrink-0">
              {sideResult?.barcode && (
                <span className="font-mono text-indigo-700">
                  {sideResult.barcode.aamva ? 'AAMVA' : 'PDF417'}
                </span>
              )}
              {sideResult?.mrz && (
                <span className="font-mono text-emerald-700">
                  MRZ {sideResult.mrz.validCount}/{sideResult.mrz.totalChecks}
                </span>
              )}
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const picked = e.target.files?.[0];
            if (picked) onSelectPairFile(side, picked);
            e.target.value = '';
          }}
        />
      </div>
    );
  };

  return (
    <section className="flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden">
      {/* Header & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-200">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Document Source</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Processed 100% locally in your browser · Zero server uploads
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              disabled={isScanning}
              onClick={() => {
                onChangeScanMode('single');
                setInputMode('upload');
              }}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                scanMode === 'single'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Single Side
            </button>
            <button
              type="button"
              disabled={isScanning}
              onClick={() => {
                onChangeScanMode('pair');
                setInputMode('upload');
              }}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                scanMode === 'pair'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Front + Back ID
            </button>
          </div>

          {scanMode === 'single' && (
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
                Upload
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
                Specimens
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Viewport Area */}
      <div className="p-5 flex flex-col gap-4">
        {inputMode === 'camera' && (
          <div className="border border-slate-200 rounded-lg bg-slate-950 overflow-hidden">
            {cameraActive ? (
              <div className="flex flex-col bg-slate-950">
                <div
                  onClick={captureCameraFrame}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      captureCameraFrame();
                    }
                  }}
                  aria-label="Camera viewfinder — tap anywhere to capture framed document"
                  className="relative aspect-[4/3] sm:aspect-[16/10] w-full bg-slate-950 overflow-hidden cursor-pointer block"
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {isSwitchingCamera && (
                    <div className="pointer-events-none absolute inset-0 bg-slate-950/65 flex items-center justify-center gap-2 text-xs font-medium text-white">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Switching camera lens…</span>
                    </div>
                  )}

                  {liveQuality?.detectedCorners && !isSwitchingCamera && (
                    <svg
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      className="pointer-events-none absolute inset-0 w-full h-full"
                    >
                      <polygon
                        points={`${liveQuality.detectedCorners.topLeft.x * 100},${liveQuality.detectedCorners.topLeft.y * 100} ${liveQuality.detectedCorners.topRight.x * 100},${liveQuality.detectedCorners.topRight.y * 100} ${liveQuality.detectedCorners.bottomRight.x * 100},${liveQuality.detectedCorners.bottomRight.y * 100} ${liveQuality.detectedCorners.bottomLeft.x * 100},${liveQuality.detectedCorners.bottomLeft.y * 100}`}
                        fill={
                          liveQuality.passed
                            ? 'rgba(16, 185, 129, 0.14)'
                            : 'rgba(245, 158, 11, 0.12)'
                        }
                        stroke={liveQuality.passed ? '#10b981' : '#f59e0b'}
                        strokeWidth="0.7"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  )}

                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
                    <div
                      className={`relative w-[86%] max-w-[440px] aspect-[1.586/1] max-h-[72%] border-2 border-dashed rounded-lg transition-colors ${
                        liveQuality?.passed
                          ? 'border-emerald-400'
                          : liveQuality?.hasGlare || liveQuality?.exposureStatus !== 'ok'
                            ? 'border-amber-400/80'
                            : 'border-white/75'
                      }`}
                    >
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-white/85 whitespace-nowrap drop-shadow">
                        Fill frame · Tap shutter or tap video to capture
                      </span>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
                    <div
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 backdrop-blur-sm min-w-0 ${
                        liveQuality?.passed
                          ? 'bg-emerald-950/85 text-emerald-100 border border-emerald-500/50'
                          : 'bg-slate-900/80 text-slate-100 border border-white/15'
                      }`}
                    >
                      {liveQuality?.passed && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      )}
                      <span className="truncate">
                        {liveQuality?.guidance ?? 'Align document inside guide…'}
                      </span>
                    </div>

                    {liveQuality && (
                      <div className="hidden sm:flex px-2 py-1 rounded-lg bg-slate-900/80 border border-white/15 text-[11px] font-mono tabular-nums text-slate-200 backdrop-blur-sm items-center gap-2 shrink-0">
                        <span>Sharp {liveQuality.sharpnessScore}</span>
                        <span>Glare {Math.round(liveQuality.glareRatio * 100)}%</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Camera Lens Selector Bar */}
                {availableCameras.length > 0 && (
                  <div className="px-4 py-2 bg-slate-900 border-t border-white/10 flex items-center gap-2">
                    <label
                      htmlFor="live-camera-select"
                      className="text-[11px] font-medium text-slate-400 whitespace-nowrap shrink-0 flex items-center gap-1.5"
                    >
                      <SwitchCamera className="w-3.5 h-3.5 text-slate-300" />
                      <span className="hidden sm:inline">Camera:</span>
                    </label>
                    <select
                      id="live-camera-select"
                      aria-label="Select camera lens"
                      value={selectedCameraId}
                      disabled={isSwitchingCamera}
                      onChange={(e) => handleSelectCamera(e.target.value)}
                      className="flex-1 min-w-0 text-xs font-medium text-slate-100 bg-slate-800 border border-slate-700 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                    >
                      {!selectedCameraId && (
                        <option value="">Rear Camera (Auto)</option>
                      )}
                      {availableCameras.map((cam, idx) => (
                        <option key={cam.deviceId} value={cam.deviceId}>
                          {cam.label || `Camera ${idx + 1}`}
                        </option>
                      ))}
                    </select>
                    {availableCameras.length > 1 && (
                      <button
                        type="button"
                        onClick={handleCycleCamera}
                        disabled={isSwitchingCamera}
                        title="Switch to next camera"
                        className="px-2.5 py-1.5 text-xs font-medium text-slate-100 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <SwitchCamera className="w-3.5 h-3.5" />
                        <span>Switch ({availableCameras.length})</span>
                      </button>
                    )}
                  </div>
                )}

                <div className="px-4 py-3 bg-slate-950 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="flex flex-col gap-1 min-w-[115px]">
                    <button
                      type="button"
                      onClick={() => setAutoCaptureEnabled((prev) => !prev)}
                      className={`text-xs font-semibold flex items-center gap-1.5 transition-colors text-left ${
                        autoCaptureEnabled ? 'text-emerald-300' : 'text-slate-300'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>Auto: {autoCaptureEnabled ? 'ON' : 'OFF'}</span>
                    </button>
                    {autoCaptureEnabled && (
                      <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-400 transition-all duration-150"
                          style={{ width: `${Math.round(stabilityProgress * 100)}%` }}
                        />
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={captureCameraFrame}
                    disabled={isSwitchingCamera}
                    aria-label="Capture Photo"
                    title="Capture framed photo now"
                    className="w-12 h-12 rounded-full bg-white text-slate-950 ring-4 ring-white/25 hover:bg-slate-100 active:scale-90 disabled:opacity-50 transition-all flex items-center justify-center shrink-0 shadow-md"
                  >
                    <Camera className="w-5 h-5" />
                  </button>

                  <div className="flex items-center justify-end min-w-[115px]">
                    <button
                      type="button"
                      onClick={() => {
                        stopCamera();
                        if (scanMode === 'pair') {
                          setInputMode('upload');
                        }
                      }}
                      className="px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap"
                    >
                      Stop
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-16 px-6 text-center flex flex-col items-center gap-3">
                <Camera className="w-8 h-8 text-slate-400" />
                <div className="max-w-sm">
                  <p className="text-sm font-medium text-white">
                    Live Camera Auto-Capture &amp; Quality Gate
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Automatically crops to the viewfinder frame and measures focus sharpness, glare hotspots, lighting, and steadiness before triggering capture.
                  </p>
                </div>
                {availableCameras.length > 0 && (
                  <div className="w-full max-w-xs flex flex-col gap-1.5 mt-1 text-left">
                    <label
                      htmlFor="pre-camera-select"
                      className="text-[11px] font-medium text-slate-400"
                    >
                      Preferred Camera
                    </label>
                    <select
                      id="pre-camera-select"
                      value={selectedCameraId}
                      onChange={(e) => handleSelectCamera(e.target.value)}
                      className="w-full text-xs font-medium text-slate-100 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Rear Camera (Auto Default)</option>
                      {availableCameras.map((cam, idx) => (
                        <option key={cam.deviceId} value={cam.deviceId}>
                          {cam.label || `Camera ${idx + 1}`}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {cameraError && (
                  <p className="text-xs text-red-400 max-w-md">{cameraError}</p>
                )}
                <button
                  type="button"
                  disabled={isSwitchingCamera}
                  onClick={() => startCamera('single')}
                  className="mt-1 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors whitespace-nowrap"
                >
                  {isSwitchingCamera ? 'Starting Camera…' : 'Enable Camera'}
                </button>
              </div>
            )}
          </div>
        )}

        {scanMode === 'single' && inputMode === 'specimen' && (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                  2×44 MRZ + Portrait + Visual Zone
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
                  3×30 MRZ + Portrait + Personal ID
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
                  Visual Zone + Portrait (No MRZ)
                </span>
              </button>
              <button
                type="button"
                disabled={generatingSpecimen !== null || isScanning}
                onClick={() => handleLoadSpecimen('specimen_watermark')}
                className="flex flex-col items-start text-left p-3 bg-white border border-slate-200 hover:border-red-400 rounded-lg transition-colors disabled:opacity-50"
              >
                <span className="text-xs font-semibold text-slate-900">
                  {generatingSpecimen === 'specimen_watermark'
                    ? 'Rendering…'
                    : 'Watermarked Specimen (MUSTER)'}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">
                  Portrait + Signature + Red Stamp
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Front + Back Pair Mode */}
        {scanMode === 'pair' && inputMode !== 'camera' && (
          <div className="relative flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {renderPairSideSlot(
                'front',
                'Front Side',
                'Portrait, full name, sex, DOB',
                frontFile,
                frontPreviewUrl,
                frontInputRef
              )}
              {renderPairSideSlot(
                'back',
                'Back Side',
                'MRZ lines, PDF417 barcode, address',
                backFile,
                backPreviewUrl,
                backInputRef
              )}
            </div>

            {isScanning && (
              <div className="rounded-lg border border-blue-200 bg-blue-50/70 p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-900">
                      Scanning &amp; Merging Both Sides
                    </div>
                    <div className="text-xs text-slate-600 truncate">
                      {progress?.message ?? 'Processing front and back images…'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
                    {progress?.progress ?? 0}%
                  </span>
                  <button
                    type="button"
                    onClick={onCancelScan}
                    className="px-2.5 py-1 text-xs font-medium text-red-700 bg-white border border-red-200 hover:bg-red-50 rounded-md transition-colors whitespace-nowrap"
                  >
                    Cancel Scan
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Single Document Preview or Dropzone */}
        {scanMode === 'single' && activePreviewSrc && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 min-w-0">
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
                {result?.perspective?.applied && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-emerald-700 font-medium">
                      {result.perspective.autoDetected
                        ? 'Perspective rectified'
                        : 'Manual 4-corner warp'}
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
                {result?.previews && !editingCorners && (
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
                  onClick={toggleCornerEditor}
                  disabled={isScanning}
                  title="Manually adjust 4 perspective corners"
                  className={`p-1.5 rounded-md transition-colors disabled:opacity-40 flex items-center gap-1 text-xs font-medium ${
                    editingCorners
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Crop className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {editingCorners ? 'Done' : 'Corners'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onRotate}
                  disabled={isScanning || editingCorners}
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

            {editingCorners && (
              <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
                <span>
                  Drag the 4 corner handles to frame the card/page, then click{' '}
                  <strong>Re-Scan Document</strong>.
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onChangeManualCorners(null);
                    setEditingCorners(false);
                  }}
                  className="font-medium text-blue-700 hover:text-blue-900 underline"
                >
                  Reset to auto
                </button>
              </div>
            )}

            <div className="relative border border-slate-200 rounded-lg bg-slate-100 overflow-hidden flex items-center justify-center min-h-[280px] max-h-[440px]">
              <div
                ref={cornerOverlayRef}
                onPointerMove={handlePointerMoveOverlay}
                onPointerUp={() => setActiveDragCorner(null)}
                onPointerCancel={() => setActiveDragCorner(null)}
                className="relative inline-flex items-center justify-center max-w-full max-h-[420px] select-none touch-none"
              >
                <img
                  src={activePreviewSrc}
                  alt="Document preview for client-side OCR"
                  referrerPolicy="no-referrer"
                  draggable={false}
                  className="max-w-full max-h-[420px] object-contain transition-transform duration-150 block"
                  style={{
                    transform:
                      result?.previews && !editingCorners
                        ? undefined
                        : `rotate(${rotation}deg)`,
                  }}
                />

                {editingCorners && (
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  >
                    <polygon
                      points={`${activeQuad.topLeft.x * 100},${activeQuad.topLeft.y * 100} ${activeQuad.topRight.x * 100},${activeQuad.topRight.y * 100} ${activeQuad.bottomRight.x * 100},${activeQuad.bottomRight.y * 100} ${activeQuad.bottomLeft.x * 100},${activeQuad.bottomLeft.y * 100}`}
                      fill="rgba(37, 99, 235, 0.14)"
                      stroke="#2563eb"
                      strokeWidth="0.7"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                )}

                {editingCorners &&
                  (['topLeft', 'topRight', 'bottomRight', 'bottomLeft'] as CornerKey[]).map(
                    (key) => {
                      const pt = activeQuad[key];
                      return (
                        <button
                          key={key}
                          type="button"
                          aria-label={`Drag ${key} corner`}
                          onPointerDown={(e) => {
                            e.preventDefault();
                            setActiveDragCorner(key);
                          }}
                          style={{
                            left: `${pt.x * 100}%`,
                            top: `${pt.y * 100}%`,
                          }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow cursor-grab active:cursor-grabbing"
                        />
                      );
                    }
                  )}
              </div>

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
                    <div className="mt-2.5 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={onCancelScan}
                        className="px-2.5 py-1 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-md transition-colors whitespace-nowrap"
                      >
                        Cancel Scan
                      </button>
                      <span className="text-[11px] font-mono tabular-nums text-slate-500">
                        {progress?.progress ?? 0}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {scanMode === 'single' && !activePreviewSrc && inputMode === 'upload' && (
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
              Supports PNG, JPG, WebP, AVIF · Portrait/Signature Crop, Specimen Check, MRZ &amp; PDF417
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
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-700">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={perspectiveCorrection}
                onChange={(e) => onTogglePerspective(e.target.checked)}
                disabled={isScanning}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="flex items-center gap-1">
                <Crop className="w-3.5 h-3.5 text-slate-400" />
                4-Corner Perspective
              </span>
            </label>

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

            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={enableBarcodePass}
                onChange={(e) => onToggleBarcodePass(e.target.checked)}
                disabled={isScanning}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="flex items-center gap-1">
                <QrCode className="w-3.5 h-3.5 text-slate-400" />
                PDF417 Barcode
              </span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={extractMedia}
                onChange={(e) => onToggleExtractMedia(e.target.checked)}
                disabled={isScanning}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="flex items-center gap-1">
                <UserSquare2 className="w-3.5 h-3.5 text-slate-400" />
                Portrait &amp; Signature
              </span>
            </label>

            <div className="inline-flex items-center gap-1.5">
              <label htmlFor="mrz-model-select" className="text-slate-500">
                MRZ Model:
              </label>
              <select
                id="mrz-model-select"
                value={mrzModel}
                onChange={(e) => onChangeMrzModel(e.target.value as MrzOcrModel)}
                disabled={isScanning || !enhanceMrzPass}
                title="Dedicated OCR-B model is default for highest MRZ accuracy; switch to Standard (eng) to revert"
                className="text-xs font-medium text-slate-800 bg-white border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-400"
              >
                <option value="ocrb">OCR-B (Default)</option>
                <option value="standard">Standard (eng)</option>
              </select>
            </div>

            <div className="inline-flex items-center gap-1.5">
              <label htmlFor="viz-lang-select" className="text-slate-500">
                VIZ Language:
              </label>
              <select
                id="viz-lang-select"
                value={vizSelectValue}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'custom') {
                    onToggleCustomVizLanguages(true);
                  } else {
                    onChangeVizLanguageMode(val as VizLanguageMode);
                  }
                }}
                disabled={isScanning}
                title="Auto Native routes non-English documents to native Tesseract packs (e.g. eng+deu, eng+spa) for accurate diacritics"
                className="text-xs font-medium text-slate-800 bg-white border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-400"
              >
                <option value="auto">Auto Native (Default)</option>
                <option value="multilingual">Multi-Script (EN+DE+ES+FR)</option>
                <option value="standard">Standard (eng)</option>
                <option value="custom">Custom Override…</option>
              </select>
              {useCustomVizLanguages && (
                <input
                  type="text"
                  aria-label="Custom Tesseract VIZ language string"
                  value={customVizLanguages}
                  onChange={(e) => onChangeCustomVizLanguages(e.target.value)}
                  disabled={isScanning}
                  placeholder="eng+deu"
                  className="w-28 text-xs font-mono text-slate-800 bg-white border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-slate-100"
                />
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isScanning ? (
              <button
                type="button"
                onClick={onCancelScan}
                className="px-4 py-2 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
              >
                <X className="w-3.5 h-3.5" />
                Cancel Scan
              </button>
            ) : (
              <button
                type="button"
                disabled={!canRunScan}
                onClick={() => {
                  setEditingCorners(false);
                  onTriggerScan();
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
              >
                {scanMode === 'pair' ? (
                  <>
                    <Layers className="w-3.5 h-3.5" />
                    {mergedResult ? 'Re-Scan & Merge Pair' : 'Scan & Merge Both Sides'}
                  </>
                ) : (
                  <>
                    <ScanLine className="w-3.5 h-3.5" />
                    {result ? 'Re-Scan Document' : 'Run Client-Side OCR'}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
