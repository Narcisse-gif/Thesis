import EnterpriseDashboardLayout from '../components/EnterpriseDashboardLayout';

const conversations = [
  {
    id: 1,
    candidate: 'Awa Ouedraogo',
    subject: 'Disponibilite pour entretien',
    snippet: 'Bonjour, je confirme ma disponibilite pour mercredi a 10h... ',
    time: 'Il y a 15 min',
    unread: true
  },
  {
    id: 2,
    candidate: 'Moussa Traore',
    subject: 'Questions sur le poste',
    snippet: 'Merci pour votre retour. Pourriez-vous preciser les missions...',
    time: 'Il y a 2 h',
    unread: false
  },
  {
    id: 3,
    candidate: 'Fatou Sanogo',
    subject: 'Transmission de portfolio',
    snippet: 'Je viens de joindre mon portfolio Behance a ma candidature.',
    time: 'Hier',
    unread: false
  }
];

export default function EnterpriseMessagesPage() {
  return (
    <EnterpriseDashboardLayout>
      <section className="space-y-8">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Messages</h2>
          <p className="text-slate-500 text-sm">Suivez vos echanges avec les candidats et gardez votre pipeline actif.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-6">
          <aside className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <input
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:ring-4 focus:ring-primary/10"
                placeholder="Rechercher un candidat..."
                type="text"
              />
            </div>
            <div className="divide-y divide-slate-100">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  className="w-full text-left p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold text-slate-900 text-sm">{conversation.candidate}</p>
                    <span className="text-xs text-slate-400">{conversation.time}</span>
                  </div>
                  <p className="text-xs font-semibold text-primary mt-1">{conversation.subject}</p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{conversation.snippet}</p>
                  {conversation.unread && <span className="inline-flex mt-2 w-2.5 h-2.5 rounded-full bg-blue-600" />}
                </button>
              ))}
            </div>
          </aside>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Awa Ouedraogo</h3>
              <p className="text-sm text-slate-500">Sujet: Disponibilite pour entretien</p>
            </div>

            <div className="py-6 space-y-4 min-h-[320px]">
              <div className="max-w-[75%] bg-slate-100 text-slate-700 rounded-2xl px-4 py-3 text-sm">
                Bonjour, je confirme ma disponibilite pour mercredi a 10h.
              </div>
              <div className="max-w-[75%] ml-auto bg-primary text-white rounded-2xl px-4 py-3 text-sm">
                Parfait, merci. Nous vous enverrons le lien de l'entretien demain.
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <input
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:ring-4 focus:ring-primary/10"
                placeholder="Ecrire un message..."
                type="text"
              />
              <button className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-blue-800 transition-colors">
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </section>
    </EnterpriseDashboardLayout>
  );
}
