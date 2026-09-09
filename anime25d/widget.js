(() => {
  'use strict';
  if (window.__hansenAvatar) return;
  window.__hansenAvatar = true;
  const assetRoot = new URL('./', document.currentScript.src);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let widget, frame, timer, drag, position, pointer, moveFrame = 0;
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  try {
    const saved = JSON.parse(sessionStorage.getItem('hansen-avatar-position'));
    if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
      position = { x: clamp(saved.x, 0, 1), y: clamp(saved.y, 0, 1) };
    }
  } catch (_) {}
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = new URL('widget.css?v=20260909-bottom-right', assetRoot).href;
  document.head.appendChild(style);

  function movementBounds() {
    const r = widget.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth || innerWidth;
    const viewportHeight = document.documentElement.clientHeight || innerHeight;
    // Visible horizontal bounds of preview.png on its 1280px PSD canvas.
    // Keep space for animated motion while allowing transparent margins offscreen.
    const padding = Math.max(12, r.width * 0.08);
    const minX = Math.min(0, padding - r.width * (345 / 1280));
    const maxX = Math.max(minX, viewportWidth - r.width * (904 / 1280) - padding);
    return { minX, maxX, maxY: Math.max(0, viewportHeight - r.height) };
  }
  function place(x, y) {
    const { minX, maxX, maxY } = movementBounds();
    x = clamp(x, minX, maxX);
    y = clamp(y, 0, maxY);
    widget.style.right = 'auto';
    widget.style.left = x + 'px';
    widget.style.top = y + 'px';
    widget.style.bottom = 'auto';
    const rangeX = maxX - minX;
    return { x: rangeX ? (x - minX) / rangeX : 0, y: maxY ? y / maxY : 0 };
  }
  function restorePosition() {
    if (!widget || widget.hidden) return;
    if (position) {
      const { minX, maxX, maxY } = movementBounds();
      place(minX + position.x * (maxX - minX), position.y * maxY);
    }
  }
  function savePosition(value) {
    position = value;
    try { sessionStorage.setItem('hansen-avatar-position', JSON.stringify(position)); } catch (_) {}
  }
  function finishDrag(event) {
    if (!drag || (event && event.pointerId !== drag.id)) return;
    const handle = widget.querySelector('.avatar-drag');
    const id = drag.id;
    drag = null;
    widget.classList.remove('is-dragging');
    if (handle.hasPointerCapture(id)) handle.releasePointerCapture(id);
  }
  function sendPointer() {
    moveFrame = 0;
    if (!frame || !widget.classList.contains('is-ready')) return;
    let value = { type: 'anime25d-pointer', active: false };
    if (pointer && !document.hidden) {
      const r = widget.getBoundingClientRect();
      value = {
        type: 'anime25d-pointer', active: true,
        x: clamp((pointer.x - r.left - r.width * 0.5) / Math.max(200, innerWidth * 0.5), -1, 1),
        y: clamp((pointer.y - r.top - r.height * 0.23) / Math.max(160, innerHeight * 0.5), -1, 1)
      };
    }
    frame.contentWindow.postMessage(value, assetRoot.origin);
  }
  function queuePointer() {
    if (!moveFrame && frame) moveFrame = requestAnimationFrame(sendPointer);
  }
  function clearPointer() { pointer = null; queuePointer(); }
  function stop() {
    finishDrag();
    clearTimeout(timer);
    cancelAnimationFrame(moveFrame);
    moveFrame = 0;
    timer = null;
    const previousFrame = frame;
    frame = null;
    // Detaching an iframe can synchronously re-enter sync via lifecycle events.
    // Clear the shared reference first so another stop cannot remove it twice.
    if (widget) widget.classList.remove('is-ready');
    if (previousFrame && previousFrame.isConnected) previousFrame.remove();
  }
  function sync() {
    if (!widget) {
      widget = document.createElement('aside');
      widget.id = 'hansen-avatar';
      widget.setAttribute('aria-label', '博客看板娘');
      const image = document.createElement('img');
      image.src = new URL('preview.png', assetRoot).href;
      image.alt = '猫耳少女看板娘';
      image.width = image.height = 1280;
      image.decoding = 'async';
      image.draggable = false;
      const handle = document.createElement('button');
      handle.type = 'button';
      handle.className = 'avatar-drag';
      handle.setAttribute('aria-label', '拖动看板娘；方向键移动，Home键恢复默认位置');
      handle.title = '拖动角色移动位置，双击恢复默认位置';
      const resetPosition = () => {
        finishDrag();
        position = null;
        widget.style.left = widget.style.right = widget.style.top = widget.style.bottom = '';
        try { sessionStorage.removeItem('hansen-avatar-position'); } catch (_) {}
        queuePointer();
      };
      handle.addEventListener('dblclick', resetPosition);
      handle.addEventListener('pointerdown', event => {
        if (!event.isPrimary || event.button !== 0 || drag) return;
        const r = widget.getBoundingClientRect();
        drag = { id: event.pointerId, dx: event.clientX - r.left, dy: event.clientY - r.top };
        handle.setPointerCapture(event.pointerId);
        widget.classList.add('is-dragging');
        event.preventDefault();
      });
      handle.addEventListener('pointermove', event => {
        if (!drag || event.pointerId !== drag.id) return;
        savePosition(place(event.clientX - drag.dx, event.clientY - drag.dy));
        queuePointer();
      });
      ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(type => handle.addEventListener(type, finishDrag));
      handle.addEventListener('keydown', event => {
        if (event.key === 'Home') { event.preventDefault(); resetPosition(); return; }
        const steps = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
        const step = steps[event.key];
        if (!step) return;
        event.preventDefault();
        const r = widget.getBoundingClientRect(), amount = event.shiftKey ? 30 : 10;
        savePosition(place(r.left + step[0] * amount, r.top + step[1] * amount));
        queuePointer();
      });
      widget.append(image, handle);
      document.body.appendChild(widget);
    }
    widget.hidden = false;
    restorePosition();
    if (reduced.matches || document.hidden) {
      stop();
      return;
    }
    if (frame) return;
    frame = document.createElement('iframe');
    frame.title = 'Anime2.5DRig 看板娘动画';
    frame.setAttribute('aria-hidden', 'true');
    frame.tabIndex = -1;
    frame.setAttribute('allow', "camera 'none'; microphone 'none'; geolocation 'none'");
    frame.src = new URL('index.html?obs=1', assetRoot).href;
    frame.addEventListener('error', stop);
    widget.insertBefore(frame, widget.querySelector('.avatar-drag'));
    timer = setTimeout(stop, 30000);
  }
  window.addEventListener('message', event => {
    if (!frame || event.source !== frame.contentWindow || event.origin !== assetRoot.origin) return;
    if (!event.data || event.data.type !== 'anime25d') return;
    if (event.data.state === 'ready') {
      clearTimeout(timer);
      widget.classList.add('is-ready');
      queuePointer();
    } else if (event.data.state === 'error') stop();
  });
  window.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    pointer = { x: event.clientX, y: event.clientY };
    queuePointer();
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', clearPointer);
  window.addEventListener('blur', () => { finishDrag(); clearPointer(); });
  window.addEventListener('resize', () => { finishDrag(); restorePosition(); queuePointer(); });
  style.addEventListener('load', restorePosition);
  document.addEventListener('pjax:complete', sync);
  document.addEventListener('pjax:send', stop);
  document.addEventListener('visibilitychange', () => { if (document.hidden) clearPointer(); sync(); });
  reduced.addEventListener('change', sync);
  window.addEventListener('pageshow', sync);
  window.addEventListener('pagehide', stop);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sync, { once: true });
  else sync();
})();
