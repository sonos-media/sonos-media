# 🚀 Guide de Déploiement - Sonos Media

## Option 1 : Vercel (Recommandé)

### Avantages
- ✅ Gratuit pour les projets personnels
- ✅ Déploiement automatique à chaque push
- ✅ SSL/HTTPS automatique
- ✅ CDN mondial
- ✅ Zéro configuration

### Étapes

1. **Préparer le projet**
   ```bash
   # Créer un repo GitHub
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/VOTRE_USERNAME/sonos-media.git
   git push -u origin main
   ```

2. **Déployer sur Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "New Project"
   - Importez votre repo GitHub
   - Configurez les variables d'environnement :
     - `DATABASE_URL` : URL de votre base de données
     - `NEXTAUTH_SECRET` : Générez avec `openssl rand -base64 32`
     - `NEXTAUTH_URL` : `https://votre-projet.vercel.app`
   - Cliquez sur "Deploy"

3. **Base de données**
   - Utilisez [Neon](https://neon.tech) (PostgreSQL gratuit)
   - Ou [PlanetScale](https://planetscale.com) (MySQL gratuit)
   - Copiez l'URL de connexion dans `DATABASE_URL`

4. **Créer l'admin**
   ```bash
   # Localement, avec la DATABASE_URL de production
   DATABASE_URL="postgresql://..." npm run create-admin
   ```

---

## Option 2 : VPS (Serveur Dédié)

### Prérequis
- Serveur Linux (Ubuntu 20.04+)
- Nom de domaine pointant vers votre serveur
- Accès SSH root

### Installation

1. **Connexion au serveur**
   ```bash
   ssh root@votre-serveur.com
   ```

2. **Installer les dépendances**
   ```bash
   # Node.js 18+
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # PM2
   sudo npm install -g pm2
   
   # Nginx
   sudo apt install nginx
   
   # PostgreSQL
   sudo apt install postgresql postgresql-contrib
   ```

3. **Configurer PostgreSQL**
   ```bash
   sudo -u postgres psql
   CREATE DATABASE sonos_media;
   CREATE USER sonos_user WITH PASSWORD 'votre_mot_de_passe';
   GRANT ALL PRIVILEGES ON DATABASE sonos_media TO sonos_user;
   \q
   ```

4. **Cloner le projet**
   ```bash
   cd /var/www
   git clone https://github.com/VOTRE_USERNAME/sonos-media.git
   cd sonos-media
   ```

5. **Configurer l'environnement**
   ```bash
   cp .env.production .env
   nano .env
   # Modifier les valeurs
   ```

6. **Installer et build**
   ```bash
   npm install
   npm run build
   npx prisma generate
   npx prisma db push
   npm run create-admin
   ```

7. **Démarrer avec PM2**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

8. **Configurer Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/sonos-media
   ```
   
   Contenu :
   ```nginx
   server {
       listen 80;
       server_name votre-domaine.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   sudo ln -s /etc/nginx/sites-available/sonos-media /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

9. **SSL avec Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d votre-domaine.com
   ```

---

## Option 3 : Netlify

### Étapes
1. Allez sur [netlify.com](https://netlify.com)
2. Connectez votre repo GitHub
3. Build command : `npm run build`
4. Publish directory : `.next`
5. Ajoutez les variables d'environnement
6. Deploy !

---

## 📊 Migration de la base de données

### SQLite → PostgreSQL (Production)

1. **Exporter les données**
   ```bash
   npx prisma db pull
   ```

2. **Changer le provider dans schema.prisma**
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. **Appliquer les migrations**
   ```bash
   npx prisma db push
   ```

4. **Réimporter les données**
   - Utilisez un script de migration ou
   - Recréez les données manuellement via l'admin

---

## 🔒 Sécurité

### Checklist avant la production

- [ ] Changer le mot de passe admin par défaut
- [ ] Générer un nouveau `NEXTAUTH_SECRET`
- [ ] Utiliser PostgreSQL au lieu de SQLite
- [ ] Activer HTTPS (SSL)
- [ ] Configurer les CORS si nécessaire
- [ ] Limiter la taille des uploads vidéo
- [ ] Mettre en place des backups automatiques
- [ ] Configurer un CDN pour les vidéos (Cloudinary, AWS S3)

---

## 📹 Stockage des vidéos (Recommandé)

Pour la production, utilisez un service de stockage cloud :

### Cloudinary (Recommandé)
- Gratuit jusqu'à 25 GB
- Optimisation automatique des vidéos
- CDN mondial
- [cloudinary.com](https://cloudinary.com)

### AWS S3
- Pay-as-you-go
- Très scalable
- [aws.amazon.com/s3](https://aws.amazon.com/s3)

---

## 🆘 Support

Si vous avez des questions :
1. Vérifiez les logs : `pm2 logs sonos-media`
2. Vérifiez la base de données : `npx prisma studio`
3. Testez l'API : `curl http://localhost:3000/api/projects`

---

## 📝 Commandes utiles

```bash
# Voir les logs
pm2 logs sonos-media

# Redémarrer
pm2 restart sonos-media

# Arrêter
pm2 stop sonos-media

# Mettre à jour le code
cd /var/www/sonos-media
git pull
npm install
npm run build
pm2 restart sonos-media

# Backup de la base de données
pg_dump sonos_media > backup.sql
```
