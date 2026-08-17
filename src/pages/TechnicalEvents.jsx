import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Zap, ArrowRight } from 'lucide-react';
import EventCard from '../components/EventCard';
import { EVENTS_DATA } from '../data/events';

export const TechnicalEvents = () => {
  const technicalEvents = EVENTS_DATA.filter((e) => e.category === 'technical');

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto text-slate-100">
      {/* Header Banner */}
      <div className="glass-panel p-8 md:p-12 rounded-3xl border border-cyan-500/40 mb-12 relative overflow-hidden text-center md:text-left shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-400 mb-3">
              <Code className="w-4 h-4" />
              <span className="font-orbitron text-xs font-bold uppercase tracking-widest">
                Technical Arena
              </span>
            </div>
            <h1 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-white">
              Technical <span className="text-cyan-400 neon-text-cyan">Events</span>
            </h1>
            <p className="font-space text-slate-300 max-w-2xl mt-3">
              Test your engineering logic, algorithmic efficiency, system awareness, and project innovation across our premier technical challenges.
            </p>
          </div>

          <Link
            to="/register"
            className="px-8 py-3.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 text-white shadow-[0_0_25px_rgba(0,243,255,0.6)] hover:scale-105 transition-all flex-shrink-0"
          >
            Register For Events
          </Link>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {technicalEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default TechnicalEvents;
