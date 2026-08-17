import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParallaxWrapper from '../components/ParallaxWrapper';
import { searchRegistrations, confirmCheckin, fetchRegistrationById, supabase } from '../lib/supabase';
import { EVENTS } from '../data/eventsData';
import { QrCode, Search, ShieldCheck, CheckCircle2, AlertTriangle, UserCheck, RefreshCw, Phone, Lock, Calendar, Radio, Sparkles, Cpu, KeyRound } from 'lucide-react';

export default function AdminCheckin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');

  const [activeTab, setActiveTab] = useState('scan');
  const [manualQuery, setManualQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [checkinStatus, setCheckinStatus] = useState(null);
  const [processingCheckin, setProcessingCheckin] = useState(false);

  const scannerRef = useRef(null);
  const html5QrcodeScanner = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Supabase Realtime Live Registration Sync
  useEffect(() => {
    if (authenticated) {
      const channel = supabase
        .channel('public:registrations')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'registrations' }, (payload) => {
          if (selectedParticipant && payload.new && payload.new.id === selectedParticipant.id) {
            setSelectedParticipant(payload.new);
          }
          if (manualQuery.trim()) {
            searchRegistrations(manualQuery.trim()).then(setSearchResults);
          }
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [authenticated, selectedParticipant, manualQuery]);

  useEffect(() => {
    if (authenticated && activeTab === 'scan') {
      const timer = setTimeout(() => {
        if (!html5QrcodeScanner.current) {
          html5QrcodeScanner.current = new Html5QrcodeScanner(
            'reader',
            { fps: 10, qrbox: { width: 250, height: 250 } },
            false
          );
          
          html5QrcodeScanner.current.render(onScanSuccess, onScanFailure);
        }
      }, 300);

      return () => {
        clearTimeout(timer);
        if (html5QrcodeScanner.current) {
          html5QrcodeScanner.current.clear().catch(err => console.error(err));
          html5QrcodeScanner.current = null;
        }
      };
    }
  }, [authenticated, activeTab]);

  const onScanSuccess = async (decodedText) => {
    if (!decodedText) return;
    
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}

    await handleLookupParticipant(decodedText.trim());
  };

  const onScanFailure = (error) => {};

  const handleLookupParticipant = async (queryText) => {
    setSearching(true);
    setCheckinStatus(null);

    try {
      const results = await searchRegistrations(queryText);
      setSearchResults(results);

      if (results.length === 1) {
        setSelectedParticipant(results[0]);
      } else if (results.length === 0) {
        const single = await fetchRegistrationById(queryText);
        if (single) {
          setSelectedParticipant(single);
          setSearchResults([single]);
        } else {
          setSelectedParticipant(null);
        }
      } else {
        setSelectedParticipant(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  const handleManualSearch = (e) => {
    e.preventDefault();
    if (manualQuery.trim()) {
      handleLookupParticipant(manualQuery.trim());
    }
  };

  const handleConfirmCheckin = async (participantId) => {
    setProcessingCheckin(true);
    setCheckinStatus(null);

    try {
      const res = await confirmCheckin(participantId);
      setCheckinStatus(res);

      if (res.registration) {
        setSelectedParticipant(res.registration);
      }
    } catch (err) {
      setCheckinStatus({ success: false, error: err.message });
    } finally {
      setProcessingCheckin(false);
    }
  };

  const handlePasskeySubmit = (e) => {
    e.preventDefault();
    if (passkeyInput === 'mamce2026' || passkeyInput === 'admin' || passkeyInput === '1234') {
      setAuthenticated(true);
    } else {
      alert('Invalid Staff Passkey. (Default: mamce2026)');
    }
  };

  if (!authenticated) {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-screen font-sans flex flex-col justify-between relative overflow-hidden">
        <Navbar />

        <ParallaxWrapper speed={0.3} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[200px] pointer-events-none" />

        <main className="pt-32 pb-20 max-w-md mx-auto px-4 w-full flex-1 flex items-center justify-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel-gold rounded-3xl p-8 shadow-2xl w-full text-center space-y-6 border border-amber-500/40 glow-gold-border hud-card"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
              <KeyRound className="w-8 h-8 animate-pulse" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-extrabold text-amber-400 uppercase tracking-widest">
                Staff Authentication Terminal
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-orbitron mt-2">
                Check-In Portal
              </h2>
              <p className="text-xs text-slate-300 mt-1">Enter staff passkey to unlock QR Scanner & Entry Terminal</p>
            </div>

            <form onSubmit={handlePasskeySubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter Passkey (e.g. mamce2026)"
                  value={passkeyInput}
                  onChange={(e) => setPasskeyInput(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-950 border border-amber-500/30 rounded-2xl text-sm text-white focus:outline-none focus:border-amber-400 text-center tracking-widest font-mono shadow-inner placeholder-slate-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Unlock Duty Terminal</span>
              </button>
            </form>

            <button
              onClick={() => setAuthenticated(true)}
              className="text-xs font-mono text-cyan-400 underline hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Demo Staff Access (Instant Unlock)
            </button>
          </motion.div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans flex flex-col justify-between relative overflow-hidden">
      <Navbar />

      <ParallaxWrapper speed={0.2} className="absolute right-10 top-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <main className="pt-28 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 relative z-10">
        
        {/* Terminal Command Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-cyan-500/30 glow-cyan-border shadow-2xl backdrop-blur-2xl"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-extrabold text-amber-400 uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Staff Duty Terminal</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-extrabold text-emerald-400">
                <Radio className="w-3 h-3 animate-pulse" />
                Live Database Sync Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white font-orbitron mt-2">
              Participant QR Entry Terminal
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 shrink-0">
            <button
              onClick={() => setActiveTab('scan')}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'scan'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>Camera Scan</span>
            </button>

            <button
              onClick={() => setActiveTab('manual')}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'manual'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Manual Search</span>
            </button>
          </div>
        </motion.div>

        {/* Status Alerts */}
        <AnimatePresence>
          {checkinStatus && (
            <motion.div 
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15 }}
              className={`mb-6 p-5 rounded-2xl border text-sm font-semibold flex items-start gap-3.5 shadow-2xl ${
                checkinStatus.duplicate
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 glow-gold-border'
                  : checkinStatus.success
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 glow-cyan-border'
                  : 'bg-rose-500/10 border-rose-500/40 text-rose-300'
              }`}
            >
              {checkinStatus.duplicate ? (
                <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5 text-amber-400" />
              ) : (
                <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5 text-emerald-400" />
              )}
              <div>
                <h4 className="font-black text-base font-orbitron">
                  {checkinStatus.duplicate
                    ? 'DUPLICATE ENTRY ALERT'
                    : checkinStatus.success
                    ? 'ENTRY CHECK-IN CONFIRMED'
                    : 'ENTRY VERIFICATION ERROR'}
                </h4>
                <p className="mt-0.5 text-xs opacity-90">{checkinStatus.message}</p>
                {checkinStatus.checked_in_at && (
                  <p className="text-[11px] font-mono mt-1 opacity-75">
                    Check-in Timestamp: {new Date(checkinStatus.checked_in_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: QR Camera / Manual Search Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 glass-panel-luxury hud-card">
            {activeTab === 'scan' ? (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-extrabold text-white font-orbitron flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-cyan-400" />
                    <span>Live QR Camera Scanner</span>
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                    Auto-Detect 10 FPS
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-4">Aim participant ticket QR pass towards camera lens</p>
                
                <div className="overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-950 p-2 min-h-[300px] flex items-center justify-center relative shadow-inner">
                  <div id="reader" className="w-full" ref={scannerRef} />
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-base font-extrabold text-white font-orbitron mb-1 flex items-center gap-2">
                  <Search className="w-5 h-5 text-cyan-400" />
                  <span>Manual Participant Search</span>
                </h3>
                <p className="text-xs text-slate-400 mb-4">Search by Name, Phone Number, or Registration ID code</p>

                <form onSubmit={handleManualSearch} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Name, Phone (+91...), or ID..."
                    value={manualQuery}
                    onChange={(e) => setManualQuery(e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-lg shadow-cyan-500/20"
                  >
                    Lookup
                  </button>
                </form>

                {searchResults.length > 0 && (
                  <div className="mt-5 space-y-2 max-h-64 overflow-y-auto pr-1">
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase block mb-1">Search Results ({searchResults.length} found):</span>
                    {searchResults.map(reg => (
                      <div
                        key={reg.id}
                        onClick={() => setSelectedParticipant(reg)}
                        className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                          selectedParticipant?.id === reg.id
                            ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-lg'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex justify-between font-extrabold">
                          <span>{reg.name}</span>
                          <span className="text-cyan-400 font-mono">{reg.phone}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block mt-1">{reg.college} • {reg.department}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Scanned Participant Record Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between glass-panel-luxury">
            {selectedParticipant ? (
              <div className="space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">Scanned Record</span>
                    <h3 className="text-xl sm:text-2xl font-black text-white font-orbitron">{selectedParticipant.name}</h3>
                  </div>

                  <span className={`px-3 py-1.5 text-xs font-black rounded-full border shadow-md ${
                    selectedParticipant.checked_in
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                      : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                  }`}>
                    {selectedParticipant.checked_in ? 'ALREADY CHECKED IN' : 'READY FOR ENTRY'}
                  </span>
                </div>

                {/* Details Table */}
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                    <span className="text-slate-400">Ref Code ID:</span>
                    <span className="font-mono text-cyan-400 font-extrabold">{selectedParticipant.id.slice(0, 8).toUpperCase()}</span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                    <span className="text-slate-400">Institution:</span>
                    <span className="font-extrabold text-white truncate max-w-[220px]">{selectedParticipant.college}</span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                    <span className="text-slate-400">Department:</span>
                    <span className="font-semibold text-slate-200">{selectedParticipant.department} ({selectedParticipant.year})</span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                    <span className="text-slate-400">Contact Phone:</span>
                    <span className="font-mono text-slate-200 font-bold">{selectedParticipant.phone}</span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                    <span className="text-slate-400">Payment Status:</span>
                    <span className="font-extrabold text-emerald-400 uppercase">
                      {selectedParticipant.payment_status || 'PAID'} (₹250 Pass)
                    </span>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-inner">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase block mb-1">Registered Events</span>
                    <p className="font-extrabold text-white text-xs sm:text-sm">
                      {EVENTS.filter(e => selectedParticipant.event_ids && selectedParticipant.event_ids.includes(e.id)).map(e => e.name).join(' & ') || '2 Registered Events'}
                    </p>
                  </div>
                </div>

                {/* Entry Confirmation Action Button */}
                <button
                  onClick={() => handleConfirmCheckin(selectedParticipant.id)}
                  disabled={processingCheckin}
                  className={`w-full py-4 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-2xl flex items-center justify-center gap-2 cursor-pointer ${
                    selectedParticipant.checked_in
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/20'
                  }`}
                >
                  <UserCheck className="w-5 h-5" />
                  <span>
                    {processingCheckin
                      ? 'Updating Entry Record...'
                      : selectedParticipant.checked_in
                      ? 'Re-Confirm Duplicate Check-In'
                      : 'Confirm Campus Entry Check-In'}
                  </span>
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-4 min-h-[300px]">
                <div className="w-16 h-16 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-500 shadow-inner">
                  <QrCode className="w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-300 font-orbitron">No Record Selected</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">Scan a QR code or use manual search to load participant entry record.</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
