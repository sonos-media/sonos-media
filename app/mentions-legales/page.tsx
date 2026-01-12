import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales - Sonos Media",
  description: "Mentions légales de Sonos Media",
};

export default function MentionsLegalesPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-8">
          Mentions légales
        </h1>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">1. Éditeur du site</h2>
            <p className="text-secondary leading-relaxed">
              Le site sonosmedia.fr est édité par Sonos Media, agence de création de contenu.
            </p>
            <p className="text-secondary leading-relaxed">
              <strong>Adresse :</strong> [À compléter]<br />
              <strong>Email :</strong> hello@sonosmedia.fr<br />
              <strong>SIRET :</strong> [À compléter]
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">2. Directeur de publication</h2>
            <p className="text-secondary leading-relaxed">
              Le directeur de publication est [Nom du directeur de publication].
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">3. Hébergement</h2>
            <p className="text-secondary leading-relaxed">
              Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">4. Propriété intellectuelle</h2>
            <p className="text-secondary leading-relaxed">
              L&apos;ensemble de ce site relève de la législation française et internationale sur le droit d&apos;auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
            <p className="text-secondary leading-relaxed">
              La reproduction de tout ou partie de ce site sur un support électronique quel qu&apos;il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">5. Protection des données personnelles</h2>
            <p className="text-secondary leading-relaxed">
              Conformément à la loi &quot;Informatique et Libertés&quot; du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et d&apos;opposition aux données personnelles vous concernant.
            </p>
            <p className="text-secondary leading-relaxed">
              Pour exercer ce droit, vous pouvez nous contacter à l&apos;adresse : hello@sonosmedia.fr
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">6. Cookies</h2>
            <p className="text-secondary leading-relaxed">
              Ce site utilise des cookies pour améliorer l&apos;expérience utilisateur. En continuant à naviguer sur ce site, vous acceptez l&apos;utilisation de cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">7. Limitation de responsabilité</h2>
            <p className="text-secondary leading-relaxed">
              Sonos Media ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l&apos;utilisateur, lors de l&apos;accès au site sonosmedia.fr, et résultant soit de l&apos;utilisation d&apos;un matériel ne répondant pas aux spécifications, soit de l&apos;apparition d&apos;un bug ou d&apos;une incompatibilité.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
