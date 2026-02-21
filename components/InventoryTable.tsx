import React, { useState, useCallback, memo } from 'react';
import { Product } from '../types';

interface InventoryTableProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, selectedSize?: string) => void;
}

// Detect touch device once — no hover states on mobile
const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

// Memoized card to prevent re-renders when other cards update
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
  const [currentIndex, setCurrentIndex]   = useState(0);
  const [isSquare, setIsSquare]           = useState(false);
  const [isHovered, setIsHovered]         = useState(false);

  const images    = product.images && product.images.length > 0 ? product.images : [product.image];
  const isApparel = product.category === 'Apparel';
  const isSneakers = product.category === 'Sneakers';
  const usesCover = isApparel || isSneakers;


  const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const ratio = img.naturalWidth / img.naturalHeight;
    // Square = ratio between 0.9 and 1.1
    if (ratio >= 0.9 && ratio <= 1.1) setIsSquare(true);
  }, []);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (isApparel || isSneakers) onProductClick(product);
    else onAddToCart(product);
  }, [isApparel, product, onProductClick, onAddToCart]);

  return (
    <div
      onClick={() => onProductClick(product)}
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
      className="group cursor-pointer flex flex-col space-y-3"
      style={{
        animation: 'fadeInUp 0.5s ease-out forwards',
        animationDelay: `${Math.min(idx * 40, 400)}ms`, // cap delay so last items don't wait forever
        opacity: 0,
        contain: 'layout style', // CSS containment — browser skips layout recalc for siblings
      }}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden bg-v-gray border border-white/5 ${isSneakers ? 'aspect-[4/3]' : 'aspect-[3/4]'}`}>

        {/* Gradient overlay — no transition on mobile */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-[1] ${
          isTouchDevice ? 'opacity-50' : 'opacity-60 transition-opacity duration-500 group-hover:opacity-30'
        }`} />

        <img
          src={images[currentIndex]}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onLoad={handleImageLoad}
          className={`w-full h-full ${
            isSneakers
              ? 'object-contain'
              : isApparel
                ? 'object-cover'
                : isSquare
                  ? 'object-cover'
                  : 'object-contain p-2'
          } ${isTouchDevice ? '' : 'transition-transform duration-700 group-hover:scale-105'}`}
          style={{ filter: 'brightness(0.92) contrast(1.05)' }}
        />

        {/* Category tag — no backdrop-blur on mobile */}
        <div className={`absolute top-0 left-0 h-full w-6 sm:w-8 flex items-center justify-center border-r border-white/10 pointer-events-none z-[2] ${
          isTouchDevice ? 'bg-v-black/70' : 'bg-v-black/60 backdrop-blur-sm'
        }`}>
          <span className="whitespace-nowrap -rotate-90 text-[7px] sm:text-[8px] tracking-[0.4em] uppercase text-white/50 font-bold">
            {product.category}
          </span>
        </div>

        {/* Price tag — no backdrop-blur on mobile */}
        <div className="absolute top-3 right-3 z-[2]">
          <div className={`text-[11px] sm:text-xs font-black tracking-wider bg-v-red text-white px-2 py-1.5 sm:px-3 sm:py-2 ${
            isTouchDevice ? '' : 'transition-transform duration-300 group-hover:scale-110'
          }`}>
            ${product.price}
          </div>
        </div>

        {/* Image dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-[3]">
            {images.map((_, dotIdx) => (
              <button
                key={dotIdx}
                className={`h-1 rounded-full transition-all duration-200 ${
                  dotIdx === currentIndex ? 'w-6 bg-v-red' : 'w-1 bg-white/30'
                }`}
                onClick={e => { e.stopPropagation(); setCurrentIndex(dotIdx); }}
              />
            ))}
          </div>
        )}

        {/* Desktop nav arrows only */}
        {!isTouchDevice && images.length > 1 && isHovered && (
          <>
            <button
              onClick={e => { e.stopPropagation(); setCurrentIndex(i => (i - 1 + images.length) % images.length); }}
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-v-black/80 border border-white/20 items-center justify-center text-white hover:bg-v-red transition-colors duration-200 z-[3]"
            >‹</button>
            <button
              onClick={e => { e.stopPropagation(); setCurrentIndex(i => (i + 1) % images.length); }}
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-v-black/80 border border-white/20 items-center justify-center text-white hover:bg-v-red transition-colors duration-200 z-[3]"
            >›</button>
          </>
        )}

        {/* Hover overlay — desktop only, skipped entirely on touch */}
        {!isTouchDevice && (
          <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-400 flex flex-col items-center justify-center gap-3 z-[2] ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <span className="text-[9px] sm:text-[10px] tracking-[0.5em] uppercase border border-white/60 px-4 py-2 text-white/90">
              View Details
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-v-red text-white px-4 py-2 text-[9px] sm:text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-white hover:text-v-black transition-colors duration-200"
            >
              {isApparel || isSneakers ? 'Select Size' : 'Add to Bag'}
            </button>
          </div>
        )}
      </div>

      {/* Product Meta */}
      <div className="flex flex-col space-y-1 pl-2 sm:pl-4 relative">
        {!isTouchDevice && (
          <div className="absolute left-0 top-0 w-[2px] h-0 bg-gradient-to-b from-v-red to-transparent group-hover:h-full transition-all duration-500" />
        )}
        <span className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-v-red font-bold opacity-80">
          {product.brand}
        </span>
        <h3 className="text-base sm:text-xl serif italic tracking-wide text-white leading-tight">
          {product.name}
        </h3>
        <div className="flex justify-between items-center pt-1.5 border-t border-white/5 mt-1">
          <span className="text-[8px] sm:text-[9px] tracking-[0.2em] text-white/40 uppercase">{product.spec}</span>
          <span className="text-[8px] sm:text-[9px] font-bold text-white/60 tracking-wider">{product.condition}</span>
        </div>
      </div>
    </div>
  );
});

const InventoryTable: React.FC<InventoryTableProps> = ({ products, onProductClick, onAddToCart }) => (
  <div className="w-full mb-20">
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16">
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

    {products.length === 0 && (
      <div className="py-40 text-center">
        <h2 className="serif text-5xl italic text-white/20">Archive Empty</h2>
        <p className="text-[10px] tracking-[0.3em] uppercase text-v-red/60 mt-6">Refine your search parameters</p>
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