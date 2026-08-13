import { useNavigate } from "react-router-dom";
import PopUpAnimation from "../../../components/PopUpAnimation";
import SectionAnimator from "../../../components/SectionAnimator";
import welcomeImage from "../../../assets/images/home/weWelcomeAll/weWelcomeAll.jpg";

export default function WelcomeSection() {
  const navigate = useNavigate();

  return (
    <SectionAnimator>
      <section className="mt-10 bg-gray 2xl:container 2xl:mx-auto md:mt-20 md:ml-3 md:mr-3">
        <div className="relative">
          <div className="absolute top-0 left-0 w-1/2 h-2 bg-red-primary md:w-1/3" />

          <PopUpAnimation>
            <div className="flex flex-col md:grid md:grid-cols-2 md:items-center">
              <div className="order-1 w-full h-full md:order-2">
                <img
                  src={welcomeImage}
                  alt="Students conversing"
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="order-2 p-5 md:order-1 lg:pl-16 md:p-7 lg:pt-0">
                <h2 className="mb-2 text-3xl font-bold md:text-4xl text-red-primary md:mb-6">
                  We welcome all
                </h2>
                <p className="mb-4 text-red-950 md:mb-8">
                  Only when different values, experiences, and perspectives are
                  met with free and open discourse can education be truly
                  transformative. This is why we continue to work together as an
                  institution, and within our community, to promote a more
                  inclusive environment on our campus and beyond. Lorem ipsum,
                  dolor sit amet consectetur adipisicing elit. Impedit eligendi
                  minima nihil tempore qui a quas! Aliquid voluptatem
                  exercitationem inventore amet vel quis error quas nostrum
                  provident, maxime sint debitis.
                </p>
                <button
                  onClick={() => navigate("/about/who-we-are")}
                  className="py-1 text-sm font-bold transition-all duration-500 cursor-pointer md:text-base text-red-primary hover:underline"
                >
                  LEARN MORE
                </button>
              </div>
            </div>
          </PopUpAnimation>
        </div>
      </section>
    </SectionAnimator>
  );
}
