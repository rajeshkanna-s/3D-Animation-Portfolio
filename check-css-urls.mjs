import fs from 'fs';
import path from 'path';

const projects = [
  'velora-chocolate',
  'aurelia-luxury-estates',
  'tidal-veil-skincare',
  'rootsole-footwear',
  'kinroot-fitness',
  'aura-noir-perfume',
  'nocturne-dining',
  'pulseform-fitness',
  'gusto-italian',
  'nova-sneakers',
  'maison-braise',
  'ember-restaurant',
  'soluna-cove-resort',
  'aurelia-developments',
  'solara-atelier',
  'web-roast',
  'mira-vale-studio'
];

for (const p of projects) {
  const cssFiles = [];
  function getCss(dir) {
    if (!fs.existsSync(dir)) return;
    for (const f of fs.readdirSync(dir)) {
      if (['node_modules', 'dist', '.git', 'dist_site'].includes(f)) continue;
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) getCss(full);
      else if (f.endsWith('.css')) cssFiles.push(full);
    }
  }
  getCss(p);
  for (const c of cssFiles) {
    const content = fs.readFileSync(c, 'utf8');
    const matches = content.match(/url\s*\(([^)]+)\)/gi);
    if (matches) {
      const filtered = matches.filter(m => !m.includes('fonts.googleapis') && !m.includes('data:') && !m.includes('fonts.gstatic'));
      if (filtered.length > 0) {
        console.log(`[${p}] ${path.relative(p, c)}:`, filtered);
      }
    }
  }
}
