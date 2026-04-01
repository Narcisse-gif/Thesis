import EnterpriseDashboardLayout from '../components/EnterpriseDashboardLayout';

export default function EnterpriseCandidatesPage() {
  return (
    <EnterpriseDashboardLayout>
      {/* Hero Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 text-center sm:text-left">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-2 block">Gestion des talents</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Candidatures reçues</h2>
          <p className="text-slate-500 mt-2 text-[15px] sm:text-base">Analysez et gérez les profils postulants pour vos offres en cours.</p>
        </div>
        <div className="flex justify-center sm:justify-end items-center gap-3">
          <div className="bg-white p-1.5 rounded-2xl flex shadow-sm border border-slate-100/50">
            <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-[13px] font-bold shadow-md shadow-primary/20">Liste</button>
            <button className="px-6 py-2.5 text-slate-500 text-[13px] font-bold hover:text-primary transition-colors">Pipeline</button>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
        
        {/* Filter: Offres */}
        <div className="md:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50">
          <label className="text-[10px] font-bold uppercase text-slate-400 block mb-3">Filtrer par Offre</label>
          <div className="relative">
            <select className="w-full bg-slate-50 border-none rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-primary/20 appearance-none py-3 px-4 text-slate-700 cursor-pointer outline-none">
              <option>Toutes les offres actives</option>
              <option>Développeur Fullstack Junior</option>
              <option>Assistant Marketing Digital</option>
              <option>Analyste Financier (Stage)</option>
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none !text-[20px]">expand_more</span>
          </div>
        </div>

        {/* Filter: Statut */}
        <div className="md:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50">
          <label className="text-[10px] font-bold uppercase text-slate-400 block mb-3">Statut du Processus</label>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-[12px] font-bold border border-blue-100/50">Tous</button>
            <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-full text-[12px] font-bold hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all">Nouveau</button>
            <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-full text-[12px] font-bold hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all">En cours</button>
            <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-full text-[12px] font-bold hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all">Accepté</button>
            <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-full text-[12px] font-bold hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all">Refusé</button>
          </div>
        </div>

        {/* Filter: Score Range */}
        <div className="md:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50">
          <label className="text-[10px] font-bold uppercase text-slate-400 block mb-3">Score de Match (Min %)</label>
          <div className="flex items-center gap-4 h-[40px]">
            <input className="w-full accent-primary h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer" max="100" min="0" type="range" defaultValue="75" />
            <span className="text-[14px] font-bold text-primary w-10 text-right">75%</span>
          </div>
        </div>
      </div>

      {/* Candidates Table Container */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100/50 overflow-hidden mb-12">
        <div className="overflow-x-auto min-w-full">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Candidat</th>
                <th className="px-6 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Université</th>
                <th className="px-6 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Offre</th>
                <th className="px-6 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Date</th>
                <th className="px-6 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Match Score</th>
                <th className="px-6 py-5 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              
              {/* Candidate Row 1 */}
              <tr className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img alt="Awa" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeGfhQxTqd8Ark0dTR17UmjrlIDqmYq-5_Pq66kZDElJmT3hw2osyXoRDnCsRUqIVZ04vZwoutRoBtMO2ZqJr61MbVxrbmSuucUTvBiZNSzqtJEHixaZRZq90jk453LlA1VIuGxQDwdt_DHty1rrMac_zTMlHp6Bi6fC5vSCese8XMAZgpbUh4HIK72XIOdzbA9fH3yxY9irBvp2RbkeqARTq6J8eWW_QqFLtHB4Q2t6GgiXuxHzGbdwFzN3Nt7Ce0soTl4g1W-bNH" />
                    <div>
                      <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">Awa Ouédraogo</p>
                      <p className="text-[12px] text-slate-400 mt-0.5">awa.ouedraogo@email.com</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-[14px] text-slate-700 font-medium">Université Joseph Ki-Zerbo</p>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">Master Informatique</p>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 border border-slate-200/50 rounded-full text-[10px] font-bold uppercase tracking-wider">Développeur Fullstack</span>
                </td>
                <td className="px-6 py-5">
                  <p className="text-[13px] text-slate-600 font-medium">12 Oct. 2023</p>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '92%' }}></div>
                    </div>
                    <span className="text-[13px] font-bold text-primary">92%</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100/50" title="Voir CV">
                      <span className="material-symbols-outlined !text-[20px]">description</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100/50" title="Envoyer Message">
                      <span className="material-symbols-outlined !text-[20px]">chat_bubble</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100/50" title="Changer Statut">
                      <span className="material-symbols-outlined !text-[20px]">more_vert</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Candidate Row 2 */}
              <tr className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img alt="Ibrahim" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhmEEAkTcjhXQ99FUj4uP7sAlxqPV3wBPHtkmVe26mPVO5IWMuiFKcrTz34RvPNBCScwEX3F607CBoX5kzyc81yajhdZzh8lwx8AcAmoFuVkV_CxRcYYcxnqDNAiBzOM5GRzANdYnhKN2pk2RddLwM7ZbBOFzOvmUcUarQo0-YwVOXOeAnjzpdlivtsbcrFlNfRe2T6b0Tg2Pgq12NYSfh-oRaOaj_89Lv48COhPHeb4jb82L6qgEBylSkqJVFIZbEZF7mCUBrRE6l" />
                    <div>
                      <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">Ibrahim Sawadogo</p>
                      <p className="text-[12px] text-slate-400 mt-0.5">ib.sawadogo@email.bf</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-[14px] text-slate-700 font-medium">ESI / Bobo-Dioulasso</p>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">Ingénieur Systèmes</p>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 border border-slate-200/50 rounded-full text-[10px] font-bold uppercase tracking-wider">Développeur Fullstack</span>
                </td>
                <td className="px-6 py-5">
                  <p className="text-[13px] text-slate-600 font-medium">10 Oct. 2023</p>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-[13px] font-bold text-blue-600">85%</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100/50">
                      <span className="material-symbols-outlined !text-[20px]">description</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100/50">
                      <span className="material-symbols-outlined !text-[20px]">chat_bubble</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100/50">
                      <span className="material-symbols-outlined !text-[20px]">more_vert</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Candidate Row 3 */}
              <tr className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img alt="Fatou" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeiLGiKjKr2c_C_pvxlCXzgi14iI-Beapu4XeHdLTk-XRFFAYWvNAQoGg6D0zWAiwohUpZVjF0TOx4USrxeBxCUCuLH4SLMZOX45k0xgzWTCFks7MRWwdlzWUIql1XuSPT4ZLMBM0QiD4SNspewLbGUwaOjVtMoUg2TiywmMnkQcz5phatiZa0NpJC2p2jYsPV3LUeETXZ2ZSuwrkT1dCA8K4aZ_6RdLaxkCFHUzEkpR2AQzCBxur5_zOxyB1_nPxhSMgSSAyizFnr" />
                    <div>
                      <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">Fatou Traoré</p>
                      <p className="text-[12px] text-slate-400 mt-0.5">fatou.t@email.com</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-[14px] text-slate-700 font-medium">IAM Ouagadougou</p>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">Licence Marketing</p>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 border border-slate-200/50 rounded-full text-[10px] font-bold uppercase tracking-wider">Assistant Marketing</span>
                </td>
                <td className="px-6 py-5">
                  <p className="text-[13px] text-slate-600 font-medium">09 Oct. 2023</p>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: '78%' }}></div>
                    </div>
                    <span className="text-[13px] font-bold text-emerald-600">78%</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100/50">
                      <span className="material-symbols-outlined !text-[20px]">description</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100/50">
                      <span className="material-symbols-outlined !text-[20px]">chat_bubble</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100/50">
                      <span className="material-symbols-outlined !text-[20px]">more_vert</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Candidate Row 4 */}
              <tr className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img alt="Moussa" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyMAk38AB-Y4gDaglTbseEJb41gbrnTiSRvAh2i70ycAsy0FZm1INZGyvxi0wztfyMqPqfxdRAvMKeSWk538MXmJUsIQSJYnqJ4w8qTx5JeoTaUxapHijKUz23vKH-Zjj16kJTQc1CW4D5gIjYYHoSdbJZCymBfB7OJ_6JKczmWaHq8YZGZZNT1Ki9iC5LK3FN0wW6rCIuZdrUAM6WMkhdQe8QCAOLrJr6-v4OtltWBP2kYsm8o5cN6PkUhEKroMQRT-V9-bJQzfGV" />
                    <div>
                      <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">Moussa Kabore</p>
                      <p className="text-[12px] text-slate-400 mt-0.5">kabore.m@email.bf</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-[14px] text-slate-700 font-medium">Aube Nouvelle</p>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">Comptabilité</p>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 border border-slate-200/50 rounded-full text-[10px] font-bold uppercase tracking-wider">Analyste Financier</span>
                </td>
                <td className="px-6 py-5">
                  <p className="text-[13px] text-slate-600 font-medium">08 Oct. 2023</p>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: '65%' }}></div>
                    </div>
                    <span className="text-[13px] font-bold text-amber-600">65%</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100/50">
                      <span className="material-symbols-outlined !text-[20px]">description</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100/50">
                      <span className="material-symbols-outlined !text-[20px]">chat_bubble</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100/50">
                      <span className="material-symbols-outlined !text-[20px]">more_vert</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="p-6 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 gap-4">
          <p className="text-[13px] text-slate-500 font-medium">Affichage de <span className="text-slate-900 font-bold">4</span> sur <span className="text-slate-900 font-bold">28</span> candidatures</p>
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

      {/* Premium Feature Upsell & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-gradient-to-br from-primary to-blue-900 p-8 rounded-3xl relative overflow-hidden flex flex-col justify-center min-h-[240px] shadow-xl shadow-primary/20">
          <div className="absolute right-0 top-0 w-2/3 h-full opacity-10 pointer-events-none">
            <svg className="w-full h-full scale-150 transform translate-x-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path d="M44.7,-76.4C58.2,-69.2,70.1,-58.5,78.2,-45.5C86.3,-32.5,90.6,-17.2,89.5,-2.2C88.4,12.8,81.9,27.5,72.9,40.3C63.8,53.1,52.3,64,39.1,71.5C25.9,79.1,10.9,83.3,-4.1,80.3C-19.1,77.3,-34,67.1,-46.7,56.1C59.4,45.1,-69.9,33.2,-75.7,19.3C-81.5,5.4,-82.7,-10.5,-77.9,-25.1C-73.1,-39.7,-62.4,-52.9,-49.5,-60.6C-36.6,-68.3,-21.5,-70.5,-6.3,-72.2C8.9,-73.9,23.1,-75.1,44.7,-76.4Z" fill="#FFFFFF" transform="translate(100 100)"></path>
            </svg>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-3">Accélérez vos recrutements</h3>
            <p className="text-blue-100 max-w-md mb-8 text-[14px] leading-relaxed">Utilisez l'Intelligence Artificielle de StageLink pour trier automatiquement les meilleurs CV selon vos critères de compétences.</p>
            <button className="px-6 py-3.5 bg-white text-primary font-bold rounded-2xl shadow-xl hover:bg-slate-50 transition-transform hover:-translate-y-0.5 flex items-center gap-2 w-fit text-[14px]">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              Activer le Tri IA
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm border border-slate-100/50 relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-5 border border-blue-100 group-hover:bg-white group-hover:shadow-sm transition-all">
              <span className="material-symbols-outlined !text-[32px]">insights</span>
            </div>
            <h4 className="text-[18px] font-bold text-slate-900 mb-6 w-full border-b border-slate-100 pb-4">Statistiques</h4>
            <div className="space-y-5 w-full">
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-slate-500 font-medium">Taux de réponse</span>
                <span className="font-bold text-primary">82%</span>
              </div>
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-slate-500 font-medium">Délai moyen</span>
                <span className="font-bold text-primary">3.2 jours</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </EnterpriseDashboardLayout>
  );
}
