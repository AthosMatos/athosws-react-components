import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
const HeightAnimDiv = ({ show, children, className }: { show: boolean; children: ReactNode; className?: string }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          className={`overflow-hidden flex flex-col px-2 ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeightAnimDiv;
