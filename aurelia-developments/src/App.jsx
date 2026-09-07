import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Bed,
  Buildings,
  CalendarBlank,
  CaretLeft,
  CaretRight,
  ChartLineUp,
  Check,
  Coins,
  Diamond,
  GlobeHemisphereWest,
  HouseLine,
  Leaf,
  List,
  MapPin,
  Play,
  Quotes,
  Ruler,
  SealCheck,
  Star,
  TrendUp,
  UsersThree,
  X,
} from "@phosphor-icons/react";

const projects = [
  {
    name: "Aurelia Residences",
    location: "Business Bay",
    price: "From AED 1.8M",
    status: "New launch",
    category: "Residences",
    image: "./images/aurelia-residences.png",
    facts: ["2–4 Bedrooms", "1,120–3,800 sq ft", "Q4 2028"],
  },
  {
    name: "Aurelia Villas",
    location: "Dubai Hills Estate",
    price: "From AED 3.6M",
    status: "Ready to move",
    category: "Villas",
    image: "./images/aurelia-villas.png",
    facts: ["4–6 Bedrooms", "4,200–8,100 sq ft", "Private gardens"],
  },
  {
    name: "Aurelia Skyline",
    location: "Waterfront District",
    price: "From AED 2.2M",
    status: "In progress",
    category: "Residences",
    image: "./images/aurelia-skyline.png",
    facts: ["1–4 Bedrooms", "City & water views", "Q2 2029"],
  },
];

const testimonials = [
  {
    quote:
      "Aurelia sets the standard for luxury living. The team made every decision feel considered, transparent, and personal.",
    name: "Michael R.",
    role: "Real Estate Investor",
  },
  {
    quote:
      "From design to delivery, every detail reflects excellence. Our home is calmer, brighter, and better than we imagined.",
    name: "Sarah K.",
    role: "Homeowner",
  },
  {
    quote:
      "A long-term asset with the service of a boutique house. Aurelia delivered on every promise and every milestone.",
    name: "James T.",
    role: "Portfolio Manager",
  },
];

function Brand() {
  return (
    <a className="brand" href="#home" aria-label="Aurelia Developments home">
      <span className="brand-mark" aria-hidden="true">
        <Buildings size={30} weight="thin" />
      </span>
      <span>
        <strong>AURELIA</strong>
        <small>DEVELOPMENTS</small>
      </span>
    </a>
  );
}

function Button({ children, variant = "gold", onClick, type = "button", href }) {
  const content = (
    <>
      <span>{children}</span>
      <ArrowRight size={16} weight="regular" aria-hidden="true" />
    </>
  );

  if (href) {
    return (
      <a className={"button button-" + variant} href={href}>
        {content}
      </a>
    );
  }

  return (
    <button className={"button button-" + variant} onClick={onClick} type={type}>
      {content}
    </button>
  );
}

function Metric({ icon: Icon, value, label, prefix = "", suffix = "" }) {
  const itemRef = useRef(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const element = itemRef.current;
    if (!element) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (reduced) {
          setDisplay(value);
        } else {
          const start = performance.now();
          const duration = 1350;
          const animate = (time) => {
            const progress = Math.min((time - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(value * eased);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
        observer.disconnect();
      },
      { threshold: 0.45 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  const output = Number.isInteger(value)
    ? Math.round(display)
    : display.toFixed(1);

  return (
    <div className="metric" ref={itemRef}>
      <Icon size={37} weight="thin" aria-hidden="true" />
      <span className="metric-copy">
        <strong>
          {prefix}
          {output}
          {suffix}
        </strong>
        <small>{label}</small>
      </span>
    </div>
  );
}

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);

  const handleMove = (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = ref.current;
    if (!card) return;
    const box = card.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    card.style.setProperty("--rx", y * -4 + "deg");
    card.style.setProperty("--ry", x * 5 + "deg");
  };

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--rx", "0deg");
    ref.current.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      className={"tilt " + className}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      ref={ref}
    >
      {children}
    </div>
  );
}

function ViewingModal({ open, onClose, selectedProject }) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    document.body.classList.add("modal-open");
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.classList.remove("modal-open");
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) setSubmitted(false);
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        aria-labelledby="viewing-title"
        aria-modal="true"
        className="viewing-modal"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button className="modal-close" onClick={onClose} aria-label="Close booking dialog">
          <X size={21} />
        </button>
        <p className="eyebrow">Private viewing</p>
        <h2 id="viewing-title">
          {submitted ? "Your visit is reserved." : "Experience Aurelia in person."}
        </h2>
        {submitted ? (
          <div className="success-state">
            <SealCheck size={52} weight="thin" aria-hidden="true" />
            <p>
              Our private client team will confirm your preferred time within one
              business day.
            </p>
            <Button onClick={onClose}>Return to the website</Button>
          </div>
        ) : (
          <form
            className="viewing-form"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <label>
              Name
              <input required placeholder="Your full name" name="name" />
            </label>
            <label>
              Email
              <input required type="email" placeholder="you@example.com" name="email" />
            </label>
            <label>
              Project
              <select defaultValue={selectedProject || "Aurelia Heights"}>
                <option>Aurelia Heights</option>
                {projects.map((project) => (
                  <option key={project.name}>{project.name}</option>
                ))}
              </select>
            </label>
            <label>
              Preferred date
              <input required type="date" name="date" />
            </label>
            <Button type="submit">Request a viewing</Button>
          </form>
        )}
      </div>
    </div>
  );
}

function ProjectDialog({ project, onClose, onBook }) {
  useEffect(() => {
    if (!project) return undefined;
    const handleKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <article
        className="project-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={project.name + " details"}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close light-close" onClick={onClose} aria-label="Close project details">
          <X size={21} />
        </button>
        <img src={project.image} alt={project.name + " luxury property exterior"} />
        <div className="project-dialog-copy">
          <p className="eyebrow">{project.status}</p>
          <h2>{project.name}</h2>
          <p className="location-line">
            <MapPin size={16} />
            {project.location}
          </p>
          <div className="project-facts">
            {project.facts.map((fact) => (
              <span key={fact}>
                <Check size={15} /> {fact}
              </span>
            ))}
          </div>
          <div className="project-dialog-actions">
            <strong>{project.price}</strong>
            <Button onClick={() => onBook(project.name)}>Book a viewing</Button>
          </div>
        </div>
      </article>
    </div>
  );
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewingOpen, setViewingOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [heroShift, setHeroShift] = useState(0);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;
    let ticking = false;
    const update = () => {
      setHeroShift(Math.min(window.scrollY * 0.12, 70));
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.14 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  const openBooking = (projectName = "") => {
    setSelectedProject(projectName);
    setProjectOpen(null);
    setViewingOpen(true);
  };

  const goTo = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="site">
      <header className="site-header">
        <div className="nav-wrap">
          <Brand />
          <nav className={menuOpen ? "main-nav nav-open" : "main-nav"} aria-label="Primary navigation">
            {[
              ["Home", "#home"],
              ["Projects", "#projects"],
              ["About", "#about"],
              ["Masterplan", "#masterplan"],
              ["Investors", "#investors"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <button key={label} onClick={() => goTo(href)}>
                {label}
              </button>
            ))}
          </nav>
          <button className="nav-cta" onClick={() => openBooking()}>
            Book a viewing
            <ArrowRight size={15} />
          </button>
          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="menu-button"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={25} /> : <List size={25} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <img
            className="hero-image"
            src="./images/aurelia-hero.png"
            alt="Modern Aurelia waterfront residences at dusk"
            style={{ transform: "translate3d(0, " + heroShift + "px, 0) scale(1.06)" }}
          />
          <div className="hero-content reveal">
            <p className="eyebrow">Residences with lasting value</p>
            <h1>
              Built for
              <span>Modern Living.</span>
            </h1>
            <p className="hero-intro">
              Premium residences. Smart planning.
              <br />
              Lasting value for generations.
            </p>
            <div className="hero-actions">
              <Button href="#projects">Explore projects</Button>
              <button className="video-button" onClick={() => setOverviewOpen(true)}>
                <span><Play size={17} weight="fill" /></span>
                Watch overview
              </button>
            </div>
          </div>
          <div className="stats-panel">
            <Metric icon={Buildings} value={25} suffix="+" label="Projects delivered" />
            <Metric icon={Coins} value={1.2} prefix="$" suffix="B" label="Development value" />
            <Metric icon={UsersThree} value={96} suffix="%" label="Client satisfaction" />
          </div>
        </section>

        <section className="section story-section" id="about">
          <div className="story-copy reveal">
            <p className="eyebrow">Who we are</p>
            <h2>Shaping Landmark Communities</h2>
            <p>
              Aurelia Developments creates exceptional residential and mixed-use
              communities that blend timeless design, sustainable living, and
              strong investment potential.
            </p>
            <Button variant="outline" href="#masterplan">Learn more about us</Button>
          </div>
          <TiltCard className="featured-card reveal">
            <img src="./images/aurelia-heights.png" alt="Aurelia Heights villa and reflecting pool" />
            <div className="featured-topline">Featured project</div>
            <div className="featured-copy">
              <div>
                <h3>Aurelia Heights</h3>
                <p>Luxury Apartments · Downtown</p>
              </div>
              <button onClick={() => setProjectOpen({ ...projects[1], name: "Aurelia Heights", image: "./images/aurelia-heights.png", location: "Downtown", price: "From AED 4.8M" })}>
                View project <ArrowRight size={18} />
              </button>
            </div>
          </TiltCard>
        </section>

        <section className="benefits" aria-label="Aurelia benefits">
          <article className="reveal">
            <Diamond size={34} weight="thin" />
            <div>
              <h3>Curated Luxury</h3>
              <p>Meticulously designed homes with exceptional finishes and timeless architecture.</p>
            </div>
          </article>
          <article className="reveal">
            <Leaf size={34} weight="thin" />
            <div>
              <h3>Smart & Sustainable</h3>
              <p>Future-ready communities with green design, intelligent systems, and efficient living.</p>
            </div>
          </article>
          <article className="reveal">
            <ChartLineUp size={34} weight="thin" />
            <div>
              <h3>Strong Returns</h3>
              <p>Prime locations, high demand, and long-term value for discerning investors.</p>
            </div>
          </article>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-heading light-heading reveal">
            <div>
              <p className="eyebrow">Featured projects</p>
              <h2>Exceptional Places.<br />Extraordinary Living.</h2>
            </div>
            <div className="project-controls" aria-label="Filter projects">
              {["All", "Residences", "Villas"].map((filter) => (
                <button
                  className={activeFilter === filter ? "active" : ""}
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <TiltCard className="project-card reveal" key={project.name}>
                <button className="project-hit" onClick={() => setProjectOpen(project)} aria-label={"View " + project.name}>
                  <div className="project-image-wrap">
                    <img src={project.image} alt={project.name + " exterior"} />
                    <span className="status">{project.status}</span>
                  </div>
                  <div className="project-card-copy">
                    <h3>{project.name}</h3>
                    <p><MapPin size={14} /> {project.location}</p>
                    <div>
                      <strong>{project.price}</strong>
                      <ArrowRight size={19} />
                    </div>
                  </div>
                </button>
              </TiltCard>
            ))}
          </div>
        </section>

        <section className="masterplan section" id="masterplan">
          <div className="masterplan-image reveal">
            <img src="./images/aurelia-amenities.png" alt="Waterfront infinity pool and city skyline" />
            <span>01 / Waterfront living</span>
          </div>
          <div className="masterplan-copy reveal">
            <p className="eyebrow">The Aurelia masterplan</p>
            <h2>Everything within reach. Nothing ordinary.</h2>
            <p>
              Landscaped promenades, private club amenities, thoughtful mobility,
              and serene homes form one coherent neighborhood—designed around how
              people want to live tomorrow.
            </p>
            <ul>
              <li><GlobeHemisphereWest size={20} /> Waterfront promenades</li>
              <li><HouseLine size={20} /> Residents-only club</li>
              <li><Leaf size={20} /> 42% landscaped open space</li>
            </ul>
            <Button variant="outline" onClick={() => openBooking()}>Request the masterplan</Button>
          </div>
        </section>

        <section className="amenity-banner">
          <img src="./images/aurelia-amenities.png" alt="Aurelia residents' waterfront pool deck" />
          <div className="amenity-panel reveal">
            <p className="eyebrow">Crafted around you</p>
            <h2>A slower rhythm, at the center of everything.</h2>
            <div className="amenity-facts">
              <span><Bed size={20} /> Private residences</span>
              <span><Ruler size={20} /> Expansive layouts</span>
              <span><TrendUp size={20} /> Enduring value</span>
            </div>
          </div>
        </section>

        <section className="investor-section" id="investors">
          <div className="investor-title reveal">
            <p className="eyebrow">Investor confidence</p>
            <h2>Trusted by Investors.<br />Chosen for Generations.</h2>
            <p>
              Our commitment to quality, transparency, and long-term value has
              earned the trust of homeowners and investors worldwide.
            </p>
          </div>
          <div className="testimonial-stage reveal">
            <article key={testimonialIndex}>
              <Quotes size={34} weight="thin" />
              <div className="stars" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} size={17} weight="fill" aria-hidden="true" />
                ))}
              </div>
              <blockquote>“{testimonials[testimonialIndex].quote}”</blockquote>
              <div className="testimonial-person">
                <span>{testimonials[testimonialIndex].name.charAt(0)}</span>
                <p>
                  <strong>{testimonials[testimonialIndex].name}</strong>
                  <small>{testimonials[testimonialIndex].role}</small>
                </p>
              </div>
            </article>
            <div className="testimonial-controls">
              <button
                aria-label="Previous testimonial"
                onClick={() => setTestimonialIndex((value) => (value - 1 + testimonials.length) % testimonials.length)}
              >
                <CaretLeft size={20} />
              </button>
              <span>{String(testimonialIndex + 1).padStart(2, "0")} / 03</span>
              <button
                aria-label="Next testimonial"
                onClick={() => setTestimonialIndex((value) => (value + 1) % testimonials.length)}
              >
                <CaretRight size={20} />
              </button>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-copy reveal">
            <p className="eyebrow">Begin your Aurelia story</p>
            <h2>Your next address starts with a conversation.</h2>
            <p>
              Speak with our private client team for project availability,
              investment insights, and a tailored viewing.
            </p>
          </div>
          <form
            className="contact-form reveal"
            onSubmit={(event) => {
              event.preventDefault();
              openBooking();
            }}
          >
            <label>
              Your name
              <input required placeholder="Full name" />
            </label>
            <label>
              Email address
              <input required type="email" placeholder="you@example.com" />
            </label>
            <label>
              Interest
              <select defaultValue="Private residence">
                <option>Private residence</option>
                <option>Investment opportunity</option>
                <option>Masterplan</option>
              </select>
            </label>
            <Button type="submit">Start a conversation</Button>
          </form>
        </section>
      </main>

      <footer>
        <div className="footer-main">
          <Brand />
          <p>Built for today. Designed for tomorrow. Created for generations.</p>
          <div className="footer-links">
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="#investors">Investors</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Aurelia Developments</span>
          <span>Dubai · London · Singapore</span>
        </div>
      </footer>

      {overviewOpen && (
        <div className="modal-backdrop" onMouseDown={() => setOverviewOpen(false)} role="presentation">
          <div className="overview-modal" role="dialog" aria-modal="true" aria-label="Aurelia overview" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close light-close" onClick={() => setOverviewOpen(false)} aria-label="Close overview"><X size={21} /></button>
            <img src="./images/aurelia-hero.png" alt="Aurelia waterfront community" />
            <div>
              <span><Play size={21} weight="fill" /></span>
              <p className="eyebrow">Aurelia in 60 seconds</p>
              <h2>Places that become part of your story.</h2>
              <p>Explore a measured approach to design, development, and modern city living.</p>
              <Button onClick={() => { setOverviewOpen(false); goTo("#projects"); }}>Explore projects</Button>
            </div>
          </div>
        </div>
      )}

      <ProjectDialog
        project={projectOpen}
        onClose={() => setProjectOpen(null)}
        onBook={openBooking}
      />
      <ViewingModal
        open={viewingOpen}
        onClose={() => setViewingOpen(false)}
        selectedProject={selectedProject}
      />
    </div>
  );
}
