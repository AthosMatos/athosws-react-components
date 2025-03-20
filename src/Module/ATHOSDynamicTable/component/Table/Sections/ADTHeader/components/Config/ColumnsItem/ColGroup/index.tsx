import { AnimatePresence, motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { generateColorShades, getContrastColor } from "../../../../../../../../../utils/color-utils";
import { filterColumns } from "../../../../../../../redux/Filtering/provider";
import { ADTState } from "../../../../../../../redux/store";

interface ColGroupProps {
  cols: string[];
  isOn: (col: string) => boolean;
}
const ColGroup = ({ cols, isOn }: ColGroupProps) => {
  const dispatch = useDispatch();

  const filterOutCol = (col: string) => {
    dispatch(filterColumns(col));
  };
  const highlightColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.highlightColor)!;
  const accentColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.accentColor)!;
  return (
    <div
      style={{
        borderColor: accentColor && generateColorShades(accentColor).light,
      }}
      className="flex flex-col gap-2 flex-1 border border-gray-200 p-2 rounded-md h-fit"
    >
      <AnimatePresence mode="popLayout">
        {cols.map((col, index) => (
          <motion.div
            key={col}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            layout="position"
            onClick={() => filterOutCol(col)}
            className={`flex transition-opacity font-medium duration-150 ease-in-out 
                cursor-pointer items-center gap-2 rounded-md p-2 bg-gray-300 ${isOn(col) ? `opacity-100` : "opacity-35 justify-center"}`}
            style={{
              backgroundColor: isOn(col) ? highlightColor : "",
              //color: isOn(col) ? getContrastColor(highlightColor) : "inherit",
            }}
          >
            {isOn(col) && (
              <FaCheck
                size={12}
                style={{
                  color: isOn(col) ? getContrastColor(highlightColor) : "inherit",
                }}
              />
            )}

            <p className={`${isOn(col) ? `text-white` : "text-gray-600"}`}>{col}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ColGroup;
