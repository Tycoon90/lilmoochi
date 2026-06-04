import { put } from '@vercel/blob';
import { readFileSync } from 'fs';

const videos = [
  { name: 'gallery-1.mp4', path: './public/images/gallery-1.mp4' },
  { name: 'gallery-2.mp4', path: './public/images/gallery-2.mp4' },
  { name: 'gallery-3.mp4', path: './public/images/gallery-3.mp4' },
  { name: 'gallery-4.mp4', path: './public/images/gallery-4.mp4' },
  { name: 'gallery-5.mp4', path: './public/images/gallery-5.mp4' },
  { name: 'gallery-6.mp4', path: './public/images/gallery-6.mp4' },
];

for (const video of videos) {
  console.log(`Uploading ${video.name}...`);
  try {
    const file = readFileSync(video.path);
    const { url } = await put(video.name, file, {
      access: 'public',
      contentType: 'video/mp4',
      allowOverwrite: true,
    });
    console.log(`✅ ${video.name} → ${url}`);
  } catch (err) {
    console.error(`❌ ${video.name}: ${err.message}`);
  }
}
