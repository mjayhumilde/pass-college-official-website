import shapeYourFuture from "../assets/images/home/shapeYourFuture/shapeYourFuture.jpg";
import weWElcomeAll from "../assets/images/home/weWelcomeAll/weWelcomeAll.jpg";
import { ExternalLink } from "lucide-react";
import adsVideo from "../assets/videos/pass_ads_video.mp4";
import BtnPriWhite from "../components/BtnPriWhite";
import CardSlider from "../components/CardSlider-choosePass";
import { foster } from "../data/home/foster";
import { advIdeas } from "../data/home/advanceIdeas";
import { cards } from "../data/home/choose";
import { home } from "../data/home/weCallPassHome";
import SectionEventLayout from "../components/SectionEventLayout";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import usePostStore from "../store/usePostStore";

const Home = () => {
  const news = usePostStore((state) => state.news);
  const events = usePostStore((state) => state.events);

  const playVideo = (e) => {
    e.target.muted = false;
    e.target.play();
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on mount
  }, []);

  return (
    <main>
      <section>
        <div className="w-full">
          {/* Video container */}
          <div className="w-full  h-96 sm:h-auto  bg-gradient-to-t from-[rgb(128,0,0)] to-white">
            <video
              src={adsVideo}
              className="w-full h-full block object-cover"
              muted
              autoPlay
              loop
              playsInline
              onClick={playVideo}
            />
          </div>

          {/* Your other content would go here */}
          <div className="bg-red-primary flex flex-col sm:flex-row justify-center items-center py-5 sm:py-4 px-5 space-y-4 sm:space-y-0 sm:space-x-5">
            <BtnPriWhite text="ABOUT US" />
            <BtnPriWhite text="WORK WITH US" />
            <BtnPriWhite text="CONTACT US" />
          </div>
        </div>
      </section>

      <section className="bg-gray">
        <div className="text-center pt-10 md:pt-20 pb-5">
          <h2 className="text-2xl md:text-4xl font-bold tracking-wider text-red-primary">
            LATEST NEWS
          </h2>
          <div className="w-20 md:w-32 border-b-2 border-red-950 mx-auto mt-2"></div>
        </div>

        <div className="container mx-auto">
          {news.length === 0 ? (
            // No News" message
            <div className="flex justify-center items-center h-[50vh] text-xl font-semibold">
              No news at the moment...🤧
            </div>
          ) : (
            <div>
              <div className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {news.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex flex-col h-full shadow-lg">
                    <div className="h-48 sm:h-56 md:h-64 overflow-hidden">
                      <img
                        className="w-full h-full object-cover transition-all duration-500"
                        src={item.images.slice(0, 1)}
                        alt={item.title}
                      />
                    </div>

                    <Link to={`news-events#news-${item.id}`}>
                      <div className="bg-red-primary text-red-50 font-semibold p-3 flex justify-center items-center">
                        <div className="underline decoration-red-300 hover:decoration-red-50 cursor-pointer flex items-start gap-1 max-w-full">
                          <span className="line-clamp-3 text-sm">
                            {item.description}
                          </span>
                          <ExternalLink className="w-4 h-4 flex-shrink-0 mt-1 hover" />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="flex justify-center items-center pt-5 pb-10">
                <button className="cursor-pointer text-sm md:text-base px-6 py-1 border-red text-red-primary font-bold hover:bg-[rgb(128,0,0)] hover:text-white transition-colors duration-500">
                  SEE MORE NEWS
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="container pt-10 md:pt-20 mx-auto space-y-2">
        <div className="text-center  pb-1 md:pb-2">
          <h2 className="text-2xl md:text-4xl font-bold tracking-wider text-red-primary p-1">
            CHOOSE PASSIAN EDUCATION
          </h2>
          <div className="w-20 md:w-92 border-b-2 border-red-950 mx-auto mt-2"></div>
        </div>
        <div className="text-center space-y-5 px-5 text-red-950 lg:px-10">
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
        <CardSlider cards={cards} />
        <div className="flex justify-center items-center pt-5 pb-10">
          <button className="cursor-pointer text-sm md:text-base px-6 py-1 border-red text-red-primary font-bold hover:bg-[rgb(128,0,0)] hover:text-white transition-colors duration-500">
            MORE ABOUT PASSIAN
          </button>
        </div>
      </section>

      <section className="2xl:container 2xl:mx-auto pt-10 pb-5">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr]">
          <div className="overflow-hidden w-full h-[300px] md:h-[400px] lg:h-auto ">
            <img
              className="w-full h-full object-cover"
              src={shapeYourFuture}
              alt="Descriptive text"
            />
          </div>
          <div className="bg-gray-secondary">
            <div className="w-1/2 h-2 bg-red-primary"></div>
            <div className="w-full h-full flex justify-center items-center p-10">
              <div className="font-bold space-y-5 text-red-50">
                <h2 className="text-4xl">Shape Your Future Profession</h2>
                <p className="text-sm sm:text-base hover:underline cursor-pointer">
                  "JOIN US IN SHAPING THE FUTURE—WHERE GROUNDBREAKING IDEAS
                  BEGIN, PASSION MEETS PURPOSE, AND INNOVATION THRIVES AT PASS
                  COLLEGE."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10 bg-gray mt-10 md:mt-20">
        <div className="bg-red-primary h-2 w-1/2 md:w-1/3"></div>
        <div className="text-center pt-10 pb-5">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wider text-red-primary">
            WE FOSTER INDEPENDENT THINKING
          </h2>
          <div className="w-20 md:w-32 border-b-2 border-red-950 mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 2xl:container 2xl:mx-auto p-4  lg:px-25">
          {foster.map((item) => (
            <div className="bg-white shadow-lg " key={item.id}>
              <div className="w-full lg:max-h-[400px] overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={item.img}
                  alt=""
                />
              </div>
              <div className="p-5 ">
                <h2 className="text-lg text-red-primary ">{item.title}</h2>
                <p className="text-red-950">{item.descripton}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* <section className="pb-10 bg-gray mt-10 md:mt-20">
        <div className="bg-red-primary h-2 w-1/2 md:w-1/3"></div>
        <div className="text-center pt-10 pb-5">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wider text-red-primary">
            PRACTICE
          </h2>
          <div className="w-20 md:w-32 border-b-2 border-red-950 mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 2xl:container 2xl:mx-auto p-4  lg:px-25">
          {foster.map((item) => (
            <div key={item.id}>
              <CardExample
                title={item.title}
                img={item.img}
                description={item.descripton}
              />
            </div>
          ))}
        </div>
      </section> */}

      <section className="">
        <div className="text-center pt-10 pb-5">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wider text-red-primary">
            WE ADVANCE IDEAS AND HUMANITY
          </h2>
          <div className="w-20 md:w-32 border-b-2 border-red-950 mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 2xl:container 2xl:mx-auto p-4">
          {advIdeas.map((item) => (
            <div className="bg-gray shadow-lg" key={item.id}>
              <div>
                <img className="w-full" src={item.img} alt="" />
              </div>
              <div className="p-5  ">
                <h2 className="text-lg text-red-primary ">{item.title}</h2>
                <p className="text-red-950">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray 2xl:container 2xl:mx-auto mt-10 md:mt-20 md:ml-3 md:mr-3">
        <div className="relative">
          {/* Red bar that only extends halfway */}
          <div className="absolute top-0 left-0 h-2 bg-red-primary w-1/2 md:w-1/3"></div>

          {/* Flex container: Adjusts order based on screen size */}
          <div className="flex flex-col md:grid md:grid-cols-2 md:items-center">
            {/* Image Section (Will appear first on small screens, second on md+) */}
            <div className="order-1 md:order-2 w-full h-full">
              <img
                src={weWElcomeAll}
                alt="Students conversing"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text Section */}
            <div className="order-2 md:order-1 lg:pl-16 p-5 md:p-7 lg:pt-0">
              <h2 className="text-3xl font-bold md:text-4xl text-red-primary mb-2 md:mb-6 ">
                We welcome all
              </h2>
              <p className="text-red-950 mb-4 md:mb-8">
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
              <button className="cursor-pointer text-sm md:text-base py-1 text-red-primary font-bold hover:underline transition-all duration-500">
                LEARN MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className=" 2xl:container 2xl:mx-auto mt-10 md:mt-15">
        <div className=" lg:px-40 p-5 sm:grid sm:grid-cols-[1fr_1.5fr] md:gap-6">
          <div className="sm:text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-red-primary mb-5">
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

            <button className="cursor-pointer text-sm md:text-base py-1 text-red-primary font-bold underline transition-all duration-500">
              LEARN MORE
            </button>
          </div>
        </div>
        <CardSlider cards={home} />
      </section>

      <SectionEventLayout data={events} label={"UPCOMMING EVENTS"} />
    </main>
  );
};

export default Home;
