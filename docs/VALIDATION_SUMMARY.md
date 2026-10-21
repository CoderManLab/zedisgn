# ZEDESIGN V3 — Résumé de validation

## Modifications proposées

- Catalogues détaillés, filtrables et dépliables en HTML natif pour les deux pages commerciales.
- Aperçus schématiques visuellement différenciés, entourés d'un halo cyan subtil.
- Partage natif et menu alternatif avec copie du lien.
- Reprise d'un fichier de logo CR’FT.ai provenant de son dépôt source.
- Ajustements de présentation sur les cartes du portfolio.
- Matrice JSON initialisée sans inventer de résultats de test.

## Contrôles à réaliser

- Exécuter `python3 scripts/check_v3_catalog.py` et `node --check catalog-v3.js`.
- Test manuel du partage mobile (Web Share API) et du fallback desktop.
- Tests responsive sur la version preview, recherche des chevauchements flottants.
- Vérifier les logos manquants avant de les annoncer comme officiels.
- Comparer les données commerciales aux véritables thèmes et versions publiées.

## Déploiement

Les changements sont proposés sur branche dédiée ; pas de déploiement volontaire en production avant revue.

## Complément — 21 octobre 2026

- Vérification de la version 2.15.2 dans les deux archives et thèmes Shopify non publiés.
- Mise à jour du numéro de version dans les fiches commerciales.
- Intégration de l’emblème SVG officiel ZMI, copie fidèle du kit `ZMI-Logos-Officiels.zip`.
- Reprise du monogramme `d.` utilisé dans l’en-tête du site Le Déclic Économies.
- Les logos originaux DDR, SYRNAX et Savage Horizon ont été localisés dans les archives, mais ne sont pas encore importés comme fichiers graphiques dans cette branche.
