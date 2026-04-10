import StudentDashboardLayout from '../components/StudentDashboardLayout';
import { useNavigate } from 'react-router-dom';

export default function StudentSettingsPage() {
  const navigate = useNavigate();

  return (
    <StudentDashboardLayout>
      <section className="space-y-8">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Paramètres</h2>
          <p className="text-slate-500 text-sm">Gérez vos informations de connexion et la sécurité de votre compte.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Informations de connexion</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email de connexion</label>
                  <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" defaultValue="moussa.traore@email.bf" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Téléphone</label>
                  <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" defaultValue="+226 70 00 00 00" />
                </div>
              </div>
              <button className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-blue-800 transition-all">
                Mettre à jour les informations
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Mot de passe</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" placeholder="Mot de passe actuel" type="password" />
                <input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" placeholder="Nouveau mot de passe" type="password" />
              </div>
              <input className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" placeholder="Confirmer le nouveau mot de passe" type="password" />
              <button className="px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all">
                Modifier mon mot de passe
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-red-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Session</h3>
              <p className="text-sm text-slate-500 mt-2">Vous pouvez vous déconnecter de votre compte à tout moment.</p>
              <button
                className="mt-4 w-full px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm font-bold hover:bg-red-100 transition-all"
                onClick={() => navigate('/connexion')}
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </section>
    </StudentDashboardLayout>
  );
}