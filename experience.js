(()=>{
 const scene=document.querySelector('.studio-scene');
 if(!scene)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const choices={
  web:{heading:['Une idée.','Tout un univers.'],card:['De l’idée','à l’expérience.'],title:'Mon projet',caption:'Votre univers digital.',work:'Du concept au produit',flow:['Idée','Design','Produit'],metrics:[['WEB','Sur mesure'],['APP','Mobile first'],['DESIGN','Identité']],notice:'Votre univers prend vie',detail:'Design · Web · Mobile',action:'Créons votre projet',summary:'Web : des pages structurées, une navigation claire et un parcours de contact.'},
  mobile:{heading:['Un geste.','Une expérience.'],card:['Votre produit','à portée de main.'],title:'Mon application',caption:'Pensé pour le tactile.',work:'Du parcours au prototype',flow:['Usage','Écran','Interaction'],metrics:[['ÉCRANS','Parcours'],['APP','Tactile'],['UX','Lisibilité']],notice:'Chaque geste a sa place',detail:'Parcours · Interface · Mobile',action:'Imaginons votre app',summary:'Mobile : une interface tactile, des parcours simples et des actions accessibles.'},
  identity:{heading:['Une signature.','Une marque forte.'],card:['Votre marque','prend sa place.'],title:'Mon identité',caption:'Un univers reconnaissable.',work:'De la direction à la signature',flow:['Vision','Identité','Supports'],metrics:[['LOGO','Signature'],['COULEURS','Univers'],['DESIGN','Supports']],notice:'Une identité cohérente',detail:'Logo · Couleurs · Supports',action:'Créons votre identité',summary:'Identité : une signature, des couleurs et des supports cohérents autour de votre marque.'}
 };
 const buttons=[...document.querySelectorAll('[data-demo-choice]')];
 let timer;
 const select=key=>{
  const c=choices[key];if(!c)return;
  scene.dataset.demo=key;
  const heading=scene.querySelector('.scene-heading');heading.replaceChildren(document.createTextNode(c.heading[0]),document.createElement('br'));const strong=document.createElement('strong');strong.textContent=c.heading[1];heading.append(strong);
  const card=scene.querySelector('.scene-phone-card strong');card.replaceChildren(document.createTextNode(c.card[0]),document.createElement('br'),document.createTextNode(c.card[1]));
  [['.scene-card-title',c.title],['.scene-phone-caption',c.caption],['.scene-work>span',c.work],['.scene-phone-action',c.action]].forEach(([selector,text])=>scene.querySelector(selector).textContent=text);
  scene.querySelectorAll('.scene-flow>span').forEach((e,i)=>e.textContent=c.flow[i]);
  scene.querySelectorAll('.metric-row>span').forEach((e,i)=>{const small=document.createElement('small');small.textContent=c.metrics[i][1];e.replaceChildren(document.createTextNode(c.metrics[i][0]),small)});
  const notice=scene.querySelector('.scene-phone-notice>span');const small=document.createElement('small');small.textContent=c.detail;notice.replaceChildren(document.createTextNode(c.notice),small);
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.demoChoice===key)));
  document.querySelector('[data-demo-status]').textContent=c.summary;
  clearTimeout(timer);scene.classList.remove('demo-changing');requestAnimationFrame(()=>{if(!reduced.matches)scene.classList.add('demo-changing')});timer=setTimeout(()=>scene.classList.remove('demo-changing'),550);
 };
 buttons.forEach(b=>b.addEventListener('click',()=>select(b.dataset.demoChoice)));
 let visible=true;
 const pause=()=>scene.classList.toggle('demo-paused',!visible||document.hidden||reduced.matches);
 if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;pause()},{threshold:0}).observe(scene);
 document.addEventListener('visibilitychange',pause);reduced.addEventListener('change',pause);pause();
 // Match the fixed header's actual height, including font/viewport changes.
 const header=document.querySelector('.global-header');
 const syncHeader=()=>{if(getComputedStyle(header).position==='fixed')document.body.style.paddingTop=header.getBoundingClientRect().height+'px'};
 if('ResizeObserver'in window)new ResizeObserver(syncHeader).observe(header);syncHeader();
})();
