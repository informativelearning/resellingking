import React, { useState, useRef } from 'react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: string, selectedSize?: string) => void;
  onUpdateQty: (id: string, delta: number, selectedSize?: string) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cart, onRemove, onUpdateQty }) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [shareMode, setShareMode] = useState(false);
  const [generating, setGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDM = () => {
    window.open('https://instagram.com/661ro_resellz', '_blank');
  };

  // Generate a clean shareable bag image using Canvas
  const generateShareImage = async () => {
    setGenerating(true);
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const W = 800;
    const ITEM_H = 72;
    const HEADER_H = 120;
    const FOOTER_H = 100;
    const PADDING = 48;
    const H = HEADER_H + cart.length * ITEM_H + FOOTER_H + 32;

    canvas.width = W;
    canvas.height = H;

    // Background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, W, H);

    // Subtle top red line
    ctx.fillStyle = '#D30000';
    ctx.fillRect(0, 0, W, 3);

    // Header
    ctx.fillStyle = '#ffffff';
    ctx.font = 'italic 700 40px Georgia, serif';
    ctx.fillText('Wings of Fortune', PADDING, 56);

    ctx.fillStyle = '#D30000';
    ctx.font = '500 11px monospace';
    ctx.letterSpacing = '4px';
    ctx.fillText('661 / WASCO, CA', PADDING, 80);
    ctx.letterSpacing = '0px';

    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PADDING, 100);
    ctx.lineTo(W - PADDING, 100);
    ctx.stroke();

    // Items
    cart.forEach((item, i) => {
      const y = HEADER_H + i * ITEM_H;

      // Alternating very subtle row bg
      if (i % 2 === 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.02)';
        ctx.fillRect(0, y, W, ITEM_H);
      }

      // Index dot
      ctx.fillStyle = '#D30000';
      ctx.font = 'bold 10px monospace';
      ctx.fillText(`${String(i + 1).padStart(2, '0')}`, PADDING, y + 30);

      // Brand
      ctx.fillStyle = 'rgba(211,0,0,0.7)';
      ctx.font = 'bold 10px monospace';
      ctx.fillText(item.brand.toUpperCase(), PADDING + 36, y + 24);

      // Name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'italic 600 18px Georgia, serif';
      const name = item.name.length > 38 ? item.name.slice(0, 36) + '…' : item.name;
      ctx.fillText(name, PADDING + 36, y + 46);

      // Size badge if apparel
      if (item.selectedSize) {
        ctx.fillStyle = 'rgba(255,255,255,0.12)';
        ctx.fillRect(PADDING + 36, y + 52, 36, 14);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = 'bold 9px monospace';
        ctx.fillText(item.selectedSize, PADDING + 44, y + 63);
      }

      // Qty × price
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px monospace';
      const priceStr = `$${(item.price * item.quantity).toFixed(0)}`;
      const qtyStr = `×${item.quantity}`;
      const priceW = ctx.measureText(priceStr).width;
      ctx.fillText(priceStr, W - PADDING - priceW, y + 38);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      const qtyW = ctx.measureText(qtyStr).width;
      ctx.font = '12px monospace';
      ctx.fillText(qtyStr, W - PADDING - priceW - qtyW - 10, y + 38);

      // Row divider
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(PADDING, y + ITEM_H);
      ctx.lineTo(W - PADDING, y + ITEM_H);
      ctx.stroke();
    });

    // Footer total
    const footerY = HEADER_H + cart.length * ITEM_H + 24;
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PADDING, footerY);
    ctx.lineTo(W - PADDING, footerY);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font = '500 11px monospace';
    ctx.fillText('TOTAL', PADDING, footerY + 36);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'italic bold 32px Georgia, serif';
    const totalStr = `$${total.toFixed(0)}`;
    const totalW = ctx.measureText(totalStr).width;
    ctx.fillText(totalStr, W - PADDING - totalW, footerY + 38);

    // Instagram handle
    ctx.fillStyle = 'rgba(211,0,0,0.6)';
    ctx.font = '500 11px monospace';
    ctx.fillText('@661ro_resellz', PADDING, footerY + 68);

    // Bottom red line
    ctx.fillStyle = '#D30000';
    ctx.fillRect(0, H - 3, W, 3);

    setGenerating(false);
    setShareMode(true);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current!;
    const link = document.createElement('a');
    link.download = 'my-bag-661.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-v-black/80 backdrop-blur-sm z-[100] transition-opacity duration-500"
          onClick={onClose}
        />
      )}

      {/* Hidden canvas for image generation */}
      <canvas ref={canvasRef} className="hidden" />

      <div
        className={`fixed top-0 right-0 z-[110] transform transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] border-l border-white/10 bg-v-black text-v-white flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '100%', maxWidth: '420px', height: '100dvh' }}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center flex-shrink-0">
          <div>
            {shareMode ? (
              <button
                onClick={() => setShareMode(false)}
                className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs tracking-[0.2em] uppercase font-mono"
              >
                ← back to bag
              </button>
            ) : (
              <>
                <h2 className="serif italic text-2xl tracking-tight text-white">Your Bag</h2>
                {cart.length > 0 && (
                  <p className="text-[10px] text-white/30 mt-0.5 font-mono uppercase tracking-widest">
                    {cart.reduce((a, i) => a + i.quantity, 0)} item{cart.reduce((a, i) => a + i.quantity, 0) !== 1 ? 's' : ''}
                  </p>
                )}
              </>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white transition-colors text-xs tracking-[0.2em] uppercase font-mono py-2 px-3 -mr-3"
          >
            Close
          </button>
        </div>

        {/* Share Mode — show generated image */}
        {shareMode ? (
          <div className="flex-1 overflow-y-auto overscroll-contain flex flex-col items-center justify-center px-6 py-8 gap-6" style={{ WebkitOverflowScrolling: 'touch' }}>
            <p className="text-[10px] text-white/30 font-mono uppercase tracking-widest text-center">
              long press to save · then dm us
            </p>
            {/* Show canvas as image so mobile can long-press save */}
            <img
              src={canvasRef.current?.toDataURL('image/png')}
              alt="Your bag"
              className="w-full border border-white/10"
              style={{ imageRendering: 'crisp-edges' }}
            />
            <button
              onClick={handleDownload}
              className="w-full border border-white/15 text-white/50 hover:text-white hover:border-white/40 text-xs uppercase tracking-[0.3em] py-3 transition-all duration-200 font-mono"
            >
              save image
            </button>
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
        ) : (
          <>
            {/* Normal bag items view */}
            <div
              className="flex-1 overflow-y-auto overscroll-contain py-4"
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
                <div className="space-y-0 divide-y divide-white/5">
                  {cart.map(item => (
                    <div
                      key={`${item.ids[0]}-${item.selectedSize ?? 'none'}`}
                      className="flex gap-0 items-stretch"
                    >
                      {item.images?.[0] && (
                        <div className="flex-shrink-0 w-24 overflow-hidden bg-v-gray" style={{ aspectRatio: '3/4' }}>
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover grayscale-[20%] contrast-[1.05]"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0 px-4 py-4 flex flex-col justify-between">
                        <div>
                          <p className="text-[9px] text-v-red uppercase tracking-[0.3em] font-bold">{item.brand}</p>
                          <p className="text-sm serif italic text-white leading-snug mt-0.5">{item.name}</p>
                          {item.selectedSize && (
                            <div className="mt-1.5 inline-flex items-center gap-1.5">
                              <span className="text-[8px] text-white/30 uppercase tracking-widest">size</span>
                              <span className="text-[10px] font-bold text-white/70 tracking-wider border border-white/20 px-2 py-0.5">{item.selectedSize}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-white/10">
                            <button onClick={() => onUpdateQty(item.ids[0], -1, item.selectedSize)} className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-white active:bg-white/5 transition-colors text-sm">−</button>
                            <span className="w-6 text-center text-xs font-bold text-white">{item.quantity}</span>
                            <button onClick={() => onUpdateQty(item.ids[0], 1, item.selectedSize)} className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-white active:bg-white/5 transition-colors text-sm">+</button>
                          </div>
                          <div className="flex items-center gap-3">
                            <p className="text-sm font-bold text-white">${(item.price * item.quantity).toFixed(2)}</p>
                            <button onClick={() => onRemove(item.ids[0], item.selectedSize)} className="text-[9px] text-white/15 hover:text-v-red transition-colors uppercase tracking-wider">×</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-6 py-5 border-t border-white/10 space-y-3 flex-shrink-0">
                <div className="flex justify-between items-baseline">
                  <span className="text-white/30 text-[10px] uppercase tracking-widest font-mono">total</span>
                  <span className="serif italic text-3xl text-white">${total.toFixed(2)}</span>
                </div>

                {/* Share bag button */}
                <button
                  onClick={generateShareImage}
                  disabled={generating}
                  className="w-full border border-white/15 text-white/50 hover:text-white hover:border-white/40 text-xs uppercase tracking-[0.3em] py-3 transition-all duration-200 font-mono flex items-center justify-center gap-2 disabled:opacity-40"
                >
                  {generating ? (
                    <span className="animate-pulse">generating…</span>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      share bag
                    </>
                  )}
                </button>

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
          </>
        )}
      </div>
    </>
  );
};

export default CartSidebar;