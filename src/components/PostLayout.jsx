import Pagination from "./Pagination";

const PostLayout = ({ data, label }) => {
  return (
    <section className="mx-auto container p-3 md:p-10">
      <div className="flex flex-col gap-10  lg:shadow-2xl lg:px-36">
        {data.map((post) => (
          <div key={post.id} className="bg-red-primary shadow-lg">
            <div className="bg-gray">
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
            <div className="grid grid-cols-2 gap-1 cursor-pointer">
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
                      className="overflow-hidden h-[320px] sm:h-[600px]"
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
                      className="overflow-hidden h-[210px] sm:h-[300px]"
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
                      className="overflow-hidden h-[210px] sm:h-[300px]"
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
                      className="overflow-hidden h-[210px] sm:h-[300px]"
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
                      className={` overflow-hidden
               ${post.img.length === 2 ? " h-[210px] sm:h-[300px]" : ""}
               ${post.img.length === 3 ? " h-[210px] sm:h-[300px]" : ""}
               ${post.img.length >= 5 ? " h-[139px] sm:h-[199px]" : ""}
               ${post.img.length === 4 ? " h-[210px] sm:h-[300px]" : ""}
           ${index === 2 && post.img.length > 5 ? "relative" : ""}`}
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
                      className={` overflow-hidden
                  ${post.img.length === 3 ? " h-[210px] sm:h-[300px]" : ""}
                  ${post.img.length >= 5 ? " h-[139px] sm:h-[199px]" : ""}
                  ${post.img.length === 4 ? " h-[210px] sm:h-[300px]" : ""}
              ${index === 2 && post.img.length > 5 ? "relative" : ""}`}
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
                      className={` overflow-hidden
                  ${post.img.length >= 5 ? " h-[139px] sm:h-[199px]" : ""}
                  ${post.img.length === 4 ? " h-[210px] sm:h-[300px]" : ""}
              ${index === 2 && post.img.length > 5 ? "relative" : ""}`}
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
    </section>
  );
};

export default PostLayout;
