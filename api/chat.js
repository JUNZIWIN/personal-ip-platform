/**
 * BizAtom AI Book Q&A — Vercel Serverless Function
 * Answers questions about 30+ business classics with built-in knowledge base.
 *
 * POST /api/chat  { question: string, lang?: 'zh'|'en' }
 * Returns: { answer: string }
 *
 * Upgrade path: set env var OPENAI_API_KEY for AI-powered answers.
 */

const fs = require('fs');
const path = require('path');

// ─── Load the shared knowledge base ───
let BIZATOM_KB = [];
try {
  const kbPath = path.join(process.cwd(), 'bizatom-kb.js');
  const kbContent = fs.readFileSync(kbPath, 'utf8');
  const kbFunc = new Function(kbContent + '\nreturn BIZATOM_KB;');
  BIZATOM_KB = kbFunc();
  console.log(`Knowledge base loaded: ${BIZATOM_KB.length} books`);
} catch (e) {
  console.error('Failed to load bizatom-kb.js:', e.message);
}

// ─── Match knowledge: concept vs book question ───
function matchKnowledge(question, lang) {
  const q = question.toLowerCase().trim();
  if (!BIZATOM_KB.length) return null;

  // Step 1: Find best-matching book by keyword score
  let bestBook = null, bestS = 0;
  for (const b of BIZATOM_KB) {
    let score = 0;
    for (const kw of b.kw) {
      if (q.includes(kw.toLowerCase())) score += kw.length;
    }
    if (score > bestS) { bestS = score; bestBook = b; }
  }
  if (!bestBook || bestS === 0) return null;

  const d = bestBook[lang] || bestBook.en;
  if (!d) return null;

  // Step 2: Find best-matching concept (bidirectional)
  let bestConcept = null, bestCS = 0;
  for (const c of d.c) {
    const cname = c[0].toLowerCase(), cdesc = c[1];
    let cs = 0;
    // Forward: question contains concept name parts
    const parts = cname.split(/[\s\-:：]+/);
    for (const p of parts) {
      if (p.length >= 2 && q.includes(p)) cs += p.length * 2;
    }
    if (cname.length >= 4 && q.includes(cname.slice(0, 6))) cs += 12;
    if (cname.length >= 8 && q.includes(cname)) cs += cname.length * 4;
    // Reverse: concept name contains question words
    const qWords = q.split(/\s+/);
    for (const qw of qWords) {
      if (qw.length >= 3 && cname.includes(qw)) cs += qw.length * 3;
    }
    // ASCII tokens (for mixed CN/EN like "MVP")
    const asciiTokens = cname.match(/[a-z0-9]+/g) || [];
    for (const tok of asciiTokens) {
      if (tok.length >= 2 && q.includes(tok)) cs += tok.length * 3;
    }
    if (cs > bestCS) { bestCS = cs; bestConcept = c; }
  }

  // Step 3: PRIORITY OUTPUT
  const isConceptQ = bestCS >= 6;

  if (isConceptQ && bestConcept) {
    let answer = `💡 **${bestConcept[0]}**\n\n${bestConcept[1]}\n\n`;
    answer += `📖 *${lang === 'zh' ? '出自' : 'From'}: ${d.t} — ${d.a}*\n`;
    return answer;
  }

  // Step 4: Full book overview
  let answer = `📚 **${d.t}** — ${d.a}\n\n${d.b}\n\n`;
  if (bestConcept && bestCS > 3) {
    answer += `💡 **${bestConcept[0]}**：${bestConcept[1]}\n\n`;
  }
  answer += `📋 ${lang === 'zh' ? '核心概念一览' : 'Key Concepts'}：\n`;
  for (const c of d.c) {
    answer += `  • ${c[0]}\n`;
  }
  return answer;
}

// ─── Fallback when no match ───
function fallbackResponse(lang) {
  const books = BIZATOM_KB.slice(0, 20).map(b => {
    const d = b[lang] || b.en;
    return d ? `• ${d.t} — ${d.a}` : `• ${b.id}`;
  }).join('\n');

  if (lang === 'zh') {
    return `📚 **我是 BizAtom AI 书僮**，支持 ${BIZATOM_KB.length}+ 本商业经典。

你可以问我任何概念、框架或核心思想。支持的热门书籍包括：
${books}

💡 试试问我：
• "什么是蓝海战略？"
• "解释第一性原理"
• "从0到1的核心思想"
• "穷查理宝典的智慧"`;
  }

  return `📚 **I'm the BizAtom AI Book Assistant**, with ${BIZATOM_KB.length}+ business classics.

Ask me about any concept, framework, or key idea from:
${books}

💡 Try asking:
• "What is Blue Ocean Strategy?"
• "Explain First Principles"
• "Tell me about Zero to One"
• "What are Charlie Munger's principles?"`;
}

// ─── Main handler ───
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    const { question, lang = 'en' } = req.body || {};
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({ answer: lang === 'zh' ? '请提出一个问题。' : 'Please ask a question.' });
    }

    // Step 1: Knowledge base match
    const kbAnswer = matchKnowledge(question, lang);
    if (kbAnswer) {
      return res.status(200).json({ answer: kbAnswer });
    }

    // Step 2: OpenAI fallback (if configured)
    const apiKey = process.env.OPENAI_API_KEY || process.env.BIZATOM_AI_KEY;
    if (apiKey) {
      try {
        const systemPrompt = lang === 'zh'
          ? `你是BizAtom商原子的AI书僮，专门回答商业经典书籍的问题。支持${BIZATOM_KB.length}+本书籍。以简洁专业的方式回答，引用相关概念。中文回复。`
          : `You are BizAtom's AI Book Assistant. Answer concisely and professionally. Keep under 300 words.`;

        const aiResp = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: question }],
            max_tokens: 600, temperature: 0.7
          })
        });
        if (aiResp.ok) {
          const data = await aiResp.json();
          return res.status(200).json({ answer: data.choices[0].message.content });
        }
      } catch (aiErr) { console.error('AI API error:', aiErr.message); }
    }

    // Step 3: Fallback
    return res.status(200).json({ answer: fallbackResponse(lang) });
  } catch (err) {
    console.error('Chat error:', err);
    return res.status(500).json({ answer: '抱歉，处理你的问题时出了错。请稍后再试。' });
  }
}
