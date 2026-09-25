# YouthSpeak Case 2026 - site de l'événement (AIESEC)

Site d'une page pour **YouthSpeak Case**, le case challenge étudiant d'AIESEC, le **4 novembre 2026**
de 14 h à 18 h aux **Auditoires Agora** (Agora 11 Hall et Agora 1), Place Agora, 1348 Louvain-la-Neuve.
Participation gratuite. Conçu par [Scribeo](https://scribeo.be).

HTML, CSS et JavaScript écrits à la main, dans `index.html`. Aucune dépendance, aucune étape de build.

## En ligne

- Adresse : **https://youthspeakcase.com**. `www.youthspeakcase.com` redirige en 301 vers le domaine nu
  (enregistrement proxifié et règle de redirection Cloudflare), http redirige vers https.
- Hébergement : projet **Cloudflare Pages `youthspeak-case`**, compte principal Scribeo, relié à ce dépôt.
  **Chaque push sur `main` met le site en ligne** en moins d'une minute. Adresse de secours :
  https://youthspeak-case.pages.dev
- Une adresse inconnue répond un vrai 404 (`404.html`).

## Structure

```
index.html              toute la page : contenu, style, scripts, textes FR et EN (data-i18n)
404.html                page d'erreur
offline.html            page affichée hors connexion
manifest.webmanifest    manifeste de l'app (id, standalone, icônes any et maskable, 3 raccourcis)
sw.js                   service worker : pages réseau d'abord, images cache d'abord
icons/                  icônes de l'app
img/og-youthspeak-case.jpg   image de partage 1200 x 630 (réseaux sociaux, JSON-LD)
img/team/               photos de l'équipe (voir img/team/LISEZ-MOI.txt)
outputs/, qr-*.png      QR codes vers le site
robots.txt, sitemap.xml, llms.txt   fichiers de découverte
```

## Modifier le contenu

- **Date, heures, lieu** : bloc `const EVENT = {…}` en bas de `index.html` (sert au décompte et à l'ajout
  à l'agenda), à répercuter dans le texte de la page, le JSON-LD `Event` en tête de fichier, l'image de
  partage et `llms.txt`.
- **Inscription** : formulaire Google Forms, lien présent 4 fois dans `index.html` (chercher
  `docs.google.com/forms`).
- **Chiffres** (participants, équipes, jurys) : attributs `data-count` de la section stats. Ceux marqués
  `*` sont indicatifs.
- **Textes FR et EN** : chaque texte traduit porte un `data-i18n` ; les deux versions sont dans le
  dictionnaire du script, en bas de `index.html`.
- **Instagram** : reels intégrés dans le bloc `<div class="ig-embeds">` de la section `#insta`. Pour en
  changer, remplacer le code après `/reel/` dans `data-instgrm-permalink`.
- **Image de partage** : `img/og-youthspeak-case.jpg`, reprise des couleurs du site (dégradé violet,
  bleu AIESEC, turquoise, pastille orange). Si la date ou le lieu changent, la refaire au même format et
  garder le même nom de fichier.

Après chaque livraison, **changer `VERSION` dans `sw.js`**, sinon les visiteurs qui ont installé l'app
gardent l'ancienne version.

## À savoir

- Pages publie tout le dépôt : `README.md`, `wrangler.jsonc` ou `.gitignore` sont lisibles en ligne
  (`.assetsignore` ne sert qu'aux Workers, Pages l'ignore). Rien de secret ici ; ne jamais y ajouter de
  clé ou de donnée personnelle.
- `wrangler.jsonc` et `.assetsignore` décrivent un ancien Worker `youthspeak-case` sur le compte
  Cloudflare dfp-ahmed, qui sert encore une copie du site sur youthspeak-case.dfp-ahmed.workers.dev.
  Ce n'est pas lui qui sert le domaine. Suppression à décider.

## Journal des modifications

La plus récente en haut.

### 2026-09-25 (en ligne : `ysc-v11`)
- Photos de l'équipe appelées avec `?v=2` : les images sont mises en cache 4 heures (navigateur,
  Cloudflare, service worker), les anciennes restaient affichées. À chaque remplacement d'image sous
  le même nom, incrémenter ce numéro.
- Équipe : les quatre photos remplacées par des portraits illustrés, recadrés en carré sur le visage
  (tête et haut des épaules), 600 x 600, mêmes noms de fichiers dans `img/team/`.
- Section Speakers : les trois cartes provisoires (« À confirmer ») sont remplacées par Robin Guérit,
  conseiller académique et développeur de Piccolo, l'intelligence artificielle de l'UCLouvain
  (photo dans `img/speakers/robin-guerit.jpg`). Chapeau de section sans mention « provisoire ».
- FAQ « Qui sont les speakers ? » : Robin Guérit (elle répondait Chiara Ahmed).
- JSON-LD `Event` : Robin Guérit ajouté en `performer`.

### 2026-09-24 (en ligne : `ysc-v7`)
- Correctif urgent : « Installer l'app » restait visible sur ordinateur, la règle CSS
  `.nav-install{display:flex}` l'emportait sur l'attribut `hidden`. Ajout de `.nav-install[hidden]{display:none}`.
- Texte d'aide iPhone retiré des traductions (il n'était plus affiché).
- « Installer l'app » n'apparaît plus dans le menu que sur Android, quand le navigateur propose
  l'installation (règle Scribeo). Plus de bouton sur ordinateur, plus d'indication dans le menu sur iPhone.
- Image de partage 1200 x 630 hébergée sur le site : og:image visait logos.aiesec.org, une page HTML,
  et aucun partage n'affichait de vignette. Balises Twitter ajoutées, même image dans le JSON-LD.
- `www.youthspeakcase.com` créé et redirigé en 301 vers le domaine nu.
- README réécrit (il décrivait Tally, ICE Louvain et des hébergeurs jamais utilisés), `_push.command`
  supprimé (il visait un dossier disparu), commentaire de date corrigé dans `index.html`.

### 2026-09-23
- Fichiers de découverte (robots.txt, sitemap.xml, llms.txt, JSON-LD Event), kit app (manifeste,
  service worker, page hors ligne, bouton Installer), vrai 404, adresse canonique sur youthspeakcase.com,
  en-tête mobile allégé.
