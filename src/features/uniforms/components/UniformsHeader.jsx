import HeroBgSection from "../../../components/HeroBgSection";

const UNIFORMS_HERO_IMAGE =
  "https://media.istockphoto.com/id/911026578/photo/walking-to-class.jpg?s=612x612&w=0&k=20&c=0zYehlzABctgFBr_QFjkqqfNcU4Gmf-lj92bXrhQ2IY=";

export default function UniformsHeader() {
  return (
    <>
      <HeroBgSection img={UNIFORMS_HERO_IMAGE} label="Uniforms" />

      <div className="p-5 mt-7 text-center bg-red-primary md:mt-14">
        <h2 className="text-xl font-bold tracking-wider text-red-50 sm:text-2xl md:text-3xl">
          UNIFORM RELEASE UPDATES &amp; PICKUP SCHEDULES
        </h2>
      </div>
    </>
  );
}
