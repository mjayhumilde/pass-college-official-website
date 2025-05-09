import { useEffect } from "react";
import CreatePostPopup from "../components/CreatePostPopup";
import HeroBgSection from "../components/HeroBgSection";
import PostLayout from "../components/PostLayout";
import { announcement } from "../data/announcement/announcePost";
import useAuthStore from "../store/useAuthStore";

const Careers = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.userRole);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on mount
  }, []);

  return (
    <main>
      <HeroBgSection
        img={
          "https://t4.ftcdn.net/jpg/09/02/53/81/360_F_902538150_JCEcejSQkRHHR7d5jE1nbmfhXHdcd9E3.jpg"
        }
        label={"Careers"}
      />

      <div className="text-center mt-7 md:mt-14 p-5 bg-red-primary">
        <h2 className="text-2xl md:text-3xl font-bold tracking-wider text-red-50">
          JOB OPENINGS & CAREER OPPORTUNITIES
        </h2>
        {/* <div className="w-55 border-b-2  border-[rgb(255,207,80)] mx-auto mt-2"></div> */}
      </div>
      {isAuthenticated && (userRole === "admin" || userRole === "teacher") ? (
        <div className="container mx-auto flex justify-end mt-5 mb-10">
          <CreatePostPopup />
        </div>
      ) : null}

      <PostLayout data={announcement} label={"CAREERS"} />
    </main>
  );
};

export default Careers;
