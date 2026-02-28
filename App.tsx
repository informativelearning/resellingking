import React, { useState, useMemo, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import AdminPanel, { getMergedInventory } from './components/AdminPanel';
import { Product, Category, CartItem } from './types';

// Assets
const LOGO = '/images/wingsofofrtuning.png'; 
const PLUG_PHOTO = '/images/plug-photo.jpg'; 
const IG_HANDLE = '661ro_resellz';

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

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    try { localStorage.setItem('wof_cart', JSON.stringify(cart)); } catch {}
  },[cart]);

  useEffect(() => {
    setInventory(getMergedInventory());
  }, [showAdmin]);

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
    setToast(selectedSize ? `${product.name} (${selectedSize}) added to cart!` : `${product.name} added to cart!`);
    setTimeout(() => setToast(null), 2500);
  };

  const removeFromCart = (id: string, size?: string) => setCart(prev => prev.filter(i => !(i.ids[0] === id && i.selectedSize === size)));
  const updateCartQuantity = (id: string, delta: number, size?: string) => setCart(prev => prev.map(i => { if (i.ids[0] !== id || i.selectedSize !== size) return i; const q = i.quantity + delta; return q > 0 && q <= i.stock ? { ...i, quantity: q } : q <= 0 ? null : i; }).filter(Boolean) as CartItem[]);
  
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleDM = async () => {
    const lines = cart.map(i => `• ${i.brand} - ${i.name} ${i.selectedSize ? `(Size ${i.selectedSize})` : ''} x${i.quantity} — $${i.price * i.quantity}`);
    const msg = `Hey, I want to order:\n\n${lines.join('\n')}\n\nTotal: $${cartTotal}`;
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Top Nav */}
      <nav className="fixed top-0 z-40 bg-[#0c0c0e]/80 backdrop-blur-xl h-20 flex items-center justify-between px-6 md:px-12 w-full shadow-[0_4px_40px_rgba(0,0,0,0.2)]">
        <div className="flex items-center gap-3">
          <img src={LOGO} alt="Wings of Fortune" className="h-10 md:h-12 w-auto object-contain filter invert opacity-90" />
        </div>
        <div className="flex items-center gap-6 md:gap-8">
          <a href={`https://instagram.com/${IG_HANDLE}`} target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 text-[#a19f99] hover:text-[#e8e6e1] transition-colors text-[11px] font-sans tracking-widest uppercase">
            @{IG_HANDLE}
          </a>
          <button 
            onClick={() => setIsCartOpen(true)} 
            className="flex items-center gap-3 bg-[#161619] text-[#e8e6e1] px-5 py-2.5 rounded-full hover:bg-[#252529] transition-colors text-xs tracking-widest uppercase shadow-[0_2px_15px_rgba(0,0,0,0.2)]"
          >
            <span>Cart</span>
            {totalCartItems > 0 && (
              <span className="bg-[#e8e6e1] text-[#0c0c0e] px-2 py-0.5 rounded-full text-[10px] font-medium leading-none">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Slim Hero */}
      <header className="relative w-full pt-32 pb-10 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-[0.07] mix-blend-screen pointer-events-none filter invert"
          style={{ backgroundImage: `url(${LOGO})`, backgroundPosition: 'center 20%', backgroundSize: 'cover' }}
        ></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#0c0c0e]/60 to-[#0c0c0e] pointer-events-none"></div>
        
        <h1 className="relative z-10 font-serif font-medium text-4xl md:text-6xl text-[#e8e6e1] tracking-wide drop-shadow-lg">
          Wings of Fortune
        </h1>
        <p className="relative z-10 text-[11px] mt-3 text-[#a19f99] uppercase tracking-[0.3em] font-sans">
          661 • Clothes, Sneakers & Colognes
        </p>
        <p className="relative z-10 text-[11px] mt-2 text-[#52525b] uppercase tracking-[0.25em] font-sans">
          quick. cheap. no bs.
        </p>
      </header>

      {/* Filter Bar */}
      <div className="bg-[#0c0c0e]/95 backdrop-blur-md sticky top-20 z-30 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-4 flex items-center gap-8 overflow-x-auto hide-scrollbar whitespace-nowrap text-xs tracking-widest font-sans text-[#a19f99]">
          <div className="flex items-center gap-3 pr-8 relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-4 after:bg-[#2a2a2e]">
            <span className="uppercase">Search</span>
            <input 
              type="text" 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              placeholder="..." 
              className="bg-transparent outline-none w-20 focus:w-32 transition-all text-[#e8e6e1] placeholder-[#52525b]"
            />
          </div>
          <select 
            value={filterBrand} 
            onChange={e => setFilterBrand(e.target.value)} 
            className="bg-transparent text-[#e8e6e1] outline-none cursor-pointer pr-8 uppercase appearance-none"
          >
            {brands.map(b => <option key={b} value={b} className="bg-[#0c0c0e]">{b === 'ALL' ? 'All Brands' : b}</option>)}
          </select>
          <div className="flex items-center gap-2">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => { setFilterCategory(cat); setFilterBrand('ALL'); }} 
                className={`px-4 py-2 rounded-full transition-all uppercase text-[10px] tracking-[0.2em] ${filterCategory === cat ? 'bg-[#161619] text-[#e8e6e1] shadow-inner' : 'text-[#a19f99] hover:text-[#e8e6e1] hover:bg-[#161619]/50'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-6 md:px-12 pt-16 w-full">
        
        {isFiltering ? (
          <>
            <div className="flex items-baseline gap-4 mb-10">
              <h2 className="text-2xl md:text-3xl font-serif text-[#e8e6e1] italic">Results</h2>
              <span className="text-[11px] text-[#a19f99] tracking-widest font-sans uppercase">[{filteredProducts.length} items]</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
              {filteredProducts.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
            </div>
          </>
        ) : (
          <div className="space-y-24">
            
            {/* New Arrivals */}
            {newArrivals.length > 0 && (
              <section>
                <div className="flex items-baseline justify-between mb-10">
                  <h2 className="text-2xl md:text-3xl font-serif text-[#e8e6e1] italic">Just Added</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8">
                  {newArrivals.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
                </div>
              </section>
            )}

            {/* Fragrances */}
            {fragrances.length > 0 && (
              <section>
                <div className="flex items-baseline gap-4 mb-10">
                  <h2 className="text-2xl md:text-3xl font-serif text-[#e8e6e1] italic">Colognes & Fragrances</h2>
                  <span className="text-[11px] text-[#a19f99] tracking-widest font-sans uppercase">[{fragrances.length}]</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                  {fragrances.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
                </div>
              </section>
            )}

            {/* Sneakers */}
            {sneakers.length > 0 && (
              <section>
                <div className="flex items-baseline gap-4 mb-10">
                  <h2 className="text-2xl md:text-3xl font-serif text-[#e8e6e1] italic">Sneakers</h2>
                  <span className="text-[11px] text-[#a19f99] tracking-widest font-sans uppercase">[{sneakers.length}]</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                  {sneakers.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
                </div>
              </section>
            )}

            {/* Apparel */}
            {apparel.length > 0 && (
              <section>
                <div className="flex items-baseline gap-4 mb-10">
                  <h2 className="text-2xl md:text-3xl font-serif text-[#e8e6e1] italic">Clothes</h2>
                  <span className="text-[11px] text-[#a19f99] tracking-widest font-sans uppercase">[{apparel.length}]</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                  {apparel.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
                </div>
              </section>
            )}

          </div>
        )}

      </main>

      <footer className="pt-24 pb-12 mt-32 flex flex-col items-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#2a2a2e] to-transparent"></div>
        <img src={LOGO} alt="Wings of Fortune" className="w-24 md:w-32 h-auto opacity-[0.15] filter invert mb-10 pointer-events-none" />
        
        <div className="text-center text-[10px] font-sans uppercase tracking-[0.2em] text-[#71717a] space-y-5">
          <p>Wings of Fortune © 2026 • 661 Local</p>
          <a href={`https://instagram.com/${IG_HANDLE}`} target="_blank" rel="noopener noreferrer" className="block hover:text-[#e8e6e1] transition-colors">
            Instagram: @{IG_HANDLE}
          </a>
          <button onClick={() => setShowAdmin(true)} className="hover:text-[#e8e6e1] transition-colors pt-4">Admin</button>
        </div>
      </footer>

      {/* Product Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-[#0c0c0e]/80 backdrop-blur-lg">
          <div className="bg-[#0c0c0e] w-full max-w-5xl flex flex-col md:flex-row relative shadow-[0_20px_80px_rgba(0,0,0,0.6)] rounded-2xl overflow-hidden max-h-[95vh]">
            
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-4 right-4 z-20 bg-[#161619]/80 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center text-[#e8e6e1] hover:bg-[#e8e6e1] hover:text-[#0c0c0e] transition-colors text-sm shadow-lg"
            >
              ✕
            </button>
            
            <div className="w-full md:w-1/2 bg-[#e0dfdb] p-8 md:p-16 flex items-center justify-center min-h-[350px] relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#d5d4d0]/50 to-transparent pointer-events-none"></div>
              <img 
                src={selectedProduct.images?.[0] || selectedProduct.image} 
                alt={selectedProduct.name}
                className={`relative z-10 max-w-full max-h-[45vh] md:max-h-[65vh] drop-shadow-2xl ${selectedProduct.category === 'Sneakers' ? 'object-contain mix-blend-multiply' : 'object-cover mix-blend-multiply'}`} 
              />
            </div>
            
            <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col overflow-y-auto hide-scrollbar bg-gradient-to-b from-[#111114] to-[#0c0c0e]">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#a19f99] mb-3 font-sans">{selectedProduct.brand}</span>
              <h2 className="text-3xl md:text-4xl font-serif text-[#e8e6e1] mb-3 leading-snug">{selectedProduct.name}</h2>
              <p className="text-xl font-sans text-[#d4d4d8] mb-8">${selectedProduct.price}</p>
              
              <div className="text-sm text-[#a19f99] mb-10 leading-relaxed relative pt-6">
                <div className="absolute top-0 left-0 w-12 h-px bg-[#3f3f46]"></div>
                <p className="font-sans font-light">{selectedProduct.details?.description}</p>
                <div className="mt-6 space-y-2 font-sans text-[11px] uppercase tracking-[0.15em] text-[#71717a]">
                  <p><span className="text-[#e8e6e1]">Info:</span> {selectedProduct.spec}</p>
                  <p><span className="text-[#e8e6e1]">Condition:</span> {selectedProduct.condition}</p>
                </div>
              </div>

              {(selectedProduct.category === 'Apparel' || selectedProduct.category === 'Sneakers') ? (
                <div className="mb-2 mt-auto">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#71717a] mb-4">Pick Your Size</p>
                  <div className="flex flex-wrap gap-3">
                    {(selectedProduct.category === 'Sneakers' ? ['7','8','9','10','11','12','13'] : ['S','M','L','XL']).map(s => (
                      <button 
                        key={s} 
                        onClick={() => addToCart(selectedProduct, s)} 
                        className="bg-[#161619] text-[#e8e6e1] text-xs font-sans px-5 py-3 rounded-full hover:bg-[#e8e6e1] hover:text-[#0c0c0e] transition-all flex-1 text-center shadow-md"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => addToCart(selectedProduct)} 
                  className="bg-[#e8e6e1] text-[#0c0c0e] font-sans uppercase tracking-widest py-4 rounded-full w-full text-xs hover:bg-[#d4d4d8] transition-colors mt-auto shadow-[0_5px_20px_rgba(232,230,225,0.15)]"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0c0c0e]/95 backdrop-blur-xl z-[300] shadow-[0_0_60px_rgba(0,0,0,0.5)] transform transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 pb-6 flex justify-between items-center relative">
          <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-[#2a2a2e] to-transparent"></div>
          <h2 className="font-serif italic text-2xl text-[#e8e6e1]">Cart ({totalCartItems})</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-[#a19f99] hover:text-[#e8e6e1] w-8 h-8 flex items-center justify-center bg-[#161619] rounded-full transition-colors">✕</button>
        </div>
        
        <div className="px-8 py-4 text-[10px] text-[#a19f99] uppercase font-sans tracking-[0.2em]">
          Pay when we meet up. Cash only.
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-4 space-y-8 hide-scrollbar">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#3f3f46] gap-6 opacity-60">
              <img src={LOGO} alt="Empty Cart" className="w-24 h-auto filter invert mix-blend-screen opacity-50" />
              <p className="text-xs uppercase tracking-[0.3em] font-sans">Your cart is empty.</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div key={i} className="flex gap-5 group">
                <div className="w-24 h-28 bg-[#e0dfdb] rounded-lg flex items-center justify-center flex-shrink-0 p-3 shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#d5d4d0]/50 to-transparent pointer-events-none"></div>
                  <img src={item.images?.[0] || item.image} alt={item.name} className="relative z-10 max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-md" />
                </div>
                <div className="flex-1 flex flex-col justify-center py-1">
                  <div>
                    <p className="text-[10px] text-[#a19f99] uppercase tracking-[0.2em] mb-1 font-sans">{item.brand}</p>
                    <p className="font-serif text-[#e8e6e1] text-lg leading-tight line-clamp-2">{item.name}</p>
                    {item.selectedSize && <p className="text-[11px] text-[#71717a] font-sans mt-2">Size: {item.selectedSize}</p>}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-4 bg-[#161619] rounded-full px-3 py-1 shadow-inner">
                      <button onClick={() => updateCartQuantity(item.ids[0], -1, item.selectedSize)} className="text-[#a19f99] hover:text-[#e8e6e1] text-sm px-1">−</button>
                      <span className="text-xs font-sans text-[#e8e6e1] w-3 text-center">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.ids[0], 1, item.selectedSize)} className="text-[#a19f99] hover:text-[#e8e6e1] text-sm px-1">+</button>
                    </div>
                    <span className="font-sans text-[#d4d4d8] tracking-wide">${item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 bg-[#0c0c0e]/90 backdrop-blur-md relative">
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-[#2a2a2e] to-transparent"></div>
            <div className="flex justify-between font-serif text-xl mb-8 text-[#e8e6e1] italic">
              <span>Total</span><span className="font-sans not-italic">${cartTotal}</span>
            </div>
            <button 
              onClick={handleDM} 
              className={`w-full py-4 rounded-full uppercase font-sans text-xs tracking-widest transition-all duration-500 shadow-lg ${copied ? 'bg-[#161619] text-[#e8e6e1] scale-95' : 'bg-[#e8e6e1] text-[#0c0c0e] hover:bg-[#d4d4d8] hover:shadow-[0_5px_20px_rgba(232,230,225,0.2)]'}`}
            >
              {copied ? 'Copied! Opening Instagram...' : 'Checkout & DM Us'}
            </button>
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#e8e6e1] text-[#0c0c0e] px-8 py-4 rounded-full text-[11px] font-sans uppercase tracking-[0.2em] z-[400] shadow-[0_10px_40px_rgba(232,230,225,0.2)] animate-slideUp">
          {toast}
        </div>
      )}
      
      {showAdmin && <AdminPanel onClose={() => { setShowAdmin(false); setInventory(getMergedInventory()); }} />}
      <Analytics />
    </div>
  );
};

// Product Card
const ProductCard = ({ product, onClick }: { product: Product, onClick: () => void }) => {
  return (
    <div className="flex flex-col group h-full cursor-pointer" onClick={onClick}>
      <div 
        className="aspect-[4/5] bg-[#e0dfdb] rounded-xl relative p-6 flex items-center justify-center transition-all duration-700 group-hover:-translate-y-2 group-hover:shadow-[0_15px_40px_rgba(232,230,225,0.06)] overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#d5d4d0]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
        
        <div className="absolute top-3 left-3 bg-[#0c0c0e]/40 backdrop-blur-md text-[#e8e6e1] px-3 py-1 rounded-full font-sans text-[9px] uppercase tracking-[0.15em] z-10 shadow-sm border border-[#e8e6e1]/10">
          {product.condition}
        </div>

        <div className="absolute bottom-3 right-3 bg-[#e8e6e1]/90 backdrop-blur-md text-[#0c0c0e] px-3 py-1.5 rounded-full font-sans text-[11px] font-medium tracking-wide z-10 shadow-lg">
          ${product.price}
        </div>

        <img 
          src={product.images?.[0] || product.image} 
          alt={product.name}
          className={`w-full h-full ${product.category === 'Sneakers' ? 'object-contain' : 'object-cover'} mix-blend-multiply transition-transform duration-1000 group-hover:scale-[1.03] relative z-10 drop-shadow-md`} 
        />
      </div>
      
      <div className="pt-5 flex flex-col flex-1 px-1">
        <p className="text-[10px] text-[#a19f99] font-sans uppercase tracking-[0.25em] mb-2">{product.brand}</p>
        <h3 className="font-serif text-lg leading-snug mb-5 text-[#e8e6e1] group-hover:text-white transition-colors line-clamp-2">
          {product.name}
        </h3>
        <button 
          className="mt-auto bg-[#161619] text-[#e8e6e1] py-3 rounded-full w-full text-[10px] font-sans uppercase tracking-[0.2em] group-hover:bg-[#e8e6e1] group-hover:text-[#0c0c0e] transition-all duration-500 shadow-sm"
        >
          {product.category === 'Fragrance' ? 'Get It' : 'View Details'}
        </button>
      </div>
    </div>
  );
};

export default App;
