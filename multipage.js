(() => {
  const button = document.querySelector('[data-site-menu]');
  const nav = document.querySelector('.site-navigation');
  const close = () => { if(nav?.classList.contains('is-open') && nav.contains(document.activeElement)) button?.focus(); nav?.classList.remove('is-open'); button?.setAttribute('aria-expanded', 'false'); };
  button?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(open));
  });
  button?.addEventListener('keydown', e => { if(e.key === 'ArrowDown'){ e.preventDefault(); nav?.classList.add('is-open'); button.setAttribute('aria-expanded','true'); nav?.querySelector('a')?.focus(); } });
  nav?.addEventListener('focusout', e => { if(e.relatedTarget && !nav.contains(e.relatedTarget) && e.relatedTarget !== button) close(); });
  matchMedia('(max-width: 1000px)').addEventListener('change', close);
  nav?.addEventListener('click', e => { if (e.target.closest('a')) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { const open = nav?.classList.contains('is-open'); close(); if(open) button?.focus(); } });
  document.addEventListener('click', e => { if (!nav?.contains(e.target) && !button?.contains(e.target)) close(); });
  window.addEventListener('scroll', close, {passive:true});
  // BFCache restores focus, menu state and horizontal scroll as well as content.
  // Retain the user's vertical position and normal browser pinch zoom.
  const restoreFrame = () => {
    close();
    document.documentElement.scrollLeft = 0;
    document.body.scrollLeft = 0;
    if(document.activeElement === button) button.blur();
  };
  window.addEventListener('pageshow', restoreFrame);
  window.addEventListener('orientationchange', restoreFrame);

  const projects = [...document.querySelectorAll('[data-project-kind]')];
  const filters = [...document.querySelectorAll('[data-project-filter]')];
  filters.forEach(filter => filter.addEventListener('click', () => {
    const kind = filter.dataset.projectFilter;
    let count = 0;
    projects.forEach(card => {
      const show = kind === 'all' || card.dataset.projectKind.split(' ').includes(kind);
      card.hidden = !show;
      if(show) count++;
    });
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === filter)));
    const result = document.querySelector('[data-filter-result]');
    if(result) result.textContent = count + ' projet' + (count > 1 ? 's affichés' : ' affiché');
  }));

  const form = document.querySelector('[data-brief-form]');
  if(form) {
    const service = new URLSearchParams(window.location.search).get('service');
    const select = form.elements.namedItem('service');
    if(service && [...select.options].some(option => option.value === service)) select.value = service;
    form.addEventListener('submit', e => {
      e.preventDefault();
      for(const field of form.querySelectorAll('input[required],textarea[required]')) field.setCustomValidity(field.value.trim()?'':'Précisez votre besoin avec du texte.');
      if(!form.reportValidity()) return;
      const data = new FormData(form);
      const value = key => String(data.get(key) || '').trim();
      const message = 'Bonjour ZEDESIGN,\n\nVoici mon projet :\n• Prestation : ' + value('service') + '\n• Objectif : ' + value('goal') + '\n• Situation : ' + value('existing') + '\n• Échéance : ' + value('timing') + '\n\nMon besoin : ' + value('details') + '\n\nMerci.';
      const preview = form.querySelector('[data-brief-preview]');
      form.querySelector('[data-brief-text]').textContent = message;
      const link = form.querySelector('[data-brief-link]');
      link.href = 'https://wa.me/33614620757?text=' + encodeURIComponent(message);
      preview.hidden = false;
      link.focus();
    });
    form.addEventListener('input', e => { if(e.target.setCustomValidity)e.target.setCustomValidity(''); form.querySelector('[data-brief-preview]').hidden = true; });
  }
})();
