import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OpacityAnimation from "../../../components/OpacityAnimation";
import PopUpAnimation from "../../../components/PopUpAnimation";
import RightAnimation from "../../../components/RightAnimation";
import SectionAnimator from "../../../components/SectionAnimator";
import { legacyLearningItems } from "../data/whoWeAre";
import AboutSectionHeading from "./AboutSectionHeading";

export default function LegacyLearningSection() {
  const navigate = useNavigate();

  return (
    <SectionAnimator>
      <section className="pb-10">
        <AboutSectionHeading>
          LEGACY AND LEARNING AT PASS COLLEGE
        </AboutSectionHeading>

        <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2 2xl:container 2xl:mx-auto lg:px-25">
          {legacyLearningItems.map((item) => (
            <article className="bg-gray" key={item.id}>
              <OpacityAnimation>
                <div className="w-full lg:max-h-[400px] overflow-hidden">
                  <img
                    className="object-cover w-full h-full"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
                <div className="p-5 pt-2 space-y-2">
                  <PopUpAnimation>
                    <h3 className="text-lg text-red-primary">{item.title}</h3>
                    <p className="text-red-950">{item.description}</p>
                  </PopUpAnimation>

                  <RightAnimation>
                    <button
                      onClick={() => navigate(item.route)}
                      className="flex py-1 text-sm font-bold transition-all duration-500 cursor-pointer md:text-base text-red-primary hover:underline"
                    >
                      LEARN MORE
                      <ChevronRight />
                    </button>
                  </RightAnimation>
                </div>
              </OpacityAnimation>
            </article>
          ))}
        </div>
      </section>
    </SectionAnimator>
  );
}
