/**
 * AIIPOWER i18n Core Engine
 * 11-language internationalization with auto-detection, persistence, and seamless switching
 */
(function () {
  'use strict';

  const I18N_KEY = 'aiipower_lang';
  const I18N_ATTR = 'data-i18n';
  const I18N_ATTR_PH = 'data-i18n-ph';
  const I18N_ATTR_TITLE = 'data-i18n-title';

  /* ── Supported languages ── */
  const LANGS = [
    { code: 'zh-CN', label: '简体中文', flag: '🇨🇳', dir: 'ltr', font: 'system' },
    { code: 'zh-HK', label: '繁體粵語', flag: '🇭🇰', dir: 'ltr', font: 'system' },
    { code: 'en',    label: 'English',   flag: '🇬🇧', dir: 'ltr', font: 'system' },
    { code: 'ja',    label: '日本語',    flag: '🇯🇵', dir: 'ltr', font: 'system' },
    { code: 'ko',    label: '한국어',    flag: '🇰🇷', dir: 'ltr', font: 'system' },
    { code: 'ms',    label: 'Bahasa Melayu', flag: '🇲🇾', dir: 'ltr', font: 'system' },
    { code: 'fr',    label: 'Français',  flag: '🇫🇷', dir: 'ltr', font: 'system' },
    { code: 'de',    label: 'Deutsch',   flag: '🇩🇪', dir: 'ltr', font: 'system' },
    { code: 'it',    label: 'Italiano',  flag: '🇮🇹', dir: 'ltr', font: 'system' },
    { code: 'es',    label: 'Español',   flag: '🇪🇸', dir: 'ltr', font: 'system' },
    { code: 'ar',    label: 'العربية',   flag: '🇸🇦', dir: 'rtl', font: 'arabic' }
  ];

  let currentLang = 'zh-CN';

  /* ── Detect best language ── */
  function detectLang() {
    const stored = localStorage.getItem(I18N_KEY);
    if (stored && LANGS.some(l => l.code === stored)) return stored;
    const nav = (navigator.language || 'zh-CN').split('-')[0];
    const map = { zh: 'zh-CN', en: 'en', ja: 'ja', ko: 'ko', ms: 'ms', fr: 'fr', de: 'de', it: 'it', es: 'es', ar: 'ar' };
    return map[nav] || 'zh-CN';
  }

  /* ── Get translation ── */
  function t(key, fallback) {
    if (!I18N_DATA || !I18N_DATA[currentLang]) return fallback || key;
    const val = I18N_DATA[currentLang][key];
    return val !== undefined ? val : (fallback || key);
  }

  /* ── Apply to DOM ── */
  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem(I18N_KEY, lang);
    const langInfo = LANGS.find(l => l.code === lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = langInfo ? langInfo.dir : 'ltr';

    // Update document title
    const titleKey = 'meta.title';
    const translatedTitle = t(titleKey);
    if (translatedTitle && translatedTitle !== titleKey) {
      document.title = translatedTitle;
    }

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      const descTranslated = t('meta.desc');
      if (descTranslated && descTranslated !== 'meta.desc') {
        metaDesc.setAttribute('content', descTranslated);
      }
    }

    // Update meta keywords
    const metaKw = document.querySelector('meta[name="keywords"]');
    if (metaKw) {
      const kwTranslated = t('meta.keywords');
      if (kwTranslated && kwTranslated !== 'meta.keywords') {
        metaKw.setAttribute('content', kwTranslated);
      }
    }

    // Text content
    document.querySelectorAll(`[${I18N_ATTR}]`).forEach(el => {
      const key = el.getAttribute(I18N_ATTR);
      const translated = t(key);
      if (translated && translated !== key) {
        // Handle placeholder interpolation: {0}, {1}, etc.
        if (el.hasAttribute(I18N_ATTR_PH)) {
          const phRaw = el.getAttribute(I18N_ATTR_PH);
          const ph = phRaw ? phRaw.split('||') : [];
          let result = translated;
          ph.forEach((p, i) => { result = result.replace(`{${i}}`, p); });
          el.textContent = result;
        } else {
          el.textContent = translated;
        }
      }
    });

    // Title attribute
    document.querySelectorAll(`[${I18N_ATTR_TITLE}]`).forEach(el => {
      const key = el.getAttribute(I18N_ATTR_TITLE);
      const translated = t(key);
      if (translated && translated !== key) el.setAttribute('title', translated);
    });

    // Placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', t(key, key));
    });

    // Update language switcher UI
    updateSwitcher();
  }

  /* ── Build language switcher ── */
  function createSwitcher() {
    const container = document.getElementById('lang-switcher');
    if (!container) return;

    const current = LANGS.find(l => l.code === currentLang) || LANGS[0];
    container.innerHTML = `
      <div class="lang-current" onclick="document.getElementById('lang-dropdown').classList.toggle('open')">
        <span>${current.flag}</span>
        <span class="lang-code">${current.code}</span>
        <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
      </div>
      <div class="lang-dropdown" id="lang-dropdown">
        ${LANGS.map(l => `
          <div class="lang-option ${l.code === currentLang ? 'active' : ''}" onclick="switchLang('${l.code}')">
            <span>${l.flag}</span>
            <span>${l.label}</span>
          </div>
        `).join('')}
      </div>
    `;

    // Close dropdown on outside click
    document.addEventListener('click', function (e) {
      const dropdown = document.getElementById('lang-dropdown');
      const current = document.querySelector('.lang-current');
      if (dropdown && current && !dropdown.contains(e.target) && !current.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }

  function updateSwitcher() {
    const current = LANGS.find(l => l.code === currentLang) || LANGS[0];
    const codeEl = document.querySelector('.lang-code');
    if (codeEl) codeEl.textContent = current.code;
    document.querySelectorAll('.lang-option').forEach(el => {
      el.classList.toggle('active', el.getAttribute('onclick') === `switchLang('${currentLang}')`);
    });
  }

  /* ── Public API ── */
  window.I18N = { LANGS, currentLang, detectLang, t, applyLang, createSwitcher };
  window.switchLang = function (code) {
    applyLang(code);
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) dropdown.classList.remove('open');
  };

  /* ── Init on DOM ready ── */
  document.addEventListener('DOMContentLoaded', function () {
    currentLang = detectLang();
    applyLang(currentLang);
    createSwitcher();
  });
})();
