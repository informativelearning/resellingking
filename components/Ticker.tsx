import React from 'react';
import { DISCOUNTS } from '../constants';

const Ticker: React.FC = () => {
  return (
    <div className="w-full h-10 bg-v-black border-b border-white/10 overflow-hidden flex items-center relative z-20">
      <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
        {[...DISCOUNTS, ...DISCOUNTS, ...DISCOUNTS].map((item, idx) => (
          <span key={idx} className="text-[10px] font-medium tracking-[0.4em] uppercase text-white/60">
            {item} <span className="mx-6 text-v-red">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;