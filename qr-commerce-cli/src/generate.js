import fs from 'node:fs';
import QRCode from 'qrcode';
import qrcodeTerminal from 'qrcode-terminal';

export async function generateQRCode(text, options, outPath) {
  const ec = options.errorCorrectionLevel || 'M';

  if (options.format === 'terminal') {
    qrcodeTerminal.generate(text, { small: false });
    return { output: null, format: 'terminal' };
  }

  const qropts = {
    errorCorrectionLevel: ec,
    margin: options.margin ?? 4,
    color: options.color || { dark: '#000000', light: '#ffffff' },
    width: options.size ?? 512,
  };

  if (options.format === 'png') {
    await QRCode.toFile(outPath, text, qropts);
    return { output: outPath, format: 'png' };
  }

  if (options.format === 'svg') {
    const svgString = await QRCode.toString(text, { ...qropts, type: 'svg' });
    await fs.promises.writeFile(outPath, svgString, 'utf8');
    return { output: outPath, format: 'svg' };
  }

  throw new Error('Formato inválido. Use: png | svg | terminal');
}
