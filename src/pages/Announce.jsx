import HeroBgSection from "../components/HeroBgSection";
import PostLayout from "../components/PostLayout";
import { announcement } from "../data/announcement/announcePost";

const Announce = () => {
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
      <PostLayout data={announcement} label={"ANNOUNCEMENT"} />
    </main>
  );
};

export default Announce;
