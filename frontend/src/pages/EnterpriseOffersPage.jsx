import EnterpriseDashboardLayout from '../components/EnterpriseDashboardLayout';

export default function EnterpriseOffersPage() {
  return (
    <EnterpriseDashboardLayout>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-center sm:text-left">
        <div>
          <span className="text-primary font-semibold text-[10px] tracking-widest uppercase mb-2 block">Recrutement</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Gestion des Offres</h2>
          <p className="text-slate-500 mt-2 font-medium text-[15px] sm:text-base">Visualisez et gérez vos opportunités de carrière actuelles.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
            <span className="material-symbols-outlined !text-xl">file_download</span>
            Exporter
          </button>
          <button className="w-full sm:w-auto bg-primary text-white px-8 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-800 transition-all shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined !text-xl">post_add</span>
            Nouvelle offre
          </button>
        </div>
      </div>

      {/* Filters & Stats Bento */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="col-span-1 md:col-span-3 bg-white border border-slate-100/50 shadow-sm rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
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

        <div className="bg-primary rounded-2xl p-6 text-white flex flex-col justify-between relative overflow-hidden group shadow-xl shadow-primary/20">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Performance</p>
            <h3 className="text-xl font-bold mt-1.5">+12% ce mois</h3>
          </div>
          <div className="mt-4 relative z-10">
            <span className="text-[13px] text-blue-100 leading-relaxed block">Taux de conversion élevé sur vos offres de stage.</span>
          </div>
          <span className="material-symbols-outlined absolute -bottom-4 -right-2 !text-[80px] text-white/10 group-hover:scale-110 transition-transform">trending_up</span>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100/50 overflow-hidden mb-8">
        <div className="overflow-x-auto min-w-full">
          <table className="w-full text-left whitespace-nowrap">
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
              
              {/* Row 1 */}
              <tr className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div>
                    <p className="font-bold text-slate-900 text-[15px] group-hover:text-primary transition-colors">Développeur Fullstack React/Node</p>
                    <p className="text-[12px] text-slate-400 mt-1">ID: SL-2024-081</p>
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className="bg-blue-50 text-blue-700 border border-blue-100/50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block">Emploi</span>
                </td>
                <td className="px-6 py-5">
                  <p className="text-[14px] font-medium text-slate-600">12 Oct 2023</p>
                </td>
                <td className="px-6 py-5 text-center">
                  <div className="inline-flex -space-x-2">
                    <img alt="Candidat" className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXDluFT0F_zHWiMkDXtx6Gw_uaCJqLnGzaSqg3R7yeBIU-gX9XGa5OSj7EM3UjTTol-20Nz73lAJJxxxTwApzA1DTc-RpvkPcTdPe-ybg6yd7s9MT7T4RrInieJqX5n5OCIVw38OMDXEggplADHwfZbRq85yurkX9ILXOoNrHSjbdqxWQGmfFs2pZUsK1wSO6pvBX6-CUjHshj5qQA-CAgg3kOfU0H4QdY_UMBEpQlE-eya-8DH6gbq3LZS-8ZjBHOS8xd3-GhQG--" />
                    <img alt="Candidat" className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC06hJpOQd2i3zlt1PAe_o3QSxnK7QWXK993jJC83HDthswq6NweMumnu30YJLY_aI4fbF5digDICoG_b99UDwFc3QdGs-utx2eCbeUXOSxRyWETOVO8Ybj8kfSJ2SGgwsFrwmd-vEhVX8UnqsE43j31PYaZhZRP3wWuiY96HREoV-ub0d_4oXH603uBZEM9NhtQxOulCw4pnVcrc-7eetc8lMfbmKf9iywE9YjODNLvhqFl6Yn68bdCu1M98S_7OpdyrNeX7KnSv-G" />
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">+42</div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-[13px] font-semibold text-emerald-600">Active</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-blue-50/50 transition-all border border-transparent hover:border-slate-100" title="Voir">
                      <span className="material-symbols-outlined !text-[20px]">visibility</span>
                    </button>
                    <button className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-blue-50/50 transition-all border border-transparent hover:border-slate-100" title="Modifier">
                      <span className="material-symbols-outlined !text-[20px]">edit</span>
                    </button>
                    <button className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-blue-50/50 transition-all border border-transparent hover:border-slate-100" title="Options">
                      <span className="material-symbols-outlined !text-[20px]">more_vert</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div>
                    <p className="font-bold text-slate-900 text-[15px] group-hover:text-primary transition-colors">Stagiaire Assistant Marketing</p>
                    <p className="text-[12px] text-slate-400 mt-1">ID: SL-2024-085</p>
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className="bg-slate-100 text-slate-600 border border-slate-200/50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block">Stage</span>
                </td>
                <td className="px-6 py-5">
                  <p className="text-[14px] font-medium text-slate-600">08 Oct 2023</p>
                </td>
                <td className="px-6 py-5 text-center">
                  <div className="inline-flex -space-x-2">
                    <img alt="Candidat" className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0F_PeYTTr0Y8AjZHMpuN7VetmMM_qTsmVRrTwGoICt0q4v_cIEdzDzCuPu1bGozEguYLyY30oSuKLQr4IG4itZkqgTI2UL1Ysp6kaooON2EHn6LC_L696XxpmrSTTNsXDoOWq22lmeCiBnW_QGVVoQe_y5U03fV219NXUv9xRJkpM7MwmBJMwpAt5KCUMxTJVGziC4scjNwBT_IZnaKTgm45Zukk0l1UeYUsI3-XGATZEayjo2lFjkQb7UnJVJBRjwc6d_Qbecoy-" />
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">+15</div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-[13px] font-semibold text-emerald-600">Active</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-blue-50/50 transition-all border border-transparent hover:border-slate-100" title="Voir">
                      <span className="material-symbols-outlined !text-[20px]">visibility</span>
                    </button>
                    <button className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-blue-50/50 transition-all border border-transparent hover:border-slate-100" title="Modifier">
                      <span className="material-symbols-outlined !text-[20px]">edit</span>
                    </button>
                    <button className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-blue-50/50 transition-all border border-transparent hover:border-slate-100" title="Options">
                      <span className="material-symbols-outlined !text-[20px]">more_vert</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-slate-50/50 transition-colors group opacity-70">
                <td className="px-8 py-5">
                  <div>
                    <p className="font-bold text-slate-900 text-[15px] group-hover:text-primary transition-colors">Comptable Senior</p>
                    <p className="text-[12px] text-slate-400 mt-1">ID: SL-2024-072</p>
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className="bg-blue-50 text-blue-700 border border-blue-100/50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block">Emploi</span>
                </td>
                <td className="px-6 py-5">
                  <p className="text-[14px] font-medium text-slate-600">15 Sep 2023</p>
                </td>
                <td className="px-6 py-5 text-center">
                  <div className="inline-flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">88</div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    <span className="text-[13px] font-semibold text-slate-500">Fermée</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-blue-50/50 transition-all border border-transparent hover:border-slate-100" title="Voir">
                      <span className="material-symbols-outlined !text-[20px]">visibility</span>
                    </button>
                    <button className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-blue-50/50 transition-all border border-transparent hover:border-slate-100" title="Relancer">
                      <span className="material-symbols-outlined !text-[20px]">restart_alt</span>
                    </button>
                    <button className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50/50 transition-all border border-transparent hover:border-red-100" title="Supprimer">
                      <span className="material-symbols-outlined !text-[20px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-slate-50/50 transition-colors group bg-slate-50/30">
                <td className="px-8 py-5">
                  <div>
                    <p className="font-bold text-slate-900 text-[15px] group-hover:text-primary transition-colors">Expert Sécurité Cloud</p>
                    <p className="text-[12px] text-slate-400 mt-1 italic">En cours de rédaction...</p>
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className="bg-blue-50 text-blue-700 border border-blue-100/50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block">Emploi</span>
                </td>
                <td className="px-6 py-5">
                  <p className="text-[14px] font-medium text-slate-400">--</p>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className="text-[12px] text-slate-400 font-semibold">N/A</span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span className="text-[13px] font-semibold text-amber-600">Brouillon</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button className="text-primary text-[11px] font-bold uppercase tracking-widest hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">Publier</button>
                    <button className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-blue-50/50 transition-all border border-transparent hover:border-slate-100" title="Modifier">
                      <span className="material-symbols-outlined !text-[20px]">edit</span>
                    </button>
                  </div>
                </td>
              </tr>
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

      {/* Featured Insight Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="bg-gradient-to-br from-primary to-blue-900 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-start sm:items-center gap-8 shadow-xl shadow-primary/20 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-white/10 relative z-10">
            <span className="material-symbols-outlined !text-[40px]">rocket_launch</span>
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Boostez votre visibilité</h3>
            <p className="text-[13px] text-blue-100 leading-relaxed max-w-sm">Les entreprises qui publient au moins 3 offres par mois reçoivent 40% de candidatures qualifiées en plus.</p>
            <button className="mt-5 text-[11px] font-bold uppercase tracking-widest bg-white text-primary px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-sm">
              En savoir plus
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-8 shadow-sm border border-slate-100/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -z-10 group-hover:bg-blue-50/50 transition-colors"></div>
          <div className="flex-1 w-full text-center sm:text-left">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Qualité des Candidats</h3>
            <div className="flex items-end justify-center sm:justify-start gap-2 mb-4">
              <span className="text-4xl font-black text-primary">8.4</span>
              <span className="text-slate-400 text-sm font-medium mb-1">/ 10 score moyen</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full relative overflow-hidden" style={{ width: '84%' }}>
                <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite] -translate-x-full"></div>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 font-bold uppercase mt-5 tracking-widest">Top Compétence : <span className="text-primary">Développement Mobile</span></p>
          </div>
          <div className="w-32 h-32 relative flex-shrink-0 mx-auto sm:mx-0">
            <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 100 100">
              <circle className="text-slate-100" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
              <circle className="text-primary transition-all duration-1000 ease-out" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="40" strokeWidth="8" strokeLinecap="round"></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-[15px] font-black text-slate-900">Stage</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Top type</span>
            </div>
          </div>
        </div>

      </div>

    </EnterpriseDashboardLayout>
  );
}
