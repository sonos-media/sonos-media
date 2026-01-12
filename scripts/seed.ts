import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Services par défaut
  const services = [
    {
      title: "Vidéo courte durée",
      subtitle: "Reels, TikTok, Shorts",
      description: "Nous créons des vidéos courtes optimisées pour chaque plateforme, conçues pour captiver en quelques secondes et générer de l'engagement.",
      icon: "🎬",
      features: JSON.stringify([
        "Scripts optimisés pour l'attention",
        "Montage dynamique et rythmé",
        "Formats adaptés à chaque plateforme",
        "Variations multiples pour tester",
        "Optimisation pour l'algorithme",
      ]),
      order: 0,
    },
    {
      title: "Créatifs publicitaires",
      subtitle: "Annonces sociales performantes",
      description: "Des créatifs publicitaires conçus pour convertir. Nous testons et optimisons pour maximiser votre ROI publicitaire.",
      icon: "📱",
      features: JSON.stringify([
        "Design orienté conversion",
        "A/B testing intégré",
        "Formats carrés, stories, reels",
        "Copywriting persuasif",
        "Suivi des performances",
      ]),
      order: 1,
    },
    {
      title: "Photo & Produit",
      subtitle: "Photographie lifestyle et e-commerce",
      description: "Photographie produit professionnelle et contenu lifestyle pour mettre en valeur vos produits et services.",
      icon: "📸",
      features: JSON.stringify([
        "Photographie produit premium",
        "Lifestyle et mise en scène",
        "Retouches professionnelles",
        "Formats web et print",
        "Packshots optimisés",
      ]),
      order: 2,
    },
    {
      title: "Stratégie & Planning",
      subtitle: "Planification éditoriale",
      description: "Une stratégie de contenu sur mesure pour aligner votre production avec vos objectifs business.",
      icon: "📊",
      features: JSON.stringify([
        "Audit de votre présence actuelle",
        "Calendrier éditorial mensuel",
        "Définition des angles créatifs",
        "Analyse de la concurrence",
        "Recommandations stratégiques",
      ]),
      order: 3,
    },
    {
      title: "Contenu UGC",
      subtitle: "Authenticité et confiance",
      description: "Contenu style user-generated pour renforcer la confiance et l'authenticité de votre marque.",
      icon: "✨",
      features: JSON.stringify([
        "Style authentique et naturel",
        "Témoignages clients",
        "Unboxing et reviews",
        "Contenu lifestyle réaliste",
        "Intégration produits fluide",
      ]),
      order: 4,
    },
  ];

  // Témoignages par défaut
  const testimonials = [
    {
      quote: "Sonos Media a transformé notre présence sur les réseaux sociaux. Leur contenu performe systématiquement mieux que nos créations internes.",
      author: "Sophie Martin",
      role: "Directrice Marketing, Restaurant Le Jardin",
      category: "Restaurant",
      order: 0,
    },
    {
      quote: "Professionnalisme et créativité au rendez-vous. Les vidéos produites ont généré un ROI mesurable sur nos campagnes publicitaires.",
      author: "Thomas Dubois",
      role: "CEO, AutoPremium",
      category: "Auto",
      order: 1,
    },
    {
      quote: "Une équipe qui comprend vraiment les enjeux du B2B. Leur approche stratégique nous a permis d'atteindre notre audience cible efficacement.",
      author: "Marie Leroy",
      role: "Responsable Communication, ConstructPro",
      category: "BTP",
      order: 2,
    },
  ];

  console.log('🌱 Initialisation de la base de données...');

  // Supprimer les données existantes
  await prisma.testimonial.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.project.deleteMany({});
  console.log('🗑️  Données existantes supprimées');

  // Créer les services
  for (const service of services) {
    await prisma.service.create({
      data: service,
    });
  }
  console.log('✅ Services créés');

  // Créer les témoignages
  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    });
  }
  console.log('✅ Témoignages créés');

  console.log('\n🎉 Base de données initialisée avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
