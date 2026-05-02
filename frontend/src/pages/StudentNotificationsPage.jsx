import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import StudentDashboardLayout from '../components/StudentDashboardLayout';

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

export default function StudentNotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState('');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/notifications');
      setNotifications(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      setBusyId(notificationId);
      await api.patch(`/notifications/${notificationId}/read`);
      await fetchNotifications();
      window.dispatchEvent(new CustomEvent('notifications:refresh'));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    } finally {
      setBusyId('');
    }
  };

  const markAllAsRead = async () => {
    try {
      setBusyId('all');
      await api.patch('/notifications/read-all');
      await fetchNotifications();
      window.dispatchEvent(new CustomEvent('notifications:refresh'));
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    } finally {
      setBusyId('');
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      setBusyId(notificationId);
      await api.delete(`/notifications/${notificationId}`);
      await fetchNotifications();
      window.dispatchEvent(new CustomEvent('notifications:refresh'));
    } catch (error) {
      console.error('Failed to delete notification:', error);
    } finally {
      setBusyId('');
    }
  };

  const deleteReadNotifications = async () => {
    try {
      setBusyId('delete-read');
      await api.delete('/notifications/read');
      await fetchNotifications();
      window.dispatchEvent(new CustomEvent('notifications:refresh'));
    } catch (error) {
      console.error('Failed to delete read notifications:', error);
    } finally {
      setBusyId('');
    }
  };

  const unreadCount = notifications.filter((item) => !item.isRead).length;
  const availableTypes = ['ALL', ...new Set(notifications.map((item) => item.type || 'GENERAL'))];
  const filteredNotifications = notifications.filter((notification) => {
    const text = `${notification.title} ${notification.message}`.toLowerCase();
    const matchesSearch = text.includes(search.trim().toLowerCase());
    const matchesType = typeFilter === 'ALL' || (notification.type || 'GENERAL') === typeFilter;
    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'UNREAD' && !notification.isRead) ||
      (statusFilter === 'READ' && notification.isRead);
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeLabel = (type) => {
    if (type === 'APPLICATION') return 'Candidature';
    if (type === 'MESSAGE') return 'Message';
    return 'General';
  };

  const openNotificationLink = async (notification) => {
    if (!notification?.link) return;
    try {
      setBusyId(notification.id);
      if (!notification.isRead) {
        await api.patch(`/notifications/${notification.id}/read`);
      }
      await fetchNotifications();
      window.dispatchEvent(new CustomEvent('notifications:refresh'));
      navigate(notification.link);
    } catch (error) {
      console.error('Failed to open notification link:', error);
    } finally {
      setBusyId('');
    }
  };

  return (
    <StudentDashboardLayout>
      <section className="space-y-8">
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Notifications</h2>
            <p className="text-slate-500 text-sm">
              Retrouvez ici les mises a jour sur vos candidatures et vos messages.
            </p>
          </div>
          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0 || busyId === 'all'}
            className="px-5 py-3 rounded-2xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {busyId === 'all' ? 'Traitement...' : 'Tout marquer comme lu'}
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr_0.8fr_auto] gap-3">
            <input
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/10"
              placeholder="Rechercher dans les notifications..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <select
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
            >
              {availableTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'ALL' ? 'Tous les types' : getTypeLabel(type)}
                </option>
              ))}
            </select>
            <select
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="ALL">Toutes</option>
              <option value="UNREAD">Non lues</option>
              <option value="READ">Lues</option>
            </select>
            <button
              type="button"
              onClick={deleteReadNotifications}
              disabled={busyId === 'delete-read'}
              className="px-4 py-3 rounded-2xl border border-rose-200 text-rose-600 text-sm font-bold hover:bg-rose-50 disabled:opacity-50"
            >
              {busyId === 'delete-read' ? 'Suppression...' : 'Supprimer les lues'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{notifications.length}</p>
          </div>
          <div className="bg-white rounded-2xl border border-blue-100 p-5 shadow-sm">
            <p className="text-sm text-slate-500">Non lues</p>
            <p className="mt-2 text-3xl font-bold text-blue-700">{unreadCount}</p>
          </div>
          <div className="bg-white rounded-2xl border border-emerald-100 p-5 shadow-sm">
            <p className="text-sm text-slate-500">Lues</p>
            <p className="mt-2 text-3xl font-bold text-emerald-700">
              {notifications.length - unreadCount}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="px-6 py-12 text-center text-slate-500">
              Chargement des notifications...
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
                <span className="material-symbols-outlined !text-3xl">notifications</span>
              </div>
              <p className="mt-5 text-lg font-bold text-slate-900">Aucune notification</p>
              <p className="mt-2 text-sm text-slate-500">
                Les nouvelles activites apparaitront ici automatiquement.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-6 py-5 flex flex-col md:flex-row md:items-start md:justify-between gap-4 ${
                    notification.isRead ? 'bg-white' : 'bg-blue-50/50'
                  }`}
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <div
                      className={`mt-1.5 w-3 h-3 rounded-full shrink-0 ${
                        notification.isRead ? 'bg-slate-200' : 'bg-blue-600'
                      }`}
                    ></div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-base font-bold text-slate-900">
                          {notification.title}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                          {getTypeLabel(notification.type)}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            notification.isRead
                              ? 'bg-slate-100 text-slate-500'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {notification.isRead ? 'Lue' : 'Nouvelle'}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {notification.message}
                      </p>
                      <p className="mt-3 text-xs font-medium text-slate-400">
                        {formatRelativeTime(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {!notification.isRead && (
                      <button
                        type="button"
                        onClick={() => markAsRead(notification.id)}
                        disabled={busyId === notification.id}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:border-primary/30 hover:text-primary disabled:opacity-50"
                      >
                        {busyId === notification.id ? '...' : 'Marquer comme lue'}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => deleteNotification(notification.id)}
                      disabled={busyId === notification.id}
                      className="px-4 py-2 rounded-xl border border-rose-200 text-rose-600 text-sm font-bold hover:bg-rose-50 disabled:opacity-50"
                    >
                      Supprimer
                    </button>
                    {notification.link && (
                      <button
                        type="button"
                        onClick={() => openNotificationLink(notification)}
                        disabled={busyId === notification.id}
                        className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold disabled:opacity-50"
                      >
                        Ouvrir
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </StudentDashboardLayout>
  );
}
