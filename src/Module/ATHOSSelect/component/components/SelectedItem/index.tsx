import { motion } from "framer-motion";
import { ReactNode } from "react";
const SelectedItem = ({ isMultiSelect, children }: { children: ReactNode; isMultiSelect: boolean }) => {
  const multiSelClass = "border border-white py-1 px-2 rounded-md text-sm w-max";
  const defaultClassName = `flex cursor-pointer select-none`;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      layout
      className={`${defaultClassName} ${isMultiSelect ? multiSelClass : ""}`}
    >
      {children}
    </motion.div>
  );
};

export default SelectedItem;
