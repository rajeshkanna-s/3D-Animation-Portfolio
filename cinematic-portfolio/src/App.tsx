import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { usePortfolioStore } from './store/portfolioStore';
import { projectsData, portfolioIdentity } from './data/projectsData';

// Core Platform Components
import { Navigation } from './components/Navigation';
import { Preloader } from './components/Preloader';
import { HeroSculpture3D } from './components/HeroSculpture3D';
import { ProjectIndex } from './components/ProjectIndex';
import { ProjectPageShell } from './components/ProjectPageShell';
import { Footer } from './components/Footer';

// 15 Distinct 3D Case Study Scenes
import { GatherScene3D } from './scenes/GatherScene3D';
import { AltitudeScene3D } from './scenes/AltitudeScene3D';
import { KineticScene3D } from './scenes/KineticScene3D';
import { VerdantLabScene3D } from './scenes/VerdantLabScene3D';
import { ElementalKitchenScene3D } from './scenes/ElementalKitchenScene3D';
import { Molecule08Scene3D } from './scenes/Molecule08Scene3D';
import { HabitatSystemScene3D } from './scenes/HabitatSystemScene3D';
import { LayeredScene3D } from './scenes/LayeredScene3D';
import { FormulaScene3D } from './scenes/FormulaScene3D';
import { AtelierRingScene3D } from './scenes/AtelierRingScene3D';
import { BeanToCupScene3D } from './scenes/BeanToCupScene3D';
import { LivingModulesScene3D } from './scenes/LivingModulesScene3D';
import { BlendScene3D } from './scenes/BlendScene3D';
import { CasaHorizonScene3D } from './scenes/CasaHorizonScene3D';
import { RitualScene3D } from './scenes/RitualScene3D';

import { Sparkle, Cube, Atom, Waves, Compass, ArrowUpRight } from '@phosphor-icons/react';
import { sound } from './audio/soundEngine';

export const App: React.FC = () => {
  const activeProjectId = usePortfolioStore((state) => state.activeProjectId);
  const setActiveProject = usePortfolioStore((state) => state.setActiveProject);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll to top upon project change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeProjectId]);

  const activeProject = projectsData.find((p) => p.id === activeProjectId);

  // Render the respective 3D scene cleanly for the active project
  const renderActiveScene = () => {
    switch (activeProjectId) {
      case '01-gather':
        return <GatherScene3D />;
      case '02-altitude':
        return <AltitudeScene3D />;
      case '03-kinetic':
        return <KineticScene3D />;
      case '04-verdant-lab':
        return <VerdantLabScene3D />;
      case '05-elemental-kitchen':
        return <ElementalKitchenScene3D />;
      case '06-molecule-08':
        return <Molecule08Scene3D />;
      case '07-habitat-system':
        return <HabitatSystemScene3D />;
      case '08-layered':
        return <LayeredScene3D />;
      case '09-formula':
        return <FormulaScene3D />;
      case '10-atelier-ring':
        return <AtelierRingScene3D />;
      case '11-bean-to-cup':
        return <BeanToCupScene3D />;
      case '12-living-modules':
        return <LivingModulesScene3D />;
      case '13-blend':
        return <BlendScene3D />;
      case '14-casa-horizon':
        return <CasaHorizonScene3D />;
      case '15-ritual':
        return <RitualScene3D />;
      default:
        return null;
    }
  };

  return (
    <div className="portfolio-app-root">
      {/* Intro Preloader */}
      <Preloader />

      {/* Persistent Editorial Header & Navigation */}
      <Navigation />

      {/* Main Content Area: Switch between Individual Project Dossier & Master Home View */}
      {activeProject ? (
        <ProjectPageShell project={activeProject}>
          {renderActiveScene()}
        </ProjectPageShell>
      ) : (
        <main>
          {/* 1. Hero Stage with 3D Kinetic Sculpture */}
          <HeroSculpture3D />

          {/* 2. Philosophy & Spatial Direction Section */}
          <section
            id="about"
            style={{
              padding: 'clamp(90px, 12vw, 160px) 0',
              backgroundColor: 'var(--canvas-warm)',
              borderTop: '1px solid var(--border-subtle)',
              position: 'relative'
            }}
          >
            <div className="container">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-champagne)' }} />
                <span className="label-tech-accent">01 · CREATIVE PHILOSOPHY</span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: 'clamp(40px, 6vw, 80px)',
                  alignItems: 'start'
                }}
              >
                <div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-display-serif)',
                      fontSize: 'clamp(32px, 4.4vw, 62px)',
                      lineHeight: 1.05,
                      fontWeight: '400',
                      letterSpacing: '-0.02em',
                      color: 'var(--text-primary)'
                    }}
                  >
                    Digital experiences should possess the physical gravity and sensual weight of objects carved from stone and metal.
                  </h2>
                </div>

                <div>
                  <p
                    style={{
                      fontSize: 'clamp(16px, 1.4vw, 19px)',
                      lineHeight: '1.68',
                      color: 'var(--text-secondary)',
                      marginBottom: '28px'
                    }}
                  >
                    Rather than relying on flat graphic layouts or generic screen containers, our studio engineers
                    cinematic 3D interactions where products transform, disassemble, and reveal their interior architecture
                    directly within the browser.
                  </p>

                  <p
                    style={{
                      fontSize: '15px',
                      lineHeight: '1.64',
                      color: 'var(--text-muted)',
                      marginBottom: '36px'
                    }}
                  >
                    Every project is crafted with custom WebGL shaders, mathematically dampened camera dollies, and procedural
                    sound synthesis to captivate discerning audiences in haute joaillerie, architecture, automotive, and culinary art.
                  </p>

                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <a
                      href="#work"
                      className="btn-editorial btn-editorial-primary"
                      onClick={() => sound.play('click')}
                    >
                      Explore 15 Case Studies
                    </a>
                    <a
                      href="#contact"
                      className="btn-editorial btn-editorial-outline"
                      onClick={() => sound.play('click')}
                    >
                      Initiate Commission
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. The 15 Interactive Case Studies Master Index */}
          <ProjectIndex />

          {/* 4. Capabilities & Disciplines Section */}
          <section
            id="capabilities"
            style={{
              padding: 'clamp(80px, 11vw, 150px) 0',
              backgroundColor: 'var(--canvas-warm)',
              position: 'relative'
            }}
          >
            <div className="container">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-champagne)' }} />
                <span className="label-tech-accent">03 · TECHNICAL CAPABILITIES</span>
              </div>

              <div style={{ marginBottom: '64px' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-display-serif)',
                    fontSize: 'clamp(32px, 4.4vw, 58px)',
                    fontWeight: '400',
                    lineHeight: 1.02
                  }}
                >
                  Architected for High-Impact WebGL Performance
                </h2>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '24px'
                }}
              >
                {[
                  {
                    icon: <Cube size={26} color="#B49A73" />,
                    title: 'Bespoke 3D Geometry & Shader Engineering',
                    desc: 'Custom GLSL shaders for real-time diamond refraction (TIR), physical caustics, volumetric liquids, and metallic patinas.'
                  },
                  {
                    icon: <Atom size={26} color="#B49A73" />,
                    title: 'Kinetic Motion & Physics Architecture',
                    desc: 'Damped quaternion rotations, Catmull-Rom spline camera flights, and exploded assembly mechanics calibrated to human haptics.'
                  },
                  {
                    icon: <Waves size={26} color="#B49A73" />,
                    title: 'Procedural Audio Synthesis',
                    desc: 'Zero-latency sound design using Web Audio API nodes. Dynamic feedback for clicks, whooshes, steam, and crystal chimes.'
                  },
                  {
                    icon: <Compass size={26} color="#B49A73" />,
                    title: 'Device & Memory Lifecycle Management',
                    desc: 'Lazy WebGL context mounting, automatic geometry disposal, DPR throttling, and 60fps performance across mobile and desktop.'
                  }
                ].map((cap, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '36px 32px',
                      backgroundColor: 'var(--surface-paper)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      transition: 'transform 240ms ease, box-shadow 240ms ease'
                    }}
                  >
                    <div>{cap.icon}</div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '17px',
                        fontWeight: '600',
                        color: 'var(--text-primary)',
                        lineHeight: 1.3
                      }}
                    >
                      {cap.title}
                    </h3>
                    <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                      {cap.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. Proven Metrics & Recognition Reel */}
          <section
            id="process"
            style={{
              padding: 'clamp(60px, 8vw, 110px) 0',
              backgroundColor: 'var(--surface-paper)',
              borderTop: '1px solid var(--border-subtle)',
              borderBottom: '1px solid var(--border-subtle)'
            }}
          >
            <div className="container">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '40px',
                  textAlign: 'center'
                }}
              >
                {[
                  { value: '15', label: 'Interactive 3D Case Studies' },
                  { value: '60 FPS', label: 'Consistent Framerate Budget' },
                  { value: '0.0s', label: 'Audio Latency (Procedural Synth)' },
                  { value: '100%', label: 'Native WebGL (Zero CSS 3D Hacks)' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div
                      style={{
                        fontFamily: 'var(--font-display-serif)',
                        fontSize: 'clamp(42px, 5.5vw, 68px)',
                        color: '#B49A73',
                        fontWeight: '400',
                        lineHeight: 1
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em',
                        color: 'var(--text-secondary)',
                        marginTop: '8px'
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Editorial Footer with Live Paris CET Clock & Commission Inquiries */}
      <Footer />
    </div>
  );
};
