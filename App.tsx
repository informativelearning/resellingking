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
      brands: brands.length - 1 // Exclude "ALL"
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
      {/* Film Grain Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.015]" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             backgroundRepeat: 'repeat'
           }}
      />

      <header className="sticky top-0 z-30 bg-v-black/95 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-v-red/5">
        <Ticker />
        <div className="px-6 md:px-12 py-8 flex flex-col items-center gap-12 max-w-[1800px] mx-auto w-full relative">
          
          {/* Subtle glow effect behind header */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-v-red/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="text-center group cursor-default relative z-10">
            {/* Cart Icon - Top Right */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="absolute -top-4 right-0 flex items-center gap-3 text-white hover:text-v-red transition-all duration-300 group/cart hover:scale-105"
            >
              <span className="text-[10px] tracking-[0.4em] uppercase font-bold opacity-0 group-hover/cart:opacity-100 transition-opacity">
                BAG
              </span>
              <div className="relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-v-red text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {totalCartItems}
                  </span>
                )}
              </div>
            </button>

            {/* Logo */}
            <div className="mb-6 flex justify-center">
              <div className="relative group/logo">
                <div className="absolute inset-0 bg-v-red/20 blur-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-700" />
                <img 
                  src="/images/wingsofofrtuning.jpg" 
                  alt="Wings of Fortune"
                  className="h-24 md:h-32 w-auto opacity-90 group-hover/logo:opacity-100 transition-all duration-500 drop-shadow-2xl relative filter brightness-110 contrast-125"
                />
              </div>
            </div>

            <h1 className="text-5xl md:text-8xl serif italic tracking-tighter text-white leading-none drop-shadow-2xl">
              Wings of Fortune<span className="text-v-red">.</span>
            </h1>
            <div className="flex flex-col items-center gap-4 mt-4">
              <div className="flex items-center justify-center gap-6 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                 <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white"></span>
                 <span className="text-[10px] tracking-[0.6em] uppercase font-bold">Couture Manifest 2025</span>
                 <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white"></span>
              </div>
              
              <div className="text-[9px] tracking-[0.3em] uppercase text-white/30 font-medium flex gap-4">
                <span>Unique Models: {stats.models}</span>
                <span>//</span>
                <span>Houses: {stats.brands}</span>
                <span>//</span>
                <span className={stats.fragrance > 0 ? 'text-v-red' : ''}>Archive: {stats.fragrance}</span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-5xl flex flex-col gap-10 items-center relative z-10">
            {/* Search Bar */}
            <div className="relative w-full max-w-2xl group">
               <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="SEARCH ARCHIVE BY NAME, BRAND, OR SKU..."
                className="w-full bg-v-black/40 backdrop-blur-sm border border-white/10 p-4 text-white font-light placeholder-white/20 focus:outline-none uppercase text-xs tracking-[0.3em] focus:border-v-red transition-all duration-500 text-center shadow-xl focus:shadow-v-red/20"
              />
              <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-v-red transition-all duration-700 group-focus-within:w-full"></div>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-v-red transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex gap-10 border-b border-white/5 pb-4 w-full justify-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`text-[10px] tracking-[0.5em] uppercase transition-all duration-500 pb-2 relative ${
                    filterCategory === cat ? 'text-white font-bold' : 'text-white/20 hover:text-white/60'
                  }`}
                >
                  {cat} Collections
                  {filterCategory === cat && (
                    <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-v-red to-transparent"></span>
                  )}
                </button>
              ))}
            </div>
            
            {/* IMPROVED: Brand Filter Dropdown */}
            <div className="w-full max-w-md relative">
              <label className="block text-[9px] tracking-[0.4em] uppercase text-white/30 mb-3 text-center">
                Filter by Maison
              </label>
              <button
                onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
                className="w-full bg-v-black/60 backdrop-blur-sm border border-white/10 px-6 py-4 text-white/80 hover:text-white hover:border-v-red transition-all duration-300 flex items-center justify-between group shadow-lg hover:shadow-v-red/10"
              >
                <span className="text-xs tracking-[0.3em] uppercase serif italic">
                  {filterBrand === 'ALL' ? 'All Houses' : filterBrand}
                </span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${isBrandDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isBrandDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-[25]" 
                    onClick={() => setIsBrandDropdownOpen(false)}
                  />
                  <div className="absolute top-full mt-2 w-full bg-v-black border border-white/10 shadow-2xl shadow-black/50 z-[26] max-h-[400px] overflow-y-auto backdrop-blur-xl">
                    {brands.map((brand, idx) => (
                      <button
                        key={brand}
                        onClick={() => {
                          setFilterBrand(brand);
                          setIsBrandDropdownOpen(false);
                        }}
                        className={`w-full px-6 py-3 text-left text-xs tracking-[0.3em] uppercase transition-all duration-200 border-b border-white/5 hover:bg-v-red/10 hover:border-v-red/20 ${
                          filterBrand === brand 
                            ? 'bg-v-red/20 text-v-red font-bold border-l-4 border-l-v-red' 
                            : 'text-white/60 hover:text-white'
                        }`}
                        style={{ animationDelay: `${idx * 30}ms` }}
                      >
                        <span className="serif italic">{brand === 'ALL' ? '✦ All Houses' : brand}</span>
                        {brand !== 'ALL' && (
                          <span className="ml-2 text-[9px] opacity-40">
                            ({INVENTORY.filter(p => p.brand === brand).length})
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Active Filters Display */}
            {(filterBrand !== 'ALL' || searchTerm) && (
              <div className="flex flex-wrap gap-2 items-center justify-center">
                <span className="text-[9px] tracking-[0.3em] uppercase text-white/20">Active Filters:</span>
                {filterBrand !== 'ALL' && (
                  <span className="bg-v-red/20 border border-v-red/30 px-3 py-1 text-[9px] tracking-[0.2em] uppercase text-v-red flex items-center gap-2">
                    {filterBrand}
                    <button 
                      onClick={() => setFilterBrand('ALL')}
                      className="hover:text-white transition-colors"
                    >×</button>
                  </span>
                )}
                {searchTerm && (
                  <span className="bg-white/5 border border-white/10 px-3 py-1 text-[9px] tracking-[0.2em] uppercase text-white/60 flex items-center gap-2">
                    "{searchTerm}"
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="hover:text-v-red transition-colors"
                    >×</button>
                  </span>
                )}
              </div>
            )}
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
        
        <footer className="mt-40 mb-20 py-20 border-t border-white/5 flex flex-col items-center gap-12 relative">
             {/* Footer glow */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-v-red/5 blur-[100px] rounded-full pointer-events-none" />
             
             <div className="text-center space-y-6 relative z-10">
                {/* Footer Logo - smaller */}
                <div className="mb-8 flex justify-center opacity-20 hover:opacity-40 transition-opacity duration-700">
                  <img 
                    src="/images/wingsofofrtuning.jpg" 
                    alt="Wings of Fortune"
                    className="h-16 w-auto filter brightness-110"
                  />
                </div>
                
                <h2 className="text-6xl md:text-8xl serif italic tracking-tighter text-white/20 drop-shadow-lg">Atelier Los Angeles</h2>
                <div className="flex flex-col items-center gap-2">
                   <p className="text-v-red font-bold text-xs tracking-[0.8em] uppercase">90015 / CALIFORNIA</p>
                   <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase">Private Inventory Access Only</p>
                </div>
             </div>
            
            <button 
              onClick={handleInquire}
              className="group flex flex-col items-center gap-4 relative z-10"
            >
              <span className="text-[10px] tracking-[0.5em] uppercase text-white/40 group-hover:text-v-red transition-colors">Contact Sales Executive</span>
              <div className="h-12 w-[1px] bg-gradient-to-b from-white/10 via-white/30 to-transparent group-hover:from-v-red group-hover:via-v-red/50 group-hover:h-16 transition-all duration-700"></div>
            </button>

            <div className="flex gap-12 text-[9px] font-medium text-white/10 uppercase tracking-[0.5em] relative z-10">
                <span>2025 Archive Edition</span>
                <span>//</span>
                <span>Verified Authentic</span>
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