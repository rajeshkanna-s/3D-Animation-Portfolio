import React, { useState } from 'react';
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  Droplet,
  Shield,
  Waves,
  FlaskConical,
  Leaf,
  Check,
  MapPin,
  Mail,
  Plus,
  Sparkles,
  Atom,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  X,
  Copy,
  Sliders,
  CheckCircle2,
  ExternalLink,
  Layers,
  Palette
} from 'lucide-react';
import confetti from 'canvas-confetti';

const PALETTE_COLORS = [
  { name: 'DEEP TIDE', hex: '#0F2120', text: '#ffffff', desc: 'Primary backdrop & deep ocean foundation' },
  { name: 'SEAFOAM', hex: '#275150', text: '#ffffff', desc: 'Primary action buttons & container accents' },
  { name: 'MINERAL MIST', hex: '#5F8180', text: '#ffffff', desc: 'Secondary borders, tags & subtle glow' },
  { name: 'SANDSTONE', hex: '#D9D2C6', text: '#0F2120', desc: 'Warm limestone plinth & canvas baseline' },
  { name: 'SHELL', hex: '#EDE8E2', text: '#0F2120', desc: 'Design system canvas & light surface cards' },
  { name: 'PEARL', hex: '#F6F4F1', text: '#0F2120', desc: 'Pristine highlight, text & lustrous reflections' }
];

const ICONS_LIST = [
  { name: 'Search', icon: Search },
  { name: 'User', icon: User },
  { name: 'ShoppingBag', icon: ShoppingBag },
  { name: 'Menu', icon: Menu },
  { name: 'Droplet', icon: Droplet },
  { name: 'Shield', icon: Shield },
  { name: 'Waves', icon: Waves },
  { name: 'FlaskConical', icon: FlaskConical },
  { name: 'Leaf', icon: Leaf },
  { name: 'Check', icon: Check },
  { name: 'MapPin', icon: MapPin },
  { name: 'Mail', icon: Mail },
  { name: 'Plus', icon: Plus },
  { name: 'Sparkles', icon: Sparkles },
  { name: 'Atom', icon: Atom }
];

const TEXTURES = [
  {
    id: 'topo',
    name: 'TOPOGRAPHIC LINES',
    sub: 'Elevation & tidal contours',
    gradient: 'radial-gradient(ellipse at 30% 30%, rgba(39, 81, 80, 0.4), rgba(15, 33, 32, 0.95))',
    pattern: 'topo-pattern'
  },
  {
    id: 'water',
    name: 'WATER SURFACE',
    sub: 'Teal aquatic caustics',
    gradient: 'linear-gradient(135deg, #1c4e4c 0%, #0d2c2a 50%, #061918 100%)',
    pattern: 'water-pattern'
  },
  {
    id: 'limestone',
    name: 'LIMESTONE TEXTURE',
    sub: 'Natural honed travertine',
    gradient: 'linear-gradient(135deg, #e3ded6 0%, #cfc7ba 50%, #b8ae9e 100%)',
    darkText: true,
    pattern: 'stone-pattern'
  },
  {
    id: 'gel',
    name: 'MINERAL GEL',
    sub: 'Translucent ocean matrix',
    gradient: 'radial-gradient(circle at 60% 40%, rgba(95, 129, 128, 0.7) 0%, rgba(15, 33, 32, 0.95) 75%)',
    pattern: 'gel-pattern'
  }
];

const MATERIALS = [
  {
    name: 'GLASS',
    desc: 'Translucent',
    detail: 'Recyclable frosted glass infused with marine mineral tint. High refractive index with soft edge glow.',
    orbClass: 'orb-glass'
  },
  {
    name: 'STONE',
    desc: 'Natural',
    detail: 'Honed limestone and sedimentary sandstone mined sustainably from coastal quarries.',
    orbClass: 'orb-stone'
  },
  {
    name: 'PEARL',
    desc: 'Lustrous',
    detail: 'Iridescent pearl sheen reflecting soft ocean light, creating radiant tactile feedback.',
    orbClass: 'orb-pearl'
  },
  {
    name: 'GEL',
    desc: 'Hydrating',
    detail: 'Lightweight hyaluronic sea-mineral gel formulation with instant absorption matrix.',
    orbClass: 'orb-gel'
  }
];

const JOURNEY_SLIDES = [
  {
    num: 1,
    title: 'Skincare. Shaped by the Sea.',
    desc: 'The opening brand introduction showcasing our ocean origins.',
    image: '/rituals-collection.jpg'
  },
  {
    num: 2,
    title: 'Deep hydration. Stronger barrier. Natural glow.',
    desc: 'Clinical benefits and oceanic mineral infusion breakdown.',
    image: '/tidal-slide3.jpg'
  },
  {
    num: 3,
    title: 'Pure ingredients. Powerful results.',
    desc: 'Bio-fermented kelp, blue spirulina, and ionic electrolytes.',
    image: '/tidal-slide4.jpg'
  },
  {
    num: 4,
    title: 'Rituals inspired by the tides.',
    desc: 'Daily 4-step morning and evening marine skincare rituals.',
    image: '/tidal-slide5.jpg'
  },
  {
    num: 5,
    title: 'Website Design System',
    desc: 'The complete architectural design system and visual component library.',
    image: '/design-system.jpg'
  }
];

export default function App() {
  const [toastMessage, setToastMessage] = useState('');
  const [copiedHex, setCopiedHex] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [cartCount, setCartCount] = useState(1);
  const [activeSlide, setActiveSlide] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);

  // Form State
  const [formInput, setFormInput] = useState('');
  const [formSelect, setFormSelect] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Interactive Typography Demo
  const [demoText, setDemoText] = useState('Ocean Mineral Purity');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard?.writeText(text);
    setCopiedHex(text);
    showToast(`Copied ${label || text} to clipboard!`);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleAddToCart = () => {
    setCartCount((c) => c + 1);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#275150', '#5F8180', '#D9D2C6', '#F6F4F1']
    });
    showToast('Added "Mineral Hydration Serum ($78)" to ritual bag!');
  };

  return (
    <div className="tidal-design-system-app">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-banner">
          <Droplet style={{ width: 16, height: 16, color: '#5F8180' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SLIM FROZEN TOP NAVIGATION HEADER */}
      <header className="tidal-frozen-header">
        <a href="#specimens" className="ds-brand-lockup-link">
          <Droplet style={{ width: 18, height: 18, color: '#5F8180' }} />
          <div>
            <span className="ds-brand-name">TIDAL VEIL</span>
            <span className="ds-brand-sub">OCEAN MINERAL</span>
          </div>
        </a>

        <nav className="tidal-nav-links">
          <a href="#specimens" className="t-nav-link">SPECIMENS</a>
          <a href="#palette" className="t-nav-link">PALETTE</a>
          <a href="#typography" className="t-nav-link">TYPOGRAPHY</a>
          <a href="#materials" className="t-nav-link">3D MATERIALS</a>
          <a href="#ritual" className="t-nav-link">RITUAL SHOP</a>
        </nav>

        <div className="tidal-header-actions">
          <button onClick={handleAddToCart} className="btn-quick-bag">
            <ShoppingBag style={{ width: 14, height: 14 }} />
            <span>Bag ({cartCount})</span>
          </button>
        </div>
      </header>

      {/* 1. TOP HEADER & HERO SHOWCASE */}
      <section className="ds-hero-header">
        <div className="ds-hero-left">
          <div className="ds-brand-lockup">
            <span className="ds-brand-name">TIDAL VEIL</span>
            <span className="ds-brand-sub">MINERAL SKINCARE</span>
          </div>

          <h1 className="ds-main-title">
            <span>Website</span>
            <span>Design System</span>
          </h1>

          {/* Wavy Decorative Line */}
          <div className="ds-wave-flourish">
            <svg width="48" height="10" viewBox="0 0 48 10" fill="none">
              <path d="M1 5C5 2 9 2 13 5C17 8 21 8 25 5C29 2 33 2 37 5C41 8 45 8 47 5" stroke="#5F8180" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </div>

          <p className="ds-hero-description">
            Designing a digital experience inspired by the ocean's rhythm and mineral purity.
          </p>
        </div>

        {/* 3D Bottle Hero Center/Right Visual */}
        <div className="ds-hero-center-visual">
          <div className="bottle-pedestal-scene">
            <img 
              src="/design-system.jpg" 
              alt="Tidal Veil 3D Serum on Plinth with Glass Ribbon" 
              className="hero-reference-crop"
            />
            <div className="hero-visual-vignette" />
          </div>
        </div>

        {/* Color Palette Floating Card (Top Right) */}
        <div className="ds-color-palette-card">
          <div className="palette-card-header">
            <Palette style={{ width: 14, height: 14, color: '#5F8180' }} />
            <span className="palette-card-title">COLOR PALETTE</span>
          </div>

          <div className="swatches-grid">
            {PALETTE_COLORS.map((color) => (
              <div 
                key={color.hex} 
                className="color-swatch-item"
                onClick={() => copyToClipboard(color.hex, `${color.name} (${color.hex})`)}
                title={`Click to copy ${color.name} ${color.hex}`}
              >
                <div 
                  className="swatch-circle" 
                  style={{ backgroundColor: color.hex, borderColor: color.hex === '#F6F4F1' ? 'rgba(0,0,0,0.1)' : 'transparent' }}
                >
                  {copiedHex === color.hex && <Check style={{ width: 12, height: 12, color: color.text }} />}
                </div>
                <div className="swatch-meta">
                  <span className="swatch-name">{color.name}</span>
                  <span className="swatch-hex">{color.hex}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. MAIN DESIGN SYSTEM CANVAS (Curved Sandstone Surface) */}
      <main className="ds-sandstone-canvas">
        
        {/* ROW 1: TYPOGRAPHY + NAVIGATION BAR */}
        <div className="canvas-grid-row two-cols-typography-nav">
          
          {/* Typography Specimen Section */}
          <div className="ds-section-block typography-block">
            <div className="section-label-row">
              <span className="section-eyebrow">TYPOGRAPHY</span>
            </div>

            <div className="specimens-container">
              {/* Playfair Display */}
              <div className="font-specimen">
                <div className="specimen-glyph-col">
                  <span className="glyph-large playfair-preview">Aa</span>
                </div>
                <div className="specimen-details-col">
                  <div className="font-family-title">Playfair Display</div>
                  <div className="font-usage-role">Heading Font</div>
                  <div className="font-charsets playfair-preview">
                    <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                    <div>abcdefghijklmnopqrstuvwxyz</div>
                    <div>1234567890</div>
                  </div>
                </div>
              </div>

              <div className="specimen-divider" />

              {/* Inter */}
              <div className="font-specimen">
                <div className="specimen-glyph-col">
                  <span className="glyph-large inter-preview">Aa</span>
                </div>
                <div className="specimen-details-col">
                  <div className="font-family-title">Inter</div>
                  <div className="font-usage-role">Body Font</div>
                  <div className="font-charsets inter-preview">
                    <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                    <div>abcdefghijklmnopqrstuvwxyz</div>
                    <div>1234567890</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Bar Preview Section */}
          <div className="ds-section-block navigation-block">
            <div className="section-label-row">
              <span className="section-eyebrow">NAVIGATION BAR</span>
            </div>

            <div className="navbar-preview-pill">
              <div className="nav-brand-lockup-small">
                <span className="brand-primary">TIDAL VEIL</span>
                <span className="brand-secondary">MINERAL SKINCARE</span>
              </div>

              <div className="nav-links-menu">
                <button className="nav-link-btn has-dropdown" onClick={() => showToast('Opening Rituals Shop Catalog')}>
                  <span>SHOP</span>
                  <ChevronDown style={{ width: 10, height: 10 }} />
                </button>
                <button className="nav-link-btn" onClick={() => showToast('Navigating to Rituals Guide')}>RITUALS</button>
                <button className="nav-link-btn" onClick={() => showToast('Opening Marine Science & Formulations')}>OUR SCIENCE</button>
                <button className="nav-link-btn" onClick={() => showToast('Exploring Ocean Origins & Kelp Sourcing')}>THE SOURCE</button>
                <button className="nav-link-btn" onClick={() => showToast('Opening The Tidal Journal')}>JOURNAL</button>
              </div>

              <div className="nav-actions-group">
                <button className="nav-action-icon" title="Search" onClick={() => showToast('Search skicare formulas')}>
                  <Search style={{ width: 14, height: 14 }} />
                </button>
                <button className="nav-action-icon" title="Account" onClick={() => showToast('Account & Ritual history')}>
                  <User style={{ width: 14, height: 14 }} />
                </button>
                <button className="nav-action-icon has-badge" title="Bag" onClick={() => showToast(`Your ritual bag contains ${cartCount} items`)}>
                  <ShoppingBag style={{ width: 14, height: 14 }} />
                  {cartCount > 0 && <span className="cart-badge-dot">{cartCount}</span>}
                </button>
                <button className="nav-cta-pill" onClick={() => {
                  setActiveModal('quiz');
                  showToast('Starting Ritual Discovery Quiz');
                }}>
                  DISCOVER YOUR RITUAL
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: BUTTON STYLES + ICONS + CARD COMPONENTS */}
        <div className="canvas-grid-row three-cols-elements">
          
          {/* Column 1: Buttons & Form Fields */}
          <div className="left-stacked-elements">
            
            {/* Button Styles */}
            <div className="ds-section-block">
              <div className="section-label-row">
                <span className="section-eyebrow">BUTTON STYLES</span>
              </div>

              <div className="button-styles-showcase">
                <div className="btn-row-flex">
                  <button className="btn-ds-primary" onClick={() => showToast('Primary Button clicked')}>
                    PRIMARY BUTTON
                  </button>
                  <button className="btn-ds-secondary" onClick={() => showToast('Secondary Button clicked')}>
                    SECONDARY BUTTON
                  </button>
                </div>

                <div className="btn-row-flex">
                  <button className="btn-ds-tertiary" onClick={() => showToast('Tertiary Link clicked')}>
                    <span>TERTIARY BUTTON</span>
                  </button>
                  <div className="icon-btn-container">
                    <span className="icon-btn-label">ICON BUTTON</span>
                    <button className="btn-ds-icon-circle" onClick={() => showToast('Icon Arrow Button clicked')}>
                      <ArrowRight style={{ width: 14, height: 14 }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="ds-section-block">
              <div className="section-label-row">
                <span className="section-eyebrow">FORM FIELDS</span>
              </div>

              <div className="form-fields-showcase">
                <div className="form-field-group">
                  <label className="field-label">LABEL</label>
                  <input 
                    type="text" 
                    placeholder="Placeholder" 
                    value={formInput}
                    onChange={(e) => setFormInput(e.target.value)}
                    className="ds-input-field" 
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">LABEL</label>
                  <div className="select-wrapper">
                    <select 
                      value={formSelect} 
                      onChange={(e) => setFormSelect(e.target.value)}
                      className="ds-select-field"
                    >
                      <option value="">Select an option</option>
                      <option value="dry">Dry / Dehydrated Skin</option>
                      <option value="sensitive">Sensitive / Barrier Compromised</option>
                      <option value="combination">Combination / Dullness</option>
                      <option value="mature">Mature / Loss of Elasticity</option>
                    </select>
                    <ChevronDown className="select-chevron" style={{ width: 14, height: 14 }} />
                  </div>
                </div>

                <div className="form-field-group">
                  <label className="field-label">LABEL</label>
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="ds-input-field" 
                  />
                </div>

                <label className="checkbox-agreement-row">
                  <input 
                    type="checkbox" 
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="ds-checkbox-input"
                  />
                  <span className="checkbox-label-text">I agree to the Terms & Conditions</span>
                </label>
              </div>
            </div>

          </div>

          {/* Column 2: Icons & Texture Backgrounds */}
          <div className="middle-stacked-elements">
            
            {/* Icons Grid */}
            <div className="ds-section-block">
              <div className="section-label-row">
                <span className="section-eyebrow">ICONS</span>
              </div>

              <div className="icons-grid-matrix">
                {ICONS_LIST.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <div 
                      key={item.name} 
                      className={`icon-box-item ${selectedIcon === item.name ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedIcon(item.name);
                        showToast(`Icon: ${item.name}`);
                      }}
                      title={item.name}
                    >
                      <IconComp style={{ width: 16, height: 16 }} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Texture & Backgrounds */}
            <div className="ds-section-block">
              <div className="section-label-row">
                <span className="section-eyebrow">TEXTURE & BACKGROUNDS</span>
              </div>

              <div className="textures-grid-row">
                {TEXTURES.map((tex) => (
                  <div 
                    key={tex.id} 
                    className="texture-swatch-card"
                    onClick={() => {
                      setActiveModal({ type: 'texture', data: tex });
                      showToast(`Inspecting ${tex.name}`);
                    }}
                  >
                    <div 
                      className={`texture-visual-box ${tex.pattern}`} 
                      style={{ background: tex.gradient }}
                    >
                      <div className="texture-inner-glow" />
                    </div>
                    <span className="texture-card-title">{tex.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Column 3: Card Components & Materials */}
          <div className="right-stacked-elements">
            
            {/* Card Components */}
            <div className="ds-section-block">
              <div className="section-label-row">
                <span className="section-eyebrow">CARD COMPONENTS</span>
              </div>

              <div className="card-components-row">
                
                {/* 1. Our Essence Card */}
                <div className="ds-component-card card-dark-essence">
                  <div className="card-ambient-orb" />
                  <div className="card-content-inner">
                    <span className="card-sub-header">OUR ESSENCE</span>
                    <h3 className="card-headline-serif">Rooted in nature, Refined by science.</h3>
                    <button className="card-action-link" onClick={() => showToast('Opening Marine Philosophy')}>
                      <span>LEARN MORE</span>
                      <ArrowRight style={{ width: 12, height: 12 }} />
                    </button>
                  </div>
                </div>

                {/* 2. Product Card */}
                <div className="ds-component-card card-product-showcase">
                  <div className="bestseller-pill-tag">BESTSELLER</div>
                  
                  <div className="product-bottle-visual-wrapper">
                    <img 
                      src="/rituals-collection.jpg" 
                      alt="Mineral Hydration Serum" 
                      className="product-crop-img"
                    />
                  </div>

                  <div className="product-card-details">
                    <h4 className="product-card-name">MINERAL HYDRATION SERUM</h4>
                    <p className="product-card-sub">Deep hydration + barrier support</p>
                    
                    <div className="product-price-action-row">
                      <span className="product-price-tag">$78</span>
                      <button className="add-plus-round-btn" onClick={handleAddToCart} title="Add to bag">
                        <Plus style={{ width: 14, height: 14 }} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Rituals Quiz Card */}
                <div className="ds-component-card card-sandstone-quiz">
                  <div className="stone-bg-layer" />
                  <div className="card-content-inner">
                    <span className="card-sub-header text-dark">RITUALS</span>
                    <h3 className="card-headline-serif text-dark">Find your perfect ritual.</h3>
                    <button className="card-action-link text-dark" onClick={() => {
                      setActiveModal('quiz');
                      showToast('Opening Ritual Customizer Quiz');
                    }}>
                      <span>TAKE THE QUIZ</span>
                      <ArrowRight style={{ width: 12, height: 12 }} />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Materials & Finishes */}
            <div className="ds-section-block">
              <div className="section-label-row">
                <span className="section-eyebrow">MATERIALS & FINISHES</span>
              </div>

              <div className="materials-orbs-row">
                {MATERIALS.map((mat) => (
                  <div 
                    key={mat.name} 
                    className="material-orb-item"
                    onClick={() => {
                      setActiveModal({ type: 'material', data: mat });
                      showToast(`Material: ${mat.name} (${mat.desc})`);
                    }}
                  >
                    <div className={`material-sphere ${mat.orbClass}`}>
                      <div className="sphere-specular-highlight" />
                    </div>
                    <div className="material-orb-labels">
                      <span className="mat-name">{mat.name}</span>
                      <span className="mat-desc">{mat.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* ROW 3: PACKAGING DETAILS FULL-WIDTH BANNER */}
        <div className="canvas-grid-row packaging-details-row">
          <div className="ds-section-block full-width-block">
            <div className="section-label-row">
              <span className="section-eyebrow">PACKAGING DETAILS</span>
            </div>

            <div className="packaging-banner-composite">
              <div className="pkg-slice slice-glass">
                <div className="pkg-slice-img" style={{ backgroundImage: `url('/design-system.jpg')`, backgroundPosition: '15% 20%' }} />
                <div className="pkg-slice-overlay">
                  <span className="pkg-slice-title">CRYSTAL GLASS</span>
                  <p className="pkg-slice-desc">Recyclable glass with a soft seafoam tint.</p>
                </div>
              </div>

              <div className="pkg-slice slice-metal">
                <div className="pkg-slice-img" style={{ backgroundImage: `url('/design-system.jpg')`, backgroundPosition: '45% 20%' }} />
                <div className="pkg-slice-overlay">
                  <span className="pkg-slice-title">BRUSHED METAL</span>
                  <p className="pkg-slice-desc">Cap with a satin finish for a premium feel.</p>
                </div>
              </div>

              <div className="pkg-slice slice-label">
                <div className="pkg-slice-img" style={{ backgroundImage: `url('/design-system.jpg')`, backgroundPosition: '70% 20%' }} />
                <div className="pkg-slice-overlay">
                  <span className="pkg-slice-title">MINERAL HYDRATION SERUM</span>
                  <p className="pkg-slice-desc">Embossed waterproof label with tactile micro-texture.</p>
                </div>
              </div>

              <div className="pkg-slice slice-ribbon">
                <div className="pkg-slice-img" style={{ backgroundImage: `url('/design-system.jpg')`, backgroundPosition: '90% 20%' }} />
                <div className="pkg-slice-overlay">
                  <span className="pkg-slice-title">FLUID WAVE</span>
                  <p className="pkg-slice-desc">Custom blown sculpted glass wave aesthetic.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* 3. THE JOURNEY SO FAR (CAROUSEL / GALLERY OF 5 SLIDES) */}
      <section className="ds-journey-gallery-section">
        <div className="journey-header-row">
          <div className="section-label-row">
            <span className="section-eyebrow dark-mode">THE JOURNEY SO FAR</span>
          </div>
        </div>

        <div className="journey-slides-track">
          {JOURNEY_SLIDES.map((slide) => (
            <div 
              key={slide.num} 
              className={`journey-slide-card ${slide.num === 5 ? 'active-system-slide' : ''}`}
              onClick={() => {
                setActiveSlide(slide);
                showToast(`Viewing Slide ${slide.num}: ${slide.title}`);
              }}
            >
              <div className="slide-number-badge">{slide.num}</div>
              <div 
                className="slide-thumbnail-img" 
                style={{ backgroundImage: `url('${slide.image}')` }}
              />
              <div className="slide-caption-overlay">
                <h4 className="slide-title">{slide.title}</h4>
                <p className="slide-desc">{slide.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Brand Statement */}
        <footer className="ds-footer-statement">
          <div className="footer-left-quote">
            <p>Thoughtful design. Consciously crafted.</p>
            <span className="footer-italic">Always connected to the sea.</span>
          </div>

          <div className="footer-right-ack">
            <span>THANK YOU FOR EXPLORING TIDAL VEIL</span>
          </div>
        </footer>
      </section>

      {/* MODAL LIGHTBOX */}
      {activeSlide && (
        <div className="modal-backdrop-overlay" onClick={() => setActiveSlide(null)}>
          <div className="modal-content-window" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div className="modal-title-lockup">
                <span className="modal-step-badge">Slide {activeSlide.num} of 5</span>
                <h3>{activeSlide.title}</h3>
              </div>
              <button className="modal-close-round" onClick={() => setActiveSlide(null)}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>
            <div className="modal-image-showcase">
              <img src={activeSlide.image} alt={activeSlide.title} className="full-lightbox-img" />
            </div>
            <div className="modal-footer-caption">
              <p>{activeSlide.desc}</p>
              <button className="btn-primary-pill" onClick={() => {
                showToast(`Saved reference slide ${activeSlide.num}`);
                setActiveSlide(null);
              }}>
                <span>Close Lightbox</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RITUAL QUIZ MODAL */}
      {activeModal === 'quiz' && (
        <div className="modal-backdrop-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content-window small-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div className="modal-title-lockup">
                <span className="modal-step-badge">Skincare Diagnostic</span>
                <h3>Discover Your Daily Ritual</h3>
              </div>
              <button className="modal-close-round" onClick={() => setActiveModal(null)}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>
            <div className="quiz-modal-body">
              <p className="quiz-question-title">What is your primary marine skincare focus?</p>
              
              <div className="quiz-options-list">
                {[
                  { id: '1', title: 'Deep Hydration & Plumpness', sub: 'Target dehydration with mineral electrolytes' },
                  { id: '2', title: 'Barrier Repair & Calming', sub: 'Restore marine lipid barrier with brown algae' },
                  { id: '3', title: 'Radiance & Cellular Renewal', sub: 'Revitalize dullness with blue spirulina bio-ferment' },
                  { id: '4', title: 'Full 4-Step Shoreline Regimen', sub: 'Complete morning & evening regenerative ritual' }
                ].map((opt) => (
                  <button 
                    key={opt.id}
                    className="quiz-option-btn"
                    onClick={() => {
                      confetti({ particleCount: 30, spread: 60 });
                      showToast(`Selected: ${opt.title}`);
                      setActiveModal(null);
                    }}
                  >
                    <div>
                      <div className="opt-title">{opt.title}</div>
                      <div className="opt-sub">{opt.sub}</div>
                    </div>
                    <ArrowRight style={{ width: 16, height: 16 }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MATERIAL / TEXTURE DETAIL MODAL */}
      {activeModal && activeModal.type && (
        <div className="modal-backdrop-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content-window small-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div className="modal-title-lockup">
                <span className="modal-step-badge">{activeModal.type.toUpperCase()} SPECIFICATION</span>
                <h3>{activeModal.data.name}</h3>
              </div>
              <button className="modal-close-round" onClick={() => setActiveModal(null)}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>
            <div className="quiz-modal-body">
              <p className="quiz-question-title" style={{ fontSize: '1rem', color: '#8b9991' }}>
                {activeModal.data.desc || activeModal.data.sub}
              </p>
              <div className="spec-info-box">
                <p>{activeModal.data.detail || 'High fidelity digital texture crafted for authentic ocean mineral interaction.'}</p>
              </div>
              <button className="btn-primary-pill" style={{ width: '100%', marginTop: 20 }} onClick={() => setActiveModal(null)}>
                <span>Done</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SLIM FOOTER */}
      <footer className="tidal-footer">
        <div className="footer-top-row">
          <div className="ds-brand-lockup-link">
            <Droplet style={{ width: 16, height: 16, color: '#5F8180' }} />
            <span className="ds-brand-name" style={{ fontSize: '0.95rem' }}>TIDAL VEIL</span>
          </div>
          <div className="footer-links-row">
            <a href="#specimens">Specimens</a>
            <a href="#palette">Color Palette</a>
            <a href="#typography">Typography</a>
            <a href="#materials">3D Textures</a>
            <a href="#ritual">Ritual Store</a>
          </div>
          <div className="footer-cert-badge">
            <Shield style={{ width: 13, height: 13, color: '#5F8180' }} />
            <span>100% Ocean Sourced & Biodegradable</span>
          </div>
        </div>
        <div className="footer-bottom-copy">
          © 2026 TIDAL VEIL LABORATORIES INC. LIVING DESIGN SYSTEM & ARTISANAL OCEAN FORMULAS.
        </div>
      </footer>

    </div>
  );
}
