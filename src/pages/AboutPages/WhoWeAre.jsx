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

const WhoWeAre = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on mount
  }, []);

  return (
    <>
      <HeroBgSection img={whoWeAreBG} label={"Who we are"} />

      <section className="container pt-6 md:pt-14 mx-auto space-y-2 px-5 md:px-28">
        <div className="text-center  pb-1 md:pb-2">
          <h2 className="text-2xl md:text-4xl font-bold tracking-wider text-red-primary p-1">
            ABOUT PASSIAN EDUCATION
          </h2>
          <div className="w-20 md:w-92 border-b-2 border-red-950 mx-auto mt-2"></div>
        </div>
        <div className="text-center space-y-5 sm:px-5 text-red-950 lg:px-10">
          <p>
            PASS College was established in 1997 as the Philippine Accountancy
            and Science School and was later renamed PASS College in 2001. As a
            private institution in Alaminos City, it stands apart from the state
            university system, focusing instead on delivering quality,
            affordable education to students in Western Pangasinan. With a
            commitment to continuous improvement, PASS College enhances its
            academic programs, strengthens operations, and nurtures a
            student-centered learning environment. Guided by its mission to
            empower youth from low-income families, the college remains
            dedicated to shaping capable, values-driven graduates who are ready
            to contribute meaningfully to their communities and beyond.
          </p>
        </div>
      </section>

      <section className="bg-red-primary my-6 sm:my-14 xl:my-20">
        <div className="text-red-50  flex flex-col justify-center text-center items-center px-5 sm:p-10 space-y-3">
          <h2 className="text-2xl font-bold pt-4">Vission Mission</h2>
          <p className="text-sm sm:text-lg pb-2">
            It has been an undying dream of Mrs. Adelina M. Morante to establish
            an educational institution that will produce top-caliber graduates
            who will not only be successful in their fields of endeavor but will
            also be God-loving and law-abiding citizens. This dream of an
            academic institution came into reality in 1997 when PASS College was
            inaugurated. Initially, it was known as the Philippine Accountancy
            and Science School (PASS). Then in 2001, the name was changed to
            PASS College. PASS College started with four ladderized programs
            namely: Bachelor of Science in Accountancy, Bachelor of Science in
            Computer Science, Bachelor of Science in Commerce, and Bachelor of
            Science in Secretarial Administration. Then additional programs were
            offered such as Bachelor of Elementary Education, Two-Years and
            One-Year Tourism Hotel and Restaurant Management, Two-Years Computer
            Secretarial and Six-Month Caregiving Course. Over the years, more
            courses and/or programs have been offered such as Bachelor of
            Science in Business Administration, Bachelor of Science in
            Criminology, Bachelor of Science in Hospitality Management, and
            Bachelor of Science in Tourism Management to answer the needs of the
            people of Western Pangasinan and the nearby Zambales towns, and
            anyone who seeks quality learning under competent and dedicated
            instructors and with the best facilities which are regularly updated
            to enhance learning and improves student learning competence. In
            2007, PASS College responded to Executive Order 358 of President
            Gloria Macapagal-Arroyo, inaugurating the Ladderized Education
            System in the college. The quest for academic excellence continues
            and will always be the burning propel of PASS College to achieve its
            mission to provide the youth with a quality well-rounded education.
          </p>
        </div>
      </section>

      <SectionUnbalance
        label={"Driven to discover"}
        description={
          "For nearly a decade, PASS College has forged its own path in education. With a commitment to academic excellence and innovation, we have empowered students to excel in their fields. As the #1 producer of CPAs in Western Pangasinan, PASS College continues to shape future professionals, laying the foundation for breakthroughs in business, technology, and beyond."
        }
      />
      <section className="2xl:container 2xl:mx-auto">
        <section className="lg:grid lg:grid-cols-2">
          <div
            className=" h-[400px] lg:h-[500px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${alter1})`,
            }}
          ></div>
          <div
            className="relative lg:h-[500px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://t3.ftcdn.net/jpg/02/26/57/24/360_F_226572424_X5ldGN8o6JqfNXMboqND2dXHSAV7eVX2.jpg')`,
            }}
          >
            <div className="flex  justify-center items-center text-red-50 bg-gray-secondary-opacity h-full sm:p-10 sm:px-16 sm:py-6 p-5 lg:p-10  top-0 bottom-0 left-0 right-0">
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
            </div>
          </div>
        </section>

        <section className="flex flex-col-reverse lg:grid lg:grid-cols-2">
          <div className="relative lg:h-[500px] bg-cover bg-center bg-no-repeat">
            <div className="flex  justify-center items-center text-red-50 bg-red-primary h-full sm:p-10 sm:px-16 sm:py-6 p-5 lg:p-20  top-0 bottom-0 left-0 right-0">
              <div className="h-auto container mx-auto space-y-4 lg:space-y-7">
                <h2 className="text-3xl font-bold">
                  We believe freedom of expression is fundamental
                </h2>
                <p className="w-5/6 sm:w-4/6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusamus debitis ratione odio repellat sequ
                </p>
              </div>
            </div>
          </div>
          <div
            className=" h-[400px] lg:h-[500px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${alter2})`,
            }}
          ></div>
        </section>

        <section className="lg:grid lg:grid-cols-2">
          <div
            className=" h-[400px] lg:h-[500px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${alter3})`,
            }}
          ></div>
          <div
            className="relative lg:h-[500px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://t3.ftcdn.net/jpg/02/26/57/24/360_F_226572424_X5ldGN8o6JqfNXMboqND2dXHSAV7eVX2.jpg`,
            }}
          >
            <div className="flex  justify-center items-center text-red-50 bg-gray-secondary-opacity h-full sm:p-10 sm:px-16 sm:py-6 p-5 lg:p-10  top-0 bottom-0 left-0 right-0">
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
            </div>
          </div>
        </section>
      </section>

      <section>
        <div className="bg-gray p-7 py-12 ">
          <div className="bg-gray-light ">
            <div className="container mx-auto">
              <div className="text-center pt-10 pb-5">
                <h2 className="text-3xl font-bold tracking-wider text-red-primary">
                  OUR CORE VALUES
                </h2>
                <div className="w-24 border-b-2 border-red-950 mx-auto mt-2"></div>
              </div>

              <div className="flex flex-wrap justify-center items-start lg:gap-20 xl:gap-40 py-4">
                {sharedValues.map((value) => (
                  <div
                    key={value.id}
                    className="flex  flex-col items-center text-center h-full w-[300px] sm:w-[250px]"
                  >
                    <div className="flex justify-center items-center  h-[300px] w-[300px] sm:h-[200px] sm:w-[200px] md:h-[230px] md:w-[230px] lg:h-[300px] lg:w-[300px] xl:h-[350px] xl:w-[350px] overflow-hidden rounded-full">
                      <img
                        className="h-full w-full object-cover"
                        src={value.img}
                        alt=""
                      />
                    </div>

                    <div className="flex flex-col flex-grow justify-start items-center p-5">
                      <div className="h-16 w-[1px] bg-red-primary"></div>
                      <div className="font-bold text-red-primary text-2xl underline">
                        {value.title}
                      </div>
                      <div className="text-red-950 mt-4">
                        {value.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10 ">
        <div className="text-center pt-10 pb-5">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wider text-red-primary">
            LEGACY AND LEARNING AT PASS COLLEGE
          </h2>
          <div className="w-20 md:w-32 border-b-2 border-red-950 mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 2xl:container 2xl:mx-auto p-4  lg:px-25">
          {innovationPastFuture.map((item) => (
            <div className="bg-gray" key={item.id}>
              <div className="w-full lg:max-h-[400px] overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={item.img}
                  alt=""
                />
              </div>
              <div className="p-5 pt-2 space-y-2">
                <h2 className="text-lg text-red-primary ">{item.title}</h2>
                <p className="text-red-950">{item.descripton}</p>

                <button
                  onClick={() =>
                    item.title.toLowerCase() === "the history of our school"
                      ? navigate("/about/history-tradition")
                      : navigate("/about/college-programs")
                  }
                  className="flex cursor-pointer text-sm md:text-base py-1 text-red-primary font-bold hover:underline transition-all duration-500"
                >
                  LEARN MORE
                  <ChevronRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default WhoWeAre;
