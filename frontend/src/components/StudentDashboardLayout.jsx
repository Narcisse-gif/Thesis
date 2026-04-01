import { Link, useLocation } from 'react-router-dom';

export default function StudentDashboardLayout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  return (
    <div className="bg-[#fafbfc] text-[#0f172a] min-h-screen flex selection:bg-primary/10 selection:text-primary font-display">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col h-screen w-72 bg-white fixed left-0 top-0 py-12 px-8 z-50 border-r border-slate-100/60 shadow-sm">
        <div className="mb-16">
          <Link to="/etudiant/dashboard" className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary !text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>layers</span>
            StageLink
          </Link>
          <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mt-1">BURKINA FASO</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link to="/etudiant/dashboard" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-all group ${isActive('/etudiant/dashboard') ? 'text-primary bg-primary/[0.03] nav-active' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>
            <span className={`material-symbols-outlined text-xl ${isActive('/etudiant/dashboard') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>grid_view</span>
            <span className="text-[14px]">Tableau de bord</span>
            {isActive('/etudiant/dashboard') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
          </Link>
          
          <Link to="/etudiant/profil" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/etudiant/profil') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
            <span className={`material-symbols-outlined text-xl ${isActive('/etudiant/profil') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>person</span>
            <span className="text-[14px]">Profil</span>
            {isActive('/etudiant/profil') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
          </Link>
          
          <Link to="/etudiant/candidatures" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/etudiant/candidatures') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
            <span className={`material-symbols-outlined text-xl ${isActive('/etudiant/candidatures') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>work</span>
            <span className="text-[14px]">Candidatures</span>
            {isActive('/etudiant/candidatures') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
          </Link>

          <Link to="/etudiant/favoris" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/etudiant/favoris') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
            <span className={`material-symbols-outlined text-xl ${isActive('/etudiant/favoris') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>bookmark</span>
            <span className="text-[14px]">Favoris</span>
            {isActive('/etudiant/favoris') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
          </Link>

          <Link to="/etudiant/parametres" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/etudiant/parametres') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
            <span className={`material-symbols-outlined text-xl ${isActive('/etudiant/parametres') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>settings</span>
            <span className="text-[14px]">Paramètres</span>
            {isActive('/etudiant/parametres') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
          </Link>
        </nav>
        
        <div className="mt-auto pt-8 border-t border-slate-50">
          <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm">
              <span className="material-symbols-outlined !text-xl">help_outline</span>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-slate-700">Aide & Support</p>
              <p className="text-[10px] text-slate-400">Centre d'assistance</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 min-h-screen">
        {/* Header */}
        <header className="fixed top-0 right-0 w-full md:w-[calc(100%-18rem)] z-40 bg-[#fafbfc]/80 backdrop-blur-xl h-24 px-10 flex justify-between items-center border-b border-slate-100/50">
          <div className="flex items-center gap-4 w-1/2 hidden md:flex">
            <div className="relative w-full max-w-lg">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 !text-xl">search</span>
              <input 
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100/50 shadow-sm rounded-2xl text-[14px] focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all placeholder:text-slate-400 placeholder:font-normal outline-none" 
                placeholder="Rechercher une entreprise, un stage..." 
                type="text"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-8 ml-auto">
            <div className="flex items-center gap-3">
              <button className="relative p-2.5 rounded-xl text-slate-500 hover:bg-white hover:shadow-sm transition-all">
                <span className="material-symbols-outlined !text-[22px]">notifications</span>
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              </button>
              <button className="p-2.5 rounded-xl text-slate-500 hover:bg-white hover:shadow-sm transition-all hidden sm:block">
                <span className="material-symbols-outlined !text-[22px]">mail</span>
              </button>
            </div>
            <div className="flex items-center gap-4 pl-8 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-none">Moussa Traoré</p>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1.5">Master II MIAGE</p>
              </div>
              <div className="relative group cursor-pointer">
                <img 
                  alt="Moussa Traoré" 
                  className="h-11 w-11 rounded-xl object-cover ring-4 ring-slate-100/50 group-hover:ring-primary/10 transition-all" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbbE-29oZxa5cMvLOSguw34yhMmR6k-l6kty-ha3n4cO0a-Rr3tm4IACV3toqwlXBtMFEY0xzaO6Owa0AaFvUvVbJmEFToZw6H9XrvkdNl10Jf-rGMTO7IeVPAqh5COd1VvBsvIxb4jW6lW8h41vtmJZ7T8ujSQTpMGvx8YOOpcGBmDOQNGwF-INVPA1Rw9CbNqoby3lb41b5ah_3XkEzQWdQmy6XzN-b9Q4Eq5ZePWCbnr4v8jG6AqBFRNh0eBGQJ9hKg1CytV6pF" 
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="pt-36 pb-20 px-4 sm:px-10 max-w-[1440px] mx-auto space-y-10">
          {children}
        </div>
      </main>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 z-50 px-10 py-5 flex justify-between items-center rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <Link to="/etudiant/dashboard" className={`text-primary`}>
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/etudiant/dashboard') ? "'FILL' 1" : "" }}>grid_view</span>
        </Link>
        <Link to="/etudiant/candidatures" className="text-slate-400 hover:text-primary">
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/etudiant/candidatures') ? "'FILL' 1" : "" }}>work</span>
        </Link>
        <Link to="/etudiant/favoris" className="text-slate-400 hover:text-primary">
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/etudiant/favoris') ? "'FILL' 1" : "" }}>bookmark</span>
        </Link>
        <Link to="/etudiant/profil" className="text-slate-400 hover:text-primary">
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/etudiant/profil') ? "'FILL' 1" : "" }}>person</span>
        </Link>
      </nav>
    </div>
  );
}
