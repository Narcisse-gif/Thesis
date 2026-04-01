import StudentDashboardLayout from '../components/StudentDashboardLayout';

export default function StudentFavoritesPage() {
  return (
    <StudentDashboardLayout>
      {/* Header Section */}
      <header className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 block">Tableau de bord</span>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900">Mes Favoris</h2>
          <p className="text-slate-500 mt-2 text-lg">Vous avez sauvegardé <span className="text-primary font-semibold">6 opportunités</span> professionnelles.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-6 py-3 rounded-2xl bg-white text-slate-700 font-semibold text-sm shadow-sm hover:bg-slate-50 border border-slate-100/50 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined !text-[18px]">filter_list</span>
            Filtrer
          </button>
          <button className="flex-1 sm:flex-none px-6 py-3 rounded-2xl bg-primary text-white font-semibold text-sm shadow-md hover:bg-blue-800 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined !text-[18px]">share</span>
            Partager
          </button>
        </div>
      </header>

      {/* Bento Grid / Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        
        {/* Favori Card 1 */}
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-slate-100/50 hover:border-primary/20 hover:-translate-y-1">
          <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center overflow-hidden shadow-inner border border-slate-100">
              <img alt="Logo Orange Burkina" className="w-10 h-10 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMkN-HYHuaHjwUPKFsAjqVi9iITo47Lu3PIu_nC0xvuSyEdnoSBjfWKIhyYIHpc_wz7gehhodYNoZN1Q-fLFTY9RbxHNww6UL_uQyPmBMMWL2cXuNS4BNf52mDZ81uGEb2bzNRdwC6zSHxf18nUBh04omBzyz4RaAgqAkb8itSfcbWjZBi74JYGklhWDqeZpPSyVs5bmc4XeReAbnm4VIk6f4tR7pygH2F_7ViPhL28GoGO4hWSmL359BLou0jsPKcK11z_KDFNyA9" />
            </div>
            <div className="flex flex-col items-end gap-3">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider border border-blue-100/50">Temps plein</span>
              <button className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 transition-all hover:bg-red-100">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
              </button>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">Développeur Fullstack Junior</h3>
            <p className="text-slate-500 font-medium mb-4 flex items-center gap-1">
              Orange Burkina • <span className="text-sm">Ouagadougou</span>
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-100/50 text-slate-600 text-[11px] font-semibold">React</span>
              <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-100/50 text-slate-600 text-[11px] font-semibold">Node.js</span>
              <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-100/50 text-slate-600 text-[11px] font-semibold">Tailwind</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-4 mt-auto border-t border-slate-50">
            <button className="py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-blue-800 transition-all shadow-sm">Postuler</button>
            <button className="py-2.5 rounded-xl bg-slate-50 text-slate-700 font-bold text-sm hover:bg-slate-100 transition-all">Détails</button>
          </div>
        </div>

        {/* Favori Card 2 */}
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-slate-100/50 hover:border-primary/20 hover:-translate-y-1">
          <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center overflow-hidden shadow-inner border border-slate-100">
              <img alt="Logo Coris Bank" className="w-10 h-10 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSan75hdmHEj9sHmE1Ungu-p0P4G-vM4qALWXKir6IeSQdqUrRt1Z6xPhsXgG7ARbBA2iWMBycNxw1skhCHwFqsakYMW2efqS33394DJ78Qtm1ZNvxT8DZ6NJwV_OiO0beArRXohy4pcffn3xS15PBolu3lfvZ66vS8japnkiINZWtHgwKyal-KUkHOyof-Rn9FUF07HtTTIwX_WLIrohO6NPEpQ1ZSPwMgqm_YkqWM_nANwW3cPcs_u-hwIDqz9XtPtT4p0vG7oiy" />
            </div>
            <div className="flex flex-col items-end gap-3">
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider border border-indigo-100/50">Stage Pro</span>
              <button className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 transition-all hover:bg-red-100">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
              </button>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">Analyste Financier (Stage)</h3>
            <p className="text-slate-500 font-medium mb-4 flex flex-col sm:flex-row sm:items-center gap-1">
              Coris Bank Int. <span className="hidden sm:inline">•</span> <span className="text-sm">Ouagadougou</span>
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-100/50 text-slate-600 text-[11px] font-semibold">Audit</span>
              <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-100/50 text-slate-600 text-[11px] font-semibold">Comptabilité</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-4 mt-auto border-t border-slate-50">
            <button className="py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-blue-800 transition-all shadow-sm">Postuler</button>
            <button className="py-2.5 rounded-xl bg-slate-50 text-slate-700 font-bold text-sm hover:bg-slate-100 transition-all">Détails</button>
          </div>
        </div>

        {/* Favori Card 3 */}
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-slate-100/50 hover:border-primary/20 hover:-translate-y-1">
          <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center overflow-hidden shadow-inner border border-slate-100">
              <img alt="Logo NGO Burkina" className="w-10 h-10 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCptnxAkdaF5ZYsWyzSKbrCF70V05W1YF3Umql8Ruyckkby9JDbVkVu1Eqy63QjoYuC2rszpU2M2ccdWfdWtOHNao4y3j7_1d49ygqJqckUS9o-396RFCLxNNA1hxf2QOxUE-GBnUhW9x4DmhWTthXUhkchm4F2HJpdHTis528O2Qv3dCDx1cuUQv5gpt3PRrpjgnL7hXER85TRI722EKMaLZWKZlg1jV15-nVJv3k2ofTMNFOVd4Nn7BqLBky2704w0j5xgeVUO8Sk" />
            </div>
            <div className="flex flex-col items-end gap-3">
              <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-[10px] font-bold uppercase tracking-wider border border-teal-100/50">Hybride</span>
              <button className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 transition-all hover:bg-red-100">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
              </button>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">Chargé de Communication Sociale</h3>
            <p className="text-slate-500 font-medium mb-4 flex flex-col sm:flex-row sm:items-center gap-1">
              PLAN International <span className="hidden sm:inline">•</span> <span className="text-sm">Bobo-Dioulasso</span>
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-100/50 text-slate-600 text-[11px] font-semibold">Marketing</span>
              <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-100/50 text-slate-600 text-[11px] font-semibold">Rédaction</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-4 mt-auto border-t border-slate-50">
            <button className="py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-blue-800 transition-all shadow-sm">Postuler</button>
            <button className="py-2.5 rounded-xl bg-slate-50 text-slate-700 font-bold text-sm hover:bg-slate-100 transition-all">Détails</button>
          </div>
        </div>

        {/* Favori Card 4 */}
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-slate-100/50 hover:border-primary/20 hover:-translate-y-1">
          <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center overflow-hidden shadow-inner border border-slate-100">
              <img alt="Logo Startup" className="w-10 h-10 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhsfCpmmHJKbuH40A_oIhZS9hQV1k-sAf-Y-V0B1aS3tenEjJliwQ7AKVRFk0RnOB19xxmtMguDlS-dPpoKYtMGs-BP398d9G0Ftjga9aSF1exQfRJe1nUDwTY3x5FAbnWtLKe68xDmtrtafnp-jtvmOxaBaf2tGUKumKUEyOE8mfh6Vig8iod4s8Bsg_seyTjXUqWWh97rXgi9PKO_BiN8uw4ON-AXG0gw9Vv_pqpUJkS8ZEaDRPLRMtEW2i4KlPiVnJoIySWEYv1" />
            </div>
            <div className="flex flex-col items-end gap-3">
              <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold uppercase tracking-wider border border-purple-100/50">Freelance</span>
              <button className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 transition-all hover:bg-red-100">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
              </button>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">UI/UX Designer Freelance</h3>
            <p className="text-slate-500 font-medium mb-4 flex items-center gap-1">
              Sahel Digital • <span className="text-sm">Remote</span>
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-100/50 text-slate-600 text-[11px] font-semibold">Figma</span>
              <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-100/50 text-slate-600 text-[11px] font-semibold">Prototyping</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-4 mt-auto border-t border-slate-50">
            <button className="py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-blue-800 transition-all shadow-sm">Postuler</button>
            <button className="py-2.5 rounded-xl bg-slate-50 text-slate-700 font-bold text-sm hover:bg-slate-100 transition-all">Détails</button>
          </div>
        </div>

        {/* Favori Card 5 */}
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-slate-100/50 hover:border-primary/20 hover:-translate-y-1">
          <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center overflow-hidden shadow-inner border border-slate-100">
              <img alt="Logo DataFirm" className="w-10 h-10 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLT1UJcZ9Rcz-S_fOzZwO_aiSm1v2NYQZAeqOJOrWIPSLTyaudSD5K-MlGKE6ovEyT6AXEuZIHpv8t8mp8QL_RM3_Im91Dp2Tg4xtErpbSDx9P-sQvaN5zoyknzv4iztWHXQbPAnP0xz41jJH0eUiAUgGt7ipI05KxM5OXT0lPfvry8s40e1AzW_arEH6UyiJd3jgrlD2b7j6nw1y-W6erMxIVcfbtUNrTjWc96wkywz-N0L_WgJdvFrTrA3CeN3v47lsEjbKdo_zd" />
            </div>
            <div className="flex flex-col items-end gap-3">
              <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-[10px] font-bold uppercase tracking-wider border border-cyan-100/50">Stage PFE</span>
              <button className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 transition-all hover:bg-red-100">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
              </button>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">Data Analyst (Stage Fin d'Études)</h3>
            <p className="text-slate-500 font-medium mb-4 flex flex-col sm:flex-row sm:items-center gap-1">
              SNDI Burkina <span className="hidden sm:inline">•</span> <span className="text-sm">Ouagadougou</span>
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-100/50 text-slate-600 text-[11px] font-semibold">SQL</span>
              <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-100/50 text-slate-600 text-[11px] font-semibold">Python</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-4 mt-auto border-t border-slate-50">
            <button className="py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-blue-800 transition-all shadow-sm">Postuler</button>
            <button className="py-2.5 rounded-xl bg-slate-50 text-slate-700 font-bold text-sm hover:bg-slate-100 transition-all">Détails</button>
          </div>
        </div>

        {/* Empty State / Add Suggestion Card */}
        <div className="group relative bg-slate-50/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-200 hover:border-primary/50 transition-colors duration-300">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 text-primary shadow-sm group-hover:scale-110 transition-transform duration-300 border border-slate-100">
            <span className="material-symbols-outlined !text-3xl">add_circle</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Découvrir plus d'offres</h3>
          <p className="text-sm text-slate-500 mb-6 px-4">Continuez à explorer pour trouver l'opportunité qui vous correspond le mieux.</p>
          <button className="px-6 py-2.5 rounded-xl border border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-all">Parcourir les offres</button>
        </div>

      </div>

      {/* Pagination / Navigation Section */}
      <footer className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-slate-100">
        <span className="text-sm text-slate-500 font-medium text-center sm:text-left">Affichage de 1-5 sur 6 favoris</span>
        <div className="flex gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-slate-400 cursor-not-allowed border border-slate-100">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold shadow-sm border border-primary">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-slate-600 font-bold hover:bg-slate-50 transition-colors border border-slate-100">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-slate-600 hover:bg-slate-50 transition-colors border border-slate-100">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </footer>

    </StudentDashboardLayout>
  );
}
