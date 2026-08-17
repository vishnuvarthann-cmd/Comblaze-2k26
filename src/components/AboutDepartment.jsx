import React from 'react';
import { Cpu, Code, Database, Server, Terminal, Sparkles } from 'lucide-react';
import ParallaxWrapper from './ParallaxWrapper';

export default function AboutDepartment() {
  return (
    <section className="py-20 bg-transparent relative overflow-hidden border-t border-slate-800/60">
      
      <ParallaxWrapper speed={0.2} className="absolute left-10 top-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Department of CSE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white font-orbitron">
            Computer Science & Engineering
          </h2>
          <p className="text-slate-300 text-base mt-3">
            Pioneering excellence in software engineering, artificial intelligence, cloud computing, and cyber security education.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Terminal,
              title: "State-of-the-Art Labs",
              desc: "High-performance computing hardware, high-speed fiber internet, and specialized AI/ML workbenches."
            },
            {
              icon: Code,
              title: "Coding Culture",
              desc: "Active competitive programming club, regular hackathons, open-source workshops, and web bootcamps."
            },
            {
              icon: Database,
              title: "Research & Development",
              desc: "Faculty and student publications in indexed Scopus & IEEE journals with patent filings."
            },
            {
              icon: Server,
              title: "High Placement Record",
              desc: "Top placement offers from premier tech MNCs including TCS, Infosys, Wipro, Zoho, and Accenture."
            }
          ].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-panel-luxury border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 shadow-xl group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-orbitron">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
