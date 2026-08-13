import PopUpAnimation from "../../../components/PopUpAnimation";
import { collegePrograms } from "../data/collegePrograms";
import AlternatingFeatureRows from "./AlternatingFeatureRows";

export default function CollegeProgramsSection() {
  return (
    <section className="2xl:container 2xl:mx-auto">
      <div className="pt-16 pb-5 text-center">
        <PopUpAnimation>
          <h2 className="text-2xl font-bold tracking-wider md:text-3xl text-red-primary">
            DISCOVER, LEARN, AND SUCCEED
          </h2>
        </PopUpAnimation>
        <div className="w-20 mx-auto mt-2 border-b-2 md:w-44 border-red-950" />
      </div>
      <AlternatingFeatureRows items={collegePrograms} />
    </section>
  );
}
