import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bag,
  Check,
  Gift,
  Leaf,
  List,
  MagnifyingGlass,
  Minus,
  Package,
  Plus,
  Quotes,
  SealCheck,
  ShieldCheck,
  Sparkle,
  Star,
  Truck,
  User,
  X,
} from "@phosphor-icons/react";

const PRODUCTS = [
  { id: "obsidian", name: "Obsidian", family: "Woody · Amber · Oud", concentration: "Extrait de Parfum", price: 195, image: "/images/obsidian.png", note: "A deep, resinous trail of aged oud softened by amber and smoked violet." },
  { id: "lumiere", name: "Lumière", family: "Citrus · Jasmine · Musk", concentration: "Eau de Parfum", price: 185, image: "/images/lumiere.png", note: "Sunlit bergamot and jasmine settle into a veil of luminous white musk." },
  { id: "noir-rose", name: "Noir Rose", family: "Rose · Patchouli · Amber", concentration: "Extrait de Parfum", price: 205, image: "/images/noir-rose.png", note: "Velvet rose absolute opens over patchouli, plum skin and warm labdanum." },
  { id: "blanche", name: "Blanche", family: "Vanilla · Musk · Sandalwood", concentration: "Eau de Parfum", price: 185, image: "/images/blanche.png", note: "A quiet skin scent of vanilla bean, pearl musk and creamy sandalwood." },
];

const NOTES = [
  { name: "Bergamot", character: "Bright & uplifting", detail: "Hand-pressed Calabrian rind gives the first breath its vivid, green radiance." },
  { name: "Rose Absolute", character: "Floral & enveloping", detail: "Dawn-picked Centifolia petals add a plush, honeyed heart without sweetness." },
  { name: "Oud Wood", character: "Rich & mysterious", detail: "Twenty-year-aged Cambodian agarwood creates a smoky, meditative foundation." },
  { name: "Amber", character: "Warm & resinous", detail: "Labdanum and benzoin fuse into a long, glowing trail on the skin." },
  { name: "Vanilla", character: "Smooth & comforting", detail: "Bourbon vanilla is tinctured slowly for a dry, suede-like softness." },
];

const REVIEWS = [
  { quote: "Aura Noir feels less like fragrance and more like atmosphere. Obsidian is dark, composed and unforgettable.", name: "Sophia L.", city: "New York" },
  { quote: "The balance is extraordinary. Lumière begins with light, then becomes the softest, most elegant trace on skin.", name: "Amelia R.", city: "London" },
  { quote: "Noir Rose has the depth of an old velvet theatre. The packaging and ritual make it feel genuinely rare.", name: "Elena M.", city: "Milan" },
];

function Reveal({ as: Tag = "div", className = "", children, ...props }) {
  return <Tag className={`reveal ${className}`} {...props}>{children}</Tag>;
}

export function App() {
  const [selected, setSelected] = useState(PRODUCTS[0]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [activeNote, setActiveNote] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const onScroll = () => document.documentElement.style.setProperty("--parallax-y", `${Math.min(window.scrollY * 0.14, 90)}px`);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = cartOpen || menuOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen, menuOpen, searchOpen]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(window.__auraToast);
    window.__auraToast = window.setTimeout(() => setToast(""), 2600);
  };

  const addToCart = (product, open = false) => {
    setCart((items) => {
      const found = items.find((item) => item.id === product.id);
      if (found) return items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...items, { ...product, quantity: 1 }];
    });
    notify(`${product.name} was added to your bag.`);
    if (open) setCartOpen(true);
  };

  const adjustQuantity = (id, amount) => {
    setCart((items) => items.map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0));
  };

  const goTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="site-shell">
      {toast && <div className="toast" role="status"><Check size={16} weight="bold" />{toast}</div>}

      <header className="site-header">
        <button className="mobile-menu-button icon-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><List size={22} /></button>
        <a className="wordmark" href="#top" aria-label="Aura Noir home">Aura Noir</a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#top">Home</a><a href="#collection">Collection</a><a href="#story">Our Story</a><a href="#ingredients">Ingredients</a><a href="#journal">Journal</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button hide-small" onClick={() => setSearchOpen(true)} aria-label="Search"><MagnifyingGlass size={19} /></button>
          <button className="icon-button hide-small" onClick={() => notify("Private client access is available through our concierge.")} aria-label="Client account"><User size={19} /></button>
          <button className="icon-button bag-button" onClick={() => setCartOpen(true)} aria-label={`Shopping bag with ${cartCount} items`}><Bag size={20} />{cartCount > 0 && <span className="bag-count">{cartCount}</span>}</button>
          <button className="shop-button hide-tablet" onClick={() => goTo("collection")}>Shop now</button>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <img className="hero-image" src="/images/hero-obsidian.png" alt="Amber perfume flacon illuminated on black obsidian" />
          <div className="hero-copy">
            <p className="eyebrow">The art of attraction</p>
            <h1 id="hero-title">Scent is your silent <em>signature.</em></h1>
            <p className="hero-description">Timeless fragrances composed with rare naturals for those who leave an unforgettable impression.</p>
            <div className="hero-actions">
              <button className="button button-light" onClick={() => addToCart(PRODUCTS[0], true)}>Shop signature scent <ArrowRight size={17} /></button>
              <button className="button button-ghost" onClick={() => goTo("collection")}>Explore collection</button>
            </div>
          </div>
          <div className="hero-side-note" aria-hidden="true"><Sparkle size={17} weight="fill" /><span>Deep. Bold.<br />Unforgettable.</span><strong>AN</strong></div>
          <div className="hero-index" aria-hidden="true"><span>01</span><span>02</span><span>03</span></div>
        </section>

        <Reveal as="section" id="collection" className="collection section-light" aria-labelledby="collection-title">
          <div className="section-heading centered dark-text">
            <p className="eyebrow">Featured fragrances</p><h2 id="collection-title">The Collection</h2><p>Four compositions. Each made in small batches and designed to become distinctly yours.</p>
          </div>
          <div className="product-grid">
            {PRODUCTS.map((product) => (
              <article className="product-card" data-selected={selected.id === product.id} key={product.id}>
                <button className="product-image-button" onClick={() => setSelected(product)} aria-label={`Select ${product.name}`}><img src={product.image} alt={`${product.name} perfume bottle`} /></button>
                <div className="product-copy">
                  <div><p className="product-type">{product.concentration}</p><h3>{product.name}</h3><p>{product.family}</p></div>
                  <div className="product-bottom"><strong>${product.price}</strong><button className="round-arrow" onClick={() => setSelected(product)} aria-label={`View ${product.name}`}><ArrowRight size={18} /></button></div>
                </div>
              </article>
            ))}
          </div>
          <div className="selection-panel" aria-live="polite">
            <div><span>Selected composition</span><strong>{selected.name}</strong><p>{selected.note}</p></div>
            <button className="button button-dark" onClick={() => addToCart(selected)}>Add {selected.name} · ${selected.price}<Plus size={16} /></button>
          </div>
        </Reveal>

        <Reveal as="section" id="story" className="story-section" aria-labelledby="story-title">
          <div className="story-image-wrap"><img src="/images/atelier-craft.png" alt="Perfumer measuring amber essence with a glass pipette" /></div>
          <div className="story-copy">
            <p className="eyebrow">Our story</p><h2 id="story-title">Crafted with passion.<br /><em>Rooted in time.</em></h2>
            <p>In our Grasse atelier, old-world extraction meets modern precision. Each fragrance rests for twelve weeks before it is filtered, hand-filled and numbered.</p>
            <div className="craft-values">
              <div><Leaf size={24} /><span><strong>Finest ingredients</strong>Traced to their growers.</span></div>
              <div><SealCheck size={24} /><span><strong>Expertly crafted</strong>Blended by master perfumers.</span></div>
              <div><Sparkle size={24} /><span><strong>Timeless elegance</strong>Made to evolve on skin.</span></div>
            </div>
            <button className="text-link" onClick={() => goTo("ingredients")}>Discover the composition <ArrowRight size={18} /></button>
          </div>
        </Reveal>

        <Reveal as="section" id="ingredients" className="notes-section" aria-labelledby="notes-title">
          <img className="notes-image" src="/images/ingredients.png" alt="Rose, bergamot, oud, amber resin and vanilla on a dark perfumer's table" />
          <div className="notes-content">
            <div className="section-heading"><p className="eyebrow">The art of composition</p><h2 id="notes-title">Signature Notes</h2><p>Natural materials selected for contrast, texture and the way they unfold over time.</p></div>
            <div className="note-tabs" role="tablist" aria-label="Signature notes">
              {NOTES.map((note, index) => <button key={note.name} role="tab" aria-selected={activeNote === index} onClick={() => setActiveNote(index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{note.name}</strong><small>{note.character}</small></button>)}
            </div>
            <div className="note-detail" role="tabpanel"><Sparkle size={18} weight="fill" /><p>{NOTES[activeNote].detail}</p></div>
          </div>
        </Reveal>

        <section className="gift-review-grid" id="journal">
          <Reveal className="gift-panel">
            <Gift size={30} /><p className="eyebrow">A gift to remember</p><h2>The art of gifting</h2><p>Presented in our signature midnight box with a handwritten card and two fragrance samples.</p>
            <button className="button button-dark" onClick={() => { setSelected(PRODUCTS[3]); goTo("collection"); }}>Shop gift sets <ArrowUpRight size={16} /></button>
          </Reveal>
          <Reveal className="review-panel">
            <Quotes size={34} weight="fill" /><p className="eyebrow">Trusted by connoisseurs</p><h2>Loved by those who appreciate the exceptional</h2>
            <div className="stars" aria-label="5 out of 5 stars">{[0, 1, 2, 3, 4].map((star) => <Star key={star} size={17} weight="fill" />)}</div>
            <blockquote>“{REVIEWS[reviewIndex].quote}”</blockquote><cite>— {REVIEWS[reviewIndex].name}, {REVIEWS[reviewIndex].city}</cite>
            <div className="review-controls"><button onClick={() => setReviewIndex((reviewIndex + REVIEWS.length - 1) % REVIEWS.length)} aria-label="Previous review"><ArrowLeft size={18} /></button><span>{reviewIndex + 1} / {REVIEWS.length}</span><button onClick={() => setReviewIndex((reviewIndex + 1) % REVIEWS.length)} aria-label="Next review"><ArrowRight size={18} /></button></div>
          </Reveal>
        </section>

        <Reveal as="section" className="newsletter" aria-labelledby="newsletter-title">
          <div><p className="eyebrow">Private letters from Grasse</p><h2 id="newsletter-title">Enter the world of Aura Noir</h2></div>
          {subscribed ? <p className="subscription-success"><Check size={18} /> Welcome to the atelier.</p> : <form onSubmit={(event) => { event.preventDefault(); if (email.trim()) setSubscribed(true); }}><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" /><button type="submit">Subscribe <ArrowRight size={17} /></button></form>}
        </Reveal>

        <section className="trust-bar" aria-label="Shopping benefits">
          <div><Truck size={24} /><span><strong>Complimentary shipping</strong>On orders over $150</span></div><div><Package size={24} /><span><strong>Exclusive samples</strong>With every purchase</span></div><div><Gift size={24} /><span><strong>Luxury gift packaging</strong>Wrapped by hand</span></div><div><ShieldCheck size={24} /><span><strong>Secure checkout</strong>Shop with confidence</span></div>
        </section>
      </main>

      <footer className="site-footer">
        <div><a className="wordmark" href="#top">Aura Noir</a><p>Haute parfumerie, composed in Grasse.</p></div>
        <div className="footer-links"><a href="#collection">Collection</a><a href="#story">Our story</a><a href="#ingredients">Ingredients</a><button onClick={() => notify("Our concierge will reply within one business day.")}>Contact</button></div>
        <small>© 2026 Aura Noir. All rights reserved.</small>
      </footer>

      {menuOpen && <div className="overlay" onMouseDown={(event) => event.target === event.currentTarget && setMenuOpen(false)}><aside className="mobile-drawer" aria-label="Mobile navigation"><div className="drawer-top"><span className="wordmark">Aura Noir</span><button className="icon-button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={22} /></button></div><nav>{[["Home", "top"], ["Collection", "collection"], ["Our story", "story"], ["Ingredients", "ingredients"], ["Journal", "journal"]].map(([label, id]) => <button key={id} onClick={() => goTo(id)}>{label}<ArrowRight size={18} /></button>)}</nav><button className="button button-light" onClick={() => { setMenuOpen(false); setCartOpen(true); }}>View shopping bag <Bag size={18} /></button></aside></div>}

      {searchOpen && <div className="overlay centered-overlay" onMouseDown={(event) => event.target === event.currentTarget && setSearchOpen(false)}><div className="search-modal" role="dialog" aria-modal="true" aria-label="Search fragrances"><div className="drawer-top"><p className="eyebrow">Find your fragrance</p><button className="icon-button" onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={22} /></button></div><div className="search-field"><MagnifyingGlass size={21} /><input autoFocus placeholder="Search by name or note" aria-label="Search by name or note" /></div><div className="quick-searches">{PRODUCTS.map((product) => <button key={product.id} onClick={() => { setSelected(product); setSearchOpen(false); goTo("collection"); }}>{product.name}<ArrowRight size={16} /></button>)}</div></div></div>}

      {cartOpen && <div className="overlay" onMouseDown={(event) => event.target === event.currentTarget && setCartOpen(false)}><aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title"><div className="drawer-top"><div><p className="eyebrow">Private collection</p><h2 id="cart-title">Your bag</h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={22} /></button></div><div className="cart-items">{cart.length === 0 ? <div className="empty-bag"><Bag size={34} /><h3>Your bag awaits</h3><p>Choose a composition from the collection to begin.</p><button className="button button-light" onClick={() => { setCartOpen(false); goTo("collection"); }}>Explore collection</button></div> : cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div><h3>{item.name}</h3><p>{item.family}</p><div className="quantity"><button onClick={() => adjustQuantity(item.id, -1)} aria-label={`Remove one ${item.name}`}><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => adjustQuantity(item.id, 1)} aria-label={`Add one ${item.name}`}><Plus size={13} /></button></div></div><strong>${item.price * item.quantity}</strong></div>)}</div><div className="cart-footer"><div><span>Subtotal</span><strong>${total}</strong></div><p>Complimentary shipping and samples are included.</p><button className="button button-light" disabled={!cart.length} onClick={() => { setCart([]); setCartOpen(false); notify("Your private checkout has been reserved."); }}>Secure checkout <ShieldCheck size={17} /></button></div></aside></div>}
    </div>
  );
}
