import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read scenes from cinematic-portfolio
const scenesDir = path.join(__dirname, 'cinematic-portfolio', 'src', 'scenes');
const soundEngineContent = fs.readFileSync(path.join(__dirname, 'cinematic-portfolio', 'src', 'audio', 'soundEngine.ts'), 'utf8');
const tsconfigContent = fs.readFileSync(path.join(__dirname, 'cinematic-portfolio', 'tsconfig.json'), 'utf8');

const projectConfigs = [
  {
    id: '01-gather',
    number: '01',
    port: 5201,
    title: 'Gather',
    subtitle: 'Culinary Choreography',
    tagline: 'Crafted individually. Made to gather.',
    industry: 'Culinary Arts & Gastronomy',
    sceneFile: 'GatherScene3D.tsx',
    accentColor: '#4F6D56',
    sceneExportName: 'GatherScene3D'
  },
  {
    id: '02-altitude',
    number: '02',
    port: 5202,
    title: 'Altitude',
    subtitle: 'Spatial Visualization',
    tagline: 'Living suspended between cloud and stone.',
    industry: 'Parametric Architecture',
    sceneFile: 'AltitudeScene3D.tsx',
    accentColor: '#536878',
    sceneExportName: 'AltitudeScene3D'
  },
  {
    id: '03-kinetic',
    number: '03',
    port: 5203,
    title: 'Kinetic',
    subtitle: 'Footwear Configurator',
    tagline: 'Motion engineered into every fiber.',
    industry: 'Performance Footwear',
    sceneFile: 'KineticScene3D.tsx',
    accentColor: '#D72638',
    sceneExportName: 'KineticScene3D'
  },
  {
    id: '04-verdant-lab',
    number: '04',
    port: 5204,
    title: 'Verdant Lab',
    subtitle: 'Botanical Skincare',
    tagline: 'Formulated in dialogue with living flora.',
    industry: 'Clean Cosmetic Science',
    sceneFile: 'VerdantLabScene3D.tsx',
    accentColor: '#7D9078',
    sceneExportName: 'VerdantLabScene3D'
  },
  {
    id: '05-elemental-kitchen',
    number: '05',
    port: 5205,
    title: 'Elemental Kitchen',
    subtitle: 'Food Physics & Choreography',
    tagline: 'Heat, gravity, and the art of the pan.',
    industry: 'Culinary Physics & Motion',
    sceneFile: 'ElementalKitchenScene3D.tsx',
    accentColor: '#D24B35',
    sceneExportName: 'ElementalKitchenScene3D'
  },
  {
    id: '06-molecule-08',
    number: '06',
    port: 5206,
    title: 'Molecule No. 08',
    subtitle: 'Haute Parfumerie',
    tagline: 'The architecture of invisible allure.',
    industry: 'Luxury Fragrance & Glass',
    sceneFile: 'Molecule08Scene3D.tsx',
    accentColor: '#C78D46',
    sceneExportName: 'Molecule08Scene3D'
  },
  {
    id: '07-habitat-system',
    number: '07',
    port: 5207,
    title: 'Habitat System',
    subtitle: 'Modular Interior Architecture',
    tagline: 'Living space defined by modular harmony.',
    industry: 'Bespoke Furniture Systems',
    sceneFile: 'HabitatSystemScene3D.tsx',
    accentColor: '#684C38',
    sceneExportName: 'HabitatSystemScene3D'
  },
  {
    id: '08-layered',
    number: '08',
    port: 5208,
    title: 'Layered',
    subtitle: 'Fluid Stratification',
    tagline: 'Every stratum crafted with patience.',
    industry: 'Café & Confectionery 3D',
    sceneFile: 'LayeredScene3D.tsx',
    accentColor: '#B2743D',
    sceneExportName: 'LayeredScene3D'
  },
  {
    id: '09-formula',
    number: '09',
    port: 5209,
    title: 'Formula',
    subtitle: 'Laboratory Scroll Narrative',
    tagline: 'Clean clinical science meets botanical luxury.',
    industry: 'Cosmetic Laboratory',
    sceneFile: 'FormulaScene3D.tsx',
    accentColor: '#5B7065',
    sceneExportName: 'FormulaScene3D'
  },
  {
    id: '10-atelier',
    number: '10',
    port: 5210,
    title: 'Atelier',
    subtitle: 'Fine Diamond Configurator',
    tagline: 'High jewelry conceived as wearable architecture.',
    industry: 'Haute Joaillerie',
    sceneFile: 'AtelierRingScene3D.tsx',
    accentColor: '#D4AF37',
    sceneExportName: 'AtelierRingScene3D'
  },
  {
    id: '11-bean-to-cup',
    number: '11',
    port: 5211,
    title: 'From Bean to Cup',
    subtitle: 'Espresso Mechanical Cutaway',
    tagline: 'Precision thermodynamics behind every extraction.',
    industry: 'Coffee Technology & Thermodynamics',
    sceneFile: 'BeanToCupScene3D.tsx',
    accentColor: '#A06535',
    sceneExportName: 'BeanToCupScene3D'
  },
  {
    id: '12-living-modules',
    number: '12',
    port: 5212,
    title: 'Living Modules',
    subtitle: 'Blueprint Morphing Space',
    tagline: 'Fluid domestic spaces that evolve with life.',
    industry: 'Interior Architecture & Systems',
    sceneFile: 'LivingModulesScene3D.tsx',
    accentColor: '#706050',
    sceneExportName: 'LivingModulesScene3D'
  },
  {
    id: '13-blend',
    number: '13',
    port: 5213,
    title: 'Blend',
    subtitle: 'Custom Beverage & Color Blending',
    tagline: 'Customized wellness in every pour.',
    industry: 'Beverage Systems & UI Sync',
    sceneFile: 'BlendScene3D.tsx',
    accentColor: '#3A7D60',
    sceneExportName: 'BlendScene3D'
  },
  {
    id: '14-casa-horizon',
    number: '14',
    port: 5214,
    title: 'Casa Horizon',
    subtitle: 'Mallorca Coastal Retreat',
    tagline: 'Where horizon lines blur with modern shelter.',
    industry: 'Luxury Property Narrative',
    sceneFile: 'CasaHorizonScene3D.tsx',
    accentColor: '#4A6B82',
    sceneExportName: 'CasaHorizonScene3D'
  },
  {
    id: '15-ritual',
    number: '15',
    port: 5215,
    title: 'Ritual',
    subtitle: 'Interactive Drink Studio',
    tagline: 'Morning devotion transformed into a craft.',
    industry: 'Specialty Coffee E-Commerce',
    sceneFile: 'RitualScene3D.tsx',
    accentColor: '#9C6233',
    sceneExportName: 'RitualScene3D'
  }
];

const sharedNodeModules = path.join(__dirname, 'cinematic-portfolio', 'node_modules');

console.log('🚀 Generating 15 standalone TypeScript/TSX projects with dedicated Vite configs and 3D scenes...\n');

projectConfigs.forEach((cfg, idx) => {
  const projectDir = path.join(__dirname, cfg.id);
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }

  // 1. package.json
  const pkg = {
    name: cfg.id,
    version: '1.0.0',
    private: true,
    type: 'module',
    scripts: {
      dev: `vite --port ${cfg.port}`,
      build: 'tsc -b && vite build',
      preview: `vite preview --port ${cfg.port}`
    },
    dependencies: {
      react: '19.2.0',
      'react-dom': '19.2.0',
      three: '^0.186.0'
    },
    devDependencies: {
      '@types/react': '^19.0.10',
      '@types/react-dom': '^19.0.4',
      '@types/three': '^0.174.0',
      '@vitejs/plugin-react': '5.0.4',
      typescript: '^5.8.2',
      vite: '6.4.2'
    }
  };
  fs.writeFileSync(path.join(projectDir, 'package.json'), JSON.stringify(pkg, null, 2));

  // 2. tsconfig.json
  fs.writeFileSync(path.join(projectDir, 'tsconfig.json'), tsconfigContent);

  // 3. vite.config.ts
  const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: ${cfg.port},
    strictPort: true,
    host: '0.0.0.0'
  }
});
`;
  fs.writeFileSync(path.join(projectDir, 'vite.config.ts'), viteConfig);
  // Remove old .mjs if exists
  if (fs.existsSync(path.join(projectDir, 'vite.config.mjs'))) {
    fs.unlinkSync(path.join(projectDir, 'vite.config.mjs'));
  }

  // 4. index.html
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${cfg.title} • ${cfg.subtitle} — Interactive 3D Experience (Port ${cfg.port})</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
  fs.writeFileSync(path.join(projectDir, 'index.html'), indexHtml);

  // 5. src directory
  const srcDir = path.join(projectDir, 'src');
  if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true });

  // Clean old jsx files
  ['main.jsx', 'App.jsx', 'Scene3D.jsx'].forEach(f => {
    const oldFile = path.join(srcDir, f);
    if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
  });

  // 6. Sound Engine
  const audioDir = path.join(srcDir, 'audio');
  if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });
  // Clean old js file
  if (fs.existsSync(path.join(audioDir, 'soundEngine.js'))) {
    fs.unlinkSync(path.join(audioDir, 'soundEngine.js'));
  }
  
  const soundEngineTs = `export type SoundType = 'click' | 'whoosh' | 'glass' | 'metal' | 'water' | 'ambient' | 'coffee';
${soundEngineContent.replace(/import { SoundType } from '\.\.\/types\/portfolio';/, '')}
`;
  fs.writeFileSync(path.join(audioDir, 'soundEngine.ts'), soundEngineTs);

  // 7. Scene 3D component (TSX)
  const rawScene = fs.readFileSync(path.join(scenesDir, cfg.sceneFile), 'utf8');
  let cleanedScene = rawScene
    .replace(/import { soundEngine } from '\.\.\/audio\/soundEngine';/g, `import { soundEngine } from './audio/soundEngine';`)
    .replace(/import { sound } from '\.\.\/audio\/soundEngine';/g, `import { sound } from './audio/soundEngine';`);
  
  if (!cleanedScene.includes('export default')) {
    cleanedScene += `\nexport default ${cfg.sceneExportName};\n`;
  }

  fs.writeFileSync(path.join(srcDir, 'Scene3D.tsx'), cleanedScene);

  // 8. index.css
  const indexCss = `:root {
  --bg-primary: #0C0D0E;
  --bg-surface: #141619;
  --bg-card: rgba(22, 25, 30, 0.7);
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-accent: ${cfg.accentColor};
  --accent: ${cfg.accentColor};
  --text-main: #F4F6F8;
  --text-muted: #8E98A5;
  --font-serif: 'Bodoni Moda', serif;
  --font-sans: 'Plus Jakarta Sans', sans-serif;
  --font-mono: 'Space Grotesk', monospace;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-main);
  font-family: var(--font-sans);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

.container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 28px;
}

/* Header Navbar */
header.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  z-index: 100;
  background: rgba(12, 13, 14, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
}

.brand-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: var(--text-main);
}

.port-pill {
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border-subtle);
  color: var(--accent);
  font-weight: 700;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.btn-nav {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-main);
  border: 1px solid var(--border-subtle);
  cursor: pointer;
}

.btn-nav:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.btn-hub {
  background: var(--accent);
  color: #000;
  font-weight: 700;
  border: none;
}

/* Stage Viewport */
.stage-section {
  position: relative;
  width: 100vw;
  height: 85vh;
  margin-top: 72px;
  background: #0B0B0D;
  overflow: hidden;
  border-bottom: 1px solid var(--border-subtle);
}

.hud-overlay {
  position: absolute;
  top: 24px;
  left: 32px;
  pointer-events: none;
  z-index: 10;
}

.hud-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 700;
  color: var(--accent);
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 8px;
}

.hud-title {
  font-family: var(--font-serif);
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 400;
  line-height: 1.05;
  color: #FFF;
}

/* Case Study Section */
.case-study-section {
  padding: 100px 0 140px;
  background: var(--bg-primary);
}

.grid-dossier {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-top: 48px;
}

.dossier-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 20px;
  padding: 32px;
  transition: all 0.3s ease;
}

.dossier-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-4px);
}

.dossier-label {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  margin-bottom: 12px;
  font-weight: 700;
}

.dossier-heading {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #FFF;
}

.dossier-text {
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-muted);
}

/* Footer Switcher */
.project-footer-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
  border-top: 1px solid var(--border-subtle);
  margin-top: 60px;
}
`;
  fs.writeFileSync(path.join(srcDir, 'index.css'), indexCss);

  // 9. src/App.tsx
  const prevProject = projectConfigs[(idx - 1 + projectConfigs.length) % projectConfigs.length];
  const nextProject = projectConfigs[(idx + 1) % projectConfigs.length];

  const appTsx = `import React, { useState } from 'react';
import Scene3D from './Scene3D';
import { soundEngine } from './audio/soundEngine';

export default function App(): React.JSX.Element {
  const [soundActive, setSoundActive] = useState<boolean>(false);

  const toggleAudio = () => {
    const muted = soundEngine.toggleMute();
    setSoundActive(!muted);
  };

  return (
    <div className="project-app">
      {/* Editorial Header */}
      <header className="app-header">
        <a href="http://localhost:5000" className="brand-badge">
          <span className="port-pill">PORT ${cfg.port}</span>
          <span style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '-0.01em' }}>
            ${cfg.number} • ${cfg.title.toUpperCase()}
          </span>
        </a>

        <div className="nav-links">
          <button onClick={toggleAudio} className="btn-nav">
            {soundActive ? '🔊 Audio ON' : '🔇 Audio Muted'}
          </button>
          <a href="http://localhost:5200" className="btn-nav">
            Cinematic 3D Hub (5200) ↗
          </a>
          <a href="http://localhost:5000" className="btn-nav btn-hub">
            Master Hub (5000) ↗
          </a>
        </div>
      </header>

      {/* Main 3D Viewport */}
      <section className="stage-section">
        <div className="hud-overlay">
          <div className="hud-pill">
            <span>● SCENE ${cfg.number}</span>
            <span>·</span>
            <span>${cfg.industry}</span>
          </div>
          <h1 className="hud-title">${cfg.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginTop: '6px', maxWidth: '460px' }}>
            ${cfg.tagline}
          </p>
        </div>

        {/* The 3D Scene Component */}
        <div style={{ width: '100%', height: '100%' }}>
          <Scene3D />
        </div>
      </section>

      {/* Case Study Dossier */}
      <section className="case-study-section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.15em', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase' }}>
              Comprehensive Project Dossier
            </span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 4vw, 54px)', fontWeight: 400, color: '#FFF', lineHeight: 1.05 }}>
            ${cfg.title} — Architectural &amp; Interactive Engineering
          </h2>

          <div className="grid-dossier">
            <div className="dossier-card">
              <div className="dossier-label">01 / Concept &amp; Intent</div>
              <h3 className="dossier-heading">Design Vision</h3>
              <p className="dossier-text">
                Explore the intricate physical balance of materials, light refraction, and procedural dynamics built specifically for real-time 60 FPS WebGL interaction.
              </p>
            </div>

            <div className="dossier-card">
              <div className="dossier-label">02 / Technical Architecture</div>
              <h3 className="dossier-heading">WebGL &amp; Three.js Stack</h3>
              <p className="dossier-text">
                Custom BufferGeometry, procedural shader materials, directional studio lights, and OrbitControls with damping for smooth desktop and mobile manipulation.
              </p>
            </div>

            <div className="dossier-card">
              <div className="dossier-label">03 / Performance Telemetry</div>
              <h3 className="dossier-heading">60 FPS Target Metrics</h3>
              <p className="dossier-text">
                Draw calls capped under 30 with instanced geometries, Draco buffer compression, and hardware-accelerated ACESFilmic tone mapping.
              </p>
            </div>
          </div>

          {/* Navigation to Next / Previous Projects */}
          <div className="project-footer-nav">
            <a href="http://localhost:${prevProject.port}" className="btn-nav">
              ← Prev: ${prevProject.title} (${prevProject.port})
            </a>
            <a href="http://localhost:5000" className="btn-nav btn-hub">
              Master Portfolio Hub (Port 5000)
            </a>
            <a href="http://localhost:${nextProject.port}" className="btn-nav">
              Next: ${nextProject.title} (${nextProject.port}) →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(srcDir, 'App.tsx'), appTsx);

  // 10. src/main.tsx
  const mainTsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;
  fs.writeFileSync(path.join(srcDir, 'main.tsx'), mainTsx);

  // 11. Node modules junction
  const destModules = path.join(projectDir, 'node_modules');
  if (!fs.existsSync(destModules)) {
    try {
      fs.symlinkSync(sharedNodeModules, destModules, 'junction');
    } catch (e) {
      console.warn(`Could not create junction for ${cfg.id}:`, e.message);
    }
  }

  console.log(`  ✅ [${String(idx + 1).padStart(2, '0')}] ${cfg.id.padEnd(24)} -> Updated to TSX on Port ${cfg.port}`);
});

console.log('\n✨ All 15 standalone projects successfully updated to TSX/TypeScript!');
