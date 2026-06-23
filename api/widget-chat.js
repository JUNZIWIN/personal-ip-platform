/**
 * BizAtom Widget Chat API — Vercel Serverless Function
 *
 * POST /api/widget-chat
 * Body: { question, lang, site, kb, history }
 */
import { SYSTEM_PROMPTS } from './chat.js';

// Re-use chat.js system prompts
const PROMPTS = {
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
7. 你不是搜索引擎——你能思考、总结、给出 actionable insights
8. 重要：不要使用 Markdown 格式（如 **粗体**、*斜体**、### 标题等），直接输出纯文本即可
9. 重要：请用与用户提问相同的语言回答。如果用户用英文提问，请用英文回答。`,

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
7. You think, synthesize, and give actionable insights
8. IMPORTANT: Do NOT use Markdown formatting (no **bold**, *italic*, ### headers, etc.). Output plain text only.
9. IMPORTANT: Match the user's language — if they ask in Chinese, answer in Chinese; if in English, answer in English.`
};

async function callDeepSeek(question, lang, history, site) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return { answer: null, error: 'API_KEY_NOT_SET' };
  }

  const systemMsg = (PROMPTS[lang] || PROMPTS.zh)
    + (site ? '\n\n你正在为「' + site + '」的网站提供 AI 助手服务。如果用户问到该机构/学校相关的问题，优先基于该机构已公开的信息回答，不要编造内容。如果不确定，诚实告知并建议用户查阅官网。' : '');

  const messages = [
    { role: 'system', content: systemMsg }
  ];

  if (history && Array.isArray(history)) {
    for (const h of history.slice(-6)) {
      messages.push({
        role: h.role === 'user' ? 'user' : 'assistant',
        content: String(h.content || '')
      });
    }
  }

  messages.push({ role: 'user', content: question });

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

    if (!resp.ok) {
      const bodyText = await resp.text();
      console.error('[WidgetChat] DeepSeek error:', resp.status, bodyText.substring(0, 300));
      return { answer: null, error: 'API_ERROR_' + resp.status };
    }

    const data = await resp.json();
    const answer = data.choices?.[0]?.message?.content || null;
    return { answer, error: null };
  } catch (e) {
    console.error('[WidgetChat] Exception:', e.message);
    return { answer: null, error: 'EXCEPTION: ' + e.message };
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    const body = req.body || {};
    const question = (body.question || '').trim();
    const lang = body.lang === 'en' ? 'en' : 'zh';
    const site = body.site || '';
    const history = Array.isArray(body.history) ? body.history : [];

    if (!question) {
      return res.status(200).json({
        answer: lang === 'zh' ? '请提出一个问题 😊' : 'Please ask a question 😊'
      });
    }

    const aiResult = await callDeepSeek(question, lang, history, site);

    if (aiResult?.answer) {
      return res.status(200).json({ answer: aiResult.answer });
    }

    return res.status(200).json({
      answer: lang === 'zh'
        ? '📚 你好！我是 AI 助手 🤖\n\n我目前无法连接到 AI 大模型服务。请稍后再试，或者尝试用更具体的关键词提问。'
        : "📚 Hello! I'm the AI Assistant 🤖\n\nI can't connect to the AI service right now. Please try again later.",
      debug: {
        hasKey: !!process.env.DEEPSEEK_API_KEY,
        error: aiResult?.error || 'UNKNOWN'
      }
    });

  } catch (err) {
    console.error('[WidgetChat] Handler error:', err);
    return res.status(500).json({
      answer: 'Sorry, an error occurred. Please try again later.'
    });
  }
}
