import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LegalNoticePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em]">
            Informations legales
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight">Mentions legales</h1>
          <p className="mt-4 text-slate-600 leading-8">
            Cette page presente les informations generales relatives a l&apos;edition et a
            l&apos;utilisation de la plateforme StageLink Burkina.
          </p>

          <div className="mt-12 space-y-10">
            <section>
              <h2 className="text-2xl font-black mb-4">Editeur de la plateforme</h2>
              <p className="text-slate-700 leading-8">
                StageLink Burkina est une plateforme de mise en relation entre etudiants,
                jeunes diplomes et entreprises. Pour toute demande officielle, vous pouvez
                contacter l&apos;equipe via l&apos;adresse de contact affichee sur le site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">Objet du service</h2>
              <p className="text-slate-700 leading-8">
                Le service permet de consulter des offres, creer un profil, publier des offres
                et echanger via une messagerie interne selon le role de l&apos;utilisateur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">Responsabilite</h2>
              <p className="text-slate-700 leading-8">
                StageLink Burkina s&apos;efforce de proposer des informations fiables, mais ne
                garantit pas l&apos;absence totale d&apos;erreurs, d&apos;interruptions ou de contenus
                publies par des tiers. Chaque utilisateur reste responsable des informations
                qu&apos;il publie sur la plateforme.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">Contact</h2>
              <p className="text-slate-700 leading-8">
                Pour toute question juridique ou demande relative au service, vous pouvez
                utiliser l&apos;adresse suivante : <span className="font-semibold">contact@stagelink.bf</span>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
