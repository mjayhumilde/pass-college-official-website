import { motion as Motion, useInView } from "framer-motion";
import { useRef } from "react";

const OpacityAnimation = ({ children }) => {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };
  return (
    <Motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: 0.1 }}
    >
      {children}
    </Motion.div>
  );
};

export default OpacityAnimation;
