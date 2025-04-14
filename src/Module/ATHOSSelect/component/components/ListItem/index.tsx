import { AnimatePresence, motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import { useATHOSSelectContext } from "../../context";
import { SelectedItemI } from "../../intefaces";
const ListItem = ({
  option,
  onClick,
  className,
  style,
  selectedClassName,
  selectedStyle,
  isSelected,
}: {
  option: SelectedItemI;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  isSelected: boolean;
  selectedClassName?: string;
  selectedStyle?: React.CSSProperties;
}) => {
  const defaultClassName = `cursor-pointer select-none `;
  const { updating } = useATHOSSelectContext();

  return (
    <li
      style={{
        ...style,
        ...option.style,
        ...(isSelected ? selectedStyle : {}),
      }}
      onClick={onClick}
      className={`flex pr-3 justify-between items-center ${defaultClassName} ${className} ${option.className} ${
        isSelected ? selectedClassName : ""
      }`}
    >
      {option.label}
      <AnimatePresence>
        {isSelected ? (
          updating ? (
            <VscLoading className="animate-spin" />
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
              <FaCheck size={12} />
            </motion.div>
          )
        ) : null}
      </AnimatePresence>
    </li>
  );
};

export default ListItem;
