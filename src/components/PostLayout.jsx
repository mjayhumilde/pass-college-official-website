import Pagination from "./Pagination";
import useAuthStore from "../store/useAuthStore";
import ImageCarousel from "./ImageCorousel";
import { useState } from "react";
import EmptySection from "./EmptySection";
import { CircleOff } from "lucide-react";
import PostItem from "./PostItem";

const PostLayout = ({ data, label }) => {
  const userRole = useAuthStore((state) => state.userRole);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [initialIndex, setInitialIndex] = useState(0);

  const openCarousel = (images, startIndex) => {
    // First close the carousel if it's already open
    setCarouselOpen(false);

    // Wait for the close animation to complete
    setTimeout(() => {
      const formattedImages = images.map((src, index) => ({
        url: src,
        alt: `${label} image ${index + 1}`,
      }));

      const validIndex = Math.min(startIndex, formattedImages.length - 1);

      // Set the new values and open the carousel
      setSelectedImages(formattedImages);
      setInitialIndex(validIndex);
      setCarouselOpen(true);
    }, 50);
  };

  const closeCarousel = () => {
    setCarouselOpen(false);
  };

  return (
    <section className="container p-3 mx-auto md:p-10">
      <div className="flex flex-col gap-10 lg:shadow-2xl lg:px-36">
        {data.length > 0 ? (
          data.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              label={label}
              openCarousel={openCarousel}
              userRole={userRole}
              isAuthenticated={isAuthenticated}
            />
          ))
        ) : (
          <EmptySection icon={CircleOff} type={"POST"} />
        )}
        <div
          className={`${
            data.length > 10 ? "flex justify-center items-center" : "hidden"
          }`}
        >
          <Pagination />
        </div>
      </div>

      {/* Image Carousel */}
      {carouselOpen && (
        <ImageCarousel
          images={selectedImages}
          isOpen={carouselOpen}
          onClose={closeCarousel}
          initialIndex={initialIndex}
        />
      )}
    </section>
  );
};

export default PostLayout;
