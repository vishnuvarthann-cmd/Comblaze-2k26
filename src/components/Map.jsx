import React from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { SYMPOSIUM_CONFIG } from '../data/config';

export const Map = () => {
  return (
    <div className="w-full max-w-5xl mx-auto my-8">
      <div className="glass-panel p-4 md:p-6 rounded-2xl border border-cyan-500/30 relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.7)]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 mb-1">
              <MapPin className="w-5 h-5" />
              <span className="font-orbitron text-xs font-bold uppercase tracking-widest">
                Symposium Venue Location
              </span>
            </div>
            <h3 className="font-orbitron font-extrabold text-xl md:text-2xl text-white">
              {SYMPOSIUM_CONFIG.collegeName}
            </h3>
            <p className="font-space text-sm text-slate-400 mt-0.5">
              {SYMPOSIUM_CONFIG.venueLocation}
            </p>
          </div>

          <a
            href={SYMPOSIUM_CONFIG.googleMapsDirectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-cyan-950/80 border border-cyan-400 text-cyan-300 font-orbitron font-bold text-xs uppercase tracking-wider hover:bg-cyan-500 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,243,255,0.3)]"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Directions</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Embedded Google Map */}
        <div className="w-full h-72 md:h-96 rounded-xl overflow-hidden border border-slate-800 relative">
          <iframe
            title="MAMCE Location Map"
            src={SYMPOSIUM_CONFIG.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(120%)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default Map;
