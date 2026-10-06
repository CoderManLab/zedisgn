(()=>{
  const WA='https://wa.me/33614620757';
  const menuBtn=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.nav');
  if(menuBtn&&nav){menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});}
  document.querySelectorAll('[data-back]').forEach(btn=>btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'})));

  const form=document.querySelector('[data-contact-form]');
  form?.addEventListener('submit',e=>{
    e.preventDefault();
    const fd=new FormData(form);const service=String(fd.get('service')||'').trim();const details=String(fd.get('details')||'').trim();const deadline=String(fd.get('deadline')||'').trim();
    if(!service||!details)return;
    const text=`Bonjour ZEDESIGN,\n\nJe souhaite discuter d’un projet : ${service}.\n\nMon besoin : ${details}${deadline?`\n\nÉchéance souhaitée : ${deadline}`:''}\n\nMerci.`;
    window.open(WA+'?text='+encodeURIComponent(text),'_blank','noopener');
  });
})();

