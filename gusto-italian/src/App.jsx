import React, { useState, useEffect } from 'react';

const MENU_ITEMS = [
  {
    id: 'tagliatelle-tartufo',
    category: 'Primi Piatti',
    name: 'Tagliatelle al Tartufo',
    region: 'Umbria & Emilia-Romagna',
    price: 34.00,
    desc: 'Hand-cut 40-yolk egg pasta, winter black Norcia truffle, alpine churned butter, 36-month aged Parmigiano-Reggiano.',
    pairing: 'Barolo DOCG 2018'
  },
  {
    id: 'burrata-pugliese',
    category: 'Antipasti',
    name: 'Burrata di Andria',
    region: 'Puglia',
    price: 24.00,
    desc: 'Creamy artisanal burrata, heirloom datterini tomatoes, cold-pressed Ligurian olive oil, crystallized sweet basil.',
    pairing: 'Franciacorta Brut Cuvée'
  },
  {
    id: 'fiorentina-chianina',
    category: 'Secondi',
    name: 'Bistecca alla Fiorentina',
    region: 'Toscana',
    price: 68.00,
    desc: '45-day dry-aged Chianina steak seared over Tuscan oak charcoal, rosemary smoked sea salt, roasted garlic marrow.',
    pairing: 'Brunello di Montalcino Riserva'
  },
  {
    id: 'branzino-isolana',
    category: 'Secondi',
    name: 'Branzino all’Isolana',
    region: 'Costiera Amalfitana',
    price: 42.00,
    desc: 'Wild-caught Mediterranean sea bass, Pantelleria caper berries, crushed fingerling potatoes, Amalfi lemon emulsion.',
    pairing: 'Greco di Tufo DOCG'
  },
  {
    id: 'tiramisu-tradizionale',
    category: 'Dolci',
    name: 'Tiramisù al Mascarpone',
    region: 'Veneto',
    price: 16.00,
    desc: 'Savoiardi soaked in single-origin Illy espresso and aged Marsala, velvety mascarpone cream, dark Valrhona cacao.',
    pairing: 'Vin Santo del Chianti'
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [partySize, setPartySize] = useState('2 Guests');
  const [reserveDate, setReserveDate] = useState('Today, 7:30 PM');
  const [diningRoom, setDiningRoom] = useState('Main Osteria');
  const [cart, setCart] = useState([]);
  const [toastMsg, setToastMsg] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // SCROLL SPY OBSERVER
  useEffect(() => {
    const sections = ['hero', 'menu', 'about', 'chef', 'reservation'].map(id => document.getElementById(id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -50% 0px', threshold: 0.1 }
    );

    sections.forEach(s => s && observer.observe(s));
    return () => sections.forEach(s => s && observer.unobserve(s));
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
    showToast(`Added ${item.name} to order.`);
  };

  const filteredMenu = selectedCategory === 'All'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <div className="gusto-app">
      {toastMsg && <div className="gusto-toast">{toastMsg}</div>}

      {/* TOP NOTIFICATION / BADGE */}
      <div className="trending-pill-bar">
        <span className="trending-pill">✦ TRENDING WEBSITE IDEA</span>
        <h2 className="trending-subtitle">SCROLL-DRIVEN RESTAURANT HOMEPAGE</h2>
        <p className="trending-caption">A MODERN • IMMERSIVE • DELICIOUS EXPERIENCE</p>
      </div>

      {/* MAIN HERO CARD CONTAINER */}
      <main className="hero-card-frame">
        {/* STICKY NAVBAR WITH SCROLL-SPY ACTIVE HIGHLIGHT */}
        <header className="gusto-navbar">
          <div className="brand-lockup" onClick={() => scrollTo('hero')}>
            <span className="brand-gusto">GUSTO</span>
            <span className="brand-sub">ITALIAN RESTAURANT</span>
          </div>

          <nav className="nav-links">
            <button 
              className={`nav-link-btn ${activeSection === 'hero' ? 'active' : ''}`}
              onClick={() => scrollTo('hero')}
            >
              HOME
            </button>
            <button 
              className={`nav-link-btn ${activeSection === 'menu' ? 'active' : ''}`}
              onClick={() => scrollTo('menu')}
            >
              MENU
            </button>
            <button 
              className={`nav-link-btn ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => scrollTo('about')}
            >
              ABOUT
            </button>
            <button 
              className={`nav-link-btn ${activeSection === 'chef' ? 'active' : ''}`}
              onClick={() => scrollTo('chef')}
            >
              CHEF
            </button>
            <button 
              className={`nav-link-btn ${activeSection === 'reservation' ? 'active' : ''}`}
              onClick={() => scrollTo('reservation')}
            >
              RESERVATION
            </button>
          </nav>

          <div className="nav-actions">
            <button className="btn-book-table" onClick={() => setIsReserveModalOpen(true)}>
              BOOK A TABLE
            </button>
            <div className="cart-badge-icon" title="View Order" onClick={() => showToast(`Your order has ${cart.length} items.`)}>
              <span>⋮⋮⋮</span>
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </div>
          </div>
        </header>

        {/* 1. HERO SECTION */}
        <section id="hero" className="hero-stage">
          {/* BACKGROUND 3D ART WITH MOUSE PARALLAX */}
          <div 
            className="hero-3d-backdrop" 
            style={{
              transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0) scale(1.03)`
            }}
          >
            <img 
              src="./hero-pasta.jpg" 
              alt="Artisan Handmade Tagliatelle" 
              className="pasta-hero-img"
            />
          </div>

          {/* FLOATING INTERACTIVE BASIL & PARMESAN PARTICLES */}
          <div 
            className="floating-leaf leaf-1" 
            style={{ transform: `translate3d(${mousePos.x * -1.2}px, ${mousePos.y * -1.2}px, 0)` }}
          />
          <div 
            className="floating-leaf leaf-2" 
            style={{ transform: `translate3d(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px, 0)` }}
          />
          <div 
            className="floating-leaf leaf-3" 
            style={{ transform: `translate3d(${mousePos.x * -0.8}px, ${mousePos.y * 0.9}px, 0)` }}
          />

          {/* HERO TYPOGRAPHY OVERLAY */}
          <div className="hero-text-overlay">
            <div className="tagline-eyebrow">BUON APPETITO —</div>
            <h1 className="hero-title">
              SAVOR<br />
              THE ART OF<br />
              <span className="italic-italy">ITALY</span>
            </h1>
            <p className="hero-description">
              Italian cuisine, crafted with the finest ingredients and timeless passion.
            </p>

            <div className="hero-cta-row">
              <button onClick={() => scrollTo('menu')} className="btn-explore-menu">
                <span>EXPLORE OUR MENU</span>
                <span className="arrow-sym">→</span>
              </button>
            </div>

            <div className="social-icons-row">
              <span className="social-circle">◎</span>
              <span className="social-circle">f</span>
              <span className="social-circle">⊛</span>
            </div>
          </div>

          {/* RIGHT BADGE & STEPPER */}
          <div className="right-stamp-column">
            <div className="fresh-stamp">
              <div className="stamp-circle-text">FRESH INGREDIENTS • ITALIAN SOUL</div>
              <span className="stamp-letter">G</span>
            </div>

            <div className="step-stepper">
              <span className="step-active">01</span>
              <div className="step-line" />
              <span className="step-total">05</span>
            </div>

            <div className="scroll-discover-tag" onClick={() => scrollTo('menu')} style={{ cursor: 'pointer' }}>
              <span>SCROLL TO DISCOVER</span>
              <span className="scroll-arrow">↓</span>
            </div>
          </div>
        </section>

        {/* FEATURE PILLARS FOOTER */}
        <div className="features-ribbon">
          <div className="feature-pill-item">
            <div className="pill-icon-circle">📌</div>
            <div className="pill-content">
              <h4>PINNED HERO</h4>
              <p>Hero section stays pinned while you scroll</p>
            </div>
          </div>

          <div className="feature-pill-item">
            <div className="pill-icon-circle">↖</div>
            <div className="pill-content">
              <h4>MOUSE PARALLAX</h4>
              <p>Subtle movement that follows your cursor</p>
            </div>
          </div>

          <div className="feature-pill-item">
            <div className="pill-icon-circle">〰</div>
            <div className="pill-content">
              <h4>SCROLL ANIMATION</h4>
              <p>Engaging reveals as you explore</p>
            </div>
          </div>
        </div>

        {/* 2. MENU SECTION */}
        <section id="menu" className="menu-explorer-section">
          <div className="menu-header">
            <span className="menu-eyebrow">ANTIPASTI • PRIMI • SECONDI • DOLCI</span>
            <h2 className="menu-headline">The Culinary Canvas</h2>
            
            <div className="menu-category-tabs">
              {['All', 'Antipasti', 'Primi Piatti', 'Secondi', 'Dolci'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="menu-grid">
            {filteredMenu.map((dish) => (
              <div key={dish.id} className="dish-card">
                <div className="dish-top-row">
                  <span className="dish-region">{dish.region}</span>
                  <span className="dish-price">${dish.price.toFixed(2)}</span>
                </div>
                <h3 className="dish-name">{dish.name}</h3>
                <p className="dish-desc">{dish.desc}</p>
                
                <div className="dish-footer">
                  <div className="dish-pairing">
                    <span className="pairing-label">Sommelier Pairing:</span>
                    <span className="pairing-val">{dish.pairing}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(dish)}
                    className="btn-order-dish"
                    title={`Order ${dish.name}`}
                  >
                    Order Dish +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. ABOUT SECTION */}
        <section id="about" className="gusto-about-section">
          <div className="about-grid-wrap">
            <div className="about-text-col">
              <span className="section-eyebrow-g">OUR HERITAGE //////</span>
              <h2 className="about-headline">Rooted in Italian Soul, Elevated for Today.</h2>
              <p className="about-p">
                At Gusto, every ribbon of tagliatelle is rolled by hand each morning using organic stone-milled semolina from Puglia and golden egg yolks from heritage pasture hens. We believe extraordinary dining lives at the crossroads of ancestral technique and contemporary artistry.
              </p>
              <div className="about-stats-row">
                <div className="stat-box-g">
                  <strong>40-Yolk</strong>
                  <span>Traditional Egg Pasta</span>
                </div>
                <div className="stat-box-g">
                  <strong>36-Month</strong>
                  <span>Aged Parmigiano-Reggiano</span>
                </div>
                <div className="stat-box-g">
                  <strong>100%</strong>
                  <span>Extra Virgin Olive Oil</span>
                </div>
              </div>
            </div>

            <div className="about-image-card">
              <img src="./hero-pasta.jpg" alt="Handmade Pasta Craft" className="about-thumb-img" />
              <div className="chef-quote-badge">
                <p>“Simplicity is the highest form of sophistication.”</p>
                <span>— Chef Marco Bellini</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CHEF & WINE PAIRINGS SECTION */}
        <section id="chef" className="gusto-chef-section">
          <div className="chef-header-wrap">
            <span className="section-eyebrow-g">CHEF'S DEGUSTATION //////</span>
            <h2 className="chef-title">Seasonal Truffle & Wine Flights</h2>
            <p className="chef-sub">Curated by Master Sommelier Elena Rossi and Executive Chef Marco Bellini.</p>
          </div>

          <div className="wine-flights-grid">
            <div className="flight-card">
              <span className="flight-badge">PIEMONTE REGION</span>
              <h3>Barolo & White Truffle Flight</h3>
              <p>Nebbiolo grapes harvested on the Langhe hills, aged 38 months in Slavonian oak. Paired with Alba white truffle tajarin.</p>
              <span className="flight-price">$95 / Guest</span>
            </div>
            <div className="flight-card">
              <span className="flight-badge">TUSCAN HILLS</span>
              <h3>Brunello di Montalcino Flight</h3>
              <p>100% Sangiovese Grosso with aromas of wild cherry, tobacco, and crushed herbs. Paired with dry-aged Chianina steak.</p>
              <span className="flight-price">$110 / Guest</span>
            </div>
            <div className="flight-card">
              <span className="flight-badge">CAMPANIA & SICILY</span>
              <h3>Volcanic Terroir Flight</h3>
              <p>Mineral-rich Greco di Tufo and Etna Bianco with razor-sharp salinity. Paired with wild Mediterranean sea bass.</p>
              <span className="flight-price">$85 / Guest</span>
            </div>
          </div>
        </section>

        {/* 5. RESERVATION SECTION */}
        <section id="reservation" className="gusto-reservation-section">
          <div className="reservation-cta-card">
            <span className="res-eyebrow">YOUR TABLE AWAITS //////</span>
            <h2 className="res-title">Reserve an Unforgettable Italian Evening</h2>
            <p className="res-lead">Seating is limited. We recommend reserving at least 48 hours in advance for our Chef's Truffle Counter.</p>
            <button onClick={() => setIsReserveModalOpen(true)} className="btn-res-large">
              <span>Launch Booking Engine</span>
              <span className="arrow-sym">→</span>
            </button>
          </div>
        </section>

        {/* SITE FOOTER */}
        <footer className="gusto-site-footer">
          <p>© 2026 GUSTO ITALIAN RESTAURANT • MILANO • NEW YORK • LONDON</p>
        </footer>
      </main>

      {/* RESERVATION MODAL */}
      {isReserveModalOpen && (
        <div className="gusto-modal-overlay" onClick={() => setIsReserveModalOpen(false)}>
          <div className="gusto-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <h3>Table Reservation</h3>
              <button className="btn-close-modal" onClick={() => setIsReserveModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body-form">
              <div className="form-row">
                <label>Guests</label>
                <select value={partySize} onChange={(e) => setPartySize(e.target.value)} className="gusto-select">
                  <option>1 Guest (Counter)</option>
                  <option>2 Guests</option>
                  <option>4 Guests</option>
                  <option>6+ Guests (Private Room)</option>
                </select>
              </div>

              <div className="form-row">
                <label>Date & Time</label>
                <input 
                  type="text" 
                  value={reserveDate} 
                  onChange={(e) => setReserveDate(e.target.value)}
                  className="gusto-input" 
                />
              </div>

              <div className="form-row">
                <label>Atmosphere</label>
                <select value={diningRoom} onChange={(e) => setDiningRoom(e.target.value)} className="gusto-select">
                  <option>Main Osteria</option>
                  <option>Garden Pergola</option>
                  <option>Chef's Truffle Counter</option>
                </select>
              </div>

              <button 
                onClick={() => {
                  showToast(`Table confirmed for ${partySize} in ${diningRoom}!`);
                  setIsReserveModalOpen(false);
                }}
                className="btn-submit-reserve"
              >
                Confirm Table Reservation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
