import { AnimatePresence, motion } from "framer-motion";
import { GrStatusDisabled, GrStatusGood } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { filterColumns } from "../../../../../redux/Filtering/provider";
import ListButtons from "../../ListButtons";

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
        <ListButtons key={col} className={isOn(col) ? `opacity-100 ` : "opacity-35 "} onClick={() => filterOutCol(col)}>
          {isOn(col) ? <GrStatusGood size={12} /> : <GrStatusDisabled size={12} />}

          {col}
        </ListButtons>
      ))}
    </AnimatePresence>
  );
};

export default ColGroup;
