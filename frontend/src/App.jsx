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
import StudentOffersSearchPage from './pages/StudentOffersSearchPage';
import StudentSettingsPage from './pages/StudentSettingsPage';
import StudentMessagesPage from './pages/StudentMessagesPage';
import EnterpriseDashboardPage from './pages/EnterpriseDashboardPage';
import EnterpriseOffersPage from './pages/EnterpriseOffersPage';
import EnterpriseCandidatesPage from './pages/EnterpriseCandidatesPage';
import EnterpriseCreateOfferPage from './pages/EnterpriseCreateOfferPage';
import EnterpriseMessagesPage from './pages/EnterpriseMessagesPage';
import EnterpriseSettingsPage from './pages/EnterpriseSettingsPage';
import EnterpriseDashboardProfilePage from './pages/EnterpriseDashboardProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminEnterprisesPage from './pages/AdminEnterprisesPage';
import AdminOffersPage from './pages/AdminOffersPage';
import AdminApplicationsPage from './pages/AdminApplicationsPage';
import AdminModerationPage from './pages/AdminModerationPage';
import AdminNotificationsPage from './pages/AdminNotificationsPage';
import AdminReportsPage from './pages/AdminReportsPage';
import AdminSettingsPage from './pages/AdminSettingsPage';
import AdminLogsPage from './pages/AdminLogsPage';
import OfferDetailPage from './pages/OfferDetailPage';
import InternshipDetailPage from './pages/InternshipDetailPage';
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
        <Route path="/stages/:id" element={<InternshipDetailPage />} />
        <Route path="/postuler/:id" element={<ApplicationFormPage />} />
        <Route path="/entreprises" element={<EnterprisesPage />} />
        <Route path="/entreprises/:id" element={<EnterpriseDetailPage />} />
        <Route path="/conseils" element={<AdvicePage />} />
        <Route path="/connexion" element={<LoginPage />} />
        <Route path="/inscription" element={<RegisterSelectionPage />} />
        <Route path="/inscription/etudiant" element={<StudentRegisterPage />} />
        <Route path="/inscription/entreprise" element={<EnterpriseRegisterPage />} />
        <Route path="/etudiant/dashboard" element={<StudentDashboardPage />} />
        <Route path="/etudiant/stages" element={<StudentOffersSearchPage offerType="stage" />} />
        <Route path="/etudiant/emplois" element={<StudentOffersSearchPage offerType="emploi" />} />
        <Route path="/etudiant/candidatures" element={<StudentApplicationsPage />} />
        <Route path="/etudiant/favoris" element={<StudentFavoritesPage />} />
        <Route path="/etudiant/profil" element={<StudentProfilePage />} />
        <Route path="/etudiant/parametres" element={<StudentSettingsPage />} />
        <Route path="/etudiant/messages" element={<StudentMessagesPage />} />
        <Route path="/entreprise/dashboard" element={<EnterpriseDashboardPage />} />
        <Route path="/entreprise/offres" element={<EnterpriseOffersPage />} />
        <Route path="/entreprise/offres/nouvelle" element={<EnterpriseCreateOfferPage />} />
        <Route path="/entreprise/candidats" element={<EnterpriseCandidatesPage />} />
        <Route path="/entreprise/messages" element={<EnterpriseMessagesPage />} />
        <Route path="/entreprise/profil" element={<EnterpriseDashboardProfilePage />} />
        <Route path="/entreprise/parametres" element={<EnterpriseSettingsPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/utilisateurs" element={<AdminUsersPage />} />
        <Route path="/admin/entreprises" element={<AdminEnterprisesPage />} />
        <Route path="/admin/offres" element={<AdminOffersPage />} />
        <Route path="/admin/candidatures" element={<AdminApplicationsPage />} />
        <Route path="/admin/moderation" element={<AdminModerationPage />} />
        <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
        <Route path="/admin/rapports" element={<AdminReportsPage />} />
        <Route path="/admin/parametres" element={<AdminSettingsPage />} />
        <Route path="/admin/logs" element={<AdminLogsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
