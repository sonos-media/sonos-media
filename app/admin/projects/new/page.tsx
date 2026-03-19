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
      // 1. Obtenir une signature sécurisée depuis le serveur
      const sigResponse = await fetch("/api/upload/signature");
      if (!sigResponse.ok) {
        throw new Error("Session expirée, veuillez vous reconnecter");
      }
      const { signature, timestamp, folder, cloudName, apiKey } = await sigResponse.json();

      // 2. Upload par morceaux (chunked) vers Cloudinary — supporte les fichiers lourds
      const CHUNK_SIZE = 20 * 1024 * 1024; // 20 MB par morceau
      const uniqueUploadId = `upload_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const totalSize = videoFile.size;
      const totalChunks = Math.ceil(totalSize / CHUNK_SIZE);
      let uploadResult: any = null;

      for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, totalSize);
        const chunk = videoFile.slice(start, end);

        const chunkFormData = new FormData();
        chunkFormData.append("file", chunk, videoFile.name);
        chunkFormData.append("api_key", apiKey);
        chunkFormData.append("timestamp", String(timestamp));
        chunkFormData.append("signature", signature);
        chunkFormData.append("folder", folder);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
          {
            method: "POST",
            headers: {
              "X-Unique-Upload-Id": uniqueUploadId,
              "Content-Range": `bytes ${start}-${end - 1}/${totalSize}`,
            },
            body: chunkFormData,
          }
        );

        // 200 = terminé, 206 = morceau accepté, continue
        if (response.status !== 200 && response.status !== 206) {
          const errBody = await response.json().catch(() => ({}));
          throw new Error(
            "Cloudinary erreur " + response.status + " : " + (errBody.error?.message || JSON.stringify(errBody))
          );
        }

        if (response.status === 200) {
          uploadResult = await response.json();
        }

        // Mettre à jour la progression
        setUploadProgress(Math.round((end / totalSize) * 100));
      }

      if (!uploadResult?.secure_url) {
        throw new Error("Upload incomplet — aucune URL retournée par Cloudinary");
      }

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
        const errData = await projectResponse.json().catch(() => ({}));
        throw new Error("Erreur API (" + projectResponse.status + ") : " + (errData.error || "inconnue"));
      }
    } catch (error: any) {
      console.error("Erreur:", error);
      alert("Erreur : " + (error.message || "inconnue"));
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
                <span className="text-primary text-sm">
                  {uploadProgress < 100 ? "Upload en cours..." : "Finalisation..."}
                </span>
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
