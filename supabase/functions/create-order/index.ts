// Supabase Edge Function: create-order
// Creates a Razorpay Order for ₹250 flat fee

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RAZORPAY_KEY_ID = Deno.env.get('VITE_RAZORPAY_KEY_ID') || Deno.env.get('RAZORPAY_KEY_ID') || 'rzp_test_TPO84ekiQg6Do9';
const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET') || 'LsKXogxPn2wPXftNl7wO3Q2O';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { registration_id, name, email } = await req.json();

    // Create order on Razorpay (Amount ₹250 = 25000 paise)
    const amountInPaise = 25000;
    const authHeader = 'Basic ' + btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`);

    const rzpResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `receipt_${registration_id || Date.now()}`,
        notes: {
          participant_name: name || '',
          participant_email: email || '',
          event_fee: '₹250 Flat Fee (2 Events)'
        }
      })
    });

    const orderData = await rzpResponse.json();

    if (!rzpResponse.ok) {
      throw new Error(orderData.error?.description || 'Razorpay order creation failed');
    }

    return new Response(
      JSON.stringify({
        success: true,
        order_id: orderData.id,
        amount: orderData.amount,
        currency: orderData.currency,
        key_id: RAZORPAY_KEY_ID
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
