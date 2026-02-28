import React, { useState, useMemo, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import AdminPanel, { getMergedInventory } from './components/AdminPanel';
import { Product, Category, CartItem } from './types';

// Assets
const LOGO = '/images/wingsofofrtuning.png'; 
const PLUG_PHOTO = '/images/plug-photo.jpg'; // Sharp square profile photo
const IG_HANDLE = '661ro_resellz';

// New Asset for Corner Decor
const CORNER_WINGS = '/images/corner-wings.png';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filterBrand, setFilterBrand] = useState('ALL');
  const [filterCategory, setFilterCategory] = useState<Category>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('wof_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { 
      return []; 
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [inventory, setInventory] = useState<Product[]>([]);
  const [copied, setCopied] = useState(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Persist cart
  useEffect(() => {
    try { localStorage.setItem('wof_cart', JSON.stringify(cart)); } catch {}
  },[cart]);

  // Load inventory
  useEffect(() => {
    setInventory(getMergedInventory());
  }, [showAdmin]);

  // Lock body scroll when modals open
  useEffect(() => {
    document.body.style.overflow = (isCartOpen || selectedProduct !== null || showAdmin) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen, selectedProduct, showAdmin]);

  const categories: Category[] = ['All', 'Fragrance', 'Apparel', 'Sneakers'];

  const brands = useMemo(() => {
    const source = filterCategory === 'All' ? inventory : inventory.filter(p => p.category === filterCategory);
    return ['ALL', ...Array.from(new Set(source.map(p => p.brand))).sort()];
  }, [filterCategory, inventory]);

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

  // Sections for non-filtered view
  const newArrivals = useMemo(() => [...inventory].reverse().slice(0, 4), [inventory]);
  const fragrances = useMemo(() => inventory.filter(p => p.category === 'Fragrance'), [inventory]);
  const sneakers = useMemo(() => inventory.filter(p => p.category === 'Sneakers'), [inventory]);
  const apparel = useMemo(() => inventory.filter(p => p.category === 'Apparel'), [inventory]);

  const addToCart = (product: Product, selectedSize?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.ids[0] === product.ids[0] && item.selectedSize === selectedSize);
      if (existing) {
        return prev.map(item => item.ids[0] === product.ids[0] && item.selectedSize === selectedSize ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, selectedSize }];
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
    const msg = `Hi, I'd like to place an order for local meetup:\n\n${lines.join('\n')}\n\nTotal: $${cartTotal}`;
    try { await navigator.clipboard.writeText(msg); } catch {}
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      window.open(`https://ig.me/m/${IG_HANDLE}`, '_blank');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#e8e6e1] font-sans pb-20 selection:bg-[#e8e6e1] selection:text-[#0c0c0e]">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .subtle-shadow { box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.4); }
        .subtle-glow { filter: drop-shadow(0 0 8px rgba(232, 230, 225, 0.2)); }
      `}</style>

      {/* Decorative Corner Wings - Screen Edges */}
      <img src={CORNER_WINGS} alt="decorative" className="fixed top-0 left-0 w-32 h-auto opacity-40 mix-blend-screen pointer-events-none z-50 filter grayscale" style={{ transform: 'rotate(-90deg)' }} />
      <img src={CORNER_WINGS} alt="decorative" className="fixed bottom-0 right-0 w-32 h-auto opacity-40 mix-blend-screen pointer-events-none z-50 filter grayscale" style={{ transform: 'scaleX(-1)' }} />

      {/* Top Nav */}
      <nav className="fixed top-0 z-40 bg-[#0c0c0e]/90 backdrop-blur-sm h-20 flex items-center justify-between px-6 md:px-12 w-full">
        <div className="flex items-center gap-3">
          <img src={LOGO} alt="Wings of Fortune" className="h-10 md:h-12 w-auto object-contain filter invert opacity-90 subtle-glow" />
        </div>
        <div className="flex items-center gap-6">
          <a href={`https://instagram.com/${IG_HANDLE}`} target="_blank" rel="noopener noreferrer" className="hidden sm:block text-[#a19f99] hover:text-white transition-colors text-xs font-sans uppercase tracking-[0.2em]">
            @{IG_HANDLE}
          </a>
          <button 
            onClick={() => setIsCartOpen(true)} 
            className="flex items-center gap-3 bg-[#161619] text-[#e8e6e1] px-6 py-3 rounded-full hover:bg-white/10 transition-all text-xs font-semibold uppercase tracking-[0.1em] sublte-shadow"
          >
            <span>Cart</span>
            {totalCartItems > 0 && (
              <span className="bg-[#e8e6e1] text-[#0c0c0e] px-2 py-0.5 rounded-full text-[10px] font-bold leading-none">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section with Soft Blend */}
      <header className="relative w-full pt-44 pb-28 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Subtle Background Art */}
        <div 
          className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none filter invert subtle-glow"
          style={{ backgroundImage: `url(${LOGO})`, backgroundPosition: 'center top', backgroundSize: '600px', backgroundRepeat: 'no-repeat' }}
        ></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#0c0c0e]/80 to-[#0c0c0e] pointer-events-none"></div>
        
        <h1 className="relative z-10 font-serif font-bold text-6xl md:text-8xl tracking-tight text-[#e8e6e1] drop-shadow-lg">
          Wings of Fortune
        </h1>
        <p className="relative z-10 text-xs mt-6 text-[#a19f99] font-sans uppercase tracking-[0.3em]">
          Curated Exoterica • 661 Local
        </p>
      </header>

      {/* Filter Bar with Background Shift */}
      <div className="bg-[#161619]/50 backdrop-blur-md sticky top-0 z-30 shadow-md">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-5 flex items-center gap-6 overflow-x-auto hide-scrollbar whitespace-nowrap text-xs font-sans uppercase tracking-[0.1em]">
          <div className="flex items-center gap-2 pr-6 border-r border-[#2a2a2e]">
            <span className="text-[#a19f99]">Seek</span>
            <input 
              type="text" 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              placeholder="✦✦✦" 
              className="bg-transparent outline-none w-24 focus:w-40 transition-all text-[#e8e6e1] placeholder-[#52525b]"
            />
          </div>
          <select 
            value={filterBrand} 
            onChange={e => setFilterBrand(e.target.value)} 
            className="bg-transparent text-[#e8e6e1] outline-none cursor-pointer pr-6 border-r border-[#2a2a2e] uppercase appearance-none font-medium"
          >
            {brands.map(b => <option key={b} value={b} className="bg-[#0c0c0e]">{b === 'ALL' ? 'All Origins' : b}</option>)}
          </select>
          <div className="flex items-center gap-3">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => { setFilterCategory(cat); setFilterBrand('ALL'); }} 
                className={`px-4 py-2 rounded-full transition-all ${filterCategory === cat ? 'bg-[#e8e6e1] text-[#0c0c0e] font-semibold' : 'text-[#a19f99] hover:text-[#e8e6e1] hover:bg-[#161619]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-[1800px] mx-auto px-6 md:px-12 pt-16 w-full">
        
        {isFiltering ? (
          <>
            <div className="flex items-baseline gap-4 mb-10 pb-4 relative">
              <h2 className="text-3xl font-serif font-semibold text-[#e8e6e1]">Manifestations</h2>
              <span className="text-xs text-[#a19f99] uppercase tracking-[0.1em]">[{filteredProducts.length} Items]</span>
              <div className="absolute bottom-0 left-0 w-32 h-px bg-gradient-to-r from-[#52525b] to-transparent"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
              {filteredProducts.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
            </div>
          </>
        ) : (
          <div className="space-y-32">
            
            {/* New Arrivals */}
            {newArrivals.length > 0 && (
              <section>
                <div className="flex items-baseline justify-between mb-10 pb-4 relative">
                  <h2 className="text-3xl font-serif font-semibold text-[#e8e6e1]">Recent Gatherings</h2>
                  <div className="absolute bottom-0 left-0 w-32 h-px bg-gradient-to-r from-[#52525b] to-transparent"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8">
                  {newArrivals.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
                </div>
              </section>
            )}

            {/* Fragrances */}
            {fragrances.length > 0 && (
              <section>
                <div className="flex items-baseline gap-4 mb-10 pb-4 relative">
                  <h2 className="text-3xl font-serif font-semibold text-[#e8e6e1]">Essences & Elixirs</h2>
                  <span className="text-xs text-[#a19f99] uppercase tracking-[0.1em]">[{fragrances.length}]</span>
                  <div className="absolute bottom-0 left-0 w-32 h-px bg-gradient-to-r from-[#52525b] to-transparent"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                  {fragrances.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
                </div>
              </section>
            )}

            {/* Sneakers */}
            {sneakers.length > 0 && (
              <section>
                <div className="flex items-baseline gap-4 mb-10 pb-4 relative">
                  <h2 className="text-3xl font-serif font-semibold text-[#e8e6e1]">Artifacts</h2>
                  <span className="text-xs text-[#a19f99] uppercase tracking-[0.1em]">[{sneakers.length}]</span>
                  <div className="absolute bottom-0 left-0 w-32 h-px bg-gradient-to-r from-[#52525b] to-transparent"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                  {sneakers.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
                </div>
              </section>
            )}

            {/* Apparel */}
            {apparel.length > 0 && (
              <section>
                <div className="flex items-baseline gap-4 mb-10 pb-4 relative">
                  <h2 className="text-3xl font-serif font-semibold text-[#e8e6e1]">Garments</h2>
                  <span className="text-xs text-[#a19f99] uppercase tracking-[0.1em]">[{apparel.length}]</span>
                  <div className="absolute bottom-0 left-0 w-32 h-px bg-gradient-to-r from-[#52525b] to-transparent"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                  {apparel.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
                </div>
              </section>
            )}

          </div>
        )}

        {/* Ethereal 'How to Order' Section */}
        <section className="mt-40 pt-20 relative border-t border-[#2a2a2e]">
          {/* Decorative Corner Wings - Section Corner */}
          <img src={CORNER_WINGS} alt="decorative" className="absolute top-0 right-0 w-24 h-auto opacity-30 mix-blend-screen pointer-events-none filter grayscale" style={{ transform: 'scaleX(-1) translateY(-50%)' }} />

          <div className="flex flex-col md:flex-row gap-16 max-w-5xl mx-auto items-center">
            <div className="w-full md:w-2/5 flex-shrink-0 relative rounded-2xl overflow-hidden sublte-shadow">
              <img src={PLUG_PHOTO} alt="Local Delivery" className="w-full aspect-[4/5] object-cover grayscale opacity-90 blur-[1px] group-hover:blur-0 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent"></div>
            </div>
            <div className="w-full md:w-3/5 flex flex-col justify-center">
              <h2 className="text-4xl font-serif font-semibold text-[#e8e6e1] mb-5 tracking-tight">The Ritual of Acquisition</h2>
              <p className="text-[#a19f99] font-sans text-sm mb-12 max-w-xl leading-relaxed">
                We traverse the 661. Hand-delivered directly to your sanctuary. No merchant fees, no hidden tithes. A seamless transfer.
              </p>
              <div className="space-y-6">
                <div className="bg-[#161619] p-6 rounded-xl subtle-shadow flex items-center gap-5">
                  <span className="text-lg font-serif italic text-[#52525b]">i.</span>
                  <div>
                    <h3 className="text-[#e8e6e1] font-sans text-sm font-semibold uppercase tracking-wider mb-1">Add to Archive</h3>
                    <p className="text-[#a19f99] text-xs leading-relaxed">Select artifacts and consign them to your temporary bag.</p>
                  </div>
                </div>
                <div className="bg-[#161619] p-6 rounded-xl subtle-shadow flex items-center gap-5">
                  <span className="text-lg font-serif italic text-[#52525b]">ii.</span>
                  <div>
                    <h3 className="text-[#e8e6e1] font-sans text-sm font-semibold uppercase tracking-wider mb-1">Send your Decree</h3>
                    <p className="text-[#a19f99] text-xs leading-relaxed">Secure your list at checkout, then paste it within our Instagram correspondences.</p>
                  </div>
                </div>
                <div className="bg-[#161619] p-6 rounded-xl subtle-shadow flex items-center gap-5">
                  <span className="text-lg font-serif italic text-[#52525b]">iii.</span>
                  <div>
                    <h3 className="text-[#e8e6e1] font-sans text-sm font-semibold uppercase tracking-wider mb-1">Manifestation</h3>
                    <p className="text-[#a19f99] text-xs leading-relaxed">We arrange a local gathering place. Validate artifacts and complete the offering in person.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="pt-24 pb-12 mt-32 flex flex-col items-center relative border-t border-[#2a2a2e]">
        {/* Decorative Corner Wings - Footer Corner */}
        <img src={CORNER_WINGS} alt="decorative" className="absolute top-0 left-0 w-24 h-auto opacity-30 mix-blend-screen pointer-events-none filter grayscale" style={{ transform: 'rotate(-90deg) translateY(-50%)' }} />

        {/* Footer Brand Stamp */}
        <img src={LOGO} alt="Wings of Fortune" className="w-28 md:w-36 h-auto opacity-20 filter invert mb-10 pointer-events-none subtle-glow" />
        
        <div className="text-center text-xs font-sans uppercase tracking-[0.2em] text-[#a19f99] space-y-4">
          <p>Wings of Fortune © 2026 • 661 Local</p>
          <a href={`https://instagram.com/${IG_HANDLE}`} target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
            Correspondence: @{IG_HANDLE}
          </a>
          <button onClick={() => setShowAdmin(true)} className="hover:text-white transition-colors pt-4 opacity-60">Seek Archive</button>
        </div>
      </footer>

      {/* DREAMY QUICK VIEW MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#0c0c0e]/95 backdrop-blur-md">
          {/* Decorative Corner Wings - Modal Corner */}
          <img src={CORNER_WINGS} alt="decorative" className="fixed top-0 left-0 w-40 h-auto opacity-30 mix-blend-screen pointer-events-none z-[210] filter grayscale" style={{ transform: 'rotate(-90deg)' }} />

          <div className="bg-[#0c0c0e] w-full max-w-5xl flex flex-col md:flex-row relative rounded-3xl overflow-hidden subtle-shadow max-h-[90vh]">
            
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-5 right-5 z-20 bg-[#161619] w-10 h-10 rounded-full flex items-center justify-center text-[#e8e6e1] hover:bg-white/10 transition-colors text-xs sublte-shadow"
            >
              ✕
            </button>
            
            {/* Soft Warm-Stone Art Gallery Image Box */}
            <div className="w-full md:w-1/2 bg-[#e0dfdb] p-8 md:p-14 flex items-center justify-center min-h-[300px] md:min-h-[500px]">
              <img 
                src={selectedProduct.images?.[0] || selectedProduct.image} 
                alt={selectedProduct.name}
                className={`max-w-full max-h-[40vh] md:max-h-[60vh] drop-shadow-2xl transition-all duration-700 ${selectedProduct.category === 'Sneakers' ? 'object-contain mix-blend-multiply' : 'object-cover mix-blend-multiply rounded-xl'}`} 
              />
            </div>
            
            <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col overflow-y-auto hide-scrollbar bg-gradient-to-b from-[#161619] to-[#0c0c0e]">
              <span className="text-xs font-sans font-medium tracking-[0.2em] uppercase text-[#a19f99] mb-3">{selectedProduct.brand}</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#e8e6e1] mb-3 leading-tight tracking-tight">{selectedProduct.name}</h2>
              <p className="text-2xl font-sans font-semibold text-[#e8e6e1] mb-10 tracking-wide">${selectedProduct.price}</p>
              
              <div className="text-sm text-[#a19f99] mb-10 leading-relaxed space-y-6 relative">
                <div className="absolute top-0 left-0 w-16 h-px bg-[#52525b]"></div>
                <p className="font-sans font-light pt-6">{selectedProduct.details?.description}</p>
                <div className="space-y-1.5 font-sans text-xs uppercase tracking-wider text-[#71717a]">
                  <p><span className="text-[#e8e6e1] font-medium">Dimension:</span> {selectedProduct.spec}</p>
                  <p><span className="text-[#e8e6e1] font-medium">State:</span> {selectedProduct.condition}</p>
                </div>
              </div>

              {(selectedProduct.category === 'Apparel' || selectedProduct.category === 'Sneakers') ? (
                <div className="mb-6 mt-auto">
                  <p className="text-xs uppercase tracking-widest text-[#a19f99] mb-4 font-sans font-medium">Seek Size</p>
                  <div className="flex flex-wrap gap-3">
                    {(selectedProduct.category === 'Sneakers' ? ['7','8','9','10','11','12','13'] : ['S','M','L','XL']).map(s => (
                      <button 
                        key={s} 
                        onClick={() => addToCart(selectedProduct, s)} 
                        className="bg-[#161619] text-[#e8e6e1] text-xs font-semibold px-5 py-3.5 rounded-full hover:bg-[#e8e6e1] hover:text-[#0c0c0e] transition-all flex-1 text-center font-sans tracking-wide sublte-shadow"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => addToCart(selectedProduct)} 
                  className="bg-[#e8e6e1] text-[#0c0c0e] font-semibold font-sans uppercase tracking-[0.1em] py-4.5 w-full text-xs rounded-full hover:bg-white transition-all mt-auto sublte-shadow subtle-glow"
                >
                  consigned to Archive
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ETHEREAL CART SIDEBAR */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#0c0c0e]/95 backdrop-blur-xl border-l border-[#2a2a2e]/50 z-[300] shadow-[0_0_60px_rgba(0,0,0,0.4)] transform transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Decorative Corner Wings - Sidebar Corner */}
        <img src={CORNER_WINGS} alt="decorative" className="absolute bottom-0 right-0 w-32 h-auto opacity-20 mix-blend-screen pointer-events-none filter grayscale" style={{ transform: 'scaleX(-1) translateY(10%)' }} />

        <div className="p-8 pb-6 border-b border-[#2a2a2e] flex justify-between items-center bg-[#0c0c0e]">
          <h2 className="font-serif font-bold text-2xl tracking-tight text-[#e8e6e1]">Archive ({totalCartItems})</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-[#a19f99] hover:text-white w-8 h-8 rounded-full flex items-center justify-center bg-[#161619] transition-colors">✕</button>
        </div>
        
        <div className="bg-[#e8e6e1] text-[#0c0c0e] p-4 text-center text-xs font-sans uppercase font-bold tracking-[0.1em]">
          ✦ Ritual Exchange. Present offering at drop-off. ✦
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar p-8 space-y-8">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#52525b] gap-6 opacity-60">
              <img src={LOGO} alt="Empty Stack" className="w-20 h-auto filter invert opacity-30 mix-blend-screen subtle-glow" />
              <p className="text-xs uppercase tracking-[0.2em] font-sans">the archive is void.</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div key={i} className="flex gap-5">
                <div className="w-20 h-24 bg-[#e0dfdb] rounded-lg flex items-center justify-center flex-shrink-0 p-3 shadow-inner relative overflow-hidden">
                  <img src={item.images?.[0] || item.image} alt={item.name} className="relative z-10 max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-md" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <p className="text-xs text-[#a19f99] uppercase font-sans tracking-wide mb-1.5">{item.brand}</p>
                    <p className="font-serif text-[#e8e6e1] text-base font-semibold leading-tight line-clamp-2">{item.name}</p>
                    {item.selectedSize && <p className="text-xs text-[#71717a] font-sans mt-2">Dimension: {item.selectedSize}</p>}
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center gap-4 bg-[#161619] rounded-full px-3 py-1 subtle-shadow">
                      <button onClick={() => updateCartQuantity(item.ids[0], -1, item.selectedSize)} className="text-[#a19f99] hover:text-white text-sm px-1">−</button>
                      <span className="text-xs font-sans text-[#e8e6e1] w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.ids[0], 1, item.selectedSize)} className="text-[#a19f99] hover:text-white text-sm px-1">+</button>
                    </div>
                    <span className="font-sans font-medium text-[#d4d4d8] tracking-wide">${item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 border-t border-[#2a2a2e] bg-[#0c0c0e] relative">
            <div className="flex justify-between font-serif font-semibold text-xl mb-8 uppercase text-[#e8e6e1]">
              <span>Consignment Offering</span><span className="font-sans not-italic tracking-wide">${cartTotal}</span>
            </div>
            <button 
              onClick={handleDM} 
              className={`w-full py-4.5 rounded-full uppercase font-sans font-bold text-xs tracking-[0.1em] transition-all duration-300 sublte-shadow ${copied ? 'bg-[#161619] text-[#e8e6e1] scale-95 opacity-60' : 'bg-[#e8e6e1] text-[#0c0c0e] hover:bg-white hover:subtle-glow'}`}
            >
              {copied ? 'Consignment Decree Copied...' : 'Consign Decree & Open Corrs.'}
            </button>
          </div>
        )}
      </div>

      {/* FLOATING DREAMY TOAST */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#e8e6e1] text-[#0c0c0e] px-8 py-4 rounded-full text-xs font-sans font-semibold uppercase tracking-[0.1em] z-[400] shadow-[0_10px_40px_rgba(232,230,225,0.2)] animate-slideUp">
          {toast}
        </div>
      )}
      
      {showAdmin && <AdminPanel onClose={() => { setShowAdmin(false); setInventory(getMergedInventory()); }} />}
      <Analytics />
    </div>
  );
};

// Dreamy Ethereal Product Card
const ProductCard = ({ product, onClick }: { product: Product, onClick: () => void }) => {
  return (
    <div className="flex flex-col group h-full cursor-pointer" onClick={onClick}>
      <div 
        className="aspect-[4/5] bg-[#e0dfdb] rounded-xl relative p-6 flex items-center justify-center transition-all duration-1000 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(232,230,225,0.06)] overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#d5d4d0]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0"></div>
        
        {/* SOFT FLOATING PILL BADGES */}
        <div className="absolute top-3 left-3 bg-[#0c0c0e]/50 backdrop-blur-md text-[#e8e6e1] px-3.5 py-1.5 rounded-full font-sans text-[9px] font-medium uppercase tracking-[0.1em] z-10 shadow-md">
          State: {product.condition}
        </div>

        <div className="absolute bottom-3 right-3 bg-[#e8e6e1]/80 backdrop-blur-md text-[#0c0c0e] px-3.5 py-1.5 rounded-full font-sans text-xs font-semibold tracking-wide z-10 shadow-lg">
          ${product.price}
        </div>

        <img 
          src={product.images?.[0] || product.image} 
          alt={product.name}
          className={`w-full h-full relative z-10 transition-transform duration-1000 group-hover:scale-[1.03] ${product.category === 'Sneakers' ? 'object-contain' : 'object-cover mix-blend-multiply rounded-lg'}`} 
        />
      </div>
      
      <div className="pt-5 flex flex-col flex-1 px-1">
        <p className="text-[10px] text-[#a19f99] font-sans font-medium uppercase tracking-[0.3em] mb-2">{product.brand}</p>
        <h3 
          className="font-serif font-medium text-lg text-[#e8e6e1] leading-snug mb-5 flex-1 line-clamp-2" 
        >
          {product.name}
        </h3>
        <button 
          className="mt-auto bg-[#161619] text-[#e8e6e1] py-3 rounded-full w-full text-xs font-semibold font-sans uppercase tracking-[0.1em] group-hover:bg-[#e8e6e1] group-hover:text-[#0c0c0e] group-hover:shadow-md transition-all duration-500"
        >
          {product.category === 'Fragrance' ? 'Gather Essence' : 'Manifest Dimensions'}
        </button>
      </div>
    </div>
  );
};

export default App;
