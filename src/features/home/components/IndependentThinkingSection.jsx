import { motion as Motion } from "framer-motion";
import SectionAnimator from "../../../components/SectionAnimator";
import { foster } from "../data/foster";
import { newsItemPopVariants } from "../constants/animations";

export default function IndependentThinkingSection() {
  return (
    <SectionAnimator>
      <section className="pb-10 mt-10 bg-gray md:mt-20">
        <div className="w-1/2 h-2 bg-red-primary md:w-1/3" />
        <div className="pt-10 pb-5 text-center">
          <h2 className="text-2xl font-bold tracking-wider md:text-3xl text-red-primary">
            WE FOSTER INDEPENDENT THINKING
          </h2>
          <div className="w-20 mx-auto mt-2 border-b-2 md:w-32 border-red-950" />
        </div>

        <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2 2xl:container 2xl:mx-auto lg:px-25">
          {foster.map((item) => (
            <Motion.div
              key={item.id}
              variants={newsItemPopVariants}
              className="bg-white"
            >
              <div className="w-full lg:max-h-[400px] overflow-hidden">
                <img
                  className="object-cover w-full h-full"
                  src={item.image}
                  alt={item.title}
                />
              </div>
              <div className="p-5">
                <h2 className="text-lg text-red-primary">{item.title}</h2>
                <p className="text-red-950">{item.description}</p>
              </div>
            </Motion.div>
          ))}
        </div>
      </section>
    </SectionAnimator>
  );
}
