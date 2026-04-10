import { useNavigate } from 'react-router-dom';
import EnterpriseDashboardLayout from '../components/EnterpriseDashboardLayout';

export default function EnterpriseSettingsPage() {
  const navigate = useNavigate();

  return (
    <EnterpriseDashboardLayout>
      <section className="space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Paramètres entreprise</h2>
            <p className="text-slate-500 text-sm font-medium">Gérez vos accès et la sécurité de votre compte.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Informations de connexion</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-all" defaultValue="cina.recrutement@email.bf" />
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-all" defaultValue="+226 76 00 00 00" />
            </div>
            <button className="px-6 py-3.5 rounded-xl bg-primary text-white text-[15px] font-bold shadow-lg shadow-primary/25 hover:bg-blue-800 transition-all">
              Mettre à jour
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Sécurité</h3>
            <input className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[15px] font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-all" placeholder="Mot de passe actuel" type="password" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-all" placeholder="Nouveau mot de passe" type="password" />
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-all" placeholder="Confirmer le mot de passe" type="password" />
            </div>
            <button className="px-6 py-3.5 rounded-xl bg-primary text-white text-[15px] font-bold shadow-lg shadow-primary/25 hover:bg-blue-800 transition-all">
              Changer le mot de passe
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-red-100 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Session</h3>
                <p className="text-sm text-slate-500 font-medium">Déconnectez-vous de l'espace entreprise en toute sécurité.</p>
              </div>
              <button
                className="px-6 py-3.5 rounded-xl bg-red-50 text-red-600 text-[15px] font-bold hover:bg-red-100 transition-all shrink-0 flex items-center gap-2"
                onClick={() => navigate('/connexion')}
              >
                <span className="material-symbols-outlined !text-[18px]">logout</span>
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </section>
    </EnterpriseDashboardLayout>
  );
}
