import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionAnimator from "../components/SectionAnimator";

import shapeYourFuture from "../assets/images/home/shapeYourFuture/shapeYourFuture.jpg";
import weWElcomeAll from "../assets/images/home/weWelcomeAll/weWelcomeAll.jpg";
import { ExternalLink, MegaphoneOff } from "lucide-react";
import adsVideo from "../assets/videos/pass_ads_video.mp4";
import BtnPriWhite from "../components/BtnPriWhite";
import CardSlider from "../components/CardSlider-choosePass";
import { foster } from "../data/home/foster";
import { advIdeas } from "../data/home/advanceIdeas";
import { cards } from "../data/home/choose";
import { home } from "../data/home/weCallPassHome";
import SectionEventLayout from "../components/SectionEventLayout";
import { Link, useNavigate } from "react-router-dom";
import usePostStore from "../store/usePostStore";
import EmptySection from "../components/EmptySection";
import RightAnimation from "../components/RightAnimation";
import PopUpAnimation from "../components/PopUpAnimation";

const Home = () => {
  const navigate = useNavigate();
  const news = usePostStore((state) => state.news);
  const events = usePostStore((state) => state.events);

  const playVideo = (e) => {
    e.target.muted = false;
    e.target.play();
  };

  const getGridCols = (itemCount) => {
    if (itemCount === 1) return "grid-cols-1";
    if (itemCount === 2) return "grid-cols-1 sm:grid-cols-2";
    if (itemCount === 3) return "grid-cols-1 sm:grid-cols-3 md:grid-cols-3";
    return "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4";
  };

  const gridColsClass = getGridCols(news.length);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Ref
  const newsContentRef = useRef(null);
  const choosePassianCardSliderRef = useRef(null);

  // useInView hook
  const isNewsContentInView = useInView(newsContentRef, {
    once: true,
    amount: 0,
  });
  const isChoosePassianCardSliderInView = useInView(
    choosePassianCardSliderRef,
    {
      once: true,
      amount: 0.6,
    }
  );

  // variant
  // for the LATEST NEWS section animation container
  const newsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  // latest news child pop up animation
  const newsItemPopVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 30,
        mass: 1,
      },
    },
  };

  // Choose Passian Education Section Card Animation
  const slideInFromLeftVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 30,
        mass: 2,
      },
    },
  };

  return (
    <main>
      {/* SECTION: Video and Buttons */}
      <section>
        <div className="w-full">
          <div className="w-full h-60 sm:h-auto bg-gradient-to-t from-[rgb(128,0,0)] to-white">
            <video
              src={adsVideo}
              className="block object-cover w-full h-full"
              muted
              autoPlay
              loop
              playsInline
              onClick={playVideo}
            />
          </div>

          <div className="bg-red-primary">
            <PopUpAnimation>
              <div className="flex flex-col items-center justify-center px-5 py-5 space-y-4 sm:flex-row sm:py-4 sm:space-y-0 sm:space-x-5">
                <BtnPriWhite text="ABOUT US" route={"about/who-we-are"} />
                <BtnPriWhite text="WORK WITH US " route={"careers"} />
              </div>
            </PopUpAnimation>
          </div>
        </div>
      </section>

      {/* --- LATEST NEWS SECTION --- */}

      <section className="bg-gray">
        <SectionAnimator>
          <div className="pt-10 pb-5 text-center md:pt-20">
            <h2 className="text-2xl font-bold tracking-wider md:text-4xl text-red-primary">
              LATEST NEWS
            </h2>
            <div className="w-20 mx-auto mt-2 border-b-2 md:w-32 border-red-950"></div>
          </div>

          <div className="container mx-auto">
            {news.length === 0 ? (
              <EmptySection icon={MegaphoneOff} type={"NEWS"} />
            ) : (
              <motion.div
                ref={newsContentRef}
                variants={newsContainerVariants}
                initial="hidden"
                animate={isNewsContentInView ? "visible" : "hidden"}
              >
                <motion.div
                  className={`grid gap-3 p-3 md:gap-6 ${gridColsClass}`}
                >
                  {news.slice(0, 4).map((item) => (
                    <motion.div
                      key={item.id}
                      variants={newsItemPopVariants} // Uses the *original* faster pop
                      className={`flex flex-col h-full rounded-lg shadow-lg ${
                        news.length === 1 ? "lg:px-72 lg:py-5" : ""
                      }`}
                    >
                      <div
                        className={`h-48 overflow-hidden sm:h-56 md:h-64 ${
                          news.length === 3 ||
                          news.length === 2 ||
                          news.length === 1
                            ? "lg:h-96 "
                            : ""
                        }`}
                      >
                        <img
                          className="object-cover w-full h-full transition-all duration-500 rounded-t-lg"
                          src={item.images.slice(0, 1)}
                          alt={item.title}
                        />
                      </div>

                      <Link to={`news-events#news-${item.id}`}>
                        <div className="flex items-center justify-center p-3 font-semibold rounded-b-lg bg-red-primary text-red-50">
                          <div className="flex items-start max-w-full gap-1 underline cursor-pointer decoration-red-300 hover:decoration-red-50">
                            <span className="text-sm line-clamp-3">
                              {item.description}
                            </span>
                            <ExternalLink className="flex-shrink-0 w-4 h-4 mt-1 hover" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
                <motion.div
                  variants={newsItemPopVariants} // Uses the *original* faster pop
                  className="flex items-center justify-center pt-5 pb-10"
                >
                  <button
                    onClick={() => navigate("news-events")}
                    className="cursor-pointer rounded-2xl text-sm md:text-base px-6 py-1 border-red text-red-primary font-bold hover:bg-[rgb(128,0,0)] hover:text-white transition-colors duration-500 "
                  >
                    SEE MORE NEWS
                  </button>
                </motion.div>
              </motion.div>
            )}
          </div>
        </SectionAnimator>
      </section>

      {/* --- CHOOSE PASSIAN EDUCATION SECTION --- */}
      <SectionAnimator>
        <section className="container pt-10 mx-auto space-y-2 md:pt-20">
          <div className="pb-1 text-center md:pb-2">
            <h2 className="p-1 text-2xl font-bold tracking-wider md:text-4xl text-red-primary">
              CHOOSE PASSIAN EDUCATION
            </h2>
            <div className="w-20 mx-auto mt-2 border-b-2 md:w-92 border-red-950"></div>
          </div>
          <div className="px-5 space-y-5 text-center text-red-950 lg:px-10">
            <p>
              As a leading educational institution in Western Pangasinan, PASS
              College is committed to providing high-quality and accessible
              education that empowers students to achieve their dreams.
              Recognized as the #1 producer of registered CPAs in the region,
              PASS College takes pride in shaping future professionals through
              innovative and industry-relevant programs. True to its motto,
              "PASS College, your PASSport to success," the institution believes
              that education is the key to unlocking endless opportunities.
              However, despite the strong desire for learning, many students
              face financial and logistical barriers to completing their
              studies. PASS College strives to bridge this gap by ensuring that
              every student, regardless of background, has the resources and
              support needed to excel.
            </p>
            <p>
              Founded with a mission to make higher education more accessible,
              PASS College has transformed the academic landscape by fostering
              excellence in various fields. Through its commitment to academic
              integrity, operational efficiency, and community support, the
              institution has helped countless students earn degrees and become
              globally competitive professionals. Its network of educational
              programs continues to expand, offering students a pathway to
              success in an ever-evolving world. By producing top-tier graduates
              and continuously enhancing its academic offerings, PASS College
              remains dedicated to its vision of shaping future leaders, proving
              that success is within reach for those who dare to pursue it.
            </p>
          </div>
          <div className="overflow-hidden">
            <motion.div
              ref={choosePassianCardSliderRef}
              variants={slideInFromLeftVariants}
              initial="hidden"
              animate={isChoosePassianCardSliderInView ? "visible" : "hidden"}
            >
              <CardSlider cards={cards} />
            </motion.div>
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

      {/* --- SHAPE YOUR FUTURE PROFESSION SECTION --- */}
      <SectionAnimator>
        <section className="pt-10 pb-5 2xl:container 2xl:mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr]">
            <div className="overflow-hidden w-full h-[300px] md:h-[400px] lg:h-auto ">
              <img
                className="object-cover w-full h-full"
                src={shapeYourFuture}
                alt="Descriptive text"
              />
            </div>
            <div className="bg-gray-secondary">
              <div className="w-1/2 h-2 bg-red-primary"></div>
              <div className="flex items-center justify-center w-full h-full p-10">
                <div className="space-y-5 font-bold text-red-50">
                  <h2 className="text-4xl">Shape Your Future Profession</h2>
                  <p className="text-sm sm:text-base hover:underline">
                    "JOIN US IN SHAPING THE FUTURE—WHERE GROUNDBREAKING IDEAS
                    BEGIN, PASSION MEETS PURPOSE, AND INNOVATION THRIVES AT PASS
                    COLLEGE."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionAnimator>

      {/* --- WE FOSTER INDEPENDENT THINKING SECTION --- */}
      <SectionAnimator>
        <section className="pb-10 mt-10 bg-gray md:mt-20">
          <div className="w-1/2 h-2 bg-red-primary md:w-1/3"></div>
          <div className="pt-10 pb-5 text-center">
            <h2 className="text-2xl font-bold tracking-wider md:text-3xl text-red-primary">
              WE FOSTER INDEPENDENT THINKING
            </h2>
            <div className="w-20 mx-auto mt-2 border-b-2 md:w-32 border-red-950"></div>
          </div>

          <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2 2xl:container 2xl:mx-auto lg:px-25">
            {foster.map((item) => (
              <motion.div
                key={item.id}
                variants={newsItemPopVariants}
                className="bg-white"
              >
                <div className="w-full lg:max-h-[400px] overflow-hidden">
                  <img
                    className="object-cover w-full h-full"
                    src={item.img}
                    alt=""
                  />
                </div>
                <div className="p-5 ">
                  <h2 className="text-lg text-red-primary ">{item.title}</h2>
                  <p className="text-red-950">{item.descripton}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </SectionAnimator>

      {/* --- WE ADVANCE IDEAS AND HUMANITY SECTION --- */}
      <SectionAnimator>
        <section className="">
          <div className="pt-10 pb-5 text-center">
            <h2 className="text-2xl font-bold tracking-wider md:text-3xl text-red-primary">
              WE ADVANCE IDEAS AND HUMANITY
            </h2>
            <div className="w-20 mx-auto mt-2 border-b-2 md:w-32 border-red-950"></div>
          </div>

          <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-3 2xl:container 2xl:mx-auto">
            {advIdeas.map((item) => (
              <motion.div
                key={item.id}
                variants={newsItemPopVariants}
                className="bg-gray"
              >
                <div>
                  <img className="w-full" src={item.img} alt="" />
                </div>
                <div className="p-5 ">
                  <h2 className="text-lg text-red-primary ">{item.title}</h2>
                  <p className="text-red-950">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </SectionAnimator>

      {/* --- WE WELCOME ALL SECTION --- */}
      <SectionAnimator>
        <section className="mt-10 bg-gray 2xl:container 2xl:mx-auto md:mt-20 md:ml-3 md:mr-3">
          <div className="relative">
            <div className="absolute top-0 left-0 w-1/2 h-2 bg-red-primary md:w-1/3"></div>

            <PopUpAnimation>
              <div className="flex flex-col md:grid md:grid-cols-2 md:items-center">
                <div className="order-1 w-full h-full md:order-2">
                  <img
                    src={weWElcomeAll}
                    alt="Students conversing"
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="order-2 p-5 md:order-1 lg:pl-16 md:p-7 lg:pt-0">
                  <h2 className="mb-2 text-3xl font-bold md:text-4xl text-red-primary md:mb-6 ">
                    We welcome all
                  </h2>
                  <p className="mb-4 text-red-950 md:mb-8">
                    Only when different values, experiences, and perspectives
                    are met with free and open discourse can education be truly
                    transformative. This is why we continue to work together as
                    an institution, and within our community, to promote a more
                    inclusive environment on our campus and beyond. Lorem ipsum,
                    dolor sit amet consectetur adipisicing elit. Impedit
                    eligendi minima nihil tempore qui a quas! Aliquid voluptatem
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

      {/* --- WE CALL PASS COLLEGE HOME SECTION --- */}
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
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni
                at maiores nesciunt temporibus officiis est distinctio quam sit
                saepe ea voluptate nemo, quos fugit ab, laborum illum totam.
                Inventore, molestias! Lorem ipsum, dolor sit amet consectetur
                adipisicing elit.
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
            <CardSlider cards={home} />
          </RightAnimation>
        </section>
      </SectionAnimator>

      {/* --- UPCOMING EVENTS SECTION --- */}
      <SectionAnimator>
        <SectionEventLayout data={events} label={"UPCOMMING EVENTS"} />
      </SectionAnimator>
    </main>
  );
};

export default Home;
