/* A single viewport dock, outside footer and animated page containers. */
(()=>{'use strict';
const controls=['.back-float','.wa-float','.chat-float'].map(s=>document.querySelector(s));
if(controls.some(n=>!n))return;
document.querySelectorAll('.v3-floating-toggle').forEach(n=>n.remove());
document.body.classList.remove('v3-actions-open','v3-actions-closed','v3-floating-mobile');
const stack=document.createElement('div');stack.id='zed-floating-controls';
stack.setAttribute('role','group');stack.setAttribute('aria-label','Actions rapides');
document.body.append(stack);
controls.forEach(n=>{n.inert=false;stack.append(n)});
const arrow=document.createElement('span');arrow.className='action-arrow';arrow.setAttribute('aria-hidden','true');arrow.textContent='↑';controls[0].replaceChildren(arrow);
document.querySelectorAll('.float-stack').forEach(n=>{if(!n.children.length)n.remove()});
const overlays=[...document.querySelectorAll('[data-sales-dock],[data-consent-banner]')];
function layout(){
 const clearance=Math.max(0,...overlays.filter(n=>!n.hidden&&getComputedStyle(n).display!=='none').map(n=>Math.max(0,innerHeight-n.getBoundingClientRect().top)));
 document.documentElement.style.setProperty('--zed-floating-clearance',Math.round(clearance)+'px');
}
window.addEventListener('resize',layout,{passive:true});
overlays.forEach(n=>{new MutationObserver(layout).observe(n,{attributes:true,attributeFilter:['hidden','class']});new ResizeObserver(layout).observe(n)});
layout();
})();
