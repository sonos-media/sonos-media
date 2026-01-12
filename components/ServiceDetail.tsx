"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "Vidéo courte durée",
    subtitle: "Reels, TikTok, Shorts",
    description: "Nous créons des vidéos courtes optimisées pour chaque plateforme, conçues pour captiver en quelques secondes et générer de l'engagement.",
    features: [
      "Scripts optimisés pour l'attention",
      "Montage dynamique et rythmé",
      "Formats adaptés à chaque plateforme",
      "Variations multiples pour tester",
      "Optimisation pour l'algorithme",
    ],
    icon: "🎬",
  },
  {
    title: "Créatifs publicitaires",
    subtitle: "Annonces sociales performantes",
    description: "Des créatifs publicitaires conçus pour convertir. Nous testons et optimisons pour maximiser votre ROI publicitaire.",
    features: [
      "Design orienté conversion",
      "A/B testing intégré",
      "Formats carrés, stories, reels",
      "Copywriting persuasif",
      "Suivi des performances",
    ],
    icon: "📱",
  },
  {
    title: "Photo & Produit",
    subtitle: "Photographie lifestyle et e-commerce",
    description: "Photographie produit professionnelle et contenu lifestyle pour mettre en valeur vos produits et services.",
    features: [
      "Photographie produit premium",
      "Lifestyle et mise en scène",
      "Retouches professionnelles",
      "Formats web et print",
      "Packshots optimisés",
    ],
    icon: "📸",
  },
  {
    title: "Stratégie & Planning",
    subtitle: "Planification éditoriale",
    description: "Une stratégie de contenu sur mesure pour aligner votre production avec vos objectifs business.",
    features: [
      "Audit de votre présence actuelle",
      "Calendrier éditorial mensuel",
      "Définition des angles créatifs",
      "Analyse de la concurrence",
      "Recommandations stratégiques",
    ],
    icon: "📊",
  },
  {
    title: "Contenu UGC",
    subtitle: "Authenticité et confiance",
    description: "Contenu style user-generated pour renforcer la confiance et l'authenticité de votre marque.",
    features: [
      "Style authentique et naturel",
      "Témoignages clients",
      "Unboxing et reviews",
      "Contenu lifestyle réaliste",
      "Intégration produits fluide",
    ],
    icon: "✨",
  },
];

export default function ServiceDetail() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="space-y-20">
      {services.map((service, index) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className={index % 2 === 1 ? "lg:order-2" : ""}>
            <div className="text-6xl mb-6">{service.icon}</div>
            <h2 className="text-4xl font-bold text-primary mb-3">
              {service.title}
            </h2>
            <p className="text-xl text-accent mb-6">{service.subtitle}</p>
            <p className="text-secondary text-lg mb-8 leading-relaxed">
              {service.description}
            </p>
            <ul className="space-y-3">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <span className="text-accent mr-3">✓</span>
                  <span className="text-secondary">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={index % 2 === 1 ? "lg:order-1" : ""}>
            <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent-alt/20 rounded-xl flex items-center justify-center border border-white/10">
              <div className="text-8xl opacity-30">{service.icon}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
