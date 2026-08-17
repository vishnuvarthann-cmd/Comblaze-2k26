import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ShieldCheck, Users, Calendar, Home, Layers } from 'lucide-react';
import { SYMPOSIUM_INFO } from '../data/eventsData';

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: "max-content",
    transition: {
      y: { type: "spring", damping: 18, stiffness: 250 },
      opacity: { duration: 0.3 },
      type: "spring",
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: "3.2rem",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const logoVariants = {
  expanded: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -25, rotate: -180, transition: { duration: 0.3 } },
};

const itemVariants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const collapsedIconVariants = {
  expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 300,
      delay: 0.15,
    }
  },
};

export default function Navbar() {
  const [isExpanded, setExpanded] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const scrollPositionOnCollapse = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    
    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest; 
    } 
    else if (!isExpanded && latest < previous && (scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD)) {
      setExpanded(true);
    }
    
    lastScrollY.current = latest;
  });

  const handleNavClick = () => {
    if (!isExpanded) {
      setExpanded(true);
    }
  };

  const closeMobile = () => setMobileMenuOpen(false);
  const isHome = location.pathname === '/';

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 print-hide no-print w-full max-w-[95vw] sm:max-w-none flex justify-center px-2 pointer-events-none">
      
      {/* DESKTOP NAVBAR (md and above) */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={containerVariants}
        whileHover={!isExpanded ? { scale: 1.1 } : {}}
        whileTap={!isExpanded ? { scale: 0.95 } : {}}
        onClick={!isExpanded ? handleNavClick : undefined}
        className={`hidden md:flex relative items-center justify-between gap-4 sm:gap-6 rounded-full border border-cyan-500/40 bg-slate-950/95 shadow-2xl shadow-cyan-500/15 backdrop-blur-2xl h-14 pl-4 sm:pl-6 pr-3 sm:pr-4 py-2 pointer-events-auto ${
          !isExpanded ? "cursor-pointer justify-center w-12 px-0" : ""
        }`}
      >
        {/* Brand Logo Section */}
        <motion.div
          variants={logoVariants}
          className="flex-shrink-0 flex items-center gap-2 pr-2"
        >
          <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 p-0.5 shadow-md shadow-cyan-500/30 group-hover:scale-105 transition-transform shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center font-black text-cyan-400 text-xs font-orbitron">
                M
              </div>
            </div>
            <span className="font-black text-sm sm:text-base tracking-wider text-white font-orbitron shrink-0">
              {SYMPOSIUM_INFO.name}
            </span>
          </Link>
        </motion.div>
        
        {/* Nav Items Link Bar */}
        <motion.div
          className={`flex items-center gap-3 sm:gap-5 ${
            !isExpanded ? "pointer-events-none hidden" : ""
          }`}
        >
          <motion.div variants={itemVariants} className="shrink-0">
            <Link
              to="/"
              className={`text-xs font-bold transition-colors px-2 py-1 cursor-pointer ${
                location.pathname === '/' ? 'text-cyan-400 font-extrabold' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              Home
            </Link>
          </motion.div>

          {isHome ? (
            <>
              <motion.a variants={itemVariants} href="#events" className="text-xs font-bold text-slate-300 hover:text-cyan-400 transition-colors px-2 py-1 shrink-0 cursor-pointer">
                Events
              </motion.a>
              <motion.a variants={itemVariants} href="#schedule" className="text-xs font-bold text-slate-300 hover:text-cyan-400 transition-colors px-2 py-1 shrink-0 cursor-pointer">
                Schedule
              </motion.a>
            </>
          ) : (
            <motion.div variants={itemVariants} className="shrink-0">
              <Link to="/events" className="text-xs font-bold text-slate-300 hover:text-cyan-400 transition-colors px-2 py-1 cursor-pointer">
                All Events
              </Link>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="shrink-0">
            <Link to="/team" className="text-xs font-bold text-slate-300 hover:text-cyan-400 transition-colors px-2 py-1 flex items-center gap-1 cursor-pointer">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              Committee
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="shrink-0">
            <Link
              to="/admin/checkin"
              className="text-[11px] font-mono font-bold text-amber-400 hover:text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 transition-all flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Staff
            </Link>
          </motion.div>

          {/* Register CTA Button */}
          <motion.div variants={itemVariants} className="shrink-0">
            <Link
              to="/register"
              className="px-5 py-2 rounded-full font-black text-xs text-slate-950 btn-shimmer-gold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all flex items-center gap-1.5 uppercase tracking-wider whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-pulse shrink-0" />
              <span>Register Now</span>
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Collapsed Icon View (Pill Button on Scroll) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            variants={collapsedIconVariants}
            animate={isExpanded ? "expanded" : "collapsed"}
            className="text-cyan-400 cursor-pointer"
          >
            <Menu className="h-5 w-5" />
          </motion.div>
        </div>
      </motion.nav>

      {/* MOBILE NAVBAR (< md screens) */}
      <div className="flex md:hidden items-center justify-between w-[92vw] max-w-sm h-12 px-3 rounded-full border border-cyan-500/40 bg-slate-950/95 backdrop-blur-2xl shadow-xl pointer-events-auto">
        <Link to="/" onClick={closeMobile} className="flex items-center gap-2 cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 p-0.5 shadow-md shadow-cyan-500/30">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center font-black text-cyan-400 text-[11px] font-orbitron">
              M
            </div>
          </div>
          <span className="font-black text-xs tracking-wider text-white font-orbitron">
            {SYMPOSIUM_INFO.name}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/register"
            onClick={closeMobile}
            className="px-3 py-1 rounded-full text-[11px] font-black text-slate-950 btn-shimmer-gold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-slate-950" />
            <span>Register</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU MODAL DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 left-1/2 -translate-x-1/2 w-[90vw] max-w-sm rounded-3xl border border-cyan-500/40 bg-slate-950/98 backdrop-blur-2xl p-5 shadow-2xl z-50 pointer-events-auto"
          >
            <div className="flex flex-col gap-3">
              
              <Link
                to="/"
                onClick={closeMobile}
                className={`flex items-center gap-3 p-2.5 rounded-xl font-bold text-sm transition-colors cursor-pointer ${
                  location.pathname === '/' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Home className="w-4 h-4 text-cyan-400" />
                <span>Home</span>
              </Link>

              {isHome ? (
                <>
                  <a
                    href="#events"
                    onClick={closeMobile}
                    className="flex items-center gap-3 p-2.5 rounded-xl font-bold text-sm text-slate-200 hover:bg-slate-900 transition-colors cursor-pointer"
                  >
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Events Catalog</span>
                  </a>

                  <a
                    href="#schedule"
                    onClick={closeMobile}
                    className="flex items-center gap-3 p-2.5 rounded-xl font-bold text-sm text-slate-200 hover:bg-slate-900 transition-colors cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span>Symposium Schedule</span>
                  </a>
                </>
              ) : (
                <Link
                  to="/events"
                  onClick={closeMobile}
                  className="flex items-center gap-3 p-2.5 rounded-xl font-bold text-sm text-slate-200 hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>All Events</span>
                </Link>
              )}

              <Link
                to="/team"
                onClick={closeMobile}
                className="flex items-center gap-3 p-2.5 rounded-xl font-bold text-sm text-slate-200 hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Committee Leads</span>
              </Link>

              <Link
                to="/admin/checkin"
                onClick={closeMobile}
                className="flex items-center gap-3 p-2.5 rounded-xl font-mono font-bold text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Staff Portal</span>
              </Link>

              <div className="pt-2 border-t border-slate-800">
                <Link
                  to="/register"
                  onClick={closeMobile}
                  className="w-full py-3 rounded-xl font-black text-xs text-slate-950 btn-shimmer-gold shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
                  <span>Register Pass ₹250</span>
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
