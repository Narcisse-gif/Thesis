import { Link, useLocation } from 'react-router-dom';

export default function EnterpriseDashboardLayout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  return (
    <div className="bg-[#fafbfc] text-[#0f172a] min-h-screen flex selection:bg-primary/10 selection:text-primary font-display">
      
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 py-6 px-4 bg-slate-50 border-r border-slate-100 z-50">
        <div className="mb-10 px-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined !text-2xl">rocket_launch</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-900 tracking-tight">StageLink</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Burkina Faso</p>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1">
          <Link to="/entreprise/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${isActive('/entreprise/dashboard') ? 'font-semibold text-blue-700 border-r-4 border-blue-700 bg-blue-50/50' : 'font-medium text-slate-500 hover:text-blue-600 hover:bg-slate-100'}`}>
            <span className="material-symbols-outlined !text-xl">dashboard</span>
            Tableau de bord
          </Link>
          <Link to="/entreprise/offres" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${isActive('/entreprise/offres') ? 'font-semibold text-blue-700 border-r-4 border-blue-700 bg-blue-50/50' : 'font-medium text-slate-500 hover:text-blue-600 hover:bg-slate-100'}`}>
            <span className="material-symbols-outlined !text-xl">work</span>
            Offres
          </Link>
          <Link to="/entreprise/candidats" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${isActive('/entreprise/candidats') ? 'font-semibold text-blue-700 border-r-4 border-blue-700 bg-blue-50/50' : 'font-medium text-slate-500 hover:text-blue-600 hover:bg-slate-100'}`}>
            <span className="material-symbols-outlined !text-xl">group</span>
            Candidatures
          </Link>
          <Link to="/entreprise/messages" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${isActive('/entreprise/messages') ? 'font-semibold text-blue-700 border-r-4 border-blue-700 bg-blue-50/50' : 'font-medium text-slate-500 hover:text-blue-600 hover:bg-slate-100'}`}>
            <span className="material-symbols-outlined !text-xl">mail</span>
            Messages
          </Link>
          <Link to="/entreprise/parametres" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${isActive('/entreprise/parametres') ? 'font-semibold text-blue-700 border-r-4 border-blue-700 bg-blue-50/50' : 'font-medium text-slate-500 hover:text-blue-600 hover:bg-slate-100'}`}>
            <span className="material-symbols-outlined !text-xl">settings</span>
            Paramètres
          </Link>
        </nav>
        
        <div className="mt-auto pt-6 border-t border-slate-200">
          <button className="w-full bg-primary hover:bg-blue-800 text-white py-3 px-4 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined !text-sm">add</span>
            Nouvelle Offre
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 min-h-screen relative w-full">
        {/* Header */}
        <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] h-16 bg-white/70 backdrop-blur-xl border-b border-primary/5 z-40 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-lg">search</span>
              <input 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-[14px] focus:ring-2 focus:ring-primary/20 transition-all outline-none placeholder:text-slate-400" 
                placeholder="Rechercher une candidature..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 ml-auto">
            <button className="relative text-slate-600 hover:text-primary transition-colors">
              <span className="material-symbols-outlined !text-[22px]">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="text-slate-600 hover:text-primary transition-colors hidden sm:block">
              <span className="material-symbols-outlined !text-[22px]">help</span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-[12px] font-bold text-slate-900 group-hover:text-primary transition-colors">Cina Burkina SA</p>
                <p className="text-[10px] text-slate-500">Recruteur Pro</p>
              </div>
              <img 
                alt="Profil entreprise" 
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJqU_z885wsfTY4g3y616w-sAYQPeMjz4phQuYrHylkxbmljApD9IkvUfBIpo_bAf0L4uBVCTW5O6oXsoHNpkEHWwZNO75N4MqThzQq5_-06SfSTuly50ZICW95FWHbrzlahKWEc7F7et_OgK28obOMvyHGmdLv7mIXhqcFyiSBrr9e5nz_CL-MJJ7688-ymNF9J-27Aae2nKxAYKdfztKOkwCHvers0jAPz5m-GCQzHQ2YRZU369KMLlAvecpKRZxcBNqHvLL1oeQ" 
              />
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="pt-24 pb-24 md:pb-12 px-4 sm:px-8 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-6 py-3 flex justify-between items-center z-50">
        <Link to="/entreprise/dashboard" className={`flex flex-col items-center gap-1 ${isActive('/entreprise/dashboard') ? 'text-primary' : 'text-slate-400'}`}>
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/entreprise/dashboard') ? "'FILL' 1" : "" }}>dashboard</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Bord</span>
        </Link>
        <Link to="/entreprise/offres" className={`flex flex-col items-center gap-1 ${isActive('/entreprise/offres') ? 'text-primary' : 'text-slate-400'}`}>
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/entreprise/offres') ? "'FILL' 1" : "" }}>work</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Offres</span>
        </Link>
        <div className="relative -top-6">
          <button className="w-14 h-14 bg-primary text-white rounded-2xl shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
            <span className="material-symbols-outlined !text-3xl">add</span>
          </button>
        </div>
        <Link to="/entreprise/candidats" className={`flex flex-col items-center gap-1 ${isActive('/entreprise/candidats') ? 'text-primary' : 'text-slate-400'}`}>
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/entreprise/candidats') ? "'FILL' 1" : "" }}>group</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Candidats</span>
        </Link>
        <Link to="/entreprise/parametres" className={`flex flex-col items-center gap-1 ${isActive('/entreprise/parametres') ? 'text-primary' : 'text-slate-400'}`}>
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/entreprise/parametres') ? "'FILL' 1" : "" }}>person</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Compte</span>
        </Link>
      </nav>
    </div>
  );
}
