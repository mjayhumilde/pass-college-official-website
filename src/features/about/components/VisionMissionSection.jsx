import PopUpAnimation from "../../../components/PopUpAnimation";

export default function VisionMissionSection() {
  return (
    <section className="my-6 bg-red-primary sm:my-14 xl:my-20">
      <PopUpAnimation>
        <div className="flex flex-col items-center justify-center px-5 space-y-3 text-center text-red-50 sm:p-10">
          <h2 className="pt-4 text-2xl font-bold">Vision Mission</h2>
          <p className="pb-2 text-sm sm:text-lg">
            PASS College envisions itself as a leading Higher Educational
            Institution committed to building a holistic and transformative
            community through learning dedicated towards academic excellence,
            bridging leadership and values formation that will produce globally
            competitive professionals in today's diverse environment.
          </p>
        </div>
      </PopUpAnimation>
    </section>
  );
}
