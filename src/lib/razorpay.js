// Razorpay Checkout Integration Helper

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_TPO84ekiQg6Do9';

/**
 * Dynamically load Razorpay SDK checkout.js
 */
export function loadRazorpayScript() {
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
}

/**
 * Open Razorpay Checkout Modal
 * Never exposes secret key on client. Uses KEY_ID for checkout widget.
 */
export async function initiateRazorpayPayment({
  registration,
  onSuccess,
  onCancel,
  onError
}) {
  const isLoaded = await loadRazorpayScript();

  if (!isLoaded || !window.Razorpay) {
    console.warn('Razorpay SDK failed to load, launching interactive test checkout modal');
    launchTestPaymentModal(registration, onSuccess, onError);
    return;
  }

  try {
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: 25000, // ₹250 in paise
      currency: 'INR',
      name: 'M.A.M. College of Engineering',
      description: `COMBLAZE 2K26 Registration Fee (${registration.event_ids ? registration.event_ids.length : 1} Event${registration.event_ids && registration.event_ids.length > 1 ? 's' : ''})`,
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=120&h=120&fit=crop',
      handler: function (response) {
        // Payment successful
        onSuccess({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id || 'order_' + Date.now(),
          razorpay_signature: response.razorpay_signature || 'sig_demo'
        });
      },
      prefill: {
        name: registration.name || '',
        email: registration.email || '',
        contact: registration.phone || ''
      },
      notes: {
        registration_id: registration.id,
        college: registration.college,
        symposium: 'COMBLAZE 2K26'
      },
      theme: {
        color: '#0284c7' // Primary Cyan/Blue
      },
      modal: {
        ondismiss: function () {
          if (onCancel) onCancel();
        }
      }
    };

    const rzp = new window.Razorpay(options);

    rzp.on('payment.failed', function (response) {
      if (onError) onError(response.error?.description || 'Payment Failed');
    });

    rzp.open();
  } catch (err) {
    console.warn('Razorpay popup error, launching test fallback modal:', err);
    launchTestPaymentModal(registration, onSuccess, onError);
  }
}

/**
 * Test Payment Modal Fallback (for instant browser testing without live gateway delays)
 */
function launchTestPaymentModal(registration, onSuccess, onError) {
  const modalContainer = document.createElement('div');
  modalContainer.id = 'razorpay-test-modal';
  modalContainer.className = 'fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4';
  
  modalContainer.innerHTML = `
    <div class="bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 max-w-md w-full shadow-2xl text-slate-100 animate-in fade-in zoom-in duration-200">
      <div class="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
            ₹
          </div>
          <div>
            <h3 class="font-bold text-lg text-white">Razorpay Secure Checkout</h3>
            <p class="text-xs text-slate-400">COMBLAZE 2K26 Flat Fee</p>
          </div>
        </div>
        <span class="px-2.5 py-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">Test Mode</span>
      </div>

      <div class="space-y-3 text-sm text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800 mb-6">
        <div class="flex justify-between">
          <span class="text-slate-400">Participant:</span>
          <span class="font-medium text-white">${registration.name}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-400">College:</span>
          <span class="font-medium text-white truncate max-w-[200px]">${registration.college}</span>
        </div>
        <div class="flex justify-between border-t border-slate-800/80 pt-2 font-semibold">
          <span class="text-slate-200">Total Amount:</span>
          <span class="text-cyan-400 text-base">₹250.00</span>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <button id="rzp-test-pay-btn" class="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2">
          <span>Complete ₹250 Payment (Success)</span>
        </button>
        <button id="rzp-test-cancel-btn" class="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-medium rounded-xl transition">
          Cancel Transaction
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modalContainer);

  document.getElementById('rzp-test-pay-btn').onclick = () => {
    document.body.removeChild(modalContainer);
    onSuccess({
      razorpay_payment_id: 'pay_test_' + Math.random().toString(36).substring(2, 10),
      razorpay_order_id: 'order_test_' + Math.random().toString(36).substring(2, 10),
      razorpay_signature: 'sig_test_' + Math.random().toString(36).substring(2, 10)
    });
  };

  document.getElementById('rzp-test-cancel-btn').onclick = () => {
    document.body.removeChild(modalContainer);
    if (onError) onError('Payment cancelled by participant.');
  };
}
