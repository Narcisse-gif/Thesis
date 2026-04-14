import StudentDashboardLayout from '../components/StudentDashboardLayout';
import OfferDetailContent from '../components/OfferDetailContent';

export default function StudentOfferDetailPage() {
  return (
    <StudentDashboardLayout>
      <div className="w-full max-w-6xl mx-auto">
        <OfferDetailContent
          applyPathBase="/etudiant/postuler"
          showBackToList
          stageListPath="/etudiant/stages"
          jobListPath="/etudiant/emplois"
          enterpriseProfileBasePath="/etudiant/entreprises"
        />
      </div>
    </StudentDashboardLayout>
  );
}
