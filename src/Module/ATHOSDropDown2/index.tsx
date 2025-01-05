import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { v4 } from "uuid";
import { useClickOutside } from "../hooks/useClickOutside";
import { ATHOSDropDownProps, isLabelWithIconType, LabelI } from "./interfaces";
/**
 *
 */
const transition = {
  duration: 0.3,
  ease: "easeInOut",
};

const ListItem = ({ option, onClick, open }: { option: LabelI; onClick?: () => void; open: boolean }) => {
  if (option.label instanceof Function) {
    return option.label(open);
  } else if (isLabelWithIconType(option.label)) {
    return (
      <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 rounded-md" onClick={onClick}>
        {option.label.icon}
        <p>{option.label.text}</p>
      </div>
    );
  } else if (typeof option.label === "string") {
    return (
      <div onClick={onClick} className={`p-2 cursor-pointer hover:bg-gray-200 flex flex-row`}>
        <p>{option.label}</p>
      </div>
    );
  } else return option.label;
};

const ATHOSDropDown2 = ({ children, forceOpen, onClose, position = "top", id = v4(), labels, style }: ATHOSDropDownProps) => {
  const [open, setOpen] = useState(false);
  const BRef = useRef<HTMLDivElement>(null);
  const ARef = useRef<HTMLDivElement>(null);
  useClickOutside({
    callback: () => {
      setOpen(false);
    },
    refs: [ARef, BRef],
  });

  return (
    <div className="dropdown dropdown-left dropdown-open ">
      <div ref={ARef} onClick={() => setOpen(!open)}>
        {children}
      </div>
      <AnimatePresence>
        {(open || forceOpen) && (
          <motion.div
            ref={BRef}
            initial={{ width: 0, height: 0 }}
            animate={{ width: "auto", height: "auto" }}
            exit={{ width: 0, height: 0 }}
            transition={transition}
            className={`dropdown-content menu !p-0 mr-2 overflow-hidden bg-white rounded-md border border-gray-300 text-gray-500 gap-1 flex`}
          >
            <div className="p-1">
              {labels.map((option, index) => (
                <ListItem key={index} onClick={option.onClick} option={option} open={open} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { ATHOSDropDown2 };
