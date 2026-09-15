import React, { useEffect, useState } from 'react';
import { portfolioIdentity } from '../data/projectsData';
import { ArrowUp } from '@phosphor-icons/react';
import { sound } from '../audio/soundEngine';

export const Footer: React.FC = () => {
  const [parisTime, setParisTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setParisTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    sound.play('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="contact"
      style={{
        backgroundColor: '#11110F',
        color: '#F1EDE5',
        padding: 'clamp(80px, 12vw, 160px) 0 48px 0',
        borderTop: '1px solid rgba(241, 237, 229, 0.12)'
      }}
    >
      <div className="container-wide">
        
        {/* Upper Contact Statement */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '48px',
            marginBottom: '96px',
            borderBottom: '1px solid rgba(241, 237, 229, 0.12)',
            paddingBottom: '80px'
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#B49A73' }} />
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#B49A73', fontWeight: '600' }}>
                INITIATE A COMMISSION
              </span>
            </div>
            
            <h2
              style={{
                fontFamily: 'var(--font-display-serif)',
                fontSize: 'clamp(44px, 7vw, 92px)',
                lineHeight: 0.94,
                fontWeight: '400',
                letterSpacing: '-0.03em',
                marginBottom: '28px'
              }}
            >
              Let’s create something <br />
              <em style={{ fontStyle: 'italic', fontWeight: '300' }}>extraordinary.</em>
            </h2>

            <p style={{ fontSize: '17px', lineHeight: 1.65, color: '#9E978E', maxWidth: '500px' }}>
              Available for bespoke 3D brand experiences, interactive WebGL configurators, and creative direction worldwide.
            </p>
          </div>

          <div>
            <a
              href={`mailto:${portfolioIdentity.email}`}
              onClick={() => sound.play('click')}
              style={{
                fontFamily: 'var(--font-display-serif)',
                fontSize: 'clamp(24px, 3.5vw, 42px)',
                color: '#F1EDE5',
                textDecoration: 'underline',
                textUnderlineOffset: '8px',
                textDecorationColor: '#B49A73',
                display: 'block',
                marginBottom: '16px'
              }}
            >
              {portfolioIdentity.email}
            </a>
            <span style={{ fontSize: '13px', color: '#767067' }}>
              Typical response within 24 hours.
            </span>
          </div>
        </div>

        {/* Lower Metadata Row */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px'
          }}
        >
          {/* Studio Time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#767067' }}>
              Paris Studio (CET):
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#F1EDE5', fontVariantNumeric: 'tabular-nums' }}>
              {parisTime || '12:00:00'}
            </span>
          </div>

          {/* Social Channels */}
          <div style={{ display: 'flex', gap: '24px' }}>
            {portfolioIdentity.social.map(s => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: '#9E978E',
                  transition: 'color 200ms ease'
                }}
                onMouseEnter={() => sound.play('click')}
              >
                {s.name}
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: '#9E978E',
              cursor: 'pointer'
            }}
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>

        </div>

      </div>
    </footer>
  );
};
