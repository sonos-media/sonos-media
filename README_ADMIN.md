# 🎛️ Système d'Administration - Sonos Media

Votre site dispose maintenant d'un **système d'administration complet** pour gérer le contenu directement depuis le navigateur !

## 🚀 Démarrage Rapide

### 1. Créer votre compte administrateur

```bash
npm run create-admin
```

Par défaut :
- **Email** : `admin@sonosmedia.fr`
- **Mot de passe** : `admin123`

⚠️ **Changez le mot de passe après la première connexion !**

### 2. Initialiser les données par défaut (optionnel)

```bash
npm run seed
```

Cela créera les services et témoignages par défaut dans la base de données.

### 3. Accéder à l'administration

1. Démarrez le serveur :
   ```bash
   npm run dev
   ```

2. Allez sur : **http://localhost:3000/admin**

3. Connectez-vous avec vos identifiants

## ✨ Fonctionnalités

### 📁 Gestion des Projets
- Créer, modifier, supprimer des projets
- Catégories : Restaurant, Auto, BTP, Corporate
- Ajouter des images, descriptions, livrables

### 🎯 Gestion des Services
- Créer, modifier, supprimer des services
- Réorganiser l'ordre d'affichage
- Ajouter des icônes et fonctionnalités

### 💬 Gestion des Témoignages
- Créer, modifier, supprimer des témoignages
- Réorganiser l'ordre d'affichage
- Gérer les catégories

## 🔒 Sécurité

- Authentification avec NextAuth.js
- Mots de passe hashés avec bcrypt
- Routes protégées automatiquement
- Sessions sécurisées

## 📝 Structure

- **Base de données** : SQLite (fichier `dev.db`)
- **API Routes** : `/app/api/*`
- **Interface Admin** : `/app/admin/*`
- **Authentification** : NextAuth.js

## 🛠️ Configuration

Créez un fichier `.env` avec :

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-cle-secrete"
```

Pour générer une clé secrète :
```bash
openssl rand -base64 32
```

## 📚 Documentation Complète

Voir `ADMIN_GUIDE.md` pour plus de détails.
