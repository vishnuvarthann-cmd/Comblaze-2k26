'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SpecSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const LAYERS_SPEC = [
  {
    layer: "01",
    title: "CNC Aerospace Aluminum Top Frame",
    specs: ["Solid 6063 Aluminum", "180-Grit Bead-Blasted Anodization", "Seamless Magnetic Latching"],
    description: "Precision milled from a solid 4.2kg block of raw aluminum down to a 480g rigid skeleton."
  },
  {
    layer: "02",
    title: "Double-Shot PBT Keycap Set",
    specs: ["1.6mm Wall Thickness", "CHERRY Profile Ergonomics", "Oil-Resistant Matte Finish"],
    description: "Formulated with 85% high-density PBT polymers to prevent surface shine across decades of use."
  },
  {
    layer: "03",
    title: "Hall-Effect Magnetic Switches",
    specs: ["0.1mm to 4.0mm Actuation", "100 Million Keystroke Lifespan", "Dual-Magnetic Core"],
    description: "Non-contacting Hall-effect sensors deliver analog precision and zero contact bounce."
  },
  {
    layer: "04",
    title: "Anodized Brass Positioning Plate",
    specs: ["1.5mm Precision Stamped", "Sandblasted Gold Finish", "Flex-Cut Acoustic Slots"],
    description: "Tuned density ratio provides rigid bottom-out feedback with a deep thock sound profile."
  },
  {
    layer: "05",
    title: "12-Layer Acoustic Foam Array",
    specs: ["PORON Gaskets", "IXPE Switch Pads", "PET Sound Reflective Film"],
    description: "Multi-stage sonic dampening matrix absorbs high-frequency vibrations for clean acoustics."
  },
  {
    layer: "06",
    title: "South-Facing RGB Hot-Swap PCB",
    specs: ["ARM Cortex-M4 MCU", "8000Hz Polling Rate", "Gold-Plated Traces"],
    description: "Ultra-fast micro-controller architecture with sub-millisecond signal processing speed."
  }
];

export const SpecSheet: React.FC<SpecSheetProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-lg h-full bg-[#ECECEC] shadow-2xl p-8 overflow-y-auto no-scrollbar border-l border-black/10 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-black/10 mb-8">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-black/50 uppercase block">
                    EXPLODED VIEW ARCHITECTURE
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-black/90">
                    Hardware Layers
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/70 transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Layer Items */}
              <div className="space-y-6">
                {LAYERS_SPEC.map((item) => (
                  <div key={item.layer} className="glass-panel p-5 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-black/10 text-black/80">
                        {item.layer}
                      </span>
                      <h4 className="text-sm font-bold text-black/90 tracking-tight">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-black/60 leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.specs.map((s, idx) => (
                        <span key={idx} className="text-[10px] font-mono bg-white/80 px-2 py-1 rounded border border-black/5 text-black/70">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-8 border-t border-black/10 mt-8">
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-full bg-black text-white font-semibold text-xs uppercase tracking-wider hover:bg-black/90 transition-all cursor-pointer shadow-lg"
              >
                Close Architecture View
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
