import { useEffect } from "react";
import CreatePostPopup from "../components/CreatePostPopup";
import HeroBgSection from "../components/HeroBgSection";
import PostLayout from "../components/PostLayout";
import useAuthStore from "../store/useAuthStore";
import usePostStore from "../store/usePostStore";

const Announce = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.userRole);

  const announcements = usePostStore((state) => state.announcements);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on mount
  }, []);

  return (
    <main>
      <HeroBgSection
        img={"https://up.phinma.edu.ph/wp-content/uploads/2023/04/news.jpg"}
        label={"Announcements"}
      />

      <div className="text-center mt-7 md:mt-14 p-5 bg-red-primary">
        <h2 className="text-2xl md:text-3xl font-bold tracking-wider text-red-50">
          IMPORTANT UPDATES & NOTICES
        </h2>
        {/* <div className="w-55 border-b-2  border-[rgb(255,207,80)] mx-auto mt-2"></div> */}
      </div>
      {isAuthenticated && (userRole === "admin" || userRole === "teacher") ? (
        <div className="container mx-auto flex justify-end mt-5 mb-10">
          <CreatePostPopup />
        </div>
      ) : null}
      <PostLayout data={announcements} label={"ANNOUNCEMENT"} />
    </main>
  );
};

export default Announce;
