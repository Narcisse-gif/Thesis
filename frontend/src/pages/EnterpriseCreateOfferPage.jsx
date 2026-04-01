import EnterpriseDashboardLayout from '../components/EnterpriseDashboardLayout';
import { useNavigate } from 'react-router-dom';

export default function EnterpriseCreateOfferPage() {
  const navigate = useNavigate();
  return (
    <EnterpriseDashboardLayout>
      {/* Header Section */}
      <div className="flex flex-col mb-10 text-center sm:text-left">
        <span className="text-primary font-bold tracking-tight text-xl mb-1">Nouvelle Offre d'Emploi</span>
        <h2 className="text-slate-600 font-medium">Création de l'annonce étape 1/3</h2>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Stepper Navigation */}
        <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-8 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg shadow-primary/20">1</div>
            <div className="hidden sm:block">
              <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Étape 1</p>
              <p className="text-sm font-semibold text-slate-900">Détails du poste</p>
            </div>
          </div>
          <div className="h-px w-8 sm:w-12 bg-slate-200"></div>
          <div className="flex items-center gap-3 opacity-40 flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold">2</div>
            <div className="hidden sm:block">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Étape 2</p>
              <p className="text-sm font-semibold text-slate-500">Description</p>
            </div>
          </div>
          <div className="h-px w-8 sm:w-12 bg-slate-200"></div>
          <div className="flex items-center gap-3 opacity-40 flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold">3</div>
            <div className="hidden sm:block">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Étape 3</p>
              <p className="text-sm font-semibold text-slate-500">Compétences</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Form Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100/50">
              <h3 className="text-xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Informations de base</h3>
              
              <div className="grid grid-cols-1 gap-8">
                {/* Job Title */}
                <div className="space-y-3">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">Titre de l'offre</label>
                  <input className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 outline-none text-[15px] font-medium text-slate-700" placeholder="Ex: Développeur Fullstack Senior" type="text" />
                </div>
                
                {/* Contract Type */}
                <div className="space-y-3">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">Type de contrat</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="py-3 px-2 rounded-xl border-2 border-primary bg-blue-50/50 text-primary font-bold text-[14px] transition-all shadow-sm">CDI</button>
                    <button className="py-3 px-2 rounded-xl border-2 border-transparent bg-slate-50 text-slate-500 font-bold text-[14px] hover:bg-slate-100 transition-all">CDD</button>
                    <button className="py-3 px-2 rounded-xl border-2 border-transparent bg-slate-50 text-slate-500 font-bold text-[14px] hover:bg-slate-100 transition-all">Stage</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Salary */}
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">Salaire (Optionnel)</label>
                    <div className="relative">
                      <input className="w-full pl-5 pr-16 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 outline-none text-[15px] font-medium text-slate-700" placeholder="450 000" type="number" />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-[13px]">FCFA</span>
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">Localisation</label>
                    <div className="relative">
                      <input className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 outline-none text-[15px] font-medium text-slate-700" placeholder="Ouagadougou" type="text" />
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 !text-[20px]">location_on</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4">
              <button className="w-full sm:w-auto px-8 py-3.5 text-slate-500 font-bold hover:text-slate-800 transition-colors bg-white sm:bg-transparent rounded-2xl sm:rounded-none border border-slate-200 sm:border-transparent" onClick={() => navigate('/entreprise/offres')}>Annuler</button>
              <button className="w-full sm:w-auto px-10 py-3.5 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/25 hover:bg-blue-800 transition-all flex items-center justify-center gap-2" onClick={() => navigate('/entreprise/offres')}>
                Continuer
                <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            
            <div className="bg-gradient-to-br from-primary to-blue-900 rounded-2xl p-6 text-white relative overflow-hidden group shadow-xl shadow-primary/20">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-5 border border-white/10">
                  <span className="material-symbols-outlined text-yellow-300 !text-[24px]">lightbulb</span>
                </div>
                <h4 className="text-[18px] font-bold mb-3">Conseil Recruteur</h4>
                <p className="text-[13px] text-blue-100 leading-relaxed font-medium">Les offres mentionnant une fourchette salariale reçoivent en moyenne <strong className="text-white">40% de candidatures qualifiées supplémentaires</strong>.</p>
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                <span className="material-symbols-outlined !text-[120px]">contract</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50">
              <h4 className="text-[14px] font-bold text-slate-900 mb-5 pb-3 border-b border-slate-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400 !text-[18px]">visibility</span>
                Aperçu rapide
              </h4>
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-slate-500">Visibilité estimée</span>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100/50 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="material-symbols-outlined !text-[14px]">rocket_launch</span>
                    Élevée
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-slate-500">Portée réseau</span>
                  <span className="text-[14px] font-bold text-slate-900">~2.4k Talents</span>
                </div>
              </div>
            </div>

            <div className="aspect-square rounded-2xl overflow-hidden relative shadow-sm border border-slate-200">
              <img alt="Office" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw3ff90r3n356Rm7NXmnQPdq5PnJjW6t0OYl0lk0TY9PdhZVpc13UvLKF0nWIljYQjYEL2HxkLc7dL9S-TUnt0A-cu1pE2ITksUIAFf_MrcvoYC5c1Jk0PRdKUKOMyZ3-siniZjYEcNPojcSaEIOgYdZO8mFHdpHIi_bDCbiqiZJFLV--Ji7i3OzUWRGDswjCUOzldlAgfaEkL_rw1mMev-rzZiq6kejg2rVDLk1aG08qFjLYl7fvesi5VGjKKeNX7lMgk5RROHRB7" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex items-end p-6">
                <p className="text-white text-[13px] font-medium leading-relaxed">Rejoignez l'écosystème tech leader au Burkina Faso.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </EnterpriseDashboardLayout>
  );
}
