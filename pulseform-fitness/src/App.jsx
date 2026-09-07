import React, { useState, useEffect } from 'react';
import {
  Activity,
  Heart,
  Dumbbell,
  Zap,
  Gauge,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  ChevronRight,
  Check,
  X,
  User,
  ShoppingBag,
  Calendar,
  Compass,
  ShieldCheck,
  MapPin,
  Mail,
  Flame,
  Trophy,
  Cpu,
  Sliders,
  Clock,
  Phone
} from 'lucide-react';

const EQUIPMENT_ROSTER = [
  {
    id: 'pulserack-apex',
    name: 'PulseRack Apex Pro',
    category: 'Kinetic Strength',
    metric: '98.4% Load Precision',
    price: 3400.00,
    features: 'Dynamic electromagnetic resistance, 1000Hz strain-gauge load sampling, automated spotter arrest.',
    image: './hero-fitness.jpg'
  },
  {
    id: 'veloform-aero',
    name: 'Veloform Aero Cycle',
    category: 'Cardiovascular Power',
    metric: '±0.5% Power Accuracy',
    price: 2200.00,
    features: 'Direct-drive magnetic flywheel, VO2 max estimation engine, aerodynamic carbon-monocoque chassis.',
    image: './hero-fitness.jpg'
  },
  {
    id: 'hypertread-x9',
    name: 'HyperTread X9 Slat',
    category: 'Gait & Velocity',
    metric: '0-25 MPH Instant Response',
    price: 3800.00,
    features: 'Vulcanized rubber slat track, multi-axis force plates measuring ground contact asymmetry in real-time.',
    image: './hero-fitness.jpg'
  },
  {
    id: 'isopod-recovery',
    name: 'IsoPod Bio-Chamber',
    category: 'Cellular Recovery',
    metric: '-42% Muscle Soreness',
    price: 4500.00,
    features: 'Full-spectrum near/far infrared photobiomodulation, pneumatic compression sleeve docking.',
    image: './hero-fitness.jpg'
  }
];

const FLAGSHIP_STUDIOS = [
  {
    city: 'Manhattan, New York',
    location: 'Tribeca High-Performance Center',
    address: '68 Franklin Street, New York, NY 10013',
    capacity: '24 Kinetic Pods • Cryo Recovery Lounge'
  },
  {
    city: 'Mayfair, London',
    location: 'Berkeley Square Kinetic Sanctuary',
    address: '14 Berkeley Square, London W1J 6BL',
    capacity: '18 Kinetic Pods • Altitude Hypoxic Chamber'
  },
  {
    city: 'Roppongi, Tokyo',
    location: 'Roppongi Hills Kinetic Lab',
    address: '6-10-1 Roppongi, Minato City, Tokyo',
    capacity: '20 Kinetic Pods • Hydro-Therapy Flotation'
  }
];

export function App() {
  const [targetWatts, setTargetWatts] = useState(320);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [toastMessage, setToastMessage] = useState('');

  // Scroll spy effect to highlight navigation tabs
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'telemetry', 'equipment', 'studios', 'membership'];
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

  // Calculate dynamic metrics from watts
  const heartRateEst = Math.min(195, Math.round(110 + targetWatts * 0.22));
  const burnRate = Math.round(targetWatts * 3.6 * 1.15);
  const strainIndex = (targetWatts / 450 * 10).toFixed(1);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((x) => x.id === item.id);
      if (exists) {
        return prev.map((x) => (x.id === item.id ? { ...x, qty: x.qty + 1 } : x));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    showToast(`Added ${item.name} to equipment reservation`);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="pulseform-page">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="pulse-toast">
          <Zap size={16} color="#00f0ff" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. FROZEN / STICKY TOP NAVIGATION */}
      <header className="pulse-nav-header">
        <a href="#hero" className="pulse-brand-lockup">
          <div className="pulse-logo-badge">
            <Activity size={20} color="#00f0ff" />
          </div>
          <div>
            <span className="brand-pulse-title">PULSEFORM</span>
            <span className="brand-pulse-sub">CONNECTED KINETIC LAB</span>
          </div>
        </a>

        <nav className="pulse-nav-links">
          <a href="#hero" className={`pulse-nav-item ${activeSection === 'hero' ? 'active' : ''}`}>SYSTEM</a>
          <a href="#telemetry" className={`pulse-nav-item ${activeSection === 'telemetry' ? 'active' : ''}`}>BIOMETRICS</a>
          <a href="#equipment" className={`pulse-nav-item ${activeSection === 'equipment' ? 'active' : ''}`}>EQUIPMENT</a>
          <a href="#studios" className={`pulse-nav-item ${activeSection === 'studios' ? 'active' : ''}`}>FLAGSHIP STUDIOS</a>
          <a href="#membership" className={`pulse-nav-item ${activeSection === 'membership' ? 'active' : ''}`}>MEMBERSHIP</a>
        </nav>

        <div className="pulse-nav-actions">
          <button 
            onClick={() => setIsPassModalOpen(true)}
            className="btn-pulse-pass"
          >
            <span>STUDIO PASS</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </header>

      {/* 2. HERO STAGE WITH 3D KINETIC ARTWORK */}
      <section id="hero" className="pulse-hero-stage">
        <div className="pulse-hero-backdrop" style={{ backgroundImage: "url('./hero-fitness.jpg')" }} />
        <div className="pulse-hero-gradient" />

        <div className="pulse-hero-content">
          <div className="cyber-pill-tag">
            <span className="cyan-pulse-dot" />
            <span>NEURO-KINETIC TELEMETRY • LIVE AI PERIODIZATION</span>
          </div>

          <h1 className="pulse-hero-title">
            Kinetic Output. <br />
            <span className="cyan-gradient-text">Hyper-Adaptive Bio-Feedback.</span>
          </h1>

          <p className="pulse-hero-subtext">
            Real-time velocity tracking, neuro-muscular strain calculation, and AI-adapted load periodization engineered for elite athletic performance.
          </p>

          <div className="pulse-hero-btn-row">
            <button 
              onClick={() => setIsPassModalOpen(true)} 
              className="btn-cyan-primary"
            >
              <span>Start Biometric Evaluation</span>
              <ArrowUpRight size={16} />
            </button>

            <a href="#telemetry" className="btn-glass-secondary">
              <span>Explore Strain Engine</span>
              <ChevronRight size={16} />
            </a>
          </div>

          {/* Live Telemetry Hud Box */}
          <div className="live-telemetry-hud">
            <div className="hud-metric-item">
              <span className="hud-label">SAMPLE RATE</span>
              <div className="hud-val">1,000 Hz</div>
            </div>
            <div className="hud-divider" />
            <div className="hud-metric-item">
              <span className="hud-label">LATENCY</span>
              <div className="hud-val cyan-glow">&lt; 1.2 ms</div>
            </div>
            <div className="hud-divider" />
            <div className="hud-metric-item">
              <span className="hud-label">VO2 ACCURACY</span>
              <div className="hud-val">99.4%</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE LOAD & STRAIN CALCULATOR */}
      <section id="telemetry" className="pulse-section">
        <div className="section-header-centered">
          <div className="cyber-pill-tag">
            <Gauge size={12} color="#00f0ff" />
            <span>SIMULATION ENGINE</span>
          </div>
          <h2 className="section-headline-bold">Real-Time Strain & Caloric Modeler</h2>
          <p className="section-sub-muted">
            Drag the target power threshold to calculate physiological strain index, estimated cardiovascular zone, and metabolic caloric expenditure in real-time.
          </p>
        </div>

        <div className="telemetry-calculator-card">
          <div className="calc-slider-col">
            <div className="slider-header-flex">
              <span className="slider-title">Target Threshold Power Output</span>
              <strong className="slider-watts-readout">{targetWatts} WATTS</strong>
            </div>

            <input 
              type="range" 
              min="100" 
              max="550" 
              value={targetWatts} 
              onChange={(e) => setTargetWatts(Number(e.target.value))}
              className="cyan-range-bar"
            />

            <div className="zone-indicator-bar">
              <span className={targetWatts < 180 ? 'zone-pill active-z' : 'zone-pill'}>Z1 Recovery</span>
              <span className={targetWatts >= 180 && targetWatts < 260 ? 'zone-pill active-z' : 'zone-pill'}>Z2 Aerobic Base</span>
              <span className={targetWatts >= 260 && targetWatts < 340 ? 'zone-pill active-z' : 'zone-pill'}>Z3 Tempo</span>
              <span className={targetWatts >= 340 && targetWatts < 420 ? 'zone-pill active-z' : 'zone-pill'}>Z4 Threshold</span>
              <span className={targetWatts >= 420 ? 'zone-pill active-z' : 'zone-pill'}>Z5 Anaerobic Max</span>
            </div>
          </div>

          <div className="calc-metrics-grid">
            <div className="metric-box">
              <div className="metric-icon-wrap" style={{ background: 'rgba(255, 51, 102, 0.15)', color: '#ff3366' }}>
                <Heart size={20} />
              </div>
              <div>
                <span className="m-label">ESTIMATED HEART RATE</span>
                <h3 className="m-val">{heartRateEst} <small>BPM</small></h3>
              </div>
            </div>

            <div className="metric-box">
              <div className="metric-icon-wrap" style={{ background: 'rgba(0, 240, 255, 0.15)', color: '#00f0ff' }}>
                <Zap size={20} />
              </div>
              <div>
                <span className="m-label">ESTIMATED CALORIC BURN</span>
                <h3 className="m-val">{burnRate} <small>KCAL / HR</small></h3>
              </div>
            </div>

            <div className="metric-box">
              <div className="metric-icon-wrap" style={{ background: 'rgba(0, 255, 136, 0.15)', color: '#00ff88' }}>
                <Activity size={20} />
              </div>
              <div>
                <span className="m-label">NEURO-MUSCULAR STRAIN</span>
                <h3 className="m-val">{strainIndex} <small>/ 10.0</small></h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HARDWARE ROSTER */}
      <section id="equipment" className="pulse-section">
        <div className="section-header-centered">
          <div className="cyber-pill-tag">
            <Dumbbell size={12} color="#00f0ff" />
            <span>CONNECTED HARDWARE</span>
          </div>
          <h2 className="section-headline-bold">The Kinetic Hardware Roster</h2>
          <p className="section-sub-muted">
            Commercial-grade electromagnetic resistance stations engineered with sub-millisecond telemetry capture.
          </p>
        </div>

        <div className="hardware-cards-grid">
          {EQUIPMENT_ROSTER.map((item) => (
            <div key={item.id} className="hardware-item-card">
              <div className="hardware-img-wrapper">
                <img src={item.image} alt={item.name} className="hardware-thumb-img" />
                <span className="hardware-metric-pill">{item.metric}</span>
              </div>

              <div className="hardware-card-body">
                <span className="hw-category">{item.category}</span>
                <h3 className="hw-name">{item.name}</h3>
                <p className="hw-desc">{item.features}</p>

                <div className="hw-footer">
                  <span className="hw-price">${item.price.toLocaleString()}.00</span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="btn-reserve-hw"
                    title={`Reserve ${item.name}`}
                  >
                    <span>Reserve Station</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FLAGSHIP STUDIOS */}
      <section id="studios" className="pulse-section">
        <div className="section-header-centered">
          <div className="cyber-pill-tag">
            <Compass size={12} color="#00f0ff" />
            <span>GLOBAL HUBS</span>
          </div>
          <h2 className="section-headline-bold">Flagship Performance Studios</h2>
          <p className="section-sub-muted">
            Experience our full biometric suite with dedicated sports science coaches and recovery chambers.
          </p>
        </div>

        <div className="studios-grid">
          {FLAGSHIP_STUDIOS.map((studio, idx) => (
            <div key={idx} className="studio-card">
              <div className="studio-icon-top">
                <MapPin size={24} color="#00f0ff" />
              </div>
              <h3 className="studio-city">{studio.city}</h3>
              <h4 className="studio-loc">{studio.location}</h4>
              <p className="studio-addr">{studio.address}</p>
              <div className="studio-divider" />
              <p className="studio-cap">{studio.capacity}</p>
              <button 
                onClick={() => {
                  showToast(`Viewing session slots for ${studio.location}`);
                  setIsPassModalOpen(true);
                }}
                className="btn-studio-book"
              >
                <span>Book Studio Slot</span>
                <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 6. MEMBERSHIP TIERS */}
      <section id="membership" className="pulse-section">
        <div className="section-header-centered">
          <div className="cyber-pill-tag">
            <Trophy size={12} color="#00f0ff" />
            <span>ALL-ACCESS TIERS</span>
          </div>
          <h2 className="section-headline-bold">Kinetic Athlete Memberships</h2>
        </div>

        <div className="membership-grid">
          <div className="membership-card">
            <h3 className="tier-name">Kinetic Core</h3>
            <div className="tier-price">$240 <span>/ month</span></div>
            <p className="tier-desc">Full access to telemetry hardware & live bio-metric tracking app.</p>
            <ul className="tier-perks">
              <li><Check size={14} color="#00f0ff" /> Unlimited Studio Access</li>
              <li><Check size={14} color="#00f0ff" /> Real-time 1,000Hz Strain Sampling</li>
              <li><Check size={14} color="#00f0ff" /> Mobile Bio-Telemetry Dashboard</li>
            </ul>
            <button onClick={() => setIsPassModalOpen(true)} className="btn-glass-secondary full-width">
              Select Tier
            </button>
          </div>

          <div className="membership-card featured-tier">
            <div className="featured-badge">MOST POPULAR</div>
            <h3 className="tier-name">Apex Pro Athlete</h3>
            <div className="tier-price">$480 <span>/ month</span></div>
            <p className="tier-desc">Complete kinetic optimization with 1-on-1 sports scientist periodization.</p>
            <ul className="tier-perks">
              <li><Check size={14} color="#00f0ff" /> All Core Tier Inclusions</li>
              <li><Check size={14} color="#00f0ff" /> Weekly AI Periodization Calibration</li>
              <li><Check size={14} color="#00f0ff" /> Unlimited IsoPod Bio-Chamber Recovery</li>
              <li><Check size={14} color="#00f0ff" /> Global Multi-Studio Reciprocal Access</li>
            </ul>
            <button onClick={() => setIsPassModalOpen(true)} className="btn-cyan-primary full-width">
              Join Apex Pro
            </button>
          </div>
        </div>
      </section>

      {/* 7. PASS EVALUATION MODAL */}
      {isPassModalOpen && (
        <div className="pulse-modal-backdrop" onClick={() => setIsPassModalOpen(false)}>
          <div className="pulse-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-top">
              <div>
                <span className="cyber-pill-tag" style={{ marginBottom: 6 }}>BIOMETRIC PASS</span>
                <h3 className="modal-title-bold">Book Initial Kinetic Assessment</h3>
              </div>
              <button className="modal-close-icon" onClick={() => setIsPassModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-form-content">
              <div className="form-group-p">
                <label>Athlete Full Name</label>
                <input type="text" placeholder="e.g. Alexander Cross" className="pulse-input" defaultValue="Alexander Cross" />
              </div>

              <div className="form-group-p">
                <label>Direct Email Address</label>
                <input type="email" placeholder="alexander@kinetic.io" className="pulse-input" defaultValue="alexander@kinetic.io" />
              </div>

              <div className="form-group-p">
                <label>Primary Conditioning Objective</label>
                <select className="pulse-select">
                  <option>VO2 Max Aerobic Capacity Escalation</option>
                  <option>Explosive Rate of Force Development (RFD)</option>
                  <option>Neuro-Muscular Recovery & Asymmetry Correction</option>
                  <option>Pro Athlete Competition Periodization</option>
                </select>
              </div>

              <button 
                onClick={() => {
                  showToast('Assessment booked! Your kinetic profile has been initialized.');
                  setIsPassModalOpen(false);
                }}
                className="btn-cyan-primary full-width" 
                style={{ padding: '16px', marginTop: 16 }}
              >
                <span>Confirm Studio Evaluation Pass</span>
                <Check size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. FUTURISTIC FOOTER */}
      <footer className="pulse-footer">
        <div className="footer-flex-wrap">
          <div>
            <div className="footer-logo-lockup">
              <Activity size={20} color="#00f0ff" />
              <span className="brand-pulse-title">PULSEFORM</span>
            </div>
            <p className="footer-desc">
              Connected kinetic telemetry, electromagnetic periodization, and neuro-muscular strain calculation for peak human output.
            </p>
          </div>

          <div className="footer-col-p">
            <h4>Flagship Studios</h4>
            <p>Tribeca • Manhattan, NY<br />Mayfair • London, UK<br />Roppongi • Tokyo, JP</p>
          </div>

          <div className="footer-col-p">
            <h4>Bio-Telemetry Inquiries</h4>
            <p><Mail size={13} className="inline-icon" /> lab@pulseform.fit<br /><Phone size={13} className="inline-icon" /> +1 (800) 785-7336</p>
          </div>
        </div>

        <div className="footer-bottom-copyright">
          <span>© 2026 PULSEFORM KINETICS INC. ALL RIGHTS RESERVED.</span>
          <span>SYSTEM LATENCY: 1.1ms • OPERATIONAL</span>
        </div>
      </footer>

    </div>
  );
}
