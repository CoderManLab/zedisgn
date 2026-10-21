# Audit des versions — 21 octobre 2026

| Thème | Code du ZIP vérifié | Shopify — thème de travail | Publication Shopify |
|---|---|---|---|
| Mono Produit / PELUSAFE | 2.15.2 | `PELUSAFE · Mono produit · 2.15.2` | NON PUBLIÉ |
| Optimized / SETUPLOOM | 2.15.2 | `SETUPLOOM · Optimized · 2.15.2` | NON PUBLIÉ |

## Preuves

- Archives retrouvées dans les fichiers du projet : `PELUSAFE-Mono-produit-V2.15.2-Shopify.zip`, `SETUPLOOM-Optimized-V2.15.2-Shopify.zip`.
- CRC des deux ZIP : valide ; `config/settings_schema.json` annonce `theme_version: "2.15.2"`.
- Connexion Shopify PELUSAFE : `gid://shopify/OnlineStoreTheme/208305389900`, fichier `config/settings_schema.json` lu depuis le thème non publié, version interne 2.15.2.
- Connexion Shopify SETUPLOOM : `gid://shopify/OnlineStoreTheme/195066790253`, même vérification, version interne 2.15.2.
- Les thèmes publics actuels restent `Helio` (PELUSAFE) et `Horizon` (SETUPLOOM).

## Conséquence

Les mentions commerciales ZEDESIGN anciennement en V2.13.0 et données structurées V2.11.0 ont été harmonisées sur les fiches concernées en V2.15.2, sans prétendre que les thèmes sont publiés. Les anciens guides PDF V2.11.0 restent des documents historiques : leur édition ne constitue pas une preuve de version ni ne doit être renommée sans mise à jour réelle.

## Limite

L'identifiant et la version interne d'un thème attestent sa présence dans Shopify, mais ne remplacent pas les tests d'achat sur chaque boutique, la vérification des fonctionnalités ni la comparaison binaire exhaustive des ZIP.
