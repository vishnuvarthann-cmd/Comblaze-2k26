import React from 'react';
import { Link } from 'react-router-dom';
import GlitchText from '../components/GlitchText';
import { Home } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 text-center text-slate-100">
      <div className="glass-panel p-10 md:p-16 rounded-3xl border border-pink-500/40 max-w-xl mx-auto space-y-6 shadow-2xl">
        <GlitchText text="404 ERROR" as="h1" className="text-5xl md:text-7xl font-black text-pink-500" color="magenta" />
        <h2 className="font-orbitron font-bold text-xl text-white">
          Cyber Matrix Node Not Found
        </h2>
        <p className="font-space text-sm text-slate-400">
          The page or event coordinate you are attempting to access does not exist in the COMBLAZE2K26 system network.
        </p>
        <div>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-cyan-500 text-black hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,243,255,0.4)]"
          >
            <Home className="w-4 h-4" />
            <span>Return to Cyber Hub</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
