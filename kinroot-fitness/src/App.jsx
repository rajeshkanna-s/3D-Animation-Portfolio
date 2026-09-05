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
  Sunset, 
  Sparkles, 
  X, 
  Check, 
  Award,
  ChevronRight,
  Flame,
  Clock,
  Calendar
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

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeLiveSync, setActiveLiveSync] = useState(SCHEDULE_ITEMS[0]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const openProgramModal = (title, subtitle, diff, cat, desc) => {
    setSelectedProgram({ title, subtitle, diff, cat, desc });
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
        <a href="#" className="kinroot-logo">KINROOT</a>

        <nav className="kinroot-nav-links">
          <a href="#programs" className="kinroot-nav-item active">PROGRAMS</a>
          <a href="#coaching" className="kinroot-nav-item" onClick={(e) => { e.preventDefault(); showToast('Opening Kinroot Elite Coaching Portal'); }}>COACHING</a>
          <a href="#spaces" className="kinroot-nav-item" onClick={(e) => { e.preventDefault(); showToast('Exploring Biophilic Training Spaces'); }}>SPACES</a>
          <a href="#membership" className="kinroot-nav-item" onClick={(e) => { e.preventDefault(); showToast('Viewing Kinroot Global Membership Tiers'); }}>MEMBERSHIP</a>
          <a href="#journal" className="kinroot-nav-item" onClick={(e) => { e.preventDefault(); showToast('Opening Kinroot Science Journal'); }}>JOURNAL</a>
        </nav>

        <div className="kinroot-nav-actions">
          <button className="nav-action-circle-btn" title="Account" onClick={() => showToast('Opening Athlete Profile & Biometrics')}>
            <User style={{ width: 16, height: 16 }} />
          </button>
          <button className="nav-action-circle-btn" title="Menu" onClick={() => showToast('Opening System Navigation Menu')}>
            <Menu style={{ width: 16, height: 16 }} />
          </button>
        </div>
      </header>

      {/* 2. HERO STAGE WITH INTEGRATED 3D KETTLEBELL & PORTAL BACKDROP */}
      <section className="kinroot-hero-stage">
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

          {/* Category Filter Pills Strip */}
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

        {/* 3D Kettlebell & Fluid Ribbon Stage Graphic */}
        <div className="hero-art-showcase">
          <div className="hero-art-img-wrapper">
            <img 
              src="/hero-adaptive.jpg" 
              alt="Kinroot Biophilic Stone Portal, Kettlebell & Glass Ribbon" 
              className="hero-art-full-img"
            />
            <div className="hero-art-ambient-vignette" />
          </div>
        </div>
      </section>

      {/* 3. DASHBOARD CARDS GRID (EXACT 1:1 TO REFERENCE) */}
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
            <div className="card-portal-art-backdrop" style={{ backgroundImage: `url('/kinroot-slide2.jpg')` }} />
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
            <div className="card-portal-art-backdrop" style={{ backgroundImage: `url('/kinroot-slide3.jpg')` }} />
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
            <div className="card-portal-art-backdrop" style={{ backgroundImage: `url('/kinroot-slide4.jpg')` }} />
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

      {/* 4. FLOATING BOTTOM LIVE SYNC CARD (EXACT 1:1 TO REFERENCE) */}
      <aside className="kinroot-floating-live-sync-banner">
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
      </aside>

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
                  showToast(`Enrolled in ${selectedProgram.title}! Added to your active roster.`);
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
              <img src="/kinroot-slide5.jpg" alt="Adaptive Training Architecture" className="video-backdrop-img" />
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

    </div>
  );
}
