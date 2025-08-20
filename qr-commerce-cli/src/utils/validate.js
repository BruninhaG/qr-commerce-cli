import fs from 'node:fs';
import path from 'node:path';
import slugify from 'slugify';

export function isValidUrl(maybe) {
  try {
    const u = new URL(maybe);
    return !!u.protocol && !!u.host;
  } catch {
    return false;
  }
}

export async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

export function toAbsoluteOutPath(p) {
  if (!p) return null;
  return path.isAbsolute(p) ? p : path.resolve(process.cwd(), p);
}

export function defaultOut(url, format = 'png', baseDir = path.resolve(process.cwd(), 'qrcodes')) {
  const slug = slugify(url, { lower: true, strict: true }).slice(0, 60) || 'qr';
  return path.join(baseDir, `${slug}.${format}`);
}
