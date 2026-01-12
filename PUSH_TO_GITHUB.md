# 🚀 Pousser votre code sur GitHub

## Méthode Simple : GitHub Desktop (Recommandé)

### 1. Télécharger GitHub Desktop
- Allez sur [desktop.github.com](https://desktop.github.com)
- Téléchargez et installez

### 2. Se connecter
- Ouvrez GitHub Desktop
- File → Options → Accounts → Sign in to GitHub.com
- Connectez-vous avec vos identifiants

### 3. Ajouter votre projet
- File → Add Local Repository
- Choisissez `/Users/kurt/Desktop/SONOS`
- Cliquez sur "Add Repository"

### 4. Publier sur GitHub
- Cliquez sur "Publish repository"
- Nom : `sonos-media`
- Décochez "Keep this code private" si vous voulez public
- Cliquez sur "Publish Repository"

**C'est fait ! Votre code est sur GitHub ! 🎉**

---

## Alternative : Ligne de commande avec Token

### 1. Créer un Personal Access Token

1. Allez sur GitHub → Settings (en haut à droite)
2. Developer settings (tout en bas à gauche)
3. Personal access tokens → Tokens (classic)
4. Generate new token (classic)
5. Note : "Sonos Media Deploy"
6. Cochez : `repo` (tous les sous-éléments)
7. Generate token
8. **COPIEZ LE TOKEN** (vous ne le reverrez plus !)

### 2. Pousser avec le token

```bash
cd /Users/kurt/Desktop/SONOS

# Supprimer l'ancien remote
git remote remove origin

# Ajouter avec votre username et token
git remote add origin https://VOTRE_TOKEN@github.com/sonos-media/sonos-media.git

# Pousser
git push -u origin main
```

**Remplacez `VOTRE_TOKEN` par le token que vous avez copié**

---

## Alternative : GitHub CLI

### 1. Installer GitHub CLI

```bash
brew install gh
```

### 2. Se connecter

```bash
gh auth login
```

Suivez les instructions (choisissez HTTPS, login via browser)

### 3. Pousser

```bash
cd /Users/kurt/Desktop/SONOS
gh repo create sonos-media --public --source=. --remote=origin --push
```

---

## ✅ Vérifier que ça a marché

Allez sur : https://github.com/sonos-media/sonos-media

Vous devriez voir tous vos fichiers ! 🎉

---

## 🔄 Prochaines fois (après la première)

Avec GitHub Desktop :
1. Ouvrez GitHub Desktop
2. Voyez vos modifications
3. Écrivez un message
4. Cliquez sur "Commit to main"
5. Cliquez sur "Push origin"

Ou en ligne de commande :
```bash
git add .
git commit -m "Votre message"
git push
```

---

## 🆘 Besoin d'aide ?

La méthode la plus simple est **GitHub Desktop**. C'est visuel et ça marche à tous les coups ! 😊
