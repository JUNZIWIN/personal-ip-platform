/* =====================================================
   BizAtom Chat History Persistence (bizatom-chat-persist.js)
   - Auto-save chat to localStorage
   - Restore last session on chat open
   - "New Chat" + "History" buttons in header
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
    if (window.chatOpen && conversationHistory.length === 0) {
      restoreLastSession();
    }
  };

  // ── Hook into sendMessage() ──
  var _origSendMessage = sendMessage;
  window.sendMessage = function (optBookId) {
    if (typeof _origSendMessage === 'function') _origSendMessage(optBookId);
    // Save after a short delay (let the bot reply be added first)
    setTimeout(saveSession, 800);
  };

  // ── Expose functions globally ──
  window.bizatomChat = {
    save:      saveSession,
    restore:   restoreSession,
    restoreLast: restoreLastSession,
    newSession: startNewSession,
    getAll:    loadAllSessions
  };

  /* ---- Add "New Chat" + "History" buttons to chat header ---- */
  function injectHeaderButtons() {
    var header = document.querySelector('.chat-header');
    if (!header || document.getElementById('newChatBtn')) return;

    // "New Chat" button
    var nb = document.createElement('button');
    nb.id = 'newChatBtn';
    nb.innerHTML = '&#x2795; <span data-en="New" data-zh="新对话">New</span>';
    nb.style.cssText = 'margin-left:8px;padding:4px 10px;border-radius:8px;font-size:11.5px;font-weight:600;cursor:pointer;border:1.5px solid rgba(255,255,255,.3);background:transparent;color:#fff;font-family:var(--body);transition:background .15s';
    nb.onmouseover = function () { nb.style.background = 'rgba(255,255,255,.15)'; };
    nb.onmouseout  = function () { nb.style.background = 'transparent'; };
    nb.onclick = function (e) { e.stopPropagation(); startNewSession(); };

    // "History" button
    var hb = document.createElement('button');
    hb.id = 'historyBtn';
    hb.innerHTML = '&#x1F4CB; <span data-en="History" data-zh="历史">History</span>';
    hb.style.cssText = 'margin-left:6px;padding:4px 10px;border-radius:8px;font-size:11.5px;font-weight:600;cursor:pointer;border:1.5px solid rgba(255,255,255,.3);background:transparent;color:#fff;font-family:var(--body);transition:background .15s';
    hb.onmouseover = function () { hb.style.background = 'rgba(255,255,255,.15)'; };
    hb.onmouseout  = function () { hb.style.background = 'transparent'; };
    hb.onclick = function (e) { e.stopPropagation(); toggleHistoryPanel(); };

    header.appendChild(nb);
    header.appendChild(hb);
  }

  /* ---- History panel (dropdown overlay) ---- */
  var historyPanelOpen = false;
  function toggleHistoryPanel() {
    var existing = document.getElementById('historyPanel');
    if (existing) { existing.remove(); historyPanelOpen = false; return; }
    showHistoryPanel();
  }

  function showHistoryPanel() {
    var sessions = loadAllSessions();
    var lang = (document.documentElement.lang || '').indexOf('zh') === 0 ? 'zh' : 'en';
    var panel = document.createElement('div');
    panel.id = 'historyPanel';
    panel.style.cssText = 'position:absolute;top:56px;right:12px;width:320px;max-height:400px;overflow-y:auto;background:#fff;border-radius:14px;box-shadow:0 8px 32px rgba(10,28,56,.22);z-index:2000;padding:12px 0';
    panel.innerHTML = '<div style="padding:0 16px 10px;font-size:13px;font-weight:700;color:var(--navy)">' + (lang === 'zh' ? '历史会话 (' : 'Chat History (') + sessions.length + ')</div>';
    if (sessions.length === 0) {
      panel.innerHTML += '<div style="padding:20px 16px;text-align:center;color:var(--muted);font-size:13px">' + (lang === 'zh' ? '暂无对话记录' : 'No chats yet') + '</div>';
    }
    // Show last 30 sessions, newest first
    var shown = sessions.slice().sort(function (a, b) { return (b.ts || '').localeCompare(a.ts || ''); }).slice(0, 30);
    for (var i = 0; i < shown.length; i++) {
      var s = shown[i];
      var d = (s.ts || '').substring(0, 10);
      var item = document.createElement('div');
      item.style.cssText = 'padding:10px 16px;cursor:pointer;transition:background .1s';
      item.innerHTML = '<div style="font-size:13px;font-weight:600;color:var(--navy);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + escapeForHtml(s.title || 'Chat') + '</div>' +
                       '<div style="font-size:11px;color:var(--muted);margin-top:3px">' + d + ' · ' + (s.messages ? s.messages.length : 0) + ' ' + (lang === 'zh' ? '条消息' : 'msgs') + '</div>';
      item.onmouseover = function () { this.style.background = 'var(--paper)'; };
      item.onmouseout  = function () { this.style.background = 'transparent'; };
      (function (sid) {
        item.onclick = function () { restoreSession(sid); var p = document.getElementById('historyPanel'); if (p) p.remove(); historyPanelOpen = false; };
      })(s.id);
      panel.appendChild(item);
    }
    var chatPanel = document.getElementById('chatPanel');
    if (chatPanel) chatPanel.appendChild(panel);
    historyPanelOpen = true;
    // Close on click outside
    setTimeout(function () {
      document.addEventListener('click', closeHistoryOnOutside, true);
    }, 100);
  }

  function closeHistoryOnOutside(e) {
    if (!e.target.closest('#historyPanel') && !e.target.closest('#historyBtn')) {
      var p = document.getElementById('historyPanel');
      if (p) p.remove();
      historyPanelOpen = false;
      document.removeEventListener('click', closeHistoryOnOutside, true);
    }
  }

  function escapeForHtml(s) {
    var d = document.createElement('div'); d.textContent = s; return d.innerHTML;
  }

  /* ---- Inject buttons on load and on chat open ---- */
  function tryInject() {
    injectHeaderButtons();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInject);
  } else { tryInject(); }
  // Also try after chat opens (header may not exist yet)
  var _origToggle = toggleChat;
  window.toggleChat = function () {
    if (typeof _origToggle === 'function') _origToggle();
    setTimeout(tryInject, 200);
  };

})();
