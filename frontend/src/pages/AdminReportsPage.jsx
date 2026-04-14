import { useEffect, useState } from 'react';
import AdminDashboardLayout from '../components/AdminDashboardLayout';
import api from '../services/api';

export default function AdminReportsPage() {
  const [kpis, setKpis] = useState([]);
  const [topSectors, setTopSectors] = useState([]);
  const [chartSeries, setChartSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const formatNumber = (value) => new Intl.NumberFormat('fr-FR').format(value || 0);
    const monthKey = (date) => `${date.getFullYear()}-${date.getMonth()}`;
    const getMonths = () => Array.from({ length: 6 }, (_, index) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - index));
      return {
        key: monthKey(date),
        label: date.toLocaleDateString('fr-FR', { month: 'short' }),
      };
    });

    const buildTrend = (current, previous) => {
      if (!previous && !current) {
        return { trend: 'up', percentage: '0%' };
      }
      if (!previous) {
        return { trend: 'up', percentage: '100%' };
      }
      const diff = current - previous;
      const percent = Math.round((Math.abs(diff) / previous) * 100);
      return { trend: diff >= 0 ? 'up' : 'down', percentage: `${percent}%` };
    };

    (async () => {
      try {
        const [usersRes, offersRes, applicationsRes] = await Promise.all([
          api.get('/admin/users'),
          api.get('/admin/offers'),
          api.get('/admin/applications'),
        ]);

        const users = usersRes.data || [];
        const offers = offersRes.data || [];
        const applications = applicationsRes.data || [];

        const students = users.filter((user) => user.role === 'STUDENT');
        const enterprises = users.filter((user) => user.role === 'ENTERPRISE');

        const now = new Date();
        const currentKey = monthKey(now);
        const previousDate = new Date(now);
        previousDate.setMonth(previousDate.getMonth() - 1);
        const previousKey = monthKey(previousDate);

        const countByMonth = (items, field) => {
          const months = getMonths();
          return months.map((month) => {
            const count = items.filter((item) => {
              const value = item[field];
              if (!value) return false;
              const created = new Date(value);
              return monthKey(created) === month.key;
            }).length;
            return { label: month.label, count };
          });
        };

        const offersSeries = countByMonth(offers, 'createdAt');
        const hiresSeries = countByMonth(
          applications.filter((app) => app.status === 'ACCEPTED'),
          'appliedAt',
        );

        const cumulativeOffers = [];
        offersSeries.reduce((total, item) => {
          const nextTotal = total + item.count;
          cumulativeOffers.push({ label: item.label, count: nextTotal });
          return nextTotal;
        }, 0);

        const cumulativeHires = [];
        hiresSeries.reduce((total, item) => {
          const nextTotal = total + item.count;
          cumulativeHires.push({ label: item.label, count: nextTotal });
          return nextTotal;
        }, 0);

        const maxValue = Math.max(
          ...cumulativeOffers.map((item) => item.count),
          ...cumulativeHires.map((item) => item.count),
          1,
        );
        const normalizedChart = cumulativeOffers.map((item, index) => ({
          label: item.label,
          offersCount: item.count,
          offersPct: Math.round((item.count / maxValue) * 100),
          hiresCount: cumulativeHires[index]?.count || 0,
          hiresPct: Math.round(((cumulativeHires[index]?.count || 0) / maxValue) * 100),
        }));

        const currentStudents = students.filter((user) => user.createdAt && monthKey(new Date(user.createdAt)) === currentKey).length;
        const previousStudents = students.filter((user) => user.createdAt && monthKey(new Date(user.createdAt)) === previousKey).length;
        const studentTrend = buildTrend(currentStudents, previousStudents);

        const currentEnterprises = enterprises.filter((user) => user.createdAt && monthKey(new Date(user.createdAt)) === currentKey).length;
        const previousEnterprises = enterprises.filter((user) => user.createdAt && monthKey(new Date(user.createdAt)) === previousKey).length;
        const enterpriseTrend = buildTrend(currentEnterprises, previousEnterprises);

        const currentOffers = offers.filter((offer) => offer.createdAt && monthKey(new Date(offer.createdAt)) === currentKey).length;
        const previousOffers = offers.filter((offer) => offer.createdAt && monthKey(new Date(offer.createdAt)) === previousKey).length;
        const offerTrend = buildTrend(currentOffers, previousOffers);

        const pendingOffers = offers.filter((offer) => offer.status === 'EN_ATTENTE');
        const currentPending = pendingOffers.filter((offer) => offer.createdAt && monthKey(new Date(offer.createdAt)) === currentKey).length;
        const previousPending = pendingOffers.filter((offer) => offer.createdAt && monthKey(new Date(offer.createdAt)) === previousKey).length;
        const pendingTrend = buildTrend(currentPending, previousPending);

        setKpis([
          {
            label: 'Nouveaux Etudiants (Mois)',
            value: `+${formatNumber(currentStudents)}`,
            trend: studentTrend.trend,
            percentage: studentTrend.percentage,
            icon: 'school',
            accent: { glow: 'bg-emerald-500/10', chip: 'bg-emerald-50', text: 'text-emerald-600' },
          },
          {
            label: 'Nouvelles Entreprises (Mois)',
            value: `+${formatNumber(currentEnterprises)}`,
            trend: enterpriseTrend.trend,
            percentage: enterpriseTrend.percentage,
            icon: 'business',
            accent: { glow: 'bg-blue-500/10', chip: 'bg-blue-50', text: 'text-blue-600' },
          },
          {
            label: 'Offres Publiees (Mois)',
            value: formatNumber(currentOffers),
            trend: offerTrend.trend,
            percentage: offerTrend.percentage,
            icon: 'work',
            accent: { glow: 'bg-purple-500/10', chip: 'bg-purple-50', text: 'text-purple-600' },
          },
          {
            label: 'Offres en attente',
            value: formatNumber(pendingOffers.length),
            trend: pendingTrend.trend,
            percentage: pendingTrend.percentage,
            icon: 'flag',
            accent: { glow: 'bg-rose-500/10', chip: 'bg-rose-50', text: 'text-rose-600' },
          },
        ]);

        const sectorMap = offers.reduce((acc, offer) => {
          const sector = offer.enterprise?.industry || offer.industry || 'Autres';
          acc[sector] = (acc[sector] || 0) + 1;
          return acc;
        }, {});

        const sectorEntries = Object.entries(sectorMap).sort((a, b) => b[1] - a[1]);
        const totalOffers = offers.length || 1;
        const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-amber-500', 'bg-slate-300'];
        const sectors = sectorEntries.slice(0, 4).map(([name, count], index) => ({
          name,
          percentage: Math.round((count / totalOffers) * 100),
          color: colors[index],
        }));

        const remainingCount = sectorEntries.slice(4).reduce((sum, [, count]) => sum + count, 0);
        if (remainingCount > 0) {
          sectors.push({
            name: 'Autres',
            percentage: Math.round((remainingCount / totalOffers) * 100),
            color: colors[4],
          });
        }

        setTopSectors(sectors);
        setChartSeries(normalizedChart);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
            <div className={`absolute top-0 right-0 w-24 h-24 ${kpi.accent.glow} rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500`}></div>
            <div className={`w-12 h-12 ${kpi.accent.chip} ${kpi.accent.text} rounded-2xl flex items-center justify-center mb-6`}>
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
             <div>
               <h3 className="text-[18px] font-bold text-slate-900">Croissance Offres &amp; Recrutements (Derniers 6 mois)</h3>
               <p className="text-[13px] text-slate-500 mt-1">Offres publiees et candidatures acceptees.</p>
             </div>
             <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 text-[12px] font-bold text-slate-600">
                 <span className="w-3 h-3 rounded-full bg-emerald-500/70"></span>
                 Offres
               </div>
               <div className="flex items-center gap-2 text-[12px] font-bold text-slate-600">
                 <span className="w-3 h-3 rounded-full bg-blue-500/70"></span>
                 Recrutements
               </div>
             </div>
           </div>
           <div className="h-64 flex items-end gap-3 sm:gap-6 justify-between mt-auto border-b border-slate-100 pb-2 relative">
             {/* Y-Axis lines */}
             <div className="absolute inset-0 flex flex-col justify-between border-slate-100 pointer-events-none">
                <div className="h-0 border-t border-dashed border-slate-200 w-full opacity-50"></div>
                <div className="h-0 border-t border-dashed border-slate-200 w-full opacity-50"></div>
                <div className="h-0 border-t border-dashed border-slate-200 w-full opacity-50"></div>
                <div className="h-0 border-t border-dashed border-slate-200 w-full opacity-50"></div>
             </div>
             {loading ? (
               <div className="text-slate-500 text-sm">Chargement...</div>
             ) : chartSeries.length === 0 ? (
               <div className="text-slate-500 text-sm">Aucune donnee disponible.</div>
             ) : (
               chartSeries.map((item) => (
                 <div key={item.label} className="flex-1 flex flex-col justify-end items-center group relative z-10">
                   <div className="w-full flex items-end justify-center gap-2">
                     <div
                       className="w-full max-w-[18px] bg-emerald-500/30 group-hover:bg-emerald-500/80 transition-colors rounded-t-lg relative"
                       style={{ height: `${item.offersPct}%` }}
                     >
                       <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-bold py-1 px-2 rounded-md transition-opacity pointer-events-none">
                         {item.offersCount}
                       </div>
                     </div>
                     <div
                       className="w-full max-w-[18px] bg-blue-500/30 group-hover:bg-blue-500/80 transition-colors rounded-t-lg relative"
                       style={{ height: `${item.hiresPct}%` }}
                     >
                       <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-bold py-1 px-2 rounded-md transition-opacity pointer-events-none">
                         {item.hiresCount}
                       </div>
                     </div>
                   </div>
                   <span className="text-[12px] font-bold text-slate-400 mt-4 overflow-hidden text-ellipsis whitespace-nowrap">
                     {item.label}
                   </span>
                 </div>
               ))
             )}
           </div>
        </div>

        {/* Top Sectors Details */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-[18px] font-bold text-slate-900 mb-1">Tendances Secteurs</h3>
          <p className="text-[13px] font-medium text-slate-500 mb-8">Les domaines les plus demandés.</p>
          
          <div className="space-y-6">
            {loading ? (
              <div className="text-slate-500 text-sm">Chargement...</div>
            ) : topSectors.length === 0 ? (
              <div className="text-slate-500 text-sm">Aucune offre disponible.</div>
            ) : (
              topSectors.map((sector, i) => (
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
              ))
            )}
          </div>
          
          <button className="w-full mt-8 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[13px] font-bold rounded-xl transition-colors">
            Voir le détail des offres
          </button>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
