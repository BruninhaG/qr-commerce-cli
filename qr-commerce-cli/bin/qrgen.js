#!/usr/bin/env node
import { Command } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import path from 'node:path';
import fs from 'node:fs';
import { generateQRCode } from '../src/generate.js';
import { ensureDir, isValidUrl, toAbsoluteOutPath, defaultOut } from '../src/utils/validate.js';

const program = new Command();

program
  .name('qrgen')
  .description('Gerador de QR Codes para e-commerces (CLI)')
  .argument('<url>', 'URL do produto ou página de venda')
  .option('-o, --out <path>', 'Caminho/arquivo de saída (default: ./qrcodes/<slug>.png)')
  .option('-f, --format <fmt>', 'Formato de saída: png | svg | terminal', 'png')
  .option('-s, --size <n>', 'Tamanho (largura em px)', (v) => parseInt(v, 10), 512)
  .option('-m, --margin <n>', 'Margem branca', (v) => parseInt(v, 10), 4)
  .option('--dark <color>', 'Cor do QR', '#000000')
  .option('--light <color>', 'Cor do fundo', '#ffffff')
  .option('--ec-level <level>', 'Correção de erro: L | M | Q | H', 'M')
  .version('1.0.0');

program.action(async (url, opts) => {
  if (!isValidUrl(url)) {
    console.error(chalk.red('❌ URL inválida. Informe um endereço completo.'));
    process.exit(1);
  }

  const spinner = ora('Gerando QR Code...').start();

  try {
    const options = {
      format: opts.format,
      size: opts.size,
      margin: opts.margin,
      color: { dark: opts.dark, light: opts.light },
      errorCorrectionLevel: opts.ecLevel || opts['ec-level'] || 'M',
    };

    let outPath = opts.out ? toAbsoluteOutPath(opts.out) : null;

    if (options.format !== 'terminal') {
      const defaultDir = path.resolve(process.cwd(), 'qrcodes');
      await ensureDir(defaultDir);
      if (!outPath) {
        outPath = defaultOut(url, options.format, defaultDir);
      } else {
        const stat = fs.existsSync(outPath) && fs.lstatSync(outPath).isDirectory();
        if (stat) {
          outPath = defaultOut(url, options.format, outPath);
        }
      }
    }

    const result = await generateQRCode(url, options, outPath);

    spinner.succeed('QR Code gerado com sucesso!');

    if (options.format === 'terminal') {
      console.log(chalk.green('📟 Renderizado no terminal.'));
    } else {
      console.log(chalk.cyan('📁 Arquivo salvo em:'), chalk.bold(result.output));
    }
  } catch (err) {
    spinner.fail('Falha ao gerar o QR Code');
    console.error(chalk.red(err.message || err));
    process.exit(1);
  }
});

program.parseAsync(process.argv);
