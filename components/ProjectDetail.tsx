"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ProjectDetailProps {
  project: {
    title: string;
    category: string;
    description: string;
    fullDescription: string;
    deliverables: string[];
  };
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Link
        href="/projects"
        className="text-accent hover:text-accent-alt mb-8 inline-block transition-colors"
      >
        ← Retour aux projets
      </Link>

      <div className="mb-8">
        <span className="text-accent text-sm font-medium bg-accent/10 px-3 py-1 rounded-full">
          {project.category}
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mt-4 mb-6">
          {project.title}
        </h1>
        <p className="text-xl text-secondary mb-8">{project.description}</p>
      </div>

      <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent-alt/20 rounded-xl flex items-center justify-center border border-white/10 mb-12">
        <div className="text-8xl opacity-30">🎬</div>
      </div>

      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-semibold text-primary mb-4">À propos du projet</h2>
        <p className="text-secondary text-lg leading-relaxed mb-12">
          {project.fullDescription}
        </p>

        <h2 className="text-2xl font-semibold text-primary mb-4">Livrables</h2>
        <ul className="space-y-3 mb-12">
          {project.deliverables.map((deliverable, index) => (
            <li key={index} className="flex items-start">
              <span className="text-accent mr-3">✓</span>
              <span className="text-secondary text-lg">{deliverable}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10">
        <Link
          href="/contact"
          className="inline-block px-8 py-3 bg-accent text-white rounded-lg hover:bg-accent-alt transition-all font-semibold"
        >
          Discuter de votre projet
        </Link>
      </div>
    </motion.div>
  );
}
