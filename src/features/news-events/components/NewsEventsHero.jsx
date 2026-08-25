import { HeroBgSection } from "../../../shared/components";

const NEWS_EVENTS_HERO_IMAGE =
  "https://img.freepik.com/premium-photo/global-technology-background_13339-284304.jpg?semt=ais_hybrid";

export default function NewsEventsHero() {
  return <HeroBgSection img={NEWS_EVENTS_HERO_IMAGE} label="News & Events" />;
}
