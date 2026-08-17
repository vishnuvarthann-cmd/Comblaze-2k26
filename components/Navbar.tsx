'use client';

import React, { useState } from 'react';
import { switchAudio } from '../lib/audio';

export interface NavbarProps {
  onOpenSpecs: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSpecs }) => {
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);

  const handleAudioToggle = () => {
    const newState = switchAudio.toggleMute();
    setIsAudioActive(newState);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-pill px-6 py-3 rounded-full">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-mono font-bold text-sm tracking-tighter shadow-md">
            Wp
          </div>
          <span className="font-bold tracking-tight text-black/90 text-lg">
            WpDev<span className="text-black/40 font-mono text-xs ml-1 font-normal">SERIES ONE</span>
          </span>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wide uppercase text-black/60">
          <a href="#overview" className="hover:text-black transition-colors">Overview</a>
          <button onClick={onOpenSpecs} className="hover:text-black transition-colors cursor-pointer">
            Architecture
          </button>
          <a href="#specs" className="hover:text-black transition-colors">Tech Specs</a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Sound Synthesizer Toggle */}
          <button
            onClick={handleAudioToggle}
            title={isAudioActive ? "Mute mechanical switch sounds" : "Enable tactile switch sound FX"}
            className={`p-2.5 rounded-full transition-all flex items-center justify-center cursor-pointer ${
              isAudioActive
                ? 'bg-black text-white shadow-md'
                : 'bg-black/5 hover:bg-black/10 text-black/70'
            }`}
          >
            {isAudioActive ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            )}
          </button>

          {/* Reserve / Buy CTA */}
          <button className="px-5 py-2 rounded-full bg-black text-white text-xs font-semibold tracking-wide uppercase hover:bg-black/80 transition-all shadow-md active:scale-95 cursor-pointer">
            Reserve — $349
          </button>
        </div>
      </div>
    </header>
  );
};
