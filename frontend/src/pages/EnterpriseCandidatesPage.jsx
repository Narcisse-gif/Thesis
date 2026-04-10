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
        
      </div>

      {/* Filters Section */}
      <div className="mb-8">
        {/* Filter: Offres */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50">
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
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-100/50 uppercase tracking-wider">En attente</span>
                </td>
                <td className="px-6 py-5 text-right relative">
                  <div className="group/action inline-block">
                    <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-primary shadow-sm border border-transparent hover:border-slate-100 focus:outline-none">
                      <span className="material-symbols-outlined !text-[20px]">more_vert</span>
                    </button>
                    <div className="absolute right-10 top-2 w-48 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 opacity-0 invisible group-focus-within/action:opacity-100 group-focus-within/action:visible z-50 flex flex-col py-1 overflow-hidden text-left">
                      <button className="px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">person</span> Voir le profil</button>
                      <button className="px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">rule</span> Changer le statut</button>
                      <div className="h-px bg-slate-100 my-1"></div>
                      <button className="px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">chat_bubble</span> Texter</button>
                    </div>
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
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-green-50 text-green-700 border border-green-100/50 uppercase tracking-wider">Acceptée</span>
                </td>
                <td className="px-6 py-5 text-right relative">
                  <div className="group/action inline-block">
                    <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-primary shadow-sm border border-transparent hover:border-slate-100 focus:outline-none">
                      <span className="material-symbols-outlined !text-[20px]">more_vert</span>
                    </button>
                    <div className="absolute right-10 top-2 w-48 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 opacity-0 invisible group-focus-within/action:opacity-100 group-focus-within/action:visible z-50 flex flex-col py-1 overflow-hidden text-left">
                      <button className="px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">person</span> Voir le profil</button>
                      <button className="px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">rule</span> Changer le statut</button>
                      <div className="h-px bg-slate-100 my-1"></div>
                      <button className="px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">chat_bubble</span> Texter</button>
                    </div>
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
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-100/50 uppercase tracking-wider">Rejetée</span>
                </td>
                <td className="px-6 py-5 text-right relative">
                  <div className="group/action inline-block">
                    <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-primary shadow-sm border border-transparent hover:border-slate-100 focus:outline-none">
                      <span className="material-symbols-outlined !text-[20px]">more_vert</span>
                    </button>
                    <div className="absolute right-10 top-2 w-48 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 opacity-0 invisible group-focus-within/action:opacity-100 group-focus-within/action:visible z-50 flex flex-col py-1 overflow-hidden text-left">
                      <button className="px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">person</span> Voir le profil</button>
                      <button className="px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">rule</span> Changer le statut</button>
                      <div className="h-px bg-slate-100 my-1"></div>
                      <button className="px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">chat_bubble</span> Texter</button>
                    </div>
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
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-100/50 uppercase tracking-wider">En attente</span>
                </td>
                <td className="px-6 py-5 text-right relative">
                  <div className="group/action inline-block">
                    <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-primary shadow-sm border border-transparent hover:border-slate-100 focus:outline-none">
                      <span className="material-symbols-outlined !text-[20px]">more_vert</span>
                    </button>
                    <div className="absolute right-10 top-2 w-48 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 opacity-0 invisible group-focus-within/action:opacity-100 group-focus-within/action:visible z-50 flex flex-col py-1 overflow-hidden text-left">
                      <button className="px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">person</span> Voir le profil</button>
                      <button className="px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">rule</span> Changer le statut</button>
                      <div className="h-px bg-slate-100 my-1"></div>
                      <button className="px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">chat_bubble</span> Texter</button>
                    </div>
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

      </EnterpriseDashboardLayout>
  );
}
