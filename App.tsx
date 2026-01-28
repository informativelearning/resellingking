import React, { useState, useMemo } from 'react';
import Ticker from './components/Ticker';
import InventoryTable from './components/InventoryTable';
import ProductModal from './components/ProductModal';
import { INVENTORY } from './constants';
import { Product } from './types';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('ALL');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const brands: string[] = useMemo(() => {
    const allBrands = INVENTORY.map(p => p.brand);
    // Unique list, alphabetical except for 'ALL'
    const uniqueBrands = Array.from(new Set(allBrands)).sort();
    return ['ALL', ...uniqueBrands];
  }, []);

  const filteredProducts = useMemo(() => {
    return INVENTORY.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.ids.some(id => id.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesBrand = filterBrand === 'ALL' || product.brand === filterBrand;

      return matchesSearch && matchesBrand;
    });
  }, [searchTerm, filterBrand]);

  const handleInquire = () => {
    window.open('https://instagram.com/661ro_resellz', '_blank');
  };

  return (
    <div className="min-h-screen bg-v-black text-v-white font-sans flex flex-col overflow-x-hidden">
      <header className="sticky top-0 z-30 bg-v-black border-b border-white/5">
        <Ticker />
        <div className="px-6 md:px-12 py-8 flex flex-col items-center gap-12 max-w-[1800px] mx-auto w-full">
          
          {/* Logo Area */}
          <div className="text-center group cursor-default">
            <h1 className="text-5xl md:text-8xl serif italic tracking-tighter text-white leading-none">
              The Plug<span className="text-v-red">.</span>
            </h1>
            <div className="flex items-center justify-center gap-6 mt-4 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
               <span className="h-[1px] w-8 bg-white"></span>
               <span className="text-[10px] tracking-[0.6em] uppercase font-bold">Couture Manifest 2025</span>
               <span className="h-[1px] w-8 bg-white"></span>
            </div>
          </div>

          {/* Luxury Filter Bar */}
          <div className="w-full max-w-5xl flex flex-col gap-10 items-center">
            {/* Search Input */}
            <div className="relative w-full max-w-2xl group">
               <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ARCHIVE SEARCH..."
                className="w-full bg-transparent border-b border-white/10 p-4 text-white font-light placeholder-white/20 focus:outline-none uppercase text-xs tracking-[0.3em] focus:border-v-red transition-colors text-center"
              />
              <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-v-red transition-all duration-700 group-focus-within:w-full"></div>
            </div>
            
            {/* Brand Filter List - Show All Unique Brands */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-5xl">
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => setFilterBrand(brand)}
                  className={`text-[10px] tracking-[0.4em] uppercase transition-all duration-500 luxury-underline group pb-1 whitespace-nowrap ${
                    filterBrand === brand ? 'text-v-red italic font-bold' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 md:px-12 py-12 max-w-[1800px] mx-auto w-full">
        <InventoryTable 
          products={filteredProducts}
          onProductClick={setSelectedProduct}
          onInquire={handleInquire}
        />
        
        <footer className="mt-40 mb-20 py-20 border-t border-white/5 flex flex-col items-center gap-12">
             <div className="text-center space-y-6">
                <h2 className="text-6xl md:text-8xl serif italic tracking-tighter text-white opacity-20">Atelier Los Angeles</h2>
                <div className="flex flex-col items-center gap-2">
                   <p className="text-v-red font-bold text-xs tracking-[0.8em] uppercase">90015 / CALIFORNIA</p>
                   <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase">Private Inventory Access Only</p>
                </div>
             </div>
            
            <button 
              onClick={handleInquire}
              className="group flex flex-col items-center gap-4"
            >
              <span className="text-[10px] tracking-[0.5em] uppercase text-white/40 group-hover:text-v-red transition-colors">Contact Sales Executive</span>
              <div className="h-12 w-[1px] bg-white/10 group-hover:bg-v-red group-hover:h-16 transition-all duration-700"></div>
            </button>

            <div className="flex gap-12 text-[9px] font-medium text-white/10 uppercase tracking-[0.5em]">
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
        />
      )}
    </div>
  );
};

export default App;
