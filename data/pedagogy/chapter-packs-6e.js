/* MathQuest — packs pédagogiques spécifiques de 6e.
   Chaque pack est rattaché explicitement à un chapterId : aucun classement par mot-clé.
   Les réponses restent dans les données pour audit/remédiation et ne sont jamais rendues dans le cours. */
(function(){
'use strict';
if(typeof window==='undefined')return;
const packs={
  '6p':{
    subject:'maths',grade:'6e',competency:'Calculer et comparer des durées en utilisant le système sexagésimal.',
    provenance:{type:'simulation',label:'Emploi du temps fictif créé pour MathQuest',refs:['Mathématiques cycle 3 — BO n°16 du 17 avril 2025 (MENE2504620A)','Éduscol — attendus de fin d’année de 6e, grandeurs et mesures : durées']},
    object:{title:'Une sortie au cinéma à organiser',html:`<p>Une famille prépare une sortie. Toutes les heures ci-dessous sont fictives.</p><table class="ptable"><tr><th>Étape</th><th>Début</th><th>Fin</th></tr><tr><td>Trajet en bus</td><td>14 h 05</td><td>14 h 32</td></tr><tr><td>Attente avant le film</td><td>14 h 32</td><td>14 h 50</td></tr><tr><td>Film</td><td>14 h 50</td><td>16 h 27</td></tr><tr><td>Attente du retour</td><td>16 h 27</td><td>16 h 45</td></tr><tr><td>Bus du retour</td><td>16 h 45</td><td>17 h 13</td></tr></table><p class="muted small">Les horaires servent uniquement à travailler les durées ; ils ne correspondent à aucune séance réelle.</p>`},
    levels:{
      1:{label:'Facile',questions:[{q:'Combien de minutes dure le trajet aller en bus ?',a:'27 min',hint:'Va de 14 h 05 à 14 h 32.'},{q:'Combien de temps la famille attend-elle avant le film ?',a:'18 min',hint:'Calcule de 14 h 32 à 14 h 50.'}]},
      2:{label:'Moyen',questions:[{q:'Quelle est la durée du film ?',a:'1 h 37 min',hint:'Passe par 15 h puis 16 h avant d’arriver à 16 h 27.'},{q:'Combien de minutes s’écoulent entre le départ du bus aller et le début du film ?',a:'45 min',hint:'Tu peux additionner trajet et attente.'}]},
      3:{label:'Difficile',questions:[{q:'Combien de temps s’écoule au total entre 14 h 05 et 17 h 13 ?',a:'3 h 08 min',hint:'Calcule la durée entre les deux instants, sans soustraire des écritures décimales.'},{q:'Le film prend 12 minutes de retard mais dure toujours aussi longtemps. À quelle heure finit-il ?',a:'16 h 39',hint:'Ajoute 12 minutes à l’horaire de fin prévu.'}]}
    },
    exerciseContext:'Après avoir répondu, vérifie ton calcul de durée en passant par une heure pleine ou en convertissant tout en minutes.',
    transfer:{title:'Transfert',prompt:'Invente un trajet avec une heure de départ et une heure d’arrivée, puis explique comment tu calculerais sa durée sans traiter les heures comme des nombres décimaux.'},
    misconception:['Traiter 14 h 50 ou 16 h 27 comme des nombres décimaux.','Les minutes fonctionnent en base 60 : passe par les heures pleines ou convertis les instants dans une même unité.'],
    finot:{steps:['Repère les deux instants utiles.','Passe par l’heure pleine suivante.','Additionne les morceaux de durée.','Vérifie que les minutes restent entre 0 et 59.']}
  },
  'fr6a':{
    subject:'francais',grade:'6e',competency:'Préparer une lecture orale fluide et expressive en s’appuyant sur la ponctuation et les indices du texte.',
    provenance:{type:'creation',label:'Court texte original écrit pour MathQuest',refs:['Français cycle 3 — BO n°16 du 17 avril 2025 (MENE2504620A)','Éduscol — exemples pour la mise en œuvre du programme de français en 6e (2025)']},
    object:{title:'Préparer la lecture d’un dialogue',html:`<div class="trad"><p>La pluie frappait les vitres. Lina s’approcha de la porte et tendit l’oreille.</p><p>— Tu as entendu ? murmura-t-elle.</p><p>Un nouveau craquement retentit dans le couloir.</p><p>— Il y a quelqu’un ! s’exclama Sami.</p><p>Lina leva la main.</p><p>— Chut… écoute d’abord.</p></div><p class="muted small">Texte original MathQuest : il ne s’agit pas d’un extrait d’œuvre publiée.</p>`},
    levels:{
      1:{label:'Facile',questions:[{q:'Quel mot indique que Lina parle très doucement ?',a:'murmura',hint:'Cherche le verbe placé après sa première réplique.'},{q:'Quel signe de ponctuation indique une question ?',a:'le point d’interrogation',hint:'Observe la fin de « Tu as entendu ? ».'}]},
      2:{label:'Moyen',questions:[{q:'Comment la voix de Sami doit-elle changer sur « Il y a quelqu’un ! » ? Justifie avec deux indices.',a:'Voix plus forte ou plus vive ; indices : « s’exclama » et le point d’exclamation.',hint:'Cherche à la fois un verbe de parole et un signe de ponctuation.'},{q:'Où placerais-tu une pause nette dans « Chut… écoute d’abord. » et pourquoi ?',a:'Après « Chut… », à cause des points de suspension qui marquent une attente.',hint:'La ponctuation organise le rythme.'}]},
      3:{label:'Difficile',questions:[{q:'Propose une lecture différente pour Lina et Sami sans caricaturer les voix. Quels paramètres modifies-tu ?',a:'Débit, volume, intonation et pauses selon les émotions et les verbes de parole.',hint:'Pense au volume, au débit, à l’intonation et aux pauses.'},{q:'Explique comment la ponctuation et les verbes de parole construisent le suspense du passage.',a:'Les pauses, points de suspension, exclamation et verbes « murmura/s’exclama » ralentissent puis intensifient la scène.',hint:'Relie au moins deux indices précis à leur effet sur l’auditeur.'}]}
    },
    exerciseContext:'Après ta réponse, cite un indice précis du texte ou de la phrase qui justifie ton choix et dis comment il guiderait une lecture à voix haute.',
    transfer:{title:'Transfert',prompt:'Choisis deux phrases d’un texte que tu lis actuellement et annote-les avec / pour les groupes de sens, puis indique l’intonation à adopter.'},
    misconception:['Lire plus vite pour paraître plus fluide.','La fluidité combine exactitude, rythme et compréhension : respecte les groupes de sens et la ponctuation avant de chercher la vitesse.'],
    finot:{steps:['Relis silencieusement pour comprendre la scène.','Entoure la ponctuation.','Repère les verbes de parole.','Choisis volume, débit, intonation et pauses en fonction du sens.']}
  },
  'hg6o':{
    subject:'hg',grade:'6e',competency:'Expliquer les transformations du Néolithique en reliant production de nourriture, sédentarisation et transformation des paysages.',
    provenance:{type:'reconstitution',label:'Reconstitution pédagogique originale MathQuest construite à partir du cours',refs:['Histoire-Géographie cycle 3 — programme en vigueur en 6e, BO n°31 du 30 juillet 2020']},
    object:{title:'Dossier : un village néolithique reconstitué',html:`<p><b>Reconstitution pédagogique.</b> Vers 7 000 av. J.-C., dans une région européenne imaginaire, un groupe vit désormais une grande partie de l’année au même endroit. Près des maisons en bois et en terre, on observe des champs de céréales, des enclos avec des animaux, des fosses de stockage et un espace où l’on fabrique des poteries.</p><ul><li>Les céréales sont semées puis récoltées.</li><li>Des animaux domestiqués fournissent viande, lait ou matières premières.</li><li>Le stockage permet de conserver une partie des récoltes.</li><li>Le village nécessite des défrichements et transforme le paysage.</li></ul><p class="muted small">Ce village est une reconstitution originale MathQuest, pas un site archéologique réel ni un document d’époque.</p>`},
    levels:{
      1:{label:'Facile',questions:[{q:'Cite deux indices montrant que ce groupe produit une partie de sa nourriture.',a:'Les champs cultivés et les animaux domestiqués/enclos.',hint:'Cherche ce qui concerne cultures et élevage.'},{q:'Quel indice montre que le groupe est sédentaire ?',a:'Il vit une grande partie de l’année au même endroit dans un village de maisons.',hint:'Sédentaire signifie installé durablement.'}]},
      2:{label:'Moyen',questions:[{q:'Explique le lien entre agriculture, stockage et sédentarisation.',a:'Produire puis stocker des récoltes favorise une installation durable près des champs et réserves.',hint:'Relie production, conservation et lieu de vie.'},{q:'Donne deux transformations du paysage liées à ce mode de vie.',a:'Défrichements/champs et construction du village ou des enclos.',hint:'Compare mentalement cet espace avec un campement de chasseurs-cueilleurs.'}]},
      3:{label:'Difficile',questions:[{q:'Pourquoi serait-il faux d’écrire que tous les humains deviennent agriculteurs partout en 10 000 av. J.-C. ?',a:'La néolithisation est progressive, commence dans plusieurs foyers et se diffuse à des dates différentes selon les régions.',hint:'Le cours insiste sur des rythmes et des foyers différents.'},{q:'À partir du dossier, construis une chaîne de trois conséquences partant de la production de nourriture.',a:'Exemple : agriculture/élevage → stockage → sédentarisation/villages → nouvelles organisations et paysages transformés.',hint:'Utilise des flèches cause → conséquence.'}]}
    },
    exerciseContext:'Après ta réponse, situe le phénomène dans le temps et distingue ce qui relève d’un fait du cours de ce qui serait une généralisation abusive.',
    transfer:{title:'Transfert',prompt:'Compare ce village reconstitué à un campement nomade paléolithique : donne deux différences et explique ce qu’elles révèlent sur le mode de vie.'},
    misconception:['Présenter le Néolithique comme un basculement identique et simultané partout.','Parle de néolithisation : un processus progressif, avec plusieurs foyers et des rythmes différents selon les régions.'],
    finot:{steps:['Repère où et quand se situe le dossier.','Cherche les indices de production de nourriture.','Relie ces indices à la sédentarisation.','Distingue les faits du cours des détails inventés de la reconstitution.']}
  },
  'pc6f':{
    subject:'pc',grade:'6e',competency:'Calculer et comparer des vitesses dans le cas d’un mouvement uniforme avec v = d ÷ t.',
    provenance:{type:'simulation',label:'Mesures fictives créées pour MathQuest',refs:['Sciences et technologie cycle 3 — arrêté du 15 juin 2023, BO n°25 du 22 juin 2023','Programme 2023 : en 6e, calcul de la valeur de la vitesse à partir de la distance et de la durée pour un mouvement uniforme']},
    object:{title:'Quatre parcours à comparer',html:`<p>Quatre mobiles fictifs se déplacent chacun à vitesse uniforme.</p><table class="ptable"><tr><th>Mobile</th><th>Distance</th><th>Durée</th></tr><tr><td>A</td><td>80 m</td><td>16 s</td></tr><tr><td>B</td><td>90 m</td><td>15 s</td></tr><tr><td>C</td><td>100 m</td><td>25 s</td></tr><tr><td>D</td><td>120 m</td><td>20 s</td></tr></table><p class="muted small">Données simulées : elles ne correspondent à aucune mesure réelle.</p>`},
    levels:{
      1:{label:'Facile',questions:[{q:'Calcule la vitesse du mobile A en m/s.',a:'5 m/s',hint:'Utilise v = d ÷ t : 80 ÷ 16.'},{q:'Calcule la vitesse du mobile C en m/s.',a:'4 m/s',hint:'Divise la distance par la durée.'}]},
      2:{label:'Moyen',questions:[{q:'Quels mobiles sont les plus rapides ?',a:'B et D, tous deux à 6 m/s.',hint:'Calcule les quatre vitesses dans la même unité avant de comparer.'},{q:'Pourquoi ne peut-on pas décider seulement en regardant la plus grande distance ?',a:'Les durées sont différentes ; il faut comparer une distance parcourue par unité de temps.',hint:'Une distance seule ne dit pas combien de temps elle a demandé.'}]},
      3:{label:'Difficile',questions:[{q:'Le mobile E parcourt 210 m en 30 s. Classe E avec A, B, C et D du plus rapide au plus lent.',a:'E (7 m/s), puis B et D (6 m/s), A (5 m/s), C (4 m/s).',hint:'Calcule d’abord la vitesse de E, puis compare toutes les valeurs en m/s.'},{q:'Un élève affirme : « D est plus rapide que B parce qu’il parcourt 120 m au lieu de 90 m. » Réfute cette affirmation par un calcul.',a:'D : 120/20 = 6 m/s et B : 90/15 = 6 m/s ; ils ont la même vitesse.',hint:'Deux distances différentes peuvent correspondre à la même vitesse si les durées sont différentes.'}]}
    },
    exerciseContext:'Après ta réponse, écris mentalement v = d ÷ t et vérifie que distance et durée donnent bien l’unité de vitesse demandée.',
    transfer:{title:'Transfert',prompt:'Imagine deux trajets de durées différentes. Donne des distances qui conduisent pourtant à la même vitesse et explique comment tu le prouves.'},
    misconception:['Comparer uniquement les distances pour décider qui est le plus rapide.','Calcule ou ramène les déplacements à une même durée : une vitesse compare une distance parcourue par unité de temps.'],
    finot:{steps:['Repère la distance et la durée.','Vérifie leurs unités.','Calcule v = d ÷ t.','Compare uniquement des vitesses exprimées dans la même unité.']}
  }
};
window.MQChapterPacks={version:'1.1',packs};
})();
