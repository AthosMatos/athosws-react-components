import { useState } from "react";
import { FaLayerGroup } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ATHOSDropDown } from "../../../../../../ATHOSDropDown/component";
import { LabelI } from "../../../../../../ATHOSDropDown/component/interfaces";
import { ADTState } from "../../../../redux/store";
import { ItemWrapper, ListButtonClassname, ListWrapperClassname } from "../../styledWrappers";

const ADTSelectedFuncs = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { name, funcs, data, selectedRows } = useSelector((state: ADTState) => ({
    name: state.ADTPropsReducer.tableSelectedFuncs?.title,
    funcs: state.ADTPropsReducer.tableSelectedFuncs?.funcs,
    selectedRows: state.ADTSelectReducer.selectedRows,
    data: state.ADTPropsReducer.data,
  }));

  const selectedData = data.filter((row) => selectedRows.includes(row.uniqueId));

  return (
    funcs &&
    funcs.length > 0 && (
      <ATHOSDropDown
        position="left-top"
        onToggle={(isOpen) => setIsOpen(isOpen)}
        labels={funcs?.map((func) => {
          return { label: func.label, onClick: () => func.onClick(selectedData) } as LabelI;
        })}
        className={ListWrapperClassname}
        labelClassName={ListButtonClassname}
      >
        <ItemWrapper open={isOpen} label={name || "Funcionalidades em Lote"} icon={<FaLayerGroup size={16} />} />
      </ATHOSDropDown>
    )
  );
};

export default ADTSelectedFuncs;
