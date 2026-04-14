import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import EnterpriseDashboardLayout from '../components/EnterpriseDashboardLayout';

export default function EnterpriseCandidatesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState([]);
  const [selectedOfferId, setSelectedOfferId] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [search, setSearch] = useState('');
  const apiBaseUrl = api.defaults.baseURL || '';

  const resolveAvatarUrl = (value) => {
    if (!value) return '';
    if (value.startsWith('http')) return value;
    if (value.startsWith('/uploads/')) return `${apiBaseUrl}${value}`;
    return value;
  };

  const getStudentName = (student) => {
    const first = student?.firstName || '';
    const last = student?.lastName || '';
    const full = `${first} ${last}`.trim();
    return full || 'Candidat';
  };

  const fetchCandidates = async () => {
    try {
      const res = await api.get('/applications/enterprise');
      setCandidates(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const fetchOffers = async () => {
    try {
      const res = await api.get('/offers/mine');
      setOffers(res.data);
    } catch (err) {
      console.error('Failed to load offers', err);
    }
  };

  useEffect(() => {
    fetchCandidates();
    fetchOffers();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const offerId = params.get('offerId');
    if (offerId) {
      setSelectedOfferId(offerId);
    }
  }, [location.search]);

  const visibleCandidates = candidates.filter((app) => {
    const offerMatch = selectedOfferId ? app.offer?.id === selectedOfferId : true;
    const statusMatch = statusFilter === 'Tous' ? true : app.status === statusFilter;
    const query = search.trim().toLowerCase();
    const searchMatch = !query
      ? true
      : getStudentName(app.student).toLowerCase().includes(query)
        || (app.student?.user?.email || '').toLowerCase().includes(query)
        || (app.offer?.title || '').toLowerCase().includes(query);

    return offerMatch && statusMatch && searchMatch;
  });

  const handleStatusChange = async (id, status) => {
    try {
      await api.patch(`/applications/${id}/status`, { status });
      fetchCandidates();
    } catch (err) {
      console.error('Failed to change status', err);
    }
  };

  return (
    <EnterpriseDashboardLayout>
      {loading ? (
        <div className="text-center py-20 text-slate-500 font-bold">Chargement des candidats...</div>
      ) : (
      <>
      {/* Hero Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 text-center sm:text-left">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-2 block">Gestion des talents</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Candidatures reçues</h2>
          <p className="text-slate-500 mt-2 text-[15px] sm:text-base">Analysez et gérez les profils postulants pour vos offres en cours.</p>
        </div>
        
      </div>

      {/* Filters Section */}
      <div className="mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-3">Rechercher</label>
              <input
                className="w-full bg-slate-50 border-none rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-primary/20 py-3 px-4 text-slate-700 outline-none"
                placeholder="Candidat, email, offre..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                type="text"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-3">Filtrer par Offre</label>
              <div className="relative">
                <select
                  className="w-full bg-slate-50 border-none rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-primary/20 appearance-none py-3 px-4 text-slate-700 cursor-pointer outline-none"
                  value={selectedOfferId}
                  onChange={(event) => setSelectedOfferId(event.target.value)}
                >
                  <option value="">Toutes les offres</option>
                  {offers.map((offer) => (
                    <option key={offer.id} value={offer.id}>{offer.title}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none !text-[20px]">expand_more</span>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-3">Statut</label>
              <div className="relative">
                <select
                  className="w-full bg-slate-50 border-none rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-primary/20 appearance-none py-3 px-4 text-slate-700 cursor-pointer outline-none"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                >
                  <option value="Tous">Tous</option>
                  <option value="PENDING">En attente</option>
                  <option value="ACCEPTED">Acceptée</option>
                  <option value="REJECTED">Rejetée</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none !text-[20px]">expand_more</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Candidates Table Container */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100/50 overflow-hidden mb-12">
        <div className="min-w-full">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Candidat</th>
                <th className="px-6 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Université</th>
                <th className="px-6 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Offre</th>
                <th className="px-6 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Date</th>
                <th className="px-6 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Statut</th>
                <th className="px-6 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
    {visibleCandidates.map((app) => (
      <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group">
        <td className="px-6 py-5">
          <div className="flex items-center gap-4">
            <img alt="Candidat" className="w-10 h-10 rounded-full object-cover" src={resolveAvatarUrl(app.student?.user?.avatarUrl) || "https://ui-avatars.com/api/?name=" + encodeURIComponent(getStudentName(app.student))} />
            <div>
              <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">{getStudentName(app.student)}</p>
              <p className="text-[12px] text-slate-400 mt-0.5">{app.student?.user?.email}</p>
            </div>
          </div>
        </td>
        <td className="px-6 py-5">
          <p className="text-[14px] text-slate-700 font-medium">{app.student?.university || 'Universite non renseignee'}</p>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">{app.student?.fieldOfStudy || 'Domaine non renseigne'}</p>
        </td>
        <td className="px-6 py-5">
          <span className="px-3 py-1 bg-slate-100 text-slate-600 border border-slate-200/50 rounded-full text-[10px] font-bold uppercase tracking-wider">{app.offer?.title}</span>
        </td>
        <td className="px-6 py-5">
          <p className="text-[13px] text-slate-600 font-medium">{new Date(app.appliedAt).toLocaleDateString('fr-FR')}</p>
        </td>
        <td className="px-6 py-5">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${app.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-100/50' : app.status === 'ACCEPTED' ? 'bg-green-50 text-green-700 border-green-100/50' : 'bg-red-50 text-red-700 border-red-100/50'}`}>
            {app.status === 'PENDING' ? 'En attente' : app.status === 'ACCEPTED' ? 'Acceptée' : 'Rejetée'}
          </span>
        </td>
        <td className="px-6 py-5 text-right relative">
          <div className="group/action inline-block">
            <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-primary shadow-sm border border-transparent hover:border-slate-100 focus:outline-none">
              <span className="material-symbols-outlined !text-[20px]">more_vert</span>
            </button>
            <div className="absolute right-10 top-2 w-48 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 opacity-0 invisible group-focus-within/action:opacity-100 group-focus-within/action:visible z-50 flex flex-col py-1 overflow-hidden text-left">
              <button
                onClick={() => {
                  if (!app.id) {
                    alert('Profil etudiant indisponible pour cette candidature.');
                    return;
                  }
                  navigate(`/entreprise/candidats/${app.id}`);
                }}
                className="px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors flex items-center gap-3"
              >
                <span className="material-symbols-outlined !text-[18px]">person</span>
                Voir le profil
              </button>
              {app.status === 'PENDING' && (
                <>
                  <button onClick={() => handleStatusChange(app.id, 'ACCEPTED')} className="px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-green-50 hover:text-green-600 transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">check_circle</span> Accepter</button>
                  <button onClick={() => handleStatusChange(app.id, 'REJECTED')} className="px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">cancel</span> Rejeter</button>
                </>
              )}
              {app.status === 'ACCEPTED' && (
                <button onClick={() => handleStatusChange(app.id, 'REJECTED')} className="px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">cancel</span> Rejeter</button>
              )}
              {app.status === 'REJECTED' && (
                <button onClick={() => handleStatusChange(app.id, 'ACCEPTED')} className="px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-green-50 hover:text-green-600 transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">check_circle</span> Accepter</button>
              )}
            </div>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="p-6 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 gap-4">
          <p className="text-[13px] text-slate-500 font-medium">Affichage de <span className="text-slate-900 font-bold">{visibleCandidates.length}</span> candidatures</p>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-primary transition-all">
              <span className="material-symbols-outlined !text-[18px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-[13px] shadow-sm shadow-primary/20">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-slate-100 text-slate-600 hover:text-primary font-bold text-[13px] transition-all">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-slate-100 text-slate-600 hover:text-primary font-bold text-[13px] transition-all">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-primary transition-all">
              <span className="material-symbols-outlined !text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      </>
      )}
      </EnterpriseDashboardLayout>
  );
}
