"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

// Les catégories seront chargées dynamiquement

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(["Tous"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger les projets
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des projets:", error);
        setProjects([]);
        setLoading(false);
      });

    // Charger les catégories
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        const categoryNames = Array.isArray(data) ? data.map((c: any) => c.name) : [];
        setCategories(["Tous", ...categoryNames]);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des catégories:", error);
      });
  }, []);

  const filteredProjects =
    activeCategory === "Tous"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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
            Nos Projets
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto mb-8">
            Découvrez nos réalisations pour des marques ambitieuses
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeCategory === category
                    ? "bg-accent text-white"
                    : "bg-white/5 text-secondary hover:bg-white/10 hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {loading ? (
            <div className="col-span-full text-center text-secondary">Chargement...</div>
          ) : filteredProjects.length === 0 ? (
            <div className="col-span-full text-center text-secondary">Aucun projet pour le moment</div>
          ) : (
            filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group cursor-pointer"
            >
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-accent/50 transition-all glow-hover p-4">
                {project.videoUrl ? (
                  <video
                    src={project.videoUrl}
                    className="w-full aspect-[9/16] object-cover rounded-lg"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                ) : (
                  <div className="w-full aspect-[9/16] bg-gradient-to-br from-accent/20 to-accent-alt/20 rounded-lg flex items-center justify-center">
                    <div className="text-6xl opacity-20">🎬</div>
                  </div>
                )}
                <div className="mt-4">
                  <span className="text-accent text-xs font-medium uppercase tracking-wide">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-semibold text-primary mt-1 mb-1 group-hover:text-accent transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-secondary text-sm line-clamp-2">{project.description}</p>
                </div>
              </div>
            </motion.div>
            ))
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="inline-block px-8 py-3 border-2 border-white/20 text-primary rounded-lg hover:border-accent hover:text-accent transition-all font-semibold"
          >
            Voir tous les projets
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
