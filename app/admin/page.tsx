"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("projects");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-primary">Chargement...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Administration</h1>
          <div className="flex items-center gap-4">
            <span className="text-secondary">Connecté en tant que {session.user?.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === "projects"
                  ? "text-accent border-b-2 border-accent bg-white/5"
                  : "text-secondary hover:text-primary"
              }`}
            >
              Projets
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === "services"
                  ? "text-accent border-b-2 border-accent bg-white/5"
                  : "text-secondary hover:text-primary"
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab("testimonials")}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === "testimonials"
                  ? "text-accent border-b-2 border-accent bg-white/5"
                  : "text-secondary hover:text-primary"
              }`}
            >
              Témoignages
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === "categories"
                  ? "text-accent border-b-2 border-accent bg-white/5"
                  : "text-secondary hover:text-primary"
              }`}
            >
              Catégories
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === "projects" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-primary">Gestion des Projets</h2>
                  <Link
                    href="/admin/projects/new"
                    className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-alt transition-colors font-medium"
                  >
                    + Nouveau Projet
                  </Link>
                </div>
                <ProjectsList />
              </div>
            )}

            {activeTab === "services" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-primary">Gestion des Services</h2>
                  <Link
                    href="/admin/services/new"
                    className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-alt transition-colors font-medium"
                  >
                    + Nouveau Service
                  </Link>
                </div>
                <ServicesList />
              </div>
            )}

            {activeTab === "testimonials" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-primary">Gestion des Témoignages</h2>
                  <Link
                    href="/admin/testimonials/new"
                    className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-alt transition-colors font-medium"
                  >
                    + Nouveau Témoignage
                  </Link>
                </div>
                <TestimonialsList />
              </div>
            )}

            {activeTab === "categories" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-primary">Gestion des Catégories</h2>
                </div>
                <CategoriesList />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Composants pour les listes
function ProjectsList() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setProjects([]);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) return;

    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects(projects.filter((p) => p.id !== id));
  };

  if (loading) return <div className="text-secondary">Chargement...</div>;

  return (
    <div className="space-y-4">
      {projects.length === 0 ? (
        <p className="text-secondary">Aucun projet pour le moment</p>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            className="bg-white/5 border border-white/10 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="text-primary font-semibold">{project.title}</h3>
              <p className="text-secondary text-sm">{project.category}</p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/projects/${project.id}`}
                className="px-4 py-2 bg-white/10 text-primary rounded-lg hover:bg-white/20 transition-colors"
              >
                Modifier
              </Link>
              <button
                onClick={() => handleDelete(project.id)}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function ServicesList() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setServices([]);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    setServices(services.filter((s) => s.id !== id));
  };

  if (loading) return <div className="text-secondary">Chargement...</div>;

  return (
    <div className="space-y-4">
      {services.length === 0 ? (
        <p className="text-secondary">Aucun service pour le moment</p>
      ) : (
        services.map((service) => (
          <div
            key={service.id}
            className="bg-white/5 border border-white/10 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="text-primary font-semibold">{service.title}</h3>
              <p className="text-secondary text-sm">{service.subtitle}</p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/services/${service.id}`}
                className="px-4 py-2 bg-white/10 text-primary rounded-lg hover:bg-white/20 transition-colors"
              >
                Modifier
              </Link>
              <button
                onClick={() => handleDelete(service.id)}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function TestimonialsList() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setTestimonials([]);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce témoignage ?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    setTestimonials(testimonials.filter((t) => t.id !== id));
  };

  if (loading) return <div className="text-secondary">Chargement...</div>;

  return (
    <div className="space-y-4">
      {testimonials.length === 0 ? (
        <p className="text-secondary">Aucun témoignage pour le moment</p>
      ) : (
        testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white/5 border border-white/10 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="text-primary font-semibold">{testimonial.author}</p>
              <p className="text-secondary text-sm">{testimonial.role}</p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/testimonials/${testimonial.id}`}
                className="px-4 py-2 bg-white/10 text-primary rounded-lg hover:bg-white/20 transition-colors"
              >
                Modifier
              </Link>
              <button
                onClick={() => handleDelete(testimonial.id)}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function CategoriesList() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState("");
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const loadCategories = () => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setCategories([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAdd = async () => {
    if (!newCategory.trim()) return;
    
    setAdding(true);
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory }),
      });

      if (response.ok) {
        setNewCategory("");
        loadCategories();
      } else {
        const error = await response.json();
        alert(error.error || "Erreur lors de l'ajout");
      }
    } catch (error) {
      alert("Erreur lors de l'ajout");
    } finally {
      setAdding(false);
    }
  };

  const handleEdit = async (id: string) => {
    if (!editingName.trim()) return;

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingName }),
      });

      if (response.ok) {
        setEditingId(null);
        setEditingName("");
        loadCategories();
      } else {
        const error = await response.json();
        alert(error.error || "Erreur lors de la modification");
      }
    } catch (error) {
      alert("Erreur lors de la modification");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) return;
    
    try {
      const response = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      
      if (response.ok) {
        loadCategories();
      } else {
        const error = await response.json();
        alert(error.error || "Erreur lors de la suppression");
      }
    } catch (error) {
      alert("Erreur lors de la suppression");
    }
  };

  if (loading) return <div className="text-secondary">Chargement...</div>;

  return (
    <div className="space-y-4">
      {/* Formulaire d'ajout */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <h3 className="text-primary font-semibold mb-3">Ajouter une catégorie</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Nom de la catégorie"
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-primary focus:outline-none focus:border-accent"
          />
          <button
            onClick={handleAdd}
            disabled={adding || !newCategory.trim()}
            className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-alt transition-colors font-medium disabled:opacity-50"
          >
            {adding ? "Ajout..." : "Ajouter"}
          </button>
        </div>
      </div>

      {/* Liste des catégories */}
      {categories.length === 0 ? (
        <p className="text-secondary">Aucune catégorie pour le moment</p>
      ) : (
        categories.map((category) => (
          <div
            key={category.id}
            className="bg-white/5 border border-white/10 rounded-lg p-4 flex justify-between items-center"
          >
            {editingId === category.id ? (
              <input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleEdit(category.id)}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-primary focus:outline-none focus:border-accent mr-2"
                autoFocus
              />
            ) : (
              <div>
                <h3 className="text-primary font-semibold">{category.name}</h3>
              </div>
            )}
            <div className="flex gap-2">
              {editingId === category.id ? (
                <>
                  <button
                    onClick={() => handleEdit(category.id)}
                    className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-alt transition-colors"
                  >
                    Enregistrer
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditingName("");
                    }}
                    className="px-4 py-2 bg-white/10 text-primary rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Annuler
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditingId(category.id);
                      setEditingName(category.name);
                    }}
                    className="px-4 py-2 bg-white/10 text-primary rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    Supprimer
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
