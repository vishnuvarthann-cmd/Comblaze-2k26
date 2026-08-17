import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Sparkles } from 'lucide-react';
import EventCard from '../components/EventCard';
import { EVENTS_DATA } from '../data/events';

export const NonTechnicalEvents = () => {
  const nonTechEvents = EVENTS_DATA.filter((e) => e.category === 'non-technical');

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto text-slate-100">
      {/* Header Banner */}
      <div className="glass-panel-magenta p-8 md:p-12 rounded-3xl border border-pink-500/40 mb-12 relative overflow-hidden text-center md:text-left shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-950/80 border border-pink-400/40 text-pink-400 mb-3">
              <Trophy className="w-4 h-4" />
              <span className="font-orbitron text-xs font-bold uppercase tracking-widest">
                Esports & Fun Arena
              </span>
            </div>
            <h1 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-white">
              Non-Technical <span className="text-pink-500 neon-text-magenta">Events</span>
            </h1>
            <p className="font-space text-slate-300 max-w-2xl mt-3">
              Unleash your creativity, strategy, lateral thinking, and humor! Compete in IPL Auction, Connections, and Meme Battle.
            </p>
          </div>

          <Link
            to="/register"
            className="px-8 py-3.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white shadow-[0_0_25px_rgba(255,0,127,0.6)] hover:scale-105 transition-all flex-shrink-0"
          >
            Register For Events
          </Link>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {nonTechEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default NonTechnicalEvents;
