const urls = [
  'https://rajeshkanna-s.github.io/rootsole-footwear/hero-sneaker.jpg',
  'https://rajeshkanna-s.github.io/aurelia-luxury-estates/hero-sky-villa.jpg',
  'https://rajeshkanna-s.github.io/aurelia-luxury-estates/aurelia-slide4.jpg',
  'https://rajeshkanna-s.github.io/tidal-veil-skincare/rituals-collection.jpg',
  'https://rajeshkanna-s.github.io/3D-Animation-Portfolio/rootsole-footwear/hero-sneaker.jpg',
  'https://rajeshkanna-s.github.io/3D-Animation-Portfolio/tidal-veil-skincare/rituals-collection.jpg',
  'https://rajeshkanna-s.github.io/3D-Animation-Portfolio/aurelia-luxury-estates/hero-sky-villa.jpg'
];

async function check() {
  for (const u of urls) {
    try {
      const res = await fetch(u);
      console.log(`[${res.status}] ${u}`);
    } catch (e) {
      console.log(`[ERR] ${u}: ${e.message}`);
    }
  }
}

check();
