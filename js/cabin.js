(() => {
  'use strict';
  if (window.__cabinDesignLoaded) return;
  window.__cabinDesignLoaded = true;

  const refresh = () => {
    const current = decodeURI(location.pathname).replace(/\/$/, '') || '/';
    document.querySelectorAll('#nav a.site-page[href]').forEach(link => {
      if (!link.getAttribute('href').startsWith('/')) return;
      const path = decodeURI(new URL(link.href).pathname).replace(/\/$/, '') || '/';
      const active = path === '/' ? current === '/' || current.startsWith('/page/') : current === path || current.startsWith(path + '/');
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    const button = document.getElementById('cabin-theme-toggle');
    if (button) {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      button.setAttribute('aria-label', dark ? '切换浅色主题' : '切换深色主题');
      button.setAttribute('aria-pressed', String(dark));
      button.title = button.getAttribute('aria-label');
    }
    const menu = document.querySelector('#toggle-menu a');
    if (menu) menu.setAttribute('aria-label', '打开导航菜单');
  };

  document.addEventListener('click', event => {
    const button = event.target.closest('#cabin-theme-toggle');
    if (!button) return;
    const nativeButton = document.getElementById('darkmode');
    if (nativeButton) nativeButton.click();
    else {
      const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      if (window.saveToLocal) window.saveToLocal.set('theme', theme, 2);
    }
    refresh();
  });
  document.addEventListener('pjax:complete', refresh);
  new MutationObserver(refresh).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', refresh, { once: true });
  else refresh();
})();
