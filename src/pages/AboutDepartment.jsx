import React from 'react';
import { Cpu, Award, BookOpen, Layers, ShieldCheck, CheckCircle } from 'lucide-react';
import { SYMPOSIUM_CONFIG } from '../data/config';

export const AboutDepartment = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto text-slate-100 space-y-12">
      {/* Header */}
      <div className="glass-panel p-8 md:p-12 rounded-3xl border border-cyan-500/40 text-center md:text-left relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-orbitron text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-400/30">
              Department Profile
            </span>
            <h1 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-white mt-3">
              Department of <span className="text-cyan-400">Computer Science & Engineering</span>
            </h1>
            <p className="font-space text-slate-300 max-w-2xl mt-3">
              Empowering future tech leaders through cutting-edge computer science education, practical software engineering, cloud computing, and AI research.
            </p>
          </div>
          <div className="w-20 h-20 rounded-2xl bg-cyan-950/80 border border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_30px_rgba(0,243,255,0.4)] flex-shrink-0">
            <Cpu className="w-10 h-10" />
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30">
          <div className="flex items-center space-x-3 text-cyan-400 mb-4">
            <ShieldCheck className="w-6 h-6" />
            <h3 className="font-orbitron font-extrabold text-xl text-white">Our Vision</h3>
          </div>
          <p className="font-space text-slate-300 leading-relaxed text-sm">
            To be recognized as a premier department of learning and innovation in Computer Science & Engineering, producing globally competent professionals equipped with creative intelligence, research inclination, and societal integrity.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-purple-500/30">
          <div className="flex items-center space-x-3 text-purple-400 mb-4">
            <Award className="w-6 h-6" />
            <h3 className="font-orbitron font-extrabold text-xl text-white">Our Mission</h3>
          </div>
          <ul className="space-y-2 font-space text-xs sm:text-sm text-slate-300">
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-1" />
              <span>Deliver high-caliber academic programs with state-of-the-art laboratory infrastructure.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-1" />
              <span>Foster industry-institute collaboration for real-world project exposure and placements.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-1" />
              <span>Encourage innovation, entrepreneurship, research publications, and ethical engineering values.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Labs & Infrastructure */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800">
        <h3 className="font-orbitron font-extrabold text-2xl text-white mb-6">
          Laboratories & Research Infrastructure
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
            <BookOpen className="w-6 h-6 text-cyan-400 mb-2" />
            <h4 className="font-orbitron font-bold text-base text-white">AI & Machine Learning Lab</h4>
            <p className="font-space text-xs text-slate-400 mt-1">High-performance GPU servers for deep learning, vision models, and neural architecture experimentation.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
            <Layers className="w-6 h-6 text-purple-400 mb-2" />
            <h4 className="font-orbitron font-bold text-base text-white">Cloud Computing & DevOps Lab</h4>
            <p className="font-space text-xs text-slate-400 mt-1">Dedicated cloud environments for containerization, Kubernetes cluster management, and microservices.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
            <Cpu className="w-6 h-6 text-pink-400 mb-2" />
            <h4 className="font-orbitron font-bold text-base text-white">Cyber Security & IoT Center</h4>
            <p className="font-space text-xs text-slate-400 mt-1">Advanced penetration testing toolkits, embedded microcontrollers, and wireless sensor nodes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDepartment;
