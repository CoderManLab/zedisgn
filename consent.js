/* First-party preference choice. No analytics, advertising or third-party calls. */
(()=>{'use strict';const KEY='zedesign-consent-v1',VERSION=1,root=document.documentElement,banner=document.querySelector('[data-consent-banner]'),status=document.querySelector('[data-consent-status]');if(!banner)return;let current=null,opener=null;const valid=x=>x&&x.version===VERSION&&['accepted','refused'].includes(x.choice)&&Number.isFinite(x.expires)&&x.expires>Date.now()&&x.expires<=Date.now()+187*86400000;function read(){try{const x=JSON.parse(localStorage.getItem(KEY)||'null');return valid(x)?x:null}catch{return null}}current=read();
function announce(){root.dataset.preferenceConsent=current?.choice||'pending';document.dispatchEvent(new CustomEvent('zedesign-consent-change',{detail:{preferences:current?.choice==='accepted'}}))}
function measure(){root.style.setProperty('--consent-height',banner.hidden?'0px':Math.ceil(banner.getBoundingClientRect().height)+'px')}
function show(trigger){opener=trigger||null;banner.hidden=false;root.setAttribute('data-consent-open','');measure();if(trigger)banner.querySelector('[data-consent-choice]')?.focus()}
function hide(){banner.hidden=true;root.removeAttribute('data-consent-open');measure();if(opener?.isConnected)opener.focus();opener=null}
function choose(choice){const expires=new Date();expires.setMonth(expires.getMonth()+6);current={version:VERSION,choice,expires:expires.getTime()};let saved=true;try{localStorage.setItem(KEY,JSON.stringify(current))}catch{saved=false}announce();hide();if(status)status.textContent=(choice==='accepted'?'Préférences acceptées.':'Préférences refusées.')+(saved?' Vous pouvez modifier ce choix depuis le pied de page.':' Choix appliqué pour cette page ; le navigateur empêche sa mémorisation.')}
Object.defineProperty(window,'zedConsent',{value:Object.freeze({allowsPreferences:()=>valid(current)&&current.choice==='accepted'}),writable:false,configurable:false});
banner.querySelectorAll('[data-consent-choice]').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.consentChoice)));
document.querySelectorAll('[data-consent-open]').forEach(b=>{b.hidden=false;b.addEventListener('click',()=>show(b))});
banner.addEventListener('keydown',e=>{if(e.key==='Escape'&&valid(current)){e.preventDefault();hide()}});
window.addEventListener('storage',e=>{if(e.key!==KEY&&e.key!==null)return;current=read();announce();if(current)hide();else show()});
window.addEventListener('pageshow',()=>{if(current&&!valid(current)){current=null;announce();show()}});
if('ResizeObserver'in window)new ResizeObserver(measure).observe(banner);window.addEventListener('resize',measure,{passive:true});announce();if(!current)show();
})();
