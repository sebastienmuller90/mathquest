/* Pools de questions CP et CE1 (toutes matières) : 600 tirages par chapitre dans le vrai moteur.
   Vérifie : aucune erreur de générateur, aucun doublon de choix, bonne réponse présente une seule fois,
   position de la bonne réponse non dégénérée, remises en ordre jamais présentées dans l'ordre, nombre minimal
   d'énoncés distincts (chapitres enrichis par la vague 2), questions « Entends-tu… » toujours accompagnées d'un audio,
   et absence d'élisions ou d'espacements fautifs dans les énoncés et les choix. */
const {serve,launch,seedProfile}=require('./lib');

// Chapitres élargis par la vague 2 : au moins 22 énoncés distincts sur 600 tirages (14 à 25 avant).
const TARGET=[
 'cp-fr-mots-outils','cp-fr-phrase','ce1-fr-graphemes','ce1-fr-s-z','ce1-fr-lettres-muettes',
 'cp-ma-masses','cp-ma-heure','cp-ma-longueurs','cp-ma-figures','ce1-ma-fractions','cp-hg-quartier','ce1-en-school',
 'cp-eps-eau-securite','cp-eps-jeux-collectifs','ce1-eps-orientation','ce1-eps-gym','ce1-eps-opposition',
 'cp-evar-famille','cp-evar-corps','cp-evar-emotions','ce1-evar-grandir','ce1-evar-relations','ce1-evar-stereotypes',
 'cp-ap-oeuvres','cp-ap-outils-traces','cp-ap-couleurs','ce1-ap-chaud-froid','ce1-ap-lignes-formes','ce1-ap-genres',
 'cp-mu-instruments','cp-mu-rythme','cp-mu-sons','ce1-mu-chanter','ce1-mu-parametres','ce1-mu-oeuvres'];
// Dictées : la phrase dictée change, pas l'énoncé (hors périmètre de cette vague).
const DICTEES=['cp-fr-dictee','ce1-fr-dictee'];

async function run(){
  const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d)});
  const {srv,url}=await serve();const b=await launch();const p=await b.newPage();
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Lecteur','CE1');await p.waitForTimeout(150);

  const res=await p.evaluate(({TARGET,DICTEES})=>{
    const clean=s=>String(s==null?'':s).replace(/<[^>]*>/g,' ').split(' ').filter(Boolean).join(' ');
    const out={chapters:[],totalDraws:0};
    for(const ch of Object.values(CHMAP)){
      const w=WMAP[ch.id];if(!w||(w.lvl!=='CP'&&w.lvl!=='CE1'))continue;
      const c={id:ch.id,prompts:new Set(),err:0,errMsg:'',dupChoices:[],badAns:[],pos:[0,0,0,0],n3:0,two:[0,0],orderSame:0,orders:0,audioMissing:[],style:[]};
      for(let i=0;i<600;i++){
        let q;try{q=ch.g(1+i%3);}catch(e){c.err++;c.errMsg=String(e&&e.message||e).slice(0,80);continue;}
        out.totalDraws++;
        const pr=clean(q.q);c.prompts.add(pr);
        if(q.type==='choice'&&Array.isArray(q.choices)){
          const cs=q.choices.map(clean);
          if(new Set(cs).size!==cs.length)c.dupChoices.push(pr.slice(0,60));
          if(!(Number.isInteger(q.ans)&&q.ans>=0&&q.ans<cs.length))c.badAns.push(pr.slice(0,60));
          if(cs.length>=3){c.n3++;c.pos[Math.min(q.ans,3)]++;}else if(cs.length===2)c.two[q.ans]++;
        }
        if(q.type==='order'){c.orders++;if(q.tokens.join(' ')===q.ans)c.orderSame++;}
        if(/entends-tu|quel son entends|🎧/i.test(pr)&&!q.audio)c.audioMissing.push(pr.slice(0,60));
        const raws=[q.q,q.expl].concat(q.choices||[]).map(x=>String(x==null?'':x));
        const txt=raws.map(clean).join(' | ');
        const el=txt.replace(/\b(le|la) (ou|oui|onze)\b/gi,'').match(/(?<![\p{L}’'])(le|la|de|ne|se|que|je|me|te|ce) [aeiouéèêàâîôù]\p{L}*|\bsi (il|ils)\b/iu);
        if(el)c.style.push('élision? « '+el[0]+' » dans '+txt.slice(0,60));
        if(raws.some(r=>/ ,|\( /.test(r.replace(/<[^>]*>/g,''))))c.style.push('espacement? '+txt.slice(0,70));
      }
      c.uniq=c.prompts.size;delete c.prompts;out.chapters.push(c);
    }
    return out;
  },{TARGET,DICTEES});

  const by=Object.fromEntries(res.chapters.map(c=>[c.id,c]));
  const cp=res.chapters.filter(c=>c.id.startsWith('cp-')).length,ce1=res.chapters.filter(c=>c.id.startsWith('ce1-')).length;
  T('Tous les chapitres CP et CE1 sont mesurés (au moins 70 chacun)',cp>=70&&ce1>=70,cp+' CP / '+ce1+' CE1, '+res.totalDraws+' tirages');
  const errC=res.chapters.filter(c=>c.err);
  T('0 erreur de générateur sur 600 tirages par chapitre',!errC.length,errC.slice(0,4).map(c=>c.id+' ('+c.err+', '+c.errMsg+')').join(' ; '));
  const dup=res.chapters.filter(c=>c.dupChoices.length);
  T('Aucun doublon dans les choix d’une même question',!dup.length,dup.slice(0,4).map(c=>c.id+' : '+c.dupChoices[0]).join(' ; '));
  const ba=res.chapters.filter(c=>c.badAns.length);
  T('Indice de la bonne réponse toujours valide',!ba.length,ba.slice(0,4).map(c=>c.id).join(','));

  // Position de la bonne réponse : pas de rang qui domine nettement (chapitres avec assez de QCM à 3 choix ou plus).
  const skew=[];
  res.chapters.forEach(c=>{
    if(c.n3>=60){const mx=Math.max.apply(null,c.pos.slice(0,3).concat(c.pos[3]))/c.n3;if(mx>0.5)skew.push(c.id+' '+Math.round(mx*100)+' %');}
    const t2=c.two[0]+c.two[1];if(t2>=60){const m2=Math.max(c.two[0],c.two[1])/t2;if(m2>0.7)skew.push(c.id+' (2 choix) '+Math.round(m2*100)+' %');}
  });
  T('Position de la bonne réponse non dégénérée (aucun rang au-dessus de 50 % pour 3 choix ou plus, 70 % pour 2 choix)',!skew.length,skew.slice(0,6).join(' ; '));

  // Remise en ordre : la proposition n'est (presque) jamais présentée déjà dans l'ordre (sinon l'ordre s'apprend par cœur).
  const ord=res.chapters.filter(c=>c.orders>=20&&c.orderSame/c.orders>0.35);
  T('Les remises en ordre sont mélangées (au plus 35 % présentées par hasard dans le bon ordre)',!ord.length,ord.slice(0,4).map(c=>c.id+' '+c.orderSame+'/'+c.orders).join(' ; '));

  const thin=TARGET.filter(id=>!by[id]||by[id].uniq<22);
  T('Chapitres élargis : au moins 22 énoncés distincts sur 600 tirages ('+TARGET.length+' chapitres)',!thin.length,thin.map(id=>id+':'+(by[id]&&by[id].uniq)).join(' '));
  const thinAll=res.chapters.filter(c=>!DICTEES.includes(c.id)&&c.uniq<20);
  T('Aucun autre chapitre CP/CE1 sous 20 énoncés distincts (hors dictées)',!thinAll.length,thinAll.map(c=>c.id+':'+c.uniq).join(' '));

  // Phonétique : toute question qui demande d'écouter ou d'entendre un son doit fournir un audio.
  const au=res.chapters.filter(c=>c.audioMissing.length);
  T('Les questions « Entends-tu… / Écoute… » portent toujours un audio',!au.length,au.slice(0,4).map(c=>c.id+' : '+c.audioMissing[0]).join(' ; '));

  const st=res.chapters.filter(c=>TARGET.includes(c.id)&&c.style.length);
  T('Pas d’élision manquante ni d’espacement fautif dans les chapitres élargis',!st.length,st.slice(0,4).map(c=>c.id+' : '+c.style[0]).join(' ; '));

  T('Aucune erreur JavaScript pendant les tirages',!errs.length,errs.slice(0,3).join(' | '));
  await b.close();srv.close();
  return R;
}
if(require.main===module)require('./lib').main(run);
module.exports=run;
