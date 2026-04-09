import { useMemo, useState } from 'react';
import StudentDashboardLayout from '../components/StudentDashboardLayout';

const applications = [
  { id: 1, offer: 'Développeur Fullstack Junior', company: 'Orange Burkina Faso', initials: 'OR', logo: 'https://logo.clearbit.com/orange.com', city: 'Ouagadougou', type: 'Stage', date: '12/10/2023', status: 'Acceptee' },
  { id: 2, offer: 'Analyste Cybersécurité', company: 'Coris Bank International', initials: 'CB', logo: 'https://logo.clearbit.com/corisbankinternational.com', city: 'Bobo-Dioulasso', type: 'Stage', date: '15/10/2023', status: 'En attente' },
  { id: 3, offer: 'Assistant Marketing Digital', company: 'Moov Africa', initials: 'MV', logo: 'https://logo.clearbit.com/moov-africa.com', city: 'Ouagadougou', type: 'Emploi', date: '08/10/2023', status: 'Rejetee' },
  { id: 4, offer: 'Data Analyst Junior', company: 'UBA Burkina', initials: 'UBA', logo: 'https://logo.clearbit.com/ubagroup.com', city: 'Ouagadougou', type: 'Stage', date: '05/10/2023', status: 'En attente' },
  { id: 5, offer: 'Support IT', company: 'SONABEL', initials: 'SNB', logo: 'https://logo.clearbit.com/sonabel.bf', city: 'Koudougou', type: 'Emploi', date: '28/09/2023', status: 'En attente' },
  { id: 6, offer: 'Comptable Junior', company: 'BOA Burkina', initials: 'BOA', logo: 'https://logo.clearbit.com/boaburkina.com', city: 'Ouagadougou', type: 'Emploi', date: '21/09/2023', status: 'Acceptee' }
];

const statusStyle = {
  Acceptee: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'En attente': 'bg-blue-50 text-blue-700 border-blue-200',
  Rejetee: 'bg-red-50 text-red-700 border-red-200'
};

export default function StudentApplicationsPage() {
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [typeFilter, setTypeFilter] = useState('Tous');
  const [cityFilter, setCityFilter] = useState('Toutes');
  const [search, setSearch] = useState('');

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const statusMatch = statusFilter === 'Tous' ? true : application.status === statusFilter;
      const typeMatch = typeFilter === 'Tous' ? true : application.type === typeFilter;
      const cityMatch = cityFilter === 'Toutes' ? true : application.city === cityFilter;
      const searchMatch =
        application.offer.toLowerCase().includes(search.toLowerCase()) ||
        application.company.toLowerCase().includes(search.toLowerCase());

      return statusMatch && typeMatch && cityMatch && searchMatch;
    });
  }, [statusFilter, typeFilter, cityFilter, search]);

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
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{row.offer}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white border border-blue-100 overflow-hidden p-1.5 shrink-0">
                        <img
                          alt={`Logo ${row.company}`}
                          className="w-full h-full object-contain"
                          src={row.logo}
                          onError={(event) => {
                            event.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(row.initials)}&background=e0ecff&color=1d4ed8&bold=true`;
                          }}
                        />
                      </div>
                      <span>{row.company}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{row.type}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{row.city}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{row.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${statusStyle[row.status]}`}>
                      {row.status}
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
