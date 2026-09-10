(() => {
  'use strict';
  if (window.__cabinChat) return;
  window.__cabinChat = true;
  const root = new URL('../', document.currentScript.src);
  const launcher = document.createElement('button');
  launcher.id = 'cabin-chat-launcher';
  launcher.type = 'button';
  launcher.textContent = '和Neko聊聊';
  launcher.setAttribute('aria-expanded', 'false');
  launcher.setAttribute('aria-controls', 'cabin-chat');
  launcher.className = 'no-destroy';
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = new URL('css/cabin-chat.css?v=20260910-dark-blue', root).href;
  document.head.append(style);
  document.body.append(launcher);
  let panel, config, configPromise, log, form, input, send, stop, retry, status, consent, web, article, clear, challenge;
  let history = [], pending = null, lastPayload = null, lastAnswer = null, token = '', challengeId = null;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }
  function button(text, handler, className = '') {
    const node = element('button', className, text);
    node.type = 'button';
    node.addEventListener('click', handler);
    return node;
  }
  function setStatus(text) {
    status.textContent = text;
    launcher.dataset.state = pending ? 'busy' : 'idle';
    const avatar = document.getElementById('hansen-avatar');
    if (avatar) avatar.dataset.chatState = pending ? 'thinking' : 'idle';
  }
  function scroll() { log.scrollTop = log.scrollHeight; }
  function message(role, text) {
    const node = element('section', `cabin-chat-message ${role}`);
    node.append(element('span', 'cabin-chat-speaker', role === 'user' ? '你' : 'Neko · AI'));
    const content = element('div', 'cabin-chat-text', text);
    node.append(content);
    log.append(node);
    scroll();
    return { node, content };
  }
  function renderSources(answer, sources, webStatus, blogAvailable) {
    answer.node.querySelector('.cabin-chat-sources')?.remove();
    const container = element('details', 'cabin-chat-sources');
    container.append(element('summary', '', `检索参考 · 博客 ${sources.filter(s => s.kind === 'blog').length} / 网络 ${sources.filter(s => s.kind === 'web').length}`));
    container.append(element('p', '', '这些是提供给模型的参考片段；正文编号表示实际引用，请核对原文。'));
    if (!blogAvailable) container.append(element('p', '', '博客索引暂不可用。'));
    const notes = { failed: '联网检索失败，回答不能当作最新资料。', empty: '联网检索未找到有效结果。', disabled: '本次已关闭联网补充。', 'not-needed': '本次未调用网络检索。', searched: '本次已检索网络资料。' };
    container.append(element('p', '', notes[webStatus] || ''));
    for (const source of sources) {
      try {
        const url = new URL(source.url);
        if (!['https:', 'http:'].includes(url.protocol)) continue;
        const link = element('a', '', `[${source.id}] ${source.title}`);
        link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer';
        container.append(link);
      } catch {}
    }
    answer.node.append(container);
  }
  function currentArticle() {
    const post = document.querySelector('#post #article-container');
    return post ? location.pathname : '';
  }
  function updateArticle() {
    if (article) {
      article.hidden = !currentArticle();
      article.disabled = !!pending;
      article.title = document.querySelector('.post-title')?.textContent || '解释当前文章';
    }
  }
  function availability() {
    const busy = !!pending;
    send.disabled = busy || !config?.endpoint || !consent.checked || (!!config?.turnstileSiteKey && !token);
    stop.hidden = !busy;
    clear.disabled = busy;
    web.disabled = busy;
    consent.disabled = busy;
    input.disabled = busy;
    retry.hidden = busy || !lastPayload;
    retry.disabled = !config?.endpoint || !consent.checked || (!!config?.turnstileSiteKey && !token);
    updateArticle();
  }
  let avatarWidget, avatarHandle, layoutFrame = 0;
  const avatarObserver = new MutationObserver(syncAvatar);
  const avatarSizeObserver = new ResizeObserver(queueLayout);
  function queueLayout() {
    if (!layoutFrame) layoutFrame = requestAnimationFrame(() => { layoutFrame = 0; layoutPanel(); });
  }
  function layoutPanel() {
    if (!panel || panel.hidden) return;
    if (!avatarHandle) {
      for (const property of ['left', 'top', 'right', 'bottom', 'width', 'height']) panel.style.removeProperty(property);
      panel.classList.remove('cabin-chat-short');
      delete panel.dataset.placement;
      return;
    }
    const viewport = window.visualViewport;
    const margin = 8, gap = 12;
    const left = (viewport?.offsetLeft || 0) + margin;
    const top = (viewport?.offsetTop || 0) + margin;
    const width = (viewport?.width || document.documentElement.clientWidth) - margin * 2;
    const height = (viewport?.height || innerHeight) - margin * 2;
    const right = left + width, bottom = top + height;
    const mobile = width < 752;
    const desiredWidth = Math.min(mobile ? width : 410, width);
    const desiredHeight = Math.min(mobile ? 780 : 680, height);
    const avatar = avatarHandle && avatarWidget.getBoundingClientRect();
    let region = { x: left, y: top, width, height, side: 'free' };
    if (avatar && avatar.right > left && avatar.left < right && avatar.bottom > top && avatar.top < bottom) {
      const candidates = [
        { x: left, y: top, width: Math.max(0, avatar.left - gap - left), height, side: 'left' },
        { x: avatar.right + gap, y: top, width: Math.max(0, right - avatar.right - gap), height, side: 'right' },
        { x: left, y: top, width, height: Math.max(0, avatar.top - gap - top), side: 'above' },
        { x: left, y: avatar.bottom + gap, width, height: Math.max(0, bottom - avatar.bottom - gap), side: 'below' }
      ];
      const usable = candidates.filter(r => r.width >= Math.min(300, width) && r.height > 0);
      const comfortable = usable.find(r => r.width >= desiredWidth && r.height >= Math.min(380, desiredHeight));
      region = comfortable || usable.sort((a, b) =>
        Math.min(b.width, desiredWidth) * Math.min(b.height, desiredHeight) -
        Math.min(a.width, desiredWidth) * Math.min(a.height, desiredHeight))[0] || region;
    }
    const w = Math.min(desiredWidth, region.width), h = Math.min(desiredHeight, region.height);
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const side = region.side === 'left' || region.side === 'right';
    const x = side ? (region.side === 'left' ? region.x + region.width - w : region.x) :
      clamp(avatar ? avatar.right - w : right - w, region.x, region.x + region.width - w);
    const y = side ? clamp(avatar.bottom - h, region.y, region.y + region.height - h) :
      region.side === 'below' ? region.y : region.y + region.height - h;
    Object.assign(panel.style, { left: x + 'px', top: y + 'px', right: 'auto', bottom: 'auto', width: w + 'px', height: h + 'px' });
    panel.dataset.placement = region.side;
    panel.classList.toggle('cabin-chat-short', h < 380);
  }
  function syncAvatar() {
    const widget = document.getElementById('hansen-avatar');
    if (widget !== avatarWidget) {
      avatarObserver.disconnect();
      avatarSizeObserver.disconnect();
      avatarWidget = widget;
      if (widget) {
        avatarObserver.observe(widget, { attributes: true, attributeFilter: ['hidden', 'style', 'class'] });
        avatarSizeObserver.observe(widget);
      }
    }
    const handle = widget?.querySelector('.avatar-drag');
    const visible = widget && !widget.hidden && handle && handle.getClientRects().length > 0 &&
      getComputedStyle(widget).visibility !== 'hidden' && getComputedStyle(handle).visibility !== 'hidden';
    avatarHandle = visible ? handle : null;
    launcher.hidden = !!avatarHandle;
    launcher.style.display = avatarHandle ? 'none' : '';
    const expanded = String(!!panel && !panel.hidden);
    launcher.setAttribute('aria-expanded', expanded);
    if (handle) {
      handle.setAttribute('aria-controls', 'cabin-chat');
      handle.setAttribute('aria-haspopup', 'dialog');
      handle.setAttribute('aria-expanded', expanded);
      handle.setAttribute('aria-label', '和Neko聊聊；拖动或方向键移动，双击或 Home 键复位');
      handle.title = '点击和Neko聊聊；拖动移动，双击复位';
    }
    queueLayout();
  }
  function open() {
    if (!panel) buildPanel();
    const wasHidden = panel.hidden;
    panel.hidden = false;
    syncAvatar();
    layoutPanel();
    if (input.disabled) panel.querySelector('.cabin-chat-close').focus();
    else input.focus();
    if (wasHidden) scroll();
    configPromise?.catch(() => {});
  }
  function close() {
    panel.hidden = true;
    syncAvatar();
    (avatarHandle || launcher).focus({ preventScroll: true });
  }
  async function setupChallenge() {
    if (!config.turnstileSiteKey) return;
    setStatus('请完成人机验证。');
    if (!window.turnstile) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true; script.onload = resolve; script.onerror = reject;
        document.head.append(script);
      });
    }
    challengeId = window.turnstile.render(challenge, {
      sitekey: config.turnstileSiteKey, action: 'cabin-chat', theme: 'auto',
      callback: value => { token = value; availability(); setStatus('验证通过，可以开始提问。'); },
      'expired-callback': () => { token = ''; availability(); },
      'error-callback': () => { token = ''; availability(); setStatus('人机验证失败，请刷新页面重试。'); }
    });
  }
  async function loadConfig() {
    try {
      if (!window.CabinChatView || !window.markdownit) throw new Error('聊天渲染组件加载失败');
      const response = await fetch(new URL('assistant/config.json', root), { cache: 'no-cache' });
      if (!response.ok) throw new Error();
      config = await response.json();
      if (config.endpoint) {
        const url = new URL(config.endpoint);
        if (url.protocol !== 'https:' && !(url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname) && ['localhost', '127.0.0.1'].includes(location.hostname))) throw new Error();
        setStatus('先从笔记找线索，不够再去网络查证。');
        await setupChallenge();
      } else setStatus('Neko的聊天后端尚未接通。站长配置接口后即可启用。');
    } catch {
      config = null;
      setStatus('聊天配置或验证组件加载失败，请刷新后重试。');
    }
    availability();
  }
  function buildPanel() {
    panel = element('section', 'no-destroy'); panel.id = 'cabin-chat'; panel.hidden = true;
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-labelledby', 'cabin-chat-title');
    const header = element('header', 'cabin-chat-header');
    const identity = element('div');
    const eyebrow = element('span', 'cabin-chat-eyebrow', 'HANSEN.CABIN / KNOWLEDGE COMPANION');
    const title = element('h2', '', 'Neko的知识角'); title.id = 'cabin-chat-title';
    identity.append(eyebrow, title, element('p', '', '有据可查，也保留一点好奇心。'));
    const closeButton = button('×', close, 'cabin-chat-close'); closeButton.setAttribute('aria-label', '关闭聊天');
    header.append(identity, closeButton);
    log = element('div', 'cabin-chat-log'); log.setAttribute('role', 'log'); log.setAttribute('aria-label', '对话记录');
    const suggestions = element('div', 'cabin-chat-suggestions');
    for (const text of ['有哪些 Kafka 相关文章？', '介绍一下这座博客']) {
      suggestions.append(button(text, () => { input.value = text; input.focus(); }));
    }
    article = button('解释当前文章', () => { input.value = '请解释当前文章的核心思路、关键概念和适用场景。'; input.focus(); });
    suggestions.append(article);
    form = element('form', 'cabin-chat-form');
    const label = element('label', 'cabin-chat-input-label', '想了解什么？');
    input = element('textarea'); input.id = 'cabin-chat-input'; input.rows = 2; input.maxLength = 1500;
    input.placeholder = '问文章、问技术，或者一起找答案…'; label.htmlFor = input.id;
    input.addEventListener('keydown', event => {
      if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
        event.preventDefault(); if (!send.disabled) form.requestSubmit();
      }
    });
    const controls = element('div', 'cabin-chat-controls');
    const webLabel = element('label', 'cabin-chat-range');
    web = element('select'); web.setAttribute('aria-label', '资料范围与联网检索策略');
    [['auto', '博客优先 · 自动联网'], ['always', '同时检索网络'], ['off', '关闭联网补充']].forEach(([value, text]) => {
      const option = element('option', '', text); option.value = value; web.append(option);
    });
    webLabel.append(web);
    clear = button('清空', () => {
      history = []; lastPayload = null; lastAnswer = null; log.replaceChildren(); welcome(); availability();
    });
    const privacy = element('label', 'cabin-chat-privacy');
    consent = element('input'); consent.type = 'checkbox'; consent.checked = true;
    consent.setAttribute('aria-describedby', 'cabin-chat-privacy-detail');
    consent.addEventListener('change', availability);
    privacy.append(consent, document.createTextNode('同意发送必要内容'));
    const disclosure = element('details', 'cabin-chat-disclosure');
    disclosure.append(element('summary', '', '隐私说明'));
    const detail = element('p', '', '同意将问题、少量对话历史及公开文章片段发送给模型服务；启用联网时，检索词会发送给搜索服务。请勿输入敏感信息。');
    detail.id = 'cabin-chat-privacy-detail';
    disclosure.append(detail);
    const footer = element('div', 'cabin-chat-footer');
    footer.append(privacy, disclosure, element('span', 'cabin-chat-note', 'AI 回答请核对来源'));
    challenge = element('div', 'cabin-chat-challenge');
    const actions = element('div', 'cabin-chat-actions');
    retry = button('重试', () => submit(lastPayload, true)); retry.hidden = true;
    stop = button('停止', () => pending?.abort()); stop.hidden = true;
    send = element('button', 'cabin-chat-send', '发送'); send.type = 'submit'; send.disabled = true;
    actions.append(clear, retry, stop, send);
    controls.append(webLabel, actions);
    status = element('p', 'cabin-chat-status', '正在连接知识角…'); status.setAttribute('role', 'status');
    form.append(label, input, controls, footer, challenge, status);
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (send.disabled || !input.value.trim()) return;
      submit({ message: input.value.trim(), history: history.slice(-6), currentPath: currentArticle(), web: web.value !== 'off', forceWeb: web.value === 'always' });
    });
    panel.append(header, log, suggestions, form);
    panel.addEventListener('keydown', event => { if (event.key === 'Escape') { event.stopPropagation(); close(); } });
    document.body.append(panel);
    welcome(); updateArticle();
    configPromise = loadConfig();
  }
  function welcome() {
    message('assistant', '我是Neko，\n想看哪篇笔记？博客里没写到的，我可以去网络找线索；拿不准的地方，也会老实告诉你。');
  }
  async function submit(payload, isRetry = false) {
    if (pending || !payload || !config?.endpoint || !consent.checked) return;
    if (config.turnstileSiteKey && !token) return;
    const controller = new AbortController(); pending = controller;
    lastPayload = payload;
    if (isRetry) lastAnswer?.node.remove();
    else { message('user', payload.message); input.value = ''; }
    const answer = message('assistant', ''); lastAnswer = answer;
    let text = '', sources = [], completed = false, truncated = false, failure = '';
    const view = window.CabinChatView.stream(answer.content, log, () => sources);
    controller.signal.addEventListener('abort', view.flush, { once: true });
    availability(); setStatus('正在敲Neko的门…');
    const timeout = setTimeout(() => controller.abort(), 75000);
    let reader;
    try {
      const response = await fetch(config.endpoint, {
        method: 'POST', signal: controller.signal, credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, turnstileToken: token })
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || `请求失败（${response.status}），请稍后重试。`);
      }
      if (!response.headers.get('Content-Type')?.includes('text/event-stream') || !response.body) throw new Error('聊天接口返回格式不正确。');
      reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      const receive = raw => {
        let type = '', data = '';
        for (const line of raw.split('\n')) {
          if (line.startsWith('event:')) type = line.slice(6).trim();
          if (line.startsWith('data:')) data += line.slice(5).trim();
        }
        if (!data) return;
        const value = JSON.parse(data);
        if (type === 'status') setStatus(value.message);
        if (type === 'sources') {
          sources = value.sources || [];
          renderSources(answer, sources, value.webStatus, value.blogAvailable);
          view.refresh();
        }
        if (type === 'delta') {
          if (typeof value.text !== 'string') throw new Error('聊天数据格式不正确。');
          text += value.text; view.append(value.text);
        }
        if (type === 'error') throw new Error(value.message);
        if (type === 'done') { completed = true; truncated = value.truncated; }
      };
      for (;;) {
        const { value, done } = await reader.read();
        buffer += done ? decoder.decode() : decoder.decode(value, { stream: true });
        buffer = buffer.replace(/\r\n/g, '\n');
        let end;
        while ((end = buffer.indexOf('\n\n')) >= 0) {
          receive(buffer.slice(0, end)); buffer = buffer.slice(end + 2);
        }
        if (done) { if (buffer.trim()) receive(buffer); break; }
      }
      if (!completed) throw new Error('连接中断，答案可能不完整，请重试。');
      await view.finish();
      if (controller.signal.aborted) throw new Error('ABORTED');
      history.push({ role: 'user', content: payload.message }, { role: 'assistant', content: text.slice(0, 3000) });
      history = history.slice(-6); lastPayload = null;
    } catch (error) {
      failure = controller.signal.aborted ? '回答已停止或超时，已有片段可能不完整。' : error.message;
      answer.node.append(element('p', 'cabin-chat-error', failure));
    } finally {
      view.flush();
      controller.signal.removeEventListener('abort', view.flush);
      clearTimeout(timeout);
      if (reader) { await reader.cancel().catch(() => {}); reader.releaseLock(); }
      pending = null; token = '';
      if (challengeId !== null) window.turnstile?.reset(challengeId);
      availability();
      setStatus(failure || (truncated ? '本次达到回答长度上限，可以继续追问。' : '回答完成。你还想沿着哪条线索看看？'));
      if (!panel.hidden) input.focus();
    }
  }
  launcher.addEventListener('click', () => {
    if (panel && !panel.hidden) close();
    else open();
  });
  document.addEventListener('hansen-avatar-chat', open);
  document.addEventListener('hansen-avatar-ready', syncAvatar);
  document.addEventListener('pjax:complete', () => { updateArticle(); syncAvatar(); });
  window.addEventListener('resize', () => { syncAvatar(); layoutPanel(); });
  window.visualViewport?.addEventListener('resize', layoutPanel);
  window.visualViewport?.addEventListener('scroll', queueLayout);
  style.addEventListener('load', queueLayout);
  new MutationObserver(syncAvatar).observe(document.body, { childList: true });
  syncAvatar();
})();
