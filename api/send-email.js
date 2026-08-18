import nodemailer from 'nodemailer';

// Vercel Serverless Function for Email Dispatch
// Multi-provider support: Gmail SMTP, Brevo, Resend

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, subject, html, registration } = req.body || {};

  if (!to || !html) {
    return res.status(400).json({ error: 'Missing required parameters (to, html)' });
  }

  const recipientEmail = Array.isArray(to) ? to[0] : to;
  const recipientName = (registration && registration.name) ? registration.name : 'Participant';

  const gmailUser = (process.env.GMAIL_USER || process.env.VITE_GMAIL_USER || process.env.SMTP_USER || '').trim();
  const rawGmailPass = process.env.GMAIL_PASS || process.env.VITE_GMAIL_PASS || process.env.SMTP_PASS || '';
  const gmailPass = rawGmailPass.replace(/\s+/g, '');
  const brevoApiKey = process.env.BREVO_API_KEY || process.env.VITE_BREVO_API_KEY;
  const resendApiKey = process.env.VITE_RESEND_API_KEY || process.env.RESEND_API_KEY || 're_geGQ3Z9b_KwyMp9Pus97L3PVW9NqCSEe4';
  const senderEmail = process.env.VITE_SENDER_EMAIL || process.env.SENDER_EMAIL || 'onboarding@resend.dev';

  // 1. PRIMARY OPTION: GMAIL SMTP via Nodemailer (No Domain Required, Sends to ANY Email!)
  if (gmailUser && gmailPass) {
    try {
      console.log(`[Vercel Serverless] Dispatching email via Gmail SMTP (${gmailUser}) to: ${recipientEmail}...`);
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: gmailUser,
          pass: gmailPass
        }
      });

      const info = await transporter.sendMail({
        from: `"COMBLAZE 2K26" <${gmailUser}>`,
        to: recipientEmail,
        subject: subject || 'Entry Ticket - COMBLAZE 2K26',
        html: html
      });

      console.log('[Vercel Serverless] Gmail SMTP dispatch success!', info.messageId);
      return res.status(200).json({ success: true, provider: 'gmail_smtp', messageId: info.messageId });
    } catch (gErr) {
      console.warn('[Vercel Serverless] Gmail SMTP error, trying fallback:', gErr);
    }
  }

  // 2. SECONDARY OPTION: BREVO API
  if (brevoApiKey) {
    try {
      console.log(`[Vercel Serverless] Dispatching email via Brevo to: ${recipientEmail}...`);
      const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': brevoApiKey,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: 'COMBLAZE 2K26', email: gmailUser || 'comblaze2k26@gmail.com' },
          to: [{ email: recipientEmail, name: recipientName }],
          subject: subject || 'Entry Ticket - COMBLAZE 2K26',
          htmlContent: html
        })
      });

      const brevoData = await brevoRes.json();
      if (brevoRes.ok) {
        return res.status(200).json({ success: true, provider: 'brevo', messageId: brevoData.messageId });
      } else {
        console.warn('[Brevo API Error]:', brevoData);
      }
    } catch (bErr) {
      console.warn('[Brevo Exception]:', bErr);
    }
  }

  // 3. TERTIARY OPTION: RESEND API
  try {
    console.log(`[Vercel Serverless] Dispatching email via Resend to: ${recipientEmail}...`);
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `COMBLAZE 2K26 <${senderEmail}>`,
        to: [recipientEmail],
        subject: subject || 'Entry Ticket - COMBLAZE 2K26',
        html: html
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[Resend API Error]:', data);
      return res.status(response.status).json({ success: false, error: data.message || 'Resend error', details: data });
    }

    return res.status(200).json({ success: true, provider: 'resend', id: data.id, data });
  } catch (err) {
    console.error('[Vercel Serverless Exception]:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
