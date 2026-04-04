(function () {
  var CONFIG = {
    endpoint: '/api/chat',
    requestTimeoutMs: 25000,
    maxHistory: 12
  };

  function getState() {
    if (!window.__BLOG_AI_ASSISTANT_STATE__) {
      window.__BLOG_AI_ASSISTANT_STATE__ = {
        messages: [
          {
            role: 'assistant',
            content: '你好，我是博客 AI 助手。你可以直接问我和文章相关的问题，或让我解释某个概念。'
          }
        ],
        open: false,
        sending: false
      };
    }
    return window.__BLOG_AI_ASSISTANT_STATE__;
  }

  function ensureUI() {
    var existing = document.getElementById('blog-ai-root');
    if (existing) return existing;

    var root = document.createElement('div');
    root.id = 'blog-ai-root';
    root.innerHTML = [
      '<button id="blog-ai-toggle" type="button" aria-label="打开 AI 助手">AI</button>',
      '<section id="blog-ai-panel" aria-label="博客 AI 助手">',
      '  <header id="blog-ai-header">',
      '    <span>博客 AI 助手</span>',
      '    <button id="blog-ai-close" type="button" aria-label="关闭">×</button>',
      '  </header>',
      '  <div id="blog-ai-messages"></div>',
      '  <form id="blog-ai-form">',
      '    <textarea id="blog-ai-input" rows="2" placeholder="输入问题，Enter 发送，Shift+Enter 换行"></textarea>',
      '    <button id="blog-ai-send" type="submit">发送</button>',
      '  </form>',
      '</section>'
    ].join('');

    document.body.appendChild(root);
    return root;
  }

  function renderMessages() {
    var state = getState();
    var panel = document.getElementById('blog-ai-panel');
    var messagesEl = document.getElementById('blog-ai-messages');
    if (!messagesEl || !panel) return;

    panel.classList.toggle('open', !!state.open);
    messagesEl.innerHTML = '';

    for (var i = 0; i < state.messages.length; i += 1) {
      var item = state.messages[i];
      var msgEl = document.createElement('div');
      msgEl.className = 'blog-ai-msg blog-ai-' + item.role;
      msgEl.textContent = item.content;
      messagesEl.appendChild(msgEl);
    }

    messagesEl.scrollTop = messagesEl.scrollHeight;

    var sendBtn = document.getElementById('blog-ai-send');
    var inputEl = document.getElementById('blog-ai-input');
    if (sendBtn) sendBtn.disabled = state.sending;
    if (inputEl) inputEl.disabled = state.sending;
  }

  function trimHistory(messages) {
    var base = [];
    if (messages.length > CONFIG.maxHistory) {
      base = messages.slice(messages.length - CONFIG.maxHistory);
    } else {
      base = messages.slice();
    }
    return base;
  }

  async function requestAssistantReply(userText) {
    var state = getState();
    var controller = new AbortController();
    var timeoutId = setTimeout(function () {
      controller.abort();
    }, CONFIG.requestTimeoutMs);

    try {
      var payload = {
        messages: trimHistory(state.messages),
        page: {
          url: window.location.href,
          title: document.title
        },
        input: userText
      };

      var response = await fetch(CONFIG.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
        credentials: 'same-origin'
      });

      if (!response.ok) {
        var errorText = '请求失败';
        try {
          var errorJson = await response.json();
          errorText = errorJson.error || errorText;
        } catch (e) {
          errorText = '请求失败，请稍后重试';
        }
        throw new Error(errorText);
      }

      var data = await response.json();
      if (data && data.reply) return data.reply;
      throw new Error('返回格式异常');
    } finally {
      clearTimeout(timeoutId);
    }
  }

  function bindEventsOnce() {
    var root = ensureUI();
    if (root.dataset.bound === '1') return;

    var state = getState();
    var toggleBtn = document.getElementById('blog-ai-toggle');
    var closeBtn = document.getElementById('blog-ai-close');
    var form = document.getElementById('blog-ai-form');
    var inputEl = document.getElementById('blog-ai-input');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        state.open = !state.open;
        renderMessages();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        state.open = false;
        renderMessages();
      });
    }

    if (inputEl) {
      inputEl.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          if (form) form.requestSubmit();
        }
      });
    }

    if (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (!inputEl || state.sending) return;

        var text = (inputEl.value || '').trim();
        if (!text) return;

        state.messages.push({ role: 'user', content: text });
        inputEl.value = '';
        state.sending = true;
        state.open = true;
        renderMessages();

        try {
          var reply = await requestAssistantReply(text);
          state.messages.push({ role: 'assistant', content: reply });
        } catch (err) {
          state.messages.push({
            role: 'system',
            content: (err && err.message) ? ('AI 服务暂不可用：' + err.message) : 'AI 服务暂不可用，请稍后重试。'
          });
        } finally {
          state.sending = false;
          renderMessages();
        }
      });
    }

    root.dataset.bound = '1';
  }

  function init() {
    bindEventsOnce();
    renderMessages();
  }

  document.addEventListener('DOMContentLoaded', function () {
    init();
  });

  document.addEventListener('pjax:complete', function () {
    init();
  });
})();
