import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const videoPath = 'C:\\Users\\RAJESHKANNAS\\Downloads\\UD_polanaeem_tech_user_feed_31_8_2026\\3936862669569693235_31582183788_mp4.mp4';
console.log('Video exists:', fs.existsSync(videoPath));

if (fs.existsSync(videoPath)) {
  const stat = fs.statSync(videoPath);
  console.log('Video size bytes:', stat.size);
}

// Check ffmpeg
let ffmpegCmd = 'ffmpeg';
try {
  const out = execSync('ffmpeg -version', { encoding: 'utf8' });
  console.log('ffmpeg version found:', out.split('\n')[0]);
} catch (e) {
  console.log('ffmpeg direct failed. Searching for ffmpeg...');
  // check common locations or python
}

// Extract 6 frames across the video to understand the 3D header view
const outDir = 'd:\\SOFTWARE\\ANTIGRAVITY\\3D Animation Portfolio\\video_frames';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

try {
  execSync(`ffmpeg -y -i "${videoPath}" -vf "fps=1" "${outDir}\\frame_%03d.jpg"`, { stdio: 'inherit' });
  console.log('Frames extracted to:', outDir);
  const frames = fs.readdirSync(outDir);
  console.log('Total frames extracted:', frames.length, frames.slice(0, 10));
} catch (err) {
  console.error('Extraction error:', err.message);
}
