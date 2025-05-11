import HeroBgSection from "../components/HeroBgSection";
import PostLayout from "../components/PostLayout";
import CreatePostPopup from "../components/CreatePostPopup";
import useAuthStore from "../store/useAuthStore";
import usePostStore from "../store/usePostStore";

import { useEffect } from "react";

const Uniform = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.userRole);

  const uniforms = usePostStore((state) => state.uniforms);
  console.log(uniforms);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on mount
  }, []);
  return (
    <main>
      <HeroBgSection
        img={
          "https://media.istockphoto.com/id/911026578/photo/walking-to-class.jpg?s=612x612&w=0&k=20&c=0zYehlzABctgFBr_QFjkqqfNcU4Gmf-lj92bXrhQ2IY="
        }
        label={"Uniforms"}
      />

      <div className="text-center mt-7 md:mt-14 p-5 bg-red-primary">
        <h2 className="text-2xl md:text-3xl font-bold tracking-wider text-red-50">
          UNIFORM RELEASE UPDATES & PICKUP SCHEDULES
        </h2>
        {/* <div className="w-55 border-b-2  border-[rgb(255,207,80)] mx-auto mt-2"></div> */}
      </div>

      {isAuthenticated && (userRole === "admin" || userRole === "teacher") ? (
        <div className="container mx-auto flex justify-end mt-5 mb-10">
          <CreatePostPopup />
        </div>
      ) : null}

      <PostLayout data={uniforms} label={"UNIFORMS"} />
    </main>
  );
};

export default Uniform;
