import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import InternshipsPage from './pages/InternshipsPage';
import JobsPage from './pages/JobsPage';
import EnterprisesPage from './pages/EnterprisesPage';
import AdvicePage from './pages/AdvicePage';
import LoginPage from './pages/LoginPage';
import RegisterSelectionPage from './pages/RegisterSelectionPage';
import StudentRegisterPage from './pages/StudentRegisterPage';
import EnterpriseRegisterPage from './pages/EnterpriseRegisterPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import StudentApplicationsPage from './pages/StudentApplicationsPage';
import StudentFavoritesPage from './pages/StudentFavoritesPage';
import StudentProfilePage from './pages/StudentProfilePage';
import EnterpriseDashboardPage from './pages/EnterpriseDashboardPage';
import EnterpriseOffersPage from './pages/EnterpriseOffersPage';
import EnterpriseCandidatesPage from './pages/EnterpriseCandidatesPage';
import EnterpriseCreateOfferPage from './pages/EnterpriseCreateOfferPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import OfferDetailPage from './pages/OfferDetailPage';
import EnterpriseDetailPage from './pages/EnterpriseDetailPage';
import ApplicationFormPage from './pages/ApplicationFormPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/stages" element={<InternshipsPage />} />
        <Route path="/emplois" element={<JobsPage />} />
        <Route path="/emplois/:id" element={<OfferDetailPage />} />
        <Route path="/stages/:id" element={<OfferDetailPage />} />
        <Route path="/postuler/:id" element={<ApplicationFormPage />} />
        <Route path="/entreprises" element={<EnterprisesPage />} />
        <Route path="/entreprises/:id" element={<EnterpriseDetailPage />} />
        <Route path="/conseils" element={<AdvicePage />} />
        <Route path="/connexion" element={<LoginPage />} />
        <Route path="/inscription" element={<RegisterSelectionPage />} />
        <Route path="/inscription/etudiant" element={<StudentRegisterPage />} />
        <Route path="/inscription/entreprise" element={<EnterpriseRegisterPage />} />
        <Route path="/etudiant/dashboard" element={<StudentDashboardPage />} />
        <Route path="/etudiant/candidatures" element={<StudentApplicationsPage />} />
        <Route path="/etudiant/favoris" element={<StudentFavoritesPage />} />
        <Route path="/etudiant/profil" element={<StudentProfilePage />} />
        <Route path="/entreprise/dashboard" element={<EnterpriseDashboardPage />} />
        <Route path="/entreprise/offres" element={<EnterpriseOffersPage />} />
        <Route path="/entreprise/offres/nouvelle" element={<EnterpriseCreateOfferPage />} />
        <Route path="/entreprise/candidats" element={<EnterpriseCandidatesPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
