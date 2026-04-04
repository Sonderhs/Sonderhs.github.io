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
        width: 180,
        height: 320,
        hOffset: 8,
        // Keep avatar above the AI button at the lower-left corner.
        vOffset: 140
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
  }

  function initOnce() {
    if (window.__BLOG_LIVE2D_READY__) return;
    window.__BLOG_LIVE2D_READY__ = true;

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
