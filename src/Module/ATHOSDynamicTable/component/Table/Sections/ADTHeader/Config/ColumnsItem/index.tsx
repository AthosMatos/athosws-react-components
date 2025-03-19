import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { FaMinus } from "react-icons/fa";
import { FaPlus, FaTableList } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { ATHOSCollapse } from "../../../../../../../ATHOSCollapse";
import { ADTState } from "../../../../../redux/store";
import ItemWrapper from "../../ItemWrapper";
import ColGroup from "./ColGroup";

const PlusMinus = ({ isSelected }: { isSelected: boolean }) => {
  const textColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.textColor);

  const props = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    className: "flex items-center gap-2 rounded-md p-1 cursor-pointer",
  };
  const iconProps = {
    size: 10,
    className: "text-gray-500",
    style: { color: textColor },
  };
  return (
    <AnimatePresence>
      {isSelected ? (
        <motion.div {...props}>
          <FaMinus {...iconProps} />
        </motion.div>
      ) : (
        <motion.div {...props}>
          <FaPlus {...iconProps} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ColumnsItem = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { columns, filteredColumns } = useSelector((state: ADTState) => ({
    columns: state.ADTPropsReducer.columns,
    filteredColumns: state.ADTFilteringReducer.filteredColumns,
  }));

  const activeCols = useMemo(() => columns.filter((col) => filteredColumns.includes(col)), [columns, filteredColumns]);
  const inactiveCols = useMemo(() => columns.filter((col) => !filteredColumns.includes(col)), [columns, filteredColumns]);
  const cols = useMemo(() => [...activeCols, ...inactiveCols], [activeCols, inactiveCols]);

  return (
    <ATHOSCollapse
      containerClassName="flex flex-col gap-2 "
      onChanges={(isOpen) => setIsOpen(isOpen)}
      collpasedComponent={<ColGroup cols={cols} isOn={(col) => filteredColumns.includes(col)} />}
    >
      <ItemWrapper isOpen={isOpen} label="Colunas" extraComponent={<PlusMinus isSelected={isOpen} />} icon={<FaTableList size={18} />} />
    </ATHOSCollapse>
  );
};

export default ColumnsItem;
