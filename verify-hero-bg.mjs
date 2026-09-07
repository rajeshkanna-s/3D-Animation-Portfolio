const urls = [
  'https://rajeshkanna-s.github.io/aurelia-luxury-estates/hero-sky-villa.jpg',
  'https://rajeshkanna-s.github.io/aurelia-luxury-estates/assets/hero-sky-villa.jpg',
  'https://rajeshkanna-s.github.io/3D-Animation-Portfolio/aurelia-luxury-estates/hero-sky-villa.jpg',
  'https://rajeshkanna-s.github.io/3D-Animation-Portfolio/aurelia-luxury-estates/assets/hero-sky-villa.jpg',
  'https://rajeshkanna-s.github.io/velora-chocolate/hero-chocolate.jpg',
  'https://rajeshkanna-s.github.io/velora-chocolate/assets/hero-chocolate.jpg',
  'https://rajeshkanna-s.github.io/nocturne-dining/hero-dining.jpg',
  'https://rajeshkanna-s.github.io/nocturne-dining/assets/hero-dining.jpg',
  'https://rajeshkanna-s.github.io/pulseform-fitness/hero-fitness.jpg',
  'https://rajeshkanna-s.github.io/pulseform-fitness/assets/hero-fitness.jpg'
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
