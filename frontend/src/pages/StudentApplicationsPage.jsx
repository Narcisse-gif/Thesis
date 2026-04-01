import StudentDashboardLayout from '../components/StudentDashboardLayout';

export default function StudentApplicationsPage() {
  return (
    <StudentDashboardLayout>
      {/* Hero / Header Section */}
      <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <span className="text-[0.75rem] font-bold text-primary uppercase tracking-[0.2em] mb-2 block">Suivi de carrière</span>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Candidatures en cours</h2>
          <p className="text-slate-500 mt-2">Gérez vos opportunités de stage et suivez vos progrès en temps réel.</p>
        </div>
        <div className="flex gap-3 hidden sm:flex">
          <div className="flex -space-x-3 overflow-hidden">
            <div className="inline-flex h-10 w-10 rounded-full ring-4 ring-white bg-slate-100 items-center justify-center text-[0.65rem] font-bold text-primary">+12</div>
          </div>
        </div>
      </div>

      {/* Bento Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="md:col-span-1 p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all border border-slate-100/50 hover:-translate-y-1 duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-blue-800 p-2 bg-blue-50 rounded-xl" style={{ fontVariationSettings: "'FILL' 0" }}>send</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">08</p>
          <p className="text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wider">Envoyées</p>
        </div>
        
        <div className="md:col-span-1 p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all border border-slate-100/50 hover:-translate-y-1 duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-amber-600 p-2 bg-amber-50 rounded-xl" style={{ fontVariationSettings: "'FILL' 0" }}>update</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">03</p>
          <p className="text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wider">En attente</p>
        </div>
        
        <div className="md:col-span-2 p-6 rounded-2xl bg-primary text-white relative overflow-hidden group shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all duration-300">
          <div className="relative z-10 hidden sm:block">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-white/80" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <span className="text-[0.75rem] font-bold uppercase tracking-widest text-white/80">Prochaine étape</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Entretien avec Orange BF</h3>
            <p className="text-white/70 text-sm">Demain à 10:30 • Siège social, Ouaga 2000</p>
          </div>
          <div className="relative z-10 sm:hidden">
            <h3 className="text-xl font-semibold mb-2">Entretien avec Orange BF</h3>
            <p className="text-white/70 text-sm">Demain à 10:30</p>
          </div>
          <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
            <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>event_upcoming</span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-100/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-5 text-[0.75rem] font-bold uppercase tracking-wider text-slate-500">Entreprise & Poste</th>
                <th className="px-8 py-5 text-[0.75rem] font-bold uppercase tracking-wider text-slate-500">Date d'envoi</th>
                <th className="px-8 py-5 text-[0.75rem] font-bold uppercase tracking-wider text-slate-500">Statut</th>
                <th className="px-8 py-5 text-[0.75rem] font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              
              {/* Row 1: Accepted */}
              <tr className="group hover:bg-slate-50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-slate-100 overflow-hidden shrink-0">
                      <img alt="Logo Orange" className="w-8 h-8 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUBkWdIt3xqxNDX7MNXz8e4WLDUDOHhDwhe7i1CHyOfDCQbLJfgrYxYSVBi-L1mg8mpCp1JYBjk6mF7lGDnSCfIboMYDIIGzi0ju4bfYXmG_ZnXzlyodjHUsB-ivVOmiuljlLdYEuVxhwNzmCaZHCoJRB7EWAfZ6uAV2bqnV0PTKe7HtDZRd7MbJ4KmMdxJe-wfkZDeCFJsv7LIZTe6da_G6WAmDQetsaPwa6e6auNez6t95mA7ZmeRwK37NcmckAbQTd077Ue4Uz4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Développeur Fullstack Junior</h4>
                      <p className="text-xs text-slate-500">Orange Burkina Faso • Ouagadougou</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    <span className="text-sm">12 Oct 2023</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-100">
                    Accepté
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="px-4 py-2 text-xs font-bold text-primary hover:bg-blue-50 rounded-lg transition-colors">Voir détails</button>
                    <button className="px-4 py-2 text-xs font-bold bg-primary text-white rounded-lg shadow-sm hover:bg-blue-800 transition-all">Contacter</button>
                  </div>
                </td>
              </tr>

              {/* Row 2: Pending */}
              <tr className="group hover:bg-slate-50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-slate-100 overflow-hidden shrink-0">
                      <img alt="Logo Coris Bank" className="w-8 h-8 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0RInhi9ABZQt_yNrzvO0AJGviGDRwxBFOriXQg0N_rhKe_M4KGZFy4SUr0h2hpbTGVD62hzgDUxSC-sq_RQMGhWy8Bsftm7GdSq8iyiOSKkEgN1EFSvsAVZoUEEI7S-4smryTYXtPBozFIG4huFLgvQEI4Qti7mNeQ0j58U-gDL21LlhGjGj9KGFJ-zCIXIHWJLJqIjmzl8Ja3DtnL0SdN-BvIDZNbsSMoD-UI3WzcNDSXbY-bvcegl0JpZHlUx-bIfxj93WAwaHJ" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Analyste Cybersécurité (Stage)</h4>
                      <p className="text-xs text-slate-500">Coris Bank International • Bobo-Dioulasso</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    <span className="text-sm">15 Oct 2023</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-amber-50 text-amber-700 border border-amber-100">
                    En attente
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="px-4 py-2 text-xs font-bold text-primary hover:bg-blue-50 rounded-lg transition-colors">Voir détails</button>
                    <button className="px-4 py-2 text-xs font-bold bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all">Relancer</button>
                  </div>
                </td>
              </tr>

              {/* Row 3: Rejected */}
              <tr className="group hover:bg-slate-50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-slate-100 overflow-hidden shrink-0">
                      <img alt="Logo Moov" className="w-8 h-8 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ0eDWdjbnc-qMOkL5dJntbdO5b4Rtu2S8_ltbhPAVubxXBsOr02DnPN9J67vlwZ3R7I6e0Hi8P8cEfL_IhWJ1Pu1W7_ywjCDV5CDrNTv-m5ZgL7ITydLBM93peDUk3Qscu0p9gCqWHF1QA7RFBdvrOqoXQ7ToFjEu-OpsTliZi5JD4_5-jSPUoaOzx2GHc0uwMjcPgQF-kWWMM6LnlCZp1LPt2_u5WMsi5CrxOpbnk5AJRL52uNMhP_z-l64bE4K99JpPMUUJX2ov" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Assistant Marketing Digital</h4>
                      <p className="text-xs text-slate-500">Moov Africa • Ouagadougou</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    <span className="text-sm">08 Oct 2023</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-slate-100 text-slate-500 border border-slate-200">
                    Refusé
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 rounded-lg transition-colors">Archive</button>
                    <button className="px-4 py-2 text-xs font-bold text-primary hover:bg-blue-50 rounded-lg transition-colors">Détails</button>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Pagination / Footer */}
        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[0.75rem] font-semibold text-slate-500 uppercase tracking-widest text-center sm:text-left">Affichage de 1-3 sur 8 candidatures</p>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 cursor-not-allowed">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white shadow-sm">
              <span className="text-xs font-bold">1</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:border-primary transition-colors">
              <span className="text-xs font-bold">2</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

    </StudentDashboardLayout>
  );
}
