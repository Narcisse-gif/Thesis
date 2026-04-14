import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
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
import StudentOfferDetailPage from './pages/StudentOfferDetailPage';
import StudentApplicationFormPage from './pages/StudentApplicationFormPage';
import StudentEnterpriseDetailPage from './pages/StudentEnterpriseDetailPage';
import EnterpriseDashboardPage from './pages/EnterpriseDashboardPage';
import EnterpriseOffersPage from './pages/EnterpriseOffersPage';
import EnterpriseCandidatesPage from './pages/EnterpriseCandidatesPage';
import EnterpriseCreateOfferPage from './pages/EnterpriseCreateOfferPage';
import EnterpriseOfferDetailPage from './pages/EnterpriseOfferDetailPage';
import EnterpriseMessagesPage from './pages/EnterpriseMessagesPage';
import EnterpriseSettingsPage from './pages/EnterpriseSettingsPage';
import EnterpriseDashboardProfilePage from './pages/EnterpriseDashboardProfilePage';
import EnterpriseStudentProfilePage from './pages/EnterpriseStudentProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminEnterprisesPage from './pages/AdminEnterprisesPage';
import AdminOffersPage from './pages/AdminOffersPage';
import AdminOfferDetailPage from './pages/AdminOfferDetailPage';
import AdminApplicationsPage from './pages/AdminApplicationsPage';
import AdminModerationPage from './pages/AdminModerationPage';
import AdminNotificationsPage from './pages/AdminNotificationsPage';
import AdminReportsPage from './pages/AdminReportsPage';
import AdminSettingsPage from './pages/AdminSettingsPage';
import AdminLogsPage from './pages/AdminLogsPage';
import AdminUserProfilePage from './pages/AdminUserProfilePage';
import AdminEnterpriseProfilePage from './pages/AdminEnterpriseProfilePage';
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
        <Route
          path="/postuler/:id"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <ApplicationFormPage />
            </ProtectedRoute>
          }
        />
        <Route path="/entreprises" element={<EnterprisesPage />} />
        <Route path="/entreprises/:id" element={<EnterpriseDetailPage />} />
        <Route path="/conseils" element={<AdvicePage />} />
        <Route path="/connexion" element={<LoginPage />} />
        <Route path="/inscription" element={<RegisterSelectionPage />} />
        <Route path="/inscription/etudiant" element={<StudentRegisterPage />} />
        <Route path="/inscription/entreprise" element={<EnterpriseRegisterPage />} />
        <Route
          path="/etudiant/dashboard"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/etudiant/stages"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentOffersSearchPage offerType="stage" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/etudiant/stages/:id"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentOfferDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/etudiant/emplois"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentOffersSearchPage offerType="emploi" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/etudiant/emplois/:id"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentOfferDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/etudiant/postuler/:id"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentApplicationFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/etudiant/entreprises/:id"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentEnterpriseDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/etudiant/candidatures"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentApplicationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/etudiant/favoris"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentFavoritesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/etudiant/profil"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/etudiant/parametres"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentSettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/etudiant/messages"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentMessagesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/entreprise/dashboard"
          element={
            <ProtectedRoute allowedRoles={['ENTERPRISE']}>
              <EnterpriseDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/entreprise/offres"
          element={
            <ProtectedRoute allowedRoles={['ENTERPRISE']}>
              <EnterpriseOffersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/entreprise/offres/nouvelle"
          element={
            <ProtectedRoute allowedRoles={['ENTERPRISE']}>
              <EnterpriseCreateOfferPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/entreprise/offres/:id"
          element={
            <ProtectedRoute allowedRoles={['ENTERPRISE']}>
              <EnterpriseOfferDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/entreprise/candidats"
          element={
            <ProtectedRoute allowedRoles={['ENTERPRISE']}>
              <EnterpriseCandidatesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/entreprise/candidats/:id"
          element={
            <ProtectedRoute allowedRoles={['ENTERPRISE']}>
              <EnterpriseStudentProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/entreprise/messages"
          element={
            <ProtectedRoute allowedRoles={['ENTERPRISE']}>
              <EnterpriseMessagesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/entreprise/profil"
          element={
            <ProtectedRoute allowedRoles={['ENTERPRISE']}>
              <EnterpriseDashboardProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/entreprise/parametres"
          element={
            <ProtectedRoute allowedRoles={['ENTERPRISE']}>
              <EnterpriseSettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/utilisateurs"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminUsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/utilisateurs/:id"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminUserProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/entreprises"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminEnterprisesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/entreprises/:id"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminEnterpriseProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/offres"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminOffersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/offres/:id"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminOfferDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/candidatures"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminApplicationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/moderation"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminModerationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminNotificationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rapports"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/parametres"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminSettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/logs"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminLogsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
