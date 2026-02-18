import React, { useState } from 'react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onInquire: () => void;
  onAddToCart: (product: Product, selectedSize?: string) => void;
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onInquire, onAddToCart }) => {
  const isApparel = product.category === 'Apparel';
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);

  const handleAddToCart = () => {
    if (isApparel && !selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 1800);
      return;
    }
    onAddToCart(product, selectedSize ?? undefined);
  };

  const nextImage = () => setCurrentImageIndex(prev => (prev + 1) % productImages.length);
  const prevImage = () => setCurrentImageIndex(prev => (prev - 1 + productImages.length) % productImages.length);

  return (
    <div className="fixed inset-0 z-50 bg-v-black overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
      {/* Background decor */}
      <div className="fixed top-0 left-0 w-full h-full opacity-5 pointer-events-none overflow-hidden select-none">
        <span className="text-[40vh] font-black serif italic absolute -top-20 -left-20 whitespace-nowrap leading-none">
          {product.brand}
        </span>
      </div>

      {/* Sticky close */}
      <div className="sticky top-0 z-[60] flex justify-end px-6 py-4 bg-gradient-to-b from-v-black to-transparent pointer-events-none">
        <button
          onClick={onClose}
          className="pointer-events-auto text-white hover:text-v-red transition-colors text-xs tracking-[0.5em] uppercase flex items-center gap-2 group bg-v-black/80 backdrop-blur-sm px-4 py-2 border border-white/10"
        >
          Close <span className="text-xl font-light group-hover:rotate-90 transition-transform inline-block">×</span>
        </button>
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row md:min-h-screen md:h-screen md:overflow-hidden -mt-14 md:mt-0">

        {/* Image side */}
        <div className="w-full md:w-1/2 h-[60vw] min-h-[280px] md:h-full relative overflow-hidden bg-v-gray flex-shrink-0">
          <img
            src={productImages[currentImageIndex]}
            alt={`${product.name} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />

          {productImages.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-v-black/70 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-v-red transition-colors text-2xl z-10">‹</button>
              <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-v-black/70 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-v-red transition-colors text-2xl z-10">›</button>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {productImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-8 bg-v-red' : 'w-1.5 bg-white/30 hover:bg-white/60'}`}
                  />
                ))}
              </div>
            </>
          )}


        </div>

        {/* Details side */}
        <div
          className="w-full md:w-1/2 md:h-full md:overflow-y-auto p-7 sm:p-10 md:p-16 flex flex-col justify-center bg-v-black border-t border-white/10 md:border-t-0 md:border-l md:border-white/10"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="max-w-lg mx-auto space-y-10 pb-8 md:pb-0">

            {/* Header */}
            <header className="space-y-4">
              <span className="text-v-red text-[10px] font-bold tracking-[0.6em] uppercase block">{product.brand}</span>
              <h2 className="text-5xl sm:text-6xl md:text-7xl serif italic leading-[0.88] text-white tracking-tighter">
                {product.name}
              </h2>
              <div className="flex gap-4 items-center pt-3">
                <span className="text-3xl serif italic text-white/80">${product.price}</span>
                <span className="h-[1px] flex-1 bg-white/20"></span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">{product.spec}</span>
              </div>
            </header>

            {/* Description */}
            <p className="text-base sm:text-lg serif italic text-white/80 leading-relaxed">
              {product.details.description}
            </p>

            {/* Condition pills */}
            <div className="flex gap-3 flex-wrap">
              <span className="text-[9px] uppercase tracking-[0.3em] border border-white/15 px-3 py-2 text-white/50">
                {product.condition}
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] border border-v-red/40 px-3 py-2 text-v-red/80">
                verified auth.
              </span>
            </div>

            {/* SIZE SELECTOR — apparel only */}
            {isApparel && (
              <div className="space-y-3">
                <p className={`text-[9px] uppercase tracking-[0.4em] font-mono transition-colors duration-300 ${sizeError ? 'text-v-red' : 'text-white/30'}`}>
                  {sizeError ? 'pick a size first.' : 'select size'}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {SIZES.map(size => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setSizeError(false); }}
                      className={`w-12 h-12 text-xs font-bold uppercase tracking-wider border transition-all duration-200 active:scale-95 ${
                        selectedSize === size
                          ? 'bg-v-red border-v-red text-white'
                          : sizeError
                          ? 'border-v-red/50 text-white/40 hover:border-v-red hover:text-white'
                          : 'border-white/15 text-white/40 hover:border-white/50 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-v-red text-white py-5 text-xs font-bold uppercase tracking-[0.5em] hover:bg-white hover:text-v-black active:scale-[0.98] transition-all duration-300 border border-v-red"
              >
                add to bag
              </button>

              <button
                onClick={onInquire}
                className="w-full bg-transparent text-white py-5 text-xs font-bold uppercase tracking-[0.5em] hover:bg-white hover:text-v-black active:scale-[0.98] transition-all duration-300 border border-white/20"
              >
                dm for availability
              </button>

              <p className="text-center text-[9px] text-white/20 uppercase tracking-[0.4em] pt-2 italic">
                verified stock // est. 2025
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;