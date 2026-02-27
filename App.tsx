import React, { useState, useMemo, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Ticker from './components/Ticker';
import InventoryTable from './components/InventoryTable';
import ProductModal from './components/ProductModal';
import CartSidebar from './components/CartSidebar';
import AdminPanel, { getMergedInventory } from './components/AdminPanel';
import { Product, Category, CartItem } from './types';

// IMPORTANT: Use the CDN for the logo
const LOGO = 'https://cdn.jsdelivr.net/gh/informativelearning/resellingking@main/public/images/wingsofofrtuning.png';
const IG_HANDLE = '661ro_resellz';

const getBrandInitials = (b: string) => {
  if (b === 'ALL') return '✵';
  if (b.toLowerCase().includes('yves')) return 'YSL';
  if (b.toLowerCase().includes('fear')) return 'FOG';
  if (b.toLowerCase().includes('giorgio')) return 'GA';
  if (b.toLowerCase().includes('jordan')) return 'J';
  if (b.toLowerCase().includes('azzaro')) return 'AZ';
  return b.charAt(0).toUpperCase();
};

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const[debouncedSearch, setDebouncedSearch] = useState('');
  const [filterBrand, setFilterBrand] = useState('ALL');
  const [filterCategory, setFilterCategory] = useState<Category>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('wof_cart');
      return saved ? JSON.parse(saved) :[];
    } catch { return []; }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [inventory, setInventory] = useState<Product[]>([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    try {
      localStorage.setItem('wof_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    setInventory(getMergedInventory());
  },[showAdmin]);

  useEffect(() => {
    const isAnyModalOpen = isCartOpen || isBrandDropdownOpen || selectedProduct !== null || showAdmin;
    document.body.style.overflow = isAnyModalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen, isBrandDropdownOpen, selectedProduct, showAdmin]);

  const categories: Category[] = ['All', 'Fragrance', 'Apparel', 'Sneakers'];

  const brands: string[] = useMemo(() => {
    const source = filterCategory === 'All' ? inventory : inventory.filter(p => p.category === filterCategory);
    const unique = Array.from(new Set(source.map(p => p.brand))).sort();
    return ['ALL', ...unique];
  }, [filterCategory, inventory]);

  const handleCategoryChange = (cat: Category) => {
    setFilterCategory(cat);
    setFilterBrand('ALL');
  };

  const isFiltering = debouncedSearch !== '' || filterCategory !== 'All' || filterBrand !== 'ALL';

  const filteredProducts = useMemo(() => {
    return inventory.filter(product => {
      const searchToUse = debouncedSearch.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(searchToUse) ||
        product.brand.toLowerCase().includes(searchToUse) ||
        product.ids.some(id => id.toLowerCase().includes(searchToUse));
      const matchesBrand    = filterBrand === 'ALL' || product.brand === filterBrand;
      const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
      return matchesSearch && matchesBrand && matchesCategory;
    });
  }, [debouncedSearch, filterBrand, filterCategory, inventory]);

  // Curated Section Arrays
  const latestAdded = useMemo(() => [...inventory].reverse().slice(0, 4), [inventory]);
  const fragrances = useMemo(() => inventory.filter(p => p.category === 'Fragrance'), [inventory]);
  const sneakers = useMemo(() => inventory.filter(p => p.category === 'Sneakers'), [inventory]);
  const apparel = useMemo(() => inventory.filter(p => p.category === 'Apparel'), [inventory]);

  const handleInquire = () => {
    window.open(`https://instagram.com/${IG_HANDLE}`, '_blank');
  };

  const addToCart = (product: Product, selectedSize?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.ids[0] === product.ids[0] && item.selectedSize === selectedSize);
      if (existing) {
        return prev.map(item => item.ids[0] === product.ids[0] && item.selectedSize === selectedSize ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return[...prev, { ...product, quantity: 1, selectedSize }];
    });
    const label = selectedSize ? `${product.name} (${selectedSize})` : product.name;
    setToast(label);
    setTimeout(() => setToast(null), 2500);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedSize?: string) => {
    setCart(prev => prev.filter(item => !(item.ids[0] === productId && item.selectedSize === selectedSize)));
  };

  const updateCartQuantity = (productId: string, delta: number, selectedSize?: string) => {
    setCart(prev =>
      prev.map(item => {
        if (item.ids[0] !== productId || item.selectedSize !== selectedSize) return item;
        const newQty = item.quantity + delta;
        if (newQty <= 0) return null;
        if (newQty > item.stock) return item;
        return { ...item, quantity: newQty };
      }).filter(Boolean) as CartItem[]
    );
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-v-black text-v-white font-sans flex flex-col overflow-x-hidden relative">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slideUp { animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes ghostPulse { 0%, 100% { opacity: 0.02; transform: scale(1.5) translateZ(0); } 50% { opacity: 0.08; transform: scale(1.5) translateZ(0); } }
        .animate-ghost { animation: ghostPulse 8s ease-in-out infinite; will-change: opacity; }
      `}</style>

      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-v-black/95 border-b border-white/5 h-[80px] md:h-[88px] flex items-center">
        <div className="max-w-[1800px] w-full mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={LOGO} alt="Wings of Fortune" className="h-12 md:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity duration-500 filter brightness-110 contrast-110" style={{ mixBlendMode: 'screen' }} />
            <div className="hidden md:block h-8 w-[1px] bg-white/10" />
            <span className="hidden md:block text-[10px] tracking-[0.4em] uppercase text-white/30 font-light">Wasco, CA</span>
          </div>
          <div className="flex items-center gap-5">
            <a href={`https://instagram.com/${IG_HANDLE}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/30 hover:text-white transition-colors duration-300 group">
              <span className="hidden sm:block text-[10px] tracking-[0.3em] uppercase font-mono group-hover:text-v-red transition-colors">@{IG_HANDLE}</span>
            </a>
            <div className="w-[1px] h-5 bg-white/10" />
            <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-3 text-white/60 hover:text-white transition-all duration-300 group/cart">
              <span className="hidden md:block text-[10px] tracking-[0.3em] uppercase font-medium opacity-0 group-hover/cart:opacity-100 transition-opacity">bag</span>
              <div className="relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                {totalCartItems > 0 && <span className="absolute -top-1.5 -right-1.5 bg-v-red text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{totalCartItems}</span>}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <header className="relative z-30 pt-[80px] md:pt-[88px] overflow-hidden">
        <Ticker />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] pointer-events-none z-0 mix-blend-screen flex justify-center items-center">
          <img src={LOGO} alt="Wings Watermark" className="w-full h-auto object-contain md:scale-125 filter grayscale contrast-125 animate-ghost" />
        </div>
        <div className="px-6 md:px-12 flex flex-col items-center gap-12 max-w-[1400px] mx-auto w-full relative z-10 mt-16 mb-16">
          <div className="text-center space-y-8 max-w-5xl">
            <h1 className="text-7xl md:text-[10rem] lg:text-[12rem] serif italic tracking-tighter text-white leading-[0.85] font-light drop-shadow-2xl">Wings of<br/><span className="block mt-2">Fortune</span></h1>
            <div className="flex flex-col items-center gap-6 pt-4">
              <p className="text-[11px] md:text-xs tracking-[0.5em] uppercase text-white/40 font-light font-mono">661 / Wasco, CA</p>
              <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-v-red/50 to-transparent" />
              <p className="text-sm md:text-base text-white/60 font-light max-w-xl leading-relaxed serif italic">quick. cheap. no bs.</p>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="sticky top-[80px] md:top-[88px] z-30 bg-v-black/95 backdrop-blur-md border-y border-white/10 py-0 transition-all w-full">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="flex items-center overflow-x-auto hide-scrollbar touch-pan-x snap-x snap-mandatory h-14">
            <div className="flex-shrink-0 snap-start relative flex items-center h-full border-r border-white/10 pr-4 mr-4">
              <span className="text-[11px] text-v-red tracking-[0.3em] uppercase font-mono mr-2">Search</span>
              <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="//" className="w-[80px] focus:w-[140px] transition-all duration-500 bg-transparent border-b border-white/10 py-1 text-[11px] tracking-[0.2em] uppercase text-white placeholder-white/20 focus:outline-none focus:border-white/50 rounded-none font-mono" />
              {searchTerm && <button onClick={() => setSearchTerm('')} className="absolute right-4 text-white/40 text-sm hover:text-white">✕</button>}
            </div>
            <div className="flex-shrink-0 snap-start h-full flex items-center border-r border-white/10 pr-4 mr-4">
              <button onClick={() => setIsBrandDropdownOpen(true)} className={`flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase transition-all duration-300 h-full font-mono ${filterBrand !== 'ALL' ? 'text-v-red font-bold' : 'text-white/40 hover:text-white'}`}>
                <span>{filterBrand === 'ALL' ? 'Brand' : filterBrand}</span><span className="text-[9px]">▼</span>
              </button>
            </div>
            <div className="flex items-center h-full gap-6">
              {categories.map(cat => (
                <button key={cat} onClick={() => handleCategoryChange(cat)} className={`flex-shrink-0 snap-start text-[11px] tracking-[0.3em] uppercase transition-all duration-300 h-full flex items-center border-b-2 font-mono ${filterCategory === cat ? 'text-white border-white font-bold' : 'text-white/30 border-transparent hover:text-white/60'}`}>{cat}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 px-6 md:px-12 pt-10 pb-12 max-w-[1800px] mx-auto w-full relative z-[2]">
        {isFiltering ? (
          <>
            <div className="flex items-end justify-between mb-10 border-b border-white/10 pb-4">
              <h2 className="serif italic text-3xl md:text-4xl text-white">
                {filterCategory === 'All' ? 'Search Results' : filterCategory}
                {filterBrand !== 'ALL' && <span className="text-white/40 text-xl md:text-2xl ml-3">/ {filterBrand}</span>}
              </h2>
              <p className="text-[11px] tracking-[0.3em] uppercase text-v-red font-mono mb-1">[{filteredProducts.length} {filteredProducts.length === 1 ? 'Item' : 'Items'}]</p>
            </div>
            <InventoryTable products={filteredProducts} onProductClick={setSelectedProduct} onAddToCart={addToCart} />
          </>
        ) : (
          <div className="space-y-32">
            {latestAdded.length > 0 && (
              <section>
                <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="serif italic text-3xl md:text-4xl text-white">Latest Added</h2>
                    <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mt-2">Newest items to hit the vault.</p>
                  </div>
                </div>
                <InventoryTable products={latestAdded} onProductClick={setSelectedProduct} onAddToCart={addToCart} />
              </section>
            )}

            {fragrances.length > 0 && (
              <section>
                <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
                  <h2 className="serif italic text-3xl md:text-4xl text-white">All Our Fragrances</h2>
                  <p className="text-[11px] tracking-[0.3em] uppercase text-v-red font-mono mb-1">[{fragrances.length} Items]</p>
                </div>
                <InventoryTable products={fragrances} onProductClick={setSelectedProduct} onAddToCart={addToCart} />
              </section>
            )}

            {sneakers.length > 0 && (
              <section>
                <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
                  <h2 className="serif italic text-3xl md:text-4xl text-white">Sneakers</h2>
                  <p className="text-[11px] tracking-[0.3em] uppercase text-v-red font-mono mb-1">[{sneakers.length} Items]</p>
                </div>
                <InventoryTable products={sneakers} onProductClick={setSelectedProduct} onAddToCart={addToCart} />
              </section>
            )}

            {apparel.length > 0 && (
              <section>
                <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
                  <h2 className="serif italic text-3xl md:text-4xl text-white">Apparel</h2>
                  <p className="text-[11px] tracking-[0.3em] uppercase text-v-red font-mono mb-1">[{apparel.length} Items]</p>
                </div>
                <InventoryTable products={apparel} onProductClick={setSelectedProduct} onAddToCart={addToCart} />
              </section>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-40 mb-20 py-24 border-t border-white/5 flex flex-col items-center gap-16">
          <div className="text-center space-y-8">
            <div className="mb-12 flex justify-center opacity-15 hover:opacity-30 transition-opacity duration-700">
              <img src={LOGO} alt="Wings of Fortune" className="h-20 w-auto filter brightness-110 contrast-110" style={{ mixBlendMode: 'screen' }} />
            </div>
            <div className="space-y-4">
              <p className="text-[10px] tracking-[0.5em] uppercase text-white/30 font-light">661 / Wasco, CA</p>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/20 font-light">based in the valley.</p>
            </div>
          </div>
          <a href={`https://instagram.com/${IG_HANDLE}`} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4">
            <span className="text-[11px] tracking-[0.4em] uppercase text-white/30 group-hover:text-white/60 transition-colors font-light">@{IG_HANDLE}</span>
            <div className="h-16 w-[1px] bg-gradient-to-b from-white/10 via-white/20 to-transparent" />
          </a>
          <div className="flex gap-8 text-[9px] font-light text-white/10 uppercase tracking-[0.4em]">
            <span>Est. 2025</span><span>•</span><span>private collection.</span><span>•</span>
            <span className="cursor-default select-none" onClick={() => setShowAdmin(true)} style={{ WebkitTapHighlightColor: 'transparent' }}>661</span>
          </div>
        </footer>
      </main>

      {/* Brand Modal */}
      {isBrandDropdownOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={() => setIsBrandDropdownOpen(false)} />
          <div className="w-full sm:max-w-md bg-v-black border-t sm:border border-white/10 z-10 max-h-[85vh] flex flex-col transform animate-slideUp shadow-2xl rounded-none">
            <div className="flex items-center justify-between p-6 border-b border-white/5 flex-shrink-0 bg-v-black">
              <div>
                <p className="text-[11px] text-v-red tracking-[0.4em] uppercase font-mono mb-2">Refine Search</p>
                <h3 className="text-3xl serif italic text-white">Brand</h3>
              </div>
              <button onClick={() => setIsBrandDropdownOpen(false)} className="text-white/40 hover:text-v-red transition-colors text-xl font-light px-4 py-2 border border-white/10">✕</button>
            </div>
            <div className="overflow-y-auto overscroll-contain px-0 py-0 hide-scrollbar pb-10 bg-v-black divide-y divide-white/5">
              {brands.map(brand => {
                const count = inventory.filter(p => p.brand === brand && (filterCategory === 'All' || p.category === filterCategory)).length;
                return (
                  <button key={brand} onClick={() => { setFilterBrand(brand); setIsBrandDropdownOpen(false); }} className={`w-full px-6 py-5 text-left flex items-center justify-between transition-all duration-200 group ${filterBrand === brand ? 'bg-white/5 border-l-2 border-v-red text-white' : 'text-white/50 hover:bg-white/[0.02] hover:text-white border-l-2 border-transparent'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] text-[10px] font-serif italic text-white/70 shadow-inner group-hover:border-white/30 transition-colors">
                        {getBrandInitials(brand)}
                      </div>
                      <span className="text-xs tracking-[0.2em] uppercase font-mono group-hover:tracking-[0.3em] transition-all">{brand === 'ALL' ? 'All Items' : brand}</span>
                    </div>
                    {brand !== 'ALL' && <span className="text-[10px] font-mono text-white/20">[{count}]</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onInquire={handleInquire} onAddToCart={addToCart} />}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} onRemove={removeFromCart} onUpdateQty={updateCartQuantity} igHandle={IG_HANDLE} />
      {showAdmin && <AdminPanel onClose={() => { setShowAdmin(false); setInventory(getMergedInventory()); }} />}
      <Analytics />
      
      <div style={{ transition: 'opacity 0.5s, transform 0.5s' }} className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] pointer-events-none ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
        <div className="bg-v-black border border-white/15 px-5 py-3 flex items-center gap-3 shadow-2xl shadow-black/60">
          <span className="w-1.5 h-1.5 rounded-full bg-v-red flex-shrink-0" />
          <p className="text-xs font-mono text-white/70 whitespace-nowrap"><span className="text-white">{toast}</span> added.</p>
        </div>
      </div>
    </div>
  );
};

export default App;
