/* Home entrances have one owner; decorative effects run only near the viewport. */
(()=>{'use strict';
if(!document.body.classList.contains('home-page'))return;
const media=matchMedia('(prefers-reduced-motion: reduce)');
const reduced=()=>media.matches||document.documentElement.dataset.motion==='reduced';
const hosts=[...document.querySelectorAll('.process-grid>article,.home-page .cta-band')];
hosts.forEach((host,i)=>{
 host.classList.add('dedicated-aura');host.style.setProperty('--aura-phase',(-i*1.7)+'s');
 host.classList.add(host.matches('.cta-band')?'aura-project':'aura-step-'+(i+1));
 for(const name of ['dedicated-aura-bg','dedicated-aura-border']){const layer=document.createElement('span');layer.className=name;layer.setAttribute('aria-hidden','true');host.append(layer)}
});
const selectors='main .card,main .panel,main .master-card,main .process-grid>article,main .guide-links>a,main .trust-strip>span,main .section-head,main .hero-copy>*,main .partner-section>.btn,main .section-link,main .cta-band>div,main .cta-band>.btn,main section>.kicker,main section>h2,main .project-selector,main .demo-controls';
const candidates=[...new Set(document.querySelectorAll(selectors))];
// Do not stack parent and child fades.
const targets=candidates.filter(el=>!candidates.some(parent=>parent!==el&&parent.contains(el)));
if(!('IntersectionObserver'in window))return;
const effects=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('aura-active',e.isIntersecting)),{rootMargin:'80px',threshold:0});
hosts.forEach(el=>effects.observe(el));
const entrances=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('home-arrived');entrances.unobserve(e.target)}}),{rootMargin:'0px 0px 70px 0px',threshold:0});
if(!reduced())targets.forEach(el=>{el.classList.add('home-enter');entrances.observe(el)});
const update=()=>{if(reduced()){targets.forEach(el=>el.classList.add('home-arrived'));entrances.disconnect()}};
media.addEventListener('change',update);document.addEventListener('zedesign-motion-change',update);
})();
