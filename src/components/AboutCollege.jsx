import React from 'react';
import { Building2, Award, Globe, ShieldCheck } from 'lucide-react';
import ParallaxWrapper from './ParallaxWrapper';

export default function AboutCollege() {
  return (
    <section id="about" className="py-20 bg-transparent relative overflow-hidden border-t border-slate-900/60">
      
      {/* Background Glow */}
      <ParallaxWrapper speed={0.3} className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Column */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4">
              <Building2 className="w-3.5 h-3.5" />
              <span>About Institution</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight font-orbitron">
              M.A.M. College of Engineering <br />
              <span className="text-cyan-400">Siruganur, Tiruchirappalli</span>
            </h2>

            <p className="text-slate-300 text-base leading-relaxed mb-4">
              Established in 1999, M.A.M. College of Engineering (MAMCE) is a premier institution located in Siruganur on the Trichy-Chennai National Highway. Approved by AICTE, New Delhi and affiliated with Anna University, Chennai, MAMCE has been imparting quality technical education for over two decades.
            </p>

            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Spread across a lush, eco-friendly green campus with modern laboratory infrastructure, world-class library resources, and dedicated research facilities, the college is committed to producing industry-ready engineers with sound moral values.
            </p>

            {/* Key Badges Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl glass-panel-luxury border border-slate-800 flex items-start gap-3">
                <Award className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">NAAC & AICTE Approved</h4>
                  <p className="text-xs text-slate-400">Recognized technical excellence</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-panel-luxury border border-slate-800 flex items-start gap-3">
                <Globe className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Anna University</h4>
                  <p className="text-xs text-slate-400">Affiliated premier curriculum</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image / Card Grid */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80"
                alt="MAMCE College Campus"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">25+ Years Legacy</span>
                <h3 className="text-xl font-bold text-white mt-1 font-orbitron">Empowering Future Innovators in Tiruchirappalli</h3>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
