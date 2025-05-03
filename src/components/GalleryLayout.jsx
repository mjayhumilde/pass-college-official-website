import React from "react";

const GalleryLayout = () => {
  return (
    <section className="container mx-auto">
      <div className=" ">
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-17 gap-4 md:gap-2 py-10 px-6 2xl:p-10  2xl:px-20">
          {/* Large left image - spans 6 columns and full height */}
          <div className="relative overflow-hidden md:h-[450px] lg:h-[600px] md:col-span-6 lg:col-span-7 md:row-span-2">
            <img
              src="https://apuedge.com/wp-content/uploads/AdobeStock_47258409.jpeg"
              alt="Historical university figure"
              className="w-full h-full object-cover"
            />
            <div className="flex md:hidden p-5 absolute inset-0 bg-[rgb(128,0,0)]/50 text-white lg:flex items-center justify-center text-xl font-semibold opacity-100 md:opacity-0 transition-opacity duration-600 md:hover:opacity-100 ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia,
              sequi, dolores numquam odit doloremque rep
            </div>
          </div>

          {/* Top right images - each spans 3 columns */}
          <div className="relative overflow-hidden md:col-span-3 lg:col-span-4 row-span-1 group">
            <img
              src="https://cdn.britannica.com/56/5756-050-39545DB0/Apollo-Belvedere-copy-original-Roman-Leochares-Greek.jpg?w=740&h=416&c=crop"
              alt="Butterfly on purple flowers"
              className="w-full h-full object-cover"
            />
            <div className="flex md:hidden p-5 absolute inset-0 bg-[rgb(128,0,0)]/50 text-white lg:flex items-center justify-center text-xl font-semibold opacity-100 md:opacity-0 transition-opacity duration-600 md:hover:opacity-100 ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia,
              sequi, dolores numquam odit doloremque rep
            </div>
          </div>

          <div className="relative overflow-hidden md:col-span-3 lg:col-span-4 row-span-1">
            <img
              src="https://www.thecollector.com/_next/image/?url=https%3A%2F%2Fcdn.thecollector.com%2Fwp-content%2Fuploads%2F2022%2F05%2Fhermes-marble-sculpture-details.jpg&w=1200&q=55"
              alt="Garden path with university building"
              className="w-full h-full object-cover"
            />
            <div className="flex md:hidden p-5 absolute inset-0 bg-[rgb(128,0,0)]/50 text-white lg:flex items-center justify-center text-xl font-semibold opacity-100 md:opacity-0 transition-opacity duration-600 md:hover:opacity-100 ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia,
              sequi, dolores numquam odit doloremque rep
            </div>
          </div>

          {/* Bottom right images - one spans 6 and one spans 3 columns */}
          <div className="relative overflow-hidden md:col-span-3 lg:col-span-6 row-span-1 lg:row-span-15">
            <img
              src="https://crunchlearning.com/wp-content/uploads/2023/01/Hermes-Ancient-Greek-God-e1674457825621.jpg"
              alt="Ornate iron gate with university mascot"
              className="w-full h-full object-cover"
            />
            <div className="flex md:hidden p-5 absolute inset-0 bg-[rgb(128,0,0)]/50 text-white lg:flex items-center justify-center text-xl font-semibold opacity-100 md:opacity-0 transition-opacity duration-600 md:hover:opacity-100 ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia,
              sequi, dolores numquam odit doloremque rep
            </div>
          </div>

          <div className="relative overflow-hidden md:col-span-3 lg:col-span-4 row-span-1">
            <img
              src="https://storage.googleapis.com/flex-web-media-prod/content/images/wp-content/uploads/2023/12/classical-greek-sculpture.webp"
              alt="Historical academic figure at desk"
              className="w-full h-full object-cover"
            />
            <div className="flex md:hidden p-5 absolute inset-0 bg-[rgb(128,0,0)]/50 text-white lg:flex items-center justify-center text-xl font-semibold opacity-100 md:opacity-0 transition-opacity duration-600 md:hover:opacity-100 ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia,
              sequi, dolores numquam odit doloremque rep
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryLayout;
