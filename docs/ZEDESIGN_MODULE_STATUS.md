# ZEDESIGN V3 — Matrice de vérification

**Périmètre de conception : approuvé par le propriétaire.** Cela ne constitue pas une validation technique ni une preuve que la fonctionnalité est intégrée à un fichier ZIP distribué.

Inventaire : **60 lignes**, un enregistrement distinct par thème et par module. Source structurée : `data/module-status.json`.

## Règles de validation

Un module ne passe à `valide` qu'après identification de sa source, référence du commit et de la version, essai fonctionnel, contrôles desktop et mobile, et conservation des preuves. `non_audite` est la valeur initiale de tous les modules dans la présente branche : le code des thèmes Shopify n'est pas stocké dans le dépôt ZEDESIGN.

## Dépendances

- Confirmer la version de chaque ZIP de thème (les fiches ZEDESIGN affichent V2.13.0, les propriétés structurées V2.11.0).
- Examiner les sources des thèmes Shopify et, avec autorisation, les boutiques de démonstration SETUPLOOM et PELUSAFE.
- Compléter les champs `source_files`, `theme_version`, `tests`, `evidence` et `last_checked_at` sans inventer de preuves.
- Marquer séparément la disponibilité dans la version remise aux clients.

## Éléments effectivement vérifiables dans ZEDESIGN

- Les pages HTML contiennent les nouveaux catalogues de modules et les boutons de partage.
- Les fichiers CSS/JS du catalogue sont locaux et versionnés.
- Le logo CR’FT.ai est repris des fichiers du dépôt source `CoderManLab/crft-ai`.
- Le logo Prize Reaper préexistant `assets/prize-reaper-mark.svg` est conservé.

L'ajout des autres logos officiels dépend de la mise à disposition de leurs fichiers source.
