'use client';

import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { KeyboardScroll } from '../components/KeyboardScroll';
import { SpecSheet } from '../components/SpecSheet';
import { Footer } from '../components/Footer';

export default function Home() {
  const [isSpecOpen, setIsSpecOpen] = useState<boolean>(false);

  return (
    <main className="min-h-screen bg-[#ECECEC] text-black/90 font-sans selection:bg-black selection:text-white">
      {/* Navigation Bar */}
      <Navbar onOpenSpecs={() => setIsSpecOpen(true)} />

      {/* Hero Section Header */}
      <section id="overview" className="pt-32 pb-12 px-6 text-center max-w-4xl mx-auto">
        <span className="text-[11px] font-mono tracking-widest text-black/50 uppercase block mb-3">
          ANNOUNCING WPDEV SERIES ONE
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-black/90 mb-6">
          Tactile Engineering.<br />Redefined Layer by Layer.
        </h1>
        <p className="text-base md:text-lg text-black/60 font-normal max-w-2xl mx-auto leading-relaxed">
          Scroll down to explore the 906-frame expanded architecture of the WpDev mechanical keyboard.
        </p>

        {/* Scroll Indicator */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-mono text-black/40">
          <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span>SCROLL TO EXPLODE ARCHITECTURE</span>
        </div>
      </section>

      {/* Core Scrollytelling Sticky Canvas (400vh Scroll Length) */}
      <KeyboardScroll onOpenSpecs={() => setIsSpecOpen(true)} />

      {/* Architecture Spec Sheet Drawer */}
      <SpecSheet isOpen={isSpecOpen} onClose={() => setIsSpecOpen(false)} />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
