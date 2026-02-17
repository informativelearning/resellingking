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
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Bulk savings logic
  let discountRate = 0;
  let discountLabel = "";
  if (totalItems >= 3) {
    discountRate = 0.15;
    discountLabel = "BULK ARCHIVE SAVINGS (15%)";
  } else if (totalItems >= 2) {
    discountRate = 0.10;
    discountLabel = "DUO BUNDLE (10%)";
  }

  const discountAmount = subtotal * discountRate;
  const taxableAmount = subtotal - discountAmount;
  const tax = taxableAmount * 0.095; // 9.5% LA Tax
  const total = taxableAmount + tax;

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
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-v-black text-v-white z-[110] transform transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] border-l border-white/10 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-8 border-b-4 border-v-red flex justify-between items-center bg-v-black">
          <h2 className="serif italic text-3xl tracking-tighter uppercase font-black">Archive Bag</h2>
          <button 
            onClick={onClose} 
            className="font-mono text-xs tracking-[0.2em] hover:text-v-red transition-colors uppercase"
          >
            [ Close ]
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-8 font-mono text-[11px] selection:bg-v-red selection:text-white">
          <div className="text-center mb-10 pb-6 border-b border-dashed border-white/20">
            <h3 className="font-black text-lg uppercase tracking-widest mb-1">Wings of Fortune</h3>
            <p className="opacity-40 uppercase tracking-[0.3em]">Based in Wasco // 93280</p>
            <p className="opacity-20 uppercase tracking-[0.2em] mt-2">
              {new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })} // {new Date().toLocaleTimeString('en-US', { hour12: false })}
            </p>
          </div>

          {cart.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center opacity-20 italic serif text-4xl">
              Empty Manifest
            </div>
          ) : (
            <div className="space-y-8">
              {cart.map((item) => (
                <div key={item.ids[0]} className="flex flex-col gap-4 pb-6 border-b border-white/5">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1 max-w-[70%]">
                      <span className="text-v-red font-black uppercase tracking-tighter text-[9px]">{item.brand}</span>
                      <span className="text-sm font-bold uppercase tracking-tighter serif italic text-white leading-none">{item.name}</span>
                      <span className="opacity-40 uppercase text-[9px] mt-1">{item.spec}</span>
                    </div>
                    <span className="font-black text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border border-white/20 bg-white/5 px-3 py-1">
                      <button 
                        onClick={() => onUpdateQty(item.ids[0], -1)}
                        className="w-6 h-6 flex items-center justify-center hover:text-v-red font-black"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-black text-xs">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQty(item.ids[0], 1)}
                        className="w-6 h-6 flex items-center justify-center hover:text-v-red font-black"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.ids[0])}
                      className="text-[9px] font-bold uppercase opacity-30 hover:opacity-100 hover:text-v-red transition-all"
                    >
                      Delete Entry
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        <div className="p-8 bg-v-white text-v-black border-t-8 border-v-red">
          <div className="space-y-3 font-mono text-[10px] mb-8 font-black uppercase tracking-widest">
            <div className="flex justify-between opacity-50">
              <span>Manifest Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            {discountAmount > 0 && (
              <div className="flex justify-between text-v-red italic">
                <span>{discountLabel}</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-3xl font-black italic mt-6 pt-6 border-t-2 border-v-black/10 serif tracking-tighter">
              <span>TOTAL DUE</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button 
            disabled={cart.length === 0}
            className="w-full bg-v-black text-v-white font-black italic uppercase text-lg py-5 hover:bg-v-red transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed tracking-[0.2em]"
            onClick={() => alert(`ARCHIVE REQUEST GENERATED\nTOTAL: $${total.toFixed(2)}\n\nPlease contact your executive for shipping.`)}
          >
            Authenticate & Checkout
          </button>
          
          <p className="text-[7px] text-center mt-4 opacity-40 uppercase tracking-[0.3em] font-bold leading-relaxed">
            All Archive Sales Are Final // No Returns on Opened Seals<br/>
            Couture Standard // Secure Handshake Protocol
          </p>
        </div>

      </div>
    </>
  );
};

export default CartSidebar;