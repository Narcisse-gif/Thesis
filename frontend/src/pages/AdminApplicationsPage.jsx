import React from 'react';
import AdminDashboardLayout from '../components/AdminDashboardLayout';

export default function AdminApplicationsPage() {
  return (
    <AdminDashboardLayout>
      <div className="p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Gestion des candidatures</h2>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400">
            En construction...
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
