import HeroBgSection from "../components/HeroBgSection";
import PostLayout from "../components/PostLayout";
import SectionEventLayout from "../components/SectionEventLayout";
import { announcement } from "../data/announcement/announcePost";
import { upCommingEvents } from "../data/home/upcommingEvent";

const Events = () => {
  return (
    <main>
      <HeroBgSection
        img={
          "https://img.freepik.com/premium-photo/global-technology-background_13339-284304.jpg?semt=ais_hybrid"
        }
        label={"News & Events"}
      />

      {/* <div className="text-center mt-14 p-10 pb-5 bg-red-primary">
        <h2 className="text-2xl md:text-4xl font-bold tracking-wider text-red-50">
          EVENTS
        </h2>
        <div className="w-25 border-b-2 border-[rgb(255,207,80)] mx-auto mt-2"></div>
      </div> */}
      <SectionEventLayout data={upCommingEvents} label={"EVENTS"} />

      <div className="text-center mt-14 px-2 pb-0">
        <h2 className="text-3xl md:text-5xl font-bold tracking-wider text-red-primary">
          NEWS
        </h2>
        <div className="w-25 border-b-2 border-red-950 mx-auto mt-2"></div>
      </div>
      <div className="text-center mt-2 p-5 pb-5 bg-red-primary">
        <h2 className="text-xl md:text-2xl font-bold tracking-wider text-red-50">
          LATEST HAPPENINGS & UPDATES
        </h2>
      </div>

      <PostLayout data={announcement} label={"BREAKING NEWS"} />
    </main>
  );
};

export default Events;
