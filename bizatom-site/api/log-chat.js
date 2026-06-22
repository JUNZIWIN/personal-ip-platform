/**
 * BizAtom Chat Logger — Vercel Serverless Function
 * Receives chat messages and persists them for analytics.
 *
 * POST /api/log-chat
 * Body: { question, answer, lang, bookId, timestamp, userEmail }
 *
 * Storage backends (checked in order):
 *   1. Airtable  — set AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME
 *   2. Formspree — set CHAT_LOG_FORMSPREE_ID (falls back to console)
 *   3. Console    — always logs to Vercel function logs
 *
 * Setup (Airtable, recommended):
 *   1. Create a free Airtable base with columns:
 *      Question | Answer | Lang | BookID | UserEmail | Timestamp | Date
 *   2. Get your API key from https://airtable.com/account
 *   3. In Vercel: Settings → Environment Variables → add:
 *      AIRTABLE_API_KEY   = patXXXXXXXXXXXX
 *      AIRTABLE_BASE_ID  = appXXXXXXXXXXXX
 *      AIRTABLE_TABLE_NAME = ChatLogs
 */

// ─── Save to Airtable ───
async function saveToAirtable(fields) {
  const apiKey  = process.env.AIRTABLE_API_KEY;
  const baseId  = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || 'ChatLogs';

  if (!apiKey || !baseId) return false;

  try {
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ records: [{ fields }] }),
    });
    if (!resp.ok) {
      const txt = await resp.text();
      console.error('[ChatLog] Airtable error:', resp.status, txt.substring(0, 200));
      return false;
    }
    console.log('[ChatLog] Saved to Airtable');
    return true;
  } catch (e) {
    console.error('[ChatLog] Airtable exception:', e.message);
    return false;
  }
}

// ─── Save to Formspree (simple email notification) ───
async function saveToFormspree(fields) {
  const formId = process.env.CHAT_LOG_FORMSPREE_ID; // e.g. "mjgqvlak"
  if (!formId) return false;

  try {
    const resp = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _subject: `[BizAtom Chat] ${fields.Lang === 'zh' ? '中文' : 'EN'} - ${fields.Question ? fields.Question.substring(0, 40) : '(book ask)'}`,
        Question:  fields.Question  || '',
        Answer:    fields.Answer   || '',
        Lang:       fields.Lang      || '',
        BookID:     fields.BookID   || '',
        UserEmail:  fields.UserEmail|| '',
        Timestamp:   fields.Timestamp|| '',
        source:     'bizatom-chat-log',
      }),
    });
    if (resp.ok) { console.log('[ChatLog] Sent to Formspree'); return true; }
    return false;
  } catch (e) {
    console.error('[ChatLog] Formspree error:', e.message);
    return false;
  }
}

// ─── Main handler ───
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'POST only' });

  try {
    const body = req.body || {};

    const fields = {
      'Question':  String(body.question  || '').substring(0, 2000),
      'Answer':    String(body.answer    || '').substring(0, 5000),
      'Lang':      body.lang === 'en' ? 'en' : 'zh',
      'BookID':    String(body.bookId    || ''),
      'UserEmail': String(body.userEmail || ''),
      'Timestamp': String(body.timestamp || new Date().toISOString()),
      'Date':      new Date().toISOString().split('T')[0], // YYYY-MM-DD for Airtable
    };

    // Always log to console (visible in Vercel function logs)
    console.log('[ChatLog]', JSON.stringify({
      q: fields.Question.substring(0, 80),
      book: fields.BookID,
      lang: fields.Lang,
      email: fields.UserEmail || '(anon)',
      ts: fields.Timestamp,
    }));

    // Try Airtable first, then Formspree
    const saved = await saveToAirtable(fields) || await saveToFormspree(fields);
    if (!saved) console.log('[ChatLog] No backend configured — log only (see Vercel function logs)');

    return res.status(200).json({ ok: true, saved });
  } catch (err) {
    console.error('[ChatLog] Handler error:', err);
    return res.status(200).json({ ok: true }); // always return 200 to caller
  }
}
