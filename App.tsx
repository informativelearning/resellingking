import React, { useState, useMemo } from 'react';
import Ticker from './components/Ticker';
import InventoryTable from './components/InventoryTable';
import ProductModal from './components/ProductModal';
import CartSidebar from './components/CartSidebar';
import { INVENTORY } from './constants';
import { Product, Category, CartItem } from './types';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('ALL');
  const [filterCategory, setFilterCategory] = useState<Category>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);

  const brands: string[] = useMemo(() => {
    const allBrands = INVENTORY.map(p => p.brand);
    const uniqueBrands = Array.from(new Set(allBrands)).sort();
    return ['ALL', ...uniqueBrands];
  }, []);

  const categories: Category[] = ['All', 'Fragrance'];

  const stats = useMemo(() => {
    return {
      models: INVENTORY.length,
      fragrance: INVENTORY.filter(p => p.category === 'Fragrance').length,
      brands: brands.length - 1
    };
  }, [brands]);

  const filteredProducts = useMemo(() => {
    return INVENTORY.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.ids.some(id => id.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesBrand = filterBrand === 'ALL' || product.brand === filterBrand;
      const matchesCategory = filterCategory === 'All' || product.category === filterCategory;

      return matchesSearch && matchesBrand && matchesCategory;
    });
  }, [searchTerm, filterBrand, filterCategory]);

  const handleInquire = () => {
    window.open('https://instagram.com/661ro_resellz', '_blank');
  };

  // Cart Functions
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.ids[0] === product.ids[0]);
      if (existingItem) {
        return prevCart.map(item =>
          item.ids[0] === product.ids[0]
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.ids[0] !== productId));
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.ids[0] === productId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          if (newQty > item.stock) return item;
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-v-black text-v-white font-sans flex flex-col overflow-x-hidden relative">
      {/* Subtle Film Grain Texture */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.012]" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             backgroundRepeat: 'repeat'
           }}
      />

      {/* Fixed Top Bar with Logo and Cart */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-v-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          {/* Logo - Top Left (Luxury Letterhead Style) */}
          <div className="flex items-center gap-4">
            <img 
              src="/images/wingsofofrtuning.jpg" 
              alt="Wings of Fortune"
              className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity duration-500 filter brightness-110"
              style={{ mixBlendMode: 'screen' }}
            />
            <div className="hidden md:block h-6 w-[1px] bg-white/10"></div>
            <span className="hidden md:block text-[9px] tracking-[0.5em] uppercase text-white/30 font-light">
              Los Angeles
            </span>
          </div>

          {/* Cart - Top Right */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 text-white/60 hover:text-white transition-all duration-300 group/cart"
          >
            <span className="hidden md:block text-[9px] tracking-[0.4em] uppercase font-medium opacity-0 group-hover/cart:opacity-100 transition-opacity">
              Shopping Bag
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

      <header className="relative z-30 pt-24 pb-16">
        <Ticker />
        
        <div className="px-6 md:px-12 flex flex-col items-center gap-20 max-w-[1400px] mx-auto w-full relative mt-12">
          
          {/* Hero Wordmark - Massive, Confident, Breathing */}
          <div className="text-center space-y-8 max-w-5xl">
            <h1 className="text-7xl md:text-[10rem] lg:text-[12rem] serif italic tracking-tighter text-white leading-[0.85] font-light">
              Wings of<br/>
              <span className="block mt-2">Fortune</span>
            </h1>
            
            {/* Refined Tagline */}
            <div className="flex flex-col items-center gap-6 pt-4">
              <p className="text-[10px] md:text-xs tracking-[0.8em] uppercase text-white/40 font-light">
                Private Archive / 2025
              </p>
              <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <p className="text-sm md:text-base text-white/60 font-light max-w-xl leading-relaxed">
                Curated fragrance collection from the world's most distinguished maisons. 
                Available exclusively in Los Angeles.
              </p>
            </div>
          </div>

          {/* Refined Search & Filter Section */}
          <div className="w-full max-w-3xl flex flex-col gap-12 items-center">
            {/* Minimalist Search */}
            <div className="relative w-full group">
               <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, house, or reference"
                className="w-full bg-transparent border-b border-white/10 px-0 py-4 text-white/80 font-light placeholder-white/20 focus:outline-none text-sm tracking-[0.1em] focus:border-white/30 transition-all duration-500 text-center"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Elegant Filters */}
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
                      onClick={() => setFilterCategory(cat)}
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

              {/* Maison Selector */}
              <div className="space-y-3 relative">
                <label className="block text-[9px] tracking-[0.4em] uppercase text-white/30 font-light">
                  Maison
                </label>
                <button
                  onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
                  className="w-full bg-transparent border-b border-white/10 px-0 py-2 text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 flex items-center justify-between text-left"
                >
                  <span className="text-[11px] tracking-[0.2em] uppercase font-light">
                    {filterBrand === 'ALL' ? 'All Houses' : filterBrand}
                  </span>
                  <svg 
                    className={`w-3 h-3 transition-transform duration-300 ${isBrandDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Refined Dropdown */}
                {isBrandDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-[25]" 
                      onClick={() => setIsBrandDropdownOpen(false)}
                    />
                    <div className="absolute top-full mt-2 w-full bg-v-black/95 backdrop-blur-xl border border-white/10 shadow-2xl z-[26] max-h-[320px] overflow-y-auto">
                      {brands.map((brand) => (
                        <button
                          key={brand}
                          onClick={() => {
                            setFilterBrand(brand);
                            setIsBrandDropdownOpen(false);
                          }}
                          className={`w-full px-6 py-3 text-left text-[11px] tracking-[0.15em] uppercase transition-all duration-200 border-b border-white/5 last:border-0 ${
                            filterBrand === brand 
                              ? 'bg-white/5 text-white font-medium' 
                              : 'text-white/40 hover:text-white/80 hover:bg-white/[0.02] font-light'
                          }`}
                        >
                          {brand === 'ALL' ? 'All Houses' : brand}
                          {brand !== 'ALL' && (
                            <span className="ml-3 text-[9px] opacity-30">
                              {INVENTORY.filter(p => p.brand === brand).length}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Showing Results */}
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
          onInquire={handleInquire}
          onAddToCart={addToCart}
        />
        
        <footer className="mt-40 mb-20 py-24 border-t border-white/5 flex flex-col items-center gap-16">
             <div className="text-center space-y-8">
                {/* Subtle Footer Logo */}
                <div className="mb-12 flex justify-center opacity-15 hover:opacity-30 transition-opacity duration-700">
                  <img 
                    src="/images/wingsofofrtuning.jpg" 
                    alt="Wings of `Fortune`"
                    className="h-12 w-auto filter brightness-110"
                    style={{ mixBlendMode: 'screen' }}
                  />
                </div>
                
                <div className="space-y-4">
                   <p className="text-[9px] tracking-[0.6em] uppercase text-white/30 font-light">Los Angeles Atelier</p>
                   <p className="text-[10px] tracking-[0.3em] uppercase text-white/20 font-light">Downtown Arts District / 90015</p>
                </div>
             </div>
            
            <button 
              onClick={handleInquire}
              className="group flex flex-col items-center gap-6"
            >
              <span className="text-[10px] tracking-[0.5em] uppercase text-white/30 group-hover:text-white/60 transition-colors font-light">Inquiries</span>
              <div className="h-16 w-[1px] bg-gradient-to-b from-white/10 via-white/20 to-transparent"></div>
            </button>

            <div className="flex gap-8 text-[8px] font-light text-white/10 uppercase tracking-[0.5em]">
                <span>Est. 2025</span>
                <span>•</span>
                <span>Private Collection</span>
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
      />
    </div>
  );
};

export default App;