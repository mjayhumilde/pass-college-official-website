import HeroBgSection from "../../../components/HeroBgSection";
import SectionAnimator from "../../../components/SectionAnimator";
import useAuthStore from "../../../store/useAuthStore";
import collegeProgramsBackground from "../../../assets/images/about/collegePrograms/alterSection/coverbanner.jpg";
import AboutStatementSection from "../components/AboutStatementSection";
import CollegeProgramsSection from "../components/CollegeProgramsSection";
import CourseRecommendationQuiz from "../components/CourseRecommendationQuiz";
import FacilitiesSection from "../components/FacilitiesSection";
import useScrollToTop from "../hooks/useScrollToTop";

export default function CollegeProgramsPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.userRole);
  useScrollToTop();

  return (
    <div className="relative">
      {(!isAuthenticated || userRole === "user") && (
        <div className="fixed z-60 right-2 top-15 sm:top-20 md:top-30 md:right-10">
          <CourseRecommendationQuiz />
        </div>
      )}

      <HeroBgSection
        img={collegeProgramsBackground}
        label="College programs"
      />

      <SectionAnimator>
        <AboutStatementSection
          title="Your Future Starts with the Right Choice"
          description="Discover the perfect program that aligns with your passion and career goals. At PASS College, we offer a diverse range of courses designed to equip you with the skills and knowledge for success. Start your journey today and turn your aspirations into reality!"
        />
      </SectionAnimator>

      <CollegeProgramsSection />
      <FacilitiesSection />
    </div>
  );
}
