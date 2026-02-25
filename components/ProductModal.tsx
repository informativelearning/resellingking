import React, { useState, useRef } from 'react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onInquire: () => void;
  onAddToCart: (product: Product, selectedSize?: string) => void;
}

const SIZES =['XS', 'S', 'M', 'L', 'XL'];
const SNEAKER_SIZES =[
  '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5',
  '11', '11.5', '12', '12.5', '13', '14'
];

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onInquire, onAddToCart }) => {
  const isApparel = product.category === 'Apparel' || product.category === 'Sneakers';
  const isSteal   = product.category === 'Apparel' && product.price === 35;
  
  // Calculate if images exist
  const hasNoImages = !product.image && (!product.images || product.images.length === 0);
  const productImages = hasNoImages ?[] : (product.images && product.images.length > 0 ? product.images : [product.image]);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const[isSquare, setIsSquare] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const r = img.naturalWidth / img.naturalHeight;
    setIsSquare(r >= 0.9 && r <= 1.1);
  };

  const handleAddToCart = () => {
    if (isApparel && !selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 1800);
      return;
    }
    onAddToCart(product, selectedSize ?? undefined);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const width = scrollRef.current.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== currentImageIndex) setCurrentImageIndex(newIndex);
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ left: index * scrollRef.current.clientWidth, behavior: 'smooth' });
    setCurrentImageIndex(index);
  };

  const nextImage = () => {
    if (productImages.length === 0) return;
    scrollToIndex((currentImageIndex + 1) % productImages.length);
  };
  
  const prevImage = () => {
    if (productImages.length === 0) return;
    scrollToIndex((currentImageIndex - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-v-black overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
      <div className="sticky top-0 z-10 flex justify-end px-6 py-4 border-b border-white/5 bg-v-black">
        <button
          onClick={onClose}
          className="text-white hover:text-v-red transition-colors text-xs tracking-[0.4em] uppercase flex items-center gap-2 group px-4 py-2 border border-white/10"
        >
          Close <span className="text-xl font-light group-hover:rotate-90 transition-transform inline-block">×</span>
        </button>
      </div>

      <div className="fixed top-0 left-0 w-full h-full opacity-5 pointer-events-none overflow-hidden select-none">
        <span className="text-[40vh] font-black serif italic absolute -top-20 -left-20 whitespace-nowrap leading-none">
          {product.brand}
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:min-h-[calc(100vh-57px)]">
        <div className={`w-full md:w-1/2 relative flex-shrink-0 group ${product.category === "Sneakers" && !hasNoImages ? "bg-white h-[80vw] min-h-[300px] md:h-auto md:min-h-full" : "bg-v-gray h-[80vw] min-h-[300px] md:h-auto md:min-h-full"}`}>
          
          {/* No Image Fallback with Wings */}
          {hasNoImages ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] border-b md:border-b-0 md:border-r border-white/10 p-8 text-center min-h-[300px] relative overflow-hidden">
              <img
                src="/images/corner-wing.png"
                alt=""
                className="absolute -top-2 -left-2 w-48 h-48 sm:w-56 sm:h-56 object-contain pointer-events-none z-[1] opacity-40"
              />
              <img
                src="/images/corner-wing.png"
                alt=""
                className="absolute -bottom-2 -right-2 w-48 h-48 sm:w-56 sm:h-56 object-contain pointer-events-none z-[1] opacity-40 rotate-180"
              />
              <div className="relative z-10 flex flex-col items-center">
                <span className="serif italic text-4xl md:text-5xl text-white/30 leading-none">No Image</span>
                <span className="text-[10px] font-mono tracking-[0.4em] text-v-red uppercase mt-4">Available</span>
              </div>
            </div>
          ) : (
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex w-full h-full overflow-x-auto snap-x snap-mandatory hide-scrollbar touch-pan-x"
            >
              {productImages.map((imgSrc, idx) => (
                <div key={idx} className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center relative overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={`${product.name} - Image ${idx + 1}`}
                    className={`w-full h-full transition-all duration-500 ${
                      product.category === 'Sneakers'
                        ? 'object-contain p-6'
                        : isApparel
                          ? 'object-cover'
                          : isSquare
                            ? 'object-cover'
                            : 'object-contain p-4'
                    }`}
                    onLoad={handleImageLoad}
                    style={product.category === 'Sneakers' ? { filter: 'none' } : {}}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Carousel Controls */}
          {!hasNoImages && productImages.length > 1 && (
            <>
              <button onClick={prevImage} className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-v-black/70 backdrop-blur-sm border border-white/20 items-center justify-center text-white hover:bg-v-red transition-all duration-300 text-2xl z-10 opacity-0 group-hover:opacity-100">‹</button>
              <button onClick={nextImage} className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-v-black/70 backdrop-blur-sm border border-white/20 items-center justify-center text-white hover:bg-v-red transition-all duration-300 text-2xl z-10 opacity-0 group-hover:opacity-100">›</button>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {productImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-8 bg-v-red' : 'w-1.5 bg-white/30 hover:bg-white/60'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="w-full md:w-1/2 px-7 pt-6 pb-10 sm:px-10 sm:pt-8 sm:pb-12 md:px-14 md:pt-10 md:pb-16 flex flex-col bg-v-black border-t border-white/10 md:border-t-0 md:border-l md:border-white/10">
          <div className="max-w-lg mx-auto space-y-10 pb-8 md:pb-0 z-10 relative">

            <header className="space-y-4">
              <span className="text-v-red text-[11px] font-bold tracking-[0.5em] uppercase block">{product.brand}</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl serif italic leading-snug text-white tracking-tight">
                {(() => {
                  const name = product.name;
                  const modelStart = name.search(/Air Jordan|Nike SB|Jordan \d/);
                  if (modelStart > 0) {
                    const prefix = name.slice(0, modelStart).trim().replace(/x\s*$/, '').trim();
                    const model  = name.slice(modelStart);
                    const colorStart = model.search(/\s(Black Cat|Wolf Grey|Cave Stone|Reverse Mocha|Velvet Brown|Medium Olive|Dark Mocha|Cool Grey|Gamma|Cap and Gown|Rare Air|Fire Red|Grape|Pine Green|Navy|Olive|Sail|Brick|Reimagined|Deep Green|OG SP)/);
                    const modelName  = colorStart > 0 ? model.slice(0, colorStart) : model;
                    const colorway   = colorStart > 0 ? model.slice(colorStart) : '';
                    return (
                      <>
                        {prefix && <span className="block text-white/50 text-sm sm:text-base tracking-widest uppercase not-italic mb-1">{prefix} ×</span>}
                        <span className="block">{modelName}</span>
                        {colorway && <span className="block text-v-red/90">{colorway.trim()}</span>}
                      </>
                    );
                  }
                  return name;
                })()}
              </h2>
              
              <div className="flex gap-4 items-center pt-3">
                <div className="flex items-baseline gap-3">
                  <span className={`text-3xl serif italic ${isSteal ? 'text-v-red' : 'text-white/80'}`}>
                    ${product.price}
                  </span>
                  {isSteal && (
                    <span className="text-xl serif italic text-white/30 line-through decoration-white/20">
                      $60
                    </span>
                  )}
                </div>
                <span className="h-[1px] flex-1 bg-white/20"></span>
                <span className="text-[11px] tracking-[0.3em] uppercase text-white/40">
                  {product.spec}
                </span>
              </div>
            </header>

            <p className="text-base sm:text-lg serif italic text-white/80 leading-relaxed">
              {product.details.description}
            </p>

            <div className="flex gap-3 flex-wrap">
              <span className="text-[10px] uppercase tracking-[0.3em] border border-white/15 px-3 py-2 text-white/50">
                {product.condition}
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] border border-v-red/40 px-3 py-2 text-v-red/80">
                verified auth.
              </span>
              {isSteal && (
                <span className="text-[10px] uppercase tracking-[0.3em] border border-v-red px-3 py-2 text-v-red">
                  Limited Allocation
                </span>
              )}
            </div>

            {isApparel && (
              <div className="space-y-3">
                <p className={`text-[10px] uppercase tracking-[0.3em] font-mono transition-colors duration-300 ${sizeError ? 'text-v-red' : 'text-white/30'}`}>
                  {sizeError ? 'pick a size first.' : 'select size'}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {(product.category === 'Sneakers' ? SNEAKER_SIZES : SIZES).map(size => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setSizeError(false); }}
                      className={`h-10 text-xs font-bold tracking-wider border transition-all duration-200 active:scale-95 ${product.category === "Sneakers" ? "w-14" : "w-12 uppercase"} ${
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

            <div className="space-y-3 pt-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-v-red text-white py-5 text-xs font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-v-black active:scale-[0.98] transition-all duration-300 border border-v-red"
              >
                add to bag
              </button>

              <button
                onClick={onInquire}
                className="w-full bg-transparent text-white py-5 text-xs font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-v-black active:scale-[0.98] transition-all duration-300 border border-white/20"
              >
                dm for availability
              </button>

              <p className="text-center text-[10px] text-white/20 uppercase tracking-[0.3em] pt-2 italic">
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