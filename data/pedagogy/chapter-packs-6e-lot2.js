/* MathQuest — packs pédagogiques spécifiques 6e, lot 2.
   Extension explicite du registre de packs : fractions, grammaire, SVT et géographie. */
(function(){
'use strict';
if(typeof window==='undefined'||!window.MQChapterPacks?.packs)return;
const packs={
  '6g':{
    subject:'maths',grade:'6e',competency:'Interpréter une fraction comme partage, mesure et quotient, puis la situer par rapport à 1.',
    provenance:{type:'creation',label:'Situations mathématiques originales créées pour MathQuest',refs:['Mathématiques cycle 3 — BO n°16 du 17 avril 2025 (MENE2504620A)','Programme de 6e : fractions comme nombres, partage, mesure et quotient']},
    object:{title:'Trois façons de rencontrer une fraction',html:`<p>Les trois situations ci-dessous sont créées pour travailler plusieurs sens d’une fraction.</p><table class="ptable"><tr><th>Situation</th><th>Information</th></tr><tr><td>A · Partage</td><td>Une bande est partagée en 4 parts égales ; 3 parts sont repérées.</td></tr><tr><td>B · Mesure</td><td>Sur une règle graduée en quarts, un point est placé au 7e quart après 0.</td></tr><tr><td>C · Quotient</td><td>5 litres de jus fictif sont partagés également entre 4 récipients identiques.</td></tr></table><p class="muted small">Ces situations sont des créations pédagogiques MathQuest ; elles ne décrivent aucune mesure réelle.</p>`},
    levels:{
      1:{label:'Facile',questions:[{q:'Dans la situation A, quelle fraction de la bande est repérée ?',a:'3/4',hint:'Le dénominateur indique le nombre total de parts égales ; le numérateur indique combien sont repérées.'},{q:'Le nombre 7/4 est-il inférieur ou supérieur à 1 ?',a:'Supérieur à 1.',hint:'Quatre quarts font une unité complète.'}]},
      2:{label:'Moyen',questions:[{q:'Écris 7/4 sous la forme « un entier + une fraction inférieure à 1 ».',a:'1 + 3/4',hint:'Retire d’abord 4/4, c’est-à-dire une unité.'},{q:'Dans la situation C, quelle quantité reçoit chaque récipient ?',a:'5/4 L, soit 1,25 L.',hint:'Une fraction a/b représente aussi le quotient a ÷ b.'}]},
      3:{label:'Difficile',questions:[{q:'Explique pourquoi 7/4 et 1,75 désignent le même nombre sans utiliser seulement une calculatrice.',a:'7/4 = 1 + 3/4 et 3/4 = 0,75, donc 7/4 = 1,75.',hint:'Décompose 7 quarts en 4 quarts puis 3 quarts.'},{q:'Un élève affirme qu’une fraction est toujours plus petite que 1. Réfute avec deux exemples du dossier.',a:'7/4 et 5/4 sont supérieurs à 1 ; leur numérateur est supérieur à leur dénominateur.',hint:'Cherche les situations où il y a plus d’une unité complète.'}]}
    },
    exerciseContext:'Après ta réponse, demande-toi quel sens de la fraction est utilisé : partage, mesure sur une droite ou quotient.',
    transfer:{title:'Transfert',prompt:'Invente une situation réelle simple qui représente 9/4, puis explique où ce nombre se placerait entre deux entiers sur une droite graduée.'},
    misconception:['Penser qu’une fraction est forcément plus petite que 1 ou qu’elle représente seulement une « part de gâteau ».','Une fraction est un nombre : elle peut représenter un partage, une mesure ou un quotient, et elle peut être supérieure à 1.'],
    finot:{steps:['Repère l’unité de référence.','Lis le dénominateur comme le nombre de parts égales dans une unité.','Regarde combien de parts sont prises ou mesurées.','Compare le numérateur au dénominateur pour savoir si la fraction dépasse 1.']}
  },
  'fr6j':{
    subject:'francais',grade:'6e',competency:'Distinguer la nature grammaticale d’un mot ou groupe de sa fonction dans la phrase.',
    provenance:{type:'creation',label:'Phrases originales créées pour MathQuest',refs:['Français cycle 3 — BO n°16 du 17 avril 2025 (MENE2504620A)','Programme de 6e — grammaire et orthographe grammaticale : classes de mots et fonctions']},
    object:{title:'Même nature, fonctions différentes',html:`<p>Observe ces quatre phrases originales.</p><ol><li><b>Lina</b> observe le renard.</li><li>Sami appelle <b>Lina</b>.</li><li><b>Le petit renard</b> traverse la clairière.</li><li>Lina photographie <b>le petit renard</b>.</li></ol><p class="muted small">Les groupes en gras gardent leur nature grammaticale, mais leur rôle dans la phrase peut changer.</p>`},
    levels:{
      1:{label:'Facile',questions:[{q:'Quelle est la nature grammaticale de « Lina » dans les phrases 1 et 2 ?',a:'Un nom propre.',hint:'La nature dit ce que le mot est, pas son rôle dans la phrase.'},{q:'Quelle est la fonction de « Lina » dans la phrase 1 ?',a:'Sujet du verbe « observe ».',hint:'Demande-toi qui réalise l’action d’observer.'}]},
      2:{label:'Moyen',questions:[{q:'Quelle est la fonction de « Lina » dans la phrase 2 ?',a:'COD du verbe « appelle ».',hint:'Sami appelle qui ?'},{q:'Compare « le petit renard » dans les phrases 3 et 4 : que reste-t-il identique et que change-t-il ?',a:'La nature reste groupe nominal ; la fonction passe de sujet à COD.',hint:'Sépare toujours identité grammaticale et rôle syntaxique.'}]},
      3:{label:'Difficile',questions:[{q:'Dans « Le petit renard traverse la clairière », quelle est la nature de « petit » et son rôle dans le groupe nominal ?',a:'Adjectif qualificatif, épithète du nom « renard ».',hint:'Repère le nom noyau que le mot précise.'},{q:'Écris une nouvelle phrase où « Lina » reste un nom propre mais n’est ni sujet ni COD, puis indique sa fonction.',a:'Exemple : « Sami parle à Lina. » — « Lina » est COI.',hint:'Une préposition comme « à » peut introduire un complément indirect.'}]}
    },
    exerciseContext:'Avant de répondre, écris mentalement deux colonnes : « nature = ce que c’est » et « fonction = ce que ça fait dans cette phrase ».',
    transfer:{title:'Transfert',prompt:'Choisis un même groupe nominal et utilise-le dans deux phrases : une fois sujet, une fois COD. Explique pourquoi sa nature ne change pas.'},
    misconception:['Répondre « sujet », « COD » ou « COI » quand la question demande la nature grammaticale.','Commence par identifier la classe ou le groupe grammatical ; cherche seulement ensuite son rôle dans la phrase.'],
    finot:{steps:['Repère exactement le mot ou groupe demandé.','Demande « qu’est-ce que c’est ? » pour la nature.','Repère le verbe de la phrase.','Demande « quel rôle joue ce groupe autour du verbe ou du nom ? » pour la fonction.']}
  },
  'svt6a':{
    subject:'svt',grade:'6e',competency:'Relier les groupes d’aliments à leurs rôles et expliquer pourquoi les besoins alimentaires varient selon les situations.',
    questionScope:{exclude:['micro-organisme','micro-organismes','levure','ferment','stéril','pasteuris','conserv','réfrigér','congél','yaourtière','saucisson','jambon','kcal']},
    provenance:{type:'synthese',label:'Dossier de synthèse MathQuest fondé sur le cours de 6e',refs:['Cycle 3 — sciences et technologie, arrêté du 15 juin 2023 (MENE2314101A), BO n°25 du 22 juin 2023','Éduscol — cycle 3, alimentation humaine et besoins de l’organisme']},
    object:{title:'Dossier : composer et analyser un plateau fictif',html:`<p>Pour un exercice de sciences, on prépare un plateau fictif avec : <b>eau, lentilles, riz, carottes, yaourt nature et pomme</b>.</p><table class="ptable"><tr><th>Élément du cours</th><th>Rôle général à retenir</th></tr><tr><td>Protéines</td><td>Participent notamment à la construction et au renouvellement des tissus.</td></tr><tr><td>Glucides et lipides</td><td>Peuvent fournir de l’énergie à l’organisme.</td></tr><tr><td>Eau, vitamines, sels minéraux, fibres</td><td>Participent au bon fonctionnement de l’organisme selon des rôles différents.</td></tr></table><p class="muted small">Le plateau est une situation pédagogique fictive. Il ne constitue pas un conseil alimentaire personnalisé ni un menu médical.</p>`},
    levels:{
      1:{label:'Facile',questions:[{q:'Quel élément du plateau appartient au groupe des féculents ?',a:'Le riz.',hint:'Le cours cite notamment pain, pâtes et riz parmi les féculents.'},{q:'Quelle boisson est indispensable à l’organisme d’après le cours ?',a:'L’eau.',hint:'Cherche la seule boisson présentée comme indispensable.'}]},
      2:{label:'Moyen',questions:[{q:'Donne un exemple du plateau qui apporte des protéines et explique leur rôle général.',a:'Les lentilles ou le yaourt ; les protéines participent notamment à la construction et au renouvellement des tissus.',hint:'Relie l’aliment à la ligne « protéines » du dossier.'},{q:'Pourquoi les besoins alimentaires ne sont-ils pas exactement identiques pour tout le monde ?',a:'Ils varient notamment avec l’âge, la croissance, la taille et l’activité physique.',hint:'Le cours relie les besoins aux caractéristiques et aux dépenses de l’organisme.'}]},
      3:{label:'Difficile',questions:[{q:'Explique pourquoi « manger équilibré » ne signifie pas simplement manger la même quantité de chaque groupe d’aliments.',a:'Les rôles et les besoins diffèrent ; l’équilibre dépend de la variété et de quantités adaptées aux besoins et aux dépenses.',hint:'Distingue variété, rôle des nutriments et quantité adaptée.'},{q:'Un camarade affirme que seuls les aliments riches en glucides fournissent de l’énergie. Corrige cette phrase à partir du dossier.',a:'Les glucides mais aussi les lipides peuvent fournir de l’énergie.',hint:'Relis la deuxième ligne du tableau.'}]}
    },
    exerciseContext:'Après ta réponse, distingue toujours le groupe de l’aliment, ce qu’il apporte et le rôle général de ces nutriments.',
    transfer:{title:'Transfert',prompt:'Choisis trois aliments courants et classe-les par groupe, puis explique quel type d’apport ou de rôle général tu associes à chacun sans transformer cela en conseil médical.'},
    misconception:['Croire qu’un seul aliment ou un seul nutriment suffit à définir à lui seul un repas « équilibré ».','Raisonne sur la variété, les rôles complémentaires des nutriments et l’adaptation des quantités aux besoins, sans tirer de conclusion médicale individuelle.'],
    finot:{steps:['Identifie d’abord le groupe de l’aliment.','Rappelle ce qu’il apporte surtout dans le cadre du cours.','Relie cet apport à un rôle général.','Si la question parle de besoins, cherche les facteurs comme croissance ou activité.']}
  },
  'hg6s':{
    subject:'hg',grade:'6e',competency:'Identifier une contrainte naturelle et expliquer comment les sociétés adaptent leurs pratiques et leurs aménagements.',
    questionScope:{exclude:['densité de population']},
    provenance:{type:'synthese',label:'Quatre territoires fictifs de synthèse créés à partir du cours',refs:['Histoire-Géographie cycle 3 — programme applicable en 6e, BO n°31 du 30 juillet 2020','Géographie 6e — habiter un espace à fortes contraintes naturelles ou de grande biodiversité']},
    object:{title:'Quatre territoires fictifs à comparer',html:`<p>Ces quatre territoires imaginaires servent uniquement à raisonner sur contraintes et adaptations.</p><table class="ptable"><tr><th>Territoire fictif</th><th>Contrainte dominante</th><th>Exemples d’adaptations</th></tr><tr><td>Hautes-Roches</td><td>Altitude, pente, isolement hivernal</td><td>Routes en lacets, tunnels, bâtiments adaptés au froid</td></tr><tr><td>Dune-Sèche</td><td>Aridité et rareté de l’eau</td><td>Stockage de l’eau, irrigation économe, activités adaptées</td></tr><tr><td>Nord-Glace</td><td>Froid intense et sols gelés une partie de l’année</td><td>Isolation renforcée, réseaux techniques protégés, mobilités adaptées</td></tr><tr><td>Forêt-Liane</td><td>Végétation très dense, humidité, accès terrestre difficile</td><td>Déplacements fluviaux, constructions adaptées à l’humidité</td></tr></table><p class="muted small">Ces lieux et aménagements sont des synthèses fictives : ils ne décrivent pas une population réelle précise.</p>`},
    levels:{
      1:{label:'Facile',questions:[{q:'Quelle contrainte domine à Dune-Sèche ?',a:'L’aridité et la rareté de l’eau.',hint:'Lis la colonne « contrainte dominante ».'},{q:'Cite une adaptation proposée à Hautes-Roches.',a:'Routes en lacets, tunnels ou bâtiments adaptés au froid.',hint:'Cherche dans la troisième colonne.'}]},
      2:{label:'Moyen',questions:[{q:'Pourquoi serait-il faux de dire qu’un espace à fortes contraintes est forcément inhabité ?',a:'Des populations peuvent y vivre grâce à des adaptations, des techniques, des mobilités et des aménagements.',hint:'Le tableau montre une réponse humaine à chaque contrainte.'},{q:'Compare Dune-Sèche et Nord-Glace : quelle idée générale commune montrent leurs adaptations ?',a:'Les sociétés adaptent techniques, équipements et pratiques aux caractéristiques du milieu.',hint:'Ne cherche pas une adaptation identique ; cherche le principe commun.'}]},
      3:{label:'Difficile',questions:[{q:'Explique pourquoi un aménagement qui facilite l’habitat peut aussi créer une tension environnementale.',a:'Un aménagement peut améliorer l’accès ou les activités tout en transformant un milieu fragile, consommant des ressources ou augmentant la fréquentation.',hint:'Relie avantage pour les habitants et effet possible sur le milieu.'},{q:'Pour Forêt-Liane, propose une information supplémentaire nécessaire avant d’affirmer que le milieu est « mal adapté » aux humains.',a:'Il faudrait connaître les populations, leurs pratiques, les ressources, les mobilités et les aménagements réels ; une contrainte dépend aussi des sociétés.',hint:'Une contrainte n’a pas les mêmes effets selon les techniques et les modes de vie.'}]}
    },
    exerciseContext:'Après ta réponse, formule toujours le raisonnement en trois étapes : contrainte du milieu → adaptation humaine → éventuel effet ou limite.',
    transfer:{title:'Transfert',prompt:'Imagine un cinquième territoire soumis à une contrainte naturelle différente. Propose deux adaptations et une limite possible de ces aménagements.'},
    misconception:['Confondre « espace contraignant » avec « espace vide » ou « inhabitable ».','Une contrainte rend certaines activités plus difficiles ; les sociétés peuvent s’y adapter, et leurs aménagements peuvent à leur tour transformer le milieu.'],
    finot:{steps:['Repère la contrainte naturelle précise.','Cherche ce qu’elle rend plus difficile.','Identifie la technique, la mobilité ou l’aménagement qui répond à cette difficulté.','Ajoute si nécessaire un effet sur le milieu ou une limite.']}
  }
};
const normQuestion=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,' ').replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
function matchesQuestion(pack,q){
 const scope=pack?.questionScope;if(!scope)return true;
 const text=normQuestion([q?.q,q?.text,q?.prompt].filter(Boolean).join(' '));if(!text)return false;
 const excludes=Array.isArray(scope.exclude)?scope.exclude:[],includes=Array.isArray(scope.include)?scope.include:[];
 if(excludes.some(x=>text.includes(normQuestion(x))))return false;
 if(includes.length&&!includes.some(x=>text.includes(normQuestion(x))))return false;
 return true;
}
Object.assign(window.MQChapterPacks.packs,packs);
window.MQChapterPacks.matchesQuestion=matchesQuestion;
window.MQChapterPacks.version='1.3';
})();