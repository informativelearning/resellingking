import React, { useState } from 'react';
import { Product } from '../types';

interface InventoryTableProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onInquire: () => void;
  onAddToCart: (product: Product) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ products, onProductClick, onInquire, onAddToCart }) => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({});
  
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const getProductImages = (product: Product): string[] => {
    return product.images && product.images.length > 0 ? product.images : [product.image];
  };

  const handleImageNavigation = (e: React.MouseEvent, productId: string, direction: 'next' | 'prev', totalImages: number) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => {
      const current = prev[productId] || 0;
      const next = direction === 'next' 
        ? (current + 1) % totalImages 
        : (current - 1 + totalImages) % totalImages;
      return { ...prev, [productId]: next };
    });
  };

  return (
    <div className="w-full mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product) => {
          const productImages = getProductImages(product);
          const hasMultipleImages = productImages.length > 1;
          const currentIndex = currentImageIndex[product.ids[0]] || 0;
          const isHovered = hoveredProduct === product.ids[0];

          return (
            <div 
              key={product.ids[0]} 
              onClick={() => onProductClick(product)}
              onMouseEnter={() => setHoveredProduct(product.ids[0])}
              onMouseLeave={() => setHoveredProduct(null)}
              className="group cursor-pointer flex flex-col space-y-4"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-v-gray border border-white/5">
                <img 
                  src={productImages[currentIndex]} 
                  alt={`${product.name} - Image ${currentIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                
                {/* Category Vertical Tag */}
                <div className="absolute top-0 left-0 h-full w-8 bg-v-black/40 backdrop-blur-sm flex items-center justify-center border-r border-white/5 pointer-events-none">
                  <span className="whitespace-nowrap -rotate-90 text-[8px] tracking-[0.4em] uppercase text-white/40 font-bold">
                    {product.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4 text-xs font-bold tracking-widest bg-v-red text-white px-2 py-1">
                  ${product.price}
                </div>

                {/* Multiple Images Indicator */}
                {hasMultipleImages && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {productImages.map((_, idx) => (
                      <div 
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === currentIndex 
                            ? 'w-6 bg-v-red' 
                            : 'w-1.5 bg-white/30 hover:bg-white/60'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(prev => ({ ...prev, [product.ids[0]]: idx }));
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Image Navigation Arrows (show on hover if multiple images) */}
                {hasMultipleImages && isHovered && (
                  <>
                    <button
                      onClick={(e) => handleImageNavigation(e, product.ids[0], 'prev', productImages.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-v-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-v-red transition-colors z-10"
                    >
                      ‹
                    </button>
                    <button
                      onClick={(e) => handleImageNavigation(e, product.ids[0], 'next', productImages.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-v-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-v-red transition-colors z-10"
                    >
                      ›
                    </button>
                  </>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4">
                  <span className="text-[10px] tracking-[0.5em] uppercase border border-white px-6 py-2 backdrop-blur-sm">View Details</span>
                  
                  <button 
                    onClick={(e) => handleAddToCart(e, product)}
                    className="bg-v-red text-white px-6 py-2 text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-white hover:text-v-black transition-colors"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>

              {/* Product Meta */}
              <div className="flex flex-col space-y-1 pl-4">
                <span className="text-[10px] tracking-[0.4em] uppercase text-v-red font-bold">
                  {product.brand}
                </span>
                <h3 className="text-xl serif italic tracking-wide text-white luxury-underline inline-block">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">
                    {product.spec} // {product.condition}
                  </span>
                  <span className="text-[10px] font-bold text-white/60">
                    {product.stock > 900 ? 'IN STOCK' : `QTY: ${product.stock}`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {products.length === 0 && (
        <div className="py-40 text-center">
            <h2 className="serif text-4xl italic text-white/20">Archive Empty</h2>
            <p className="text-[10px] tracking-[0.3em] uppercase text-v-red mt-4">Refine your search parameters</p>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;