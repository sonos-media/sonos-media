# 🎛️ Guide d'Administration - Sonos Media

## Première Configuration

### 1. Créer un utilisateur administrateur

Exécutez la commande suivante pour créer votre premier compte admin :

```bash
npm run create-admin
```

Par défaut, les identifiants sont :
- **Email** : `admin@sonosmedia.fr`
- **Mot de passe** : `admin123`

⚠️ **Important** : Changez le mot de passe après la première connexion !

### 2. Variables d'environnement

Créez un fichier `.env` à la racine du projet avec :

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-cle-secrete-aleatoire"
```

Pour générer une clé secrète NextAuth, vous pouvez utiliser :
```bash
openssl rand -base64 32
```

## Accès à l'Administration

1. Démarrez le serveur de développement :
   ```bash
   npm run dev
   ```

2. Accédez à l'interface d'administration :
   - URL : `http://localhost:3000/admin`
   - Vous serez redirigé vers `/admin/login` si vous n'êtes pas connecté

3. Connectez-vous avec vos identifiants admin

## Fonctionnalités

### Gestion des Projets
- ✅ Créer de nouveaux projets
- ✅ Modifier les projets existants
- ✅ Supprimer des projets
- ✅ Catégories : Restaurant, Auto, BTP, Corporate

### Gestion des Services
- ✅ Créer de nouveaux services
- ✅ Modifier les services existants
- ✅ Supprimer des services
- ✅ Réorganiser l'ordre d'affichage

### Gestion des Témoignages
- ✅ Créer de nouveaux témoignages
- ✅ Modifier les témoignages existants
- ✅ Supprimer des témoignages
- ✅ Réorganiser l'ordre d'affichage

## Structure de la Base de Données

- **User** : Comptes administrateurs
- **Project** : Projets du portfolio
- **Service** : Services proposés
- **Testimonial** : Témoignages clients

## Sécurité

- Toutes les routes d'administration sont protégées par authentification
- Les mots de passe sont hashés avec bcrypt
- Les sessions utilisent JWT
- Le middleware protège automatiquement les routes `/admin/*`

## Déploiement

Lors du déploiement sur Vercel ou autre plateforme :

1. Configurez les variables d'environnement dans votre dashboard
2. Utilisez une base de données PostgreSQL ou MySQL (pas SQLite en production)
3. Mettez à jour `DATABASE_URL` avec votre URL de base de données
4. Générez une nouvelle clé `NEXTAUTH_SECRET` sécurisée
5. Créez un utilisateur admin avec le script ou manuellement

## Support

Pour toute question ou problème, consultez la documentation :
- NextAuth : https://next-auth.js.org
- Prisma : https://www.prisma.io/docs
