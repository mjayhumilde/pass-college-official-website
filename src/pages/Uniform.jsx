import HeroBgSection from "../components/HeroBgSection";
import PostLayout from "../components/PostLayout";
import CreatePostPopup from "../components/CreatePostPopup";
import useAuthStore from "../store/useAuthStore";
import usePostStore from "../store/usePostStore";

import { useEffect } from "react";

const Uniform = () => {
  const { userRole, isAuthenticated } = useAuthStore();
  const { uniforms, getAllPost } = usePostStore();

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
          "https://media.istockphoto.com/id/911026578/photo/walking-to-class.jpg?s=612x612&w=0&k=20&c=0zYehlzABctgFBr_QFjkqqfNcU4Gmf-lj92bXrhQ2IY="
        }
        label={"Uniforms"}
      />

      <div className="p-5 text-center mt-7 md:mt-14 bg-red-primary">
        <h2 className="text-2xl font-bold tracking-wider md:text-3xl text-red-50">
          UNIFORM RELEASE UPDATES & PICKUP SCHEDULES
        </h2>
        {/* <div className="w-55 border-b-2  border-[rgb(255,207,80)] mx-auto mt-2"></div> */}
      </div>

      {isAuthenticated && (userRole === "admin" || userRole === "registrar") ? (
        <div className="container flex justify-end mx-auto mt-5 mb-10">
          <CreatePostPopup />
        </div>
      ) : null}

      <PostLayout data={uniforms} label={"UNIFORMS"} />
    </main>
  );
};

export default Uniform;
