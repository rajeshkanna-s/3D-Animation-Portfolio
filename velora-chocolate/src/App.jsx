import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  User, 
  Sparkles, 
  Star, 
  ArrowRight, 
  ArrowUpRight,
  Heart, 
  Truck, 
  ShieldCheck, 
  Plus, 
  Minus, 
  X,
  Check,
  Gift,
  Flame,
  Award,
  Smartphone,
  ChevronRight,
  Coffee,
  Package
} from 'lucide-react';
import confetti from 'canvas-confetti';

const PRODUCTS = [
  {
    id: 'hazelnut-praline',
    name: 'Hazelnut Praline Box',
    pieces: '12 Pieces',
    price: 42.00,
    tag: 'Bestseller',
    category: 'Pralines',
    origin: 'Piedmont Hazelnuts & 65% Dark',
    notes: 'Toasted nut aroma, silky praline center, caramelized crunch',
    rating: 4.9,
    reviews: 320,
    image: '/product-hazelnut-praline.jpg'
  },
  {
    id: 'velvet-truffles',
    name: 'Velvet Truffles',
    pieces: '16 Pieces',
    price: 36.00,
    tag: 'Bestseller',
    category: 'Truffles',
    origin: 'Madagascar Single-Origin Ganache',
    notes: 'Dusted French cocoa, velvety melt, bourbon vanilla undertone',
    rating: 5.0,
    reviews: 480,
    image: '/product-velvet-truffles.jpg'
  },
  {
    id: 'salted-caramel',
    name: 'Salted Caramel Squares',
    pieces: '12 Pieces',
    price: 38.00,
    tag: 'New',
    category: 'Pralines',
    origin: 'Guérande Sea Salt & Dominican Cacao',
    notes: 'Gooey golden caramel, delicate salt crystal burst, 72% dark crust',
    rating: 4.8,
    reviews: 190,
    image: '/product-salted-caramel.jpg'
  },
  {
    id: 'noir-gift-box',
    name: 'Noir Gift Box',
    pieces: '24 Pieces',
    price: 68.00,
    tag: 'Limited',
    category: 'Gifts',
    origin: 'Master Chocolatier Grand Selection',
    notes: 'Full spectrum assortment, hand-tied satin ribbon, gold foil finish',
    rating: 5.0,
    reviews: 512,
    image: '/product-noir-gift-box.jpg'
  },
  {
    id: 'cocoa-bonbons',
    name: 'Cocoa Bonbons',
    pieces: '12 Pieces',
    price: 34.00,
    tag: 'Artisan',
    category: 'Truffles',
    origin: 'Single-Estate Ecuadorian Cacao',
    notes: 'Faceted crystal geometric domes with 24k edible gold leaf flecks',
    rating: 4.9,
    reviews: 215,
    image: '/product-cocoa-bonbons.jpg'
  },
  {
    id: 'signature-dark',
    name: 'Signature Dark Bar',
    pieces: '1 Bar • 100g',
    price: 14.00,
    tag: 'Signature',
    category: 'Bars',
    origin: '70% Single Origin Carenero Superior',
    notes: 'Crisp temper snap, floral berry bouquet, lingering dark velvet finish',
    rating: 4.9,
    reviews: 640,
    image: '/product-signature-dark.jpg'
  }
];

const FLAVOR_STEPS = [
  {
    step: '01',
    title: 'Source',
    desc: 'We source single-origin cacao from fair-trade heritage farms that prioritize organic biodiversity.'
  },
  {
    step: '02',
    title: 'Roast',
    desc: 'Expertly slow-roasted in vintage cast iron to unlock deep floral notes and complex caramel aromas.'
  },
  {
    step: '03',
    title: 'Blend',
    desc: 'Conched for 72 hours in small batches to achieve an impossibly silky, micron-smooth mouthfeel.'
  },
  {
    step: '04',
    title: 'Temper',
    desc: 'Tempered with precision marble alchemy for our signature acoustic snap, lustrous sheen, and melt.'
  },
  {
    step: '05',
    title: 'Finish',
    desc: 'Finished by hand with single-origin vanilla beans, Maldon sea salt, and 24k edible gold leaf.'
  }
];

const REVIEWS = [
  {
    name: 'Sophia M.',
    badge: 'Verified Buyer',
    rating: 5,
    quote: 'The website feels as premium as the chocolate. Smooth, elegant, and the hazelnut praline is unmatched in richness.'
  },
  {
    name: 'Daniel R.',
    badge: 'Verified Buyer',
    rating: 5,
    quote: 'Velora’s unboxing experience is pure luxury. Every detail makes you feel like you are opening a haute couture jewel.'
  },
  {
    name: 'Priya K.',
    badge: 'Verified Buyer',
    rating: 5,
    quote: 'Beautiful presentation, lightning-fast delivery to Manhattan, and chocolates that are truly in a league of their own.'
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [toastMessage, setToastMessage] = useState('');

  // Scroll spy effect to highlight navigation tabs
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'collections', 'story', 'mobile', 'reviews', 'contact'];
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

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#D4A373', '#F3DFC8', '#E5C378', '#5A351D']
    });

    showToast(`Added ${product.name} to your chocolate bag`);
  };

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="velora-frame">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="velora-toast">
          <Sparkles style={{ width: 16, height: 16, color: '#D4A373' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. FROZEN / STICKY TOP NAV */}
      <header className="velora-nav">
        <a href="#hero" className="velora-brand">
          <div className="monogram">V</div>
          <div>
            <div className="brand-title">VELORA</div>
            <div className="brand-sub">THE ART OF CHOCOLATE</div>
          </div>
        </a>

        <nav className="velora-links">
          <a href="#hero" className={`velora-link ${activeSection === 'hero' ? 'active' : ''}`}>Shop</a>
          <a href="#collections" className={`velora-link ${activeSection === 'collections' ? 'active' : ''}`}>Collections</a>
          <a href="#story" className={`velora-link ${activeSection === 'story' ? 'active' : ''}`}>Story</a>
          <a href="#mobile" className={`velora-link ${activeSection === 'mobile' ? 'active' : ''}`}>Mobile App</a>
          <a href="#reviews" className={`velora-link ${activeSection === 'reviews' ? 'active' : ''}`}>Reviews</a>
        </nav>

        <div className="velora-actions">
          <button onClick={() => showToast('Search luxury collection')} className="btn-icon-round" title="Search">
            <Search style={{ width: 18, height: 18 }} />
          </button>
          <button onClick={() => showToast('Velora Connoisseur Member Account')} className="btn-icon-round" title="Account">
            <User style={{ width: 18, height: 18 }} />
          </button>
          <button onClick={() => setIsCartOpen(true)} className="btn-icon-round" style={{ position: 'relative' }} title="Shopping Bag">
            <ShoppingBag style={{ width: 18, height: 18, color: '#d4a373' }} />
            {cartItemCount > 0 && (
              <span className="cart-badge-count">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* 2. HERO LUXURY VIEW (SLIDE 1) */}
      <section id="hero" className="velora-hero-stage">
        <div className="velora-backdrop-art" />

        <div className="velora-hero-left">
          <div className="velora-tag">
            <span className="tag-v-dot">V</span>
            <span>EXTRAORDINARY INGREDIENTS. TIMELESS INDULGENCE.</span>
          </div>

          <h1 className="velora-headline">
            Made To <br />
            <span className="gold-gradient-text">Melt Your Heart.</span>
          </h1>

          <p className="velora-lead">
            Velora chocolates are handcrafted with the world’s finest cacao, crafted in small batches for unmatched richness.
          </p>

          <a href="#collections" className="btn-explore">
            <span>Explore Collection</span>
            <ArrowRight style={{ width: 18, height: 18 }} />
          </a>

          {/* Social Proof Pill */}
          <div className="social-proof-pill">
            <div className="proof-count">
              <Heart style={{ width: 16, height: 16, color: '#d4a373' }} />
              <span>10k+ chocolate lovers</span>
            </div>

            <div className="proof-avatars-row">
              <div className="avatars-cluster">
                <div className="avatar-circle">SM</div>
                <div className="avatar-circle">DR</div>
                <div className="avatar-circle">PK</div>
                <div className="avatar-circle">AL</div>
              </div>
              <div className="proof-stars-wrap">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} style={{ width: 14, height: 14, fill: '#E5C378', color: '#E5C378' }} />
                ))}
                <span className="proof-stars-text">4.9: Loved by thousands</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div className="bottom-pills-row">
          <div className="glass-feature-box">
            <ShieldCheck style={{ width: 24, height: 24, color: '#d4a373', flexShrink: 0 }} />
            <div>
              <h4>Handcrafted Daily</h4>
              <p>Made in small batches by our master chocolatiers.</p>
            </div>
          </div>

          <div className="glass-feature-box">
            <Truck style={{ width: 24, height: 24, color: '#d4a373', flexShrink: 0 }} />
            <div>
              <h4>Delivering to Manhattan, NY</h4>
              <p>Same-day delivery available for orders placed before 2PM.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COLLECTION SECTION (SLIDE 2) - 6 DISTINCT PRODUCT IMAGES */}
      <section id="collections" className="section-full">
        <div className="collection-header-row">
          <div>
            <div className="velora-tag" style={{ marginBottom: 8 }}>COLLECTION</div>
            <h2 className="section-title-serif">
              Our Most Loved <span className="gold-gradient-text">Indulgences.</span>
            </h2>
            <p className="section-sub-muted">
              A curated selection of our signature chocolates, crafted to melt moments into memories.
            </p>
          </div>

          {/* Curated Gift Box Card */}
          <div className="curated-gift-card">
            <div className="gift-card-content">
              <div className="gift-tag-circle">
                <Gift size={16} color="#D4A373" />
              </div>
              <h3>Curated Gift Boxes</h3>
              <p>Thoughtfully paired. Beautifully wrapped in gold satin.</p>
              <button onClick={() => { addToCart(PRODUCTS[3]); setIsCartOpen(true); }} className="gift-explore-link">
                <span>Explore Gifts</span>
                <ArrowRight size={14} />
              </button>
            </div>
            <img src="/curated-gift-banner.jpg" alt="Curated Gift Box" className="gift-card-img" />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="category-tabs-bar">
          {['All', 'Bars', 'Pralines', 'Truffles', 'Gifts'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`cat-pill-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 6 Distinct Product Cards Grid */}
        <div className="products-grid-velora">
          {filteredProducts.map((p) => (
            <div key={p.id} className="velora-product-card">
              <div className="velora-card-img-wrap">
                <img src={p.image} alt={p.name} className="product-thumb-image" />
                <span className="product-badge-pill">{p.tag}</span>
              </div>

              <div className="velora-card-details">
                <div className="product-name-price-row">
                  <h3 className="product-name-title">{p.name}</h3>
                  <span className="product-price-tag">${p.price.toFixed(2)}</span>
                </div>
                <div className="product-meta-sub">{p.pieces} • {p.origin}</div>
                <p className="product-notes-desc">{p.notes}</p>
              </div>

              <button 
                onClick={() => addToCart(p)} 
                className="btn-add-to-bag"
              >
                <Plus size={16} />
                <span>Add to Bag</span>
              </button>
            </div>
          ))}
        </div>

        {/* Value Propositions Row */}
        <div className="value-props-bar">
          <div className="value-prop-item">
            <Coffee size={22} color="#D4A373" />
            <div>
              <h4>Finest Ingredients</h4>
              <p>We source the world's finest single-origin cacao.</p>
            </div>
          </div>
          <div className="value-prop-item">
            <Flame size={22} color="#D4A373" />
            <div>
              <h4>Handcrafted Daily</h4>
              <p>Made in small batches by our master chocolatiers.</p>
            </div>
          </div>
          <div className="value-prop-item">
            <Package size={22} color="#D4A373" />
            <div>
              <h4>Elegant Delivery</h4>
              <p>Premium temperature-controlled packaging with care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STORY & FLAVOR LAYERS (SLIDE 3) */}
      <section id="story" className="section-full">
        <div className="story-split-grid">
          <div className="story-text-col">
            <div className="velora-tag" style={{ marginBottom: 12 }}>
              <span>OUR PROCESS • BEAN TO BAR</span>
            </div>
            <h2 className="section-title-serif">
              Crafted In <br />
              <span className="gold-gradient-text">Layers Of Flavor.</span>
            </h2>
            <p className="section-sub-muted" style={{ marginBottom: 28 }}>
              Every Velora chocolate is a journey of precision, passion, and the world’s finest ingredients.
            </p>

            <div className="flavor-steps-list">
              {FLAVOR_STEPS.map((step) => (
                <div key={step.step} className="flavor-step-card">
                  <span className="step-num-circle">{step.step}</span>
                  <div>
                    <h4 className="step-title">{step.title}</h4>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="story-image-col">
            <img src="/story-craft-layers.jpg" alt="Crafted in layers of flavor" className="story-craft-full-img" />
          </div>
        </div>
      </section>

      {/* 5. MOBILE EXPERIENCE (SLIDE 4) */}
      <section id="mobile" className="section-full">
        <div className="mobile-split-grid">
          <div className="mobile-text-col">
            <div className="velora-tag" style={{ marginBottom: 12 }}>
              <Smartphone size={14} color="#D4A373" />
              <span>VELORA NATIVE APP</span>
            </div>
            <h2 className="section-title-serif">
              Luxury, <br />
              <span className="gold-gradient-text">Perfect On Mobile.</span>
            </h2>
            <p className="section-sub-muted" style={{ marginBottom: 32 }}>
              Indulge or gift — effortlessly. The complete Velora bespoke chocolate tasting experience in the palm of your hand.
            </p>

            <div className="mobile-perks-list">
              <div className="mobile-perk-item">
                <Truck size={20} color="#D4A373" />
                <div>
                  <h4>Same-Day Manhattan Delivery</h4>
                  <p>Fast, reliable, refrigerated delivery fresh to your door.</p>
                </div>
              </div>
              <div className="mobile-perk-item">
                <Gift size={20} color="#D4A373" />
                <div>
                  <h4>Send As A Curated Gift</h4>
                  <p>Beautifully wrapped with your personalized satin note card.</p>
                </div>
              </div>
              <div className="mobile-perk-item">
                <Award size={20} color="#D4A373" />
                <div>
                  <h4>Live Courier Tracking</h4>
                  <p>Real-time delivery progress updates right to your phone.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mobile-image-col">
            <img src="/mobile-experience.jpg" alt="Velora Mobile App" className="mobile-showcase-img" />
          </div>
        </div>
      </section>

      {/* 6. CONNOISSEUR REVIEWS (SLIDE 5) */}
      <section id="reviews" className="section-full">
        <div className="reviews-section-header">
          <div className="velora-tag" style={{ marginBottom: 8 }}>TESTIMONIALS</div>
          <h2 className="section-title-serif">
            Loved By <span className="gold-gradient-text">Chocolate Connoisseurs.</span>
          </h2>
          <div className="trustpilot-bar">
            <Star size={16} fill="#00b67a" color="#00b67a" />
            <span>Trustpilot Rated 4.9/5 from 1,200+ Verified Connoisseurs</span>
          </div>
        </div>

        <div className="reviews-grid-velora">
          {REVIEWS.map((r, i) => (
            <div key={i} className="velora-review-card">
              <div className="review-stars-row">
                {[...Array(r.rating)].map((_, idx) => (
                  <Star key={idx} size={15} fill="#E5C378" color="#E5C378" />
                ))}
              </div>
              <p className="review-quote-text">“{r.quote}”</p>
              <div className="review-author-row">
                <div className="author-avatar-small">{r.name.slice(0, 2)}</div>
                <div>
                  <h4 className="author-name">{r.name}</h4>
                  <span className="author-badge-text">{r.badge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA Banner */}
        <div className="final-cta-banner">
          <div className="cta-content-center">
            <h3 className="cta-headline">Your Chocolate Brand Deserves A Website Like This.</h3>
            <p className="cta-sub">A luxury digital experience that blends storytelling, ecommerce & indulgence.</p>
            <button 
              onClick={() => {
                addToCart(PRODUCTS[3]);
                setIsCartOpen(true);
              }}
              className="btn-explore"
              style={{ marginTop: 20 }}
            >
              <span>Build Your Brand Experience</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="cart-drawer-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div>
              <div className="cart-header-row">
                <h3 className="cart-title">Your Chocolate Bag</h3>
                <button onClick={() => setIsCartOpen(false)} className="cart-close-btn">
                  <X style={{ width: 22, height: 22 }} />
                </button>
              </div>

              <div className="cart-items-scroll">
                {cart.length === 0 ? (
                  <p className="empty-cart-msg">Your bag is empty.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="cart-item-row">
                      <img src={item.image} alt={item.name} className="cart-item-thumb" />
                      <div style={{ flex: 1 }}>
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-meta">${item.price.toFixed(2)} × {item.quantity}</div>
                      </div>
                      <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <div className="cart-subtotal-row">
                <span>Subtotal</span>
                <span className="cart-subtotal-val">${cartTotal.toFixed(2)}</span>
              </div>
              <button 
                disabled={cart.length === 0}
                onClick={() => {
                  confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
                  showToast('Order confirmed! Prepared for luxury delivery.');
                  setIsCartOpen(false);
                }} 
                className="btn-explore" 
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Checkout With Luxury Packaging</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="velora-footer">
        <div className="footer-top-row">
          <div className="velora-brand">
            <div className="monogram">V</div>
            <div>
              <div className="brand-title">VELORA</div>
              <div className="brand-sub">THE ART OF CHOCOLATE</div>
            </div>
          </div>
          <div className="footer-links-row">
            <a href="#hero">Shop</a>
            <a href="#collections">Collections</a>
            <a href="#story">Our Story</a>
            <a href="#mobile">Mobile App</a>
            <a href="#reviews">Connoisseurs</a>
          </div>
        </div>
        <div className="footer-bottom-copy">
          © 2026 VELORA CHOCOLATIER LLC. ALL RIGHTS RESERVED. HANDCRAFTED IN MANHATTAN, NY.
        </div>
      </footer>

    </div>
  );
}
