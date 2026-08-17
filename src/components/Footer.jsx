import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { SYMPOSIUM_INFO } from '../data/eventsData';

export default function Footer() {
  return (
    <footer className="relative z-30 bg-[#02040a] border-t border-slate-900 text-slate-400 text-xs sm:text-sm py-12 print-hide no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Branding */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-sm">
                M
              </div>
              <span className="font-extrabold text-lg text-white tracking-wider font-orbitron">
                {SYMPOSIUM_INFO.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              National Level Technical Symposium organized by the Department of Computer Science & Engineering, M.A.M. College of Engineering, Siruganur, Tiruchirappalli.
            </p>
            <p className="text-[11px] text-cyan-400 font-semibold">
              Flat Fee ₹250 per participant for 2 events.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider font-orbitron">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home Landing</Link></li>
              <li><Link to="/events" className="hover:text-cyan-400 transition-colors">Events Catalog (7 Events)</Link></li>
              <li><Link to="/register" className="hover:text-cyan-400 transition-colors">Registration Form</Link></li>
              <li><Link to="/team" className="hover:text-cyan-400 transition-colors">Organizing Committee</Link></li>
            </ul>
          </div>

          {/* Col 3: Staff & Admin */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider font-orbitron">Administration</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/admin/checkin" className="hover:text-amber-400 transition-colors flex items-center gap-1 text-amber-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Staff Check-In Scanner
                </Link>
              </li>
              <li className="text-slate-500">Siruganur, Trichy - 621105</li>
              <li className="text-slate-500">comblaze2k26@mamce.org</li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-900/90 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Department of CSE, M.A.M. College of Engineering. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with React, Vite, Tailwind CSS, GSAP & Supabase
          </p>
        </div>

      </div>
    </footer>
  );
}
