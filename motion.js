(()=>{const nodes=[...document.querySelectorAll('.card,.panel,.service-card,.project-card,.master-card')];if(!nodes.length)return;nodes.forEach(n=>n.classList.add('motion-card'));const reduced=matchMedia('(prefers-reduced-motion: reduce)');if('IntersectionObserver'in window&&!reduced.matches){document.documentElement.classList.add('motion-ready');const observer=new IntersectionObserver(entries=>{entries.filter(e=>e.isIntersecting).forEach((e,i)=>{e.target.style.setProperty('--reveal-delay',Math.min(i*70,210)+'ms');e.target.classList.add('motion-visible');observer.unobserve(e.target);});},{threshold:.06});nodes.forEach(n=>observer.observe(n));reduced.addEventListener('change',e=>{if(e.matches){observer.disconnect();document.documentElement.classList.remove('motion-ready');}},{once:true});}if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!reduced.matches){nodes.forEach(n=>{let frame=0,x=0,y=0;const cancel=()=>{if(frame)cancelAnimationFrame(frame);frame=0};n.addEventListener('pointermove',e=>{if(reduced.matches)return;x=e.clientX;y=e.clientY;if(frame)return;frame=requestAnimationFrame(()=>{frame=0;const r=n.getBoundingClientRect();if(!r.width||!r.height)return;n.style.setProperty('--light-x',((x-r.left)/r.width*100)+'%');n.style.setProperty('--light-y',((y-r.top)/r.height*100)+'%')})},{passive:true});n.addEventListener('pointerleave',cancel);reduced.addEventListener('change',e=>{if(e.matches)cancel()})});}})();

/* Shared scroll rules, independent of the card entrance effect. */
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const titles=[...document.querySelectorAll('main h1,main h2,main .motion-card h3')];
 titles.forEach(el=>el.classList.add('zed-scroll-rule'));
 const steps=[...document.querySelectorAll('.process-grid > article')];
 steps.forEach(el=>el.classList.add('zed-step-rule'));
 const rules=[...titles,...steps,...document.querySelectorAll('.scene-rule')];
 const visible=new Set();
 if(!('IntersectionObserver' in window)||reduced.matches)return;
 document.documentElement.classList.add('zed-rules-ready');
 const observer=new IntersectionObserver(entries=>{
  entries.forEach(({target,isIntersecting})=>{
   target.classList.toggle('zed-rule-visible',isIntersecting);
   if(isIntersecting)visible.add(target);else visible.delete(target);
  });
  schedule();
 },{threshold:.12});
 rules.forEach(el=>observer.observe(el));
 let frame=0;
 function schedule(){
  if(frame)return;
  frame=requestAnimationFrame(()=>{
   frame=0;
   visible.forEach(el=>{
    const rect=el.getBoundingClientRect();
    const progress=Math.max(0,Math.min(1,(innerHeight-rect.top)/(innerHeight+rect.height)));
    el.style.setProperty('--rule-light',(progress*100).toFixed(1)+'%');
   });
  });
 }
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',schedule,{passive:true});
 reduced.addEventListener('change',event=>{
  if(!event.matches)return;
  observer.disconnect();visible.clear();
  document.documentElement.classList.remove('zed-rules-ready');
  removeEventListener('scroll',schedule);removeEventListener('resize',schedule);
 },{once:true});
})();
