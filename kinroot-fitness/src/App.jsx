import React, { useState } from 'react';
import { 
  User, 
  Menu, 
  ArrowUpRight, 
  Play, 
  Dumbbell, 
  Activity, 
  Waves, 
  Target, 
  Brain, 
  LayoutGrid, 
  Sun, 
  Moon, 
  Sparkles, 
  X, 
  Check, 
  Award,
  ChevronRight,
  Flame,
  Clock,
  Calendar,
  Compass,
  Heart,
  Shield,
  Zap,
  MapPin,
  TrendingUp,
  Sliders,
  Maximize2,
  Minimize2
} from 'lucide-react';
import confetti from 'canvas-confetti';

const CATEGORIES = [
  { id: 'all', label: 'All Programs', icon: LayoutGrid },
  { id: 'strength', label: 'Strength', icon: Dumbbell },
  { id: 'mobility', label: 'Mobility', icon: Activity },
  { id: 'endurance', label: 'Endurance', icon: Waves },
  { id: 'recovery', label: 'Recovery', icon: Target },
  { id: 'mindset', label: 'Mindset', icon: Brain }
];

const SCHEDULE_ITEMS = [
  { time: '07:00 AM', name: 'Breath & Reset', cat: 'Mobility', icon: Sun, color: '#c4f274', coach: 'Coach Maya Lin', duration: '20 mins diaphragmatic flow' },
  { time: '12:30 PM', name: 'Strength Interval', cat: 'Strength', icon: Sun, color: '#fbbf24', coach: 'Coach Marcus Vance', duration: '45 mins explosive power' },
  { time: '05:30 PM', name: 'Terrain Endurance', cat: 'Endurance', icon: Moon, color: '#93c5fd', coach: 'Coach Elena Rostova', duration: '50 mins VO2 max tempo' }
];

const COACHES = [
  {
    name: 'Marcus Vance',
    role: 'Head of Biomechanics',
    specialty: 'High-Velocity Eccentric Loading & Kinetic Power',
    rating: '5.0 (340+ athletes)',
    image: './kinroot-slide2.jpg',
    cert: 'CSCS · Olympic Strength Specialist'
  },
  {
    name: 'Maya Lin',
    role: 'Fascial & Breath Director',
    specialty: 'Thoracic Mobility & Autonomic Nervous Regulation',
    rating: '4.9 (480+ athletes)',
    image: './kinroot-slide3.jpg',
    cert: 'FRCms · Diaphragmatic Mechanics'
  },
  {
    name: 'Elena Rostova',
    role: 'Altitude & VO2 Specialist',
    specialty: 'Zone 2 Mitochondrial Density & Terrain Adaptation',
    rating: '5.0 (290+ athletes)',
    image: './kinroot-slide4.jpg',
    cert: 'EXOS · Endurance Physiology'
  }
];

const SPACES = [
  {
    title: 'The Monolith Boulder Room',
    desc: '3D volcanic stone monoliths with ambient oxygen-enriched air and biomechanically calibrated grip surfaces.',
    tag: 'Natural Grip Dynamics',
    bg: './hero-adaptive.jpg'
  },
  {
    title: 'Hydro-Recovery Thermal Chamber',
    desc: 'Contrast therapy pool suite, infused mineral baths, and far-infrared sound resonance loungers.',
    tag: 'Cellular Restoration',
    bg: './kinroot-slide5.jpg'
  },
  {
    title: 'Kinetic Terrain Sanctuary',
    desc: 'Undulating turf, gradient timber tracks, and zero-gravity pneumatic resistance stations.',
    tag: 'Multi-Planar Grounding',
    bg: './kinroot-slide3.jpg'
  }
];

const MEMBERSHIP_TIERS = [
  {
    name: 'Foundational Flow',
    price: '$85',
    period: '/ month',
    desc: 'Essential adaptive training protocols and on-demand movement flows.',
    features: [
      'Full access to all 30+ Adaptive Programs',
      'Daily 07:00 AM live stream flows',
      'Kinroot telemetry & strain sync app',
      'Standard community access'
    ],
    popular: false,
    cta: 'Select Foundational'
  },
  {
    name: 'Kinetic Pro',
    price: '$180',
    period: '/ month',
    desc: 'Complete holistic performance system with live coach feedback and biometrics.',
    features: [
      'All Foundational benefits included',
      'Bi-weekly 1-on-1 Biomechanics coaching check-in',
      'Unlimited access to all studio broadcasts',
      'Personalized load & HRV recovery periodization',
      'Priority booking for Sanctuary physical spaces'
    ],
    popular: true,
    cta: 'Start Pro Experience'
  },
  {
    name: 'Sanctuary Residency',
    price: '$350',
    period: '/ month',
    desc: 'The pinnacle of personalized kinetic wellness and physical studio sanctuary access.',
    features: [
      'All Pro tier privileges included',
      'Unlimited physical sanctuary studio access',
      'Hydro-recovery thermal chamber access',
      'Custom bespoke movement protocol design',
      'Dedicated elite movement specialist'
    ],
    popular: false,
    cta: 'Apply for Residency'
  }
];

const JOURNAL_POSTS = [
  {
    title: 'Diaphragmatic Expansion & Autonomic Nervous Reset',
    cat: 'Respiratory Science',
    readTime: '6 min read',
    snippet: 'How 20 minutes of multi-dimensional ribcage expansion downregulates sympathetic stress and accelerates fascial recovery.'
  },
  {
    title: 'Eccentric Velocity Loading in Multi-Planar Movement',
    cat: 'Biomechanics',
    readTime: '8 min read',
    snippet: 'Why controlled deceleration across spiral vectors produces greater tendon stiffness and prevents chronic overuse injuries.'
  },
  {
    title: 'Circadian Hormesis & Temperature Modulation',
    cat: 'Cellular Health',
    readTime: '5 min read',
    snippet: 'Synchronizing high-intensity mechanical output with optimal core body temperature curves for peak mitochondrial output.'
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [isLiveSyncMinimized, setIsLiveSyncMinimized] = useState(false);
  const [isLiveSyncHidden, setIsLiveSyncHidden] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeLiveSync, setActiveLiveSync] = useState(SCHEDULE_ITEMS[0]);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const openProgramModal = (title, subtitle, diff, cat, desc) => {
    setSelectedProgram({ title, subtitle, diff, cat, desc });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    confetti({ particleCount: 40, spread: 60 });
    showToast('Subscribed to Kinroot Biomechanics Journal!');
    setNewsletterEmail('');
  };

  return (
    <div className="kinroot-full-experience">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="kinroot-toast">
          <Sparkles style={{ width: 15, height: 15, color: '#c4f274' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. TOP NAVIGATION */}
      <header className="kinroot-nav-header">
        <a href="#" className="kinroot-logo">
          <span className="logo-text">KINROOT</span>
          <span className="logo-dot" />
        </a>

        <nav className="kinroot-nav-links">
          <a href="#programs" className="kinroot-nav-item active">PROGRAMS</a>
          <a href="#coaching" className="kinroot-nav-item">COACHING</a>
          <a href="#spaces" className="kinroot-nav-item">SPACES</a>
          <a href="#membership" className="kinroot-nav-item">MEMBERSHIP</a>
          <a href="#journal" className="kinroot-nav-item">JOURNAL</a>
        </nav>

        <div className="kinroot-nav-actions">
          <button 
            className="nav-action-circle-btn" 
            title="Athlete Profile" 
            onClick={() => setIsAccountModalOpen(true)}
          >
            <User style={{ width: 16, height: 16 }} />
          </button>
          <button 
            className="nav-action-circle-btn" 
            title="Navigation Menu" 
            onClick={() => setIsMenuDrawerOpen(true)}
          >
            <Menu style={{ width: 16, height: 16 }} />
          </button>
        </div>
      </header>

      {/* 2. HERO STAGE WITH INTEGRATED 3D KETTLEBELL & PORTAL BACKDROP */}
      <section className="kinroot-hero-stage" id="hero">
        <div className="hero-atmosphere-backdrop" />
        
        <div className="hero-text-content">
          {/* Kinetic Wave Icon */}
          <div className="kinetic-wave-flourish">
            <svg width="44" height="14" viewBox="0 0 44 14" fill="none">
              <path d="M1 7C5 3 9 3 13 7C17 11 21 11 25 7C29 3 33 3 37 7C41 11 43 11 43 11" stroke="#c4f274" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M1 3C5 -1 9 -1 13 3C17 7 21 7 25 3C29 -1 33 -1 37 3C41 7 43 7 43 7" stroke="#d2ded5" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round"/>
            </svg>
          </div>

          <h1 className="hero-headline">
            <span className="title-row-white">ADAPTIVE</span>
            <span className="title-row-sage">PROGRAMS</span>
          </h1>

          <p className="hero-subtext">
            Science-backed training that adapts to you—your body, your environment, and your goals.
          </p>

          <div className="hero-cta-buttons">
            <button 
              onClick={() => {
                setIsAssessmentOpen(true);
                showToast('Starting Adaptive Fitness Assessment');
              }} 
              className="btn-find-program"
            >
              <span>Find Your Program</span>
              <ArrowUpRight style={{ width: 16, height: 16 }} />
            </button>

            <button 
              onClick={() => {
                setIsVideoModalOpen(true);
                showToast('Playing Adaptive Bio-Feedback Method');
              }} 
              className="btn-how-it-works"
            >
              <span>How It Works</span>
              <div className="play-icon-circle">
                <Play style={{ width: 9, height: 9, fill: 'currentColor' }} />
              </div>
            </button>
          </div>

          {/* Category Filter Pills Strip (Full Row Desktop Fit) */}
          <div className="category-filters-container">
            <div className="category-filters-row">
              {CATEGORIES.map((cat) => {
                const IconComp = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      showToast(`Filtered by ${cat.label}`);
                    }}
                    className={`cat-pill-button ${isActive ? 'active' : ''}`}
                  >
                    <IconComp style={{ width: 14, height: 14 }} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3D Kettlebell & Fluid Ribbon Stage Graphic */}
        <div className="hero-art-showcase">
          <div className="hero-art-img-wrapper">
            <img 
              src="./hero-adaptive.jpg" 
              alt="Kinroot Biophilic Stone Portal, Kettlebell & Glass Ribbon" 
              className="hero-art-full-img"
            />
            <div className="hero-art-ambient-vignette" />
          </div>
        </div>
      </section>

      {/* 3. DASHBOARD CARDS GRID (PROGRAMS SECTION) */}
      <section className="kinroot-dashboard-grid" id="programs">
        
        {/* ROW 1: FEATURED PROGRAM (HYBRID STRENGTH) + TODAY'S SCHEDULE */}
        <div className="dashboard-row-split">
          
          {/* Card 1: Featured Program (Hybrid Strength) */}
          <div 
            className="kinroot-card featured-program-card"
            onClick={() => openProgramModal(
              'Hybrid Strength',
              'Build strength. Move better. Perform anywhere.',
              'Advanced',
              'Strength & Mobility',
              'A high-potency functional strength system uniting heavy eccentric loading with multi-planar joint mobility and explosive kinetic power.'
            )}
          >
            <div className="card-portal-art-backdrop" style={{ backgroundImage: `url('./kinroot-slide2.jpg')` }} />
            <div className="card-content-side">
              <div className="card-eyebrow-tag">FEATURED PROGRAM</div>
              <h2 className="card-title-heavy">Hybrid<br />Strength</h2>
              <p className="card-desc-text">
                Build strength. Move better.<br />Perform anywhere.
              </p>

              <div className="card-meta-badges">
                <span className="meta-badge-item">
                  <Dumbbell style={{ width: 14, height: 14, color: '#c4f274' }} />
                  <span>STRENGTH</span>
                </span>
                <span className="meta-badge-item">
                  <Activity style={{ width: 14, height: 14, color: '#c4f274' }} />
                  <span>MOBILITY</span>
                </span>
              </div>

              <div className="card-difficulty-level">
                <span className="diff-label">DIFFICULTY</span>
                <span className="diff-value">Advanced</span>
                <div className="diff-dots-indicator">
                  <span className="dot active" />
                  <span className="dot active" />
                  <span className="dot active" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            </div>

            <button className="card-top-right-arrow" title="View Hybrid Strength Program">
              <ArrowUpRight style={{ width: 18, height: 18 }} />
            </button>
          </div>

          {/* Card 2: Today's Schedule */}
          <div className="kinroot-card schedule-card">
            <div className="schedule-card-header">
              <div>
                <div className="card-eyebrow-tag">UP NEXT</div>
                <h3 className="schedule-card-title">Today's Schedule</h3>
              </div>
              <button 
                className="see-full-calendar-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsScheduleModalOpen(true);
                  showToast('Opening Full Weekly Training Calendar');
                }}
              >
                <span>See full calendar</span>
                <ArrowUpRight style={{ width: 13, height: 13 }} />
              </button>
            </div>

            <div className="schedule-items-list">
              {SCHEDULE_ITEMS.map((item, index) => {
                const IconComponent = item.icon;
                const isSelected = activeLiveSync.name === item.name;
                return (
                  <div 
                    key={index} 
                    className={`schedule-row-item ${isSelected ? 'active-sync-target' : ''}`}
                    onClick={() => {
                      setActiveLiveSync(item);
                      showToast(`Synced "${item.name}" to Live Bar`);
                    }}
                  >
                    <div className="schedule-row-left">
                      <IconComponent style={{ width: 16, height: 16, color: item.color }} />
                      <span className="schedule-timestamp">{item.time}</span>
                      <span className="schedule-program-name">{item.name}</span>
                    </div>
                    <span className="schedule-category-badge">{item.cat}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ROW 2: BREATH MOBILITY + ENDURANCE TERRAIN */}
        <div className="dashboard-row-equal">
          
          {/* Card 3: Breath Mobility */}
          <div 
            className="kinroot-card secondary-program-card"
            onClick={() => openProgramModal(
              'Breath Mobility',
              'Release tension. Expand capacity. Move with ease.',
              'All Levels',
              'Mobility & Recovery',
              'Integrates diaphragmatic tempo mechanics, thoracic decompressive spirals, and fascial kinetic unwinding to dissolve deep structural stiffness.'
            )}
          >
            <div className="card-portal-art-backdrop" style={{ backgroundImage: `url('./kinroot-slide3.jpg')` }} />
            <div className="card-content-side">
              <h3 className="card-title-heavy medium">Breath<br />Mobility</h3>
              <p className="card-desc-text">
                Release tension.<br />Expand capacity.<br />Move with ease.
              </p>

              <div className="card-meta-badges">
                <span className="meta-badge-item">
                  <Activity style={{ width: 14, height: 14, color: '#c4f274' }} />
                  <span>MOBILITY</span>
                </span>
              </div>

              <div className="card-difficulty-level">
                <span className="diff-label">DIFFICULTY</span>
                <span className="diff-value">All Levels</span>
                <div className="diff-dots-indicator">
                  <span className="dot active" />
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            </div>

            <button className="card-top-right-arrow" title="View Breath Mobility Program">
              <ArrowUpRight style={{ width: 16, height: 16 }} />
            </button>
          </div>

          {/* Card 4: Endurance Terrain */}
          <div 
            className="kinroot-card secondary-program-card"
            onClick={() => openProgramModal(
              'Endurance Terrain',
              'Build stamina. Adapt to any environment.',
              'Advanced',
              'Endurance & Conditioning',
              'Zone 2 cardiovascular base building fused with undulating outdoor gradient simulations and mitochondrial density conditioning.'
            )}
          >
            <div className="card-portal-art-backdrop" style={{ backgroundImage: `url('./kinroot-slide4.jpg')` }} />
            <div className="card-content-side">
              <h3 className="card-title-heavy medium">Endurance<br />Terrain</h3>
              <p className="card-desc-text">
                Build stamina.<br />Adapt to any environment.
              </p>

              <div className="card-meta-badges">
                <span className="meta-badge-item">
                  <Waves style={{ width: 14, height: 14, color: '#c4f274' }} />
                  <span>ENDURANCE</span>
                </span>
              </div>

              <div className="card-difficulty-level">
                <span className="diff-label">DIFFICULTY</span>
                <span className="diff-value">Advanced</span>
                <div className="diff-dots-indicator">
                  <span className="dot active" />
                  <span className="dot active" />
                  <span className="dot active" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            </div>

            <button className="card-top-right-arrow" title="View Endurance Terrain Program">
              <ArrowUpRight style={{ width: 16, height: 16 }} />
            </button>
          </div>

        </div>

      </section>

      {/* 4. COACHING SECTION */}
      <section className="kinroot-section-block" id="coaching">
        <div className="section-header-wrap">
          <div className="section-tag-pill">ELITE MOVEMENT SPECIALISTS</div>
          <h2 className="section-heading-lg">Coaching & Biomechanics</h2>
          <p className="section-desc-muted">
            Direct 1-on-1 guidance from world-class movement directors and biomechanical physiologists.
          </p>
        </div>

        <div className="coaches-grid">
          {COACHES.map((coach, idx) => (
            <div key={idx} className="coach-card">
              <div className="coach-img-wrapper">
                <img src={coach.image} alt={coach.name} className="coach-img" />
                <div className="coach-cert-badge">{coach.cert}</div>
              </div>
              <div className="coach-card-body">
                <div className="coach-role">{coach.role}</div>
                <h3 className="coach-name">{coach.name}</h3>
                <p className="coach-specialty">{coach.specialty}</p>
                <div className="coach-rating-row">
                  <Award style={{ width: 14, height: 14, color: '#c4f274' }} />
                  <span>{coach.rating}</span>
                </div>
                <button 
                  className="btn-coach-consult"
                  onClick={() => {
                    confetti({ particleCount: 30, spread: 50 });
                    showToast(`Consultation requested with ${coach.name}`);
                  }}
                >
                  <span>Book Consultation</span>
                  <ArrowUpRight style={{ width: 14, height: 14 }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BIOPHILIC SPACES SECTION */}
      <section className="kinroot-section-block" id="spaces">
        <div className="section-header-wrap">
          <div className="section-tag-pill">SANCTUARY ARCHITECTURE</div>
          <h2 className="section-heading-lg">Biophilic Training Spaces</h2>
          <p className="section-desc-muted">
            Crafted with natural basalt, living botanical oxygen walls, and low-EMF acoustic dampening.
          </p>
        </div>

        <div className="spaces-showcase-grid">
          {SPACES.map((space, idx) => (
            <div key={idx} className="space-feature-card">
              <div className="space-card-img-wrap">
                <img src={space.bg} alt={space.title} className="space-img" />
                <span className="space-tag-badge">{space.tag}</span>
              </div>
              <div className="space-card-info">
                <h3 className="space-card-title">{space.title}</h3>
                <p className="space-card-desc">{space.desc}</p>
                <button 
                  className="space-explore-btn"
                  onClick={() => showToast(`Opening 3D Spatial Tour for ${space.title}`)}
                >
                  <span>Explore Virtual Chamber</span>
                  <ChevronRight style={{ width: 15, height: 15, color: '#c4f274' }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. MEMBERSHIP TIERS SECTION */}
      <section className="kinroot-section-block" id="membership">
        <div className="section-header-wrap">
          <div className="section-tag-pill">MEMBERSHIP ACCESS</div>
          <h2 className="section-heading-lg">Commit To Your Evolution</h2>
          <p className="section-desc-muted">
            Flexible adaptive memberships designed for lifelong functional resilience.
          </p>
        </div>

        <div className="membership-tiers-grid">
          {MEMBERSHIP_TIERS.map((tier, idx) => (
            <div key={idx} className={`tier-card ${tier.popular ? 'popular-glow' : ''}`}>
              {tier.popular && <div className="tier-popular-badge">MOST POPULAR</div>}
              <div className="tier-head">
                <h3 className="tier-name">{tier.name}</h3>
                <div className="tier-price-wrap">
                  <span className="tier-amount">{tier.price}</span>
                  <span className="tier-period">{tier.period}</span>
                </div>
                <p className="tier-desc">{tier.desc}</p>
              </div>

              <div className="tier-features-list">
                {tier.features.map((feat, fIdx) => (
                  <div key={fIdx} className="tier-feature-item">
                    <Check style={{ width: 16, height: 16, color: '#c4f274', flexShrink: 0 }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button 
                className={`btn-tier-cta ${tier.popular ? 'btn-tier-primary' : 'btn-tier-secondary'}`}
                onClick={() => {
                  confetti({ particleCount: 50, spread: 70 });
                  showToast(`Selected ${tier.name}! Redirecting to member onboarding.`);
                }}
              >
                <span>{tier.cta}</span>
                <ArrowUpRight style={{ width: 16, height: 16 }} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 7. SCIENCE JOURNAL SECTION */}
      <section className="kinroot-section-block" id="journal">
        <div className="section-header-wrap">
          <div className="section-tag-pill">RESEARCH & PROTOCOLS</div>
          <h2 className="section-heading-lg">The Science Journal</h2>
          <p className="section-desc-muted">
            Peer-reviewed articles, strain diagnostics, and hormonal periodization insights.
          </p>
        </div>

        <div className="journal-articles-grid">
          {JOURNAL_POSTS.map((post, idx) => (
            <article 
              key={idx} 
              className="journal-article-card"
              onClick={() => showToast(`Opening article: "${post.title}"`)}
            >
              <div className="journal-meta-row">
                <span className="journal-cat">{post.cat}</span>
                <span className="journal-time">{post.readTime}</span>
              </div>
              <h3 className="journal-title">{post.title}</h3>
              <p className="journal-snippet">{post.snippet}</p>
              <div className="journal-read-link">
                <span>Read Full Protocol</span>
                <ArrowUpRight style={{ width: 14, height: 14 }} />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 8. FOOTER COMPONENT */}
      <footer className="kinroot-footer">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <a href="#" className="footer-logo">KINROOT</a>
            <p className="footer-tagline">
              Adaptive Movement · Biophilic Architecture · High-Resilience Human Performance.
            </p>
            <div className="footer-metrics-badge">
              <Shield style={{ width: 14, height: 14, color: '#c4f274' }} />
              <span>Biometric Encrypted · ISO Kinetic Compliant</span>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>Programs</h4>
            <a href="#programs">Hybrid Strength</a>
            <a href="#programs">Breath Mobility</a>
            <a href="#programs">Endurance Terrain</a>
            <a href="#programs">Active Recovery</a>
          </div>

          <div className="footer-links-col">
            <h4>Ecosystem</h4>
            <a href="#coaching">Elite Coaches</a>
            <a href="#spaces">Training Sanctuaries</a>
            <a href="#membership">Membership Tiers</a>
            <a href="#journal">Research Journal</a>
          </div>

          <div className="footer-newsletter-col">
            <h4>Stay Synchronized</h4>
            <p>Receive weekly adaptive workout protocols and recovery insights.</p>
            <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
              <input 
                type="email" 
                placeholder="athlete@kinroot.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" className="footer-submit-btn">
                <span>Join</span>
                <ArrowUpRight style={{ width: 14, height: 14 }} />
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copy">© 2026 KINROOT ADAPTIVE PERFORMANCE INC. ALL RIGHTS RESERVED.</div>
          <div className="footer-legal-links">
            <a href="#" onClick={(e) => { e.preventDefault(); showToast('Privacy Policy'); }}>Privacy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); showToast('Telemetry Terms'); }}>Terms of Telemetry</a>
            <a href="#" onClick={(e) => { e.preventDefault(); showToast('Cookie Preferences'); }}>Cookie Preferences</a>
          </div>
        </div>
      </footer>

      {/* 9. FLOATING BOTTOM LIVE SYNC CARD (Adjustable & Minimizable) */}
      {!isLiveSyncHidden && (
        <aside className={`kinroot-floating-live-sync-banner ${isLiveSyncMinimized ? 'minimized' : ''}`}>
          {!isLiveSyncMinimized ? (
            <>
              <div className="live-sync-inner">
                <div className="live-sync-top-header">
                  <span className="sync-headline-green">UP NEXT TODAY</span>
                  <span className="sync-status-indicator">
                    <span className="pulse-beacon" />
                    <span>live sync</span>
                  </span>
                </div>

                <div className="sync-session-title">
                  <strong>{activeLiveSync.time}</strong> • {activeLiveSync.name} ({activeLiveSync.cat})
                </div>

                <div className="sync-coach-subtitle">
                  {activeLiveSync.coach} • {activeLiveSync.duration}
                </div>
              </div>

              <div className="live-sync-actions-group">
                <button 
                  className="sync-join-pill-btn"
                  onClick={() => {
                    confetti({
                      particleCount: 40,
                      spread: 65,
                      origin: { y: 0.9 },
                      colors: ['#c4f274', '#ffffff', '#8b9991']
                    });
                    showToast(`Joined live session: ${activeLiveSync.name}`);
                  }}
                >
                  <span>Join Live Flow</span>
                  <ArrowUpRight style={{ width: 14, height: 14 }} />
                </button>

                <div className="sync-window-controls">
                  <button 
                    className="sync-ctrl-icon-btn" 
                    title="Minimize live sync"
                    onClick={() => setIsLiveSyncMinimized(true)}
                  >
                    <Minimize2 style={{ width: 13, height: 13 }} />
                  </button>
                  <button 
                    className="sync-ctrl-icon-btn" 
                    title="Close live sync"
                    onClick={() => setIsLiveSyncHidden(true)}
                  >
                    <X style={{ width: 13, height: 13 }} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="live-sync-minimized-pill" onClick={() => setIsLiveSyncMinimized(false)}>
              <span className="pulse-beacon" />
              <span className="min-label"><strong>Live Flow:</strong> {activeLiveSync.name}</span>
              <Maximize2 style={{ width: 14, height: 14, color: '#c4f274' }} />
            </div>
          )}
        </aside>
      )}

      {/* MODAL: PROGRAM DETAILS */}
      {selectedProgram && (
        <div className="kinroot-modal-overlay" onClick={() => setSelectedProgram(null)}>
          <div className="kinroot-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top-bar">
              <div className="modal-category-tag">{selectedProgram.cat}</div>
              <button className="modal-close-btn" onClick={() => setSelectedProgram(null)}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <h2 className="modal-program-name">{selectedProgram.title}</h2>
            <p className="modal-program-sub">{selectedProgram.subtitle}</p>

            <div className="modal-details-callout">
              <p>{selectedProgram.desc}</p>
            </div>

            <div className="modal-actions-row">
              <button 
                className="btn-modal-enroll"
                onClick={() => {
                  confetti({ particleCount: 50, spread: 70 });
                  showToast(`Enrolled in ${selectedProgram.title}! Added to active roster.`);
                  setSelectedProgram(null);
                }}
              >
                <span>Enroll in Program</span>
                <ArrowUpRight style={{ width: 16, height: 16 }} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: VIDEO METHOD */}
      {isVideoModalOpen && (
        <div className="kinroot-modal-overlay" onClick={() => setIsVideoModalOpen(false)}>
          <div className="kinroot-modal-box video-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top-bar">
              <div className="modal-category-tag">BIOMECHANICAL ARCHITECTURE</div>
              <button className="modal-close-btn" onClick={() => setIsVideoModalOpen(false)}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <h2 className="modal-program-name">The Kinroot Adaptive Training Method</h2>
            <p className="modal-program-sub">Dynamic strain-to-recovery feedback loop calculation.</p>

            <div className="video-player-mockup">
              <img src="./kinroot-slide5.jpg" alt="Adaptive Training Architecture" className="video-backdrop-img" />
              <div className="video-play-center-btn" onClick={() => showToast('Playing 4K Adaptive Methodology Breakdown')}>
                <Play style={{ width: 28, height: 28, fill: '#0b0f0d', color: '#0b0f0d', marginLeft: 4 }} />
              </div>
            </div>

            <button className="btn-modal-enroll" style={{ width: '100%', marginTop: 20 }} onClick={() => setIsVideoModalOpen(false)}>
              <span>Close Video</span>
            </button>
          </div>
        </div>
      )}

      {/* MODAL: FULL SCHEDULE */}
      {isScheduleModalOpen && (
        <div className="kinroot-modal-overlay" onClick={() => setIsScheduleModalOpen(false)}>
          <div className="kinroot-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top-bar">
              <div className="modal-category-tag">WEEKLY FLOW</div>
              <button className="modal-close-btn" onClick={() => setIsScheduleModalOpen(false)}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <h2 className="modal-program-name">Full Master Schedule</h2>
            <p className="modal-program-sub">Live studio broadcasts & biometric synchronization.</p>

            <div className="weekly-schedule-grid">
              {SCHEDULE_ITEMS.map((item, idx) => (
                <div key={idx} className="weekly-schedule-card">
                  <div className="sched-badge-time">{item.time}</div>
                  <div className="sched-card-title">{item.name}</div>
                  <div className="sched-card-coach">{item.coach}</div>
                  <button className="sched-book-btn" onClick={() => {
                    showToast(`Reserved slot for ${item.name}`);
                    setIsScheduleModalOpen(false);
                  }}>
                    Book Session
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ASSESSMENT */}
      {isAssessmentOpen && (
        <div className="kinroot-modal-overlay" onClick={() => setIsAssessmentOpen(false)}>
          <div className="kinroot-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top-bar">
              <div className="modal-category-tag">INTELLIGENT DIAGNOSTIC</div>
              <button className="modal-close-btn" onClick={() => setIsAssessmentOpen(false)}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <h2 className="modal-program-name">Adaptive Program Matcher</h2>
            <p className="modal-program-sub">Select your primary physical objective to calculate load parameters.</p>

            <div className="assessment-choices-list">
              {[
                { title: 'Maximum Explosive Strength & Hypertrophy', rec: 'Hybrid Strength (4x / week)' },
                { title: 'Joint Decompression & Fascial Mobility', rec: 'Breath Mobility (Daily 20 mins)' },
                { title: 'Aerobic Power & Altitude Terrain Endurance', rec: 'Endurance Terrain (3x / week)' },
                { title: 'Full Spectrum Biophilic Conditioning', rec: 'Custom Adaptive Periodization' }
              ].map((opt, i) => (
                <button 
                  key={i} 
                  className="assessment-choice-button"
                  onClick={() => {
                    confetti({ particleCount: 35, spread: 60 });
                    showToast(`Calculated match: ${opt.rec}`);
                    setIsAssessmentOpen(false);
                  }}
                >
                  <div className="choice-title">{opt.title}</div>
                  <div className="choice-rec">{opt.rec}</div>
                  <ChevronRight style={{ width: 16, height: 16, color: '#c4f274' }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ATHLETE ACCOUNT & BIOMETRICS */}
      {isAccountModalOpen && (
        <div className="kinroot-modal-overlay" onClick={() => setIsAccountModalOpen(false)}>
          <div className="kinroot-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top-bar">
              <div className="modal-category-tag">ATHLETE TELEMETRY</div>
              <button className="modal-close-btn" onClick={() => setIsAccountModalOpen(false)}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <h2 className="modal-program-name">Athlete Diagnostic Profile</h2>
            <p className="modal-program-sub">Real-time physiological readiness and strain telemetry.</p>

            <div className="athlete-metrics-row">
              <div className="metric-stat-box">
                <div className="metric-num">94%</div>
                <div className="metric-lbl">Recovery Score</div>
              </div>
              <div className="metric-stat-box">
                <div className="metric-num">76 ms</div>
                <div className="metric-lbl">HRV Baseline</div>
              </div>
              <div className="metric-stat-box">
                <div className="metric-num">14.2</div>
                <div className="metric-lbl">Daily Strain</div>
              </div>
            </div>

            <div className="modal-details-callout" style={{ marginTop: 16 }}>
              <p><strong>Active Program:</strong> Hybrid Strength (Week 3 of 8 · Eccentric Overload Cycle)</p>
            </div>

            <button 
              className="btn-modal-enroll" 
              style={{ width: '100%', marginTop: 20 }}
              onClick={() => {
                showToast('Synchronized with Apple Health & Whoop 4.0');
                setIsAccountModalOpen(false);
              }}
            >
              <span>Sync Biometrics ↗</span>
            </button>
          </div>
        </div>
      )}

      {/* DRAWER: NAVIGATION MENU */}
      {isMenuDrawerOpen && (
        <div className="kinroot-modal-overlay" onClick={() => setIsMenuDrawerOpen(false)}>
          <div className="kinroot-drawer-box" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-logo">KINROOT</div>
              <button className="modal-close-btn" onClick={() => setIsMenuDrawerOpen(false)}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <div className="drawer-nav-list">
              <a href="#hero" onClick={() => setIsMenuDrawerOpen(false)}>Home & Adaptive Studio</a>
              <a href="#programs" onClick={() => setIsMenuDrawerOpen(false)}>Programs Library</a>
              <a href="#coaching" onClick={() => setIsMenuDrawerOpen(false)}>Biomechanics Coaching</a>
              <a href="#spaces" onClick={() => setIsMenuDrawerOpen(false)}>Biophilic Sanctuaries</a>
              <a href="#membership" onClick={() => setIsMenuDrawerOpen(false)}>Membership & Pricing</a>
              <a href="#journal" onClick={() => setIsMenuDrawerOpen(false)}>Science Research Journal</a>
            </div>

            <div className="drawer-footer-actions">
              <button 
                className="btn-find-program" 
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  setIsMenuDrawerOpen(false);
                  setIsAssessmentOpen(true);
                }}
              >
                <span>Take Diagnostic Assessment</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
