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
    if (['node_modules', 'dist', '.git', '.temp_gh_master'].includes(item)) continue;
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

for (const p of projects) {
  console.log(`\n========================================`);
  console.log(`CHECKING PROJECT: ${p}`);
  console.log(`========================================`);

  const codeFiles = getAllFiles(p, ['.jsx', '.js', '.html', '.css', '.ts', '.tsx']);
  const allImages = new Set();

  for (const f of codeFiles) {
    const code = fs.readFileSync(f, 'utf8');
    // Match anything that looks like an image path
    const regex = /(["'`])(\/?[a-zA-Z0-9_\-\.\/]+?\.(jpg|jpeg|png|webp|svg|gif|avif)(?:\?[^"'`]*)?)\1/gi;
    let match;
    while ((match = regex.exec(code)) !== null) {
      const imgPath = match[2];
      if (imgPath.startsWith('http')) continue;
      allImages.add({ file: f, ref: imgPath });
    }
  }

  // Print all referenced images
  console.log(`Found ${allImages.size} image references:`);
  for (const item of allImages) {
    const cleanRef = item.ref.split('?')[0].replace(/^\/public\//, '/').replace(/^\//, '').replace(/^\.\//, '');
    
    // Check where this file might exist:
    // 1. in p/public/<cleanRef>
    // 2. in p/src/<cleanRef>
    // 3. in p/<cleanRef>
    // 4. in p/public/images/<cleanRef>
    // 5. in p/images/<cleanRef>
    const candidates = [
      path.join(p, 'public', cleanRef),
      path.join(p, 'src', cleanRef),
      path.join(p, cleanRef),
      path.join(p, 'public', 'images', path.basename(cleanRef)),
      path.join(p, 'images', path.basename(cleanRef))
    ];

    const found = candidates.find(c => fs.existsSync(c));
    if (!found) {
      console.log(`  ❌ MISSING FILE: "${item.ref}" in ${path.relative(p, item.file)}`);
    } else {
      console.log(`  ✓ Found: "${item.ref}" -> ${path.relative(p, found)}`);
    }
  }
}
