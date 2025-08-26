import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import DeleteIcon from "./DeleteIcon";

const PostItem = ({ post, label, openCarousel, userRole, isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
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
          <h3 className="text-xl font-bold text-red-primary">{label}!!</h3>
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

          {/* Two Images Layout - Side by side */}
          {post.images.length === 2 && (
            <div className="grid grid-cols-2 gap-1">
              {post.images.map((src, index) => (
                <div
                  key={index}
                  className="overflow-hidden h-[210px] sm:h-[300px] cursor-pointer"
                  onClick={() => openCarousel(post.images, index)}
                >
                  <img
                    className="object-cover w-full h-full"
                    src={src}
                    alt={`Post image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Three Images Layout*/}
          {post.images.length === 3 && (
            <div className="grid gap-1">
              <div
                className="overflow-hidden h-[210px] sm:h-[300px] cursor-pointer"
                onClick={() => openCarousel(post.images, 0)}
              >
                <img
                  className="object-cover w-full h-full"
                  src={post.images[0]}
                  alt="Post image 1"
                />
              </div>
              {/* Second and third images side by side */}
              <div className="grid grid-cols-2 gap-1">
                {post.images.slice(1, 3).map((src, index) => (
                  <div
                    key={index + 1}
                    className="overflow-hidden h-[210px] sm:h-[300px] cursor-pointer"
                    onClick={() => openCarousel(post.images, index + 1)}
                  >
                    <img
                      className="object-cover w-full h-full"
                      src={src}
                      alt={`Post image ${index + 2}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

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
          
          ${post.images.length === 2 ? "hidden" : ""}
          ${post.images.length === 3 ? "hidden" : ""}
          ${post.images.length === 4 ? "grid  gap-1  grid-rows-2" : ""} 
          ${post.images.length >= 5 ? "grid  gap-1  grid-rows-3" : ""}`}
        >
          {/* Right column with 3 images */}
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

      <div>
        <div className="flex justify-between items-center p-2 sm:px-20">
          <div className="flex items-center px-2">
            <div className="relative w-8 h-8">
              <div className="absolute top-0 left-0 z-10">
                <Heart
                  className="w-full h-full text-white"
                  fill="#FFBABA"
                  strokeWidth={0}
                />
              </div>

              <div className="absolute top-0 left-0 z-20 -translate-x-3">
                <Heart
                  className="w-full h-full text-white"
                  fill="#FF5252"
                  strokeWidth={0}
                />
              </div>
              <div className="absolute top-0 left-0 z-20 -translate-x-7">
                <Heart
                  className="w-full h-full text-white"
                  fill="red"
                  strokeWidth={0}
                />
              </div>
            </div>
            <p className="text-white">130</p>
          </div>
          <p className="text-white hover:cursor-pointer hover:underline">
            <span className="text-white">4</span> comments
          </p>
        </div>
        <hr className="text-white" />
        <div className="flex justify-around items-center px-10 py-2">
          <Heart
            color="white"
            className="hover:cursor-pointer hover:scale-125 transition-all"
          />
          <MessageCircle
            color="white"
            className="hover:cursor-pointer hover:scale-125 transition-all"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        {isOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Modal Title</h2>
              <p>This is the content of the modal.</p>
              <button onClick={() => setIsOpen(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItem;
