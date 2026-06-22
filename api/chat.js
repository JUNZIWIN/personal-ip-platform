/**
 * BizAtom AI Book Assistant — Vercel Serverless Function
 * Upgraded: Now connects to DeepSeek API for real AI responses
 *
 * POST /api/chat
 * Body: { question: string, lang?: 'zh'|'en', bookId?: string, history?: Array }
 * Returns: { answer: string }
 *
 * Env vars:
 *   DEEPSEEK_API_KEY — DeepSeek API key (get from platform.deepseek.com)
 *   OPENAI_API_KEY   — (optional) fallback to OpenAI
 */

const fs = require('fs');
const path = require('path');

// ─── Load knowledge base ───
let BIZATOM_KB = [];
function loadKB() {
  if (BIZATOM_KB.length) return;
  try {
    const kbPath = path.join(process.cwd(), 'bizatom-kb.js');
    const kbContent = fs.readFileSync(kbPath, 'utf8');
    const kbFunc = new Function(kbContent + '\nreturn BIZATOM_KB;');
    BIZATOM_KB = kbFunc();
    console.log(`[KB] Loaded ${BIZATOM_KB.length} books`);
  } catch (e) {
    console.error('[KB] Failed to load:', e.message);
  }
}
loadKB();

// ─── Find book by ID ───
function findBook(bookId, lang) {
  if (!bookId) return null;
  const book = BIZATOM_KB.find(b => b.id === bookId);
  if (!book) return null;
  return book[lang] || book.en;
}

// ─── Build system prompt with optional book context ───
function buildSystemPrompt(lang, bookContext) {
  const bookList = BIZATOM_KB.slice(0, 30).map(b => {
    const d = b[lang] || b.en;
    return d ? `《${d.t}》— ${d.a}` : b.id;
  }).join('\n');

  if (lang === 'zh') {
    return `你是 BizAtom（商原子）的 AI 智能书僮。你是一位博学的商业顾问，精通 ${BIZATOM_KB.length} 本商业经典著作。

${bookContext ? `用户正在查阅《${bookContext.t}》（${bookContext.a}），以下是该书的核心内容，请基于这些内容回答：\n\n简介：${bookContext.b}\n\n核心概念：\n${(bookContext.c || []).map(c => `• ${c[0]}：${c[1]}`).join('\n')}\n\n` : `如果你被问到某本书的内容，可以参考以下书单：\n${bookList}\n\n如果问题涉及具体书籍，请优先基于该书知识回答。`}

回答规则：
1. 用中文回答，语气专业而亲切，像一位经验丰富的商业导师
2. 回答要具体、有深度，不要泛泛而谈
3. 如果涉及书籍概念，引用原文的核心思想
4. 如果问题超出书籍范围，可以结合商业常识回答
5. 回答长度适中（200-500字），需要时可以更长
6. 使用 emoji 让回答更生动（📚💡🎯✅ 等）
7. 如果用户用中文问，用中文答；用英文问，用英文答

你不仅仅是搜索引擎，而是能思考、能总结、能给出 actionable insights 的智能助手。`;
  }

  // English prompt
  return `You are the AI Book Assistant for BizAtom (Business Atom), an expert business consultant familiar with ${BIZATOM_KB.length}+ business classics.

${bookContext ? `The user is viewing "${bookContext.t}" by ${bookContext.a}. Here's the book summary:\n\n${bookContext.b}\n\nKey concepts:\n${(bookContext.c || []).map(c => `• ${c[0]}: ${c[1]}`).join('\n')}\n\nPlease answer based on this context.` : `If asked about a specific book, refer to this list:\n${bookList}\n\nAnswer based on the book's knowledge when relevant.`}

Answering rules:
1. Professional yet approachable tone, like a seasoned business mentor
2. Be specific and insightful, not generic
3. Reference core ideas from books when relevant
4. Combine book knowledge with business common sense
5. Appropriate length (200-500 words), longer if needed
6. Use emoji sparingly for clarity (📚💡🎯✅ etc.)
7. Match the user's language (CN/EN)

You are not just a search engine — you think, synthesize, and give actionable insights.`;
}

// ─── Call DeepSeek API ───
async function callDeepSeek(question, lang, bookContext, history) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) return null;

  const systemPrompt = buildSystemPrompt(lang, bookContext);
  const messages = [{ role: 'system', content: systemPrompt }];

  // Add conversation history (last 6 messages)
  if (history && Array.isArray(history)) {
    const recent = history.slice(-6);
    for (const h of recent) {
      messages.push({ role: h.role === 'user' ? 'user' : 'assistant', content: h.content });
    }
  }

  messages.push({ role: 'user', content: question });

  try {
    const resp = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        max_tokens: 1000,
        temperature: 0.7,
        stream: false,
      }),
    });

    if (!resp.ok) {
      const err = await resp.text();
      console.error('[DeepSeek] Error:', resp.status, err);
      return null;
    }

    const data = await resp.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (e) {
    console.error('[DeepSeek] Exception:', e.message);
    return null;
  }
}

// ─── Fallback: keyword match from KB ───
function kbFallback(question, lang) {
  const q = question.toLowerCase().trim();
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

  let answer = `📚 **${d.t}** — ${d.a}\n\n${d.b}\n\n`;
  answer += `📋 ${lang === 'zh' ? '核心概念' : 'Key Concepts'}：\n`;
  for (const c of d.c) {
    answer += `  • **${c[0]}**：${c[1]}\n`;
  }
  answer += `\n💬 ${lang === 'zh' ? '想深入了解某个概念？直接问我吧！' : 'Want to dive deeper into a concept? Just ask me!'}`;
  return answer;
}

// ─── Main handler ───
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    const {
      question,
      lang = 'zh',
      bookId = '',
      history = [],
    } = req.body || {};

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({
        answer: lang === 'zh' ? '请提出一个问题 😊' : 'Please ask a question 😊',
      });
    }

    // Load book context if bookId provided
    const bookContext = findBook(bookId, lang);

    // Try DeepSeek first
    const aiAnswer = await callDeepSeek(question.trim(), lang, bookContext, history);
    if (aiAnswer) {
      return res.status(200).json({ answer: aiAnswer });
    }

    // Fallback: keyword match
    const kbAnswer = kbFallback(question, lang);
    if (kbAnswer) {
      return res.status(200).json({ answer: kbAnswer });
    }

    // Ultimate fallback
    const fallback = lang === 'zh'
      ? `📚 我是 BizAtom AI 书僮，精通 ${BIZATOM_KB.length} 本商业经典。\n\n你可以问我：\n• "什么是蓝海战略？"\n• "解释第一性原理"\n• "从0到1的核心思想"\n\n（提示：如需 AI 大模型回答，请配置 DEEPSEEK_API_KEY 环境变量）`
      : `📚 I'm BizAtom's AI Book Assistant, familiar with ${BIZATOM_KB.length}+ business classics.\n\nAsk me:\n• "What is Blue Ocean Strategy?"\n• "Explain First Principles"\n• "Tell me about Zero to One"\n\n(Note: configure DEEPSEEK_API_KEY env var for AI-powered answers)`;

    return res.status(200).json({ answer: fallback });
  } catch (err) {
    console.error('[Chat] Error:', err);
    return res.status(500).json({
      answer: '抱歉，处理你的问题时出了错。请稍后再试。',
    });
  }
}
