# 🚀 Configuration Supabase - Étapes Finales

## ✅ Étape 1 : Variables d'environnement sur Vercel

1. **Sur la page Supabase** (celle que vous voyez actuellement) :
   - Dans l'onglet **".env.local"**, trouvez la ligne `POSTGRES_PRISMA_URL`
   - Cliquez sur **"Copy Snippet"** ou copiez manuellement cette ligne

2. **Dans Vercel** :
   - Allez dans **Settings** → **Environment Variables**
   - Trouvez ou créez `DATABASE_URL`
   - Collez la valeur de `POSTGRES_PRISMA_URL` (celle que vous venez de copier)
   - Cliquez sur **"Save"**

## ✅ Étape 2 : Générer Prisma Client

Dans Cursor (terminal) :

```bash
cd ~/Desktop/SONOS
npx prisma generate
```

## ✅ Étape 3 : Pousser les migrations vers Supabase

**IMPORTANT** : Vous devez temporairement configurer `DATABASE_URL` avec votre URL Supabase :

```bash
# Remplacez cette URL par votre POSTGRES_PRISMA_URL de Supabase
export DATABASE_URL="postgres://postgres.njonrdcypcroclnjwcqq:UYEn0iMfMdWP4PBv@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require"

# Poussez les migrations
npx prisma db push

# Recréez l'admin
npm run create-admin

# Ajoutez les données initiales (optionnel)
npm run seed
npm run seed-categories
```

## ✅ Étape 4 : Pousser sur GitHub

```bash
cd ~/Desktop/SONOS
git add .
git commit -m "Migration vers PostgreSQL avec Supabase"
git push origin main
```

## ✅ Étape 5 : Vérifier le déploiement

Vercel va automatiquement redéployer. Attendez 1-2 minutes, puis :
- Allez sur votre site Vercel
- Vérifiez que les données se chargent correctement
- Connectez-vous à `/admin` pour tester

---

**Besoin d'aide ?** Suivez les étapes une par une ! 🎯