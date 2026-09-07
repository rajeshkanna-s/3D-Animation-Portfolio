import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDown, 
  Sparkles, 
  X, 
  Check, 
  Building2, 
  ShieldCheck, 
  Key, 
  Compass, 
  Phone, 
  Mail, 
  MapPin, 
  Crown,
  ChevronRight,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';

const PROPERTIES = [
  {
    id: 'sky-penthouse',
    name: 'The Horizon Sky Penthouse',
    location: 'Downtown Manhattan · New York',
    price: '$28,500,000',
    beds: '5 Beds · 6.5 Baths',
    area: '8,400 sq.ft',
    image: '/hero-sky-villa.jpg',
    tag: 'Private Elevator & Sky Deck'
  },
  {
    id: 'lumina-bay',
    name: 'Lumina Bay Water Villa',
    location: 'Palm Jumeirah · Dubai, UAE',
    price: 'AED 42,000,000',
    beds: '6 Beds · 8 Baths',
    area: '11,200 sq.ft',
    image: '/developments.jpg',
    tag: 'Private Marina Berth'
  },
  {
    id: 'verde-heights',
    name: 'Verde Sanctuary Estate',
    location: 'Nassau Hill · Singapore',
    price: 'SGD 18,800,000',
    beds: '4 Beds · 5 Baths',
    area: '6,800 sq.ft',
    image: '/public/aurelia-slide4.jpg',
    tag: 'Biophilic Infinity Pool'
  },
  {
    id: 'altura-peak',
    name: 'Altura Alpine Manor',
    location: 'Red Mountain · Aspen, USA',
    price: '$19,200,000',
    beds: '6 Beds · 7 Baths',
    area: '9,100 sq.ft',
    image: '/public/aurelia-slide5.jpg',
    tag: 'Heated Helipad & Wine Cellar'
  }
];

const SERVICES = [
  {
    icon: Crown,
    title: 'Private Client Advisory',
    desc: 'Bespoke off-market acquisition strategies for sovereign individuals and private family offices.'
  },
  {
    icon: Key,
    title: 'Architectural Curation',
    desc: 'Direct collaborations with Pritzker Prize laureates for bespoke structural and interior refinement.'
  },
  {
    icon: ShieldCheck,
    title: 'Confidential Escrow',
    desc: 'Multi-jurisdictional title management with zero-disclosure privacy protection protocols.'
  }
];

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [inquiryData, setInquiryData] = useState({ name: '', email: '', phone: '', property: '' });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    showToast('Consultation request registered. An executive advisor will reach out within 2 hours.');
    setIsContactModalOpen(false);
    setSelectedProperty(null);
  };

  return (
    <div className="aurelia-app">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="aurelia-toast">
          <Sparkles style={{ width: 16, height: 16, color: '#d9b36a' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. SLIM FROZEN STICKY NAV */}
      <header className="aurelia-nav">
        <a href="#hero" className="aurelia-brand-link">
          <div className="brand-diamond">
            <div className="diamond-inner" />
          </div>
          <span className="brand-title">AURELIA</span>
        </a>

        <nav className="nav-links">
          <a href="#properties" className="nav-link">PROPERTIES</a>
          <a href="#developments" className="nav-link">DEVELOPMENTS</a>
          <a href="#services" className="nav-link">SERVICES</a>
          <a href="#about" className="nav-link">ABOUT</a>
        </nav>

        <button 
          className="btn-contact-pill"
          onClick={() => {
            setInquiryData({ ...inquiryData, property: 'General VIP Inquiry' });
            setIsContactModalOpen(true);
          }}
        >
          <span className="gold-status-dot" />
          <span>VIP ADVISORY</span>
        </button>
      </header>

      {/* 2. HERO STAGE */}
      <section className="aurelia-hero-stage" id="hero">
        <div className="aurelia-hero-left">
          <div className="hero-tag">
            <div className="gold-line" />
            <span>EXCLUSIVE ARCHITECTURAL PORTFOLIO</span>
          </div>

          <h1 className="hero-headline">
            EXTRAORDINARY <br />
            <span className="gold-shimmer-text">LIVING.</span>
          </h1>

          <p className="hero-sub">
            Curating rare, iconic trophy residences and cantilevered architectural penthouses across the globe.
          </p>

          <div className="hero-btns-row">
            <a href="#properties" className="btn-aurelia-solid">
              <span>EXPLORE RESIDENCES</span>
              <ArrowUpRight style={{ width: 16, height: 16 }} />
            </a>
            <a href="#developments" className="btn-aurelia-border">
              <span>VIEW MASTERPLANS</span>
            </a>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="bottom-metrics-bar">
          <div className="metric-col">
            <p>GLOBAL CAPITALS</p>
            <h4>14+</h4>
            <span>PRIME METROPOLISES</span>
          </div>

          <div className="metric-col">
            <p>PORTFOLIO VOLUME</p>
            <h4>$2.4B+</h4>
            <span>EXCLUSIVE ASSETS</span>
          </div>

          <div className="metric-col">
            <p>CLIENT RESIDENCY</p>
            <h4>100%</h4>
            <span>DISCREET & VERIFIED</span>
          </div>

          <a href="#properties" className="metric-scroll-link">
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown style={{ width: 14, height: 14 }} />
          </a>
        </div>
      </section>

      {/* 3. PROPERTIES SECTION */}
      <section className="aurelia-section-block" id="properties">
        <div className="section-head-wrap">
          <div className="hero-tag">
            <div className="gold-line" />
            <span>GLOBAL RESIDENTIAL COLLECTION</span>
          </div>
          <h2 className="section-title-gold">Current Trophy Residences</h2>
          <p className="section-subtitle-muted">Each property represents a pinnacle of structural engineering and private serenity.</p>
        </div>

        <div className="properties-grid-aurelia">
          {PROPERTIES.map((prop) => (
            <div 
              key={prop.id} 
              className="property-card-aurelia"
              onClick={() => {
                setSelectedProperty(prop);
                setInquiryData({ ...inquiryData, property: prop.name });
              }}
            >
              <div className="prop-img-wrap">
                <img src={prop.image || '/hero-sky-villa.jpg'} alt={prop.name} />
                <span className="prop-badge-tag">{prop.tag}</span>
              </div>
              <div className="prop-body">
                <div className="prop-location">{prop.location}</div>
                <h3 className="prop-name">{prop.name}</h3>
                <div className="prop-specs-row">
                  <span>{prop.beds}</span>
                  <span>•</span>
                  <span>{prop.area}</span>
                </div>
                <div className="prop-footer-row">
                  <div className="prop-price">{prop.price}</div>
                  <button className="btn-prop-inspect">
                    <span>Inspect</span>
                    <ArrowUpRight style={{ width: 14, height: 14 }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PRIVATE SERVICES */}
      <section className="aurelia-section-block" id="services">
        <div className="section-head-wrap">
          <div className="hero-tag">
            <div className="gold-line" />
            <span>CONCIERGE & ADVISORY</span>
          </div>
          <h2 className="section-title-gold">Bespoke Advisory Services</h2>
          <p className="section-subtitle-muted">Tailored representation for sovereign acquisitions and family office estates.</p>
        </div>

        <div className="services-grid-aurelia">
          {SERVICES.map((srv, idx) => {
            const IconComp = srv.icon;
            return (
              <div key={idx} className="service-card-aurelia">
                <div className="service-icon-box">
                  <IconComp style={{ width: 22, height: 22, color: '#d9b36a' }} />
                </div>
                <h3 className="service-title">{srv.title}</h3>
                <p className="service-desc">{srv.desc}</p>
                <button 
                  className="service-link-btn"
                  onClick={() => {
                    setInquiryData({ ...inquiryData, property: `Service: ${srv.title}` });
                    setIsContactModalOpen(true);
                  }}
                >
                  <span>Request Private Briefing</span>
                  <ChevronRight style={{ width: 14, height: 14 }} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. ABOUT SECTION */}
      <section className="aurelia-section-block" id="about">
        <div className="about-split-banner">
          <div className="about-text-side">
            <div className="hero-tag">
              <div className="gold-line" />
              <span>HERITAGE & VISION</span>
            </div>
            <h2 className="about-heading">Where Architectural Vision Meets Financial Artistry</h2>
            <p className="about-p">
              Founded on the belief that a truly exceptional residence is both an emotional sanctuary and an enduring multi-generational asset, Aurelia bridges the world's most visionary architects with discerning collectors.
            </p>
            <div className="about-pillars-row">
              <div>
                <h4>$4.8B+</h4>
                <p>Lifetime Transaction Value</p>
              </div>
              <div>
                <h4>99.4%</h4>
                <p>Discretion Assurance</p>
              </div>
              <div>
                <h4>100%</h4>
                <p>Verified Titles</p>
              </div>
            </div>
          </div>
          <div className="about-img-side">
            <img src="/public/collection.jpg" alt="Aurelia Private Collection" />
          </div>
        </div>
      </section>

      {/* 6. SLIM FOOTER */}
      <footer className="aurelia-footer">
        <div className="footer-top-row">
          <div className="footer-brand-wrap">
            <div className="brand-diamond" style={{ width: 28, height: 28 }}>
              <div className="diamond-inner" style={{ width: 10, height: 10 }} />
            </div>
            <span className="brand-title" style={{ fontSize: '1.1rem' }}>AURELIA</span>
          </div>

          <div className="footer-offices-row">
            <span>GENEVA</span>
            <span>•</span>
            <span>LONDON</span>
            <span>•</span>
            <span>NEW YORK</span>
            <span>•</span>
            <span>DUBAI</span>
            <span>•</span>
            <span>SINGAPORE</span>
          </div>

          <button 
            className="btn-aurelia-solid" 
            style={{ padding: '8px 18px', fontSize: '0.72rem' }}
            onClick={() => {
              setInquiryData({ ...inquiryData, property: 'General VIP Concierge' });
              setIsContactModalOpen(true);
            }}
          >
            <span>VIP Concierge ↗</span>
          </button>
        </div>

        <div className="footer-bottom-copy">
          © 2026 AURELIA LUXURY ESTATES S.A. ALL RIGHTS RESERVED. CONFIDENTIAL PRIVATE BROKERAGE.
        </div>
      </footer>

      {/* CONSULTATION MODAL */}
      {(isContactModalOpen || selectedProperty) && (
        <div className="aurelia-modal-overlay" onClick={() => { setIsContactModalOpen(false); setSelectedProperty(null); }}>
          <div className="aurelia-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top-bar">
              <div className="modal-tag-gold">CONFIDENTIAL INQUIRY</div>
              <button className="modal-close-btn" onClick={() => { setIsContactModalOpen(false); setSelectedProperty(null); }}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <h2 className="modal-title-serif">Private Property Briefing</h2>
            <p className="modal-sub-muted">
              {selectedProperty ? `Regarding ${selectedProperty.name} (${selectedProperty.price})` : 'Connect with our Senior Managing Director for discreet portfolio review.'}
            </p>

            <form onSubmit={handleInquirySubmit} className="aurelia-modal-form">
              <div className="form-group">
                <label>Principal Name</label>
                <input 
                  type="text" 
                  placeholder="Lord / Lady / Dr. / Mr. / Ms."
                  value={inquiryData.name}
                  onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Confidential Email</label>
                <input 
                  type="email" 
                  placeholder="principal@familyoffice.com"
                  value={inquiryData.email}
                  onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Direct Private Phone</label>
                <input 
                  type="tel" 
                  placeholder="+1 (555) 019-2834"
                  value={inquiryData.phone}
                  onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn-aurelia-solid" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
                <span>Submit Confidential Briefing Request</span>
                <ArrowUpRight style={{ width: 16, height: 16 }} />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
