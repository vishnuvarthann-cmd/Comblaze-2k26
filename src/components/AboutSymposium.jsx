import React from 'react';
import { Zap, Flame, Trophy, CheckCircle2, Ticket } from 'lucide-react';
import { SYMPOSIUM_INFO } from '../data/eventsData';

export default function AboutSymposium() {
  return (
    <section className="py-20 bg-transparent relative overflow-hidden border-t border-slate-900/60">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-panel-luxury border border-cyan-500/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                <Flame className="w-4 h-4 text-cyan-400" />
                <span>Symposium Edition 2026</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white font-orbitron">
                Welcome to <span className="text-cyan-400">{SYMPOSIUM_INFO.name}</span>
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                COMBLAZE 2K26 is the flagship national-level technical symposium hosted annually by the Department of CSE, M.A.M. College of Engineering. It brings together brilliant engineering minds from across the state to compete, collaborate, and showcase technical mastery across 7 events.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "7 Exciting Events (3 Technical + 4 Non-Technical)",
                  "Flat Fee ₹250 for 2 Selected Events",
                  "Official Participation Certificate for all",
                  "Complimentary Lunch & Welcome Event Kit"
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Flat Price Card */}
            <div className="bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-6 text-center shadow-xl relative group">
              <div className="w-12 h-12 mx-auto rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
                <Ticket className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Flat Registration Fee</span>
              <div className="text-4xl font-extrabold text-white my-2 font-orbitron">
                ₹250 <span className="text-xs font-normal text-slate-400">/ participant</span>
              </div>
              <p className="text-xs text-cyan-300 font-semibold bg-cyan-950/60 py-1.5 px-3 rounded-lg border border-cyan-500/20">
                Covers any 2 events of your choice!
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
