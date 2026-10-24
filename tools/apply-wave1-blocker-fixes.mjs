import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const edits=[];
function patch(rel, rules){
  const file=path.join(root,rel);
  let text=fs.readFileSync(file,'utf8');
  const before=text;
  for(const r of rules){
    const matches=typeof r.from==='string' ? text.split(r.from).length-1 : [...text.matchAll(new RegExp(r.from.source,r.from.flags.includes('g')?r.from.flags:r.from.flags+'g'))].length;
    if(matches!==r.count)throw new Error(`${rel}: ${r.label||String(r.from)} — ${matches} occurrence(s), attendu ${r.count}`);
    text=text.replace(r.from,r.to);
  }
  if(text!==before){fs.writeFileSync(file,text);edits.push(rel);}
}

patch('data/pedagogy/course-depth-anglais-6e.js',[
  {label:'niveau 6e',from:'niveau A1 en LVA',to:'niveau A1+ en LVA',count:1},
  {label:'BO 6e',from:/Programme de référence\s*:\s*langues vivantes étrangères, cycle 3 \(BO n°31 du 30 juillet 2020\)\./,to:'Programme de référence : langues vivantes étrangères, cycle 3 (BO n°22 du 29 mai 2025, applicable en 6e depuis 2025-2026).',count:1}
]);

patch('data/pedagogy/course-depth-anglais-5e.js',[
  {label:'BO 5e',from:/Programme de référence\s*:\s*langues vivantes étrangères, cycle 4 \(BO n°31 du 30 juillet 2020\)\./,to:'Programme de référence : langues vivantes étrangères, cycle 4 (BO n°22 du 29 mai 2025, applicable en 5e à partir de 2026-2027 ; cible A2 en LVA, A1+ en LVB).',count:1}
]);

patch('data/primary/enrich-ce1.js',[
  {label:'ordre alphabétique CE1',from:/o:\s*\[\s*['"]pomme['"]\s*,\s*['"]poire['"]\s*,\s*['"]prune['"]\s*\]/,to:"o:['poire','pomme','prune']",count:1}
]);

patch('js/dictation-engine.js',[
  {label:'boucle alignement indexée',from:'  for(const x of al){',to:'  for(let alignIndex=0;alignIndex<al.length;alignIndex++){const x=al[alignIndex];',count:1},
  {label:'erreur mot comparé alignIndex',from:"errors.push({type,ref:x.r,got:x.a,kind:kindOf(x.r,x.a,type),pos:x.ri+1,apos:gi});",to:"errors.push({type,ref:x.r,got:x.a,kind:kindOf(x.r,x.a,type),pos:x.ri+1,apos:gi,alignIndex});",count:1},
  {label:'erreur manquante alignIndex',from:"errors.push({type:'missing',ref:x.r,got:'',kind:'mot manquant',pos:x.ri+1,apos:gi});",to:"errors.push({type:'missing',ref:x.r,got:'',kind:'mot manquant',pos:x.ri+1,apos:gi,alignIndex});",count:1},
  {label:'erreur extra alignIndex',from:"errors.push({type:'extra',ref:'',got:x.a,kind:'mot en trop',pos:x.ri,apos:gi});",to:"errors.push({type:'extra',ref:'',got:x.a,kind:'mot en trop',pos:x.ri,apos:gi,alignIndex});",count:1},
  {label:'appariement réellement adjacent',from:"if(((a.type==='missing'&&b.type==='extra')||(a.type==='extra'&&b.type==='missing'))&&!a.pair&&!b.pair){",to:"if(((a.type==='missing'&&b.type==='extra')||(a.type==='extra'&&b.type==='missing'))&&!a.pair&&!b.pair&&Math.abs((a.alignIndex??-99)-(b.alignIndex??-99))===1){",count:1}
]);

console.log(JSON.stringify({edited:edits},null,2));
