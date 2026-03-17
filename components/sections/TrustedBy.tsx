"use client";

import Image from "next/image";

const logos = [
  { name: "AA City", src: "/logos/aacity.png" },
  { name: "BA", src: "/logos/ba.webp" },
  { name: "Porsche", src: "/logos/porsche.png" },
  { name: "Client", src: "/logos/logo-capture.png" },
  { name: "Client", src: "/logos/logo-3.png" },
  { name: "Client", src: "/logos/logo-4.png" },
  { name: "Client", src: "/logos/logo-5.png" },
  { name: "Client", src: "/logos/logo-6.png" },
];

export default function TrustedBy() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Dégradés latéraux pour effet de fondu */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <p className="text-center text-secondary text-sm font-medium uppercase tracking-widest">
          Ils nous ont fait confiance
        </p>
      </div>

      {/* Piste de défilement */}
      <div className="flex overflow-hidden">
        <div className="flex animate-scroll gap-16 items-center">
          {/* Première copie */}
          {logos.map((logo, i) => (
            <div
              key={`a-${i}`}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <div className="relative h-12 w-36 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    // Fallback texte si l'image ne charge pas
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="text-secondary text-sm font-semibold whitespace-nowrap">${logo.name}</span>`;
                    }
                  }}
                />
              </div>
            </div>
          ))}
          {/* Deuxième copie (pour la boucle seamless) */}
          {logos.map((logo, i) => (
            <div
              key={`b-${i}`}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <div className="relative h-12 w-36 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="text-secondary text-sm font-semibold whitespace-nowrap">${logo.name}</span>`;
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
