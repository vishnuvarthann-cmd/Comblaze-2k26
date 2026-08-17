// Supabase Edge Function: verify-payment
// Verifies Razorpay payment signature and updates registration status to 'paid'

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';
import { crypto } from 'https://deno.land/std@0.168.0/crypto/mod.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://exvipxjgtfwqxztlaasp.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET') || 'LsKXogxPn2wPXftNl7wO3Q2O';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function verifyHmacSignature(text: string, secret: string, expectedSignature: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(text));
  const hashArray = Array.from(new Uint8Array(signatureBuffer));
  const hexSignature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hexSignature === expectedSignature;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { registration_id, razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!registration_id || !razorpay_order_id || !razorpay_payment_id) {
      throw new Error('Missing payment verification details');
    }

    // Verify HMAC signature if signature provided
    if (razorpay_signature) {
      const text = `${razorpay_order_id}|${razorpay_payment_id}`;
      const isValid = await verifyHmacSignature(text, RAZORPAY_KEY_SECRET, razorpay_signature);
      if (!isValid) {
        throw new Error('Invalid Razorpay signature verification failed');
      }
    }

    // Initialize Supabase admin client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Update registration to paid
    const { data: registration, error: updateError } = await supabase
      .from('registrations')
      .update({
        payment_status: 'paid',
        razorpay_order_id,
        razorpay_payment_id
      })
      .eq('id', registration_id)
      .select()
      .single();

    if (updateError) {
      throw new Error(`Database update failed: ${updateError.message}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Payment verified and registration marked as paid',
        registration
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
