import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminDashboardLayout from '../components/AdminDashboardLayout';
import api from '../services/api';

const formatDate = (value) => {
  if (!value) return 'Non renseigne';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Non renseigne';
  return date.toLocaleDateString('fr-FR');
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

export default function AdminOfferDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const companyName = offer?.enterprise?.companyName || 'Entreprise';
  const contractType = offer?.contractType === 'STAGE' ? 'Stage' : offer?.contractType || 'Offre';
  const status = offer?.status || 'EN_ATTENTE';

  return (
    <AdminDashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Details de l'offre</h2>
          <p className="text-slate-500 mt-1.5 text-[15px]">Consultez les informations de l'offre et son contexte.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate('/admin/offres')}
            className="px-4 py-2 bg-white text-slate-700 text-[13px] border border-slate-200 font-bold rounded-xl flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined !text-[18px]">arrow_back</span>
            Retour aux offres
          </button>
          <button
            onClick={() => navigate('/admin/moderation?tab=offres')}
            className="px-4 py-2 bg-slate-50 text-blue-600 text-[13px] border border-slate-200 font-bold rounded-xl flex items-center gap-2 hover:bg-blue-50 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined !text-[18px]">gavel</span>
            Aller a la moderation
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden w-full">
        {loading ? (
          <div className="p-8 text-slate-500">Chargement...</div>
        ) : error ? (
          <div className="p-8 text-rose-600 font-semibold">{error}</div>
        ) : !offer ? (
          <div className="p-8 text-slate-500">Offre introuvable.</div>
        ) : (
          <div className="p-8 space-y-10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <p className="text-[12px] font-black uppercase tracking-widest text-slate-400">{companyName}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{offer.title}</h3>
                <p className="text-[14px] text-slate-500 mt-2">{offer.location || 'Lieu non renseigne'}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[12px] font-bold px-2.5 py-1 rounded-md border bg-slate-50 text-slate-700">
                  {contractType}
                </span>
                <span className={`text-[12px] font-bold px-2.5 py-1 rounded-md border ${statusClasses[status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                  {statusLabels[status] || status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Date de publication</p>
                <p className="text-[16px] font-bold text-slate-900 mt-2">{formatDate(offer.createdAt)}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Date limite</p>
                <p className="text-[16px] font-bold text-slate-900 mt-2">{formatDate(offer.applicationDeadline)}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Remuneration</p>
                <p className="text-[16px] font-bold text-slate-900 mt-2">
                  {formatAmount(offer.salaryOrStipend)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h4 className="text-[15px] font-bold text-slate-900 mb-3">Description du poste</h4>
                  <p className="text-[14px] text-slate-600 leading-relaxed whitespace-pre-line">
                    {offer.description || 'Aucune description fournie.'}
                  </p>
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-slate-900 mb-3">Profil recherche</h4>
                  <p className="text-[14px] text-slate-600 leading-relaxed whitespace-pre-line">
                    {offer.candidateProfile || 'Aucun profil precise.'}
                  </p>
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-slate-900 mb-3">Competences requises</h4>
                  {offer.requiredSkills && offer.requiredSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {offer.requiredSkills.map((skill) => (
                        <span key={skill} className="text-[12px] font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 border border-blue-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[13px] text-slate-500">Aucune competence specifiee.</p>
                  )}
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-slate-900 mb-3">Documents requis</h4>
                  {offer.requiredDocuments && offer.requiredDocuments.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {offer.requiredDocuments.map((doc) => (
                        <span key={doc} className="text-[12px] font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                          {doc}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[13px] text-slate-500">Aucun document specifie.</p>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                  <h4 className="text-[14px] font-bold text-slate-900 mb-4">Infos complementaires</h4>
                  <div className="space-y-3 text-[13px] text-slate-600">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-500">Niveau d'etude</span>
                      <span className="font-semibold text-slate-800">{offer.studyLevel || 'Non renseigne'}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-500">Experience min.</span>
                      <span className="font-semibold text-slate-800">{offer.minExperience || 'Non renseigne'}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-500">Duree</span>
                      <span className="font-semibold text-slate-800">{offer.durationMonths || 'Non renseigne'}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-500">Embauche possible</span>
                      <span className="font-semibold text-slate-800">{offer.possibleHiring || 'Non renseigne'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                  <h4 className="text-[14px] font-bold text-slate-900 mb-4">Avantages</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed whitespace-pre-line">
                    {offer.benefits || 'Aucun avantage specifie.'}
                  </p>
                </div>

                {offer.enterprise?.id && (
                  <button
                    onClick={() => navigate(`/admin/entreprises/${offer.enterprise.id}`)}
                    className="w-full px-4 py-2 bg-white text-slate-700 text-[13px] border border-slate-200 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
                  >
                    <span className="material-symbols-outlined !text-[18px]">apartment</span>
                    Voir profil entreprise
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
