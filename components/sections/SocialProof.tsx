"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback vers données statiques
        setTestimonials([
          {
            quote: "Sonos Media a transformé notre présence sur les réseaux sociaux. Leur contenu performe systématiquement mieux que nos créations internes.",
            author: "Sophie Martin",
            role: "Directrice Marketing, Restaurant Le Jardin",
            category: "Restaurant",
          },
          {
            quote: "Professionnalisme et créativité au rendez-vous. Les vidéos produites ont généré un ROI mesurable sur nos campagnes publicitaires.",
            author: "Thomas Dubois",
            role: "CEO, AutoPremium",
            category: "Auto",
          },
          {
            quote: "Une équipe qui comprend vraiment les enjeux du B2B. Leur approche stratégique nous a permis d'atteindre notre audience cible efficacement.",
            author: "Marie Leroy",
            role: "Responsable Communication, ConstructPro",
            category: "BTP",
          },
        ]);
        setLoading(false);
      });
  }, []);

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
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            La confiance de marques qui misent sur la qualité
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {loading ? (
            <div className="col-span-full text-center text-secondary">Chargement...</div>
          ) : (
            testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 lg:p-8 hover:border-accent/50 transition-all"
            >
              <div className="mb-6">
                <svg
                  className="w-8 h-8 text-accent mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-secondary leading-relaxed italic">
                  &quot;{testimonial.quote}&quot;
                </p>
              </div>
              <div>
                <p className="text-primary font-semibold">{testimonial.author}</p>
                <p className="text-secondary text-sm">{testimonial.role}</p>
                <span className="inline-block mt-2 text-xs text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {testimonial.category}
                </span>
              </div>
            </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
