// Supabase Edge Function: send-confirmation-email
// Dispatches confirmation email with ticket link via Resend API

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || 're_geGQ3Z9b_KwyMp9Pus97L3PVW9NqCSEe4';
const SENDER_EMAIL = Deno.env.get('SENDER_EMAIL') || 'onboarding@resend.dev';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { registration, event_names } = await req.json();

    if (!registration || !registration.email) {
      throw new Error('Invalid registration or missing email');
    }

    const registeredEvents = Array.isArray(event_names) && event_names.length > 0
      ? event_names.join(' & ')
      : 'Selected Symposium Events';

    const emailHtml = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #334155;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #334155;">
          <h2 style="color: #38bdf8; margin: 0 0 6px 0; font-size: 24px;">M.A.M. COLLEGE OF ENGINEERING</h2>
          <p style="color: #94a3b8; font-size: 13px; margin: 0;">Department of Computer Science & Engineering | Siruganur, Trichy</p>
          <h1 style="color: #fbbf24; margin: 15px 0 0 0; letter-spacing: 2px; font-size: 28px;">COMBLAZE 2K26</h1>
        </div>

        <div style="padding: 24px 0;">
          <p style="font-size: 16px; color: #e2e8f0; margin-bottom: 12px;">Dear <strong>${registration.name}</strong>,</p>
          <p style="color: #94a3b8; line-height: 1.6;">Your registration for <strong>COMBLAZE 2K26</strong> has been successfully confirmed!</p>
          
          <div style="background-color: #1e293b; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #38bdf8;">
            <p style="margin: 4px 0;"><strong>Registration Reference ID:</strong> <span style="color: #38bdf8; font-family: monospace;">${registration.id.slice(0, 8).toUpperCase()}</span></p>
            <p style="margin: 4px 0;"><strong>Institution:</strong> ${registration.college}</p>
            <p style="margin: 4px 0;"><strong>Registered Events:</strong> ${registeredEvents}</p>
            <p style="margin: 4px 0;"><strong>Amount Paid:</strong> ₹250 (Flat Fee)</p>
            <p style="margin: 4px 0;"><strong>Status:</strong> <span style="color: #4ade80;">PAID & CONFIRMED</span></p>
          </div>

          <p style="color: #94a3b8; font-size: 14px;">Please keep your Registration ID or digital QR ticket handy during entry check-in at the symposium campus gate.</p>
        </div>

        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #334155; color: #64748b; font-size: 12px;">
          <p style="margin: 0;">Venue: CSE Seminar Hall & Computer Labs, M.A.M. College of Engineering, Trichy</p>
          <p style="margin: 4px 0 0 0;">Need help? Contact Dept Coordinator: +91 98424 12345</p>
        </div>
      </div>
    `;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `COMBLAZE 2K26 <${SENDER_EMAIL}>`,
        to: [registration.email],
        subject: `[Confirmed] Registration Ticket - COMBLAZE 2K26 | Ref: ${registration.id.slice(0, 8).toUpperCase()}`,
        html: emailHtml
      })
    });

    const resendData = await resendRes.json();

    return new Response(
      JSON.stringify({ success: true, resend: resendData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
