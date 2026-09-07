import React, { useState, useEffect, useRef } from 'react';
import {
  Flame,
  Utensils,
  Wine,
  Calendar,
  Clock,
  Users,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  ChevronRight,
  Check,
  X,
  Award,
  ShieldCheck,
  Compass,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const TASTING_COURSES = [
  {
    num: '01',
    name: 'Smoked Hokkaido Scallop',
    origin: 'Hokkaido, Japan',
    pairing: 'Domaine Leflaive Puligny-Montrachet 2020',
    description: 'Charred over white binchotan with brown butter dashi, sea buckthorn gel, and crispy kelp.',
    dietary: 'Pescatarian • Gluten-Free'
  },
  {
    num: '02',
    name: 'Charred Maitake & Bone Marrow',
    origin: 'Oregon Wild Foraged',
    pairing: 'Jean-Louis Chave Hermitage Blanc 2018',
    description: 'Slow-roasted wild forest maitake in embers, emulsified roasted beef bone marrow, smoked pine salt.',
    dietary: 'Rich Umami'
  },
  {
    num: '03',
    name: 'Fire-Roasted Bluefin Toro',
    origin: 'Tsukiji Direct Catch',
    pairing: 'Krug Grande Cuvée 170th Edition Brut',
    description: 'Flash-seared belly with shiso ash, aged ponzu pearls, and freshly grated Shizuoka wasabi.',
    dietary: 'Pescatarian'
  },
  {
    num: '04',
    name: 'A5 Miyazaki Wagyu Striploin',
    origin: 'Miyazaki Prefecture, Japan',
    pairing: 'Château Margaux Premier Grand Cru 2015',
    description: 'Wood-fired over Scottish birchwood embers, 45-day aged fermented black truffle jus, scorched leek puree.',
    dietary: 'Signature Entrée'
  },
  {
    num: '05',
    name: 'Smoked Dry-Aged Duck Breast',
    origin: 'Sonoma Valley Heritage',
    pairing: 'Domaine Dujac Clos de la Roche Grand Cru 2017',
    description: 'Hay-smoked with lingonberry reduction, caramelized shallot tart, and duck crackling crumble.',
    dietary: 'Poultry'
  },
  {
    num: '06',
    name: 'Grilled Pine Needle Sorbet',
    origin: 'Alpine Foraged Conifer',
    pairing: 'Yuzu & Alpine Herbal Elixir (Infused in-house)',
    description: 'Palate cleanser infused with charred stone pine needles, Meyer lemon zest, and elderflower mist.',
    dietary: 'Vegan • Refreshing'
  },
  {
    num: '07',
    name: 'Burnt Basque Dark Ganache',
    origin: 'Ecuadorian Single-Estate 85%',
    pairing: 'Taylor Fladgate 40-Year Old Tawny Port',
    description: 'Caramelized woodfire crust, molten dark chocolate core, ember-roasted Mission fig, smoked Maldon salt.',
    dietary: 'Dessert'
  }
];

const CELLAR_HIGHLIGHTS = [
  {
    vintage: '2015',
    name: 'Château Margaux Premier Grand Cru',
    region: 'Margaux, Bordeaux, France',
    notes: 'Blackcurrant, violet embers, cedar, velvety refined tannins',
    allocation: 'Allocation Limited to 12 Bottles / Month'
  },
  {
    vintage: '2018',
    name: 'Domaine de la Romanée-Conti Grands Échézeaux',
    region: 'Côte de Nuits, Burgundy, France',
    notes: 'Wild crushed cherry, dried rose petal, smoked underbrush, truffles',
    allocation: 'Sommelier Reserve Vault'
  },
  {
    vintage: '2012',
    name: 'Dom Pérignon P2 Plénitude Brut Vintage',
    region: 'Épernay, Champagne, France',
    notes: 'Brioche, toasted hazelnut, saline mineral finish, luminous effervescence',
    allocation: 'Signature Welcome Pairing'
  }
];

const HEARTH_PILLARS = [
  {
    icon: Flame,
    title: 'Binchotan & Birch Embers',
    text: 'We burn single-origin Kishu white binchotan coal reaching 1,000°C alongside Scottish birchwood for aromatic woodsmoke notes.'
  },
  {
    icon: ShieldCheck,
    title: '60-Day Dry Aging Sanctum',
    text: 'Heritage Wagyu and poultry are aged on Himalayan salt walls at 1°C and 85% humidity to cultivate unprecedented umami depth.'
  },
  {
    icon: Compass,
    title: 'Biodynamic Coastal Foraging',
    text: 'Sea herbs, alpine conifers, and seasonal sea kelp harvested within 48 hours of service by our direct artisan foragers.'
  }
];

export function App() {
  const [activeCourse, setActiveCourse] = useState(TASTING_COURSES[3]);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [partySize, setPartySize] = useState('2');
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const [resDate, setResDate] = useState('');
  const [resTime, setResTime] = useState('19:30');
  const [seatingArea, setSeatingArea] = useState("Chef's Counter");
  const [activeSection, setActiveSection] = useState('hero');
  const [toastMessage, setToastMessage] = useState('');
  const [formError, setFormError] = useState('');
  const dialog = useRef(null);
  useEffect(() => {
    if (!isReservationOpen) return;
    setFormError('');
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.current.showModal();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; trigger?.focus(); };
  }, [isReservationOpen]);

  // Scroll spy effect to highlight navigation tabs
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'menu', 'hearth', 'cellar', 'private', 'awards'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleBooking = (event) => {
    event.preventDefault();
    if (!resDate || resDate < today) return;
    try {
      localStorage.setItem('nocturne-reservation-demo', JSON.stringify({ partySize, seatingArea: Number(partySize) >= 6 ? 'Private Dining Sanctum' : Number(partySize) >= 4 ? 'Hearth Booth' : seatingArea, resDate, resTime }));
      showToast(`Saved on this device: ${partySize} guests on ${resDate} at ${resTime}. No reservation has been made.`);
      setIsReservationOpen(false);
    } catch {
      setFormError('Unable to save on this device. Please enable browser storage and try again.');
    }
  };

  return (
    <div className="nocturne-page">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="nocturne-toast" role="status">
          <Flame size={16} className="toast-flame-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. FROZEN / STICKY TOP NAVIGATION BAR */}
      <header className="nocturne-nav-header">
        <a href="#hero" className="nocturne-brand">
          <div className="flame-monogram">
            <Flame size={20} color="#e58e37" />
          </div>
          <div>
            <span className="brand-name-serif">NOCTURNE</span>
            <span className="brand-sub-tag">OPEN HEARTH • GASTRONOMY</span>
          </div>
        </a>

        <nav className="nocturne-nav-links">
          <a href="#hero" className={`nav-item-n ${activeSection === 'hero' ? 'active' : ''}`}>OVERVIEW</a>
          <a href="#menu" className={`nav-item-n ${activeSection === 'menu' ? 'active' : ''}`}>DEGUSTATION MENU</a>
          <a href="#hearth" className={`nav-item-n ${activeSection === 'hearth' ? 'active' : ''}`}>THE HEARTH</a>
          <a href="#cellar" className={`nav-item-n ${activeSection === 'cellar' ? 'active' : ''}`}>WINE CELLAR</a>
          <a href="#private" className={`nav-item-n ${activeSection === 'private' ? 'active' : ''}`}>CHEF'S COUNTER</a>
          <a href="#awards" className={`nav-item-n ${activeSection === 'awards' ? 'active' : ''}`}>ACCOLADES</a>
        </nav>

        <div className="nocturne-nav-actions">
          <button 
            onClick={() => setIsReservationOpen(true)} 
            className="btn-reserve-nav"
          >
            <span>RESERVE TABLE</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </header>

      {/* 2. HERO STAGE */}
      <section id="hero" className="nocturne-hero-stage">
        <div className="nocturne-hero-backdrop" />
        <div className="hero-gradient-overlay" />

        <div className="nocturne-hero-content">
          <div className="michelin-stars-pill">
            <span className="ember-dot" />
            <span>MICHELIN 3-STAR EXPERIENCE • THREE ROSETTES</span>
          </div>

          <h1 className="nocturne-hero-headline">
            Primeval Fire. <br />
            <span className="ember-gradient-text">Modernist Precision.</span>
          </h1>

          <p className="nocturne-hero-subtext">
            A 7-course seasonal tasting journey guided by woodfire alchemy, dry-aged heritage meats, and biodynamic coastal viticulture in the heart of Manhattan.
          </p>

          <div className="nocturne-hero-btn-row">
            <button 
              onClick={() => setIsReservationOpen(true)} 
              className="btn-ember-primary"
            >
              <span>Reserve Chef’s Counter</span>
              <ArrowUpRight size={16} />
            </button>

            <a href="#menu" className="btn-smoke-outline">
              <span>Explore The 7 Courses</span>
              <ChevronRight size={16} />
            </a>
          </div>

          {/* Featured Dish Callout Card */}
          <div className="featured-dish-glass-card">
            <div className="dish-eyebrow">
              <Sparkles size={14} color="#e58e37" />
              <span>CURRENT DISH HIGHLIGHT • COURSE 04</span>
            </div>
            <div className="dish-card-headline">A5 Miyazaki Wagyu Striploin</div>
            <div className="dish-card-pairing">
              Pairing: <span className="highlight-wine">Château Margaux Premier Grand Cru 2015</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 7-COURSE TASTING MENU INTERACTIVE EXPLORER */}
      <section id="menu" className="nocturne-section">
        <div className="section-header-centered">
          <div className="michelin-stars-pill">
            <Utensils size={12} color="#e58e37" />
            <span>SEASONAL AUTUMN HARVEST</span>
          </div>
          <h2 className="section-title-large">The 7-Course Degustation Journey</h2>
          <p className="section-subtitle-muted">
            Each dish is crafted live over Scottish birchwood and white binchotan coals at our 14-seat open-hearth counter.
          </p>
        </div>

        <div className="degustation-grid-wrapper">
          {/* Left Course Selector List */}
          <div className="courses-list-col">
            {TASTING_COURSES.map((course) => {
              const isSelected = activeCourse.num === course.num;
              return (
                <div 
                  key={course.num}
                  className={`course-nav-card ${isSelected ? 'selected-course' : ''}`}
                  onClick={() => {
                    setActiveCourse(course);
                    showToast(`Viewing Course ${course.num}: ${course.name}`);
                  }}
                >
                  <div className="course-card-left">
                    <span className="course-number">{course.num}</span>
                    <div>
                      <h4 className="course-title-text">{course.name}</h4>
                      <span className="course-origin-label">{course.origin}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} color={isSelected ? '#e58e37' : '#7d746d'} />
                </div>
              );
            })}
          </div>

          {/* Right Active Course Spotlight */}
          <div className="active-course-spotlight-card">
            <div className="spotlight-top-badge">
              <span className="badge-course-num">COURSE {activeCourse.num} OF 07</span>
              <span className="badge-dietary">{activeCourse.dietary}</span>
            </div>

            <h3 className="spotlight-dish-name">{activeCourse.name}</h3>
            <p className="spotlight-dish-desc">{activeCourse.description}</p>

            <div className="spotlight-origin-box">
              <MapPin size={14} color="#e58e37" />
              <span>Provenance: {activeCourse.origin}</span>
            </div>

            <div className="spotlight-pairing-box">
              <div className="pairing-header">
                <Wine size={16} color="#e58e37" />
                <span>SOMMELIER WINE PAIRING</span>
              </div>
              <p className="pairing-name">{activeCourse.pairing}</p>
            </div>

            <div className="spotlight-actions">
              <button 
                onClick={() => setIsReservationOpen(true)}
                className="btn-ember-primary full-width"
              >
                <span>Book This Tasting Experience • $285 / Guest</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HEARTH PHILOSOPHY PILLARS */}
      <section id="hearth" className="nocturne-section">
        <div className="section-header-centered">
          <div className="michelin-stars-pill">
            <Flame size={12} color="#e58e37" />
            <span>ALCHEMICAL METHOD</span>
          </div>
          <h2 className="section-title-large">The Open Hearth Philosophy</h2>
          <p className="section-subtitle-muted">
            Stripping gastronomy to its most elemental roots: living flames, pristine provenance, and obsessive artisanal rigor.
          </p>
        </div>

        <div className="hearth-philosophy-grid">
          {HEARTH_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="hearth-pillar-card">
                <div className="hearth-icon-circle">
                  <Icon size={22} color="#e58e37" />
                </div>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-text">{pillar.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. SOMMELIER WINE CELLAR ALLOCATION */}
      <section id="cellar" className="nocturne-section">
        <div className="section-header-centered">
          <div className="michelin-stars-pill">
            <Wine size={12} color="#e58e37" />
            <span>GRAND CRU VAULT</span>
          </div>
          <h2 className="section-title-large">Sommelier Cellar Allocations</h2>
          <p className="section-subtitle-muted">
            Over 2,400 rare vintages cellared at 12°C, emphasizing biodynamic French Grand Crus and artisanal grower Champagnes.
          </p>
        </div>

        <div className="cellar-grid">
          {CELLAR_HIGHLIGHTS.map((wine, idx) => (
            <div key={idx} className="cellar-card">
              <div className="cellar-vintage-badge">{wine.vintage}</div>
              <h3 className="cellar-wine-title">{wine.name}</h3>
              <p className="cellar-region">{wine.region}</p>
              <div className="cellar-divider" />
              <p className="cellar-notes"><strong>Notes:</strong> {wine.notes}</p>
              <span className="cellar-allocation-pill">{wine.allocation}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CHEF'S COUNTER & PRIVATE SANCTUM */}
      <section id="private" className="nocturne-section">
        <div className="private-dining-banner">
          <div className="private-dining-content">
            <span className="michelin-stars-pill">EXCLUSIVE SEATING</span>
            <h2 className="section-title-large">The 14-Seat Chef's Counter</h2>
            <p className="section-subtitle-muted" style={{ margin: '14px 0 24px' }}>
              Direct front-row vantage of the live woodfire hearth. Interact with Executive Chef & culinary masters during every course presentation.
            </p>
            <div className="counter-perks-row">
              <div className="counter-perk">
                <Check size={16} color="#e58e37" />
                <span>Live Hearth Demonstration</span>
              </div>
              <div className="counter-perk">
                <Check size={16} color="#e58e37" />
                <span>Sommelier Table Pairing</span>
              </div>
              <div className="counter-perk">
                <Check size={16} color="#e58e37" />
                <span>Custom Autumn Course Additions</span>
              </div>
            </div>
            <button 
              onClick={() => {
                setSeatingArea("Chef's Counter");
                setIsReservationOpen(true);
              }}
              className="btn-ember-primary"
              style={{ marginTop: 24 }}
            >
              <span>Reserve Counter Seatings</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 7. ACCOLADES & RECOGNITION */}
      <section id="awards" className="nocturne-section">
        <div className="awards-banner-card">
          <div className="awards-grid">
            <div className="award-item">
              <Award size={32} color="#e58e37" />
              <h4>3 Michelin Stars</h4>
              <p>Michelin Guide New York 2024–2026</p>
            </div>
            <div className="award-item">
              <Award size={32} color="#e58e37" />
              <h4>World's 50 Best</h4>
              <p>Ranked #14 Best Restaurant Global</p>
            </div>
            <div className="award-item">
              <Award size={32} color="#e58e37" />
              <h4>Grand Award</h4>
              <p>Wine Spectator Cellar Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. RESERVATION MODAL */}
      {isReservationOpen && (
        <dialog ref={dialog} className="nocturne-modal-overlay" aria-labelledby="reservation-title" onCancel={() => setIsReservationOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setIsReservationOpen(false); }}>
          <div className="nocturne-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <div>
                <span className="michelin-stars-pill" style={{ marginBottom: 6 }}>NOCTURNE HEARTH BOOKING</span>
                <h3 className="modal-headline" id="reservation-title">Plan Your Hearth Experience</h3>
              </div>
              <button className="modal-close-round" aria-label="Close reservation" onClick={() => setIsReservationOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form className="modal-body-form" onSubmit={handleBooking}>
              <p className="demo-note">Demo planner: save your preferences on this device. This does not reserve a table or send an email.</p>
              <p role="alert">{formError}</p>
              <div className="form-row-split">
                <div className="form-group-n">
                  <label htmlFor="party-size"><Users size={13} /> Party Size</label>
                  <select 
                    id="party-size" value={partySize}
                    onChange={(e) => setPartySize(e.target.value)}
                    className="nocturne-select"
                  >
                    <option value="1">1 Guest (Solo Counter)</option>
                    <option value="2">2 Guests (Chef's Counter)</option>
                    <option value="4">4 Guests (Hearth Booth)</option>
                    <option value="6">6 Guests (Private Dining Sanctum)</option>
                    <option value="8">8 Guests (Private Dining Sanctum)</option>
                  </select>
                </div>

                <div className="form-group-n">
                  <label htmlFor="seating-time"><Clock size={13} /> Seating Time</label>
                  <select 
                    id="seating-time" value={resTime}
                    onChange={(e) => setResTime(e.target.value)}
                    className="nocturne-select"
                  >
                    <option value="17:30">05:30 PM (First Sunset Seating)</option>
                    <option value="19:30">07:30 PM (Prime Hearth Seating)</option>
                    <option value="21:30">09:30 PM (Late Night Gastronomy)</option>
                  </select>
                </div>
              </div>

              <div className="form-group-n">
                <label htmlFor="reservation-date"><Calendar size={13} /> Reservation Date</label>
                <input 
                  id="reservation-date" type="date" min={today} required
                  value={resDate} 
                  onChange={(e) => setResDate(e.target.value)}
                  className="nocturne-input"
                />
              </div>

              <div className="reservation-pricing-summary">
                <div className="summary-line">
                  <span>7-Course Tasting Menu ({partySize}x Guests)</span>
                  <strong>${285 * Number(partySize)}.00</strong>
                </div>
                <div className="summary-line">
                  <span>Grand Cru Sommelier Wine Pairing (Optional)</span>
                  <span className="wine-add-text">+$165 / Guest</span>
                </div>
              </div>

              <button 
                type="submit"
                className="btn-ember-primary full-width" 
                style={{ padding: '16px', marginTop: 16 }}
              >
                <span>Save Demo Plan</span>
                <Check size={16} />
              </button>
            </form>
          </div>
        </dialog>
      )}

      {/* 9. LUXURY FOOTER */}
      <footer className="nocturne-footer">
        <div className="footer-cols-grid">
          <div>
            <div className="footer-brand-lockup">
              <Flame size={20} color="#e58e37" />
              <span className="brand-name-serif">NOCTURNE</span>
            </div>
            <p className="footer-brand-desc">
              Primeval woodfire gastronomy and modernist culinary alchemy crafted over living birchwood coals.
            </p>
          </div>

          <div className="footer-col-n">
            <h4>Location</h4>
            <p><MapPin size={13} className="inline-icon" /> 482 Hudson Street, West Village, New York, NY</p>
          </div>

          <div className="footer-col-n">
            <h4>Service Hours</h4>
            <p><Clock size={13} className="inline-icon" /> Wed – Sun • 5:30 PM to 11:30 PM</p>
          </div>

          <div className="footer-col-n">
            <h4>Inquiries & Concierge</h4>
            <p><Mail size={13} className="inline-icon" /> reservations@nocturne.restaurant</p>
          </div>
        </div>

        <div className="footer-bottom-line">
          <span>© 2026 NOCTURNE GASTRONOMY LLC. ALL RIGHTS RESERVED.</span>
          <span>MICHELIN 3-STAR SANCTUARY</span>
        </div>
      </footer>

    </div>
  );
}
