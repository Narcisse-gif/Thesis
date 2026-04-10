import React, { useState } from 'react';
import StudentDashboardLayout from '../components/StudentDashboardLayout';

const conversations = [
  {
    id: 1,
    enterprise: 'Coris Bank',
    subject: 'Disponibilite pour entretien',
    snippet: 'Bonjour, je confirme ma disponibilite pour mercredi a 10h... ',
    time: 'Il y a 15 min',
    unread: true
  },
  {
    id: 2,
    enterprise: 'Orange BF',
    subject: 'Questions sur le poste',
    snippet: 'Merci pour votre retour. Pourriez-vous preciser les missions...',
    time: 'Il y a 2 h',
    unread: false
  },
  {
    id: 3,
    enterprise: 'Sofitex',
    subject: 'Transmission de portfolio',
    snippet: 'Je viens de joindre mon portfolio Behance a ma candidature.',
    time: 'Hier',
    unread: false
  }
];

export default function StudentMessagesPage() {
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  return (
    <StudentDashboardLayout>
      <section className="space-y-6 flex flex-col h-[calc(100vh-100px)]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Messages</h2>
            <p className="text-slate-500 text-sm font-medium">Suivez vos échanges avec les entreprises et démarrez de nouvelles discussions.</p>
          </div>
          <button onClick={() => setIsComposeOpen(true)} className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:bg-blue-800 transition-all flex items-center gap-2 shrink-0">
            <span className="material-symbols-outlined !text-[18px]">edit_square</span>
            Nouveau message
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start flex-1 min-h-0">
          <aside className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b border-slate-100">
              <input
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:ring-4 focus:ring-primary/10"
                placeholder="Rechercher une entreprise..."
                type="text"
              />
            </div>
            <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  className="w-full text-left p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold text-slate-900 text-sm">{conversation.enterprise}</p>
                    <span className="text-xs text-slate-400">{conversation.time}</span>
                  </div>
                  <p className="text-xs font-semibold text-primary mt-1">{conversation.subject}</p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{conversation.snippet}</p>
                  {conversation.unread && <span className="inline-flex mt-2 w-2.5 h-2.5 rounded-full bg-blue-600" />}
                </button>
              ))}
            </div>
          </aside>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col h-full overflow-hidden">
            <div className="pb-4 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Coris Bank</h3>
                <p className="text-sm text-slate-500 font-medium mt-0.5">Sujet: Disponibilité pour entretien</p>
              </div>
              <button className="h-10 w-10 text-slate-400 hover:bg-slate-50 hover:text-slate-700 rounded-full flex items-center justify-center transition-colors" title="Plus d'options">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>

            <div className="py-6 space-y-4 overflow-y-auto flex-1 scrollbar-hide pr-2">
              <div className="max-w-[75%] bg-slate-100 text-slate-700 rounded-2xl px-4 py-3 text-sm">
                Bonjour, je confirme ma disponibilite pour mercredi a 10h.
              </div>
              <div className="max-w-[75%] ml-auto bg-primary text-white rounded-2xl px-4 py-3 text-sm">
                Parfait, merci. Nous vous enverrons le lien de l'entretien demain.
              </div>
            </div>

            <div className="pt-4 mt-auto border-t border-slate-100 flex flex-col sm:flex-row gap-3 shrink-0">
              <input
                className="flex-1 rounded-xl border border-slate-200 px-5 py-3.5 text-[15px] font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-shadow bg-slate-50 hover:bg-white"
                placeholder="Rédigez un message (pour répondre ou engager la discussion)..."
                type="text"
              />
              <button className="px-8 py-3.5 rounded-xl bg-primary text-white text-[15px] font-bold shadow-lg shadow-primary/25 hover:bg-blue-800 transition-all flex items-center justify-center gap-2">
                Envoyer
                <span className="material-symbols-outlined !text-[18px]">send</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Compose Message Modal */}
      {isComposeOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900">Nouveau message</h3>
              <button 
                onClick={() => setIsComposeOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <span className="material-symbols-outlined !text-[20px]">close</span>
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Destinataire (Entreprise)</label>
                <input 
                  type="text" 
                  placeholder="Ex: Coris Bank" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium text-[15px]" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Sujet</label>
                <input 
                  type="text" 
                  placeholder="Ex: Réponse à l'offre de stage" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium text-[15px]" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Message</label>
                <textarea 
                  rows="5" 
                  placeholder="Rédigez votre message ici..." 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium text-[15px] resize-none"
                ></textarea>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsComposeOpen(false)}
                className="px-5 py-2.5 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-colors text-sm"
              >
                Annuler
              </button>
              <button 
                onClick={() => setIsComposeOpen(false)}
                className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:bg-blue-800 transition-all flex items-center justify-center gap-2 text-sm"
              >
                Envoyer le message
                <span className="material-symbols-outlined !text-[16px]">send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </StudentDashboardLayout>
  );
}
