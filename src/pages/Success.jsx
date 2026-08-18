import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import QRTicketCard from '../components/QRTicketCard';
import { fetchRegistrationById, fetchEvents } from '../lib/supabase';
import { sendConfirmationEmailDirect } from '../lib/resend';
import { EVENTS } from '../data/eventsData';
import { CheckCircle2, Mail, Ticket, ArrowLeft, Sparkles, Home, AlertCircle, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Success() {
  const [searchParams] = useSearchParams();
  const registrationId = searchParams.get('id');
  const [registration, setRegistration] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailStatus, setEmailStatus] = useState({ sending: false, sent: false, error: null, warning: null });

  useEffect(() => {
    window.scrollTo(0, 0);

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (registrationId) {
      Promise.all([
        fetchRegistrationById(registrationId),
        fetchEvents()
      ])
        .then(async ([data, liveEvents]) => {
          if (data) {
            setRegistration(data);
            const eventsList = (liveEvents && liveEvents.length > 0) ? liveEvents : EVENTS;
            const matchedEvents = eventsList.filter(e => data.event_ids && data.event_ids.includes(e.id));
            setRegisteredEvents(matchedEvents);

            // Email is dispatched once upon successful payment completion in markRegistrationPaid
            setEmailStatus({ sending: false, sent: true, error: null, warning: null });
          }
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [registrationId]);

  const handleResendClick = async () => {
    if (!registration) return;
    setEmailStatus({ sending: true, sent: false, error: null, warning: null });
    const emailRes = await sendConfirmationEmailDirect({
      registration,
      eventNames: registeredEvents.map(e => e.name)
    });
    if (emailRes.success) {
      setEmailStatus({ sending: false, sent: true, error: null, warning: null });
    } else {
      if (emailRes.error && emailRes.error.includes('11csh2vishnuvarthan.n@gmail.com')) {
        setEmailStatus({
          sending: false,
          sent: false,
          error: null,
          warning: `Resend Trial Restriction: Resend API limits free testing emails to your Resend account email (11csh2vishnuvarthan.n@gmail.com).`
        });
      } else {
        setEmailStatus({ sending: false, sent: false, error: emailRes.error, warning: null });
      }
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 relative z-10">
        
        {/* Header Success Badge (Hidden during print) */}
        <div className="text-center max-w-2xl mx-auto mb-8 print-hide no-print">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-500/10">
            <CheckCircle2 className="w-10 h-10 animate-bounce-slow" />
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400 uppercase tracking-widest">
            Registration Confirmed
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mt-3">
            Payment Successful!
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Your spot for COMBLAZE 2K26 is locked in. Below is your official entry ticket pass.
          </p>
        </div>

        {/* Email Dispatch & Spam Folder Instruction Box (Hidden during print) */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 text-xs sm:text-sm text-slate-300 print-hide no-print relative z-20 shadow-xl hud-card">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-white text-sm">Confirmation Email Sent</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
                    {registration?.email || 'Registered Email'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  A digital pass copy has been sent. If you don't see it in your main inbox, please check your <strong className="text-amber-300 font-extrabold underline decoration-amber-500/50">Spam, Junk, or Promotions folder</strong> and mark it as <em>"Not Spam"</em>.
                </p>

                {emailStatus.sending && (
                  <span className="text-cyan-400 text-xs font-semibold animate-pulse block">
                    Resending confirmation email via Resend API...
                  </span>
                )}
                {emailStatus.sent && (
                  <span className="text-emerald-400 text-xs font-bold block">
                    ✓ Email confirmation active & dispatched to {registration?.email}!
                  </span>
                )}
                {emailStatus.warning && (
                  <span className="text-amber-400 text-xs font-semibold block">
                    ⚠️ {emailStatus.warning}
                  </span>
                )}
                {emailStatus.error && (
                  <span className="text-rose-400 text-xs font-semibold block">
                    ❌ {emailStatus.error}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleResendClick}
              disabled={emailStatus.sending}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 flex items-center gap-1.5 shrink-0 relative z-30 cursor-pointer self-stretch sm:self-auto justify-center"
            >
              <Send className="w-3.5 h-3.5 text-cyan-400" />
              <span>{emailStatus.sending ? 'Sending...' : 'Resend Email'}</span>
            </button>
          </div>
        </div>

        {/* QR Ticket Component */}
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm bg-slate-900 rounded-3xl border border-slate-800">
            Fetching ticket information...
          </div>
        ) : registration ? (
          <QRTicketCard registration={registration} events={registeredEvents} />
        ) : (
          <div className="p-8 text-center text-slate-400 bg-slate-900 rounded-3xl border border-slate-800">
            Registration record not found. Please verify your reference link.
          </div>
        )}

        {/* Bottom Actions (Hidden during print) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 print-hide no-print relative z-30">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-bold text-xs transition-all flex items-center gap-2 relative z-30 cursor-pointer"
          >
            <Home className="w-4 h-4 text-cyan-400" />
            <span>Return to Home</span>
          </Link>

          <Link
            to="/events"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 relative z-30 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>Explore Other Events</span>
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
