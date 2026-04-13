import { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import EnterpriseDashboardLayout from '../components/EnterpriseDashboardLayout';

export default function EnterpriseDashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalApplicants: 0, pending: 0, accepted: 0, rejected: 0, offersCount: 0 });
  const [recentApps, setRecentApps] = useState([]);
  const [recentOffers, setRecentOffers] = useState([]);
  const apiBaseUrl = api.defaults.baseURL || '';

  const resolveAvatarUrl = (value) => {
    if (!value) return '';
    if (value.startsWith('http')) return value;
    if (value.startsWith('/uploads/')) return `${apiBaseUrl}${value}`;
    return value;
  };

  const getStudentName = (student) => {
    const first = student?.firstName || '';
    const last = student?.lastName || '';
    const full = `${first} ${last}`.trim();
    return full || 'Candidat';
  };

  useEffect(() => {
    (async () => {
      try {
        const appsRes = await api.get('/applications/enterprise');
        const apps = appsRes.data;
        setRecentApps(apps.slice(0, 4));

        const offersRes = await api.get('/offers/mine');
        const myOffers = offersRes.data;
        setRecentOffers(myOffers.slice(0, 2));

        setStats({
          totalApplicants: apps.length,
          pending: apps.filter(a => a.status === 'PENDING').length,
          accepted: apps.filter(a => a.status === 'ACCEPTED').length,
          rejected: apps.filter(a => a.status === 'REJECTED').length,
          offersCount: myOffers.length,
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
          <h3 className="text-3xl font-bold text-slate-900 mt-1.5">{stats.offersCount}</h3>
        </div>

        {/* Widget 2 */}
        <div className="bg-white p-6 rounded-[1.25rem] shadow-sm border border-slate-100/50 hover:shadow-md transition-all hover:border-primary/20 duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <span className="material-symbols-outlined !text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>group_add</span>
            </div>
            
          </div>
          <p className="text-slate-500 text-sm font-medium">Candidatures recues</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1.5">{stats.totalApplicants}</h3>
        </div>

        {/* Widget 3 */}
        <div className="bg-white p-6 rounded-[1.25rem] shadow-sm border border-slate-100/50 hover:shadow-md transition-all hover:border-primary/20 duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-slate-50 text-slate-700 rounded-xl">
              <span className="material-symbols-outlined !text-[24px]">calendar_today</span>
            </div>
            
          </div>
          <p className="text-slate-500 text-sm font-medium">Acceptée</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1.5">{stats.accepted}</h3>
        </div>

        {/* Widget 4 */}
        <div className="bg-white p-6 rounded-[1.25rem] shadow-sm border border-slate-100/50 hover:shadow-md transition-all hover:border-primary/20 duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-slate-50 text-slate-500 rounded-xl">
              <span className="material-symbols-outlined !text-[24px]">archive</span>
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">Rejetée</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1.5">{stats.rejected}</h3>
        </div>

      </div>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Candidatures R├®centes Section */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[20px] font-bold text-slate-900">Candidatures recentes</h3>
            <button className="text-[14px] font-semibold text-primary hover:text-blue-800 transition-colors" onClick={() => navigate('/entreprise/candidats')}>Voir tout</button>
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
            <img alt="User" className="w-8 h-8 rounded-full object-cover border border-slate-100" src={resolveAvatarUrl(app.student?.user?.avatarUrl) || "https://ui-avatars.com/api/?name=" + encodeURIComponent(getStudentName(app.student))} />
            <p className="text-[13px] font-bold text-slate-900">{getStudentName(app.student)}</p>
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
            {recentOffers.length === 0 ? (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50 text-slate-500">
                Aucune offre active.
              </div>
            ) : (
              recentOffers.map((offer) => (
                <div key={offer.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50 hover:shadow-md hover:border-primary/20 transition-all group">
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <h4 className="font-bold text-slate-900 text-[16px] group-hover:text-primary transition-colors">{offer.title}</h4>
                      <p className="text-[12px] text-slate-500 mt-1">
                        Publie le {new Date(offer.createdAt).toLocaleDateString('fr-FR')} • {offer.contractType === 'STAGE' ? 'Stage' : offer.contractType === 'CDD' ? 'CDD' : 'CDI'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                        {offer.applications?.length || 0}
                      </div>
                    </div>
                    <span className="text-[13px] font-semibold text-slate-600">{offer.applications?.length || 0} candidatures</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 py-2.5 text-[13px] font-bold text-primary bg-primary/5 rounded-xl hover:bg-primary hover:text-white transition-all" onClick={() => navigate('/entreprise/offres')}>Gerer l'offre</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </EnterpriseDashboardLayout>
  );
}
