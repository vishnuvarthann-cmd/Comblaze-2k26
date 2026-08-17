import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, Compass } from 'lucide-react';
import { SYMPOSIUM_INFO } from '../data/eventsData';
import { SYMPOSIUM_CONFIG } from '../data/config';

export default function ContactMap() {
  return (
    <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Campus Location</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-orbitron">
            Venue & Contact Us
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            M.A.M. College of Engineering, Trichy-Chennai Trunk Road, Siruganur, Tiruchirappalli, Tamil Nadu 621105
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          
          {/* Contact Details (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-orbitron">College Address</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {SYMPOSIUM_INFO.location}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-orbitron">Direct Contacts</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Faculty Convener: +91 98424 12345 <br />
                  Student Lead: +91 97890 12345
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-orbitron">Official Email</h4>
                <p className="text-xs text-slate-300 mt-1">
                  comblaze2k26@mamce.org / hod.cse@mamce.org
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-orbitron">Symposium Date & Time</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Thursday, September 10, 2026 • 08:30 AM to 04:30 PM
                </p>
              </div>
            </div>

          </div>

          {/* Interactive Google Map Embed (3 cols) */}
          <div className="lg:col-span-3 min-h-[350px] rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl relative glow-cyan-border">
            <iframe
              title="M.A.M. College of Engineering Map Location"
              src={SYMPOSIUM_CONFIG.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full min-h-[350px] filter contrast-125 transition-all duration-500"
            />
            
            <div className="absolute top-4 right-4 z-20">
              <a
                href={SYMPOSIUM_CONFIG.googleMapsDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-950/90 border border-cyan-500/40 hover:border-cyan-400 text-xs font-bold text-white rounded-xl shadow-lg backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
