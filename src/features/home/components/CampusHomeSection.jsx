import { useNavigate } from "react-router-dom";
import CardSlider from "../../../components/CardSlider-choosePass";
import RightAnimation from "../../../components/RightAnimation";
import SectionAnimator from "../../../components/SectionAnimator";
import { campusLifeCards } from "../data/campusLife";

export default function CampusHomeSection() {
  const navigate = useNavigate();

  return (
    <SectionAnimator>
      <section className="mt-10 2xl:container 2xl:mx-auto md:mt-15">
        <div className="lg:px-40 p-5 sm:grid sm:grid-cols-[1fr_1.5fr] md:gap-6">
          <div className="sm:text-center">
            <h2 className="mb-5 text-3xl font-bold md:text-4xl text-red-primary">
              We call Pass College home
            </h2>
          </div>
          <div className="space-y-2 sm:space-y-4">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni at
              maiores nesciunt temporibus officiis est distinctio quam sit saepe
              ea voluptate nemo, quos fugit ab, laborum illum totam. Inventore,
              molestias! Lorem ipsum, dolor sit amet consectetur adipisicing
              elit.
            </p>

            <button
              onClick={() => navigate("/about/history-tradition")}
              className="py-1 text-sm font-bold underline transition-all duration-500 cursor-pointer md:text-base text-red-primary"
            >
              LEARN MORE
            </button>
          </div>
        </div>

        <RightAnimation>
          <CardSlider cards={campusLifeCards} />
        </RightAnimation>
      </section>
    </SectionAnimator>
  );
}
