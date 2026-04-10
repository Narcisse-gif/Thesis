import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function AdminDashboardLayout({ children }) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 overflow-x-hidden flex flex-col md:flex-row">
      
      {/* Sidebar Navigation - Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-100 min-h-screen fixed left-0 top-0 z-40 transform transition-transform duration-300 shadow-sm">
        
        {/* Logo Area */}
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 group">
            <img alt="StageLink Burkina Logo" className="h-10 w-auto object-contain" src={logo} />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">StageLink</h1>
              <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mt-1">ADMIN CONSOLE</p>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-2 scrollbar-hide">
          <nav className="flex-1 space-y-2">
            <Link to="/admin/dashboard" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/admin/dashboard') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
              <span className={`material-symbols-outlined text-xl ${isActive('/admin/dashboard') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>dashboard</span>
              <span className="text-[14px]">Tableau de bord</span>
              {isActive('/admin/dashboard') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
            </Link>
            
            <Link to="/admin/utilisateurs" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/admin/utilisateurs') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
              <span className={`material-symbols-outlined text-xl ${isActive('/admin/utilisateurs') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>manage_accounts</span>
              <span className="text-[14px]">Gestion des étudiants</span>
              {isActive('/admin/utilisateurs') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
            </Link>

            <Link to="/admin/entreprises" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/admin/entreprises') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
              <span className={`material-symbols-outlined text-xl ${isActive('/admin/entreprises') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>apartment</span>
              <span className="text-[14px]">Gestion entreprises</span>
              {isActive('/admin/entreprises') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
            </Link>

            <Link to="/admin/offres" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/admin/offres') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
              <span className={`material-symbols-outlined text-xl ${isActive('/admin/offres') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>work</span>
              <span className="text-[14px]">Gestion des offres</span>
              {isActive('/admin/offres') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
            </Link>

            <Link to="/admin/moderation" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/admin/moderation') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
              <span className={`material-symbols-outlined text-xl ${isActive('/admin/moderation') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>gavel</span>
              <span className="text-[14px]">Modération</span>
              {isActive('/admin/moderation') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
            </Link>

            

            <Link to="/admin/rapports" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/admin/rapports') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
              <span className={`material-symbols-outlined text-xl ${isActive('/admin/rapports') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>analytics</span>
              <span className="text-[14px]">Rapports</span>
              {isActive('/admin/rapports') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
            </Link>
            
            <div className="pt-4 mt-4 border-t border-slate-100">
              <Link to="/admin/parametres" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/admin/parametres') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
                <span className={`material-symbols-outlined text-xl ${isActive('/admin/parametres') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>settings</span>
                <span className="text-[14px]">Paramètres</span>
                {isActive('/admin/parametres') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
              </Link>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <main className="flex-1 flex flex-col md:ml-72 min-h-screen w-full relative transition-all duration-300 overflow-x-hidden">
        
        {/* Header - Desktop & Mobile */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 h-16 md:h-20 lg:px-10 px-4 flex items-center justify-between shadow-sm">
          {/* Mobile Menu Button & Search */}
          <div className="flex items-center gap-4 flex-1">
            <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="hidden md:flex relative w-full max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">search</span>
              </div>
              <input 
                type="text" 
                className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 border-transparent rounded-2xl text-sm transition-all focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 placeholder:text-slate-400 text-slate-700 outline-none" 
                placeholder="Rechercher étudiants, offres, logs..." 
              />
            </div>
          </div>

          {/* Header Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="relative w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-50 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="hidden sm:block h-6 w-px bg-slate-200 mx-1"></div>
            <button className="flex items-center gap-3 p-1.5 pr-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <img src="https://ui-avatars.com/api/?name=Admin+System&background=0D8ABC&color=fff" alt="Admin" className="w-8 h-8 rounded-lg object-cover shadow-sm" />
              <div className="hidden xl:block text-left">
                <p className="text-[13px] font-bold text-slate-700 leading-tight">Admin</p>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[20px] hidden xl:block">expand_more</span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 p-4 md:p-8 lg:p-10 pb-24 md:pb-10 max-w-6xl mx-auto w-full flex flex-col items-center">
          {children}
        </div>
      </main>

      {/* Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-4 py-3 flex justify-between items-center z-50 overflow-x-auto">
        <Link to="/admin/dashboard" className={`flex flex-col items-center gap-1 px-3 ${isActive('/admin/dashboard') ? 'text-primary' : 'text-slate-400'}`}>
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/admin/dashboard') ? "'FILL' 1" : "" }}>dashboard</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Bord</span>
        </Link>
        <Link to="/admin/utilisateurs" className={`flex flex-col items-center gap-1 px-3 ${isActive('/admin/utilisateurs') ? 'text-primary' : 'text-slate-400'}`}>
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/admin/utilisateurs') ? "'FILL' 1" : "" }}>manage_accounts</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter text-center leading-tight">Gest. des<br/>étudiants</span>
        </Link>
        <div className="relative -top-6 px-1 min-w-[56px]">
          </div>
        <Link to="/admin/entreprises" className={`flex flex-col items-center gap-1 px-3 ${isActive('/admin/entreprises') ? 'text-primary' : 'text-slate-400'}`}>
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/admin/entreprises') ? "'FILL' 1" : "" }}>apartment</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Sociétés</span>
        </Link>          <Link to="/admin/offres" className={`flex flex-col items-center gap-1 px-3 ${isActive('/admin/offres') ? 'text-primary' : 'text-slate-400'}`}>
            <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/admin/offres') ? "'FILL' 1" : "" }}>work</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Offres</span>
          </Link>        <Link to="/admin/rapports" className={`flex flex-col items-center gap-1 px-3 ${isActive('/admin/rapports') ? 'text-primary' : 'text-slate-400'}`}>
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/admin/rapports') ? "'FILL' 1" : "" }}>analytics</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Rapports</span>
        </Link>
      </nav>
      
    </div>
  );
}