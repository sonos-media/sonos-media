import { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "À propos - Sonos Media",
  description: "Découvrez la vision et les valeurs de Sonos Media, votre partenaire en création de contenu premium.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-primary mb-6">
            À propos de Sonos Media
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Une agence créative qui mise sur la qualité et les résultats
          </p>
        </div>

        <AboutContent />
      </div>
    </div>
  );
}
