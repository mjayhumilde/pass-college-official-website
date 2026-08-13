import OpacityAnimation from "../../../components/OpacityAnimation";
import PopUpAnimation from "../../../components/PopUpAnimation";
import SectionAnimator from "../../../components/SectionAnimator";
import { traditions } from "../data/historyTradition";
import AboutSectionHeading from "./AboutSectionHeading";

export default function TraditionsSection() {
  return (
    <SectionAnimator>
      <section>
        <AboutSectionHeading>PASS COLLEGE TRADITIONS</AboutSectionHeading>

        <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-3 2xl:container 2xl:mx-auto">
          {traditions.map((item) => (
            <article className="shadow-lg bg-gray" key={item.id}>
              <OpacityAnimation>
                <img className="w-full" src={item.image} alt={item.title} />
              </OpacityAnimation>
              <div className="p-5">
                <PopUpAnimation>
                  <h3 className="text-lg text-red-primary">{item.title}</h3>
                  <p className="text-red-950">{item.description}</p>
                </PopUpAnimation>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SectionAnimator>
  );
}
