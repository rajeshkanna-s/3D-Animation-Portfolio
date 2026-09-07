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

function findFiles(dir, exts, list = []) {
  if (!fs.existsSync(dir)) return list;
  for (const f of fs.readdirSync(dir)) {
    if (f === 'node_modules' || f === 'dist' || f === '.git' || f === '.temp_gh_master') continue;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      findFiles(full, exts, list);
    } else if (exts.includes(path.extname(f))) {
      list.push(full);
    }
  }
  return list;
}

for (const p of projects) {
  const files = findFiles(p, ['.html', '.jsx', '.js', '.css', '.ts', '.tsx']);
  const issues = [];
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/(["']\/[a-zA-Z0-9_\-\.\/]+?\.(jpg|jpeg|png|webp|svg|gif|avif)(?:\?[^"']*)?["'])/gi);
    if (matches) {
      issues.push({ file, matches });
    }
  }
  if (issues.length > 0) {
    console.log(`=== Project: ${p} ===`);
    for (const issue of issues) {
      console.log(`  File: ${issue.file}`);
      console.log(`  Matches:`, [...new Set(issue.matches)]);
    }
  }
}
