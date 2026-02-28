import React, { useState, useMemo, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import AdminPanel, { getMergedInventory } from './components/AdminPanel';
import { Product, Category, CartItem } from './types';

// Assets
const LOGO = '/images/wingsofofrtuning.png'; // Use a small, clean version of your logo
const PLUG_PHOTO = '/images/plug-photo.jpg'; // Upload a normal, friendly photo of yourself here
const IG_HANDLE = '661ro_resellz';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const[debouncedSearch, setDebouncedSearch] = useState('');
  const [filterBrand, setFilterBrand] = useState('ALL');
  const [filterCategory, setFilterCategory] = useState<Category>('All');
  const[selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('wof_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { 
      return[]; 
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [inventory, setInventory] = useState<Product[]>([]);
  const [copied, setCopied] = useState(false);

  // Debounce search input for performance
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Persist cart to local storage
  useEffect(() => {
    try { localStorage.setItem('wof_cart', JSON.stringify(cart)); } catch {}
  }, [cart]);

  // Load inventory
  useEffect(() => {
    setInventory(getMergedInventory());
  }, [showAdmin]);

  // Lock body scroll when modals are open
  useEffect(() => {
    document.body.style.overflow = (isCartOpen || selectedProduct !== null || showAdmin) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen, selectedProduct, showAdmin]);

  const categories: Category[] = ['All', 'Fragrance', 'Apparel', 'Sneakers'];

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
  },[debouncedSearch, filterBrand, filterCategory, inventory]);

  // Sections for non-filtered view
  const latestAdded = useMemo(() => [...inventory].reverse().slice(0, 4), [inventory]);
  const fragrances = useMemo(() => inventory.filter(p => p.category === 'Fragrance'), [inventory]);
  const sneakers = useMemo(() => inventory.filter(p => p.category === 'Sneakers'), [inventory]);
  const apparel = useMemo(() => inventory.filter(p => p.category === 'Apparel'),[inventory]);

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
    <div className="min-h-screen bg-[#f4f4f5] text-black font-sans pb-20">
      
      {/* Top Nav */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm h-16 flex items-center justify-between px-4 md:px-8 w-full">
        <div className="flex items-center gap-3">
          <img src={LOGO} alt="Wings of Fortune" className="h-8 w-auto object-contain" />
          <span className="font-bold text-lg tracking-tight hidden sm:block">WINGS OF FORTUNE</span>
        </div>
        <button 
          onClick={() => setIsCartOpen(true)} 
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          <span>Bag</span>
          {totalCartItems > 0 && (
            <span className="bg-white text-black px-1.5 py-0.5 rounded-full text-xs font-bold leading-none">
              {totalCartItems}
            </span>
          )}
        </button>
      </nav>

      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-4 overflow-x-auto hide-scrollbar whitespace-nowrap text-sm">
          <div className="flex items-center gap-2 pr-4 border-r border-gray-200">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              placeholder="Search..." 
              className="bg-transparent outline-none w-24 focus:w-40 transition-all text-sm"
            />
          </div>
          <select 
            value={filterBrand} 
            onChange={e => setFilterBrand(e.target.value)} 
            className="bg-transparent font-medium outline-none cursor-pointer pr-4 border-r border-gray-200"
          >
            {brands.map(b => <option key={b} value={b}>{b === 'ALL' ? 'All Brands' : b}</option>)}
          </select>
          <div className="flex items-center gap-4">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => { setFilterCategory(cat); setFilterBrand('ALL'); }} 
                className={`${filterCategory === cat ? 'font-bold text-black' : 'text-gray-500 hover:text-black'} transition-colors`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8 w-full">
        
        {isFiltering ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Search Results <span className="text-gray-400 text-base font-normal">({filteredProducts.length})</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {filteredProducts.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
            </div>
          </>
        ) : (
          <div className="space-y-16">
            
            {/* New Arrivals */}
            {latestAdded.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">New Arrivals</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {latestAdded.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
                </div>
              </section>
            )}

            {/* Fragrances */}
            {fragrances.length > 0 && (
              <section>
                <div className="flex items-baseline justify-between mb-6">
                  <h2 className="text-2xl font-bold">Fragrances</h2>
                  <span className="text-gray-500 text-sm">{fragrances.length} Items</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {fragrances.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
                </div>
              </section>
            )}

            {/* Sneakers */}
            {sneakers.length > 0 && (
              <section>
                <div className="flex items-baseline justify-between mb-6">
                  <h2 className="text-2xl font-bold">Sneakers</h2>
                  <span className="text-gray-500 text-sm">{sneakers.length} Items</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {sneakers.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
                </div>
              </section>
            )}

            {/* Apparel */}
            {apparel.length > 0 && (
              <section>
                <div className="flex items-baseline justify-between mb-6">
                  <h2 className="text-2xl font-bold">Apparel</h2>
                  <span className="text-gray-500 text-sm">{apparel.length} Items</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {apparel.map(p => <ProductCard key={p.ids[0]} product={p} onClick={() => setSelectedProduct(p)} />)}
                </div>
              </section>
            )}

          </div>
        )}

        {/* How It Works / Meet the Plug Section */}
        <section className="mt-20 bg-white border border-gray-200 rounded-xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
            {/* Standard Profile Picture - No heavy filters */}
            <img src={PLUG_PHOTO} alt="Local Plug" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">How to Order</h2>
            <p className="text-gray-600 text-sm mb-6 max-w-2xl">
              Local to the 661. Hand-delivered straight to you. No shipping fees, no hidden costs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-sm mb-1">1. Add to Bag</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Browse the menu and add the items you want to your bag.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-sm mb-1">2. Send to IG</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Hit checkout to copy your order and paste it in my Instagram DMs.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-sm mb-1">3. Meet & Pay</h3>
                <p className="text-xs text-gray-500 leading-relaxed">We'll arrange a safe, local meetup. Verify the items and pay at drop-off.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="text-center py-8 text-xs text-gray-400 mt-auto">
        <p>Wings of Fortune © 2025 • 661 Local</p>
        <button onClick={() => setShowAdmin(true)} className="mt-2 hover:text-gray-600">Admin Login</button>
      </footer>

      {/* QUICK VIEW MODAL (Clean, standard e-commerce style) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-3xl flex flex-col md:flex-row relative shadow-2xl overflow-hidden max-h-[90vh]">
            
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-4 right-4 z-20 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50"
            >
              ✕
            </button>
            
            <div className="w-full md:w-1/2 bg-gray-50 p-8 flex items-center justify-center min-h-[300px]">
              <img 
                src={selectedProduct.images?.[0] || selectedProduct.image} 
                alt={selectedProduct.name}
                className={`max-w-full max-h-[40vh] md:max-h-[60vh] ${selectedProduct.category === 'Sneakers' ? 'object-contain' : 'object-cover mix-blend-multiply'}`} 
              />
            </div>
            
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
              <span className="text-[10px] uppercase font-bold text-gray-500 mb-1">{selectedProduct.brand}</span>
              <h2 className="text-2xl font-bold leading-tight text-black mb-2">{selectedProduct.name}</h2>
              <p className="text-xl font-medium mb-4">${selectedProduct.price}</p>
              
              <div className="text-sm text-gray-600 mb-6 leading-relaxed">
                <p>{selectedProduct.details?.description}</p>
                <p className="mt-2"><span className="font-semibold text-black">Spec:</span> {selectedProduct.spec}</p>
                <p><span className="font-semibold text-black">Condition:</span> {selectedProduct.condition}</p>
              </div>

              {(selectedProduct.category === 'Apparel' || selectedProduct.category === 'Sneakers') ? (
                <div className="mb-6 mt-auto">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-semibold">Select Size</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(selectedProduct.category === 'Sneakers' ?['7','8','9','10','11','12','13'] : ['S','M','L','XL']).map(s => (
                      <button 
                        key={s} 
                        onClick={() => addToCart(selectedProduct, s)} 
                        className="border border-gray-300 rounded-md text-sm font-medium px-4 py-2 hover:border-black hover:bg-black hover:text-white transition-colors flex-1 text-center"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => addToCart(selectedProduct)} 
                  className="bg-black text-white font-bold py-3.5 rounded-lg w-full text-base hover:bg-gray-800 transition-colors mt-auto"
                >
                  Add to Bag
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CART SIDEBAR */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white border-l border-gray-200 z-[300] shadow-2xl transform transition-transform duration-300 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
          <h2 className="font-bold text-lg">Your Bag ({totalCartItems})</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-black p-2">✕</button>
        </div>
        
        <div className="bg-gray-100 text-gray-800 p-2.5 text-center text-xs font-medium">
          No credit card needed. Pay at drop-off.
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4 mt-10">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <p className="text-sm">Your bag is empty.</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div key={i} className="flex gap-4 p-2 bg-white rounded-lg border border-gray-100">
                <div className="w-20 h-20 bg-gray-50 rounded-md flex items-center justify-center flex-shrink-0 p-1">
                  <img src={item.images?.[0] || item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <p className="font-bold text-sm leading-tight line-clamp-2">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.brand} {item.selectedSize && `• Size: ${item.selectedSize}`}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-3 bg-gray-100 rounded-md px-2 py-1">
                      <button onClick={() => updateCartQuantity(item.ids[0], -1, item.selectedSize)} className="text-gray-600 hover:text-black px-1">−</button>
                      <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.ids[0], 1, item.selectedSize)} className="text-gray-600 hover:text-black px-1">+</button>
                    </div>
                    <span className="font-bold text-sm">${item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span><span>${cartTotal}</span>
            </div>
            <button 
              onClick={handleDM} 
              className={`w-full py-3.5 rounded-lg font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-[#0095f6] text-white hover:bg-[#0085db]'}`}
            >
              {copied ? 'Copied! Opening IG...' : 'Copy Order & Open IG'}
            </button>
            <p className="text-center text-[10px] text-gray-500 mt-3 px-4">Clicking this will copy your order details so you can easily paste them in the DM.</p>
          </div>
        )}
      </div>

      {/* Notification Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium z-[400] shadow-xl animate-slideUp">
          {toast}
        </div>
      )}
      
      {showAdmin && <AdminPanel onClose={() => { setShowAdmin(false); setInventory(getMergedInventory()); }} />}
      <Analytics />
    </div>
  );
};

// Reusable, Clean Product Card
const ProductCard = ({ product, onClick }: { product: Product, onClick: () => void }) => {
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
      <div 
        className="aspect-[4/5] bg-gray-50 relative p-4 flex items-center justify-center cursor-pointer group"
        onClick={onClick}
      >
        <img 
          src={product.images?.[0] || product.image} 
          alt={product.name}
          className={`w-full h-full ${product.category === 'Sneakers' ? 'object-contain' : 'object-cover mix-blend-multiply'} group-hover:scale-105 transition-transform duration-300`} 
        />
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md text-xs font-bold shadow-sm border border-gray-100">
          ${product.price}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">{product.brand}</p>
        <h3 
          className="font-semibold text-sm leading-snug mb-4 line-clamp-2 cursor-pointer hover:text-gray-600 transition-colors" 
          onClick={onClick}
        >
          {product.name}
        </h3>
        <button 
          onClick={onClick}
          className="mt-auto bg-gray-100 text-black py-2 w-full text-xs font-semibold rounded-md hover:bg-gray-200 transition-colors"
        >
          View / Add
        </button>
      </div>
    </div>
  );
};

export default App;
