import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGOS = [
  {
    id: 'comblaze',
    src: '/images/logo-comblaze.png?v=5',
    alt: 'COMBLAZE 2K26 Logo',
    glowColor: 'rgba(0, 243, 255, 0.6)'
  },
  {
    id: 'mamce',
    src: '/images/logo-mamce.png?v=5',
    alt: 'MAMCE Logo',
    glowColor: 'rgba(59, 130, 246, 0.6)'
  }
];

export default function GlitchLogo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    // Fast snappy glitch timing (switches every 2.2 seconds with a 180ms glitch pulse)
    const interval = setInterval(() => {
      setIsGlitching(true);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % LOGOS.length);
        setIsGlitching(false);
      }, 180);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const activeLogo = LOGOS[currentIndex];

  return (
    <div className="relative w-full max-w-5xl mx-auto min-h-[180px] sm:min-h-[250px] md:min-h-[320px] flex items-center justify-center py-4 my-2 select-none">
      
      {/* Background Holographic Ambient Glow Disk matching theme */}
      <div 
        className="absolute inset-0 rounded-full blur-[100px] pointer-events-none transition-all duration-400 opacity-60" 
        style={{
          background: `radial-gradient(circle, ${activeLogo.glowColor} 0%, rgba(176, 38, 255, 0.2) 50%, transparent 70%)`
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeLogo.id}
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px) brightness(0.9)' }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            filter: isGlitching ? 'hue-rotate(90deg) contrast(200%)' : 'blur(0px) brightness(1.15) contrast(1.15)' 
          }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(6px) hue-rotate(-90deg)' }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full flex items-center justify-center px-4"
        >
          {/* Main Logo Image */}
          <img
            src={activeLogo.src}
            alt={activeLogo.alt}
            className={`w-full max-h-[200px] sm:max-h-[280px] md:max-h-[340px] object-contain mix-blend-screen drop-shadow-[0_0_35px_rgba(0,243,255,0.7)] transition-all duration-150 ${
              isGlitching ? 'scale-105 filter brightness-130' : ''
            }`}
          />

          {/* Glitch Overlay Layer 1 (Cyan offset) */}
          {isGlitching && (
            <img
              src={activeLogo.src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full max-h-[200px] sm:max-h-[280px] md:max-h-[340px] object-contain opacity-90 glitch-layer-1 pointer-events-none mix-blend-screen"
            />
          )}

          {/* Glitch Overlay Layer 2 (Purple offset) */}
          {isGlitching && (
            <img
              src={activeLogo.src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full max-h-[200px] sm:max-h-[280px] md:max-h-[340px] object-contain opacity-80 glitch-layer-2 pointer-events-none mix-blend-screen"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Theme Grid Mesh Ambient Line */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,rgba(0,243,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,243,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
    </div>
  );
}
