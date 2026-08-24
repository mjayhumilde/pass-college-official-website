import { MegaphoneOff } from "lucide-react";
import CreatePostPopup from "../../../components/CreatePostPopup";
import EmptySection from "../../../components/EmptySection";
import PostLayout from "../../../components/PostLayout";

export default function NewsSection({ canManagePosts, news }) {
  return (
    <>
      <div className="px-2 pb-0 text-center mt-14">
        <h2 className="text-3xl font-bold tracking-wider md:text-5xl text-red-primary">
          NEWS
        </h2>
        <div className="mx-auto mt-2 border-b-2 w-25 border-red-950" />
      </div>
      <div className="p-5 pb-5 mt-2 text-center bg-red-primary">
        <h2 className="text-xl font-bold tracking-wider md:text-2xl text-red-50">
          LATEST HAPPENINGS & UPDATES
        </h2>
      </div>

      {canManagePosts && (
        <div className="container flex justify-end mx-auto mt-5 mb-10">
          <CreatePostPopup />
        </div>
      )}

      {news?.length > 0 ? (
        <PostLayout data={news} label="NEWS" />
      ) : (
        <EmptySection icon={MegaphoneOff} type="NEWS" />
      )}
    </>
  );
}
