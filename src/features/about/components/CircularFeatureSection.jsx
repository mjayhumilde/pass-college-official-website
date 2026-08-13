import PopUpAnimation from "../../../components/PopUpAnimation";
import SectionAnimator from "../../../components/SectionAnimator";
import AboutSectionHeading from "./AboutSectionHeading";

export default function CircularFeatureSection({
  description,
  items,
  title,
  className = "",
}) {
  return (
    <section className={`px-3 py-12 bg-gray sm:px-7 ${className}`}>
      <SectionAnimator>
        <div className="container mx-auto">
          <AboutSectionHeading
            className="text-3xl"
            underlineClassName="w-24"
          >
            {title}
          </AboutSectionHeading>

          {description && (
            <p className="p-5 pt-0 font-bold text-center text-red-primary">
              {description}
            </p>
          )}

          <div className="flex flex-wrap items-start justify-center py-4 lg:gap-20 xl:gap-40">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center h-full w-[300px] sm:w-[250px]"
              >
                <PopUpAnimation>
                  <div className="flex justify-center items-center h-[300px] w-[300px] sm:h-[200px] sm:w-[200px] md:h-[230px] md:w-[230px] lg:h-[300px] lg:w-[300px] xl:h-[350px] xl:w-[350px] overflow-hidden rounded-full">
                    <img
                      className="object-cover w-full h-full"
                      src={item.image}
                      alt={item.title}
                    />
                  </div>

                  <div className="flex flex-col items-center justify-start flex-grow p-5">
                    <div className="h-16 w-px bg-red-primary" />
                    <h3 className="text-2xl font-bold underline text-red-primary">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-red-950">{item.description}</p>
                  </div>
                </PopUpAnimation>
              </div>
            ))}
          </div>
        </div>
      </SectionAnimator>
    </section>
  );
}
