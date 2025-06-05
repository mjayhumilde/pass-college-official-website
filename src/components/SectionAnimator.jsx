import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SectionAnimator = ({ children }) => {
  const ref = useRef(null);
  // amount: 0.5 triggers when 50% in view
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const variants = {
    hidden: { opacity: 0, y: 75 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export default SectionAnimator;
