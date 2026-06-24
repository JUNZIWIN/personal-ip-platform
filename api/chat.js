/**
 * BizAtom AI Chat — Vercel Serverless Function
 * Multi-model AI router: DeepSeek (default) | ChatGPT | Codex | Doubao | Kimi | Claude | GPT-4o-mini
 * + Web Search layer for real-time data queries
 *
 * POST /api/chat
 * Body: { question: string, lang?: 'zh'|'en', bookId?: string, history?: Array, model?: string }
 *
 * GET /api/chat?action=models
 * Returns available models list
 *
 * Env: DEEPSEEK_API_KEY, OPENAI_API_KEY, ANTHROPIC_API_KEY, DOUBAO_API_KEY, KIMI_API_KEY
 */

import { classifyQuestion, searchWeb, formatSearchResults } from './search.js';
import { callModel, getAvailableModels } from './models.js';

// ─── System prompts ───
const SYSTEM_PROMPTS = {
  zh: `你是 BizAtom（商原子）的 AI 智能书僮 — 一位博学、亲切、善于启发思考的商业导师。

你的知识库涵盖 100+ 本商业经典，包括但不限于：
• 金融与投资：《穷爸爸富爸爸》《聪明的投资者》《随机漫步的傻瓜》等
• 心理学与行为：《影响力》《思考快与慢》《终身成长》《坚毅》等
• 创业与创新：《精益创业》《从0到1》《创新者的窘境》等
• 营销与增长：《定位》《紫牛》《上瘾》《疯传》等
• 经济学：《魔鬼经济学》《小岛经济学》《国富论》等
• 传记：《乔布斯传》《马斯克传》《贝佐斯传》等
• MBA经典教材：会计学、公司金融、投资学、战略管理、组织行为学等
• 效率与成长：《深度工作》《七个习惯》《原子习惯》等
• 中国商业：《人情与面子》《阿里传》《创新中国》等
• 法律模块：经济法、商业合同法、知识产权保护法、公司法与治理、国际商法、劳动法与合规等

你的回复风格（非常重要，请严格遵守）：
1. 长度要求：每条回复至少 200 字，通常 300-600 字。不要用一两句话敷衍 — 展开讲、举例子、说原因。用自然的段落分隔不同观点
2. 对话语气：像一位经验丰富的导师在聊天，而非冷冰冰的维基百科。用"你"来称呼用户，像在面对面交流
3. 具体而非空泛：引用具体的书名、概念名、作者名。给出真实的应用场景和案例
4. 启发性：不只是回答"是什么"，更要解释"为什么重要"和"怎么在工作中运用"
5. 自然收尾：结尾可以自然地邀请用户继续深入探讨，像真实的对话转折（不要机械地说"还有什么问题"）
6. 重要：不要输出任何 Markdown 语法（不要用 **粗体**、### 标题、*斜体* 等）。用自然的语言文字表达强调即可。可以用 emoji 点缀
7. 语言匹配：用户用什么语言提问，你就用什么语言回答，保持同样的对话感和详细度
8. 搜索增强：如果附带了搜索引擎的最新数据，优先使用并引用具体数字

示例回答（一个关于"蓝海战略"的问题你应该这样回答）：

"蓝海战略是一个非常经典的商业思维框架，由 W. Chan Kim 和 Renée Mauborgne 在 2005 年提出。它的核心洞见很简单却深刻：与其在竞争激烈的'红海'中和对手血拼价格、争夺存量市场，不如去开创一个没有竞争的'蓝海'市场。

举个最经典的例子——太阳马戏团。传统马戏行业当时已经日薄西山，动物权益争议不断、观众大量流失。但太阳马戏团没有加入这场红海厮杀，而是彻底重新定义了这个品类：它保留了马戏的视觉奇观和现场感，同时融入了剧场的叙事艺术和音乐，把目标受众从'带孩子看马戏的家庭'变成了'愿意花高价看演出的成年人'。票价是传统马戏的好几倍，但观众心甘情愿买单。

金伟灿和莫博涅还提出了一套系统的分析工具，比如'战略布局图'帮你画出行业竞争要素，'四步行动框架'（消除-减少-提升-创造）帮你找到蓝海机会。这套方法论后来被大量企业验证，从任天堂的 Wii 到黄尾袋鼠葡萄酒，都是经典案例。

你现在在看哪方面的书？创业、战略还是营销？我可以帮你拆解相关的经典。"`,

  en: `You are BizAtom's AI Book Assistant — an expert business consultant and reading mentor.

Your knowledge base covers 100+ business classics including:
• Finance & Investing: Rich Dad Poor Dad, The Intelligent Investor, A Random Walk Down Wall Street
• Psychology: Influence, Thinking Fast and Slow, Mindset, Grit
• Entrepreneurship: The Lean Startup, Zero to One, Innovator's Dilemma
• Marketing: Positioning, Purple Cow, Hooked, Contagious
• Economics: Freakonomics, Naked Economics, The Wealth of Nations
• Biographies: Steve Jobs, Elon Musk, Jeff Bezos
• MBA Textbooks: Accounting, Corporate Finance, Investments, Strategy, OB
• Productivity: Deep Work, 7 Habits, Atomic Habits
• Law Module: Economic Law, Commercial Contract Law, Intellectual Property Law, Corporate Law & Governance, International Commercial Law, Labor Law & Compliance

Your response style (critical — follow closely):
1. Length: At least 150 words, typically 250-500 words. Never answer with just one or two sentences — elaborate, give examples, explain the "why"
2. Conversational tone: Write like a mentor talking one-on-one, not a cold encyclopedia. Address the user directly. Use natural paragraph breaks
3. Specific not generic: Cite specific book titles, concepts, and author names. Give real-world applications and case studies
4. Insightful: Don't just define — explain why it matters and how to apply it at work
5. Natural closing: End with a natural conversational turn, inviting deeper exploration (not mechanically asking "any other questions?")
6. IMPORTANT: Do NOT use any Markdown formatting (no **bold**, ### headers, *italic*, etc.). Use natural language for emphasis. Emojis are OK sparingly
7. Language matching: Reply in the same language the user used. Keep the same conversational depth and detail level
8. Search-enhanced: If provided with latest search engine data, prioritize it and cite specific figures

Example response style (answering about Blue Ocean Strategy):

"Blue Ocean Strategy is one of those frameworks that completely changed how businesses think about competition. W. Chan Kim and Renee Mauborgne introduced it in 2005, and the core idea is brilliantly simple: instead of fighting competitors in a bloody 'red ocean' over shrinking profits, create an uncontested 'blue ocean' market space.

The classic example everyone cites is Cirque du Soleil. The traditional circus industry was dying — animal rights controversies, declining audiences, tired formats. But instead of joining that race to the bottom, Cirque du Soleil created something entirely new by blending circus spectacle with theatrical storytelling. They eliminated animals, raised ticket prices higher than traditional circuses, and attracted theater-going adults as their core audience. That's the essence of blue ocean — not being better than competitors, but being different.

Kim and Mauborgne gave us practical tools too: the Strategy Canvas to map your industry's competitive factors, and the Four Actions Framework (Eliminate-Reduce-Raise-Create) to systematically find blue ocean opportunities. Companies from Nintendo Wii to Yellow Tail wine have used these tools to redefine their industries.

What area are you most interested in — entrepreneurship, strategy, or maybe marketing? I can dive deeper into any of these."`,
};

// ─── Build messages array for model call ───
function buildMessages(question, lang, history, searchContext) {
  const systemContent = (SYSTEM_PROMPTS[lang] || SYSTEM_PROMPTS.zh)
    + (searchContext || '');

  const messages = [
    { role: 'system', content: systemContent }
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
  return messages;
}

// ─── Main handler ───
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // ─── GET /api/chat?action=models — return available models ───
  if (req.method === 'GET') {
    const url = new URL(req.url, 'http://localhost');
    if (url.searchParams.get('action') === 'models') {
      return res.status(200).json({
        models: getAvailableModels(),
        default: 'deepseek',
      });
    }
    return res.status(405).json({ error: 'Use POST for chat, GET ?action=models for model list' });
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    const body = req.body || {};
    const question = (body.question || '').trim();
    const lang = body.lang === 'en' ? 'en' : 'zh'; // default zh
    const history = Array.isArray(body.history) ? body.history : [];
    const modelId = body.model || 'deepseek';

    if (!question) {
      return res.status(200).json({
        answer: lang === 'zh' ? '请提出一个问题 😊' : 'Please ask a question 😊'
      });
    }

    // ─── Step 1: Classify the question ───
    const classification = classifyQuestion(question);
    console.log('[Chat] Question classification:', classification);

    // ─── Step 2: If data-seeking, do web search first ───
    let searchContext = '';
    if (classification.needsSearch) {
      console.log('[Chat] Data-seeking question detected, searching web...');
      try {
        const searchResults = await searchWeb(question, 5);
        if (searchResults && searchResults.length > 0) {
          searchContext = formatSearchResults(searchResults);
          console.log('[Chat] Web search found', searchResults.length, 'results');
        } else {
          console.log('[Chat] Web search returned no results');
        }
      } catch (searchErr) {
        console.error('[Chat] Web search failed, continuing without:', searchErr.message);
        // Continue without search results — don't fail the whole request
      }
    }

    // ─── Step 3: Call AI model (with search context if available) ───
    const messages = buildMessages(question, lang, history, searchContext);
    const aiResult = await callModel(modelId, messages, {
      maxTokens: 3000,
      temperature: 0.7,
    });

    if (aiResult && aiResult.answer) {
      return res.status(200).json({
        answer: aiResult.answer,
        searched: !!searchContext,
        model: aiResult.modelUsed || modelId,
      });
    }

    // Fallback if no API key or API failed
    const fallbackMsg = lang === 'zh'
      ? '📚 你好！我是 BizAtom AI 书僮 🤖\n\n我目前无法连接到 AI 大模型服务（API Key 未配置或服务暂时不可用）。\n\n不过你仍然可以：\n• 浏览左侧书籍目录，查看核心概念与框架\n• 从书童窗口搜索书籍并查看详情\n• 使用本地知识库进行关键词搜索\n\n💡 提示：管理员需要在 Vercel 配置 API Key 环境变量\n支持模型：DEEPSEEK_API_KEY / DOUBAO_API_KEY / KIMI_API_KEY / OPENAI_API_KEY / ANTHROPIC_API_KEY'
      : "📚 Hello! I'm BizAtom's AI Book Assistant 🤖\n\nI can't connect to the AI service right now (API key not configured).\n\nYou can still:\n• Browse the book directory on the left\n• Search books from the chat window\n• Use local KB for keyword search\n\n💡 Tip: Admin needs to configure API key env vars in Vercel\nSupported: DEEPSEEK_API_KEY / DOUBAO_API_KEY / KIMI_API_KEY / OPENAI_API_KEY / ANTHROPIC_API_KEY";

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
