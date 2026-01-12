"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const values = [
  {
    title: "Excellence créative",
    description: "Chaque projet est une opportunité de créer quelque chose d'exceptionnel. Nous ne nous contentons pas du minimum.",
  },
  {
    title: "Résultats mesurables",
    description: "La créativité doit servir les objectifs business. Nous créons du contenu qui performe et génère des résultats concrets.",
  },
  {
    title: "Approche stratégique",
    description: "Avant de créer, nous analysons. Chaque décision créative est guidée par la stratégie et les données.",
  },
  {
    title: "Partnership long terme",
    description: "Nous construisons des relations durables avec nos clients. Votre succès est notre priorité.",
  },
];

export default function AboutContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-primary mb-6">Notre Vision</h2>
        <p className="text-secondary text-lg leading-relaxed mb-6">
          Sonos Media est née d&apos;une conviction simple : le contenu de qualité est la clé pour se démarquer dans un paysage digital saturé. Nous croyons que chaque marque mérite du contenu qui reflète son ambition et ses valeurs.
        </p>
        <p className="text-secondary text-lg leading-relaxed">
          Spécialisés dans la création de contenu vidéo et social, nous combinons créativité, stratégie et expertise technique pour produire des contenus qui captivent, engagent et convertissent.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-primary mb-6">Notre Approche</h2>
        <p className="text-secondary text-lg leading-relaxed mb-6">
          Nous ne sommes pas juste une agence de production. Nous sommes des partenaires stratégiques qui comprennent les enjeux de votre business. Chaque projet commence par une analyse approfondie de vos objectifs, de votre audience et de votre marché.
        </p>
        <p className="text-secondary text-lg leading-relaxed">
          Notre processus créatif est structuré mais flexible. Nous testons, optimisons et itérons pour garantir que chaque contenu créé contribue à vos objectifs business.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-primary mb-8">Nos Valeurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-primary mb-3">
                {value.title}
              </h3>
              <p className="text-secondary leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
