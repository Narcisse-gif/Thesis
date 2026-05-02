import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import logo from '../assets/logo.png';

function formatRelativeTime(value) {
  if (!value) return '';
  const date = new Date(value);
  const diffMinutes = Math.max(1, Math.floor((Date.now() - date.getTime()) / 60000));
  if (diffMinutes < 60) return `Il y a ${diffMinutes} min`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `Il y a ${diffHours} h`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `Il y a ${diffDays} j`;
  return date.toLocaleDateString('fr-FR');
}

export default function AdminDashboardLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [profile, setProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  // Suppression totale de showMessages et setShowMessages
  // const [messageUnreadCount, setMessageUnreadCount] = useState(0);
  // const [messageThreads, setMessageThreads] = useState([]);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/users/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Failed to load admin profile:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/notifications');
      setNotifications(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  };

  // const fetchInboxSummary = async () => {};

  useEffect(() => {
    fetchProfile();
    fetchNotifications();
    // fetchInboxSummary();

    const handleProfileUpdate = (event) => {
      if (event?.detail) {
        setProfile(event.detail);
      } else {
        fetchProfile();
      }
    };

    const handleNotificationsRefresh = () => {
      fetchNotifications();
    };

    // const handleMessagesRefresh = () => {};

    window.addEventListener('profile:updated', handleProfileUpdate);
    window.addEventListener('notifications:refresh', handleNotificationsRefresh);
    // window.addEventListener('messages:refresh', handleMessagesRefresh);

    return () => {
      window.removeEventListener('profile:updated', handleProfileUpdate);
      window.removeEventListener('notifications:refresh', handleNotificationsRefresh);
      // window.removeEventListener('messages:refresh', handleMessagesRefresh);
    };
  }, []);

  useEffect(() => {
    const close = () => {
      setShowNotifications(false);
    };
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, []);

  const isActive = (path) => currentPath === path || currentPath.startsWith(`${path}/`);
  const displayName = profile?.email || 'Admin';
  const initials =
    displayName
      .split('@')[0]
      ?.split(/[.\-_ ]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || 'AD';
  const unreadCount = notifications.filter((item) => !item.isRead).length;
  const previewNotifications = notifications.slice(0, 5);
  // const previewMessages = messageThreads.slice(0, 5);

  const getDisplayName = (user) => {
    if (!user) return 'Utilisateur';
    const firstName = user.studentProfile?.firstName || '';
    const lastName = user.studentProfile?.lastName || '';
    const fullName = `${firstName} ${lastName}`.trim();
    return fullName || user.enterpriseProfile?.companyName || user.displayName || user.email || 'Utilisateur';
  };

  const handleNotificationClick = async (notification) => {
    try {
      if (!notification.isRead) {
        await api.patch(`/notifications/${notification.id}/read`);
      }
      await fetchNotifications();
      window.dispatchEvent(new CustomEvent('notifications:refresh'));
      setShowNotifications(false);
      if (notification.link) {
        navigate(notification.link);
      }
    } catch (error) {
      console.error('Failed to open notification:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await api.patch('/notifications/read-all');
      await fetchNotifications();
      window.dispatchEvent(new CustomEvent('notifications:refresh'));
    } catch (error) {
      console.error('Failed to mark notifications as read:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 overflow-x-hidden flex flex-col md:flex-row">
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-100 min-h-screen fixed left-0 top-0 z-40 shadow-sm">
        <div className="p-6">
          <Link to="/admin/dashboard" className="flex items-center gap-3 group">
            <img alt="StageLink Burkina Logo" className="h-10 w-auto object-contain" src={logo} />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">StageLink</h1>
              <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mt-1">ADMIN CONSOLE</p>
            </div>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto px-1 pb-4 scrollbar-hide">
          <nav className="flex-1 space-y-2">
            <Link to="/admin/dashboard" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/admin/dashboard') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
              <span className={`material-symbols-outlined text-xl ${isActive('/admin/dashboard') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>dashboard</span>
              <span className="text-[14px]">Tableau de bord</span>
              {isActive('/admin/dashboard') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
            </Link>
            <Link to="/admin/utilisateurs" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/admin/utilisateurs') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
              <span className={`material-symbols-outlined text-xl ${isActive('/admin/utilisateurs') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>manage_accounts</span>
              <span className="text-[14px]">Gestion des etudiants</span>
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
              <span className="text-[14px]">Moderation</span>
              {isActive('/admin/moderation') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
            </Link>
            <Link to="/admin/notifications" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/admin/notifications') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
              <span className={`material-symbols-outlined text-xl ${isActive('/admin/notifications') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>notifications</span>
              <span className="text-[14px]">Notifications</span>
              {unreadCount > 0 && <span className="ml-auto min-w-[22px] h-5 px-1.5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">{unreadCount}</span>}
              {isActive('/admin/notifications') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
            </Link>

            <Link to="/admin/rapports" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/admin/rapports') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
              <span className={`material-symbols-outlined text-xl ${isActive('/admin/rapports') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>analytics</span>
              <span className="text-[14px]">Rapports</span>
              {isActive('/admin/rapports') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
            </Link>
            <div className="pt-4 mt-4 border-t border-slate-100">
              <Link to="/admin/parametres" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/admin/parametres') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
                <span className={`material-symbols-outlined text-xl ${isActive('/admin/parametres') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>settings</span>
                <span className="text-[14px]">Parametres</span>
                {isActive('/admin/parametres') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
              </Link>
            </div>
          </nav>
        </div>
      </aside>

      <main className="flex-1 flex flex-col md:ml-72 min-h-screen w-full relative overflow-x-hidden">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 h-16 md:h-20 lg:px-10 px-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100" type="button">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="hidden md:flex relative w-full max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">search</span>
              </div>
              <input type="text" className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 border-transparent rounded-2xl text-sm transition-all focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 placeholder:text-slate-400 text-slate-700 outline-none" placeholder="Rechercher etudiants, offres, logs..." />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative" onClick={(event) => event.stopPropagation()}>
              <button className="relative w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-50 hover:text-primary transition-colors" type="button" onClick={() => setShowNotifications((value) => !value)}>
                <span className="material-symbols-outlined">notifications</span>
                {unreadCount > 0 && <span className="absolute top-2 right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">{unreadCount > 9 ? '9+' : unreadCount}</span>}
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-12 w-[360px] rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-slate-200/80 overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900">Notifications</p>
                      <p className="text-[12px] text-slate-500 mt-0.5">{unreadCount} non lue(s)</p>
                    </div>
                    <button type="button" onClick={handleMarkAllAsRead} className="text-[12px] font-bold text-primary hover:underline disabled:text-slate-300" disabled={unreadCount === 0}>
                      Tout marquer comme lu
                    </button>
                  </div>
                  <div className="max-h-[360px] overflow-y-auto">
                    {previewNotifications.length === 0 ? (
                      <div className="px-5 py-10 text-center text-sm text-slate-500">Aucune notification pour le moment.</div>
                    ) : (
                      previewNotifications.map((notification) => (
                        <button key={notification.id} type="button" onClick={() => handleNotificationClick(notification)} className={`w-full text-left px-5 py-4 border-b border-slate-100/80 hover:bg-slate-50 transition-colors ${notification.isRead ? 'bg-white' : 'bg-blue-50/60'}`}>
                          <div className="flex items-start gap-3">
                            <span className={`mt-1.5 w-2.5 h-2.5 rounded-full ${notification.isRead ? 'bg-slate-200' : 'bg-blue-600'}`}></span>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-3">
                                <p className="text-sm font-bold text-slate-900 truncate">{notification.title}</p>
                                <span className="text-[11px] text-slate-400 whitespace-nowrap">{formatRelativeTime(notification.createdAt)}</span>
                              </div>
                              <p className="text-[13px] text-slate-600 mt-1 leading-relaxed">{notification.message}</p>
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
                    <button type="button" onClick={() => { setShowNotifications(false); navigate('/admin/notifications'); }} className="w-full py-2.5 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:border-primary/30 hover:text-primary transition-colors">
                      Voir toutes les notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bloc messages supprimé */}


            <div className="hidden sm:block h-6 w-px bg-slate-200 mx-1"></div>
            <button className="flex items-center gap-3 p-1.5 pr-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100" type="button">
              <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center text-[11px] font-bold shadow-sm">{initials}</div>
              <div className="hidden xl:block text-left">
                <p className="text-[13px] font-bold text-slate-700 leading-tight">Admin</p>
                <p className="text-[11px] text-slate-400">{displayName}</p>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[20px] hidden xl:block">expand_more</span>
            </button>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8 lg:p-10 pb-24 md:pb-10 max-w-6xl mx-auto w-full">{children}</div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-4 py-3 flex justify-between items-center z-50 overflow-x-auto">
        <Link to="/admin/dashboard" className={`flex flex-col items-center gap-1 px-3 ${isActive('/admin/dashboard') ? 'text-primary' : 'text-slate-400'}`}>
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/admin/dashboard') ? "'FILL' 1" : '' }}>dashboard</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Bord</span>
        </Link>
        <Link to="/admin/utilisateurs" className={`flex flex-col items-center gap-1 px-3 ${isActive('/admin/utilisateurs') ? 'text-primary' : 'text-slate-400'}`}>
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/admin/utilisateurs') ? "'FILL' 1" : '' }}>manage_accounts</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Users</span>
        </Link>
        <Link to="/admin/notifications" className="relative flex flex-col items-center gap-1 px-3 text-slate-400 hover:text-primary">
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/admin/notifications') ? "'FILL' 1" : '' }}>notifications</span>
          {unreadCount > 0 && <span className="absolute top-0 right-2 w-2.5 h-2.5 bg-blue-600 rounded-full"></span>}
          <span className="text-[10px] font-bold uppercase tracking-tighter">Notif</span>
        </Link>
        <Link to="/admin/offres" className={`flex flex-col items-center gap-1 px-3 ${isActive('/admin/offres') ? 'text-primary' : 'text-slate-400'}`}>
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/admin/offres') ? "'FILL' 1" : '' }}>work</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Offres</span>
        </Link>
        <Link to="/admin/rapports" className={`flex flex-col items-center gap-1 px-3 ${isActive('/admin/rapports') ? 'text-primary' : 'text-slate-400'}`}>
          <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/admin/rapports') ? "'FILL' 1" : '' }}>analytics</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Rapports</span>
        </Link>
      </nav>
    </div>
  );
}
