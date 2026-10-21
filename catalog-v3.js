/* ZEDESIGN V3: progressive enhancement for accessible catalogue and sharing. */
(()=>{'use strict';
document.querySelectorAll('.v3-catalog').forEach(root=>{
 const cards=Array.from(root.querySelectorAll('details.v3-module'));
 const filters=Array.from(root.querySelectorAll('[data-v3-filter]'));
 const setFilter=group=>{filters.forEach(b=>{const active=b.dataset.v3Filter===group;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active))});cards.forEach(c=>{const show=group==='Tous'||c.dataset.v3Group===group;c.hidden=!show;if(!show)c.open=false})};
 filters.forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.v3Filter)));
 root.querySelector('[data-v3-expand]')?.addEventListener('click',()=>cards.filter(c=>!c.hidden).forEach(c=>c.open=true));
 root.querySelector('[data-v3-collapse]')?.addEventListener('click',()=>cards.forEach(c=>c.open=false));
});
document.querySelectorAll('[data-v3-share]').forEach(root=>{
 const btn=root.querySelector('.v3-share-btn'),menu=root.querySelector('.v3-share-menu'),live=root.querySelector('.v3-share-live');
 const url=window.location.href.split('#')[0],title=document.title;
 const close=()=>{menu.hidden=true;btn.setAttribute('aria-expanded','false')};
 const links={whatsapp:'https://wa.me/?text='+encodeURIComponent(title+' '+url),facebook:'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url),x:'https://twitter.com/intent/tweet?text='+encodeURIComponent(title)+'&url='+encodeURIComponent(url),linkedin:'https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(url)};
 Object.entries(links).forEach(([name,href])=>{const a=menu.querySelector('[data-v3-target="'+name+'"]');if(a)a.href=href});
 btn.addEventListener('click',async()=>{
   if(navigator.share){try{await navigator.share({title,text:title,url});close();return}catch(e){if(e.name==='AbortError')return}}
   menu.hidden=!menu.hidden;btn.setAttribute('aria-expanded',String(!menu.hidden));if(!menu.hidden)menu.querySelector('button')?.focus();
 });
 menu.querySelector('[data-v3-copy]')?.addEventListener('click',async()=>{
   try{if(!navigator.clipboard?.writeText)throw new Error('clipboard not available');await navigator.clipboard.writeText(url);live.textContent='Lien copié';close()}
   catch(e){window.prompt('Copier le lien :',url);live.textContent='Lien à copier';close()}
 });
 document.addEventListener('click',e=>{if(!root.contains(e.target))close()});
 root.addEventListener('keydown',e=>{if(e.key==='Escape'){close();btn.focus()}});
});
})();
