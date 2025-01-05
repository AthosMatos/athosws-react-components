import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { FaMinus } from "react-icons/fa";
import { FaPlus, FaTableList } from "react-icons/fa6";
import { MdTune } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ATHOSDropDown2 } from "../../../../ATHOSDropDown2";
import { LabelI } from "../../../../ATHOSDropDown2/interfaces";
import { getContrastColor } from "../../../../utils/color-utils";
import { filterColumn } from "../../../redux/Paging/provider";
import { ADTState } from "../../../redux/store";
import { IconWrapper } from "../IconWrapper";

interface ColGroupProps {
  cols: string[];
  isOn: (col: string) => boolean;
}
const ColGroup = ({ cols, isOn }: ColGroupProps) => {
  const dispatch = useDispatch();

  const filterOutCol = (col: string) => {
    dispatch(filterColumn(col));
  };
  const highlightColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.highlightColor)!;
  return (
    <div className="flex flex-col gap-2 flex-1 border border-gray-200 p-2 rounded-md h-fit">
      <AnimatePresence mode="popLayout">
        {cols.map((col, index) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            key={col}
            layout="position"
            onClick={() => filterOutCol(col)}
            className={`flex transition-opacity font-medium duration-150 ease-in-out justify-center
              cursor-pointer items-center gap-2 rounded-full p-2 bg-gray-300 ${isOn(col) ? `opacity-100` : "opacity-35"}`}
            style={{
              backgroundColor: isOn(col) ? highlightColor : "",
              color: isOn(col) ? getContrastColor(highlightColor) : "inherit",
            }}
          >
            {col}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const ColumnsItem = () => {
  const [isSelected, setIsSelected] = useState(false);
  const onClick = () => {
    setIsSelected(!isSelected);
  };
  const close = () => {
    setIsSelected(false);
  };

  const columns = useSelector((state: ADTState) => state.ADTPropsReducer.columns);
  const filteredColumns = useSelector((state: ADTState) => state.ADTFilteringReducer.filteredColumns);
  useEffect(() => {
    return () => {
      close();
    };
  }, []);

  const activeCols = useMemo(() => columns.filter((col) => filteredColumns.includes(col)), [columns, filteredColumns]);
  const inactiveCols = useMemo(() => columns.filter((col) => !filteredColumns.includes(col)), [columns, filteredColumns]);

  return (
    <div className="flex flex-col gap-2 ">
      <motion.div
        className={`flex justify-between gap-2 transition-colors p-2 cursor-pointer rounded-md active:bg-gray-300 ${
          isSelected ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
        onClick={onClick}
      >
        <div className="flex items-center gap-2">
          <FaTableList size={18} className="text-gray-500 text-2xl" />
          Colunas
        </div>
        <AnimatePresence>
          {isSelected ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 rounded-md p-1 cursor-pointer"
            >
              <FaMinus size={10} className="text-gray-500" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2  rounded-md p-1 cursor-pointer"
            >
              <FaPlus size={10} className="text-gray-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{
              height: 0,
              width: 0,
              padding: 0,
            }}
            animate={{
              height: "auto",
              width: "auto",
              padding: "0.5rem",
            }}
            exit={{
              height: 0,
              width: 0,
              padding: 0,
            }}
            className="bg-gray-100 gap-2 flex max-h-40 overflow-auto hide-scrollbar rounded-md"
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
          >
            <ColGroup cols={activeCols} isOn={(col) => filteredColumns.includes(col)} />
            <ColGroup cols={inactiveCols} isOn={(col) => filteredColumns.includes(col)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ADTConfig = () => {
  const options: LabelI[] = [
    {
      label: <ColumnsItem />,
      // onClick: onClick,
    },
  ];

  return (
    <ATHOSDropDown2 labels={options}>
      <IconWrapper>
        <MdTune className="text-2xl" />
      </IconWrapper>
    </ATHOSDropDown2>
  );
};

export default ADTConfig;
