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

      {/* <div className="p-10 pb-5 text-center mt-14 bg-red-primary">
        <h2 className="text-2xl font-bold tracking-wider md:text-4xl text-red-50">
          EVENTS
        </h2>
        <div className="w-25 border-b-2 border-[rgb(255,207,80)] mx-auto mt-2"></div>
      </div> */}
      <SectionEventLayout data={events} label={"EVENTS"} />

      <div className="px-2 pb-0 text-center mt-14">
        <h2 className="text-3xl font-bold tracking-wider md:text-5xl text-red-primary">
          NEWS
        </h2>
        <div className="mx-auto mt-2 border-b-2 w-25 border-red-950"></div>
      </div>
      <div className="p-5 pb-5 mt-2 text-center bg-red-primary">
        <h2 className="text-xl font-bold tracking-wider md:text-2xl text-red-50">
          LATEST HAPPENINGS & UPDATES
        </h2>
      </div>

      {isAuthenticated && (userRole === "admin" || userRole === "teacher") ? (
        <div className="container flex justify-end mx-auto mt-5 mb-10">
          <CreatePostPopup />
        </div>
      ) : null}

      <PostLayout data={news} label={"NEWS"} />
    </main>
  );
};

export default Events;
