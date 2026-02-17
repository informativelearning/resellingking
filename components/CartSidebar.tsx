import React from 'react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cart, onRemove, onUpdateQty }) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleDM = () => {
    window.open('https://instagram.com/661ro_resellz', '_blank');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-v-black/80 backdrop-blur-sm z-[100] transition-opacity duration-500"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-[110] transform transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] border-l border-white/10 bg-v-black text-v-white flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          width: '100%',
          maxWidth: '400px',
          height: '100%',
          height: '100dvh', /* dynamic viewport height — fixes iOS address bar issues */
        }}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="serif italic text-2xl tracking-tight text-white">Your Bag</h2>
            {cart.length > 0 && (
              <p className="text-[10px] text-white/30 mt-0.5 font-mono uppercase tracking-widest">
                {cart.reduce((a, i) => a + i.quantity, 0)} item{cart.reduce((a, i) => a + i.quantity, 0) !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white transition-colors text-xs tracking-[0.2em] uppercase font-mono py-2 px-3 -mr-3"
          >
            Close
          </button>
        </div>

        {/* Items — scrollable middle section */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain px-6 py-6"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 opacity-20">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="serif italic text-2xl">Empty</p>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map(item => (
                <div key={item.ids[0]} className="flex gap-4 items-start">
                  {/* Image */}
                  {item.images?.[0] && (
                    <div className="flex-shrink-0 w-16 h-16 overflow-hidden border border-white/10 bg-white/5">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover opacity-90"
                      />
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-v-red uppercase tracking-widest font-bold">{item.brand}</p>
                    <p className="text-sm serif italic text-white leading-snug mt-0.5">{item.name}</p>

                    {/* Qty controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-white/15 bg-white/5">
                        <button
                          onClick={() => onUpdateQty(item.ids[0], -1)}
                          className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white active:bg-white/10 transition-colors text-sm"
                        >−</button>
                        <span className="w-7 text-center text-xs font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.ids[0], 1)}
                          className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white active:bg-white/10 transition-colors text-sm"
                        >+</button>
                      </div>
                      <button
                        onClick={() => onRemove(item.ids[0])}
                        className="text-[10px] text-white/20 hover:text-v-red active:text-v-red transition-colors uppercase tracking-wider py-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <p className="text-sm font-bold text-white flex-shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer — pinned to bottom */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-white/10 space-y-4 flex-shrink-0">

            {/* Total */}
            <div className="flex justify-between items-baseline">
              <span className="text-white/40 text-xs uppercase tracking-widest font-mono">Total</span>
              <span className="serif italic text-3xl text-white">${total.toFixed(2)}</span>
            </div>

            {/* Deals hint */}
            <p className="text-[10px] text-white/25 leading-relaxed font-mono uppercase tracking-wider text-center">
              DM us — we got deals you won't see here
            </p>

            {/* DM Button */}
            <button
              onClick={handleDM}
              className="w-full bg-v-red text-white font-bold uppercase tracking-[0.2em] text-sm py-4 hover:bg-white hover:text-v-black active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              DM to Order
            </button>

          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;