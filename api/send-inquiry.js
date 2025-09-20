// /api/send-inquiry.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method Not Allowed' });

  const { tier, name, email, message = '', honeypot = '' } = req.body || {};
  if (honeypot) return res.status(200).json({ ok: true });
  if (!tier || !name || !email) return res.status(400).json({ ok: false, error: 'Missing required fields.' });

  const toList = (process.env.INQUIRY_TO || 'rar@dr-dede.com,info@dr-dede.com')
    .split(',').map(s => s.trim()).filter(Boolean);
  const fromEmail = process.env.INQUIRY_FROM || 'rar@dr-dede.com,info@dr-dede.com';

  const hasGmail =
    process.env.GMAIL_USER &&
    process.env.GMAIL_CLIENT_ID &&
    process.env.GMAIL_CLIENT_SECRET &&
    process.env.GMAIL_REFRESH_TOKEN;

  // Try Gmail OAuth2 if configured
  if (hasGmail) {
    try {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.GMAIL_USER,
          clientId: process.env.GMAIL_CLIENT_ID,
          clientSecret: process.env.GMAIL_CLIENT_SECRET,
          refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        },
      });

      const text = [
        `Tier/Journey: ${tier}`,
        `Name: ${name}`,
        `Email: ${email}`,
        message ? `Message:\n${message}` : '',
      ].filter(Boolean).join('\n');

      await transporter.sendMail({
        from: fromEmail,
        to: toList,
        replyTo: email || undefined,
        subject: `RAR Retreat Inquiry — ${tier}`,
        text,
      });

      return res.status(200).json({ ok: true, sent: 'gmail' });
    } catch (e) {
      // fall through to frontend mailto fallback
    }
  }

  // No Gmail creds: trigger your existing frontend fallback
  return res.status(500).json({ ok: false, error: 'Missing SENDGRID_API_KEY' });
}
