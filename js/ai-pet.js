(function () {
  var cfg = window.BlogAIPetConfig || {};
  if (cfg.enabled === false) return;

  var state = {
    isOpen: false,
    isSending: false
  };

  var root = document.createElement("div");
  root.id = "ai-pet-root";

  root.innerHTML = [
    '<div class="ai-pet-wrap">',
    '  <div class="ai-pet-tip" id="ai-pet-tip"></div>',
    '  <div class="ai-pet-character" id="ai-pet-character" title="点我和桌宠聊天">',
    '    <img id="ai-pet-avatar" alt="AI Pet">',
    "  </div>",
    '  <section class="ai-pet-panel" id="ai-pet-panel" aria-label="AI桌宠聊天面板">',
    '    <header class="ai-pet-header">',
    '      <h3 class="ai-pet-title" id="ai-pet-title"></h3>',
    '      <div class="ai-pet-actions">',
    '        <button class="ai-pet-btn" id="ai-pet-clear" type="button">清空</button>',
    '        <button class="ai-pet-btn" id="ai-pet-close" type="button">关闭</button>',
    "      </div>",
    "    </header>",
    '    <div class="ai-pet-messages" id="ai-pet-messages"></div>',
    '    <div class="ai-pet-quick" id="ai-pet-quick"></div>',
    '    <div class="ai-pet-input-row">',
    '      <input class="ai-pet-input" id="ai-pet-input" type="text" maxlength="300">',
    '      <button class="ai-pet-send" id="ai-pet-send" type="button">发送</button>',
    "    </div>",
    "  </section>",
    "</div>"
  ].join("\n");

  document.body.appendChild(root);

  var el = {
    tip: document.getElementById("ai-pet-tip"),
    character: document.getElementById("ai-pet-character"),
    avatar: document.getElementById("ai-pet-avatar"),
    panel: document.getElementById("ai-pet-panel"),
    title: document.getElementById("ai-pet-title"),
    clearBtn: document.getElementById("ai-pet-clear"),
    closeBtn: document.getElementById("ai-pet-close"),
    messages: document.getElementById("ai-pet-messages"),
    quick: document.getElementById("ai-pet-quick"),
    input: document.getElementById("ai-pet-input"),
    send: document.getElementById("ai-pet-send")
  };

  var storageKey = "ai-pet-chat-v1";
  var placeholder = cfg.placeholder || "输入你想问的问题...";
  var endpoint = cfg.endpoint || "";
  var requestTimeoutMs = Number(cfg.requestTimeoutMs || 12000);
  var quickActions = Array.isArray(cfg.quickActions) ? cfg.quickActions : [];

  el.title.textContent = (cfg.petName || "AI桌宠") + " · 在线";
  el.avatar.src = cfg.avatarImage || "/image/BlogCover/sakura.PNG";
  el.avatar.onerror = function () {
    el.avatar.src = "/image/BlogCover/IMG_6022.JPG";
  };
  el.input.placeholder = placeholder;

  function showTip(text, timeout) {
    el.tip.textContent = text;
    el.tip.classList.add("show");
    window.clearTimeout(showTip._tid);
    showTip._tid = window.setTimeout(function () {
      el.tip.classList.remove("show");
    }, timeout || 2400);
  }

  function setOpen(open) {
    state.isOpen = open;
    el.panel.classList.toggle("show", open);
    if (open) {
      el.input.focus();
    }
  }

  function appendMsg(role, text) {
    var item = document.createElement("div");
    item.className = "ai-pet-msg " + role;
    item.textContent = text;
    el.messages.appendChild(item);
    el.messages.scrollTop = el.messages.scrollHeight;
    persistHistory();
  }

  function persistHistory() {
    var nodes = el.messages.querySelectorAll(".ai-pet-msg");
    var data = [];
    for (var i = 0; i < nodes.length; i++) {
      data.push({
        role: nodes[i].classList.contains("user") ? "user" : "bot",
        text: nodes[i].textContent || ""
      });
    }
    window.localStorage.setItem(storageKey, JSON.stringify(data.slice(-30)));
  }

  function restoreHistory() {
    var raw = window.localStorage.getItem(storageKey);
    if (!raw) return false;
    try {
      var arr = JSON.parse(raw);
      if (!Array.isArray(arr) || !arr.length) return false;
      arr.forEach(function (m) {
        appendMsg(m.role === "user" ? "user" : "bot", String(m.text || ""));
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  function getPathWelcome() {
    var map = cfg.welcomeByPath || {};
    var path = window.location.pathname || "/";
    return map[path] || cfg.initialMessage || "你好，点我就可以开始聊天。";
  }

  function localFallbackReply(text) {
    var lower = text.toLowerCase();
    if (lower.indexOf("java") >= 0) return "你可以先看 JavaSE 和 JavaWeb 分类，建议先打基础再刷题。";
    if (lower.indexOf("python") >= 0) return "Python 建议从语法 + 数据处理 + 小项目三步走。";
    if (lower.indexOf("llm") >= 0 || lower.indexOf("大模型") >= 0) return "LLM 方向可以从 Transformer、微调方法和 Agent 工程化实践切入。";
    if (lower.indexOf("机器学习") >= 0 || lower.indexOf("深度学习") >= 0) return "机器学习建议先掌握监督学习，再进入深度学习与实战。";
    return "我收到了你的问题。你也可以配置后端 AI 接口，让我给出更智能的回答。";
  }

  function createQuickActions() {
    quickActions.slice(0, 5).forEach(function (text) {
      var chip = document.createElement("button");
      chip.className = "ai-pet-chip";
      chip.type = "button";
      chip.textContent = text;
      chip.addEventListener("click", function () {
        el.input.value = text;
        sendMessage();
      });
      el.quick.appendChild(chip);
    });
  }

  function withTimeout(promise, ms) {
    return new Promise(function (resolve, reject) {
      var done = false;
      var timer = window.setTimeout(function () {
        if (done) return;
        done = true;
        reject(new Error("timeout"));
      }, ms);

      promise
        .then(function (val) {
          if (done) return;
          done = true;
          window.clearTimeout(timer);
          resolve(val);
        })
        .catch(function (err) {
          if (done) return;
          done = true;
          window.clearTimeout(timer);
          reject(err);
        });
    });
  }

  function requestAI(text) {
    if (!endpoint) {
      return Promise.resolve({ reply: localFallbackReply(text), fromFallback: true });
    }

    var req = fetch(endpoint, {
      method: cfg.method || "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text,
        path: window.location.pathname,
        title: document.title
      })
    }).then(function (res) {
      if (!res.ok) {
        throw new Error("http_" + res.status);
      }
      return res.json();
    });

    return withTimeout(req, requestTimeoutMs).then(function (data) {
      return {
        reply: (data && (data.reply || data.answer || data.message)) || "我暂时没有组织好答案，请再问我一次。",
        fromFallback: false
      };
    });
  }

  function setSending(sending) {
    state.isSending = sending;
    el.send.disabled = sending;
    el.character.classList.toggle("is-speaking", sending);
  }

  function sendMessage() {
    var text = (el.input.value || "").trim();
    if (!text || state.isSending) return;

    appendMsg("user", text);
    el.input.value = "";
    setSending(true);

    requestAI(text)
      .then(function (data) {
        appendMsg("bot", data.reply);
        if (data.fromFallback) {
          showTip("当前是本地回复模式，配置接口后会更智能", 2600);
        }
      })
      .catch(function () {
        if (cfg.localFallback === false) {
          appendMsg("bot", "网络异常，请稍后再试。");
          return;
        }
        appendMsg("bot", localFallbackReply(text));
        showTip("接口暂不可用，已切换到本地回复", 2600);
      })
      .finally(function () {
        setSending(false);
      });
  }

  el.character.addEventListener("click", function () {
    setOpen(!state.isOpen);
    if (state.isOpen) {
      showTip("我在这，随时可以问我", 1800);
    }
  });

  el.closeBtn.addEventListener("click", function () {
    setOpen(false);
  });

  el.clearBtn.addEventListener("click", function () {
    el.messages.innerHTML = "";
    window.localStorage.removeItem(storageKey);
    appendMsg("bot", getPathWelcome());
  });

  el.send.addEventListener("click", sendMessage);
  el.input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  createQuickActions();
  if (!restoreHistory()) {
    appendMsg("bot", getPathWelcome());
  }

  showTip("点击我可以打开 AI 桌宠", 2800);
})();
