/**
 * BizAtom AI Chat — Vercel Serverless Function
 * Connects to DeepSeek API for real AI responses
 *
 * POST /api/chat
 * Body: { question: string, lang?: 'zh'|'en', bookId?: string, history?: Array }
 *
 * Env: DEEPSEEK_API_KEY
 */

// ─── System prompts ───
const SYSTEM_PROMPTS = {
  zh: `你是 BizAtom（商原子）的 AI 智能书僮。你是一位博学的商业顾问和阅读导师。

你的知识库涵盖 99+ 本商业经典，包括但不限于：
• 金融与投资：《穷爸爸富爸爸》《聪明的投资者》《随机漫步的傻瓜》等
• 心理学与行为：《影响力》《思考快与慢》《终身成长》《坚毅》等
• 创业与创新：《精益创业》《从0到1》《创新者的窘境》等
• 营销与增长：《定位》《紫牛》《上瘾》《疯传》等
• 经济学：《魔鬼经济学》《小岛经济学》《国富论》等
• 传记：《乔布斯传》《马斯克传》《贝佐斯传》等
• MBA经典教材：会计学、公司金融、投资学、战略管理、组织行为学等
• 效率与成长：《深度工作》《七个习惯》《原子习惯》等
• 中国商业：《人情与面子》《阿里传》《创新中国》等

回答规则：
1. 用中文回答，语气专业而亲切，像一位经验丰富的商业导师
2. 回答要具体、有深度，不要泛泛而谈
3. 引用书籍核心思想时标注书名
4. 如果问题超出书籍范围，结合商业常识回答
5. 回答长度适中（200-800字），需要时可以更长
6. 适当使用 emoji 让回答更生动
7. 你不是搜索引擎——你能思考、总结、给出 actionable insights`,

  en: `You are BizAtom's AI Book Assistant — an expert business consultant and reading mentor.

Your knowledge base covers 99+ business classics including:
• Finance & Investing: Rich Dad Poor Dad, The Intelligent Investor, A Random Walk Down Wall Street
• Psychology: Influence, Thinking Fast and Slow, Mindset, Grit
• Entrepreneurship: The Lean Startup, Zero to One, Innovator's Dilemma
• Marketing: Positioning, Purple Cow, Hooked, Contagious
• Economics: Freakonomics, Naked Economics, The Wealth of Nations
• Biographies: Steve Jobs, Elon Musk, Jeff Bezos
• MBA Textbooks: Accounting, Corporate Finance, Investments, Strategy, OB
• Productivity: Deep Work, 7 Habits, Atomic Habits

Rules:
1. Professional yet warm tone like a seasoned mentor
2. Specific, insightful answers — never generic
3. Cite book titles when referencing ideas
4. Combine book knowledge with business common sense
5. 200-800 words typically, longer when needed
6. Use emoji sparingly for clarity
7. You think, synthesize, and give actionable insights`
};

// ─── Call DeepSeek API ───
async function callDeepSeek(question, lang, history) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    console.log('[Chat] DEEPSEEK_API_KEY not set');
    return { answer: null, error: 'API_KEY_NOT_SET' };
  }

  const messages = [
    { role: 'system', content: SYSTEM_PROMPTS[lang] || SYSTEM_PROMPTS.zh }
  ];

  // Add conversation history (last 6 turns)
  if (history && Array.isArray(history)) {
    for (const h of history.slice(-6)) {
      messages.push({
        role: h.role === 'user' ? 'user' : 'assistant',
        content: String(h.content || '')
      });
    }
  }

  messages.push({ role: 'user', content: question });

  console.log('[Chat] Calling DeepSeek...', {
    hasKey: !!apiKey,
    keyPrefix: apiKey.substring(0, 12),
    msgCount: messages.length,
    qLen: question.length
  });

  try {
    const resp = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        max_tokens: 1500,
        temperature: 0.7,
        stream: false,
      }),
    });

    const status = resp.status;
    const bodyText = await resp.text();

    if (!resp.ok) {
      const errMsg = '[Chat] DeepSeek error: ' + status + ' ' + bodyText.substring(0, 300);
      console.error(errMsg);
      return { answer: null, error: 'API_ERROR_' + status, detail: bodyText.substring(0, 200) };
    }

    const data = JSON.parse(bodyText);
    const answer = data.choices && data.choices[0] && data.choices[0].message
      ? data.choices[0].message.content : null;

    console.log('[Chat] DeepSeek OK, answer length:', answer ? answer.length : 0);
    return { answer: answer, error: null };
  } catch (e) {
    const errMsg = '[Chat] DeepSeek exception: ' + e.message;
    console.error(errMsg);
    return { answer: null, error: 'EXCEPTION: ' + e.message };
  }
}

// ─── Main handler ───
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    const body = req.body || {};
    const question = (body.question || '').trim();
    const lang = body.lang === 'en' ? 'en' : 'zh'; // default zh
    const history = Array.isArray(body.history) ? body.history : [];

    if (!question) {
      return res.status(200).json({
        answer: lang === 'zh' ? '请提出一个问题 😊' : 'Please ask a question 😊'
      });
    }

    // Call DeepSeek AI
    const aiResult = await callDeepSeek(question, lang, history);

    if (aiResult && aiResult.answer) {
      return res.status(200).json({ answer: aiResult.answer });
    }

    // Fallback if no API key or API failed
    const fallbackMsg = lang === 'zh'
      ? '📚 你好！我是 BizAtom AI 书僮 🤖\n\n我目前无法连接到 AI 大模型服务（API Key 未配置或服务暂时不可用）。\n\n不过你仍然可以：\n• 从下拉菜单选择一本书，点「提问」查看该书的核心内容\n• 问一些关于商业经典的问题，我会尽力基于已有知识回答\n\n💡 提示：管理员需要在 Vercel 配置 DEEPSEEK_API_KEY 环境变量来启用完整 AI 功能。'
      : "📚 Hello! I'm BizAtom's AI Book Assistant 🤖\n\nI can't connect to the AI service right now (API key not configured).\n\nYou can still:\n• Select a book from the dropdown and click Ask\n• Ask about business classics from my knowledge base\n\n💡 Tip: Admin needs to configure DEEPSEEK_API_KEY in Vercel.";

    return res.status(200).json({
      answer: fallbackMsg,
      debug: {
        hasKey: !!process.env.DEEPSEEK_API_KEY,
        vercelEnv: process.env.VERCEL_ENV || 'unknown',
        error: aiResult ? aiResult.error : 'UNKNOWN'
      }
    });

  } catch (err) {
    console.error('[Chat] Handler error:', err);
    return res.status(500).json({
      answer: '抱歉，处理请求时出了错，请稍后再试。'
    });
  }
}
