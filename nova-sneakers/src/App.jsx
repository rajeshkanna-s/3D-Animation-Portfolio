import React, { useState, useEffect, useRef } from 'react';
import {
  Lightning,
  Sparkle,
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Sliders,
  Check,
  X,
  User,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Timer,
  DeviceMobile,
  CreditCard,
  Heart,
  Star,
  Play,
  MagnifyingGlass
} from '@phosphor-icons/react';

const PRODUCTS = [
  {
    id: 'nova-01',
    name: 'NØVA-01',
    subtitle: 'PREMIUM PERFORMANCE SNEAKER',
    price: 220.00,
    color: 'Obsidian Black / Electric Blue',
    image: '/hero-sneaker.jpg',
    features: ['Engineered Mesh Upper', 'Reactive Sole Unit', 'NØVA Lace System', 'Lightweight Support Cage'],
    tag: 'LIMITED DROP'
  },
  {
    id: 'nova-02',
    name: 'NØVA-02',
    subtitle: 'TITANIUM AERO RUNNER',
    price: 210.00,
    color: 'Titanium Silver / Ice Cyan',
    image: '/hero-sneaker.jpg',
    features: ['Ultra-light Monocoque', 'Hydrophobic Mesh', 'Carbon Propulsion Plate', 'Zero-G Foam'],
    tag: 'NEW RELEASE'
  },
  {
    id: 'nova-03',
    name: 'NØVA-03',
    subtitle: 'STEALTH CARBON HYBRID',
    price: 230.00,
    color: 'Stealth Carbon / Amber Flare',
    image: '/hero-sneaker.jpg',
    features: ['High-Abrasion Outsole', 'Kevlar Reinforced Weave', 'Adaptive Midsole', 'Reflective Accents'],
    tag: 'PRO EDITION'
  }
];

const COLORWAYS = [
  { id: 'cyan', name: 'CYAN PULSE', hex: '#00F0FF', glow: 'rgba(0, 240, 255, 0.4)' },
  { id: 'stealth', name: 'STEALTH NOIR', hex: '#E2E8F0', glow: 'rgba(255, 255, 255, 0.3)' },
  { id: 'solar', name: 'SOLAR FLARE', hex: '#FF7A00', glow: 'rgba(255, 122, 0, 0.4)' }
];

const TECH_LAYERS = [
  {
    step: '01',
    title: 'MESH UPPER',
    desc: 'Engineered breathability. Lightweight performance mesh keeps you cool, focused, and moving with dynamic airflow.',
    stats: '40% Lighter • 300% Breathability'
  },
  {
    step: '02',
    title: 'SUPPORT CAGE',
    desc: 'Structural integrity. TPU cage system locks your foot in place for stability and precision torsional control.',
    stats: 'High-Tensile TPU • Zero Heel Slip'
  },
  {
    step: '03',
    title: 'SOLE UNIT',
    desc: 'Reactive comfort. Dual-density nitrogen foam with smart energy return. Built for impact, engineered for propulsion.',
    stats: '88% Kinetic Rebound • Smart LED Sync'
  },
  {
    step: '04',
    title: 'OUTSOLE',
    desc: 'Ground control. High-grip rubber outsole delivers traction where it matters most on all urban and trail terrains.',
    stats: 'Multi-Directional Lug Matrix • Wet-Grip Compound'
  }
];

const REVIEWS = [
  {
    name: 'Jordan T.',
    role: 'Marathon Runner & Designer',
    quote: 'Hands down the most comfortable sneaker I’ve ever worn. The energy return on road runs is unreal.',
    rating: 5
  },
  {
    name: 'Alex M.',
    role: 'Techwear Enthusiast',
    quote: 'The design, the fit, the performance—next level. The LED reactive sole turns heads everywhere.',
    rating: 5
  },
  {
    name: 'Chris D.',
    role: 'Cross-Training Athlete',
    quote: 'NØVA-01 is built different. You can feel the stability from the first sprint.',
    rating: 5
  }
];

const NAV_SECTIONS = [
  { id: 'section-01', num: 1, label: '01 // HOME' },
  { id: 'section-02', num: 2, label: '02 // COLLECTION' },
  { id: 'section-03', num: 3, label: '03 // TECHNOLOGY' },
  { id: 'section-04', num: 4, label: '04 // MOBILE APP' },
  { id: 'section-05', num: 5, label: '05 // LAUNCH' }
];

export default function App() {
  const [activeSection, setActiveSection] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [selectedColor, setSelectedColor] = useState(COLORWAYS[0]);
  const [selectedSize, setSelectedSize] = useState('10');
  const [activeTechLayer, setActiveTechLayer] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cart, setCart] = useState([
    { id: 'c1', name: 'NØVA-01 (Obsidian / Cyan)', size: '10', price: 220.00, qty: 1 },
    { id: 'c2', name: 'NØVA Tech Tee (Graphite)', size: 'M', price: 68.00, qty: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  
  // COUNTDOWN TIMER
  const [timeLeft, setTimeLeft] = useState({ days: 6, hrs: 22, mins: 47, secs: 9 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hrs > 0) return { ...prev, hrs: prev.hrs - 1, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // MOUSE PARALLAX
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // SCROLL SPY INTERSECTION OBSERVER FOR AUTO MENU CHANGING
  useEffect(() => {
    const sectionElements = NAV_SECTIONS.map((sec) => document.getElementById(sec.id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const found = NAV_SECTIONS.find((sec) => sec.id === entry.target.id);
            if (found) {
              setActiveSection(found.num);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1
      }
    );

    sectionElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      sectionElements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const scrollToSection = (secId) => {
    const el = document.getElementById(secId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const addToCart = (product, size) => {
    const item = {
      id: Date.now().toString(),
      name: `${product.name} (${selectedColor.name})`,
      size: size || selectedSize,
      price: product.price,
      qty: 1
    };
    setCart((prev) => [...prev, item]);
    showToast(`Added ${item.name} [Size ${item.size}] to cart.`);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="nova-app-root">
      {toastMsg && <div className="nova-toast">{toastMsg}</div>}

      {/* TOP BROWSER-FRAME CONTAINER */}
      <div className="nova-browser-window">
        {/* STICKY BROWSER WINDOW HEADER WITH URL & CONTROLS */}
        <div className="window-sticky-header-wrap">
          <div className="window-top-bar">
            <div className="window-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
              <div className="nav-arrows">
                <span onClick={() => scrollToSection(`section-0${Math.max(1, activeSection - 1)}`)} title="Previous Section">‹</span>
                <span onClick={() => scrollToSection(`section-0${Math.min(5, activeSection + 1)}`)} title="Next Section">›</span>
              </div>
            </div>

            <div className="window-url-pill">
              <span className="lock-icon">🔒</span>
              <span>novasneakers.com/#section-0{activeSection}</span>
              <span className="reload-icon" onClick={() => showToast('Telemetry stream synchronized')}>↻</span>
            </div>

            <div className="window-right-actions">
              <span className="page-indicator-pill">0{activeSection} / 05 • {NAV_SECTIONS[activeSection - 1]?.label.split('// ')[1]}</span>
            </div>
          </div>

          {/* PRIMARY WEBSITE NAVBAR (AUTO-CHANGES ACTIVE TAB AS PER SCROLL) */}
          <header className="nova-navbar">
            <div className="brand-nova-lockup" onClick={() => scrollToSection('section-01')}>
              <span className="nova-logo-text">NØVA</span>
              <span className="brand-subtitle">ENGINEERED STREETWEAR</span>
            </div>

            <nav className="nova-nav-links">
              {NAV_SECTIONS.map((sec) => (
                <button 
                  key={sec.id}
                  className={`n-nav-btn ${activeSection === sec.num ? 'active' : ''}`}
                  onClick={() => scrollToSection(sec.id)}
                >
                  {sec.label}
                </button>
              ))}
            </nav>

            <div className="nova-user-actions">
              <button className="icon-action-btn" title="Search" onClick={() => showToast('Search indexed: NØVA-01, NØVA-02, NØVA-03')}>
                <MagnifyingGlass size={18} />
              </button>
              <button className="icon-action-btn" title="Account" onClick={() => showToast('Signed in as verified athlete')}>
                <User size={18} />
              </button>
              <div className="cart-btn-wrap" onClick={() => setIsCartOpen(true)} title="Open Cart">
                <ShoppingBag size={18} />
                <span className="cart-num">{cart.length}</span>
              </div>
            </div>
          </header>
        </div>

        {/* ============================================================ */}
        {/* SECTION 1: DROP HERO (#section-01) */}
        {/* ============================================================ */}
        <section id="section-01" className="scroll-page-block">
          <div className="nova-hero-stage">
            {/* 3D ART BACKGROUND WITH MOUSE PARALLAX */}
            <div 
              className="sneaker-3d-backdrop"
              style={{
                transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0) scale(1.02)`
              }}
            >
              <img 
                src="/hero-sneaker.jpg" 
                alt="NØVA-01 Cyber Sneaker" 
                className="sneaker-hero-img"
              />
            </div>

            {/* LEFT HERO CONTENT */}
            <div className="nova-hero-left">
              <div className="launch-tag-row">
                <span className="new-launch-pill">NEW LAUNCH</span>
                <span className="slashes">//////</span>
              </div>

              <h1 className="nova-headline">
                Built To<br />
                Move<br />
                Different.
              </h1>

              <div className="price-tag-wrap">
                <div className="sku-name">NØVA-01 <span className="slashes-small">//////</span></div>
                <div className="price-value">$220</div>
              </div>

              <div className="cta-action-row">
                <button 
                  onClick={() => scrollToSection('section-02')} 
                  className="btn-shop-drop"
                  style={{ boxShadow: `0 0 25px ${selectedColor.glow}` }}
                >
                  <span>SHOP THE DROP</span>
                  <ArrowRight size={16} weight="bold" />
                </button>
              </div>

              {/* COLORWAY PICKER */}
              <div className="colorway-selector-wrap">
                <span className="colorway-label">COLORWAY:</span>
                <div className="colorway-pills">
                  {COLORWAYS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c)}
                      className={`color-btn ${selectedColor.id === c.id ? 'active' : ''}`}
                    >
                      <span className="color-swatch" style={{ background: c.hex }} />
                      <span className="color-name">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT TECH SPEC CALLOUTS */}
            <div className="nova-specs-right">
              <div className="spec-callout-card">
                <h4>/// ENGINEERED MESH</h4>
                <p>Breathable. Durable ballistic nylon chassis.</p>
              </div>
              <div className="spec-callout-card">
                <h4>/// NØVA LACE SYSTEM</h4>
                <p>Locked in. Zero distractions magnetic cinch.</p>
              </div>
              <div className="spec-callout-card">
                <h4>/// REACTIVE SOLE UNIT</h4>
                <p>Energy return. Smart nitrogen bounce all day.</p>
              </div>
            </div>
          </div>

          {/* 4-COLUMN FEATURE CARDS GRID */}
          <div className="nova-feature-cards-grid">
            <div className="feat-grid-card" onClick={() => scrollToSection('section-03')}>
              <div className="feat-card-header">
                <span className="card-badge-n">NØVA TECH</span>
                <p>BUILT DIFFERENT.<br />PERFORMS DIFFERENT.</p>
              </div>
              <div className="feat-link">
                <span>EXPLORE TECHNOLOGY</span>
                <ArrowRight size={12} />
              </div>
            </div>

            <div className="feat-grid-card" onClick={() => scrollToSection('section-05')}>
              <div className="feat-card-header">
                <span className="card-badge-n">DESIGNED TO MOVE</span>
                <p>FORM. FUNCTION.<br />NO COMPROMISES.</p>
              </div>
              <div className="feat-link">
                <span>OUR STORY</span>
                <ArrowRight size={12} />
              </div>
            </div>

            <div className="feat-grid-card" onClick={() => scrollToSection('section-02')}>
              <div className="feat-card-header">
                <span className="card-badge-n">LAUNCH EXCLUSIVE</span>
                <p>LIMITED DROP.<br />MAXIMUM IMPACT.</p>
              </div>
              <div className="feat-link">
                <span>JOIN THE LAUNCH</span>
                <ArrowRight size={12} />
              </div>
            </div>

            <div className="feat-grid-card be-first-card">
              <div className="feat-card-header">
                <span className="card-badge-n">BE THE FIRST</span>
                <p>EARLY ACCESS.<br />EXCLUSIVE REWARDS.</p>
              </div>
              <div className="email-sub-row">
                <input type="email" placeholder="ENTER EMAIL" className="nova-email-input" />
                <button onClick={() => showToast('Subscribed for early drop access!')} className="btn-sub-arrow">→</button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 2: COLLECTION & QUICKBUY (#section-02) */}
        {/* ============================================================ */}
        <section id="section-02" className="scroll-page-block page-collection-02">
          <div className="collection-header-row">
            <div>
              <span className="section-eyebrow">FEATURED PRODUCT //////</span>
              <h2 className="section-title-bold">Our Performance Roster</h2>
            </div>
            <div className="collection-actions">
              <span className="collection-filter-tag">3 EDITIONS ACTIVE</span>
            </div>
          </div>

          {/* PRODUCT HERO DETAIL CARD */}
          <div className="product-quickbuy-stage">
            <div className="product-visual-pane">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className="featured-prod-img" 
              />
              <span className="prod-badge-overlay">{selectedProduct.tag}</span>
            </div>

            <div className="product-buy-controls">
              <span className="prod-sku-code">SKU: {selectedProduct.id.toUpperCase()} /////</span>
              <h3 className="prod-title-lg">{selectedProduct.name}</h3>
              <p className="prod-sub-cat">{selectedProduct.subtitle}</p>

              <ul className="prod-specs-list">
                {selectedProduct.features.map((f, i) => (
                  <li key={i}>
                    <span className="bullet-sym">»</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="prod-price-hero">${selectedProduct.price.toFixed(2)}</div>

              {/* COLOR & SIZE CONTROLS */}
              <div className="buy-options-box">
                <div className="opt-row">
                  <label>Color: <strong>{selectedProduct.color}</strong></label>
                  <div className="color-swatches-row">
                    <span className="color-dot active" style={{ background: '#00F0FF' }} />
                    <span className="color-dot" style={{ background: '#E2E8F0' }} />
                    <span className="color-dot" style={{ background: '#2C3E50' }} />
                  </div>
                </div>

                <div className="opt-row">
                  <label>Select Size (US Mens):</label>
                  <div className="size-grid-picker">
                    {['7', '8', '9', '10', '11', '12'].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`size-pick-btn ${selectedSize === sz ? 'active' : ''}`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => addToCart(selectedProduct, selectedSize)}
                  className="btn-buy-instant"
                >
                  <span>BUY NOW — ${selectedProduct.price.toFixed(2)}</span>
                  <ArrowRight size={16} weight="bold" />
                </button>

                <div className="free-shipping-pill">
                  <Truck size={14} color="#00F0FF" />
                  <span>FREE WORLDWIDE SHIPPING & 30-DAY RETURNS</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3-PRODUCT CARDS SWITCHER */}
          <div className="product-card-selector-grid">
            {PRODUCTS.map((prod) => (
              <div 
                key={prod.id} 
                onClick={() => setSelectedProduct(prod)}
                className={`prod-mini-card ${selectedProduct.id === prod.id ? 'active' : ''}`}
              >
                <div className="mini-card-img">
                  <img src={prod.image} alt={prod.name} />
                </div>
                <div className="mini-card-info">
                  <h4>{prod.name}</h4>
                  <p>{prod.color}</p>
                  <span className="mini-price">${prod.price.toFixed(2)}</span>
                </div>
                <span className="mini-arrow">{selectedProduct.id === prod.id ? '● ACTIVE' : 'SELECT →'}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 3: TECHNOLOGY & EXPLODED BLUEPRINT (#section-03) */}
        {/* ============================================================ */}
        <section id="section-03" className="scroll-page-block page-tech-03">
          <div className="tech-page-header">
            <div>
              <span className="section-eyebrow">TECHNOLOGY //////</span>
              <h2 className="tech-main-title">Engineered From The Ground Up.</h2>
              <p className="tech-sub-lead">
                NØVA-01 isn't assembled. It's engineered. Every layer, every material, every curve serves a purpose. Built different. Performs different.
              </p>
            </div>

            <div className="tech-pillars-list">
              <div className="tech-pillar-item">
                <span className="pillar-icon">⬡</span>
                <div>
                  <strong>PURPOSE-BUILT</strong>
                  <p>Every component is designed with intent.</p>
                </div>
              </div>
              <div className="tech-pillar-item">
                <span className="pillar-icon">⚙</span>
                <div>
                  <strong>PRECISION ENGINEERED</strong>
                  <p>Advanced materials tuned for maximum rebound.</p>
                </div>
              </div>
              <div className="tech-pillar-item">
                <span className="pillar-icon">⚡</span>
                <div>
                  <strong>TESTED RELIABILITY</strong>
                  <p>Rigorously lab tested for 1,000+ miles.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 4 EXPLODED BLUEPRINT LAYERS */}
          <div className="exploded-blueprint-container">
            <div className="exploded-visual-column">
              <img src="/hero-sneaker.jpg" alt="Exploded Sneaker Schematic" className="schematic-img" />
            </div>

            <div className="exploded-layers-column">
              {TECH_LAYERS.map((layer, index) => (
                <div 
                  key={layer.step}
                  onClick={() => setActiveTechLayer(index)}
                  className={`tech-layer-card ${activeTechLayer === index ? 'active' : ''}`}
                >
                  <div className="layer-step-badge">{layer.step} / {layer.title}</div>
                  <p className="layer-desc">{layer.desc}</p>
                  <div className="layer-stat-pill">{layer.stats}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="tech-bottom-banner">
            <button 
              onClick={() => setIsVideoModalOpen(true)} 
              className="btn-tech-motion"
            >
              <Play size={16} weight="fill" />
              <span>SEE TECHNOLOGY IN MOTION</span>
            </button>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 4: MOBILE & APP ECOSYSTEM (#section-04) */}
        {/* ============================================================ */}
        <section id="section-04" className="scroll-page-block page-mobile-04">
          <div className="mobile-page-header">
            <span className="section-eyebrow">NØVA-01 ////// RESPONSIVE ECOSYSTEM</span>
            <h2 className="section-title-bold">One Tap From Your Next Move.</h2>
            <p className="section-lead-muted">A seamless, responsive mobile shopping and telemetry experience.</p>
          </div>

          {/* 3 PHONE INTERFACES DISPLAY */}
          <div className="smartphones-showcase-row">
            {/* PHONE 1: SAVED ITEMS */}
            <div className="phone-mockup">
              <div className="phone-notch" />
              <div className="phone-screen">
                <div className="app-bar">
                  <span className="app-logo">NØVA</span>
                  <Heart size={14} color="#00F0FF" />
                </div>
                <h4 className="app-screen-title">Saved Items</h4>
                <div className="app-item-card">
                  <img src="/hero-sneaker.jpg" alt="Saved" className="app-thumb" />
                  <div>
                    <strong>NØVA-01</strong>
                    <span>Black / Electric Blue</span>
                    <div className="app-price">$220</div>
                  </div>
                </div>
                <button onClick={() => showToast('Added saved item to cart')} className="btn-app-action">
                  Add To Cart +
                </button>
              </div>
            </div>

            {/* PHONE 2: YOUR CART */}
            <div className="phone-mockup featured-phone">
              <div className="phone-notch" />
              <div className="phone-screen">
                <div className="app-bar">
                  <span className="app-logo">NØVA</span>
                  <ShoppingBag size={14} color="#00F0FF" />
                </div>
                <h4 className="app-screen-title">Your Cart (2 Items)</h4>
                <div className="app-cart-list">
                  <div className="app-cart-row">
                    <span>NØVA-01 (Size 10)</span>
                    <strong>$220.00</strong>
                  </div>
                  <div className="app-cart-row">
                    <span>NØVA Tech Tee (M)</span>
                    <strong>$68.00</strong>
                  </div>
                </div>
                <div className="app-total-box">
                  <span>Subtotal:</span>
                  <strong>$288.00 USD</strong>
                </div>
                <button onClick={() => setIsCheckoutModalOpen(true)} className="btn-app-cyan">
                  Checkout Securely →
                </button>
              </div>
            </div>

            {/* PHONE 3: SECURE CHECKOUT */}
            <div className="phone-mockup">
              <div className="phone-notch" />
              <div className="phone-screen">
                <div className="app-bar">
                  <span className="app-logo">NØVA</span>
                  <ShieldCheck size={14} color="#00F0FF" />
                </div>
                <h4 className="app-screen-title">Express Checkout</h4>
                <div className="express-pay-buttons">
                  <button className="btn-pay-brand"> Pay</button>
                  <button className="btn-pay-brand">G Pay</button>
                </div>
                <div className="checkout-preview-fields">
                  <input type="text" value="marcus@vance.io" readOnly className="app-input-ro" />
                  <input type="text" value="123 Motion Drive, NY" readOnly className="app-input-ro" />
                  <input type="text" value="VISA •••• 4242" readOnly className="app-input-ro" />
                </div>
                <button 
                  onClick={() => showToast('Order #NV-98421 placed successfully!')} 
                  className="btn-app-action"
                >
                  Place Order →
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE PILLARS */}
          <div className="mobile-pillars-grid">
            <div className="m-pillar"><DeviceMobile size={16} color="#00F0FF" /><span>MOBILE FIRST UX DESIGN</span></div>
            <div className="m-pillar"><ShieldCheck size={16} color="#00F0FF" /><span>FAST & SECURE CHECKOUT</span></div>
            <div className="m-pillar"><Heart size={16} color="#00F0FF" /><span>SAVED ITEMS ACROSS DEVICES</span></div>
            <div className="m-pillar"><CreditCard size={16} color="#00F0FF" /><span>ENCRYPTED PAYMENTS</span></div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 5: DIGITAL LAUNCH & REVIEWS (#section-05) */}
        {/* ============================================================ */}
        <section id="section-05" className="scroll-page-block page-launch-05">
          <div className="launch-header-wrap">
            <span className="section-eyebrow">CASE STUDY ////// THE NØVA LAUNCH</span>
            <h2 className="launch-hero-title">Not Just A Website.<br />A Digital Launch Experience.</h2>
          </div>

          {/* REVIEWS & VERIFIED ATHLETES */}
          <div className="reviews-section-box">
            <div className="reviews-top-score">
              <div className="score-num">4.9 / 5.0</div>
              <div className="stars-row">★★★★★</div>
              <span className="reviews-count">BASED ON 320+ VERIFIED ATHLETE REVIEWS</span>
            </div>

            <div className="reviews-cards-grid">
              {REVIEWS.map((rev, i) => (
                <div key={i} className="review-card">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-quote">"{rev.quote}"</p>
                  <div className="review-author">
                    <strong>{rev.name}</strong>
                    <span>{rev.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LAUNCH CTA PROMO CARD */}
          <div className="launch-action-card">
            <div className="launch-card-left">
              <span className="launch-tag">WANT A WEBSITE THAT LAUNCHES YOUR BRAND?</span>
              <h3 className="launch-cta-big">DM "LAUNCH"</h3>
              <p>LET'S BUILD YOUR MOMENT. 3D VISUALS • MOTION • HIGH CONVERSION.</p>
            </div>
            <button 
              onClick={() => showToast('VIP Launch Consultation booked!')}
              className="btn-dm-launch"
            >
              <span>Book Launch Session</span>
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </section>

        {/* UNIVERSAL TRUST BAR */}
        <div className="nova-trust-bar">
          <div className="trust-item">
            <Sparkle size={16} color="#00f0ff" />
            <div>
              <strong>PREMIUM QUALITY</strong>
              <span>BUILT TO LAST</span>
            </div>
          </div>

          <div className="trust-item">
            <Truck size={16} color="#00f0ff" />
            <div>
              <strong>WORLDWIDE SHIPPING</strong>
              <span>FAST & SECURE</span>
            </div>
          </div>

          <div className="trust-item">
            <ShieldCheck size={16} color="#00f0ff" />
            <div>
              <strong>SECURE PAYMENTS</strong>
              <span>ENCRYPTED CHECKOUT</span>
            </div>
          </div>

          <div className="trust-item">
            <User size={16} color="#00f0ff" />
            <div>
              <strong>JOIN NØVA CREW</strong>
              <span>EXCLUSIVE ACCESS</span>
            </div>
          </div>
        </div>

        {/* STICKY BOTTOM HUD CONTROLS & SECTION STEPPER */}
        <footer className="nova-window-footer">
          <div className="hud-left-geo">
            <div className="hud-sku-title">NØVA-01 <span className="slashes-small">//////</span></div>
            <div className="hud-tagline">FUTURE. PERFORMANCE. PURPOSE.</div>
            <div className="coords-text">40.7128° N, 74.0060° W</div>
          </div>

          {/* LAUNCHING HUD COUNTDOWN BOX */}
          <div className="launching-hud-box">
            <div className="hud-title-top">LAUNCHING LIMITED DROP</div>
            <div className="hud-timer-digits">
              <div className="digit-block">
                <span>{String(timeLeft.days).padStart(2, '0')}</span>
                <label>DAYS</label>
              </div>
              <span className="colon">:</span>
              <div className="digit-block">
                <span>{String(timeLeft.hrs).padStart(2, '0')}</span>
                <label>HRS</label>
              </div>
              <span className="colon">:</span>
              <div className="digit-block">
                <span>{String(timeLeft.mins).padStart(2, '0')}</span>
                <label>MINS</label>
              </div>
              <span className="colon">:</span>
              <div className="digit-block">
                <span>{String(timeLeft.secs).padStart(2, '0')}</span>
                <label>SECS</label>
              </div>
            </div>
            <div className="drop-date-bottom">MAY 25TH — 12PM EST</div>
          </div>

          {/* INTERACTIVE SECTION STEPPER WITH AUTO SCROLL SPY */}
          <div className="hud-page-stepper">
            <div className="stepper-dots">
              {NAV_SECTIONS.map((sec) => (
                <button
                  key={sec.num}
                  onClick={() => scrollToSection(sec.id)}
                  className={`step-btn-dot ${activeSection === sec.num ? 'active' : ''}`}
                  title={`Scroll to ${sec.label}`}
                >
                  0{sec.num}
                </button>
              ))}
            </div>
            <div className="stepper-nav-arrows">
              <button 
                onClick={() => scrollToSection(`section-0${Math.max(1, activeSection - 1)}`)}
                disabled={activeSection === 1}
                className="btn-step-prev"
              >
                ← PREV
              </button>
              <button 
                onClick={() => scrollToSection(`section-0${Math.min(5, activeSection + 1)}`)}
                disabled={activeSection === 5}
                className="btn-step-next"
              >
                NEXT →
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* CART DRAWER MODAL */}
      {isCartOpen && (
        <div className="modal-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="modal-drawer-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-drawer-header">
              <h3>Your Bag ({cart.length})</h3>
              <button className="btn-close-drawer" onClick={() => setIsCartOpen(false)}>✕</button>
            </div>

            <div className="modal-drawer-items">
              {cart.map((item, idx) => (
                <div key={idx} className="drawer-item-row">
                  <div>
                    <strong>{item.name}</strong>
                    <p>Size: {item.size}</p>
                    <span className="item-price">${item.price.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => setCart((prev) => prev.filter((_, i) => i !== idx))}
                    className="btn-del-item"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="modal-drawer-footer">
              <div className="subtotal-row">
                <span>Subtotal:</span>
                <strong>${cartSubtotal.toFixed(2)} USD</strong>
              </div>
              <button 
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutModalOpen(true);
                }}
                className="btn-checkout-cyan"
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {isCheckoutModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsCheckoutModalOpen(false)}>
          <div className="modal-checkout-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-drawer-header">
              <h3>Express Checkout</h3>
              <button className="btn-close-drawer" onClick={() => setIsCheckoutModalOpen(false)}>✕</button>
            </div>

            <div className="checkout-form-content">
              <div className="form-group-n">
                <label>Athlete Name</label>
                <input type="text" placeholder="Marcus Vance" className="form-input-n" />
              </div>
              <div className="form-group-n">
                <label>Email Address</label>
                <input type="email" placeholder="marcus@vance.io" className="form-input-n" />
              </div>
              <div className="form-group-n">
                <label>Shipping Address</label>
                <input type="text" placeholder="123 Motion Drive, New York, NY 10001" className="form-input-n" />
              </div>

              <div className="order-summary-box">
                <div className="sum-line"><span>Total Due:</span> <strong>${cartSubtotal.toFixed(2)}</strong></div>
                <div className="sum-line"><span style={{ color: '#00F0FF' }}>Shipping:</span> <strong>FREE</strong></div>
              </div>

              <button 
                onClick={() => {
                  showToast('Order confirmed! Tracking info sent to email.');
                  setIsCheckoutModalOpen(false);
                }}
                className="btn-confirm-order"
              >
                Place Order (${cartSubtotal.toFixed(2)})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KINETIC VIDEO MODAL */}
      {isVideoModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsVideoModalOpen(false)}>
          <div className="modal-video-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-drawer-header">
              <h3>NØVA-01 Kinetic Sole Simulation</h3>
              <button className="btn-close-drawer" onClick={() => setIsVideoModalOpen(false)}>✕</button>
            </div>
            <div className="video-simulation-canvas">
              <img src="/hero-sneaker.jpg" alt="Simulation" className="sim-img" />
              <div className="sim-telemetry-hud">
                <span className="hud-pulse">● 1000Hz SENSOR SAMPLING ACTIVE</span>
                <span className="hud-stat">IMPACT ABSORPTION: 99.4%</span>
                <span className="hud-stat">PROPULSION REBOUND: 88.2%</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
