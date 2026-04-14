import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api';
import Popup from './Popup';
import { getToken, getUserRole } from '../utils/authStorage';

const formatDate = (value) => {
  if (!value) return 'Non renseigne';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Non renseigne';
  return date.toLocaleDateString('fr-FR');
};

const formatAmount = (value) => {
  if (value === null || value === undefined || value === '') {
    return 'Non renseigne';
  }
  if (typeof value === 'string' && /[a-zA-Z]/.test(value)) {
    return value;
  }
  const normalized = typeof value === 'string'
    ? value.replace(/\s+/g, '').replace(',', '.')
    : value;
  const numeric = Number(normalized);
  if (Number.isNaN(numeric)) {
    return String(value);
  }
  return `${new Intl.NumberFormat('fr-FR').format(numeric)} FCFA`;
};

const statusLabels = {
  ACTIVE: 'Active',
  EN_ATTENTE: 'En attente',
  EXPIREE: 'Expiree',
  SIGNALEE: 'Signalee',
};

const statusClasses = {
  ACTIVE: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  EN_ATTENTE: 'text-amber-700 bg-amber-50 border-amber-200',
  EXPIREE: 'text-slate-600 bg-slate-100 border-slate-200',
  SIGNALEE: 'text-rose-600 bg-rose-50 border-rose-200',
};

export default function OfferDetailContent({
  applyPathBase = '/postuler',
  showBackToList = false,
  stageListPath = '/stages',
  jobListPath = '/emplois',
  enterpriseProfileBasePath = '/entreprises',
}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiBaseUrl = api.defaults.baseURL || '';

  const resolveLogoUrl = (value) => {
    if (!value) return '';
    if (value.startsWith('http')) return value;
    if (value.startsWith('/uploads/')) return `${apiBaseUrl}${value}`;
    return value;
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/offers/${id}`);
        setOffer(response.data);
      } catch (err) {
        console.error(err);
        setError('Impossible de charger cette offre.');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const [popupOpen, setPopupOpen] = useState(false);
  const [pendingApplyId, setPendingApplyId] = useState(null);

  const handleApplyClick = () => {
    const token = getToken();
    const role = getUserRole();
    if (!token || role !== 'STUDENT') {
      if (!popupOpen) {
        setPendingApplyId(id);
        setPopupOpen(true);
      }
    } else {
      navigate(`${applyPathBase}/${id}`);
    }
  };

  if (loading) return <div className="text-center py-20 font-bold">Chargement...</div>;
  if (error) return <div className="text-center py-20 font-bold text-rose-600">{error}</div>;
  if (!offer) return <div className="text-center py-20 font-bold text-rose-600">Offre introuvable</div>;

  const contractType = offer.contractType === 'STAGE' ? 'Stage' : offer.contractType || 'Offre';
  const status = offer.status || 'EN_ATTENTE';
  const logoUrl = resolveLogoUrl(offer.enterprise?.logoUrl);
  const isExpired = status === 'EXPIREE';
  const listPath = offer.contractType === 'STAGE' ? stageListPath : jobListPath;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-12">
      {showBackToList && (
        <div className="px-6 sm:px-10 py-4 border-b border-slate-100">
          <button
            className="flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-primary transition-colors"
            onClick={() => navigate(listPath)}
          >
            <span className="material-symbols-outlined !text-[18px]">arrow_back</span>
            Retour aux offres
          </button>
        </div>
      )}
      {isExpired && (
        <div className="px-6 sm:px-10 py-4 bg-amber-50 border-b border-amber-200 text-amber-800 text-[13px] font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined !text-[18px]">schedule</span>
          Cette offre est expiree. Les candidatures ne sont plus acceptees.
        </div>
      )}
      <div className="p-6 sm:p-10 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-5">
              <span className={`px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-widest border ${statusClasses[status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                {statusLabels[status] || status}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight mb-5">
              {offer.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 sm:gap-8 text-slate-600">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl border border-slate-200 p-1.5 bg-white flex items-center justify-center overflow-hidden shadow-sm">
                  {logoUrl ? (
                    <img alt={offer.enterprise?.companyName || 'Entreprise'} className="object-contain" src={logoUrl} />
                  ) : (
                    <span className="text-[12px] font-black text-slate-400">{(offer.enterprise?.companyName || 'ENT').slice(0, 3).toUpperCase()}</span>
                  )}
                </div>
                <span className="font-extrabold text-primary uppercase text-[15px] tracking-wide">
                  {offer.enterprise?.companyName || "L'entreprise"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[14px] font-medium border-l border-slate-300 pl-5 sm:pl-8">
                <span className="material-symbols-outlined text-primary !text-[20px]">location_on</span>
                <span>{offer.location || 'Lieu non renseigne'}</span>
              </div>
              <div className="flex items-center gap-2 text-[14px] font-medium">
                <span className="material-symbols-outlined text-primary !text-[20px]">schedule</span>
                <span>{contractType}</span>
              </div>
              <div className="flex items-center gap-2 text-[14px] font-bold text-slate-800">
                <span className="material-symbols-outlined text-primary !text-[20px]">payments</span>
                <span>{formatAmount(offer.salaryOrStipend)}</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-5 max-w-[240px] shadow-sm">
              <p className="text-[11px] text-amber-800/80 font-black uppercase tracking-widest mb-1.5">Date limite</p>
              <p className="text-[18px] font-black text-amber-900">{formatDate(offer.applicationDeadline)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 p-6 sm:p-10 lg:border-r border-slate-100 space-y-10">
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-5 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">feed</span>
              Description du poste
            </h3>
            <div className="text-slate-600 leading-relaxed space-y-4 text-[15px] whitespace-pre-line">
              {offer.description || 'Aucune description fournie.'}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-5 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">target</span>
              Profil recherche
            </h3>
            <div className="text-slate-600 leading-relaxed text-[15px] whitespace-pre-line">
              {offer.candidateProfile || 'Aucun profil precise.'}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-5 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">checklist</span>
              Competences requises
            </h3>
            {offer.requiredSkills && offer.requiredSkills.length > 0 ? (
              <ul className="space-y-3">
                {offer.requiredSkills.map((skill, index) => (
                  <li key={`${skill}-${index}`} className="flex gap-3 text-[15px] text-slate-700 font-medium">
                    <span className="material-symbols-outlined text-blue-500 mt-0.5 !text-[18px]">check_circle</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500">Non specifie</p>
            )}
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-5 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">description</span>
              Documents requis
            </h3>
            {offer.requiredDocuments && offer.requiredDocuments.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {offer.requiredDocuments.map((doc) => (
                  <span key={doc} className="text-[12px] font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                    {doc}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">Aucun document specifie.</p>
            )}
          </section>

          <div className="pt-8 border-t border-slate-100">
            <button
              className={`w-full md:w-auto px-12 py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg ${
                isExpired
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed shadow-none'
                  : 'bg-primary text-white hover:bg-blue-800 shadow-primary/20 hover:-translate-y-0.5'
              }`}
              onClick={handleApplyClick}
              disabled={isExpired}
            >
              <span className="material-symbols-outlined">send</span>
              {isExpired ? 'Offre expiree' : 'Postuler a cette offre'}
            </button>
            <Popup
              open={popupOpen}
              onClose={() => {
                setPopupOpen(false);
                setPendingApplyId(null);
                navigate('/inscription/etudiant');
              }}
              title="Inscription requise"
              message="Pour postuler à une offre, vous devez être connecté avec un compte étudiant. Cliquez sur le bouton ci-dessous pour accéder à la page d'inscription."
            />
          </div>
        </div>

        <div className="bg-slate-50/50 p-6 sm:p-10 space-y-8">
          <div>
            <div className="bg-slate-900 px-6 py-2.5 -mx-6 sm:-mx-10 -mt-6 sm:-mt-10 mb-8 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-white !text-[18px]">corporate_fare</span>
              <span className="text-white font-bold text-[12px] uppercase tracking-widest">A propos de l'entreprise</span>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-2xl border border-slate-200 p-3 bg-white flex items-center justify-center overflow-hidden mb-5 shadow-sm">
                {logoUrl ? (
                  <img alt={offer.enterprise?.companyName || 'Entreprise'} className="object-contain" src={logoUrl} />
                ) : (
                  <span className="text-[14px] font-black text-slate-400">{(offer.enterprise?.companyName || 'ENT').slice(0, 3).toUpperCase()}</span>
                )}
              </div>
              <h4 className="font-black text-slate-900 text-lg uppercase tracking-tight">{offer.enterprise?.companyName || "L'entreprise"}</h4>
              <p className="text-[13px] font-bold text-slate-400 mt-1">{offer.enterprise?.industry || 'Secteur non renseigne'}</p>

              <div className="w-full mt-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4 text-left">
                <div className="flex items-center gap-3 text-[13px] font-semibold text-slate-700">
                  <span className="material-symbols-outlined text-primary !text-[18px]">location_on</span>
                  <span>{offer.location || 'Lieu non renseigne'}</span>
                </div>
                <div className="flex items-center gap-3 text-[13px] font-semibold text-slate-700">
                  <span className="material-symbols-outlined text-primary !text-[18px]">business_center</span>
                  <span>{contractType}</span>
                </div>
              </div>

              {offer.enterprise?.id && (
                <button
                  className="mt-6 text-[12px] font-bold uppercase tracking-widest text-primary hover:text-blue-700"
                  onClick={() => navigate(`${enterpriseProfileBasePath}/${offer.enterprise?.id}`)}
                >
                  Voir l'entreprise
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
