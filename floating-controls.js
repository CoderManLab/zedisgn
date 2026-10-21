/* Keep the actual controls above the actual dock/banner, across all pages. */
(()=>{'use strict';const root=document.documentElement,body=document.body,controls=['.chat-float','.back-float','.wa-float'].map(s=>document.querySelector(s));if(controls.some(n=>!n))return;const header=document.querySelector('.global-header'),dock=document.querySelector('[data-sales-dock]'),banner=document.querySelector('[data-consent-banner]');let queued=false;const visible=n=>n&&!n.hidden&&getComputedStyle(n).display!=='none'&&n.getBoundingClientRect().height>0;function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;layout()})}function layout(){const view=window.visualViewport,H=view?.height||innerHeight,W=view?.width||innerWidth,top=view?.offsetTop||0,left=view?.offsetLeft||0,headerBottom=Math.max(top+8,header?.getBoundingClientRect().bottom||0)+8;const floor=Math.min(top+H-12,...[dock,banner].filter(visible).map(n=>n.getBoundingClientRect().top-12));const compact=floor-headerBottom<160||W<360;body.classList.toggle('float-controls-compact',compact);const [chat,back,wa]=controls,rects=controls.map(n=>n.getBoundingClientRect()),row=floor-headerBottom<110;const put=(n,x,y)=>{n.style.setProperty('left',Math.round(x)+'px','important');n.style.setProperty('right','auto','important');n.style.setProperty('top',Math.round(y)+'px','important');n.style.setProperty('bottom','auto','important');n.style.setProperty('position','fixed','important');};const clamp=(x,w)=>Math.max(left+12,Math.min(left+W-w-12,x));if(row){controls.forEach((n,i)=>{const b=n.getBoundingClientRect();put(n,clamp(left+12+i*(W-b.width-24)/2,b.width),Math.max(headerBottom,floor-b.height));});}else{const a=chat.getBoundingClientRect(),b=back.getBoundingClientRect(),c=wa.getBoundingClientRect();put(chat,left+12,floor-a.height);put(back,left+W-b.width-12,floor-b.height);put(wa,left+W-c.width-12,floor-b.height-c.height-10);}
const room=floor-headerBottom-74;root.style.setProperty('--float-panel-bottom',Math.max(8,innerHeight-floor+66)+'px');root.style.setProperty('--float-panel-height',Math.max(120,Math.min(560,room))+'px');root.style.setProperty('--float-header',headerBottom+'px');body.classList.toggle('float-chat-expanded',room<200);}
const ro='ResizeObserver'in window?new ResizeObserver(schedule):null;[...controls,header,dock,banner].filter(Boolean).forEach(n=>ro?.observe(n));new MutationObserver(schedule).observe(body,{attributes:true,attributeFilter:['data-order-dock']});new MutationObserver(schedule).observe(root,{attributes:true,attributeFilter:['data-consent-open']});[dock,banner].filter(Boolean).forEach(n=>new MutationObserver(schedule).observe(n,{attributes:true,attributeFilter:['hidden']}));window.addEventListener('resize',schedule,{passive:true});window.visualViewport?.addEventListener('resize',schedule,{passive:true});window.visualViewport?.addEventListener('scroll',schedule,{passive:true});document.fonts?.ready.then(schedule);schedule();})();

/* V3 mobile action dock: one compact toggle instead of three permanent overlays. */
(()=>{'use strict';
const controls=['.chat-float','.wa-float','.back-float'].map(s=>document.querySelector(s));
if(controls.some(n=>!n))return;
const body=document.body,head=document.querySelector('.global-header'),dock=document.querySelector('[data-sales-dock]'),consent=document.querySelector('[data-consent-banner]');
const toggle=document.createElement('button');
toggle.type='button';toggle.className='v3-floating-toggle';toggle.setAttribute('aria-label','Ouvrir les actions rapides');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','v3-floating-description');
toggle.innerHTML='<span aria-hidden="true">⋯</span><span class="v3-toggle-label">Actions</span>';
const description=document.createElement('span');description.id='v3-floating-description';description.className='v3-sr-only';description.textContent='Accès au chatbot, à WhatsApp et au retour en haut';
body.append(toggle,description);
let open=false,queued=false;
const isShown=el=>el&&!el.hidden&&getComputedStyle(el).display!=='none'&&el.getBoundingClientRect().height>0;
function layout(){
const vw=innerWidth,mobile=vw<=700;
toggle.hidden=!mobile;body.classList.toggle('v3-floating-mobile',mobile);
if(!mobile){open=false;body.classList.remove('v3-actions-open','v3-actions-closed');controls.forEach(el=>el.inert=false);return}
const vh=window.visualViewport?.height||innerHeight;
const offTop=window.visualViewport?.offsetTop||0;
const floor=Math.min(offTop+vh-12,...[dock,consent].filter(isShown).map(el=>el.getBoundingClientRect().top-10));
const headerBottom=(head?.getBoundingClientRect().bottom||0)+14;
const y=Math.max(headerBottom,Math.min(floor-51,offTop+vh-65));
toggle.style.top=Math.round(y)+'px';
if(open){toggle.style.right='auto';toggle.style.left='calc(50% - 24px)'}
else{toggle.style.left='auto';toggle.style.right='max(12px,env(safe-area-inset-right))'}
body.classList.toggle('v3-actions-open',open);body.classList.toggle('v3-actions-closed',!open);
toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fermer les actions rapides':'Ouvrir les actions rapides');
toggle.querySelector('.v3-toggle-label').textContent=open?'Fermer':'Actions';
controls.forEach(el=>el.inert=!open);
}
function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;layout()})}
toggle.addEventListener('click',()=>{open=!open;schedule()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&open){open=false;schedule();toggle.focus()}});
controls.forEach(el=>el.addEventListener('click',()=>{if(open){open=false;schedule()}}));
window.addEventListener('resize',schedule,{passive:true});
window.visualViewport?.addEventListener('resize',schedule,{passive:true});
window.visualViewport?.addEventListener('scroll',schedule,{passive:true});
window.addEventListener('scroll',schedule,{passive:true});
const observer=new MutationObserver(schedule);
[dock,consent].filter(Boolean).forEach(el=>observer.observe(el,{attributes:true,attributeFilter:['hidden','style','class']}));
schedule();
})();
