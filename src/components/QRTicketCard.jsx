import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, Printer, CheckCircle, Ticket, Calendar, MapPin, Sparkles } from 'lucide-react';
import { SYMPOSIUM_INFO } from '../data/eventsData';

export default function QRTicketCard({ registration, events = [] }) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const ticketRef = useRef(null);

  useEffect(() => {
    if (registration && registration.id) {
      // Encode strictly the registration ID
      QRCode.toDataURL(registration.id, {
        width: 300,
        margin: 1,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      })
        .then(url => setQrDataUrl(url))
        .catch(err => console.error('QR generation error:', err));
    }
  }, [registration]);

  const handlePrint = () => {
    window.print();
  };

  if (!registration) return null;

  const eventCount = events.length > 0
    ? events.length
    : (registration.event_ids ? registration.event_ids.length : (registration.event_names ? registration.event_names.length : 1));

  const displayEvents = events.length > 0
    ? events.map(e => e.name).join(' & ')
    : (registration.event_names && registration.event_names.length > 0 ? registration.event_names.join(' & ') : 'Registered Event');

  const refCode = (registration.id || 'COMBLAZE').slice(0, 8).toUpperCase();

  return (
    <div className="max-w-xl mx-auto my-6">
      
      {/* Printable Ticket Card */}
      <div
        ref={ticketRef}
        className="print-ticket-card bg-slate-900 border-2 border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl relative text-slate-100 p-6 sm:p-8 border-dashed"
      >
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6">
          <div>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block">
              Official Symposium Ticket Pass
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {SYMPOSIUM_INFO.name}
            </h2>
            <p className="text-xs text-slate-400">
              M.A.M. College of Engineering, Siruganur, Trichy
            </p>
          </div>

          <div className="text-right">
            <span className="px-3 py-1 text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full inline-flex items-center gap-1 print-badge">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>CONFIRMED</span>
            </span>
            <p className="text-[10px] text-slate-400 font-mono mt-1">
              Ref: <strong className="text-cyan-400">{refCode}</strong>
            </p>
          </div>
        </div>

        {/* Middle Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          
          {/* Left Details */}
          <div className="sm:col-span-2 space-y-3 text-xs sm:text-sm">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Participant Name</span>
              <p className="font-extrabold text-white text-base sm:text-lg">{registration.name}</p>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Institution & Department</span>
              <p className="font-medium text-slate-200">{registration.college}</p>
              <p className="text-xs text-slate-400">{registration.department} ({registration.year} Year)</p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-0.5">
                Registered {eventCount} {eventCount === 1 ? 'Event' : 'Events'} (Flat ₹250)
              </span>
              <p className="font-bold text-white text-xs sm:text-sm leading-snug">
                {displayEvents}
              </p>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                {SYMPOSIUM_INFO.date}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                Siruganur, Trichy
              </span>
            </div>
          </div>

          {/* Right QR Code */}
          <div className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl border border-slate-700 shadow-inner">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt={`QR Ticket for ${registration.name}`}
                className="w-32 h-32 object-contain"
              />
            ) : (
              <div className="w-32 h-32 bg-slate-200 animate-pulse rounded-lg flex items-center justify-center text-slate-400 text-xs">
                Generating QR...
              </div>
            )}
            <span className="text-[9px] font-mono text-slate-700 mt-1 font-bold">
              SCAN AT ENTRY
            </span>
          </div>

        </div>

        {/* Footer info */}
        <div className="mt-6 border-t border-slate-800/80 pt-4 flex items-center justify-between text-[10px] text-slate-400">
          <span>Amount Paid: ₹250.00</span>
          <span>Contact: +91 98424 12345</span>
        </div>

      </div>

      {/* Action Buttons (Hidden during print) */}
      <div className="flex items-center justify-center gap-4 mt-4 print-hide no-print">
        <button
          onClick={handlePrint}
          className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors flex items-center gap-2 border border-slate-700 shadow-lg"
        >
          <Printer className="w-4 h-4 text-cyan-400" />
          <span>Print / Save Pass as PDF</span>
        </button>
      </div>

    </div>
  );
}
