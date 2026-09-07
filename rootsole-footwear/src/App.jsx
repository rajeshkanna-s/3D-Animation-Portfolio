import React, { useState } from 'react';
import { 
  ShoppingBag, 
  ArrowUpRight, 
  Feather, 
  Footprints, 
  RefreshCw, 
  Mountain, 
  ShieldCheck, 
  X, 
  Check 
} from 'lucide-react';
import confetti from 'canvas-confetti';

const SNEAKER_MODELS = [
  {
    id: 'terra-runner-sage',
    name: 'ROOTSOLE Terra Runner • Sage Forest',
    price: 165.00,
    color: 'Sage / Terracotta / Stone',
    image: './hero-sneaker.jpg',
    description: 'Our iconic daily trainer constructed with organic eucalyptus mesh, vegetable-tanned suede, and natural rubber traction lugs.'
  },
  {
    id: 'terra-runner-dune',
    name: 'ROOTSOLE Terra Runner • Dune Clay',
    price: 165.00,
    color: 'Dune / Warm Ochre',
    image: './hero-sneaker.jpg',
    description: 'Earth-toned edition inspired by canyon rock strata. Features anatomical cork cushioning and breathable recycled knit lining.'
  },
  {
    id: 'terra-runner-charcoal',
    name: 'ROOTSOLE Terra Runner • Obsidian Stone',
    price: 175.00,
    color: 'Obsidian / Raw Ash',
    image: './hero-sneaker.jpg',
    description: 'Triple-density all-weather edition treated with plant-based water repellent and high-traction FSC-certified wild rubber.'
  }
];

const MATERIALS = [
  {
    id: 'mesh',
    title: 'Natural Mesh',
    subtitle: 'Breathable, durable, and inspired by nature.',
    detail: 'Spun from FSC-certified eucalyptus tree fibers. 40% cooler than synthetic polyester.'
  },
  {
    id: 'cork',
    title: 'Natural Cork Footbed',
    subtitle: 'Renewable comfort that molds to you.',
    detail: 'Harvested without felling trees. Naturally antimicrobial, moisture-wicking, and self-contouring.'
  },
  {
    id: 'suede',
    title: 'Premium Suede',
    subtitle: 'LWG-certified suede for a soft, lasting feel.',
    detail: 'Tanned using closed-loop water systems with zero heavy chrome or toxic effluent runoff.'
  },
  {
    id: 'cushion',
    title: 'All-Day Cushioning',
    subtitle: 'Lightweight sugarcane EVA midsole for comfort in every step.',
    detail: 'Bio-foam derived from sugarcane molasses that sequesters carbon during cultivation.'
  },
  {
    id: 'lining',
    title: 'Recycled Lining',
    subtitle: 'Soft, breathable, and made from recycled ocean plastics.',
    detail: 'Silky smooth inner bootie engineered to prevent blisters without requiring socks.'
  },
  {
    id: 'rubber',
    title: 'Low-Impact Rubber',
    subtitle: 'Natural rubber outsole for grip that treads lightly.',
    detail: 'Sourced from responsibly tapped Hevea trees for optimal wet-rock and urban pavement grip.'
  }
];

const SIZES = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'];

export default function App() {
  const [selectedModel, setSelectedModel] = useState(SNEAKER_MODELS[0]);
  const [selectedSize, setSelectedSize] = useState('9.5');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [rotationAngle, setRotationAngle] = useState(0);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleHeroMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: ((clientX / innerWidth) - 0.5) * 14,
      y: ((clientY / innerHeight) - 0.5) * 14
    });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const addToCart = () => {
    const itemToAdd = {
      ...selectedModel,
      size: selectedSize,
      cartId: `${selectedModel.id}-${selectedSize}`
    };

    setCart((prev) => {
      const exists = prev.find((item) => item.cartId === itemToAdd.cartId);
      if (exists) {
        return prev.map((item) =>
          item.cartId === itemToAdd.cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...itemToAdd, quantity: 1 }];
    });

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#3A4D39', '#C37854', '#DFD5C2', '#263625']
    });

    showToast(`Added ${selectedModel.name} (US ${selectedSize}) to cart.`);
  };

  const updateQuantity = (cartId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div onMouseMove={handleHeroMouseMove}>
      
      {/* Toast */}
      {toastMessage && (
        <div className="toast">
          <Footprints style={{ width: 16, height: 16, color: '#C37854' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="header">
        <div className="container header-inner">
          <a href="#" className="brand-title">ROOTSOLE</a>

          <nav className="nav-links">
            <a href="#shop" className="nav-link">Shop</a>
            <a href="#materials" className="nav-link">Materials</a>
            <a href="#impact" className="nav-link">Impact</a>
            <a href="#contact" className="nav-link">Journal</a>
          </nav>

          <button onClick={() => setIsCartOpen(true)} className="btn-root-primary" style={{ padding: '8px 18px', fontSize: '0.78rem' }}>
            <ShoppingBag style={{ width: 15, height: 15 }} />
            <span>CART ({cartItemCount})</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          
          <div>
            <div className="badge-tag">
              <Feather style={{ width: 14, height: 14 }} />
              <span>100% Plant & Earth Sourced</span>
            </div>

            <h1 className="hero-title">
              BUILT <br />
              BY NATURE.
            </h1>

            <p className="hero-description">
              ROOTSOLE sneakers are crafted from natural materials for modern movement. Unrivaled anatomical comfort engineered to tread lightly on our planet.
            </p>

            <div className="hero-actions-row">
              <a href="#shop" className="btn-root-primary">
                <span>Shop The Collection</span>
                <ArrowUpRight style={{ width: 16, height: 16 }} />
              </a>
              <a href="#materials" className="btn-root-outline">
                <span>Learn Our Story</span>
              </a>
            </div>

            {/* 4 Feature Pillars */}
            <div className="pillars-grid">
              <div className="pillar-item">
                <Feather style={{ width: 18, height: 18, color: '#3a4d39' }} />
                <h4>Natural Materials</h4>
                <p>Responsibly sourced.</p>
              </div>
              <div className="pillar-item">
                <Footprints style={{ width: 18, height: 18, color: '#3a4d39' }} />
                <h4>Built To Move</h4>
                <p>All-day comfort.</p>
              </div>
              <div className="pillar-item">
                <RefreshCw style={{ width: 18, height: 18, color: '#3a4d39' }} />
                <h4>Low Impact</h4>
                <p>Thoughtful design.</p>
              </div>
              <div className="pillar-item">
                <Mountain style={{ width: 18, height: 18, color: '#3a4d39' }} />
                <h4>Inspired By Earth</h4>
                <p>Organic forms.</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div 
              className="hero-card-stage"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 4 + rotationAngle * 0.2}deg) rotateX(${-mousePos.y * 4}deg)`
              }}
            >
              <img src="./hero-sneaker.jpg" alt="ROOTSOLE Terra Runner" />
            </div>
          </div>

        </div>
      </section>

      {/* Materials Matter Section */}
      <section id="materials" className="section section-darker">
        <div className="container">
          <div className="section-header">
            <div className="badge-tag">
              <ShieldCheck style={{ width: 14, height: 14 }} />
              <span>Material Science</span>
            </div>
            <h2 className="section-title">MATERIALS MATTER.</h2>
            <p className="hero-description" style={{ marginTop: 8 }}>
              At ROOTSOLE, every material is chosen with purpose. Crafted for comfort. Designed for impact.
            </p>
          </div>

          <div className="materials-grid">
            {MATERIALS.map((mat) => (
              <div key={mat.id} className="material-card">
                <div>
                  <h3>{mat.title}</h3>
                  <div className="sub">{mat.subtitle}</div>
                  <p>{mat.detail}</p>
                </div>
                <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid rgba(28,30,27,0.1)', fontSize: '0.72rem', fontWeight: 800, color: '#3a4d39' }}>
                  100% TRACEABLE & NATURAL
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Shop Section */}
      <section id="shop" className="section">
        <div className="container shop-grid">
          
          <div>
            <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: 20, overflow: 'hidden', background: '#dfd5c2', marginBottom: 16 }}>
              <img src={selectedModel.image} alt={selectedModel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {SNEAKER_MODELS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModel(m)}
                  style={{
                    padding: 12,
                    borderRadius: 8,
                    border: selectedModel.id === m.id ? '2px solid #1c1e1b' : '1px solid rgba(28,30,27,0.15)',
                    background: selectedModel.id === m.id ? '#1c1e1b' : '#f4ede2',
                    color: selectedModel.id === m.id ? '#fff' : '#1c1e1b',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  {m.color.split('/')[0]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#3a4d39', marginBottom: 4 }}>{selectedModel.color}</div>
            <h2 className="font-hero" style={{ fontSize: '2.6rem', color: '#1c1e1b', marginBottom: 8 }}>{selectedModel.name}</h2>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#3a4d39', marginBottom: 16 }}>${selectedModel.price.toFixed(2)}</div>
            <p style={{ fontSize: '0.9rem', color: 'rgba(28,30,27,0.8)', lineHeight: 1.6, marginBottom: 24 }}>{selectedModel.description}</p>

            <div style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: 8 }}>Select Size (US Men/Women)</div>
            <div className="size-grid">
              {SIZES.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`size-btn ${selectedSize === sz ? 'active' : ''}`}
                >
                  US {sz}
                </button>
              ))}
            </div>

            <button onClick={addToCart} className="btn-root-primary" style={{ width: '100%', padding: '16px 28px' }}>
              <span>Add To Cart • ${selectedModel.price.toFixed(2)}</span>
              <ArrowUpRight style={{ width: 16, height: 16 }} />
            </button>
          </div>

        </div>
      </section>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="cart-drawer-backdrop">
          <div className="cart-drawer">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid rgba(28,30,27,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ShoppingBag style={{ width: 18, height: 18, color: '#3a4d39' }} />
                  <h3 className="font-hero" style={{ fontSize: '1.6rem' }}>YOUR CART</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <X style={{ width: 20, height: 20 }} />
                </button>
              </div>

              <div style={{ maxHeight: '55vh', overflowY: 'auto', padding: '16px 0' }}>
                {cart.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#7d7971' }}>
                    <p>Your cart is empty.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.cartId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderRadius: 10, background: '#f4ede2', marginBottom: 10 }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.85rem' }}>{item.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#3a4d39', fontWeight: 700 }}>Size: US {item.size} • ${item.price} each</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                          <button onClick={() => updateQuantity(item.cartId, -1)} style={{ width: 22, height: 22, background: '#dfd5c2', border: 'none', borderRadius: 4, cursor: 'pointer' }}>-</button>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartId, 1)} style={{ width: 22, height: 22, background: '#dfd5c2', border: 'none', borderRadius: 4, cursor: 'pointer' }}>+</button>
                        </div>
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderTop: '1px solid rgba(28,30,27,0.1)' }}>
                <span style={{ color: '#7d7971', fontWeight: 700 }}>Subtotal</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800 }}>${cartTotal.toFixed(2)}</span>
              </div>
              <button 
                disabled={cart.length === 0}
                onClick={() => {
                  confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
                  showToast("Proceeding to carbon-neutral checkout...");
                }}
                className="btn-root-primary" 
                style={{ width: '100%' }}
              >
                Checkout • ${cartTotal.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="container footer-grid">
          <div>
            <div className="font-hero" style={{ fontSize: '2rem', marginBottom: 12 }}>ROOTSOLE</div>
            <p style={{ maxWidth: 300, lineHeight: 1.6, color: '#a8a49c' }}>Nature isn't a trend. It's our foundation. Footwear crafted from renewable materials.</p>
          </div>
          <div className="footer-col">
            <h4>Footwear</h4>
            <ul>
              <li><a href="#shop">Terra Runner</a></li>
              <li><a href="#materials">Natural Cork Footbed</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Sustainability</h4>
            <ul>
              <li><a href="#">LWG Gold Suede</a></li>
              <li><a href="#">Closed-Loop Recycling</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Portland Lab</h4>
            <p style={{ color: '#a8a49c' }}>support@rootsole.earth</p>
          </div>
        </div>

        <div className="container footer-bottom">
          © 2026 ROOTSOLE Footwear Co. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
