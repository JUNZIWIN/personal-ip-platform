/**
 * 个人IP SaaS平台 - 多领域配置
 * 知识产权归平台所有
 */
const SITE_CONFIG = {
  platformName: 'IP Studio',
  platformVersion: '1.0.0',
  copyright: '© 2026 IP Studio SaaS Platform. All rights reserved.',
};

const PROFESSION_TEMPLATES = {
  investor: {
    id: 'investor',
    name: '投资人',
    icon: '📈',
    color: '#c9a84c',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    hero: {
      avatar: '',
      name: '张明远',
      title: '独立投资人 / 财经博主',
      subtitle: '专注科技赛道 · 10年投资经验 · 年化回报35%+',
      bio: '前高盛分析师，现为独立投资人。专注于AI、新能源、生物科技等前沿领域的早期投资与研究。通过深度行业分析，为投资者提供独到的市场洞察。'
    },
    sections: ['about', 'videos', 'ai_digital', 'products', 'courses', 'social'],
    videos: [
      { title: '2026下半年科技投资机会', cover: '', duration: '15:30', views: '12.8万' },
      { title: 'AI芯片赛道深度分析', cover: '', duration: '22:15', views: '9.6万' },
      { title: '新能源投资逻辑拆解', cover: '', duration: '18:45', views: '7.3万' },
      { title: '量化交易入门指南', cover: '', duration: '25:00', views: '15.1万' }
    ],
    aiDemo: {
      title: '用我的AI数字人讲解：如何分析投资热点',
      topics: ['科技股估值方法', '宏观经济对A股影响', '新能源赛道机会', 'AI产业链投资地图']
    },
    products: [
      { name: '投资研报·季度会员', price: '¥1,999', desc: '每季度深度行业研报，含个股分析与投资策略' },
      { name: '1对1投资咨询', price: '¥5,000/小时', desc: '个性化投资组合诊断与资产配置建议' },
      { name: '投资入门课程', price: '¥699', desc: '从零开始学投资，30节课系统掌握投资方法论' }
    ]
  },

  painter: {
    id: 'painter',
    name: '画家',
    icon: '🎨',
    color: '#e74c3c',
    gradient: 'linear-gradient(135deg, #2c1810 0%, #3d2317 50%, #1a0f0a 100%)',
    hero: {
      avatar: '',
      name: '陈墨语',
      title: '当代水墨艺术家',
      subtitle: '中国美术家协会会员 · 个展20+场 · 作品被多家美术馆收藏',
      bio: '以当代水墨创作为核心，融合东方哲学与西方抽象表现主义，探索水墨艺术在当代语境下的无限可能。作品曾在北京、上海、纽约、巴黎等地展出。'
    },
    sections: ['about', 'gallery', 'videos', 'ai_digital', 'products', 'courses', 'social'],
    videos: [
      { title: '水墨创作过程全记录', cover: '', duration: '8:20', views: '5.6万' },
      { title: '作品《山水之间》解读', cover: '', duration: '12:10', views: '3.8万' },
      { title: '当代水墨的可能性', cover: '', duration: '20:00', views: '4.2万' }
    ],
    aiDemo: {
      title: '用我的AI数字人讲解：这幅作品背后的创作理念',
      topics: ['《秋山问道》创作解读', '水墨技法与现代审美', '东方美学的当代转化', '艺术收藏入门指南']
    },
    products: [
      { name: '原作《秋水长天》', price: '¥88,000', desc: '纸本水墨 68cm×136cm 2025年创作' },
      { name: '限量版画《山居》', price: '¥2,800', desc: '艺术微喷 50版限量 含艺术家签名证书' },
      { name: '定制肖像画', price: '¥15,000起', desc: '私人定制水墨/油画肖像 含装裱' }
    ]
  },

  calligrapher: {
    id: 'calligrapher',
    name: '书法家',
    icon: '✒️',
    color: '#8b4513',
    gradient: 'linear-gradient(135deg, #1c1410 0%, #2d1f17 50%, #3d2619 100%)',
    hero: {
      avatar: '',
      name: '王逸之',
      title: '书法艺术家 / 篆刻家',
      subtitle: '中国书法家协会会员 · 作品入展全国展15次 · 师从名家30年功力',
      bio: '自幼习书，遍临诸体，尤擅行草与篆刻。以传统为根基，融入现代审美，作品兼具古典韵味与时代气息。致力于书法艺术的传承与创新。'
    },
    sections: ['about', 'gallery', 'videos', 'ai_digital', 'products', 'courses', 'social'],
    videos: [
      { title: '行书《兰亭序》创作演示', cover: '', duration: '10:45', views: '8.2万' },
      { title: '篆刻技法详解', cover: '', duration: '15:30', views: '4.5万' },
      { title: '书法入门：如何选帖', cover: '', duration: '18:00', views: '6.7万' }
    ],
    aiDemo: {
      title: '用我的AI数字人讲解：这件书法作品的艺术价值',
      topics: ['《心经》创作背景与笔法分析', '行草书的章法与节奏', '篆刻艺术的审美标准', '书法收藏与鉴赏入门']
    },
    products: [
      { name: '楷书《心经》原作', price: '¥28,000', desc: '纸本 35cm×138cm 泥金笺' },
      { name: '定制匾额题字', price: '¥5,000起', desc: '企业名/斋号/牌匾 多种书体可选' },
      { name: '篆刻名章定制', price: '¥3,000', desc: '寿山石/青田石 含印谱' }
    ]
  },

  doctor: {
    id: 'doctor',
    name: '医生',
    icon: '🏥',
    color: '#2e86de',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #0d2137 50%, #0f2b47 100%)',
    hero: {
      avatar: '',
      name: '李思远 博士',
      title: '心内科主任医师 / 健康科普达人',
      subtitle: '三甲医院心内科主任 · 20年临床经验 · 全网粉丝200万+',
      bio: '医学博士，主任医师，博士生导师。长期从事心血管疾病的临床诊治与科研工作。致力于用通俗易懂的方式传播医学健康知识，让每个人都成为自己健康的第一责任人。'
    },
    sections: ['about', 'videos', 'ai_digital', 'products', 'courses', 'social'],
    videos: [
      { title: '高血压患者的日常管理', cover: '', duration: '12:00', views: '25.3万' },
      { title: '心梗的早期预警信号', cover: '', duration: '8:30', views: '18.9万' },
      { title: '体检报告怎么看', cover: '', duration: '20:15', views: '32.1万' }
    ],
    aiDemo: {
      title: '用我的AI数字人讲解：心脑血管疾病的预防',
      topics: ['高血压的科学管理方案', '冠心病早期识别与预防', '健康饮食与运动处方', '体检报告关键指标解读']
    },
    products: [
      { name: '线上问诊·单次', price: '¥300', desc: '30分钟视频问诊，专业健康咨询' },
      { name: '健康管理年卡', price: '¥2,999', desc: '全年健康跟踪管理，含4次深度咨询' },
      { name: '《家庭健康手册》', price: '¥99', desc: '电子书+视频课程，覆盖常见疾病防治' }
    ]
  },

  lawyer: {
    id: 'lawyer',
    name: '律师',
    icon: '⚖️',
    color: '#2c3e50',
    gradient: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1a1e24 100%)',
    hero: {
      avatar: '',
      name: '赵明哲',
      title: '高级合伙人律师',
      subtitle: '北京大学法学院硕士 · 执业15年 · 擅长商事诉讼与知识产权',
      bio: '专注于商事争议解决与知识产权保护领域。代理过多起业内具有影响力的案件，为众多知名企业提供法律服务。致力于通过普法让更多人了解法律、运用法律。'
    },
    sections: ['about', 'videos', 'ai_digital', 'products', 'social'],
    videos: [
      { title: '创业公司必知的法律风险', cover: '', duration: '15:20', views: '6.8万' },
      { title: '劳动纠纷维权指南', cover: '', duration: '18:45', views: '8.2万' },
      { title: '知识产权保护实务', cover: '', duration: '22:00', views: '4.5万' }
    ],
    aiDemo: {
      title: '用我的AI数字人讲解：企业法律风险防范',
      topics: ['创业公司股权架构设计', '商业秘密保护策略', '合同审查关键要点', '劳动争议预防与处理']
    },
    products: [
      { name: '法律咨询·单次', price: '¥2,000/小时', desc: '专业法律问题分析与解答' },
      { name: '企业法律顾问', price: '¥30,000/年', desc: '常年法律顾问服务，合同审查+法律咨询' },
      { name: '合同模板套餐', price: '¥499', desc: '20+常用合同模板+使用指南' }
    ]
  },

  founder: {
    id: 'founder',
    name: '创始人',
    icon: '🚀',
    color: '#6c5ce7',
    gradient: 'linear-gradient(135deg, #0f0c29 0%, #1a1245 50%, #24243e 100%)',
    hero: {
      avatar: '',
      name: '林知行',
      title: '连续创业者 / 天使投资人',
      subtitle: '创立3家公司 · 累计融资$50M+ · Forbes 30 Under 30',
      bio: '技术出身的连续创业者，专注于AI与SaaS领域。相信科技的力量能够改变世界，致力于帮助更多创业者实现梦想。分享创业心得、管理经验与行业洞察。'
    },
    sections: ['about', 'videos', 'ai_digital', 'products', 'courses', 'social'],
    videos: [
      { title: '从0到1：我的创业故事', cover: '', duration: '25:00', views: '15.2万' },
      { title: '如何找到PMF', cover: '', duration: '18:30', views: '12.8万' },
      { title: '融资谈判实战技巧', cover: '', duration: '20:15', views: '9.6万' }
    ],
    aiDemo: {
      title: '用我的AI数字人讲解：创业公司的增长方法论',
      topics: ['从0到1的产品策略', '用户增长实战方法论', '创业融资全流程指南', '技术团队搭建与管理']
    },
    products: [
      { name: '创业辅导·1对1', price: '¥8,000/次', desc: '90分钟深度辅导，含商业计划书评审' },
      { name: '《创业实战手册》', price: '¥299', desc: '电子书+配套视频课程' },
      { name: '企业内训·增长工作坊', price: '¥50,000/场', desc: '定制化企业增长培训方案' }
    ]
  },

  freelancer: {
    id: 'freelancer',
    name: '自由职业者',
    icon: '💼',
    color: '#00b894',
    gradient: 'linear-gradient(135deg, #0a1f1a 0%, #0d2a23 50%, #10352c 100%)',
    hero: {
      avatar: '',
      name: '苏小曼',
      title: '独立品牌设计师 / 创意顾问',
      subtitle: '服务50+品牌 · 作品获红点奖 · 设计即语言',
      bio: '独立品牌设计师，专注品牌视觉系统与用户体验设计。相信好的设计能够为品牌赋予灵魂。为初创公司到上市公司提供全链路设计解决方案。'
    },
    sections: ['about', 'gallery', 'videos', 'ai_digital', 'products', 'social'],
    videos: [
      { title: '品牌设计全流程揭秘', cover: '', duration: '16:40', views: '7.8万' },
      { title: 'Logo设计的底层逻辑', cover: '', duration: '12:15', views: '10.2万' },
      { title: '自由设计师如何接单', cover: '', duration: '20:00', views: '5.5万' }
    ],
    aiDemo: {
      title: '用我的AI数字人讲解：品牌设计的核心方法论',
      topics: ['品牌视觉系统搭建', '设计思维的商业应用', '自由职业者生存指南', '如何提升设计溢价']
    },
    products: [
      { name: '品牌VI设计套餐', price: '¥30,000', desc: 'Logo+VI手册+应用系统 60天交付' },
      { name: '包装设计', price: '¥15,000起', desc: '产品包装全案设计 含3D效果图' },
      { name: '设计顾问·月度', price: '¥10,000/月', desc: '按月提供设计咨询与创意指导' }
    ]
  }
};

const SOCIAL_PLATFORMS = {
  domestic: [
    { name: '小红书', icon: '📕', color: '#FF2442', url: '#xiaohongshu' },
    { name: '微信视频号', icon: '🎬', color: '#07C160', url: '#weixin-video' },
    { name: '公众号', icon: '📝', color: '#07C160', url: '#weixin-mp' },
    { name: '飞书', icon: '🐦', color: '#3370FF', url: '#feishu' },
    { name: '抖音', icon: '🎵', color: '#000000', url: '#douyin' },
    { name: 'B站', icon: '📺', color: '#FB7299', url: '#bilibili' }
  ],
  international: [
    { name: 'WhatsApp', icon: '💬', color: '#25D366', url: '#whatsapp' },
    { name: 'LinkedIn', icon: '🔗', color: '#0A66C2', url: '#linkedin' },
    { name: 'Facebook', icon: '📘', color: '#1877F2', url: '#facebook' },
    { name: 'Instagram', icon: '📷', color: '#E4405F', url: '#instagram' },
    { name: 'YouTube', icon: '▶️', color: '#FF0000', url: '#youtube' },
    { name: 'X (Twitter)', icon: '🐦', color: '#1DA1F2', url: '#twitter' }
  ]
};
