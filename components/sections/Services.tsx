"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        setServices(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        // Fallback vers données statiques si l'API échoue
        setServices([
          {
            title: "Vidéo courte durée",
            description: "Reels, TikTok, Shorts optimisés pour l'engagement et la conversion.",
            icon: "🎬",
          },
          {
            title: "Créatifs publicitaires",
            description: "Annonces sociales performantes pour Facebook, Instagram et TikTok Ads.",
            icon: "📱",
          },
          {
            title: "Photo & Produit",
            description: "Photographie produit et lifestyle pour vos campagnes e-commerce.",
            icon: "📸",
          },
          {
            title: "Stratégie & Planning",
            description: "Planification éditoriale et stratégie de contenu sur mesure.",
            icon: "📊",
          },
          {
            title: "Contenu UGC",
            description: "Contenu authentique style user-generated pour renforcer la confiance.",
            icon: "✨",
          },
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <section ref={ref} className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
            Nos Services
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Des solutions complètes pour votre présence digitale
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {loading ? (
            <div className="col-span-full text-center text-secondary">Chargement...</div>
          ) : (
            services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 lg:p-8 hover:border-accent/50 transition-all cursor-pointer glow-hover"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {service.title}
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
