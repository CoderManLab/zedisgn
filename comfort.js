(()=>{
const root=document.documentElement,media=matchMedia('(prefers-reduced-motion: reduce)');
let choice=null;const allowed=()=>window.zedConsent?.allowsPreferences()===true;try{if(allowed()){const saved=localStorage.getItem('zedesign-motion');if(['reduced','full'].includes(saved))choice=saved}else localStorage.removeItem('zedesign-motion')}catch{}
const button=document.querySelector('[data-motion-toggle]');
function apply(){const reduced=choice===null?media.matches:choice==='reduced';root.dataset.motion=reduced?'reduced':'full';if(button){button.setAttribute('aria-pressed',String(reduced));button.textContent=reduced?'Réactiver les animations':'Réduire les animations'}document.dispatchEvent(new Event('zedesign-motion-change'))}
button?.addEventListener('click',()=>{choice=root.dataset.motion==='reduced'?'full':'reduced';try{if(allowed())localStorage.setItem('zedesign-motion',choice)}catch{}apply()});
document.addEventListener('zedesign-consent-change',()=>{try{if(!allowed())localStorage.removeItem('zedesign-motion');else if(choice!==null)localStorage.setItem('zedesign-motion',choice)}catch{}});
media.addEventListener('change',()=>{if(choice===null)apply()});
function visibility(){root.toggleAttribute('data-tab-hidden',document.hidden)}
document.addEventListener('visibilitychange',visibility);visibility();apply();
})();