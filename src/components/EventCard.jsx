import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Users, Clock, ArrowRight } from 'lucide-react';

export const EventCard = ({ event }) => {
  const isTechnical = event.category === 'technical';
  const eventSlug = event.slug || event.id;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`glass-panel rounded-2xl overflow-hidden border ${
        isTechnical ? 'border-cyan-500/30 hover:border-cyan-400' : 'border-pink-500/30 hover:border-pink-400'
      } flex flex-col justify-between shadow-xl group transition-all duration-300 relative z-10`}
    >
      <div>
        {/* Event Poster Image Header */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-900">
          <img
            src={event.posterImage || event.image || event.image_url}
            alt={event.name || event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          {/* Category Tag */}
          <div className="absolute top-3 left-3">
            <span
              className={`font-orbitron font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border ${
                isTechnical
                  ? 'bg-cyan-950/80 text-cyan-300 border-cyan-400/50 shadow-[0_0_10px_rgba(0,243,255,0.4)]'
                  : 'bg-pink-950/80 text-pink-300 border-pink-400/50 shadow-[0_0_10px_rgba(255,0,127,0.4)]'
              }`}
            >
              {event.category}
            </span>
          </div>

          {/* Entry Fee Badge */}
          <div className="absolute top-3 right-3">
            <span className="font-orbitron font-extrabold text-xs px-3 py-1 rounded-full bg-slate-900/90 text-white border border-slate-700">
              ₹250 Pass
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-orbitron font-extrabold text-2xl text-white group-hover:text-cyan-300 transition-colors drop-shadow-md">
              {event.name || event.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          <p className="font-space text-sm text-slate-300 line-clamp-2 leading-relaxed">
            {event.shortDesc || event.shortDescription || event.description}
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs font-rajdhani font-semibold text-slate-400">
            <div className="flex items-center space-x-1.5">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>{event.teamSize || event.participationType}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>{event.timing || event.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer CTA */}
      <div className="p-5 pt-0">
        <Link
          to={`/events/${eventSlug}`}
          className={`w-full py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-widest inline-flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer ${
            isTechnical
              ? 'bg-cyan-950/70 border border-cyan-400/60 text-cyan-300 hover:bg-cyan-500 hover:text-black shadow-[0_0_15px_rgba(0,243,255,0.2)]'
              : 'bg-pink-950/70 border border-pink-400/60 text-pink-300 hover:bg-pink-500 hover:text-black shadow-[0_0_15px_rgba(255,0,127,0.2)]'
          }`}
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;
