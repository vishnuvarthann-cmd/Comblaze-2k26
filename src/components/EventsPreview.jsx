import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { EVENTS } from '../data/eventsData';
import { fetchEvents, supabase } from '../lib/supabase';
import { Trophy, Users, ArrowRight, Code2, Presentation, Layout, Gamepad2, Film, Compass, Sparkles, Filter } from 'lucide-react';
import ParallaxWrapper from './ParallaxWrapper';

const iconMap = {
  Code2,
  Presentation,
  Layout,
  Gamepad2,
  Film,
  Compass,
  Sparkles
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function EventsPreview() {
  const [activeTab, setActiveTab] = useState('all');
  const [eventsList, setEventsList] = useState(EVENTS);

  useEffect(() => {
    fetchEvents().then(data => {
      if (data && data.length > 0) setEventsList(data);
    });

    const channel = supabase
      .channel('public:events')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, () => {
        fetchEvents().then(updated => {
          if (updated && updated.length > 0) setEventsList(updated);
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredEvents = activeTab === 'all'
    ? eventsList
    : eventsList.filter(e => e.category === activeTab);

  return (
    <section id="events" className="py-28 bg-transparent relative overflow-hidden border-t border-slate-900/60">
      
      {/* Background Ambient Glows */}
      <ParallaxWrapper speed={0.3} className="absolute left-1/4 top-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-black text-cyan-400 uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{eventsList.length} Live Competitions</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white font-orbitron">
              Symposium Arenas
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Select any 2 events of your choice for a flat pass fee of <strong className="text-amber-400 font-extrabold">₹250</strong>.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 bg-slate-900/70 p-1.5 rounded-2xl border border-slate-800/80 backdrop-blur-xl self-start md:self-auto shadow-xl"
          >
            {[
              { id: 'all', label: `All Events (${eventsList.length})` },
              { id: 'technical', label: 'Technical' },
              { id: 'non-technical', label: 'Non-Technical' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all uppercase tracking-wider ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Animated Events Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredEvents.map((event) => {
              const IconComponent = iconMap[event.icon] || Sparkles;
              const isTech = event.category === 'technical';
              const shortDescription = event.shortDesc || event.description || '';

              return (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group rounded-3xl glass-panel-luxury border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden shadow-2xl flex flex-col justify-between relative hud-card"
                >
                  {/* Image Banner */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={event.image || event.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80'}
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 contrast-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    {/* Category Pill */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        isTech
                          ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 backdrop-blur-xl shadow-lg'
                          : 'bg-amber-500/20 border border-amber-500/50 text-amber-300 backdrop-blur-xl shadow-lg'
                      }`}>
                        {event.category}
                      </span>
                    </div>

                    {/* Icon floating */}
                    <div className="absolute bottom-3 left-4 w-12 h-12 rounded-2xl bg-slate-950/90 border border-cyan-500/40 flex items-center justify-center text-cyan-400 backdrop-blur-xl shadow-xl group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-400 transition-colors font-orbitron">
                        {event.name}
                      </h3>
                      
                      {/* Event Subtitle Quote Tagline */}
                      <p className="text-xs font-semibold text-cyan-300 italic mt-1 mb-3">
                        "{event.subtitle}"
                      </p>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                        {shortDescription}
                      </p>
                    </div>

                    <div>
                      {/* Prize & Team Ribbon */}
                      <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 mb-5 text-xs">
                        <div className="flex items-center gap-1.5 text-amber-400 font-extrabold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                          <Trophy className="w-4 h-4" />
                          <span>{event.prize}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-300 font-bold bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
                          <Users className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{event.teamSize || event.team_size}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <Link
                          to={`/events/${event.slug}`}
                          className="py-3 px-3 rounded-xl bg-slate-950/90 hover:bg-slate-800 text-slate-200 text-xs font-bold text-center transition-colors border border-slate-800"
                        >
                          Rules & Details
                        </Link>

                        <Link
                          to={`/register?event=${event.id}`}
                          className="py-3 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-black text-center transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-1 uppercase tracking-wider"
                        >
                          <span>Select</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* View All Footer CTA */}
        <div className="text-center mt-14">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-cyan-400 hover:text-white font-extrabold text-sm transition-all shadow-xl uppercase tracking-wider backdrop-blur-xl"
          >
            <span>View All Events Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
