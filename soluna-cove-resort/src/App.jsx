import { useEffect, useState } from "react";
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
  const [booked, setBooked] = useState(false);
  const [selectedSuite, setSelectedSuite] = useState("Cliffside Pool Villa");
  const [progress, setProgress] = useState(0);

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
    setBooked(true);
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
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">{menuOpen ? <X /> : <List />}</button>
      </header>

      {menuOpen && (
        <div className="mobile-nav">
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
              <div className="suite-image"><img src={suite.image} alt={suite.name} /><button aria-label={"Save " + suite.name} type="button"><Heart /></button></div>
              <div className="suite-line"><div><h3>{suite.name}</h3><p>{suite.note}</p><span>{suite.price}</span></div><button type="button" onClick={() => { setSelectedSuite(suite.name); setBookingOpen(true); }} aria-label={"Book " + suite.name}><ArrowRight /></button></div>
            </article>
          ))}
        </div>
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
        <form onSubmit={(event) => event.preventDefault()}><input type="email" required placeholder="Enter your email address" aria-label="Email address" /><button type="submit">Subscribe <ArrowRight /></button></form>
      </section>

      <footer>
        <a className="logo" href="#top"><Waves size={26} /><span>Soluna Cove</span></a>
        <p>Island luxury, consciously composed.</p>
        <div><a href="#suites">Suites</a><a href="#experience">Experiences</a><a href="mailto:hello@solunacove.example">Contact</a></div>
      </footer>

      {bookingOpen && (
        <div className="modal-backdrop" onMouseDown={() => setBookingOpen(false)}>
          <form className="booking-modal" onSubmit={submitBooking} onMouseDown={(event) => event.stopPropagation()}>
            <button className="close" type="button" onClick={() => setBookingOpen(false)} aria-label="Close booking"><X /></button>
            <p className="kicker">Your coastal escape</p>
            <h2>Book your stay.</h2>
            <label>Suite<select value={selectedSuite} onChange={(event) => setSelectedSuite(event.target.value)}>{["Oceanview Pool Villa", ...suites.map((suite) => suite.name)].map((name) => <option key={name}>{name}</option>)}</select></label>
            <div className="form-row">
              <label>Check in<span><CalendarBlank /><input type="date" required /></span></label>
              <label>Guests<span><Users /><select defaultValue="2"><option>1</option><option>2</option><option>3</option><option>4</option></select></span></label>
            </div>
            <button className="primary" type="submit">Check availability <ArrowRight /></button>
            {booked && <p className="success"><CheckCircle weight="fill" /> Dates received — your island host will reply shortly.</p>}
          </form>
        </div>
      )}
    </main>
  );
}
