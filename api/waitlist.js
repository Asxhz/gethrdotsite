/**
 * Vercel serverless: POST /api/waitlist
 * Body: { email } — email required.
 * Returns 200 + { ok: true } on success. Add RESEND_API_KEY + NOTIFY_EMAIL to forward signups via email.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const email = (body.email || '').trim().toLowerCase();

    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: 'Valid email required' });
    }

    // Optional: add RESEND_API_KEY + NOTIFY_EMAIL in Vercel env and install "resend"
    // to email yourself each signup. For now we just validate and return success.
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Waitlist API error:', err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
