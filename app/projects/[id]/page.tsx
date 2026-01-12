import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";

const projects: Record<string, any> = {
  "1": {
    title: "Campagne Restaurant Le Jardin",
    category: "Restaurant",
    description: "Vidéo Reels pour lancement de menu saisonnier",
    fullDescription: "Nous avons créé une série de Reels pour le lancement du menu saisonnier du Restaurant Le Jardin. L'objectif était de mettre en valeur les nouveaux plats tout en créant de l'engagement sur Instagram.",
    deliverables: [
      "5 Reels Instagram optimisés",
      "Photographie produit des plats",
      "Stories highlight",
      "Copies de posts",
    ],
  },
  "2": {
    title: "Marque Automobile Premium",
    category: "Auto",
    description: "Contenu social pour nouvelle collection",
    fullDescription: "Production de contenu vidéo et photo pour le lancement d'une nouvelle collection automobile. Focus sur l'esthétique premium et les performances.",
    deliverables: [
      "Vidéos TikTok et Reels",
      "Photographie lifestyle",
      "Annonces publicitaires",
      "Stratégie de contenu 3 mois",
    ],
  },
  "3": {
    title: "Entreprise BTP ConstructPro",
    category: "BTP",
    description: "Vidéo corporate et témoignages clients",
    fullDescription: "Création de contenu corporate pour ConstructPro, incluant des vidéos de présentation, témoignages clients et contenu éducatif pour LinkedIn.",
    deliverables: [
      "Vidéo corporate principale",
      "3 témoignages clients",
      "Contenu LinkedIn",
      "Photographie de chantiers",
    ],
  },
  "4": {
    title: "Corporate Tech Startup",
    category: "Corporate",
    description: "Stratégie de contenu complète",
    fullDescription: "Accompagnement stratégique et production de contenu pour une startup tech. Focus sur le B2B et la génération de leads.",
    deliverables: [
      "Stratégie de contenu 6 mois",
      "Vidéos explicatives produits",
      "Contenu LinkedIn",
      "Annonces publicitaires",
    ],
  },
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const project = projects[params.id];
  if (!project) {
    return {
      title: "Projet non trouvé - Sonos Media",
    };
  }
  return {
    title: `${project.title} - Sonos Media`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects[params.id];
  
  if (!project) {
    notFound();
  }

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <ProjectDetail project={project} />
      </div>
    </div>
  );
}
