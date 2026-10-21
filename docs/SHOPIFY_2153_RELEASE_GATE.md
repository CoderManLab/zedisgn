# V2.15.3 — préparation de publication Shopify

**Statut : candidat correctif, non commercialisé et non publié.**

Dernière version vérifiée dans les thèmes Shopify brouillons : **V2.15.2**. Les versions installées dans PELUSAFE et SETUPLOOM restent inchangées dans leurs métadonnées tant que les essais finaux n'ont pas réussi.

## Modifications réalisées dans les deux brouillons
- Réorganisation des options de la fiche produit : offres quantitatives → couleurs/variantes → quantité → bouton d'achat.
- Barre d'achat produit unique : ajouter au panier et acheter maintenant, indépendamment de l'ancien paramètre global.
- Nouveau positionnement du partage à côté des boutons Favori/Comparer.
- Barre panier mobile indépendante, ajoutée au modèle Panier et non au pied de page.
- Barres produit compactées, avec visibilité conditionnée au défilement au-delà du bouton principal.
- Ajustements des cartes de réassurance.

## Éléments vérifiés
- Connecteur Shopify : les écritures sur les deux brouillons ont réussi, aucune mise en production des thèmes.
- Contrôles de code et d'ordre du DOM sur les deux brouillons.
- 16 vérifications responsive **sur fixture Chromium locale**, tailles 320, 375, 390, 430, 768, 1024, 1440, 1920.
- Les fixtures ne sont **pas** des captures authentiques des pages Shopify et ne valident pas le checkout.

## Bloquants avant publication comme V2.15.3
1. Contrôle du rendu réel Shopify sur smartphone et ordinateur.
2. Test d'une variante disponible, d'un ajout panier réel et d'un achat express sans commande payante.
3. Contrôle de la sticky panier et du total après modification des quantités.
4. Vérification du bouton « procéder au paiement » dans le parcours autorisé.
5. Export des ZIP synchronisés depuis les dernières sources des brouillons, test Theme Check et comparaison des personnalisations.
6. Mise à jour des guides et versions internes uniquement une fois la recette complète.

**Règle :** les pages ZEDESIGN conservent V2.15.2 comme version de référence tant que cette liste n'est pas validée.
