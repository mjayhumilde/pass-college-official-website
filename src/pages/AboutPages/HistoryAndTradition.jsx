import historyBG from "../../assets/images/about/historyTradition/bg-history.jpg";
import alter2 from "../../assets/images/about/historyTradition/alterSection/alter2.jpg";
import alter1 from "../../assets/images/about/historyTradition/alterSection/alter1.jpg";

import HeroBgSection from "../../components/HeroBgSection";
import SectionUnbalance from "../../components/SectionUnbalance";
import GalleryLayout from "../../components/GalleryLayout";

import { meanings } from "../../data/about/historyTradition/deeperMeaning";
import { tradition } from "../../data/about/historyTradition/tradition";
import { useEffect } from "react";
import SectionAnimator from "../../components/SectionAnimator";
import PopUpAnimation from "../../components/PopUpAnimation";
import RightAnimation from "../../components/RightAnimation";
import OpacityAnimation from "../../components/OpacityAnimation";
import LeftAnimation from "../../components/LeftAnimation";

const HistoryAndTradition = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on mount
  }, []);
  return (
    <>
      <HeroBgSection img={historyBG} label={"History and Traditions"} />

      <SectionAnimator>
        <section className="container pt-6 md:pt-14 mx-auto space-y-2 px-5 md:px-28 mb-28">
          <div className="text-center  pb-1 md:pb-2">
            <h2 className="text-2xl md:text-4xl font-bold tracking-wider text-red-primary p-1">
              HISTORY OF PASS COLLEGE
            </h2>
            <div className="w-20 md:w-92 border-b-2 border-red-950 mx-auto mt-2"></div>
          </div>
          <div className="text-center space-y-5 px-0 text-red-950 lg:px-10">
            <p>
              It has been an undying dream of Mrs. Adelina M. Morante to
              establish an educational institution that will produce top-caliber
              graduates who will not only be successful in their fields of
              endeavor but will also be God-loving and law-abiding citizens.
              This dream of an academic institution came into reality in 1997
              when PASS College was inaugurated. Initially, it was known as the
              Philippine Accountancy and Science School (PASS). Then in 2001,
              the name was changed to PASS College. PASS College started with
              four ladderized programs namely: Bachelor of Science in
              Accountancy, Bachelor of Science in Computer Science, Bachelor of
              Science in Commerce, and Bachelor of Science in Secretarial
              Administration. Then additional programs were offered such as
              Bachelor of Elementary Education, Two-Years and One-Year Tourism
              Hotel and Restaurant Management, Two-Years Computer Secretarial
              and Six-Month Caregiving Course. Over the years, more courses
              and/or programs have been offered such as Bachelor of Science in
              Business Administration, Bachelor of Science in Criminology,
              Bachelor of Science in Hospitality Management, and Bachelor of
              Science in Tourism Management to answer the needs of the people of
              Western Pangasinan and the nearby Zambales towns, and anyone who
              seeks quality learning under competent and dedicated instructors
              and with the best facilities which are regularly updated to
              enhance learning and improves student learning competence. In
              2007, PASS College responded to Executive Order 358 of President
              Gloria Macapagal-Arroyo, inaugurating the Ladderized Education
              System in the college. The quest for academic excellence continues
              and will always be the burning propel of PASS College to achieve
              its mission to provide the youth with a quality well-rounded
              education.
            </p>
          </div>
        </section>
      </SectionAnimator>

      <PopUpAnimation>
        <SectionUnbalance
          label={"A tradition of breaking with tradition"}
          description={
            "Since 2016, PASS College has blended academic excellence with innovation, redefining education for the modern world. As the #1 producer of CPAs in Western Pangasinan, we honor tradition while pushing boundaries to shape future leaders."
          }
        />
      </PopUpAnimation>

      <section className="2xl:container 2xl:mx-auto">
        <section className="flex flex-col-reverse lg:grid lg:grid-cols-2">
          <div
            className="relative lg:h-[500px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://t3.ftcdn.net/jpg/02/26/57/24/360_F_226572424_X5ldGN8o6JqfNXMboqND2dXHSAV7eVX2.jpg')`,
            }}
          >
            <div className="flex  justify-center items-center text-red-50 bg-gray-secondary-opacity h-full sm:p-10 sm:px-16 sm:py-6 p-5 lg:p-20  top-0 bottom-0 left-0 right-0">
              <RightAnimation>
                <div className="h-auto container mx-auto space-y-4 lg:space-y-7">
                  <h2 className="text-3xl font-bold">Unbound by convention</h2>
                  <p className="w-5/6 sm:w-4/6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quibusdam ex suscipit debitis vel architecto error mollitia
                    dolore quis facilis earum? Officia voluptas ducimus quo
                    pariatur, magnam cumque ullam atque labore?Lorem ipsum dolor
                  </p>
                </div>
              </RightAnimation>
            </div>
          </div>
          <OpacityAnimation>
            <div
              className=" h-[400px] lg:h-[500px] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${alter1})`,
              }}
            ></div>
          </OpacityAnimation>
        </section>

        <section className="lg:grid lg:grid-cols-2">
          <OpacityAnimation>
            <div
              className=" h-[400px] lg:h-[500px] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${alter2})`,
              }}
            ></div>
          </OpacityAnimation>
          <div
            className="relative lg:h-[500px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://t3.ftcdn.net/jpg/02/26/57/24/360_F_226572424_X5ldGN8o6JqfNXMboqND2dXHSAV7eVX2.jpg')`,
            }}
          >
            <div className="flex  justify-center items-center text-red-50 bg-red-primary-opacity h-full sm:p-10 sm:px-16 sm:py-6 p-5 lg:p-10  top-0 bottom-0 left-0 right-0">
              <LeftAnimation>
                <div className="container mx-auto space-y-4 lg:space-y-7">
                  <h2 className="text-3xl font-bold">
                    Distinctive Core curriculum
                  </h2>
                  <p className="w-5/6 sm:w-4/6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Accusamus debitis ratione odio repellat sequi molestias
                    quaerat amet blanditiis magni vero voluptates quo neque pro
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aspernatur voluptatibus officia repellendus consequuntur
                    odit ipsam ad sint, ullam, eveniet amet impedit
                  </p>
                </div>
              </LeftAnimation>
            </div>
          </div>
        </section>
      </section>

      <SectionAnimator>
        <section className="w-full bg-gray pt-12 px-4">
          <div className="container mx-auto flex flex-col items-center relative">
            {/* Opening quote mark positioned absolutely */}
            <div className="text-9xl text-red-primary font-serif">&#8220;</div>

            {/* Main content container */}
            <div className="text-center px-4">
              {/* Quote text */}
              <PopUpAnimation>
                <blockquote className="text-2xl md:text-3xl italic text-red-primary font-serif mb-4">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Aspernatur, error illum, enim maxime veritatis quae qui
                  deserunt quisquam unde reiciendis deleniti ipsa exercitationem
                  non dolore rem veniam ipsam quis labore. Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Sapiente natus placeat,
                  dolorum cum eius neque aperiam, eveniet dignissimos tempora
                  perferendis p.
                </blockquote>
              </PopUpAnimation>

              {/* Attribution */}
              <LeftAnimation>
                <cite className="text-red-primary inline-block not-italic ">
                  —President Mjay Humilde
                </cite>
              </LeftAnimation>
            </div>

            {/* Closing quote mark positioned with proper spacing */}
            <div className="text-9xl text-red-primary font-serif mt-10">
              &#8221;
            </div>
          </div>
        </section>
      </SectionAnimator>

      <section>
        <GalleryLayout />
      </section>

      <section>
        <div className="bg-gray p-7 py-12 ">
          <SectionAnimator>
            <div className="container mx-auto">
              <div className="text-center pt-10 pb-5">
                <h2 className="text-3xl font-bold tracking-wider text-red-primary">
                  DEEPER MEANINGS
                </h2>
                <div className="w-24 border-b-2 border-red-950 mx-auto mt-2"></div>
              </div>

              <div className="flex flex-wrap justify-center items-start lg:gap-20 xl:gap-40 py-4">
                {meanings.map((value) => (
                  <div
                    key={value.id}
                    className="flex  flex-col items-center text-center h-full w-[300px] sm:w-[250px]"
                  >
                    <PopUpAnimation>
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
                        <div className="text-red-950 mt-4">{value.caption}</div>
                      </div>
                    </PopUpAnimation>
                  </div>
                ))}
              </div>
            </div>
          </SectionAnimator>
        </div>
      </section>

      <SectionAnimator>
        <section>
          <div className="text-center pt-10 pb-5">
            <h2 className="text-2xl md:text-3xl font-bold tracking-wider text-red-primary">
              PASS COLLEGE TRADITIONS
            </h2>
            <div className="w-20 md:w-32 border-b-2 border-red-950 mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 2xl:container 2xl:mx-auto p-4">
            {tradition.map((item) => (
              <div className="bg-gray shadow-lg" key={item.id}>
                <div>
                  <OpacityAnimation>
                    <img className="w-full" src={item.img} alt="" />
                  </OpacityAnimation>
                </div>
                <div className="p-5">
                  <PopUpAnimation>
                    <h2 className="text-lg text-red-primary ">{item.title}</h2>
                    <p className="text-red-950">{item.description}</p>
                  </PopUpAnimation>
                </div>
              </div>
            ))}
          </div>
        </section>
      </SectionAnimator>
    </>
  );
};

export default HistoryAndTradition;
