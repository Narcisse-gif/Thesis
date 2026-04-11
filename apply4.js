const fs = require('fs');
let content = fs.readFileSync('frontend/src/pages/StudentDashboardPage.jsx', 'utf8');

content = content.replace(
  "import { useNavigate } from 'react-router-dom';",
  "import { useNavigate } from 'react-router-dom';\nimport { useState, useEffect } from 'react';\nimport api from '../services/api';"
);

content = content.replace(
  "export default function StudentDashboardPage() {\n  const navigate = useNavigate();",
  `export default function StudentDashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, pending: 0, accepted: 0, rejected: 0 });
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    api.get('/applications/my').then(res => {
      const apps = res.data;
      setApplications(apps.slice(0, 3));
      setStats({
        total: apps.length,
        pending: apps.filter(a => a.status === 'PENDING').length,
        accepted: apps.filter(a => a.status === 'ACCEPTED').length,
        rejected: apps.filter(a => a.status === 'REJECTED').length,
      });
    }).catch(console.error);
  }, []);`
);

content = content.replace('<h3 className="text-4xl font-extrabold text-slate-900">12</h3>', '<h3 className="text-4xl font-extrabold text-slate-900">{stats.total < 10 ? "0"+stats.total : stats.total}</h3>');
content = content.replace('<h3 className="text-4xl font-extrabold text-slate-900">05</h3>', '<h3 className="text-4xl font-extrabold text-slate-900">{stats.pending < 10 ? "0"+stats.pending : stats.pending}</h3>');
content = content.replace('<h3 className="text-4xl font-extrabold text-slate-900">02</h3>', '<h3 className="text-4xl font-extrabold text-slate-900">{stats.accepted < 10 ? "0"+stats.accepted : stats.accepted}</h3>');
content = content.replace('<h3 className="text-4xl font-extrabold text-slate-900">03</h3>', '<h3 className="text-4xl font-extrabold text-slate-900">{stats.rejected < 10 ? "0"+stats.rejected : stats.rejected}</h3>');
content = content.replace(/<span className="bg-primary\/5 text-primary text-\[10px\] py-1.5 px-3.5 rounded-full font-bold tracking-widest">3 ACTIVES<\/span>/, '<span className="bg-primary/5 text-primary text-[10px] py-1.5 px-3.5 rounded-full font-bold tracking-widest">{stats.pending} ACTIVES</span>');

// Replace the job cards with a mapped loop. Wait, the job card is huge. Let's do it using Regex.
content = content.replace(
  /<div className="space-y-4">[\s\S]*?{ \/\* Right: Suggestions \*\/ }/,
  `<div className="space-y-4">
            {applications.length === 0 ? (
              <div className="bg-white p-7 rounded-[2rem] shadow-sm border border-slate-50 text-center text-slate-500 font-bold">Aucune candidature r├®cente.</div>
            ) : applications.map(app => (
            <div key={app.id} className="bg-white p-7 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-500 border border-slate-50 flex flex-col sm:flex-row items-start sm:items-center gap-4 group cursor-pointer" onClick={() => navigate('/etudiant/candidatures')}>
              <div className="h-16 w-16 rounded-2xl bg-slate-50 p-3 flex items-center justify-center shrink-0 border border-slate-100 group-hover:border-primary/20 transition-colors duration-500">
                <img alt={app.offer.enterprise?.companyName} className="w-full h-full object-contain" src={app.offer.enterprise?.logoUrl || ("https://ui-avatars.com/api/?name=" + encodeURIComponent(app.offer.enterprise?.companyName || 'Ent') + "&background=e0ecff&color=1d4ed8&bold=true")} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-[16px] group-hover:text-primary transition-colors">{app.offer.title}</h4>
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <span className="text-[13px] text-slate-500 font-medium">{app.offer.enterprise?.companyName}</span>
                  <span className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="text-[13px] text-slate-400 font-medium">{app.offer.location}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="material-symbols-outlined text-slate-400 !text-[14px]">event</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Postul├® le {new Date(app.appliedAt).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end mt-2 sm:mt-0">
                <span className={\`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest \${app.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border border-amber-100/50' : app.status === 'ACCEPTED' ? 'bg-green-50 text-green-700 border border-green-100/50' : 'bg-red-50 text-red-700 border border-red-100/50'}\`}>
                  {app.status === 'PENDING' ? 'En attente' : app.status === 'ACCEPTED' ? 'Accept├®e' : 'Refus├®e'}
                </span>
                <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>
            </div>
            ))}
          </div>
        </div>

        { /* Right: Suggestions */ }`
);

fs.writeFileSync('frontend/src/pages/StudentDashboardPage.jsx', content);
console.log('Done changing StudentDashboardPage.');
