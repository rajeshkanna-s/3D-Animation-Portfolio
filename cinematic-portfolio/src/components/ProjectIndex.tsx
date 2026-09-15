import React, { useState, useEffect } from 'react';
import { projectsData } from '../data/projectsData';
import { usePortfolioStore } from '../store/portfolioStore';
import { ArrowUpRight, Sparkle } from '@phosphor-icons/react';
import { sound } from '../audio/soundEngine';

export const ProjectIndex: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const setActiveProject = usePortfolioStore((state) => state.setActiveProject);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const activeHoverProject = projectsData.find((p) => p.id === hoveredId);

  return (
    <section 
      id="work"
      style={{
        padding: 'clamp(80px, 12vw, 160px) 0',
        position: 'relative',
        backgroundColor: 'var(--surface-paper)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)'
      }}
    >
      <div className="container-wide">
        
        {/* Section Header */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '24px',
            marginBottom: '64px',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '28px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-champagne)' }} />
              <span className="label-tech-accent">
                02 · SELECTED INDEX
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display-serif)',
                fontSize: 'clamp(36px, 5.2vw, 72px)',
                lineHeight: 0.96,
                fontWeight: '400',
                color: 'var(--text-primary)',
                letterSpacing: '-0.025em'
              }}
            >
              15 Interactive Case Studies.
            </h2>
          </div>

          <div style={{ maxWidth: '420px', fontSize: '14px', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
            Each case study features an authentic, real-time 3D WebGL interactive experience spanning culinary arts, architecture, footwear, luxury goods, and mechanical systems.
          </div>
        </div>

        {/* The 15-Project Rows List */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {projectsData.map((project) => {
            const isHovered = hoveredId === project.id;
            const isDimmed = hoveredId !== null && !isHovered;

            return (
              <div
                key={project.id}
                onMouseEnter={() => {
                  setHoveredId(project.id);
                  sound.play('click');
                }}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveProject(project.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'clamp(20px, 2.8vw, 32px) 0',
                  borderBottom: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  opacity: isDimmed ? 0.35 : 1,
                  transform: isHovered ? 'translateX(10px)' : 'translateX(0)',
                  transition: 'opacity 250ms ease, transform 300ms cubic-bezier(0.22, 1, 0.36, 1)'
                }}
                className="project-index-row"
                role="button"
                tabIndex={0}
                aria-label={`Open project ${project.number}: ${project.title}`}
              >
                {/* Left: Number & Title */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(16px, 3vw, 42px)' }}>
                  <span 
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      color: isHovered ? project.accentColor : 'var(--text-muted)',
                      fontWeight: '600',
                      minWidth: '24px',
                      transition: 'color 200ms ease'
                    }}
                  >
                    {project.number}
                  </span>

                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display-serif)',
                        fontSize: 'clamp(26px, 3.8vw, 54px)',
                        fontWeight: '400',
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.05
                      }}
                    >
                      {project.title}
                    </h3>
                    <div 
                      style={{
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        fontFamily: 'var(--font-sans)',
                        marginTop: '4px'
                      }}
                      className="mobile-only"
                    >
                      {project.industry} • {project.year}
                    </div>
                  </div>
                </div>

                {/* Middle: Industry & Discipline (Desktop) */}
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '48px',
                    fontSize: '13px',
                    color: 'var(--text-secondary)'
                  }}
                  className="desktop-only"
                >
                  <span style={{ width: '140px', fontWeight: '500' }}>
                    {project.industry}
                  </span>
                  <span style={{ width: '280px', color: 'var(--text-muted)' }}>
                    {project.discipline}
                  </span>
                  <span style={{ width: '60px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                    {project.year}
                  </span>
                </div>

                {/* Right: Action Arrow */}
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isHovered ? 'var(--color-black)' : 'transparent',
                    color: isHovered ? '#FFFFFF' : 'var(--text-primary)',
                    transform: isHovered ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'all 280ms cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <ArrowUpRight size={18} />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Floating Cursor Preview Thumbnail (Desktop) */}
      {hoveredId && activeHoverProject && (
        <div
          style={{
            position: 'fixed',
            left: `${mousePos.x + 28}px`,
            top: `${mousePos.y - 120}px`,
            width: '280px',
            backgroundColor: '#11110F',
            color: '#F1EDE5',
            borderRadius: 'var(--radius-sm)',
            padding: '18px 20px',
            pointerEvents: 'none',
            zIndex: 100,
            boxShadow: '0 24px 60px -15px rgba(0,0,0,0.3)',
            animation: 'previewFade 200ms cubic-bezier(0.22, 1, 0.36, 1) forwards'
          }}
          className="desktop-only"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.14em', color: activeHoverProject.accentColor, fontWeight: '600' }}>
              Scene {activeHoverProject.number}
            </span>
            <span style={{ fontSize: '10px', color: '#9E978E' }}>
              {activeHoverProject.year}
            </span>
          </div>

          <div style={{ fontFamily: 'var(--font-display-serif)', fontSize: '20px', marginBottom: '6px' }}>
            {activeHoverProject.title}
          </div>

          <p style={{ fontSize: '11px', color: '#9E978E', lineHeight: 1.5, marginBottom: '12px' }}>
            {activeHoverProject.tagline}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#B49A73' }}>
            <Sparkle size={12} weight="fill" />
            <span>Click to enter interactive 3D scene</span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes previewFade {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
};
