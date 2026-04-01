import { Link, useLocation } from 'react-router-dom';

export default function AdminDashboardLayout({ children }) {
  const location = useLocation();

  const navItems = [
    { path: '/admin/dashboard', icon: 'dashboard', label: 'Overview' },
    { path: '/admin/users', icon: 'group', label: 'Users' },
    { path: '/admin/entreprises', icon: 'business', label: 'Companies' },
    { path: '/admin/offres', icon: 'work', label: 'Opportunities' },
    { path: '/admin/rapports', icon: 'analytics', label: 'Reports' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full flex flex-col w-64 bg-white border-r border-slate-100 z-50">
        <div className="px-6 py-8">
          <Link to="/" className="block cursor-pointer">
            <h1 className="text-xl font-bold text-blue-900">StageLink Burkina</h1>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Admin Console</p>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out font-semibold text-[13px] ${
                  isActive
                    ? 'text-blue-700 bg-blue-50/80 shadow-sm border border-blue-100'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent hover:border-slate-100'
                }`}
              >
                <span className={`material-symbols-outlined !text-[20px] ${isActive ? '' : 'opacity-70'}`}>{item.icon}</span>
                <span className="uppercase tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-6 py-6 border-t border-slate-100">
          <button className="w-full py-3 px-4 bg-primary text-white rounded-xl text-[13px] font-bold shadow-md shadow-primary/20 flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors">
            <span className="material-symbols-outlined !text-[18px]">add</span>
            New Opportunity
          </button>
        </div>

        <div className="px-4 py-4 space-y-1 mb-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors rounded-xl font-semibold text-[13px] border border-transparent hover:border-slate-100">
            <span className="material-symbols-outlined !text-[20px] opacity-70">settings</span>
            <span className="uppercase tracking-wide">Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors rounded-xl font-semibold text-[13px] border border-transparent hover:border-slate-100">
            <span className="material-symbols-outlined !text-[20px] opacity-70">help</span>
            <span className="uppercase tracking-wide">Support</span>
          </button>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="ml-64 flex flex-col min-h-screen">
        
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-40 flex justify-between items-center w-full px-8 h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm shadow-slate-200/20">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined !text-[20px]">search</span>
              <input className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 pl-10 pr-4 text-[13px] font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 outline-none" placeholder="Search resources, users, or data..." type="text" />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-primary transition-colors flex items-center justify-center relative">
                <span className="material-symbols-outlined !text-[22px]">notifications</span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
            <div className="h-8 w-[1px] bg-slate-200"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-[13px] font-bold text-slate-900 leading-tight">Admin User</p>
                <p className="text-[11px] font-medium text-slate-400 mt-0.5">Super Administrator</p>
              </div>
              <img alt="Admin User Avatar" className="w-9 h-9 rounded-full object-cover shadow-sm bg-slate-100" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsIxpeeRruEVOroNyYMnAjj2WOalNMAmpr88Ci6kaF9vfZxwCnYgNL3a4QB2TOj-5FDM67RnmbJtvhVIDljJLOkFVlTMjtY1cpauE5V82YtTrON6XR4djzPodXcQMHCsAVvmCr0ysp8oaNsD4icDItGQG7sDdkKqzzhAPu4j_K_FTTXKnku8DMjyKkk5RVnwrsaGzqIM_crrfza-0DUXO-VLegIhkw_eGSQ6PV4-VA2sL3Mj4QV2rJ6iByj4VMnyrf-xL5llqVlX_v" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
