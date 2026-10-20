/* Finot Académie — Italien collège : enrichissement V8.13 (variété ≥ 12 questions distinctes) des chapitres de grammaire historiques.
   Programme de langues vivantes du cycle 4 (BO n°31 du 30/07/2020), niveau A2. */
(function(){
'use strict';
const MQ=window.MQCollege;if(!MQ)return;const E=(id,items)=>MQ.enrich(id,{items,w:.55});
const it=t=>`<span lang="it">${t}</span>`;const C='Complète : ';
E('it3e',[
 [C+it('Bevi il latte? Sì, ___ bevo.'),'lo',['la','li','le'],it('il latte')+' : masculin singulier → '+it('lo')+'.'],
 [C+it('Leggi la rivista? Sì, ___ leggo.'),'la',['lo','li','le'],it('la rivista')+' : féminin singulier → '+it('la')+'.'],
 [C+it('Mangi gli spaghetti? Sì, ___ mangio.'),'li',['le','lo','la'],it('gli spaghetti')+' : masculin pluriel → '+it('li')+'.'],
 [C+it('Prendi le chiavi? Sì, ___ prendo.'),'le',['li','la','lo'],it('le chiavi')+' : féminin pluriel → '+it('le')+'.'],
 [C+it('Aspetti i tuoi genitori? Sì, ___ aspetto.'),'li',['le','lo','gli'],it('i genitori')+' : masculin pluriel → '+it('li')+'.'],
 [C+it('Vedi Sara domani? No, non ___ vedo.'),'la',['lo','le','li'],'Sara : féminin singulier → '+it('la')+' ; la négation '+it('non')+' se place avant le pronom.'],
 [C+it('Hai il biglietto? Sì, ___ ho.'),'ce l’',['lo','la','gli'],'Avec '+it('avere')+' à l’oral, on dit '+it('ce l’ho')+' (je l’ai).',3],
 [C+it('Scrivi a Luca? Sì, ___ scrivo.'),'gli',['lo','le','li'],'À Luca (complément indirect masculin) → '+it('gli')+'.',2],
 [C+it('Telefoni a Maria? Sì, ___ telefono.'),'le',['la','gli','lo'],'À Maria (complément indirect féminin) → '+it('le')+'.',2],
 ['Où se place le pronom complément dans '+it('Voglio vederlo')+' ?','attaché à la fin de l’infinitif',['avant le verbe conjugué obligatoirement','après le sujet','il est supprimé'],'Avec un infinitif, le pronom s’attache à la fin : '+it('vederlo')+' (ou '+it('lo voglio vedere')+').',3]]);
E('it3h',[
 [C+it('Luca è ___ alto di Marco. (moins)'),'meno',['più','come','tanto'],it('meno … di')+' = moins … que.'],
 [C+it('Anna è alta ___ sua sorella. (aussi … que)'),'come',['di','che','più'],it('come')+' (ou '+it('quanto')+') = aussi … que.'],
 [C+it('Il Po è il fiume ___ lungo d’Italia. (le plus)'),'più',['meno','molto','come'],'Superlatif relatif : '+it('il più lungo')+'.'],
 [C+it('Questa giacca è ___ cara di quella. (plus)'),'più',['meno','come','molto'],it('più … di')+' = plus … que.'],
 [C+it('Milano è più grande ___ Bologna.'),'di',['che','come','della'],'Devant un nom propre : '+it('più … di')+'.'],
 [C+it('Mi piace più leggere ___ guardare la TV.'),'che',['di','come','della'],'Entre deux verbes, on emploie '+it('che')+' : '+it('più leggere che guardare')+'.',2],
 ['Que signifie '+it('Questo gelato è buonissimo')+' ?','Cette glace est très bonne.',['Cette glace est la meilleure.','Cette glace est moins bonne.','Cette glace est aussi bonne.'],'Le suffixe '+it('-issimo')+' = très (superlatif absolu).',2],
 [C+it('Questo è il ___ film dell’anno. (meilleur)'),'migliore',['più buono','meglio','buonissimo'],it('migliore')+' = meilleur (comparatif irrégulier de '+it('buono')+').',3],
 ['Comment dit-on « Le chat est plus petit que le chien » ?',it('Il gatto è più piccolo del cane.'),[it('Il gatto è più piccolo che il cane.'),it('Il gatto è meno piccolo del cane.'),it('Il gatto è piccolo come il cane.')],it('di + il = del')+' : '+it('più piccolo del cane')+'.',2]]);
})();
