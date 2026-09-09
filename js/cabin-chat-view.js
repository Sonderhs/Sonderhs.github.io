(() => {
  'use strict';
  if (window.CabinChatView) return;
  const markdown = window.markdownit?.({ html: false, breaks: true, linkify: true, typographer: false });
  function safeURL(value) {
    try {
      const url = new URL(value, location.href);
      return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.href : null;
    } catch { return null; }
  }
  if (markdown) {
    markdown.validateLink = value => !!safeURL(value);
    markdown.renderer.rules.image = (tokens, index) => markdown.utils.escapeHtml(tokens[index].content || '图片');
    markdown.renderer.rules.link_open = (tokens, index, options, env, self) => {
      tokens[index].attrSet('target', '_blank');
      tokens[index].attrSet('rel', 'noopener noreferrer');
      return self.renderToken(tokens, index, options);
    };
  }

  // Keep unchanged paragraphs, table cells and code nodes mounted while the tail grows.
  function reconcile(parent, next) {
    const nodes = Array.from(next.childNodes);
    nodes.forEach((desired, index) => {
      const current = parent.childNodes[index];
      if (!current) { parent.append(desired); return; }
      if (current.isEqualNode(desired)) return;
      if (current.nodeType !== desired.nodeType || current.nodeName !== desired.nodeName) {
        current.replaceWith(desired); return;
      }
      if (current.nodeType === Node.TEXT_NODE) { current.nodeValue = desired.nodeValue; return; }
      if (current.nodeType !== Node.ELEMENT_NODE) { current.replaceWith(desired); return; }
      for (const attr of Array.from(current.attributes)) if (!desired.hasAttribute(attr.name)) current.removeAttribute(attr.name);
      for (const attr of Array.from(desired.attributes)) if (current.getAttribute(attr.name) !== attr.value) current.setAttribute(attr.name, attr.value);
      reconcile(current, desired);
    });
    while (parent.childNodes.length > nodes.length) parent.lastChild.remove();
  }

  function render(node, text, sources = []) {
    if (!markdown) { node.textContent = text; return; }
    const template = document.createElement('template');
    // Only markdown-it output enters the HTML sink: raw HTML and image loading are disabled.
    template.innerHTML = markdown.render(text);
    const byId = new Map(sources.map(source => [source.id, source]));
    const walker = document.createTreeWalker(template.content, NodeFilter.SHOW_TEXT);
    const leaves = [];
    while (walker.nextNode()) {
      if (!walker.currentNode.parentElement?.closest('a, code, pre')) leaves.push(walker.currentNode);
    }
    for (const leaf of leaves) {
      if (!/\[(?:B|W)\d+\]/.test(leaf.data)) continue;
      const fragment = document.createDocumentFragment();
      for (const part of leaf.data.split(/(\[(?:B|W)\d+\])/g)) {
        const source = byId.get(part.slice(1, -1));
        const url = source && safeURL(source.url);
        if (!/^\[(?:B|W)\d+\]$/.test(part) || !url) { fragment.append(document.createTextNode(part)); continue; }
        const link = document.createElement('a');
        link.className = 'cabin-chat-citation'; link.textContent = part;
        link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.title = source.title || '';
        fragment.append(link);
      }
      leaf.replaceWith(fragment);
    }
    for (const table of template.content.querySelectorAll('table')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'cabin-chat-table'; wrapper.tabIndex = 0;
      wrapper.setAttribute('role', 'region'); wrapper.setAttribute('aria-label', '表格，可横向滚动');
      table.replaceWith(wrapper); wrapper.append(table);
    }
    reconcile(node, template.content);
  }

  function stream(node, log, getSources) {
    let text = '', visible = 0, frame = 0, lastPaint = 0, invalidated = false, ended = false;
    let finishing = null, deadline = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    node.classList.add('is-streaming');
    node.setAttribute('aria-busy', 'true');
    function paint() {
      const pinned = log.scrollHeight - log.scrollTop - log.clientHeight < 80;
      render(node, text.slice(0, visible), getSources());
      if (pinned) log.scrollTop = log.scrollHeight;
      invalidated = false;
    }
    function cleanup() {
      cancelAnimationFrame(frame); frame = 0; ended = true;
      document.removeEventListener('visibilitychange', visibility);
      node.classList.remove('is-streaming'); node.removeAttribute('aria-busy');
      finishing?.(); finishing = null;
    }
    function flush() {
      if (ended) return;
      visible = text.length; paint(); cleanup();
    }
    function schedule() { if (!frame && !ended) frame = requestAnimationFrame(tick); }
    function tick(now) {
      frame = 0;
      if (ended) return;
      if (now - lastPaint < 40) { schedule(); return; }
      const elapsed = Math.min(80, now - lastPaint || 40);
      lastPaint = now;
      const remaining = text.length - visible;
      const step = reducedMotion.matches || document.hidden || (deadline && now >= deadline)
        ? remaining : Math.max(2, Math.ceil(remaining * elapsed / (deadline ? Math.max(40, deadline - now) : 120)));
      if (remaining || invalidated) {
        visible = Math.min(text.length, visible + step);
        // Never render half of a UTF-16 surrogate pair when chunks split an emoji.
        if (visible < text.length && /[\uD800-\uDBFF]/.test(text[visible - 1])) visible--;
        paint();
      }
      if (finishing && visible === text.length) { cleanup(); return; }
      if (visible < text.length || invalidated) schedule();
    }
    function visibility() {
      if (document.hidden) {
        visible = text.length; paint();
        if (finishing) cleanup();
      } else schedule();
    }
    document.addEventListener('visibilitychange', visibility);
    return {
      append(delta) {
        if (ended || typeof delta !== 'string') return;
        text += delta;
        if (document.hidden) { visible = text.length; paint(); } else schedule();
      },
      refresh() { if (!ended) { invalidated = true; schedule(); } },
      finish() {
        if (ended) return Promise.resolve();
        if (document.hidden || reducedMotion.matches || visible === text.length) { flush(); return Promise.resolve(); }
        deadline = performance.now() + 180;
        return new Promise(resolve => { finishing = resolve; schedule(); });
      },
      flush
    };
  }
  window.CabinChatView = Object.freeze({ render, stream });
})();
