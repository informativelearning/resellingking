import React from 'react';
import { DISCOUNTS } from '../constants';

const TickerStrip: React.FC = () => (
  <div className="flex items-center gap-0 whitespace-nowrap">
    {DISCOUNTS.map((item, idx) => (
      <span key={idx} className="text-[10px] font-medium tracking-[0.4em] uppercase text-white/60 flex items-center">
        <span className="px-8">{item}</span>
        <span className="text-v-red">•</span>
      </span>
    ))}
  </div>
);

const Ticker: React.FC = () => {
  return (
    <div
      className="w-full h-10 bg-v-black border-b border-white/10 overflow-hidden flex items-center relative z-20"
    >
      <div
        className="flex items-center"
        style={{
          animation: 'ticker-scroll 30s linear infinite',
          willChange: 'transform',
        }}
      >
        {/* Two identical strips — second one picks up exactly where first ends */}
        <TickerStrip />
        <TickerStrip />
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Ticker;