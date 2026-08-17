import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, Mail, UserCheck } from 'lucide-react';
import { ORGANIZING_COMMITTEE } from '../data/eventsData';

const convenerObj = (ORGANIZING_COMMITTEE.conveners && ORGANIZING_COMMITTEE.conveners[0]) || {
  name: "Dr. K. Senthil Kumar",
  role: "Professor & HOD",
  phone: "+91 98424 12345",
  email: "hod.cse@mamce.org"
};

const committeeCards = [
  {
    id: 1,
    title: "Chief Patron & Chairman",
    name: "Dr. M.A. Maluk Mohamed",
    subtitle: "Correspondent & Chairman • M.A.M. College of Engineering",
    phone: "+91 98424 10000",
    email: "chairman@mamce.org",
    tag: "PATRON",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80"
  },
  {
    id: 2,
    title: "HOD & Faculty Convener",
    name: convenerObj.name,
    subtitle: `${convenerObj.role || 'Professor & HOD'} • Department of CSE`,
    phone: convenerObj.phone || "+91 98424 12345",
    email: convenerObj.email || "hod.cse@mamce.org",
    tag: "CONVENER",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80"
  },
  {
    id: 3,
    title: "Faculty Staff Coordinators",
    name: "Prof. P. Mohamed Ghouse",
    subtitle: "Associate Professor & Event Staff Advisor",
    phone: "+91 98424 23456",
    email: "ghouse.cse@mamce.org",
    tag: "FACULTY LEAD",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80"
  },
  {
    id: 4,
    title: "Student Association President",
    name: "R. Aravind",
    subtitle: "IV Year CSE • President, Student Technical Association",
    phone: "+91 97890 12345",
    email: "aravind.cse@mamce.org",
    tag: "STUDENT LEAD",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80"
  },
  {
    id: 5,
    title: "Technical & Logistics Leads",
    name: "K. Praveen & S. Sanjay",
    subtitle: "Technical Lead & Event Coordinators • III & IV Year CSE",
    phone: "+91 97890 34567",
    email: "comblaze.team@mamce.org",
    tag: "EXECUTIVE TEAM",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80"
  }
];

const StickyCoordinatorCard = ({ i, item, progress, range, targetScale }) => {
  const containerRef = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="sticky top-32 flex items-center justify-center"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-2vh + ${i * 30 + 120}px)`,
        }}
        className="rounded-3xl glass-panel-luxury border border-cyan-500/30 p-6 sm:p-8 w-full max-w-2xl origin-top flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl hud-card mb-8"
      >
        {/* Left Info Column */}
        <div className="flex-1 text-center sm:text-left space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${item.badgeColor}`}>
              {item.tag}
            </span>
          </div>

          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">{item.title}</span>
            <h3 className="text-xl sm:text-2xl font-black text-white font-orbitron mt-0.5">{item.name}</h3>
            <p className="text-xs text-slate-300 font-medium mt-1">{item.subtitle}</p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <a
              href={`tel:${item.phone}`}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-400 text-xs font-bold transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{item.phone}</span>
            </a>

            <a
              href={`mailto:${item.email}`}
              className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-slate-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Right Avatar Card */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-xl shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default function Coordinators() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  return (
    <section id="coordinators" className="py-20 bg-transparent relative border-t border-slate-900/60">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-black text-cyan-400 uppercase tracking-widest mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Event Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-orbitron">
            Organizing Committee
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Scroll down to watch the committee cards stack on top of each other
          </p>
        </div>

      </div>

      {/* STICKY STACKING SCROLL CONTAINER WITH EXTRA SCROLL DISTANCE */}
      <div ref={container} className="relative w-full flex flex-col items-center justify-start min-h-[300vh] pb-[60vh] pt-10">
        {committeeCards.map((item, i) => {
          const targetScale = Math.max(0.75, 1 - (committeeCards.length - i - 1) * 0.06);
          const step = 1 / committeeCards.length;
          return (
            <StickyCoordinatorCard
              key={item.id}
              i={i}
              item={item}
              progress={scrollYProgress}
              range={[i * step, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>

    </section>
  );
}
