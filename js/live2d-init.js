(function () {
  // Replace this with your licensed Sakura Live2D model URL if you have one.
  var MODEL_JSON_PATH = 'https://unpkg.com/live2d-widget-model-hijiki@1.0.5/assets/hijiki.model.json';
  var LIB_JS = 'https://unpkg.com/live2d-widget@3.1.4/lib/L2Dwidget.min.js';

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var existed = document.querySelector('script[data-live2d-lib="1"]');
      if (existed && window.L2Dwidget) {
        resolve();
        return;
      }

      var script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.dataset.live2dLib = '1';
      script.onload = function () { resolve(); };
      script.onerror = function () { reject(new Error('Live2D library load failed')); };
      document.head.appendChild(script);
    });
  }

  function removeOldWidget() {
    var old = document.getElementById('live2d-widget');
    if (old) old.remove();
  }

  function toggleChatPanel() {
    document.dispatchEvent(new CustomEvent('blog-ai:toggle'));
  }

  function getSavedPosition() {
    try {
      var raw = localStorage.getItem('blog_live2d_position');
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (typeof obj !== 'object' || obj === null) return null;
      if (typeof obj.left !== 'number' || typeof obj.top !== 'number') return null;
      return obj;
    } catch {
      return null;
    }
  }

  function savePosition(left, top) {
    try {
      localStorage.setItem('blog_live2d_position', JSON.stringify({ left: left, top: top }));
    } catch {
      // ignore storage failures
    }
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function emitLive2DMoved(host) {
    if (!host) return;
    var rect = host.getBoundingClientRect();
    document.dispatchEvent(new CustomEvent('blog-live2d-moved', {
      detail: {
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height
      }
    }));
  }

  function getLive2DHost() {
    return document.getElementById('live2d-widget') || document.getElementById('live2dcanvas') || document.querySelector('#live2d-widget canvas');
  }

  function normalizeWidgetPosition(host) {
    var rect = host.getBoundingClientRect();
    host.style.position = 'fixed';
    host.style.left = Math.round(rect.left) + 'px';
    host.style.top = Math.round(rect.top) + 'px';
    host.style.right = 'auto';
    host.style.bottom = 'auto';
    host.style.margin = '0';

    var saved = getSavedPosition();
    if (saved) {
      var maxLeft = Math.max(0, window.innerWidth - rect.width);
      var maxTop = Math.max(0, window.innerHeight - rect.height);
      host.style.left = clamp(saved.left, 0, maxLeft) + 'px';
      host.style.top = clamp(saved.top, 0, maxTop) + 'px';
    }

    emitLive2DMoved(host);
  }

  function enableWidgetDrag() {
    if (window.__BLOG_LIVE2D_DRAG_READY__) return true;

    var host = getLive2DHost();
    if (!host) return false;

    normalizeWidgetPosition(host);

    var startX = 0;
    var startY = 0;
    var startLeft = 0;
    var startTop = 0;
    var dragging = false;
    var moved = false;

    var onMove = function (clientX, clientY) {
      var dx = clientX - startX;
      var dy = clientY - startY;
      if (!moved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
        moved = true;
      }

      if (!dragging) return;

      var rect = host.getBoundingClientRect();
      var nextLeft = clamp(startLeft + dx, 0, Math.max(0, window.innerWidth - rect.width));
      var nextTop = clamp(startTop + dy, 0, Math.max(0, window.innerHeight - rect.height));
      host.style.left = Math.round(nextLeft) + 'px';
      host.style.top = Math.round(nextTop) + 'px';
      emitLive2DMoved(host);
    };

    var endDrag = function () {
      if (!dragging) return;
      dragging = false;
      if (moved) {
        window.__BLOG_LIVE2D_SUPPRESS_CLICK__ = true;
        setTimeout(function () {
          window.__BLOG_LIVE2D_SUPPRESS_CLICK__ = false;
        }, 180);
      }

      var left = parseFloat(host.style.left) || 0;
      var top = parseFloat(host.style.top) || 0;
      savePosition(left, top);
      emitLive2DMoved(host);

      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('touchmove', touchMove);
      document.removeEventListener('touchend', touchEnd);
      document.removeEventListener('touchcancel', touchEnd);
    };

    var mouseMove = function (e) {
      onMove(e.clientX, e.clientY);
    };
    var mouseUp = function () {
      endDrag();
    };
    var touchMove = function (e) {
      if (!e.touches || !e.touches.length) return;
      var t = e.touches[0];
      onMove(t.clientX, t.clientY);
      if (dragging) e.preventDefault();
    };
    var touchEnd = function () {
      endDrag();
    };

    host.addEventListener('mousedown', function (e) {
      dragging = true;
      moved = false;
      startX = e.clientX;
      startY = e.clientY;
      startLeft = parseFloat(host.style.left) || 0;
      startTop = parseFloat(host.style.top) || 0;
      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp);
      e.preventDefault();
    });

    host.addEventListener('touchstart', function (e) {
      if (!e.touches || !e.touches.length) return;
      var t = e.touches[0];
      dragging = true;
      moved = false;
      startX = t.clientX;
      startY = t.clientY;
      startLeft = parseFloat(host.style.left) || 0;
      startTop = parseFloat(host.style.top) || 0;
      document.addEventListener('touchmove', touchMove, { passive: false });
      document.addEventListener('touchend', touchEnd);
      document.addEventListener('touchcancel', touchEnd);
      e.preventDefault();
    }, { passive: false });

    window.addEventListener('resize', function () {
      var rect = host.getBoundingClientRect();
      var left = clamp(parseFloat(host.style.left) || 0, 0, Math.max(0, window.innerWidth - rect.width));
      var top = clamp(parseFloat(host.style.top) || 0, 0, Math.max(0, window.innerHeight - rect.height));
      host.style.left = Math.round(left) + 'px';
      host.style.top = Math.round(top) + 'px';
      savePosition(left, top);
      emitLive2DMoved(host);
    });

    host.style.touchAction = 'none';
    window.__BLOG_LIVE2D_DRAG_READY__ = true;
    return true;
  }

  function bindDragWithRetry(tryCount) {
    if (enableWidgetDrag()) return;
    if ((tryCount || 0) >= 30) return;
    setTimeout(function () {
      bindDragWithRetry((tryCount || 0) + 1);
    }, 200);
  }

  function markTriggerReady() {
    window.__BLOG_LIVE2D_CLICK_READY__ = true;
    document.dispatchEvent(new CustomEvent('blog-live2d-ready'));
  }

  function installDelegatedLive2DTrigger() {
    if (window.__BLOG_LIVE2D_DELEGATED_BOUND__) return;

    var handler = function (e) {
      if (window.__BLOG_LIVE2D_SUPPRESS_CLICK__) return;
      var target = e.target;
      if (!target || !target.closest) return;

      if (target.id === 'live2dcanvas' || target.closest('#live2d-widget')) {
        toggleChatPanel();
      }
    };

    document.addEventListener('click', handler, true);
    window.__BLOG_LIVE2D_DELEGATED_BOUND__ = true;
  }

  function bindLive2DOpenTrigger(tryCount) {
    var canvas = document.getElementById('live2dcanvas') || document.querySelector('#live2d-widget canvas');
    if (!canvas) {
      if ((tryCount || 0) < 20) {
        setTimeout(function () {
          bindLive2DOpenTrigger((tryCount || 0) + 1);
        }, 250);
      }
      return;
    }

    if (canvas.dataset.aiOpenBound === '1') return;

    canvas.style.cursor = 'pointer';
    canvas.style.pointerEvents = 'auto';
    canvas.style.transition = 'transform .2s ease, opacity .2s ease';
    canvas.dataset.aiOpenBound = '1';
    markTriggerReady();
  }

  function applyChatStateStyles(opened) {
    var host = document.getElementById('live2d-widget');
    var canvas = document.getElementById('live2dcanvas') || document.querySelector('#live2d-widget canvas');

    if (host) {
      host.style.transition = 'none';
      host.style.transform = 'none';
      host.style.opacity = '1';
    }

    if (canvas) {
      canvas.style.transform = 'none';
      canvas.style.opacity = '1';
    }
  }

  function installChatStateBridge() {
    if (window.__BLOG_LIVE2D_CHAT_BRIDGE__) return;
    document.addEventListener('blog-ai:opened', function () {
      applyChatStateStyles(true);
    });
    document.addEventListener('blog-ai:closed', function () {
      applyChatStateStyles(false);
    });
    window.__BLOG_LIVE2D_CHAT_BRIDGE__ = true;
  }

  function initWidget() {
    if (!window.L2Dwidget || typeof window.L2Dwidget.init !== 'function') {
      return;
    }

    removeOldWidget();

    window.L2Dwidget.init({
      model: {
        jsonPath: MODEL_JSON_PATH,
        scale: 1
      },
      display: {
        position: 'left',
        width: 120,
        height: 180,
        // Align to the former AI button area (left-bottom corner).
        hOffset: 14,
        vOffset: 8
      },
      mobile: {
        show: true,
        scale: 0.75,
        motion: true
      },
      react: {
        opacityDefault: 0.88,
        opacityOnHover: 1
      }
    });

    bindLive2DOpenTrigger(0);
    applyChatStateStyles(false);
    bindDragWithRetry(0);
  }

  function initOnce() {
    if (window.__BLOG_LIVE2D_READY__) return;
    window.__BLOG_LIVE2D_READY__ = true;

    installDelegatedLive2DTrigger();
    installChatStateBridge();

    loadScript(LIB_JS)
      .then(function () {
        initWidget();
      })
      .catch(function () {
        window.__BLOG_LIVE2D_READY__ = false;
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initOnce();
  });

  document.addEventListener('pjax:complete', function () {
    initOnce();
  });
})();
