import { useEffect } from "react";
import CreatePostPopup from "../components/CreatePostPopup";
import HeroBgSection from "../components/HeroBgSection";
import PostLayout from "../components/PostLayout";
import useAuthStore from "../store/useAuthStore";
import usePostStore from "../store/usePostStore";

const Careers = () => {
  const { userRole, isAuthenticated } = useAuthStore();
  const { careers, getAllPost } = usePostStore();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on mount
  }, []);

  useEffect(() => {
    getAllPost();
  }, [getAllPost]);

  return (
    <main>
      <HeroBgSection
        img={
          "https://t4.ftcdn.net/jpg/09/02/53/81/360_F_902538150_JCEcejSQkRHHR7d5jE1nbmfhXHdcd9E3.jpg"
        }
        label={"Careers"}
      />

      <div className="p-5 text-center mt-7 md:mt-14 bg-red-primary">
        <h2 className="text-2xl font-bold tracking-wider md:text-3xl text-red-50">
          CAREER OPPORTUNITIES
        </h2>
        {/* <div className="w-55 border-b-2  border-[rgb(255,207,80)] mx-auto mt-2"></div> */}
      </div>
      {isAuthenticated && (userRole === "admin" || userRole === "registrar") ? (
        <div className="container flex justify-end mx-auto mt-5 mb-10">
          <CreatePostPopup />
        </div>
      ) : null}

      <PostLayout data={careers} label={"CAREERS"} />
    </main>
  );
};

export default Careers;
