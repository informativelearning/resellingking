import React from 'react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onInquire: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onInquire }) => {
  const isFragrance = product.category === 'Fragrance';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-v-black overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none overflow-hidden select-none">
        <span className="text-[40vh] font-black serif italic absolute -top-20 -left-20 whitespace-nowrap leading-none">
          {product.brand}
        </span>
      </div>

      <div className="relative w-full h-full flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-[60] text-white hover:text-v-red transition-colors text-xs tracking-[0.5em] uppercase flex items-center gap-2 group"
        >
          Close <span className="text-2xl font-light group-hover:rotate-90 transition-transform">×</span>
        </button>

        {/* Left Side: Editorial Image */}
        <div className="w-full md:w-1/2 h-2/3 md:h-full relative overflow-hidden bg-v-gray">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-12 left-12">
            <span className="text-v-red text-xs font-bold tracking-[0.5em] uppercase block mb-4">Master Manifest 2025</span>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 inline-block">
               <p className="text-[10px] text-white/40 uppercase mb-2">Authenticated Batch</p>
               <div className="flex flex-col gap-1">
                 {product.ids.map(id => (
                   <span key={id} className="font-mono text-[9px] text-white/60 tracking-tighter">{id}</span>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* Right Side: Details Content */}
        <div className="w-full md:w-1/2 h-auto md:h-full p-8 md:p-20 flex flex-col justify-center bg-v-black border-l border-white/10">
          <div className="max-w-lg mx-auto space-y-12">
            
            <header className="space-y-4">
              <span className="text-v-red text-xs font-bold tracking-[0.6em] uppercase block">{product.brand}</span>
              <h2 className="text-6xl md:text-8xl serif italic leading-[0.85] text-white tracking-tighter">
                {product.name}
              </h2>
              <div className="flex gap-4 items-center pt-4">
                <span className="text-3xl serif italic text-white/80">${product.price}</span>
                <span className="h-[1px] flex-1 bg-white/20"></span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">{product.spec}</span>
              </div>
            </header>

            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-xl serif italic text-white/90 leading-relaxed">
                  {product.details.description}
                </p>
              </div>

              <div className="pt-12 border-t border-white/10">
                <h4 className="text-[10px] tracking-[0.4em] uppercase text-v-red font-bold mb-8">Composition & Performance</h4>
                
                {isFragrance ? (
                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                      <span className="text-[10px] text-white/30 uppercase tracking-widest">Top</span>
                      <span className="serif italic text-lg text-white/80">{product.details.topNotes?.join(', ')}</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                      <span className="text-[10px] text-white/30 uppercase tracking-widest">Heart</span>
                      <span className="serif italic text-lg text-white/80">{product.details.heartNotes?.join(', ')}</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                      <span className="text-[10px] text-white/30 uppercase tracking-widest">Base</span>
                      <span className="serif italic text-lg text-white/80">{product.details.baseNotes?.join(', ')}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-12 mt-4">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-white/20 block mb-1">Projection</span>
                        <span className="text-xs font-bold text-white tracking-[0.2em]">{product.details.projection}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-white/20 block mb-1">Sillage</span>
                        <span className="text-xs font-bold text-white tracking-[0.2em]">{product.details.sillage}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-[10px] text-white/30 uppercase tracking-widest">Authenticity</span>
                      <span className="serif italic text-lg text-white/80">{product.details.serialStatus}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-12">
              <button 
                onClick={onInquire}
                className="w-full bg-v-red text-white py-6 text-xs font-bold uppercase tracking-[0.5em] hover:bg-white hover:text-v-black transition-all duration-500 border border-v-red"
              >
                Inquire via Atelier
              </button>
              <p className="text-center text-[9px] text-white/20 uppercase tracking-[0.4em] mt-6 italic">Verified Stock // Est. 2025</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductModal;