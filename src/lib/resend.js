// Resend Email Dispatch Helper (Vercel Serverless & Client-Side Compatible)

const RESEND_API_KEY = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_RESEND_API_KEY) || 're_geGQ3Z9b_KwyMp9Pus97L3PVW9NqCSEe4';
const SENDER_EMAIL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SENDER_EMAIL) || 'onboarding@resend.dev';

export async function sendConfirmationEmailDirect(payload) {
  if (!payload) {
    console.warn('[Resend] Cannot send email: missing payload');
    return { success: false, error: 'Missing registration payload' };
  }

  const registration = payload.registration || payload;
  if (!registration || !registration.email) {
    console.warn('[Resend] Cannot send email: missing registration or recipient email');
    return { success: false, error: 'Missing registration recipient email' };
  }

  const rawEventNames = payload.eventNames || registration.event_names || [];
  const registeredEventsText = Array.isArray(rawEventNames) && rawEventNames.length > 0 
    ? rawEventNames.join(' & ') 
    : '2 Selected Symposium Events';
  const refCode = (registration.id || 'COMBLAZE').slice(0, 8).toUpperCase();
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(registration.id)}&color=0f172a&bgcolor=ffffff`;

  const emailHtml = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 32px; border-radius: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #334155;">
      <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #334155;">
        <h3 style="color: #38bdf8; margin: 0 0 6px 0; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">M.A.M. COLLEGE OF ENGINEERING</h3>
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">Department of Computer Science & Engineering | Siruganur, Trichy</p>
        <h1 style="color: #fbbf24; margin: 16px 0 0 0; letter-spacing: 2px; font-size: 30px; font-weight: 900;">COMBLAZE 2K26</h1>
      </div>

      <div style="padding: 24px 0;">
        <p style="font-size: 16px; color: #e2e8f0; margin-bottom: 12px;">Dear <strong>${registration.name}</strong>,</p>
        <p style="color: #94a3b8; line-height: 1.6; font-size: 14px;">Your registration for <strong>COMBLAZE 2K26</strong> has been successfully confirmed!</p>
        
        <div style="background-color: #1e293b; padding: 20px; border-radius: 14px; margin: 20px 0; border-left: 4px solid #38bdf8;">
          <p style="margin: 6px 0; font-size: 14px;"><strong>Registration Ref ID:</strong> <span style="color: #38bdf8; font-family: monospace; font-weight: 700;">${refCode}</span></p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>College / Institution:</strong> ${registration.college}</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Department & Year:</strong> ${registration.department || 'CSE'} (${registration.year || 'III Year'})</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Registered Events:</strong> ${registeredEventsText}</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Amount Paid:</strong> ₹250.00 (Flat Fee Pass)</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Payment Status:</strong> <span style="color: #4ade80; font-weight: 700;">PAID & CONFIRMED</span></p>
        </div>

        <div style="text-align: center; background-color: #1e293b; padding: 24px; border-radius: 16px; border: 1px dashed #38bdf8; margin: 24px 0;">
          <p style="color: #38bdf8; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px 0;">
            OFFICIAL ENTRY TICKET QR PASS
          </p>
          
          <div style="background-color: #ffffff; padding: 14px; border-radius: 16px; display: inline-block; border: 2px solid #00f3ff; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
            <img src="${qrImageUrl}" alt="Official Entry QR Pass" style="width: 200px; height: 200px; display: block; margin: 0 auto; border: 0;" />
            <p style="color: #0f172a; font-family: monospace; font-size: 11px; font-weight: 800; margin: 8px 0 0 0; letter-spacing: 1px;">
              SCAN AT CAMPUS ENTRY
            </p>
          </div>

          <p style="color: #94a3b8; font-size: 12px; margin: 14px 0 0 0;">
            Show this QR code at the registration desk for instant entry verification and badge issuance.
          </p>
        </div>

      </div>

      <div style="text-align: center; padding-top: 20px; border-top: 1px solid #334155; color: #64748b; font-size: 12px;">
        <p style="margin: 0 0 4px 0;">Venue: Main Auditorium & CSE Labs, M.A.M. College of Engineering, Siruganur, Trichy</p>
        <p style="margin: 0;">Date: Thursday, September 10, 2026 | Helpdesk: +91 98424 12345</p>
      </div>
    </div>
  `;

  const emailSubject = `[Confirmed Pass + QR] Entry Ticket - COMBLAZE 2K26 | Ref: ${refCode}`;

  // 1. First attempt: Send via Vercel Serverless Function (/api/send-email)
  try {
    console.log(`[Resend] Attempting Vercel serverless email dispatch for: ${registration.email}...`);
    const serverlessRes = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: registration.email,
        subject: emailSubject,
        html: emailHtml,
        registration
      })
    });

    if (serverlessRes.ok) {
      const sData = await serverlessRes.json();
      console.log('[Resend] Vercel serverless email sent successfully!', sData);
      return { success: true, messageId: sData.id, data: sData };
    } else {
      const errText = await serverlessRes.text();
      console.warn('[Resend] Vercel serverless API returned non-200:', errText);
    }
  } catch (err) {
    console.warn('[Resend] Vercel serverless route not reachable, trying direct Resend API fallback...', err);
  }

  // 2. Second attempt / Fallback: Direct Resend API call
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `COMBLAZE 2K26 <${SENDER_EMAIL}>`,
        to: [registration.email],
        subject: emailSubject,
        html: emailHtml
      })
    });

    const data = await res.json();

    if (!res.ok) {
      console.warn('[Resend] Direct API Response Error:', data);
      return { success: false, error: data.message || 'Resend email delivery failed', data };
    }

    console.log('[Resend] Direct Resend API Dispatch Successful! ID:', data.id);
    return { success: true, messageId: data.id, data };
  } catch (err) {
    console.error('[Resend] Direct fetch failed:', err);
    return { success: false, error: err.message || 'Network fetch error' };
  }
}
