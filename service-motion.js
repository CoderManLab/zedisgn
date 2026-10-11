(()=>{
 const graphics=[...document.querySelectorAll('.service-signal[data-service-motion]')];
 if(!graphics.length||!('IntersectionObserver' in window))return;
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 const visible=new Set();
 const update=()=>{const enabled=!media.matches&&document.documentElement.dataset.motion!=='reduced'&&!document.hidden;graphics.forEach(node=>node.classList.toggle('is-in-view',enabled&&visible.has(node)));};
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)visible.add(entry.target);else visible.delete(entry.target);});update();},{threshold:.12});
 graphics.forEach(node=>observer.observe(node));
 document.addEventListener('zedesign-motion-change',update);
 document.addEventListener('visibilitychange',update);
 media.addEventListener('change',update);
})();
