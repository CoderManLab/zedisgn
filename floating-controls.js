/* Stable floating controls: CSS anchors remain fixed during page scrolling. */
(()=>{'use strict';
const body=document.body;
const controls=['.chat-float','.wa-float','.back-float'].map(s=>document.querySelector(s));
if(controls.some(n=>!n))return;
const dock=document.querySelector('[data-sales-dock]');
const consent=document.querySelector('[data-consent-banner]');
const toggle=document.createElement('button');
toggle.type='button';toggle.className='v3-floating-toggle';
toggle.setAttribute('aria-label','Ouvrir les actions rapides');
toggle.setAttribute('aria-expanded','false');
toggle.innerHTML='<span aria-hidden="true">⋯</span><span class="v3-toggle-label">Actions</span>';
body.append(toggle);
// All three controls stay visible; the obsolete mobile toggle is disabled.
toggle.hidden=true;
let open=false;
const shown=n=>n&&!n.hidden&&getComputedStyle(n).display!=='none'&&n.getBoundingClientRect().height>0;
function layout(){
 const mobile=matchMedia('(max-width:700px)').matches;
 toggle.hidden=!mobile;
 body.classList.toggle('v3-floating-mobile',mobile);
 if(!mobile)open=false;
 body.classList.remove('v3-actions-open');
 body.classList.remove('v3-actions-closed');
 toggle.setAttribute('aria-expanded',String(mobile&&open));
 toggle.setAttribute('aria-label',open?'Fermer les actions rapides':'Ouvrir les actions rapides');
 toggle.querySelector('.v3-toggle-label').textContent=open?'Fermer':'Actions';
 controls.forEach(n=>n.inert=false);
 // Recalculate only when an overlay changes, never on page scroll.
 const overlay=[dock,consent].filter(shown).map(n=>Math.max(0,innerHeight-n.getBoundingClientRect().top));
 const clearance=Math.min(innerHeight*.45,Math.max(0,...overlay));
 document.documentElement.style.setProperty('--zed-floating-clearance',Math.round(clearance)+'px');
}
toggle.addEventListener('click',()=>{open=!open;layout()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&open){open=false;layout();toggle.focus()}});
controls.forEach(n=>n.addEventListener('click',()=>{if(open){open=false;layout()}}));
window.addEventListener('resize',layout,{passive:true});
[dock,consent].filter(Boolean).forEach(n=>new MutationObserver(layout).observe(n,{attributes:true,attributeFilter:['hidden','class']}));
layout();
})();
