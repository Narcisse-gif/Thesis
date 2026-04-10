import React, { useState } from 'react';
import AdminDashboardLayout from '../components/AdminDashboardLayout';

export default function AdminModerationPage() {
  const [activeTab, setActiveTab] = useState('offres');

  const offers = [
    { id: 'OFF-01', title: 'Développeur Frontend React', company: 'Orange Burkina', type: 'Offre d\'emploi',  date: 'Il y a 2h' },
    { id: 'OFF-02', title: 'Stagiaire Marketing Digital', company: 'Coris Bank', type: 'Offre de stage', date: 'Il y a 5h' },
  ];

  const profiles = [
    { id: 'KYC-01', name: 'Burkina Tech Solutions', doc: 'RCCM + IFU', date: 'Hier' }
  ];

  return (
    <AdminDashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Modération</h2>
          <p className="text-slate-500 mt-1.5 text-[15px]">Approuvez ou rejetez les contenus soumis avant leur publication.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6">
        <button 
          onClick={() => setActiveTab('offres')} 
          className={`py-3 px-6 text-[14px] font-bold ${activeTab === 'offres' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Offres en attente {offers.length > 0 && <span className="ml-2 bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full">{offers.length}</span>}
        </button>
        <button 
          onClick={() => setActiveTab('kyc')} 
          className={`py-3 px-6 text-[14px] font-bold ${activeTab === 'kyc' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Profils & Entreprises {profiles.length > 0 && <span className="ml-2 bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full">{profiles.length}</span>}
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden w-full">
        {activeTab === 'offres' && (
          <div className="divide-y divide-slate-100">
            {offers.map(o => (
              <div key={o.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100 shrink-0">
                    <span className="material-symbols-outlined !text-[24px]">work</span>
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-slate-900">{o.title}</h4>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[13px] font-medium text-slate-500">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined !text-[16px]">apartment</span> {o.company}</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined !text-[16px]">category</span> {o.type}</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined !text-[16px]">schedule</span> {o.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-5 py-2.5 bg-white border border-rose-200 text-rose-600 font-bold text-[13px] rounded-xl hover:bg-rose-50 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined !text-[18px]">close</span> Rejeter
                  </button>
                  <button className="px-5 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[13px] rounded-xl hover:bg-emerald-100 transition-colors flex items-center gap-2 flex-1 md:flex-auto justify-center">
                    <span className="material-symbols-outlined !text-[18px]">check</span> Approuver
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'kyc' && (
          <div className="divide-y divide-slate-100">
            {profiles.map(p => (
              <div key={p.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 shrink-0">
                    <span className="material-symbols-outlined !text-[24px]">verified</span>
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-slate-900">{p.name}</h4>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[13px] font-medium text-slate-500">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined !text-[16px]">description</span> Documents fournis: {p.doc}</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined !text-[16px]">schedule</span> {p.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 border border-slate-200 text-slate-600 font-bold text-[13px] rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined !text-[18px]">visibility</span> Vérifier
                  </button>
                  <button className="px-5 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[13px] rounded-xl hover:bg-emerald-100 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined !text-[18px]">check</span> Valider
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
