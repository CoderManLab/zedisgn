(()=>{
  const WA='https://wa.me/33614620757';
  const menuBtn=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.nav');
  if(menuBtn&&nav){menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});}
  document.querySelectorAll('[data-back]').forEach(btn=>btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'})));

  const panel=document.querySelector('[data-chat-panel]');
  const body=document.querySelector('[data-chat-body]');
  const openBtn=document.querySelector('[data-chat-open]');
  const closeBtn=document.querySelector('[data-chat-close]');
  const openChat=()=>{if(panel){panel.hidden=false;setTimeout(()=>panel.querySelector('button,textarea')?.focus(),30);}};
  const closeChat=()=>{if(panel)panel.hidden=true;};
  openBtn?.addEventListener('click',openChat);closeBtn?.addEventListener('click',closeChat);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeChat();});

  let selected='';
  function addMsg(text, cls='bot-msg'){
    if(!body)return;
    const d=document.createElement('div');d.className=cls;d.textContent=text;body.appendChild(d);body.scrollTop=body.scrollHeight;return d;
  }
  function askDetails(){
    const wrap=document.createElement('div');wrap.className='chat-input-wrap';
    wrap.innerHTML='<textarea placeholder="Décrivez en quelques lignes votre besoin, votre activité et vos objectifs."></textarea><button type="button" class="chat-send">Préparer le message WhatsApp</button>';
    body.appendChild(wrap);body.scrollTop=body.scrollHeight;
    const ta=wrap.querySelector('textarea');ta.focus();
    wrap.querySelector('button').addEventListener('click',()=>{
      const details=ta.value.trim();
      if(!details){ta.focus();return;}
      addMsg(details,'user-msg');wrap.remove();
      addMsg('Votre demande est prête. Elle ne sera envoyée que lorsque vous ouvrirez WhatsApp.');
      const link=document.createElement('a');link.className='btn primary full';link.target='_blank';link.rel='noopener';
      link.href=WA+'?text='+encodeURIComponent(`Bonjour ZEDESIGN,\n\nJe souhaite discuter d’un projet : ${selected}.\n\nMon besoin : ${details}\n\nMerci.`);
      link.textContent='Continuer sur WhatsApp';body.appendChild(link);body.scrollTop=body.scrollHeight;
    });
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-chat-service]');if(!b)return;
    selected=b.dataset.chatService;addMsg(selected,'user-msg');
    body.querySelector('.chat-choices')?.remove();
    addMsg('Décrivez maintenant votre besoin. Je préparerai un message clair à envoyer sur WhatsApp.');askDetails();
  });

  const form=document.querySelector('[data-contact-form]');
  form?.addEventListener('submit',e=>{
    e.preventDefault();
    const fd=new FormData(form);const service=String(fd.get('service')||'').trim();const details=String(fd.get('details')||'').trim();const deadline=String(fd.get('deadline')||'').trim();
    if(!service||!details)return;
    const text=`Bonjour ZEDESIGN,\n\nJe souhaite discuter d’un projet : ${service}.\n\nMon besoin : ${details}${deadline?`\n\nÉchéance souhaitée : ${deadline}`:''}\n\nMerci.`;
    window.open(WA+'?text='+encodeURIComponent(text),'_blank','noopener');
  });
})();

