import React, { useState, useMemo, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import AdminPanel, { getMergedInventory } from './components/AdminPanel';
import { Product, Category, CartItem } from './types';

// Assets
const LOGO = '/images/wingsofofrtuning.png'; // Faded esoteric background art
const PLUG_PHOTO = '/images/plug-photo.jpg'; // Sharp square profile photo
const IG_HANDLE = '661ro_resellz';

const App: React.FC = () => {
  const[searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filterBrand, setFilterBrand] = useState('ALL');
  const[filterCategory, setFilterCategory] = useState<Category>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('wof_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { 
      return[]; 
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const[showAdmin, setShowAdmin] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [inventory, setInventory] = useState<Product[]>([]);
  const[copied, setCopied] = useState(false);

  // Debounce search input for performance
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Persist cart to local storage
  useEffect(() => {
    try { localStorage.setItem('wof_cart', JSON.stringify(cart)); } catch {}
  },[cart]);

  // Load inventory
  useEffect(() => {
    setInventory(getMergedInventory());
  }, [showAdmin]);

  // Lock body scroll when modals are open
  useEffect(() => {
    document.body.style.overflow = (isCartOpen || selectedProduct !== null || showAdmin) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  },[isCartOpen, selectedProduct, showAdmin]);

  const categories: Category[] =['All', 'Fragrance', 'Apparel', 'Sneakers'];

  const brands = useMemo(() => {
    const source = filterCategory === 'All' ? inventory : inventory.filter(p => p.category === filterCategory);
    return['ALL', ...Array.from(new Set(source.map(p => p.brand))).sort()];
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
  }, [debouncedSearch, filterBrand, filterCategory, inventory]);

  // Sections for non-filtered view
  const newArrivals = useMemo(() => [...inventory].reverse().slice(0, 4), [inventory]);
  const fragrances = useMemo(() => inventory.filter(p => p.category === 'Fragrance'), [inventory]);
  const sneakers = useMemo(() => inventory.filter(p => p.category === 'Sneakers'),[inventory]);
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
    <div className="min-h-screen bg-[#050505] text-[#ededed] font-sans pb-20 selection:bg-white selection:text-black">
      
      {/* Top Nav */}
      <nav className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-[#27272a] h-16 flex items-center justify-between px-4 md:px-8 w-full">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg tracking-tight uppercase text-white">Wings of Fortune</span>
        </div>
        <button 
          onClick={() => setIsCartOpen(true)} 
          className="flex items-center gap-2 border border-[#27272a] bg-[#050505] text-[#ededed] px-4 py-2 hover:bg-white hover:text-black transition-colors text-xs font-bold uppercase tracking-widest"
        >
          <span>Bag</span>
          {totalCartItems > 0 && (
            <span className="bg-white text-black px-1.5 py-0.5 text-[10px] font-bold leading-none">
              {totalCartItems}
            </span>
          )}
        </button>
      </nav>

      {/* Hero Section with Subtle Art Fade */}
      <header className="relative w-full pt-20 pb-16 px-4 flex flex-col items-center justify-center text-center border-b border-[#27272a] overflow-hidden">
        {/* Subtle Background Art */}
        <div 
          className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none"
          style={{ backgroundImage: `url(${LOGO})`, backgroundPosition: 'center top', backgroundSize: 'cover' }}
        ></div>
        {/* Gradient fade to black */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505] pointer-events-none"></div>
        
        <h1 className="relative z-10 font-bold text-5xl md:text-7xl uppercase tracking-tighter text-white">
          Wings of Fortune
        </h1>
        <p className="relative z-10 text-[10px] mt-4 text-[#a1a1aa] uppercase tracking-widest">
          Curated Inventory • 661 Local
        </p>
      </header>

      {/* Sharp Filter Bar */}
      <div className="bg-[#050505] border-b border-[#27272a] sticky top-16 z-30 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 py-3 flex items-center gap-6 overflow-x-auto hide-scrollbar whitespace-nowrap text-xs uppercase tracking-widest font-bold">
          <div className="flex items-center gap-2 pr-6 border-r border-[#27272a]">
            <span className="text-[#71717a]">Search</span>
            <input 
              type="text" 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              placeholder="//" 
              className="bg-transparent outline-none w-20 focus:w-32 transition-all text-white placeholder-[#3f3f46]"
            />
          </div>
          <select 
            value={filterBrand} 
            onChange={e => setFilterBrand(e.target.value)} 
            className="bg-[#050505] text-white outline-none cursor-pointer pr-6 border-r border-[#27272a] uppercase"
          >
            {brands.map(b => <option key={b} value={b}>{b === 'ALL' ? 'All Brands' : b}</option>)}
          </select>
          <div className="flex items-center gap-6">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => { setFilterCategory(cat); setFilterBrand('ALL'); }} 
                className={`${filterCategory === cat ? 'text-white border-b border-white' : 'text-[#71717a] hover:text-white'} pb-1 transition-colors`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-[1800px] mx-auto px-4 md:px-8 pt-12 w-full">
        
        {isFiltering ? (
          <>
            <div className="flex items-baseline gap-4 mb-8 border-b border-[#27272a] pb-4">
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white">Search Results</h2>
              <span className="text-[10px] text-[#a1a1aa] uppercase tracking-widest">[{filteredProducts.length} Items]</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {filteredProducts.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
            </div>
          </>
        ) : (
          <div className="space-y-24">
            
            {/* New Arrivals */}
            {newArrivals.length > 0 && (
              <section>
                <div className="flex items-baseline justify-between mb-8 border-b border-[#27272a] pb-4">
                  <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white">New Arrivals</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
                  {newArrivals.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
                </div>
              </section>
            )}

            {/* Fragrances */}
            {fragrances.length > 0 && (
              <section>
                <div className="flex items-baseline justify-between mb-8 border-b border-[#27272a] pb-4">
                  <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white">Fragrances</h2>
                  <span className="text-[10px] text-[#a1a1aa] uppercase tracking-widest">[{fragrances.length}]</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {fragrances.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
                </div>
              </section>
            )}

            {/* Sneakers */}
            {sneakers.length > 0 && (
              <section>
                <div className="flex items-baseline justify-between mb-8 border-b border-[#27272a] pb-4">
                  <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white">Sneakers</h2>
                  <span className="text-[10px] text-[#a1a1aa] uppercase tracking-widest">[{sneakers.length}]</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {sneakers.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
                </div>
              </section>
            )}

            {/* Apparel */}
            {apparel.length > 0 && (
              <section>
                <div className="flex items-baseline justify-between mb-8 border-b border-[#27272a] pb-4">
                  <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white">Apparel</h2>
                  <span className="text-[10px] text-[#a1a1aa] uppercase tracking-widest">[{apparel.length}]</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {apparel.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
                </div>
              </section>
            )}

          </div>
        )}

        {/* Minimal 'How to Order' Section */}
        <section className="mt-32 border-t border-[#27272a] pt-16">
          <div className="flex flex-col md:flex-row gap-12 max-w-5xl mx-auto">
            <div className="w-full md:w-1/3 flex-shrink-0">
              {/* Sharp, Grayscale Profile Photo */}
              <img src={PLUG_PHOTO} alt="Local Delivery" className="w-full aspect-square object-cover grayscale border border-[#27272a]" />
            </div>
            <div className="w-full md:w-2/3 flex flex-col justify-center">
              <h2 className="text-2xl font-bold uppercase tracking-wide text-white mb-3">How to Order</h2>
              <p className="text-[#a1a1aa] text-sm mb-10 max-w-xl leading-relaxed">
                Local to the 661. Hand-delivered directly to you. No shipping fees, no hidden costs.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="border border-[#27272a] p-6 bg-[#0a0a0a]">
                  <span className="text-[10px] text-[#71717a] font-mono tracking-widest uppercase mb-3 block">Step 01</span>
                  <h3 className="text-white text-sm font-bold uppercase mb-2">Add to Bag</h3>
                  <p className="text-[#71717a] text-xs leading-relaxed">Select items and add them to your order bag.</p>
                </div>
                <div className="border border-[#27272a] p-6 bg-[#0a0a0a]">
                  <span className="text-[10px] text-[#71717a] font-mono tracking-widest uppercase mb-3 block">Step 02</span>
                  <h3 className="text-white text-sm font-bold uppercase mb-2">Send to DM</h3>
                  <p className="text-[#71717a] text-xs leading-relaxed">Checkout to copy your list, then paste it in my Instagram DMs.</p>
                </div>
                <div className="border border-[#27272a] p-6 bg-[#0a0a0a]">
                  <span className="text-[10px] text-[#71717a] font-mono tracking-widest uppercase mb-3 block">Step 03</span>
                  <h3 className="text-white text-sm font-bold uppercase mb-2">Delivery</h3>
                  <p className="text-[#71717a] text-xs leading-relaxed">We arrange a local public meetup. Verify items and pay in person.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-[#27272a] text-center pt-12 pb-6 text-[10px] font-mono uppercase tracking-widest text-[#71717a] mt-24">
        <p>Wings of Fortune © 2025 • 661 Local</p>
        <button onClick={() => setShowAdmin(true)} className="mt-4 hover:text-white transition-colors">Admin Login</button>
      </footer>

      {/* QUICK VIEW MODAL (Brutalist Architecture) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#050505]/90 backdrop-blur-md">
          <div className="bg-[#050505] border border-[#27272a] w-full max-w-4xl flex flex-col md:flex-row relative shadow-2xl max-h-[90vh]">
            
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-0 right-0 z-20 bg-[#050505] border-b border-l border-[#27272a] w-12 h-12 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors text-lg"
            >
              ✕
            </button>
            
            {/* White Art Gallery Image Box */}
            <div className="w-full md:w-1/2 bg-[#f4f4f5] p-8 md:p-12 flex items-center justify-center min-h-[300px] border-b md:border-b-0 md:border-r border-[#27272a]">
              <img 
                src={selectedProduct.images?.[0] || selectedProduct.image} 
                alt={selectedProduct.name}
                className={`max-w-full max-h-[40vh] md:max-h-[60vh] ${selectedProduct.category === 'Sneakers' ? 'object-contain mix-blend-multiply' : 'object-cover mix-blend-multiply'}`} 
              />
            </div>
            
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
              <span className="text-[10px] tracking-widest uppercase text-[#71717a] mb-2">{selectedProduct.brand}</span>
              <h2 className="text-2xl md:text-3xl font-bold uppercase leading-tight text-white mb-2">{selectedProduct.name}</h2>
              <p className="text-xl font-mono text-white mb-6">${selectedProduct.price}</p>
              
              <div className="text-xs text-[#a1a1aa] mb-8 leading-relaxed border-t border-[#27272a] pt-6">
                <p>{selectedProduct.details?.description}</p>
                <div className="mt-4 space-y-1 font-mono text-[10px] uppercase tracking-wider">
                  <p><span className="text-white">Spec:</span> {selectedProduct.spec}</p>
                  <p><span className="text-white">Condition:</span> {selectedProduct.condition}</p>
                </div>
              </div>

              {(selectedProduct.category === 'Apparel' || selectedProduct.category === 'Sneakers') ? (
                <div className="mb-6 mt-auto">
                  <p className="text-[10px] uppercase tracking-widest text-[#71717a] mb-3">Select Size</p>
                  <div className="flex flex-wrap gap-2">
                    {(selectedProduct.category === 'Sneakers' ?['7','8','9','10','11','12','13'] : ['S','M','L','XL']).map(s => (
                      <button 
                        key={s} 
                        onClick={() => addToCart(selectedProduct, s)} 
                        className="border border-[#27272a] text-white text-xs font-bold px-4 py-3 hover:bg-white hover:text-black transition-colors flex-1 text-center uppercase"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => addToCart(selectedProduct)} 
                  className="bg-white text-black font-bold uppercase tracking-widest py-4 w-full text-xs hover:bg-gray-300 transition-colors mt-auto"
                >
                  Add to Bag
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CART SIDEBAR */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#050505] border-l border-[#27272a] z-[300] shadow-2xl transform transition-transform duration-300 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-[#27272a] flex justify-between items-center bg-[#050505]">
          <h2 className="font-bold text-lg uppercase tracking-wider">Bag ({totalCartItems})</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-[#71717a] hover:text-white">✕</button>
        </div>
        
        <div className="bg-white text-black p-3 text-center text-[10px] uppercase font-bold tracking-widest border-b border-[#27272a]">
          No credit card needed. Pay at drop-off.
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#3f3f46] gap-4">
              <p className="text-xs uppercase tracking-widest font-mono">Bag is empty.</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-20 h-24 bg-[#f4f4f5] flex items-center justify-center flex-shrink-0 p-2">
                  <img src={item.images?.[0] || item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <p className="text-[10px] text-[#71717a] uppercase tracking-widest mb-1">{item.brand}</p>
                    <p className="font-bold text-sm leading-tight uppercase line-clamp-2">{item.name}</p>
                    {item.selectedSize && <p className="text-[10px] text-[#a1a1aa] uppercase mt-1">Size: {item.selectedSize}</p>}
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <div className="flex items-center gap-4 border border-[#27272a] px-3 py-1">
                      <button onClick={() => updateCartQuantity(item.ids[0], -1, item.selectedSize)} className="text-[#a1a1aa] hover:text-white text-sm">−</button>
                      <span className="text-xs font-mono text-white">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.ids[0], 1, item.selectedSize)} className="text-[#a1a1aa] hover:text-white text-sm">+</button>
                    </div>
                    <span className="font-mono text-sm">${item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-[#27272a] bg-[#050505]">
            <div className="flex justify-between font-bold text-lg mb-6 uppercase">
              <span>Total</span><span className="font-mono">${cartTotal}</span>
            </div>
            <button 
              onClick={handleDM} 
              className={`w-full py-4 uppercase font-bold text-xs tracking-widest transition-all duration-300 border ${copied ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white hover:bg-white hover:text-black'}`}
            >
              {copied ? 'Copied! Opening IG...' : 'Copy Order & Open IG'}
            </button>
          </div>
        )}
      </div>

      {/* Notification Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white text-black border border-[#27272a] px-6 py-3 text-[10px] font-bold uppercase tracking-widest z-[400] animate-slideUp">
          {toast}
        </div>
      )}
      
      {showAdmin && <AdminPanel onClose={() => { setShowAdmin(false); setInventory(getMergedInventory()); }} />}
      <Analytics />
    </div>
  );
};

// Brutalist Art Gallery Product Card
const ProductCard = ({ product, onClick }: { product: Product, onClick: () => void }) => {
  return (
    <div className="flex flex-col group h-full">
      <div 
        onClick={onClick}
        className="aspect-[4/5] bg-[#f4f4f5] relative p-6 flex items-center justify-center cursor-pointer border border-[#27272a] group-hover:border-white transition-colors"
      >
        <img 
          src={product.images?.[0] || product.image} 
          alt={product.name}
          className={`w-full h-full ${product.category === 'Sneakers' ? 'object-contain' : 'object-cover'} mix-blend-multiply transition-transform duration-700 group-hover:scale-105`} 
        />
        <div className="absolute top-0 right-0 bg-black text-white px-3 py-1.5 font-mono text-xs font-bold border-b border-l border-[#27272a]">
          ${product.price}
        </div>
      </div>
      <div className="pt-4 flex flex-col flex-1">
        <p className="text-[10px] text-[#71717a] font-bold uppercase tracking-[0.2em] mb-1">{product.brand}</p>
        <h3 
          className="font-bold text-sm uppercase leading-snug mb-4 line-clamp-2 cursor-pointer text-[#ededed] group-hover:text-white transition-colors" 
          onClick={onClick}
        >
          {product.name}
        </h3>
        <button 
          onClick={onClick}
          className="mt-auto border border-[#27272a] text-[#ededed] py-3 w-full text-[10px] font-bold uppercase tracking-widest group-hover:bg-white group-hover:text-black group-hover:border-white transition-all"
        >
          {product.category === 'Fragrance' ? 'Add to Bag' : 'Select Size'}
        </button>
      </div>
    </div>
  );
};

export default App;
