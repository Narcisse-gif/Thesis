import { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import EnterpriseDashboardLayout from '../components/EnterpriseDashboardLayout';

export default function EnterpriseDashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalApplicants: 0, pending: 0, accepted: 0, rejected: 0, offersCount: 0 });
  const [recentApps, setRecentApps] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const appsRes = await api.get('/applications/enterprise');
        const apps = appsRes.data;
        setRecentApps(apps.slice(0, 4));

        const offersRes = await api.get('/offers'); // need to map to my offers but let's count apps for now
        const myOffers = offersRes.data.filter(o => apps.some(a => a.offer.id === o.id) || o.enterprise?.companyName); // simplify

        setStats({
          totalApplicants: apps.length,
          pending: apps.filter(a => a.status === 'PENDING').length,
          accepted: apps.filter(a => a.status === 'ACCEPTED').length,
          rejected: apps.filter(a => a.status === 'REJECTED').length,
          offersCount: new Set(apps.map(a => a.offer.id)).size, // count unique offers with apps
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  return (
    <EnterpriseDashboardLayout>
      

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        
        {/* Widget 1 */}
        <div className="bg-white p-6 rounded-[1.25rem] shadow-sm border border-slate-100/50 hover:shadow-md transition-all hover:border-primary/20 duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-xl text-primary">
              <span className="material-symbols-outlined !text-[24px]">assignment</span>
            </div>
            
          </div>
          <p className="text-slate-500 text-sm font-medium">Offres</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1.5">24</h3>
        </div>

        {/* Widget 2 */}
        <div className="bg-white p-6 rounded-[1.25rem] shadow-sm border border-slate-100/50 hover:shadow-md transition-all hover:border-primary/20 duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <span className="material-symbols-outlined !text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>group_add</span>
            </div>
            
          </div>
          <p className="text-slate-500 text-sm font-medium">Candidatures re├ºues</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1.5">148</h3>
        </div>

        {/* Widget 3 */}
        <div className="bg-white p-6 rounded-[1.25rem] shadow-sm border border-slate-100/50 hover:shadow-md transition-all hover:border-primary/20 duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-slate-50 text-slate-700 rounded-xl">
              <span className="material-symbols-outlined !text-[24px]">calendar_today</span>
            </div>
            
          </div>
          <p className="text-slate-500 text-sm font-medium">Acceptée</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1.5">8</h3>
        </div>

        {/* Widget 4 */}
        <div className="bg-white p-6 rounded-[1.25rem] shadow-sm border border-slate-100/50 hover:shadow-md transition-all hover:border-primary/20 duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-slate-50 text-slate-500 rounded-xl">
              <span className="material-symbols-outlined !text-[24px]">archive</span>
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">Rejetée</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1.5">56</h3>
        </div>

      </div>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Candidatures R├®centes Section */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[20px] font-bold text-slate-900">Candidatures R├®centes</h3>
            <button className="text-[14px] font-semibold text-primary hover:text-blue-800 transition-colors">Voir tout</button>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100/50 overflow-hidden">
            <div className="overflow-x-auto min-w-full">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Candidat</th>
                    <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Poste</th>
                    <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
    {recentApps.length === 0 ? <tr><td colSpan="5" className="text-center py-4 text-slate-500">Aucune candidature</td></tr> : recentApps.map(app => (
      <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => navigate('/entreprise/candidats')}>
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <img alt="User" className="w-8 h-8 rounded-full object-cover border border-slate-100" src={"https://ui-avatars.com/api/?name=" + encodeURIComponent(app.student?.user?.firstName || 'C')} />
            <p className="text-[13px] font-bold text-slate-900">{app.student?.user?.firstName} {app.student?.user?.lastName}</p>
          </div>
        </td>
        <td className="px-6 py-4">
          <span className="text-[12px] font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">{app.offer?.title}</span>
        </td>
        <td className="px-6 py-4">
          <p className="text-[12px] font-medium text-slate-500">{new Date(app.appliedAt).toLocaleDateString('fr-FR')}</p>
        </td>
        <td className="px-6 py-4">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${app.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border border-amber-100/50' : app.status === 'ACCEPTED' ? 'bg-green-50 text-green-700 border border-green-100/50' : 'bg-red-50 text-red-700 border border-red-100/50'}`}>
             {app.status === 'PENDING' ? 'En attente' : app.status === 'ACCEPTED' ? 'Acceptée' : 'Rejetée'}
          </span>
        </td>
        <td className="px-6 py-4 text-right">
          <span className="material-symbols-outlined text-[18px] text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
        </td>
      </tr>
    ))}
  </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Mes Offres Actives Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[20px] font-bold text-slate-900">Mes Offres Actives</h3>
            
          </div>
          
          <div className="space-y-4">
            
            {/* Offre Card 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50 hover:shadow-md hover:border-primary/20 transition-all group">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h4 className="font-bold text-slate-900 text-[16px] group-hover:text-primary transition-colors">D├®veloppeur Backend (Node.js)</h4>
                  <p className="text-[12px] text-slate-500 mt-1">Publi├® il y a 5 jours ÔÇó Stage de 6 mois</p>
                </div>
                
              </div>
              <div className="flex items-center gap-4 mb-5">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8ZZIf7i7FBnR4n_wZoFQTfLojBJG8_uEsNdV-LTUdrAEwnFNWoRxgb8fIqM74o3amhfCJzDWr77c8FTqhAygqCuUaIxWwajRmks_LfJPZJ0F708qnWip9fKpHZ0uikqrIOdf6hR2i4beI_1KAVVZXlJCq_XZQjX44Y_mlyEQXsu3LV1g5LBQhNJ6zpPMN3PA7TX9OPtD50On442P6FF1MNrl_QxdZ-uR4DnhFJszP1r2p-uVl6kMVtFprWiF7cXrH9cTRAiJn_rZJ" />
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL65T_Loqg8ZeyfT62d_6-H80msIG4wppIAL2iv4DBdvZcse_6IkphbgyY1DdXmNn81a7u4-6IYY0IV7dpl-DTQxqqK5LtOU9x6AxpuRQYtgbzXiBpIqGkkyqlAcamQVb07OZPY8vDWC4y0nugZ2IH6iM-z2KWzZbaLfB3gUYzyaZJuLGqRg2WbbAJ5kH3kwAZ7OfA6Icas0LUH-rI0kuB9-umEhAIX1oueSrHWKYHhs2QO1IPsQgansqDnV2GUB8X4ojQ-9xTIxN1" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">+12</div>
                </div>
                <span className="text-[13px] font-semibold text-slate-600">15 candidatures</span>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-2.5 text-[13px] font-bold text-primary bg-primary/5 rounded-xl hover:bg-primary hover:text-white transition-all">G├®rer l'offre</button>
                
              </div>
            </div>

            {/* Offre Card 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50 hover:shadow-md hover:border-primary/20 transition-all group">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h4 className="font-bold text-slate-900 text-[16px] group-hover:text-primary transition-colors">Assistant Marketing Digital</h4>
                  <p className="text-[12px] text-slate-500 mt-1">Publi├® il y a 10 jours ÔÇó Stage de 3 mois</p>
                </div>
                
              </div>
              <div className="flex items-center gap-4 mb-5">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7Edy12oajXz-EEyONo6WuLYX6AA4lSMhqnyrmRgfJozKAG101A_5021-2DgpsBLVgvTQcqD4LkovGWfi0_4wfBV72K2EOEpySJjhfBgqnmYAzCLySqPwEWzeWh88Uga1ucvr0b6BEGH3yM6wcWPHDgJlFsCxDURHtIdF1wmMP14AP0Lg3GBg_W5rsfoqmRfCIhxioUeqyT-oYxUxUp3FGSgk10zZlvnSb-GHCyGbBacdPi-jEX1Z4NR68alZme2T4Kpmd1o4G8LOf" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">+8</div>
                </div>
                <span className="text-[13px] font-semibold text-slate-600">9 candidatures</span>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-2.5 text-[13px] font-bold text-primary bg-primary/5 rounded-xl hover:bg-primary hover:text-white transition-all">G├®rer l'offre</button>
                
              </div>
            </div>

            

          </div>
        </div>

      </div>
    </EnterpriseDashboardLayout>
  );
}
