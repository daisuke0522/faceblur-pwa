import { cp, mkdir, rm } from 'node:fs/promises';

const files = [
  'index.html',
  'face-blur-app.html',
  'manifest.json',
  'service-worker.js',
  'privacy.html',
  'assets'
];

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });

for (const file of files) {
  await cp(file, `dist/${file}`, { recursive: true });
}

console.log('Built FaceBlur PWA to dist/');
