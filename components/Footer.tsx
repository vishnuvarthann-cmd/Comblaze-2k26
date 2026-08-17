'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#ECECEC] border-t border-black/10 py-20 px-6 relative z-30">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Feature Grid */}
        <div id="specs" className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 pb-16 border-b border-black/10">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-black/50 uppercase block mb-2">
              LAYOUT
            </span>
            <h4 className="text-sm font-bold text-black/90 mb-1">75% Compact Explosive</h4>
            <p className="text-xs text-black/60 leading-relaxed">
              Optimized footprint preserving arrow keys and dedicated function row.
            </p>
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-widest text-black/50 uppercase block mb-2">
              CONNECTIVITY
            </span>
            <h4 className="text-sm font-bold text-black/90 mb-1">Tri-Mode Wireless</h4>
            <p className="text-xs text-black/60 leading-relaxed">
              2.4GHz High-Speed, Bluetooth 5.2, and USB-C Braided Wired interface.
            </p>
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-widest text-black/50 uppercase block mb-2">
              WEIGHT & FINISH
            </span>
            <h4 className="text-sm font-bold text-black/90 mb-1">2.1kg Pure Brass & CNC</h4>
            <p className="text-xs text-black/60 leading-relaxed">
              Heavyweight acoustic density engineered for unyielding desk stability.
            </p>
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-widest text-black/50 uppercase block mb-2">
              BATTERY LIFE
            </span>
            <h4 className="text-sm font-bold text-black/90 mb-1">400 Hours Continuous</h4>
            <p className="text-xs text-black/60 leading-relaxed">
              High-efficiency power management with intelligent LED sleep state.
            </p>
          </div>
        </div>

        {/* Brand Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-black text-white flex items-center justify-center font-mono font-bold text-xs">
              Wp
            </div>
            <span className="text-xs font-semibold text-black/80 tracking-tight">
              WpDev Hardware Systems Inc.
            </span>
          </div>

          <div className="text-xs text-black/50 font-mono">
            © {new Date().getFullYear()} WpDev Inc. All rights reserved. Designed for purists.
          </div>
        </div>
      </div>
    </footer>
  );
};
