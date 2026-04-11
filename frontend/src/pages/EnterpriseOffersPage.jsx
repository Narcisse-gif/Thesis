import EnterpriseDashboardLayout from '../components/EnterpriseDashboardLayout';
import { useState, useEffect } from 'react';
import api from '../services/api';

export default function EnterpriseOffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        // Assuming we want to fetch the current enterprise's offers.
        // If your backend doesn't have `/offers/me`, just fetch all and filter or handle it backend side.
        const res = await api.get('/offers'); 
        
        // For now, let's assume the dashboard only shows YOUR offers. If `/offers` returns all, 
        // we might filter by enterprise, or backend should filter based on token.
        // We'll set what we receive.
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
              <select className="bg-slate-50 border-none rounded-xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 min-w-[160px] cursor-pointer text-slate-700 py-2.5">
                <option>Tous les statuts</option>
                <option>Active</option>
                <option>Fermée</option>
                <option>Brouillon</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5 flex-1 sm:flex-none">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Type d'offre</label>
              <select className="bg-slate-50 border-none rounded-xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 min-w-[160px] cursor-pointer text-slate-700 py-2.5">
                <option>Tous les types</option>
                <option>Stage</option>
                <option>Emploi</option>
              </select>
            </div>
          </div>
          <div className="hidden sm:block h-10 w-px bg-slate-100 mx-2"></div>
          <div className="flex items-center gap-8 justify-between sm:justify-end w-full sm:w-auto">
            <div className="text-left sm:text-right">
              <p className="text-2xl font-bold text-primary">24</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Offres actives</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-2xl font-bold text-blue-600">158</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Candidats totaux</p>
            </div>
          </div>
        </div>

        
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100/50 overflow-hidden mb-8">
        <div className="min-w-full">
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
              ) : offers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-500">Aucune offre trouvée.</td>
                </tr>
              ) : (
                offers.map((offer) => (
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
                      <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-primary shadow-sm shadow-transparent hover:shadow-slate-200/50 border border-transparent hover:border-slate-100 focus:outline-none">
                        <span className="material-symbols-outlined !text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-8 py-4 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 gap-4">
          <p className="text-[13px] font-medium text-slate-500">Affichage de 1 à 4 sur 12 offres</p>
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
      </div>

      </EnterpriseDashboardLayout>
  );
}
