import fs from 'node:fs';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { DocumentScanner } from '../src/scanner';
import {
  createTempWorkDir,
  generateImageVariants,
  installNodeCanvasShim,
  loadFileAsImageInput,
  resolveRepoPath,
} from './testHelpers';

const UTOPIA_PATH = resolveRepoPath('public/assets/aistudio/87c86sbojo3e1_a5632450.png');
const CROATIA_PATH = resolveRepoPath('public/assets/aistudio/Croatian_passport_data_page_09954fff.jpg');
const SPAIN_PATH = resolveRepoPath('public/assets/aistudio/Spanish_passport_data_page_sample_eb3acb0d.jpg');

const OFFLINE_SCANNER_CONFIG = {
  langPath: process.cwd(),
  langGzip: false,
  mrzLangPath: process.cwd(),
  mrzGzip: false,
  useWorkerPreprocessing: false,
};

describe('End-to-End Real OCR Regression & Speed Benchmark Suite', () => {
  let scanner: DocumentScanner;
  let tmpDir: string;
  let utoVariants: ReturnType<typeof generateImageVariants>;
  let hrvVariants: ReturnType<typeof generateImageVariants>;

  beforeAll(async () => {
    installNodeCanvasShim();
    tmpDir = createTempWorkDir('docscan-e2e-');
    utoVariants = generateImageVariants(UTOPIA_PATH, tmpDir, 'uto');
    hrvVariants = generateImageVariants(CROATIA_PATH, tmpDir, 'hrv');

    scanner = new DocumentScanner(OFFLINE_SCANNER_CONFIG);
    await scanner.warmup();
  }, 60000);

  afterAll(async () => {
    await scanner.terminate();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('extracts Utopia specimen accurately (QUEST / AMELIA MARY + portrait + signature + specimen check)', async () => {
    const img = loadFileAsImageInput(UTOPIA_PATH);
    const res = await scanner.scan(img, {
      perspectiveCorrection: true,
      autoRotate: true,
      enableBarcodePass: false,
    });

    expect(res.documentFormat).toBe('TD3');
    expect(res.issuingCountry).toBe('UTO');
    expect(res.documentNumber).toBe('S01234567');
    expect(res.surname).toBe('QUEST');
    expect(res.surnames).toEqual(['QUEST']);
    expect(res.givenNames).toBe('AMELIA MARY');
    expect(res.givenNamesList).toEqual(['AMELIA', 'MARY']);
    expect(res.dateOfBirth).toBe('1987-04-23');
    expect(res.dateOfExpiry).toBe('2032-08-26');
    expect(res.sex).toBe('F');
    expect(res.mrz?.allCheckDigitsValid).toBe(true);
    expect(res.specimen?.isSpecimen).toBe(true);
    expect(res.crossValidation?.consistent).toBe(true);
    expect(res.portraitDataUrl).toMatch(/^data:image\/png;base64,/);
    expect(res.signatureDataUrl).toMatch(/^data:image\/png;base64,/);
  });

  it('extracts Croatian specimen accurately (007007007 / HRV / SPECIMEN / ZAGREB + media crops)', async () => {
    const img = loadFileAsImageInput(CROATIA_PATH);
    const res = await scanner.scan(img, {
      perspectiveCorrection: true,
      autoRotate: true,
      enableBarcodePass: false,
    });

    expect(res.documentFormat).toBe('TD3');
    expect(res.issuingCountry).toBe('HRV');
    expect(res.documentNumber).toBe('007007007');
    expect(res.surname).toBe('SPECIMEN');
    expect(res.givenNames).toBe('SPECIMEN');
    expect(res.dateOfBirth).toBe('1982-12-25');
    expect(res.dateOfExpiry).toBe('2014-07-01');
    expect(res.sex).toBe('F');
    expect(res.mrz?.allCheckDigitsValid).toBe(true);
    expect(res.placeOfBirth).toBe('ZAGREB');
    expect(res.specimen?.isSpecimen).toBe(true);
    expect(res.crossValidation?.consistent).toBe(true);
    expect(res.portraitDataUrl).toMatch(/^data:image\/png;base64,/);
    expect(res.signatureDataUrl).toMatch(/^data:image\/png;base64,/);
  });

  it('extracts Spanish passport sample accurately with native diacritics & valid MRZ', async () => {
    const img = loadFileAsImageInput(SPAIN_PATH);
    const res = await scanner.scan(img, {
      perspectiveCorrection: true,
      autoRotate: true,
      enableBarcodePass: false,
    });

    expect(res.documentFormat).toBe('TD3');
    expect(res.issuingCountry).toBe('ESP');
    expect(res.documentNumber).toBe('ZAB000254');
    expect(res.surname).toContain('ESPAÑOLA');
    expect(res.givenNames).toBe('CARMEN');
    expect(res.mrz?.allCheckDigitsValid).toBe(true);
    expect(res.specimen?.isSpecimen).toBe(false);
    expect(res.portraitDataUrl).toMatch(/^data:image\/png;base64,/);
  });

  it('recovers Utopia & Croatia identities across 90°, 180°, 270° rotated, tilted, shadowed, and warped tabletop images', async () => {
    const cases: Array<{
      name: string;
      path: string;
      expectedDoc: string;
      expectedCountry: string;
      expectedSurname: string;
      expectPerspective?: boolean;
    }> = [
      {
        name: 'Utopia 180° upside down',
        path: utoVariants.rot180,
        expectedDoc: 'S01234567',
        expectedCountry: 'UTO',
        expectedSurname: 'QUEST',
      },
      {
        name: 'Utopia 90° clockwise',
        path: utoVariants.rot90,
        expectedDoc: 'S01234567',
        expectedCountry: 'UTO',
        expectedSurname: 'QUEST',
      },
      {
        name: 'Croatia 270° rotated',
        path: hrvVariants.rot270,
        expectedDoc: '007007007',
        expectedCountry: 'HRV',
        expectedSurname: 'SPECIMEN',
      },
      {
        name: 'Croatia +9° tilted',
        path: hrvVariants.tilted10,
        expectedDoc: '007007007',
        expectedCountry: 'HRV',
        expectedSurname: 'SPECIMEN',
      },
      {
        name: 'Croatia heavy directional shadow',
        path: hrvVariants.shadowed,
        expectedDoc: '007007007',
        expectedCountry: 'HRV',
        expectedSurname: 'SPECIMEN',
      },
      {
        name: 'Utopia tabletop perspective warp',
        path: utoVariants.warpedTabletop,
        expectedDoc: 'S01234567',
        expectedCountry: 'UTO',
        expectedSurname: 'QUEST',
        expectPerspective: true,
      },
    ];

    for (const tc of cases) {
      const img = loadFileAsImageInput(tc.path);
      const res = await scanner.scan(img, {
        perspectiveCorrection: true,
        autoRotate: true,
        enableBarcodePass: false,
      });

      expect(res.issuingCountry, tc.name).toBe(tc.expectedCountry);
      expect(res.documentNumber, tc.name).toBe(tc.expectedDoc);
      expect(res.surname, tc.name).toBe(tc.expectedSurname);
      expect(res.mrz?.allCheckDigitsValid, tc.name).toBe(true);
      if (tc.expectPerspective) {
        expect(res.perspective?.applied, tc.name).toBe(true);
      }
    }
  }, 120000);

  it('supports Fast MRZ-Only and skipVizPass modes with higher throughput and full MRZ accuracy', async () => {
    const utoImg = loadFileAsImageInput(UTOPIA_PATH);
    const fullScan = await scanner.scan(utoImg, {
      perspectiveCorrection: true,
      autoRotate: true,
      enableBarcodePass: false,
      includePreviews: false,
    });

    const mrzOnlyScan = await scanner.scan(utoImg, {
      mrzOnly: true,
      perspectiveCorrection: true,
      autoRotate: true,
      enableBarcodePass: false,
      includePreviews: false,
    });

    expect(mrzOnlyScan.documentNumber).toBe('S01234567');
    expect(mrzOnlyScan.issuingCountry).toBe('UTO');
    expect(mrzOnlyScan.dateOfBirth).toBe('1987-04-23');
    expect(mrzOnlyScan.dateOfExpiry).toBe('2032-08-26');
    expect(mrzOnlyScan.mrz?.allCheckDigitsValid).toBe(true);
    expect(mrzOnlyScan.rawOcrText).toBe('');
    expect(mrzOnlyScan.portraitDataUrl).toBeUndefined();
    expect(mrzOnlyScan.processingTimeMs).toBeLessThanOrEqual(fullScan.processingTimeMs);

    const hrvImg = loadFileAsImageInput(CROATIA_PATH);
    const skipVizWithMedia = await scanner.scan(hrvImg, {
      skipVizPass: true,
      extractPortrait: true,
      extractSignature: true,
      enableBarcodePass: false,
      includePreviews: false,
    });

    expect(skipVizWithMedia.documentNumber).toBe('007007007');
    expect(skipVizWithMedia.surname).toBe('SPECIMEN');
    expect(skipVizWithMedia.mrz?.allCheckDigitsValid).toBe(true);
    expect(skipVizWithMedia.rawOcrText).toBe('');
    expect(skipVizWithMedia.portraitDataUrl).toMatch(/^data:image\/png;base64,/);
  });
});
