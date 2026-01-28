import React from 'react';
import { Product } from '../types';

interface InventoryTableProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onInquire: () => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ products, onProductClick, onInquire }) => {
  
  return (
    <div className="w-full mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product) => (
          <div 
            key={product.ids[0]} 
            onClick={() => onProductClick(product)}
            className="group cursor-pointer flex flex-col space-y-4"
          >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-v-gray border border-white/5">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute top-4 right-4 text-xs font-bold tracking-widest bg-v-red text-white px-2 py-1">
                ${product.price}
              </div>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-[10px] tracking-[0.5em] uppercase border border-white px-6 py-2 backdrop-blur-sm">View Details</span>
              </div>
            </div>

            {/* Product Meta */}
            <div className="flex flex-col space-y-1">
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
        ))}
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