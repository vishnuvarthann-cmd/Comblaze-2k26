import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParallaxWrapper from '../components/ParallaxWrapper';
import { fetchEventBySlug, supabase } from '../lib/supabase';
import { Trophy, Users, Clock, MapPin, CheckCircle2, ArrowRight, ArrowLeft, Phone, ShieldCheck, Sparkles, Zap, Flame, Award, Navigation } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 20 } },
};

export default function EventPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadData = () => {
      fetchEventBySlug(slug).then(data => {
        setEvent(data);
        setLoading(false);
      });
    };

    loadData();

    // Subscribe to live Postgres database changes for this event
    const channel = supabase
      .channel(`public:event_${slug}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, () => {
        loadData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col justify-between font-sans">
        <Navbar />
        <div className="pt-32 text-center text-slate-400 py-24">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="font-mono text-xs text-cyan-400 uppercase tracking-widest animate-pulse">
            LOADING EVENT DETAILS...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col justify-between font-sans">
        <Navbar />
        <div className="pt-32 text-center text-slate-400 py-24 max-w-md mx-auto px-4">
          <h2 className="text-2xl font-black text-white font-orbitron mb-2">Event Arena Not Found</h2>
          <p className="text-xs text-slate-400 mb-6">The competition page you requested could not be located in the symposium database.</p>
          <Link to="/events" className="px-6 py-3 bg-cyan-500 text-slate-950 font-black rounded-full text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20">
            Return to Events Catalog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isTech = event.category === 'technical';

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans flex flex-col justify-between relative overflow-hidden">
      <Navbar />

      {/* Decorative Parallax Glowing Orbs */}
      <ParallaxWrapper speed={0.3} className="absolute left-[-10%] top-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />
      <ParallaxWrapper speed={0.4} className="absolute right-[-10%] bottom-1/3 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[180px] pointer-events-none" />

      <main className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 relative z-10">
        
        {/* Back Link */}
        <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 mb-6 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-cyan-400" />
            <span>Back to All Competitions</span>
          </Link>
        </motion.div>

        {/* Hero Banner Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`rounded-3xl overflow-hidden shadow-2xl mb-8 border ${
            isTech ? 'border-cyan-500/40 glow-cyan-border' : 'border-amber-500/40 glow-gold-border'
          } bg-slate-900/90 backdrop-blur-2xl relative`}
        >
          
          <div className="relative h-72 sm:h-96 w-full overflow-hidden">
            <img
              src={event.image || event.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80'}
              alt={event.name}
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20" />
            
            {/* Top Category Badge */}
            <div className="absolute top-6 left-6">
              <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest inline-flex items-center gap-1.5 shadow-xl ${
                isTech ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 backdrop-blur-xl' : 'bg-amber-500/20 border border-amber-400/50 text-amber-300 backdrop-blur-xl'
              }`}>
                <Zap className="w-3.5 h-3.5" />
                <span>{event.category} Arena</span>
              </span>
            </div>

            {/* Bottom Hero Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white font-orbitron tracking-wide drop-shadow-lg">
                {event.name}
              </h1>
              
              {/* Tagline / Subtitle */}
              {event.subtitle && (
                <div className="flex items-center gap-2 mt-3">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                  <p className="text-base sm:text-lg font-bold text-amber-300 font-rajdhani tracking-wider drop-shadow-md">
                    "{event.subtitle}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 4 Metric Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-slate-800 bg-slate-950/80 backdrop-blur-xl text-xs">
            
            <motion.div whileHover={{ scale: 1.02 }} className="p-5 border-r border-b sm:border-b-0 border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Prize Pool</span>
                <span className="font-extrabold text-amber-300 text-sm">{event.prize}</span>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="p-5 border-b sm:border-b-0 sm:border-r border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Team Size</span>
                <span className="font-extrabold text-white text-sm">{event.teamSize || event.team_size}</span>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="p-5 border-r border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Timing</span>
                <span className="font-extrabold text-white text-sm">{event.timing || '10:30 AM Onwards'}</span>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Venue</span>
                <span className="font-extrabold text-white text-sm">{event.venue || 'CSE Department Labs'}</span>
              </div>
            </motion.div>

          </div>

          {/* Description & Rules Body */}
          <div className="p-6 sm:p-10 space-y-10">
            
            {/* About Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-5 h-5 text-cyan-400" />
                <h3 className="text-xl font-extrabold text-white font-orbitron">About the Competition</h3>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 shadow-inner">
                {event.description}
              </p>
            </div>

            {/* Official Rules & Guidelines */}
            {event.rules && event.rules.length > 0 && (
              <div className="hud-card">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <h3 className="text-xl font-extrabold text-white font-orbitron">Official Rules & Guidelines</h3>
                </div>

                <div className="space-y-3 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
                  {event.rules.map((rule, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="flex items-start gap-3.5 text-xs sm:text-sm text-slate-200"
                    >
                      <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-relaxed">{rule}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Event Coordinators */}
            {event.coordinators && event.coordinators.length > 0 && (
              <div>
                <h3 className="text-lg font-extrabold text-white font-orbitron mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>Event Leads & Coordinators</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.coordinators.map((coord, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between shadow-md">
                      <div>
                        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block font-mono">{coord.role}</span>
                        <h4 className="text-sm font-bold text-white">{coord.name}</h4>
                      </div>
                      {coord.phone && (
                        <a
                          href={`tel:${coord.phone}`}
                          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-200 flex items-center gap-1.5 border border-slate-800 transition-colors cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Call</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Register CTA Box */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 rounded-2xl border border-cyan-500/20 shadow-2xl">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">COMBLAZE 2K26 All-Access Pass</span>
                </div>
                <p className="text-base sm:text-lg font-black text-white">
                  Flat ₹250 <span className="text-xs font-normal text-slate-400">(Includes 2 Events + Welcome Kit + Buffet Lunch)</span>
                </p>
              </div>

              <Link
                to={`/register?event=${event.id}`}
                className="w-full sm:w-auto px-10 py-4 rounded-2xl font-black text-xs sm:text-sm text-slate-950 btn-shimmer-gold shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all flex items-center justify-center gap-2.5 uppercase tracking-wider shrink-0 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950 animate-bounce-slow" />
                <span>Register for this Event</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>
            </div>

          </div>

        </motion.div>

      </main>

      <Footer />
    </div>
  );
}
