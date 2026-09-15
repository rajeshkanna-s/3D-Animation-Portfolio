import React from 'react';
import { ProjectData } from '../types/portfolio';
import { projectsData } from '../data/projectsData';
import { usePortfolioStore } from '../store/portfolioStore';
import { ArrowLeft, ArrowRight, Sparkle, SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react';
import { sound } from '../audio/soundEngine';

interface Props {
  project: ProjectData;
  children: React.ReactNode; // The active 3D scene component
}

export const ProjectPageShell: React.FC<Props> = ({ project, children }) => {
  const setActiveProject = usePortfolioStore((state) => state.setActiveProject);
  const soundEnabled = usePortfolioStore((state) => state.soundEnabled);
  const toggleSound = usePortfolioStore((state) => state.toggleSound);

  const nextProject = projectsData.find((p) => p.id === project.nextProjectId) || projectsData[0];

  return (
    <article 
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: 'var(--canvas-warm)',
        paddingTop: '80px',
        animation: 'projectEnter 500ms cubic-bezier(0.22, 1, 0.36, 1) forwards'
      }}
    >
      {/* Top Project Sub-Header Bar */}
      <div 
        style={{
          position: 'sticky',
          top: '68px',
          zIndex: 50,
          backgroundColor: 'rgba(241, 237, 229, 0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '14px 0'
        }}
      >
        <div 
          className="container-wide"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Back to Index Button */}
          <button
            onClick={() => {
              sound.play('click');
              setActiveProject(null);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              fontWeight: '600',
              color: 'var(--text-primary)'
            }}
          >
            <ArrowLeft size={16} />
            <span>All 15 Case Studies</span>
          </button>

          {/* Center Project Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '11px', color: project.accentColor, fontWeight: '700' }}>
              SCENE {project.number}
            </span>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-primary)', fontWeight: '600' }}>
              {project.title}
            </span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: soundEnabled ? 'var(--text-primary)' : 'var(--text-muted)'
            }}
          >
            {soundEnabled ? <SpeakerHigh size={14} color="#B49A73" weight="fill" /> : <SpeakerSlash size={14} />}
            <span>{soundEnabled ? 'Audio On' : 'Muted'}</span>
          </button>
        </div>
      </div>

      {/* 1. Interactive 3D Scene Hero Stage */}
      <section 
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(580px, 82vh, 880px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: '#11110F',
          borderBottom: '1px solid rgba(241, 237, 229, 0.12)'
        }}
      >
        {/* The Active 3D WebGL Canvas */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1
          }}
        >
          {children}
        </div>

        {/* Floating Scene Controls & Guidance (Bottom Center) */}
        <div 
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '10px 20px',
            borderRadius: 'var(--radius-pill)',
            backgroundColor: 'rgba(17, 17, 15, 0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(241, 237, 229, 0.15)',
            color: '#F1EDE5',
            pointerEvents: 'none'
          }}
        >
          <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.16em', color: project.accentColor, fontWeight: '600' }}>
            Interactive Mode
          </span>
          <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'rgba(241,237,229,0.3)' }} />
          <span style={{ fontSize: '11px', color: '#9E978E' }}>
            Drag to rotate 360° • Scroll / Pinch to zoom
          </span>
        </div>

        {/* Scene Watermark Tagline (Top Left) */}
        <div 
          style={{
            position: 'absolute',
            top: '28px',
            left: 'clamp(20px, 4vw, 54px)',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        >
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.18em', color: project.accentColor, fontWeight: '600', marginBottom: '6px' }}>
            {project.industry}
          </div>
          <div style={{ fontFamily: 'var(--font-display-serif)', fontSize: 'clamp(22px, 3vw, 36px)', color: '#F1EDE5', maxWidth: '420px', lineHeight: 1.1 }}>
            {project.tagline}
          </div>
        </div>
      </section>

      {/* 2. Project Statement & Metadata Grid */}
      <section style={{ padding: 'clamp(60px, 8vw, 110px) 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          
          <div style={{ maxWidth: '920px', marginBottom: '64px' }}>
            <span className="label-tech-accent" style={{ display: 'block', marginBottom: '14px' }}>
              EXECUTIVE SUMMARY
            </span>
            <p
              style={{
                fontFamily: 'var(--font-display-serif)',
                fontSize: 'clamp(28px, 4vw, 52px)',
                lineHeight: 1.15,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em'
              }}
            >
              {project.shortStatement}
            </p>
          </div>

          {/* Metadata Grid */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '32px',
              paddingTop: '36px',
              borderTop: '1px solid var(--border-subtle)'
            }}
          >
            <div>
              <span className="label-tech" style={{ display: 'block', marginBottom: '8px' }}>Year</span>
              <span style={{ fontSize: '16px', fontWeight: '500' }}>{project.year}</span>
            </div>
            <div>
              <span className="label-tech" style={{ display: 'block', marginBottom: '8px' }}>Industry</span>
              <span style={{ fontSize: '16px', fontWeight: '500' }}>{project.industry}</span>
            </div>
            <div>
              <span className="label-tech" style={{ display: 'block', marginBottom: '8px' }}>Discipline</span>
              <span style={{ fontSize: '16px', fontWeight: '500' }}>{project.discipline}</span>
            </div>
            <div>
              <span className="label-tech" style={{ display: 'block', marginBottom: '8px' }}>Core Tech</span>
              <span style={{ fontSize: '16px', fontWeight: '500' }}>WebGL · Three.js · PBR</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Deep-Dive Dossier: Challenge, Approach, Art Direction, Motion */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) 0', backgroundColor: 'var(--surface-paper)' }}>
        <div className="container">
          
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '64px',
              marginBottom: '72px'
            }}
          >
            {/* The Challenge */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: project.accentColor }} />
                <span className="label-tech">01 · THE DESIGN CHALLENGE</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display-serif)', fontSize: '28px', marginBottom: '18px' }}>
                Engineering Spatial Fidelity
              </h3>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                {project.challenge}
              </p>
            </div>

            {/* The Approach */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: project.accentColor }} />
                <span className="label-tech">02 · ARCHITECTURAL APPROACH</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display-serif)', fontSize: '28px', marginBottom: '18px' }}>
                Kinematics & Shaders
              </h3>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                {project.approach}
              </p>
            </div>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '64px',
              paddingTop: '64px',
              borderTop: '1px solid var(--border-subtle)'
            }}
          >
            {/* Art Direction */}
            <div>
              <span className="label-tech" style={{ display: 'block', marginBottom: '14px' }}>03 · ART DIRECTION</span>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                {project.artDirection}
              </p>
            </div>

            {/* Motion System */}
            <div>
              <span className="label-tech" style={{ display: 'block', marginBottom: '14px' }}>04 · MOTION SYSTEM</span>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                {project.motionSystem}
              </p>
            </div>

            {/* Performance Notes */}
            <div>
              <span className="label-tech" style={{ display: 'block', marginBottom: '14px' }}>05 · PERFORMANCE BUDGET</span>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                {project.performanceNotes}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Results & Metrics */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '48px', alignItems: 'flex-start' }}>
            
            {/* Results Checklist */}
            <div style={{ maxWidth: '540px' }}>
              <span className="label-tech-accent" style={{ display: 'block', marginBottom: '16px' }}>
                MEASURED IMPACT
              </span>
              <h3 style={{ fontFamily: 'var(--font-display-serif)', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '24px' }}>
                Key Outcomes & Verification
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {project.results.map((res, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '15px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                    <Sparkle size={16} color={project.accentColor} weight="fill" style={{ marginTop: '4px', flexShrink: 0 }} />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metrics Counters */}
            <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
              {project.metrics.map((m) => (
                <div 
                  key={m.label}
                  style={{
                    padding: '24px 32px',
                    backgroundColor: 'var(--surface-paper)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    minWidth: '160px'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-display-serif)', fontSize: 'clamp(36px, 4.5vw, 54px)', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {m.value}
                  </div>
                  <div className="label-tech">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 5. Next Project Transition Banner */}
      <section 
        onClick={() => {
          sound.play('whoosh');
          setActiveProject(nextProject.id);
        }}
        style={{
          padding: 'clamp(80px, 12vw, 140px) 0',
          backgroundColor: '#11110F',
          color: '#F1EDE5',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '32px' }}>
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.18em', color: nextProject.accentColor, fontWeight: '600', display: 'block', marginBottom: '14px' }}>
                NEXT CASE STUDY · {nextProject.number}
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display-serif)',
                  fontSize: 'clamp(44px, 7vw, 96px)',
                  lineHeight: 0.95,
                  fontWeight: '400',
                  letterSpacing: '-0.025em'
                }}
              >
                {nextProject.title}
              </h2>
              <p style={{ fontSize: '15px', color: '#9E978E', marginTop: '12px' }}>
                {nextProject.industry} • {nextProject.tagline}
              </p>
            </div>

            <div 
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                border: '1px solid rgba(241, 237, 229, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F1EDE5'
              }}
            >
              <ArrowRight size={24} />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes projectEnter {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </article>
  );
};
