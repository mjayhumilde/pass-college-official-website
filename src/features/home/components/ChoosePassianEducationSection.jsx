import { useRef } from "react";
import { motion as Motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CardSlider from "../../../components/CardSlider-choosePass";
import SectionAnimator from "../../../components/SectionAnimator";
import { cards } from "../../../data/home/choose";
import { slideInFromLeftVariants } from "../constants/animations";

export default function ChoosePassianEducationSection() {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const isSliderInView = useInView(sliderRef, { once: true, amount: 0.6 });

  return (
    <SectionAnimator>
      <section className="container pt-10 mx-auto space-y-2 md:pt-20">
        <div className="pb-1 text-center md:pb-2">
          <h2 className="p-1 text-2xl font-bold tracking-wider md:text-4xl text-red-primary">
            CHOOSE PASSIAN EDUCATION
          </h2>
          <div className="w-20 mx-auto mt-2 border-b-2 md:w-92 border-red-950" />
        </div>

        <div className="px-5 space-y-5 text-center text-red-950 lg:px-10">
          <p>
            As a leading educational institution in Western Pangasinan, PASS
            College is committed to providing high-quality and accessible
            education that empowers students to achieve their dreams. Recognized
            as the #1 producer of registered CPAs in the region, PASS College
            takes pride in shaping future professionals through innovative and
            industry-relevant programs. True to its motto, "PASS College, your
            PASSport to success," the institution believes that education is the
            key to unlocking endless opportunities. However, despite the strong
            desire for learning, many students face financial and logistical
            barriers to completing their studies. PASS College strives to bridge
            this gap by ensuring that every student, regardless of background,
            has the resources and support needed to excel.
          </p>
          <p>
            Founded with a mission to make higher education more accessible,
            PASS College has transformed the academic landscape by fostering
            excellence in various fields. Through its commitment to academic
            integrity, operational efficiency, and community support, the
            institution has helped countless students earn degrees and become
            globally competitive professionals. Its network of educational
            programs continues to expand, offering students a pathway to success
            in an ever-evolving world. By producing top-tier graduates and
            continuously enhancing its academic offerings, PASS College remains
            dedicated to its vision of shaping future leaders, proving that
            success is within reach for those who dare to pursue it.
          </p>
        </div>

        <div className="overflow-hidden">
          <Motion.div
            ref={sliderRef}
            variants={slideInFromLeftVariants}
            initial="hidden"
            animate={isSliderInView ? "visible" : "hidden"}
          >
            <CardSlider cards={cards} />
          </Motion.div>
        </div>

        <div className="flex items-center justify-center pt-5 pb-10">
          <button
            onClick={() => navigate("about/who-we-are")}
            className="rounded-2xl cursor-pointer text-sm md:text-base px-6 py-1 border-red text-red-primary font-bold hover:bg-[rgb(128,0,0)] hover:text-white transition-colors duration-500"
          >
            MORE ABOUT PASSIAN
          </button>
        </div>
      </section>
    </SectionAnimator>
  );
}
