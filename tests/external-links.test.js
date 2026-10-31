/* Liens externes et protection des enfants (31/10/2026).
   Politique : dans l'espace enfant, AUCUN lien cliquable ne sort de l'app (crédits et sources restent affichés en texte,
   l'attribution des licences est conservée) ; les liens externes utiles (sources officielles du programme, lien de suivi)
   ne sont cliquables que dans l'espace parents. Une garde globale bloque tout lien ou window.open externe ajouté plus tard
   hors espace parents. Audit statique : chaque domaine présent dans le code est classé ; un domaine nouveau fait échouer. */
const fs=require('fs'),path=require('path');
const {ROOT,serve,launchEngine,seedProfile}=require('./lib');

// Classement exhaustif des domaines trouvés dans le code de l'app (js/, data/, index.html, parent.html, *.css).
const HOSTS={
 'commons.wikimedia.org':'credit','www.metmuseum.org':'credit','images.nasa.gov':'credit','hdl.loc.gov':'credit','muzyczny.pl':'credit','www.photography.mattfield.com':'credit',
 'fr.vikidia.org':'credit',
 'www.education.gouv.fr':'parent-source','eduscol.education.gouv.fr':'parent-source',
 // Éducation aux médias : fausses adresses d'hameçonnage et vrais sites cités comme exemples, en TEXTE uniquement.
 'laposte.fr.suivi-colis.top':'pedagogic-text','impots-gouv.remboursement-fr.com':'pedagogic-text','education-gouv.bourse-aide.net':'pedagogic-text','colis-livraison-fr.top':'pedagogic-text','ameli-securite.info':'pedagogic-text','www.laposte.fr':'pedagogic-text','www.impots.gouv.fr':'pedagogic-text','www.ameli.fr':'pedagogic-text',
 'sebastienmuller90.github.io':'parent-remote-link','www.w3.org':'xml-namespace','localhost':'internal'};
function sources(){const out=[];const walk=d=>{for(const e of fs.readdirSync(path.join(ROOT,d),{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())walk(p);else if(/\.(js|html|css)$/.test(e.name))out.push(p);}};
 walk('js');walk('data');for(const f of ['index.html','parent.html'])out.push(f);for(const f of fs.readdirSync(ROOT))if(/\.css$/.test(f))out.push(f);return out.map(f=>f.split(path.sep).join('/'));}

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 // ===== 1. Audit statique
 const files=sources();const hosts={},rawBlank=[],rawOpen=[],hrefText=[];
 for(const f of files){const s=fs.readFileSync(path.join(ROOT,f),'utf8');
  for(const m of s.matchAll(/https?:\/\/([a-z0-9.-]+\.[a-z]{2,}|localhost)(?=[\/:"'`\s)<]|$)/gi)){const h=m[1].toLowerCase();(hosts[h]=hosts[h]||new Set()).add(f);}
  if(f!=='js/link-policy.js'&&f!=='parent.html'&&/target=\\?["']_blank/.test(s))rawBlank.push(f);
  if(f!=='js/link-policy.js'&&/window\.open\(/.test(s))rawOpen.push(f);
  for(const m of s.matchAll(/href=["'](https?:\/\/[^"']+)["']/gi))hrefText.push(f+' → '+m[1]);}
 const unknown=Object.keys(hosts).filter(h=>!HOSTS[h]);
 T('Chaque domaine présent dans le code est classé (un nouveau domaine doit être classé avant publication)',!unknown.length,unknown.map(h=>h+' ('+[...hosts[h]].join(',')+')').join(' | '));
 T('Aucun target="_blank" écrit à la main dans l’app : tout lien externe passe par MQLinks (js/link-policy.js)',!rawBlank.length,rawBlank.join(', '));
 T('Aucun window.open hors de la politique de liens',!rawOpen.length,rawOpen.join(', '));
 T('Aucun lien externe codé en dur dans un href (les adresses pédagogiques restent du texte)',!hrefText.length,hrefText.slice(0,5).join(' | '));

 // ===== 2. Comportement réel
 const {srv,url}=await serve();const b=await launchEngine('chromium');
 try{const ctx=await b.newContext({viewport:{width:412,height:915}});await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));let popups=0;ctx.on('page',()=>popups++);
  const outside=[];p.on('request',r=>{if(!r.url().startsWith(url)&&!/^data:|^blob:/.test(r.url()))outside.push(r.url());});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.reload({waitUntil:'load'});await seedProfile(p,'Lou','CM2');
  const ext=()=>p.evaluate(()=>[...document.querySelectorAll('#app a[href]')].map(a=>a.getAttribute('href')).filter(h=>/^https?:/i.test(h)&&!h.startsWith(location.origin)));
  // Atlas (espace enfant)
  await p.evaluate(()=>ACT.atlas());await p.waitForTimeout(200);
  const opened=await p.evaluate(()=>{const b=document.querySelector('#app [data-a^="atlpays:"]');if(!b)return null;ACT.atlpays(b.dataset.a.slice(8));return b.dataset.a;});
  await p.waitForTimeout(200);
  const atlasExt=await ext(),atlasTxt=await p.evaluate(()=>document.getElementById('app').innerText);
  T('Atlas (espace enfant) : aucun lien cliquable vers l’extérieur, crédit Vikidia affiché en texte (licence respectée)',opened&&!atlasExt.length&&/Vikidia/.test(atlasTxt)&&/vikidia\.org/i.test(atlasTxt),JSON.stringify({opened,atlasExt}));
  // Crédits des images (espace enfant)
  await p.evaluate(()=>ACT.credits());await p.waitForTimeout(200);
  const credExt=await ext(),credTxt=await p.evaluate(()=>document.getElementById('app').innerText);
  T('Crédits des images (espace enfant) : sources en texte (domaine visible), aucun lien externe cliquable',!credExt.length&&/commons\.wikimedia\.org/.test(credTxt),credExt.slice(0,3).join(' | '));
  // Garde globale : un lien externe injecté hors espace parents ne s'ouvre pas.
  const guard=await p.evaluate(()=>{PARENT=false;const a=document.createElement('a');a.href='https://example.org/';a.target='_blank';a.textContent='x';document.getElementById('app').appendChild(a);
   const ev=new MouseEvent('click',{bubbles:true,cancelable:true});a.dispatchEvent(ev);const w=window.open('https://example.org/','_blank');return {prevented:ev.defaultPrevented,win:w===null};});
  await p.waitForTimeout(300);
  T('Garde globale (espace enfant) : clic sur un lien externe bloqué, window.open externe refusé, aucune fenêtre ouverte',guard.prevented&&guard.win&&popups===0,JSON.stringify({guard,popups}));
  const intern=await p.evaluate(()=>{PARENT=false;const a=document.createElement('a');a.href='#x';document.getElementById('app').appendChild(a);const ev=new MouseEvent('click',{bubbles:true,cancelable:true});a.dispatchEvent(ev);return ev.defaultPrevented;});
  T('Les liens internes ne sont pas affectés',intern===false);
  // Espace parents : sources officielles du programme cliquables, ouvertes proprement.
  await p.evaluate(()=>{PARENT=true;parentScreen('programme');});await p.waitForTimeout(200);
  const prog=await p.evaluate(()=>[...document.querySelectorAll('#app a.program-src')].map(a=>({h:a.getAttribute('href'),t:a.target,r:a.rel})));
  T('Espace parents : sources officielles (education.gouv.fr / Éduscol) cliquables, nouvel onglet, rel="noopener noreferrer"',prog.length>0&&prog.every(x=>/^https:\/\/(www\.education\.gouv\.fr|eduscol\.education\.gouv\.fr)\//.test(x.h)&&x.t==='_blank'&&/noopener/.test(x.r)&&/noreferrer/.test(x.r)),JSON.stringify(prog.slice(0,3)));
  const parentClick=await p.evaluate(()=>{const before=window.__mqLinkBlocked||0;const a=document.querySelector('#app a.program-src');const ev=new MouseEvent('click',{bubbles:true,cancelable:true});a.addEventListener('click',e=>e.preventDefault(),{once:true});a.dispatchEvent(ev);return (window.__mqLinkBlocked||0)-before;});
  T('Espace parents : la garde laisse passer les liens externes',parentClick===0,String(parentClick));
  await p.evaluate(()=>{PARENT=false;ACT.home();});
  T('Aucune requête vers l’extérieur pendant la navigation',!outside.length,outside.slice(0,5).join(' | '));
  T('Aucune erreur JavaScript',!errs.length,errs.join(' | '));
  await ctx.close();
 }finally{await b.close();srv.close();}
 return R;}
require('./lib').main(run);
