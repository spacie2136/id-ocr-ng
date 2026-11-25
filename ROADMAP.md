# DocScan Browser OCR — Feature Roadmap

Tracking shipped capabilities and upcoming upgrades for the client-side `docscan-ocr` library.

## Shipped

- [x] **ICAO 9303 MRZ Parsing & Check-Digit Repair** (`TD1`, `TD2`, `TD3`, `MRV-A`, `MRV-B`)
- [x] **Multilingual VIZ Extraction** (names, double surnames, addresses, dates, sex, authorities, driver license categories)
- [x] **Auto-Rotate & Fine Skew Deskewing** (`0° | 90° | 180° | 270°` + `±45°` projection sweep & upright OCR verification)
- [x] **Standalone ESM / UMD Bundles & jsDelivr CDN Support** (`public/lib/docscan-ocr.latest.*`, pinned `v0.0.4`, `.d.ts` declarations, custom Tesseract worker/WASM/lang paths)
- [x] **Two-Sided Document Merging** (`scanner.scanPair()`, `scanDocumentPair()`, `mergeDocumentSides()` with swapped-side detection, accented VIZ enrichment, and front/back consistency conflict checks)
- [x] **4-Corner Perspective Correction** (pure-JS quadrilateral border detector, orthogonal line refinement, `3×3` bilinear homography rectification, plus manual `corners` override & interactive viewport handle editor)
- [x] **Dedicated `ocrb` Traineddata for MRZ (`ocrb_int` Default + `standard` Toggle)** — Dedicated integer-quantized OCR-B worker for the MRZ strip pass (`mrzModel: 'ocrb'`, configurable via `mrzLanguage`/`mrzLangPath`/`mrzGzip` with automatic fallback and `'standard'` option to revert to `eng`)
- [x] **Live Camera Auto-Capture & Image Quality Gate** (`CameraAutoCapture`, `watchCameraAutoCapture`, `assessImageQuality`, `QualityGateError` — real-time Laplacian sharpness, specular glare hotspot & exposure checks, live 4-corner detection, stability lock progress, and `enforceQualityGate` pre-scan check)
- [x] **Multilingual VIZ Language Passes (`auto` Default + `multilingual` / `standard` / `vizLanguages` Overrides)** — Country-routed native-script Tesseract VIZ passes (`eng+deu`, `eng+spa`, `eng+fra`, `eng+ces`, `eng+lit`, etc.) detected from MRZ country codes or visual header cues for accurate native diacritics (`ÄÖÜß`, `Ñ`, `ČĖŠŽ`) and localized labels, with single-pass `'multilingual'`, `'standard'` (`eng`), explicit `vizLanguages`, and custom `vizLanguageMap` overrides

## Next Up

- [ ] **PDF417 / AAMVA Barcode Decoding** — Deterministic parsing for US, Canadian, and international driver licenses & ID cards with 2D barcodes
- [ ] **Portrait / Signature Crop & Specimen Watermark Detection** — Return cropped face portrait `portraitDataUrl`, cross-validate MRZ vs. VIZ fields on single-side scans, and flag `MUSTER` / `SPECIMEN` watermarks
- [ ] **OffscreenCanvas / Web Worker Preprocessing & `AbortSignal` Cancellation** — Keep heavy pixel operations off the main thread for large mobile photos and allow clean mid-scan cancellation
- [ ] **Automated Regression Test Suite** — Vitest / Playwright benchmark running automatically across multi-country, rotated, tilted, and perspective-warped specimen sets
- [ ] **Dedicated Standalone npm Package** — Minimal publishable package manifest containing only the library bundles/SDK without demo workbench dependencies
