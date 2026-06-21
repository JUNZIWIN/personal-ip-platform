// ============ 滚动动画 ============
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ============ 平滑滚动 ============
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============ 弹窗系统 ============
function initModal() {
  DOM.modalOverlay.addEventListener('click', (e) => {
    if (e.target === DOM.modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && AppState.modalOpen) closeModal();
  });
}

function openModal(title, content) {
  const modal = DOM.modalOverlay.querySelector('.modal');
  modal.querySelector('h3').textContent = title;
  modal.querySelector('.modal-body').innerHTML = content;
  DOM.modalOverlay.classList.add('active');
  AppState.modalOpen = true;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  DOM.modalOverlay.classList.remove('active');
  AppState.modalOpen = false;
  document.body.style.overflow = '';
}

function openGalleryModal(title) {
  openModal(title, `
    <div style="text-align:center; padding:40px; font-size:5rem;">${title.charAt(0) === '🏔️' || title.charAt(0) === '🎯' ? title.charAt(0) : '🖼️'}</div>
    <p style="text-align:center; font-size:1.1rem;">《${title}》</p>
    <p style="text-align:center; color:var(--text-secondary);">作品详情展示区域，可替换为高清图片</p>
    <div style="text-align:center; margin-top:20px;">
      <span style="font-size:0.9rem; color:var(--text-muted);">如需购买原作或授权使用，请联系艺术家</span>
    </div>
  `);
}

function openVideoModal(title) {
  openModal('🎬 ' + title, `
    <div style="aspect-ratio:16/9; background:var(--bg-primary); border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; font-size:4rem; margin-bottom:20px;">
      ▶️
    </div>
    <p style="font-size:1rem;">${title}</p>
    <p style="color:var(--text-secondary); margin-top:8px;">完整视频播放区域 — 可嵌入B站/YouTube/视频号等平台的视频</p>
    <div style="display:flex; gap:12px; margin-top:20px;">
      <button class="btn-outline" style="flex:1;">👍 点赞</button>
      <button class="btn-outline" style="flex:1;">💬 评论</button>
      <button class="btn-outline" style="flex:1;">↗️ 分享</button>
    </div>
  `);
}

function openPaymentModal(name, price) {
  openModal('💳 确认购买', `
    <p style="font-size:1.2rem; font-weight:600;">${name}</p>
    <div class="modal-price">${price}</div>
    <p style="color:var(--text-secondary);">选择支付方式完成购买，款项将直接汇入创作者账户</p>
    <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:12px; margin:20px 0;">
      <button class="btn-outline" style="padding:16px;" onclick="processPayment('wechat')">💚 微信支付</button>
      <button class="btn-outline" style="padding:16px;" onclick="processPayment('alipay')">💙 支付宝</button>
      <button class="btn-outline" style="padding:16px;" onclick="processPayment('bank')">🏦 银行转账</button>
      <button class="btn-outline" style="padding:16px;" onclick="processPayment('card')">💳 信用卡</button>
    </div>
    <p style="font-size:0.8rem; color:var(--text-muted); text-align:center;">
      🔒 安全支付 · 款项直达创作者 · 支持7天无理由退款
    </p>
  `);
}

function processPayment(method) {
  const methodNames = { wechat: '微信支付', alipay: '支付宝', bank: '银行转账', card: '信用卡' };
  closeModal();
  showToast(`正在跳转${methodNames[method]}...`);
  setTimeout(() => showToast('支付功能将在正式环境接入，款项直达创作者银行账户 ✅'), 1500);
}

function startAIDemo(topic) {
  openModal('🤖 AI数字人演示', `
    <div style="background:var(--bg-primary); border-radius:var(--radius-lg); padding:40px; text-align:center; margin-bottom:20px;">
      <div style="font-size:5rem; margin-bottom:16px;">🤖</div>
      <div style="display:flex; align-items:center; justify-content:center; gap:8px; color:var(--success);">
        <span style="width:8px;height:8px;border-radius:50%;background:var(--success);animation:pulse 2s infinite;"></span>
        <span>AI数字人已就绪</span>
      </div>
    </div>
    <p style="font-size:1.1rem; font-weight:600;">讲解主题：${topic}</p>
    <p style="color:var(--text-secondary); margin-top:12px;">
      ✨ 此区域将展示用您的形象和声音生成的AI数字人讲解视频。<br>
      🎙️ 上传5分钟语音样本即可克隆您的声音<br>
      📸 上传照片/视频即可生成您的数字形象<br>
      🎬 输入文案即可自动生成讲解视频
    </p>
    <div style="display:flex; gap:12px; margin-top:20px;">
      <button class="btn-primary" style="flex:1;" onclick="closeModal(); showToast('🎙️ 声音录制功能即将开放')">录制声音样本</button>
      <button class="btn-outline" style="flex:1;" onclick="closeModal(); showToast('📸 形象采集功能即将开放')">上传形象素材</button>
    </div>
    <p style="font-size:0.8rem; color:var(--text-muted); margin-top:16px; text-align:center;">
      生成视频后可一键分发至：小红书 · 抖音 · 视频号 · YouTube · TikTok
    </p>
  `);
}

// ============ Toast通知 ============
function initToast() {
  // Toast element already exists in DOM
}

function showToast(message) {
  DOM.toast.textContent = message;
  DOM.toast.classList.add('show');
  clearTimeout(DOM.toast._timeout);
  DOM.toast._timeout = setTimeout(() => {
    DOM.toast.classList.remove('show');
  }, 2500);
}

// ============ 粒子动画 ============
function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.floor(canvas.width * canvas.height / 15000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const accent = AppState.template?.color || '#c9a84c';

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.globalAlpha = p.opacity;
      ctx.fill();

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const dx = p.x - particles[j].x;
        const dy = p.y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = accent;
          ctx.globalAlpha = (1 - dist / 100) * 0.15;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    });

    animationId = requestAnimationFrame(animate);
  }

  resize();
  createParticles();
  animate();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
}
