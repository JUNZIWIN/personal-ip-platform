/**
 * BizAtom — debug endpoint
 * GET /api/debug  →  check environment variable status (no secrets exposed)
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'GET only' });

  const hasKey = !!process.env.DEEPSEEK_API_KEY;
  const keyPrefix = process.env.DEEPSEEK_API_KEY
    ? process.env.DEEPSEEK_API_KEY.substring(0, 10) + '...'
    : null;

  res.status(200).json({
    vercel_env: process.env.VERCEL_ENV || 'unknown',
    node_version: process.version,
    has_deepseek_key: hasKey,
    key_prefix: keyPrefix,   // only show first 10 chars for verification
    all_env_keys: Object.keys(process.env).filter(k => k.includes('DEEP') || k.includes('API') || k.includes('KEY')),
  });
}
