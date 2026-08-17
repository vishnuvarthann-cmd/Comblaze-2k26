import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckSquare, Square, Zap, AlertCircle, Loader2 } from 'lucide-react';
import { EVENTS_DATA } from '../data/events';
import { SYMPOSIUM_CONFIG } from '../data/config';

export const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    department: 'Computer Science & Engineering',
    year: 'III Year',
    collegeId: ''
  });

  const [selectedEventIds, setSelectedEventIds] = useState(['code-clash']);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Calculate total fee automatically
  const selectedEvents = EVENTS_DATA.filter((e) => selectedEventIds.includes(e.id));
  const totalFee = selectedEvents.reduce((sum, e) => sum + e.fee, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleEventToggle = (eventId) => {
    setSelectedEventIds((prev) => {
      if (prev.includes(eventId)) {
        if (prev.length === 1) return prev; // Keep at least one event selected
        return prev.filter((id) => id !== eventId);
      } else {
        return [...prev, eventId];
      }
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Enter valid 10-digit Indian phone number';
    }

    if (!formData.college.trim()) newErrors.college = 'College Name is required';
    if (!formData.collegeId.trim()) newErrors.collegeId = 'College Register ID is required';

    if (selectedEventIds.length === 0) {
      newErrors.events = 'Please select at least one event';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helper to dynamically load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setStatusMessage('INITIALIZING PAYMENT GATEWAY...');

    try {
      // Step 1: Call backend API to create payment order
      const orderRes = await fetch(`${SYMPOSIUM_CONFIG.apiBaseUrl}/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalFee,
          receipt: `rcpt_${Date.now()}`
        })
      }).catch(() => null);

      let orderData = null;
      if (orderRes && orderRes.ok) {
        orderData = await orderRes.json();
      }

      // If backend server is running in live or demo mode
      const isScriptLoaded = await loadRazorpayScript();

      if (isScriptLoaded && orderData && orderData.mode === 'live' && window.Razorpay) {
        // Production Razorpay Flow
        const options = {
          key: orderData.key,
          amount: orderData.amount,
          currency: orderData.currency,
          name: `${SYMPOSIUM_CONFIG.collegeShort} COMBLAZE2K26`,
          description: `Registration for ${selectedEvents.map((e) => e.title).join(', ')}`,
          order_id: orderData.orderId,
          handler: async function (response) {
            setStatusMessage('VERIFYING PAYMENT SIGNATURE...');
            const verifyRes = await fetch(`${SYMPOSIUM_CONFIG.apiBaseUrl}/payment/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                participantDetails: formData,
                selectedEvents: selectedEvents.map((e) => e.title),
                totalAmount: totalFee
              })
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              navigate('/success', { state: { registration: verifyData.registration } });
            } else {
              setErrors({ submit: 'Payment verification failed. Please try again.' });
              setLoading(false);
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone
          },
          theme: {
            color: '#00f3ff'
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function () {
          setErrors({ submit: 'Payment failed or cancelled by user.' });
          setLoading(false);
        });
        rzp.open();
      } else {
        // Fallback Seamless Test / Demo Mode
        setStatusMessage('PROCESSING DEMO REGISTRATION...');
        setTimeout(async () => {
          const verifyRes = await fetch(`${SYMPOSIUM_CONFIG.apiBaseUrl}/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: `order_demo_${Date.now()}`,
              razorpay_payment_id: `pay_demo_${Date.now()}`,
              razorpay_signature: 'demo_signature',
              participantDetails: formData,
              selectedEvents: selectedEvents.map((e) => e.title),
              totalAmount: totalFee
            })
          }).catch(() => null);

          let registrationRecord;
          if (verifyRes && verifyRes.ok) {
            const data = await verifyRes.json();
            registrationRecord = data.registration;
          } else {
            // Local fallback simulation if server is offline
            registrationRecord = {
              registrationId: `COMBLAZE-2K26-${Math.floor(1000 + Math.random() * 9000)}`,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              college: formData.college,
              department: formData.department,
              year: formData.year,
              collegeId: formData.collegeId,
              selectedEvents: selectedEvents.map((e) => e.title),
              totalAmount: totalFee,
              paymentId: `pay_sim_${Date.now()}`,
              orderId: `order_sim_${Date.now()}`,
              paymentStatus: 'SUCCESS',
              registrationDate: new Date().toISOString()
            };
          }

          setLoading(false);
          navigate('/success', { state: { registration: registrationRecord } });
        }, 1200);
      }
    } catch (err) {
      console.error('Registration submit error:', err);
      setErrors({ submit: 'An error occurred during registration. Please check your connection.' });
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel p-6 md:p-10 rounded-3xl border border-cyan-500/40 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
      <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400 flex items-center justify-center text-cyan-400">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-orbitron font-extrabold text-2xl text-white">
            Cyber Registration Portal
          </h2>
          <p className="font-space text-xs text-slate-400">
            Fill in your details and select your events for COMBLAZE2K26
          </p>
        </div>
      </div>

      {errors.submit && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/50 flex items-center space-x-3 text-red-300 font-space text-sm">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <span>{errors.submit}</span>
        </div>
      )}

      <form onSubmit={handlePaymentSubmit} className="space-y-8">
        {/* Section 1: Participant Information */}
        <div>
          <h3 className="font-orbitron font-bold text-sm text-cyan-400 uppercase tracking-widest mb-4 flex items-center space-x-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Participant Information</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="block font-rajdhani font-semibold text-xs text-slate-300 uppercase mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Rahul Sharma"
                className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border ${
                  errors.name ? 'border-red-500' : 'border-slate-800 focus:border-cyan-400'
                } text-white font-space text-sm focus:outline-none transition-all`}
              />
              {errors.name && <p className="text-xs text-red-400 mt-1 font-space">{errors.name}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label className="block font-rajdhani font-semibold text-xs text-slate-300 uppercase mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="e.g. rahul@example.com"
                className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border ${
                  errors.email ? 'border-red-500' : 'border-slate-800 focus:border-cyan-400'
                } text-white font-space text-sm focus:outline-none transition-all`}
              />
              {errors.email && <p className="text-xs text-red-400 mt-1 font-space">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block font-rajdhani font-semibold text-xs text-slate-300 uppercase mb-1">
                Phone Number (WhatsApp) *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g. 9876543210"
                className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border ${
                  errors.phone ? 'border-red-500' : 'border-slate-800 focus:border-cyan-400'
                } text-white font-space text-sm focus:outline-none transition-all`}
              />
              {errors.phone && <p className="text-xs text-red-400 mt-1 font-space">{errors.phone}</p>}
            </div>

            {/* College Name */}
            <div>
              <label className="block font-rajdhani font-semibold text-xs text-slate-300 uppercase mb-1">
                College / Institution Name *
              </label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleInputChange}
                placeholder="e.g. MAM College of Engineering"
                className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border ${
                  errors.college ? 'border-red-500' : 'border-slate-800 focus:border-cyan-400'
                } text-white font-space text-sm focus:outline-none transition-all`}
              />
              {errors.college && <p className="text-xs text-red-400 mt-1 font-space">{errors.college}</p>}
            </div>

            {/* Department */}
            <div>
              <label className="block font-rajdhani font-semibold text-xs text-slate-300 uppercase mb-1">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-cyan-400 text-white font-space text-sm focus:outline-none transition-all"
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Communication">Electronics & Communication</option>
                <option value="Electrical & Electronics">Electrical & Electronics</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Year of Study & College ID */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-rajdhani font-semibold text-xs text-slate-300 uppercase mb-1">
                  Year of Study
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-cyan-400 text-white font-space text-xs md:text-sm focus:outline-none"
                >
                  <option value="I Year">I Year</option>
                  <option value="II Year">II Year</option>
                  <option value="III Year">III Year</option>
                  <option value="IV Year">IV Year</option>
                </select>
              </div>

              <div>
                <label className="block font-rajdhani font-semibold text-xs text-slate-300 uppercase mb-1">
                  College Reg / Roll No *
                </label>
                <input
                  type="text"
                  name="collegeId"
                  value={formData.collegeId}
                  onChange={handleInputChange}
                  placeholder="e.g. 812021104001"
                  className={`w-full px-3 py-2.5 rounded-xl bg-slate-950/90 border ${
                    errors.collegeId ? 'border-red-500' : 'border-slate-800 focus:border-cyan-400'
                  } text-white font-space text-xs md:text-sm focus:outline-none`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Event Selection */}
        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-orbitron font-bold text-sm text-pink-400 uppercase tracking-widest flex items-center space-x-2">
              <Zap className="w-4 h-4 text-pink-400" />
              <span>Select Events To Participate</span>
            </h3>
            <span className="text-xs font-space text-slate-400">
              Multiple events allowed
            </span>
          </div>

          {errors.events && <p className="text-xs text-red-400 mb-3 font-space">{errors.events}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EVENTS_DATA.map((event) => {
              const isSelected = selectedEventIds.includes(event.id);
              const isTech = event.category === 'technical';

              return (
                <div
                  key={event.id}
                  onClick={() => handleEventToggle(event.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? isTech
                        ? 'bg-cyan-950/50 border-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                        : 'bg-pink-950/50 border-pink-400 shadow-[0_0_15px_rgba(255,0,127,0.3)]'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <button type="button" className="text-cyan-400 focus:outline-none">
                      {isSelected ? (
                        <CheckSquare className={`w-5 h-5 ${isTech ? 'text-cyan-400' : 'text-pink-400'}`} />
                      ) : (
                        <Square className="w-5 h-5 text-slate-600" />
                      )}
                    </button>
                    <div>
                      <h4 className="font-orbitron font-bold text-sm text-white">
                        {event.title}
                      </h4>
                      <span className="font-space text-xs text-slate-400">
                        {event.participationType} • {event.category}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-orbitron font-bold text-sm text-cyan-300">
                      ₹{event.fee}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Fee Summary & Razorpay Trigger */}
        <div className="p-6 rounded-2xl bg-slate-950/90 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-rajdhani font-semibold text-xs text-slate-400 uppercase tracking-widest block">
              Total Registration Fee
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="font-orbitron font-extrabold text-3xl text-cyan-400 neon-text-cyan">
                ₹{totalFee}
              </span>
              <span className="font-space text-xs text-slate-400">
                ({selectedEvents.length} Event{selectedEvents.length > 1 ? 's' : ''} Selected)
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-8 py-3.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 text-white shadow-[0_0_25px_rgba(0,243,255,0.5)] hover:shadow-[0_0_40px_rgba(0,243,255,0.8)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>{statusMessage || 'PROCESSING...'}</span>
              </>
            ) : (
              <span>Proceed to Payment</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
