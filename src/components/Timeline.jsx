import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Sparkles, Code, Trophy, Utensils, Zap, Award, Music } from 'lucide-react';
import { SYMPOSIUM_TIMELINE } from '../data/timeline';

const iconMap = {
  UserCheck: UserCheck,
  Sparkles: Sparkles,
  Code: Code,
  Trophy: Trophy,
  Utensils: Utensils,
  Zap: Zap,
  Award: Award,
  Music: Music
};

export const Timeline = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <span className="text-xs uppercase font-orbitron tracking-widest text-cyan-400 font-semibold bg-cyan-950/40 border border-cyan-500/30 px-4 py-1.5 rounded-full">
          Event Agenda
        </span>
        <h2 className="font-orbitron font-extrabold text-3xl md:text-5xl text-white mt-4">
          Symposium <span className="text-cyan-400 neon-text-cyan">Timeline</span>
        </h2>
        <p className="font-space text-slate-400 max-w-xl mx-auto mt-2">
          March 25, 2026 — Schedule of activities from registration to valedictory.
        </p>
      </div>

      <div className="relative">
        {/* Animated Connecting Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 transform -translate-x-1/2 shadow-[0_0_15px_rgba(0,243,255,0.5)]" />

        <div className="space-y-10">
          {SYMPOSIUM_TIMELINE.map((item, index) => {
            const IconComponent = iconMap[item.iconName] || Zap;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Card */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                  <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 shadow-xl group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-orbitron font-bold text-xs uppercase text-cyan-400 tracking-wider bg-cyan-950/60 px-3 py-1 rounded-md border border-cyan-500/30">
                        {item.time}
                      </span>
                      <span className="text-xs uppercase font-rajdhani font-semibold text-slate-500">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-orbitron font-extrabold text-xl text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-space text-sm text-slate-400 mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Central Timeline Glowing Node */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.8)] z-10">
                  <IconComponent className="w-5 h-5 text-cyan-300" />
                </div>

                {/* Spacer for two-sided desktop layout */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
