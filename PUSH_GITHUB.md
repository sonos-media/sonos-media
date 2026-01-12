# 🚀 Comment pousser le code sur GitHub

## Méthode 1 : GitHub Desktop (Recommandé)

1. Ouvrez **GitHub Desktop**
2. Si le projet n'est pas ouvert, allez dans **File → Add Local Repository**
3. Sélectionnez le dossier `/Users/kurt/Desktop/SONOS`
4. Vous devriez voir le commit "Migration vers PostgreSQL avec Supabase"
5. Cliquez sur **"Push origin"** en haut

## Méthode 2 : Nouveau Token GitHub

1. Allez sur : https://github.com/settings/tokens
2. Cliquez sur **"Generate new token"** → **"Generate new token (classic)"**
3. Donnez-lui un nom (ex: "sonos-media")
4. Cochez **"repo"** (permissions complètes)
5. Cliquez sur **"Generate token"**
6. **Copiez le token** (vous ne pourrez pas le revoir !)

Dans le terminal :
```bash
cd ~/Desktop/SONOS
git remote set-url origin https://VOTRE_NOUVEAU_TOKEN@github.com/sonos-media/sonos-media.git
git push origin main
```

Remplacez `VOTRE_NOUVEAU_TOKEN` par le token que vous avez copié.

## ⚠️ Important

**Une fois le code poussé**, Vercel va automatiquement redéployer avec le bon code PostgreSQL et votre site fonctionnera ! 🎉