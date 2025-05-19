import { AnimatePresence, motion } from "framer-motion";
import { FaCheck } from "react-icons/fa6";
import { VscLoading } from "react-icons/vsc";
import { useATHOSSelectContext } from "../../context";
import { SelectedItemI } from "../../intefaces";

interface ListItemI {
  option: SelectedItemI;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  isSelected: boolean;
  selectedClassName?: string;
  selectedStyle?: React.CSSProperties;

  isOpened: boolean;
  isLastSelected: boolean;
}

const ListItem = ({
  option,
  onClick,
  isOpened,
  isLastSelected,
  className,
  style,
  selectedClassName,
  selectedStyle,
  isSelected,
}: ListItemI) => {
  const defaultClassName = `cursor-pointer select-none `;
  const { updating } = useATHOSSelectContext();

  return (
    <motion.li
      /* transition={{
        delay: index * 0.05,
      }} */
      animate={{ opacity: isOpened ? 1 : 0 }}
      style={{
        ...style,
        ...option.style,
        ...(isSelected ? selectedStyle : {}),
      }}
      onClick={onClick}
      className={`flex pr-3 justify-between items-center transform-gpu ${defaultClassName} ${className} ${option.className} ${
        isSelected ? selectedClassName : ""
      }`}
    >
      {option.label}
      <AnimatePresence>
        {isSelected ? (
          updating && isLastSelected ? (
            <VscLoading className="animate-spin" />
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
              <FaCheck size={12} />
            </motion.div>
          )
        ) : null}
      </AnimatePresence>
    </motion.li>
  );
};

export default ListItem;
