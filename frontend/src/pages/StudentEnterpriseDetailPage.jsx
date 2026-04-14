import StudentDashboardLayout from '../components/StudentDashboardLayout';
import EnterpriseDetailContent from '../components/EnterpriseDetailContent';

export default function StudentEnterpriseDetailPage() {
  return (
    <StudentDashboardLayout>
      <div className="w-full px-4 sm:px-6">
        <EnterpriseDetailContent
          stageOfferPathBase="/etudiant/stages"
          jobOfferPathBase="/etudiant/emplois"
        />
      </div>
    </StudentDashboardLayout>
  );
}
