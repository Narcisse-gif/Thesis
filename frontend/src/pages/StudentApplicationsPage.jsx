import { useMemo, useState, useEffect } from 'react';
import api from '../services/api';
import StudentDashboardLayout from '../components/StudentDashboardLayout';



const statusStyle = {
  Acceptee: 'bg-green-50 text-green-700 border-green-200',
  'En attente': 'bg-blue-50 text-blue-700 border-blue-200',
  Rejetee: 'bg-red-50 text-red-700 border-red-200'
};

export default function StudentApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiBaseUrl = api.defaults.baseURL || '';
  const resolveMediaUrl = (value) => {
    if (!value) return '';
    if (value.startsWith('http')) return value;
    if (value.startsWith('/uploads/')) return `${apiBaseUrl}${value}`;
    return value;
  };

  useEffect(() => {
    api.get('/applications/my').then(res => {
      setApplications(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [typeFilter, setTypeFilter] = useState('Tous');
  const [cityFilter, setCityFilter] = useState('Toutes');
  const [search, setSearch] = useState('');

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const mapStatus = s => s === 'PENDING' ? 'En attente' : s === 'ACCEPTED' ? 'Acceptee' : 'Rejetee';
      const statusMatch = statusFilter === 'Tous' ? true : mapStatus(application.status) === statusFilter;
      const mapType = t => t === 'STAGE' ? 'Stage' : 'Emploi';
      const typeMatch = typeFilter === 'Tous' ? true : mapType(application.offer.contractType) === typeFilter;
      const cityMatch = cityFilter === 'Toutes' ? true : application.offer.location === cityFilter;
      const searchMatch =
        application.offer.title.toLowerCase().includes(search.toLowerCase()) ||
        (application.offer.enterprise?.companyName || '').toLowerCase().includes(search.toLowerCase());

      return statusMatch && typeMatch && cityMatch && searchMatch;
    });
  }, [statusFilter, typeFilter, cityFilter, search, applications]);

  return (
    <StudentDashboardLayout>
      <section className="space-y-8">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Mes candidatures</h2>
          <p className="text-slate-500 text-sm">Suivez vos candidatures avec filtrage par statut, type et ville.</p>
        </div>

        <div className="bg-white rounded-2xl border border-blue-100 p-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            <input
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:ring-4 focus:ring-primary/10"
              placeholder="Rechercher offre ou entreprise..."
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <select className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option>Tous</option>
              <option>Acceptee</option>
              <option>En attente</option>
              <option>Rejetee</option>
            </select>
            <select className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
              <option>Tous</option>
              <option>Stage</option>
              <option>Emploi</option>
            </select>
            <select className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm" value={cityFilter} onChange={(event) => setCityFilter(event.target.value)}>
              <option>Toutes</option>
              <option>Ouagadougou</option>
              <option>Bobo-Dioulasso</option>
              <option>Koudougou</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Offre</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Entreprise</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Type</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Ville</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApplications.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{row.offer.title}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white border border-blue-100 overflow-hidden p-1.5 shrink-0">
                        <img
                          alt={`Logo ${row.offer.enterprise?.companyName}`}
                          className="w-full h-full object-contain"
                          src={resolveMediaUrl(row.offer.enterprise?.logoUrl)}
                          onError={(event) => {
                            event.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent((row.offer.enterprise?.companyName || 'Ent').substring(0, 2))}&background=e0ecff&color=1d4ed8&bold=true`;
                          }}
                        />
                      </div>
                      <span>{row.offer.enterprise?.companyName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{row.offer.contractType === 'STAGE' ? 'Stage' : 'Emploi'}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{row.offer.location}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{row.appliedAt ? new Date(row.appliedAt).toLocaleDateString('fr-FR') : 'Date inconnue'}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${statusStyle[row.status === 'PENDING' ? 'En attente' : row.status === 'ACCEPTED' ? 'Acceptee' : 'Rejetee']}`}>
                      {row.status === 'PENDING' ? 'En attente' : row.status === 'ACCEPTED' ? 'Acceptee' : 'Rejetee'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </StudentDashboardLayout>
  );
}

