import { Metadata } from "next";
import ProjectsGrid from "@/components/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projets - Sonos Media",
  description: "Découvrez nos réalisations pour des marques ambitieuses.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-primary mb-6">
            Nos Projets
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Des réalisations qui parlent d&apos;elles-mêmes
          </p>
        </div>

        <ProjectsGrid />
      </div>
    </div>
  );
}
