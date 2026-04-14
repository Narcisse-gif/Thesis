import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ApplicationFormContent from '../components/ApplicationFormContent';

export default function ApplicationFormPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <ApplicationFormContent />
      </main>

      <Footer />
    </div>
  );
}
