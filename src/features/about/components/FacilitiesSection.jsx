import CardSlider from "../../../components/CardSlider-choosePass";
import LeftAnimation from "../../../components/LeftAnimation";
import SectionAnimator from "../../../components/SectionAnimator";
import { cards } from "../../../data/home/choose";
import AboutStatementSection from "./AboutStatementSection";

export default function FacilitiesSection() {
  return (
    <section>
      <SectionAnimator>
        <AboutStatementSection
          title="Facilities & Learning Environment"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus debitis ratione odio repellat sequi molestias quaerat amet blanditiis magni vero voluptates quo neque pro Lorem ipsum dolor sit amet consectetur adipisicing elit."
        />
      </SectionAnimator>

      <div className="mb-3 sm:mb-5">
        <LeftAnimation>
          <CardSlider cards={cards} />
        </LeftAnimation>
      </div>
    </section>
  );
}
