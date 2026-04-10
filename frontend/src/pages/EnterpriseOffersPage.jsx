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
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span className="text-[13px] font-semibold text-blue-700">Active</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right relative border-l border-transparent">
    <div className="group inline-block">
      <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-primary shadow-sm shadow-transparent hover:shadow-slate-200/50 border border-transparent hover:border-slate-100 focus:outline-none">
        <span className="material-symbols-outlined !text-[20px]">more_vert</span>
      </button>
      <div className="absolute right-10 top-10 w-40 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all z-10 flex flex-col py-1 overflow-hidden">
        <button className="px-4 py-2.5 text-left text-[13px] font-bold text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">visibility</span> Voir</button>
        <button className="px-4 py-2.5 text-left text-[13px] font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">edit</span> Modifier</button>
        <div className="h-px bg-slate-100 my-1"></div>
        <button className="px-4 py-2.5 text-left text-[13px] font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">delete</span> Supprimer</button>
      </div>
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
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span className="text-[13px] font-semibold text-blue-700">Active</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right relative border-l border-transparent">
    <div className="group inline-block">
      <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-primary shadow-sm shadow-transparent hover:shadow-slate-200/50 border border-transparent hover:border-slate-100 focus:outline-none">
        <span className="material-symbols-outlined !text-[20px]">more_vert</span>
      </button>
      <div className="absolute right-10 top-10 w-40 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all z-10 flex flex-col py-1 overflow-hidden">
        <button className="px-4 py-2.5 text-left text-[13px] font-bold text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">visibility</span> Voir</button>
        <button className="px-4 py-2.5 text-left text-[13px] font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">edit</span> Modifier</button>
        <div className="h-px bg-slate-100 my-1"></div>
        <button className="px-4 py-2.5 text-left text-[13px] font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">delete</span> Supprimer</button>
      </div>
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
                <td className="px-8 py-5 text-right relative border-l border-transparent">
    <div className="group inline-block">
      <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-primary shadow-sm shadow-transparent hover:shadow-slate-200/50 border border-transparent hover:border-slate-100 focus:outline-none">
        <span className="material-symbols-outlined !text-[20px]">more_vert</span>
      </button>
      <div className="absolute right-10 top-10 w-40 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all z-10 flex flex-col py-1 overflow-hidden">
        <button className="px-4 py-2.5 text-left text-[13px] font-bold text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">visibility</span> Voir</button>
        <button className="px-4 py-2.5 text-left text-[13px] font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">edit</span> Modifier</button>
        <div className="h-px bg-slate-100 my-1"></div>
        <button className="px-4 py-2.5 text-left text-[13px] font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">delete</span> Supprimer</button>
      </div>
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

      </EnterpriseDashboardLayout>
  );
}
