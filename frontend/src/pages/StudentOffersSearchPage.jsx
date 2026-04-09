import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentDashboardLayout from '../components/StudentDashboardLayout';

const stageOffers = [
  {
    id: 1,
    initials: 'CB',
    company: 'Coris Bank International',
    logo: 'https://logo.clearbit.com/corisbankinternational.com',
    title: 'Stagiaire Analyste Crédit',
    location: 'Ouagadougou',
    domain: 'Gestion & Finance',
    duration: '6 mois',
    compensation: 'Indemnité incluse',
    contractType: 'Stage Rémunéré',
    badge: 'Stage Rémunéré',
    badgeColors: 'bg-blue-50 text-primary',
    posted: 'Publié il y a 2 jours',
    applicants: '12 candidatures'
  },
  {
    id: 2,
    initials: 'SNB',
    company: 'SONABEL',
    logo: 'https://logo.clearbit.com/sonabel.bf',
    title: 'Ingénieur Électricien (Stagiaire)',
    location: 'Bobo-Dioulasso',
    domain: 'Ingénierie & BTP',
    duration: '3 mois',
    compensation: 'Temps plein',
    contractType: 'Académique',
    badge: 'Stage Académique',
    badgeColors: 'bg-blue-100 text-blue-700',
    posted: 'Publié il y a 3 jours',
    applicants: '8 candidatures'
  },
  {
    id: 3,
    initials: 'OR',
    company: 'Orange Burkina Faso',
    logo: 'https://logo.clearbit.com/orange.com',
    title: 'Développeur Fullstack Junior',
    location: 'Ouagadougou',
    domain: 'Informatique / IT',
    duration: '6 mois',
    compensation: 'Indemnité + Bonus',
    contractType: 'Professionnel',
    badge: 'Urgent',
    badgeColors: 'bg-blue-200 text-blue-800',
    posted: 'Publié il y a 5 jours',
    applicants: '24 candidatures'
  },
  {
    id: 4,
    initials: 'MV',
    company: 'Moov Africa Burkina',
    logo: 'https://logo.clearbit.com/moov-africa.com',
    title: 'Chargé de Clientèle (H/F)',
    location: 'Ouagadougou',
    domain: 'Marketing & Com',
    duration: '4 mois',
    compensation: 'Temps plein',
    contractType: 'Stage Rémunéré',
    badge: 'Stage Rémunéré',
    badgeColors: 'bg-blue-50 text-primary',
    posted: 'Publié il y a 1 semaine',
    applicants: '15 candidatures'
  }
];

const jobOffers = [
  {
    id: 1,
    initials: 'CB',
    company: 'Coris Bank International',
    logo: 'https://logo.clearbit.com/corisbankinternational.com',
    title: 'Analyste Financier Senior',
    location: 'Ouagadougou',
    domain: 'Gestion & Finance',
    workType: 'Temps plein',
    compensation: 'Salaire attractif',
    contractType: 'CDI',
    badge: 'CDI',
    badgeColors: 'bg-blue-50 text-primary',
    posted: 'Publié il y a 1 jour',
    applicants: '12 candidatures'
  },
  {
    id: 2,
    initials: 'OR',
    company: 'Orange Burkina Faso',
    logo: 'https://logo.clearbit.com/orange.com',
    title: 'Chef de Projet IT',
    location: 'Ouagadougou',
    domain: 'Informatique / IT',
    workType: 'CDI',
    compensation: 'Expérience 3+ ans',
    contractType: 'CDI',
    badge: 'Urgent',
    badgeColors: 'bg-blue-200 text-blue-800',
    posted: 'Publié il y a 3 jours',
    applicants: '24 candidatures'
  },
  {
    id: 3,
    initials: 'MV',
    company: 'Moov Africa Burkina',
    logo: 'https://logo.clearbit.com/moov-africa.com',
    title: 'Développeur Senior Java',
    location: 'Ouagadougou',
    domain: 'Informatique / IT',
    workType: 'Temps plein',
    compensation: 'Remote possible',
    contractType: 'CDD',
    badge: 'CDD',
    badgeColors: 'bg-blue-100 text-blue-700',
    posted: 'Publié il y a 5 jours',
    applicants: '15 candidatures'
  },
  {
    id: 4,
    initials: 'SNB',
    company: 'SONABEL',
    logo: 'https://logo.clearbit.com/sonabel.bf',
    title: 'Responsable Maintenance',
    location: 'Bobo-Dioulasso',
    domain: 'Ingénierie & BTP',
    workType: 'Temps plein',
    compensation: 'Technique',
    contractType: 'CDI',
    badge: 'CDI',
    badgeColors: 'bg-blue-50 text-primary',
    posted: 'Publié il y a 1 semaine',
    applicants: '8 candidatures'
  }
];

const cities = ['Ouagadougou', 'Bobo-Dioulasso', 'Koudougou'];
const domains = ['Informatique / IT', 'Gestion & Finance', 'Marketing & Com', 'Ingénierie & BTP'];

export default function StudentOffersSearchPage({ offerType = 'stage' }) {
  const navigate = useNavigate();
  const isJob = offerType === 'emploi';
  const offers = isJob ? jobOffers : stageOffers;

  const [keyword, setKeyword] = useState('');
  const [cityFilter, setCityFilter] = useState('Toutes');
  const [domainFilter, setDomainFilter] = useState('Tous');
  const [typeFilter, setTypeFilter] = useState('Tous');
  const [sortBy, setSortBy] = useState('recent');

  const typeOptions = isJob ? ['CDI', 'CDD', 'Freelance'] : ['Académique', 'Professionnel', 'Stage Rémunéré'];

  const filteredOffers = useMemo(() => {
    const filtered = offers.filter((offer) => {
      const keywordMatch =
        offer.title.toLowerCase().includes(keyword.toLowerCase()) ||
        offer.company.toLowerCase().includes(keyword.toLowerCase()) ||
        offer.domain.toLowerCase().includes(keyword.toLowerCase());

      const cityMatch = cityFilter === 'Toutes' ? true : offer.location === cityFilter;
      const domainMatch = domainFilter === 'Tous' ? true : offer.domain === domainFilter;
      const typeMatch = typeFilter === 'Tous' ? true : offer.contractType === typeFilter;

      return keywordMatch && cityMatch && domainMatch && typeMatch;
    });

    if (sortBy === 'applicants') {
      return [...filtered].sort((a, b) => Number.parseInt(b.applicants, 10) - Number.parseInt(a.applicants, 10));
    }

    return filtered;
  }, [offers, keyword, cityFilter, domainFilter, typeFilter, sortBy]);

  const detailsBasePath = isJob ? '/emplois' : '/stages';

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
              <div className="flex items-center flex-[1.5] px-3 py-2 border-r border-slate-200">
                <span className="material-symbols-outlined text-slate-400 mr-2">search</span>
                <input
                  className="w-full bg-transparent border-none text-slate-900 placeholder:text-slate-400 outline-none"
                  placeholder={isJob ? 'Métier, titre du poste...' : "Métier, domaine d'étude..."}
                  type="text"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                />
              </div>
              <div className="flex items-center flex-1 px-3 py-2 text-slate-600 text-sm font-semibold">
                <span className="material-symbols-outlined text-blue-600 mr-2">dashboard_customize</span>
                Filtrez avec les menus ci-dessous
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-2xl border border-blue-100 p-5 shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
              <select className="rounded-xl border border-blue-200 px-4 py-2.5 text-sm" value={cityFilter} onChange={(event) => setCityFilter(event.target.value)}>
                <option>Toutes</option>
                {cities.map((city) => (
                  <option key={city}>{city}</option>
                ))}
              </select>
              <select className="rounded-xl border border-blue-200 px-4 py-2.5 text-sm" value={domainFilter} onChange={(event) => setDomainFilter(event.target.value)}>
                <option>Tous</option>
                {domains.map((domain) => (
                  <option key={domain}>{domain}</option>
                ))}
              </select>
              <select className="rounded-xl border border-blue-200 px-4 py-2.5 text-sm" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
                <option>Tous</option>
                {typeOptions.map((type) => (
                  <option key={type}>{type}</option>
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
                Nous avons trouvé <span className="font-bold text-slate-900">{filteredOffers.length} offres</span>
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
                      onClick={() => navigate(`/postuler/${offer.id}`)}
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
