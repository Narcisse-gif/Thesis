import { Link } from 'react-router-dom';

export default function RegisterSelectionPage() {
  return (
    <div className="bg-overlay min-h-screen flex flex-col font-display text-slate-900 dark:text-slate-100">
      {/* Navigation Bar */}
      <header className="w-full px-6 py-4 flex items-center justify-between bg-white/40 dark:bg-background-dark/40 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="h-10 w-auto">
            <img alt="StageLink Burkina Logo" className="h-full object-contain filter drop-shadow-sm" src="https://lh3.googleusercontent.com/aida/ADBb0uh1YSnwGNNGuIzY9RBpdJjIr-ijXLYWWRvnakidV3VjbmlGQ332MnN-iKlDnUPqmJtFxa4Ssf7BJ7YqiE-Bu9B6xJ2DjaJyROVDPKE2M8XdOZygSpoIvmhTOvMwjgdcfv_IEa8XKESlpXTkQtCdJD2dECrWKg34hp5O8DtW4Bw7SSC2ox0yxQfWgW_Oe-wqifDOhYiHIyBn8vMlIaigkSPnAMwYmvCSvbLtX4jUTzOZIhVjVZ5sFfgNGwWXDlKrLKwwr2fitRlitNg" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold tracking-tight"><span className="text-black dark:text-white">StageLink</span> <span className="text-primary">Burkina</span></h1>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 drop-shadow-sm">Prêt à commencer ?</h2>
            <p className="text-lg text-slate-500 dark:text-slate-300 max-w-2xl mx-auto font-medium">Choisissez le type de compte qui correspond à vos besoins pour rejoindre la plateforme de référence au Burkina Faso.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Student Section */}
            <div className="glass-card rounded-xl shadow-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300 flex flex-col">
              <div className="h-3 bg-primary"></div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl font-light">school</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Espace Étudiant</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8">Trouvez votre stage idéal et lancez votre carrière professionnelle avec les meilleures entreprises du pays.</p>
                <ul className="space-y-4 mb-10 flex-grow">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    <span className="text-slate-700 dark:text-slate-300">Accès à des offres de stages exclusives</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    <span className="text-slate-700 dark:text-slate-300">Suivi des candidatures en temps réel</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    <span className="text-slate-700 dark:text-slate-300">Profil professionnel valorisé</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    <span className="text-slate-700 dark:text-slate-300">Alertes personnalisées par SMS/Email</span>
                  </li>
                </ul>
                <Link to="/inscription/etudiant" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group mt-auto">
                  S'inscrire comme Étudiant
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
              <div className="px-8 py-4 bg-white/20 dark:bg-black/20 border-t border-white/20 dark:border-white/10">
                <p className="text-xs text-center text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">Gratuit pour tous les étudiants</p>
              </div>
            </div>

            {/* Company Section */}
            <div className="glass-card rounded-xl shadow-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300 flex flex-col">
              <div className="h-3 bg-slate-600"></div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="size-16 bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-300 mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl font-light">corporate_fare</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Espace Entreprise</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8">Identifiez les meilleurs talents et simplifiez votre processus de recrutement de stagiaires qualifiés.</p>
                <ul className="space-y-4 mb-10 flex-grow">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    <span className="text-slate-700 dark:text-slate-300">Publication illimitée d'offres de stage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    <span className="text-slate-700 dark:text-slate-300">Base de données de CV qualifiés</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    <span className="text-slate-700 dark:text-slate-300">Outils de gestion de candidatures</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    <span className="text-slate-700 dark:text-slate-300">Statistiques de recrutement détaillées</span>
                  </li>
                </ul>
                <Link to="/inscription/entreprise" className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-4 rounded-lg shadow-lg shadow-slate-600/20 transition-all flex items-center justify-center gap-2 group mt-auto">
                  S'inscrire comme Entreprise
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
              <div className="px-8 py-4 bg-white/20 dark:bg-black/20 border-t border-white/20 dark:border-white/10">
                <p className="text-xs text-center text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">Solutions adaptées aux PME/PMI</p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-slate-900 dark:text-white font-medium bg-white/40 dark:bg-black/20 backdrop-blur-sm inline-block px-6 py-2 rounded-full shadow-sm">
              Vous avez déjà un compte ? 
              <Link className="text-primary font-bold hover:underline hover:text-blue-800 ml-1" to="/connexion">Connectez-vous ici</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
