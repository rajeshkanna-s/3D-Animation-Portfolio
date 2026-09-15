import React, { useEffect, useState } from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import { portfolioIdentity } from '../data/projectsData';

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const setPreloaderComplete = usePortfolioStore((state) => state.setPreloaderComplete);

  const statusLabels = [
    'Loading geometry',
    'Preparing materials',
    'Building environment',
    'Ready'
  ];

  useEffect(() => {
    const duration = 1200; // Snappy 1.2s realistic loading
    const interval = 25;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, Math.round(prev + step + Math.random() * 3));
        if (next < 30) setStatusIndex(0);
        else if (next < 65) setStatusIndex(1);
        else if (next < 95) setStatusIndex(2);
        else setStatusIndex(3);

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              setPreloaderComplete(true);
              setIsRemoved(true);
            }, 1000); // Wait for split curtain animation
          }, 300);
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [setPreloaderComplete]);

  if (isRemoved) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: isExiting ? 'none' : 'auto',
        overflow: 'hidden'
      }}
      aria-hidden={isExiting}
    >
      {/* Top Panel (Split curtain moves UP) */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '50%',
          backgroundColor: '#11110F',
          borderBottom: '1px solid rgba(241, 237, 229, 0.12)',
          transform: isExiting ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 1050ms cubic-bezier(0.76, 0, 0.24, 1)'
        }}
      />

      {/* Bottom Panel (Split curtain moves DOWN) */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50%',
          backgroundColor: '#11110F',
          borderTop: '1px solid rgba(241, 237, 229, 0.12)',
          transform: isExiting ? 'translateY(100%)' : 'translateY(0)',
          transition: 'transform 1050ms cubic-bezier(0.76, 0, 0.24, 1)'
        }}
      />

      {/* Preloader Content Overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(24px, 4vw, 54px)',
          opacity: isExiting ? 0 : 1,
          transform: isExiting ? 'scale(0.96)' : 'scale(1)',
          transition: 'opacity 400ms ease, transform 600ms ease',
          zIndex: 10
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#B49A73' }} />
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#F1EDE5', fontWeight: '600' }}>
              {portfolioIdentity.name}
            </span>
          </div>

          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#767067' }}>
            15 Interactive 3D Case Studies
          </span>
        </div>

        {/* Center Percentage Display */}
        <div style={{ textAlign: 'center', margin: 'auto 0' }}>
          <div 
            style={{
              fontFamily: 'var(--font-display-serif)',
              fontSize: 'clamp(84px, 16vw, 220px)',
              lineHeight: 0.88,
              color: '#F1EDE5',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.04em'
            }}
          >
            {String(progress).padStart(2, '0')}%
          </div>

          {/* Thin Scaled Progress Line */}
          <div 
            style={{
              width: 'clamp(240px, 40vw, 520px)',
              height: '1px',
              backgroundColor: 'rgba(241, 237, 229, 0.2)',
              margin: '32px auto 16px auto',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${progress}%`,
                backgroundColor: '#B49A73',
                transition: 'width 60ms linear'
              }}
            />
          </div>

          {/* Status Label */}
          <div 
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.24em',
              color: '#9E978E',
              minHeight: '18px'
            }}
          >
            {statusLabels[statusIndex]}
          </div>
        </div>

        {/* Bottom Metadata */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#767067' }}>
            WebGL · Three.js · PBR Shaders
          </span>
          <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#767067' }}>
            Paris · Worldwide
          </span>
        </div>
      </div>
    </div>
  );
};
