import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em]">
            Donnees personnelles
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight">Confidentialite</h1>
          <p className="mt-4 text-slate-600 leading-8">
            Cette page explique quelles donnees peuvent etre traitees sur StageLink Burkina
            et dans quel objectif.
          </p>

          <div className="mt-12 space-y-10">
            <section>
              <h2 className="text-2xl font-black mb-4">Donnees collectees</h2>
              <p className="text-slate-700 leading-8">
                Selon votre role, la plateforme peut traiter votre nom, email, numero,
                informations academiques ou professionnelles, contenus de candidature,
                messages internes et elements de profil necessaires au fonctionnement du service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">Finalites</h2>
              <p className="text-slate-700 leading-8">
                Ces donnees sont utilisees pour permettre l&apos;inscription, la mise en relation
                entre candidats et entreprises, la gestion des candidatures, la moderation et
                la securisation de la plateforme.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">Acces et conservation</h2>
              <p className="text-slate-700 leading-8">
                Les donnees ne doivent etre accessibles qu&apos;aux personnes ou services autorises
                selon votre usage de la plateforme. Elles sont conservees pendant la duree utile
                au service ou a la gestion administrative et technique du compte.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">Vos demandes</h2>
              <p className="text-slate-700 leading-8">
                Pour toute question sur vos donnees ou pour demander une mise a jour relative
                a votre compte, vous pouvez contacter l&apos;equipe a l&apos;adresse
                <span className="font-semibold"> contact@stagelink.bf</span>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
