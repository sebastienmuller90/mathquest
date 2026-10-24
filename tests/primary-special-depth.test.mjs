import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const modulePath='data/pedagogy/course-depth-arts-music-eps-evar-primary.js';
const src=fs.readFileSync(modulePath,'utf8');
const index=fs.readFileSync('index.html','utf8');

assert.ok(index.includes(modulePath),'index.html doit charger le module d’approfondissement primaire spécial');
assert.ok(index.indexOf('data/pedagogy/course-depth-hg-emc-primary.js')<index.indexOf(modulePath),'le nouveau module doit suivre les approfondissements HG/EMC primaire');
assert.ok(index.indexOf(modulePath)<index.indexOf('data/pedagogy/course-depth-anglais-6e.js'),'le nouveau module doit être disponible avant les approfondissements collège');

const grades=['CP','CE1','CE2','CM1','CM2'];
const subjectCases={
 'p-arts':{name:'Couleurs, matières et traces',domain:'Expérimenter, produire'},
 'p-musique':{name:'Les familles d’instruments',domain:'Écouter, comparer'},
 'p-eps':{name:'Courir, sauter, lancer',domain:'Produire une performance'},
 'p-evar':{name:'Le corps, l’intimité et le consentement',domain:'Se connaître'}
};
const reg={};
for(const grade of grades){
 reg[grade]={};
 for(const [sid,c] of Object.entries(subjectCases))reg[grade][sid]=[{id:`${grade.toLowerCase()}-${sid.slice(2)}-probe`,name:c.name,domain:c.domain}];
}
const context={console,MQPrimary:{_reg:{grades:reg}}};
vm.createContext(context);
vm.runInContext(src,context,{filename:modulePath});

const C=context.MQCourseDepth&&context.MQCourseDepth.chapters;
assert.ok(C,'MQCourseDepth.chapters doit être créé');
const ids=Object.keys(C);
assert.equal(ids.length,grades.length*Object.keys(subjectCases).length,'les 20 combinaisons niveau × matière doivent être couvertes');

const words=html=>String(html||'').replace(/<[^>]+>/g,' ').split(/\s+/).filter(Boolean).length;
for(const grade of grades){
 for(const sid of Object.keys(subjectCases)){
  const id=`${grade.toLowerCase()}-${sid.slice(2)}-probe`,d=C[id];
  assert.ok(d,`chapitre non enrichi : ${id}`);
  assert.ok(Array.isArray(d.deep)&&d.deep.length===2,`${id} : deux blocs deep attendus`);
  assert.ok(d.try&&d.try.q&&d.try.a,`${id} : défi avec réponse attendu`);
  assert.ok(d.adult&&d.adult.length>80,`${id} : conseil adulte insuffisant`);
  assert.ok(d.culture&&d.culture.t&&d.culture.h,`${id} : bloc culture attendu`);
  assert.ok(d.specialProfile,`${id} : profil pédagogique absent`);
  const depthWords=d.deep.reduce((n,x)=>n+words(x.h),0)+words(d.culture.h)+words(d.adult);
  assert.ok(depthWords>=180,`${id} : approfondissement trop léger (${depthWords} mots)`);
 }
}

const expectedProfiles={
 'p-arts':'arts-make',
 'p-musique':'music-instruments',
 'p-eps':'eps-performance',
 'p-evar':'evar-body'
};
for(const sid of Object.keys(expectedProfiles))assert.equal(C[`cp-${sid.slice(2)}-probe`].specialProfile,expectedProfiles[sid],`${sid} : mauvais routage de profil`);

for(const marker of ['arts-observe','arts-project','music-perform','music-listen','eps-movement','eps-cooperate','eps-safety','evar-relations','evar-equality','evar-rights'])assert.ok(src.includes(`'${marker}'`),`profil manquant dans le module : ${marker}`);
assert.ok(!/\bTODO\b|\bFIXME\b|\bHACK\b/.test(src),'le module ne doit contenir aucun TODO/FIXME/HACK');

console.log(`Primary special depth audit: OK — ${ids.length} combinaisons couvertes`);
