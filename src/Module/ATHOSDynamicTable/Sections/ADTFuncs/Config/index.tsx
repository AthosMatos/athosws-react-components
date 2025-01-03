import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaSort } from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
import { MdTune } from "react-icons/md";
import { useSelector } from "react-redux";
import { ATHOSDropDown2 } from "../../../../ATHOSDropDown2";
import { LabelI } from "../../../../ATHOSDropDown2/interfaces";
import { ADTState } from "../../../redux/store";
import { IconWrapper } from "../IconWrapper";

const ColumnsItem = () => {
  const columns = useSelector((state: ADTState) => state.ADTPropsReducer.columns);
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(!open);
  };
  return {
    label: (
      <div onClick={onClick} className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <FaTableList size={18} className="text-gray-500 text-2xl" />
          Colunas
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                height: 0,
              }}
              animate={{
                height: "auto",
              }}
              exit={{
                height: 0,
              }}
              className="!p-0 !m-0 overflow-hidden w-full bg-gray-100"
            >
              {columns.map((col, index) => (
                <div key={index} className="flex items-center gap-2 ">
                  <input type="checkbox" />
                  <p>{col}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ),
    onClick,
  };
};

const ADTConfig = () => {
  const options: LabelI[] = [
    ColumnsItem(),
    {
      label: (
        <div className="flex items-center gap-2">
          <FaSort size={18} className="text-gray-500 text-2xl" />
          {"Ordenação"}
        </div>
      ),
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
