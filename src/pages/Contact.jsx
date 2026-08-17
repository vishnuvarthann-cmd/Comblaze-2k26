import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, User } from 'lucide-react';
import { COORDINATORS_DATA } from '../data/coordinators';
import { SYMPOSIUM_CONFIG } from '../data/config';
import Map from '../components/Map';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto text-slate-100 space-y-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase font-orbitron font-bold tracking-widest text-cyan-400 bg-cyan-950/60 px-4 py-1.5 rounded-full border border-cyan-500/30">
          Get In Touch
        </span>
        <h1 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-white pt-2">
          Contact & <span className="text-cyan-400 neon-text-cyan">Coordinators</span>
        </h1>
        <p className="font-space text-slate-400 max-w-xl mx-auto text-sm">
          Have questions regarding COMBLAZE2K26 events, accommodations, or rules? Reach out to our convener and coordinator team.
        </p>
      </div>

      {/* Coordinators Section */}
      <div className="space-y-6">
        <h3 className="font-orbitron font-extrabold text-2xl text-white text-center md:text-left">
          Symposium Committee Leaders
        </h3>

        {/* Convener Card */}
        <div className="glass-panel p-6 rounded-2xl border border-cyan-400/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-400 font-orbitron font-bold text-lg">
              HOD
            </div>
            <div>
              <span className="font-orbitron font-bold text-xs uppercase text-cyan-400">
                {COORDINATORS_DATA.convener.role}
              </span>
              <h4 className="font-orbitron font-extrabold text-xl text-white">
                {COORDINATORS_DATA.convener.name}
              </h4>
              <p className="font-space text-xs text-slate-400">
                {COORDINATORS_DATA.convener.department}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 font-space text-xs text-slate-300">
            <a href={`tel:${COORDINATORS_DATA.convener.phone}`} className="flex items-center space-x-1 hover:text-cyan-400">
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>{COORDINATORS_DATA.convener.phone}</span>
            </a>
            <a href={`mailto:${COORDINATORS_DATA.convener.email}`} className="flex items-center space-x-1 hover:text-purple-400">
              <Mail className="w-4 h-4 text-purple-400" />
              <span>{COORDINATORS_DATA.convener.email}</span>
            </a>
          </div>
        </div>

        {/* Student Coordinators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COORDINATORS_DATA.studentCoordinators.map((coord, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
              <User className="w-6 h-6 text-pink-400" />
              <span className="font-orbitron font-bold text-[10px] uppercase text-pink-400 block">
                {coord.role}
              </span>
              <h4 className="font-orbitron font-bold text-base text-white">{coord.name}</h4>
              <p className="font-space text-xs text-slate-400">{coord.yearDept}</p>
              <div className="pt-2 border-t border-slate-900 font-space text-xs text-slate-300 space-y-1">
                <p><Phone className="w-3 h-3 text-cyan-400 inline mr-1" />{coord.phone}</p>
                <p><Mail className="w-3 h-3 text-purple-400 inline mr-1" />{coord.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inquiry Form & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 glass-panel p-6 md:p-8 rounded-3xl border border-slate-800">
          <h3 className="font-orbitron font-extrabold text-xl text-white mb-4">
            Send Us A Message
          </h3>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-cyan-950/60 border border-cyan-400/50 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-cyan-400 mx-auto" />
              <h4 className="font-orbitron font-bold text-lg text-white">Message Sent!</h4>
              <p className="font-space text-xs text-slate-300">
                Thank you for reaching out. Our coordinator team will respond shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-space text-sm">
              <div>
                <label className="block text-xs font-rajdhani font-semibold uppercase text-slate-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-rajdhani font-semibold uppercase text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-rajdhani font-semibold uppercase text-slate-300 mb-1">
                  Message / Query
                </label>
                <textarea
                  rows="4"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Type your question or query..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-orbitron font-bold text-xs uppercase bg-cyan-500 text-black hover:bg-cyan-400 transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 space-y-4">
            <h3 className="font-orbitron font-extrabold text-xl text-white">
              Campus Location
            </h3>
            <p className="font-space text-xs text-slate-300">
              {SYMPOSIUM_CONFIG.collegeName}, Siruganur, Tiruchirappalli, Tamil Nadu 621105.
            </p>
            <div className="pt-2">
              <a
                href={SYMPOSIUM_CONFIG.googleMapsDirectLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 text-cyan-400 font-orbitron text-xs font-bold uppercase hover:text-white"
              >
                <span>Open Location in Google Maps</span>
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
