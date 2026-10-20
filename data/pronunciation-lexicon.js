/* Finot Académie — Lexique de prononciation (français), V8.13.
   La synthèse vocale prononce mal un son ou une lettre isolés (« ch », « gn », « e »…). Pour chaque cible, on donne un texte oral
   maîtrisé, avec un mot exemple, qui sera réellement prononcé : le texte affiché peut différer du texte prononcé.
   Champs : cible, type (lettre | graphème | syllabe), langue, graphème, exemple, say (texte audio). */
(function(root){
'use strict';
const L={a:'avion',b:'bateau',c:'carotte',d:'dauphin',e:'cheval',f:'fusée',g:'gâteau',h:'hibou',i:'île',j:'jardin',k:'koala',l:'lune',m:'maison',n:'nuage',o:'orange',p:'pomme',q:'quatre',r:'robot',s:'soleil',t:'tortue',u:'usine',v:'vélo',w:'wagon',x:'taxi',y:'yaourt',z:'zèbre'};
const NAME={a:'A',b:'B',c:'C',d:'D',e:'E',f:'F',g:'G',h:'H',i:'I',j:'J',k:'K',l:'L',m:'M',n:'N',o:'O',p:'P',q:'Q',r:'R',s:'S',t:'T',u:'U',v:'V',w:'W',x:'X',y:'Y',z:'Z'};
const letters={};
for(const [k,ex] of Object.entries(L))letters[k]={cible:k,type:'lettre',langue:'fr-FR',graphème:k,exemple:ex,say:`${NAME[k]}. La lettre ${NAME[k]}. ${NAME[k]} comme ${ex}.`};
letters['é']={cible:'é',type:'lettre',langue:'fr-FR',graphème:'é',exemple:'bébé',say:'É, avec un accent aigu. Comme dans bébé.'};
letters['è']={cible:'è',type:'lettre',langue:'fr-FR',graphème:'è',exemple:'mère',say:'È, avec un accent grave. Comme dans mère.'};
letters['ê']={cible:'ê',type:'lettre',langue:'fr-FR',graphème:'ê',exemple:'fête',say:'Ê, avec un accent circonflexe. Comme dans fête.'};
letters['ç']={cible:'ç',type:'lettre',langue:'fr-FR',graphème:'ç',exemple:'garçon',say:'C cédille. Comme dans garçon.'};
// Graphèmes / phonèmes : « OU. Le son ou, comme dans loup. »
const G=[['a','chat'],['i','lit'],['o','vélo'],['u','lune'],['é','bébé'],['è','mère'],['e','cheval'],['ou','loup'],['on','ballon'],['an','maman'],['en','dent'],['in','lapin'],['ain','pain'],['ein','peinture'],['un','lundi'],
  ['oi','roi'],['oin','loin'],['ch','chat'],['gn','montagne'],['ph','photo'],['qu','quille'],['gu','guitare'],['ge','girafe'],['gi','gilet'],['ce','cerise'],['ci','citron'],['eu','feu'],['œu','cœur'],['au','auto'],['eau','bateau'],
  ['ai','lait'],['ei','neige'],['er','rocher'],['ez','nez'],['et','jouet'],['ill','fille'],['ail','rail'],['eil','soleil'],['euil','fauteuil'],['ouille','grenouille'],['ien','chien'],['ion','camion'],['x','taxi'],['y','pyjama'],
  ['s','soleil'],['ss','tasse'],['z','zèbre'],['f','fusée'],['v','vélo'],['l','lune'],['m','moto'],['n','nid'],['r','rat'],['j','jupe'],['p','papa'],['t','tapis'],['b','bébé'],['d','dodo'],['k','kiwi'],['c','car'],['g','gare']];
const graphemes={};
for(const [g,ex] of G)graphemes[g]={cible:g,type:'graphème',langue:'fr-FR',graphème:g,exemple:ex,say:`${g.toUpperCase()}. Le son ${g}, comme dans ${ex}.`};
// Corrections de prononciation pour les sons que la synthèse lit lettre à lettre.
Object.assign(graphemes,{
  'ch':{...graphemes.ch,say:'CH. Le son ch, comme au début de chat. Chhh.'},
  'gn':{...graphemes.gn,say:'GN. Le son gne, comme dans montagne.'},
  'ph':{...graphemes.ph,say:'PH. Ces deux lettres font le son f, comme dans photo.'},
  'qu':{...graphemes.qu,say:'QU. Ces deux lettres font le son k, comme dans quille.'},
  'gu':{...graphemes.gu,say:'GU. Ces deux lettres font le son gue, comme dans guitare.'},
  'ge':{...graphemes.ge,say:'GE. Ces deux lettres font le son je, comme dans girafe et genou.'},
  'gi':{...graphemes.gi,say:'GI. Ces deux lettres font le son ji, comme dans gilet.'},
  'ce':{...graphemes.ce,say:'CE. Ces deux lettres font le son se, comme dans cerise.'},
  'ci':{...graphemes.ci,say:'CI. Ces deux lettres font le son si, comme dans citron.'},
  'e':{...graphemes.e,say:'E. Le son e, comme dans cheval.'},
  'er':{...graphemes.er,say:'ER. À la fin d’un mot, ces lettres font souvent le son é, comme dans rocher.'},
  'ez':{...graphemes.ez,say:'EZ. Ces lettres font le son é, comme dans nez.'},
  'et':{...graphemes.et,say:'ET. À la fin d’un mot, ces lettres font souvent le son è, comme dans jouet.'},
  'ill':{...graphemes.ill,say:'ILL. Ces lettres font le son ille, comme dans fille.'},
  'x':{...graphemes.x,say:'X. Cette lettre fait souvent le son ks, comme dans taxi.'},
  'y':{...graphemes.y,say:'Y. Cette lettre fait le son i, comme dans pyjama.'},
  'c':{...graphemes.c,say:'C. Devant a, o, u, le c fait le son k, comme dans car.'},
  'g':{...graphemes.g,say:'G. Devant a, o, u, le g fait le son gue, comme dans gare.'},
  's':{...graphemes.s,say:'S. Le son sss, comme dans soleil.'},
  'ss':{...graphemes.ss,say:'SS. Deux s font le son sss, comme dans tasse.'},
  'p':{...graphemes.p,say:'P. Le son pe, comme au début de papa.'},
  't':{...graphemes.t,say:'T. Le son te, comme au début de tapis.'},
  'b':{...graphemes.b,say:'B. Le son be, comme au début de bébé.'},
  'd':{...graphemes.d,say:'D. Le son de, comme au début de dodo.'},
  'k':{...graphemes.k,say:'K. Le son ke, comme au début de kiwi.'},
  'f':{...graphemes.f,say:'F. Le son fff, comme au début de fusée.'},
  'v':{...graphemes.v,say:'V. Le son vvv, comme au début de vélo.'},
  'l':{...graphemes.l,say:'L. Le son lll, comme au début de lune.'},
  'm':{...graphemes.m,say:'M. Le son mmm, comme au début de moto.'},
  'n':{...graphemes.n,say:'N. Le son nnn, comme au début de nid.'},
  'r':{...graphemes.r,say:'R. Le son rrr, comme au début de rat.'},
  'j':{...graphemes.j,say:'J. Le son jjj, comme au début de jupe.'},
  'z':{...graphemes.z,say:'Z. Le son zzz, comme au début de zèbre.'}
});
// Syllabes : « MA. Comme au début de maman. »
const S=[['ma','maman'],['mi','minou'],['mo','moto'],['mu','mur'],['me','melon'],['pa','papa'],['pi','pirate'],['po','pomme'],['pu','punaise'],['la','lapin'],['li','lit'],['lo','loto'],['lu','lune'],['le','lever'],
  ['ra','radis'],['ri','riz'],['ro','robot'],['ru','rue'],['ta','tapis'],['ti','tigre'],['to','tomate'],['tu','tulipe'],['sa','salade'],['si','sirop'],['so','soleil'],['su','sucre'],['na','navet'],['ni','nid'],['no','noisette'],
  ['fa','farine'],['fi','fil'],['fo','forêt'],['va','vache'],['vi','ville'],['vo','voiture'],['da','dame'],['di','dimanche'],['do','domino'],['ba','banane'],['bi','biscuit'],['bo','bonbon'],['bu','bus'],['ca','canard'],['co','cochon'],['cu','cube'],
  ['ga','gâteau'],['go','gomme'],['ja','jardin'],['jo','joli'],['ju','jupe'],['cha','chat'],['che','cheval'],['chi','chien'],['cho','chocolat'],['vé','vélo'],['bé','bébé'],['pé','pépin'],['té','télé'],['ré','récré'],['mé','météo'],
  ['pou','poule'],['tou','toupie'],['mou','mouton'],['lou','loup'],['bon','bonbon'],['ton','tonton'],['mon','montagne'],['lan','lanterne'],['man','manteau'],['pin','pinceau'],['lin','linge'],['moi','moineau'],['toi','toilette']];
const syllables={};
for(const [s,ex] of S)syllables[s]={cible:s,type:'syllabe',langue:'fr-FR',graphème:s,exemple:ex,say:`${s}. Comme au début de ${ex}.`};
root.MQ_PRONUNCIATION={version:'8.13',letters,graphemes,syllables};
})(typeof window!=='undefined'?window:globalThis);
