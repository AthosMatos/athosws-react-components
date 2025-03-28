import { FaCaretDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ADTState } from "../../../../redux/store";

const ColOrderFilter = ({ column }: { column: string }) => {
  const { orderSorted, tableStyle } = useSelector((state: ADTState) => ({
    orderSorted: state.ADTFilteringReducer.orderSorted,
    tableStyle: state.ADTPropsReducer.tableStyle,
  }));
  const isAsc = orderSorted.state === 0 && orderSorted.column === column;
  const isSorting = orderSorted.state !== -1 && orderSorted.column === column;
  return (
    isSorting && (
      <FaCaretDown
        size={12}
        className={`text-zinc-400 transition-transform duration-300 ease-in-out
   ${!isAsc ? "transform rotate-180" : ""}
     `}
        color={isSorting ? "red" : undefined}
      />
    )
  );
};

export default ColOrderFilter;
