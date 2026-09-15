import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projects = [
  { name: 'velora-chocolate', port: 5180 },
  { name: 'aurelia-luxury-estates', port: 5181 },
  { name: 'tidal-veil-skincare', port: 5182 },
  { name: 'rootsole-footwear', port: 5183 },
  { name: 'kinroot-fitness', port: 5184 },
  { name: 'aura-noir-perfume', port: 5185 },
  { name: 'nocturne-dining', port: 5186 },
  { name: 'pulseform-fitness', port: 5187 },
  { name: 'gusto-italian', port: 5188 },
  { name: 'nova-sneakers', port: 5189 },
  { name: 'maison-braise', port: 5190 },
  { name: 'ember-restaurant', port: 5191 },
  { name: 'soluna-cove-resort', port: 5192 },
  { name: 'aurelia-developments', port: 5193 },
  { name: 'solara-atelier', port: 5194 },
  { name: 'web-roast', port: 5195 },
  { name: 'mira-vale-studio', port: 5196 },
  { name: 'rasmia-portfolio', port: 5197 },
  { name: 'atelier-editorial', port: 5198 },
  { name: 'cinematic-portfolio', port: 5200 },
  { name: '01-gather', port: 5201 },
  { name: '02-altitude', port: 5202 },
  { name: '03-kinetic', port: 5203 },
  { name: '04-verdant-lab', port: 5204 },
  { name: '05-elemental-kitchen', port: 5205 },
  { name: '06-molecule-08', port: 5206 },
  { name: '07-habitat-system', port: 5207 },
  { name: '08-layered', port: 5208 },
  { name: '09-formula', port: 5209 },
  { name: '10-atelier', port: 5210 },
  { name: '11-bean-to-cup', port: 5211 },
  { name: '12-living-modules', port: 5212 },
  { name: '13-blend', port: 5213 },
  { name: '14-casa-horizon', port: 5214 },
  { name: '15-ritual', port: 5215 }
];

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// 1. Start Master Hub Static Server on port 5000
const HUB_PORT = 5000;
const hubServer = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(__dirname, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

hubServer.listen(HUB_PORT, '0.0.0.0', () => {
  console.log(`\n==========================================================`);
  console.log(`  🌟 3D ANIMATION PORTFOLIO MASTER HUB`);
  console.log(`  🌐 http://localhost:${HUB_PORT}`);
  console.log(`==========================================================\n`);
});

console.log(`🚀 Launching all ${projects.length} project dev servers...\n`);

projects.forEach(({ name, port }) => {
  const projectDir = path.join(__dirname, name);
  const viteBin = path.join(projectDir, 'node_modules', 'vite', 'bin', 'vite.js');
  
  if (fs.existsSync(viteBin)) {
    const child = spawn(process.execPath, [viteBin, '--port', String(port), '--host'], {
      cwd: projectDir,
      stdio: 'ignore'
    });

    child.on('error', (err) => {
      console.error(`[${name}] Failed to start:`, err.message);
    });

    console.log(`  ✅ [${name.padEnd(24)}] -> http://localhost:${port}`);
  } else {
    console.warn(`  ⚠️  [${name.padEnd(24)}] -> Vite binary not found in node_modules`);
  }
});

console.log(`\n✨ All services launched! Open http://localhost:${HUB_PORT} to view the Master Hub.`);


