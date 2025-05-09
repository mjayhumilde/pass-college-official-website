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
    <section className="mx-auto container p-3 md:p-10">
      <div className="flex flex-col gap-10 lg:shadow-2xl lg:px-36">
        {data.map((post) => (
          <div key={post.id} className="bg-red-primary shadow-lg">
            <div id={`news-${post.id}`} className="bg-gray">
              {isAuthenticated &&
                (userRole === "admin" || userRole === "teacher") && (
                  <div className="flex justify-end items-center p-1">
                    <DeleteIcon id={post.id} itemName={label} />
                  </div>
                )}
              <div className="flex justify-between p-2 py-2 md:px-10">
                <h3 className="text-red-primary font-bold text-xl">
                  {label}!!
                </h3>
                <p className="text-red-primary font-semibold">{post.date}</p>
              </div>
              <div className="text-red-950 container mx-auto pt-0 p-2 px-5 pb-2 md:px-13">
                {post.message}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div
                className={`grid gap-1 
              ${
                post.img.length === 3 ||
                post.img.length === 2 ||
                post.img.length === 1
                  ? "col-span-2"
                  : ""
              }
              ${post.img.length > 3 ? "grid-rows-2 " : ""}
              `}
              >
                {/* Left column with 2 images */}
                {post.img.length === 1 &&
                  post.img.map((src, index) => (
                    <div
                      key={index}
                      className="overflow-hidden h-[320px] sm:h-[600px] cursor-pointer"
                      onClick={() => openCarousel(post.img, index)}
                    >
                      {/* Left top image */}
                      <img
                        className="object-cover w-full h-full"
                        src={src}
                        alt="Left top image"
                      />
                    </div>
                  ))}

                {post.img.length === 2 &&
                  post.img.slice(0, 1).map((src, index) => (
                    <div
                      key={index}
                      className="overflow-hidden h-[210px] sm:h-[300px] cursor-pointer"
                      onClick={() => openCarousel(post.img, index)}
                    >
                      {/* Left top image */}
                      <img
                        className="object-cover w-full h-full"
                        src={src}
                        alt="Left top image"
                      />
                    </div>
                  ))}

                {post.img.length === 3 &&
                  post.img.slice(0, 1).map((src, index) => (
                    <div
                      key={index}
                      className="overflow-hidden h-[210px] sm:h-[300px] cursor-pointer"
                      onClick={() => openCarousel(post.img, index)}
                    >
                      {/* Left top image */}
                      <img
                        className="object-cover w-full h-full"
                        src={src}
                        alt="Left top image"
                      />
                    </div>
                  ))}

                {post.img.length > 3 &&
                  post.img.slice(0, 2).map((src, index) => (
                    <div
                      key={index}
                      className="overflow-hidden h-[210px] sm:h-[300px] cursor-pointer"
                      onClick={() => openCarousel(post.img, index)}
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
             
              ${post.img.length === 2 ? "grid  gap-1  col-span-2" : ""}
              ${
                post.img.length === 3
                  ? "grid  gap-1  grid-cols-2 col-span-2"
                  : ""
              }
              ${post.img.length === 4 ? "grid  gap-1  grid-rows-2" : ""} 
              ${post.img.length >= 5 ? "grid  gap-1  grid-rows-3" : ""}`}
              >
                {/* Right column with 3 images */}
                {post.img.length === 2 &&
                  post.img.slice(1, 2).map((src, index) => (
                    <div
                      key={index}
                      className={`overflow-hidden cursor-pointer
               ${post.img.length === 2 ? " h-[210px] sm:h-[300px]" : ""}
               ${post.img.length === 3 ? " h-[210px] sm:h-[300px]" : ""}
               ${post.img.length >= 5 ? " h-[139px] sm:h-[199px]" : ""}
               ${post.img.length === 4 ? " h-[210px] sm:h-[300px]" : ""}
               ${index === 2 && post.img.length > 5 ? "relative" : ""}`}
                      onClick={() => openCarousel(post.img, index + 1)}
                    >
                      <img
                        className="object-cover w-full h-full"
                        src={src}
                        alt={`Announcement image ${index + 3}`}
                      />
                    </div>
                  ))}

                {post.img.length === 3 &&
                  post.img.slice(1, 3).map((src, index) => (
                    <div
                      key={index}
                      className={`overflow-hidden cursor-pointer
                  ${post.img.length === 3 ? " h-[210px] sm:h-[300px]" : ""}
                  ${post.img.length >= 5 ? " h-[139px] sm:h-[199px]" : ""}
                  ${post.img.length === 4 ? " h-[210px] sm:h-[300px]" : ""}
                  ${index === 2 && post.img.length > 5 ? "relative" : ""}`}
                      onClick={() => openCarousel(post.img, index + 1)}
                    >
                      <img
                        className="object-cover w-full h-full"
                        src={src}
                        alt={`Announcement image ${index + 3}`}
                      />
                    </div>
                  ))}

                {post.img.length >= 4 &&
                  post.img.slice(2, 5).map((src, index) => (
                    <div
                      key={index}
                      className={`overflow-hidden cursor-pointer
                  ${post.img.length >= 5 ? " h-[139px] sm:h-[199px]" : ""}
                  ${post.img.length === 4 ? " h-[210px] sm:h-[300px]" : ""}
                  ${index === 2 && post.img.length > 5 ? "relative" : ""}`}
                      onClick={() => openCarousel(post.img, index + 2)}
                    >
                      <img
                        className="object-cover w-full h-full"
                        src={src}
                        alt={`Announcement image ${index + 3}`}
                      />
                      <div
                        className={`
                        ${
                          index === 2 && post.img.length > 5
                            ? "text-red-50 text-4xl absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-[rgb(128,0,0)]/50"
                            : ""
                        }`}
                      >
                        {index === 2 && post.img.length > 5
                          ? `+ ${post.img.length - 5}`
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
