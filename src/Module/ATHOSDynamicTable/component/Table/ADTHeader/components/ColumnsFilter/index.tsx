import { useMemo, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ATHOSPopUp } from "../../../../../../ATHOSPopUp/component";
import { ADTState } from "../../../../redux/store";
import { ItemWrapper } from "../../styledWrappers";
import ColGroup from "./ColGroup";

const ADTColumnsFilter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { columns, filteredColumns, name } = useSelector((state: ADTState) => ({
    columns: state.ADTPropsReducer.columns,
    filteredColumns: state.ADTFilteringReducer.filteredColumns,
    name: state.ADTPropsReducer.tableFilterName,
  }));

  const activeCols = useMemo(() => columns?.filter((col) => filteredColumns.includes(col)) || [], [columns, filteredColumns]);
  const inactiveCols = useMemo(() => columns?.filter((col) => !filteredColumns.includes(col)) || [], [columns, filteredColumns]);
  const cols = useMemo(() => [...activeCols, ...inactiveCols], [activeCols, inactiveCols]);

  return (
    <ATHOSPopUp
      position="left-top"
      onToggle={(isOpen) => setIsOpen(isOpen)}
      contentClassName="flex flex-col flex-1 rounded-md border w-max border-zinc-300 dark:border-zinc-600 text-sm dark:bg-zinc-700 bg-zinc-200 p-1 h-fit"
      content={<ColGroup cols={cols} isOn={(col) => filteredColumns.includes(col)} />}
    >
      <ItemWrapper open={isOpen} label={name || "Filtrar Colunas"} icon={<FaFilter size={16} />} />
    </ATHOSPopUp>
  );
};

export default ADTColumnsFilter;
