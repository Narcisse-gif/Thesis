import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import Popup from '../components/Popup';
import { getToken, getUserRole } from '../utils/authStorage';

const normalizeText = (value) => (value || '').toString().trim().toLowerCase();

const uniqueValues = (items) => Array.from(new Set(items.filter(Boolean)));

const getExperienceBucket = (value) => {
  const text = normalizeText(value);
  if (!text) return '';
  if (text.includes('senior') || text.includes('+ 5')) return 'Senior (+5 ans)';
  if (text.includes('confirme') || text.includes('3') || text.includes('5')) return 'Confirme (3-5 ans)';
  if (text.includes('junior') || text.includes('debutant') || text.includes('0') || text.includes('1') || text.includes('2')) {
    return 'Junior (0-2 ans)';
  }
  return '';
};

function JobsPage() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedContracts, setSelectedContracts] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const [pendingApplyId, setPendingApplyId] = useState(null);
  const apiBaseUrl = api.defaults.baseURL || '';

  const resolveMediaUrl = (value) => {
    if (!value) return '';
    if (value.startsWith('http')) return value;
    if (value.startsWith('/uploads/')) return `${apiBaseUrl}${value}`;
    return value;
  };

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const params = {};
        if (keyword.trim()) params.q = keyword.trim();
        if (cityQuery.trim()) {
          params.location = cityQuery.trim();
        } else if (selectedCities.length === 1) {
          params.location = selectedCities[0];
        }
        if (selectedDomains.length === 1) {
          params.industry = selectedDomains[0];
        }
        if (selectedContracts.length > 0) {
          params.contractType = selectedContracts.join(',');
        }

        const response = await api.get('/offers', { params });
        const dbOffers = response.data
          .filter((offer) => offer.contractType !== 'STAGE')
          .map((offer) => ({
            id: offer.id,
            initials: (offer.enterprise?.companyName || offer.title || 'OF').slice(0, 2).toUpperCase(),
            company: offer.enterprise?.companyName || 'Confidentiel',
            logo: resolveMediaUrl(offer.enterprise?.logoUrl),
            title: offer.title,
            location: offer.location || offer.enterprise?.location || 'Non specifie',
            domain: offer.enterprise?.industry || 'Autre',
            workType: offer.contractType || 'Non specifie',
            compensation: offer.salaryOrStipend ? `${new Intl.NumberFormat('fr-FR').format(Number(offer.salaryOrStipend))} FCFA` : 'Non specifie',
            badge: offer.contractType || 'Offre',
            badgeColors: 'bg-blue-50 text-primary',
            posted: offer.createdAt ? `Publie le ${new Date(offer.createdAt).toLocaleDateString('fr-FR')}` : 'Date inconnue',
            applicants: 'Non disponible',
            experienceBucket: getExperienceBucket(offer.minExperience),
            createdAt: offer.createdAt,
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
  }, [keyword, cityQuery, selectedCities, selectedDomains, selectedContracts]);

  const cityOptions = uniqueValues(offers.map((offer) => offer.location)).sort((a, b) => a.localeCompare(b, 'fr'));
  const domainOptions = uniqueValues(offers.map((offer) => offer.domain)).sort((a, b) => a.localeCompare(b, 'fr'));
  const contractOptions = uniqueValues(offers.map((offer) => offer.workType)).sort((a, b) => a.localeCompare(b, 'fr'));

  const filteredOffers = useMemo(() => {
    const filtered = offers.filter((offer) => {
      const keywordMatch = !keyword
        ? true
        : normalizeText(offer.title).includes(normalizeText(keyword)) ||
          normalizeText(offer.company).includes(normalizeText(keyword)) ||
          normalizeText(offer.domain).includes(normalizeText(keyword));

      const citySearchMatch = !cityQuery
        ? true
        : normalizeText(offer.location).includes(normalizeText(cityQuery));

      const cityMatch = selectedCities.length === 0
        ? true
        : selectedCities.some((city) => normalizeText(offer.location).includes(normalizeText(city)));

      const domainMatch = selectedDomains.length === 0
        ? true
        : selectedDomains.some((domain) => normalizeText(offer.domain).includes(normalizeText(domain)));

      const contractMatch = selectedContracts.length === 0
        ? true
        : selectedContracts.includes(offer.workType);

      const experienceMatch = !selectedExperience
        ? true
        : offer.experienceBucket === selectedExperience;

      return keywordMatch && citySearchMatch && cityMatch && domainMatch && contractMatch && experienceMatch;
    });

    return [...filtered].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }, [offers, keyword, cityQuery, selectedCities, selectedDomains, selectedContracts, selectedExperience]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="relative w-full py-20 md:py-32 mb-12">
            <div className="absolute inset-0 z-0">
              <img alt="Office Background" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqI1ZYs989a6DlyZ6cpqAxP19iLu7FrCHKwH8G7hNdqy1RL6Fa4m5IaSOY24Bb4wtF-6kROZxJGDRTlI5J6bA5wiIBrRKO9xf4hDUHZrQr5V6qkIl2BL15-QWQMwLc13jLb6ZYty8JPXlnAXAH-GxGeyng6u7tEXu1JfIyJP7F0blJz80SkbGRWR0JxaX3G5t09vNmWWBSCFsj0wboTqWqaM8xjhLYkoYOmK51SHyzF0YJe-oRwH5g0ygSF_cUO1a_NyFESbBQDn7f" />
              <div className="absolute inset-0 bg-slate-900/60 dark:bg-slate-900/80 backdrop-blur-[2px]"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 tracking-tight text-white">
                Trouvez votre <span className="text-blue-400">emploi ideal</span><br />
                <span className="text-blue-200">au Burkina Faso</span>
              </h1>
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row w-full relative gap-2 p-2 rounded-2xl bg-white/95 dark:bg-slate-800/95 backdrop-blur shadow-2xl border border-white/20">
                  <div className="flex items-center flex-[1.5] px-4 py-2 border-r border-slate-200 dark:border-slate-700">
                    <span className="material-symbols-outlined text-slate-400 mr-2">search</span>
                    <input
                      className="w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
                      placeholder="Metier, titre du poste (ex: Comptable)..."
                      type="text"
                      value={keyword}
                      onChange={(event) => setKeyword(event.target.value)}
                    />
                  </div>
                  <div className="flex items-center flex-1 px-4 py-2">
                    <span className="material-symbols-outlined text-slate-400 mr-2">location_on</span>
                    <input
                      className="w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
                      placeholder="Ville (ex: Ouaga)..."
                      type="text"
                      value={cityQuery}
                      onChange={(event) => setCityQuery(event.target.value)}
                    />
                  </div>
                  <button className="bg-primary text-white px-10 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20" type="button">
                    Rechercher
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row gap-8">
              <aside className="w-full lg:w-72 space-y-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="mb-6">
                    <h2 className="font-bold text-xl">Filtres</h2>
                  </div>
                  <div className="space-y-4 mb-8">
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Ville</p>
                    <div className="flex flex-col gap-3">
                      {cityOptions.map((city) => (
                        <label key={city} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            checked={selectedCities.includes(city)}
                            onChange={(event) => {
                              setSelectedCities((prev) => event.target.checked
                                ? [...prev, city]
                                : prev.filter((value) => value !== city));
                            }}
                            className="rounded-md text-primary focus:ring-primary h-5 w-5 border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                            type="checkbox"
                          />
                          <span className="text-sm font-medium group-hover:text-primary transition-colors">{city}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4 mb-8">
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Domaine d'etude</p>
                    <div className="flex flex-col gap-3">
                      {domainOptions.map((domain) => (
                        <label key={domain} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            checked={selectedDomains.includes(domain)}
                            onChange={(event) => {
                              setSelectedDomains((prev) => event.target.checked
                                ? [...prev, domain]
                                : prev.filter((value) => value !== domain));
                            }}
                            className="rounded-md text-primary focus:ring-primary h-5 w-5 border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                            type="checkbox"
                          />
                          <span className="text-sm font-medium group-hover:text-primary transition-colors">{domain}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4 mb-8">
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Type de contrat</p>
                    <div className="flex flex-col gap-3">
                      {contractOptions.map((contract) => (
                        <label key={contract} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            checked={selectedContracts.includes(contract)}
                            onChange={(event) => {
                              setSelectedContracts((prev) => event.target.checked
                                ? [...prev, contract]
                                : prev.filter((value) => value !== contract));
                            }}
                            className="rounded-md text-primary focus:ring-primary h-5 w-5 border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                            type="checkbox"
                          />
                          <span className="text-sm font-medium group-hover:text-primary transition-colors">{contract}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Niveau d'experience</p>
                    <div className="flex flex-col gap-3">
                      {['Junior (0-2 ans)', 'Confirme (3-5 ans)', 'Senior (+5 ans)'].map((level) => (
                        <label key={level} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            name="experience"
                            checked={selectedExperience === level}
                            onChange={() => setSelectedExperience(level)}
                            className="text-primary focus:ring-primary h-5 w-5 border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                            type="radio"
                          />
                          <span className="text-sm font-medium group-hover:text-primary transition-colors">{level}</span>
                        </label>
                      ))}
                      <button
                        type="button"
                        className="text-xs text-slate-400 hover:text-primary text-left"
                        onClick={() => setSelectedExperience('')}
                      >
                        Reinitialiser l'experience
                      </button>
                    </div>
                  </div>
                </div>
              </aside>
              <div className="flex-1">
                <div className="mb-8">
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Nous avons trouve <span className="font-bold text-slate-900 dark:text-white">{filteredOffers.length} offres</span> d'emploi</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {loading ? (
                    <div className="col-span-full text-center text-slate-500">Chargement des offres...</div>
                  ) : filteredOffers.length === 0 ? (
                    <div className="col-span-full text-center text-slate-500">Aucune offre disponible.</div>
                  ) : (
                    filteredOffers.map((offer) => (
                      <div key={offer.id} className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover-card-effect group flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center font-bold text-primary text-lg border border-slate-100 dark:border-slate-700 overflow-hidden">
                            {offer.logo ? (
                              <img
                                alt={`Logo ${offer.company}`}
                                className="w-full h-full object-contain"
                                src={offer.logo}
                                onError={(event) => {
                                  event.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(offer.initials)}&background=e0ecff&color=1d4ed8&bold=true`;
                                }}
                              />
                            ) : (
                              <span>{offer.initials}</span>
                            )}
                          </div>
                          <span className={`${offer.badgeColors} text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full`}>{offer.badge}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-1 text-primary group-hover:text-blue-700 transition-colors">{offer.title}</h3>
                        <p className="text-slate-500 text-sm font-medium mb-6">{offer.company}</p>
                        <div className="flex flex-wrap gap-x-6 gap-y-3 text-slate-500 text-sm mb-8">
                          <div className="flex items-center gap-1.5"><span className="material-symbols-outlined !text-lg opacity-70">location_on</span> {offer.location}</div>
                          <div className="flex items-center gap-1.5"><span className="material-symbols-outlined !text-lg opacity-70">schedule</span> {offer.workType}</div>
                          <div className="flex items-center gap-1.5"><span className="material-symbols-outlined !text-lg opacity-70">payments</span> {offer.compensation}</div>
                        </div>
                        <div className="flex items-center gap-3 mb-6 mt-auto">
                          <button
                            className="flex-1 py-2.5 bg-slate-50 dark:bg-slate-800 group-hover:bg-primary text-slate-700 dark:text-slate-300 group-hover:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                            onClick={() => {
                              const token = getToken();
                              const role = getUserRole();
                              if (!token || role !== 'STUDENT') {
                                if (!popupOpen) {
                                  setPendingApplyId(offer.id);
                                  setPopupOpen(true);
                                }
                              } else {
                                navigate(`/postuler/${offer.id}`);
                              }
                            }}
                          >
                            Postuler
                            <span className="material-symbols-outlined text-sm">send</span>
                          </button>
                          <button
                            className="flex-1 py-2.5 bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                            onClick={() => navigate(`/emplois/${offer.id}`)}
                          >
                            Details
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
      <Popup
        open={popupOpen}
        onClose={() => {
          setPopupOpen(false);
          setPendingApplyId(null);
          navigate('/inscription/etudiant');
        }}
        title="Inscription requise"
        message="Pour postuler a une offre, vous devez etre connecte avec un compte etudiant. Cliquez sur le bouton ci-dessous pour acceder a la page d'inscription."
      />
    </div>
  );
}

export default JobsPage;
