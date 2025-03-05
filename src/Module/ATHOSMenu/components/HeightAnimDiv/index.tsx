import { AnimatePresence, motion, Variants } from "framer-motion";
import { ReactNode } from "react";
const variants: Variants = {
  hidden: {
    height: 0,
    //opacity: 0,
  },
  visible: {
    height: "auto",
    //opacity: 1,
  },
};
const HeightAnimDiv = ({
  show,
  children,
  className,
  Bref,
  style,
}: {
  Bref?: any;
  style?: any;
  show: boolean;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          style={style}
          ref={Bref}
          transition={{
            duration: 0.15,
            ease: "easeInOut",
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          className={`overflow-hidden w-full flex justify-end flex-col gap-1 ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeightAnimDiv;
