function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { name, email, projectType, message, website } = req.body || {};
  if (website) return res.status(200).json({ ok: true });
  if (![name, email, projectType, message].every((v) => typeof v === 'string')) {
    return res.status(400).json({ error: 'Please complete all fields.' });
  }
  const clean = { name: name.trim().slice(0, 100), email: email.trim().slice(0, 254), projectType: projectType.trim().slice(0, 100), message: message.trim().slice(0, 5000) };
  if (!clean.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email) || clean.message.length < 10) {
    return res.status(400).json({ error: 'Please enter a valid email and a message of at least 10 characters.' });
  }
  const { RESEND_API_KEY, RESEND_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !CONTACT_TO_EMAIL) {
    return res.status(503).json({ error: 'Contact delivery is not configured yet. Please email kiishiyusuf@gmail.com directly.' });
  }
  const html = `<h2>New portfolio enquiry</h2><p><b>Name:</b> ${escapeHtml(clean.name)}</p><p><b>Email:</b> ${escapeHtml(clean.email)}</p><p><b>Project type:</b> ${escapeHtml(clean.projectType)}</p><p><b>Message:</b></p><p>${escapeHtml(clean.message).replace(/\n/g, '<br>')}</p>`;
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: RESEND_FROM_EMAIL, to: [CONTACT_TO_EMAIL], reply_to: clean.email, subject: `Portfolio enquiry: ${clean.projectType}`, html }),
    });
    if (!response.ok) return res.status(502).json({ error: 'The email provider could not deliver your message. Please try again later.' });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: 'Message delivery failed. Please try again later.' });
  }
}
