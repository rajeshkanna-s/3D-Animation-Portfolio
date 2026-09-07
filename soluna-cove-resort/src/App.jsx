import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CalendarBlank,
  CheckCircle,
  Heart,
  Leaf,
  List,
  MapPin,
  MoonStars,
  Sparkle,
  Star,
  SwimmingPool,
  Users,
  Waves,
  X,
} from "@phosphor-icons/react";

const nav = [["Stay", "#suites"], ["Experiences", "#experience"], ["Dining", "#story"], ["Gallery", "#gallery"], ["Contact", "#contact"]];

const suites = [
  { name: "Beachfront Suite", price: "From $650 / night", image: "/images/ocean-suite.png", note: "Two guests · Ocean terrace" },
  { name: "Cliffside Pool Villa", price: "From $950 / night", image: "/images/cliff-villa.png", note: "Four guests · Private infinity pool" },
  { name: "Horizon Penthouse", price: "From $1,250 / night", image: "/images/ocean-lounge.png", note: "Four guests · Butler service" },
];

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [booked, setBooked] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [savedSuites, setSavedSuites] = useState(() => {
    try { const saved = JSON.parse(localStorage.getItem('soluna-saved-suites') || '[]'); return Array.isArray(saved) ? saved.filter(name => suites.some(suite => suite.name === name)) : []; } catch { return []; }
  });
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const bookingDialog = useRef(null);
  const [selectedSuite, setSelectedSuite] = useState("Cliffside Pool Villa");
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!bookingOpen) return;
    setBooked('');
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    bookingDialog.current.showModal();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; trigger?.focus(); };
  }, [bookingOpen]);

  const toggleSaved = (name) => {
    const next = savedSuites.includes(name) ? savedSuites.filter(item => item !== name) : [...savedSuites, name];
    try {
      localStorage.setItem('soluna-saved-suites', JSON.stringify(next));
      setSavedSuites(next);
      setSaveStatus(`${name} ${next.includes(name) ? 'saved on this device' : 'removed from saved suites'}.`);
    } catch { setSaveStatus('Unable to save. Browser storage is unavailable.'); }
  };

  const submitNewsletter = (event) => {
    event.preventDefault();
    try {
      localStorage.setItem('soluna-newsletter-demo', new FormData(event.currentTarget).get('email'));
      setNewsletterStatus('Email saved on this device for this demo. You have not been subscribed; no emails will be sent.');
    } catch { setNewsletterStatus('Unable to save. Browser storage is unavailable.'); }
  };

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      document.documentElement.style.setProperty("--hero-y", String(Math.min(window.scrollY * 0.12, 90)) + "px");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
      { threshold: 0.14 },
    );
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const submitBooking = (event) => {
    event.preventDefault();
    if (!checkIn || checkIn < today || !checkOut || checkOut <= checkIn) {
      setBooked('Choose a future stay with check-out after check-in.');
      return;
    }
    if (selectedSuite === 'Beachfront Suite' && Number(guests) > 2) {
      setBooked('The Beachfront Suite accommodates up to two guests. Choose another suite or reduce the party size.');
      return;
    }
    try {
      localStorage.setItem('soluna-stay-demo', JSON.stringify({ selectedSuite, checkIn, checkOut, guests }));
      setBooked(`Saved on this device: ${selectedSuite}, ${checkIn} to ${checkOut}, ${guests} guests. This is a demo plan; no booking or availability check has been made.`);
    } catch { setBooked('Unable to save. Browser storage is unavailable.'); }
  };

  return (
    <main>
      <div className="progress" style={{ width: String(progress) + "%" }} />
      <header>
        <a className="logo" href="#top"><Waves size={27} weight="light" /><span>Soluna Cove</span></a>
        <nav>
          {nav.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <button className="primary small" type="button" onClick={() => setBookingOpen(true)}>Book your stay <ArrowRight /></button>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu" aria-expanded={menuOpen} aria-controls="mobile-navigation">{menuOpen ? <X /> : <List />}</button>
      </header>

      {menuOpen && (
        <div className="mobile-nav" id="mobile-navigation" onKeyDown={(event) => { if (event.key === 'Escape') { setMenuOpen(false); document.querySelector('.menu-toggle')?.focus(); } }}>
          {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <button type="button" onClick={() => { setMenuOpen(false); setBookingOpen(true); }}>Book your stay <ArrowRight /></button>
        </div>
      )}

      <section className="hero" id="top">
        <div className="hero-photo" />
        <div className="hero-content reveal">
          <p className="kicker">A private world by the sea</p>
          <h1>Escape into<br /><em>coastal luxury.</em></h1>
          <p>Oceanfront suites, curated experiences, and unforgettable stays shaped by sun and tide.</p>
          <div className="actions">
            <a className="primary" href="#suites">Explore suites <ArrowRight /></a>
            <a className="secondary" href="#experience">View experiences</a>
          </div>
        </div>
        <div className="hero-index"><span>01</span><i /><span>03</span></div>
      </section>

      <section className="trust-row">
        <div><Sparkle size={28} /><p><b>5-Star luxury</b><span>Boutique retreat</span></p></div>
        <div><Waves size={28} /><p><b>Oceanfront location</b><span>Private & peaceful</span></p></div>
        <div><Users size={28} /><p><b>4.9 / 5</b><span>Guest rating</span></p></div>
        <div><Leaf size={28} /><p><b>Conscious luxury</b><span>Considered by nature</span></p></div>
      </section>

      <section className="story" id="story">
        <div className="story-copy reveal">
          <p className="kicker">Welcome to Soluna Cove</p>
          <h2>Where the ocean<br />becomes <em>your escape.</em></h2>
          <i />
          <p>Soluna Cove is a boutique island retreat made for those who seek beauty, tranquility and genuine connection. Every moment is composed to restore.</p>
          <a href="#experience">Discover our story <ArrowRight /></a>
        </div>
        <div className="story-photo reveal">
          <img src="/images/ocean-lounge.png" alt="Open-air ocean lounge at Soluna Cove" />
          <span>Pacific light<br />island time</span>
        </div>
      </section>

      <section className="featured" id="experience">
        <img className="featured-photo reveal" src="/images/ocean-suite.png" alt="Oceanview Pool Villa bedroom" />
        <div className="featured-copy reveal">
          <p className="kicker">Featured stay</p>
          <h2>Oceanview<br /><em>pool villa.</em></h2>
          <p>Wake to the hush of waves and an endless horizon. Your private villa pairs a generous suite with open-air living and panoramic ocean views.</p>
          <ul>
            <li><MoonStars /> King bed</li>
            <li><SwimmingPool /> Private pool</li>
            <li><Waves /> Ocean view</li>
            <li><Heart /> Butler service</li>
          </ul>
          <button className="primary" type="button" onClick={() => { setSelectedSuite("Oceanview Pool Villa"); setBookingOpen(true); }}>Explore this suite <ArrowRight /></button>
        </div>
      </section>

      <section className="values">
        <article className="reveal"><Leaf /><h3>Conscious luxury</h3><p>Sustainable by nature. Thoughtful in every detail.</p></article>
        <article className="reveal"><Waves /><h3>Curated experiences</h3><p>From ocean adventures to cultural journeys, designed for you.</p></article>
        <article className="reveal"><Heart /><h3>Personalized service</h3><p>Intuitive, heartfelt care that anticipates every need.</p></article>
      </section>

      <section className="suites" id="suites">
        <div className="section-head reveal">
          <div><p className="kicker">Explore our suites</p><h2>Designed for rest.<br /><em>Crafted for you.</em></h2></div>
          <span>Three private worlds</span>
        </div>
        <div className="suite-grid" id="gallery">
          {suites.map((suite) => (
            <article className="suite reveal" key={suite.name}>
              <div className="suite-image"><img src={suite.image} alt={suite.name} /><button aria-label={(savedSuites.includes(suite.name) ? 'Unsave ' : 'Save ') + suite.name} aria-pressed={savedSuites.includes(suite.name)} onClick={() => toggleSaved(suite.name)} type="button"><Heart weight={savedSuites.includes(suite.name) ? 'fill' : 'regular'} /></button></div>
              <div className="suite-line"><div><h3>{suite.name}</h3><p>{suite.note}</p><span>{suite.price}</span></div><button type="button" onClick={() => { setSelectedSuite(suite.name); setBookingOpen(true); }} aria-label={"Book " + suite.name}><ArrowRight /></button></div>
            </article>
          ))}
        </div>
        <p className="save-status" role="status">{saveStatus}</p>
      </section>

      <section className="experience-banner">
        <img src="/images/cliff-villa.png" alt="Soluna Cove at blue hour" />
        <div className="banner-shade" />
        <div className="reveal">
          <Star size={27} weight="fill" />
          <p className="kicker">Beyond the expected</p>
          <h2>Stay for the view.<br /><em>Return for the feeling.</em></h2>
          <button className="secondary light" type="button" onClick={() => setBookingOpen(true)}>Plan your escape <ArrowRight /></button>
        </div>
      </section>

      <section className="contact" id="contact">
        <div><Waves size={35} /><p><b>Be the first to know.</b><span>Private offers, new experiences and stories from the cove.</span></p></div>
        <form onSubmit={submitNewsletter}><input type="email" name="email" required placeholder="Enter your email address" aria-label="Email address" /><button type="submit">Save demo interest <ArrowRight /></button><p className="newsletter-status" role="status">{newsletterStatus || 'Demo only: your email stays on this device. No subscription or emails.'}</p></form>
      </section>

      <footer>
        <a className="logo" href="#top"><Waves size={26} /><span>Soluna Cove</span></a>
        <p>Island luxury, consciously composed.</p>
        <div><a href="#suites">Suites</a><a href="#experience">Experiences</a><a href="#contact">Stay in touch</a></div>
      </footer>

      {bookingOpen && (
        <dialog ref={bookingDialog} className="modal-backdrop" aria-labelledby="booking-title" onCancel={() => setBookingOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setBookingOpen(false); }}>
          <form className="booking-modal" onSubmit={submitBooking} onChange={() => setBooked('')} onClick={(event) => event.stopPropagation()}>
            <button className="close" type="button" onClick={() => setBookingOpen(false)} aria-label="Close booking"><X /></button>
            <p className="kicker">Your coastal escape</p>
            <h2 id="booking-title">Plan your stay.</h2>
            <p className="demo-note">Save a demo plan on this device. No booking, availability check or email is sent.</p>
            <label>Suite<select value={selectedSuite} onChange={(event) => setSelectedSuite(event.target.value)}>{["Oceanview Pool Villa", ...suites.map((suite) => suite.name)].map((name) => <option key={name}>{name}</option>)}</select></label>
            <div className="form-row">
              <label>Check in<span><CalendarBlank /><input type="date" min={today} value={checkIn} onChange={(event) => { setCheckIn(event.target.value); setCheckOut(''); }} required /></span></label>
              <label>Check out<span><CalendarBlank /><input type="date" min={checkIn || today} value={checkOut} onChange={(event) => setCheckOut(event.target.value)} required /></span></label>
              <label>Guests<span><Users /><select value={guests} onChange={(event) => setGuests(event.target.value)}><option>1</option><option>2</option><option>3</option><option>4</option></select></span></label>
            </div>
            <button className="primary" type="submit">Save demo plan <ArrowRight /></button>
            <p className="success" role="status">{booked}</p>
          </form>
        </dialog>
      )}
    </main>
  );
}
