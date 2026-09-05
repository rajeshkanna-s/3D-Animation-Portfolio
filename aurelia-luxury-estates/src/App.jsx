import React from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';

const DEVELOPMENTS = [
  { id: 'lumina-bay', name: 'Lumina Bay Residences', location: 'Dubai, UAE', price: 'AED 8.2M', image: '/developments.jpg' },
  { id: 'verde-heights', name: 'Verde Heights', location: 'Singapore', price: 'SGD 5.1M', image: '/developments.jpg' },
  { id: 'azure-point', name: 'Azure Point Estates', location: 'Phuket, Thailand', price: 'THB 68M', image: '/developments.jpg' },
  { id: 'altura-peak', name: 'Altura Peak Lodge', location: 'Aspen, USA', price: 'USD 12.5M', image: '/developments.jpg' }
];

export default function App() {
  return (
    <div className="aurelia-app">
      
      {/* 1. NAV */}
      <header className="aurelia-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="brand-diamond">
            <div className="diamond-inner" />
          </div>
          <span className="brand-title">AURELIA</span>
        </div>

        <nav className="nav-links">
          <a href="#properties" className="nav-link">PROPERTIES</a>
          <a href="#developments" className="nav-link">DEVELOPMENTS</a>
          <a href="#services" className="nav-link">SERVICES</a>
          <a href="#about" className="nav-link">ABOUT US</a>
          <a href="#contact" className="nav-link">CONTACT •</a>
        </nav>

        <button className="btn-contact-pill">
          <span>CONTACT •</span>
        </button>
      </header>

      {/* 2. HERO STAGE */}
      <div className="aurelia-hero-stage">
        
        <div className="aurelia-hero-left">
          <div className="hero-tag">
            <div style={{ width: 32, height: 1, background: '#d9b36a' }} />
            <span>WELCOME TO AURELIA</span>
          </div>

          <h1 className="hero-headline">
            EXTRAORDINARY <br />
            LIVING.
          </h1>

          <p className="hero-sub">
            Curated luxury properties in the world's most desirable locations.
          </p>

          <div className="hero-btns-row">
            <a href="#properties" className="btn-aurelia-solid">
              <span>EXPLORE PROPERTIES</span>
              <ArrowUpRight style={{ width: 16, height: 16 }} />
            </a>
            <a href="#developments" className="btn-aurelia-border">
              <span>VIEW DEVELOPMENTS</span>
            </a>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="bottom-metrics-bar">
          <div className="metric-col">
            <p>GLOBAL REACH</p>
            <h4>12+</h4>
            <span style={{ fontSize: '0.75rem', color: '#fff' }}>CITIES</span>
          </div>

          <div className="metric-col">
            <p>EXCLUSIVE LISTINGS</p>
            <h4>250+</h4>
            <span style={{ fontSize: '0.75rem', color: '#fff' }}>PREMIUM PROPERTIES</span>
          </div>

          <div className="metric-col">
            <p>TRUSTED BY</p>
            <h4>1,200+</h4>
            <span style={{ fontSize: '0.75rem', color: '#fff' }}>CLIENTS WORLDWIDE</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#d9b36a', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown style={{ width: 14, height: 14 }} />
          </div>
        </div>

      </div>

      {/* 3. DEVELOPMENTS SECTION */}
      <div id="developments" style={{ marginTop: 80 }}>
        <div className="hero-tag">
          <div style={{ width: 24, height: 1, background: '#d9b36a' }} />
          <span>OUR CURATED SELECTION</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', color: '#d9b36a', marginBottom: 8 }}>
          FEATURED DEVELOPMENTS
        </h2>
        <p style={{ color: '#cad8d4', fontSize: '0.95rem' }}>Exquisite spaces. Iconic locations. Timeless value.</p>

        <div className="dev-grid-aurelia">
          {DEVELOPMENTS.map((d) => (
            <div key={d.id} className="dev-card-aurelia">
              <div>
                <img src={d.image} alt={d.name} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#fff', marginBottom: 4 }}>{d.name}</h3>
                <div style={{ fontSize: '0.78rem', color: '#d9b36a', marginBottom: 12 }}>{d.location}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(217,179,106,0.2)', paddingTop: 12 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#f5e4bc', fontWeight: 700 }}>{d.price}</span>
                <button className="btn-aurelia-solid" style={{ padding: '8px 14px', fontSize: '0.7rem' }}>Inspect</button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
