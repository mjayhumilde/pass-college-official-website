import { SectionAnimator } from "../../../shared/components/motion";
import { SectionEventLayout } from "../../news-events";

export default function UpcomingEventsSection({ events }) {
  return (
    <SectionAnimator>
      <SectionEventLayout data={events} label="UPCOMING EVENTS" />
    </SectionAnimator>
  );
}
