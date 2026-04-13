import { useState, useEffect } from 'react';
import api from '../services/api';
import AdminDashboardLayout from '../components/AdminDashboardLayout';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    students: 0,
    enterprises: 0,
    offersStage: 0,
    offersJob: 0,
  });
  const [pendingOffers, setPendingOffers] = useState([]);
  const [activityItems, setActivityItems] = useState([]);
  const [monthlySeries, setMonthlySeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const statsReq = api.get('/admin/dashboard/stats');
        const offersReq = api.get('/admin/offers');
        const usersReq = api.get('/admin/users');
        const [statsRes, offersRes, usersRes] = await Promise.all([statsReq, offersReq, usersReq]);

        const offers = offersRes.data || [];
        const users = usersRes.data || [];
        const offersStage = offers.filter((offer) => offer.contractType === 'STAGE').length;
        const offersJob = offers.filter((offer) => offer.contractType !== 'STAGE').length;
        const pending = offers.filter((offer) => offer.status === 'EN_ATTENTE');
        const apiBaseUrl = api.defaults.baseURL || '';
        const resolveLogoUrl = (value) => {
          if (!value) return '';
          if (value.startsWith('http')) return value;
          if (value.startsWith('/uploads/')) return `${apiBaseUrl}${value}`;
          return value;
        };

        const recentUsers = users
          .filter((user) => user.createdAt && user.role !== 'ADMIN')
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3)
          .map((user) => ({
            id: user.id,
            type: user.role === 'ENTERPRISE' ? 'enterprise' : 'student',
            name: user.role === 'ENTERPRISE'
              ? user.enterpriseProfile?.companyName || user.email
              : `${user.studentProfile?.firstName || ''} ${user.studentProfile?.lastName || ''}`.trim() || user.email,
            description: user.role === 'ENTERPRISE'
              ? 'Nouveau compte entreprise cree.'
              : 'Nouveau compte etudiant cree.',
            date: new Date(user.createdAt),
            avatar: resolveLogoUrl(user.enterpriseProfile?.logoUrl) || resolveLogoUrl(user.avatarUrl),
          }));

        const recentOffers = offers
          .filter((offer) => offer.createdAt)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3)
          .map((offer) => ({
            id: offer.id,
            type: 'offer',
            name: offer.title,
            description: `Nouvelle offre publiee par ${offer.enterprise?.companyName || 'Entreprise'}.`,
            date: new Date(offer.createdAt),
            avatar: resolveLogoUrl(offer.enterprise?.logoUrl),
          }));

        const activity = [...recentUsers, ...recentOffers]
          .sort((a, b) => b.date - a.date)
          .slice(0, 5);

        const months = Array.from({ length: 6 }, (_, index) => {
          const date = new Date();
          date.setMonth(date.getMonth() - (5 - index));
          return {
            key: `${date.getFullYear()}-${date.getMonth()}`,
            label: date.toLocaleDateString('fr-FR', { month: 'short' }),
          };
        });

        const userByMonth = months.map((month) => {
          const count = users.filter((user) => {
            if (!user.createdAt) return false;
            const date = new Date(user.createdAt);
            return `${date.getFullYear()}-${date.getMonth()}` === month.key;
          }).length;
          return { label: month.label, count };
        });

        const maxCount = Math.max(...userByMonth.map((item) => item.count), 1);
        const normalized = userByMonth.map((item) => ({
          ...item,
          percentage: Math.round((item.count / maxCount) * 100),
        }));

        setStats({
          students: statsRes.data?.students || 0,
          enterprises: statsRes.data?.enterprises || 0,
          offersStage,
          offersJob,
        });
        setPendingOffers(pending);
        setActivityItems(activity);
        setMonthlySeries(normalized);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <AdminDashboardLayout>
      {/* Dashboard Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-6 w-full">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Vue d'ensemble</h2>
          
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-white text-slate-700 text-[13px] border border-slate-200 font-bold rounded-xl flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
            <span className="material-symbols-outlined !text-[18px]">calendar_today</span>
            30 derniers jours
          </button>
          
        </div>
      </div>

      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-5">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100">
                <span className="material-symbols-outlined">person</span>
              </div>
              
            </div>
            <p className="text-slate-400 text-[11px] font-extrabold uppercase tracking-widest mb-1.5">Etudiants</p>
            <h3 className="text-[28px] leading-none font-bold text-slate-900">{stats.students}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-5">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100">
                <span className="material-symbols-outlined">apartment</span>
              </div>
              
            </div>
            <p className="text-slate-400 text-[11px] font-extrabold uppercase tracking-widest mb-1.5">Entreprises</p>
            <h3 className="text-[28px] leading-none font-bold text-slate-900">{stats.enterprises}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-5">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center border border-amber-100">
                <span className="material-symbols-outlined">rocket_launch</span>
              </div>
              
            </div>
            <p className="text-slate-400 text-[11px] font-extrabold uppercase tracking-widest mb-1.5">Offres de stage</p>
            <h3 className="text-[28px] leading-none font-bold text-slate-900">{stats.offersStage}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-5">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center border border-purple-100">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              
            </div>
            <p className="text-slate-400 text-[11px] font-extrabold uppercase tracking-widest mb-1.5">Offres d'emploi</p>
            <h3 className="text-[28px] leading-none font-bold text-slate-900">{stats.offersJob}</h3>
          </div>
        </div>

      </div>

      {/* Charts and Main Visuals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 w-full">
        
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
            <div>
              <h4 className="text-[18px] font-bold text-slate-900">Évolution des inscriptions</h4>
              <p className="text-[13px] font-medium text-slate-500 mt-1">Tendance des 6 derniers mois</p>
            </div>
            <div className="flex gap-5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary shadow-sm"></span>
                <span className="text-[12px] font-bold text-slate-600">Utilisateurs</span>
              </div>
            </div>
          </div>
          
          <div className="relative flex-1 min-h-[250px] w-full mt-2 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden">
            <div className="absolute inset-0 flex flex-col justify-between py-6 opacity-50">
              <div className="w-full h-px bg-slate-200"></div>
              <div className="w-full h-px bg-slate-200"></div>
              <div className="w-full h-px bg-slate-200"></div>
              <div className="w-full h-px bg-slate-200"></div>
            </div>
            <div className="relative z-10 h-full flex items-end justify-between gap-4 px-6 pb-6">
              {monthlySeries.map((item) => (
                <div key={item.label} className="flex-1 flex flex-col items-center gap-3">
                  <div className="w-full max-w-[32px] rounded-t-lg bg-primary/20" style={{ height: `${item.percentage}%` }}></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activité Récente Section */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col max-h-[450px]">
          <h4 className="text-[18px] font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-400">history</span>
            Activité Récente
          </h4>
          <div className="space-y-6 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {loading ? (
              <div className="text-slate-500 text-sm">Chargement...</div>
            ) : activityItems.length === 0 ? (
              <div className="text-slate-500 text-sm">Aucune activite recente.</div>
            ) : (
              activityItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200 group-hover:border-primary/50 transition-colors flex items-center justify-center">
                    {item.avatar ? (
                      <img alt={item.name} className="w-full h-full object-cover" src={item.avatar} />
                    ) : (
                      <span className="material-symbols-outlined text-slate-400">notifications</span>
                    )}
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">{item.name}</p>
                    <p className="text-[13px] text-slate-500 font-medium leading-tight mt-1">{item.description}</p>
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md mt-2 inline-block uppercase">
                      {item.date.toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Tables & Health Row */}
      <div className="flex flex-col gap-6 w-full">
        
        {/* Data Table Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden w-full">
          <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h4 className="text-[18px] font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-400">admin_panel_settings</span>
              Offres en attente de modération
            </h4>
            <span className="px-3 py-1 bg-amber-50 border border-amber-200/50 text-amber-700 text-[10px] font-black tracking-widest rounded-lg flex items-center gap-1.5 shadow-sm shadow-amber-100/50">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                {pendingOffers.length} ACTIONS REQUISES
            </span>
          </div>
          <div className="overflow-x-auto min-w-full">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-white border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-5">Offre</th>
                  <th className="px-8 py-5">Secteur</th>
                  <th className="px-8 py-5">Date de soumission</th>
                  <th className="px-8 py-5">Niveau</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td className="px-8 py-6 text-slate-500 text-sm" colSpan="5">Chargement...</td>
                  </tr>
                ) : pendingOffers.length === 0 ? (
                  <tr>
                    <td className="px-8 py-6 text-slate-500 text-sm" colSpan="5">Aucune offre en attente.</td>
                  </tr>
                ) : (
                  pendingOffers.map((offer) => (
                    <tr key={offer.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined !text-[20px]">description</span>
                          </div>
                          <div>
                            <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">{offer.title}</p>
                            <p className="text-[12px] font-medium text-slate-500 mt-0.5">{offer.enterprise?.companyName || 'Entreprise'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-4 text-[13px] font-semibold text-slate-600">{offer.enterprise?.industry || 'Non defini'}</td>
                      <td className="px-8 py-4 text-[13px] font-medium text-slate-500">
                        {offer.createdAt ? new Date(offer.createdAt).toLocaleDateString('fr-FR') : 'Non renseigne'}
                      </td>
                      <td className="px-8 py-4">
                        <span className="inline-flex items-center gap-2 text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100/50">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          FAIBLE
                        </span>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <button className="px-4 py-2 bg-slate-50 text-blue-600 hover:bg-blue-50 border border-slate-200 hover:border-blue-100 rounded-xl font-bold text-[12px] transition-all">Examiner</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

              </div>
    </AdminDashboardLayout>
  );
}


