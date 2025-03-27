import { AnimatePresence, motion } from "framer-motion";
import { GrStatusDisabled, GrStatusGood } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { filterColumns } from "../../../../../redux/Filtering/provider";

interface ColGroupProps {
  cols: string[];
  isOn: (col: string) => boolean;
}
const ColGroup = ({ cols, isOn }: ColGroupProps) => {
  const dispatch = useDispatch();

  const filterOutCol = (col: string) => {
    dispatch(filterColumns(col));
  };

  return (
    <AnimatePresence mode="popLayout">
      {cols.map((col, index) => (
        <motion.div
          key={col}
          layout="position"
          transition={{
            duration: 0.25,
          }}
          onClick={() => filterOutCol(col)}
          className={`flex transition-colors
                cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-zinc-300
                text-zinc-600 dark:text-zinc-200
                ${isOn(col) ? `opacity-100 ` : "opacity-35 "}`}
        >
          {isOn(col) ? <GrStatusGood size={12} /> : <GrStatusDisabled size={12} />}

          {col}
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default ColGroup;
