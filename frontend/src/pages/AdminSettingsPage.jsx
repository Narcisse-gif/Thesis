import React, { useState } from 'react';
import AdminDashboardLayout from '../components/AdminDashboardLayout';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <AdminDashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Paramètres de la plateforme</h2>
          <p className="text-slate-500 mt-1.5 text-[15px]">Configurez les règles globales, la sécurité et les notifications.</p>
        </div>
        <button className="px-5 py-2.5 bg-primary text-white text-[13px] font-bold rounded-xl shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined !text-[18px]">save</span>
          Enregistrer les modifications
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Sidebar Menu */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-3 flex flex-col gap-1 sticky top-8 relative z-0">
            <button 
              onClick={() => setActiveTab('general')}
              className={`w-full text-left px-4 py-3 rounded-2xl flex items-center gap-3 text-[14px] font-bold transition-colors ${activeTab === 'general' ? 'bg-primary/5 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <span className="material-symbols-outlined !text-[20px]">tune</span>
              Général
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`w-full text-left px-4 py-3 rounded-2xl flex items-center gap-3 text-[14px] font-bold transition-colors ${activeTab === 'security' ? 'bg-primary/5 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <span className="material-symbols-outlined !text-[20px]">shield_lock</span>
              Sécurité
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`w-full text-left px-4 py-3 rounded-2xl flex items-center gap-3 text-[14px] font-bold transition-colors ${activeTab === 'notifications' ? 'bg-primary/5 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <span className="material-symbols-outlined !text-[20px]">notifications</span>
              Notifications
            </button>
            <button 
              onClick={() => setActiveTab('advanced')}
              className={`w-full text-left px-4 py-3 rounded-2xl flex items-center gap-3 text-[14px] font-bold transition-colors ${activeTab === 'advanced' ? 'bg-primary/5 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <span className="material-symbols-outlined !text-[20px]">api</span>
              Avancé
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          {activeTab === 'general' && (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative z-0">
              <div className="p-6 md:p-8 border-b border-slate-100">
                <h3 className="text-[18px] font-bold text-slate-900">Informations générales</h3>
                <p className="text-slate-500 text-[13px] mt-1">Gérez le nom, le contact et l'apparence par défaut.</p>
              </div>
              <div className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[12px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">Nom de la plateforme</label>
                    <input type="text" defaultValue="StageLink Burkina" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] font-semibold text-slate-900 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all outline-none" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">Email de contact (Support)</label>
                    <input type="email" defaultValue="support@stagelink.bf" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] font-semibold text-slate-900 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">Description globale (SEO)</label>
                  <textarea rows="3" defaultValue="La plateforme de référence pour connecter les talents du Burkina Faso avec les entreprises." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all outline-none resize-none"></textarea>
                </div>
                <hr className="border-slate-100" />
                <div>
                  <h4 className="text-[14px] font-bold text-slate-900 mb-4">Mode Maintenance</h4>
                  <label className="flex items-center justify-between p-4 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="text-[14px] font-bold text-slate-900">Activer le mode maintenance</p>
                      <p className="text-[12px] text-slate-500 mt-0.5">Seuls les administrateurs pourront accéder à la plateforme.</p>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative z-0">
               <div className="p-6 md:p-8 border-b border-slate-100">
                <h3 className="text-[18px] font-bold text-slate-900">Sécurité et Accès</h3>
                <p className="text-slate-500 text-[13px] mt-1">Configurez les politiques de mots de passe et la sécurité des comptes.</p>
              </div>
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <h4 className="text-[14px] font-bold text-slate-900 mb-4">Authentification</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-primary border-slate-300 rounded focus:ring-primary" />
                      <span className="text-[14px] font-medium text-slate-700">Forcer le mot de passe fort (Min. 8 caractères, 1 chiffre, 1 majuscule)</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="w-5 h-5 text-primary border-slate-300 rounded focus:ring-primary" />
                      <span className="text-[14px] font-medium text-slate-700">Activer l'authentification à deux facteurs (2FA) pour les administrateurs</span>
                    </label>
                  </div>
                </div>
                <hr className="border-slate-100" />
                <div>
                   <h4 className="text-[14px] font-bold text-slate-900 mb-4">Gestion des sessions</h4>
                   <label className="block text-[12px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">Expiration des sessions (Heures)</label>
                   <input type="number" defaultValue="24" className="w-full max-w-xs px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] font-semibold text-slate-900 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all outline-none" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative z-0">
               <div className="p-6 md:p-8 border-b border-slate-100">
                <h3 className="text-[18px] font-bold text-slate-900">Préférences de Notification</h3>
                <p className="text-slate-500 text-[13px] mt-1">Définissez quand et comment le système envoie des alertes.</p>
              </div>
              <div className="p-6 md:p-8 space-y-4">
                 {[
                   { label: "Nouvelle inscription (Étudiant)", default: true },
                   { label: "Nouvelle inscription (Entreprise)", default: true },
                   { label: "Signalement d'offre", default: true },
                   { label: "Candidature soumise", default: false },
                   { label: "Mise à jour système requise", default: true },
                 ].map((item, idx) => (
                    <label key={idx} className="flex items-center justify-between p-4 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors">
                      <p className="text-[14px] font-bold text-slate-700">{item.label}</p>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={item.default} />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </div>
                    </label>
                 ))}
              </div>
            </div>
          )}
          
          {activeTab === 'advanced' && (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative z-0">
               <div className="p-6 md:p-8 border-b border-slate-100">
                <h3 className="text-[18px] font-bold text-rose-600">Zone dangereuse</h3>
                <p className="text-slate-500 text-[13px] mt-1">Actions irréversibles et configuration de bas niveau.</p>
              </div>
              <div className="p-6 md:p-8 space-y-6">
                 <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-rose-50 border border-rose-100 rounded-2xl gap-4">
                    <div>
                      <h4 className="text-[15px] font-bold text-rose-900 mb-1">Purger le cache système</h4>
                      <p className="text-[13px] text-rose-700">Supprime les données temporaires pour forcer le rechargement global.</p>
                    </div>
                    <button className="px-4 py-2 bg-rose-600 text-white font-bold text-[13px] rounded-xl hover:bg-rose-700 whitespace-nowrap">
                      Vider le cache
                    </button>
                 </div>
                 
                 <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 border border-slate-200 rounded-2xl gap-4">
                    <div>
                      <h4 className="text-[15px] font-bold text-slate-900 mb-1">Archivage des anciennes offres</h4>
                      <p className="text-[13px] text-slate-500">Archiver automatiquement les offres de plus de 6 mois.</p>
                    </div>
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 border border-slate-200 font-bold text-[13px] rounded-xl hover:bg-slate-200 whitespace-nowrap">
                      Lancer l'archivage
                    </button>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
