import { useMemo, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { DarkModeContext, useDarkMode } from './DarkModeContext';
export { useDarkMode };

/* ──────────────────────────────────────────────────────────── */
/* Nav items — correspond exactement à la maquette Stitch      */
/* ──────────────────────────────────────────────────────────── */
const NAV = [
  { label: 'Dashboard',     to: '/etudiant/dashboard',     icon: 'dashboard' },
  { label: 'Search Jobs',   to: '/etudiant/stages',        icon: 'search' },
  { label: 'Applications',  to: '/etudiant/candidatures',  icon: 'description' },
  { label: 'Saved Jobs',    to: '/etudiant/favoris',       icon: 'bookmark' },
  { label: 'Profile',       to: '/etudiant/profil',        icon: 'person' },
  { label: 'Notifications', to: '/etudiant/notifications', icon: 'notifications' },
  { label: 'Settings',      to: '/etudiant/parametres',    icon: 'settings' },
];

/* ──────────────────────────────────────────────────────────── */
/* Sidebar                                                       */
/* ──────────────────────────────────────────────────────────── */
function Sidebar({ open, close }) {
  const { pathname } = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="ov"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={close}
          />
        )}
      </AnimatePresence>

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col
          bg-white border-r border-gray-200
          transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}
      >
        {/* Brand */}
        <div className="flex h-16 items-center gap-2 border-b border-gray-100 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined text-[18px]">work</span>
          </div>
          <div>
            <p className="text-[15px] font-bold leading-tight text-gray-900">FasoJobs</p>
            <p className="text-[10px] font-semibold text-primary leading-none">Student Portal</p>
          </div>
        </div>

        {/* User profile mini */}
        <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
            IK
          </div>
          <div>
            <p className="text-[13px] font-semibold text-gray-900">Ibrahim Kaboré</p>
            <p className="text-[11px] text-gray-500">Computer Science</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {NAV.map(item => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={close}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium mb-0.5 transition-colors ${
                  active
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${active ? 'text-primary' : 'text-gray-400'}`}>
                  {item.icon}
                </span>
                {item.label}
                {item.to === '/etudiant/candidatures' && (
                  <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white px-1">
                    6
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom logout */}
        <div className="border-t border-gray-100 px-3 py-4">
          <button
            onClick={() => {}}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium text-gray-600 hover:bg-gray-100 hover:text-red-600 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] text-gray-400">logout</span>
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}

/* ──────────────────────────────────────────────────────────── */
/* Topbar                                                        */
/* ──────────────────────────────────────────────────────────── */
function Topbar({ pageTitle, onMenu }) {
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(false);

  const notifications = [
    { id: 1, text: 'New job match: Frontend Dev at TechSahel', time: '2 min', unread: true },
    { id: 2, text: 'Your application was viewed by Orange BF', time: '1h', unread: true },
    { id: 3, text: 'Interview reminder: Tomorrow at 10:00 AM', time: 'Today', unread: false },
  ];
  const unread = notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-gray-200 bg-white px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button className="lg:hidden text-gray-500" onClick={onMenu}>
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h1 className="text-[17px] font-semibold text-gray-900">{pageTitle}</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500 w-60">
          <span className="material-symbols-outlined text-[18px]">search</span>
          <span>Search jobs...</span>
        </div>

        {/* Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            )}
          </button>
          <AnimatePresence>
            {showNotif && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 rounded-xl border border-gray-200 bg-white shadow-xl z-50"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <p className="font-semibold text-sm text-gray-900">Notifications</p>
                  <span className="text-[11px] font-bold text-primary">{unread} new</span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className={`flex gap-3 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${n.unread ? 'bg-primary/5' : ''}`}>
                      <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${n.unread ? 'bg-primary' : 'bg-gray-200'}`} />
                      <div>
                        <p className={`text-[13px] leading-snug ${n.unread ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>{n.text}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Avatar */}
        <button
          onClick={() => navigate('/etudiant/profil')}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20 transition-colors"
        >
          IK
        </button>
      </div>
    </header>
  );
}

/* ──────────────────────────────────────────────────────────── */
/* Root Layout                                                   */
/* ──────────────────────────────────────────────────────────── */
export default function Layout({ pageTitle, children }) {
  const [dark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const ctxValue = useMemo(() => ({ dark, toggle: () => {} }), [dark]);

  return (
    <DarkModeContext.Provider value={ctxValue}>
      <div className="flex min-h-screen bg-gray-50 font-sans">
        <Sidebar open={sidebarOpen} close={() => setSidebarOpen(false)} />
        <div className="flex flex-1 flex-col lg:pl-64">
          <Topbar pageTitle={pageTitle} onMenu={() => setSidebarOpen(true)} />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </DarkModeContext.Provider>
  );
}
