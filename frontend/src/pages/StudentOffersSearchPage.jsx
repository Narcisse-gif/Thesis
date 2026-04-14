import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentDashboardLayout from '../components/StudentDashboardLayout';
import api from '../services/api';

const normalizeText = (value) => (value || '').toString().trim().toLowerCase();
const uniqueValues = (items) => Array.from(new Set(items.filter(Boolean)));

export default function StudentOffersSearchPage({ offerType = 'stage' }) {
  const navigate = useNavigate();
  const isJob = offerType === 'emploi';
  const [offersData, setOffersData] = useState({ stage: [], job: [] });
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [cityFilter, setCityFilter] = useState('Toutes');
  const [domainFilter, setDomainFilter] = useState('Tous');
  const [typeFilter, setTypeFilter] = useState('Tous');
  const [sortBy, setSortBy] = useState('recent');
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
        if (cityFilter !== 'Toutes') params.location = cityFilter;
        if (domainFilter !== 'Tous') params.industry = domainFilter;
        if (typeFilter !== 'Tous') params.contractType = typeFilter;
        if (sortBy === 'oldest') params.sort = 'oldest';

        const response = await api.get('/offers', { params });
        const mapped = response.data.map((offer) => {
          const badgeColors = offer.contractType === 'CDD'
            ? 'bg-blue-100 text-blue-700'
            : offer.contractType === 'CDI'
              ? 'bg-blue-50 text-primary'
              : 'bg-blue-50 text-primary';

          const salary = offer.salaryOrStipend;
          const compensation = salary !== null && salary !== undefined && salary !== ''
            ? `${new Intl.NumberFormat('fr-FR').format(Number(salary))} FCFA`
            : 'Non specifie';

          return {
            id: offer.id,
            initials: (offer.enterprise?.companyName || offer.title || 'OF').slice(0, 2).toUpperCase(),
            company: offer.enterprise?.companyName || 'Confidentiel',
            logo: resolveMediaUrl(offer.enterprise?.logoUrl) || `https://ui-avatars.com/api/?name=${encodeURIComponent(offer.title || 'OF')}&background=e0ecff&color=1d4ed8&bold=true`,
            title: offer.title,
            location: offer.location || offer.enterprise?.location || 'Non specifie',
            domain: offer.enterprise?.industry || 'Autre',
            duration: offer.durationMonths ? `${offer.durationMonths} mois` : 'Non specifie',
            workType: offer.contractType || 'Non specifie',
            compensation,
            contractType: offer.contractType,
            badge: offer.contractType || 'Offre',
            badgeColors,
            posted: offer.createdAt ? `Publie le ${new Date(offer.createdAt).toLocaleDateString('fr-FR')}` : 'Date inconnue',
            applicants: 'Non disponible',
          };
        });

        setOffersData({
          stage: mapped.filter((offer) => offer.contractType === 'STAGE'),
          job: mapped.filter((offer) => offer.contractType !== 'STAGE'),
        });
      } catch (error) {
        console.error('Failed to load offers:', error);
        setOffersData({ stage: [], job: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [keyword, cityFilter, domainFilter, typeFilter, sortBy]);

  const offers = isJob ? offersData.job : offersData.stage;

  const cityOptions = uniqueValues(offers.map((offer) => offer.location)).sort((a, b) => a.localeCompare(b, 'fr'));
  const domainOptions = uniqueValues(offers.map((offer) => offer.domain)).sort((a, b) => a.localeCompare(b, 'fr'));

  const typeOptions = isJob ? ['CDI', 'CDD'] : ['STAGE'];

  const filteredOffers = useMemo(() => {
    const filtered = offers.filter((offer) => {
      const keywordMatch =
        offer.title.toLowerCase().includes(keyword.toLowerCase()) ||
        offer.company.toLowerCase().includes(keyword.toLowerCase()) ||
        offer.domain.toLowerCase().includes(keyword.toLowerCase());

      const cityMatch = cityFilter === 'Toutes'
        ? true
        : normalizeText(offer.location).includes(normalizeText(cityFilter));
      const domainMatch = domainFilter === 'Tous'
        ? true
        : normalizeText(offer.domain).includes(normalizeText(domainFilter));
      const typeMatch = typeFilter === 'Tous' ? true : offer.contractType === typeFilter;

      return keywordMatch && cityMatch && domainMatch && typeMatch;
    });

    if (sortBy === 'applicants') {
      return [...filtered].sort((a, b) => {
        const left = Number.parseInt(b.applicants, 10) || 0;
        const right = Number.parseInt(a.applicants, 10) || 0;
        return left - right;
      });
    }

    return filtered;
  }, [offers, keyword, cityFilter, domainFilter, typeFilter, sortBy]);

  const detailsBasePath = isJob ? '/etudiant/emplois' : '/etudiant/stages';

  return (
    <StudentDashboardLayout>
      <section className="space-y-8">
        <div className="relative overflow-hidden rounded-3xl py-12 px-6 sm:px-10 bg-slate-900">
          <img
            alt="Office Background"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqI1ZYs989a6DlyZ6cpqAxP19iLu7FrCHKwH8G7hNdqy1RL6Fa4m5IaSOY24Bb4wtF-6kROZxJGDRTlI5J6bA5wiIBrRKO9xf4hDUHZrQr5V6qkIl2BL15-QWQMwLc13jLb6ZYty8JPXlnAXAH-GxGeyng6u7tEXu1JfIyJP7F0blJz80SkbGRWR0JxaX3G5t09vNmWWBSCFsj0wboTqWqaM8xjhLYkoYOmK51SHyzF0YJe-oRwH5g0ygSF_cUO1a_NyFESbBQDn7f"
          />
          <div className="absolute inset-0 bg-slate-900/60" />
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              {isJob ? "Offres d'emploi" : 'Offres de stage'}
            </h1>
            <p className="text-blue-100 mt-2">Même contenu que les pages publiques, intégré directement dans votre dashboard.</p>

            <div className="mt-8 flex flex-col lg:flex-row gap-3 p-3 rounded-2xl bg-white/95 shadow-2xl">
              <div className="flex items-center w-full px-3 py-2">
                <span className="material-symbols-outlined text-slate-400 mr-2">search</span>
                <input
                  className="w-full bg-transparent border-none text-slate-900 placeholder:text-slate-400 outline-none"
                  placeholder={isJob ? 'Métier, titre du poste...' : "Métier, domaine d'étude..."}
                  type="text"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-2xl border border-blue-100 p-5 shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
              <select className="rounded-xl border border-blue-200 px-4 py-2.5 text-sm" value={cityFilter} onChange={(event) => setCityFilter(event.target.value)}>
                <option>Toutes</option>
                {cityOptions.map((city) => (
                  <option key={city}>{city}</option>
                ))}
              </select>
              <select className="rounded-xl border border-blue-200 px-4 py-2.5 text-sm" value={domainFilter} onChange={(event) => setDomainFilter(event.target.value)}>
                <option>Tous</option>
                {domainOptions.map((domain) => (
                  <option key={domain}>{domain}</option>
                ))}
              </select>
              <select className="rounded-xl border border-blue-200 px-4 py-2.5 text-sm" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
                <option>Tous</option>
                {typeOptions.map((type) => (
                  <option key={type} value={type}>{type === 'STAGE' ? 'Stage' : type}</option>
                ))}
              </select>
              <button
                className="rounded-xl border border-blue-200 text-blue-700 text-sm font-bold hover:bg-blue-50 transition-colors"
                onClick={() => {
                  setKeyword('');
                  setCityFilter('Toutes');
                  setDomainFilter('Tous');
                  setTypeFilter('Tous');
                  setSortBy('recent');
                }}
              >
                Réinitialiser
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-8">
              <p className="text-slate-500 text-sm">
                {loading ? 'Chargement des offres...' : (
                  <>Nous avons trouvé <span className="font-bold text-slate-900">{filteredOffers.length} offres</span></>
                )}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Trier par:</span>
                <select
                  className="bg-transparent border-none outline-none text-sm font-bold py-1 cursor-pointer"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                >
                  <option value="recent">Plus récent</option>
                  <option value="applicants">Plus de candidatures</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredOffers.map((offer) => (
                <div key={offer.id} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm group flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center border border-blue-100 overflow-hidden p-2">
                      <img
                        alt={`Logo ${offer.company}`}
                        className="w-full h-full object-contain"
                        src={offer.logo}
                        onError={(event) => {
                          event.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(offer.initials)}&background=e0ecff&color=1d4ed8&bold=true`;
                        }}
                      />
                    </div>
                    <span className={`${offer.badgeColors} text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full`}>{offer.badge}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-primary">{offer.title}</h3>
                  <p className="text-slate-500 text-sm font-medium mb-6">{offer.company}</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-3 text-slate-500 text-sm mb-8">
                    <div className="flex items-center gap-1.5"><span className="material-symbols-outlined !text-lg opacity-70">location_on</span> {offer.location}</div>
                    <div className="flex items-center gap-1.5"><span className="material-symbols-outlined !text-lg opacity-70">work</span> {isJob ? offer.workType : offer.duration}</div>
                    <div className="flex items-center gap-1.5"><span className="material-symbols-outlined !text-lg opacity-70">payments</span> {offer.compensation}</div>
                  </div>
                  <div className="flex items-center gap-3 mb-6 mt-auto">
                    <button
                      className="flex-1 py-2.5 bg-slate-50 hover:bg-primary text-slate-700 hover:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                      onClick={() => navigate(`/etudiant/postuler/${offer.id}`)}
                    >
                      Postuler
                      <span className="material-symbols-outlined text-sm">send</span>
                    </button>
                    <button
                      className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                      onClick={() => navigate(`${detailsBasePath}/${offer.id}`)}
                    >
                      Détails
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                    <div className="flex items-center gap-1 text-[11px] text-slate-500"><span className="material-symbols-outlined !text-xs">calendar_today</span> {offer.posted}</div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500"><span className="material-symbols-outlined !text-xs">groups</span> {offer.applicants}</div>
                  </div>
                </div>
              ))}
            </div>

            {!filteredOffers.length && (
              <div className="mt-6 p-8 rounded-2xl bg-white border border-slate-100 text-center text-slate-500">
                Aucune offre ne correspond à vos filtres.
              </div>
            )}
          </div>
        </div>
      </section>
    </StudentDashboardLayout>
  );
}
