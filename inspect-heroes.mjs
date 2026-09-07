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
  console.log(`\n=== ${p} ===`);
  const files = [
    path.join(p, 'src', 'App.jsx'),
    path.join(p, 'src', 'styles.css'),
    path.join(p, 'src', 'index.css')
  ].filter(f => fs.existsSync(f));

  for (const f of files) {
    const text = fs.readFileSync(f, 'utf8');
    const heroBg = text.match(/background(?:-image)?\s*:[^;]*url\([^)]+\)[^;]*/gi);
    if (heroBg) {
      console.log(`  [${path.basename(f)}] Background with url:`, heroBg);
    }
  }
}
