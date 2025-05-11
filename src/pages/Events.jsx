import HeroBgSection from "../components/HeroBgSection";
import PostLayout from "../components/PostLayout";
import useAuthStore from "../store/useAuthStore";
import usePostStore from "../store/usePostStore";
import CreatePostPopup from "../components/CreatePostPopup";

import SectionEventLayout from "../components/SectionEventLayout";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Events = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.userRole);

  const events = usePostStore((state) => state.events);
  const news = usePostStore((state) => state.news);
  console.log(news);

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo(0, 0);
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);
  return (
    <main>
      <HeroBgSection
        img={
          "https://img.freepik.com/premium-photo/global-technology-background_13339-284304.jpg?semt=ais_hybrid"
        }
        label={"News & Events"}
      />

      {/* <div className="text-center mt-14 p-10 pb-5 bg-red-primary">
        <h2 className="text-2xl md:text-4xl font-bold tracking-wider text-red-50">
          EVENTS
        </h2>
        <div className="w-25 border-b-2 border-[rgb(255,207,80)] mx-auto mt-2"></div>
      </div> */}
      <SectionEventLayout data={events} label={"EVENTS"} />

      <div className="text-center mt-14 px-2 pb-0">
        <h2 className="text-3xl md:text-5xl font-bold tracking-wider text-red-primary">
          NEWS
        </h2>
        <div className="w-25 border-b-2 border-red-950 mx-auto mt-2"></div>
      </div>
      <div className="text-center mt-2 p-5 pb-5 bg-red-primary">
        <h2 className="text-xl md:text-2xl font-bold tracking-wider text-red-50">
          LATEST HAPPENINGS & UPDATES
        </h2>
      </div>

      {isAuthenticated && (userRole === "admin" || userRole === "teacher") ? (
        <div className="container mx-auto flex justify-end mt-5 mb-10">
          <CreatePostPopup />
        </div>
      ) : null}

      <PostLayout data={news} label={"BREAKING NEWS"} />
    </main>
  );
};

export default Events;
