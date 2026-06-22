/**
 * BizAtom AI Book Q&A — Vercel Serverless Function
 * Answers questions about business classics using a built-in knowledge base.
 *
 * POST /api/chat  { question: string, lang?: 'zh'|'en' }
 * Returns: { answer: string }
 *
 * To upgrade to real AI: set env var OPENAI_API_KEY or BIZATOM_AI_KEY
 * and the function will call the AI API for questions it can't match.
 */

// ─── Knowledge Base: Business Classics ───
const KNOWLEDGE = [
  // === Strategy & Management ===
  {
    keywords: ["good to great", "从优秀到卓越", "jim collins", "柯林斯", "hedgehog concept", "刺猬理念", "level 5 leadership", "第五级领导", "飞轮", "flywheel"],
    en: {
      title: "Good to Great — Jim Collins",
      brief: "Why some companies make the leap from good to great while others don't.",
      concepts: {
        "Level 5 Leadership": "Leaders who combine extreme personal humility with intense professional will. They channel ambition into the company, not themselves.",
        "First Who, Then What": "Get the right people on the bus first, then decide where to drive it.",
        "The Hedgehog Concept": "The intersection of: what you're deeply passionate about, what you can be the best in the world at, and what drives your economic engine.",
        "The Flywheel Effect": "Sustainable transformations come from a series of consistent pushes — not a single dramatic event.",
        "Confront the Brutal Facts": "Maintain unwavering faith that you'll prevail while confronting the most brutal facts of your reality."
      },
      qa: [
        { q: "What is the main idea of Good to Great?", a: "The main idea is that greatness is not a function of circumstance, but of conscious choice and discipline. Collins identifies key principles — Level 5 Leadership, The Hedgehog Concept, and The Flywheel Effect — that enable good companies to become great ones." },
        { q: "What is the Hedgehog Concept?", a: "The Hedgehog Concept, from Jim Collins' Good to Great, is the intersection of three circles: (1) What you are deeply passionate about, (2) What you can be the best in the world at, and (3) What drives your economic engine. Focus on this intersection and ignore everything else." },
        { q: "What is Level 5 Leadership?", a: "Level 5 Leadership is the highest level in Jim Collins' leadership hierarchy. Level 5 leaders display a paradoxical blend of personal humility and professional will. They are ambitious first and foremost for the company, not themselves." }
      ]
    },
    zh: {
      title: "《从优秀到卓越》—— 吉姆·柯林斯",
      brief: "为什么有些公司能从优秀跨越到卓越，而其他公司却不能。",
      concepts: {
        "第五级领导力": "将极度的个人谦逊与强烈的职业意志相结合的领导者。他们以公司成功为目标，而非个人名利。",
        "先人后事": "先让合适的人上车，再决定开往何处。",
        "刺猬理念": "三个圆的交集：你深深热爱什么、你在什么领域能做到世界最好、什么驱动你的经济引擎。",
        "飞轮效应": "可持续的转变来自于一系列持续不断的推动——而非单一戏剧性事件。",
        "直面残酷现实": "保持必胜信念，同时直面最残酷的现实。"
      },
      qa: [
        { q: "《从优秀到卓越》的核心观点是什么？", a: "核心观点是：卓越不是环境的产物，而是有意识的选择和纪律的结果。柯林斯归纳了关键原则——第五级领导力、刺猬理念和飞轮效应——帮助优秀公司变为卓越公司。" },
        { q: "什么是刺猬理念？", a: "刺猬理念来自吉姆·柯林斯的《从优秀到卓越》，是三个圆的交集：(1) 你深深热爱的，(2) 你能做到世界最好的，以及 (3) 驱动经济引擎的。聚焦这个交集，忽略其他一切。" },
        { q: "什么是第五级领导力？", a: "第五级领导力是柯林斯领导力层级的最高层次。第五级领导者展现出个人谦逊与职业意志的矛盾结合。他们首要为公司成功而非个人名利。" }
      ]
    }
  },
  {
    keywords: ["lean startup", "精益创业", "eric ries", "埃里克·莱斯", "mvp", "最小可行产品", "pivot", "转型", "build measure learn", "构建衡量学习"],
    en: {
      title: "The Lean Startup — Eric Ries",
      brief: "How today's entrepreneurs use continuous innovation to create radically successful businesses.",
      concepts: {
        "Minimum Viable Product (MVP)": "The simplest version of a product that allows you to start the Build-Measure-Learn feedback loop with minimal effort.",
        "Build-Measure-Learn": "The core feedback loop: build a product, measure how customers respond, and learn whether to pivot or persevere.",
        "Validated Learning": "The process of demonstrating empirically that a team has discovered valuable truths about a startup's present and future prospects.",
        "Pivot": "A structured course correction designed to test a new fundamental hypothesis about the product, strategy, and engine of growth.",
        "Innovation Accounting": "A framework for measuring progress when all the traditional metrics (revenue, customers) are effectively zero."
      },
      qa: [
        { q: "What is an MVP?", a: "A Minimum Viable Product is the simplest version of a new product that allows a team to collect the maximum amount of validated learning about customers with the least effort. It's not necessarily the smallest product — it's the fastest path through the Build-Measure-Learn loop." },
        { q: "What is the Build-Measure-Learn loop?", a: "The Build-Measure-Learn loop is the fundamental feedback cycle of the Lean Startup method. You build a minimum viable product, measure how customers actually use it with actionable metrics, and learn whether to pivot (change strategy) or persevere (keep going)." },
        { q: "When should I pivot?", a: "You should consider a pivot when your current strategy is not producing validated learning results, when customer feedback consistently suggests a different direction, or when you discover that your growth engine isn't sustainable. A pivot is a structured change, not random wandering." }
      ]
    },
    zh: {
      title: "《精益创业》—— 埃里克·莱斯",
      brief: "当今创业者如何利用持续创新打造极其成功的企业。",
      concepts: {
        "最小可行产品": "以最小努力启动'构建-衡量-学习'反馈循环的最简产品版本。",
        "构建-衡量-学习": "核心反馈循环：构建产品，衡量客户反应，学习后决定转型还是坚持。",
        "验证式学习": "通过实证证明团队发现关于创业项目现状和前景的有价值真相的过程。",
        "转型": "结构化的方向修正，旨在测试关于产品、战略和增长引擎的新的基本假设。",
        "创新核算": "当所有传统指标（收入、客户）实际上为零时衡量进展的框架。"
      },
      qa: [
        { q: "什么是MVP最小可行产品？", a: "最小可行产品是新产品的极简版本，允许团队用最小努力从客户那里获取最大量的验证式学习。它不是最小的产品——而是通过'构建-衡量-学习'循环的最快路径。" },
        { q: "什么是构建-衡量-学习循环？", a: "构建-衡量-学习循环是精益创业方法的基本反馈周期。你构建一个最小可行产品，用可操作的指标衡量客户实际使用情况，然后学习是转型（改变策略）还是坚持（继续前进）。" }
      ]
    }
  },
  {
    keywords: ["blue ocean", "蓝海战略", "w. chan kim", "金伟灿", "red ocean", "红海", "value innovation", "价值创新"],
    en: {
      title: "Blue Ocean Strategy — W. Chan Kim & Renée Mauborgne",
      brief: "How to create uncontested market space and make the competition irrelevant.",
      concepts: {
        "Red Ocean vs Blue Ocean": "Red oceans represent all existing industries (competing on price, shrinking profit pools). Blue oceans represent unknown market space (creating demand, ample opportunity for growth).",
        "Value Innovation": "The simultaneous pursuit of differentiation and low cost, creating a leap in value for both buyers and the company.",
        "Four Actions Framework": "Eliminate, Reduce, Raise, and Create — to reconstruct buyer value elements and craft a new value curve.",
        "Strategy Canvas": "A diagnostic and action framework for building a compelling blue ocean strategy, visualizing the current state of play in known market space."
      },
      qa: [
        { q: "What is Blue Ocean Strategy?", a: "Blue Ocean Strategy argues that companies should create 'blue oceans' of uncontested market space rather than competing in 'red oceans' where rivals fight over shrinking profit pools. The key tool is Value Innovation — simultaneously pursuing differentiation and low cost." },
        { q: "What is the difference between red and blue oceans?", a: "Red oceans are existing industries with known market boundaries and competitive rules — companies fight for a share of existing demand. Blue oceans are unknown market spaces where demand is created, not fought over — there's ample opportunity for profitable growth." }
      ]
    },
    zh: {
      title: "《蓝海战略》—— 金伟灿、勒妮·莫博涅",
      brief: "如何创造无竞争的市场空间，让竞争变得无关紧要。",
      concepts: {
        "红海 vs 蓝海": "红海代表所有现有行业（价格竞争、利润池缩小）。蓝海代表未知市场空间（创造需求、广阔增长机遇）。",
        "价值创新": "同时追求差异化和低成本，为买方和公司创造价值飞跃。",
        "四步动作框架": "剔除、减少、提升、创造——重构买方价值元素，绘制全新价值曲线。",
        "战略布局图": "构建蓝海战略的诊断和行动框架，可视化已知市场空间的竞争现状。"
      },
      qa: [
        { q: "什么是蓝海战略？", a: "蓝海战略主张企业应创造无竞争的'蓝海'市场空间，而非在竞争对手争夺日益缩小利润池的'红海'中竞争。核心工具是价值创新——同时追求差异化和低成本。" },
        { q: "红海和蓝海有什么区别？", a: "红海是现有行业，市场边界和竞争规则已明确——公司争夺现有需求份额。蓝海是未知市场空间，需求被创造而非争夺——有充足的盈利增长机会。" }
      ]
    }
  },
  {
    keywords: ["innovator's dilemma", "创新者的窘境", "clayton christensen", "克里斯坦森", "disruptive innovation", "颠覆性创新", "sustaining innovation", "延续性创新"],
    en: {
      title: "The Innovator's Dilemma — Clayton Christensen",
      brief: "Why great companies fail: because they do everything right — listening to customers, investing in technology — and still lose their markets to disruptive newcomers.",
      concepts: {
        "Disruptive Innovation": "An innovation that creates a new market and value network, eventually disrupting an existing market by displacing established market-leading firms.",
        "Sustaining Innovation": "Improvements to existing products along dimensions that mainstream customers in major markets have historically valued.",
        "Why Good Companies Fail": "They listen to their best customers, focus on high-margin opportunities, and allocate resources rationally — all of which blind them to disruptive threats from below."
      },
      qa: [
        { q: "What is disruptive innovation?", a: "Disruptive innovation, coined by Clayton Christensen, describes a process where a smaller company with fewer resources successfully challenges established businesses. It starts by targeting overlooked segments, then moves upmarket, eventually displacing incumbents." },
        { q: "Why do successful companies fail?", a: "Christensen argues they fail precisely because they do everything 'right': they listen to customers, invest in sustaining technologies, and pursue higher margins. This makes them blind to disruptive innovations that initially serve smaller, less profitable markets." }
      ]
    },
    zh: {
      title: "《创新者的窘境》—— 克莱顿·克里斯坦森",
      brief: "为什么大公司会失败：正因为他们做对了每件事——倾听客户、投资技术——却仍然被颠覆性新进入者夺走市场。",
      concepts: {
        "颠覆性创新": "创造新市场和价值网络的创新，最终通过取代既有市场领先企业来颠覆现有市场。",
        "延续性创新": "沿着主流客户历来看重的维度对现有产品的改进。",
        "为什么好公司会失败": "他们倾听最佳客户，关注高利润机会，合理分配资源——所有这些让他们对来自低端的颠覆性威胁视而不见。"
      },
      qa: [
        { q: "什么是颠覆性创新？", a: "颠覆性创新是克里斯坦森提出的概念，描述资源较少的小公司如何成功挑战既有企业。它从被忽视的细分市场起步，然后向上移动，最终取代现有企业。" },
        { q: "为什么成功的公司会失败？", a: "克里斯坦森认为它们失败恰恰因为做对了每件事：倾听客户、投资延续性技术、追求更高利润。这使得它们对最初服务更小、利润更低市场的颠覆性创新视而不见。" }
      ]
    }
  },
  {
    keywords: ["zero to one", "从0到1", "peter thiel", "彼得·蒂尔", "垄断", "monopoly", "competition", "secret"],
    en: {
      title: "Zero to One — Peter Thiel",
      brief: "Notes on startups, or how to build the future.",
      concepts: {
        "Zero to One": "Going from 0 to 1 means creating something entirely new (innovation). Going from 1 to n means copying something that works (globalization).",
        "Monopoly vs Competition": "Capitalism and competition are opposites. Monopolies drive progress because the promise of years of monopoly profits provides a powerful incentive to innovate.",
        "Secrets": "There are still great secrets left to be discovered. The contrarian question: 'What important truth do very few people agree with you on?'",
        "Definite Optimism": "A definite view of the future — you can shape it through planning and execution, not just hope things work out."
      },
      qa: [
        { q: "What does Zero to One mean?", a: "Peter Thiel uses Zero to One to mean creating something truly new — an innovation that didn't exist before. Going from 1 to n means copying or scaling existing things. True progress comes from zero-to-one breakthroughs." },
        { q: "Why does Thiel say competition is bad?", a: "Thiel argues that competition erodes profits and distracts from creating real value. Monopolies, by contrast, can invest in long-term innovation because they're not fighting daily price wars. He says 'competition is for losers.'" }
      ]
    },
    zh: {
      title: "《从0到1》—— 彼得·蒂尔",
      brief: "关于创业的笔记，或者说如何构建未来。",
      concepts: {
        "从0到1": "从0到1意味着创造全新事物（创新）。从1到n意味着复制已有成功模式（全球化）。",
        "垄断 vs 竞争": "资本主义与竞争是对立的。垄断推动进步，因为多年垄断利润的承诺提供了强大的创新激励。",
        "秘密": "仍有许多未被发现的伟大秘密。反主流问题：'有什么重要真理是很少人认同你的？'",
        "明确乐观": "对未来的明确看法——你可以通过规划和执行来塑造它，而非只是希望万事顺遂。"
      },
      qa: [
        { q: "从0到1是什么意思？", a: "彼得·蒂尔用'从0到1'指创造真正新的事物——前所未有的创新。从1到n指复制或扩展已有事物。真正的进步来自从0到1的突破。" },
        { q: "为什么蒂尔说竞争是坏事？", a: "蒂尔认为竞争侵蚀利润并让人无法专注创造真正价值。垄断则能投资长期创新，因为不需要每天打价格战。他说'竞争是失败者的事'。" }
      ]
    }
  },
  {
    keywords: ["thinking fast and slow", "思考快与慢", "daniel kahneman", "卡尼曼", "system 1", "system 2", "系统1", "系统2", "cognitive bias", "认知偏差", "prospect theory", "前景理论"],
    en: {
      title: "Thinking, Fast and Slow — Daniel Kahneman",
      brief: "A tour of the mind: the two systems that drive the way we think.",
      concepts: {
        "System 1": "Fast, automatic, intuitive thinking. Operates with little effort and no voluntary control. Responsible for snap judgments and first impressions.",
        "System 2": "Slow, deliberate, analytical thinking. Requires effort and concentration. Engaged for complex calculations and conscious decision-making.",
        "Cognitive Biases": "Systematic errors in thinking: anchoring, availability heuristic, framing effects, loss aversion, overconfidence. Understanding these biases helps make better business decisions.",
        "Prospect Theory": "People value gains and losses differently — losses hurt roughly twice as much as equivalent gains feel good. This explains much of irrational economic behavior."
      },
      qa: [
        { q: "What is System 1 and System 2 thinking?", a: "Kahneman describes two systems: System 1 is fast, intuitive, and automatic — it handles snap judgments. System 2 is slow, deliberate, and analytical — it kicks in for complex reasoning. Most decisions use System 1, which is efficient but prone to bias." },
        { q: "What is loss aversion?", a: "Loss aversion, a key finding of Prospect Theory, shows that people feel losses about twice as intensely as equivalent gains. Losing $100 hurts roughly twice as much as gaining $100 feels good. This explains why people often make irrational risk-averse decisions." }
      ]
    },
    zh: {
      title: "《思考，快与慢》—— 丹尼尔·卡尼曼",
      brief: "思维的旅行：驱动我们思考方式的两种系统。",
      concepts: {
        "系统1": "快速、自动、直觉的思维。几乎不需要努力和意识控制。负责快速判断和第一印象。",
        "系统2": "缓慢、审慎、分析的思维。需要努力和专注。用于复杂计算和有意识的决策。",
        "认知偏差": "思考中的系统性错误：锚定效应、可得性启发、框架效应、损失厌恶、过度自信。理解这些偏差有助于做出更好的商业决策。",
        "前景理论": "人们对得失的估值不同——损失带来的痛苦大约是等量收益带来快乐的两倍。这解释了大量非理性经济行为。"
      },
      qa: [
        { q: "什么是系统1和系统2思维？", a: "卡尼曼描述了两种系统：系统1快速、直觉、自动——处理快速判断。系统2缓慢、审慎、分析——用于复杂推理。大多数决策使用系统1，高效但容易产生偏差。" },
        { q: "什么是损失厌恶？", a: "损失厌恶是前景理论的核心发现，表明人们对损失的感受大约是对等量收益感受的两倍。损失100元的痛苦大约是获得100元快乐的两倍。这解释了人们为何常做出非理性的风险规避决策。" }
      ]
    }
  },
  {
    keywords: ["7 habits", "七个习惯", "stephen covey", "史蒂芬·柯维", "高效能人士", "proactive", "积极主动", "begin with end", "以终为始"],
    en: {
      title: "The 7 Habits of Highly Effective People — Stephen Covey",
      brief: "Powerful lessons in personal change.",
      concepts: {
        "Be Proactive": "Take responsibility for your life. Between stimulus and response, you have the freedom to choose.",
        "Begin with the End in Mind": "Start with a clear destination. Envision what you want in the future so you can work toward it.",
        "Put First Things First": "Prioritize activities that are important but not urgent — quadrant II activities.",
        "Think Win-Win": "Seek mutual benefit in all human interactions.",
        "Seek First to Understand, Then to Be Understood": "Listen with the intent to understand, not to reply.",
        "Synergize": "The whole is greater than the sum of its parts. Creative cooperation produces better solutions.",
        "Sharpen the Saw": "Renew yourself in four dimensions: physical, mental, social/emotional, and spiritual."
      },
      qa: [
        { q: "What are the 7 Habits?", a: "The 7 Habits, in order: (1) Be Proactive, (2) Begin With the End in Mind, (3) Put First Things First, (4) Think Win-Win, (5) Seek First to Understand, Then to Be Understood, (6) Synergize, (7) Sharpen the Saw. The first three focus on personal mastery (private victory), the next three on teamwork (public victory), and the seventh on continuous renewal." }
      ]
    },
    zh: {
      title: "《高效能人士的七个习惯》—— 史蒂芬·柯维",
      brief: "关于个人改变的强大教训。",
      concepts: {
        "积极主动": "为你的生活负责。在刺激与反应之间，你有选择的自由。",
        "以终为始": "从清晰的目的地出发。设想未来的目标，从而为之努力。",
        "要事第一": "优先处理重要但不紧急的事项——第二象限活动。",
        "双赢思维": "在所有人际互动中寻求互惠互利。",
        "知彼解己": "以理解为目的倾听，而非以回复为目的。",
        "统合综效": "整体大于部分之和。创造性合作产生更好的解决方案。",
        "不断更新": "在四个维度更新自我：身体、心智、社会/情感和精神。"
      },
      qa: [
        { q: "七个习惯是什么？", a: "七个习惯依次为：(1)积极主动，(2)以终为始，(3)要事第一，(4)双赢思维，(5)知彼解己，(6)统合综效，(7)不断更新。前三个聚焦个人成功（独立），中间三个聚焦团队协作（互赖），最后一个聚焦持续更新。" }
      ]
    }
  },
  {
    keywords: ["competitive strategy", "竞争战略", "michael porter", "迈克尔·波特", "five forces", "五力模型", "value chain", "价值链", "generic strategies", "通用战略"],
    en: {
      title: "Competitive Strategy — Michael Porter",
      brief: "Techniques for analyzing industries and competitors.",
      concepts: {
        "Five Forces": "Threat of new entrants, bargaining power of suppliers, bargaining power of buyers, threat of substitutes, and industry rivalry. Together they determine industry profitability.",
        "Generic Strategies": "Three strategies for achieving competitive advantage: cost leadership, differentiation, and focus. A company must choose one — being 'stuck in the middle' is a recipe for failure.",
        "Value Chain": "A set of activities that a firm performs to deliver a valuable product or service. Analyzing the value chain reveals sources of competitive advantage."
      },
      qa: [
        { q: "What is Porter's Five Forces?", a: "Porter's Five Forces is a framework for analyzing industry competition: (1) Threat of new entrants, (2) Bargaining power of suppliers, (3) Bargaining power of buyers, (4) Threat of substitute products, (5) Rivalry among existing competitors. These forces collectively determine an industry's profit potential." },
        { q: "What are Porter's generic strategies?", a: "Porter identified three generic strategies: Cost Leadership (being the lowest-cost producer), Differentiation (offering unique features valued by customers), and Focus (targeting a narrow market segment with either cost or differentiation). Companies must choose one to avoid being 'stuck in the middle.'" }
      ]
    },
    zh: {
      title: "《竞争战略》—— 迈克尔·波特",
      brief: "分析行业和竞争对手的技术。",
      concepts: {
        "五力模型": "新进入者威胁、供应商议价能力、买方议价能力、替代品威胁、行业竞争程度。它们共同决定行业盈利能力。",
        "通用战略": "三种实现竞争优势的战略：成本领先、差异化和聚焦。公司必须选择其一——'夹在中间'是失败的配方。",
        "价值链": "企业为交付有价值的产品或服务而执行的一系列活动。分析价值链揭示竞争优势的来源。"
      },
      qa: [
        { q: "什么是波特的五力模型？", a: "波特五力模型是分析行业竞争的框架：(1)新进入者威胁，(2)供应商议价能力，(3)买方议价能力，(4)替代品威胁，(5)现有竞争者之间的竞争。这些力量共同决定行业的利润潜力。" },
        { q: "什么是波特的通用战略？", a: "波特确定了三种通用战略：成本领先（做最低成本生产者）、差异化（提供客户看重的独特特性）和聚焦（针对细分市场实施成本或差异化）。公司必须选择一个来避免'夹在中间'。" }
      ]
    }
  },
  {
    keywords: ["start with why", "从为什么开始", "simon sinek", "西蒙·斯涅克", "golden circle", "黄金圈"],
    en: {
      title: "Start With Why — Simon Sinek",
      brief: "How great leaders inspire everyone to take action.",
      concepts: {
        "The Golden Circle": "WHY (purpose, cause, belief) → HOW (process, values) → WHAT (products, results). Great leaders and organizations communicate from the inside out — starting with WHY.",
        "Law of Diffusion of Innovation": "To reach mass-market success, you must cross the chasm from early adopters to the early majority — roughly 15-18% market penetration."
      },
      qa: [
        { q: "What is the Golden Circle?", a: "Simon Sinek's Golden Circle explains that inspiring leaders and organizations think, act, and communicate from the inside out: starting with WHY (their purpose), then HOW (their process), and finally WHAT (their products). Most companies do the opposite." }
      ]
    },
    zh: {
      title: "《从为什么开始》—— 西蒙·斯涅克",
      brief: "伟大领导者如何激励每个人采取行动。",
      concepts: {
        "黄金圈法则": "为什么（目的、事业、信念）→ 怎么做（流程、价值观）→ 做什么（产品、结果）。伟大领导者和组织从内向外沟通——从为什么开始。",
        "创新扩散法则": "要取得大众市场成功，必须跨越从早期采用者到早期大众的鸿沟——大约15-18%的市场渗透率。"
      },
      qa: [
        { q: "什么是黄金圈法则？", a: "西蒙·斯涅克的黄金圈法则解释了激励型领导者从内向外思考、行动和沟通：从为什么（目的）开始，然后怎么做（流程），最后做什么（产品）。大多数公司恰恰相反。" }
      ]
    }
  }
];

// ─── Simple semantic matcher ───
function matchKnowledge(question, lang = 'en') {
  const q = question.toLowerCase().trim();
  let best = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw.toLowerCase())) score += kw.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (!best || bestScore === 0) return null;

  const data = best[lang] || best.en;
  let answer = `📚 **${data.title}**\n\n${data.brief}\n\n`;

  // Find most relevant concept
  const concepts = Object.entries(data.concepts);
  let bestConcept = null;
  let bestCS = 0;
  for (const [name, desc] of concepts) {
    let cs = 0;
    const terms = name.toLowerCase().split(/[\s-]+/);
    for (const t of terms) {
      if (q.includes(t.slice(0, 5))) cs += 5;
    }
    if (cs > bestCS) { bestCS = cs; bestConcept = { name, desc }; }
  }

  if (bestConcept && bestCS > 0) {
    answer += `**${bestConcept.name}**：${bestConcept.desc}\n\n`;
  }

  // Include concepts summary
  if (concepts.length > 1) {
    answer += `📋 **核心概念一览**：\n`;
    for (const [name] of concepts) {
      answer += `  • ${name}\n`;
    }
  }

  // Check if there's a matching QA
  for (const qa of data.qa) {
    const qaQ = qa.q.toLowerCase();
    const terms = qaQ.split(/\s+/);
    let matchCount = 0;
    for (const t of terms) {
      if (t.length > 3 && q.includes(t.slice(0, Math.min(6, t.length)))) matchCount++;
    }
    if (matchCount >= 2) {
      answer += `\n💡 **精确回答**：${qa.a}`;
      break;
    }
  }

  return answer;
}

// ─── Fallback response when no knowledge match ───
function fallbackResponse(lang = 'en') {
  if (lang === 'zh') {
    return `📚 **我是 BizAtom AI 书僮**，专门回答商业经典书籍相关的问题。

您可以问我关于以下书籍的问题：
• 《从优秀到卓越》— 吉姆·柯林斯
• 《从0到1》— 彼得·蒂尔
• 《精益创业》— 埃里克·莱斯
• 《蓝海战略》— 金伟灿
• 《创新者的窘境》— 克里斯坦森
• 《思考，快与慢》— 丹尼尔·卡尼曼
• 《高效能人士的七个习惯》— 史蒂芬·柯维
• 《竞争战略》— 迈克尔·波特
• 《从为什么开始》— 西蒙·斯涅克

💡 试试问我：
• "什么是蓝海战略？"
• "Explain the Hedgehog Concept"
• "颠覆性创新是什么？"
• "从0到1的核心思想"`;
  }
  return `📚 **I'm the BizAtom AI Book Assistant**, here to answer questions about business classics.

You can ask me about books like:
• Good to Great — Jim Collins
• Zero to One — Peter Thiel
• The Lean Startup — Eric Ries
• Blue Ocean Strategy — W. Chan Kim
• The Innovator's Dilemma — Clayton Christensen
• Thinking, Fast and Slow — Daniel Kahneman
• The 7 Habits — Stephen Covey
• Competitive Strategy — Michael Porter
• Start With Why — Simon Sinek

💡 Try asking me:
• "What is the Hedgehog Concept?"
• "Explain disruptive innovation"
• "什么是五力模型？"
• "Tell me about Zero to One"`;
}

// ─── Main handler ───
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST only' });
  }

  try {
    const { question, lang = 'en' } = req.body || {};
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({ answer: lang === 'zh' ? '请提出一个问题。' : 'Please ask a question.' });
    }

    // Step 1: Try knowledge base
    const kbAnswer = matchKnowledge(question, lang);
    if (kbAnswer) {
      return res.status(200).json({ answer: kbAnswer });
    }

    // Step 2: Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY || process.env.BIZATOM_AI_KEY;
    if (apiKey) {
      try {
        const systemPrompt = lang === 'zh'
          ? '你是BizAtom商原子的AI书僮，专门回答商业经典书籍（如《从优秀到卓越》《蓝海战略》《精益创业》《从0到1》等）的问题。以简洁、专业的方式回答，引用相关概念和框架。始终用中文回复。'
          : 'You are BizAtom\'s AI Book Assistant, specializing in answering questions about business classics (Good to Great, Blue Ocean Strategy, The Lean Startup, Zero to One, etc.). Answer concisely and professionally, referencing relevant concepts and frameworks. Keep answers under 300 words.';

        const aiResp = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: question }
            ],
            max_tokens: 600,
            temperature: 0.7
          })
        });

        if (aiResp.ok) {
          const data = await aiResp.json();
          return res.status(200).json({ answer: data.choices[0].message.content });
        }
      } catch (aiErr) {
        console.error('AI API error:', aiErr.message);
      }
    }

    // Step 3: Fallback
    return res.status(200).json({ answer: fallbackResponse(lang) });
  } catch (err) {
    console.error('Chat error:', err);
    return res.status(500).json({
      answer: '抱歉，处理你的问题时出现了错误。请稍后再试。'
    });
  }
}
