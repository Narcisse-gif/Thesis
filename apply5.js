const fs = require('fs');
let content = fs.readFileSync('frontend/src/pages/EnterpriseDashboardPage.jsx', 'utf8');

content = content.replace(
  "import EnterpriseDashboardLayout from '../components/EnterpriseDashboardLayout';",
  "import { useState, useEffect } from 'react';\nimport api from '../services/api';\nimport { useNavigate } from 'react-router-dom';\nimport EnterpriseDashboardLayout from '../components/EnterpriseDashboardLayout';"
);

content = content.replace(
  "export default function EnterpriseDashboardPage() {",
  `export default function EnterpriseDashboardPage() {
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
  }, []);`
);

content = content.replace(
  /<h3 className="text-\[28px\] sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2">\s*12\s*<\/h3>/,
  `<h3 className="text-[28px] sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2">{stats.offersCount < 10 ? "0"+stats.offersCount : stats.offersCount}</h3>`
);
content = content.replace(
  /<h3 className="text-\[28px\] sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2">\s*156\s*<\/h3>/,
  `<h3 className="text-[28px] sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2">{stats.totalApplicants}</h3>`
);
content = content.replace(
  /<h3 className="text-\[28px\] sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2">\s*24\s*<\/h3>/,
  `<h3 className="text-[28px] sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2">{stats.pending < 10 ? "0"+stats.pending : stats.pending}</h3>`
);
content = content.replace(
  /<h3 className="text-\[28px\] sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2">\s*8\s*<\/h3>/,
  `<h3 className="text-[28px] sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2">{stats.accepted < 10 ? "0"+stats.accepted : stats.accepted}</h3>`
);

content = content.replace(
  /<tbody className="divide-y divide-slate-50">[\s\S]*?<\/tbody>/,
  `<tbody className="divide-y divide-slate-50">
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
          <span className={\`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider \${app.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border border-amber-100/50' : app.status === 'ACCEPTED' ? 'bg-green-50 text-green-700 border border-green-100/50' : 'bg-red-50 text-red-700 border border-red-100/50'}\`}>
             {app.status === 'PENDING' ? 'En attente' : app.status === 'ACCEPTED' ? 'Acceptée' : 'Rejetée'}
          </span>
        </td>
        <td className="px-6 py-4 text-right">
          <span className="material-symbols-outlined text-[18px] text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
        </td>
      </tr>
    ))}
  </tbody>`
);

fs.writeFileSync('frontend/src/pages/EnterpriseDashboardPage.jsx', content);
console.log('Done apply 5.');
