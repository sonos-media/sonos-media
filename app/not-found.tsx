import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-6xl sm:text-8xl font-bold text-primary mb-6">404</h1>
        <h2 className="text-3xl sm:text-4xl font-semibold text-primary mb-4">
          Page non trouvée
        </h2>
        <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-accent text-white rounded-lg hover:bg-accent-alt transition-all font-semibold text-lg"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
