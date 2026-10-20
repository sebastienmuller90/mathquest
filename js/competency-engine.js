/* MathQuest — maîtrise par micro-compétences.
   Complète la maîtrise par chapitre sans invalider les anciennes sauvegardes.
   Chaque réponse est rattachée à une compétence pédagogique adaptée à la matière. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof CHMAP==='undefined')return;
const MAX_RECENT=24;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/<[^>]*>/g,' ').replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
const escLabel=s=>String(s??'').replace(/\s+/g,' ').trim().slice(0,90);
function subjectOf(cid){try{return sOf(WMAP[cid].id).id}catch(e){return 'autre';}}
function chapterName(cid){return escLabel(CHMAP[cid]?.name||'la notion');}
const TEMPLATES={
 maths:[['comprendre','Comprendre et représenter'],['calculer','Calculer / appliquer une procédure'],['raisonner','Raisonner et résoudre'],['verifier','Vérifier et justifier']],
 francais:[['identifier','Identifier la notion'],['analyser','Analyser la langue ou le texte'],['appliquer','Appliquer la règle'],['justifier','Justifier / produire']],
 anglais:[['comprendre','Comprendre'],['vocabulaire','Mobiliser le vocabulaire'],['grammaire','Construire correctement'],['produire','Produire / communiquer']],
 italien:[['comprendre','Comprendre'],['vocabulaire','Mobiliser le vocabulaire'],['grammaire','Construire correctement'],['produire','Produire / communiquer']],
 hg:[['situer','Situer dans le temps et l’espace'],['connaitre','Connaître les repères'],['expliquer','Expliquer causes et conséquences'],['document','Analyser un document']],
 emc:[['identifier','Identifier droits, règles et valeurs'],['situation','Appliquer à une situation'],['argumenter','Argumenter et justifier'],['espritcritique','Distinguer faits et opinions']],
 svt:[['connaitre','Connaître les notions scientifiques'],['observer','Observer / identifier'],['raisonner','Raisonner et formuler une hypothèse'],['appliquer','Appliquer à une situation']],
 pc:[['connaitre','Connaître les notions scientifiques'],['mesurer','Mesurer / calculer'],['raisonner','Raisonner et expliquer'],['experimenter','Interpréter une expérience']],
 tech:[['identifier','Identifier fonctions et solutions'],['procedure','Appliquer une procédure'],['concevoir','Concevoir / raisonner'],['securite','Choisir une solution sûre et adaptée']],
 pix:[['identifier','Identifier l’outil ou l’information'],['procedure','Réaliser une procédure numérique'],['espritcritique','Évaluer fiabilité et risques'],['produire','Produire / organiser']],
 ia:[['comprendre','Comprendre le fonctionnement'],['usage','Choisir un usage pertinent'],['espritcritique','Évaluer limites et fiabilité'],['responsable','Utiliser de façon responsable']],
 emi:[['identifier','Identifier source et information'],['analyser','Analyser un média'],['espritcritique','Évaluer la fiabilité'],['produire','Produire / publier responsablement']],
 musique:[['identifier','Identifier les éléments musicaux'],['ecouter','Écouter et analyser'],['connaitre','Connaître le vocabulaire'],['creer','Interpréter / créer']],
 arts:[['observer','Observer et décrire'],['analyser','Analyser une œuvre'],['contextualiser','Relier au contexte'],['creer','Expérimenter / créer']],
 hda:[['observer','Observer et identifier'],['analyser','Analyser une œuvre'],['contextualiser','Contextualiser'],['comparer','Comparer et argumenter']],
 eps:[['connaitre','Connaître règles et principes'],['agir','Choisir et réaliser une action'],['securite','Agir en sécurité'],['analyser','Analyser sa performance']],
 evars:[['comprendre','Comprendre la situation'],['respect','Respect, consentement et limites'],['choisir','Faire un choix responsable'],['argumenter','Expliquer et justifier']],
 orientation:[['connaitre','Se connaître'],['explorer','Explorer métiers et formations'],['choisir','Comparer et choisir'],['projet','Construire son projet']],
 autre:[['comprendre','Comprendre'],['appliquer','Appliquer'],['raisonner','Raisonner'],['expliquer','Expliquer']]
};
function templateFor(cid){const s=subjectOf(cid),base=TEMPLATES[s]||TEMPLATES.autre,n=chapterName(cid);return base.map(([kind,label])=>({id:`${cid}::${kind}`,cid,kind,subject:s,label:`${label} — ${n}`,short:label}));}
const PATTERNS={
 maths:{comprendre:/represent|reconn|lire|ecri|decompos|figure|fraction|schema|placer/,calculer:/calcul|effectu|operation|somme|produit|quotient|mesur|convert|developp|factor|resou/,raisonner:/probleme|combien|sachant|raison|strategie|dedui|possible|programme|situation/,verifier:/justif|preuve|vrai|faux|verif|explique|demontr/},
 francais:{identifier:/identif|reconn|quelle nature|quelle fonction|temps|mode|classe grammaticale|figure de style/,analyser:/texte|phrase|sens|effet|auteur|narrat|champ lexical|interpret|comprehension/,appliquer:/accord|conjugu|complete|transform|reecri|orthograph|ponctu/,justifier:/justif|explique|redige|ecri|produi|argument/},
 anglais:{comprendre:/compreh|meaning|tradui|ecoute|listen|read/,vocabulaire:/vocab|mot|word|lexique|comment dit/,grammaire:/grammar|grammaire|complete|conjug|tense|article|preposition|transform/,produire:/write|speak|phrase|sentence|produi|prononc/},
 italien:{comprendre:/compreh|signifi|tradui|ascolt|leggi/,vocabulaire:/vocab|mot|parola|lessico|comment dit/,grammaire:/gramma|complete|coniug|tempo|articolo|preposizione|transform/,produire:/scrivi|parla|frase|produi|prononc/},
 hg:{situer:/date|siecle|periode|carte|localis|situe|territoire|pays|continent/,connaitre:/qui|quoi|definition|repere|nomme|quel/,expliquer:/cause|consequence|pourquoi|explique|evolution|changement/,document:/document|source|carte|graphique|texte|image|tableau|analyse/},
 emc:{identifier:/droit|devoir|liberte|valeur|regle|loi|laicite|egalite/,situation:/situation|cas|que faire|comportement|exemple/,argumenter:/justif|argument|pourquoi|explique|point de vue/,espritcritique:/fait|opinion|source|fiable|information/},
 svt:{connaitre:/definition|nomme|quel|organe|cellule|espece|notion/,observer:/observe|identif|schema|document|image|microscope/,raisonner:/hypoth|explique|pourquoi|cause|consequence|dedui|raison/,appliquer:/situation|cas|prevoir|applique|experience/},
 pc:{connaitre:/definition|nomme|quel|molecule|atome|notion|unite/,mesurer:/calcul|mesur|convert|valeur|unite|vitesse|masse|volume|tension|intensite/,raisonner:/explique|pourquoi|dedui|relation|raison/,experimenter:/experience|protocole|observation|resultat|graphique|schema/}
};
function inferKind(cid,q){const skills=templateFor(cid),sid=subjectOf(cid),p=PATTERNS[sid]||{},txt=norm([q?.q,q?.hint,q?.expl,q?.type,chapterName(cid)].join(' '));let best=null,bestLen=-1;for(const [kind,re] of Object.entries(p)){const m=txt.match(re);if(m&&m[0].length>bestLen){best=kind;bestLen=m[0].length;}}if(best&&skills.some(x=>x.kind===best))return best;
 // Type de réponse comme indice secondaire.
 if(q?.type==='text'||q?.type==='order')return skills.find(x=>/produ|justif|appli|gramma|expli|raison/.test(x.kind))?.kind||skills[0].kind;
 if(q?.type==='multi')return skills.find(x=>/calcul|mesur|analy|raison|appli/.test(x.kind))?.kind||skills[1]?.kind||skills[0].kind;
 // Répartition déterministe pour ne pas concentrer tous les QCM dans une seule compétence.
 let h=2166136261;for(const c of txt){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return skills[Math.abs(h)%skills.length].kind;
}
function ensure(state){if(!state.competencies||typeof state.competencies!=='object'||Array.isArray(state.competencies))state.competencies={};return state.competencies;}
function weight(meta){const src={interrogation:1.45,'lesson-quiz':1.2,'lesson-practice':.9,lesson:1,practice:1,flash:.8}[meta?.source]||1;const d={1:.82,2:1,3:1.18}[+meta?.d||2]||1;const hint=meta?.hint?.68:1;return src*d*hint;}
function calc(e){if(!e||!e.attempts)return 0;const all=e.weight?100*e.points/e.weight:0,r=(e.recent||[]).slice(-8),rw=r.reduce((a,x)=>a+(+x.w||1),0),rp=r.reduce((a,x)=>a+(x.ok?(+x.w||1):0),0),recent=rw?100*rp/rw:all,reliability=Math.min(1,e.attempts/6),streakBoost=Math.min(5,Math.max(-5,(e.streak||0)*1.2));return Math.round(clamp((all*.42+recent*.58)*(.72+.28*reliability)+streakBoost,0,100));}
function record(state,cid,ok,meta={}){if(!CHMAP[cid])return null;const kind=meta.kind||inferKind(cid,meta.q),skill=templateFor(cid).find(x=>x.kind===kind)||templateFor(cid)[0],all=ensure(state),w=weight(meta),e=all[skill.id]||(all[skill.id]={id:skill.id,cid,kind:skill.kind,subject:skill.subject,label:skill.label,attempts:0,correct:0,points:0,weight:0,recent:[],streak:0,last:0,value:0});e.attempts++;if(ok)e.correct++;e.points+=(ok?1:0)*w;e.weight+=w;e.streak=ok?Math.max(1,(e.streak||0)+1):Math.min(-1,(e.streak||0)-1);e.last=Date.now();e.recent.push({ok:!!ok,w:+w.toFixed(3),d:+meta.d||2,s:String(meta.source||'practice').slice(0,24),t:e.last});if(e.recent.length>MAX_RECENT)e.recent.splice(0,e.recent.length-MAX_RECENT);e.value=calc(e);return {skill:{...skill},entry:e,value:e.value};}
function entry(state,id){return state?.competencies?.[id]||null;}
function skillState(state,skill){const e=entry(state,skill.id);return {skill,...(e||{}),attempts:e?.attempts||0,value:e?.value||0};}
function chapterSkills(state,cid){return templateFor(cid).map(s=>skillState(state,s));}
function chapterMastery(state,cid){const rows=chapterSkills(state,cid),used=rows.filter(x=>x.attempts>0),attempts=used.reduce((a,x)=>a+x.attempts,0);if(!attempts)return {value:0,attempts:0,coverage:0,skills:rows};const avg=used.reduce((a,x)=>a+x.value,0)/used.length,coverage=used.length/rows.length,value=Math.round(clamp(avg*(.78+.22*coverage),0,100));return {value,attempts,coverage:Math.round(coverage*100),skills:rows};}
function weakSkills(state,cids=null,limit=8){const ids=cids?.length?cids:Object.keys(CHMAP),out=[];for(const cid of ids){if(!CHMAP[cid])continue;for(const x of chapterSkills(state,cid))if(x.attempts>0)out.push(x);}return out.sort((a,b)=>a.value-b.value||b.attempts-a.attempts).slice(0,limit);}
function strongSkills(state,cids=null,limit=8){const ids=cids?.length?cids:Object.keys(CHMAP),out=[];for(const cid of ids){if(!CHMAP[cid])continue;for(const x of chapterSkills(state,cid))if(x.attempts>=3)out.push(x);}return out.sort((a,b)=>b.value-a.value||b.attempts-a.attempts).slice(0,limit);}
function chapterNeed(state,cid){const cm=chapterMastery(state,cid);if(!cm.attempts)return 12;const weak=cm.skills.filter(x=>x.attempts>0).sort((a,b)=>a.value-b.value)[0];return clamp((100-cm.value)*.65+(weak?(100-weak.value)*.35:0),0,100);}
function label(v){v=+v||0;return v>=85?{e:'🏆',t:'Maîtrisé',k:'mastered'}:v>=65?{e:'✅',t:'Acquis',k:'acquired'}:v>=40?{e:'🟠',t:'En cours',k:'learning'}:v>0?{e:'🔴',t:'Fragile',k:'fragile'}:{e:'🌱',t:'Nouveau',k:'new'};}
function explainWeak(state,cid){const rows=chapterSkills(state,cid).filter(x=>x.attempts>0).sort((a,b)=>a.value-b.value);if(!rows.length)return null;const x=rows[0];return {cid,skill:x.skill||{id:x.id,kind:x.kind,label:x.label},value:x.value,attempts:x.attempts,text:`${x.short||x.label} : ${x.value} %`};}
window.MQCompetency={version:'1.0',templates:TEMPLATES,skillsForChapter:templateFor,inferKind,ensure,record,entry,chapterSkills,chapterMastery,weakSkills,strongSkills,chapterNeed,label,explainWeak};
})();
