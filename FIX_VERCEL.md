# 🔧 Solution : SQLite → PostgreSQL pour Vercel

## ❌ Le Problème

**SQLite ne fonctionne PAS sur Vercel** car Vercel est une plateforme **serverless**. SQLite nécessite un système de fichiers persistant, ce qui n'existe pas dans les fonctions serverless.

C'est pour ça que votre site ne charge pas les données (projets, services, témoignages) sur Vercel, alors que ça fonctionne en local.

## ✅ La Solution : PostgreSQL

Il faut utiliser **PostgreSQL** (ou MySQL) pour la production. Voici la solution la plus simple :

---

## 🚀 Option 1 : Vercel Postgres (Recommandé - Gratuit)

### 1. Créer la base de données sur Vercel

1. **Allez sur votre projet Vercel** : https://vercel.com/dashboard
2. Cliquez sur votre projet **"sonos-projects"**
3. Dans le menu de gauche, cliquez sur **"Storage"**
4. Cliquez sur **"Create Database"**
5. Choisissez **"Postgres"**
6. Choisissez un nom (ex: `sonos-db`)
7. Cliquez sur **"Create"**

### 2. Récupérer la connection string

1. Une fois créée, cliquez sur votre base de données
2. Allez dans l'onglet **".env.local"**
3. Copiez la ligne `POSTGRES_PRISMA_URL` (elle ressemble à : `postgresql://...`)

### 3. Configurer les variables d'environnement

1. Dans Vercel, allez dans **Settings** → **Environment Variables**
2. Mettez à jour `DATABASE_URL` avec la valeur de `POSTGRES_PRISMA_URL` que vous venez de copier
3. Gardez `NEXTAUTH_SECRET` et `NEXTAUTH_URL` comme avant
4. Cliquez sur **"Save"**

### 4. Migrer le schéma Prisma

**Sur votre ordinateur (dans Cursor)** :

1. **Changez le schéma Prisma** :
   - Ouvrez `prisma/schema.prisma`
   - Changez `provider = "sqlite"` en `provider = "postgresql"`
   - Sauvegardez

2. **Générez le client Prisma** :
   ```bash
   cd ~/Desktop/SONOS
   npx prisma generate
   ```

3. **Poussez les migrations** :
   ```bash
   # Configurez temporairement DATABASE_URL avec votre URL PostgreSQL de Vercel
   export DATABASE_URL="postgresql://..." # Collez votre URL de Vercel Postgres ici
   npx prisma db push
   ```

4. **Recréez l'admin** :
   ```bash
   npm run create-admin
   ```

5. **Ajoutez les données initiales** (optionnel) :
   ```bash
   npm run seed
   npm run seed-categories
   ```

### 5. Pousser sur GitHub

```bash
cd ~/Desktop/SONOS
git add .
git commit -m "Migration vers PostgreSQL"
git push origin main
```

### 6. Redéployer sur Vercel

Vercel va automatiquement redéployer. Attendez 1-2 minutes, puis vérifiez votre site !

---

## 🌟 Option 2 : Neon (PostgreSQL - Gratuit et Simple)

Si Vercel Postgres ne fonctionne pas, utilisez **Neon** :

### 1. Créer un compte Neon

1. Allez sur [neon.tech](https://neon.tech)
2. Créez un compte (gratuit)
3. Créez un nouveau projet
4. Copiez la **"Connection String"** (elle ressemble à : `postgresql://...`)

### 2. Configurer sur Vercel

1. Dans Vercel, allez dans **Settings** → **Environment Variables**
2. Mettez à jour `DATABASE_URL` avec votre URL Neon
3. Cliquez sur **"Save"**

### 3. Suivez les étapes 4-6 de l'Option 1

---

## ⚠️ Important

**Pour votre environnement local**, vous pouvez :
- **Soit** garder SQLite (changez `DATABASE_URL` dans votre `.env.local`)
- **Soit** utiliser la même base PostgreSQL (plus simple pour tester)

Si vous gardez SQLite en local :
- Créez un fichier `.env.local` avec :
  ```env
  DATABASE_URL="file:./dev.db"
  NEXTAUTH_URL="http://localhost:3000"
  NEXTAUTH_SECRET="votre-secret-local"
  ```
- Sur Vercel, `DATABASE_URL` pointe vers PostgreSQL
- Vous avez deux bases de données séparées (c'est normal)

---

## 🎯 Après la Migration

Une fois que PostgreSQL est configuré :
1. ✅ Votre site Vercel chargera les données correctement
2. ✅ L'admin fonctionnera sur Vercel
3. ✅ Les projets, services, témoignages s'afficheront

**Besoin d'aide ?** Suivez l'Option 1 étape par étape ! 🚀