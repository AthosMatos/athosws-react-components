import { useState } from "react";
import { FaLayerGroup } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ATHOSDropDown } from "../../../../../../ATHOSDropDown/component";
import { LabelI } from "../../../../../../ATHOSDropDown/component/interfaces";
import { ADTState } from "../../../../redux/store";
import { ItemWrapper } from "../../styledWrappers";

const ADTSelectedFuncs = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { name, funcs } = useSelector((state: ADTState) => ({
    name: state.ADTPropsReducer.tableSelectedFuncs?.title,
    funcs: state.ADTPropsReducer.tableSelectedFuncs?.funcs,
  }));

  return (
    funcs &&
    funcs.length > 0 && (
      <ATHOSDropDown
        position="left-top"
        onToggle={(isOpen) => setIsOpen(isOpen)}
        labels={funcs?.map((func) => {
          return { label: func.label, onClick: func.onClick } as LabelI;
        })}
        className="rounded-md border w-max border-zinc-300 dark:border-zinc-600 text-sm dark:bg-zinc-700 bg-zinc-200 p-1 h-fit"
        labelClassName="transition-colors cursor-pointer rounded-md p-2
        hover:bg-zinc-300
        text-zinc-600 dark:text-zinc-200"
      >
        <ItemWrapper open={isOpen} label={name || "Funcionalidades em Lote"} icon={<FaLayerGroup size={16} />} />
      </ATHOSDropDown>
    )
  );
};

export default ADTSelectedFuncs;
