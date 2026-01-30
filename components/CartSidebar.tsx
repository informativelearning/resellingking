
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
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  // DISCOUNT LOGIC
  // Buy 2 items: 10% off
  // Buy 3+ items: 15% off
  let discountRate = 0;
  let discountLabel = "";
  
  if (totalItems >= 3) {
    discountRate = 0.15;
    discountLabel = "BULK SAVINGS (15%)";
  } else if (totalItems >= 2) {
    discountRate = 0.10;
    discountLabel = "DUO DEAL (10%)";
  }

  const discountAmount = subtotal * discountRate;
  const discountedSubtotal = subtotal - discountAmount;
  const tax = discountedSubtotal * 0.095; // LA Tax
  const total = discountedSubtotal + tax;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white text-black transform transition-transform duration-300 ease-out z-50 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-6 border-b-4 border-black flex justify-between items-center bg-hype-green">
          <h2 className="font-black italic text-2xl tracking-tighter uppercase text-black">YOUR BAG</h2>
          <button onClick={onClose} className="font-black text-xl hover:text-white">[X]</button>
        </div>

        {/* Receipt Content */}
        <div className="flex-1 overflow-y-auto p-6 font-mono text-sm relative bg-white">
            
            <div className="text-center mb-8 pb-4 border-b-2 border-dashed border-black">
              <h3 className="font-black text-xl uppercase italic">WINGS OF FORTUNE STORE</h3>
              <p>LOS ANGELES, CA</p>
              <p>{new Date().toLocaleDateString()}</p>
            </div>

            {cart.length === 0 ? (
               <div className="text-center mt-20 text-gray-400 font-bold uppercase italic text-lg">
                  BAG IS EMPTY FAM
               </div>
            ) : (
              <div className="space-y-6">
                 {cart.map(item => (
                   // Use the first SKU from the ids array as the unique key
                   <div key={item.ids[0]} className="border-b border-gray-200 pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold uppercase text-lg leading-tight w-2/3">{item.name}</span>
                        <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <div className="text-xs text-gray-500 uppercase mb-2">{item.brand}</div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-black rounded-full px-2 py-1">
                           {/* Use the first SKU from ids for update operations */}
                           <button onClick={() => onUpdateQty(item.ids[0], -1)} className="px-2 font-bold hover:text-hype-purple">-</button>
                           <span className="font-bold mx-2">{item.quantity}</span>
                           {/* Use the first SKU from ids for update operations */}
                           <button onClick={() => onUpdateQty(item.ids[0], 1)} className="px-2 font-bold hover:text-hype-purple">+</button>
                        </div>
                        {/* Use the first SKU from ids for removal operations */}
                        <button onClick={() => onRemove(item.ids[0])} className="text-xs font-bold uppercase text-red-500 hover:text-black hover:underline">Remove</button>
                      </div>
                   </div>
                 ))}
              </div>
            )}
        </div>

        {/* Totals */}
        <div className="p-6 bg-gray-100 border-t-4 border-black">
          <div className="space-y-1 text-sm mb-6 font-bold uppercase">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            {discountAmount > 0 && (
                <div className="flex justify-between text-red-600 italic">
                  <span>{discountLabel}</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
            )}

            <div className="flex justify-between text-gray-500">
              <span>Tax (9.5%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-2xl font-black italic mt-4 pt-4 border-t-2 border-black">
              <span>TOTAL</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button 
            disabled={cart.length === 0}
            onClick={() => alert(`SEND $${total.toFixed(2)} TO CASHAPP/ZELLE. \n\n(This is a demo, no payment taken)`)}
            className="w-full bg-black text-white font-black italic uppercase text-xl py-4 hover:bg-hype-purple transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px_rgba(163,230,53,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            CHECKOUT
          </button>
        </div>

      </div>
    </>
  );
};

export default CartSidebar;
