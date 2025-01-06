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
  const className = isLabelWithIconType(option.label)
    ? "flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 rounded-md"
    : typeof option.label === "string"
    ? "p-2 cursor-pointer hover:bg-gray-200 flex flex-row"
    : undefined;
  return (
    <div onClick={onClick} className={className}>
      {option.label instanceof Function ? (
        option.label(open)
      ) : isLabelWithIconType(option.label) ? (
        <>
          {option.label.icon}
          <p>{option.label.text}</p>
        </>
      ) : typeof option.label === "string" ? (
        <p>{option.label}</p>
      ) : (
        option.label
      )}
    </div>
  );
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
