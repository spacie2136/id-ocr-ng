# DocScan Browser OCR — Feature Roadmap

Tracking shipped capabilities and upcoming upgrades for the client-side `docscan-ocr` library.

## Shipped

- [x] **ICAO 9303 MRZ Parsing & Check-Digit Repair** (`TD1`, `TD2`, `TD3`, `MRV-A`, `MRV-B`)
- [x] **Multilingual VIZ Extraction** (names, double surnames, addresses, dates, sex, authorities, driver license categories)
- [x] **Auto-Rotate & Fine Skew Deskewing** (`0° | 90° | 180° | 270°` + `±45°` projection sweep & upright OCR verification)
- [x] **Standalone ESM / UMD Bundles & jsDelivr CDN Support** (`public/lib/docscan-ocr.latest.*`, pinned `v0.0.7`, `.d.ts` declarations, custom Tesseract worker/WASM/lang paths)
- [x] **Two-Sided Document Merging** (`scanner.scanPair()`, `scanDocumentPair()`, `mergeDocumentSides()` with swapped-side detection, `BARCODE+VIZ` fusion, accented VIZ enrichment, and front/back consistency conflict checks)
- [x] **4-Corner Perspective Correction** (pure-JS quadrilateral border detector supporting full-bleed scans and small framed ID cards in tall mobile camera photos, orthogonal line refinement, `3×3` bilinear homography rectification, plus manual `corners` override & interactive viewport handle editor)
- [x] **Dedicated `ocrb` Traineddata for MRZ (`ocrb_int` Default + `standard` Toggle)** — Dedicated integer-quantized OCR-B worker for the MRZ strip pass (`mrzModel: 'ocrb'`, configurable via `mrzLanguage`/`mrzLangPath`/`mrzGzip` with automatic fallback and `'standard'` option to revert to `eng`)
- [x] **Live Camera Auto-Capture & Image Quality Gate** (`CameraAutoCapture`, `watchCameraAutoCapture`, `computeVisibleVideoCrop`, `assessImageQuality`, `QualityGateError` — WYSIWYG `object-cover` crop synchronization for mobile portrait sensors, handheld-calibrated Laplacian sharpness & leaky motion steadiness, specular glare hotspot & exposure checks, live 4-corner detection, stability lock progress, thumb-friendly mobile shutter controls, and `enforceQualityGate` pre-scan check)
- [x] **Multilingual VIZ Language Passes (`auto` Default + `multilingual` / `standard` / `vizLanguages` Overrides)** — Country-routed native-script Tesseract VIZ passes (`eng+deu`, `eng+spa`, `eng+fra`, `eng+ces`, `eng+lit`, etc.) detected from MRZ country codes or visual header cues for accurate native diacritics (`ÄÖÜß`, `Ñ`, `ČĖŠŽ`) and localized labels, with single-pass `'multilingual'`, `'standard'` (`eng`), explicit `vizLanguages`, and custom `vizLanguageMap` overrides
- [x] **PDF417 / AAMVA Barcode Decoding & Detection** (`detectPdf417Barcode()`, `parseAamvaPayload()`, `AAMVA_IIN_DIRECTORY`, `enableBarcodePass` default `true` — hardware `BarcodeDetector` + pure-JS `@zxing/library` multi-rotation/crop fallback, full AAMVA CDS v01–v10+ parsing across US/Canadian jurisdictions, deterministic `BARCODE` / `BARCODE+VIZ` field precedence, and Barcode UI inspector tab)
- [x] **OffscreenCanvas / Web Worker Preprocessing & `AbortSignal` Cancellation** (`PreprocessWorkerClient`, `supportsWorkerPreprocessing()`, `useWorkerPreprocessing` default `true`, `result.workerPreprocessed`, `signal?: AbortSignal`, `ScanAbortedError`, `isScanAbortedError()`, `throwIfScanAborted()` — offloads 4-corner homography warping, grayscale sampling, deskew/contrast normalization & dual flat-field MRZ strips off the main thread via self-contained Blob Worker with transparent canvas fallback, terminates in-flight OCR & preprocessing workers cleanly on abort, and adds Cancel Scan workbench controls)
- [x] **Portrait / Signature Crop & Specimen Watermark Detection** (`extractPortraitAndSignature()`, `detectPortraitBoundsFromRgba()`, `detectSignatureBoundsFromRgba()`, `buildColoredWatermarkOcrCanvas()`, `detectSpecimenWatermark()`, `crossValidateMrzAndViz()`, `mergeSpecimenResults()` — extracts cropped PNG face portraits `portraitDataUrl` & holder signatures `signatureDataUrl` while masking text/MRZ lines, flags multilingual `MUSTER` / `SPECIMEN` / `WZÓR` / `VZOR` / `VOID` / `UTO` watermarks including diagonal red stamps, audits single-side MRZ vs. VIZ consistency, and adds interactive workbench specimen & media previews)

## Next Up

- [ ] **Automated Regression Test Suite** — Vitest / Playwright benchmark running automatically across multi-country, rotated, tilted, and perspective-warped specimen sets
- [ ] **Dedicated Standalone npm Package** — Minimal publishable package manifest containing only the library bundles/SDK without demo workbench dependencies
