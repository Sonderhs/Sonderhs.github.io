(() => {
  'use strict';
  if (window.__cabinActivityLoaded) return;
  window.__cabinActivityLoaded = true;
  const clearDay = root => {
    root.querySelectorAll('[data-day-detail]').forEach(detail => { detail.hidden = true; });
    root.querySelectorAll('[data-day][aria-pressed]').forEach(button => button.removeAttribute('aria-pressed'));
  };
  document.addEventListener('change', event => {
    if (event.target.id !== 'cabin-heatmap-year') return;
    const root = event.target.closest('.cabin-heatmap');
    root.querySelectorAll('[data-year]').forEach(panel => { panel.hidden = panel.dataset.year !== event.target.value; });
    clearDay(root);
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('.cabin-day[data-day]');
    if (!button) return;
    const root = button.closest('.cabin-heatmap');
    clearDay(root);
    const detail = root.querySelector(`[data-day-detail="${button.dataset.day}"]`);
    if (detail) detail.hidden = false;
    button.setAttribute('aria-pressed', 'true');
  });
})();
