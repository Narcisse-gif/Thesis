import React, { useState } from 'react';
import AdminDashboardLayout from '../components/AdminDashboardLayout';

export default function AdminOffersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const [offers, setOffers] = useState([
    { id: 'OFF-101', title: 'Développeur Fullstack React/Node', company: 'Burkina Tech Solutions', type: 'Emploi', date: 'Oct 12, 2023', status: 'Active', applies: 45, logo: 'https://ui-avatars.com/api/?name=Burkina+Tech+Solutions&background=3b82f6&color=fff' },
    { id: 'OFF-204', title: 'Stagiaire Assistant RH', company: 'Coris Bank', type: 'Stage', date: 'Nov 02, 2023', status: 'Active', applies: 120, logo: 'https://ui-avatars.com/api/?name=Coris+Bank&background=1e40af&color=fff' },
    { id: 'OFF-405', title: 'Responsable Marketing Digital', company: 'Orange Burkina', type: 'Emploi', date: 'Dec 15, 2023', status: 'Expirée', applies: 12, logo: 'https://ui-avatars.com/api/?name=Orange+Burkina&background=f97316&color=fff' },
    { id: 'OFF-550', title: 'Designer Graphique UX/UI', company: 'Agence Crea', type: 'Stage', date: 'Jan 10, 2024', status: 'Expirée', applies: 8, logo: 'https://ui-avatars.com/api/?name=Agence+Crea&background=8b5cf6&color=fff' },
    { id: 'OFF-712', title: 'Ingénieur DevOps Junior', company: 'Data Systems', type: 'Emploi', date: 'Fev 05, 2024', status: 'En attente', applies: 0, logo: 'https://ui-avatars.com/api/?name=Data+Systems&background=0f766e&color=fff' },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOffers(offers.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const filteredOffers = offers.filter(o => {
    const matchesSearch = o.title.toLowerCase().includes(searchTerm.toLowerCase()) || o.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tous' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminDashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Gestion des offres</h2>
          <p className="text-slate-500 mt-1.5 text-[15px]">Supervisez, validez et modérez les offres d'emploi et de stage.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-visible w-full flex flex-col min-h-[500px]">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none material-symbols-outlined text-slate-400 text-[20px]">search</span>
            <input 
              type="text" 
              placeholder="Rechercher une offre ou entreprise..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-primary/30 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-slate-200 text-slate-700 text-[13px] font-bold rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 cursor-pointer"
              >
                <option value="Tous">Tous les statuts</option>
                <option value="Active">Active</option>
                <option value="En attente">En attente</option>
                <option value="Expirée">Expirée</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 pointer-events-none text-[18px]">expand_more</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-visible w-full flex-grow pb-32">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Titre de l'offre</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Publiée le</th>
                <th className="px-6 py-4 text-center">Candidatures</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOffers.length > 0 ? filteredOffers.map(o => (
                <tr key={o.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={o.logo} alt="logo company" className="w-10 h-10 rounded-xl object-cover border border-slate-100" />
                      <div>
                        <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">{o.title}</p>
                        <p className="text-[12px] font-medium text-slate-500">{o.company} • {o.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">{o.type}</span>
                  </td>
                  <td className="px-6 py-4 text-[13px] font-medium text-slate-500">{o.date}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-[13px] font-bold text-slate-900">{o.applies}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-md border ${
                      o.status === 'Active' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 
                      o.status === 'Expirée' ? 'text-slate-600 bg-slate-100 border-slate-200' :
                      o.status === 'En attente' ? 'text-amber-700 bg-amber-50 border-amber-200' : ''
                    }`}>
                      {o.status === 'Active' && <span className="material-symbols-outlined !text-[14px]">check_circle</span>}
                      {o.status === 'Expirée' && <span className="material-symbols-outlined !text-[14px]">block</span>}
                      {o.status === 'En attente' && <span className="material-symbols-outlined !text-[14px]">schedule</span>}
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="relative inline-block text-left">
                      <button 
                         onClick={() => setDropdownOpen(dropdownOpen === o.id ? null : o.id)} 
                         className="w-8 h-8 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors flex items-center justify-center ml-auto"
                      >
                        <span className="material-symbols-outlined !text-[20px]">more_vert</span>
                      </button>
                      
                      {dropdownOpen === o.id && (
                        <>
                          <div className="fixed inset-0 z-0" onClick={() => setDropdownOpen(null)}></div>
                          <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-10 text-[13px] font-medium">
                            <button onClick={() => setDropdownOpen(null)} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2">
                              <span className="material-symbols-outlined !text-[18px]">visibility</span>
                              Voir l'offre
                            </button>
                            
                            {o.status === 'En attente' && (
                              <>
                                <button 
                                  onClick={() => { handleStatusChange(o.id, 'Active'); setDropdownOpen(null); }}
                                  className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-emerald-600 flex items-center gap-2"
                                >
                                  <span className="material-symbols-outlined !text-[18px]">thumb_up</span>
                                  Approuver
                                </button>
                                <button 
                                  onClick={() => { handleStatusChange(o.id, 'Expirée'); setDropdownOpen(null); }}
                                  className="w-full text-left px-4 py-2 hover:bg-amber-50 text-amber-600 flex items-center gap-2"
                                >
                                  <span className="material-symbols-outlined !text-[18px]">block</span>
                                  Rejeter (Expirer)
                                </button>
                              </>
                            )}

                            {o.status === 'Active' && (
                              <>
                                <button 
                                  onClick={() => { handleStatusChange(o.id, 'Expirée'); setDropdownOpen(null); }}
                                  className="w-full text-left px-4 py-2 hover:bg-amber-50 text-amber-600 flex items-center gap-2"
                                >
                                  <span className="material-symbols-outlined !text-[18px]">block</span>
                                  Marquer comme expirée
                                </button>
                                <button 
                                  onClick={() => { handleStatusChange(o.id, 'En attente'); setDropdownOpen(null); }}
                                  className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-600 flex items-center gap-2"
                                >
                                  <span className="material-symbols-outlined !text-[18px]">pause_circle</span>
                                  Suspendre (Mettre en attente)
                                </button>
                              </>
                            )}

                            {o.status === 'Expirée' && (
                               <button 
                                onClick={() => { handleStatusChange(o.id, 'Active'); setDropdownOpen(null); }}
                                className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-emerald-600 flex items-center gap-2"
                              >
                                <span className="material-symbols-outlined !text-[18px]">autorenew</span>
                                Renouveler l'offre
                              </button>
                            )}

                            <button 
                                onClick={() => { setDropdownOpen(null); }}
                                className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2 mt-1 border-t border-slate-100"
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
              )) : (
                <tr>
                   <td colSpan="6" className="px-6 py-8 text-center text-slate-500 text-[13px]">
                      Aucune offre trouvée.
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredOffers.length > 0 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-[13px] font-medium text-slate-500 mt-auto">
            <span>Affichage de 1 à {filteredOffers.length} offres</span>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 border border-slate-200 text-slate-400" disabled><span className="material-symbols-outlined !text-[16px]">chevron_left</span></button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 border border-slate-200 text-slate-400" disabled><span className="material-symbols-outlined !text-[16px]">chevron_right</span></button>
            </div>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
