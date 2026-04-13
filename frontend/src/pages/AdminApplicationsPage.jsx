import React, { useEffect, useState } from 'react';
import AdminDashboardLayout from '../components/AdminDashboardLayout';
import api from '../services/api';

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get('/admin/applications');
        setApplications(response.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <AdminDashboardLayout>
      <div className="p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Gestion des candidatures</h2>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Candidat</th>
                  <th className="px-6 py-4">Offre</th>
                  <th className="px-6 py-4">Entreprise</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500 text-[13px]">
                      Chargement...
                    </td>
                  </tr>
                ) : applications.length > 0 ? (
                  applications.map((app) => {
                    const student = app.student || {};
                    const name = `${student.firstName || ''} ${student.lastName || ''}`.trim() || 'Candidat';
                    const offerTitle = app.offer?.title || 'Offre';
                    const enterpriseName = app.offer?.enterprise?.companyName || 'Entreprise';
                    const date = app.appliedAt ? new Date(app.appliedAt).toLocaleDateString('fr-FR') : '—';
                    const status = app.status || 'PENDING';
                    const statusLabel = status === 'PENDING' ? 'En attente' : status === 'ACCEPTED' ? 'Acceptée' : status === 'REJECTED' ? 'Rejetée' : status;

                    return (
                      <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-[13px] font-semibold text-slate-700">{name}</td>
                        <td className="px-6 py-4 text-[13px] text-slate-600">{offerTitle}</td>
                        <td className="px-6 py-4 text-[13px] text-slate-600">{enterpriseName}</td>
                        <td className="px-6 py-4 text-[13px] text-slate-500">{date}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-md border ${status === 'PENDING' ? 'text-amber-700 bg-amber-50 border-amber-200' : status === 'ACCEPTED' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-red-700 bg-red-50 border-red-200'}`}>
                            {statusLabel}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500 text-[13px]">
                      Aucune candidature trouvée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
