import SectionAnimator from "../../../components/SectionAnimator";
import SectionEventLayout from "../../../components/SectionEventLayout";

export default function UpcomingEventsSection({ events }) {
  return (
    <SectionAnimator>
      <SectionEventLayout data={events} label="UPCOMING EVENTS" />
    </SectionAnimator>
  );
}
