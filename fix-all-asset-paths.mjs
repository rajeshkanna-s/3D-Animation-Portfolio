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

function getAllFiles(dir, exts) {
  let list = [];
  if (!fs.existsSync(dir)) return list;
  for (const item of fs.readdirSync(dir)) {
    if (['node_modules', 'dist', '.git', '.temp_gh_master', 'dist_site'].includes(item)) continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      list = list.concat(getAllFiles(full, exts));
    } else if (exts.includes(path.extname(item))) {
      list.push(full);
    }
  }
  return list;
}

let totalReplacements = 0;

for (const p of projects) {
  console.log(`\n========================================`);
  console.log(`FIXING PROJECT: ${p}`);
  console.log(`========================================`);

  const codeFiles = getAllFiles(p, ['.jsx', '.js', '.html', '.css', '.ts', '.tsx']);

  for (const file of codeFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // 1. Fix /public/path.ext -> ./path.ext
    content = content.replace(/(["'`])\/public\/([a-zA-Z0-9_\-\.\/]+?\.(jpg|jpeg|png|webp|svg|gif|avif)(?:\?[^"'`]*)?)\1/gi, '$1./$2$1');

    // 2. Fix /images/path.ext -> ./images/path.ext
    content = content.replace(/(["'`])\/images\/([a-zA-Z0-9_\-\.\/]+?\.(jpg|jpeg|png|webp|svg|gif|avif)(?:\?[^"'`]*)?)\1/gi, '$1./images/$2$1');

    // 3. Fix /assets/path.ext -> ./assets/path.ext
    content = content.replace(/(["'`])\/assets\/([a-zA-Z0-9_\-\.\/]+?\.(jpg|jpeg|png|webp|svg|gif|avif)(?:\?[^"'`]*)?)\1/gi, '$1./assets/$2$1');

    // 4. Fix url('/...') in CSS or inline style -> url('./...')
    content = content.replace(/url\(\s*(["']?)\/([a-zA-Z0-9_\-\.\/]+?\.(jpg|jpeg|png|webp|svg|gif|avif)(?:\?[^"'`]*)?)\1\s*\)/gi, 'url($1./$2$1)');

    // 5. Fix any remaining root-relative image strings: '/foo.jpg' -> './foo.jpg'
    content = content.replace(/(["'`])\/([a-zA-Z0-9_\-]+\.(jpg|jpeg|png|webp|svg|gif|avif)(?:\?[^"'`]*)?)\1/gi, '$1./$2$1');

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`  ✓ Updated: ${path.relative(p, file)}`);
      totalReplacements++;
    }
  }
}

console.log(`\n🎉 Total files updated: ${totalReplacements}`);
