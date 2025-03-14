import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { generateColorShades, getContrastColor } from "../../../../../../utils/color-utils";
import { ADTState } from "../../../../redux/store";

interface ItemWrapperProps {
  label: string;
  icon?: React.ReactNode;
  isSelected?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
  extraComponent?: React.ReactNode;
}

const ItemWrapper = ({ isSelected, isOpen, onClick, extraComponent, label, icon }: ItemWrapperProps) => {
  const { tableStyle } = useSelector((state: ADTState) => ({
    tableStyle: state.ADTPropsReducer.tableStyle,
  }));
  const accentColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.accentColor);
  const textColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.textColor);

  return (
    <motion.div
      transition={{ duration: 0.1 }}
      whileHover={{
        backgroundColor: accentColor && generateColorShades(accentColor).light,
      }}
      className={`flex justify-between gap-2  p-2 cursor-pointer rounded-md items-center active:bg-gray-300 
        ${isOpen ? "bg-gray-200" : "hover:bg-gray-100"}
        `}
      style={
        tableStyle?.highlightColor && isSelected
          ? {
              backgroundColor: tableStyle?.highlightColor,
              color: getContrastColor(tableStyle?.highlightColor),
            }
          : {
              backgroundColor: accentColor,
            }
      }
      onClick={onClick}
    >
      <div
        style={
          tableStyle?.highlightColor && isSelected
            ? {
                color: getContrastColor(tableStyle?.highlightColor),
              }
            : {
                color: textColor,
              }
        }
        className="flex items-center gap-2 text-gray-500"
      >
        {icon}
        {label}
      </div>
      {extraComponent}
      {isSelected && (
        <div className="p-1">
          <FaCheck size={10} color={textColor} />
        </div>
      )}
    </motion.div>
  );
};

export default ItemWrapper;
