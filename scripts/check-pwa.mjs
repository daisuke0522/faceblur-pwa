import { access, readFile } from 'node:fs/promises';

const requiredFiles = [
  'index.html',
  'face-blur-app.html',
  'manifest.json',
  'service-worker.js',
  'privacy.html',
  'assets/icon-192.png',
  'assets/icon-512.png',
  'assets/apple-touch-icon.png'
];

for (const file of requiredFiles) {
  await access(file);
}

const manifest = JSON.parse(await readFile('manifest.json', 'utf8'));
const requiredManifest = {
  name: value => typeof value === 'string' && value.length > 0,
  short_name: value => typeof value === 'string' && value.length > 0,
  theme_color: value => value === '#0c0c14',
  background_color: value => value === '#0c0c14',
  display: value => value === 'standalone',
  icons: value => Array.isArray(value) && value.some(icon => icon.sizes === '192x192') && value.some(icon => icon.sizes === '512x512')
};

for (const [key, validate] of Object.entries(requiredManifest)) {
  if (!validate(manifest[key])) {
    throw new Error(`manifest.json の ${key} がPWA要件を満たしていません`);
  }
}

const appHtml = await readFile('face-blur-app.html', 'utf8');
if (!appHtml.includes('rel="manifest"')) throw new Error('face-blur-app.html に manifest の参照がありません');
if (!appHtml.includes('serviceWorker')) throw new Error('face-blur-app.html に Service Worker 登録処理がありません');
if (!appHtml.includes('apple-touch-icon')) throw new Error('face-blur-app.html に apple-touch-icon の参照がありません');

console.log('PWA checks passed.');
