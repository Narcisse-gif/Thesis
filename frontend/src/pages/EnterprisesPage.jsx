import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';

export default function EnterprisesPage() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [query, setQuery] = useState('');

  const apiBaseUrl = api.defaults.baseURL || '';
  const resolveLogoUrl = (value) => {
    if (!value) return '';
    if (value.startsWith('http')) return value;
    if (value.startsWith('/uploads/')) return `${apiBaseUrl}${value}`;
    return value;
  };

  useEffect(() => {
    let isMounted = true;
    const handler = setTimeout(async () => {
      try {
        if (isMounted) {
          setLoading(true);
        }
        const response = await api.get('/enterprises', {
          params: query ? { search: query } : undefined,
        });
        if (isMounted) {
          setCompanies(response.data || []);
        }
      } catch (error) {
        console.error('Failed to load enterprises:', error);
        if (isMounted) {
          setCompanies([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(handler);
    };
  }, [query]);

  const handleSearch = () => {
    setQuery(searchInput.trim());
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <Navbar />

      <section className="relative overflow-hidden border-b border-slate-100 px-4 py-20 dark:border-slate-800 md:py-32">
        <div className="absolute inset-0 z-0">
          <img alt="Modern Office" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvhrBD3oXh0ZJqllgyZwqOUIWrZWhQshV13xRs3pUG6_MyJU3C1p4horGQjhriH_o08GGu2BSaNG79hkcw1Pc4rmySWJ1YJExU7WXqiL7Z0A4GwkrAdrWyH-d8JD01lJsJgJCRcu8TTKBSei5mvRKnqht1UBqvFuiCeQhHICDQCE8m60p3u4CfMH5GWrpVlurC1Pw_zI7k9GIJoBQVuoe-nH4RlMYAYyVgv5QKijylPlH-st3RRRUmhqeqbBqhDizdPV3-BdZpMCpR" />
          <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/80"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white md:text-6xl">
            Propulsez votre carriere au <span className="text-primary">Burkina Faso</span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg font-semibold text-slate-800 drop-shadow-sm dark:text-slate-300 md:text-xl">
            Explorez les profils des entreprises leaders et trouvez l'environnement de travail qui vous correspond.
          </p>
          <div className="mx-auto flex h-14 w-full max-w-2xl items-stretch overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-1.5 shadow-2xl shadow-primary/20 backdrop-blur-sm transition-all focus-within:ring-2 focus-within:ring-primary/20 dark:border-slate-700 dark:bg-slate-800/95 md:h-16">
            <div className="flex items-center justify-center pl-4 pr-2 text-slate-400">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="flex-1 border-none bg-transparent px-2 text-base text-slate-900 outline-none placeholder:text-slate-500 focus:ring-0 dark:text-white"
              placeholder="Rechercher une entreprise, un secteur..."
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <button className="rounded-xl bg-primary px-8 font-bold text-white transition-colors hover:bg-blue-800 md:px-12" onClick={handleSearch}>
              Rechercher
            </button>
          </div>
        </div>
      </section>

      <main className="container mx-auto flex w-full max-w-7xl flex-1 px-4 py-20 lg:px-10">
        <div className="w-full">
          <div className="mb-12 flex flex-col gap-1">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">Entreprises vedettes</h3>
            <p className="text-sm text-slate-500">Decouvrez les recruteurs les plus actifs actuellement au Burkina</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {loading ? (
              <div className="col-span-full text-center text-slate-500">Chargement des entreprises...</div>
            ) : companies.length === 0 ? (
              <div className="col-span-full text-center text-slate-500">Aucune entreprise disponible.</div>
            ) : (
              companies.map((company) => {
                const companyName = company.companyName || 'Entreprise';
                const offersCount = company.activeOffersCount ?? company.offersCount ?? 0;
                const sector = company.industry || 'Secteur';
                const sectorClasses = 'bg-blue-50 text-primary border-blue-100';
                const logoUrl = resolveLogoUrl(company.logoUrl);

                return (
                  <div key={company.id} className="group hover-card-effect flex h-full flex-col rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="mb-5 flex items-start justify-between">
                      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 text-xl font-bold text-primary shadow-sm">
                        {logoUrl ? (
                          <img alt={companyName} className="h-full w-full object-contain" src={logoUrl} />
                        ) : (
                          companyName.substring(0, 2).toUpperCase()
                        )}
                      </div>
                      <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${sectorClasses}`}>
                        {sector}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-primary dark:text-white">{companyName}</h4>
                      <div className="mb-4 flex items-center gap-1.5 text-sm text-slate-500">
                        <span className="material-symbols-outlined text-base">location_on</span>
                        <span>{company.location || 'Localisation non specifiee'}</span>
                      </div>
                      <div className="mb-6 inline-flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2 text-primary">
                        <span className="material-symbols-outlined text-base">work</span>
                        <span className="text-xs font-bold">{offersCount} offres disponibles</span>
                      </div>
                    </div>
                    <button
                      className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 py-3 text-sm font-bold text-slate-700 transition-all group-hover:bg-primary group-hover:text-white dark:bg-slate-800 dark:text-slate-300"
                      onClick={() => navigate(`/entreprises/${company.id}`)}
                    >
                      Voir le profil
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-20 flex justify-center">
            <button className="flex items-center gap-3 rounded-xl border-2 border-slate-200 px-10 py-4 font-bold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800" onClick={() => handleSearch()}>
              <span className="material-symbols-outlined text-xl">sync</span>
              Recharger les entreprises
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
