import { computeCheckDigit } from '../scanner/mrzParser';

export type SpecimenKind = 'passport_td3' | 'id_card_td1' | 'driver_license';

function drawPortraitSilhouette(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  bgColor: string,
  fgColor: string
) {
  ctx.save();
  ctx.fillStyle = bgColor;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);

  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();

  ctx.fillStyle = fgColor;
  // Head
  ctx.beginPath();
  ctx.arc(x + w * 0.5, y + h * 0.36, w * 0.22, 0, Math.PI * 2);
  ctx.fill();

  // Shoulders
  ctx.beginPath();
  ctx.ellipse(x + w * 0.5, y + h * 0.88, w * 0.38, h * 0.28, 0, Math.PI, 0);
  ctx.fill();

  ctx.restore();
}

function canvasToFile(canvas: HTMLCanvasElement, filename: string): Promise<File> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Failed to encode specimen canvas to PNG'));
        return;
      }
      resolve(new File([blob], filename, { type: 'image/png' }));
    }, 'image/png');
  });
}

/**
 * Dynamically renders a realistic synthetic Passport (TD3), National ID Card (TD1),
 * or Driver's License onto an HTML5 Canvas and returns it as a PNG File so the
 * browser OCR engine genuinely reads pixels from the image.
 */
export async function generateTestDocumentFile(kind: SpecimenKind): Promise<File> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  if (kind === 'passport_td3') {
    canvas.width = 1440;
    canvas.height = 980;

    // Clean passport page background
    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle security border
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 4;
    ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);

    // Header band
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 34px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillText('PASSPORT   PASSEPORT   PASAPORTE', 68, 92);

    ctx.fillStyle = '#334155';
    ctx.font = '600 22px "DM Sans", Arial, sans-serif';
    ctx.fillText('TYPE: P', 1020, 88);
    ctx.fillText('COUNTRY: GBR', 1170, 88);

    // Portrait box
    drawPortraitSilhouette(ctx, 68, 145, 310, 400, '#E2E8F0', '#475569');

    // Visual Inspection Zone fields (clear high-contrast sans-serif)
    const fields: Array<[string, string, number, number]> = [
      ['Surname / Nom', 'BENNETT', 430, 175],
      ['Given names / Prénoms', 'CLAIRE LOUISE', 430, 260],
      ['Nationality / Nationalité', 'BRITISH CITIZEN', 430, 345],
      ['Date of birth / Date de naissance', '14 MAY 1991', 430, 430],
      ['Sex / Sexe', 'F', 880, 430],
      ['Place of birth / Lieu de naissance', 'EDINBURGH', 1020, 430],
      ['Passport No. / No. du passeport', 'P84920173', 980, 175],
      ['Personal No. / ID', 'UK910514782B', 980, 260],
      ['Date of issue / Date de délivrance', '12 JUN 2022', 430, 515],
      ['Date of expiry / Date d’expiration', '12 JUN 2032', 880, 515],
      ['Authority / Autorité', 'HM PASSPORT OFFICE', 430, 600],
    ];

    for (const [label, value, x, y] of fields) {
      ctx.fillStyle = '#475569';
      ctx.font = '600 18px Arial, sans-serif';
      ctx.fillText(label, x, y);

      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 28px Arial, sans-serif';
      ctx.fillText(value, x, y + 34);
    }

    // MRZ strip background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(36, 700, canvas.width - 72, 236);
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 2;
    ctx.strokeRect(36, 700, canvas.width - 72, 236);

    // Build valid ICAO 9303 TD3 44-char lines
    const docNum = 'P84920173';
    const docCheck = computeCheckDigit(docNum);
    const dob = '910514';
    const dobCheck = computeCheckDigit(dob);
    const exp = '320612';
    const expCheck = computeCheckDigit(exp);
    const personal = 'UK910514782B<<';
    const personalCheck = computeCheckDigit(personal);
    const compositeInput =
      docNum + docCheck + dob + dobCheck + exp + expCheck + personal + personalCheck;
    const compositeCheck = computeCheckDigit(compositeInput);

    const line1 = 'P<GBRBENNETT<<CLAIRE<LOUISE<<<<<<<<<<<<<<<<<'.slice(0, 44);
    const line2 = `${docNum}${docCheck}GBR${dob}${dobCheck}F${exp}${expCheck}${personal}${personalCheck}${compositeCheck}`;

    ctx.fillStyle = '#000000';
    ctx.font = '600 41px "Courier New", monospace';
    ctx.fillText(line1, 66, 795);
    ctx.fillText(line2, 66, 875);

    return canvasToFile(canvas, 'specimen-passport-td3.png');
  }

  if (kind === 'id_card_td1') {
    canvas.width = 1360;
    canvas.height = 860;

    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 34px Arial, sans-serif';
    ctx.fillText('IDENTITY CARD   CARTE NATIONALE D’IDENTITÉ', 60, 82);

    ctx.fillStyle = '#334155';
    ctx.font = '600 22px Arial, sans-serif';
    ctx.fillText('FEDERAL REPUBLIC OF GERMANY · DEU', 60, 122);

    drawPortraitSilhouette(ctx, 60, 160, 270, 340, '#E2E8F0', '#475569');

    const fields: Array<[string, string, number, number]> = [
      ['Surname / Nachname', 'WEBER', 380, 185],
      ['Given names / Vorname', 'LUKAS MARTIN', 380, 265],
      ['Date of birth', '23.08.1988', 380, 345],
      ['Nationality', 'DEU', 680, 345],
      ['Sex', 'M', 880, 345],
      ['Place of birth', 'MUNICH', 1020, 345],
      ['Document No.', 'L01X00T47', 920, 185],
      ['Personal No.', 'DE880823419', 920, 265],
      ['Date of issue', '04.04.2021', 380, 425],
      ['Date of expiry', '03.04.2031', 680, 425],
      ['Authority', 'STADT MUENCHEN', 980, 425],
    ];

    for (const [label, value, x, y] of fields) {
      ctx.fillStyle = '#475569';
      ctx.font = '600 18px Arial, sans-serif';
      ctx.fillText(label, x, y);

      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 26px Arial, sans-serif';
      ctx.fillText(value, x, y + 32);
    }

    // TD1 MRZ box (3 lines x 30 chars)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(36, 540, canvas.width - 72, 276);
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 2;
    ctx.strokeRect(36, 540, canvas.width - 72, 276);

    const docNum = 'L01X00T47';
    const docCheck = computeCheckDigit(docNum);
    const opt1 = 'DE880823419<<<<'.slice(0, 15);
    const l1 = `IDDEU${docNum}${docCheck}${opt1}`.slice(0, 30);

    const dob = '880823';
    const dobCheck = computeCheckDigit(dob);
    const exp = '310403';
    const expCheck = computeCheckDigit(exp);
    const opt2 = '<<<<<<<<<<<';
    const compInput = l1.slice(5, 30) + dob + dobCheck + exp + expCheck + opt2;
    const compCheck = computeCheckDigit(compInput);
    const l2 = `${dob}${dobCheck}M${exp}${expCheck}DEU${opt2}${compCheck}`;
    const l3 = 'WEBER<<LUKAS<MARTIN<<<<<<<<<<<'.slice(0, 30);

    ctx.fillStyle = '#000000';
    ctx.font = '600 44px "Courier New", monospace';
    ctx.fillText(l1, 140, 620);
    ctx.fillText(l2, 140, 695);
    ctx.fillText(l3, 140, 770);

    return canvasToFile(canvas, 'specimen-id-card-td1.png');
  }

  // Driver's License (Visual Inspection Zone only - no MRZ)
  canvas.width = 1360;
  canvas.height = 860;

  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#1E40AF';
  ctx.lineWidth = 6;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  ctx.fillStyle = '#1E3A8A';
  ctx.fillRect(20, 20, canvas.width - 40, 108);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 38px Arial, sans-serif';
  ctx.fillText('DRIVER LICENSE   STATE OF CALIFORNIA', 60, 88);

  drawPortraitSilhouette(ctx, 60, 165, 290, 370, '#E2E8F0', '#475569');

  const dlFields: Array<[string, string, number, number]> = [
    ['DL No.:', 'D74829105', 400, 195],
    ['Class:', 'C', 860, 195],
    ['Date of expiry:', '19 SEP 2029', 1020, 195],
    ['Surname:', 'MARTINEZ', 400, 290],
    ['Given names:', 'ELENA SOFIA', 400, 375],
    ['Address:', '742 EVERGREEN TERRACE, SAN JOSE, CA 95112', 400, 465],
    ['Date of birth:', '19 SEP 1994', 400, 560],
    ['Sex:', 'F', 740, 560],
    ['Height:', '168 cm', 900, 560],
    ['Eyes:', 'BRN', 1120, 560],
    ['Date of issue:', '19 SEP 2024', 400, 655],
    ['Restrictions:', 'NONE', 740, 655],
    ['Endorsements:', 'NONE', 1020, 655],
    ['Issuing authority:', 'CALIFORNIA DMV', 400, 750],
  ];

  for (const [label, value, x, y] of dlFields) {
    ctx.fillStyle = '#475569';
    ctx.font = '600 19px Arial, sans-serif';
    ctx.fillText(label, x, y);

    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 27px Arial, sans-serif';
    ctx.fillText(value, x, y + 34);
  }

  return canvasToFile(canvas, 'specimen-driver-license.png');
}
