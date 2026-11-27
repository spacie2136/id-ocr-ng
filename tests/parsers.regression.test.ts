import fs from 'node:fs';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  analyzeDocumentOrientation,
  computeCheckDigit,
  crossValidateMrzAndViz,
  detectDocumentQuad,
  detectDynamicMrzBand,
  detectPortraitBoundsFromRgba,
  detectSignatureBoundsFromRgba,
  detectSpecimenWatermark,
  flattenShadowIlluminationBuffer,
  mergeDocumentSides,
  parseAamvaPayload,
  parseMrzFromText,
  parseVizText,
  resolveNativeVizLanguage,
  synthesizeConsensusMrz,
  type ExtractedIdentity,
} from '../src/scanner';
import {
  createTempWorkDir,
  generateImageVariants,
  loadFileAsCanvasInput,
  loadImageRgbaFromFile,
  resolveRepoPath,
  sampleDownscaledGrayFromRgba,
} from './testHelpers';

const UTOPIA_PATH = resolveRepoPath('public/assets/aistudio/87c86sbojo3e1_a5632450.png');
const CROATIA_PATH = resolveRepoPath('public/assets/aistudio/Croatian_passport_data_page_09954fff.jpg');
const SPAIN_PATH = resolveRepoPath('public/assets/aistudio/Spanish_passport_data_page_sample_eb3acb0d.jpg');

describe('MRZ, VIZ, AAMVA & Specimen Parsing Regression Suite', () => {
  it('parses TD3 passports accurately (Croatia, Spain, Utopia single-< format)', () => {
    const croatiaMrz = parseMrzFromText(
      [
        'P<HRVSPECIMEN<<SPECIMEN<<<<<<<<<<<<<<<<<<<<<',
        '0070070071HRV8212258F1407019<<<<<<<<<<<<<<06',
      ].join('\n')
    );
    expect(croatiaMrz).not.toBeNull();
    expect(croatiaMrz?.format).toBe('TD3');
    expect(croatiaMrz?.issuingCountry).toBe('HRV');
    expect(croatiaMrz?.documentNumber).toBe('007007007');
    expect(croatiaMrz?.surname).toBe('SPECIMEN');
    expect(croatiaMrz?.givenNames).toBe('SPECIMEN');
    expect(croatiaMrz?.dateOfBirth).toBe('1982-12-25');
    expect(croatiaMrz?.dateOfExpiry).toBe('2014-07-01');
    expect(croatiaMrz?.sex).toBe('F');
    expect(croatiaMrz?.allCheckDigitsValid).toBe(true);

    // Utopia omits the `<<` separator; single `<` initially leaves AMELIA MARY in surnames until VIZ splits it
    const utopiaMrz = parseMrzFromText(
      [
        'P<UTOQUEST<AMELIA<MARY<<<<<<<<<<<<<<<<<<<<<<',
        'S012345674UTO8704234F3208265<<<<<<<<<<<<<<02',
      ].join('\n')
    );
    expect(utopiaMrz).not.toBeNull();
    expect(utopiaMrz?.issuingCountry).toBe('UTO');
    expect(utopiaMrz?.documentNumber).toBe('S01234567');
    expect(utopiaMrz?.dateOfBirth).toBe('1987-04-23');
    expect(utopiaMrz?.dateOfExpiry).toBe('2032-08-26');
    expect(utopiaMrz?.sex).toBe('F');
    expect(utopiaMrz?.allCheckDigitsValid).toBe(true);
  });

  it('repairs Utopia single-< boundary cleanly with matchUnsplitMrzNameWithViz / crossValidateMrzAndViz', () => {
    const mrz = parseMrzFromText(
      [
        'P<UTOQUEST<AMELIA<MARY<<<<<<<<<<<<<<<<<<<<<<',
        'S012345674UTO8704234F3208265<<<<<<<<<<<<<<02',
      ].join('\n')
    )!;
    const viz = parseVizText(
      [
        'UTOPIA',
        'Type/Type Country Code/Code du pays Passport Number/N° de passeport',
        'P UTO S01234567',
        'Surname/Nom',
        'QUEST',
        'Given Names/Prénoms',
        'AMELIA MARY',
        'Nationality/Nationalité',
        'UTOPIAN',
        'Date of birth/Date de naissance',
        '23 APR/AVR 87',
        'Sex/Sexe Place of birth/Lieu de naissance',
        'F UTOPIA',
        'Date of issue/Date de délivrance',
        '27 AUG/AOUT 22',
        'Date of expiry/Date d’expiration',
        '26 AUG/AOUT 32',
      ].join('\n')
    );

    expect(viz.surname).toBe('QUEST');
    expect(viz.surnames).toEqual(['QUEST']);
    expect(viz.givenNames).toBe('AMELIA MARY');
    expect(viz.documentNumber).toBe('S01234567');
    expect(viz.dateOfBirth).toBe('1987-04-23');
    expect(viz.dateOfExpiry).toBe('2032-08-26');

    const audit = crossValidateMrzAndViz(mrz, viz);
    expect(audit.performed).toBe(true);
    expect(audit.consistent).toBe(true);
    expect(audit.matchedFields).toEqual(
      expect.arrayContaining(['surname', 'givenNames', 'documentNumber', 'dateOfBirth', 'dateOfExpiry'])
    );
  });

  it('parses TD1, TD2, MRVA and synthesizes consensus MRZ with joint check-digit repair', () => {
    const docNum = 'L898902C3';
    const docCheck = computeCheckDigit(docNum);
    const dob = '740812';
    const dobCheck = computeCheckDigit(dob);
    const exp = '280415';
    const expCheck = computeCheckDigit(exp);
    const comp = computeCheckDigit(`${docNum}${docCheck}${'<<<<<<<<<<<<<<<'}${dob}${dobCheck}${exp}${expCheck}${'<<<<<<<<<<<'}`);
    const td1Line1 = `I<UTOD231458907<<<<<<<<<<<<<<<`.replace('D231458907', `${docNum}${docCheck}`);
    const td1 = parseMrzFromText(
      [
        td1Line1,
        `${dob}${dobCheck}F${exp}${expCheck}UTO<<<<<<<<<<<${comp}`,
        'ERIKSSON<<ANNA<MARIA<<<<<<<<<<',
      ].join('\n')
    );
    expect(td1?.format).toBe('TD1');
    expect(td1?.documentNumber).toBe(docNum);
    expect(td1?.surname).toBe('ERIKSSON');
    expect(td1?.givenNames).toBe('ANNA MARIA');
    expect(td1?.allCheckDigitsValid).toBe(true);

    const td3Comp = computeCheckDigit('C01X00T47864081252702283<<<<<<<<<<<<<<0');
    const candA = parseMrzFromText(
      [
        'P<DEUMUSTERMANN<<ERIKA<<<<<<<<<<<<<<<<<<<<<<',
        `C01X00T478DEU6408125F2702283<<<<<<<<<<<<<<0${td3Comp}`,
      ].join('\n')
    );
    const candB = parseMrzFromText(
      [
        'P<DEUMUSTERMANN<<ERIKA<<<<<<<<<<<<<<<<<<<<<<',
        `C01X00T478DEU640B125F2702283<<<<<<<<<<<<<<0${td3Comp}`,
      ].join('\n')
    );
    expect(candA?.allCheckDigitsValid).toBe(true);
    const consensus = synthesizeConsensusMrz([candA!, candB!]);
    expect(consensus).not.toBeNull();
    expect(consensus?.dateOfBirth).toBe('1964-08-12');
    expect(consensus?.allCheckDigitsValid).toBe(true);
  });

  it('parses Spanish, Croatian, and German multilingual VIZ labels cleanly', () => {
    const esViz = parseVizText(
      [
        'PASAPORTE ESP',
        'Primer apellido / First surname / Premier nom',
        'GARCIA',
        'Segundo apellido / Second surname / Deuxième nom',
        'LOPEZ',
        'Nombre / Given names / Prénoms',
        'CARLOS',
        'Fecha de nacimiento / Date of birth',
        '15 05 1990',
        'Fecha de caducidad / Date of expiry',
        '10 11 2031',
      ].join('\n')
    );
    expect(esViz.surnames).toEqual(['GARCIA', 'LOPEZ']);
    expect(esViz.givenNames).toBe('CARLOS');
    expect(esViz.dateOfBirth).toBe('1990-05-15');
    expect(esViz.dateOfExpiry).toBe('2031-11-10');

    const hrvViz = parseVizText(
      [
        'REPUBLIKA HRVATSKA / REPUBLIC OF CROATIA',
        'Datum rođenja / Date of birth',
        '25.12.1982.',
        'Mjesto rođenja / Place of birth',
        'ZAGREB',
        'Izdana od / Issued by',
        'PU/ZAGREB',
      ].join('\n')
    );
    expect(hrvViz.dateOfBirth).toBe('1982-12-25');
    expect(hrvViz.placeOfBirth).toBe('ZAGREB');
    expect(hrvViz.issuingAuthority).toBe('PU/ZAGREB');

    const deuViz = parseVizText(
      [
        'BUNDESREPUBLIK DEUTSCHLAND PERSONALAUSWEIS',
        'Name / Surname',
        'MÜLLER',
        'Vornamen / Given names',
        'JÜRGEN',
        'Geb. 03.09.1985',
        'Gültig bis 02.09.2032',
      ].join('\n')
    );
    expect(deuViz.surname).toBe('MÜLLER');
    expect(deuViz.givenNames).toBe('JÜRGEN');
    expect(deuViz.dateOfBirth).toBe('1985-09-03');
    expect(deuViz.dateOfExpiry).toBe('2032-09-02');
    expect(resolveNativeVizLanguage({ issuingCountry: 'DEU', rawText: 'BUNDESREPUBLIK' })).toBe('eng+deu');
  });

  it('decodes US & Canadian AAMVA PDF417 payloads', () => {
    const sampleAamva =
      '@\n\x1E\rANSI 636014090002DL00410288ZC03290024DLDCAC\nDCBNONE\nDCDNONE\n' +
      'DBA20290814\nDCSPUBLIC\nDACJANE\nDADMARIE\nDBD20240814\nDBB19910322\n' +
      'DBC2\nDAYBRO\nDAU066 IN\nDAG742 EVERGREEN TER\nDAISPRINGFIELD\nDAJCA\nDAK941020000\nDAQD9876543\nDCGUSA\n';
    const parsed = parseAamvaPayload(sampleAamva);
    expect(parsed).not.toBeNull();
    expect(parsed?.iin).toBe('636014');
    expect(parsed?.jurisdictionName).toBe('California');
    expect(parsed?.issuingCountry).toBe('USA');
    expect(parsed?.surname).toBe('PUBLIC');
    expect(parsed?.givenNames).toBe('JANE MARIE');
    expect(parsed?.documentNumber).toBe('D9876543');
    expect(parsed?.dateOfBirth).toBe('1991-03-22');
    expect(parsed?.dateOfExpiry).toBe('2029-08-14');
    expect(parsed?.sex).toBe('F');
  });

  it('flags multilingual specimen watermarks & critical MRZ-VIZ tampering discrepancies', () => {
    const sp = detectSpecimenWatermark({
      rawOcrText: 'MUSTER DOCUMENT\nERIKA MUSTERMANN',
      mrz: null,
    });
    expect(sp.isSpecimen).toBe(true);
    expect(sp.matchedIndicators.some((m) => m.includes('MUSTER'))).toBe(true);

    const woz = detectSpecimenWatermark({ rawOcrText: 'WZÓR DOKUMENTU', mrz: null });
    expect(woz.isSpecimen).toBe(true);

    const validMrz = parseMrzFromText(
      [
        'P<HRVSPECIMEN<<SPECIMEN<<<<<<<<<<<<<<<<<<<<<',
        '0070070071HRV8212258F1407019<<<<<<<<<<<<<<06',
      ].join('\n')
    )!;
    const tamperedViz = parseVizText('Surname\nFORGEDNAME\n01.01.1999\n');
    tamperedViz.dateOfBirth = '1999-01-01';
    const audit = crossValidateMrzAndViz(validMrz, tamperedViz);
    expect(audit.consistent).toBe(false);
    expect(audit.discrepancies.some((d) => d.field === 'surname' && d.severity === 'critical')).toBe(true);
    expect(audit.discrepancies.some((d) => d.field === 'dateOfBirth' && d.severity === 'critical')).toBe(true);
  });

  it('merges swapped Front + Back ID sides reliably', () => {
    const baseSide: ExtractedIdentity = {
      documentType: 'id_card',
      documentFormat: 'VISUAL_ONLY',
      issuingCountry: 'DEU',
      issuingCountryName: 'Germany',
      documentNumber: 'T22000129',
      personalNumber: null,
      surname: 'MÜLLER',
      surnames: ['MÜLLER'],
      givenNames: 'JÜRGEN',
      givenNamesList: ['JÜRGEN'],
      fullName: 'JÜRGEN MÜLLER',
      nationality: 'DEU',
      nationalityName: 'Germany',
      dateOfBirth: '1985-09-03',
      age: 40,
      sex: 'M',
      dateOfIssue: null,
      dateOfExpiry: '2032-09-02',
      isExpired: false,
      placeOfBirth: 'BERLIN',
      address: null,
      parents: null,
      issuingAuthority: null,
      licenseClass: null,
      restrictions: null,
      endorsements: null,
      height: null,
      eyeColor: null,
      hairColor: null,
      mrz: null,
      barcode: null,
      portraitDataUrl: 'data:image/png;base64,AAA',
      signatureDataUrl: 'data:image/png;base64,BBB',
      unmappedFields: {},
      fieldSources: { surname: 'VIZ', givenNames: 'VIZ' },
      rawOcrText: 'MÜLLER',
      rawMrzText: '',
      confidence: 88,
      processingTimeMs: 400,
      sourceDimensions: { width: 1000, height: 630 },
    };

    const mrzBack: ExtractedIdentity = {
      ...baseSide,
      documentFormat: 'TD1',
      surname: 'MUELLER',
      surnames: ['MUELLER'],
      givenNames: 'JUERGEN',
      givenNamesList: ['JUERGEN'],
      fullName: 'JUERGEN MUELLER',
      address: 'MUSTERSTRASSE 12, 10115 BERLIN',
      portraitDataUrl: null,
      signatureDataUrl: null,
      mrz: parseMrzFromText(
        [
          'IDD<<T220001293<<<<<<<<<<<<<<<',
          '8509036M3209027DEU<<<<<<<<<<<2',
          'MUELLER<<JUERGEN<<<<<<<<<<<<<<',
        ].join('\n')
      ),
      fieldSources: { surname: 'MRZ', givenNames: 'MRZ', address: 'VIZ' },
    };

    // Pass back side in front slot and front side in back slot
    const merged = mergeDocumentSides(mrzBack, baseSide);
    expect(merged.sideAssignment).toBe('swapped_detected');
    expect(merged.sidesConsistent).toBe(true);
    expect(merged.documentFormat).toBe('TD1');
    expect(merged.portraitDataUrl).toBe('data:image/png;base64,AAA');
    expect(merged.address).toBe('MUSTERSTRASSE 12, 10115 BERLIN');
  });
});

describe('Pixel Geometry, Shadow Flattening, Portrait/Signature & Perspective Suite', () => {
  let tmpDir: string;

  beforeAll(() => {
    tmpDir = createTempWorkDir('docscan-geom-');
  });

  afterAll(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('localizes MRZ bands & flattens directional shadow illumination on real passports', () => {
    for (const imgPath of [UTOPIA_PATH, CROATIA_PATH, SPAIN_PATH]) {
      const { width, height, data } = loadImageRgbaFromFile(imgPath);
      const gray = new Uint8ClampedArray(width * height);
      for (let i = 0, p = 0; i < data.length; i += 4, p++) {
        gray[p] = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
      }

      const band = detectDynamicMrzBand(gray, width, height);
      expect(band.detected).toBe(true);
      expect(band.tightTop).toBeGreaterThanOrEqual(0.58);
      expect(band.tightBottom).toBeLessThanOrEqual(0.995);
    }

    const variants = generateImageVariants(CROATIA_PATH, tmpDir, 'hrv-shadow');
    const shadowed = loadImageRgbaFromFile(variants.shadowed);
    const sGray = new Uint8ClampedArray(shadowed.width * shadowed.height);
    for (let i = 0, p = 0; i < shadowed.data.length; i += 4, p++) {
      sGray[p] = Math.round(
        0.299 * shadowed.data[i] + 0.587 * shadowed.data[i + 1] + 0.114 * shadowed.data[i + 2]
      );
    }
    const flatRes = flattenShadowIlluminationBuffer(sGray, shadowed.width, shadowed.height);
    expect(flatRes.applied).toBe(true);
    expect(flatRes.spread).toBeGreaterThan(28);
  });

  it('detects face portrait and signature bounds across Utopia & Croatia specimens', () => {
    const uto = loadImageRgbaFromFile(UTOPIA_PATH);
    const utoPortrait = detectPortraitBoundsFromRgba(uto.data, uto.width, uto.height);
    expect(utoPortrait).not.toBeNull();
    expect(utoPortrait!.bbox.x).toBeLessThan(0.2);
    expect(utoPortrait!.bbox.width).toBeGreaterThan(0.14);

    const utoSig = detectSignatureBoundsFromRgba(uto.data, uto.width, uto.height, {
      portraitRect: utoPortrait?.bbox,
    });
    expect(utoSig).not.toBeNull();
    expect(utoSig!.bbox.y).toBeGreaterThan(0.5);
    expect(utoSig!.bbox.y).toBeLessThan(0.84);

    const hrv = loadImageRgbaFromFile(CROATIA_PATH);
    const hrvPortrait = detectPortraitBoundsFromRgba(hrv.data, hrv.width, hrv.height);
    expect(hrvPortrait).not.toBeNull();
    expect(hrvPortrait!.bbox.x).toBeLessThan(0.2);
  });

  it('ranks coarse orientation for 0/90/180/270 and estimates fine deskew angle + 4-corner quad', () => {
    const variants = generateImageVariants(UTOPIA_PATH, tmpDir, 'uto-geom');

    const img0 = loadImageRgbaFromFile(UTOPIA_PATH);
    const g0 = sampleDownscaledGrayFromRgba(img0.data, img0.width, img0.height, 400);
    const o0 = analyzeDocumentOrientation(g0.data, g0.width, g0.height);
    expect(o0.rankedCoarseRotations[0]).toBe(0);

    const img180 = loadImageRgbaFromFile(variants.rot180);
    const g180 = sampleDownscaledGrayFromRgba(img180.data, img180.width, img180.height, 400);
    const o180 = analyzeDocumentOrientation(g180.data, g180.width, g180.height);
    expect(o180.rankedCoarseRotations[0]).toBe(180);

    const img90 = loadImageRgbaFromFile(variants.rot90);
    const g90 = sampleDownscaledGrayFromRgba(img90.data, img90.width, img90.height, 400);
    const o90 = analyzeDocumentOrientation(g90.data, g90.width, g90.height);
    expect(o90.rankedCoarseRotations.slice(0, 2)).toContain(270);

    const img270 = loadImageRgbaFromFile(variants.rot270);
    const g270 = sampleDownscaledGrayFromRgba(img270.data, img270.width, img270.height, 400);
    const o270 = analyzeDocumentOrientation(g270.data, g270.width, g270.height);
    expect(o270.rankedCoarseRotations.slice(0, 2)).toContain(90);

    const tilted = loadImageRgbaFromFile(variants.tilted10);
    const gTilt = sampleDownscaledGrayFromRgba(tilted.data, tilted.width, tilted.height, 400);
    const oTilt = analyzeDocumentOrientation(gTilt.data, gTilt.width, gTilt.height);
    expect(Math.abs(oTilt.deskewDegrees + 9)).toBeLessThanOrEqual(2.5);

    const warpedCanvas = loadFileAsCanvasInput(variants.warpedTabletop);
    const quad = detectDocumentQuad(warpedCanvas);
    expect(quad).not.toBeNull();
    expect(quad!.applied).toBe(true);
    expect(quad!.sourceQuadAreaRatio).toBeGreaterThan(0.30);
    expect(quad!.sourceQuadAreaRatio).toBeLessThan(0.75);
  });
});
