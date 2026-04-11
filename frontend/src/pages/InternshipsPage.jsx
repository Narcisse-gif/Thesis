import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';

export default function InternshipsPage() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await api.get('/offers');
        const dbOffers = response.data
          .filter((offer) => offer.contractType === 'STAGE')
          .map((offer) => ({
            id: offer.id,
            initials: (offer.enterprise?.companyName || offer.title || 'OF').slice(0, 2).toUpperCase(),
            company: offer.enterprise?.companyName || 'Confidentiel',
            title: offer.title,
            location: offer.location || offer.enterprise?.location || 'Non specifie',
            duration: offer.durationMonths ? `${offer.durationMonths} mois` : 'Non specifie',
            compensation: offer.salaryOrStipend ? `${offer.salaryOrStipend} FCFA` : 'Non specifie',
            badge: offer.contractType || 'Stage',
            badgeColors: 'bg-blue-50 text-primary',
            posted: offer.createdAt ? `Publie le ${new Date(offer.createdAt).toLocaleDateString('fr-FR')}` : 'Date inconnue',
            applicants: 'Non disponible',
          }));
        setOffers(dbOffers);
      } catch (error) {
        console.error('Failed to load offers:', error);
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <main className="flex-1">
          {/* Hero Search Section with Background */}
          <div className="relative w-full py-20 md:py-32 mb-12">
            <div className="absolute inset-0 z-0">
              <img alt="Office Background" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqI1ZYs989a6DlyZ6cpqAxP19iLu7FrCHKwH8G7hNdqy1RL6Fa4m5IaSOY24Bb4wtF-6kROZxJGDRTlI5J6bA5wiIBrRKO9xf4hDUHZrQr5V6qkIl2BL15-QWQMwLc13jLb6ZYty8JPXlnAXAH-GxGeyng6u7tEXu1JfIyJP7F0blJz80SkbGRWR0JxaX3G5t09vNmWWBSCFsj0wboTqWqaM8xjhLYkoYOmK51SHyzF0YJe-oRwH5g0ygSF_cUO1a_NyFESbBQDn7f" />
              <div className="absolute inset-0 bg-slate-900/60 dark:bg-slate-900/80 backdrop-blur-[2px]"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 tracking-tight text-white">
                Trouvez votre <span className="text-blue-400">stage idéal</span><br />
                <span className="text-blue-200">au Burkina Faso</span>
              </h1>
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row w-full relative gap-2 p-2 rounded-2xl bg-white/95 dark:bg-slate-800/95 backdrop-blur shadow-2xl border border-white/20">
                  <div className="flex items-center flex-[1.5] px-4 py-2 border-r border-slate-200 dark:border-slate-700">
                    <span className="material-symbols-outlined text-slate-400 mr-2">search</span>
                    <input className="w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none" placeholder="Métier, domaine (ex: Informatique)..." type="text" />
                  </div>
                  <div className="flex items-center flex-1 px-4 py-2">
                    <span className="material-symbols-outlined text-slate-400 mr-2">location_on</span>
                    <input className="w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none" placeholder="Ville (ex: Ouaga)..." type="text" />
                  </div>
                  <button className="bg-primary text-white px-10 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                    Rechercher
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filters */}
              <aside className="w-full lg:w-72 space-y-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-xl">Filtres</h2>
                    <button className="text-primary hover:bg-primary/10 p-1 rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-sm">refresh</span>
                    </button>
                  </div>
                  {/* Ville */}
                  <div className="space-y-4 mb-8">
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Ville</p>
                    <div className="flex flex-col gap-3">
                      {['Ouagadougou', 'Bobo-Dioulasso', 'Koudougou'].map((city, i) => (
                        <label key={city} className="flex items-center gap-3 cursor-pointer group">
                          <input defaultChecked={i === 0} className="rounded-md text-primary focus:ring-primary h-5 w-5 border-slate-300 dark:border-slate-700 dark:bg-slate-800" type="checkbox" />
                          <span className="text-sm font-medium group-hover:text-primary transition-colors">{city}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Domaine d'étude */}
                  <div className="space-y-4 mb-8">
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Domaine d'étude</p>
                    <div className="flex flex-col gap-3">
                      {['Informatique / IT', 'Gestion & Finance', 'Marketing & Com', 'Ingénierie & BTP'].map((domain, i) => (
                        <label key={domain} className="flex items-center gap-3 cursor-pointer group">
                          <input defaultChecked={i === 0} className="rounded-md text-primary focus:ring-primary h-5 w-5 border-slate-300 dark:border-slate-700 dark:bg-slate-800" type="checkbox" />
                          <span className="text-sm font-medium group-hover:text-primary transition-colors">{domain}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Durée du stage */}
                  <div className="space-y-4 mb-8">
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Durée du stage</p>
                    <div className="flex flex-col gap-3">
                      {['1 - 2 mois', '3 mois', '6 mois', '+6 mois'].map((duree, i) => (
                        <label key={duree} className="flex items-center gap-3 cursor-pointer group">
                          <input defaultChecked={i === 1} name="duree" className="text-primary focus:ring-primary h-5 w-5 border-slate-300 dark:border-slate-700 dark:bg-slate-800" type="radio" />
                          <span className="text-sm font-medium group-hover:text-primary transition-colors">{duree}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Type de stage */}
                  <div className="space-y-4">
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Type de stage</p>
                    <div className="flex flex-col gap-3">
                      {['Académique', 'Professionnel'].map(type => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                          <input className="rounded-md text-primary focus:ring-primary h-5 w-5 border-slate-300 dark:border-slate-700 dark:bg-slate-800" type="checkbox" />
                          <span className="text-sm font-medium group-hover:text-primary transition-colors">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
              {/* Results Grid */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-8">
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Nous avons trouvé <span className="font-bold text-slate-900 dark:text-white">{offers.length} offres</span> de stage</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">Trier par:</span>
                    <select className="bg-transparent border-none outline-none focus:ring-0 text-sm font-bold py-1 cursor-pointer">
                      <option>Plus récent</option>
                      <option>Pertinence</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {loading ? (
                    <div className="col-span-full text-center text-slate-500">Chargement des offres...</div>
                  ) : offers.length === 0 ? (
                    <div className="col-span-full text-center text-slate-500">Aucune offre disponible.</div>
                  ) : (
                    offers.map((offer) => (
                      <div key={offer.id} className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover-card-effect group flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center font-bold text-primary text-lg border border-slate-100 dark:border-slate-700">{offer.initials}</div>
                          <span className={`${offer.badgeColors} text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full`}>{offer.badge}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-1 text-primary group-hover:text-blue-700 transition-colors">{offer.title}</h3>
                        <p className="text-slate-500 text-sm font-medium mb-6">{offer.company}</p>
                        <div className="flex flex-wrap gap-x-6 gap-y-3 text-slate-500 text-sm mb-8">
                          <div className="flex items-center gap-1.5"><span className="material-symbols-outlined !text-lg opacity-70">location_on</span> {offer.location}</div>
                          <div className="flex items-center gap-1.5"><span className="material-symbols-outlined !text-lg opacity-70">schedule</span> {offer.duration}</div>
                          <div className="flex items-center gap-1.5"><span className="material-symbols-outlined !text-lg opacity-70">payments</span> {offer.compensation}</div>
                        </div>
                        <div className="flex items-center gap-3 mb-6 mt-auto">
                          <button
                            className="flex-1 py-2.5 bg-slate-50 dark:bg-slate-800 group-hover:bg-primary text-slate-700 dark:text-slate-300 group-hover:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                            onClick={() => navigate(`/postuler/${offer.id}`)}
                          >
                            Postuler
                            <span className="material-symbols-outlined text-sm">send</span>
                          </button>
                          <button
                            className="flex-1 py-2.5 bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                            onClick={() => navigate(`/stages/${offer.id}`)}
                          >
                            Détails
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                          </button>
                        </div>
                        <div className="flex items-center justify-between pt-5 border-t border-slate-50 dark:border-slate-800">
                          <div className="flex items-center gap-1 text-[11px] text-slate-500"><span className="material-symbols-outlined !text-xs">calendar_today</span> {offer.posted}</div>
                          <div className="flex items-center gap-1 text-[11px] text-slate-500"><span className="material-symbols-outlined !text-xs">groups</span> {offer.applicants}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {/* Pagination */}
                <div className="mt-16 flex justify-center gap-2">
                  <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
                  <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20">1</button>
                  <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:text-primary transition-colors font-semibold">2</button>
                  <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:text-primary transition-colors font-semibold">3</button>
                  <span className="flex items-center px-2 text-slate-400">...</span>
                  <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:text-primary transition-colors font-semibold">12</button>
                  <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
