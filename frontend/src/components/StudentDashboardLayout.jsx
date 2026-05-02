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

export default function StudentDashboardLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [profile, setProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [messageUnreadCount, setMessageUnreadCount] = useState(0);
  const [messageThreads, setMessageThreads] = useState([]);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/users/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Failed to load profile:', error);
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

  const fetchInboxSummary = async () => {
    try {
      const response = await api.get('/messages/inbox');
      const threads = Array.isArray(response.data) ? response.data : [];
      setMessageThreads(threads);
      const unread = threads.reduce(
        (total, thread) => total + Number(thread?.unreadCount || 0),
        0,
      );
      setMessageUnreadCount(unread);
    } catch (error) {
      console.error('Failed to load inbox summary:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchNotifications();
    fetchInboxSummary();

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

    const handleMessagesRefresh = () => {
      fetchInboxSummary();
    };

    window.addEventListener('profile:updated', handleProfileUpdate);
    window.addEventListener('notifications:refresh', handleNotificationsRefresh);
    window.addEventListener('messages:refresh', handleMessagesRefresh);

    return () => {
      window.removeEventListener('profile:updated', handleProfileUpdate);
      window.removeEventListener('notifications:refresh', handleNotificationsRefresh);
      window.removeEventListener('messages:refresh', handleMessagesRefresh);
    };
  }, []);

  useEffect(() => {
    const close = () => {
      setShowNotifications(false);
      setShowMessages(false);
    };
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
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
  const unreadCount = notifications.filter((item) => !item.isRead).length;
  const previewNotifications = notifications.slice(0, 5);
  const previewMessages = messageThreads.slice(0, 5);

  const isActive = (path) => currentPath === path;

  const getDisplayName = (user) => {
    if (!user) return 'Utilisateur';
    const companyName = user.enterpriseProfile?.companyName || '';
    const firstName = user.studentProfile?.firstName || '';
    const lastName = user.studentProfile?.lastName || '';
    const fullName = `${firstName} ${lastName}`.trim();
    return companyName || fullName || user.email || 'Utilisateur';
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
    <div className="bg-[#fafbfc] text-[#0f172a] min-h-screen flex selection:bg-primary/10 selection:text-primary font-display">
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
          <Link to="/etudiant/notifications" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/etudiant/notifications') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
            <span className={`material-symbols-outlined text-xl ${isActive('/etudiant/notifications') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>notifications</span>
            <span className="text-[14px]">Notifications</span>
            {unreadCount > 0 && <span className="ml-auto min-w-[22px] h-5 px-1.5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">{unreadCount}</span>}
            {isActive('/etudiant/notifications') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
          </Link>
          <Link to="/etudiant/messages" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/etudiant/messages') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
            <span className={`material-symbols-outlined text-xl ${isActive('/etudiant/messages') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>mail</span>
            <span className="text-[14px]">Messages</span>
            {isActive('/etudiant/messages') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
          </Link>
          <Link to="/etudiant/parametres" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/etudiant/parametres') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>
            <span className={`material-symbols-outlined text-xl ${isActive('/etudiant/parametres') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>settings</span>
            <span className="text-[14px]">Parametres</span>
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

      <main className="flex-1 md:ml-72 min-h-screen">
        <header className="fixed top-0 right-0 w-full md:w-[calc(100%-18rem)] z-40 bg-[#fafbfc]/80 backdrop-blur-xl h-24 px-10 flex justify-between items-center border-b border-slate-100/50">
          <div className="flex items-center gap-4 w-1/2 hidden md:flex">
            <div className="relative w-full max-w-lg">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 !text-xl">search</span>
              <input className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100/50 shadow-sm rounded-2xl text-[14px] focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all placeholder:text-slate-400 placeholder:font-normal outline-none" placeholder="Rechercher une entreprise, un stage..." type="text" />
            </div>
          </div>

          <div className="flex items-center gap-8 ml-auto">
            <div className="flex items-center gap-3">
              <div className="relative" onClick={(event) => event.stopPropagation()}>
                <button onClick={() => setShowNotifications((value) => !value)} className="relative p-2.5 rounded-xl text-slate-500 hover:bg-white hover:shadow-sm transition-all" type="button">
                  <span className="material-symbols-outlined !text-[22px]">notifications</span>
                  {unreadCount > 0 && <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">{unreadCount > 9 ? '9+' : unreadCount}</span>}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 top-14 w-[360px] rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-slate-200/80 overflow-hidden">
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
                      <button type="button" onClick={() => { setShowNotifications(false); navigate('/etudiant/notifications'); }} className="w-full py-2.5 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:border-primary/30 hover:text-primary transition-colors">
                        Voir toutes les notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative hidden sm:block" onClick={(event) => event.stopPropagation()}>
                <button
                  className="relative p-2.5 rounded-xl text-slate-500 hover:bg-white hover:shadow-sm transition-all"
                  type="button"
                  onClick={() => setShowMessages((value) => !value)}
                >
                  <span className="material-symbols-outlined !text-[22px]">mail</span>
                  {messageUnreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {messageUnreadCount > 9 ? '9+' : messageUnreadCount}
                    </span>
                  )}
                </button>
                {showMessages && (
                  <div className="absolute right-0 top-14 w-[360px] rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-slate-200/80 overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900">Messages</p>
                        <p className="text-[12px] text-slate-500 mt-0.5">{messageUnreadCount} non lu(s)</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setShowMessages(false);
                          navigate('/etudiant/messages');
                        }}
                        className="text-[12px] font-bold text-primary hover:underline"
                      >
                        Ouvrir
                      </button>
                    </div>
                    <div className="max-h-[360px] overflow-y-auto">
                      {previewMessages.length === 0 ? (
                        <div className="px-5 py-10 text-center text-sm text-slate-500">
                          Aucun message pour le moment.
                        </div>
                      ) : (
                        previewMessages.map((thread) => {
                          const otherUser = thread.otherUser;
                          const preview =
                            thread.lastMessage?.subject?.trim() ||
                            thread.lastMessage?.content?.trim() ||
                            'Conversation';

                          return (
                            <button
                              key={otherUser?.id}
                              type="button"
                              onClick={() => {
                                setShowMessages(false);
                                navigate('/etudiant/messages', {
                                  state: { threadUserId: otherUser?.id },
                                });
                              }}
                              className={`w-full text-left px-5 py-4 border-b border-slate-100/80 hover:bg-slate-50 transition-colors ${
                                thread.unreadCount > 0 ? 'bg-emerald-50/50' : 'bg-white'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <span
                                  className={`mt-1.5 w-2.5 h-2.5 rounded-full ${
                                    thread.unreadCount > 0 ? 'bg-emerald-600' : 'bg-slate-200'
                                  }`}
                                ></span>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-3">
                                    <p className="text-sm font-bold text-slate-900 truncate">
                                      {getDisplayName(otherUser)}
                                    </p>
                                    <span className="text-[11px] text-slate-400 whitespace-nowrap">
                                      {formatRelativeTime(thread.lastMessage?.createdAt)}
                                    </span>
                                  </div>
                                  <p className="text-[13px] text-slate-600 mt-1 truncate">
                                    {preview}
                                  </p>
                                </div>
                              </div>
                            </button>
                          );
                        })
                      )}
                    </div>
                    <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          setShowMessages(false);
                          navigate('/etudiant/messages');
                        }}
                        className="w-full py-2.5 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:border-primary/30 hover:text-primary transition-colors"
                      >
                        Voir toute la messagerie
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 pl-8 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-none">{displayName}</p>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1.5">{displayLevel}</p>
              </div>
              <Link to="/etudiant/profil" className="relative group cursor-pointer">
                {avatarUrl ? (
                  <img alt={displayName} className="h-11 w-11 rounded-xl object-cover ring-4 ring-slate-100/50 group-hover:ring-primary/10 transition-all" src={avatarUrl} />
                ) : (
                  <div className="h-11 w-11 rounded-xl bg-slate-200 text-slate-600 ring-4 ring-slate-100/50 group-hover:ring-primary/10 transition-all flex items-center justify-center text-xs font-bold">{initials}</div>
                )}
              </Link>
            </div>
          </div>
        </header>

        <div className="pt-36 pb-20 px-4 sm:px-10 max-w-[1440px] mx-auto space-y-10">{children}</div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 z-50 px-6 py-4 flex justify-between items-center rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <Link to="/etudiant/dashboard" className="text-primary"><span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/etudiant/dashboard') ? "'FILL' 1" : '' }}>grid_view</span></Link>
        <Link to="/etudiant/stages" className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/etudiant/stages') ? "'FILL' 1" : '' }}>school</span></Link>
        <Link to="/etudiant/emplois" className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/etudiant/emplois') ? "'FILL' 1" : '' }}>work</span></Link>
        <Link to="/etudiant/candidatures" className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/etudiant/candidatures') ? "'FILL' 1" : '' }}>description</span></Link>
        <Link to="/etudiant/notifications" className="relative text-slate-400 hover:text-primary"><span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/etudiant/notifications') ? "'FILL' 1" : '' }}>notifications</span>{unreadCount > 0 && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-600 rounded-full"></span>}</Link>
        <Link to="/etudiant/messages" className="relative text-slate-400 hover:text-primary"><span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/etudiant/messages') ? "'FILL' 1" : '' }}>mail</span>{messageUnreadCount > 0 && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-600 rounded-full"></span>}</Link>
        <Link to="/etudiant/parametres" className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: isActive('/etudiant/parametres') ? "'FILL' 1" : '' }}>settings</span></Link>
      </nav>
    </div>
  );
}
