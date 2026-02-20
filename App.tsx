import React, { useState, useMemo, useEffect } from 'react';
import Ticker from './components/Ticker';
import InventoryTable from './components/InventoryTable';
import ProductModal from './components/ProductModal';
import CartSidebar from './components/CartSidebar';
import AdminPanel, { getMergedInventory } from './components/AdminPanel';
import { Product, Category, CartItem } from './types';

const LOGO = '/images/wingsofofrtuning.png';
const IG_HANDLE = '661ro_resellz';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('ALL');
  const [filterCategory, setFilterCategory] = useState<Category>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('wof_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [inventory, setInventory] = useState<Product[]>([]);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('wof_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Load merged inventory (base + any custom added via admin)
  useEffect(() => {
    setInventory(getMergedInventory());
  }, [showAdmin]); // refresh when admin closes

  const categories: Category[] = ['All', 'Fragrance', 'Apparel'];

  const brands: string[] = useMemo(() => {
    const source =
      filterCategory === 'All'
        ? inventory
        : inventory.filter(p => p.category === filterCategory);
    const unique = Array.from(new Set(source.map(p => p.brand))).sort();
    return ['ALL', ...unique];
  }, [filterCategory, inventory]);

  const handleCategoryChange = (cat: Category) => {
    setFilterCategory(cat);
    setFilterBrand('ALL');
  };

  const filteredProducts = useMemo(() => {
    return inventory.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.ids.some(id => id.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesBrand    = filterBrand === 'ALL' || product.brand === filterBrand;
      const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
      return matchesSearch && matchesBrand && matchesCategory;
    });
  }, [searchTerm, filterBrand, filterCategory, inventory]);

  const handleInquire = () => {
    window.open(`https://instagram.com/${IG_HANDLE}`, '_blank');
  };

  const addToCart = (product: Product, selectedSize?: string) => {
    setCart(prev => {
      const existing = prev.find(item =>
        item.ids[0] === product.ids[0] && item.selectedSize === selectedSize
      );
      if (existing) {
        return prev.map(item =>
          item.ids[0] === product.ids[0] && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize }];
    });
    // Show toast instead of forcing sidebar open every time
    const label = selectedSize ? `${product.name} (${selectedSize})` : product.name;
    setToast(label);
    setTimeout(() => setToast(null), 2500);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedSize?: string) => {
    setCart(prev => prev.filter(item =>
      !(item.ids[0] === productId && item.selectedSize === selectedSize)
    ));
  };

  const updateCartQuantity = (productId: string, delta: number, selectedSize?: string) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.ids[0] !== productId || item.selectedSize !== selectedSize) return item;
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          if (newQty > item.stock) return item;
          return { ...item, quantity: newQty };
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const maisonLabel =
    filterCategory === 'Apparel'   ? 'Brand'         :
    filterCategory === 'Fragrance' ? 'Maison'        :
                                     'Maison / Brand';

  const maisonPlaceholder =
    filterCategory === 'Apparel'   ? 'All Items' :
    filterCategory === 'Fragrance' ? 'All Items' :
                                     'All Items';

  return (
    <div className="min-h-screen bg-v-black text-v-white font-sans flex flex-col overflow-x-hidden relative">



      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-v-black/95 border-b border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">

          {/* Left: logo + location */}
          <div className="flex items-center gap-4">
            <img
              src={LOGO}
              alt="Wings of Fortune"
              className="h-12 md:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity duration-500 filter brightness-110 contrast-110"
              style={{ mixBlendMode: 'screen' }}
            />
            <div className="hidden md:block h-8 w-[1px] bg-white/10" />
            <span className="hidden md:block text-[9px] tracking-[0.5em] uppercase text-white/30 font-light">
              Wasco, CA
            </span>
          </div>

          {/* Right: IG handle + cart */}
          <div className="flex items-center gap-5">
            {/* Instagram handle — always visible, subtle */}
            <a
              href={`https://instagram.com/${IG_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/30 hover:text-white transition-colors duration-300 group"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="hidden sm:block text-[9px] tracking-[0.3em] uppercase font-mono group-hover:text-v-red transition-colors">
                @{IG_HANDLE}
              </span>
            </a>

            <div className="w-[1px] h-5 bg-white/10" />

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-3 text-white/60 hover:text-white transition-all duration-300 group/cart"
            >
              <span className="hidden md:block text-[9px] tracking-[0.4em] uppercase font-medium opacity-0 group-hover/cart:opacity-100 transition-opacity">
                bag
              </span>
              <div className="relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalCartItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-v-red text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      <header className="relative z-30 pt-24 pb-16">
        <Ticker />

        <div className="px-6 md:px-12 flex flex-col items-center gap-20 max-w-[1400px] mx-auto w-full relative mt-12">

          {/* Hero */}
          <div className="text-center space-y-8 max-w-5xl">
            <h1 className="text-7xl md:text-[10rem] lg:text-[12rem] serif italic tracking-tighter text-white leading-[0.85] font-light">
              Wings of<br/>
              <span className="block mt-2">Fortune</span>
            </h1>
            <div className="flex flex-col items-center gap-6 pt-4">
              <p className="text-[10px] md:text-xs tracking-[0.8em] uppercase text-white/40 font-light">
                661 / Wasco, CA
              </p>
              <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <p className="text-sm md:text-base text-white/60 font-light max-w-xl leading-relaxed">
                quick. cheap. no bs.
              </p>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="w-full max-w-3xl flex flex-col gap-12 items-center">
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search by Brand"
                className="w-full bg-transparent border-b border-white/10 px-0 py-4 text-white/80 font-light placeholder-white/20 focus:outline-none text-sm tracking-[0.1em] focus:border-white/30 transition-all duration-500 text-center"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors text-xs"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Category */}
              <div className="space-y-3">
                <label className="block text-[9px] tracking-[0.4em] uppercase text-white/30 font-light">
                  Category
                </label>
                <div className="flex gap-4">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`text-[11px] tracking-[0.2em] uppercase transition-all duration-300 pb-2 border-b-2 ${
                        filterCategory === cat
                          ? 'text-white border-white font-medium'
                          : 'text-white/30 border-transparent hover:text-white/60 font-light'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand / Maison */}
              <div className="space-y-3 relative">
                <label className="block text-[9px] tracking-[0.4em] uppercase text-white/30 font-light">
                  {maisonLabel}
                </label>
                <button
                  onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
                  className="w-full bg-transparent border-b border-white/10 px-0 py-2 text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 flex items-center justify-between text-left"
                >
                  <span className="text-[11px] tracking-[0.2em] uppercase font-light">
                    {filterBrand === 'ALL' ? maisonPlaceholder : filterBrand}
                  </span>
                  <svg className={`w-3 h-3 transition-transform duration-300 ${isBrandDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isBrandDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-[25]" onClick={() => setIsBrandDropdownOpen(false)} />
                    <div className="absolute top-full mt-2 w-full bg-v-black/95 backdrop-blur-xl border border-white/10 shadow-2xl z-[26] max-h-[320px] overflow-y-auto">
                      {brands.map(brand => (
                        <button
                          key={brand}
                          onClick={() => { setFilterBrand(brand); setIsBrandDropdownOpen(false); }}
                          className={`w-full px-6 py-3 text-left text-[11px] tracking-[0.15em] uppercase transition-all duration-200 border-b border-white/5 last:border-0 ${
                            filterBrand === brand
                              ? 'bg-white/5 text-white font-medium'
                              : 'text-white/40 hover:text-white/80 hover:bg-white/[0.02] font-light'
                          }`}
                        >
                          {brand === 'ALL' ? maisonPlaceholder : brand}
                          {brand !== 'ALL' && (
                            <span className="ml-3 text-[9px] opacity-30">
                              {inventory.filter(p =>
                                p.brand === brand &&
                                (filterCategory === 'All' || p.category === filterCategory)
                              ).length}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="text-[10px] tracking-[0.3em] uppercase text-white/20 font-light">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Item' : 'Items'}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 md:px-12 py-12 max-w-[1800px] mx-auto w-full relative z-[2]">
        <InventoryTable
          products={filteredProducts}
          onProductClick={setSelectedProduct}
          onAddToCart={addToCart}
        />

        <footer className="mt-40 mb-20 py-24 border-t border-white/5 flex flex-col items-center gap-16">
          <div className="text-center space-y-8">
            <div className="mb-12 flex justify-center opacity-15 hover:opacity-30 transition-opacity duration-700">
              <img src={LOGO} alt="Wings of Fortune" className="h-20 w-auto filter brightness-110 contrast-110" style={{ mixBlendMode: 'screen' }} />
            </div>
            <div className="space-y-4">
              <p className="text-[9px] tracking-[0.6em] uppercase text-white/30 font-light">661 / Wasco, CA</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/20 font-light">based in the valley.</p>
            </div>
          </div>

          <a
            href={`https://instagram.com/${IG_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4"
          >
            <span className="text-[10px] tracking-[0.5em] uppercase text-white/30 group-hover:text-white/60 transition-colors font-light">
              @{IG_HANDLE}
            </span>
            <div className="h-16 w-[1px] bg-gradient-to-b from-white/10 via-white/20 to-transparent" />
          </a>

          <div className="flex gap-8 text-[8px] font-light text-white/10 uppercase tracking-[0.5em]">
            <span>Est. 2025</span>
            <span>•</span>
            <span>private collection.</span>
            <span>•</span>
            {/* Hidden admin access — triple-click */}
            <span
              className="cursor-default select-none"
              onClick={() => setShowAdmin(true)}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >661</span>
          </div>
        </footer>
      </main>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onInquire={handleInquire}
          onAddToCart={addToCart}
        />
      )}

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateCartQuantity}
        igHandle={IG_HANDLE}
      />

      {showAdmin && <AdminPanel onClose={() => { setShowAdmin(false); setInventory(getMergedInventory()); }} />}

      {/* Toast notification */}
      <div
        style={{ transition: 'opacity 0.5s, transform 0.5s' }}
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] pointer-events-none ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
      >
        <div className="bg-v-black border border-white/15 px-5 py-3 flex items-center gap-3 shadow-2xl shadow-black/60">
          <span className="w-1.5 h-1.5 rounded-full bg-v-red flex-shrink-0" />
          <p className="text-[11px] font-mono text-white/70 whitespace-nowrap">
            <span className="text-white">{toast}</span> added.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;