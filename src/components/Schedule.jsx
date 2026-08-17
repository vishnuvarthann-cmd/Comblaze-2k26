import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Calendar, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { SCHEDULE_TIMELINE, SYMPOSIUM_INFO } from '../data/eventsData';
import ParallaxWrapper from './ParallaxWrapper';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -35, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 18,
      stiffness: 140,
    },
  },
};

export default function Schedule() {
  return (
    <section id="schedule" className="py-24 bg-transparent relative overflow-hidden border-t border-slate-800/60">
      
      {/* Background Parallax Orbs */}
      <ParallaxWrapper speed={0.2} className="absolute right-10 top-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <ParallaxWrapper speed={0.4} className="absolute left-10 bottom-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Animated Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-extrabold text-cyan-400 uppercase tracking-wider mb-3 shadow-lg shadow-cyan-500/10"
          >
            <Clock className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
            <span>Event Progression</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-orbitron tracking-wide">
            Symposium Schedule
          </h2>
          <p className="text-slate-400 text-sm mt-3 font-medium">
            Thursday, <strong className="text-cyan-300">{SYMPOSIUM_INFO.date}</strong> • High-energy technical and non-technical sessions
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative ml-4 sm:ml-32">
          
          {/* Animated Glowing Vertical Timeline Line */}
          <div className="absolute -left-[1px] top-3 bottom-3 w-[2px] bg-slate-800">
            <motion.div 
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-amber-400 origin-top shadow-[0_0_12px_rgba(6,182,212,0.8)]"
            />
          </div>

          {/* Staggered Timeline Cards List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-8"
          >
            {SCHEDULE_TIMELINE.map((item, idx) => (
              <motion.div key={idx} variants={cardVariants} className="relative pl-6 sm:pl-10 group">
                
                {/* Glowing Node Dot with Pulsing Ping */}
                <div className="absolute -left-[9px] top-2 z-10">
                  <div className="relative w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:border-amber-400 transition-colors shadow-md shadow-cyan-500/40 flex items-center justify-center">
                    <motion.div 
                      animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                      className="absolute inset-0 rounded-full bg-cyan-400/40"
                    />
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:bg-amber-400 transition-colors" />
                  </div>
                </div>

                {/* Desktop Left Time Badge */}
                <div className="hidden sm:block absolute -left-36 top-1 text-right w-28">
                  <span className="text-xs font-mono font-extrabold text-cyan-400 block group-hover:text-amber-400 transition-colors">
                    {item.time.split('-')[0]}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 block">
                    {item.time.split('-')[1]}
                  </span>
                </div>

                {/* Interactive Animated Card */}
                <motion.div
                  whileHover={{ scale: 1.02, x: 6 }}
                  transition={{ type: "spring", damping: 20, stiffness: 200 }}
                  className="p-6 rounded-2xl glass-panel-luxury border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all duration-300 shadow-xl group-hover:shadow-cyan-500/10"
                >
                  <div className="sm:hidden text-xs font-mono font-extrabold text-cyan-400 mb-2">
                    {item.time}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <h3 className="text-base sm:text-lg font-black text-white group-hover:text-cyan-300 transition-colors font-orbitron flex items-center gap-2">
                      <span>{item.title}</span>
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-auto group-hover:border-cyan-500/30 transition-colors">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{item.venue}</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-cyan-400/80 opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Verified Schedule Slot • On-Time Progression</span>
                  </div>
                </motion.div>

              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
