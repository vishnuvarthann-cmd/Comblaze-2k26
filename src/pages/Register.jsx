import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { EVENTS, SYMPOSIUM_INFO } from '../data/eventsData';
import { createRegistration, markRegistrationPaid, fetchEvents } from '../lib/supabase';
import { initiateRazorpayPayment } from '../lib/razorpay';
import { CheckCircle2, Trophy, Users, ShieldAlert, Sparkles, CreditCard, AlertCircle, Plus, Trash2, ArrowRight, Check } from 'lucide-react';

export default function Register() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    college: '',
    department: 'Computer Science & Engineering',
    year: 'III Year',
    phone: '',
    email: ''
  });

  const [eventsList, setEventsList] = useState(EVENTS);
  const [selectedEventIds, setSelectedEventIds] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchEvents().then(liveEvents => {
      if (liveEvents && liveEvents.length > 0) {
        setEventsList(liveEvents);
      }
    });

    const preselectedId = searchParams.get('event');
    if (preselectedId) {
      setSelectedEventIds([preselectedId]);
    }
  }, [searchParams]);

  const toggleEventSelection = (eventId) => {
    setErrorMsg('');
    const targetEvent = eventsList.find(e => e.id === eventId || e.slug === eventId);
    const targetId = targetEvent ? targetEvent.id : eventId;
    const targetSlug = targetEvent ? targetEvent.slug : eventId;

    const isAlreadySelected = selectedEventIds.some(id => id === targetId || id === targetSlug);

    if (isAlreadySelected) {
      setSelectedEventIds(selectedEventIds.filter(id => id !== targetId && id !== targetSlug));
    } else {
      if (selectedEventIds.length >= 2) {
        setErrorMsg('You can select a maximum of 2 events for the ₹250 flat fee.');
        return;
      }
      setSelectedEventIds([...selectedEventIds, targetId]);
    }
  };

  const selectedEventsObjects = eventsList.filter(e => selectedEventIds.some(id => id === e.id || id === e.slug));
  const maxTeamCapacity = Math.max(...selectedEventsObjects.map(e => e.maxTeamSize || 1), 1);
  const requiresTeamInput = maxTeamCapacity > 1;

  const addTeamMember = () => {
    if (teamMembers.length < maxTeamCapacity - 1) {
      setTeamMembers([...teamMembers, { name: '', phone: '', email: '' }]);
    }
  };

  const updateTeamMember = (index, field, value) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    setTeamMembers(updated);
  };

  const removeTeamMember = (index) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.college.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMsg('Please fill in all mandatory contact fields.');
      return;
    }

    if (selectedEventIds.length < 1 || selectedEventIds.length > 2) {
      setErrorMsg('Please select at least 1 event (or up to 2 events) to register.');
      return;
    }

    setLoading(true);

    try {
      const result = await createRegistration({
        ...formData,
        event_ids: selectedEventIds,
        team_members: teamMembers
      });

      const newRegistration = result.registration || result.data;

      if (!result.success || !newRegistration) {
        throw new Error('Failed to record registration details. Please check your network connection.');
      }

      await initiateRazorpayPayment({
        registration: newRegistration,
        onSuccess: async (razorpayResponse) => {
          await markRegistrationPaid(newRegistration.id, razorpayResponse);
          setLoading(false);
          navigate(`/register/success?id=${newRegistration.id}`);
        },
        onCancel: () => {
          setLoading(false);
          setErrorMsg('Payment process was cancelled. Your registration remains pending.');
        },
        onError: (err) => {
          setLoading(false);
          setErrorMsg(`Payment Error: ${err}`);
        }
      });

    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'An error occurred during registration.');
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans flex flex-col justify-between">
      <Navbar />

      <main className="pt-36 sm:pt-44 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 relative z-20">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-10 relative z-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-xs font-black text-cyan-300 uppercase tracking-widest shadow-lg shadow-cyan-500/20 mb-3">
            Registration Form
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-orbitron tracking-wide drop-shadow-md">
            Register for {SYMPOSIUM_INFO.name}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 font-medium">
            Flat Fee: <strong className="text-amber-400 font-black">₹250 per participant</strong> for up to 2 events of your choice!
          </p>
        </motion.div>

        {/* Error Alert */}
        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-sm flex items-center gap-3 shadow-lg"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </motion.div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Participant Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel-luxury rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 hud-card"
          >
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 font-orbitron">
                <Users className="w-5 h-5 text-cyan-400" />
                Participant Information
              </h2>
              <p className="text-xs text-slate-400">Enter primary participant contact information</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. A. Mohamed Rizwan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">College / Institution *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. M.A.M. College of Engineering"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Department</label>
                <input
                  type="text"
                  placeholder="e.g. CSE / IT / ECE / AI&DS"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Year of Study</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="I Year">I Year</option>
                  <option value="II Year">II Year</option>
                  <option value="III Year">III Year</option>
                  <option value="IV Year">IV Year</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">WhatsApp Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. participant@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>
          </motion.div>

          {/* Section 2: Event Selector */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-panel-luxury rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 hud-card"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
              <div>
                <h2 className="text-xl font-extrabold text-white flex items-center gap-2 font-orbitron">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  Select 1 or 2 Events *
                </h2>
                <p className="text-xs text-slate-400">
                  Choose 1 or 2 events of your choice for the flat ₹250 registration fee.
                </p>
              </div>

              <span className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold border self-start ${
                selectedEventIds.length >= 1
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-lg shadow-emerald-500/20'
                  : 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-lg shadow-cyan-500/20'
              }`}>
                {selectedEventIds.length} / 2 Selected (Min 1)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eventsList.map((event) => {
                const isSelected = selectedEventIds.some(id => id === event.id || id === event.slug);
                const isDisabled = !isSelected && selectedEventIds.length >= 2;
                const isTech = event.category === 'technical';

                return (
                  <motion.div
                    key={event.id}
                    whileHover={!isDisabled ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!isDisabled ? { scale: 0.98 } : {}}
                    onClick={() => !isDisabled && toggleEventSelection(event.id)}
                    className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start gap-3 relative ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-950/80 to-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/20 glow-cyan-border'
                        : isDisabled
                        ? 'bg-slate-950/40 border-slate-800/40 opacity-40 cursor-not-allowed'
                        : 'bg-slate-950/80 hover:bg-slate-900 border-slate-800/80 hover:border-cyan-500/40'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border mt-1 transition-colors ${
                      isSelected ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700 bg-slate-900'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                          isTech ? 'bg-cyan-500/10 text-cyan-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {event.category}
                        </span>
                        <span className="text-xs text-amber-400 font-extrabold">{event.prize}</span>
                      </div>

                      <h4 className="font-extrabold text-white text-base mt-1.5 font-orbitron">{event.name}</h4>
                      <p className="text-xs font-semibold text-cyan-300 italic my-0.5">"{event.subtitle}"</p>
                      <p className="text-xs text-slate-400 line-clamp-2">{event.shortDesc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Section 3: Dynamic Team Members */}
          {requiresTeamInput && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel-luxury rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 hud-card"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-white font-orbitron">Team Members (Optional)</h3>
                  <p className="text-xs text-slate-400">Add names of team partners joining your squad</p>
                </div>
                {teamMembers.length < maxTeamCapacity - 1 && (
                  <button
                    type="button"
                    onClick={addTeamMember}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Member</span>
                  </button>
                )}
              </div>

              {teamMembers.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No additional team members added yet.</p>
              ) : (
                <div className="space-y-4">
                  {teamMembers.map((member, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-cyan-400">Team Member #{idx + 2}</span>
                        <button
                          type="button"
                          onClick={() => removeTeamMember(idx)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Member Full Name"
                          value={member.name}
                          onChange={(e) => updateTeamMember(idx, 'name', e.target.value)}
                          className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                        />
                        <input
                          type="tel"
                          placeholder="Member Phone"
                          value={member.phone}
                          onChange={(e) => updateTeamMember(idx, 'phone', e.target.value)}
                          className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Section 4: Fee & Razorpay Checkout Submission */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-panel-gold rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Registration Amount</span>
                <div className="text-3xl sm:text-4xl font-black text-white mt-1 font-orbitron">
                  ₹250.00 <span className="text-xs font-normal text-amber-400">(Flat Fee for up to 2 Events)</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Includes welcome kit, certificates & complimentary buffet lunch.</p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-xl">
                <CreditCard className="w-4 h-4" />
                <span>Razorpay Secured Gateway</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || selectedEventIds.length < 1 || selectedEventIds.length > 2}
              className={`w-full py-4 rounded-2xl font-black text-base text-slate-950 transition-all shadow-2xl flex items-center justify-center gap-3 uppercase tracking-wider ${
                selectedEventIds.length >= 1 && selectedEventIds.length <= 2 && !loading
                  ? 'btn-shimmer-gold shadow-amber-500/30 hover:scale-[1.01] cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <span>Initiating Razorpay Payment...</span>
              ) : (
                <>
                  <span>Pay ₹250 & Confirm Registration ({selectedEventIds.length} Event{selectedEventIds.length > 1 ? 's' : ''})</span>
                  <ArrowRight className="w-5 h-5 text-slate-950" />
                </>
              )}
            </button>
          </motion.div>

        </form>

      </main>

      <Footer />
    </div>
  );
}
