import { AnimatePresence } from "framer-motion";
import { FaCaretDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ADTState } from "../../../../redux/store";

const ColOrderFilter = ({ column }: { column: string }) => {
  const { showColFilter, orderSorted, tableStyle } = useSelector((state: ADTState) => ({
    showColFilter: state.ADTFilteringReducer.showColOrderFilter,
    orderSorted: state.ADTFilteringReducer.orderSorted,
    tableStyle: state.ADTPropsReducer.tableStyle,
  }));
  const isAsc = orderSorted.state === 0 && orderSorted.column === column;
  const isSorting = orderSorted.state !== -1 && orderSorted.column === column;
  return (
    <AnimatePresence>
      {showColFilter && (
        <FaCaretDown
          size={12}
          className={`text-gray-400 ${!isSorting ? "opacity-25" : ""} transition-transform duration-300 ease-in-out
       ${!isAsc ? "transform rotate-180" : ""}
         `}
          color={isSorting ? tableStyle?.highlightColor : undefined}
        />
      )}
    </AnimatePresence>
  );
};

export default ColOrderFilter;
