import { useNavigate } from 'react-router-dom';
import EnterpriseDashboardLayout from '../components/EnterpriseDashboardLayout';

export default function EnterpriseSettingsPage() {
  const navigate = useNavigate();

  return (
    <EnterpriseDashboardLayout>
      <section className="space-y-8">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Parametres entreprise</h2>
          <p className="text-slate-500 text-sm">Mettez a jour vos informations de compte, securite et preferences de recrutement.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Informations de connexion</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" defaultValue="cina.recrutement@email.bf" />
                <input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" defaultValue="+226 76 00 00 00" />
              </div>
              <button className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-blue-800 transition-colors">
                Mettre a jour
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Securite</h3>
              <input className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" placeholder="Mot de passe actuel" type="password" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" placeholder="Nouveau mot de passe" type="password" />
                <input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" placeholder="Confirmer le mot de passe" type="password" />
              </div>
              <button className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors">
                Changer le mot de passe
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Preferences de notifications</h3>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                <span className="text-sm font-semibold text-slate-700">Emails pour nouvelles candidatures</span>
                <input type="checkbox" defaultChecked className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                <span className="text-sm font-semibold text-slate-700">Rappels d'entretien</span>
                <input type="checkbox" defaultChecked className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Support</h3>
              <p className="text-sm text-slate-500 mt-2">Consultez les conseils pour optimiser vos recrutements.</p>
              <button
                className="mt-4 w-full px-4 py-3 rounded-xl border border-primary text-primary text-sm font-bold hover:bg-primary/5 transition-colors"
                onClick={() => navigate('/conseils')}
              >
                Ouvrir la page Conseils
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-red-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Session</h3>
              <p className="text-sm text-slate-500 mt-2">Deconnectez-vous de l'espace entreprise en un clic.</p>
              <button
                className="mt-4 w-full px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm font-bold hover:bg-red-100 transition-colors"
                onClick={() => navigate('/connexion')}
              >
                Se deconnecter
              </button>
            </div>
          </div>
        </div>
      </section>
    </EnterpriseDashboardLayout>
  );
}
