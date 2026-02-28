import React, { useState, useMemo, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Product, Category, CartItem } from './types';
import AdminPanel, { getMergedInventory } from './components/AdminPanel';

const IG_HANDLE = '661ro_resellz';

// Replace this with a picture of yourself for the "Meet the Plug" section!
const PLUG_PHOTO = '/images/plug-photo.jpg'; 
const ENGRAVING_WATERMARK = '/images/corner-wing.png';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const[filterBrand, setFilterBrand] = useState('ALL');
  const [filterCategory, setFilterCategory] = useState<Category>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('wof_cart');
      return saved ? JSON.parse(saved) :[];
    } catch { 
      return []; 
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [inventory, setInventory] = useState<Product[]>([]);
  const[copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    try { localStorage.setItem('wof_cart', JSON.stringify(cart)); } catch {}
  }, [cart]);

  useEffect(() => {
    setInventory(getMergedInventory());
  }, [showAdmin]);

  useEffect(() => {
    document.body.style.overflow = (isCartOpen || selectedProduct !== null || showAdmin) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  },[isCartOpen, selectedProduct, showAdmin]);

  const categories: Category[] =['All', 'Fragrance', 'Apparel', 'Sneakers'];

  const brands = useMemo(() => {
    const source = filterCategory === 'All' ? inventory : inventory.filter(p => p.category === filterCategory);
    return['ALL', ...Array.from(new Set(source.map(p => p.brand))).sort()];
  },[filterCategory, inventory]);

  const isFiltering = debouncedSearch !== '' || filterCategory !== 'All' || filterBrand !== 'ALL';

  const filteredProducts = useMemo(() => {
    return inventory.filter(product => {
      const s = debouncedSearch.toLowerCase();
      const matchesSearch = product.name.toLowerCase().includes(s) || product.brand.toLowerCase().includes(s);
      const matchesBrand = filterBrand === 'ALL' || product.brand === filterBrand;
      const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
      return matchesSearch && matchesBrand && matchesCategory;
    });
  },[debouncedSearch, filterBrand, filterCategory, inventory]);

  const latestAdded = useMemo(() =>[...inventory].reverse().slice(0, 4), [inventory]);
  const fragrances = useMemo(() => inventory.filter(p => p.category === 'Fragrance'), [inventory]);
  const sneakers = useMemo(() => inventory.filter(p => p.category === 'Sneakers'), [inventory]);
  const apparel = useMemo(() => inventory.filter(p => p.category === 'Apparel'), [inventory]);

  const addToCart = (product: Product, selectedSize?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.ids[0] === product.ids[0] && item.selectedSize === selectedSize);
      if (existing) {
        return prev.map(item => item.ids[0] === product.ids[0] && item.selectedSize === selectedSize ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return[...prev, { ...product, quantity: 1, selectedSize }];
    });
    setSelectedProduct(null);
    setToast(selectedSize ? `${product.name} (${selectedSize}) added.` : `${product.name} added.`);
    setTimeout(() => setToast(null), 2500);
  };

  const removeFromCart = (id: string, size?: string) => setCart(prev => prev.filter(i => !(i.ids[0] === id && i.selectedSize === size)));
  const updateCartQuantity = (id: string, delta: number, size?: string) => setCart(prev => prev.map(i => { if (i.ids[0] !== id || i.selectedSize !== size) return i; const q = i.quantity + delta; return q > 0 && q <= i.stock ? { ...i, quantity: q } : q <= 0 ? null : i; }).filter(Boolean) as CartItem[]);
  
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleDM = async () => {
    const lines = cart.map(i => `• ${i.brand} - ${i.name} ${i.selectedSize ? `(Size ${i.selectedSize})` : ''} x${i.quantity} — $${i.price * i.quantity}`);
    const msg = `Yo, I want to lock in this order for local meetup:\n\n${lines.join('\n')}\n\nTotal: $${cartTotal}`;
    try { await navigator.clipboard.writeText(msg); } catch {}
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      window.open(`https://ig.me/m/${IG_HANDLE}`, '_blank');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f4f4f5] text-[#18181b] flex flex-col relative font-sans">
      
      {/* Dynamic Fonts & Base Styles Injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Space+Grotesk:wght@300;400;600;700&display=swap');
        .font-grotesk { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'DM Mono', monospace; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .bg-watermark {
          background-image: url('${ENGRAVING_WATERMARK}');
          background-repeat: repeat;
          background-size: 300px;
          opacity: 0.04;
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      {/* Esoteric Engraving Watermark Background */}
      <div className="bg-watermark"></div>

      {/* Top Nav */}
      <nav className="fixed top-0 w-full bg-[#f4f4f5]/90 backdrop-blur-md border-b border-[#18181b]/10 z-40 h-[70px] flex items-center justify-between px-6 md:px-12">
        <div className="font-grotesk font-bold text-xl md:text-2xl tracking-tighter uppercase">Wings of Fortune</div>
        <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-2 border border-[#18181b] px-4 py-1.5 hover:bg-[#18181b] hover:text-[#f4f4f5] transition-colors">
          <span className="font-mono text-xs font-medium uppercase mt-0.5">Order Stack ({totalCartItems})</span>
        </button>
      </nav>

      {/* Hero */}
      <header className="pt-[140px] pb-12 px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        <h1 className="font-grotesk font-bold text-6xl md:text-8xl lg:text-[9rem] tracking-tighter uppercase leading-[0.9]">
          Wings of<br/>Fortune
        </h1>
        <p className="font-mono text-sm md:text-base mt-6 text-[#18181b]/60 uppercase tracking-widest">
          The 661 Underground Archive
        </p>
      </header>

      {/* Minimal Filter Bar */}
      <div className="sticky top-[70px] z-30 bg-[#f4f4f5] border-y border-[#18181b]/10">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center overflow-x-auto hide-scrollbar h-14 gap-6 font-mono text-xs uppercase">
          <div className="flex items-center gap-2 border-r border-[#18181b]/10 pr-6 flex-shrink-0">
            <span className="text-[#18181b]/50">Search</span>
            <input 
              type="text" 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              placeholder="//" 
              className="bg-transparent border-b border-[#18181b]/20 focus:border-[#18181b] outline-none w-24 focus:w-32 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 border-r border-[#18181b]/10 pr-6 flex-shrink-0">
            <span className="text-[#18181b]/50">Brand</span>
            <select value={filterBrand} onChange={e => setFilterBrand(e.target.value)} className="bg-transparent outline-none cursor-pointer font-bold">
              {brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-6 flex-shrink-0">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => handleCategoryChange(cat)} 
                className={`${filterCategory === cat ? 'font-bold border-b-2 border-[#18181b]' : 'text-[#18181b]/50 hover:text-[#18181b]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 px-6 md:px-12 pt-12 pb-24 max-w-[1800px] mx-auto w-full relative z-10">
        
        {isFiltering ? (
          <>
            <div className="flex items-end gap-4 mb-8 border-b border-[#18181b]/10 pb-4">
              <h2 className="font-grotesk font-bold text-3xl uppercase tracking-tight">Search Results</h2>
              <span className="font-mono text-xs mb-1">[{filteredProducts.length}]</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {filteredProducts.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
            </div>
          </>
        ) : (
          <div className="space-y-24">
            
            {/* Latest Added */}
            <section>
              <div className="flex items-end gap-4 mb-6 border-b border-[#18181b]/10 pb-4">
                <h2 className="font-grotesk font-bold text-3xl uppercase tracking-tight">Fresh Hits</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {latestAdded.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
              </div>
            </section>

            {/* MEET THE PLUG SECTION (Trust Builder) */}
            <section className="bg-white border border-[#18181b]/10 p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center shadow-sm">
              <div className="w-full md:w-1/3 aspect-square bg-[#e4e4e7] relative border border-[#18181b]/10 p-2 flex-shrink-0">
                <div className="w-full h-full bg-gray-300 relative overflow-hidden">
                  {/* Replace this img src with your actual photo! */}
                  <img src={PLUG_PHOTO} alt="The Plug" className="w-full h-full object-cover filter grayscale" />
                  <div className="absolute inset-0 flex items-center justify-center text-[#18181b]/30 font-mono text-sm uppercase text-center px-4 mix-blend-multiply">[ Insert Photo of you here ]
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3 space-y-6">
                <div>
                  <h2 className="font-grotesk font-bold text-3xl md:text-5xl uppercase tracking-tight leading-none mb-2">Local to the 661.<br/>Hand-Delivered by Me.</h2>
                  <p className="font-mono text-sm text-[#18181b]/60 uppercase tracking-wide">No sketchy links. No shipping fees. Real local business.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#18181b]/10">
                  <div>
                    <h3 className="font-grotesk font-bold text-lg mb-1">1. Build Stack</h3>
                    <p className="font-mono text-xs text-[#18181b]/70">Add the gear or scents you want to your order stack on this site.</p>
                  </div>
                  <div>
                    <h3 className="font-grotesk font-bold text-lg mb-1">2. Send to DM</h3>
                    <p className="font-mono text-xs text-[#18181b]/70">Hit checkout. It copies your order so you can paste it right into my Instagram DMs.</p>
                  </div>
                  <div>
                    <h3 className="font-grotesk font-bold text-lg mb-1">3. Meet & Pay</h3>
                    <p className="font-mono text-xs text-[#18181b]/70">We lock in a public meetup spot in the 661. You verify the items, you pay, you walk away with heat.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Fragrances */}
            {fragrances.length > 0 && (
              <section>
                <div className="flex items-end gap-4 mb-6 border-b border-[#18181b]/10 pb-4">
                  <h2 className="font-grotesk font-bold text-3xl uppercase tracking-tight">The Fragrance Vault</h2>
                  <span className="font-mono text-xs mb-1">[{fragrances.length}]</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {fragrances.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
                </div>
              </section>
            )}

            {/* Sneakers */}
            {sneakers.length > 0 && (
              <section>
                <div className="flex items-end gap-4 mb-6 border-b border-[#18181b]/10 pb-4">
                  <h2 className="font-grotesk font-bold text-3xl uppercase tracking-tight">Sneaker Archive</h2>
                  <span className="font-mono text-xs mb-1">[{sneakers.length}]</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {sneakers.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
                </div>
              </section>
            )}

            {/* Apparel */}
            {apparel.length > 0 && (
              <section>
                <div className="flex items-end gap-4 mb-6 border-b border-[#18181b]/10 pb-4">
                  <h2 className="font-grotesk font-bold text-3xl uppercase tracking-tight">Essentials / Clothing</h2>
                  <span className="font-mono text-xs mb-1">[{apparel.length}]</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {apparel.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
                </div>
              </section>
            )}

          </div>
        )}
      </main>

      <footer className="border-t border-[#18181b]/10 py-12 flex flex-col items-center gap-6 relative z-10">
        <img src={LOGO} className="h-12 w-auto opacity-30 filter invert" />
        <div className="text-center font-mono text-[10px] uppercase text-[#18181b]/50 space-y-2">
          <p>661 / Wasco, CA • Local Drop-offs Only</p>
          <p className="cursor-pointer hover:text-[#18181b]" onClick={() => setShowAdmin(true)}>Est. 2025 • Admin</p>
        </div>
      </footer>

      {/* QUICK VIEW MODAL (Brutalist Ticket Style) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-[#18181b]/40 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
          <div className="bg-[#f4f4f5] border-2 border-[#18181b] w-full max-w-3xl flex flex-col md:flex-row relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-20 font-mono text-xs border border-[#18181b] px-2 py-1 bg-white hover:bg-[#18181b] hover:text-white transition-colors">CLOSE [X]</button>
            
            <div className="w-full md:w-1/2 bg-white border-b md:border-b-0 md:border-r border-[#18181b] p-8 flex items-center justify-center">
              <img src={selectedProduct.images?.[0] || selectedProduct.image} className={`max-w-full max-h-[40vh] md:max-h-[60vh] ${selectedProduct.category === 'Sneakers' ? 'object-contain' : 'object-cover'}`} />
            </div>
            
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#18181b]/50 mb-2">ID: {selectedProduct.ids[0]}</span>
              <h2 className="font-grotesk font-bold text-3xl uppercase leading-none mb-1">{selectedProduct.brand}</h2>
              <h3 className="font-grotesk text-xl uppercase text-[#18181b]/70 mb-4">{selectedProduct.name}</h3>
              <p className="font-mono text-2xl mb-6">${selectedProduct.price}</p>
              
              <div className="font-mono text-xs space-y-2 border-y border-[#18181b]/10 py-4 mb-6">
                <div className="flex justify-between"><span className="text-[#18181b]/50">Spec:</span><span>{selectedProduct.spec}</span></div>
                <div className="flex justify-between"><span className="text-[#18181b]/50">Category:</span><span>{selectedProduct.category}</span></div>
              </div>

              {(selectedProduct.category === 'Apparel' || selectedProduct.category === 'Sneakers') ? (
                <div className="mb-6">
                  <p className="font-mono text-xs uppercase mb-2">Select Size:</p>
                  <div className="flex flex-wrap gap-2">
                    {(selectedProduct.category === 'Sneakers' ?['7','8','9','10','11','12','13'] : ['S','M','L','XL']).map(s => (
                      <button key={s} onClick={() => addToCart(selectedProduct, s)} className="border border-[#18181b] font-mono text-xs px-4 py-2 hover:bg-[#18181b] hover:text-white transition-colors">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button onClick={() => addToCart(selectedProduct)} className="bg-[#18181b] text-white font-grotesk font-bold uppercase py-4 w-full text-lg hover:bg-black transition-colors mb-4 mt-auto">
                  Add to Stack
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CART SIDEBAR */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white border-l border-[#18181b] z-[300] shadow-2xl transform transition-transform duration-300 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 border-b border-[#18181b] flex justify-between items-center bg-[#f4f4f5]">
          <h2 className="font-grotesk font-bold text-xl uppercase">Order Stack</h2>
          <button onClick={() => setIsCartOpen(false)} className="font-mono text-xs border border-[#18181b] px-2 py-1 hover:bg-[#18181b] hover:text-white transition-colors">CLOSE</button>
        </div>
        
        <div className="bg-[#18181b] text-white p-3 text-center font-mono text-[10px] uppercase tracking-widest">
          No credit card needed. Pay at drop-off.
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <p className="text-center font-mono text-xs text-[#18181b]/40 mt-10">Stack is empty.</p>
          ) : (
            cart.map((item, i) => (
              <div key={i} className="flex gap-4 border border-[#18181b]/10 p-3 bg-[#f4f4f5]">
                <img src={item.images?.[0] || item.image} className="w-16 h-16 object-cover border border-[#18181b]/10" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-grotesk font-bold text-sm leading-tight uppercase">{item.brand}</p>
                    <p className="font-mono text-[10px] uppercase text-[#18181b]/60 truncate">{item.name} {item.selectedSize && `(${item.selectedSize})`}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-3 font-mono text-xs">
                      <button onClick={() => updateCartQuantity(item.ids[0], -1, item.selectedSize)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.ids[0], 1, item.selectedSize)}>+</button>
                    </div>
                    <span className="font-mono font-bold text-sm">${item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-5 border-t border-[#18181b] bg-[#f4f4f5]">
            <div className="flex justify-between font-grotesk font-bold text-xl uppercase mb-4">
              <span>Total</span><span>${cartTotal}</span>
            </div>
            <button 
              onClick={handleDM} 
              className={`w-full py-4 font-grotesk font-bold text-lg uppercase transition-all duration-300 flex items-center justify-center gap-2 ${copied ? 'bg-[#22c55e] text-white' : 'bg-[#0095f6] text-white hover:bg-[#0085db]'}`}
            >
              {copied ? 'Copied! Opening IG...' : 'Copy Order & Open IG'}
            </button>
            <p className="text-center font-mono text-[9px] text-[#18181b]/50 uppercase mt-3">This copies your order list so you can paste it in the DM.</p>
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#18181b] text-white px-6 py-3 font-mono text-xs uppercase tracking-widest z-[400] shadow-xl border border-[#f4f4f5]/20 animate-slideUp">
          {toast}
        </div>
      )}
      
      {showAdmin && <AdminPanel onClose={() => { setShowAdmin(false); setInventory(getMergedInventory()); }} />}
      <Analytics />
    </div>
  );
};

// Reusable Brutalist Product Card
const ProductCard = ({ product, onClick }) => {
  return (
    <div onClick={onClick} className="flex flex-col cursor-pointer group h-full">
      <div className="aspect-[4/5] bg-white border border-[#18181b]/10 relative p-4 flex items-center justify-center mb-3 group-hover:border-[#18181b] transition-colors">
        <img src={product.images?.[0] || product.image} className={`w-full h-full ${product.category === 'Sneakers' ? 'object-contain' : 'object-cover'} mix-blend-multiply group-hover:scale-105 transition-transform duration-500`} />
        <div className="absolute top-2 right-2 bg-white border border-[#18181b] px-2 py-1 font-mono text-xs font-bold shadow-sm">
          ${product.price}
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <p className="font-mono text-[10px] text-[#18181b]/50 uppercase tracking-widest">{product.brand}</p>
        <h3 className="font-grotesk font-bold text-sm uppercase leading-tight mt-1 mb-2 line-clamp-2">{product.name}</h3>
        <button className="mt-auto border border-[#18181b]/20 py-2 w-full font-mono text-[10px] uppercase font-bold text-[#18181b]/60 group-hover:bg-[#18181b] group-hover:text-white group-hover:border-[#18181b] transition-all">
          {product.category === 'Fragrance' ? '+ View Specs' : '+ Select Size'}
        </button>
      </div>
    </div>
  );
};

export default App;
