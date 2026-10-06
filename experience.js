(()=>{
 const scene=document.querySelector('.studio-scene');
 if(!scene)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const choices={
  web:{heading:['Une idée.','Tout un univers.'],card:['De l’idée','à l’expérience.'],title:'Mon projet',caption:'Votre univers digital.',work:'Du concept au produit',flow:['Idée','Design','Produit'],metrics:[['WEB','Sur mesure'],['APP','Mobile first'],['DESIGN','Identité']],notice:'Votre univers prend vie',detail:'Design · Web · Mobile',action:'Créons votre projet',summary:'Web : des pages structurées, une navigation claire et un parcours de contact.'},
  mobile:{heading:['Un geste.','Une expérience.'],card:['Votre produit','à portée de main.'],title:'Mon application',caption:'Pensé pour le tactile.',work:'Du parcours au prototype',flow:['Usage','Écran','Interaction'],metrics:[['ÉCRANS','Parcours'],['APP','Tactile'],['UX','Lisibilité']],notice:'Chaque geste a sa place',detail:'Parcours · Interface · Mobile',action:'Imaginons votre app',summary:'Mobile : une interface tactile, des parcours simples et des actions accessibles.'},
  identity:{heading:['Une signature.','Une marque forte.'],card:['Votre marque','prend sa place.'],title:'Mon identité',caption:'Un univers reconnaissable.',work:'De la direction à la signature',flow:['Vision','Identité','Supports'],metrics:[['LOGO','Signature'],['COULEURS','Univers'],['DESIGN','Supports']],notice:'Une identité cohérente',detail:'Logo · Couleurs · Supports',action:'Créons votre identité',summary:'Identité : une signature, des couleurs et des supports cohérents autour de votre marque.'}
 };
 const work=scene.querySelector('.scene-work');
 const originalWork=work.innerHTML;
 const layouts={
  mobile:'<span>Un parcours, trois écrans</span><div class="universe-app-flow"><div><i></i><b>01</b><strong>Découvrir</strong><em></em><em></em><small>Explorer</small></div><div><i></i><b>02</b><strong>Choisir</strong><em></em><em></em><small>Personnaliser</small></div><div><i></i><b>03</b><strong>Créer</strong><em></em><em></em><small>Confirmer</small></div></div>',
  identity:'<span>Votre planche de marque</span><div class="universe-brand-board"><div class="universe-monogram"><span class="universe-signature">Designed By<br>Zed©</span></div><div class="universe-brand-kit"><div class="universe-palette"><i></i><i></i><i></i></div><strong>Aa</strong><small>Typographie · Couleurs · Supports</small></div></div>'
 };
 const buttons=[...document.querySelectorAll('[data-demo-choice]')];
 let timer;
 const serviceLink=document.querySelector('[data-demo-service]');
 const services={web:['service-site.html','Découvrir la création de sites'],mobile:['service-app.html','Découvrir la création d’applications'],identity:['service-branding.html','Découvrir l’identité de marque']};
 const select=key=>{
  const c=choices[key];if(!c)return;
  scene.dataset.demo=key;
  if(serviceLink){serviceLink.href=services[key][0];serviceLink.replaceChildren(document.createTextNode(services[key][1]+' '));const arrow=document.createElement('span');arrow.setAttribute('aria-hidden','true');arrow.textContent='→';serviceLink.append(arrow)}
  document.querySelector('.demo-controls').dataset.universe=key;
  work.innerHTML=key==='web'?originalWork:layouts[key];
  const tiles=scene.querySelectorAll('.scene-phone-tiles>div');
  const tileNames=key==='identity'?['Logo','Palette','Typo']:key==='mobile'?['Accueil','Parcours','Profil']:['Web','App','Design'];
  tiles.forEach((tile,i)=>tile.querySelector('span').textContent=tileNames[i]);
  const projects=scene.querySelectorAll('.scene-projects>div');
  const projectNames=key==='identity'?[['L','Logo & signature','Déclinaisons · Monogramme'],['C','Supports de marque','Carte · Affiche · Digital']]:key==='mobile'?[['UX','Parcours tactile','Découvrir · Choisir · Créer'],['UI','Composants d’application','Navigation · États · Actions']]:[['W','Site & expérience','Design · Développement'],['A','Application mobile','Interface · Interaction']];
  projects.forEach((e,i)=>{e.querySelector('i').textContent=projectNames[i][0];const small=document.createElement('small');small.textContent=projectNames[i][2];e.querySelector('span').replaceChildren(document.createTextNode(projectNames[i][1]),small)});
  scene.querySelector('.scene-nav').innerHTML=(key==='identity'?['Signature','Palette','Supports']:key==='mobile'?['Écrans','Parcours','Composants']:['Studio','Projets','Contact']).map(t=>'<span>'+t+'</span>').join('');
  const heading=scene.querySelector('.scene-heading');heading.replaceChildren(document.createTextNode(c.heading[0]),document.createElement('br'));const strong=document.createElement('strong');strong.textContent=c.heading[1];heading.append(strong);
  const card=scene.querySelector('.scene-phone-card strong');card.replaceChildren(document.createTextNode(c.card[0]),document.createElement('br'),document.createTextNode(c.card[1]));
  [['.scene-card-title',c.title],['.scene-phone-caption',c.caption],['.scene-phone-action',c.action]].forEach(([selector,text])=>scene.querySelector(selector).textContent=text);
  scene.querySelectorAll('.scene-flow>span').forEach((e,i)=>e.textContent=c.flow[i]);
  scene.querySelectorAll('.metric-row>span').forEach((e,i)=>{const small=document.createElement('small');small.textContent=c.metrics[i][1];e.replaceChildren(document.createTextNode(c.metrics[i][0]),small)});
  const notice=scene.querySelector('.scene-phone-notice>span');const small=document.createElement('small');small.textContent=c.detail;notice.replaceChildren(document.createTextNode(c.notice),small);
  scene.querySelector('.phone-mode-detail')?.remove();
  if(key!=='web'){
   const detail=document.createElement('div');detail.className='phone-mode-detail';
   detail.innerHTML=key==='identity'?'<div class="universe-palette"><i></i><i></i><i></i></div><span class="phone-type">Aa <small>Une signature cohérente</small></span>':'<div class="phone-app-list"><span><i></i>Votre espace <b>→</b></span><span><i></i>Vos projets <b>→</b></span></div>';
   scene.querySelector('.scene-phone-card').append(detail);
  }
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.demoChoice===key)));
  document.querySelector('[data-demo-status]').textContent=c.summary;
  clearTimeout(timer);scene.classList.remove('demo-changing');requestAnimationFrame(()=>{if(!reduced.matches)scene.classList.add('demo-changing')});timer=setTimeout(()=>scene.classList.remove('demo-changing'),550);
 };
 buttons.forEach((b,i)=>{
  b.addEventListener('click',()=>select(b.dataset.demoChoice));
  b.addEventListener('keydown',event=>{
   const offsets={ArrowRight:1,ArrowLeft:-1};let next;
   if(event.key in offsets)next=(i+offsets[event.key]+buttons.length)%buttons.length;
   else if(event.key==='Home')next=0;else if(event.key==='End')next=buttons.length-1;else return;
   event.preventDefault();buttons[next].focus();select(buttons[next].dataset.demoChoice);
  });
 });
 let visible=true;
 const pause=()=>scene.classList.toggle('demo-paused',!visible||document.hidden||reduced.matches);
 if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;pause()},{threshold:0}).observe(scene);
 document.addEventListener('visibilitychange',pause);reduced.addEventListener('change',pause);pause();
 // Match the fixed header's actual height, including font/viewport changes.
 const header=document.querySelector('.global-header');
 const syncHeader=()=>{if(getComputedStyle(header).position==='fixed')document.body.style.paddingTop=header.getBoundingClientRect().height+'px'};
 if('ResizeObserver'in window)new ResizeObserver(syncHeader).observe(header);syncHeader();
})();

