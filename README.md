# Sonos Media - Site Web

Site web premium pour Sonos Media, agence de création de contenu spécialisée en vidéo, photo et contenu social.

## 🚀 Technologies

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)

## 📦 Installation

```bash
npm install
```

## 🏃 Développement

```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🏗️ Build

```bash
npm run build
npm start
```

## 📁 Structure du projet

```
├── app/
│   ├── about/          # Page À propos
│   ├── contact/        # Page Contact
│   ├── mentions-legales/ # Mentions légales
│   ├── privacy-policy/  # Politique de confidentialité
│   ├── projects/       # Pages Projets
│   ├── services/       # Page Services
│   ├── globals.css     # Styles globaux
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Page d'accueil
├── components/
│   ├── sections/       # Sections de la page d'accueil
│   ├── AboutContent.tsx
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── ProjectDetail.tsx
│   ├── ProjectsGrid.tsx
│   └── ServiceDetail.tsx
└── ...
```

## 🎨 Design

- **Mode sombre** par défaut
- **Couleurs** : Noir profond (#0B0F19), Orange électrique (#FF7A1A)
- **Typographie** : Inter (Google Fonts)
- **Animations** : Framer Motion pour des transitions fluides

## 📝 Pages

- **Accueil** : Hero, Services, Process, Portfolio, Témoignages, CTA
- **Services** : Détails de tous les services
- **Projets** : Grille de projets avec filtres
- **À propos** : Vision et valeurs
- **Contact** : Formulaire de contact
- **Mentions légales** : Informations légales
- **Politique de confidentialité** : RGPD

## 🚀 Déploiement

Le site est prêt à être déployé sur Vercel :

```bash
vercel
```

## 📄 Licence

© 2024 Sonos Media. Tous droits réservés.
