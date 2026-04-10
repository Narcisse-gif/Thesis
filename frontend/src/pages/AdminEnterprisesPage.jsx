import React, { useState } from 'react';
import AdminDashboardLayout from '../components/AdminDashboardLayout';

export default function AdminEnterprisesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const [companies, setCompanies] = useState([
    { id: 'ENT-294', name: 'Coris Bank International', sector: 'Finance', joinedDate: 'Aug 10, 2023', status: 'Vérifié', offers: 14, logo: 'https://ui-avatars.com/api/?name=Coris+Bank&background=1e40af&color=fff' },
    { id: 'ENT-112', name: 'Orange Burkina', sector: 'Télécommunications', joinedDate: 'Sep 05, 2023', status: 'Vérifié', offers: 25, logo: 'https://ui-avatars.com/api/?name=Orange+Burkina&background=f97316&color=fff' },
    { id: 'ENT-405', name: 'Lydia Ludic', sector: 'Divertissement', joinedDate: 'Oct 18, 2023', status: 'Vérifié', offers: 3, logo: 'https://ui-avatars.com/api/?name=Lydia+Ludic&background=cbd5e1&color=0f172a' },
    { id: 'ENT-882', name: 'Burkina Tech Solutions', sector: 'IT & Logiciels', joinedDate: 'Dec 02, 2023', status: 'En attente', offers: 0, logo: 'https://ui-avatars.com/api/?name=Burkina+Tech+Solutions&background=3b82f6&color=fff' },
    { id: 'ENT-919', name: 'E-Shop Bobo', sector: 'E-commerce', joinedDate: 'Jan 15, 2024', status: 'Suspendu', offers: 0, logo: 'https://ui-avatars.com/api/?name=EShop+Bobo&background=fecdd3&color=991b1b' },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setCompanies(companies.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const filteredCompanies = companies.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.sector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tous' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminDashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Gestion des entreprises</h2>
          <p className="text-slate-500 mt-1.5 text-[15px]">Suivez et gérez les entreprises inscrites sur la plateforme.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-visible w-full flex flex-col min-h-[500px]">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none material-symbols-outlined text-slate-400 text-[20px]">search</span>
            <input 
              type="text" 
              placeholder="Rechercher une entreprise ou secteur..."
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
                <option value="Vérifié">Vérifié</option>
                <option value="En attente">En attente</option>
                <option value="Suspendu">Suspendu</option>
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
                <th className="px-6 py-4">Nom de l'entreprise</th>
                <th className="px-6 py-4">Secteur</th>
                <th className="px-6 py-4">Rejoint le</th>
                <th className="px-6 py-4 text-center">Offres</th>
                <th className="px-6 py-4">Statut KYC</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredCompanies.length > 0 ? filteredCompanies.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={c.logo} alt="logo" className="w-10 h-10 rounded-xl object-cover border border-slate-100" />
                      <div>
                        <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">{c.name}</p>
                        <p className="text-[12px] font-medium text-slate-500">{c.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] font-semibold text-slate-700">{c.sector}</td>
                  <td className="px-6 py-4 text-[13px] font-medium text-slate-500">{c.joinedDate}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-[13px] font-bold text-slate-900">{c.offers}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-md border ${c.status === 'Vérifié' ? 'text-blue-700 bg-blue-50 border-blue-200' : c.status === 'Suspendu' ? 'text-red-700 bg-red-50 border-red-200' : 'text-amber-700 bg-amber-50 border-amber-200'}`}>
                      {c.status === 'Vérifié' && <span className="material-symbols-outlined !text-[14px]">verified</span>}
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="relative inline-block text-left">
                      <button 
                         onClick={() => setDropdownOpen(dropdownOpen === c.id ? null : c.id)} 
                         className="w-8 h-8 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors flex items-center justify-center ml-auto"
                      >
                        <span className="material-symbols-outlined !text-[20px]">more_vert</span>
                      </button>
                      
                      {dropdownOpen === c.id && (
                        <>
                          <div className="fixed inset-0 z-0" onClick={() => setDropdownOpen(null)}></div>
                          <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-10 text-[13px] font-medium">
                            <button onClick={() => setDropdownOpen(null)} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2">
                              <span className="material-symbols-outlined !text-[18px]">visibility</span>
                              Voir le profil
                            </button>
                            
                            {c.status !== 'Vérifié' && (
                              <button 
                                onClick={() => { handleStatusChange(c.id, 'Vérifié'); setDropdownOpen(null); }}
                                className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-emerald-600 flex items-center gap-2"
                              >
                                <span className="material-symbols-outlined !text-[18px]">verified</span>
                                Vérifier (KYC)
                              </button>
                            )}

                            {c.status !== 'Suspendu' ? (
                              <button 
                                onClick={() => { handleStatusChange(c.id, 'Suspendu'); setDropdownOpen(null); }}
                                className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2"
                              >
                                <span className="material-symbols-outlined !text-[18px]">block</span>
                                Suspendre
                              </button>
                            ) : (
                               <button 
                                onClick={() => { handleStatusChange(c.id, 'En attente'); setDropdownOpen(null); }}
                                className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-emerald-600 flex items-center gap-2"
                              >
                                <span className="material-symbols-outlined !text-[18px]">check_circle</span>
                                Activer
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan="6" className="px-6 py-8 text-center text-slate-500 text-[13px]">
                      Aucune entreprise trouvée.
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredCompanies.length > 0 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-[13px] font-medium text-slate-500 mt-auto">
            <span>Affichage de 1 à {filteredCompanies.length} entreprises</span>
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



