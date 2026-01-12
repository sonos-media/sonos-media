# 🔄 Guide de Mise à Jour - Sonos Media

## 🎯 Workflow Simple : Cursor → GitHub → Vercel

### Configuration Initiale (Une seule fois)

#### 1. Créer un repo GitHub

1. Allez sur [github.com](https://github.com) et créez un compte (si pas déjà fait)
2. Cliquez sur "New repository"
3. Nom : `sonos-media`
4. Visibilité : **Private** (recommandé)
5. Ne cochez rien d'autre
6. Cliquez sur "Create repository"

#### 2. Connecter votre projet à GitHub

Dans le terminal de Cursor :

```bash
# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - Sonos Media"

# Connecter à GitHub (remplacez VOTRE_USERNAME)
git remote add origin https://github.com/VOTRE_USERNAME/sonos-media.git

# Pousser le code
git branch -M main
git push -u origin main
```

**Note :** GitHub vous demandera de vous connecter la première fois.

#### 3. Déployer sur Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "Sign Up" → Connectez-vous avec GitHub
3. Cliquez sur "New Project"
4. Sélectionnez votre repo `sonos-media`
5. Cliquez sur "Import"

**Configurez les variables d'environnement :**
- Cliquez sur "Environment Variables"
- Ajoutez :

```
DATABASE_URL = postgresql://...  (votre base de données production)
NEXTAUTH_SECRET = [Générez avec: openssl rand -base64 32]
NEXTAUTH_URL = https://votre-projet.vercel.app
```

6. Cliquez sur "Deploy" 🚀

**C'est fait !** Votre site est en ligne ! 🎉

---

## 🔄 Faire des Mises à Jour (Workflow quotidien)

### Méthode Simple (Recommandée)

Après avoir modifié votre code dans Cursor :

#### Option A : Interface Graphique de Cursor

1. **Ouvrez le panneau Source Control** (icône à gauche)
2. **Voyez vos modifications** listées
3. **Écrivez un message** (ex: "Ajout de nouvelles vidéos")
4. **Cliquez sur ✓ Commit**
5. **Cliquez sur "Sync Changes"** (ou l'icône ☁️)

**C'est tout !** Vercel détecte automatiquement et déploie en 1-2 minutes ! 🚀

#### Option B : Terminal

```bash
# 1. Voir les modifications
git status

# 2. Ajouter les fichiers modifiés
git add .

# 3. Créer un commit avec un message
git commit -m "Description de vos modifications"

# 4. Pousser vers GitHub
git push
```

**Vercel déploie automatiquement !** ✨

---

## 📱 Suivre le Déploiement

1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Cliquez sur votre projet
3. Vous voyez l'état du déploiement en temps réel
4. Quand c'est vert ✅ → Votre site est à jour !

---

## 🎨 Exemples de Mises à Jour Courantes

### Ajouter une nouvelle catégorie
1. Modifiez dans l'admin en ligne
2. Rien à faire ! C'est dans la base de données

### Changer le design
1. Modifiez les fichiers CSS/Tailwind dans Cursor
2. Commit → Push
3. Vercel redéploie automatiquement

### Ajouter une nouvelle page
1. Créez le fichier dans `app/`
2. Commit → Push
3. Vercel redéploie automatiquement

---

## 🚨 En Cas de Problème

### Le déploiement échoue ?

1. **Vérifiez les logs sur Vercel**
   - Allez dans votre projet → Deployments
   - Cliquez sur le déploiement qui a échoué
   - Lisez les erreurs

2. **Erreurs communes :**

   **"Build failed"** → Vérifiez que le code compile localement :
   ```bash
   npm run build
   ```

   **"Database error"** → Vérifiez `DATABASE_URL` dans Vercel

   **"Module not found"** → Réinstallez les dépendances :
   ```bash
   npm install
   git add package-lock.json
   git commit -m "Update dependencies"
   git push
   ```

### Annuler une mise à jour

1. Allez sur Vercel → Deployments
2. Trouvez un déploiement précédent qui fonctionnait
3. Cliquez sur "..." → "Promote to Production"

---

## 🎯 Workflow Recommandé

### Avant de pousser en production :

1. **Testez localement** (`npm run dev`)
2. **Vérifiez que tout fonctionne**
3. **Commit et push**
4. **Vérifiez le déploiement sur Vercel**
5. **Testez le site en ligne**

### Branches (Optionnel mais recommandé)

Pour tester sans affecter le site en production :

```bash
# Créer une branche de test
git checkout -b test-nouvelle-feature

# Faire vos modifications
# ...

# Commit et push
git add .
git commit -m "Test nouvelle feature"
git push origin test-nouvelle-feature
```

Vercel créera automatiquement une **preview URL** pour tester !

Quand tout est OK :
```bash
# Retour sur main
git checkout main

# Fusionner
git merge test-nouvelle-feature

# Pousser en production
git push
```

---

## 📊 Base de Données Production

### Option 1 : Neon (PostgreSQL - Recommandé)

1. Allez sur [neon.tech](https://neon.tech)
2. Créez un compte (gratuit)
3. Créez un projet
4. Copiez la "Connection String"
5. Collez-la dans `DATABASE_URL` sur Vercel

**Avantages :**
- ✅ Gratuit jusqu'à 10 GB
- ✅ Backups automatiques
- ✅ Très rapide
- ✅ Compatible Prisma

### Option 2 : PlanetScale (MySQL)

1. Allez sur [planetscale.com](https://planetscale.com)
2. Même principe que Neon

### Migrer de SQLite vers PostgreSQL

```bash
# 1. Changez dans schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

# 2. Générez les migrations
npx prisma db push

# 3. Recréez l'admin
npm run create-admin

# 4. Commit et push
git add .
git commit -m "Migration vers PostgreSQL"
git push
```

---

## 🎓 Commandes Git Essentielles

```bash
# Voir l'état
git status

# Voir les modifications
git diff

# Ajouter tous les fichiers
git add .

# Ajouter un fichier spécifique
git add chemin/vers/fichier.tsx

# Commit
git commit -m "Votre message"

# Pousser vers GitHub
git push

# Récupérer les dernières modifications (si vous travaillez sur plusieurs machines)
git pull

# Voir l'historique
git log

# Annuler les modifications non commitées
git checkout .
```

---

## ✅ Checklist de Mise à Jour

Avant chaque push :

- [ ] Le code compile localement (`npm run dev`)
- [ ] Pas d'erreurs dans la console
- [ ] Les nouvelles fonctionnalités fonctionnent
- [ ] Message de commit descriptif
- [ ] Variables d'environnement à jour sur Vercel (si nécessaire)

---

## 🆘 Support

Si vous avez un problème :

1. **Vérifiez les logs Vercel**
2. **Testez localement** avec les mêmes variables d'environnement
3. **Consultez la documentation** : [vercel.com/docs](https://vercel.com/docs)

---

## 🎉 Résumé Ultra-Simple

**Pour mettre à jour votre site :**

1. Modifiez dans Cursor
2. Panneau Source Control → Commit
3. Sync Changes
4. Attendez 1-2 minutes
5. C'est en ligne ! ✨

**C'est aussi simple que ça !** 🚀
