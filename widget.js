/* ===========================================================
   BizAtom AI Chat Widget — SaaS Edition (widget.js)  v1.0
   ═══════════════════════════════════════════════════════════
   Single-file embeddable AI chat for any website.
   No dependencies. No server needed on the host site.

   Usage:
     <script src="https://bizatom.ai/widget.js"
             data-site="My Site"
             data-theme="orange"
             data-lang="en"
             data-api="https://bizatom.ai/api/widget-chat">
     </script>

   Config (all optional, via data-* attributes):
     data-site            Site name shown in header (default: "BizAtom")
     data-tagline         Subtitle under site name
     data-theme           Color theme: orange|blue|purple|green (default: orange)
     data-lang            Default language: zh|en (default: zh)
     data-api             API endpoint for AI chat
     data-welcome         Welcome message (overrides default)
     data-suggestions     Comma-separated suggestion questions
     data-kb              KB source: "bizatom" (default) or custom URL
     data-kb-url          Full URL to KB JS file
     data-enable-feedback Show feedback UI (true|false, default: false)
   =========================================================== */

(function (global) {
  'use strict';

  /* ===========================================
     1. CONFIGURATION
     =========================================== */
  var SCRIPT_EL = document.currentScript || (function () {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  function attr(key, fallback) {
    var v = SCRIPT_EL.getAttribute('data-' + key);
    return (v !== null && v !== undefined && v !== '') ? v : fallback;
  }

  var CONFIG = {
    site:      attr('site', 'BizAtom'),
    tagline:   attr('tagline', ''),
    theme:     attr('theme', 'orange'),
    lang:      attr('lang', 'zh'),
    api:       attr('api', '/api/widget-chat'),
    welcome:   attr('welcome', ''),
    kb:        attr('kb', 'bizatom'),
    kbUrl:     attr('kb-url', ''),
    enableFeedback: attr('enable-feedback', 'false') === 'true',
    suggestions: (function () {
      var raw = attr('suggestions', '');
      return raw ? raw.split(',').map(function (s) { return s.trim(); }).filter(Boolean) : [];
    })()
  };

  // Default tagline per language
  if (!CONFIG.tagline) {
    CONFIG.tagline = CONFIG.lang === 'zh'
      ? '问我任何商业经典的问题'
      : 'Ask me anything about business classics';
  }

  // ── Theme color palette ──
  var THEMES = {
    orange: { primary: '#F4731F', primaryLight: '#FF8C4A', headerGrad: 'linear-gradient(135deg, #0A1C38, #3B2A6D)' },
    blue:   { primary: '#2563EB', primaryLight: '#60A5FA', headerGrad: 'linear-gradient(135deg, #1E3A5F, #2563EB)' },
    purple: { primary: '#7C3AED', primaryLight: '#A78BFA', headerGrad: 'linear-gradient(135deg, #2D1B69, #7C3AED)' },
    green:  { primary: '#059669', primaryLight: '#34D399', headerGrad: 'linear-gradient(135deg, #064E3B, #059669)' }
  };
  var T = THEMES[CONFIG.theme] || THEMES.orange;

  /* ===========================================
     2. CSS (self-contained, bzw- prefix namespace)
     =========================================== */
  var CSS = ''
  + '#bzw-fab{position:fixed;bottom:28px;right:28px;z-index:2147483646;width:56px;height:56px;border-radius:50%;background:' + T.primary + ';color:#fff;border:0;cursor:pointer;box-shadow:0 6px 24px ' + T.primary + '40;display:flex;align-items:center;justify-content:center;transition:transform .2s,box-shadow .2s,opacity .25s;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,sans-serif}'
  + '#bzw-fab:hover{transform:scale(1.08);box-shadow:0 8px 30px ' + T.primary + '80}'
  + '#bzw-fab svg{width:26px;height:26px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round}'
  + '#bzw-fab.bzw-hidden{opacity:0;pointer-events:none}'
  + '#bzw-fab .bzw-pulse{position:absolute;inset:-6px;border-radius:50%;border:2px solid ' + T.primary + ';animation:bzw-pulse-ring 2s ease-out infinite;opacity:0}'
  + '@keyframes bzw-pulse-ring{0%{transform:scale(.85);opacity:.6}100%{transform:scale(1.35);opacity:0}}'
  + '#bzw-panel{position:fixed;bottom:100px;right:28px;z-index:2147483645;width:380px;max-width:calc(100vw - 40px);height:560px;max-height:calc(100vh - 140px);background:#fff;border-radius:18px;box-shadow:0 12px 48px rgba(10,28,56,.25);display:flex;flex-direction:column;overflow:hidden;transform-origin:bottom right;transition:transform .3s cubic-bezier(.4,0,.2,1),opacity .25s;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,sans-serif}'
  + '#bzw-panel.bzw-collapsed{transform:scale(.7);opacity:0;pointer-events:none}'
  + '#bzw-panel.bzw-fullscreen{bottom:20px;right:20px;width:95vw;max-width:95vw;height:92vh;max-height:92vh;border-radius:18px}'
  + '#bzw-header{background:' + T.headerGrad + ';color:#fff;padding:16px 20px;display:flex;align-items:center;gap:12px;flex-shrink:0}'
  + '#bzw-header .bzw-h-icon{width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;font-size:18px}'
  + '#bzw-header .bzw-h-text{flex:1;min-width:0}'
  + '#bzw-header .bzw-h-text h4{font-size:15px;font-weight:700;line-height:1.2;margin:0;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
  + '#bzw-header .bzw-h-text span{font-size:11px;color:#B7C5DC;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
  + '#bzw-header .bzw-h-close{width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.12);border:0;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;transition:background .2s;flex-shrink:0}'
  + '#bzw-header .bzw-h-close:hover{background:rgba(255,255,255,.22)}'
  + '#bzw-header .bzw-h-fs{width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.12);border:0;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;flex-shrink:0}'
  + '#bzw-header .bzw-h-fs:hover{background:rgba(255,255,255,.22)}'
  + '#bzw-header .bzw-h-fs svg{display:block}'
  + '#bzw-header .bzw-h-hist{margin-left:auto;padding:4px 10px;border-radius:8px;font-size:11.5px;font-weight:600;cursor:pointer;border:1.5px solid rgba(255,255,255,.3);background:transparent;color:#fff;transition:background .15s;flex-shrink:0}'
  + '#bzw-header .bzw-h-hist:hover{background:rgba(255,255,255,.15)}'
  + '#bzw-messages{flex:1;overflow-y:auto;padding:18px;display:flex;flex-direction:column;gap:14px;background:#F8F9FC;scroll-behavior:smooth}'
  + '#bzw-messages::-webkit-scrollbar{width:5px}'
  + '#bzw-messages::-webkit-scrollbar-track{background:transparent}'
  + '#bzw-messages::-webkit-scrollbar-thumb{background:#DEE4EE;border-radius:99px}'
  + '.bzw-msg{max-width:88%;animation:bzw-msg-in .3s ease-out}'
  + '@keyframes bzw-msg-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}'
  + '.bzw-msg.bot{align-self:flex-start}'
  + '.bzw-msg.user{align-self:flex-end}'
  + '.bzw-msg .bzw-bubble{padding:12px 16px;border-radius:16px;font-size:13.5px;line-height:1.65;white-space:pre-wrap;word-break:break-word}'
  + '.bzw-msg.bot .bzw-bubble{background:#fff;color:#1F2937;border-bottom-left-radius:4px;box-shadow:0 1px 4px rgba(0,0,0,.06)}'
  + '.bzw-msg.user .bzw-bubble{background:' + T.primary + ';color:#fff;border-bottom-right-radius:4px}'
  + '.bzw-bubble strong{color:#7C3AED}'
  + '.bzw-msg.user .bzw-bubble strong{color:#FFF3E0}'
  + '.bzw-typing{align-self:flex-start;padding:14px 18px;background:#fff;border-radius:16px;border-bottom-left-radius:4px;box-shadow:0 1px 4px rgba(0,0,0,.06);display:flex;gap:5px}'
  + '.bzw-typing span{width:7px;height:7px;border-radius:50%;background:#9CA3AF;animation:bzw-bounce .7s infinite alternate}'
  + '.bzw-typing span:nth-child(2){animation-delay:.15s}'
  + '.bzw-typing span:nth-child(3){animation-delay:.3s}'
  + '@keyframes bzw-bounce{to{transform:translateY(-6px);opacity:.4}}'
  + '.bzw-book-answer{padding:4px 0}'
  + '.bzw-book-answer h3{color:#7C3AED;font-size:1.05em;margin:0 0 4px 0;font-weight:700}'
  + '.bzw-book-answer .bzw-meta{color:#6B7280;font-size:.82em;margin:0 0 8px 0}'
  + '.bzw-book-answer .bzw-brief{font-size:.9em;line-height:1.55;color:#1F2937;margin:0 0 10px 0}'
  + '.bzw-book-answer .bzw-concepts{background:#F8F7FF;border-radius:10px;padding:10px 14px;margin:8px 0}'
  + '.bzw-book-answer .bzw-concepts h4{color:#7C3AED;font-size:.88em;margin:0 0 6px 0;font-weight:600}'
  + '.bzw-book-answer .bzw-concepts ul{margin:0;padding-left:16px;list-style:none}'
  + '.bzw-book-answer .bzw-concepts li{font-size:.85em;line-height:1.6;margin-bottom:5px;color:#1F2937}'
  + '.bzw-book-answer .bzw-concepts li strong{color:#7C3AED}'
  + '.bzw-book-answer .bzw-footer{font-size:.8em;color:#6B7280;margin:10px 0 2px 0;font-style:italic}'
  + '.bzw-suggestions{display:flex;flex-wrap:wrap;gap:8px;padding:0 18px 12px;flex-shrink:0}'
  + '.bzw-suggestions button{font-size:11.5px;padding:7px 13px;border-radius:99px;background:#F5F3FF;color:#7C3AED;border:1px solid rgba(107,63,160,.15);cursor:pointer;transition:all .2s;white-space:nowrap;font-weight:500}'
  + '.bzw-suggestions button:hover{background:#7C3AED;color:#fff;border-color:#7C3AED}'
  + '.bzw-input-wrap{display:flex;gap:10px;padding:14px 18px;border-top:1px solid #E5E7EB;flex-shrink:0;background:#fff}'
  + '.bzw-input-wrap input{flex:1;padding:11px 16px;border-radius:99px;border:1.5px solid #E5E7EB;background:#F8FAFC;font-size:14px;color:#1F2937;outline:0;transition:border-color .2s}'
  + '.bzw-input-wrap input:focus{border-color:' + T.primary + '}'
  + '.bzw-input-wrap input::placeholder{color:#9CA3AF}'
  + '.bzw-input-wrap .bzw-send-btn{width:42px;height:42px;border-radius:50%;background:' + T.primary + ';color:#fff;border:0;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .15s,box-shadow .15s;flex-shrink:0}'
  + '.bzw-input-wrap .bzw-send-btn:hover{transform:scale(1.06);box-shadow:0 4px 14px ' + T.primary + '66}'
  + '.bzw-input-wrap .bzw-send-btn:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}'
  + '.bzw-input-wrap .bzw-send-btn svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round}'
  + '#bzw-panel.bzw-fullscreen .bzw-messages{padding:24px 28px;font-size:14.5px}'
  + '#bzw-panel.bzw-fullscreen .bzw-msg .bzw-bubble{padding:14px 20px;font-size:14.5px;line-height:1.75}'
  + '#bzw-panel.bzw-fullscreen .bzw-suggestions{padding:12px 24px 16px}'
  + '#bzw-panel.bzw-fullscreen .bzw-input-wrap{padding:18px 24px}'
  + '#bzw-panel.bzw-fullscreen .bzw-input-wrap input{font-size:15px;padding:12px 18px}'
  + '.bzw-hist-panel{position:absolute;top:56px;right:12px;width:320px;max-height:420px;overflow-y:auto;background:#fff;border-radius:14px;box-shadow:0 8px 32px rgba(10,28,56,.22);z-index:2147483647;padding:0;font-size:13px}'
  + '@media(max-width:500px){#bzw-panel{right:8px;bottom:92px;width:calc(100vw - 16px);height:480px}}';

  function injectCSS() {
    var style = document.createElement('style');
    style.id = 'bzw-styles';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  /* ===========================================
     3. DOM CREATION
     =========================================== */
  var chatOpen = false;
  var isWaiting = false;
  var currentSessionId = null;
  var conversationHistory = [];
  var KB = []; // loaded from bizatom-kb.js
  var KB_FILE = '';
  var KB_LOADED = false;

  function createDOM() {
    var lang = CONFIG.lang;
    var wel = CONFIG.welcome || (lang === 'zh'
      ? '你好！我是 BizAtom AI 书童 📚 已收录100本商业经典，你可以问我任何概念、框架和思想。'
      : "Hello! I'm BizAtom AI Assistant 📚 I cover 100 business classics — ask me about any concept, framework, or idea.");

    var suggs = CONFIG.suggestions.length > 0 ? CONFIG.suggestions
      : (lang === 'zh'
        ? ['什么是蓝海战略？', '解释第一性原理', '从0到1的核心思想', '穷查理宝典的智慧']
        : ['What is Blue Ocean Strategy?', 'Explain First Principles', 'Zero to One key ideas', 'Poor Charlie insights']);

    var fabSVG = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>';
    var sendSVG = '<svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>';
    var fsMaxSVG = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4"/></svg>';
    var fsRestSVG = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 2v4H1M11 2v4h4M5 14v-4H1M11 14v-4h4"/></svg>';
    var histLabel = lang === 'zh' ? '聊天记录' : 'History';
    var ph = lang === 'zh' ? '输入你的问题...' : 'Ask a question...';

    var suggestionHTML = '';
    for (var i = 0; i < suggs.length; i++) {
      suggestionHTML += '<button onclick="window.__bzwAsk(\'' + escapeAttr(suggs[i]) + '\')">' + escapeHTML(suggs[i]) + '</button>';
    }

    var html = ''
    + '<button id="bzw-fab" aria-label="Open AI assistant">'
    +   '<span class="bzw-pulse"></span>' + fabSVG
    + '</button>'
    + '<div id="bzw-panel" class="bzw-collapsed">'
    +   '<div id="bzw-header">'
    +     '<div class="bzw-h-icon">' + getAtomIcon() + '</div>'
    +     '<div class="bzw-h-text">'
    +       '<h4>' + escapeHTML(CONFIG.site) + '</h4>'
    +       '<span>' + escapeHTML(CONFIG.tagline) + '</span>'
    +     '</div>'
    +     '<button class="bzw-h-hist" id="bzwHistBtn">📋 ' + histLabel + '</button>'
    +     '<button class="bzw-h-fs" id="bzwFsBtn" aria-label="Fullscreen">'
    +       '<span class="bzw-fs-max">' + fsMaxSVG + '</span>'
    +       '<span class="bzw-fs-rest" style="display:none">' + fsRestSVG + '</span>'
    +     '</button>'
    +     '<button class="bzw-h-close" aria-label="Close">&times;</button>'
    +   '</div>'
    +   '<div class="bzw-messages" id="bzwMessages">'
    +     '<div class="bzw-msg bot"><div class="bzw-bubble">' + escapeHTML(wel) + '</div></div>'
    +   '</div>'
    +   '<div class="bzw-suggestions" id="bzwSuggestions">' + suggestionHTML + '</div>'
    +   '<div class="bzw-input-wrap">'
    +     '<input type="text" id="bzwInput" placeholder="' + ph + '" aria-label="Chat message">'
    +     '<button class="bzw-send-btn" id="bzwSendBtn" aria-label="Send">' + sendSVG + '</button>'
    +   '</div>'
    + '</div>';

    var container = document.createElement('div');
    container.id = 'bzw-root';
    container.innerHTML = html;
    document.body.appendChild(container);

    // Wire events
    document.getElementById('bzw-fab').addEventListener('click', toggleChat);
    document.getElementById('bzw-panel').querySelector('.bzw-h-close').addEventListener('click', toggleChat);
    document.getElementById('bzwFsBtn').addEventListener('click', toggleFullscreen);
    document.getElementById('bzwSendBtn').addEventListener('click', sendMessage);
    document.getElementById('bzwInput').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') sendMessage();
    });
    document.getElementById('bzwHistBtn').addEventListener('click', function (e) {
      e.stopPropagation();
      toggleHistoryPanel();
    });

    // Close history on outside click
    document.addEventListener('click', function (e) {
      var hp = document.getElementById('bzwHistPanel');
      if (hp && !e.target.closest('#bzwHistPanel') && !e.target.closest('#bzwHistBtn')) {
        hp.remove();
      }
    }, true);

    // Scroll trapping: prevent scroll from leaking to host page
    var msgEl = document.getElementById('bzwMessages');
    if (msgEl) {
      // Wheel events
      msgEl.addEventListener('wheel', function (e) {
        var atTop = msgEl.scrollTop <= 0;
        var atBottom = msgEl.scrollTop + msgEl.clientHeight >= msgEl.scrollHeight - 1;
        if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
          e.preventDefault();
          return false;
        }
      }, { passive: false });

      // Touch events (mobile)
      var touchStartY = 0;
      msgEl.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) touchStartY = e.touches[0].clientY;
      }, { passive: true });

      msgEl.addEventListener('touchmove', function (e) {
        if (e.touches.length !== 1) return;
        var dy = e.touches[0].clientY - touchStartY;
        var atTop = msgEl.scrollTop <= 0;
        var atBottom = msgEl.scrollTop + msgEl.clientHeight >= msgEl.scrollHeight - 1;
        if ((atTop && dy > 0) || (atBottom && dy < 0)) {
          e.preventDefault();
          return false;
        }
      }, { passive: false });
    }
  }

  function getAtomIcon() {
    return '<svg width="28" height="28" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">'
      + '<circle cx="20" cy="20" r="18" fill="url(#bzw-atom-glow)"/>'
      + '<ellipse cx="20" cy="20" rx="16" ry="6.5" fill="none" stroke="#8B5CF6" stroke-width="2" transform="rotate(0 20 20)"/>'
      + '<ellipse cx="20" cy="20" rx="16" ry="6.5" fill="none" stroke="#8B5CF6" stroke-width="2" transform="rotate(60 20 20)"/>'
      + '<ellipse cx="20" cy="20" rx="16" ry="6.5" fill="none" stroke="#8B5CF6" stroke-width="2" transform="rotate(120 20 20)"/>'
      + '<circle cx="20" cy="20" r="4" fill="' + T.primary + '"/>'
      + '<defs><radialGradient id="bzw-atom-glow" cx="50%" cy="50%" r="50%">'
      + '<stop offset="0%" stop-color="' + T.primary + '" stop-opacity="0.5"/><stop offset="100%" stop-color="' + T.primary + '" stop-opacity="0"/>'
      + '</radialGradient></defs></svg>';
  }

  /* ===========================================
     4. UTILITY FUNCTIONS
     =========================================== */
  function escapeHTML(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function escapeAttr(s) {
    return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function detectLang(text) {
    if (!text) return CONFIG.lang;
    if (/[\u4e00-\u9fff\u3400-\u4dbf]/.test(text)) return 'zh';
    return 'en';
  }

  function stripMarkdown(text) {
    if (!text) return text;
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      .replace(/_(.*?)_/g, '$1')
      .replace(/###\s?/g, '')
      .replace(/##\s?/g, '')
      .replace(/#\s?/g, '');
  }

  function formatAnswer(t) {
    return t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
  }

  /* ===========================================
     5. CHAT UI
     =========================================== */
  function toggleChat() {
    chatOpen = !chatOpen;
    var panel = document.getElementById('bzw-panel');
    var fab = document.getElementById('bzw-fab');
    if (chatOpen) {
      panel.classList.remove('bzw-collapsed');
      fab.classList.add('bzw-hidden');
      document.getElementById('bzwInput').focus();
      loadKB(function () {
        startNewSessionOrRestore();
      });
    } else {
      panel.classList.add('bzw-collapsed');
      fab.classList.remove('bzw-hidden');
      saveSession();
    }
  }

  function toggleFullscreen() {
    var panel = document.getElementById('bzw-panel');
    var maxEl = document.querySelector('#bzwFsBtn .bzw-fs-max');
    var restEl = document.querySelector('#bzwFsBtn .bzw-fs-rest');
    var isFull = panel.classList.toggle('bzw-fullscreen');
    maxEl.style.display = isFull ? 'none' : '';
    restEl.style.display = isFull ? '' : 'none';
    var msgs = document.getElementById('bzwMessages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }

  function addMsg(text, type) {
    var msgs = document.getElementById('bzwMessages');
    if (!msgs) return;
    var div = document.createElement('div');
    div.className = 'bzw-msg ' + type;
    var b = document.createElement('div');
    b.className = 'bzw-bubble';
    var clean = stripMarkdown(text);
    b.innerHTML = formatAnswer(clean);
    div.appendChild(b);
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return b;
  }

  function showTyping() {
    var msgs = document.getElementById('bzwMessages');
    if (!msgs) return;
    var div = document.createElement('div');
    div.className = 'bzw-typing';
    div.id = 'bzwTyping';
    div.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function hideTyping() {
    var el = document.getElementById('bzwTyping');
    if (el) el.remove();
  }

  /* ===========================================
     6. KNOWLEDGE BASE (KB)
     =========================================== */
  function loadKB(callback) {
    if (KB_LOADED && KB.length > 0) {
      if (callback) callback();
      return;
    }

    // Determine KB URL
    var kbUrl;
    if (CONFIG.kbUrl) {
      kbUrl = CONFIG.kbUrl;
    } else if (CONFIG.kb === 'bizatom' || CONFIG.kb === '') {
      // Resolve relative to widget script source
      var scriptSrc = SCRIPT_EL.src || '';
      var base = scriptSrc.substring(0, scriptSrc.lastIndexOf('/') + 1);
      kbUrl = base + 'bizatom-kb.js';
    } else {
      var scriptSrc = SCRIPT_EL.src || '';
      var base = scriptSrc.substring(0, scriptSrc.lastIndexOf('/') + 1);
      kbUrl = base + 'kb/' + CONFIG.kb + '-kb.js';
    }

    // Check if already loaded
    if (window.__BIZATOM_KB && window.__BIZATOM_KB.length > 0) {
      KB = window.__BIZATOM_KB;
      KB_LOADED = true;
      if (callback) callback();
      return;
    }

    // Avoid duplicate loading
    if (KB_FILE === kbUrl) {
      if (callback) setTimeout(callback, 100);
      return;
    }
    KB_FILE = kbUrl;

    // Load the KB script
    var script = document.createElement('script');
    script.src = kbUrl;
    script.onload = function () {
      if (window.__BIZATOM_KB) {
        KB = window.__BIZATOM_KB;
      } else if (typeof BIZATOM_KB !== 'undefined') {
        KB = BIZATOM_KB;
      }
      KB_LOADED = true;
      console.log('[BizAtom Widget] KB loaded:', KB.length, 'books');
      if (callback) callback();
    };
    script.onerror = function () {
      console.warn('[BizAtom Widget] KB load failed from:', kbUrl, '- running without KB');
      KB = [];
      KB_LOADED = true;
      if (callback) callback();
    };
    document.head.appendChild(script);
  }

  function kbSearch(q, lang) {
    if (!KB || KB.length === 0) return null;
    q = q.toLowerCase().trim();
    var best = null, bestS = 0;
    for (var i = 0; i < KB.length; i++) {
      var score = 0;
      var kws = KB[i].kw;
      for (var j = 0; j < kws.length; j++) {
        if (q.indexOf(kws[j]) >= 0) score += kws[j].length;
      }
      if (score > bestS) { bestS = score; best = KB[i]; }
    }
    if (!best || bestS === 0) return null;
    var d = best[lang] || best.en;
    var bestConcept = null, bestCS = 0;
    for (var k = 0; k < d.c.length; k++) {
      var cname = d.c[k][0].toLowerCase();
      var cs = 0;
      var parts = cname.split(/[\s\-:：]+/);
      for (var p = 0; p < parts.length; p++) {
        if (parts[p].length >= 2 && q.indexOf(parts[p]) >= 0) cs += parts[p].length * 2;
      }
      if (cname.length >= 4 && q.indexOf(cname.slice(0, 6)) >= 0) cs += 12;
      if (cname.length >= 8 && q.indexOf(cname) >= 0) cs += cname.length * 4;
      var qWords = q.split(/\s+/);
      for (var w = 0; w < qWords.length; w++) {
        if (qWords[w].length >= 3 && cname.indexOf(qWords[w]) >= 0) cs += qWords[w].length * 3;
      }
      var asciiMatch = cname.match(/[a-z0-9]+/g);
      if (asciiMatch) {
        for (var a = 0; a < asciiMatch.length; a++) {
          if (asciiMatch[a].length >= 2 && q.indexOf(asciiMatch[a]) >= 0) cs += asciiMatch[a].length * 3;
        }
      }
      if (cs > bestCS) { bestCS = cs; bestConcept = d.c[k]; }
    }
    if (bestConcept && bestCS >= 6) {
      return '💡 **' + bestConcept[0] + '**\n\n' + bestConcept[1] + '\n\n📖 *' + (lang === 'zh' ? '出自：' : 'From: ') + d.t + '*';
    }
    var out = '📚 **' + d.t + '**\n\n' + d.b + '\n\n';
    if (bestConcept && bestCS > 3) {
      out += '💡 **' + bestConcept[0] + '**：' + bestConcept[1] + '\n\n';
    }
    out += '📋 ' + (lang === 'zh' ? '核心概念一览' : 'Key Concepts') + '：\n';
    for (var kk = 0; kk < d.c.length; kk++) {
      out += '  • ' + d.c[kk][0] + '\n';
    }
    return out;
  }

  function fallbackText(lang) {
    var siteName = CONFIG.site;
    if (KB && KB.length > 0) {
      return lang === 'zh'
        ? '📚 我是 ' + siteName + ' AI 助手。试试问我：\n• 什么是蓝海战略？\n• 解释刺猬理念\n• 从0到1的核心思想\n• Explain disruptive innovation'
        : "📚 I'm the " + siteName + " AI Assistant. Try asking:\n• What is Blue Ocean Strategy?\n• Explain the Hedgehog Concept\n• Tell me about Zero to One\n• 什么是颠覆性创新？";
    }
    return lang === 'zh'
      ? '📚 你好！我是 ' + siteName + ' AI 助手。请问有什么可以帮助你的？'
      : "📚 Hello! I'm the " + siteName + " AI Assistant. How can I help you today?";
  }

  /* ===========================================
     7. SEND MESSAGE
     =========================================== */
  function sendMessage() {
    if (isWaiting) return;
    var inp = document.getElementById('bzwInput');
    if (!inp) return;
    var q = inp.value.trim();
    if (!q) return;
    var btn = document.getElementById('bzwSendBtn');
    isWaiting = true; btn.disabled = true;
    inp.value = ''; inp.focus();

    addMsg(q, 'user');
    conversationHistory.push({ role: 'user', content: q });

    showTyping();

    // Language detection
    var lang = detectLang(q);

    // Hide suggestions after first message
    var suggs = document.getElementById('bzwSuggestions');
    if (suggs) suggs.style.display = 'none';

    var answer = null;

    // Try API
    var apiUrl = CONFIG.api;
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: q,
        lang: lang,
        site: CONFIG.site,
        kb: CONFIG.kb,
        history: conversationHistory.slice(-6)
      })
    }).then(function (resp) {
      if (resp.ok) return resp.json();
      throw new Error('API ' + resp.status);
    }).then(function (data) {
      answer = data.answer || '';
      if (answer) {
        conversationHistory.push({ role: 'assistant', content: answer });
      }
      finishAnswer(answer);
    }).catch(function (e) {
      console.log('[BizAtom Widget] API error:', e.message);
      // KB fallback
      answer = kbSearch(q, lang);
      if (answer) {
        conversationHistory.push({ role: 'assistant', content: answer });
      }
      // Fallback text
      if (!answer) {
        answer = fallbackText(lang);
      }
      finishAnswer(answer);
    });
  }

  function finishAnswer(answer) {
    hideTyping();
    if (answer) {
      var bubble = addMsg('', 'bot');
      if (bubble) bubble.innerHTML = formatAnswer(answer);
    }
    // Log to backend
    logChat(answer);
    // Save session
    setTimeout(saveSession, 500);
    isWaiting = false;
    var btn = document.getElementById('bzwSendBtn');
    if (btn) btn.disabled = false;
  }

  function logChat(answer) {
    var q = conversationHistory.length >= 2 ? conversationHistory[conversationHistory.length - 2].content : '';
    var apiUrl = CONFIG.api.replace('/chat', '/log-chat').replace('/widget-chat', '/log-chat');
    try {
      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q || '',
          answer: answer || '',
          lang: CONFIG.lang,
          site: CONFIG.site,
          timestamp: new Date().toISOString()
        })
      }).catch(function () { /* silent */ });
    } catch (e) { /* silent */ }
  }

  // Expose askSuggested for inline onclick
  global.__bzwAsk = function (q) {
    var inp = document.getElementById('bzwInput');
    if (inp) inp.value = q;
    sendMessage();
  };

  /* ===========================================
     8. PERSISTENCE
     =========================================== */
  var STORAGE_KEY = 'bzw_sessions_' + (CONFIG.site || 'default').replace(/[^a-z0-9]/gi, '_');

  function loadAllSessions() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) { return []; }
  }

  function saveSession() {
    if (!conversationHistory || conversationHistory.length === 0) return;
    var sessions = loadAllSessions();
    var firstQ = '';
    for (var i = 0; i < conversationHistory.length; i++) {
      if (conversationHistory[i].role === 'user') { firstQ = conversationHistory[i].content; break; }
    }
    var session = {
      id: currentSessionId || ('sess_' + Date.now()),
      title: firstQ.substring(0, 40) || (CONFIG.lang === 'zh' ? '新对话' : 'New Chat'),
      ts: new Date().toISOString(),
      messages: conversationHistory.slice()
    };
    var found = false;
    for (var j = 0; j < sessions.length; j++) {
      if (sessions[j].id === session.id) { sessions[j] = session; found = true; break; }
    }
    if (!found) sessions.push(session);
    if (sessions.length > 100) sessions = sessions.slice(-100);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    currentSessionId = session.id;
  }

  function restoreSession(sessId) {
    var sessions = loadAllSessions();
    var sess = null;
    for (var i = 0; i < sessions.length; i++) {
      if (sessions[i].id === sessId) { sess = sessions[i]; break; }
    }
    if (!sess || !sess.messages) return false;
    currentSessionId = sess.id;
    conversationHistory = sess.messages.slice();
    var msgs = document.getElementById('bzwMessages');
    if (!msgs) return true;
    msgs.innerHTML = '';
    for (var j = 0; j < sess.messages.length; j++) {
      var m = sess.messages[j];
      var cls = m.role === 'user' ? 'user' : 'bot';
      var div = document.createElement('div');
      div.className = 'bzw-msg ' + cls;
      var bubble = document.createElement('div');
      bubble.className = 'bzw-bubble';
      bubble.textContent = m.content || '';
      div.appendChild(bubble);
      msgs.appendChild(div);
    }
    msgs.scrollTop = msgs.scrollHeight;
    return true;
  }

  function restoreLastSession() {
    var sessions = loadAllSessions();
    if (sessions.length === 0) return false;
    sessions.sort(function (a, b) { return (b.ts || '').localeCompare(a.ts || ''); });
    return restoreSession(sessions[0].id);
  }

  function startNewSession() {
    saveSession();
    currentSessionId = 'sess_' + Date.now();
    conversationHistory = [];
    var msgs = document.getElementById('bzwMessages');
    if (!msgs) return;
    msgs.innerHTML = '';
    var wel = CONFIG.welcome || (CONFIG.lang === 'zh'
      ? '你好！我是 BizAtom AI 书童 📚 已收录100本商业经典，你可以问我任何概念、框架和思想。'
      : "Hello! I'm BizAtom AI Assistant 📚 I cover 100 business classics — ask me about any concept, framework, or idea.");
    addMsg(wel, 'bot');
    var suggs = document.getElementById('bzwSuggestions');
    if (suggs) suggs.style.display = '';
  }

  function startNewSessionOrRestore() {
    var restored = restoreLastSession();
    if (!restored) {
      currentSessionId = 'sess_' + Date.now();
    }
  }

  /* ===========================================
     9. HISTORY PANEL
     =========================================== */
  function toggleHistoryPanel() {
    var existing = document.getElementById('bzwHistPanel');
    if (existing) { existing.remove(); return; }
    showHistoryPanel();
  }

  function showHistoryPanel() {
    var sessions = loadAllSessions();
    var lang = CONFIG.lang;
    var panel = document.createElement('div');
    panel.id = 'bzwHistPanel';
    panel.className = 'bzw-hist-panel';

    // New Chat button
    var newBtn = document.createElement('div');
    newBtn.style.cssText = 'padding:12px 16px;cursor:pointer;font-size:13px;font-weight:700;color:' + T.primary + ';border-bottom:1px solid #E5E7EB;display:flex;align-items:center;gap:6px;transition:background .1s';
    newBtn.innerHTML = '➕ ' + (lang === 'zh' ? '新建对话' : 'New Chat');
    newBtn.onmouseover = function () { newBtn.style.background = '#F8FAFC'; };
    newBtn.onmouseout = function () { newBtn.style.background = 'transparent'; };
    newBtn.onclick = function () {
      startNewSession();
      var p = document.getElementById('bzwHistPanel');
      if (p) p.remove();
    };
    panel.appendChild(newBtn);

    var title = document.createElement('div');
    title.style.cssText = 'padding:10px 16px 6px;font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:.5px';
    title.textContent = lang === 'zh' ? '历史会话' : 'Chat History';
    panel.appendChild(title);

    if (sessions.length === 0) {
      var empty = document.createElement('div');
      empty.style.cssText = 'padding:20px 16px;text-align:center;color:#6B7280;font-size:13px';
      empty.textContent = lang === 'zh' ? '暂无对话记录' : 'No chats yet';
      panel.appendChild(empty);
    }

    var shown = sessions.slice().sort(function (a, b) { return (b.ts || '').localeCompare(a.ts || ''); }).slice(0, 30);
    for (var i = 0; i < shown.length; i++) {
      var s = shown[i];
      var d = (s.ts || '').substring(0, 10);
      var item = document.createElement('div');
      item.style.cssText = 'padding:10px 16px;cursor:pointer;transition:background .1s;border-bottom:1px solid #E5E7EB';
      item.innerHTML = '<div style="font-size:13px;font-weight:600;color:#0A1C38;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'
        + escapeHTML(s.title || 'Chat') + '</div>'
        + '<div style="font-size:11px;color:#6B7280;margin-top:3px">' + d + ' · ' + (s.messages ? s.messages.length : 0) + ' '
        + (lang === 'zh' ? '条消息' : 'msgs') + '</div>';
      item.onmouseover = function () { item.style.background = '#F8FAFC'; };
      item.onmouseout = function () { item.style.background = 'transparent'; };
      (function (sid) {
        item.onclick = function () {
          restoreSession(sid);
          var p = document.getElementById('bzwHistPanel');
          if (p) p.remove();
        };
      })(s.id);
      panel.appendChild(item);
    }

    var chatPanel = document.getElementById('bzw-panel');
    if (chatPanel) chatPanel.appendChild(panel);
  }

  /* ===========================================
     10. INIT
     =========================================== */
  function init() {
    if (document.getElementById('bzw-fab')) return; // Already initialized
    injectCSS();
    createDOM();
    console.log('[BizAtom Widget] Initialized for:', CONFIG.site, '| theme:', CONFIG.theme, '| lang:', CONFIG.lang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(window);
