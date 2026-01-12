import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact - Sonos Media",
  description: "Contactez Sonos Media pour discuter de votre projet de création de contenu.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold text-primary mb-6">
            Contactez-nous
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Discutons de votre projet et de la façon dont nous pouvons vous aider à créer du contenu qui se démarque.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
