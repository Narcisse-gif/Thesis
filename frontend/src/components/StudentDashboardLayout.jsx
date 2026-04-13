import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import logo from '../assets/logo.png';

export default function StudentDashboardLayout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };

    fetchProfile();
    const handleProfileUpdate = (event) => {
      if (event?.detail) {
        setProfile(event.detail);
      } else {
        fetchProfile();
      }
    };

    window.addEventListener('profile:updated', handleProfileUpdate);
    return () => window.removeEventListener('profile:updated', handleProfileUpdate);
  }, []);

  const student = profile?.studentProfile;
  const displayName = [student?.firstName, student?.lastName].filter(Boolean).join(' ') || profile?.email || 'Etudiant';
  const displayLevel = 'Profil';
  const apiBaseUrl = api.defaults.baseURL || '';
  const resolveAvatarUrl = (value) => {
    if (!value) return '';
    if (value.startsWith('http')) return value;
    if (value.startsWith('/uploads/')) return `${apiBaseUrl}${value}`;
    return value;
  };
  const avatarUrl = resolveAvatarUrl(profile?.avatarUrl);
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'ET';

  const isActive = (path) => currentPath === path;

  return (
    <div className="bg-[#fafbfc] text-[#0f172a] min-h-screen flex selection:bg-primary/10 selection:text-primary font-display">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col h-screen w-72 bg-white fixed left-0 top-0 py-6 px-6 z-50 border-r border-slate-100/60 shadow-sm">
        <div className="mb-8 pl-2">
          <Link to="/etudiant/dashboard" className="flex items-center gap-3">
            <img alt="StageLink Burkina Logo" className="h-10 w-auto object-contain" src={logo} />
            <div>
              <p className="text-xl font-bold tracking-tight text-slate-900">StageLink</p>
              <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mt-1">BURKINA FASO</p>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-2 pb-2">
          <Link to="/etudiant/dashboard" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-all group ${isActive('/etudiant/dashboard') ? 'text-primary bg-primary/[0.03] nav-active' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>
            <span className={`material-symbols-outlined text-xl ${isActive('/etudiant/dashboard') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>grid_view</span>
            <span className="text-[14px]">Tableau de bord</span>
            {isActive('/etudiant/dashboard') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
          </Link>
          
          <Link to="/etudiant/stages" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/etudiant/stages') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
            <span className={`material-symbols-outlined text-xl ${isActive('/etudiant/stages') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>school</span>
            <span className="text-[14px]">Offres de stage</span>
            {isActive('/etudiant/stages') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
          </Link>

          <Link to="/etudiant/emplois" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/etudiant/emplois') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
            <span className={`material-symbols-outlined text-xl ${isActive('/etudiant/emplois') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>work</span>
            <span className="text-[14px]">Offres d'emploi</span>
            {isActive('/etudiant/emplois') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
          </Link>

          <Link to="/etudiant/candidatures" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/etudiant/candidatures') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
            <span className={`material-symbols-outlined text-xl ${isActive('/etudiant/candidatures') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>description</span>
            <span className="text-[14px]">Mes candidatures</span>
            {isActive('/etudiant/candidatures') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
          </Link>

          <Link to="/etudiant/profil" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/etudiant/profil') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
            <span className={`material-symbols-outlined text-xl ${isActive('/etudiant/profil') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>person</span>
            <span className="text-[14px]">Profil</span>
            {isActive('/etudiant/profil') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
          </Link>

          
          <Link to="/etudiant/messages" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/etudiant/messages') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
            <span className={`material-symbols-outlined text-xl ${isActive('/etudiant/messages') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>mail</span>
            <span className="text-[14px]">Messages</span>
            {isActive('/etudiant/messages') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
          </Link>
          <Link to="/etudiant/parametres" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/etudiant/parametres') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
            <span className={`material-symbols-outlined text-xl ${isActive('/etudiant/parametres') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>settings</span>
            <span className="text-[14px]">Paramètres</span>
            {isActive('/etudiant/parametres') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
          </Link>
        </nav>
        
        <div className="mt-auto pt-6 border-t border-slate-50 relative bottom-0">
          <Link to="/conseils" className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center gap-3 hover:bg-primary/10 transition-all group shadow-sm mx-2">
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined !text-xl">help_center</span>
            </div>
            <div>
              <p className="text-[13px] font-bold text-primary">Aide & Support</p>
              <p className="text-[11px] font-medium text-primary/70 mt-0.5">Consulter les guides</p>
            </div>
          </Link>
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
                <p className="text-sm font-bold text-slate-800 leading-none">{displayName}</p>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1.5">{displayLevel}</p>
              </div>
              <Link to="/etudiant/profil" className="relative group cursor-pointer">
                {avatarUrl ? (
                  <img
                    alt={displayName}
                    className="h-11 w-11 rounded-xl object-cover ring-4 ring-slate-100/50 group-hover:ring-primary/10 transition-all"
                    src={avatarUrl}
                  />
                ) : (
                  <div className="h-11 w-11 rounded-xl bg-slate-200 text-slate-600 ring-4 ring-slate-100/50 group-hover:ring-primary/10 transition-all flex items-center justify-center text-xs font-bold">
                    {initials}
                  </div>
                )}
              </Link>
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
        <Link to="/etudiant/stages" className="text-slate-400 hover:text-primary">
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/etudiant/stages') ? "'FILL' 1" : "" }}>school</span>
        </Link>
        <Link to="/etudiant/emplois" className="text-slate-400 hover:text-primary">
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/etudiant/emplois') ? "'FILL' 1" : "" }}>work</span>
        </Link>
        <Link to="/etudiant/candidatures" className="text-slate-400 hover:text-primary">
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/etudiant/candidatures') ? "'FILL' 1" : "" }}>description</span>
        </Link>
        <Link to="/etudiant/profil" className="text-slate-400 hover:text-primary">
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/etudiant/profil') ? "'FILL' 1" : "" }}>person</span>
        </Link>
        
        <Link to="/etudiant/messages" className="text-slate-400 hover:text-primary">
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/etudiant/messages') ? "'FILL' 1" : "" }}>mail</span>
        </Link>
        <Link to="/etudiant/parametres" className="text-slate-400 hover:text-primary">
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/etudiant/parametres') ? "'FILL' 1" : "" }}>settings</span>
        </Link>
      </nav>
    </div>
  );
}
