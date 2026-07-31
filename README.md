# YouthSpeak Case 2026 — Site one-page (AIESEC)

Site promotionnel bilingue (FR/EN) pour l'événement **YouthSpeak Case** du **4 novembre 2026**.

Fichier unique et autonome : **`index.html`** (aucune dépendance à installer). Ouvre-le dans un navigateur, ou héberge-le (voir plus bas).

---

## ✅ Ce qui est inclus

- **Bilingue FR / EN** avec un sélecteur en haut à droite (mémorise le choix).
- **Décompte** en temps réel jusqu'au 4 novembre 2026, 13:00.
- **Formulaire d'inscription Tally** intégré (`tally.so/r/1Al9yl`).
- **Programme / agenda** de la journée (timeline).
- **FAQ** dépliable.
- **Section Instagram** `@aib_events` (flux auto à activer — voir plus bas).
- **Bonus** : ajout à l'agenda (Google Calendar + fichier `.ics`), compteurs animés,
  bandeau défilant, menu mobile, boutons de partage, design 100 % responsive,
  identité visuelle AIESEC (bleu #037EF3 + palette officielle).

---

## ✏️ À personnaliser AVANT publication

Tout est centralisé. Ouvre `index.html` et modifie le bloc **`const EVENT = {…}`**
(vers la fin, dans la balise `<script>`) :

```js
const EVENT = {
  start: new Date(2026, 10, 4, 13, 0, 0),  // 4 nov 2026 13:00  (mois = 10 car janvier = 0)
  end:   new Date(2026, 10, 4, 19, 30, 0),
  location: "ICE Louvain, Chemin du Cyclotron 6, 1348 Louvain-la-Neuve",
  ...
};
```

Les éléments **à confirmer** apparaissent en **jaune** sur le site (lieu, prix, horaires, chiffres).
Cherche le mot `confirm` / `À confirmer` dans le code, ou les libellés marqués `*` :

| Info | Où la changer |
|------|----------------|
| ~~Lieu / adresse~~ | ✅ **Fait** : ICE Louvain, Chemin du Cyclotron 6, 1348 LLN (section "Lieu" + carte Google Maps/Waze) |
| **Prix** (gratuit ?) | textes `hero_price`, `a2` |
| **Horaires** de la journée | section `#agenda` (HTML) + `EVENT.start`/`end` |
| **Chiffres** (participants, équipes…) | attributs `data-count` dans la section stats |

> ℹ️ Le formulaire Tally utilisé est celui que tu m'as donné (`1Al9yl`). Si ce n'est **pas**
> le bon formulaire pour cet event, remplace `1Al9yl` par ton ID Tally (2 endroits : l'`iframe`
> et les liens).

---

## 📸 Activer le flux Instagram automatique de @aib_events

Un site **statique ne peut pas** récupérer les posts Instagram directement : Instagram bloque
le scraping et impose son API Graph (avec token). La solution simple et gratuite = un **widget**.
Branchement en ~2 minutes :

### Option recommandée — LightWidget (gratuit)
1. Va sur **https://lightwidget.com** → « Create widget ».
2. Connecte / renseigne le compte **`aib_events`**, choisis une grille (4 colonnes conseillé).
3. Copie le code fourni (2 lignes : un `<iframe>` + un `<script>`).
4. Dans `index.html`, remplace tout le bloc `<div id="ig-fallback">…</div>`
   (à l'intérieur de `<div id="ig-feed">`) par ce code.

### Alternative — Behold.so (gratuit, plus moderne)
Même principe : https://behold.so → crée un feed pour `aib_events` → colle le snippet dans `#ig-feed`.

> Tant que le widget n'est pas branché, la section affiche 4 vignettes cliquables qui renvoient
> vers **instagram.com/aib_events** (repli propre, rien de cassé).

---

## 🚀 Mettre le site en ligne (gratuit)

Choisis l'un de ces hébergeurs, glisse-dépose le dossier :
- **Netlify** : https://app.netlify.com/drop (glisse le dossier, en ligne en 10 s)
- **Vercel** : https://vercel.com
- **GitHub Pages** : pousse le dossier dans un repo, active Pages.

Le site marche aussi en double-cliquant `index.html`, mais le formulaire Tally et le widget
Instagram se chargent mieux via une vraie URL (http/https).

---

## 🔗 Ressources utilisées
- Formulaire : https://tally.so/r/1Al9yl
- Instagram : https://www.instagram.com/aib_events/ · https://www.instagram.com/aieseclln/
- AIESEC : https://aiesec.org · https://aiesec.be
- Palette de couleurs : identité officielle AIESEC (bleu #037EF3, orange #F85A40, etc.)
