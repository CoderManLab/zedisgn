/* Prize Reaper case-study mock preview — deliberately no network or live results. */
(() => {
  const root = document.querySelector('[data-pr-demo]');
  if (!root) return;
  const controls = Array.from(root.querySelectorAll('[data-pr-tab]'));
  const panels = Array.from(root.querySelectorAll('[data-pr-panel]'));
  const valid = new Set(['discovery', 'review', 'health']);

  const select = (key) => {
    if (!valid.has(key)) return;
    controls.forEach(button => {
      const active = button.dataset.prTab === key;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('is-selected', active);
    });
    panels.forEach(panel => {
      panel.hidden = panel.dataset.prPanel !== key;
    });
  };

  controls.forEach(button => {
    button.addEventListener('click', () => select(button.dataset.prTab));
  });
  select('discovery');
})();
