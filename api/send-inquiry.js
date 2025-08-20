// /api/send-inquiry.js
// Vercel serverless handler to email inquiries using SendGrid (no npm deps).
// ENV: SENDGRID_API_KEY (required), INQUIRY_TO, INQUIRY_FROM (defaults info@incluu.us)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok:false, error:'Method Not Allowed' });
  try {
    const { tier, name, email, message, honeypot } = req.body || {};
    if (honeypot) return res.status(200).json({ ok:true });

    const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || '');
    if (!tier || !name || !isEmail(email)) {
      return res.status(400).json({ ok:false, error:'Missing or invalid fields' });
    }

    const TO = process.env.INQUIRY_TO || 'info@incluu.us';
    const FROM = process.env.INQUIRY_FROM || 'info@incluu.us';
    const API_KEY = process.env.SENDGRID_API_KEY;
    if (!API_KEY) return res.status(500).json({ ok:false, error:'Missing SENDGRID_API_KEY' });

    const html = `
      <h2>RAR Retreat — New Inquiry</h2>
      <p><b>Selected Tier:</b> ${tier}</p>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      ${message ? `<p><b>Message:</b> ${message}</p>` : ''}
    `;

    const payload = {
      personalizations: [{ to: [{ email: TO }], subject: \`RAR Retreat Inquiry — \${tier}\` }],
      from: { email: FROM, name: 'RAR Retreat' },
      reply_to: { email },
      content: [{ type: 'text/html', value: html }]
    };

    const sgRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: { 'Authorization': \`Bearer \${API_KEY}\`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!sgRes.ok) {
      const txt = await sgRes.text();
      return res.status(500).json({ ok:false, error:\`SendGrid: \${sgRes.status} \${txt}\` });
    }
    return res.status(200).json({ ok:true });
  } catch (e) {
    return res.status(500).json({ ok:false, error: e.message || 'Server error' });
  }
}
