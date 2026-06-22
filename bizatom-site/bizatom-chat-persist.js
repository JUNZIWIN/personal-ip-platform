/* =====================================================
   BizAtom Chat History Persistence (bizatom-chat-persist.js)
   - Auto-save chat to localStorage
   - Restore last session on chat open
   - "New Chat" button in header
   ===================================================== */

(function () {
  'use strict';

  var STORAGE_KEY = 'bizatom_sessions';
  var currentSessionId = null;

  // ── Load all saved sessions ──
  function loadAllSessions() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  // ── Save current conversation to localStorage ──
  function saveSession() {
    if (typeof conversationHistory === 'undefined' || !conversationHistory || conversationHistory.length === 0) return;

    var sessions = loadAllSessions();
    var lang = (document.documentElement.lang || '').indexOf('zh') === 0 ? 'zh' : 'en';
    var firstQ = '';
    for (var i = 0; i < conversationHistory.length; i++) {
      if (conversationHistory[i].role === 'user') { firstQ = conversationHistory[i].content; break; }
    }

    var session = {
      id:   currentSessionId || ('sess_' + Date.now()),
      title: firstQ.substring(0, 40) || (lang === 'zh' ? '新对话' : 'New Chat'),
      ts:   new Date().toISOString(),
      messages: conversationHistory.slice()
    };

    var found = false;
    for (var j = 0; j < sessions.length; j++) {
      if (sessions[j].id === session.id) { sessions[j] = session; found = true; break; }
    }
    if (!found) sessions.push(session);

    // Keep last 100 sessions
    if (sessions.length > 100) sessions = sessions.slice(-100);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    currentSessionId = session.id;
  }

  // ── Restore a session by ID ──
  function restoreSession(sessId) {
    var sessions = loadAllSessions();
    var sess = null;
    for (var i = 0; i < sessions.length; i++) {
      if (sessions[i].id === sessId) { sess = sessions[i]; break; }
    }
    if (!sess || !sess.messages) return false;

    currentSessionId = sess.id;
    conversationHistory = sess.messages.slice();

    // Re-render chat DOM
    var msgs = document.getElementById('chatMessages');
    if (!msgs) return true;
    msgs.innerHTML = '';
    for (var j = 0; j < sess.messages.length; j++) {
      var m = sess.messages[j];
      var cls = m.role === 'user' ? 'user' : 'bot';
      var div = document.createElement('div');
      div.className = 'chat-msg ' + cls;
      var bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.textContent = m.content || '';
      div.appendChild(bubble);
      msgs.appendChild(div);
    }
    msgs.scrollTop = msgs.scrollHeight;
    return true;
  }

  // ── Restore LAST session on chat open ──
  function restoreLastSession() {
    var sessions = loadAllSessions();
    if (sessions.length === 0) return false;
    // Sort by ts desc, pick most recent
    sessions.sort(function (a, b) { return (b.ts || '').localeCompare(a.ts || ''); });
    return restoreSession(sessions[0].id);
  }

  // ── Start a brand-new session ──
  function startNewSession() {
    saveSession(); // save current before starting new
    currentSessionId = 'sess_' + Date.now();
    conversationHistory = [];
    var msgs = document.getElementById('chatMessages');
    if (msgs) msgs.innerHTML = '';
    var lang = (document.documentElement.lang || '').indexOf('zh') === 0 ? 'zh' : 'en';
    if (typeof addMsg === 'function') {
      addMsg(lang === 'zh' ? '你好！我是 BizAtom AI 书童 📚 你可以问我任何商业经典的问题。' : 'Hello! I\'m BizAtom AI 书童 📚 Ask me anything about business classics.', 'bot');
    }
  }

  // ── Hook into toggleChat() ──
  var _origToggleChat = toggleChat;
  window.toggleChat = function () {
    if (typeof _origToggleChat === 'function') _origToggleChat();
    if (chatOpen && conversationHistory.length === 0) {
      // Chat just opened and no messages yet — restore last session
      restoreLastSession();
    }
  };

  // ── Hook into sendMessage() ──
  var _origSendMessage = sendMessage;
  window.sendMessage = function (optBookId) {
    if (typeof _origSendMessage === 'function') _origSendMessage(optBookId);
    // Save after a short delay (let the bot reply be added first)
    setTimeout(saveSession, 500);
  };

  // ── Expose functions globally ──
  window.bizatomChat = {
    save:    saveSession,
    restore: restoreSession,
    restoreLast: restoreLastSession,
    newSession: startNewSession,
    getAll:  loadAllSessions
  };

  /* ---- Add "New Chat" button to chat header ---- */
  function injectNewChatButton() {
    var header = document.querySelector('.chat-header .h-text');
    if (!header || document.getElementById('newChatBtn')) return;

    var btn = document.createElement('button');
    btn.id = 'newChatBtn';
    btn.innerHTML = '&#x2795; <span data-en="New" data-zh="新对话">New</span>';
    btn.style.cssText = 'margin-left:10px;padding:4px 10px;border-radius:8px;font-size:11.5px;font-weight:600;cursor:pointer;border:1.5px solid rgba(255,255,255,.3);background:transparent;color:#fff;font-family:var(--body);transition:background .15s';
    btn.onmouseover = function () { btn.style.background = 'rgba(255,255,255,.15)'; };
    btn.onmouseout  = function () { btn.style.background = 'transparent'; };
    btn.onclick = function (e) {
      e.stopPropagation();
      startNewSession();
    };

    var headerDiv = document.querySelector('.chat-header');
    if (headerDiv) headerDiv.appendChild(btn);
  }

  // Try injecting button now and on DOM changes
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectNewChatButton);
  } else {
    injectNewChatButton();
  }
  // Also try after chat opens (header may not exist yet)
  var _origToggleChat2 = toggleChat;
  window.toggleChat = function () {
    if (typeof _origToggleChat2 === 'function') _origToggleChat2();
    setTimeout(injectNewChatButton, 100);
  };

})();
