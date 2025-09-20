// /api/send-inquiry.js
import nodemailer from 'nodemailer';

// Hard-coded recipients per request
const TO_LIST = ['rar@dr-dede.com', 'info@dr-dede.com'];
const DEFAULT_FROM = 'info@dr-dede.com';

function buildText({ tier, name, email, message }) {
  return [
    `Tier/Journey: ${tier || '-'}`,
    `Name: ${name || '-'}`,
    `Email: ${email || '-'}`,
    message ? `Message:\n${message}` : ''
  ].filter(Boolean).join('\n');
}

function buildMailto({ tier, name, email, message }) {
  const subject = `RAR Retreat Inquiry — ${tier || 'N/A'}`;
  const body = buildText({ tier, name, email, message });
  const to = encodeURIComponent(TO_LIST.join(','));
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method Not Allowed' });

  const { tier, name, email, message = '', honeypot = '' } = req.body || {};
  if (honeypot) return res.status(200).json({ ok: true }); // silently drop bots
  if (!tier || !name || !email) {
    return res.status(400).json({ ok: false, error: 'Missing required fields: tier, name, email' });
  }

  const wantsGmail =
    process.env.GMAIL_USER &&
    process.env.GMAIL_CLIENT_ID &&
    process.env.GMAIL_CLIENT_SECRET &&
    process.env.GMAIL_REFRESH_TOKEN;

  // If Gmail OAuth2 envs are present, send server-side.
  if (wantsGmail) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.GMAIL_USER,           // set to info@dr-dede.com to match “From”
          clientId: process.env.GMAIL_CLIENT_ID,
          clientSecret: process.env.GMAIL_CLIENT_SECRET,
          refreshToken: process.env.GMAIL_REFRESH_TOKEN
        }
      });

      await transporter.sendMail({
        from: process.env.INQUIRY_FROM || DEFAULT_FROM,
        to: TO_LIST,
        replyTo: email || undefined,
        subject: `RAR Retreat Inquiry — ${tier}`,
        text: buildText({ tier, name, email, message })
      });

      return res.status(200).json({ ok: true, sent: 'gmail' });
    } catch (err) {
      // Fall through to mailto on any failure
    }
  }

  // Fallback: return a mailto URL for the client to open
  const mailto = buildMailto({ tier, name, email, message });
  return res.status(200).json({ ok: false, fallback: 'mailto', url: mailto });
}
