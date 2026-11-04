/* S-05 — la politique de confidentialité publique doit déclarer EXACTEMENT les données personnelles que l'application stocke
   localement (prénom, genre, date de naissance, compagnon…). Test statique (aucun navigateur) : on lit le code qui écrit ces données,
   puis on vérifie qu'elles figurent dans la table « Données utilisées localement » de la page publique et du brouillon Markdown,
   que les deux textes portent la même date de mise à jour, et que le texte de sécurité ne survend pas le code parent. */
const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');
const read=f=>fs.readFileSync(path.join(ROOT,f),'utf8');

async function run(){
 const R=[];const T=(name,ok,detail='')=>R.push({name,ok:!!ok,detail:String(detail)});
 const htmlFile=process.env.POLICY_HTML||'docs/google-play/privacy-policy-public.html';
 const html=process.env.POLICY_HTML?fs.readFileSync(process.env.POLICY_HTML,'utf8'):read(htmlFile);
 const md=read('docs/google-play/privacy-policy-draft.md');
 const state=read('js/app-state.js'),onboard=read('js/modern-profile-onboarding.js');
 const sec3=(html.split(/<h2>3\./)[1]||'').split(/<h2>4\./)[0];
 const plain=sec3.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').toLowerCase();
 const mdSec=(md.split('### 3.')[1]||'').split('### 4.')[0].toLowerCase();

 // Données personnelles réellement écrites par le code.
 const stored={
  name:/S\.name=W\.name\.trim\(\)/.test(onboard)&&/name:''/.test(state),
  gender:/S\.gender=W\.gender/.test(onboard),
  birthdate:/S\.birthdate=/.test(onboard)&&/birthdate:''/.test(state),
  companion:/S\.companion=W\.companion/.test(onboard)
 };
 T('Le code stocke bien prénom, genre, date de naissance et compagnon (hypothèse du test vérifiée dans le code)',Object.values(stored).every(Boolean),JSON.stringify(stored));
 const need=[['prénom',/prénom/],['genre',/genre/],['date de naissance',/date de naissance/],['compagnon',/compagnon/]];
 for(const [label,re] of need)T('Politique publique, §3 : la donnée « '+label+' » est déclarée',re.test(plain));
 T('Politique publique : la date de naissance est indiquée comme facultative',/date de naissance \(facultative\)/.test(plain));
 for(const [label,re] of need)T('Brouillon Markdown, §3 : la donnée « '+label+' » est déclarée',re.test(mdSec));
 const dHtml=(html.match(/Dernière mise à jour : ([^<]+)</)||[])[1],dMd=(md.match(/Dernière mise à jour : \*\*([^*]+)\*\*/)||[])[1];
 T('La date de mise à jour de la politique est le 4 novembre 2026 et identique dans la page publique et le brouillon',dHtml==='4 novembre 2026'&&dMd===dHtml,dHtml+' / '+dMd);
 const sec7=(html.split(/<h2>7\./)[1]||'').split(/<h2>8\./)[0].replace(/<[^>]+>/g,' ');
 T('Sécurité : le code parent est présenté comme une barrière d’usage, pas comme un secret fort ni un chiffrement',/barrière d'usage/.test(sec7)&&!/chiffrement|chiffré/i.test(sec7),sec7.trim().slice(0,160));
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
