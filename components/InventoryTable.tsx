import React, { useState, useCallback, memo } from 'react';
import { Product } from '../types';

interface InventoryTableProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, selectedSize?: string) => void;
}

const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
const LOGO = '/images/wingsofofrtune2.png';

const ProductCard = memo(({
  product,
  idx,
  onProductClick,
  onAddToCart,
}: {
  product: Product;
  idx: number;
  onProductClick: (p: Product) => void;
  onAddToCart: (p: Product, size?: string) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSquare, setIsSquare]         = useState(false);
  const [isHovered, setIsHovered]       = useState(false);

  const images     = product.images && product.images.length > 0 ? product.images : [product.image];
  const isApparel  = product.category === 'Apparel';
  const isSneakers = product.category === 'Sneakers';
  const usesCover  = isApparel && !isSneakers;

  const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const ratio = img.naturalWidth / img.naturalHeight;
    if (ratio >= 0.9 && ratio <= 1.1) setIsSquare(true);
  }, []);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (isApparel || isSneakers) onProductClick(product);
    else onAddToCart(product);
  }, [isApparel, isSneakers, product, onProductClick, onAddToCart]);

  return (
    <div
      onClick={() => onProductClick(product)}
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
      className="group cursor-pointer flex flex-col space-y-3 relative"
      style={{
        animation: 'fadeInUp 0.5s ease-out forwards',
        animationDelay: `${Math.min(idx * 40, 400)}ms`,
        opacity: 0,
        contain: 'layout style',
      }}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${
        isSneakers
          ? 'aspect-[4/3] bg-white border border-white/10 border-t-2 border-t-v-red'
          : 'aspect-[3/4] bg-v-gray border border-white/5'
      }`}>

        {/* Gradient overlay — fragrances/apparel only */}
        {!isSneakers && (
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-[1] ${
            isTouchDevice ? 'opacity-50' : 'opacity-60 transition-opacity duration-500 group-hover:opacity-30'
          }`} />
        )}

        {/* Sneaker edge vignette */}
        {isSneakers && (
          <div className="absolute inset-0 z-[1] pointer-events-none" style={{
            background: 'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)'
          }} />
        )}

        <img
          src={images[currentIndex]}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onLoad={handleImageLoad}
          className={`w-full h-full ${
            isSneakers
              ? 'object-contain p-3'
              : usesCover || isSquare
                ? 'object-cover'
                : 'object-contain p-2'
          } ${isTouchDevice ? '' : 'transition-transform duration-700 group-hover:scale-105'}`}
          style={{
            filter: isSneakers ? 'contrast(1.08) saturate(0.95)' : 'brightness(0.92) contrast(1.05)',
            ...(isSneakers ? {
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)',
            } : {})
          }}
        />

        {/* Image dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-[3]">
            {images.map((_, dotIdx) => (
              <button
                key={dotIdx}
                className={`h-1 rounded-full transition-all duration-200 ${
                  dotIdx === currentIndex
                    ? 'w-6 bg-v-red'
                    : isSneakers ? 'w-1 bg-black/20' : 'w-1 bg-white/30'
                }`}
                onClick={e => { e.stopPropagation(); setCurrentIndex(dotIdx); }}
              />
            ))}
          </div>
        )}

        {/* Price tag */}
        <div className={`absolute z-[2] ${isSneakers ? 'bottom-3 left-3' : 'top-3 right-3'}`}>
          <div className={`text-[11px] sm:text-xs font-mono font-bold tracking-wider px-2 py-1 sm:px-3 sm:py-1.5 border ${
            isSneakers
              ? 'bg-v-red text-white border-v-red'
              : 'bg-v-black/80 backdrop-blur-sm text-white border-white/10'
          } ${isTouchDevice ? '' : 'transition-transform duration-300 group-hover:scale-105'}`}>
            ${product.price}
          </div>
        </div>

        {/* Hover overlay — desktop only */}
        {!isTouchDevice && (
          <div className={`absolute inset-0 transition-opacity duration-400 flex flex-col items-center justify-center gap-3 z-[2] ${
            isSneakers ? 'bg-black/70' : 'bg-gradient-to-t from-black via-black/80 to-transparent'
          } ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <span className="text-[9px] sm:text-[10px] tracking-[0.5em] uppercase border border-white/60 px-4 py-2 text-white/90 font-mono">
              View Details
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-v-red text-white px-4 py-2 text-[9px] sm:text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-white hover:text-v-black transition-colors duration-200 font-mono"
            >
              {isApparel || isSneakers ? 'Select Size' : 'Add to Bag'}
            </button>
          </div>
        )}

        {/* Category tag — non-sneakers only */}
        {!isSneakers && (
          <div className={`absolute top-0 left-0 h-full w-6 sm:w-8 flex items-center justify-center pointer-events-none z-[2] ${
            isTouchDevice ? 'bg-v-black/70 border-r border-white/10' : 'bg-v-black/60 backdrop-blur-sm border-r border-white/10'
          }`}>
            <span className="whitespace-nowrap -rotate-90 text-[7px] sm:text-[8px] tracking-[0.4em] uppercase font-bold text-white/50">
              {product.category}
            </span>
          </div>
        )}
      </div>

      {/* Product Meta */}
      <div className="flex flex-col space-y-1 pl-2 sm:pl-4 relative">
        {!isTouchDevice && (
          <div className="absolute left-0 top-0 w-[2px] h-0 bg-gradient-to-b from-v-red to-transparent group-hover:h-full transition-all duration-500" />
        )}
        <span className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-v-red font-mono font-bold opacity-80">
          {product.brand}
        </span>
        <h3 className="text-base sm:text-xl serif italic tracking-wide text-white leading-tight">
          {product.name}
        </h3>
        <div className="flex justify-between items-center pt-1.5 border-t border-white/5 mt-1">
          <span className="text-[8px] sm:text-[9px] tracking-[0.2em] text-white/40 uppercase font-mono">{product.spec}</span>
          <span className="text-[8px] sm:text-[9px] font-mono text-white/60 tracking-wider uppercase">{product.condition}</span>
        </div>
      </div>
    </div>
  );
});

const InventoryTable: React.FC<InventoryTableProps> = ({ products, onProductClick, onAddToCart }) => (
  <div className="w-full mb-20 relative">
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16 relative z-10">
      {products.map((product, idx) => (
        <ProductCard
          key={product.ids[0]}
          product={product}
          idx={idx}
          onProductClick={onProductClick}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>

    {/* Empty State */}
    {products.length === 0 && (
      <div className="py-32 flex flex-col items-center justify-center relative overflow-hidden border border-white/5 bg-white/[0.01]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] opacity-[0.05] pointer-events-none mix-blend-screen flex justify-center items-center">
          <img
            src={LOGO}
            alt="Wings"
            className="w-full h-auto object-contain scale-[1.5] filter grayscale contrast-125"
          />
        </div>
        <div className="relative z-10 text-center space-y-5">
          <h2 className="text-3xl sm:text-4xl serif italic text-white/50 drop-shadow-lg">Collection Empty</h2>
          <p className="text-[10px] tracking-[0.4em] uppercase text-v-red font-mono">
            [ 0 ITEMS FOUND ]
          </p>
          <div className="pt-8">
            <button
              onClick={() => window.open('https://instagram.com/661ro_resellz', '_blank')}
              className="text-[9px] tracking-[0.3em] uppercase border border-white/20 px-6 py-4 text-white/60 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-300 font-mono"
            >
              Not in current stock. DM to source.
            </button>
          </div>
        </div>
      </div>
    )}

    <style>{`
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  </div>
);

export default InventoryTable;