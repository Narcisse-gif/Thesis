import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em]">
            Regles d&apos;utilisation
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight">Conditions generales d&apos;utilisation</h1>
          <p className="mt-4 text-slate-600 leading-8">
            En utilisant StageLink Burkina, vous acceptez d&apos;utiliser la plateforme de
            maniere loyale, respectueuse et conforme a son objectif professionnel.
          </p>

          <div className="mt-12 space-y-10">
            <section>
              <h2 className="text-2xl font-black mb-4">Comptes utilisateurs</h2>
              <p className="text-slate-700 leading-8">
                Chaque utilisateur s&apos;engage a fournir des informations exactes et a proteger
                ses identifiants. L&apos;utilisation d&apos;un compte tiers ou la creation de faux profils
                est interdite.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">Contenus et comportements</h2>
              <p className="text-slate-700 leading-8">
                Les contenus diffamatoires, frauduleux, trompeurs ou contraires a l&apos;objet de la
                plateforme peuvent etre moderes, suspendus ou supprimes. Les echanges dans la
                messagerie doivent rester professionnels.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">Moderation</h2>
              <p className="text-slate-700 leading-8">
                StageLink Burkina peut suspendre un compte, refuser une offre ou limiter un acces
                en cas d&apos;usage abusif, de non-respect des regles ou de risque pour la securite
                de la plateforme et de ses utilisateurs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">Evolution du service</h2>
              <p className="text-slate-700 leading-8">
                La plateforme peut evoluer, etre mise a jour ou connaitre des interruptions
                techniques temporaires. Les presentes conditions peuvent aussi etre adaptees en
                fonction de l&apos;evolution du service.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
