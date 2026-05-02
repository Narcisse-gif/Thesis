import AdminDashboardLayout from '../components/AdminDashboardLayout';

export default function AdminMessagesPage() {
  return (
    <AdminDashboardLayout>
      <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Messagerie admin desactivee</h2>
        <p className="mt-2 text-sm text-slate-500">
          Cette section a ete desactivee. Le reste du dashboard reste accessible.
        </p>
      </section>
    </AdminDashboardLayout>
  );
}
