import HeroBgSection from "../components/HeroBgSection";
import PostLayout from "../components/PostLayout";
import { announcement } from "../data/announcement/announcePost";

const Uniform = () => {
  return (
    <main>
      <HeroBgSection
        img={
          "https://media.istockphoto.com/id/911026578/photo/walking-to-class.jpg?s=612x612&w=0&k=20&c=0zYehlzABctgFBr_QFjkqqfNcU4Gmf-lj92bXrhQ2IY="
        }
        label={"Uniforms"}
      />

      <div className="text-center mt-7 md:mt-14 p-5 bg-red-primary">
        <h2 className="text-2xl md:text-3xl font-bold tracking-wider text-red-50">
          UNIFORM RELEASE UPDATES & PICKUP SCHEDULES
        </h2>
        {/* <div className="w-55 border-b-2  border-[rgb(255,207,80)] mx-auto mt-2"></div> */}
      </div>
      <PostLayout data={announcement} label={"UNIFORMS"} />
    </main>
  );
};

export default Uniform;
