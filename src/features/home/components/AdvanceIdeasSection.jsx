import { motion as Motion } from "framer-motion";
import SectionAnimator from "../../../components/SectionAnimator";
import { advanceIdeas } from "../data/advanceIdeas";
import { newsItemPopVariants } from "../constants/animations";

export default function AdvanceIdeasSection() {
  return (
    <SectionAnimator>
      <section>
        <div className="pt-10 pb-5 text-center">
          <h2 className="text-2xl font-bold tracking-wider md:text-3xl text-red-primary">
            WE ADVANCE IDEAS AND HUMANITY
          </h2>
          <div className="w-20 mx-auto mt-2 border-b-2 md:w-32 border-red-950" />
        </div>

        <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-3 2xl:container 2xl:mx-auto">
          {advanceIdeas.map((item) => (
            <Motion.div
              key={item.id}
              variants={newsItemPopVariants}
              className="bg-gray"
            >
              <img className="w-full" src={item.image} alt={item.title} />
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
