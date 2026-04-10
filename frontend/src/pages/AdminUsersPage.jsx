import React, { useState } from 'react';
import AdminDashboardLayout from '../components/AdminDashboardLayout';

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const [users, setUsers] = useState([
    { id: 'SLB-2934-21', name: 'Idrissa Barry', email: 'idrissa.barry@univ-ouaga.bf', joinedDate: 'Oct 12, 2023', status: 'Actif', avatar: 'https://ui-avatars.com/api/?name=Idrissa+Barry&background=e0e7ff&color=1e40af' },
    { id: 'SLB-4552-88', name: 'Moussa Diallo', email: 'moussa.d@outlook.com', joinedDate: 'Jan 22, 2024', status: 'Suspendu', avatar: 'https://ui-avatars.com/api/?name=Moussa+Diallo&background=fee2e2&color=b91c1c' },
    { id: 'SLB-9912-01', name: 'Alain Sanou', email: 'alain.sanou11@gmail.com', joinedDate: 'Mar 10, 2024', status: 'En attente', avatar: 'https://ui-avatars.com/api/?name=Alain+Sanou&background=f3f4f6&color=475569' },
    { id: 'SLB-0019-21', name: 'Fatimata Ouedraogo', email: 'fatim.o@yahoo.fr', joinedDate: 'Apr 02, 2024', status: 'Actif', avatar: 'https://ui-avatars.com/api/?name=Fatimata+Ouedraogo&background=e0e7ff&color=1e40af' },
    { id: 'SLB-3451-12', name: 'Kader Ilboudo', email: 'kader.ilb@gmail.com', joinedDate: 'Sep 18, 2023', status: 'Actif', avatar: 'https://ui-avatars.com/api/?name=Kader+Ilboudo&background=fef3c7&color=b45309' }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tous' || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminDashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Gestion des étudiants</h2>
          <p className="text-slate-500 mt-1.5 text-[15px]">Consultez, modifiez ou suspendez les comptes étudiants de la plateforme.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-visible w-full flex flex-col min-h-[500px]">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none material-symbols-outlined text-slate-400 text-[20px]">search</span>
            <input 
              type="text" 
              placeholder="Rechercher un étudiant..."
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
                <option value="Actif">Actif</option>
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
                <th className="px-6 py-4">Étudiant</th>
                <th className="px-6 py-4">Date d'inscription</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.length > 0 ? filteredUsers.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={u.avatar} alt="avatar" className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">{u.name}</p>
                        <p className="text-[12px] font-medium text-slate-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] font-medium text-slate-500">{u.joinedDate}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-md border ${u.status === 'Actif' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : u.status === 'Suspendu' ? 'text-red-700 bg-red-50 border-red-200' : 'text-amber-700 bg-amber-50 border-amber-200'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="relative inline-block text-left">
                      <button 
                         onClick={() => setDropdownOpen(dropdownOpen === u.id ? null : u.id)} 
                         className="w-8 h-8 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors flex items-center justify-center ml-auto"
                      >
                        <span className="material-symbols-outlined !text-[20px]">more_vert</span>
                      </button>
                      
                      {dropdownOpen === u.id && (
                        <>
                          <div className="fixed inset-0 z-0" onClick={() => setDropdownOpen(null)}></div>
                          <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-10 text-[13px] font-medium">
                            <button onClick={() => setDropdownOpen(null)} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2">
                              <span className="material-symbols-outlined !text-[18px]">visibility</span>
                              Voir le profil
                            </button>
                            {u.status === 'Actif' || u.status === 'En attente' ? (
                              <button 
                                onClick={() => { handleStatusChange(u.id, 'Suspendu'); setDropdownOpen(null); }}
                                className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2"
                              >
                                <span className="material-symbols-outlined !text-[18px]">block</span>
                                Suspendre
                              </button>
                            ) : (
                               <button 
                                onClick={() => { handleStatusChange(u.id, 'Actif'); setDropdownOpen(null); }}
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
                   <td colSpan="4" className="px-6 py-8 text-center text-slate-500 text-[13px]">
                      Aucun étudiant trouvé.
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        {filteredUsers.length > 0 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-[13px] font-medium text-slate-500 mt-auto">
            <span>Affichage de 1 à {filteredUsers.length} étudiants</span>
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



