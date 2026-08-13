import AdvanceIdeasSection from "../components/AdvanceIdeasSection";
import CampusHomeSection from "../components/CampusHomeSection";
import ChoosePassianEducationSection from "../components/ChoosePassianEducationSection";
import FutureProfessionSection from "../components/FutureProfessionSection";
import HomeHeroSection from "../components/HomeHeroSection";
import IndependentThinkingSection from "../components/IndependentThinkingSection";
import LatestNewsSection from "../components/LatestNewsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import UpcomingEventsSection from "../components/UpcomingEventsSection";
import WelcomeSection from "../components/WelcomeSection";
import useHomePage from "../hooks/useHomePage";

export default function HomePage() {
  const { events, news } = useHomePage();

  return (
    <main>
      <HomeHeroSection />
      <LatestNewsSection news={news} />
      <ChoosePassianEducationSection />
      <FutureProfessionSection />
      <IndependentThinkingSection />
      <AdvanceIdeasSection />
      <WelcomeSection />
      <CampusHomeSection />
      <UpcomingEventsSection events={events} />
      <TestimonialsSection />
    </main>
  );
}
