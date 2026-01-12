import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité - Sonos Media",
  description: "Politique de confidentialité de Sonos Media",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-8">
          Politique de confidentialité
        </h1>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">1. Introduction</h2>
            <p className="text-secondary leading-relaxed">
              Sonos Media s&apos;engage à protéger la confidentialité de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos informations personnelles lorsque vous utilisez notre site web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">2. Données collectées</h2>
            <p className="text-secondary leading-relaxed mb-4">
              Nous collectons les données suivantes lorsque vous utilisez notre site ou notre formulaire de contact :
            </p>
            <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Nom de l&apos;entreprise</li>
              <li>Informations sur votre projet</li>
              <li>Budget estimé</li>
              <li>Données de navigation (cookies, adresse IP)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">3. Utilisation des données</h2>
            <p className="text-secondary leading-relaxed mb-4">
              Nous utilisons vos données personnelles pour :
            </p>
            <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
              <li>Répondre à vos demandes de contact</li>
              <li>Vous fournir nos services</li>
              <li>Améliorer notre site web et nos services</li>
              <li>Vous envoyer des communications marketing (avec votre consentement)</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">4. Base légale du traitement</h2>
            <p className="text-secondary leading-relaxed">
              Le traitement de vos données personnelles est basé sur :
            </p>
            <ul className="list-disc list-inside text-secondary space-y-2 ml-4 mt-4">
              <li>Votre consentement (pour les communications marketing)</li>
              <li>L&apos;exécution d&apos;un contrat ou de mesures précontractuelles</li>
              <li>Notre intérêt légitime (amélioration de nos services)</li>
              <li>Le respect de nos obligations légales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">5. Conservation des données</h2>
            <p className="text-secondary leading-relaxed">
              Nous conservons vos données personnelles uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées, conformément à la législation en vigueur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">6. Partage des données</h2>
            <p className="text-secondary leading-relaxed">
              Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers, sauf dans les cas suivants :
            </p>
            <ul className="list-disc list-inside text-secondary space-y-2 ml-4 mt-4">
              <li>Avec votre consentement explicite</li>
              <li>Pour respecter une obligation légale</li>
              <li>Avec nos prestataires de services (hébergeur, outils de communication) sous contrat de confidentialité</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">7. Vos droits</h2>
            <p className="text-secondary leading-relaxed mb-4">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
              <li><strong>Droit d&apos;accès :</strong> Vous pouvez demander l&apos;accès à vos données personnelles</li>
              <li><strong>Droit de rectification :</strong> Vous pouvez demander la correction de vos données</li>
              <li><strong>Droit à l&apos;effacement :</strong> Vous pouvez demander la suppression de vos données</li>
              <li><strong>Droit à la portabilité :</strong> Vous pouvez demander la récupération de vos données</li>
              <li><strong>Droit d&apos;opposition :</strong> Vous pouvez vous opposer au traitement de vos données</li>
              <li><strong>Droit à la limitation :</strong> Vous pouvez demander la limitation du traitement</li>
            </ul>
            <p className="text-secondary leading-relaxed mt-4">
              Pour exercer ces droits, contactez-nous à : hello@sonosmedia.fr
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">8. Cookies</h2>
            <p className="text-secondary leading-relaxed">
              Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut affecter certaines fonctionnalités du site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">9. Sécurité</h2>
            <p className="text-secondary leading-relaxed">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, perte, destruction ou altération.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">10. Modifications</h2>
            <p className="text-secondary leading-relaxed">
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications seront publiées sur cette page avec une date de mise à jour.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">11. Contact</h2>
            <p className="text-secondary leading-relaxed">
              Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles, contactez-nous à : hello@sonosmedia.fr
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
