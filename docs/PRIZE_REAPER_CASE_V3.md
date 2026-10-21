# ZEDESIGN — Prize Reaper V3 : démonstration de l'interface

## Objectif
Mettre en valeur la conception du produit sans exposer les données du dépôt privé et sans présenter une simulation comme une application fonctionnelle publique.

## Livrables de ce lot
- 3 vues interactives statiques : détection, qualification, fiabilité.
- Boutons accessibles au clavier, `aria-pressed` et `aria-controls`, états `hidden` synchronisés.
- Mise en page responsive, sans service externe, sans secret ni tracking supplémentaire.
- Page projet existante et SEO inchangés, pas de nouvelle route.
- Vérification de structure automatisée à coût réduit (stdlib Python, 1 job GitHub).

## Règles de présentation
- Mention visible « démonstration », « simulation » et absence de données réelles.
- Aucun compteur présenté comme un résultat mesuré de production.
- Aucun lien vers une participation réelle, aucune publication d'un compte utilisateur.
- Présenter les bénéfices du design sans promettre d'éligibilité ou d'automatisation.

## Suite du backlog
1. Comparer visuellement le rendu sur Chrome mobile et desktop ; vérifier le menu, le sticky header, les flottants et les préférences de mouvement.
2. Si la maquette 3D originale est publiée dans les assets, utiliser une variante WebP compressée, dimensionnée, avec la version SVG comme fallback ; ne pas augmenter inutilement le poids de page.
3. Page « Réalisations » : vérifier les filtres plate-forme / identité et le comportement au clic de la carte.
4. Mesurer les Core Web Vitals et les contrastes réellement, puis corriger si les résultats le justifient.
5. Lier les étapes du blueprint du bot seulement à des états confirmés et publics, sans révéler de données privées.

## Terminé pour V3 si
Tous les fichiers locaux sont résolus, les trois onglets fonctionnent avec une souris et un clavier, la présentation reste cohérente au mobile, et la CI statique est verte.
