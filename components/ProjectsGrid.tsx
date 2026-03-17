"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";

// Les catégories seront chargées dynamiquement

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  videoUrl: string;
  thumbnail: string | null;
}

export default function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>(["Tous"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger les projets
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Erreur lors du chargement des projets:", error);
        setProjects([]);
        setLoading(false);
      });

    // Charger les catégories
    fetch("/api/categories")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        const categoryNames = Array.isArray(data) ? data.map((c: any) => c.name) : [];
        setCategories(["Tous", ...categoryNames]);
      })
      .catch((error) => {
        console.error("❌ Erreur lors du chargement des catégories:", error);
      });
  }, []);

  const filteredProjects =
    activeCategory === "Tous"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4 opacity-30">🎬</div>
        <p className="text-secondary text-lg">
          Aucun projet pour le moment. Ajoutez-en via l&apos;administration !
        </p>
      </div>
    );
  }

  return (
    <div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group"
          >
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-accent/50 transition-all glow-hover p-4">
              <VideoPlayer
                videoUrl={project.videoUrl}
                title={project.title}
                thumbnail={project.thumbnail || undefined}
              />
              
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
        ))}
      </div>
    </div>
  );
}
