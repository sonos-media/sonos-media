#!/bin/bash

# Script de déploiement pour VPS
# Usage: ./deploy.sh

echo "🚀 Déploiement de Sonos Media..."

# 1. Build du projet
echo "📦 Build du projet..."
npm run build

# 2. Générer le client Prisma
echo "🔧 Génération du client Prisma..."
npx prisma generate

# 3. Appliquer les migrations
echo "📊 Application des migrations..."
npx prisma db push

# 4. Redémarrer PM2
echo "🔄 Redémarrage du serveur..."
pm2 restart sonos-media || pm2 start ecosystem.config.js

echo "✅ Déploiement terminé !"
echo "🌐 Le site est accessible sur votre domaine"
