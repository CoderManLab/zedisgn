# Audit final — Optimized Original 2.0.0

Date : 13 octobre 2026. Variantes : catalogue et mono-produit.

## Conclusion

Nouveau socle écrit dans un répertoire vide. Aucun fichier Liquid, CSS ou JavaScript de Dawn/Horizon repris. Les polices sous OFL et leurs notices sont les seuls assets tiers importés. Aucun fichier source identique à ceux de l’ancien thème n’a été trouvé ; le journal de construction et la matrice de provenance complètent ce contrôle, qui ne constitue pas une expertise juridique indépendante.

## Résultats

- Shopify Theme Check sur les seuls fichiers destinés au storefront : **0 erreur, 0 avertissement**. Aucun check désactivé. Les snippets transformés du banc de test sont séparés du thème réellement distribué.
- **36 contrôles fonctionnels/régressions navigateur réussis**, sur sources Liquid originales et API simulées.
- axe WCAG A/AA : aucune violation dans les vues ordinateur et mobile testées, sans certifier tous les contenus/configurations futurs.
- Poids du JS/CSS original : **38,175 octets** non compressés, hors polices, images et runtime/apps Shopify. Les 20 fichiers de police sont embarqués, seuls les choix configurés sont déclarés. Aucun score Lighthouse de boutique réelle annoncé.
- Les **34 sections** ont aussi été rendues avec leurs paramètres par défaut dans le banc local.
- Dépendances du lockfile livré : **0 vulnérabilité connue** déclarée par npm audit à la date du contrôle (aucune dépendance exécutée sur le storefront).
- Archives : contrôle CRC, layout requis, schémas/templates, notices de polices et absence des fichiers de licence/runtime Dawn de l’ancien ZIP.

## Corrections effectuées pendant l’audit

| Problème | Correction | Vérification |
|---|---|---|
| Barre recherche dépassant sur mobile | Min-width/largeur flexible corrigés | Absence de débordement à 390 px |
| Prix secondaire peu contrasté pendant la transition | Texte secondaire renforcé, apparition sans fondu d’opacité | axe ordinateur et mobile |
| SVG simple sans attribut fill donnant un bloc opaque | Valeurs par défaut none/currentColor, allowlist sans scripts/événements | DOM contrôlé et inspection visuelle |
| Personnalisation obligatoire composée d’espaces | Validation trim avant la requête et reset à la saisie | Validation de formulaire et mutation bornée |
| Variante inexistante affichant potentiellement un prix nul | Message de sélection quand aucune variante n’est résolue | Source Liquid et Theme Check |
| Réponses réseau non bornées | Lecture streaming plafonnée, abort couvrant corps de réponse | Source auditée ; API erreur couverte |
| Consentement en délai dépassé pouvait autoriser des requêtes concurrentes | Contrôles conservés bloqués jusqu’au callback/rechargement | Mode API indisponible testé |
| Affectation A/B persistante après refus | Suppression des clés du thème lors de révocation | Deux variantes rétablies après refus |
| Formulaire localisation inutile avec une seule langue/un seul pays | Affichage conditionnel | Rendu local et Theme Check |
| Déclaration des polices statiques comme variables | Poids déclarés selon manifest d’origine | Manifest et notices conservés |

## Sécurité examinée

- Noms produits, propriétés panier, recherches et réponses FAQ rendus comme texte/échappés. Contenus richtext administrateur explicitement privilégiés.
- SVG limité à des éléments/attributs de dessin ; scripts, event handlers, liens, styles et références URL supprimés.
- Requêtes Shopify limitées à la même origine, pas de token Admin ni secret livré. Mutations panier sans répétition automatique. Une erreur réseau incertaine renvoie vers une vérification du panier.
- Prix/stocks/taxes/remises/checkout restent sous l’autorité Shopify. Un minuteur ne réserve ni stock ni prix.
- Stockage local des listes seulement après choix explicite ; nettoyage possible. Pas de service IA, tracker ou requête analytics externe ajouté par le thème. Les applications tierces restent hors du périmètre de contrôle.
- Audit des outils de développement : voir `verification/source-toolchain-audit.json`. Les dépendances sont exclues des ZIPs Shopify.

## Liste des contrôles navigateur

- Large-variant fixture never serializes full variant catalogue
- Server-rendered option URLs select full option value IDs
- Cart line properties escaped in actual original Liquid
- SVG allowlist removes scripts/event attributes and no fixture XSS runs
- Required personalization prevents network mutation
- Whitespace-only required personalization cannot be submitted
- Double submit produces exactly one add with personalization and count refresh
- Ajax drawer escapes product names and cart properties
- Drawer update and checkout remain native Shopify POST forms
- Native modal closes with Escape
- Stock rejection stays visible as text and exposes verification link
- Read failure after a successful mutation does not replay the add
- Favorites are tab-local until explicit persistence preference
- Opted-in favorites persist across reload
- User can delete local lists and preference
- Comparison is bounded to four products
- Local FAQ finds merchant-configured shipping answer
- Unknown question produces factual fallback
- WhatsApp target is constructed from digits and encoded message
- Reject denies every optional Shopify consent category
- Custom preferences call the Shopify consent authority
- A/B editorial selects one variant after analytics consent
- Consent revocation restores both neutral editorial variants
- Analytics revocation deletes local A/B assignments
- Cart reminder is stable across reload and never reserves/deletes cart
- Invalid deadline is hidden and expired campaign never restarts
- Reduced-motion control disables movement
- Mono-product mobile fixture has one native product form and no page overflow
- Mobile navigation opens and closes with keyboard
- Unavailable variant cannot be added
- Desktop fixture has no axe WCAG A/AA violations
- Mobile fixture has no axe WCAG A/AA violations
- No JavaScript errors across tested flows
- Editor diagnostic API is not exposed to storefront visitors
- Unavailable privacy API cannot falsely claim successful consent
- Without JavaScript, variant links/native cart forms and mobile content remain accessible

## Limites et recette obligatoire sur Shopify

Les formulaires et objets Liquid ont été testés localement avec substitutions explicites des balises propres à Shopify. Les API panier et consentement ont été simulées. Aucun paiement réel, thème publié, navigation Admin, mécanisme anti-bot Shopify, intégration d’app, sélection de marchés réelle ou avis de sécurité indépendant n’a été testé.

Avant commercialisation : importer chaque ZIP comme thème brouillon ; configurer les données ; tester disponibilité/quantité/variantes, toutes les pages, consentement dans la région pertinente, applications et un checkout/une commande de test. Vérifier les états sans JavaScript et les contenus dans les langues proposées. Le thème n’est pas déclaré certifié sans bug, invulnérable ou conforme RGPD par ce rapport.

Cette version remplace le socle, elle ne doit pas recevoir automatiquement les anciens réglages Dawn. Les fichiers commerciaux en brouillon devront être alignés sur ce périmètre et sur la recette Shopify réelle avant mise en vente.
