import { motion } from "framer-motion";
import { memo } from "react";

export const transition = {
  duration: 0.34,
  ease: "easeInOut",
};

const cellAnim = {
  exit: { height: 0, opacity: 0 },
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  transition: transition,
};
export const cellWrapperAnim = {
  initial: { opacity: 0, backgroundColor: "rgba(0,0,250,1)" },
  animate: {
    opacity: 1,
    backgroundColor: "rgba(0,0,250,0)",
    transition: {
      delay: 0.4,
      duration: 0.4,
    },
  },
  exit: { padding: 0, opacity: 0 },
  transition: transition,
};

interface CellExitWrapperProps {
  children: any;
  wref?: any;
}

const CellExitWrapper = ({ children, wref }: CellExitWrapperProps) => {
  return (
    <motion.div
      ref={wref}
      style={{
        overflow: "hidden",
      }}
      {...cellAnim}
    >
      {children}
    </motion.div>
  );
};

export default memo(CellExitWrapper);
