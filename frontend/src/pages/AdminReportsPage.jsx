import React from 'react';
import AdminDashboardLayout from '../components/AdminDashboardLayout';

export default function AdminReportsPage() {
  const kpis = [
    { label: "Nouveaux Étudiants (Mois)", value: "+342", trend: "up", percentage: "12%", color: "emerald", icon: "school" },
    { label: "Nouvelles Entreprises (Mois)", value: "+45", trend: "up", percentage: "8%", color: "blue", icon: "business" },
    { label: "Offres Publiées", value: "1,208", trend: "up", percentage: "24%", color: "purple", icon: "work" },
    { label: "Signalements", value: "12", trend: "down", percentage: "5%", color: "rose", icon: "flag" },
  ];

  const topSectors = [
    { name: "IT, Logiciel & Web", percentage: 35, color: "bg-blue-500" },
    { name: "Finance & Assurance", percentage: 22, color: "bg-emerald-500" },
    { name: "Marketing & Communication", percentage: 18, color: "bg-purple-500" },
    { name: "Ressources Humaines", percentage: 15, color: "bg-amber-500" },
    { name: "Autres", percentage: 10, color: "bg-slate-300" },
  ];

  return (
    <AdminDashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Rapports & Statistiques</h2>
          <p className="text-slate-500 mt-1.5 text-[15px]">Analysez l'évolution de la plateforme, l'engagement et les tendances du marché.</p>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${kpi.color}-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500`}></div>
            <div className={`w-12 h-12 bg-${kpi.color}-50 text-${kpi.color}-600 rounded-2xl flex items-center justify-center mb-6`}>
               <span className="material-symbols-outlined !text-[24px]">{kpi.icon}</span>
            </div>
            <p className="text-slate-500 text-[13px] font-bold mb-1">{kpi.label}</p>
            <h3 className="text-3xl font-bold text-slate-900 mb-2">{kpi.value}</h3>
            <div className={`flex items-center gap-1 text-[12px] font-bold ${kpi.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
              <span className="material-symbols-outlined !text-[14px]">{kpi.trend === 'up' ? 'trending_up' : 'trending_down'}</span>
              <span>{kpi.percentage}</span>
              <span className="text-slate-400 font-medium ml-1">vs mois dernier</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        {/* Main Chart Placeholder (Growth) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
           <div className="flex items-center justify-between mb-8">
             <h3 className="text-[18px] font-bold text-slate-900">Croissance Utilisateurs (Derniers 6 mois)</h3>
             <select className="bg-slate-50 border-none text-[13px] font-bold text-slate-700 py-1.5 px-3 rounded-lg outline-none cursor-pointer">
                <option>Global</option>
                <option>Étudiants</option>
                <option>Entreprises</option>
             </select>
           </div>
           {/* Fake Chart bars */}
           <div className="h-64 flex items-end gap-3 sm:gap-6 justify-between mt-auto border-b border-slate-100 pb-2 relative">
             {/* Y-Axis lines */}
             <div className="absolute inset-0 flex flex-col justify-between border-slate-100 pointer-events-none">
                <div className="h-0 border-t border-dashed border-slate-200 w-full opacity-50"></div>
                <div className="h-0 border-t border-dashed border-slate-200 w-full opacity-50"></div>
                <div className="h-0 border-t border-dashed border-slate-200 w-full opacity-50"></div>
                <div className="h-0 border-t border-dashed border-slate-200 w-full opacity-50"></div>
             </div>
             
             {/* Trend line SVG (Flux de progression) */}
             <svg className="absolute top-0 left-0 w-full h-[calc(100%-2.5rem)] z-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
               <defs>
                 <linearGradient id="gradient-emerald" x1="0" x2="0" y1="0" y2="1">
                   <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                   <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                 </linearGradient>
               </defs>
               <polygon 
                 points="0,100 8.33,60 25,40 41.66,55 58.33,20 75,35 91.66,0 100,0 100,100"
                 fill="url(#gradient-emerald)"
                 opacity="0.15"
               />
               <polyline 
                 points="8.33,60 25,40 41.66,55 58.33,20 75,35 91.66,0"
                 fill="none"
                 stroke="#10b981"
                 strokeWidth="2.5"
                 vectorEffect="non-scaling-stroke"
                 strokeLinecap="round" 
                 strokeLinejoin="round" 
               />
             </svg>
             
             {[40, 60, 45, 80, 65, 100].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end items-center group relative z-10">
                   <div 
                      className="w-full max-w-[40px] bg-emerald-500/20 group-hover:bg-emerald-500/80 transition-colors rounded-t-lg relative" 
                      style={{height: `${h}%`}}
                   >
                     <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-bold py-1 px-2 rounded-md transition-opacity pointer-events-none">
                       {h * 15}
                     </div>
                   </div>
                   <span className="text-[12px] font-bold text-slate-400 mt-4 overflow-hidden text-ellipsis whitespace-nowrap">
                     {['Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mar'][i]}
                   </span>
                </div>
             ))}
           </div>
        </div>

        {/* Top Sectors Details */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-[18px] font-bold text-slate-900 mb-1">Tendances Secteurs</h3>
          <p className="text-[13px] font-medium text-slate-500 mb-8">Les domaines les plus demandés.</p>
          
          <div className="space-y-6">
            {topSectors.map((sector, i) => (
               <div key={i}>
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-[14px] font-bold text-slate-700">{sector.name}</span>
                   <span className="text-[13px] font-extrabold text-slate-900">{sector.percentage}%</span>
                 </div>
                 <div className="w-full bg-slate-50 rounded-full h-2.5 overflow-hidden">
                   <div className={`${sector.color} h-full rounded-full relative`} style={{ width: `${sector.percentage}%` }}>
                     <div className="absolute inset-0 bg-white/20" style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)'}}></div>
                   </div>
                 </div>
               </div>
            ))}
          </div>
          
          <button className="w-full mt-8 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[13px] font-bold rounded-xl transition-colors">
            Voir le détail des offres
          </button>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
