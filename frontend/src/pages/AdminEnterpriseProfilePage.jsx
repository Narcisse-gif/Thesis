import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminDashboardLayout from '../components/AdminDashboardLayout';
import api from '../services/api';

export default function AdminEnterpriseProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState([]);
  const [offersLoading, setOffersLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/admin/users/${id}`);
        setProfile(response.data || null);
      } catch (error) {
        const status = error.response?.status;
        if (status === 404) {
          try {
            const listResponse = await api.get('/admin/users');
            const fallback = (listResponse.data || []).find((item) =>
              item.id === id || item.enterpriseProfile?.id === id
            );
            setProfile(fallback || null);
          } catch (fallbackError) {
            console.error(fallbackError);
            setProfile(null);
          }
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchOffers = async () => {
      try {
        const response = await api.get('/admin/offers');
        setOffers(response.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setOffersLoading(false);
      }
    };

    fetchUser();
    fetchOffers();
  }, [id]);

  const apiBaseUrl = api.defaults.baseURL || '';
  const resolveFileUrl = (value) => {
    if (!value) return '';
    if (value.startsWith('http')) return value;
    if (value.startsWith('/uploads/')) return `${apiBaseUrl}${value}`;
    return value;
  };

  const enterprise = profile?.enterpriseProfile;
  const companyName = enterprise?.companyName || 'Entreprise';
  const industry = enterprise?.industry || 'Secteur non renseigne';
  const location = enterprise?.location || 'Localisation non renseignee';
  const phoneNumber = enterprise?.phoneNumber || 'Telephone non renseigne';
  const address = enterprise?.address || 'Adresse non renseignee';
  const postalCode = enterprise?.postalCode || 'Code postal non renseigne';
  const logoUrl = resolveFileUrl(enterprise?.logoUrl);
  const bannerUrl = resolveFileUrl(enterprise?.bannerUrl);
  const initials = companyName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'ENT';
  const aboutText = enterprise?.shortDescription || 'Aucune description disponible.';
  const filteredOffers = offers.filter((offer) => offer.enterprise?.id === enterprise?.id);

  return (
    <AdminDashboardLayout>
      <div className="mb-6 flex items-center justify-start gap-3 w-full">
        <button
          className="flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-primary transition-colors"
          onClick={() => navigate(-1)}
        >
          <span className="material-symbols-outlined !text-[18px]">arrow_back</span>
          Retour
        </button>
      </div>

      {loading && (
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-6 text-slate-500">Chargement du profil...</div>
      )}

      {!loading && !profile ? (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 text-slate-500">Profil introuvable.</div>
      ) : null}

      {!loading && profile ? (
        <EnterpriseDashboardLayoutReadOnly
          companyName={companyName}
          industry={industry}
          location={location}
          phoneNumber={phoneNumber}
          address={address}
          postalCode={postalCode}
          logoUrl={logoUrl}
          bannerUrl={bannerUrl}
          initials={initials}
          aboutText={aboutText}
          website={enterprise?.website}
          companySize={enterprise?.companySize}
          cvUrl={enterprise?.cvUrl}
          offers={filteredOffers}
          offersLoading={offersLoading}
          resolveFileUrl={resolveFileUrl}
        />
      ) : null}
    </AdminDashboardLayout>
  );
}

function EnterpriseDashboardLayoutReadOnly({
  companyName,
  industry,
  location,
  phoneNumber,
  address,
  postalCode,
  logoUrl,
  bannerUrl,
  initials,
  aboutText,
  website,
  companySize,
  cvUrl,
  offers,
  offersLoading,
  resolveFileUrl,
}) {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-48 sm:h-56 w-full relative overflow-hidden bg-slate-100">
          {bannerUrl ? (
            <img alt="Banniere entreprise" className="w-full h-full object-cover" src={bannerUrl} />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-slate-200 via-slate-100 to-blue-100" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-black/10"></div>
        </div>

        <div className="p-6 sm:p-10 md:p-12 space-y-12 relative">
          <header className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 border-b border-slate-100 pb-10">
            <div className="h-28 w-28 rounded-2xl border border-slate-200 bg-white p-3 shadow-md flex-shrink-0 -mt-20 relative z-10 group hover:shadow-lg transition-all flex items-center justify-center">
              {logoUrl ? (
                <img alt={companyName} className="w-full h-full object-contain group-hover:scale-105 transition-transform" src={logoUrl} />
              ) : (
                <div className="w-full h-full rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center text-2xl font-black">
                  {initials}
                </div>
              )}
            </div>

            <div className="text-center md:text-left space-y-3 flex-1">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{companyName}</h1>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-slate-500 font-medium">
                <span className="flex items-center gap-1.5 text-[14px]">
                  <span className="material-symbols-outlined text-primary !text-[20px]">corporate_fare</span>
                  {industry}
                </span>
                <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="flex items-center gap-1.5 text-[14px]">
                  <span className="material-symbols-outlined text-primary !text-[20px]">location_on</span>
                  {location}
                </span>
              </div>
            </div>
          </header>

          <section className="space-y-4">
            <h2 className="text-[12px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
              <span className="material-symbols-outlined !text-[18px]">info</span>
              A propos de nous
            </h2>
            <div className="text-slate-600 leading-relaxed space-y-4 text-[15px]">
              <p>{aboutText}</p>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
            <section className="md:col-span-2 space-y-6">
              <h2 className="text-[12px] font-black uppercase tracking-widest text-primary">Informations Cles</h2>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Taille de l'entreprise</p>
                  <p className="font-black text-[15px] text-slate-700 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary !text-[18px]">groups</span>
                    {companySize || 'Non renseigne'}
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Telephone</p>
                  <p className="font-black text-[15px] text-slate-700 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary !text-[18px]">call</span>
                    {phoneNumber}
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Adresse</p>
                  <p className="font-black text-[15px] text-slate-700 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary !text-[18px]">home</span>
                    {address}
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Code postal</p>
                  <p className="font-black text-[15px] text-slate-700 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary !text-[18px]">markunread_mailbox</span>
                    {postalCode}
                  </p>
                </div>
                <div className="col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Site Web</p>
                  <a className="font-bold text-[15px] text-primary hover:text-blue-800 transition-colors flex items-center gap-2" href={website || '#'}>
                    <span className="material-symbols-outlined !text-[18px]">language</span>
                    {website || 'Non renseigne'}
                  </a>
                </div>
                {cvUrl ? (
                  <div className="col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Document entreprise</p>
                    <a className="font-bold text-[15px] text-primary hover:text-blue-800 transition-colors flex items-center gap-2" href={resolveFileUrl(cvUrl)} target="_blank" rel="noreferrer">
                      <span className="material-symbols-outlined !text-[18px]">download</span>
                      Telecharger le document
                    </a>
                  </div>
                ) : null}
              </div>
            </section>
          </div>
        </div>
      </article>

      <section className="space-y-8 mt-16">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold text-slate-900">Opportunites actuelles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offersLoading ? (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-slate-500">Chargement...</div>
          ) : offers.length === 0 ? (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-slate-500">
              Aucune offre publiee pour le moment.
            </div>
          ) : (
            offers.slice(0, 2).map((offer) => (
              <div key={offer.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/30 hover:shadow-lg transition-all group cursor-pointer">
                <div className="flex justify-between items-start mb-5">
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest border border-blue-100/50">
                    {offer.contractType === 'STAGE' ? 'Stage' : offer.contractType}
                  </span>
                  <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                    {new Date(offer.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <h3 className="text-[18px] font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">{offer.title}</h3>
                <p className="text-slate-500 text-[13px] mt-2 mb-6 line-clamp-2 leading-relaxed">{offer.description}</p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-5">
                  <div className="flex items-center gap-2 text-[12px] font-bold text-slate-500">
                    <span className="material-symbols-outlined !text-[16px]">location_on</span> {offer.location}
                  </div>
                  <button className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-slate-200">
                    <span className="material-symbols-outlined !text-[18px]">bookmark</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
