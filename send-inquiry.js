// Vercel serverless function to handle retreat inquiry emails via SendGrid.
// Requires environment variables: SENDGRID_API_KEY, INQUIRY_TO and (optional) INQUIRY_FROM.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }
  const { tier, name, email, honeypot } = req.body || {};
  // basic honeypot to deter bots; if present, silently succeed
  if (honeypot) {
    return res.status(200).json({ ok: true });
  }
  if (!tier || !name || !email) {
    return res.status(400).json({ ok: false, error: 'Missing required fields.' });
  }
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const toEmail = process.env.INQUIRY_TO || 'info@incluu.us';
  const fromEmail = process.env.INQUIRY_FROM || 'info@incluu.us';
  if (!SENDGRID_API_KEY) {
    return res.status(500).json({ ok: false, error: 'Missing SENDGRID_API_KEY' });
  }
  const payload = {
    personalizations: [
      {
        to: [ { email: toEmail } ],
        subject: `RAR Retreat Inquiry — ${tier}`
      }
    ],
    from: { email: fromEmail, name: 'RAR Retreat' },
    reply_to: { email },
    content: [
      {
        type: 'text/html',
        value: `<h2>New Retreat Inquiry</h2>\n<p><strong>Selected Tier:</strong> ${tier}</p>\n<p><strong>Name:</strong> ${name}</p>\n<p><strong>Email:</strong> ${email}</p>`
      }
    ]
  };
  try {
    const resp = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    if (!resp.ok) {
      const errText = await resp.text();
      return res.status(500).json({ ok: false, error: errText || 'SendGrid error' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message || 'Server error' });
  }
}