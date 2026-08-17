import React from 'react';
import { Building2, GraduationCap, Award, Compass, Users } from 'lucide-react';
import { SYMPOSIUM_CONFIG } from '../data/config';
import techPoster from '../assets/tech_poster.jpg';
import nontechPoster from '../assets/nontech_poster.jpg';
import heroAnime from '../assets/hero_anime.jpg';

export const AboutCollege = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto text-slate-100 space-y-12">
      {/* College Header */}
      <div className="glass-panel p-8 md:p-12 rounded-3xl border border-cyan-500/40 text-center md:text-left relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-orbitron text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-400/30">
              Institution Profile
            </span>
            <h1 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-white mt-3">
              {SYMPOSIUM_CONFIG.collegeName}
            </h1>
            <p className="font-space text-slate-300 max-w-2xl mt-3">
              Siruganur, Tiruchirappalli, Tamil Nadu — A premier engineering institution committed to academic excellence, innovative technological education, holistic development, and career growth.
            </p>
          </div>
          <div className="w-20 h-20 rounded-2xl bg-cyan-950/80 border border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_30px_rgba(0,243,255,0.4)] flex-shrink-0">
            <Building2 className="w-10 h-10" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-center">
          <GraduationCap className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
          <span className="font-orbitron font-extrabold text-2xl text-white block">25+</span>
          <span className="font-space text-xs text-slate-400 uppercase">Years Excellence</span>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-center">
          <Building2 className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <span className="font-orbitron font-extrabold text-2xl text-white block">100+</span>
          <span className="font-space text-xs text-slate-400 uppercase">Acres Campus</span>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-center">
          <Award className="w-6 h-6 text-pink-400 mx-auto mb-2" />
          <span className="font-orbitron font-extrabold text-2xl text-white block">NAAC</span>
          <span className="font-space text-xs text-slate-400 uppercase">Accredited</span>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-center">
          <Users className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
          <span className="font-orbitron font-extrabold text-2xl text-white block">10,000+</span>
          <span className="font-space text-xs text-slate-400 uppercase">Global Alumni</span>
        </div>
      </div>

      {/* Campus Life & Image Gallery */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800">
        <h3 className="font-orbitron font-extrabold text-2xl text-white mb-6">
          Campus Gallery & Student Life
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl overflow-hidden border border-slate-800 group">
            <img src={heroAnime} alt="Campus Event" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="p-4 bg-slate-950">
              <h4 className="font-orbitron font-bold text-sm text-cyan-300">Technical Fest Culture</h4>
              <p className="font-space text-xs text-slate-400 mt-1">Hosting national level hackathons, symposiums, and robotics conventions.</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-800 group">
            <img src={techPoster} alt="Coding Lab" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="p-4 bg-slate-950">
              <h4 className="font-orbitron font-bold text-sm text-purple-300">High-Tech Infrastructure</h4>
              <p className="font-space text-xs text-slate-400 mt-1">Fiber-optic campus network, smart classrooms, and 24/7 digital libraries.</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-800 group">
            <img src={nontechPoster} alt="Student Clubs" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="p-4 bg-slate-950">
              <h4 className="font-orbitron font-bold text-sm text-pink-300">Clubs & Cultural Clubs</h4>
              <p className="font-space text-xs text-slate-400 mt-1">Active student chapters for IEEE, ISTE, Rotary Club, and Sports Council.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCollege;
