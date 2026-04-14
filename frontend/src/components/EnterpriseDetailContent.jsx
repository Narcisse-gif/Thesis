import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import api from '../services/api';

export default function EnterpriseDetailContent({
  stageOfferPathBase = '/stages',
  jobOfferPathBase = '/emplois',
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiBaseUrl = api.defaults.baseURL || '';
  const resolveAssetUrl = (value) => {
    if (!value) return '';
    if (value.startsWith('http')) return value;
    if (value.startsWith('/uploads/')) return `${apiBaseUrl}${value}`;
    return value;
  };

  useEffect(() => {
    let isMounted = true;
    const fetchEnterprise = async () => {
      try {
        if (isMounted) {
          setLoading(true);
          setError('');
        }
        const includeAll = searchParams.get('includeAll') || searchParams.get('all');
        const response = await api.get(`/enterprises/${id}`, {
          params: includeAll ? { includeAll: 'true' } : undefined,
        });
        if (isMounted) {
          setData(response.data);
        }
      } catch (fetchError) {
        console.error('Failed to load enterprise:', fetchError);
        if (isMounted) {
          setError('Impossible de charger le profil de cette entreprise.');
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchEnterprise();

    return () => {
      isMounted = false;
    };
  }, [id, searchParams]);

  const enterprise = data?.enterprise;
  const offers = data?.offers || [];

  const headerValues = useMemo(() => {
    return {
      name: enterprise?.companyName || 'Entreprise',
      industry: enterprise?.industry || 'Secteur non specifie',
      location: enterprise?.location || 'Localisation non specifiee',
      shortDescription: enterprise?.shortDescription || 'Aucune description fournie.',
      website: enterprise?.website || '',
      size: enterprise?.companySize || 'Non specifie',
      logoUrl: resolveAssetUrl(enterprise?.logoUrl),
      bannerUrl: resolveAssetUrl(enterprise?.bannerUrl),
    };
  }, [enterprise]);

  const getOfferRoute = (offer) => (offer.contractType === 'STAGE'
    ? `${stageOfferPathBase}/${offer.id}`
    : `${jobOfferPathBase}/${offer.id}`);

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-48 sm:h-56 w-full relative overflow-hidden bg-slate-100">
          {headerValues.bannerUrl ? (
            <img alt="Banniere entreprise" className="w-full h-full object-cover" src={headerValues.bannerUrl} />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-slate-200 via-slate-100 to-blue-100" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-black/10"></div>
        </div>

        <div className="p-6 sm:p-10 md:p-12 space-y-12 relative">
          <header className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 border-b border-slate-100 pb-10">
            <div className="h-28 w-28 rounded-2xl border border-slate-200 bg-white p-3 shadow-md flex-shrink-0 -mt-20 relative z-10 group hover:shadow-lg transition-all overflow-hidden">
              {headerValues.logoUrl ? (
                <img alt={headerValues.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" src={headerValues.logoUrl} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-black text-primary">
                  {headerValues.name.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            <div className="text-center md:text-left space-y-3 flex-1">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{headerValues.name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-slate-500 font-medium">
                <span className="flex items-center gap-1.5 text-[14px]">
                  <span className="material-symbols-outlined text-primary !text-[20px]">corporate_fare</span>
                  {headerValues.industry}
                </span>
                <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="flex items-center gap-1.5 text-[14px]">
                  <span className="material-symbols-outlined text-primary !text-[20px]">location_on</span>
                  {headerValues.location}
                </span>
              </div>
            </div>

            <div className="flex w-full md:w-auto gap-3 pt-4 md:pt-0">
              {headerValues.website && (
                <a
                  className="flex-1 md:flex-none px-5 py-3 border border-slate-200 rounded-xl text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                  href={headerValues.website}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined !text-[18px]">language</span>
                  Site web
                </a>
              )}
              <button
                className="flex-1 md:flex-none px-8 py-3 bg-primary text-white rounded-xl font-bold text-[13px] hover:bg-blue-800 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                onClick={() => {
                  const target = document.getElementById('offers-section');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="material-symbols-outlined !text-[18px]">work</span>
                Voir les offres
              </button>
            </div>
          </header>

          <section className="space-y-4">
            <h2 className="text-[12px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
              <span className="material-symbols-outlined !text-[18px]">info</span>
              A propos de l'entreprise
            </h2>
            <div className="text-slate-600 leading-relaxed text-[15px]">
              {headerValues.shortDescription}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-slate-100">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Taille de l'entreprise</p>
              <p className="font-black text-[15px] text-slate-700 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary !text-[18px]">groups</span>
                {headerValues.size}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Localisation</p>
              <p className="font-black text-[15px] text-slate-700 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary !text-[18px]">location_on</span>
                {headerValues.location}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Secteur</p>
              <p className="font-black text-[15px] text-slate-700 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary !text-[18px]">corporate_fare</span>
                {headerValues.industry}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Site web</p>
              {headerValues.website ? (
                <a className="font-black text-[15px] text-primary hover:text-blue-800 transition-colors flex items-center gap-2" href={headerValues.website} rel="noreferrer" target="_blank">
                  <span className="material-symbols-outlined !text-[18px]">language</span>
                  {headerValues.website}
                </a>
              ) : (
                <p className="font-black text-[15px] text-slate-700">Non specifie</p>
              )}
            </div>
          </div>
        </div>
      </article>

      <section className="space-y-8 mt-16" id="offers-section">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold text-slate-900">Offres en cours</h2>
          <span className="text-slate-500 text-sm">
            {data?.activeOffersCount ?? offers.length} offres actives · {data?.offersCount ?? offers.length} au total
          </span>
        </div>

        {loading ? (
          <div className="text-center text-slate-500">Chargement des offres...</div>
        ) : error ? (
          <div className="text-center text-rose-500">{error}</div>
        ) : offers.length === 0 ? (
          <div className="text-center text-slate-500">Aucune offre disponible pour le moment.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/30 hover:shadow-lg transition-all group cursor-pointer" onClick={() => navigate(getOfferRoute(offer))}>
                <div className="flex justify-between items-start mb-5">
                  <span className="bg-blue-50 text-primary text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest border border-blue-100/50">
                    {offer.contractType === 'STAGE' ? 'Stage' : offer.contractType}
                  </span>
                  <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                    {offer.createdAt ? new Date(offer.createdAt).toLocaleDateString('fr-FR') : 'Date inconnue'}
                  </span>
                </div>
                <h3 className="text-[18px] font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">{offer.title}</h3>
                <p className="text-slate-500 text-[13px] mt-2 mb-6 line-clamp-2 leading-relaxed">{offer.description || 'Aucune description disponible.'}</p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-5">
                  <div className="flex items-center gap-2 text-[12px] font-bold text-slate-500">
                    <span className="material-symbols-outlined !text-[16px]">location_on</span>
                    {offer.location || headerValues.location}
                  </div>
                  <button className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-slate-200">
                    <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
