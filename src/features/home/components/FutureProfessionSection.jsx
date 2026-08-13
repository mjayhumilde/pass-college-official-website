import SectionAnimator from "../../../components/SectionAnimator";
import shapeYourFuture from "../../../assets/images/home/shapeYourFuture/shapeYourFuture.jpg";

export default function FutureProfessionSection() {
  return (
    <SectionAnimator>
      <section className="pt-10 pb-5 2xl:container 2xl:mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr]">
          <div className="overflow-hidden w-full h-[300px] md:h-[400px] lg:h-auto">
            <img
              className="object-cover w-full h-full"
              src={shapeYourFuture}
              alt="PASS College students shaping their future"
            />
          </div>
          <div className="bg-gray-secondary">
            <div className="w-1/2 h-2 bg-red-primary" />
            <div className="flex items-center justify-center w-full h-full p-10">
              <div className="space-y-5 font-bold text-red-50">
                <h2 className="text-4xl">Shape Your Future Profession</h2>
                <p className="text-sm sm:text-base hover:underline">
                  "JOIN US IN SHAPING THE FUTURE - WHERE GROUNDBREAKING IDEAS
                  BEGIN, PASSION MEETS PURPOSE, AND INNOVATION THRIVES AT PASS
                  COLLEGE."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionAnimator>
  );
}
