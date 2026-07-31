# YouthSpeak Case 2026 — Site one-page (AIESEC)

Site promotionnel bilingue (FR/EN) pour l'événement **YouthSpeak Case** du **4 novembre 2026**.

Fichier unique et autonome : **`index.html`** (aucune dépendance à installer). Ouvre-le dans un navigateur, ou héberge-le (voir plus bas).

---

## ✅ Ce qui est inclus

- **Bilingue FR / EN** avec un sélecteur en haut à droite (mémorise le choix).
- **Décompte** en temps réel jusqu'au 4 novembre 2026, 14:00.
- **Formulaire d'inscription Tally** intégré (`tally.so/r/1Al9yl`).
- **Programme / agenda** de la journée (timeline).
- **FAQ** dépliable.
- **Section Instagram** `@aib_events` : 6 reels intégrés en rendu natif Instagram.
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
| ~~Prix~~ | ✅ **Fait** : participation 100% gratuite |
| ~~Horaires~~ | ✅ **Fait** : 4 nov 2026, 14h–18h (section `#agenda` + `EVENT.start`/`end`) |
| **Chiffres** (participants, équipes…) | attributs `data-count` dans la section stats (marqués `*` = indicatifs) |

> ℹ️ Le formulaire Tally utilisé est celui que tu m'as donné (`1Al9yl`). Si ce n'est **pas**
> le bon formulaire pour cet event, remplace `1Al9yl` par ton ID Tally (2 endroits : l'`iframe`
> et les liens).

---

## 📸 Section Instagram @aib_events

**Actuellement** : 6 reels d'`@aib_events` sont intégrés en **rendu Instagram natif** (script officiel
`embed.js`), dans le bloc `<div class="ig-embeds">` de la section `#insta`. Aucun compte requis.

### Changer / ajouter des reels
Dans `index.html`, section `#insta`, remplace ou ajoute des lignes du type :
```html
<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/CODE/" data-instgrm-version="14"></blockquote>
```
Remplace `CODE` par l'identifiant du post/reel (la partie après `/reel/` ou `/p/` dans l'URL,
sans le `?igsh=…`). Puis **redéploie** (voir plus bas).

### Vrai flux 100% automatique (optionnel)
Les embeds ci-dessus sont des posts choisis (ne se mettent pas à jour tout seuls). Pour un flux
qui affiche automatiquement les derniers posts, il faut un widget gratuit **connecté au compte
Instagram** (login requis) — ex. **Behold.so** ou **LightWidget** : crée le feed, puis colle son
snippet à la place du bloc `<div class="ig-embeds">…</div>`.

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
