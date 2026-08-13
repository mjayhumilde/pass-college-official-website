import HeroBgSection from "../../../components/HeroBgSection";

const CAREERS_HERO_IMAGE =
  "https://t4.ftcdn.net/jpg/09/02/53/81/360_F_902538150_JCEcejSQkRHHR7d5jE1nbmfhXHdcd9E3.jpg";

export default function CareersHeader() {
  return (
    <>
      <HeroBgSection img={CAREERS_HERO_IMAGE} label="Careers" />

      <div className="p-5 mt-7 text-center bg-red-primary md:mt-14">
        <h2 className="text-xl font-bold tracking-wider text-red-50 sm:text-2xl md:text-3xl">
          CAREER OPPORTUNITIES
        </h2>
      </div>
    </>
  );
}
