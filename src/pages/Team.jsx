import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParallaxWrapper from '../components/ParallaxWrapper';
import { ORGANIZING_COMMITTEE } from '../data/eventsData';
import { fetchOrganizingCommittee, supabase } from '../lib/supabase';
import { Users, Award, GraduationCap, Phone, UserCheck, ShieldCheck, Mail, Sparkles } from 'lucide-react';

export default function Team() {
  const [committee, setCommittee] = useState(ORGANIZING_COMMITTEE);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchOrganizingCommittee().then(data => {
      if (data) setCommittee(data);
    });

    const channel = supabase
      .channel('public:organizing_committee')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'organizing_committee' }, () => {
        fetchOrganizingCommittee().then(updated => {
          if (updated) setCommittee(updated);
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const chiefGuests = committee.chiefGuests || [];
  const patrons = committee.patrons || [];
  const conveners = committee.conveners || [];
  const coordinators = committee.coordinators || [];
  const studentLeads = committee.studentLeads || [];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans flex flex-col justify-between relative overflow-hidden">
      <Navbar />

      {/* Decorative Background Lighting */}
      <ParallaxWrapper speed={0.3} className="absolute left-[-10%] top-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />
      <ParallaxWrapper speed={0.4} className="absolute right-[-10%] bottom-1/3 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[180px] pointer-events-none" />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-black text-cyan-400 uppercase tracking-widest">
            Leadership & Committee
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-3 font-orbitron">
            Organizing Committee
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            The visionary patrons, faculty mentors, and student leaders behind COMBLAZE 2K26.
          </p>
        </div>

        {/* Chief Guests */}
        {chiefGuests.length > 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-mono font-black text-amber-400 uppercase tracking-widest">HONOURED GUEST OF HONOUR</span>
              <h2 className="text-xl sm:text-3xl font-black text-white font-orbitron mt-1">Chief Guest</h2>
            </div>

            <div className="max-w-3xl mx-auto">
              {chiefGuests.map((guest, idx) => (
                <div key={idx} className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-cyan-950/40 border-2 border-amber-500/40 text-center shadow-2xl glow-gold-border glass-panel-luxury relative overflow-hidden">
                  <div className="w-20 h-20 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 mx-auto mb-4 shadow-xl shadow-amber-500/25">
                    <Sparkles className="w-10 h-10" />
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs font-extrabold text-amber-300 uppercase tracking-widest inline-block mb-3">
                    Inaugural Keynote Speaker
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-orbitron">{guest.name}</h3>
                  <p className="text-sm font-bold text-amber-300 uppercase tracking-wider mt-1">{guest.role}</p>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 font-medium max-w-xl mx-auto">{guest.department}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chief Patrons */}
        {patrons.length > 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-mono font-black text-cyan-400 uppercase tracking-widest">PATRON LEADERSHIP</span>
              <h2 className="text-xl sm:text-2xl font-black text-white font-orbitron mt-1">Chief Patrons</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {patrons.map((patron, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/30 text-center shadow-2xl hover:border-cyan-400 transition-all duration-300 glass-panel-luxury hud-card">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4 shadow-lg shadow-amber-500/20">
                    <Award className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-black text-white font-orbitron">{patron.name}</h3>
                  <p className="text-xs font-bold text-amber-300 uppercase tracking-wider mt-1">{patron.role}</p>
                  <p className="text-xs text-slate-400 mt-1 font-medium">{patron.department}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Convener */}
        {conveners.length > 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-mono font-black text-cyan-400 uppercase tracking-widest">FACULTY CONVENER</span>
              <h2 className="text-xl sm:text-2xl font-black text-white font-orbitron mt-1">Symposium Convener</h2>
            </div>

            <div className="max-w-2xl mx-auto p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-cyan-500/40 text-center shadow-2xl glow-cyan-border glass-panel-luxury hud-card">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mx-auto mb-4 shadow-lg shadow-cyan-500/20">
                <GraduationCap className="w-8 h-8" />
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[10px] font-black uppercase tracking-widest">
                DEPARTMENT HEAD
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-orbitron mt-2">{conveners[0].name}</h3>
              <p className="text-sm font-bold text-cyan-300 mt-1">{conveners[0].role}</p>
              <p className="text-xs text-slate-400 mt-0.5">{conveners[0].department}</p>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-6 pt-4 border-t border-slate-800">
                {conveners[0].phone && (
                  <a href={`tel:${conveners[0].phone}`} className="text-xs font-bold text-slate-200 hover:text-cyan-400 flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 transition-colors cursor-pointer">
                    <Phone className="w-4 h-4 text-cyan-400" />
                    <span>{conveners[0].phone}</span>
                  </a>
                )}
                {conveners[0].email && (
                  <a href={`mailto:${conveners[0].email}`} className="text-xs font-bold text-slate-200 hover:text-purple-400 flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 transition-colors cursor-pointer">
                    <Mail className="w-4 h-4 text-purple-400" />
                    <span>{conveners[0].email}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Faculty Coordinators */}
        {coordinators.length > 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-mono font-black text-purple-400 uppercase tracking-widest">FACULTY MENTORS</span>
              <h2 className="text-xl sm:text-2xl font-black text-white font-orbitron mt-1">Faculty Staff Coordinators</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {coordinators.map((item, idx) => (
                <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 text-center shadow-2xl hover:border-purple-500/40 transition-all duration-300 glass-panel-luxury">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto mb-3">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-black text-white font-orbitron">{item.name}</h4>
                  <p className="text-xs font-bold text-purple-300 mt-1">{item.role}</p>
                  <p className="text-xs text-slate-400 mb-4">{item.department}</p>
                  {item.phone && (
                    <a href={`tel:${item.phone}`} className="inline-flex items-center gap-2 text-xs text-slate-200 hover:text-cyan-400 font-bold bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 transition-colors cursor-pointer">
                      <Phone className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.phone}</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Student Coordinators */}
        {studentLeads.length > 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-mono font-black text-amber-400 uppercase tracking-widest">STUDENT EXECUTIVE TEAM</span>
              <h2 className="text-xl sm:text-2xl font-black text-white font-orbitron mt-1">Student Executive Committee</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {studentLeads.map((lead, idx) => (
                <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 text-center shadow-2xl hover:border-amber-500/40 transition-all duration-300 glass-panel-luxury">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-3">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-black text-amber-400 uppercase tracking-widest block mb-1">{lead.role}</span>
                  <h4 className="text-xl font-black text-white font-orbitron">{lead.name}</h4>
                  <p className="text-xs text-slate-400 mb-4">{lead.year || 'Department of CSE'}</p>
                  {lead.phone && (
                    <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-2 text-xs text-slate-200 hover:text-cyan-400 font-bold bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 transition-colors cursor-pointer">
                      <Phone className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{lead.phone}</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
