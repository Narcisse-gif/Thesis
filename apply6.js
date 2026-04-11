const fs = require('fs');
let content = fs.readFileSync('frontend/src/pages/AdminDashboardPage.jsx', 'utf8');

content = content.replace(
  "import AdminDashboardLayout from '../components/AdminDashboardLayout';",
  "import { useState, useEffect } from 'react';\nimport api from '../services/api';\nimport AdminDashboardLayout from '../components/AdminDashboardLayout';"
);

content = content.replace(
  "export default function AdminDashboardPage() {",
  `export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ users: 0, offers: 0, candidatures: 0, flags: 5 });

  useEffect(() => {
    (async () => {
      try {
        const usersReq = api.get('/users/all').catch(() => ({ data: [] }));
        const offersReq = api.get('/offers').catch(() => ({ data: [] }));
        const [uRes, oRes] = await Promise.all([usersReq, offersReq]);
        setStats(s => ({ ...s, users: uRes.data?.length || 0, offers: oRes.data?.length || 0 }));
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);`
);

content = content.replace(
  /<h3 className="text-4xl font-extrabold text-slate-900">\s*12,543\s*<\/h3>/,
  `<h3 className="text-4xl font-extrabold text-slate-900">{stats.users}</h3>`
);
content = content.replace(
  /<h3 className="text-4xl font-extrabold text-slate-900">\s*4,320\s*<\/h3>/,
  `<h3 className="text-4xl font-extrabold text-slate-900">{stats.offers}</h3>`
);
content = content.replace(
  /<h3 className="text-4xl font-extrabold text-slate-900">\s*84,102\s*<\/h3>/,
  `<h3 className="text-4xl font-extrabold text-slate-900">{stats.candidatures}</h3>`
);
content = content.replace(
  /<h3 className="text-4xl font-extrabold text-slate-900">\s*5\s*<\/h3>/,
  `<h3 className="text-4xl font-extrabold text-slate-900">{stats.flags}</h3>`
);

fs.writeFileSync('frontend/src/pages/AdminDashboardPage.jsx', content);
console.log('Done apply 6.');
