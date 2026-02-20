import React, { useState } from 'react';
import { Product } from '../types';

interface InventoryTableProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, selectedSize?: string) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ products, onProductClick, onAddToCart }) => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({});

  // For apparel: clicking "Add to Bag" on the card opens the modal so size can be selected.
  // For fragrance: adds directly since there's no size to pick.
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (product.category === 'Apparel') {
      onProductClick(product); // force them through the modal to pick size
    } else {
      onAddToCart(product);
    }
  };

  const getProductImages = (product: Product): string[] =>
    product.images && product.images.length > 0 ? product.images : [product.image];

  const handleImageNavigation = (
    e: React.MouseEvent,
    productId: string,
    direction: 'next' | 'prev',
    totalImages: number
  ) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => {
      const current = prev[productId] || 0;
      const next =
        direction === 'next'
          ? (current + 1) % totalImages
          : (current - 1 + totalImages) % totalImages;
      return { ...prev, [productId]: next };
    });
  };

  return (
    <div className="w-full mb-20">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16">
        {products.map((product, idx) => {
          const productImages     = getProductImages(product);
          const hasMultipleImages = productImages.length > 1;
          const currentIndex      = currentImageIndex[product.ids[0]] || 0;
          const isHovered         = hoveredProduct === product.ids[0];
          const isApparel         = product.category === 'Apparel';

          return (
            <div
              key={product.ids[0]}
              onClick={() => onProductClick(product)}
              onMouseEnter={() => setHoveredProduct(product.ids[0])}
              onMouseLeave={() => setHoveredProduct(null)}
              className="group cursor-pointer flex flex-col space-y-3"
              style={{
                animation: 'fadeInUp 0.6s ease-out forwards',
                animationDelay: `${idx * 50}ms`,
                opacity: 0
              }}
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-v-gray border border-white/5 shadow-2xl shadow-black/20 group-hover:shadow-v-red/10 transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700 z-[1]" />

                <img
                  src={productImages[currentIndex]}
                  alt={`${product.name} - Image ${currentIndex + 1}`}
                  className={`w-full h-full transition-all duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100 ${
                    isApparel ? 'object-cover group-hover:scale-110' : 'object-contain p-4'
                  }`}
                  style={{ filter: 'brightness(0.92) contrast(1.05)' }}
                />

                {/* Category Vertical Tag */}
                <div className="absolute top-0 left-0 h-full w-6 sm:w-8 bg-v-black/60 backdrop-blur-md flex items-center justify-center border-r border-white/10 pointer-events-none z-[2]">
                  <span className="whitespace-nowrap -rotate-90 text-[7px] sm:text-[8px] tracking-[0.4em] uppercase text-white/50 font-bold group-hover:text-v-red transition-colors duration-500">
                    {product.category}
                  </span>
                </div>

                {/* Price Tag */}
                <div className="absolute top-3 right-3 z-[2]">
                  <div className="text-[11px] sm:text-xs font-black tracking-wider bg-v-red text-white px-2 py-1.5 sm:px-3 sm:py-2 shadow-lg backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    ${product.price}
                  </div>
                </div>

                {/* Image Dots */}
                {hasMultipleImages && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-[3]">
                    {productImages.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          dotIdx === currentIndex
                            ? 'w-6 bg-v-red shadow-lg shadow-v-red/50'
                            : 'w-1 bg-white/30 hover:bg-white/60'
                        }`}
                        onClick={e => {
                          e.stopPropagation();
                          setCurrentImageIndex(prev => ({ ...prev, [product.ids[0]]: dotIdx }));
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Nav Arrows — desktop only */}
                {hasMultipleImages && isHovered && (
                  <>
                    <button
                      onClick={e => handleImageNavigation(e, product.ids[0], 'prev', productImages.length)}
                      className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-v-black/80 backdrop-blur-sm border border-white/20 items-center justify-center text-white hover:bg-v-red hover:border-v-red transition-all duration-300 z-[3] opacity-0 group-hover:opacity-100"
                    >‹</button>
                    <button
                      onClick={e => handleImageNavigation(e, product.ids[0], 'next', productImages.length)}
                      className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-v-black/80 backdrop-blur-sm border border-white/20 items-center justify-center text-white hover:bg-v-red hover:border-v-red transition-all duration-300 z-[3] opacity-0 group-hover:opacity-100"
                    >›</button>
                  </>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-3 z-[2]">
                  <span className="text-[9px] sm:text-[10px] tracking-[0.5em] uppercase border border-white/60 px-4 py-2 backdrop-blur-sm text-white/90 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    View Details
                  </span>
                  <button
                    onClick={e => handleAddToCart(e, product)}
                    className="bg-v-red text-white px-4 py-2 text-[9px] sm:text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-white hover:text-v-black transition-all duration-300 shadow-lg translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
                    style={{ transitionDelay: '50ms' }}
                  >
                    {isApparel ? 'Select Size' : 'Add to Bag'}
                  </button>
                </div>
              </div>

              {/* Product Meta */}
              <div className="flex flex-col space-y-1 pl-2 sm:pl-4 relative">
                <div className="absolute left-0 top-0 w-[2px] h-0 bg-gradient-to-b from-v-red to-transparent group-hover:h-full transition-all duration-700" />
                <span className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-v-red font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                  {product.brand}
                </span>
                <h3 className="text-base sm:text-xl serif italic tracking-wide text-white leading-tight group-hover:text-v-red/90 transition-colors duration-500">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center pt-1.5 border-t border-white/5 mt-1">
                  <span className="text-[8px] sm:text-[9px] tracking-[0.2em] text-white/40 uppercase">{product.spec}</span>
                  <span className="text-[8px] sm:text-[9px] font-bold text-white/60 tracking-wider">{product.condition}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {products.length === 0 && (
        <div className="py-40 text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 blur-3xl bg-v-red/10 animate-pulse" />
            <h2 className="serif text-5xl italic text-white/20 relative">Archive Empty</h2>
          </div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-v-red/60 mt-6">Refine your search parameters</p>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default InventoryTable;