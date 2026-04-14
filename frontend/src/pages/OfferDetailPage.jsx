import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OfferDetailContent from '../components/OfferDetailContent';

export default function OfferDetailPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <OfferDetailContent applyPathBase="/postuler" />
      </main>

      <Footer />
    </div>
  );
}
