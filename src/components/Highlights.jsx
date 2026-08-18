import React from 'react';
import { Trophy, Award, Utensils, Gift, Lightbulb, ShieldCheck } from 'lucide-react';
import ParallaxWrapper from './ParallaxWrapper';

export default function Highlights() {
  const highlightsList = [
    {
      icon: Trophy,
      title: "₹10,000+ Prize Pool",
      desc: "Cash prizes, championship trophies, and merit certificates for top winners across all 7 events.",
      color: "text-amber-400 border-amber-500/30 bg-amber-500/10"
    },
    {
      icon: Award,
      title: "Verified Certificates",
      desc: "Every registered participant receives an official, hard-copy Anna University affiliated participation certificate.",
      color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10"
    },
    {
      icon: Utensils,
      title: "Free Buffet Lunch",
      desc: "Complimentary delicious breakfast, tea snacks, and hot buffet lunch included with your ₹250 registration pass.",
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
    },
    {
      icon: Gift,
      title: "Welcome Event Kit",
      desc: "Exclusive symposium kit bag containing customized notepad, pen, ID badge, and event schedule guide.",
      color: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10"
    },
    {
      icon: Lightbulb,
      title: "Expert Mentorship",
      desc: "Interact with senior faculty professors, industry experts, and collegiate coding pioneers.",
      color: "text-purple-400 border-purple-500/30 bg-purple-500/10"
    },
    {
      icon: ShieldCheck,
      title: "Instant QR Check-in",
      desc: "Fast, contactless QR ticketing and staff check-in at campus gate for hassle-free entry.",
      color: "text-sky-400 border-sky-500/30 bg-sky-500/10"
    }
  ];

  return (
    <section id="highlights" className="py-24 bg-transparent relative overflow-hidden border-t border-slate-900/60">
      
      <ParallaxWrapper speed={0.3} className="absolute left-10 bottom-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">
            <Gift className="w-3.5 h-3.5" />
            <span>Key Benefits</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-orbitron">
            Symposium Highlights
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            What every participant gets with their ₹250 flat pass
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlightsList.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-panel-luxury border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 shadow-xl group hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${item.color} group-hover:scale-110 transition-transform`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-orbitron">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
