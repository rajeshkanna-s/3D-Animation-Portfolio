import React, { useEffect, useState } from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import { portfolioIdentity } from '../data/projectsData';
import { SpeakerHigh, SpeakerSlash, List, X, ArrowUpRight } from '@phosphor-icons/react';
import { sound } from '../audio/soundEngine';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const activeProjectId = usePortfolioStore((state) => state.activeProjectId);
  const setActiveProject = usePortfolioStore((state) => state.setActiveProject);
  const soundEnabled = usePortfolioStore((state) => state.soundEnabled);
  const toggleSound = usePortfolioStore((state) => state.toggleSound);
  const mobileMenuOpen = usePortfolioStore((state) => state.mobileMenuOpen);
  const setMobileMenuOpen = usePortfolioStore((state) => state.setMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work', action: () => { if (activeProjectId) setActiveProject(null); } },
    { label: 'Capabilities', href: '#capabilities', action: () => { if (activeProjectId) setActiveProject(null); } },
    { label: 'Process', href: '#process', action: () => { if (activeProjectId) setActiveProject(null); } },
    { label: 'About', href: '#about', action: () => { if (activeProjectId) setActiveProject(null); } },
    { label: 'Contact', href: '#contact', action: () => { if (activeProjectId) setActiveProject(null); } }
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: isScrolled ? '68px' : '82px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: isScrolled ? 'rgba(241, 237, 229, 0.88)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--border-subtle)' : '1px solid rgba(17, 17, 15, 0.08)',
          transition: 'all 350ms cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      >
        <div 
          className="container-wide"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          {/* Logo / Name */}
          <button
            onClick={() => setActiveProject(null)}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '10px',
              textDecoration: 'none'
            }}
            aria-label="Return to portfolio home"
          >
            <span 
              style={{
                fontFamily: 'var(--font-display-serif)',
                fontSize: 'clamp(20px, 1.8vw, 24px)',
                fontWeight: '500',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em'
              }}
            >
              {portfolioIdentity.name}
            </span>
            <span 
              style={{
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: 'var(--accent-champagne)',
                fontWeight: '600'
              }}
              className="desktop-only"
            >
              3D Experience Studio
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav 
            style={{ display: 'flex', alignItems: 'center', gap: '36px' }}
            className="desktop-only"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  sound.play('click');
                  link.action();
                }}
                style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  position: 'relative',
                  padding: '6px 0',
                  transition: 'color 200ms ease'
                }}
                className="nav-link-hover"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            
            {/* Sound Toggle Button */}
            <button
              onClick={toggleSound}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: soundEnabled ? 'var(--color-black)' : 'rgba(250, 248, 243, 0.8)',
                color: soundEnabled ? '#FFFFFF' : 'var(--text-primary)',
                transition: 'all 250ms ease'
              }}
              title={soundEnabled ? 'Mute sound' : 'Enable audio experience'}
              aria-label={soundEnabled ? 'Mute sound' : 'Enable audio experience'}
            >
              {soundEnabled ? (
                <SpeakerHigh size={14} weight="fill" color="#B49A73" />
              ) : (
                <SpeakerSlash size={14} weight="regular" />
              )}
              <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: '600' }}>
                {soundEnabled ? 'Sound On' : 'Sound'}
              </span>
            </button>

            {/* Inquire CTA (Desktop) */}
            <a
              href="#contact"
              onClick={() => {
                sound.play('click');
                if (activeProjectId) setActiveProject(null);
              }}
              className="btn-editorial btn-editorial-primary desktop-only"
              style={{
                padding: '10px 20px',
                fontSize: '11px',
                letterSpacing: '0.14em'
              }}
            >
              Start Project
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-only"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'rgba(250, 248, 243, 0.9)'
              }}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <List size={20} />}
            </button>

          </div>

        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          backgroundColor: '#11110F',
          color: '#F1EDE5',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(32px, 6vw, 64px)',
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 550ms cubic-bezier(0.76, 0, 0.24, 1)',
          pointerEvents: mobileMenuOpen ? 'auto' : 'none'
        }}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Drawer Header Space */}
        <div style={{ height: '72px' }} />

        {/* Drawer Nav Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                sound.play('click');
                setMobileMenuOpen(false);
                link.action();
              }}
              style={{
                fontFamily: 'var(--font-display-serif)',
                fontSize: 'clamp(38px, 9vw, 64px)',
                lineHeight: 1.1,
                color: '#F1EDE5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(241, 237, 229, 0.12)',
                paddingBottom: '14px'
              }}
            >
              <span>{link.label}</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#B49A73' }}>
                0{idx + 1}
              </span>
            </a>
          ))}
        </nav>

        {/* Drawer Footer Metadata */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '24px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#B49A73' }}>
            {portfolioIdentity.status}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#9E978E' }}>
              {portfolioIdentity.email}
            </span>
            <div style={{ display: 'flex', gap: '16px' }}>
              {portfolioIdentity.social.map(s => (
                <a 
                  key={s.name} 
                  href={s.url} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ fontSize: '12px', color: '#F1EDE5' }}
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 960px) {
          .desktop-only { display: none !important; }
        }
        @media (min-width: 961px) {
          .mobile-only { display: none !important; }
        }
        .nav-link-hover::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background-color: var(--accent-champagne);
          transition: width 240ms ease;
        }
        .nav-link-hover:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
};
