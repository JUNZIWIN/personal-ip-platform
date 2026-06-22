/**
 * bowen.html - 个人IP网站专用交互逻辑
 * 精简版，只保留需要的初始化
 */

// ============ DOM 缓存 ============
let navbar, mobileToggle, mobileMenu, toast;

document.addEventListener('DOMContentLoaded', () => {
  // 缓存 DOM
  navbar = document.getElementById('navbar');
  mobileToggle = document.getElementById('mobileToggle');
  mobileMenu = document.getElementById('mobileMenu');
  toast = document.getElementById('toast');

  // 社交媒体链接
  if (typeof SOCIAL_PLATFORMS !== 'undefined') {
    const domesticEl = document.getElementById('domesticSocial');
    const internationalEl = document.getElementById('internationalSocial');
    if (domesticEl) {
      domesticEl.innerHTML = SOCIAL_PLATFORMS.domestic.map(p =>
        '<a href="' + p.url + '" class="social-link-compact" target="_blank">' +
        '<span class="s-icon">' + p.icon + '</span>' +
        '<span class="s-name">' + p.name + '</span></a>'
      ).join('');
    }
    if (internationalEl) {
      internationalEl.innerHTML = SOCIAL_PLATFORMS.international.map(p =>
        '<a href="' + p.url + '" class="social-link-compact" target="_blank">' +
        '<span class="s-icon">' + p.icon + '</span>' +
        '<span class="s-name">' + p.name + '</span></a>'
      ).join('');
    }
  }

  // 初始化
  initNavbar();
  initMobileMenu();
  initParticles();
  initScrollAnimations();
  initSmoothScroll();
  initToast();
});

// ============ 导航栏 ============
function initNavbar() {
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  // 导航高亮
  const sections = document.querySelectorAll('section[id], footer[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    document.querySelectorAll('.nav-link').forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  });
}

// ============ 移动端菜单 ============
function initMobileMenu() {
  if (!mobileToggle || !mobileMenu) return;
  mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('active'));
  });
}

// ============ 粒子背景 ============
function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector('.hero').offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      o: Math.random() * 0.5 + 0.2,
    });
  }
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(124, 109, 240, ' + p.o + ')';
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// ============ 滚动动画 ============
function initScrollAnimations() {
  const items = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.6s ease';
    observer.observe(item);
  });
}

// ============ 平滑滚动 ============
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ============ Toast ============
function initToast() {
  // Toast 由 showToast() 函数触发
}

function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('active');
  setTimeout(() => toast.classList.remove('active'), 3000);
}

// ============ 素材勾选 ============
function toggleCheckCompact(btn) {
  btn.classList.toggle('checked');
  if (btn.classList.contains('checked')) btn.textContent = '✓';
  else btn.textContent = '';
}

// ============ 个人简历功能 ============
let selectedTemplate = null;
let resumeFileData = null;
let resumeFileName = '';

function handleResumeDragOver(e) {
  e.preventDefault();
  const zone = document.getElementById('resumeUploadZone');
  if (zone) zone.style.borderColor = 'var(--accent)';
}

function handleResumeDragLeave(e) {
  e.preventDefault();
  const zone = document.getElementById('resumeUploadZone');
  if (zone) zone.style.borderColor = 'var(--border-color)';
}

function handleResumeDrop(e) {
  e.preventDefault();
  const zone = document.getElementById('resumeUploadZone');
  if (zone) zone.style.borderColor = 'var(--border-color)';
  const file = e.dataTransfer.files[0];
  if (file) processResumeFile(file);
}

function handleResumeFile(e) {
  const file = e.target.files[0];
  if (file) processResumeFile(file);
}

function processResumeFile(file) {
  const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain'];
  if (!validTypes.includes(file.type) && !file.name.endsWith('.txt') && !file.name.endsWith('.doc')) {
    showToast('❌ 仅支持 PDF、Word、TXT 格式');
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    showToast('❌ 文件大小不能超过 10MB');
    return;
  }

  resumeFileData = file;
  resumeFileName = file.name;

  // 显示上传状态
  const statusEl = document.getElementById('resumeStatus');
  const statusText = document.getElementById('resumeStatusText');
  const statusIcon = document.getElementById('resumeStatusIcon');
  const progressBar = document.getElementById('resumeProgressBar');
  const preview = document.getElementById('resumePreview');

  if (statusEl) statusEl.style.display = 'block';
  if (preview) preview.style.display = 'block';

  // 模拟解析进度
  let progress = 0;
  const messages = ['正在读取文件...', '正在解析内容...', '正在生成模板预览...', '完成！'];
  let msgIdx = 0;
  const interval = setInterval(() => {
    progress += 25;
    if (progressBar) progressBar.style.width = progress + '%';
    if (statusText) statusText.textContent = messages[msgIdx] || '完成！';
    if (statusIcon) statusIcon.textContent = progress < 100 ? '⏳' : '✅';
    msgIdx++;
    if (progress >= 100) {
      clearInterval(interval);
      if (statusEl) setTimeout(() => { statusEl.style.display = 'none'; }, 1500);
    }
  }, 500);

  // 更新预览区
  updateResumePreview(file.name);
}

function updateResumePreview(fileName) {
  const previewArea = document.getElementById('resumePreviewArea');
  if (!previewArea) return;

  const nameOnly = fileName.replace(/\.(pdf|docx?|txt)$/i, '');
  const template = selectedTemplate || 'executive';

  const templateStyles = {
    executive: { accent: '#667eea', bg: '#f8f7ff', nameColor: '#764ba2' },
    modern: { accent: '#00c9a7', bg: '#f0fdfa', nameColor: '#00897b' },
    creative: { accent: '#ff6b35', bg: '#fff7f0', nameColor: '#e55a00' },
    classic: { accent: '#7c6df0', bg: '#f9f7ff', nameColor: '#5a4fcf' },
  };

  const s = templateStyles[template] || templateStyles.executive;

  previewArea.innerHTML = `
    <div style="background:${s.bg};border-radius:8px;padding:28px;font-family:sans-serif;">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;padding-bottom:16px;border-bottom:2px solid ${s.accent};">
        <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,${s.accent},${s.nameColor});display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.5rem;font-weight:700;flex-shrink:0;">👤</div>
        <div>
          <h3 style="font-size:1.2rem;color:${s.nameColor};margin:0;">${nameOnly}</h3>
          <p style="font-size:0.8rem;color:#666;margin:4px 0 0;">创始人 / CEO</p>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
        <div>
          <h4 style="font-size:0.85rem;color:${s.accent};margin-bottom:8px;text-transform:uppercase;letter-spacing:1px;">工作经验</h4>
          <div style="margin-bottom:12px;font-size:0.82rem;color:#333;">
            <p style="font-weight:600;margin:0;">创始人 & CEO</p>
            <p style="color:#666;margin:2px 0;font-size:0.75rem;">AIIPOWER LIMITED · 2018 - 至今</p>
            <p style="color:#555;font-size:0.78rem;">AI + IP + POWER 品牌赋能平台，旗下AIP Studio、BizAtom.ai、AIRankRocket</p>
          </div>
          <div style="margin-bottom:12px;font-size:0.82rem;color:#333;">
            <p style="font-weight:600;margin:0;">创始人</p>
            <p style="color:#666;margin:2px 0;font-size:0.75rem;">国教华娱 · 2017 - 至今</p>
            <p style="color:#555;font-size:0.78rem;">文化发展公司，深耕品牌与传媒领域</p>
          </div>
        </div>
        <div>
          <h4 style="font-size:0.85rem;color:${s.accent};margin-bottom:8px;text-transform:uppercase;letter-spacing:1px;">教育背景</h4>
          <div style="margin-bottom:12px;font-size:0.82rem;color:#333;">
            <p style="font-weight:600;margin:0;">MBA 全日制硕士</p>
            <p style="color:#666;margin:2px 0;font-size:0.75rem;">香港中文大学 (CUHK) · 2026 - </p>
          </div>
          <h4 style="font-size:0.85rem;color:${s.accent};margin-bottom:8px;margin-top:16px;text-transform:uppercase;letter-spacing:1px;">核心能力</h4>
          <div style="display:flex;flex-wrap:wrap;gap:6px;">
            <span style="font-size:0.72rem;padding:3px 10px;border-radius:10px;background:${s.accent}18;color:${s.accent};">AI品牌赋能</span>
            <span style="font-size:0.72rem;padding:3px 10px;border-radius:10px;background:${s.accent}18;color:${s.accent};">跨文化沟通</span>
            <span style="font-size:0.72rem;padding:3px 10px;border-radius:10px;background:${s.accent}18;color:${s.accent};">团队管理</span>
            <span style="font-size:0.72rem;padding:3px 10px;border-radius:10px;background:${s.accent}18;color:${s.accent};">创业经验</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // 启用下载按钮
  const downloadBtn = document.getElementById('resumeDownloadBtn');
  if (downloadBtn) downloadBtn.disabled = false;
}

function selectResumeTemplate(type) {
  selectedTemplate = type;

  // 高亮选中的模板卡片
  document.querySelectorAll('.resume-template-card').forEach(card => {
    card.style.border = '2px solid transparent';
    card.style.transform = 'scale(1)';
  });
  const selectedCard = document.querySelector('[data-template="' + type + '"]');
  if (selectedCard) {
    selectedCard.style.border = '2px solid #fff';
    selectedCard.style.transform = 'scale(1.05)';
  }

  // 如果已有文件数据，刷新预览
  if (resumeFileName) {
    updateResumePreview(resumeFileName);
  }
}

function downloadResume() {
  if (!selectedTemplate && !resumeFileName) {
    showToast('⚠️ 请先上传简历并选择模板');
    return;
  }

  // 获取预览区 HTML
  const previewArea = document.getElementById('resumePreviewArea');
  if (!previewArea) return;

  const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>个人简历 - ${resumeFileName ? resumeFileName.replace(/\.(pdf|docx?|txt)$/i, '') : 'Resume'}</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #333; }
</style>
</head>
<body>
${previewArea.innerHTML}
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (resumeFileName ? resumeFileName.replace(/\.(pdf|docx?|txt)$/i, '') : 'resume') + '_custom.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('✅ 简历模板下载成功！');
}
