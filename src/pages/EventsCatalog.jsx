import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { EVENTS } from '../data/eventsData';
import { fetchEvents, supabase } from '../lib/supabase';
import { Trophy, Users, ArrowRight, Code2, Presentation, Layout, Gamepad2, Film, Compass, Sparkles, Filter, Search, Database, Globe, FileText, Camera } from 'lucide-react';

const iconMap = {
  Code2,
  Database,
  Presentation,
  Layout,
  Gamepad2,
  Film,
  Compass,
  Sparkles,
  Globe,
  FileText,
  Camera,
  Trophy
};

export default function EventsCatalog() {
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [eventsList, setEventsList] = useState(EVENTS);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchEvents().then(data => {
      if (data && data.length > 0) setEventsList(data);
    });

    const channel = supabase
      .channel('public:events_catalog')
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

  const filteredEvents = eventsList.filter(e => {
    const matchesCategory = filterCategory === 'all' || e.category === filterCategory;
    const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (e.description && e.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (e.subtitle && e.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 relative z-10">
        
        {/* Page Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-extrabold text-cyan-400 uppercase tracking-widest">
            Full Events Catalog ({eventsList.length} Events)
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-3 font-orbitron">
            Symposium Competitions
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Every participant registers for <strong className="text-white">exactly 2 events</strong> of their choice for a flat fee of <strong className="text-cyan-400">₹250</strong>.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shadow-xl relative z-20">
          
          {/* Tabs */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: `All Events (${eventsList.length})` },
              { id: 'technical', label: 'Technical' },
              { id: 'non-technical', label: 'Non-Technical' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer relative z-30 ${
                  filterCategory === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full sm:w-72 z-30">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search event name or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 relative z-30"
            />
          </div>

        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-20">
          {filteredEvents.map((event) => {
            const IconComp = iconMap[event.icon] || Sparkles;
            const isTech = event.category === 'technical';
            const eventSlug = event.slug || event.id;

            return (
              <div
                key={event.id}
                className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 overflow-hidden shadow-xl flex flex-col justify-between group relative z-20"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image || event.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80'}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      isTech ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300' : 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                    }`}>
                      {event.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-slate-950/90 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-400 transition-colors font-orbitron">
                      {event.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400 mb-2">{event.subtitle || event.category}</p>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                      {event.shortDesc || event.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 mb-4 text-xs font-mono">
                      <span className="text-amber-400 font-bold flex items-center gap-1">
                        <Trophy className="w-3.5 h-3.5" />
                        {event.prize}
                      </span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-cyan-400" />
                        {event.teamSize || event.team_size}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to={`/events/${eventSlug}`}
                        className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold text-center transition-colors cursor-pointer relative z-30"
                      >
                        Rules & Details
                      </Link>

                      <Link
                        to={`/register?event=${event.id}`}
                        className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold text-center transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-1 cursor-pointer relative z-30"
                      >
                        <span>Select</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </main>

      <Footer />
    </div>
  );
}
