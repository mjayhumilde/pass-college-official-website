import bgCollegeProgram from "../../assets/images/about/collegePrograms/alterSection/coverbanner.jpg";
import alter1 from "../../assets/images/about/collegePrograms/alterSection/course1.jpg";
import alter2 from "../../assets/images/about/collegePrograms/alterSection/course2.jpg";
import alter3 from "../../assets/images/about/collegePrograms/alterSection/course3.jpg";
import alter4 from "../../assets/images/about/collegePrograms/alterSection/course4.jpg";
import alter5 from "../../assets/images/about/collegePrograms/alterSection/course5.jpg";
import alter6 from "../../assets/images/about/collegePrograms/alterSection/course6.jpg";

import HeroBgSection from "../../components/HeroBgSection";
import SectionUnbalance from "../../components/SectionUnbalance";
import CardSlider from "../../components/CardSlider-choosePass";
import { cards } from "../../data/home/choose";
import CourseRecommendationQuiz from "../../components/ourseRecommendationQuiz";

import useAuthStore from "../../store/useAuthStore";
import { useEffect } from "react";

const CollegePrograms = () => {
  // img adrs  https://scontent.fcrk1-5.fna.fbcdn.net/v/t39.30808-6/484880416_1210267821105051_5144354052467757109_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=5j_klYeW5cYQ7kNvgEnhVd1&_nc_oc=AdkoPZnxj9XuHvmIhr0fXdCtW4b7Lr1MA0bjvqPt6_V_v39N8R68kSo3AUbZU-H8C8U&_nc_zt=23&_nc_ht=scontent.fcrk1-5.fna&_nc_gid=GlSRuY223SOsqWSVovofsg&oh=00_AYEgS2xiOv59NaAD7xt7nRQcT0fYtRmvYQAgiSASWm4G_A&oe=67E28E91
  // img adrs  https://scontent.fcrk1-4.fna.fbcdn.net/v/t39.30808-6/482024040_9387195411368079_5705791128557706900_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Fs0cxjUOfwMQ7kNvgEg6ocz&_nc_oc=Adnr-wJYMsgEHYfwab397uNintxEu7Fbb19gqMuuF9LfUy0CvgGngq-E4wVF3nW1oHw&_nc_zt=23&_nc_ht=scontent.fcrk1-4.fna&_nc_gid=q6ZN3Qyr7NBIfxux54xlHQ&oh=00_AYFhXFBjxhALhTPSv3bRasMoAzO32nGc5ykkkXiLuURdjA&oe=67E2A9FA

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.userRole);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on mount
  }, []);

  return (
    <div className="relative">
      {(!isAuthenticated || userRole === "user") && (
        <div className="fixed z-60 right-2 top-15 sm:top-20 md:top-30 md:right-10">
          <CourseRecommendationQuiz />
        </div>
      )}
      <HeroBgSection img={bgCollegeProgram} label={"College programs"} />

      <SectionUnbalance
        label={"Your Future Starts with the Right Choice"}
        description={
          "Discover the perfect program that aligns with your passion and career goals. At PASS College, we offer a diverse range of courses designed to equip you with the skills and knowledge for success. Start your journey today and turn your aspirations into reality!"
        }
      />

      <section className="2xl:container 2xl:mx-auto">
        <div className="pt-16 pb-5 text-center">
          <h2 className="text-2xl font-bold tracking-wider md:text-3xl text-red-primary">
            DISCOVER, LEARN, AND SUCCEED
          </h2>
          <div className="w-20 mx-auto mt-2 border-b-2 md:w-44 border-red-950"></div>
        </div>

        <section className="flex flex-col-reverse lg:grid lg:grid-cols-2">
          <div className="relative lg:h-[500px] bg-cover  bg-no-repeat">
            <div className="top-0 bottom-0 left-0 right-0 flex items-center justify-center h-full p-5 text-red-50 bg-red-primary sm:p-10 sm:px-16 sm:py-6 lg:p-20">
              <div className="container h-auto mx-auto space-y-4 lg:space-y-7">
                <h2 className="text-3xl font-bold">
                  {" "}
                  Bachelor of Science in Accountancy
                </h2>
                <p className="w-5/6 sm:w-4/6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusamus debitis ratione odio repellat sequ
                </p>
              </div>
            </div>
          </div>
          <div
            className=" h-[400px] lg:h-[500px] bg-cover  bg-no-repeat"
            style={{
              backgroundImage: `url(${alter1})`,
            }}
          ></div>
        </section>

        <section className="lg:grid lg:grid-cols-2">
          <div
            className=" h-[400px] lg:h-[500px] bg-cover  bg-no-repeat"
            style={{
              backgroundImage: `url(${alter2})`,
            }}
          ></div>
          <div
            className="relative lg:h-[500px] bg-cover  bg-no-repeat"
            style={{
              backgroundImage: `url('https://t3.ftcdn.net/jpg/02/26/57/24/360_F_226572424_X5ldGN8o6JqfNXMboqND2dXHSAV7eVX2.jpg')`,
            }}
          >
            <div className="top-0 bottom-0 left-0 right-0 flex items-center justify-center h-full p-5 text-red-50 bg-gray-secondary-opacity sm:p-10 sm:px-16 sm:py-6 lg:p-10">
              <div className="container mx-auto space-y-4 lg:space-y-7">
                <h2 className="text-3xl font-bold">
                  Bachelor of Science in Business Administration
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
          <div className="relative lg:h-[500px] bg-cover  bg-no-repeat">
            <div className="top-0 bottom-0 left-0 right-0 flex items-center justify-center h-full p-5 text-red-50 bg-red-primary sm:p-10 sm:px-16 sm:py-6 lg:p-20">
              <div className="container h-auto mx-auto space-y-4 lg:space-y-7">
                <h2 className="text-3xl font-bold">
                  {" "}
                  Bachelor of Science in Computer Science
                </h2>
                <p className="w-5/6 sm:w-4/6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusamus debitis ratione odio repellat sequ
                </p>
              </div>
            </div>
          </div>
          <div
            className=" h-[400px] lg:h-[500px] bg-cover  bg-no-repeat"
            style={{
              backgroundImage: `url(${alter3})`,
            }}
          ></div>
        </section>

        <section className="lg:grid lg:grid-cols-2">
          <div
            className=" h-[400px] lg:h-[500px] bg-cover  bg-no-repeat"
            style={{
              backgroundImage: `url(${alter4})`,
            }}
          ></div>
          <div
            className="relative lg:h-[500px] bg-cover  bg-no-repeat"
            style={{
              backgroundImage: `url('https://t3.ftcdn.net/jpg/02/26/57/24/360_F_226572424_X5ldGN8o6JqfNXMboqND2dXHSAV7eVX2.jpg`,
            }}
          >
            <div className="top-0 bottom-0 left-0 right-0 flex items-center justify-center h-full p-5 text-red-50 bg-gray-secondary-opacity sm:p-10 sm:px-16 sm:py-6 lg:p-10">
              <div className="container mx-auto space-y-4 lg:space-y-7">
                <h2 className="text-3xl font-bold">
                  {" "}
                  Bachelor of Science in Criminology
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

        <section className="flex flex-col-reverse lg:grid lg:grid-cols-2">
          <div className="relative lg:h-[500px] bg-cover  bg-no-repeat">
            <div className="top-0 bottom-0 left-0 right-0 flex items-center justify-center h-full p-5 text-red-50 bg-red-primary sm:p-10 sm:px-16 sm:py-6 lg:p-20">
              <div className="container h-auto mx-auto space-y-4 lg:space-y-7">
                <h2 className="text-3xl font-bold">
                  {" "}
                  Bachelor of Science in Elementary Education
                </h2>
                <p className="w-5/6 sm:w-4/6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusamus debitis ratione odio repellat sequ
                </p>
              </div>
            </div>
          </div>
          <div
            className=" h-[400px] lg:h-[500px] bg-cover  bg-no-repeat"
            style={{
              backgroundImage: `url(${alter5})`,
            }}
          ></div>
        </section>

        <section className="lg:grid lg:grid-cols-2">
          <div
            className=" h-[400px] lg:h-[500px] bg-cover  bg-no-repeat"
            style={{
              backgroundImage: `url(${alter6})`,
            }}
          ></div>
          <div
            className="relative lg:h-[500px] bg-cover  bg-no-repeat"
            style={{
              backgroundImage: `url('https://t3.ftcdn.net/jpg/02/26/57/24/360_F_226572424_X5ldGN8o6JqfNXMboqND2dXHSAV7eVX2.jpg')`,
            }}
          >
            <div className="top-0 bottom-0 left-0 right-0 flex items-center justify-center h-full p-5 text-red-50 bg-gray-secondary-opacity sm:p-10 sm:px-16 sm:py-6 lg:p-10">
              <div className="container mx-auto space-y-4 lg:space-y-7">
                <h2 className="text-3xl font-bold">
                  {" "}
                  Bachelor of Science in Tourism Management
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
      </section>

      <section>
        <SectionUnbalance
          label={"Facilities & Learning Environment"}
          description={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus debitis ratione odio repellat sequi molestias quaerat amet blanditiis magni vero voluptates quo neque proLorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus debitis ratione odio repellat sequi molestias quaerat amet blanditiis magni vero voluptates quo neque pro"
          }
        />

        <div className="mb-3 sm:mb-5">
          <CardSlider cards={cards} />
        </div>
      </section>
    </div>
  );
};

export default CollegePrograms;
