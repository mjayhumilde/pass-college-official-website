import whoWeAreBG from "../../assets/images/about/whoWeAre/bg-whoWeAre.jpg";
import alter1 from "../../assets/images/about/whoWeAre/alterSection/alter1.jpg";
import alter2 from "../../assets/images/about/whoWeAre/alterSection/alter2.jpg";
import alter3 from "../../assets/images/about/whoWeAre/alterSection/alter3.jpg";

import { ChevronRight } from "lucide-react";
import HeroBgSection from "../../components/HeroBgSection";
import SectionUnbalance from "../../components/SectionUnbalance";
import { innovationPastFuture } from "../../data/about/whoWeAre/innovationPastFutrure";
import { sharedValues } from "../../data/about/whoWeAre/sharedValues";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SectionAnimator from "../../components/SectionAnimator";
import OpacityAnimation from "../../components/OpacityAnimation";
import LeftAnimation from "../../components/LeftAnimation";
import RightAnimation from "../../components/RightAnimation";
import PopUpAnimation from "../../components/PopUpAnimation";

const WhoWeAre = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on mount
  }, []);

  return (
    <>
      <HeroBgSection img={whoWeAreBG} label={"Who we are"} />

      <SectionAnimator>
        <section className="container px-5 pt-6 mx-auto space-y-2 md:pt-14 md:px-28">
          <div className="pb-1 text-center md:pb-2">
            <h2 className="p-1 text-2xl font-bold tracking-wider md:text-4xl text-red-primary">
              ABOUT PASSIAN EDUCATION
            </h2>
            <div className="w-20 mx-auto mt-2 border-b-2 md:w-92 border-red-950"></div>
          </div>
          <div className="space-y-5 text-center sm:px-5 text-red-950 lg:px-10">
            <p>
              PASS College was established in 1997 as the Philippine Accountancy
              and Science School and was later renamed PASS College in 2001. As
              a private institution in Alaminos City, it stands apart from the
              state university system, focusing instead on delivering quality,
              affordable education to students in Western Pangasinan. With a
              commitment to continuous improvement, PASS College enhances its
              academic programs, strengthens operations, and nurtures a
              student-centered learning environment. Guided by its mission to
              empower youth from low-income families, the college remains
              dedicated to shaping capable, values-driven graduates who are
              ready to contribute meaningfully to their communities and beyond.
            </p>
          </div>
        </section>
      </SectionAnimator>

      <section className="my-6 bg-red-primary sm:my-14 xl:my-20">
        <PopUpAnimation>
          <div className="flex flex-col items-center justify-center px-5 space-y-3 text-center text-red-50 sm:p-10">
            <h2 className="pt-4 text-2xl font-bold">Vision Mission</h2>
            <p className="pb-2 text-sm sm:text-lg">
              PASS College envisions itself as a leading Higher Educational
              Institution committed to building a holistic and transformative
              community through learning dedicated towards academic excellence,
              bridging leadership and values formation that will produce
              globally competitive professionals in today’s diverse environment.
            </p>
          </div>
        </PopUpAnimation>
      </section>

      <SectionAnimator>
        <SectionUnbalance
          label={"Driven to discover"}
          description={
            "For nearly a decade, PASS College has forged its own path in education. With a commitment to academic excellence and innovation, we have empowered students to excel in their fields. As the #1 producer of CPAs in Western Pangasinan, PASS College continues to shape future professionals, laying the foundation for breakthroughs in business, technology, and beyond."
          }
        />
      </SectionAnimator>

      <section className="2xl:container 2xl:mx-auto">
        <section className="lg:grid lg:grid-cols-2">
          <OpacityAnimation>
            <div
              className=" h-[400px] lg:h-[500px] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${alter1})`,
              }}
            ></div>
          </OpacityAnimation>
          <div
            className="relative lg:h-[500px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://t3.ftcdn.net/jpg/02/26/57/24/360_F_226572424_X5ldGN8o6JqfNXMboqND2dXHSAV7eVX2.jpg')`,
            }}
          >
            <div className="top-0 bottom-0 left-0 right-0 flex items-center justify-center h-full p-5 text-red-50 bg-gray-secondary-opacity sm:p-10 sm:px-16 sm:py-6 lg:p-10">
              <LeftAnimation>
                <div className="container mx-auto space-y-4 lg:space-y-7">
                  <h2 className="text-3xl font-bold">
                    We shape and define students
                  </h2>
                  <p className="w-5/6 sm:w-4/6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Accusamus debitis ratione odio repellat sequi molestias
                    quaerat amet blanditiis magni vero voluptates quo neque pro
                  </p>
                </div>
              </LeftAnimation>
            </div>
          </div>
        </section>

        <section className="flex flex-col-reverse lg:grid lg:grid-cols-2">
          <div className="relative lg:h-[500px] bg-cover bg-center bg-no-repeat">
            <div className="top-0 bottom-0 left-0 right-0 flex items-center justify-center h-full p-5 text-red-50 bg-red-primary sm:p-10 sm:px-16 sm:py-6 lg:p-20">
              <RightAnimation>
                <div className="container h-auto mx-auto space-y-4 lg:space-y-7">
                  <h2 className="text-3xl font-bold">
                    We believe freedom of expression is fundamental
                  </h2>
                  <p className="w-5/6 sm:w-4/6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Accusamus debitis ratione odio repellat sequ
                  </p>
                </div>
              </RightAnimation>
            </div>
          </div>
          <OpacityAnimation>
            <div
              className=" h-[400px] lg:h-[500px] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${alter2})`,
              }}
            ></div>
          </OpacityAnimation>
        </section>

        <section className="lg:grid lg:grid-cols-2">
          <OpacityAnimation>
            <div
              className=" h-[400px] lg:h-[500px] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${alter3})`,
              }}
            ></div>
          </OpacityAnimation>
          <div
            className="relative lg:h-[500px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://t3.ftcdn.net/jpg/02/26/57/24/360_F_226572424_X5ldGN8o6JqfNXMboqND2dXHSAV7eVX2.jpg`,
            }}
          >
            <div className="top-0 bottom-0 left-0 right-0 flex items-center justify-center h-full p-5 text-red-50 bg-gray-secondary-opacity sm:p-10 sm:px-16 sm:py-6 lg:p-10">
              <LeftAnimation>
                <div className="container mx-auto space-y-4 lg:space-y-7">
                  <h2 className="text-3xl font-bold">
                    We tackle the communities most pressing issues
                  </h2>
                  <p className="w-5/6 sm:w-4/6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Accusamus debitis ratione odio repellat sequi molestias
                    quaerat amet blanditiis magni vero voluptates quo neque pro
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Placeat architecto reprehend
                  </p>
                </div>
              </LeftAnimation>
            </div>
          </div>
        </section>
      </section>

      <section>
        <div className="py-12 bg-gray p-3 sm:p-7 ">
          <SectionAnimator>
            <div className="bg-gray-light ">
              <div className="container mx-auto">
                <div className="pt-10 pb-5 text-center">
                  <h2 className="text-3xl font-bold tracking-wider text-red-primary">
                    OUR CORE VALUES
                  </h2>
                  <div className="w-24 mx-auto mt-2 border-b-2 border-red-950"></div>
                </div>
                <div className="p-5 pt-0 font-bold text-center text-red-primary">
                  <p>
                    PASSian Education aims to IGNITE the following traits and
                    characteristics among its stakeholders: - lagay mo to sa
                    baba ah ng values ah
                  </p>
                </div>

                <div className="flex flex-wrap items-start justify-center py-4 lg:gap-20 xl:gap-40">
                  {sharedValues.map((value) => (
                    <div
                      key={value.id}
                      className="flex  flex-col items-center text-center h-full w-[300px] sm:w-[250px]"
                    >
                      <PopUpAnimation>
                        <div className="flex justify-center items-center  h-[300px] w-[300px] sm:h-[200px] sm:w-[200px] md:h-[230px] md:w-[230px] lg:h-[300px] lg:w-[300px] xl:h-[350px] xl:w-[350px] overflow-hidden rounded-full">
                          <img
                            className="object-cover w-full h-full"
                            src={value.img}
                            alt=""
                          />
                        </div>

                        <div className="flex flex-col items-center justify-start flex-grow p-5">
                          <div className="h-16 w-[1px] bg-red-primary"></div>
                          <div className="text-2xl font-bold underline text-red-primary">
                            {value.title}
                          </div>
                          <div className="mt-4 text-red-950">
                            {value.description}
                          </div>
                        </div>
                      </PopUpAnimation>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionAnimator>
        </div>
      </section>

      <SectionAnimator>
        <section className="pb-10 ">
          <div className="pt-10 pb-5 text-center">
            <h2 className="text-2xl font-bold tracking-wider md:text-3xl text-red-primary">
              LEGACY AND LEARNING AT PASS COLLEGE
            </h2>
            <div className="w-20 mx-auto mt-2 border-b-2 md:w-32 border-red-950"></div>
          </div>

          <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2 2xl:container 2xl:mx-auto lg:px-25">
            {innovationPastFuture.map((item) => (
              <div className="bg-gray" key={item.id}>
                <OpacityAnimation>
                  <div className="w-full lg:max-h-[400px] overflow-hidden">
                    <img
                      className="object-cover w-full h-full"
                      src={item.img}
                      alt=""
                    />
                  </div>
                  <div className="p-5 pt-2 space-y-2">
                    <PopUpAnimation>
                      <h2 className="text-lg text-red-primary ">
                        {item.title}
                      </h2>
                      <p className="text-red-950">{item.descripton}</p>
                    </PopUpAnimation>

                    <RightAnimation>
                      <button
                        onClick={() =>
                          item.title.toLowerCase() ===
                          "the history of our school"
                            ? navigate("/about/history-tradition")
                            : navigate("/about/college-programs")
                        }
                        className="flex py-1 text-sm font-bold transition-all duration-500 cursor-pointer md:text-base text-red-primary hover:underline"
                      >
                        LEARN MORE
                        <ChevronRight />
                      </button>
                    </RightAnimation>
                  </div>
                </OpacityAnimation>
              </div>
            ))}
          </div>
        </section>
      </SectionAnimator>
    </>
  );
};

export default WhoWeAre;
