import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useATHOSSelectContext } from "../../../context";
import { VscLoading } from "react-icons/vsc";
const SelectedItem = ({
  isMultiSelect,
  children,
  lastSelected,
}: {
  children: ReactNode;
  isMultiSelect: boolean;
  lastSelected?: boolean;
}) => {
  const { updating, multiSelectLabelClassName } = useATHOSSelectContext();
  const multiSelClass = "py-1 px-2 rounded-md text-sm w-max " + multiSelectLabelClassName;
  const defaultClassName = `flex cursor-pointer select-none`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      layout={"preserve-aspect"}
      className={`${defaultClassName} ${isMultiSelect ? multiSelClass : ""}`}
    >
      {updating && lastSelected ? <VscLoading className="animate-spin" /> : children}
    </motion.div>
  );
};

export default SelectedItem;
