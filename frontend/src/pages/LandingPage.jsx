import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function LandingPage() {
  const navigate = useNavigate();
  const [featuredOffers, setFeaturedOffers] = useState([]);
  const [loadingOffers, setLoadingOffers] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await api.get('/offers');
        const mapped = response.data
          .filter((offer) => offer.status === 'ACTIVE')
          .slice(0, 3)
          .map((offer) => ({
            id: offer.id,
            title: offer.title,
            company: offer.enterprise?.companyName || 'Confidentiel',
            location: offer.location || offer.enterprise?.location || 'Non specifie',
            contractType: offer.contractType || 'Offre',
            salaryOrStipend: offer.salaryOrStipend,
            durationMonths: offer.durationMonths,
            initials: (offer.enterprise?.companyName || offer.title || 'OF').slice(0, 2).toUpperCase(),
          }));
        setFeaturedOffers(mapped);
      } catch (error) {
        console.error('Failed to load offers:', error);
        setFeaturedOffers([]);
      } finally {
        setLoadingOffers(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <main className="flex-1">
          {/* Hero Section */}
          <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img alt="Professional African workforce in a modern office environment" className="w-full h-full object-cover object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAABXa8so0kqkqHwm8GQ_vr_-ydoMY8DwQoJFPtHkIcy4FurrVVVMVHBjMuzlp5FOuF_nqZaCNMog3KrnlRQ-vg9P5bICGBsKBQWaWUpp5mjsJU3Lio0nB28w4eSM4vdMxdcnrJP52Ai2oGAtJt1alarKPaaYXoYsQU9f474QfBfu6U0XpgxN4d9k8PWnvJemjjQVtTv_X2dpejWJjlReDDApt0fydN1iIJxOMBW_3K218S8yAJ0TkCm8wXzIDFMg0czZlQyvXBpgZC" />
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-transparent"></div>
            </div>
            <div className="relative z-10 px-6 lg:px-20 py-20 max-w-7xl mx-auto text-center">
              <div className="flex flex-col gap-12 items-center">
                <div className="flex flex-col gap-8 max-w-4xl">
                  <div className="flex flex-col gap-6">
                    <h1 className="text-white text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                      Trouve ton stage ou ton premier emploi au <span className="text-blue-400">Burkina Faso</span>
                    </h1>
                    <p className="text-slate-200 text-xl lg:text-2xl font-normal max-w-3xl mx-auto">
                      La plateforme de référence pour propulser ta carrière. Connecte-toi aux meilleures opportunités partout au pays.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row w-full max-w-4xl mx-auto relative gap-2 p-2 rounded-2xl bg-white/95 dark:bg-slate-800/95 backdrop-blur shadow-2xl border border-white/20">
                    <div className="flex items-center flex-[1.5] px-4 py-2 border-r border-slate-200 dark:border-slate-700">
                      <span className="material-symbols-outlined text-slate-400 mr-2">search</span>
                      <input className="w-full bg-transparent border-none focus:ring-0 outline-none text-slate-900 dark:text-white placeholder:text-slate-400" placeholder="Métier, domaine (ex: Informatique)..." />
                    </div>
                    <div className="flex items-center flex-1 px-4 py-2">
                      <span className="material-symbols-outlined text-slate-400 mr-2">location_on</span>
                      <input className="w-full bg-transparent border-none focus:ring-0 outline-none text-slate-900 dark:text-white placeholder:text-slate-400" placeholder="Ville (ex: Ouaga)..." />
                    </div>
                    <button onClick={() => navigate('/emplois')} className="bg-primary text-white px-10 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                      Rechercher
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Featured Internships */}
          <div className="pt-24 pb-12 max-w-7xl mx-auto px-6 lg:px-20" id="offres">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div className="flex flex-col gap-3">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Offres à la une</h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">Découvre les opportunités les plus prestigieuses du moment.</p>
              </div>
              <button onClick={() => navigate('/emplois')} className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all text-lg">
                Voir tout <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              {loadingOffers ? (
                <div className="col-span-full text-center text-slate-500">Chargement des offres...</div>
              ) : featuredOffers.length === 0 ? (
                <div className="col-span-full text-center text-slate-500">Aucune offre disponible.</div>
              ) : (
                featuredOffers.map((offer) => {
                  const detailPath = offer.contractType === 'STAGE' ? `/stages/${offer.id}` : `/emplois/${offer.id}`;
                  const badgeColor = offer.contractType === 'CDD' ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600';
                  const secondaryInfo = offer.salaryOrStipend
                    ? `${offer.salaryOrStipend} FCFA`
                    : offer.durationMonths
                      ? `${offer.durationMonths} mois`
                      : 'Non specifie';

                  return (
                    <div key={offer.id} className="glass-card p-8 rounded-3xl shadow-xl hover-card-effect relative group flex flex-col h-full cursor-pointer" onClick={() => navigate(detailPath)}>
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center font-bold text-primary text-lg">{offer.initials}</div>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${badgeColor}`}>{offer.contractType}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{offer.title}</h3>
                      <p className="text-slate-500 text-sm mb-6">{offer.company}</p>
                      <div className="flex items-center gap-4 text-slate-400 text-sm mb-8">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">location_on</span> {offer.location}</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">payments</span> {secondaryInfo}</span>
                      </div>
                      <button className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-auto" onClick={(event) => { event.stopPropagation(); navigate(`/postuler/${offer.id}`); }}>
                        Postuler maintenant
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          {/* Process Section */}
          <div className="bg-slate-50 dark:bg-slate-900/50 py-16 px-6 lg:px-20">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Comment ça marche ?</h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">Une approche simplifiée pour les étudiants et les entreprises.</p>
              </div>
              <div className="grid lg:grid-cols-2 gap-20">
                {/* For Students */}
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-10 flex items-center gap-3">
                    <span className="material-symbols-outlined text-3xl">school</span> Pour les étudiants
                  </h3>
                  <div className="space-y-10">
                    <div className="flex gap-6 group cursor-default">
                      <div className="flex-none w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl transition-transform group-hover:scale-110">1</div>
                      <div>
                        <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-1">Crée ton profil</h4>
                        <p className="text-slate-600 dark:text-slate-400">Complète ton CV en ligne et mets en avant tes compétences.</p>
                      </div>
                    </div>
                    <div className="flex gap-6 group cursor-default">
                      <div className="flex-none w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl transition-transform group-hover:scale-110">2</div>
                      <div>
                        <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-1">Postule en un clic</h4>
                        <p className="text-slate-600 dark:text-slate-400">Accède aux offres exclusives et envoie ta candidature instantanément.</p>
                      </div>
                    </div>
                    <div className="flex gap-6 group cursor-default">
                      <div className="flex-none w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl transition-transform group-hover:scale-110">3</div>
                      <div>
                        <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-1">Décroche ton entretien</h4>
                        <p className="text-slate-600 dark:text-slate-400">Reçois des alertes et prépare-toi avec nos guides de carrière.</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* For Companies */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-10 flex items-center gap-3">
                    <span className="material-symbols-outlined text-3xl">business</span> Pour les entreprises
                  </h3>
                  <div className="space-y-10">
                    <div className="flex gap-6 group cursor-default">
                      <div className="flex-none w-12 h-12 rounded-full bg-blue-100 dark:bg-slate-700 text-primary dark:text-slate-300 flex items-center justify-center font-bold text-xl transition-transform group-hover:scale-110">1</div>
                      <div>
                        <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-1">Publie tes offres</h4>
                        <p className="text-slate-600 dark:text-slate-400">Cible les meilleurs talents des universités du Burkina Faso.</p>
                      </div>
                    </div>
                    <div className="flex gap-6 group cursor-default">
                      <div className="flex-none w-12 h-12 rounded-full bg-blue-100 dark:bg-slate-700 text-primary dark:text-slate-300 flex items-center justify-center font-bold text-xl transition-transform group-hover:scale-110">2</div>
                      <div>
                        <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-1">Gère les candidatures</h4>
                        <p className="text-slate-600 dark:text-slate-400">Un tableau de bord intuitif pour filtrer et contacter les candidats.</p>
                      </div>
                    </div>
                    <div className="flex gap-6 group cursor-default">
                      <div className="flex-none w-12 h-12 rounded-full bg-blue-100 dark:bg-slate-700 text-primary dark:text-slate-300 flex items-center justify-center font-bold text-xl transition-transform group-hover:scale-110">3</div>
                      <div>
                        <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-1">Recrute localement</h4>
                        <p className="text-slate-600 dark:text-slate-400">Renforce tes équipes avec la jeunesse dynamique du pays.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Call to Action */}
          <div className="px-6 lg:px-20 py-24">
            <div className="max-w-7xl mx-auto bg-primary rounded-[3rem] p-16 lg:p-24 text-center relative overflow-hidden shadow-2xl shadow-primary/30">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
              <h2 className="text-white text-4xl lg:text-6xl font-black mb-8 relative z-10">Prêt à lancer ta carrière ?</h2>
              <p className="text-blue-100 text-xl lg:text-2xl mb-12 max-w-2xl mx-auto relative z-10">Rejoins des milliers d'étudiants qui façonnent l'avenir du Burkina Faso dès aujourd'hui.</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                <button onClick={() => navigate('/inscription/etudiant')} className="bg-white text-primary px-12 py-5 rounded-2xl font-bold text-xl hover:bg-blue-50 transition-all shadow-xl">Espace Étudiant</button>
                <button onClick={() => navigate('/inscription/entreprise')} className="bg-blue-900/30 border border-white/30 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all">Espace Entreprise</button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
