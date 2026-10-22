from pathlib import Path

science=Path('data/pedagogy/course-depth-sciences-primary.js')
s=science.read_text(encoding='utf-8')
for old,new in [('« ','«\u00a0'),(' »','\u00a0»'),(' :','\u00a0:'),(' ;','\u00a0;'),(' !','\u00a0!'),(' ?','\u00a0?')]:
    s=s.replace(old,new)
science.write_text(s,encoding='utf-8')

test=Path('tests/course-depth.test.js')
s=test.read_text(encoding='utf-8')
anchor="  const scienceTargets=[['CP','p-sciences'],['CE1','p-qlm'],['CE2','p-qlm'],['CM1','p-sciences'],['CM2','p-sciences']].map(([g,sid])=>{"
insert="  const earthExpected=['cm1-sc-meteo-climat','cm2-sc-systeme-solaire','cm2-sc-terre-active','cm2-sc-environnement'];\n  const earthProfiles=earthExpected.map(id=>[id,C[id]&&C[id].scienceProfile]);\n"+anchor
if 'const earthExpected=' not in s:
    if s.count(anchor)!=1: raise SystemExit('ancre scienceTargets introuvable')
    s=s.replace(anchor,insert,1)
oldret='return {count:ids.length,orphans,lots:lots2,scienceTargets,order,place,bad,typos};'
newret='return {count:ids.length,orphans,lots:lots2,scienceTargets,earthProfiles,order,place,bad,typos};'
if newret not in s:
    if s.count(oldret)!=1: raise SystemExit('retour de test introuvable')
    s=s.replace(oldret,newret,1)
anchor2=" T('Chaque chapitre enrichi existe dans le programme (aucun identifiant orphelin)',r.count>0&&!r.orphans.length,r.orphans.join(', '));"
assertion=anchor2+"\n T('Terre, climat, géologie et système solaire utilisent le profil Terre & espace',r.earthProfiles.length===4&&r.earthProfiles.every(x=>x[1]==='earth'),JSON.stringify(r.earthProfiles));"
if 'profil Terre & espace' not in s:
    if s.count(anchor2)!=1: raise SystemExit('ancre assertion Terre introuvable')
    s=s.replace(anchor2,assertion,1)
test.write_text(s,encoding='utf-8')
