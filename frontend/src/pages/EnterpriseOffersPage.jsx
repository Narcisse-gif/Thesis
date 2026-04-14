import EnterpriseDashboardLayout from '../components/EnterpriseDashboardLayout';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function EnterpriseOffersPage() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [pendingDeleteTitle, setPendingDeleteTitle] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [typeFilter, setTypeFilter] = useState('Tous');

  const getOfferRoute = (offer) => {
    if (!offer?.id) return '/entreprise/offres';
    return `/entreprise/offres/${offer.id}`;
  };

  const handleDelete = (offerId, title) => {
    if (!offerId) return;
    setPendingDeleteId(offerId);
    setPendingDeleteTitle(title || 'cette offre');
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    try {
      await api.delete(`/offers/${pendingDeleteId}`);
      setOffers((prev) => prev.filter((offer) => offer.id !== pendingDeleteId));
    } catch (err) {
      console.error('Failed to delete offer', err);
      setError("Impossible de supprimer l'offre");
    } finally {
      setPendingDeleteId(null);
      setPendingDeleteTitle('');
    }
  };

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const res = await api.get('/offers/mine');
        setOffers(res.data);
      } catch (err) {
        console.error('Error fetching offers:', err);
        setError('Erreur lors du chargement des offres');
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const filteredOffers = offers.filter((offer) => {
    const statusMatch = statusFilter === 'Tous' ? true : offer.status === statusFilter;
    const typeMatch = typeFilter === 'Tous'
      ? true
      : typeFilter === 'STAGE'
        ? offer.contractType === 'STAGE'
        : offer.contractType !== 'STAGE';
    return statusMatch && typeMatch;
  });

  return (
    <EnterpriseDashboardLayout>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-center sm:text-left">
        <div>
          <span className="text-primary font-semibold text-[10px] tracking-widest uppercase mb-2 block">Recrutement</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Gestion des Offres</h2>
          <p className="text-slate-500 mt-2 font-medium text-[15px] sm:text-base">Visualisez et gérez vos opportunités de carrière actuelles.</p>
        </div>
      </div>

      {/* Filters & Stats Bento */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="col-span-1 bg-white border border-slate-100/50 shadow-sm rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <div className="flex flex-col gap-1.5 flex-1 sm:flex-none">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Statut</label>
              <select
                className="bg-slate-50 border-none rounded-xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 min-w-[160px] cursor-pointer text-slate-700 py-2.5"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="Tous">Tous les statuts</option>
                <option value="ACTIVE">Active</option>
                <option value="EN_ATTENTE">En attente</option>
                <option value="EXPIREE">Expiree</option>
                <option value="SIGNALEE">Signalee</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5 flex-1 sm:flex-none">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Type d'offre</label>
              <select
                className="bg-slate-50 border-none rounded-xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 min-w-[160px] cursor-pointer text-slate-700 py-2.5"
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
              >
                <option value="Tous">Tous les types</option>
                <option value="STAGE">Stage</option>
                <option value="EMPLOI">Emploi</option>
              </select>
            </div>
          </div>
          <div className="hidden sm:block h-10 w-px bg-slate-100 mx-2"></div>
          <div className="flex items-center gap-8 justify-between sm:justify-end w-full sm:w-auto">
            <div className="text-left sm:text-right">
              <p className="text-2xl font-bold text-primary">{offers.filter((offer) => offer.status === 'ACTIVE').length}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Offres actives</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-2xl font-bold text-blue-600">{offers.reduce((total, offer) => total + (offer.applications?.length || 0), 0)}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Candidats totaux</p>
            </div>
          </div>
        </div>

        
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100/50 overflow-visible mb-8">
        <div className="min-w-full overflow-visible">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Titre de l'offre</th>
                <th className="px-6 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest text-center">Type</th>
                <th className="px-6 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Publication</th>
                <th className="px-6 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest text-center">Candidats</th>
                <th className="px-6 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Statut</th>
                <th className="px-8 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-500">Chargement des offres...</td>
                </tr>
              ) : filteredOffers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-500">Aucune offre trouvée.</td>
                </tr>
              ) : (
                filteredOffers.map((offer) => (
                  <tr key={offer.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div>
                        <p className="font-bold text-slate-900 text-[15px] group-hover:text-primary transition-colors">{offer.title}</p>
                        <p className="text-[12px] text-slate-400 mt-1">Lieu: {offer.location}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`border px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block ${offer.contractType === 'STAGE' ? 'bg-slate-100 text-slate-600 border-slate-200/50' : 'bg-blue-50 text-blue-700 border-blue-100/50'}`}>
                        {offer.contractType === 'STAGE' ? 'Stage' : 'Emploi'}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-[14px] font-medium text-slate-600">
                        {new Date(offer.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="inline-flex -space-x-2">
                        <div className="w-8 h-8 mx-auto rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                          {offer.applications ? offer.applications.length : 0}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${offer.status === 'ACTIVE' ? 'bg-blue-600' : offer.status === 'EN_ATTENTE' ? 'bg-amber-400' : 'bg-slate-400'}`}></span>
                        <span className={`text-[13px] font-semibold ${offer.status === 'ACTIVE' ? 'text-blue-700' : offer.status === 'EN_ATTENTE' ? 'text-amber-600' : 'text-slate-500'}`}>
                          {offer.status === 'ACTIVE' ? 'Active' : offer.status === 'EN_ATTENTE' ? 'En attente' : offer.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right relative border-l border-transparent">
                      <div className="relative inline-block text-left">
                        <button
                          className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-primary shadow-sm shadow-transparent hover:shadow-slate-200/50 border border-transparent hover:border-slate-100 focus:outline-none"
                          onClick={() => setDropdownOpen(dropdownOpen === offer.id ? null : offer.id)}
                        >
                          <span className="material-symbols-outlined !text-[20px]">more_vert</span>
                        </button>
                        {dropdownOpen === offer.id && (
                          <>
                            <div className="fixed inset-0 z-0" onClick={() => setDropdownOpen(null)}></div>
                            <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-20 text-[13px] font-medium">
                              <button
                                onClick={() => {
                                  setDropdownOpen(null);
                                  navigate(getOfferRoute(offer));
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                              >
                                <span className="material-symbols-outlined !text-[18px]">visibility</span>
                                Voir l'offre
                              </button>
                              <button
                                onClick={() => {
                                  setDropdownOpen(null);
                                  navigate(`/entreprise/offres/nouvelle?edit=${offer.id}`);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-700 flex items-center gap-2"
                              >
                                <span className="material-symbols-outlined !text-[18px]">edit</span>
                                Modifier
                              </button>
                              <button
                                onClick={() => {
                                  setDropdownOpen(null);
                                  handleDelete(offer.id, offer.title);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2"
                              >
                                <span className="material-symbols-outlined !text-[18px]">delete</span>
                                Supprimer
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-8 py-4 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 gap-4">
          <p className="text-[13px] font-medium text-slate-500">Affichage de 1 à {filteredOffers.length} offres</p>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white hover:text-primary hover:shadow-sm border border-transparent hover:border-slate-200 transition-all disabled:opacity-30" disabled>
              <span className="material-symbols-outlined !text-[20px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-white font-bold text-[13px] shadow-sm shadow-primary/20 hover:bg-blue-800 transition-colors">1</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white hover:text-primary hover:shadow-sm border border-transparent hover:border-slate-200 transition-all font-bold text-[13px]">2</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white hover:text-primary hover:shadow-sm border border-transparent hover:border-slate-200 transition-all font-bold text-[13px]">3</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white hover:text-primary hover:shadow-sm border border-transparent hover:border-slate-200 transition-all">
              <span className="material-symbols-outlined !text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
        {pendingDeleteId && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Supprimer l'offre</h3>
                <button
                  onClick={() => {
                    setPendingDeleteId(null);
                    setPendingDeleteTitle('');
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined !text-[20px]">close</span>
                </button>
              </div>
              <div className="px-6 py-5">
                <p className="text-sm text-slate-600">
                  Cette action est definitive. Voulez-vous vraiment supprimer {pendingDeleteTitle} ?
                </p>
              </div>
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setPendingDeleteId(null);
                    setPendingDeleteTitle('');
                  }}
                  className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-colors text-sm"
                  type="button"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition-colors text-sm"
                  type="button"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      </EnterpriseDashboardLayout>
  );
}
