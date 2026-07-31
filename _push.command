#!/bin/bash
cd "/Users/mertensdavid/Documents/Claude/Projects/RF Impact/youthspeak-case"
echo "== Push YouthSpeak Case vers GitHub =="
git add -A
git commit -m "maj site" 2>/dev/null || echo "(rien de nouveau à committer)"
git push -u origin main
echo ""
echo "Terminé. Tu peux fermer cette fenêtre."
read -n1 -r -p "Appuie sur une touche pour fermer..."
