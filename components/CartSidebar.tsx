import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cart, onRemove, onUpdateQty }) => {
  const [showCheckoutInstructions, setShowCheckoutInstructions] = useState(false);

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
  const tax = taxableAmount * 0.095;
  const total = taxableAmount + tax;

  const handleCheckout = () => {
    setShowCheckoutInstructions(true);
  };

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
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-v-black text-v-white z-[110] transform transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] border-l border-white/10 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-8 border-b-4 border-v-red flex justify-between items-center bg-v-black">
          <h2 className="serif italic text-3xl tracking-tighter uppercase font-black">Archive Bag</h2>
          <button 
            onClick={() => {
              setShowCheckoutInstructions(false);
              onClose();
            }}
            className="font-mono text-xs tracking-[0.2em] hover:text-v-red transition-colors uppercase"
          >
            [ Close ]
          </button>
        </div>

        {/* — CHECKOUT INSTRUCTIONS VIEW — */}
        {showCheckoutInstructions ? (
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Steps */}
            <div className="flex-1 p-8 space-y-8">

              {/* Header */}
              <div className="text-center pb-6 border-b border-white/10">
                <p className="text-v-red font-mono text-[9px] tracking-[0.4em] uppercase mb-2">How to Order</p>
                <h3 className="serif italic text-2xl text-white">3 Easy Steps</h3>
              </div>

              {/* Step 1 */}
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-10 h-10 border-2 border-v-red flex items-center justify-center">
                  <span className="text-v-red font-black text-sm">1</span>
                </div>
                <div className="space-y-2 pt-1">
                  <p className="text-white font-bold uppercase tracking-widest text-[11px]">Screenshot Your Bag</p>
                  <p className="text-white/40 text-xs leading-relaxed font-mono">
                    Take a screenshot of this bag showing all your items and the total. Make sure everything is visible.
                  </p>
                  {/* Visual hint */}
                  <div className="mt-3 border border-white/10 bg-white/5 p-3 font-mono text-[9px] text-white/30 space-y-1">
                    {cart.map(item => (
                      <div key={item.ids[0]} className="flex justify-between">
                        <span className="truncate max-w-[200px]">{item.name} ×{item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t border-white/10 pt-1 mt-1 flex justify-between text-white/50">
                      <span>TOTAL</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-10 h-10 border-2 border-v-red flex items-center justify-center">
                  <span className="text-v-red font-black text-sm">2</span>
                </div>
                <div className="space-y-2 pt-1">
                  <p className="text-white font-bold uppercase tracking-widest text-[11px]">DM Us on Instagram</p>
                  <p className="text-white/40 text-xs leading-relaxed font-mono">
                    Send a the screenshot at{' '}
                    <button onClick={handleDM} className="text-v-red hover:underline">@661ro_resellz</button>
                    {' '}and other details (if needed).
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-10 h-10 border-2 border-v-red flex items-center justify-center">
                  <span className="text-v-red font-black text-sm">3</span>
                </div>
                <div className="space-y-2 pt-1">
                  <p className="text-white font-bold uppercase tracking-widest text-[11px]">We'll Handle the Rest</p>
                  <p className="text-white/40 text-xs leading-relaxed font-mono">
                    We'll confirm availability, deals, and delivery details.
                  </p>
                </div>
              </div>

            </div>

            {/* CTA Buttons */}
            <div className="p-8 space-y-3 border-t border-white/10 bg-v-black">
              <button
                onClick={handleDM}
                className="w-full bg-v-red text-white font-black italic uppercase text-sm py-5 hover:bg-white hover:text-v-black transition-all duration-300 tracking-[0.2em] flex items-center justify-center gap-3"
              >
                {/* Instagram icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                DM to Order
              </button>

              <button
                onClick={() => setShowCheckoutInstructions(false)}
                className="w-full bg-transparent text-white/40 font-mono text-[10px] uppercase tracking-[0.3em] py-3 hover:text-white transition-colors"
              >
                ← Back to Bag
              </button>

              <p className="text-[8px] text-center opacity-30 uppercase tracking-[0.3em] font-bold leading-relaxed font-mono">
                Local LA Pickup Available // DM for Details
              </p>
            </div>
          </div>

        ) : (
          /* — NORMAL BAG VIEW — */
          <>
            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-8 font-mono text-[11px] selection:bg-v-red selection:text-white">
              <div className="text-center mb-10 pb-6 border-b border-dashed border-white/20">
                <h3 className="font-black text-lg uppercase tracking-widest mb-1">WINGS OF FORTUNE</h3>
                <p className="opacity-40 uppercase tracking-[0.3em]">Los Angeles Atelier // 90015</p>
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
                      <div className="flex justify-between items-start gap-4">
                        {/* Item thumbnail */}
                        {item.images && item.images[0] && (
                          <div className="flex-shrink-0 w-14 h-14 overflow-hidden border border-white/10 bg-white/5">
                            <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover opacity-80" />
                          </div>
                        )}
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                          <span className="text-v-red font-black uppercase tracking-tighter text-[9px]">{item.brand}</span>
                          <span className="text-sm font-bold uppercase tracking-tighter serif italic text-white leading-none">{item.name}</span>
                          <span className="opacity-40 uppercase text-[9px] mt-1">{item.spec}</span>
                        </div>
                        <span className="font-black text-sm flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-white/20 bg-white/5 px-3 py-1">
                          <button 
                            onClick={() => onUpdateQty(item.ids[0], -1)}
                            className="w-6 h-6 flex items-center justify-center hover:text-v-red font-black"
                          >-</button>
                          <span className="w-8 text-center font-black text-xs">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQty(item.ids[0], 1)}
                            className="w-6 h-6 flex items-center justify-center hover:text-v-red font-black"
                          >+</button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.ids[0])}
                          className="text-[9px] font-bold uppercase opacity-30 hover:opacity-100 hover:text-v-red transition-all"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Summary */}
            <div className="p-8 bg-v-white text-v-black border-t-8 border-v-red">
              <div className="space-y-3 font-mono text-[10px] mb-6 font-black uppercase tracking-widest">
                <div className="flex justify-between opacity-50">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {discountAmount > 0 && (
                  <div className="flex justify-between text-v-red italic">
                    <span>{discountLabel}</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between opacity-50">
                  <span>Tax (9.5%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-3xl font-black italic mt-6 pt-6 border-t-2 border-v-black/10 serif tracking-tighter">
                  <span>TOTAL</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Screenshot CTA */}
              {cart.length > 0 && (
                <div className="mb-4 p-3 border border-v-black/10 bg-v-black/5 flex items-center gap-3">
                  <svg className="w-4 h-4 flex-shrink-0 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-[9px] font-bold uppercase tracking-wider opacity-50 leading-relaxed">
                    Screenshot your bag, then DM us to complete your order
                  </p>
                </div>
              )}

              <button 
                disabled={cart.length === 0}
                className="w-full bg-v-black text-v-white font-black italic uppercase text-lg py-5 hover:bg-v-red transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed tracking-[0.2em]"
                onClick={handleCheckout}
              >
                How to Order →
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartSidebar;