import { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";

export const metadata: Metadata = {
  title: "Services - Sonos Media",
  description: "Découvrez nos services de création de contenu premium pour les réseaux sociaux.",
};

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-primary mb-6">
            Nos Services
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Des solutions complètes pour votre présence digitale, de la stratégie à la production.
          </p>
        </div>

        <ServiceDetail />
      </div>
    </div>
  );
}
