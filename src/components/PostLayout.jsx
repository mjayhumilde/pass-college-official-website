import DeleteIcon from "./DeleteIcon";
import Pagination from "./Pagination";
import useAuthStore from "../store/useAuthStore";
import ImageCarousel from "./ImageCorousel";
import { useState } from "react";

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
        {data.map((post) => (
          <div
            key={post.id}
            className="overflow-hidden rounded-lg shadow-lg bg-red-primary"
          >
            <div id={`news-${post.id}`} className="bg-gray">
              {isAuthenticated &&
                (userRole === "admin" || userRole === "teacher") && (
                  <div className="flex items-center justify-end p-1">
                    <div className="flex items-center justify-center p-2 rounded-full bg-red-primary hover:bg-red-800 text-red-50">
                      <DeleteIcon id={post.id} itemType={label} />
                    </div>
                  </div>
                )}
              <div className="flex justify-between p-2 py-2 md:px-10">
                <h3 className="text-xl font-bold text-red-primary">
                  {label}!!
                </h3>
                <p className="font-semibold text-red-primary">
                  {Number.isFinite(post.date)
                    ? new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : post.date}
                </p>
              </div>
              <div className="text-3xl font-bold text-center text-red-primary">
                {post.title}
              </div>
              <div className="container p-2 px-5 pt-0 pb-2 mx-auto text-red-950 md:px-13">
                {post.description}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div
                className={`grid gap-1 
              ${
                post.images.length === 3 ||
                post.images.length === 2 ||
                post.images.length === 1
                  ? "col-span-2"
                  : ""
              }
              ${post.images.length > 3 ? "grid-rows-2 " : ""}
              `}
              >
                {/* Left column with 2 images */}
                {post.images.length === 1 &&
                  post.images.map((src, index) => (
                    <div
                      key={index}
                      className="overflow-hidden h-[320px] sm:h-[600px] cursor-pointer"
                      onClick={() => openCarousel(post.images, index)}
                    >
                      {/* Left top image */}
                      <img
                        className="object-cover w-full h-full"
                        src={src}
                        alt="Left top image"
                      />
                    </div>
                  ))}

                {post.images.length === 2 &&
                  post.images.slice(0, 1).map((src, index) => (
                    <div
                      key={index}
                      className="overflow-hidden h-[210px] sm:h-[300px] cursor-pointer"
                      onClick={() => openCarousel(post.images, index)}
                    >
                      {/* Left top image */}
                      <img
                        className="object-cover w-full h-full"
                        src={src}
                        alt="Left top image"
                      />
                    </div>
                  ))}

                {post.images.length === 3 &&
                  post.images.slice(0, 1).map((src, index) => (
                    <div
                      key={index}
                      className="overflow-hidden h-[210px] sm:h-[300px] cursor-pointer"
                      onClick={() => openCarousel(post.images, index)}
                    >
                      {/* Left top image */}
                      <img
                        className="object-cover w-full h-full"
                        src={src}
                        alt="Left top image"
                      />
                    </div>
                  ))}

                {post.images.length > 3 &&
                  post.images.slice(0, 2).map((src, index) => (
                    <div
                      key={index}
                      className="overflow-hidden h-[210px] sm:h-[300px] cursor-pointer"
                      onClick={() => openCarousel(post.images, index)}
                    >
                      {/* Left top image */}
                      <img
                        className="object-cover w-full h-full"
                        src={src}
                        alt="Left top image"
                      />
                    </div>
                  ))}
              </div>

              <div
                className={`
             
              ${post.images.length === 2 ? "grid  gap-1  col-span-2" : ""}
              ${
                post.images.length === 3
                  ? "grid  gap-1  grid-cols-2 col-span-2"
                  : ""
              }
              ${post.images.length === 4 ? "grid  gap-1  grid-rows-2" : ""} 
              ${post.images.length >= 5 ? "grid  gap-1  grid-rows-3" : ""}`}
              >
                {/* Right column with 3 images */}
                {post.images.length === 2 &&
                  post.images.slice(1, 2).map((src, index) => (
                    <div
                      key={index}
                      className={`overflow-hidden cursor-pointer
               ${post.images.length === 2 ? " h-[210px] sm:h-[300px]" : ""}
               ${post.images.length === 3 ? " h-[210px] sm:h-[300px]" : ""}
               ${post.images.length >= 5 ? " h-[139px] sm:h-[199px]" : ""}
               ${post.images.length === 4 ? " h-[210px] sm:h-[300px]" : ""}
               ${index === 2 && post.images.length > 5 ? "relative" : ""}`}
                      onClick={() => openCarousel(post.images, index + 1)}
                    >
                      <img
                        className="object-cover w-full h-full"
                        src={src}
                        alt={`Announcement image ${index + 3}`}
                      />
                    </div>
                  ))}

                {post.images.length === 3 &&
                  post.images.slice(1, 3).map((src, index) => (
                    <div
                      key={index}
                      className={`overflow-hidden cursor-pointer
                  ${post.images.length === 3 ? " h-[210px] sm:h-[300px]" : ""}
                  ${post.images.length >= 5 ? " h-[139px] sm:h-[199px]" : ""}
                  ${post.images.length === 4 ? " h-[210px] sm:h-[300px]" : ""}
                  ${index === 2 && post.images.length > 5 ? "relative" : ""}`}
                      onClick={() => openCarousel(post.images, index + 1)}
                    >
                      <img
                        className="object-cover w-full h-full"
                        src={src}
                        alt={`Announcement image ${index + 3}`}
                      />
                    </div>
                  ))}

                {post.images.length >= 4 &&
                  post.images.slice(2, 5).map((src, index) => (
                    <div
                      key={index}
                      className={`overflow-hidden cursor-pointer
                  ${post.images.length >= 5 ? " h-[139px] sm:h-[199px]" : ""}
                  ${post.images.length === 4 ? " h-[210px] sm:h-[300px]" : ""}
                  ${index === 2 && post.images.length > 5 ? "relative" : ""}`}
                      onClick={() => openCarousel(post.images, index + 2)}
                    >
                      <img
                        className="object-cover w-full h-full"
                        src={src}
                        alt={`Announcement image ${index + 3}`}
                      />
                      <div
                        className={`
                        ${
                          index === 2 && post.images.length > 5
                            ? "text-red-50 text-4xl absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-[rgb(128,0,0)]/50"
                            : ""
                        }`}
                      >
                        {index === 2 && post.images.length > 5
                          ? `+ ${post.images.length - 5}`
                          : ""}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
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
