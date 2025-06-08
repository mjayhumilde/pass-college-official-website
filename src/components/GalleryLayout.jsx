import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const GalleryLayout = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);

  const isInView1 = useInView(ref1, { once: true, amount: 0.7 });
  const isInView2 = useInView(ref2, { once: true, amount: 0.7 });
  const isInView3 = useInView(ref3, { once: true, amount: 0.7 });
  const isInView4 = useInView(ref4, { once: true, amount: 0.7 });
  const isInView5 = useInView(ref5, { once: true, amount: 0.7 });

  const variants1 = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 25,
        mass: 1,
      },
    },
  };
  const variants2 = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 25,
        mass: 1,
      },
    },
  };
  const variants3 = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 25,
        mass: 1,
      },
    },
  };
  const variants4 = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 25,
        mass: 1,
      },
    },
  };
  const variants5 = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 25,
        mass: 1,
      },
    },
  };

  return (
    <section className="container mx-auto">
      <div className="">
        <div className="grid grid-cols-1 gap-4 px-6 py-10 md:grid-cols-12 lg:grid-cols-17 md:gap-2 2xl:p-10 2xl:px-20">
          {/* Large left image - spans 6 columns and full height */}
          <motion.div
            ref={ref1}
            variants={variants1}
            initial="hidden"
            animate={isInView1 ? "visible" : "hidden"}
            className="relative overflow-hidden md:h-[450px] lg:h-[600px] md:col-span-6 lg:col-span-7 md:row-span-2"
          >
            <img
              src="https://apuedge.com/wp-content/uploads/AdobeStock_47258409.jpeg"
              alt="Historical university figure"
              className="object-cover w-full h-full"
            />
            <div className="flex md:hidden p-5 absolute inset-0 bg-[rgb(128,0,0)]/50 text-white lg:flex items-center justify-center text-xl font-semibold opacity-100 md:opacity-0 transition-opacity duration-600 md:hover:opacity-100 ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia,
              sequi, dolores numquam odit doloremque rep
            </div>
          </motion.div>

          {/* Top right images - each spans 3 columns */}
          <motion.div
            ref={ref2}
            variants={variants2}
            initial="hidden"
            animate={isInView2 ? "visible" : "hidden"}
            className="relative row-span-1 overflow-hidden md:col-span-3 lg:col-span-4 group"
          >
            <img
              src="https://cdn.britannica.com/56/5756-050-39545DB0/Apollo-Belvedere-copy-original-Roman-Leochares-Greek.jpg?w=740&h=416&c=crop"
              alt="Butterfly on purple flowers"
              className="object-cover w-full h-full"
            />
            <div className="flex md:hidden p-5 absolute inset-0 bg-[rgb(128,0,0)]/50 text-white lg:flex items-center justify-center text-xl font-semibold opacity-100 md:opacity-0 transition-opacity duration-600 md:hover:opacity-100 ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia,
              sequi, dolores numquam odit doloremque rep
            </div>
          </motion.div>

          <motion.div
            ref={ref3}
            variants={variants3}
            initial="hidden"
            animate={isInView3 ? "visible" : "hidden"}
            className="relative row-span-1 overflow-hidden md:col-span-3 lg:col-span-4"
          >
            <img
              src="https://honesthistory.co/cdn/shop/articles/statue_of_zeus_1200x1200.jpg?v=1665007951"
              alt="Garden path with university building"
              className="object-cover w-full h-full"
            />
            <div className="flex md:hidden p-5 absolute inset-0 bg-[rgb(128,0,0)]/50 text-white lg:flex items-center justify-center text-xl font-semibold opacity-100 md:opacity-0 transition-opacity duration-600 md:hover:opacity-100 ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia,
              sequi, dolores numquam odit doloremque rep
            </div>
          </motion.div>

          {/* Bottom right images - one spans 6 and one spans 3 columns */}
          <motion.div
            ref={ref4}
            variants={variants4}
            initial="hidden"
            animate={isInView4 ? "visible" : "hidden"}
            className="relative row-span-1 overflow-hidden md:col-span-3 lg:col-span-6 lg:row-span-15"
          >
            <img
              src="https://crunchlearning.com/wp-content/uploads/2023/01/Hermes-Ancient-Greek-God-e1674457825621.jpg"
              alt="Ornate iron gate with university mascot"
              className="object-cover w-full h-full"
            />
            <div className="flex md:hidden p-5 absolute inset-0 bg-[rgb(128,0,0)]/50 text-white lg:flex items-center justify-center text-xl font-semibold opacity-100 md:opacity-0 transition-opacity duration-600 md:hover:opacity-100 ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia,
              sequi, dolores numquam odit doloremque rep
            </div>
          </motion.div>

          <motion.div
            ref={ref5}
            variants={variants5}
            initial="hidden"
            animate={isInView5 ? "visible" : "hidden"}
            className="relative row-span-1 overflow-hidden md:col-span-3 lg:col-span-4"
          >
            <img
              src="https://storage.googleapis.com/flex-web-media-prod/content/images/wp-content/uploads/2023/12/classical-greek-sculpture.webp"
              alt="Historical academic figure at desk"
              className="object-cover w-full h-full"
            />
            <div className="flex md:hidden p-5 absolute inset-0 bg-[rgb(128,0,0)]/50 text-white lg:flex items-center justify-center text-xl font-semibold opacity-100 md:opacity-0 transition-opacity duration-600 md:hover:opacity-100 ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia,
              sequi, dolores numquam odit doloremque rep
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GalleryLayout;
