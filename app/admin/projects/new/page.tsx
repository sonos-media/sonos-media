"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    videoUrl: "",
    thumbnail: "",
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>("");

  useEffect(() => {
    // Charger les catégories
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des catégories:", error);
      });
  }, []);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      // Créer une URL de prévisualisation
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoFile) {
      alert("Veuillez sélectionner une vidéo");
      return;
    }

    setLoading(true);
    setUploading(true);

    try {
      // 1. Upload direct vers Cloudinary (client-side)
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", videoFile);
      cloudinaryFormData.append("upload_preset", "sonos-media"); // Preset non signé
      cloudinaryFormData.append("folder", "sonos-media");

      const xhr = new XMLHttpRequest();
      
      // Suivi de la progression
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(percentComplete);
        }
      });

      const uploadPromise = new Promise((resolve, reject) => {
        xhr.addEventListener("load", () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error("Erreur lors de l'upload"));
          }
        });
        xhr.addEventListener("error", () => reject(new Error("Erreur réseau")));
        
        xhr.open("POST", "https://api.cloudinary.com/v1_1/dqeqguuic/video/upload");
        xhr.send(cloudinaryFormData);
      });

      const uploadResult: any = await uploadPromise;
      const videoUrl = uploadResult.secure_url;

      // 2. Créer le projet avec l'URL de la vidéo
      const projectResponse = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          videoUrl,
          thumbnail: videoUrl.replace(/\.[^.]+$/, '.jpg'),
        }),
      });

      if (projectResponse.ok) {
        router.push("/admin");
      } else {
        alert("Erreur lors de la création du projet");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la création du projet");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
        <h1 className="text-4xl font-bold text-primary mb-8">Nouveau Projet</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 border border-white/10 rounded-xl p-8">
          <div>
            <label className="block text-primary font-medium mb-2">Titre *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-primary focus:outline-none focus:border-accent"
              placeholder="Nom du projet"
            />
          </div>

          <div>
            <label className="block text-primary font-medium mb-2">Catégorie *</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-primary focus:outline-none focus:border-accent"
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {categories.length === 0 && (
              <p className="text-secondary text-xs mt-2">
                Aucune catégorie disponible. Ajoutez-en dans l&apos;onglet &quot;Catégories&quot; de l&apos;admin.
              </p>
            )}
          </div>

          <div>
            <label className="block text-primary font-medium mb-2">Description courte *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-primary focus:outline-none focus:border-accent resize-none"
              rows={3}
              placeholder="Description du projet"
            />
          </div>

          <div>
            <label className="block text-primary font-medium mb-2">Vidéo *</label>
            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-accent/50 transition-colors">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
                id="video-upload"
                required
              />
              <label htmlFor="video-upload" className="cursor-pointer">
                {videoPreview ? (
                  <div className="space-y-4">
                    <video
                      src={videoPreview}
                      className="w-full max-w-xs mx-auto rounded-lg"
                      controls
                    />
                    <p className="text-accent text-sm">✓ Vidéo sélectionnée : {videoFile?.name}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setVideoFile(null);
                        setVideoPreview("");
                      }}
                      className="text-secondary hover:text-primary text-sm underline"
                    >
                      Changer de vidéo
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">📹</div>
                    <p className="text-primary font-medium mb-2">Cliquez pour uploader une vidéo</p>
                    <p className="text-secondary text-sm">MP4, MOV, AVI ou WebM</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {uploading && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-primary text-sm">Upload en cours...</span>
                <span className="text-accent text-sm font-medium">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || !videoFile}
              className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-alt transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Création..." : "Créer le projet"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              disabled={loading}
              className="px-6 py-3 bg-white/10 text-primary rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
