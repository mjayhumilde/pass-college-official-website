import CareerManagementActions from "../components/CareerManagementActions";
import CareersFeed from "../components/CareersFeed";
import CareersHeader from "../components/CareersHeader";
import useCareersPage from "../hooks/useCareersPage";

export default function CareersPage() {
  const { careers, canManageCareers } = useCareersPage();

  return (
    <>
      <CareersHeader />
      <CareerManagementActions canManageCareers={canManageCareers} />
      <CareersFeed careers={careers} />
    </>
  );
}
