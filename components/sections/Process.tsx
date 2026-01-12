"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Stratégie & Angles",
    description: "Analyse de votre marché et définition des angles créatifs performants.",
  },
  {
    number: "02",
    title: "Script & Concepts",
    description: "Développement des concepts et rédaction des scripts optimisés pour chaque plateforme.",
  },
  {
    number: "03",
    title: "Production",
    description: "Tournage professionnel avec matériel haut de gamme et équipe expérimentée.",
  },
  {
    number: "04",
    title: "Montage & Variations",
    description: "Post-production soignée et création de multiples variations pour tester et optimiser.",
  },
  {
    number: "05",
    title: "Livraison & Optimisation",
    description: "Remise des fichiers finaux et accompagnement pour maximiser les performances.",
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 sm:py-32 relative bg-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
            Notre Processus
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Une méthode éprouvée pour des résultats mesurables
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center border border-accent/50">
                    <span className="text-2xl font-bold text-accent">{step.number}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-16 bg-accent/30 mx-auto mt-2" />
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-semibold text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
