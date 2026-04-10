import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function EnterpriseDashboardLayout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  return (
    <div className="bg-[#fafbfc] text-[#0f172a] min-h-screen flex selection:bg-primary/10 selection:text-primary font-display">
      
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col h-screen w-72 bg-white fixed left-0 top-0 py-12 px-8 z-50 border-r border-slate-100/60 shadow-sm">
        <div className="mb-16">
          <Link to="/entreprise/dashboard" className="flex items-center gap-3">
            <img alt="StageLink Burkina Logo" className="h-10 w-auto object-contain" src={logo} />
            <div>
              <p className="text-xl font-bold tracking-tight text-slate-900">StageLink</p>
              <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mt-1">BURKINA FASO</p>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 space-y-2 overflow-y-auto px-1 pb-4 scrollbar-hide">
  <Link to="/entreprise/dashboard" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/entreprise/dashboard') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
    <span className={`material-symbols-outlined text-xl ${isActive('/entreprise/dashboard') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>grid_view</span>
    <span className="text-[14px]">Tableau de bord</span>
    {isActive('/entreprise/dashboard') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
  </Link>
  
  <Link to="/entreprise/offres" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/entreprise/offres') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
    <span className={`material-symbols-outlined text-xl ${isActive('/entreprise/offres') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>work</span>
    <span className="text-[14px]">Gestion des offres</span>
    {isActive('/entreprise/offres') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
  </Link>

  <Link to="/entreprise/candidats" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/entreprise/candidats') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
    <span className={`material-symbols-outlined text-xl ${isActive('/entreprise/candidats') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>groups</span>
    <span className="text-[14px]">Candidatures</span>
    {isActive('/entreprise/candidats') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
  </Link>

  <Link to="/entreprise/offres/nouvelle" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/entreprise/offres/nouvelle') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
    <span className={`material-symbols-outlined text-xl ${isActive('/entreprise/offres/nouvelle') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>post_add</span>
    <span className="text-[14px]">Nouvelle Offre</span>
    {isActive('/entreprise/offres/nouvelle') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
  </Link>

  <Link to="/entreprise/messages" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/entreprise/messages') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
    <span className={`material-symbols-outlined text-xl ${isActive('/entreprise/messages') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>mail</span>
    <span className="text-[14px]">Messagerie</span>
    {isActive('/entreprise/messages') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
  </Link>
  
  

  <div className="pt-4 mt-4 border-t border-slate-100">
      <Link to="/entreprise/profil" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/entreprise/profil') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
        <span className={`material-symbols-outlined text-xl ${isActive('/entreprise/profil') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>apartment</span>
        <span className="text-[14px]">Profil entreprise</span>
        {isActive('/entreprise/profil') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
    </Link>

    <Link to="/entreprise/parametres" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/entreprise/parametres') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
      <span className={`material-symbols-outlined text-xl ${isActive('/entreprise/parametres') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>settings</span>
      <span className="text-[14px]">Paramètres</span>
      {isActive('/entreprise/parametres') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
    </Link>
  </div>
</nav>
        
        <div className="mt-auto pt-8 border-t border-slate-50">
  
  <Link to="/conseils" className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3 hover:bg-blue-50 transition-colors group">
    <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm group-hover:text-primary transition-colors">
      <span className="material-symbols-outlined !text-xl">help_outline</span>
    </div>
    <div>
      <p className="text-[12px] font-semibold text-slate-700 group-hover:text-primary transition-colors">Aide & Support</p>
      <p className="text-[10px] text-slate-400">Centre d'aide</p>
    </div>
  </Link>
</div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 min-h-screen relative w-full">
        {/* Header */}
        <header className="fixed top-0 right-0 w-full md:w-[calc(100%-18rem)] z-40 bg-[#fafbfc]/80 backdrop-blur-xl h-24 px-10 flex justify-between items-center border-b border-slate-100/50">
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
            
            <Link to="/conseils" className="text-slate-600 hover:text-primary transition-colors hidden sm:block">
              <span className="material-symbols-outlined !text-[22px]">help</span>
            </Link>
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
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-4 py-3 flex justify-between items-center z-50 overflow-x-auto">
    <Link to="/entreprise/dashboard" className={`flex flex-col items-center gap-1 px-3 ${isActive('/entreprise/dashboard') ? 'text-primary' : 'text-slate-400'}`}>
      <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/entreprise/dashboard') ? "'FILL' 1" : "" }}>grid_view</span>
      <span className="text-[10px] font-bold uppercase tracking-tighter">Bord</span>
    </Link>
    <Link to="/entreprise/offres" className={`flex flex-col items-center gap-1 px-3 ${isActive('/entreprise/offres') ? 'text-primary' : 'text-slate-400'}`}>
      <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/entreprise/offres') ? "'FILL' 1" : "" }}>work</span>
      <span className="text-[10px] font-bold uppercase tracking-tighter">Offres</span>
    </Link>
    
    <Link to="/entreprise/candidats" className={`flex flex-col items-center gap-1 px-3 ${isActive('/entreprise/candidats') ? 'text-primary' : 'text-slate-400'}`}>
      <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/entreprise/candidats') ? "'FILL' 1" : "" }}>groups</span>
      <span className="text-[10px] font-bold uppercase tracking-tighter">Candidats</span>
    </Link>
    <Link to="/entreprise/offres/nouvelle" className={`flex flex-col items-center gap-1 px-3 ${isActive('/entreprise/offres/nouvelle') ? 'text-primary' : 'text-slate-400'}`}>
      <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/entreprise/offres/nouvelle') ? "'FILL' 1" : "" }}>post_add</span>
      <span className="text-[10px] font-bold uppercase tracking-tighter">Créer Offre</span>
    </Link>
</nav>
    </div>
  );
}
