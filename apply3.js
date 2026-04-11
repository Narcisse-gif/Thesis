const fs = require('fs');
let content = fs.readFileSync('frontend/src/pages/EnterpriseCandidatesPage.jsx', 'utf8');

content = content.replace(
  "import EnterpriseDashboardLayout from '../components/EnterpriseDashboardLayout';",
  "import { useState, useEffect } from 'react';\nimport api from '../services/api';\nimport EnterpriseDashboardLayout from '../components/EnterpriseDashboardLayout';"
);

content = content.replace(
  "export default function EnterpriseCandidatesPage() {",
  `export default function EnterpriseCandidatesPage() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await api.get('/applications/enterprise');
      setCandidates(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.patch(\`/applications/\${id}/status\`, { status });
      fetchCandidates();
    } catch (err) {
      console.error('Failed to change status', err);
    }
  };`
);

content = content.replace(
  /<tbody className="divide-y divide-slate-50">[\s\S]*?<\/tbody>/,
  `<tbody className="divide-y divide-slate-50">
    {candidates.map((app) => (
      <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group">
        <td className="px-6 py-5">
          <div className="flex items-center gap-4">
            <img alt="Candidat" className="w-10 h-10 rounded-full object-cover" src={"https://ui-avatars.com/api/?name=" + encodeURIComponent(app.student?.user?.firstName || 'C')} />
            <div>
              <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">{app.student?.user?.firstName} {app.student?.user?.lastName}</p>
              <p className="text-[12px] text-slate-400 mt-0.5">{app.student?.user?.email}</p>
            </div>
          </div>
        </td>
        <td className="px-6 py-5">
          <p className="text-[14px] text-slate-700 font-medium">{app.student?.university}</p>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">{app.student?.fieldOfStudy}</p>
        </td>
        <td className="px-6 py-5">
          <span className="px-3 py-1 bg-slate-100 text-slate-600 border border-slate-200/50 rounded-full text-[10px] font-bold uppercase tracking-wider">{app.offer?.title}</span>
        </td>
        <td className="px-6 py-5">
          <p className="text-[13px] text-slate-600 font-medium">{new Date(app.appliedAt).toLocaleDateString('fr-FR')}</p>
        </td>
        <td className="px-6 py-5">
          <span className={\`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider \${app.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-100/50' : app.status === 'ACCEPTED' ? 'bg-green-50 text-green-700 border-green-100/50' : 'bg-red-50 text-red-700 border-red-100/50'}\`}>
            {app.status === 'PENDING' ? 'En attente' : app.status === 'ACCEPTED' ? 'Acceptée' : 'Rejetée'}
          </span>
        </td>
        <td className="px-6 py-5 text-right relative">
          <div className="group/action inline-block">
            <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-primary shadow-sm border border-transparent hover:border-slate-100 focus:outline-none">
              <span className="material-symbols-outlined !text-[20px]">more_vert</span>
            </button>
            <div className="absolute right-10 top-2 w-48 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 opacity-0 invisible group-focus-within/action:opacity-100 group-focus-within/action:visible z-50 flex flex-col py-1 overflow-hidden text-left">
              <button onClick={() => alert('Profil du candidat ' + app.id)} className="px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">person</span> Voir le profil</button>
              {app.status === 'PENDING' && (
                <>
                  <button onClick={() => handleStatusChange(app.id, 'ACCEPTED')} className="px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-green-50 hover:text-green-600 transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">check_circle</span> Accepter</button>
                  <button onClick={() => handleStatusChange(app.id, 'REJECTED')} className="px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-3"><span className="material-symbols-outlined !text-[18px]">cancel</span> Rejeter</button>
                </>
              )}
            </div>
          </div>
        </td>
      </tr>
    ))}
  </tbody>`
);

content = content.replace(
  /<p className="text-\[13px\] text-slate-500 font-medium">Affichage de <span className="text-slate-900 font-bold">4<\/span> sur <span className="text-slate-900 font-bold">28<\/span> candidatures<\/p>/,
  '<p className="text-[13px] text-slate-500 font-medium">Affichage de <span className="text-slate-900 font-bold">{candidates.length}</span> candidatures</p>'
);

fs.writeFileSync('frontend/src/pages/EnterpriseCandidatesPage.jsx', content);
console.log('Done changing EnterpriseCandidatesPage.');
