import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Sparkles, ArrowRight, Award, Trophy, Zap, Cpu, ShieldCheck, Flame } from 'lucide-react';
import { SYMPOSIUM_INFO } from '../data/eventsData';
import CountdownTimer from './CountdownTimer';
import ParallaxWrapper from './ParallaxWrapper';
import GlitchLogo from './GlitchLogo';

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden bg-transparent">
      
      {/* Background Decorative Layer with Parallax & Motion Pulse */}
      <ParallaxWrapper speed={0.4} className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-[140px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[160px]" 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[200px]" />
      </ParallaxWrapper>

      {/* Cyber Mesh Overlay Grid */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(#00f3ff 1.2px, transparent 1.2px), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
          backgroundSize: '40px 40px, 40px 40px, 40px 40px'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Department Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-500/40 text-xs sm:text-sm font-extrabold text-cyan-300 backdrop-blur-xl mb-4 shadow-xl shadow-cyan-500/20 glow-cyan-border"
        >
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </motion.div>
          <span className="tracking-wide">M.A.M. College of Engineering • Department of CSE</span>
        </motion.div>

        {/* CYBER GLITCH LOGO ANIMATION (Loops COMBLAZE 2K26 <-> MAMCE) */}
        <GlitchLogo />

        {/* High-Contrast Glowing Gold Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex items-center justify-center gap-3 mt-2 mb-4"
        >
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-400 hidden sm:block" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-amber-400 uppercase tracking-widest font-rajdhani drop-shadow-[0_0_25px_rgba(245,158,11,0.6)]">
            {SYMPOSIUM_INFO.tagline}
          </h2>
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-400 hidden sm:block" />
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed font-normal"
        >
          Organized by the <strong className="text-cyan-300">{SYMPOSIUM_INFO.department}</strong>. 
          Step into the future of tech excellence across 7 high-energy technical and non-technical arenas!
        </motion.p>

        {/* Date, Venue & Prize Badges Ribbon */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm font-bold text-slate-200 mb-8"
        >
          <motion.div whileHover={{ scale: 1.05, y: -2 }} className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-lg">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>{SYMPOSIUM_INFO.date}</span>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05, y: -2 }} className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-lg">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span>Siruganur, Tiruchirappalli</span>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05, y: -2 }} className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-500/20 border border-amber-500/40 text-amber-300 backdrop-blur-xl shadow-lg">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>{SYMPOSIUM_INFO.totalPrizePool} Cash Prizes</span>
          </motion.div>
        </motion.div>

        {/* Live Countdown in Cyber Frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="my-8 max-w-xl mx-auto p-4 rounded-3xl glass-panel-luxury hud-card"
        >
          <div className="flex items-center justify-between text-[11px] font-mono font-extrabold uppercase tracking-widest text-cyan-400 mb-2 px-2">
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Event Launch Countdown
            </span>
            <span className="text-amber-400">{SYMPOSIUM_INFO.date}</span>
          </div>
          <CountdownTimer />
        </motion.div>

        {/* Pricing Offer Banner & CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Link
              to="/register"
              className="w-full sm:w-auto px-10 py-4 rounded-2xl font-black text-sm sm:text-base text-slate-950 btn-shimmer-gold shadow-2xl shadow-amber-500/30 transition-all flex items-center justify-center gap-3 group uppercase tracking-wider"
            >
              <Sparkles className="w-5 h-5 text-slate-950 animate-bounce-slow" />
              <span>Register Now for ₹250</span>
              <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            href="#events"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-bold text-sm hover:text-white transition-all flex items-center justify-center gap-2 shadow-xl"
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Explore 7 Events</span>
          </motion.a>
        </motion.div>

        {/* Flat Fee Luxury Highlight Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-xl bg-slate-900/80 border border-amber-500/30 text-xs text-slate-300"
        >
          <span className="text-amber-400 font-extrabold">👑 Exclusive Flat Pass:</span> 
          <span>Pick any 2 events for just ₹250 flat. Includes welcome kit, certificates & hot buffet lunch!</span>
        </motion.div>

      </div>
    </section>
  );
}
