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
