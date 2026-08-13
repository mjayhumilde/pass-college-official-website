import HeroBgSection from "../../../components/HeroBgSection";
import PopUpAnimation from "../../../components/PopUpAnimation";
import SectionAnimator from "../../../components/SectionAnimator";
import whoWeAreBackground from "../../../assets/images/about/whoWeAre/bg-whoWeAre.jpg";
import AboutIntroduction from "../components/AboutIntroduction";
import AboutStatementSection from "../components/AboutStatementSection";
import AlternatingFeatureRows from "../components/AlternatingFeatureRows";
import CircularFeatureSection from "../components/CircularFeatureSection";
import LegacyLearningSection from "../components/LegacyLearningSection";
import VisionMissionSection from "../components/VisionMissionSection";
import { sharedValues, whoWeAreHighlights } from "../data/whoWeAre";
import useScrollToTop from "../hooks/useScrollToTop";

export default function WhoWeArePage() {
  useScrollToTop();

  return (
    <>
      <HeroBgSection img={whoWeAreBackground} label="Who we are" />

      <AboutIntroduction title="ABOUT PASSIAN EDUCATION">
        <p>
          PASS College was established in 1997 as the Philippine Accountancy and
          Science School and was later renamed PASS College in 2001. As a private
          institution in Alaminos City, it stands apart from the state university
          system, focusing instead on delivering quality, affordable education to
          students in Western Pangasinan. With a commitment to continuous
          improvement, PASS College enhances its academic programs, strengthens
          operations, and nurtures a student-centered learning environment.
          Guided by its mission to empower youth from low-income families, the
          college remains dedicated to shaping capable, values-driven graduates
          who are ready to contribute meaningfully to their communities and
          beyond.
        </p>
      </AboutIntroduction>

      <VisionMissionSection />

      <SectionAnimator>
        <AboutStatementSection
          title="Driven to discover"
          description="For nearly a decade, PASS College has forged its own path in education. With a commitment to academic excellence and innovation, we have empowered students to excel in their fields. As the #1 producer of CPAs in Western Pangasinan, PASS College continues to shape future professionals, laying the foundation for breakthroughs in business, technology, and beyond."
        />
      </SectionAnimator>

      <AlternatingFeatureRows items={whoWeAreHighlights} />

      <CircularFeatureSection
        title="OUR CORE VALUES"
        description="PASSian Education aims to IGNITE the following traits and characteristics among its stakeholders."
        items={sharedValues}
      />

      <LegacyLearningSection />
    </>
  );
}
