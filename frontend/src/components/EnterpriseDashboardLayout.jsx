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

export default function EnterpriseDashboardLayout({ children }) {
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
      console.error('Failed to load enterprise profile:', error);
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

  const enterprise = profile?.enterpriseProfile;
  const displayName = enterprise?.companyName || profile?.email || 'Entreprise';
  const displayRole = enterprise?.industry || 'Recruteur';
  const apiBaseUrl = api.defaults.baseURL || '';

  const resolveLogoUrl = (value) => {
    if (!value) return '';
    if (value.startsWith('http')) return value;
    if (value.startsWith('/uploads/')) return `${apiBaseUrl}${value}`;
    return value;
  };

  const logoUrl = resolveLogoUrl(enterprise?.logoUrl) || resolveLogoUrl(profile?.avatarUrl);
  const initials =
    displayName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || 'EN';
  const unreadCount = notifications.filter((item) => !item.isRead).length;
  const previewNotifications = notifications.slice(0, 5);
  const previewMessages = messageThreads.slice(0, 5);

  const isActive = (path) => currentPath === path;

  const getDisplayName = (user) => {
    if (!user) return 'Utilisateur';
    const firstName = user.studentProfile?.firstName || '';
    const lastName = user.studentProfile?.lastName || '';
    const fullName = `${firstName} ${lastName}`.trim();
    return fullName || user.enterpriseProfile?.companyName || user.email || 'Utilisateur';
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
      <aside className="hidden md:flex flex-col h-screen w-72 bg-white fixed left-0 top-0 py-12 px-8 z-50 border-r border-slate-100/60 shadow-sm">
        <div className="mb-16">
          <Link to="/entreprise/dashboard" className="flex items-center gap-3">
            <img alt="StageLink Burkina Logo" className="h-10 w-auto object-contain" src={logo} />
            <div>
              <p className="text-xl font-bold tracking-tight text-slate-900">StageLink</p>
              <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mt-1">
                BURKINA FASO
              </p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-1 pb-4 scrollbar-hide">
          <Link
            to="/entreprise/dashboard"
            className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
              isActive('/entreprise/dashboard')
                ? 'text-primary bg-primary/[0.03] nav-active font-semibold'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl ${
                isActive('/entreprise/dashboard')
                  ? ''
                  : 'text-slate-400 group-hover:text-slate-600'
              }`}
            >
              grid_view
            </span>
            <span className="text-[14px]">Tableau de bord</span>
            {isActive('/entreprise/dashboard') && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>
            )}
          </Link>

          <Link
            to="/entreprise/offres"
            className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
              isActive('/entreprise/offres')
                ? 'text-primary bg-primary/[0.03] nav-active font-semibold'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl ${
                isActive('/entreprise/offres') ? '' : 'text-slate-400 group-hover:text-slate-600'
              }`}
            >
              work
            </span>
            <span className="text-[14px]">Gestion des offres</span>
            {isActive('/entreprise/offres') && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>
            )}
          </Link>

          <Link
            to="/entreprise/candidats"
            className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
              isActive('/entreprise/candidats')
                ? 'text-primary bg-primary/[0.03] nav-active font-semibold'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl ${
                isActive('/entreprise/candidats')
                  ? ''
                  : 'text-slate-400 group-hover:text-slate-600'
              }`}
            >
              groups
            </span>
            <span className="text-[14px]">Candidatures</span>
            {isActive('/entreprise/candidats') && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>
            )}
          </Link>

          <Link
            to="/entreprise/offres/nouvelle"
            className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
              isActive('/entreprise/offres/nouvelle')
                ? 'text-primary bg-primary/[0.03] nav-active font-semibold'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl ${
                isActive('/entreprise/offres/nouvelle')
                  ? ''
                  : 'text-slate-400 group-hover:text-slate-600'
              }`}
            >
              post_add
            </span>
            <span className="text-[14px]">Nouvelle offre</span>
            {isActive('/entreprise/offres/nouvelle') && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>
            )}
          </Link>

          <Link
            to="/entreprise/notifications"
            className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
              isActive('/entreprise/notifications')
                ? 'text-primary bg-primary/[0.03] nav-active font-semibold'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl ${
                isActive('/entreprise/notifications')
                  ? ''
                  : 'text-slate-400 group-hover:text-slate-600'
              }`}
            >
              notifications
            </span>
            <span className="text-[14px]">Notifications</span>
            {unreadCount > 0 && (
              <span className="ml-auto min-w-[22px] h-5 px-1.5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
            {isActive('/entreprise/notifications') && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>
            )}
          </Link>

          <Link
            to="/entreprise/messages"
            className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
              isActive('/entreprise/messages')
                ? 'text-primary bg-primary/[0.03] nav-active font-semibold'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl ${
                isActive('/entreprise/messages')
                  ? ''
                  : 'text-slate-400 group-hover:text-slate-600'
              }`}
            >
              mail
            </span>
            <span className="text-[14px]">Messagerie</span>
            {messageUnreadCount > 0 && (
              <span className="ml-auto min-w-[22px] h-5 px-1.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                {messageUnreadCount > 99 ? '99+' : messageUnreadCount}
              </span>
            )}
            {isActive('/entreprise/messages') && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>
            )}
          </Link>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <Link
              to="/entreprise/profil"
              className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
                isActive('/entreprise/profil')
                  ? 'text-primary bg-primary/[0.03] nav-active font-semibold'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'
              }`}
            >
              <span
                className={`material-symbols-outlined text-xl ${
                  isActive('/entreprise/profil')
                    ? ''
                    : 'text-slate-400 group-hover:text-slate-600'
                }`}
              >
                apartment
              </span>
              <span className="text-[14px]">Profil entreprise</span>
              {isActive('/entreprise/profil') && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>
              )}
            </Link>

            <Link
              to="/entreprise/parametres"
              className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
                isActive('/entreprise/parametres')
                  ? 'text-primary bg-primary/[0.03] nav-active font-semibold'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'
              }`}
            >
              <span
                className={`material-symbols-outlined text-xl ${
                  isActive('/entreprise/parametres')
                    ? ''
                    : 'text-slate-400 group-hover:text-slate-600'
                }`}
              >
                settings
              </span>
              <span className="text-[14px]">Parametres</span>
              {isActive('/entreprise/parametres') && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>
              )}
            </Link>
          </div>
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-50 relative bottom-0">
          <Link
            to="/conseils"
            className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center gap-3 hover:bg-primary/10 transition-all group shadow-sm mx-2"
          >
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined !text-xl">help_center</span>
            </div>
            <div>
              <p className="text-[13px] font-bold text-primary">Aide & Support</p>
              <p className="text-[11px] font-medium text-primary/70 mt-0.5">
                Consulter les guides
              </p>
            </div>
          </Link>
        </div>
      </aside>

      <main className="flex-1 md:ml-72 min-h-screen relative w-full">
        <header className="fixed top-0 right-0 w-full md:w-[calc(100%-18rem)] z-40 bg-[#fafbfc]/80 backdrop-blur-xl h-24 px-10 flex justify-between items-center border-b border-slate-100/50">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-lg">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-[14px] focus:ring-2 focus:ring-primary/20 transition-all outline-none placeholder:text-slate-400"
                placeholder="Rechercher une candidature..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 ml-auto">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative" onClick={(event) => event.stopPropagation()}>
                <button
                  onClick={() => setShowNotifications((value) => !value)}
                  className="relative p-2.5 rounded-xl text-slate-500 hover:bg-white hover:shadow-sm transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined !text-[22px]">notifications</span>
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 top-14 w-[360px] rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-slate-200/80 overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900">Notifications</p>
                        <p className="text-[12px] text-slate-500 mt-0.5">
                          {unreadCount} non lue(s)
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleMarkAllAsRead}
                        className="text-[12px] font-bold text-primary hover:underline disabled:text-slate-300"
                        disabled={unreadCount === 0}
                      >
                        Tout marquer comme lu
                      </button>
                    </div>
                    <div className="max-h-[360px] overflow-y-auto">
                      {previewNotifications.length === 0 ? (
                        <div className="px-5 py-10 text-center text-sm text-slate-500">
                          Aucune notification pour le moment.
                        </div>
                      ) : (
                        previewNotifications.map((notification) => (
                          <button
                            key={notification.id}
                            type="button"
                            onClick={() => handleNotificationClick(notification)}
                            className={`w-full text-left px-5 py-4 border-b border-slate-100/80 hover:bg-slate-50 transition-colors ${
                              notification.isRead ? 'bg-white' : 'bg-blue-50/60'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span
                                className={`mt-1.5 w-2.5 h-2.5 rounded-full ${
                                  notification.isRead ? 'bg-slate-200' : 'bg-blue-600'
                                }`}
                              ></span>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-3">
                                  <p className="text-sm font-bold text-slate-900 truncate">
                                    {notification.title}
                                  </p>
                                  <span className="text-[11px] text-slate-400 whitespace-nowrap">
                                    {formatRelativeTime(notification.createdAt)}
                                  </span>
                                </div>
                                <p className="text-[13px] text-slate-600 mt-1 leading-relaxed">
                                  {notification.message}
                                </p>
                              </div>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                    <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          setShowNotifications(false);
                          navigate('/entreprise/notifications');
                        }}
                        className="w-full py-2.5 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:border-primary/30 hover:text-primary transition-colors"
                      >
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
                        <p className="text-[12px] text-slate-500 mt-0.5">
                          {messageUnreadCount} non lu(s)
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setShowMessages(false);
                          navigate('/entreprise/messages');
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
                                navigate('/entreprise/messages', {
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
                          navigate('/entreprise/messages');
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

            <Link
              to="/conseils"
              className="text-slate-600 hover:text-primary transition-colors hidden sm:block"
            >
              <span className="material-symbols-outlined !text-[22px]">help</span>
            </Link>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-[12px] font-bold text-slate-900 group-hover:text-primary transition-colors">
                  {displayName}
                </p>
                <p className="text-[10px] text-slate-500">{displayRole}</p>
              </div>
              <Link to="/entreprise/profil">
                {logoUrl ? (
                  <img
                    alt={displayName}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all"
                    src={logoUrl}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-600 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all flex items-center justify-center text-[11px] font-bold">
                    {initials}
                  </div>
                )}
              </Link>
            </div>
          </div>
        </header>

        <div className="pt-24 pb-24 md:pb-12 px-4 sm:px-8 max-w-[1600px] mx-auto">{children}</div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-4 py-3 flex justify-between items-center z-50 overflow-x-auto">
        <Link
          to="/entreprise/dashboard"
          className={`flex flex-col items-center gap-1 px-3 ${
            isActive('/entreprise/dashboard') ? 'text-primary' : 'text-slate-400'
          }`}
        >
          <span
            className="material-symbols-outlined !text-2xl"
            style={{ fontVariationSettings: isActive('/entreprise/dashboard') ? "'FILL' 1" : '' }}
          >
            grid_view
          </span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Bord</span>
        </Link>
        <Link
          to="/entreprise/offres"
          className={`flex flex-col items-center gap-1 px-3 ${
            isActive('/entreprise/offres') ? 'text-primary' : 'text-slate-400'
          }`}
        >
          <span
            className="material-symbols-outlined !text-2xl"
            style={{ fontVariationSettings: isActive('/entreprise/offres') ? "'FILL' 1" : '' }}
          >
            work
          </span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Offres</span>
        </Link>
        <Link
          to="/entreprise/candidats"
          className={`flex flex-col items-center gap-1 px-3 ${
            isActive('/entreprise/candidats') ? 'text-primary' : 'text-slate-400'
          }`}
        >
          <span
            className="material-symbols-outlined !text-2xl"
            style={{ fontVariationSettings: isActive('/entreprise/candidats') ? "'FILL' 1" : '' }}
          >
            groups
          </span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Candidats</span>
        </Link>
        <Link
          to="/entreprise/notifications"
          className="relative flex flex-col items-center gap-1 px-3 text-slate-400 hover:text-primary"
        >
          <span
            className="material-symbols-outlined !text-2xl"
            style={{
              fontVariationSettings: isActive('/entreprise/notifications') ? "'FILL' 1" : '',
            }}
          >
            notifications
          </span>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-2 w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
          )}
          <span className="text-[10px] font-bold uppercase tracking-tighter">Notif</span>
        </Link>
        <Link
          to="/entreprise/messages"
          className="relative flex flex-col items-center gap-1 px-3 text-slate-400 hover:text-primary"
        >
          <span
            className="material-symbols-outlined !text-2xl"
            style={{ fontVariationSettings: isActive('/entreprise/messages') ? "'FILL' 1" : '' }}
          >
            mail
          </span>
          {messageUnreadCount > 0 && (
            <span className="absolute top-0 right-2 w-2.5 h-2.5 bg-emerald-600 rounded-full"></span>
          )}
          <span className="text-[10px] font-bold uppercase tracking-tighter">Msgs</span>
        </Link>
        <Link
          to="/entreprise/offres/nouvelle"
          className={`flex flex-col items-center gap-1 px-3 ${
            isActive('/entreprise/offres/nouvelle') ? 'text-primary' : 'text-slate-400'
          }`}
        >
          <span
            className="material-symbols-outlined !text-2xl"
            style={{
              fontVariationSettings: isActive('/entreprise/offres/nouvelle') ? "'FILL' 1" : '',
            }}
          >
            post_add
          </span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Creer</span>
        </Link>
      </nav>
    </div>
  );
}
