/**
 * 个人IP SaaS平台 - 核心交互逻辑
 */

// ============ 全局状态管理 ============
const AppState = {
  currentProfession: 'investor',
  template: null,
  isMobileMenuOpen: false,
  modalOpen: false,
};

// ============ DOM元素缓存 ============
const DOM = {
  professionSwitch: null,
  mobileToggle: null,
  mobileMenu: null,
  navbar: null,
  modalOverlay: null,
  toast: null,
};

// ============ 初始化 ============
document.addEventListener('DOMContentLoaded', () => {
  cacheDOM();
  initNavbar();
  initMobileMenu();
  initProfessionSwitch();
  initScrollAnimations();
  initSmoothScroll();
  initModal();
  initToast();
  initParticles();
  loadTemplate(AppState.currentProfession);
});

function cacheDOM() {
  DOM.professionSwitch = document.getElementById('professionSwitch');
  DOM.mobileToggle = document.getElementById('mobileToggle');
  DOM.mobileMenu = document.getElementById('mobileMenu');
  DOM.navbar = document.getElementById('navbar');
  DOM.modalOverlay = document.getElementById('modalOverlay');
  DOM.toast = document.getElementById('toast');
}

// ============ 导航栏 ============
function initNavbar() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      DOM.navbar.classList.add('scrolled');
    } else {
      DOM.navbar.classList.remove('scrolled');
    }
  });

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      const top = s.offsetTop - 100;
      if (window.scrollY >= top) current = s.getAttribute('id');
    });
    document.querySelectorAll('.nav-link').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });
}

// ============ 移动端菜单 ============
function initMobileMenu() {
  DOM.mobileToggle.addEventListener('click', () => {
    AppState.isMobileMenuOpen = !AppState.isMobileMenuOpen;
    DOM.mobileMenu.classList.toggle('active', AppState.isMobileMenuOpen);
    DOM.mobileToggle.textContent = AppState.isMobileMenuOpen ? '✕' : '☰';
  });

  DOM.mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      AppState.isMobileMenuOpen = false;
      DOM.mobileMenu.classList.remove('active');
      DOM.mobileToggle.textContent = '☰';
    });
  });
}

// ============ 领域切换 ============
function initProfessionSwitch() {
  DOM.professionSwitch.addEventListener('change', (e) => {
    const profession = e.target.value;
    AppState.currentProfession = profession;
    loadTemplate(profession);
    showToast(`已切换至「${PROFESSION_TEMPLATES[profession].name}」模板`);
  });
}

// ============ 模板加载 ============
function loadTemplate(professionId) {
  const tpl = PROFESSION_TEMPLATES[professionId];
  AppState.template = tpl;

  // 更新CSS变量
  document.documentElement.style.setProperty('--accent', tpl.color);
  document.documentElement.style.setProperty('--accent-hover', tpl.color + 'cc');
  document.documentElement.style.setProperty('--accent-glow', tpl.color + '4d');

  // 更新Hero区域
  updateHero(tpl);

  // 更新各Section
  updateAboutSection(tpl);
  updateSectionVisibility(tpl);
  updateGallerySection(tpl);
  updateVideoSection(tpl);
  updateAISection(tpl);
  updateProductSection(tpl);
  updateCourseSection(tpl);

  // 更新文档标题
  document.title = `${tpl.hero.name} - ${tpl.name}个人IP | IP Studio`;
}

function updateHero(tpl) {
  document.getElementById('heroName').textContent = tpl.hero.name;
  document.getElementById('heroTitle').textContent = tpl.hero.title;
  document.getElementById('heroSubtitle').textContent = tpl.hero.subtitle;
  document.getElementById('heroBio').textContent = tpl.hero.bio;
  document.getElementById('heroAvatar').textContent = tpl.icon;
  document.getElementById('heroBg').style.background = tpl.gradient;

  const badge = document.getElementById('heroBadge');
  badge.textContent = tpl.icon + ' ' + tpl.name;
  badge.style.borderColor = tpl.color + '4d';
  badge.style.background = tpl.color + '1a';
  badge.style.color = tpl.color;
}

function updateSectionVisibility(tpl) {
  const sectionMap = {
    gallery: document.getElementById('gallery'),
    videos: document.getElementById('videos'),
    courses: document.getElementById('courses'),
  };

  Object.entries(sectionMap).forEach(([key, el]) => {
    if (el) {
      el.style.display = tpl.sections.includes(key) ? '' : 'none';
    }
  });
}

function updateAboutSection(tpl) {
  document.getElementById('aboutName').textContent = tpl.hero.name;
  document.getElementById('aboutBio').textContent = tpl.hero.bio;
  document.getElementById('aboutIcon').textContent = tpl.icon;

  const skillsContainer = document.getElementById('aboutSkills');
  const skills = tpl.id === 'painter' ? ['水墨画', '油画', '抽象表现', '当代艺术', '艺术教育']
    : tpl.id === 'calligrapher' ? ['行书', '草书', '楷书', '篆刻', '书法教育']
    : tpl.id === 'doctor' ? ['心内科', '健康科普', '临床研究', '慢病管理', '医学教育']
    : tpl.id === 'lawyer' ? ['商事诉讼', '知识产权', '公司治理', '劳动法', '法律顾问']
    : tpl.id === 'founder' ? ['创业辅导', '产品策略', '融资顾问', '团队管理', '增长黑客']
    : tpl.id === 'freelancer' ? ['品牌设计', 'UI/UX', '包装设计', '创意指导', '设计教育']
    : ['投资分析', '行业研究', '资产配置', '风险控制', '量化分析'];

  skillsContainer.innerHTML = skills.map(s => `<span class="skill-tag">${s}</span>`).join('');
}

function updateGallerySection(tpl) {
  const container = document.getElementById('galleryContainer');
  if (!container) return;

  const items = tpl.id === 'painter'
    ? ['🏔️', '🌊', '🌸', '🏯', '🌙', '🎋']
    : tpl.id === 'calligrapher'
    ? ['心', '道', '禅', '静', '和', '雅']
    : tpl.id === 'freelancer'
    ? ['🎯', '🎨', '📱', '🏷️', '📦', '✨']
    : [];

  const labels = tpl.id === 'painter'
    ? ['秋水长天', '山居秋暝', '春江水暖', '古寺钟声', '月色如水', '竹影清风']
    : tpl.id === 'calligrapher'
    ? ['心经', '道德经', '禅意', '静观', '和气', '雅集']
    : tpl.id === 'freelancer'
    ? ['品牌VI', 'UI设计', 'App界面', '包装设计', 'Logo设计', '海报设计']
    : [];

  container.innerHTML = items.map((icon, i) => `
    <div class="gallery-item" onclick="openGalleryModal('${labels[i]}')">
      <div class="gallery-placeholder">${icon}<span>${labels[i]}</span></div>
      <div class="gallery-overlay">点击查看详情</div>
    </div>
  `).join('');
}

function updateVideoSection(tpl) {
  const container = document.getElementById('videoContainer');
  if (!container) return;

  container.innerHTML = tpl.videos.map(v => `
    <div class="video-card" onclick="openVideoModal('${v.title}')">
      <div class="video-thumb" style="background: linear-gradient(135deg, ${tpl.color}33, ${tpl.color}11);">🎬</div>
      <div class="video-info">
        <h4>${v.title}</h4>
        <div class="video-meta">
          <span>${v.duration}</span>
          <span>${v.views} 次观看</span>
        </div>
      </div>
    </div>
  `).join('');
}

function updateAISection(tpl) {
  document.getElementById('aiDemoTitle').textContent = tpl.aiDemo.title;
  document.getElementById('aiAvatarIcon').textContent = '🤖';

  const topicsContainer = document.getElementById('aiTopics');
  topicsContainer.innerHTML = tpl.aiDemo.topics.map((topic, i) => `
    <div class="ai-topic" onclick="startAIDemo('${topic}')">
      <span class="ai-topic-icon">${['🎯','💡','🔍','📊'][i]}</span>
      <span class="ai-topic-text">${topic}</span>
    </div>
  `).join('');
}

function updateProductSection(tpl) {
  const container = document.getElementById('productContainer');
  if (!container) return;

  container.innerHTML = tpl.products.map((p, i) => `
    <div class="product-card ${i === 0 ? 'featured' : ''}">
      <div class="product-icon">${['⭐','💎','🎁'][i] || '📦'}</div>
      <h4>${p.name}</h4>
      <p class="product-desc">${p.desc}</p>
      <div class="product-price">${p.price}</div>
      <button class="btn-buy" onclick="openPaymentModal('${p.name}', '${p.price}')">
        💰 立即购买
      </button>
    </div>
  `).join('');
}

function updateCourseSection(tpl) {
  const container = document.getElementById('courseContainer');
  if (!container) return;

  const courses = tpl.id === 'investor'
    ? [{ title: '投资入门30讲', lessons: 30, price: '¥699', icon: '📚' },
       { title: '技术分析实战', lessons: 20, price: '¥499', icon: '📈' },
       { title: '财务分析精讲', lessons: 25, price: '¥599', icon: '📊' }]
    : tpl.id === 'painter'
    ? [{ title: '水墨画入门', lessons: 15, price: '¥399', icon: '🖌️' },
       { title: '写意花鸟技法', lessons: 20, price: '¥599', icon: '🌸' },
       { title: '艺术鉴赏课', lessons: 12, price: '¥299', icon: '🎨' }]
    : tpl.id === 'calligrapher'
    ? [{ title: '楷书入门基础', lessons: 24, price: '¥399', icon: '✍️' },
       { title: '行书创作技法', lessons: 18, price: '¥499', icon: '📜' },
       { title: '篆刻入门课', lessons: 16, price: '¥599', icon: '🔖' }]
    : tpl.id === 'doctor'
    ? [{ title: '家庭健康管理', lessons: 20, price: '¥299', icon: '🏠' },
       { title: '慢病管理指南', lessons: 15, price: '¥199', icon: '💊' },
       { title: '急救知识培训', lessons: 10, price: '¥99', icon: '🚑' }]
    : tpl.id === 'lawyer'
    ? [{ title: '创业法律必修课', lessons: 18, price: '¥499', icon: '⚖️' },
       { title: '劳动合同法精讲', lessons: 12, price: '¥299', icon: '📋' }]
    : tpl.id === 'founder'
    ? [{ title: '从0到1创业课', lessons: 30, price: '¥999', icon: '🚀' },
       { title: '融资实战指南', lessons: 20, price: '¥799', icon: '💰' },
       { title: '产品经理进阶', lessons: 25, price: '¥599', icon: '📦' }]
    : [{ title: '自由设计师之路', lessons: 20, price: '¥499', icon: '💼' },
       { title: '品牌设计进阶', lessons: 18, price: '¥599', icon: '🎨' },
       { title: '接单与报价指南', lessons: 12, price: '¥199', icon: '📝' }];

  container.innerHTML = courses.map(c => `
    <div class="course-card">
      <div class="course-thumb">${c.icon}</div>
      <div class="course-body">
        <h4>${c.title}</h4>
        <p>系统化学习路径，理论+实战，学完即用</p>
        <div class="course-meta">
          <span class="course-price">${c.price}</span>
          <span class="course-lessons">${c.lessons} 节课</span>
        </div>
      </div>
    </div>
  `).join('');
}
