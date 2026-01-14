"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    goal: "",
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.company, // Utilise le champ "company" comme téléphone
          message: `Entreprise: ${formData.company}\nBudget: ${formData.budget}\n\nObjectif du projet:\n${formData.goal}`,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de l'envoi");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 border border-white/10 rounded-xl p-12 text-center"
      >
        <div className="text-6xl mb-6">✓</div>
        <h2 className="text-3xl font-bold text-primary mb-4">
          Message envoyé !
        </h2>
        <p className="text-secondary text-lg mb-8">
          Nous vous répondrons dans les plus brefs délais.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({ name: "", email: "", company: "", goal: "", budget: "" });
          }}
          className="px-6 py-3 border-2 border-white/20 text-primary rounded-lg hover:border-accent hover:text-accent transition-all font-semibold"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      onSubmit={handleSubmit}
      className="bg-white/5 border border-white/10 rounded-xl p-8 lg:p-12"
    >
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-primary font-medium mb-2">
            Nom complet *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-primary placeholder-secondary focus:outline-none focus:border-accent transition-colors"
            placeholder="Votre nom"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-primary font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-primary placeholder-secondary focus:outline-none focus:border-accent transition-colors"
            placeholder="votre@email.com"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-primary font-medium mb-2">
            Entreprise
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-primary placeholder-secondary focus:outline-none focus:border-accent transition-colors"
            placeholder="Nom de votre entreprise"
          />
        </div>

        <div>
          <label htmlFor="goal" className="block text-primary font-medium mb-2">
            Objectif du projet *
          </label>
          <textarea
            id="goal"
            name="goal"
            required
            value={formData.goal}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-primary placeholder-secondary focus:outline-none focus:border-accent transition-colors resize-none"
            placeholder="Décrivez votre projet et vos objectifs..."
          />
        </div>

        <div>
          <label htmlFor="budget" className="block text-primary font-medium mb-2">
            Budget estimé
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-primary focus:outline-none focus:border-accent transition-colors"
          >
            <option value="">Sélectionnez une fourchette</option>
            <option value="<5k">Moins de 5 000€</option>
            <option value="5k-10k">5 000€ - 10 000€</option>
            <option value="10k-25k">10 000€ - 25 000€</option>
            <option value="25k-50k">25 000€ - 50 000€</option>
            <option value=">50k">Plus de 50 000€</option>
          </select>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-accent text-white rounded-lg hover:bg-accent-alt transition-all font-semibold text-lg glow-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
        </button>
      </div>
    </motion.form>
  );
}
