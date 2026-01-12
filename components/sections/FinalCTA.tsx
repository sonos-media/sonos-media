"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-alt/10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6">
            Créons du contenu qui se démarque.
          </h2>
          <p className="text-xl text-secondary mb-10">
            Prêt à transformer votre présence digitale ? Discutons de votre projet.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-accent text-white rounded-lg hover:bg-accent-alt transition-all font-semibold text-lg glow-hover"
            >
              Contacter Sonos Media
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
