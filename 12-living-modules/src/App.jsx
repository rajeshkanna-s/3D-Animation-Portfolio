import React, { useState } from 'react';
import Scene3D from './Scene3D';
import { soundEngine } from './audio/soundEngine.js';

export default function App() {
  const [soundActive, setSoundActive] = useState(false);

  const toggleAudio = () => {
    const muted = soundEngine.toggleMute();
    setSoundActive(!muted);
  };

  return (
    <div className="project-app">
      {/* Editorial Header */}
      <header className="app-header">
        <a href="http://localhost:5000" className="brand-badge">
          <span className="port-pill">PORT 5212</span>
          <span style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '-0.01em' }}>
            12 • LIVING MODULES
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
            <span>● SCENE 12</span>
            <span>·</span>
            <span>Interior Architecture & Systems</span>
          </div>
          <h1 className="hud-title">Living Modules</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginTop: '6px', maxWidth: '460px' }}>
            Fluid domestic spaces that evolve with life.
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
            Living Modules — Architectural &amp; Interactive Engineering
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
            <a href="http://localhost:5211" className="btn-nav">
              ← Prev: From Bean to Cup (5211)
            </a>
            <a href="http://localhost:5000" className="btn-nav btn-hub">
              Master Portfolio Hub (Port 5000)
            </a>
            <a href="http://localhost:5213" className="btn-nav">
              Next: Blend (5213) →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
