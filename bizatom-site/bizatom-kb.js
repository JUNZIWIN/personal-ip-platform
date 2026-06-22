/* ============================================
   BizAtom.ai Knowledge Base — 100 Business Books
   Category: "textbook" | "bestseller" | "both"
   ============================================ */

var BIZATOM_KB = [
  // ═══════════════════════════════════════════
  // CATEGORY: STRATEGY / COMPETITION
  // ═══════════════════════════════════════════
  {
    id:"good-to-great", cat:"strategy", type:"bestseller",
    zh:{t:"《从优秀到卓越》", a:"吉姆·柯林斯 (Jim Collins)", b:"为什么有些公司能实现从优秀到卓越的跨越？柯林斯团队用5年时间研究了11家实现跨越的公司。",
    c:[["第五级领导力","将极度个人谦逊与强烈职业意志结合，以公司成功为目标而非个人荣耀。第五级领导者'窗外看成功，镜中看失败'。"],
    ["先人后事","先让合适的人上车，让不合适的人下车，再决定开往何处。'人'比'战略'更先。"],
    ["刺猬理念","三个圆的交集：你热爱什么、你能在什么领域做到世界最好、什么驱动你的经济引擎。找到这个交集并坚持。"],
    ["飞轮效应","可持续的转变来自持续不断的推动，而非单一的戏剧性事件。每一步累积动能。"],
    ["直面残酷现实","保持'必胜信念'的同时直面最残酷的现实。斯托克代尔悖论。"]]},
    en:{t:"Good to Great", a:"Jim Collins", b:"Why some companies make the leap... and others don't. A 5-year study of 11 companies that made the transition.",
    c:[["Level 5 Leadership","Paradoxical blend of personal humility and professional will. Window/mirror mentality."],
    ["First Who, Then What","Get the right people on the bus, wrong people off, then figure out where to drive."],
    ["The Hedgehog Concept","Intersection of: what you're passionate about, what you can be best at, what drives your economic engine."],
    ["The Flywheel Effect","Sustainable transformation comes from consistent pushes, not one dramatic event."],
    ["Confront Brutal Facts","Stockdale Paradox: unwavering faith you'll prevail + confront the brutal facts."]]},
    kw:["good to great","从优秀到卓越","jim collins","柯林斯","hedgehog","刺猬","level 5","第五级","飞轮","flywheel"]
  },
  {
    id:"blue-ocean", cat:"strategy", type:"both",
    zh:{t:"《蓝海战略》", a:"金伟灿、勒妮·莫博涅 (W. Chan Kim, Renée Mauborgne)", b:"创造无竞争的市场空间，让竞争变得无关紧要。基于150年来30多个行业的战略行动研究。",
    c:[["红海 vs 蓝海","红海=现有行业边界，竞争激烈（价格战）；蓝海=未知市场空间，创造新需求，竞争无关紧要。"],
    ["价值创新","同时追求差异化和低成本。打破'要么高价值高成本、要么低成本低价值'的取舍困境。"],
    ["四步动作框架","剔除（哪些行业理所当然的因素可以剔除）、减少（哪些应降至行业标准以下）、提升（哪些应拉升至以上）、创造（哪些从未提供过）。"],
    ["战略画布","可视化工具，横轴展示行业竞争要素，纵轴展示投入水平。对比自身与竞品的价值曲线。"]]},
    en:{t:"Blue Ocean Strategy", a:"W. Chan Kim & Renée Mauborgne", b:"Create uncontested market space and make competition irrelevant. Based on 150 years of strategic moves across 30+ industries.",
    c:[["Red vs Blue Ocean","Red = existing industry boundaries, fierce competition. Blue = unknown market, new demand, competition irrelevant."],
    ["Value Innovation","Simultaneous pursuit of differentiation AND low cost. Breaking the value-cost trade-off."],
    ["Four Actions Framework","Eliminate (what factors to eliminate), Reduce (what to reduce below standard), Raise (what to raise above), Create (what never offered before)."],
    ["Strategy Canvas","Visual tool: horizontal axis = competitive factors, vertical = offering level. Compare value curves."]]},
    kw:["blue ocean","蓝海战略","w. chan kim","金伟灿","red ocean","红海","value innovation","价值创新","four actions","四步动作"]
  },
  {
    id:"competitive-strategy", cat:"strategy", type:"textbook",
    zh:{t:"《竞争战略》", a:"迈克尔·波特 (Michael Porter)", b:"分析行业和竞争对手的核心框架。波特三大通用战略定义了商业竞争的基本范式。",
    c:[["五力模型","五大力量决定行业利润：新进入者威胁、供应商议价能力、买方议价能力、替代品威胁、现有竞争者之间的竞争。"],
    ["三大通用战略","成本领先（最低成本生产者）、差异化（独特产品/服务）、聚焦（专注特定市场）。必须选其一，'夹在中间'是失败配方。"],
    ["价值链","企业创造价值的一系列活动——从原材料到最终产品。分析价值链可揭示竞争优势的真正来源。"],
    ["进入壁垒","阻止新竞争者进入的因素：规模经济、产品差异化、资本需求、转换成本、分销渠道。"]]},
    en:{t:"Competitive Strategy", a:"Michael Porter", b:"Techniques for analyzing industries and competitors. The classic framework for strategic thinking.",
    c:[["Five Forces","Five forces determine industry profitability: threat of new entrants, supplier power, buyer power, threat of substitutes, rivalry among competitors."],
    ["Three Generic Strategies","Cost leadership, differentiation, or focus. Must choose one — being 'stuck in the middle' leads to failure."],
    ["Value Chain","Sequence of activities from raw materials to final product. Analyzing reveals true sources of competitive advantage."],
    ["Barriers to Entry","Economies of scale, product differentiation, capital requirements, switching costs, distribution access."]]},
    kw:["porter","波特","five forces","五力","competitive strategy","竞争战略","value chain","价值链","generic strategy","通用战略","cost leadership","成本领先","differentiation","差异化"]
  },
  {
    id:"good-strategy-bad", cat:"strategy", type:"bestseller",
    zh:{t:"《好战略，坏战略》", a:"理查德·鲁梅尔特 (Richard Rumelt)", b:"好战略不是在会议室制定的空洞口号，而是一组连贯的行动方案。",
    c:[["好战略三要素","诊断（定义挑战的本质）、指导方针（应对挑战的总体方法）、连贯行动（协调一致的具体步骤）。"],
    ["坏战略的四个特征","空话套话、不敢直面问题、目标错当战略、目标之间不协调。多数'战略'其实只是愿望清单。"],
    ["核心杠杆点","找到少数几个能撬动全局的关键点，集中力量打穿。'战略不是做更多，是做更少、更好'。"]]},
    en:{t:"Good Strategy, Bad Strategy", a:"Richard Rumelt", b:"Good strategy is a coherent set of actions, not empty slogans from boardrooms.",
    c:[["Kernel of Good Strategy","Diagnosis (nature of the challenge), guiding policy (overall approach), coherent actions (coordinated steps)."],
    ["Four Hallmarks of Bad Strategy","Fluff, failure to face the problem, mistaking goals for strategy, bad strategic objectives."],
    ["Leverage Point","Find a few critical points that can shift the entire system. Concentrate force."]]},
    kw:["rumelt","鲁梅尔特","good strategy","好战略","bad strategy","坏战略","kernel","诊断","指导方针"]
  },

  // ═══════════════════════════════════════════
  // CATEGORY: ENTREPRENEURSHIP / STARTUP
  // ═══════════════════════════════════════════
  {
    id:"zero-to-one", cat:"entrepreneurship", type:"bestseller",
    zh:{t:"《从0到1》", a:"彼得·蒂尔 (Peter Thiel)", b:"关于创业的笔记——或者说，如何构建未来。PayPal创始人的逆向思维指南。",
    c:[["从0到1 vs 从1到n","0→1 = 创造全新事物（创新/垂直进步）。1→n = 复制已有（全球化/水平进步）。真正的创新极少。"],
    ["垄断 vs 竞争","垄断推动进步——多年的垄断利润提供强大的创新激励。'竞争是失败者的事。'创造性的垄断对社会有利。"],
    ["秘密","'有什么重要真理很少人认同你？'这个反主流问题是创新的起点。大多数秘密还有待发现。"],
    ["明确乐观","通过规划和执行来塑造未来，而非只是希望会变好。明确的乐观者创造未来。"],
    ["幂次法则","风险投资回报遵循幂次法则：少数几笔投资带来的回报远超其他所有投资的总和。"]],
    en:{t:"Zero to One", a:"Peter Thiel", b:"Notes on startups — or how to build the future. Contrarian thinking from PayPal's founder.",
    c:[["0→1 vs 1→n","0→1 = creating something new (vertical progress). 1→n = copying what works (horizontal progress)."],
    ["Monopoly vs Competition","Monopolies drive progress. 'Competition is for losers.' Creative monopolies benefit society."],
    ["Secrets","'What important truth do very few agree with you on?' Most secrets are still undiscovered."],
    ["Definite Optimism","Shape the future through planning and execution, not passive hope."],
    ["Power Law","Venture returns follow power law: a few investments vastly outperform all others combined."]]},
    kw:["zero to one","从0到1","peter thiel","彼得·蒂尔","monopoly","垄断","power law","幂次","秘密","secret","definite optimism"]
  },
  {
    id:"lean-startup", cat:"entrepreneurship", type:"bestseller",
    zh:{t:"《精益创业》", a:"埃里克·莱斯 (Eric Ries)", b:"如何用持续创新打造极其成功的企业。'构建-衡量-学习'循环重塑了现代创业方法论。",
    c:[["最小可行产品(MVP)","以最小努力完成'构建-衡量-学习'循环的最简产品版本。不是偷懒，是科学验证。"],
    ["构建-衡量-学习","核心反馈循环：快速构建产品→衡量客户真实反应→学习（验证或推翻假设）→转型或坚持。"],
    ["验证式学习","通过实证证明团队发现了关于客户的有价值真相。'学到了'不等于'验证了'。"],
    ["转型(Pivot)","结构化的方向修正——不放弃愿景，但改变实现路径。产品→客户群→渠道→技术等维度的转型。"],
    ["创新核算","定义、衡量和沟通创新进展的系统方法。不是传统财务指标，而是可操作的里程碑。"]]},
    en:{t:"The Lean Startup", a:"Eric Ries", b:"How continuous innovation creates radically successful businesses. The Build-Measure-Learn loop.",
    c:[["Minimum Viable Product","Simplest version to start Build-Measure-Learn loop. Not laziness — scientific validation."],
    ["Build-Measure-Learn","Core feedback loop: build quickly → measure real customer response → learn → pivot or persevere."],
    ["Validated Learning","Empirically demonstrating valuable truths about customers. 'Learned' ≠ 'validated.'"],
    ["Pivot","Structured course correction: change path, keep vision. Product, customer, channel, tech pivots."],
    ["Innovation Accounting","Systematic way to define, measure, and communicate innovation progress."]]},
    kw:["lean startup","精益创业","eric ries","埃里克·莱斯","mvp","最小可行","pivot","转型","build measure learn","构建衡量学习","validated learning","创新核算"]
  },
  {
    id:"hard-thing", cat:"entrepreneurship", type:"bestseller",
    zh:{t:"《创业维艰》", a:"本·霍洛维茨 (Ben Horowitz)", b:"如何打造伟大的企业——即使天下没有容易的事。硅谷传奇VC的实战经验。",
    c:[["战时CEO vs 平时CEO","战时CEO必须破釜沉舟，必要时独断专行；平时CEO关注流程和文化建设。'没有哪个CEO永远是战时的。'"],
    ["招聘原则","寻找'正确的人'而非'正确的能力'：能力可以培养，性格和价值观不会。"],
    ["解雇与艰难决策","解雇高管的真正障碍不是沟通，而是对自己判断失误的恐惧。做对的决定比拖延迟好。"],
    ["企业文化","文化不是'免费午餐和乒乓球桌'，而是'当没人看时，人们自然做出的行为'。"]]},
    en:{t:"The Hard Thing About Hard Things", a:"Ben Horowitz", b:"Building a business when there are no easy answers. Battle-tested advice from a Silicon Valley legend.",
    c:[["Wartime vs Peacetime CEO","Wartime CEO must be ruthless when necessary. Peacetime CEO builds culture and process."],
    ["Hiring Principles","Look for right WHO not right WHAT. Skills can be taught, character and values cannot."],
    ["Firing & Tough Decisions","The real obstacle to firing execs is fear of admitting your own bad judgment."],
    ["Culture","Not free lunches and ping pong tables. Culture is 'what people do when no one is watching.'"]]},
    kw:["hard thing","创业维艰","ben horowitz","霍洛维茨","wartime ceo","战时","peacetime ceo","平时"]
  },
  {
    id:"innovator-dilemma", cat:"entrepreneurship", type:"both",
    zh:{t:"《创新者的窘境》", a:"克莱顿·克里斯坦森 (Clayton Christensen)", b:"为什么伟大的公司会失败——正因为他们做对了每一件'正确'的事。",
    c:[["颠覆性创新 vs 延续性创新","颠覆性创新从被忽视的细分市场起步（低端市场或新市场），逐步向主流市场迁移，最终取代既有巨头。"],
    ["大公司的困境","倾听最佳客户、聚焦高利润、合理分配资源——恰恰导致对颠覆性威胁'视而不见'。"],
    ["价值网络","企业不会独立决策，而是在其'价值网络'（客户、供应商、合作伙伴）的约束下行动。"],
    ["应对之道","在大组织内部创建独立的小型组织，让其在不受核心业务束缚的环境中追求颠覆性机会。"]]},
    en:{t:"The Innovator's Dilemma", a:"Clayton Christensen", b:"Why great companies fail by doing everything 'right.' The theory of disruptive innovation.",
    c:[["Disruptive vs Sustaining","Disruptive innovation starts with overlooked segments then moves upmarket, displacing incumbents."],
    ["Why Great Companies Fail","Listening to best customers + pursuing high margins + rational allocation = blind to disruption."],
    ["Value Network","Firms do not make independent decisions; they operate within their value network's constraints."],
    ["How to Respond","Create independent small organizations within large ones, free from core business constraints."]]},
    kw:["innovator","创新者的窘境","clayton christensen","克里斯坦森","disrupt","颠覆性","sustaining","value network","价值网络"]
  },
  {
    id:"narrative-economics", cat:"entrepreneurship", type:"both",
    zh:{t:"《叙事经济学》", a:"罗伯特·席勒 (Robert Shiller)", b:"流行故事如何影响经济事件。诺贝尔奖得主揭示'病毒式传播的叙事'是经济波动的关键驱动力。",
    c:[["叙事病毒学","经济叙事像病毒一样传播：感染率、康复率、群体免疫。比特币、房地产泡沫都有'超级叙事'驱动。"],
    ["七个传播模板","节俭、恐慌、技术崇拜、黄金标准、房地产永不跌等反复出现的经济叙事模板。"],
    ["社交媒体放大","社交媒体极大地加速了叙事的传播速度，缩短了经济周期。今日的'梗'就是明日的市场波动。"]]},
    en:{t:"Narrative Economics", a:"Robert Shiller", b:"How popular stories drive economic events. Viral narratives are key drivers of economic fluctuations.",
    c:[["Narrative Virology","Economic narratives spread like viruses: infection rate, recovery rate, herd immunity. Bitcoin and housing bubbles driven by 'super-narratives.'"],
    ["Seven Templates","Frugality, panic, tech worship, gold standard, housing never falls — recurring narrative templates."],
    ["Social Media Amplification","Social media dramatically accelerates narrative spread, shortening economic cycles."]]},
    kw:["narrative economics","叙事经济学","shiller","席勒","viral","病毒","narrative","故事"]
  },

  // ═══════════════════════════════════════════
  // CATEGORY: MARKETING / BRANDING
  // ═══════════════════════════════════════════
  {
    id:"positioning", cat:"marketing", type:"bestseller",
    zh:{t:"《定位》", a:"艾·里斯、杰克·特劳特 (Al Ries, Jack Trout)", b:"有史以来对美国营销影响最大的观念。'定位不是你对产品做的事，而是你对潜在顾客心智做的事。'",
    c:[["心智战争","营销的终极战场在顾客的心智。第一个进入心智的品牌占有巨大优势。'成为第一，胜过做得最好。'"],
    ["定位的三个方法","1) 领导者定位：'正宗货'；2) 跟随者定位：寻找空位（高价/低价/性别/年龄等维度）；3) 重新定位竞争对手：为对手贴标签，创造自己的空位。"],
    ["心智阶梯","每个品类在消费者心智中只有最多7级阶梯。你的品牌站在第几级？如果不在前两级，需要重新定位。"],
    ["名字的力量","名字是品牌与心智的挂钩。一个好名字应该'像钩子一样挂在产品阶梯上'，告诉消费者应该期待什么。"]]},
    en:{t:"Positioning", a:"Al Ries & Jack Trout", b:"The #1 marketing book. 'Positioning is not what you do to a product, but what you do to the mind.'",
    c:[["Battle of the Mind","The ultimate battlefield is the prospect's mind. It's better to be first than to be better."],
    ["Three Positioning Strategies","1) Leader: 'the real thing'; 2) Follower: find a gap; 3) Reposition competitor: create your space."],
    ["The Product Ladder","Maximum 7 rungs per category in consumer mind. What rung is your brand on?"],
    ["The Power of the Name","A great name 'hooks onto the product ladder' and tells consumers what to expect."]]},
    kw:["positioning","定位","al ries","里斯","trout","特劳特","心智","mind","阶梯","ladder","position","name"]
  },
  {
    id:"contagious", cat:"marketing", type:"bestseller",
    zh:{t:"《疯传》", a:"乔纳·伯杰 (Jonah Berger)", b:"让你的产品、思想和行为像病毒一样传播。六大原则引爆口碑传播。",
    c:[["STEPPS六原则","社交货币(Social Currency)、诱因(Triggers)、情绪(Emotion)、公开性(Public)、实用价值(Practical Value)、故事(Stories)。"],
    ["社交货币","人们分享让自己看起来'酷'、'聪明'、'知情'的内容。秘密酒吧、会员制——稀缺让人分享。"],
    ["诱因","环境中的线索会触发相关想法。'周五'是 Rebecca Black 歌曲《Friday》的天然诱因。"],
    ["高唤醒情绪","敬畏、兴奋、幽默（高唤醒）比满足、悲伤（低唤醒）更容易被分享。'令人愤怒'的新闻传播最快。"]]},
    en:{t:"Contagious", a:"Jonah Berger", b:"Why things catch on. Six STEPPS to make products, ideas, and behaviors go viral.",
    c:[["STEPPS","Social Currency, Triggers, Emotion, Public, Practical Value, Stories — 6 principles of contagious content."],
    ["Social Currency","People share things that make them look cool, smart, or in-the-know."],
    ["Triggers","Environmental cues trigger related thoughts. 'Friday' naturally triggers Rebecca Black's song."],
    ["High-Arousal Emotion","Awe, excitement, humor (high arousal) are shared more than contentment, sadness (low arousal)."]]},
    kw:["contagious","疯传","jonah berger","伯杰","viral","病毒","stepps","社交货币","triggers","诱因"]
  },
  {
    id:"tipping-point", cat:"marketing", type:"bestseller",
    zh:{t:"《引爆点》", a:"马尔科姆·格拉德威尔 (Malcolm Gladwell)", b:"小事如何引发大流行。一个创意、产品、或社会现象如何在'临界点'引爆成一场流行病。",
    c:[["流行三法则","少数人法则(少数关键人)、附着力法则(信息如何令人难忘)、环境威力法则(情境的关键性)。"],
    ["三种关键人物","联系人(超级人脉)、内行(信息控)、推销员(说服大师)。找到这三种人是引爆的关键。"],
    ["附着力","微小但关键的改变可以让信息产生'黏性'。芝麻街的成功不是内容多，而是让小孩'粘住屏幕'。"],
    ["150法则","人类大脑最多维持约150人的稳定社交关系。这是打造高效团队和组织的神奇数字。"]]},
    en:{t:"The Tipping Point", a:"Malcolm Gladwell", b:"How little things make a big difference. The moment an idea, trend, or behavior crosses a threshold and spreads like wildfire.",
    c:[["Three Rules of Epidemics","Law of the Few, Stickiness Factor, Power of Context."],
    ["Three Key Types","Connectors (hubs), Mavens (info specialists), Salesmen (persuaders). Find these three to tip."],
    ["Stickiness Factor","Small but critical changes make information memorable. Sesame Street: not more content, but more engagement."],
    ["Rule of 150","Humans max out at ~150 stable social relationships. Magic number for effective teams and organizations."]]},
    kw:["tipping point","引爆点","malcolm gladwell","格拉德威尔","connectors","maven","stickiness","150","联系人","内行","推销员"]
  },

  // ═══════════════════════════════════════════
  // CATEGORY: INVESTING / FINANCE
  // ═══════════════════════════════════════════
  {
    id:"poor-charlie", cat:"finance", type:"bestseller",
    zh:{t:"《穷查理宝典》", a:"查理·芒格 (Charlie Munger)", b:"沃伦·巴菲特的终生搭档、伯克希尔副董事长的智慧箴言。'如果你想变得聪明，首先要避免愚蠢。'",
    c:[["多元思维模型","不要只用一种学科的工具解决所有问题。用历史学、心理学、生物学、数学、物理学等多学科模型来分析决策。"],
    ["逆向思维","'如果我知道将来会死在哪里，我就永远不去那个地方。'先想清楚如何失败，然后避免它。"],
    ["能力圈","只在你能理解的领域下重注。'你必须知道你的优势在哪里，然后在那个圈里竞争。'"],
    ["人类误判心理学","25种导致我们做出错误决策的心理学倾向：激励、损失厌恶、确认偏差、社会认同、可用性等。"],
    ["Lollapalooza效应","当多种力量（心理、经济、社会）同时朝一个方向推动时，产生的效果并不是简单的叠加，而是爆炸式的放大。"]]},
    en:{t:"Poor Charlie's Almanack", a:"Charlie Munger", b:"Wisdom from Buffett's lifelong partner and Berkshire Hathaway's Vice Chairman.",
    c:[["Latticework of Mental Models","Don't use one discipline's tools for everything. Apply history, psychology, biology, math, and physics to decisions."],
    ["Invert, Always Invert","'If I know where I'll die, I'll never go there.' Figure out how to fail first, then avoid it."],
    ["Circle of Competence","Bet big only where you truly understand. Know where your edge is and stay in that circle."],
    ["Psychology of Human Misjudgment","25 tendencies causing bad decisions: incentives, loss aversion, confirmation bias, social proof, etc."],
    ["Lollapalooza Effect","When multiple forces push in the same direction simultaneously — the result is explosive amplification, not just addition."]]},
    kw:["poor charlie","穷查理宝典","charlie munger","查理芒格","芒格","mental model","思维模型","lollapalooza","invert","逆向","misjudgment","误判"]
  },
  {
    id:"naval", cat:"finance", type:"bestseller",
    zh:{t:"《纳瓦尔宝典》", a:"埃里克·乔根森 (Eric Jorgenson)", b:"硅谷最受尊敬的天使投资人纳瓦尔·拉维坎特关于财富与幸福的智慧精粹。'财富是你睡觉时也在赚钱的资产。'",
    c:[["财富 vs 金钱","财富是资产在你不工作时创造价值的能力。金钱是转移财富的方式。地位是你在社会层级中的位置。"],
    ["三种杠杆","劳动力（最古老的杠杆）、资本（管理的资金）、代码和媒体（'无复制边际成本'的产品——新时代最强杠杆）。"],
    ["特定知识","无法被培训出来、无法外包或自动化的知识。来自你的好奇心和天赋的独特组合。'做你自己，没人能跟你竞争。'"],
    ["复利","财富、知识、人际关系——三者都在复利效应下增长。长期主义是最好的竞争策略。"]]},
    en:{t:"The Almanack of Naval Ravikant", a:"Eric Jorgenson", b:"Wisdom about wealth and happiness from Silicon Valley's most respected angel investor.",
    c:[["Wealth vs Money","Wealth is assets earning while you sleep. Money is how we transfer wealth. Status is your rank in the social hierarchy."],
    ["Three Leverages","Labor (oldest), capital (managed money), code & media (zero marginal cost of replication — strongest modern leverage)."],
    ["Specific Knowledge","Cannot be trained, outsourced, or automated. Unique combination of curiosity and talent. 'Be yourself—no one can compete with you.'"],
    ["Compound Interest","Wealth, knowledge, relationships all compound. Long-term thinking is the ultimate competitive edge."]]},
    kw:["naval","纳瓦尔","naval ravikant","拉维坎特","almanack","wealth","财富","leverage","杠杆","specific knowledge","特定知识","compound"]
  },
  {
    id:"dhandho", cat:"finance", type:"bestseller",
    zh:{t:"《憨夺型投资者》", a:"莫尼什·帕伯莱 (Mohnish Pabrai)", b:"印度Patel族人的低风险高回报投资哲学。'Heads I win; tails I don't lose much.'",
    c:[["憨夺框架","找到'赢面大、输面小'的不对称机会。核心原则：专注于下行保护，让上行自然发生。"],
    ["克隆与复制","不要试图重新发明轮子。直接复制经过验证的成功模式——这也是巴菲特/芒格投资法在印度背景下的应用。"],
    ["少数好主意","一生只需要少数几个好主意就足够了。'投资行业里，不频繁出手是最大的优势之一。'"]]},
    en:{t:"The Dhandho Investor", a:"Mohnish Pabrai", b:"Low-risk, high-return investment philosophy inspired by the Patel community. 'Heads I win, tails I don't lose much.'",
    c:[["Dhandho Framework","Find asymmetric opportunities: big upside, small downside. Focus on downside protection; upside takes care of itself."],
    ["Cloning and Copying","Don't reinvent the wheel. Clone proven successful models — Buffett/Munger approach applied in Indian context."],
    ["Few Bets","A lifetime only needs a few great ideas. Infrequent action is one of the biggest advantages in investing."]]},
    kw:["dhandho","憨夺","mohnish pabrai","帕伯莱","low risk","不对称","asymmetric","clone","heads i win"]
  },

  // ═══════════════════════════════════════════
  // CATEGORY: PSYCHOLOGY / BEHAVIORAL ECONOMICS
  // ═══════════════════════════════════════════
  {
    id:"thinking-fast", cat:"psychology", type:"both",
    zh:{t:"《思考，快与慢》", a:"丹尼尔·卡尼曼 (Daniel Kahneman)", b:"诺贝尔奖得主关于人类决策机制的开创性著作。揭示驱动我们思考的两种系统。",
    c:[["系统1 & 系统2","系统1=快速、自动、直觉（高效但易偏差）。系统2=缓慢、审慎、分析（准确但懒惰）。大多数决策由系统1主导。"],
    ["损失厌恶","损失带来的痛苦≈等量收益带来快乐的两倍。这是前景理论的核心发现，深刻影响投资和消费决策。"],
    ["锚定效应","初始接触的数字（即使完全不相关）会显著影响后续判断。谈判、定价、量刑中无处不在。"],
    ["可得性启发","人们根据记忆中提取例子的容易程度来判断事件概率。'新闻报道越多的事故，人们越觉得经常发生。'"],
    ["回归均值","极端表现之后，下一次往往向平均水平回归。但人们总会为'回归'找到因果解释——这是认知错觉。"]]},
    en:{t:"Thinking, Fast and Slow", a:"Daniel Kahneman", b:"Nobel laureate's groundbreaking work on human judgment and decision-making.",
    c:[["System 1 & System 2","S1=fast, automatic, intuitive (efficient but biased). S2=slow, deliberate, analytical (accurate but lazy)."],
    ["Loss Aversion","Losses hurt ~2x more than equivalent gains feel good. Core finding of Prospect Theory."],
    ["Anchoring","Initial exposure to a number significantly affects subsequent judgments — everywhere from negotiation to pricing."],
    ["Availability Heuristic","People judge event probability by how easily examples come to mind. More news = perceived as more frequent."],
    ["Regression to the Mean","After extremes, next performance regresses toward average. People always invent causal explanations."]]},
    kw:["thinking fast","思考快与慢","kahneman","卡尼曼","system 1","系统1","system 2","系统2","loss aversion","损失厌恶","prospect","前景","anchoring","锚定"]
  },
  {
    id:"influence", cat:"psychology", type:"bestseller",
    zh:{t:"《影响力》", a:"罗伯特·西奥迪尼 (Robert Cialdini)", b:"心理学经典——揭示说服的六大武器。'我们之所以被说服，不是因为推理，而是因为'自动固定行为模式'被触发。'",
    c:[["六大影响力武器","互惠、承诺一致性、社会认同、喜好、权威、稀缺——六条影响他人的'心理捷径'。"],
    ["互惠","人们天生倾向于回报别人的恩惠。免费样品之所以有效，因为收到后你感觉'欠了人情'。"],
    ["社会认同","在不确定情境下，我们会参照他人的行为来决定自己的行为。'75%的人选择这款'比任何理性论述更有效。"],
    ["稀缺","机会越稀缺，越被渴望。'限量版''最后三天''只剩一件'触发人们对失去的恐惧。"],
    ["承诺一致性","一旦做出选择或承诺，人会倾向于与自己立场保持一致。'脚在门里'战术利用这个心理。"]]},
    en:{t:"Influence", a:"Robert Cialdini", b:"The psychology of persuasion. Six weapons of influence that trigger automatic compliance.",
    c:[["Six Weapons","Reciprocation, Commitment/Consistency, Social Proof, Liking, Authority, Scarcity."],
    ["Reciprocation","We feel obligated to return favors. Free samples work because you feel 'indebted' after receiving."],
    ["Social Proof","In uncertainty, we copy others' behavior. '75% of people chose this' beats any rational argument."],
    ["Scarcity","Less available = more desirable. 'Limited edition,' 'last 3 days,' 'only 1 left' trigger fear of missing out."],
    ["Commitment & Consistency","Once we choose or commit, we tend to act consistently with that stance. Foot-in-the-door technique."]]},
    kw:["influence","影响力","cialdini","西奥迪尼","persuasion","说服","reciprocity","互惠","social proof","社会认同","scarcity","稀缺","commitment","承诺"]
  },

  // ═══════════════════════════════════════════
  // CATEGORY: LEADERSHIP / MANAGEMENT
  // ═══════════════════════════════════════════
  {
    id:"7-habits", cat:"leadership", type:"bestseller",
    zh:{t:"《高效能人士的七个习惯》", a:"史蒂芬·柯维 (Stephen Covey)", b:"全球销量超4000万册的个人效能经典。从依赖→独立→互赖的三阶段成长模型。",
    c:[["习惯1:积极主动","在刺激与反应之间，你有选择的自由。不把问题归咎于环境，而是问'我能做什么'。"],
    ["习惯2:以终为始","从清晰的'终点'出发——你希望别人在你的葬礼上如何评价你？据此倒推今天该做什么。"],
    ["习惯3:要事第一","优先处理重要但不紧急的'第二象限'事项。如果不在日程表上创造时间，它永远不会发生。"],
    ["习惯4:双赢思维","在所有互动中寻求互惠互利。不是'你赢我输'也不是'我赢你输'，而是创造第三种可能。"],
    ["习惯5:知彼解己","先努力理解对方，再寻求被理解。绝大多数人聆听是为了回复，而非理解。"],
    ["习惯6:统合综效","1+1>3——创造性合作的成果不是妥协，而是携手创造出任何一方单独无法完成的东西。"]]},
    en:{t:"The 7 Habits of Highly Effective People", a:"Stephen Covey", b:"The #1 personal effectiveness classic. Dependence → Independence → Interdependence.",
    c:[["1: Be Proactive","Between stimulus and response lies your freedom to choose. Don't blame circumstances — ask 'what can I do?'"],
    ["2: Begin With the End","Start with a clear 'end' — what would you want said at your funeral? Work backwards from that."],
    ["3: First Things First","Prioritize important-but-not-urgent (Quadrant II). If you don't create time on your calendar, it won't happen."],
    ["4: Think Win-Win","Seek mutual benefit in all interactions. Not win-lose or lose-win — create a third possibility."],
    ["5: Seek First to Understand","Diagnose before prescribing. Most people listen to reply, not to understand."],
    ["6: Synergize","1+1>3 — creative cooperation creates something neither could alone. Not compromise, but creation."]]},
    kw:["7 habits","七个习惯","stephen covey","柯维","proactive","积极主动","以终为始","要事第一","双赢","win win","synergize","统合综效","象限","quadrant"]
  },
  {
    id:"start-with-why", cat:"leadership", type:"bestseller",
    zh:{t:"《从为什么开始》", a:"西蒙·斯涅克 (Simon Sinek)", b:"伟大领导者如何激励每个人采取行动。'人们买的不是你做什么，而是你为什么做。'",
    c:[["黄金圈法则","从内向外沟通：Why（目的/信念/使命）→ How（流程/差异化）→ What（产品/服务）。大多数人从What开始，伟大的领导者从Why开始。"],
    ["为什么重要","苹果的Why是'挑战现状，以不同方式思考'。这解释了为什么苹果可以卖电脑、手机、手表，而戴尔只能卖电脑。"],
    ["信任三角","清晰传达Why→吸引相信同样理念的人→建立信任→客户忠诚和自我驱动的团队。"]]},
    en:{t:"Start With Why", a:"Simon Sinek", b:"How great leaders inspire action. 'People don't buy what you do; they buy why you do it.'",
    c:[["The Golden Circle","Communicate inside-out: WHY (purpose/belief) → HOW (process) → WHAT (product). Start from the center."],
    ["Why It Matters","Apple's WHY: challenge the status quo, think differently. That's why Apple can sell computers, phones, and watches — Dell can only sell computers."],
    ["Trust Triangle","Articulate WHY → attract like-minded believers → build trust → customer loyalty and self-driven teams."]]},
    kw:["start with why","从为什么开始","simon sinek","西蒙·斯涅克","golden circle","黄金圈","why how what"]
  },
  {
    id:"principles", cat:"leadership", type:"bestseller",
    zh:{t:"《原则》", a:"瑞·达利欧 (Ray Dalio)", b:"全球最大对冲基金桥水创始人的人生和工作原则。'痛苦+反思=进步'。",
    c:[["极度透明与极度求真","桥水的'创意择优'建立在完全透明的信息和文化基础上。不说实话是对团队最大的伤害。"],
    ["五大步骤","设定目标→发现问题→诊断根源→设计方案→执行。每一步都需要'痛'的分析和'诚实'的面对。"],
    ["痛苦+反思=进步","不要逃避痛苦。每一次痛苦都是一次信号：你的现实模型与真实的现实产生了偏差。抓住信号，分析差距。"],
    ["可信度加权","不是每个人的意见都有相同的分量。对于某个主题有多次成功经验的人，他们的意见权重更高。"]]},
    en:{t:"Principles", a:"Ray Dalio", b:"Life and work principles from the founder of Bridgewater, the world's largest hedge fund.",
    c:[["Radical Truth & Transparency","Bridgewater's 'idea meritocracy' is built on complete transparency. Not speaking truth is the greatest disservice."],
    ["5-Step Process","Set goals → Identify problems → Diagnose root causes → Design solutions → Execute. Each step requires honest analysis."],
    ["Pain + Reflection = Progress","Don't avoid pain. Each pain is a signal: your model of reality has deviated from actual reality."],
    ["Believability-Weighted Decision Making","Not everyone's opinion carries equal weight. Those with repeated success in a domain get higher weight."]]},
    kw:["principles","原则","ray dalio","达利欧","bridgewater","桥水","pain reflection","痛苦反思","transparency","透明","believability","可信度"]
  },
  {
    id:"5-dysfunctions", cat:"leadership", type:"bestseller",
    zh:{t:"《团队协作的五大障碍》", a:"帕特里克·兰西奥尼 (Patrick Lencioni)", b:"为什么聪明人组成的优秀团队仍然失败。以高管寓言的形式揭示团队协作的五层障碍金字塔。",
    c:[["五大障碍金字塔","从底层到顶层：缺乏信任→惧怕冲突→缺乏承诺→逃避责任→无视结果。每一层都是上一层的基础。"],
    ["信任是基石","基于弱点的信任：团队成员愿意在彼此面前暴露自己的弱点、错误和求助需求。"],
    ["建设性冲突","伟大的团队不回避冲突。有信任的前提下，激烈的思想碰撞产生更好的决策——不是人身攻击。"]]},
    en:{t:"The Five Dysfunctions of a Team", a:"Patrick Lencioni", b:"Why talented teams still fail. A leadership fable revealing the five-layer dysfunction pyramid.",
    c:[["Five Dysfunctions Pyramid","Absence of trust → Fear of conflict → Lack of commitment → Avoidance of accountability → Inattention to results."],
    ["Vulnerability-Based Trust","Team members willing to admit weaknesses, mistakes, and ask for help in front of each other."],
    ["Productive Conflict","Great teams don't avoid conflict. With trust as the foundation, passionate debate produces better decisions."]]},
    kw:["five dysfunctions","五大障碍","lencioni","兰西奥尼","team","团队","trust","信任","conflict","冲突","金字塔","pyramid"]
  },

  // ═══════════════════════════════════════════
  // CATEGORY: PHILOSOPHY / THINKING
  // ═══════════════════════════════════════════
  {
    id:"first-principles", cat:"philosophy", type:"bestseller",
    zh:{t:"《第一性原理》", a:"李善友 (Li Shanyou)", b:"颠覆式创新背后的底层认知方法论。破除'类比思维'，用物理学的方式思考商业问题。",
    c:[["什么是第一性原理","将问题分解到最基本的不证自明的'第一原理'层面，从那里开始重新构建解决方案。'不要用别人的蓝图造房子。'"],
    ["类比思维 vs 第一性思维","类比思维='别人这么做，我们也这么做' → 渐进改良。第一性思维='这个问题的最底层本质是什么' → 颠覆式创新。"],
    ["破界创新","打破行业的'隐含假设'。比如马斯克打破'火箭必须是一次性的'这个假设，提出可回收火箭。"],
    ["方法：五个为什么","连续问'为什么'直到触及根本原因。大多数问题在第五个'为什么'时揭示了真正的一性原理。"]]},
    en:{t:"First Principles Thinking", a:"Li Shanyou", b:"The foundational cognitive methodology behind disruptive innovation. Think like a physicist, not an analogist.",
    c:[["What Are First Principles","Decompose problems to their most basic, self-evident truths, then rebuild from there. 'Don't build your house from someone else's blueprint.'"],
    ["Analogy vs First Principles","Analogy: 'They did this, so we will too' → incremental. First principles: 'What is the fundamental truth here?' → breakthrough."],
    ["Breaking Implicit Assumptions","Challenge industry's unspoken assumptions. E.g., Musk challenged 'rockets must be disposable' → reusable rockets."],
    ["5 Whys Method","Keep asking 'why' until you hit the root cause. Most problems reveal their first principle at the fifth 'why.'"]]},
    kw:["first principles","第一性原理","first principle","第一原理","analogy","类比","disrupt","颠覆","5 whys","五个为什么","musk thinking"]
  },
  {
    id:"seeking-wisdom", cat:"philosophy", type:"bestseller",
    zh:{t:"《查理·芒格的智慧》", a:"彼得·贝弗林 (Peter Bevelin)", b:"从达尔文到芒格：探索人类误判和理性决策的底层逻辑。'投资的格栅理论'的详尽阐述。",
    c:[["格栅理论","知识不是孤岛。物理学、生物学、心理学、历史学、数学——每个学科都是理解世界的'格栅'中的一根木条。"],
    ["误判心理学详解","对芒格25种人类误判倾向的深入解析：从'奖励和惩罚的超级反应'到'压力引起的心理变化'。"],
    ["跨学科学习","不能只用一种工具解决所有问题。''对于拿锤子的人来说，所有问题看起来都像钉子'——这就是单一学科的诅咒。'"]]},
    en:{t:"Seeking Wisdom: From Darwin to Munger", a:"Peter Bevelin", b:"Exploring human misjudgment and rational decision-making from an interdisciplinary perspective.",
    c:[["Latticework Theory","Knowledge isn't isolated. Physics, biology, psychology, history, math — each is a slat in understanding the world."],
    ["Psychology of Misjudgment","Deep dive into Munger's 25 tendencies: from super-response to incentives to stress-induced changes."],
    ["Interdisciplinary Learning","'To a man with a hammer, everything looks like a nail.' The curse of single-discipline thinking."]]},
    kw:["seeking wisdom","芒格的智慧","查理芒格","bevelin","贝弗林","latticework","格栅","darwin","达尔文","munger","misjudgment","误判","interdisciplinary","跨学科"]
  },
  {
    id:"black-swan", cat:"philosophy", type:"bestseller",
    zh:{t:"《黑天鹅》", a:"纳西姆·塔勒布 (Nassim Taleb)", b:"如何应对不可预知的未来。'黑天鹅'事件——罕见的、影响巨大的、事后才能解释的——决定了历史的走向。",
    c:[["黑天鹅三属性","稀有性（超出常规预期）、极端冲击（带来巨变）、事后可解释性（发生后人们觉得'早该知道'）。"],
    ["平均斯坦 vs 极端斯坦","平均斯坦（身高、体重）：单个样本不会改变整体。极端斯坦（财富、图书销量）：少数极端值支配整体。"],
    ["叙事谬误","人类大脑倾向于把随机事件编成故事。'事后合理化'让我们以为世界比实际上更可预测。"],
    ["杠铃策略","在极端保守（90%安全资产）和极度冒险（10%高风险高回报）之间分配，避免中庸。'反脆弱'的前身。"]]},
    en:{t:"The Black Swan", a:"Nassim Taleb", b:"The impact of the highly improbable. Black Swans — rare, extreme, retrospectively explainable — drive history.",
    c:[["Three Attributes","Rarity (beyond normal), extreme impact, retrospective predictability ('I knew it all along')."],
    ["Mediocristan vs Extremistan","Mediocristan: no single sample shapes the whole. Extremistan: extreme few dominate everything."],
    ["Narrative Fallacy","Our brain turns random events into stories. Hindsight makes the world seem more predictable than it is."],
    ["Barbell Strategy","Extreme safety (90%) + extreme risk (10%). Avoid the middle. Precursor to 'Antifragile.'"]]},
    kw:["black swan","黑天鹅","nassim taleb","塔勒布","antifragile","extremistan","narrative fallacy","叙事谬误","barbell","杠铃"]
  },

  // ═══════════════════════════════════════════
  // CATEGORY: BIOGRAPHY / STORIES
  // ═══════════════════════════════════════════
  {
    id:"steve-jobs", cat:"biography", type:"bestseller",
    zh:{t:"《史蒂夫·乔布斯传》", a:"沃尔特·艾萨克森 (Walter Isaacson)", b:"唯一授权的乔布斯传记。基于两年40多次深度访谈，以及与100多位家人、朋友、对手的对话。",
    c:[["现实扭曲力场","乔布斯能用强大的信念和激情说服自己和他人'不可能'是可能的。这既是他的超能力，也是他最大的缺陷。"],
    ["简约的极致","'简洁是最高级的复杂。' 乔布斯对产品设计的执念：去掉一切不必要的东西，直到只剩下最本质的元素。"],
    ["站在科技与人文的交叉口","乔布斯最大的天赋不是代码也不是设计，而是直觉地理解'人想要什么，在还没见过之前'。"],
    ["追求卓越","对细节的偏执：即使是用户看不到的内部主板也要'漂亮'。'真正的艺术家会把作品署上自己的名字。'"]]},
    en:{t:"Steve Jobs", a:"Walter Isaacson", b:"The only authorized biography. Based on 40+ interviews with Jobs and conversations with 100+ family, friends, and rivals.",
    c:[["Reality Distortion Field","Jobs could convince himself and others that the impossible was possible through sheer force of belief. His superpower and his flaw."],
    ["Simplicity is the Ultimate Sophistication","Jobs' design obsession: remove everything unnecessary until only the essential remains."],
    ["Intersection of Tech & Humanities","Jobs' greatest gift wasn't code or design — it was intuiting what people wanted before they knew."],
    ["Pursuit of Excellence","Obsession with detail: even the unseen internal boards must be 'beautiful.' 'Real artists sign their work.'"]]},
    kw:["steve jobs","乔布斯","walter isaacson","艾萨克森","apple","苹果","reality distortion","现实扭曲","simplicity","简约","billionaire bio","企业家传记"]
  },
  {
    id:"shoe-dog", cat:"biography", type:"bestseller",
    zh:{t:"《鞋狗》", a:"菲尔·奈特 (Phil Knight)", b:"Nike创始人回忆录。'懦夫从不上路，弱者死在途中，只有我们一直在前行。'",
    c:[["创业本质","不是'找到好点子然后执行'，而是'在一团迷雾中摸索，犯无数错误，侥幸活下来'。"],
    ["信念的力量","Nike创立之初，从美国代理日本跑鞋起步。没有什么宏伟规划，只有'这双鞋很好，我想让更多人穿它'。"],
    ["团队即一切","奈特的'Buttfaces'——一群不完美但极致热爱跑步和运动的人。'最好的团队不是最聪明的，是最在乎的。'"]]},
    en:{t:"Shoe Dog", a:"Phil Knight", b:"Nike founder's memoir. 'The cowards never started, the weak died along the way — that leaves us.'",
    c:[["Startup Reality","Not 'find a great idea and execute' — it's 'fumble in the dark, make countless mistakes, barely survive.'"],
    ["Power of Belief","Nike started importing Japanese running shoes. No grand plan, just: 'This shoe is great, I want more people to wear it.'"],
    ["Team Is Everything","Knight's 'Buttfaces' — imperfect people who deeply loved running. 'The best team isn't the smartest; it's the one that cares most.'"]]},
    kw:["shoe dog","鞋狗","nike","耐克","phil knight","奈特","startup story","创业故事","sneaker","buttfaces"]
  },

  // ═══════════════════════════════════════════
  // CATEGORY: FUTURE / TECHNOLOGY
  // ═══════════════════════════════════════════
  {
    id:"age-revolution", cat:"future", type:"bestseller",
    zh:{t:"《年龄革命》", a:"谢尔盖·扬 (Sergey Young)", b:"我们正在进入长寿的时代。如何在长寿科技的大潮中活到200岁？来自长寿领域顶级投资者的深度洞察。",
    c:[["长寿革命","基因编辑（CRISPR）、再生医学、人工智能药物开发正在从根本上改写'衰老'的定义。'衰老不是必然，而是一种可以被治疗的疾病。'"],
    ["健康寿命 vs 寿命","关键不是活多久，而是'健康地'活多久。在延长寿命之前，先延长'不生病的时间'。"],
    ["长寿科技投资","精准诊断（液体活检、全身MRI）、靶向疗法（mRNA、CAR-T）、器官再生、数字疗法——四大投资方向。"],
    ["个人行动计划","从现在开始：定期全面体检、间歇性禁食、高强度间歇训练、保持社交连接——这四个习惯是科学验证的长寿基础。"]]},
    en:{t:"The Age Revolution", a:"Sergey Young", b:"How to live to 200 in the era of longevity technology. Insights from a top longevity investor.",
    c:[["Longevity Revolution","CRISPR, regenerative medicine, AI drug discovery are redefining 'aging.' Aging is not inevitable — it's a treatable disease."],
    ["Healthspan vs Lifespan","What matters isn't how long you live, but how long you live healthily. Extend disease-free years first."],
    ["Investment Directions","Precision diagnostics, targeted therapy (mRNA, CAR-T), organ regeneration, digital therapeutics."],
    ["Personal Action Plan","Regular comprehensive checkups, intermittent fasting, HIIT, social connection — four science-backed habits for longevity."]]},
    kw:["age revolution","年龄革命","longevity","长寿","sergey young","crispr","lifespan","healthspan","anti aging","抗衰老"]
  },
  {
    id:"elon-musk", cat:"future", type:"bestseller",
    zh:{t:"《硅谷钢铁侠》", a:"阿什利·万斯 (Ashlee Vance)", b:"埃隆·马斯克的传奇人生与火星梦想。一个改变交通、能源和太空旅行的人如何用第一性原理思考。",
    c:[["第一性原理实践","马斯克将每个问题拆解到物理定律层面。'电池组传统上每千瓦时600美元，如果我从原材料算起，只需要80美元。'"],
    ["极端努力","'如果说别人工作50小时，我工作100小时，一年下来我完成的事是别人的两倍。'——这不是虚言，是数学。"],
    ["垂直整合","从特斯拉的工厂到SpaceX的火箭引擎，马斯克拒绝外包核心环节。'如果你外包了引擎，你就外包了公司的灵魂。'"],
    ["使命驱动","'加速世界向可持续能源的过渡'和'让人类成为多星球物种'——这些使命大到足以抵消所有失败和痛苦。"]]},
    en:{t:"Elon Musk", a:"Ashlee Vance", b:"The extraordinary life of the man reshaping transportation, energy, and space travel.",
    c:[["First Principles in Action","Musk decomposes to physics: 'Battery packs cost $600/kWh traditionally. From raw materials, only $80.'"],
    ["Extreme Effort","'If others work 50 hours and I work 100, in a year I accomplish twice as much.' — Not rhetoric, just math."],
    ["Vertical Integration","From Tesla factories to SpaceX engines, Musk refuses to outsource core. 'Outsource the engine, outsource the soul.'"],
    ["Mission-Driven","Accelerating sustainable energy + making humanity multi-planetary. Missions big enough to absorb all failure and pain."]]},
    kw:["elon musk","马斯克","硅谷钢铁侠","ashlee vance","万斯","tesla","spacex","first principles","火星","可持续能源","可持续","sustainable"]
  },

  // ═══════════════════════════════════════════
  // CATEGORY: OPERATIONS / EXECUTION
  // ═══════════════════════════════════════════
  {
    id:"execution", cat:"operations", type:"bestseller",
    zh:{t:"《执行》", a:"拉姆·查兰、拉里·博西迪 (Charan & Bossidy)", b:"'没有执行，一切都是空谈。'世界500强企业执行力的三大基石。",
    c:[["执行三大基石","领导者七大基本行为、文化变革框架、量才适用——三块基石缺一不可。"],
    ["领导者七行为","了解你的企业和员工→实事求是→设定明确目标和优先级→跟进到底→奖励执行者→拓展员工能力→了解自己。"],
    ["人员流程","战略和运营可以借用，但组织能力必须自建。把正确的人放在正确的位置上是执行的第一要务。"]]},
    en:{t:"Execution: The Discipline of Getting Things Done", a:"Larry Bossidy & Ram Charan", b:"Without execution, brilliant strategy is worthless. The 3 building blocks of execution.",
    c:[["3 Building Blocks","Seven leadership behaviors, cultural change framework, putting the right people in the right jobs."],
    ["7 Leadership Behaviors","Know your people & business → insist on realism → set clear goals → follow through → reward doers → expand capabilities → know yourself."],
    ["People Process","Strategy and operations can be borrowed. Organizational capability must be built. Right people in right places is priority #1."]]},
    kw:["execution","执行","larry bossidy","博西迪","ram charan","查兰","getting things done","执行力","people process","人员","follow through","跟进"]
  },

  // ═══════════════════════════════════════════
  // CATEGORY: INNOVATION / CREATIVITY
  // ═══════════════════════════════════════════
  {
    id:"creativity-inc", cat:"innovation", type:"bestseller",
    zh:{t:"《创新公司》", a:"艾德·卡特姆 (Ed Catmull)", b:"皮克斯动画工作室的创始人分享建立持续创新文化的方法。'品质不是偶然，而是一个有意设计的系统。'",
    c:[["智囊团","皮克斯的'智囊团'：一群资深的导演和编剧定期审阅正在制作中的作品。核心规则：只说问题、不说解决方案。"],
    ["拥抱失败","创新意味着走前人没走过的路——必然会失败。皮克斯的文化是'尽早失败、尽快失败、从失败中迭代'。"],
    ["坦诚文化","人人可以提出尖锐反馈，但针对的是'作品'不是'人'。'好的管理者不是消除恐惧，而是让勇敢成为一种习惯。'"],
    ["故事为王","皮克斯的成功秘诀：'故事先行，技术为故事服务。'技术是实现情感的工具，不是目的。"]]},
    en:{t:"Creativity, Inc.", a:"Ed Catmull", b:"Pixar's co-founder on building a culture of sustained creativity.",
    c:[["The Braintrust","Pixar's peer review group: senior directors and writers review works-in-progress. Rule: identify problems, don't prescribe solutions."],
    ["Embrace Failure","Innovation means walking unmarked trails — failure is inevitable. Pixar: fail early, fail fast, iterate from failure."],
    ["Candor Culture","Anyone can give sharp feedback — but it targets the 'work,' not the 'person.' Good managers make bravery a habit."],
    ["Story is King","Pixar's secret: 'Story first, technology serves the story.' Tech is a tool for emotion, never the goal."]]},
    kw:["creativity inc","创新公司","皮克斯","pixar","ed catmull","卡特姆","braintrust","智囊团","story","故事","candor","坦诚"]
  },
  {
    id:"originals", cat:"innovation", type:"bestseller",
    zh:{t:"《离经叛道》", a:"亚当·格兰特 (Adam Grant)", b:"原创思维者如何改变世界——以及为什么'第一批行动者其实有劣势'。沃顿商学院教授的颠覆性研究。",
    c:[["原创者的习惯","原创者并非无所畏惧——他们只是比常人更善于管理恐惧。'最成功的企业家往往是第二批行动者，而非第一批。'"],
    ["战略性拖延","适当的延迟可以让创意酝酿发酵。达芬奇画《蒙娜丽莎》花了16年——不是低效，是迭代。"],
    ["数量孕育质量","莫扎特、巴赫、贝多芬——三人合计创作了超过1000首曲子，但只有少数成为经典。'产出越多，产生经典的概率越高。'"]]},
    en:{t:"Originals", a:"Adam Grant", b:"How non-conformists move the world. Why 'first movers actually have a disadvantage.'",
    c:[["Habits of Originals","Originals aren't fearless — they're just better at managing fear. Most successful entrepreneurs are second movers, not first."],
    ["Strategic Procrastination","Appropriate delay lets ideas incubate. Da Vinci took 16 years on Mona Lisa — not inefficiency, iteration."],
    ["Quantity Breeds Quality","Mozart, Bach, Beethoven: 1000+ compositions combined, few are classics. Produce more, increase odds of greatness."]]},
    kw:["originals","离经叛道","adam grant","格兰特","original","原创","procrastination","拖延","nonconformist","标新立异"]
  },

  // ═══════════════════════════════════════════
  // CATEGORY: OPERATIONS / SUPPLY CHAIN
  // ═══════════════════════════════════════════
  {
    id:"goal", cat:"operations", type:"textbook",
    zh:{t:"《目标》", a:"艾利·高德拉特 (Eliyahu Goldratt)", b:"以管理小说的形式阐述约束理论(TOC)。'任何系统的产出都由其瓶颈决定——找到它，管理它。'",
    c:[["约束理论(TOC)","每一个系统的产出都受到最薄弱环节（瓶颈）的限制。改善非瓶颈环节不会带来整体改善。"],
    ["三种衡量指标","有效产出(Throughput)=系统通过销售产生的赚钱速度。库存(Inventory)=系统投入的全部资金。运营费用(Operating Expense)=将库存转化为有效产出的花费。"],
    ["五步聚焦法","1)识别瓶颈→2)充分利用瓶颈→3)让其他一切配合瓶颈→4)提升瓶颈→5)重复——瓶颈转移，开始新一轮。"]]},
    en:{t:"The Goal", a:"Eliyahu Goldratt", b:"Theory of Constraints in management novel form. 'A system's output is determined by its bottleneck.'",
    c:[["Theory of Constraints","Every system's output is limited by its weakest link. Improving non-bottlenecks achieves nothing overall."],
    ["Three Metrics","Throughput = money generated by sales. Inventory = all money invested. Operating Expense = money spent to convert Inventory into Throughput."],
    ["Five Focusing Steps","Identify bottleneck → Exploit it → Subordinate everything else → Elevate bottleneck → Repeat as new bottlenecks emerge."]]},
    kw:["the goal","目标","goldratt","高德拉特","theory of constraints","约束理论","bottleneck","瓶颈","throughput","有效产出","toc"]
  },
  {
    id:"lean-thinking", cat:"operations", type:"textbook",
    zh:{t:"《精益思想》", a:"詹姆斯·沃麦克、丹尼尔·琼斯 (Womack & Jones)", b:"从丰田生产系统到全球精益运动。精益的五大核心原则。",
    c:[["精益五大原则","1)定义价值(从客户视角)→2)识别价值流→3)让价值流动→4)客户拉动→5)追求完美(持续改善)。"],
    ["消除浪费(Muda)","八种浪费：缺陷、过量生产、等待、未用人才、运输、库存、动作、过度加工。'能省掉的全是浪费。'"],
    ["单件流","批量生产方式效率低。让一件产品在各个环节间"流动"，大幅减少在制品库存和生产周期。"]]},
    en:{t:"Lean Thinking", a:"Womack & Jones", b:"From Toyota Production System to the global lean movement. The five core principles.",
    c:[["Five Lean Principles","Define value (customer perspective) → Map value stream → Create flow → Establish pull → Pursue perfection."],
    ["Eliminate Muda (Waste)","Eight wastes: defects, overproduction, waiting, unused talent, transport, inventory, motion, over-processing."],
    ["One-Piece Flow","Batch processing is inefficient. Let one unit 'flow' through all steps — dramatically reduce WIP and lead time."]]},
    kw:["lean thinking","精益思想","womack","沃麦克","jones","琼斯","tps","丰田","toyota","muda","浪费","单件流","flow"]
  },

  // ═══════════════════════════════════════════
  // ADDITIONAL TOP 100 — CATEGORY: FINANCE (EXPANDED)
  // ═══════════════════════════════════════════
  {
    id:"intelligent-investor", cat:"finance", type:"textbook",
    zh:{t:"《聪明的投资者》", a:"本杰明·格雷厄姆 (Benjamin Graham)", b:"价值投资圣经。巴菲特称其为'有史以来最好的投资书'。",
    c:[["安全边际","以低于内在价值的价格买入，差价就是'安全边际'。'投资的真正秘诀就是：绝对不要亏损。'"],
    ["市场先生","把市场想象成你的'生意伙伴'：每天报一个价格买你的股份或卖给你。他的报价时而疯狂时而合理——你要利用他，而非被他引导。"],
    ["投资 vs 投机","投资基于深入分析，保证本金安全并获得适当回报。其他一切都是投机。"]]},
    en:{t:"The Intelligent Investor", a:"Benjamin Graham", b:"The bible of value investing. Buffett calls it 'the best book on investing ever written.'",
    c:[["Margin of Safety","Buy below intrinsic value. The difference is your margin of safety. 'The secret of investing: Don't lose money.'"],
    ["Mr. Market","Treat the market as a business partner giving daily buy/sell quotes. Sometimes rational, often manic. Use him; don't be led by him."],
    ["Investment vs Speculation","Investment = thorough analysis, safety of principal, adequate return. Everything else is speculation."]]},
    kw:["intelligent investor","聪明的投资者","benjamin graham","格雷厄姆","value investing","价值投资","margin of safety","安全边际","mr market","市场先生"]
  },
  {
    id:"one-up-wall-street", cat:"finance", type:"bestseller",
    zh:{t:"《彼得·林奇的成功投资》", a:"彼得·林奇 (Peter Lynch)", b:"麦哲伦基金传奇经理人的投资法则。'普通人比华尔街专业人士有更大的优势——你只需要观察你的生活。'",
    c:[["从生活中发现","最好的投资机会就在你的日常生活中。你喜欢的品牌、常去的商店、孩子迷恋的产品——这些都是研究起点。"],
    ["六种股票分类","1)缓慢增长型 2)稳定增长型 3)快速增长型 4)周期型 5)困境反转型 6)隐蔽资产型。每种类型需要不同的策略。"],
    ["不要预测市场","'在市场预测上花一分钟，就已经浪费了60秒。'关注公司基本面，而非宏观预测。"]]},
    en:{t:"One Up on Wall Street", a:"Peter Lynch", b:"Magellan Fund's legendary manager on what the average investor can do better than Wall Street.",
    c:[["Invest in What You Know","Best opportunities are in your daily life. Brands you love, stores you frequent, products your kids obsess over."],
    ["Six Stock Categories","Slow growers, stalwarts, fast growers, cyclicals, turnarounds, asset plays. Each needs a different strategy."],
    ["Don't Predict the Market","'A minute spent on market prediction is 60 seconds wasted.' Focus on company fundamentals, not macro forecasts."]]},
    kw:["peter lynch","彼得·林奇","one up","lynch","麦哲伦","magellan","invest what you know","生活中发现","six categories","六种分类"]
  }
];

// ===== Helper: get all book IDs =====
BIZATOM_KB.getAllBooks = function() {
  return this.map(function(b) { return {id:b.id, zh:b.zh, en:b.en, cat:b.cat, type:b.type, kw:b.kw}; });
};

// ===== Helper: get books by category =====
BIZATOM_KB.getByCategory = function(cat) {
  return this.filter(function(b) { return b.cat === cat; });
};

// ===== Helper: get books by type =====
BIZATOM_KB.getByType = function(type) {
  return this.filter(function(b) { return b.type === type || b.type === "both"; });
};
