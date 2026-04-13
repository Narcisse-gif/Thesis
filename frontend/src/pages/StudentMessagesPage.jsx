import { useEffect, useMemo, useState } from 'react';
import StudentDashboardLayout from '../components/StudentDashboardLayout';
import api from '../services/api';

export default function StudentMessagesPage() {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [loadingThreads, setLoadingThreads] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const formatTime = (value) => {
    if (!value) return '';
    return new Date(value).toLocaleString('fr-FR');
  };

  const getDisplayName = (user) => {
    if (!user) return 'Utilisateur';
    const companyName = user.enterpriseProfile?.companyName || '';
    const firstName = user.studentProfile?.firstName || '';
    const lastName = user.studentProfile?.lastName || '';
    const fullName = `${firstName} ${lastName}`.trim();
    return companyName || fullName || user.email || 'Utilisateur';
  };

  const loadConversation = async (otherUserId) => {
    try {
      setLoadingMessages(true);
      const response = await api.get(`/messages/conversation/${otherUserId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to load conversation:', error);
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  const loadInbox = async () => {
    try {
      setLoadingThreads(true);
      const response = await api.get('/messages/inbox');
      setThreads(response.data);
      if (response.data.length > 0) {
        setSelectedThread(response.data[0]);
        await loadConversation(response.data[0].otherUser.id);
      }
    } catch (error) {
      console.error('Failed to load inbox:', error);
      setThreads([]);
    } finally {
      setLoadingThreads(false);
    }
  };

  const searchEnterprises = async (query) => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSearchResults([]);
      return;
    }
    try {
      setIsSearching(true);
      const response = await api.get('/users/search', {
        params: { q: trimmed, role: 'ENTERPRISE' },
      });
      setSearchResults(response.data || []);
    } catch (error) {
      console.error('Failed to search users:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const uniqueMessages = useMemo(() => {
    const seen = new Set();
    return messages.filter((message) => {
      if (!message?.id || seen.has(message.id)) return false;
      seen.add(message.id);
      return true;
    });
  }, [messages]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await api.get('/users/profile');
        setCurrentUserId(response.data.id);
      } catch (error) {
        console.error('Failed to load user profile:', error);
      }
    };

    loadProfile();
    loadInbox();
  }, []);

  const handleSend = async () => {
    if (!messageInput.trim() || !selectedThread?.otherUser?.id) {
      return;
    }
    try {
      await api.post(`/messages/${selectedThread.otherUser.id}`, { content: messageInput.trim() });
      setMessageInput('');
      await loadConversation(selectedThread.otherUser.id);
      await loadInbox();
    } catch (error) {
      console.error('Failed to send message:', error);
      alert(error.response?.data?.message || 'Erreur lors de l\'envoi du message.');
    }
  };

  const handleDeleteMessage = (messageId) => {
    if (!messageId) return;
    setPendingDeleteId(messageId);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    try {
      await api.delete(`/messages/${pendingDeleteId}`);
      if (selectedThread?.otherUser?.id) {
        await loadConversation(selectedThread.otherUser.id);
      }
      await loadInbox();
    } catch (error) {
      console.error('Failed to delete message:', error);
      alert(error.response?.data?.message || 'Erreur lors de la suppression.');
    } finally {
      setPendingDeleteId(null);
    }
  };

  return (
    <StudentDashboardLayout>
      <section className="space-y-6 flex flex-col h-[calc(100vh-100px)]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Messages</h2>
            <p className="text-slate-500 text-sm font-medium">Suivez vos échanges avec les entreprises et démarrez de nouvelles discussions.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start flex-1 min-h-0">
          <aside className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b border-slate-100">
              <input
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:ring-4 focus:ring-primary/10"
                placeholder="Rechercher une entreprise..."
                type="text"
                value={searchQuery}
                onChange={(event) => {
                  const value = event.target.value;
                  setSearchQuery(value);
                  searchEnterprises(value);
                }}
              />
            </div>
            <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
              {searchQuery.trim() ? (
                isSearching ? (
                  <div className="p-4 text-sm text-slate-500">Recherche...</div>
                ) : searchResults.length === 0 ? (
                  <div className="p-4 text-sm text-slate-500">Aucune entreprise trouvee.</div>
                ) : (
                  searchResults.map((user) => (
                    <button
                      key={user.id}
                      className="w-full text-left p-4 hover:bg-slate-50 transition-colors"
                      onClick={() => {
                        setSelectedThread({ otherUser: user });
                        loadConversation(user.id);
                      }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-bold text-slate-900 text-sm">{getDisplayName(user)}</p>
                        <span className="text-xs text-slate-400">Nouveau</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{user.email}</p>
                    </button>
                  ))
                )
              ) : loadingThreads ? (
                <div className="p-4 text-sm text-slate-500">Chargement des conversations...</div>
              ) : threads.length === 0 ? (
                <div className="p-4 text-sm text-slate-500">Aucune conversation.</div>
              ) : (
                threads.map((thread) => {
                  const subject = thread.lastMessage?.subject?.trim() || '';
                  const content = thread.lastMessage?.content?.trim() || '';
                  const showSubject = subject && subject !== content;
                  const preview = (showSubject ? subject : content).slice(0, 60) || '...';
                  return (
                    <button
                      key={thread.otherUser.id}
                      className="w-full text-left p-4 hover:bg-slate-50 transition-colors"
                      onClick={() => {
                        setSelectedThread(thread);
                        loadConversation(thread.otherUser.id);
                      }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-bold text-slate-900 text-sm">{getDisplayName(thread.otherUser)}</p>
                        <span className="text-xs text-slate-400">{formatTime(thread.lastMessage?.createdAt)}</span>
                      </div>
                      <p className="text-xs font-semibold text-primary mt-1">{preview}</p>
                      {showSubject && (
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{content}</p>
                      )}
                      {thread.unreadCount > 0 && <span className="inline-flex mt-2 w-2.5 h-2.5 rounded-full bg-blue-600" />}
                    </button>
                  );
                })
              )}
            </div>
          </aside>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col h-full overflow-hidden">
            <div className="pb-4 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{getDisplayName(selectedThread?.otherUser)}</h3>
                <p className="text-sm text-slate-500 font-medium mt-0.5">{selectedThread?.otherUser?.role || ''}</p>
              </div>
            </div>

            <div className="py-6 space-y-4 overflow-y-auto flex-1 scrollbar-hide pr-2">
              {loadingMessages ? (
                <div className="text-sm text-slate-500">Chargement des messages...</div>
              ) : messages.length === 0 ? (
                <div className="text-sm text-slate-500">Aucun message dans cette conversation.</div>
              ) : (
                uniqueMessages.map((message) => {
                  const isMine = message.sender?.id === currentUserId;
                  return (
                    <div
                      key={message.id}
                      className={`max-w-[75%] ${isMine ? 'ml-auto bg-primary text-white' : 'bg-slate-100 text-slate-700'} rounded-2xl px-4 py-3 text-sm relative group shadow-sm`}
                    >
                      <div className={`absolute -top-3 ${isMine ? 'left-3' : 'right-3'} opacity-0 group-hover:opacity-100 transition`}>
                        <button
                          type="button"
                          onClick={() => handleDeleteMessage(message.id)}
                          className="w-7 h-7 rounded-full bg-white shadow-md border border-rose-100 text-rose-500 hover:text-white hover:bg-rose-500 transition flex items-center justify-center"
                          title="Supprimer"
                        >
                          <span className="material-symbols-outlined !text-[16px]">delete</span>
                        </button>
                      </div>
                      {message.content}
                    </div>
                  );
                })
              )}
            </div>

            <div className="pt-4 mt-auto border-t border-slate-100 flex flex-col sm:flex-row gap-3 shrink-0">
              <input
                className="flex-1 rounded-xl border border-slate-200 px-5 py-3.5 text-[15px] font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-shadow bg-slate-50 hover:bg-white"
                placeholder="Rédigez un message (pour répondre ou engager la discussion)..."
                type="text"
                value={messageInput}
                onChange={(event) => setMessageInput(event.target.value)}
              />
              <button
                className="px-8 py-3.5 rounded-xl bg-primary text-white text-[15px] font-bold shadow-lg shadow-primary/25 hover:bg-blue-800 transition-all flex items-center justify-center gap-2"
                onClick={handleSend}
              >
                Envoyer
                <span className="material-symbols-outlined !text-[18px]">send</span>
              </button>
            </div>
          </div>
        </div>

        {pendingDeleteId && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Supprimer le message</h3>
                <button
                  onClick={() => setPendingDeleteId(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined !text-[20px]">close</span>
                </button>
              </div>
              <div className="px-6 py-5">
                <p className="text-sm text-slate-600">
                  Cette action est definitive. Voulez-vous vraiment supprimer ce message ?
                </p>
              </div>
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <button
                  onClick={() => setPendingDeleteId(null)}
                  className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-colors text-sm"
                  type="button"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition-colors text-sm"
                  type="button"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

    </StudentDashboardLayout>
  );
}
