import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { v4 } from "uuid";
import { useClickOutside } from "../../hooks/useClickOutside";
import { ATHOSDropDownProps, HoverColorsI, isLabelWithIconType, LabelI } from "./interfaces";
/**
 *
 */
const transition = {
  duration: 0.3,
  ease: "easeInOut",
};

const ListItem = ({
  option,
  onClick,
  open,
  hoverColors,
}: {
  option: LabelI;
  onClick?: () => void;
  open: boolean;
  hoverColors?: HoverColorsI;
}) => {
  const backColor = option.hoverColors?.backColor || hoverColors?.backColor || "rgb(212, 212, 212)";
  const defaultClassName = `p-2 flex cursor-pointer rounded-md`;
  const className = isLabelWithIconType(option.label)
    ? `flex items-center gap-2 ${defaultClassName}`
    : typeof option.label === "string"
    ? `${defaultClassName}`
    : undefined;
  return (
    <motion.div
      onClick={onClick}
      className={className}
      whileHover={{
        backgroundColor: backColor,
      }}
    >
      {option.label instanceof Function ? (
        option.label(open)
      ) : isLabelWithIconType(option.label) ? (
        <>
          {option.label.icon}
          <p>{option.label.text}</p>
        </>
      ) : typeof option.label === "string" ? (
        <p className="w-max">{option.label}</p>
      ) : (
        option.label
      )}
    </motion.div>
  );
};

const ATHOSDropDown = ({
  children,
  forceOpen,

  onClose,
  position = "top-left",
  id = v4(),
  labels,
  style,
  className,

  hoverColors,
}: ATHOSDropDownProps) => {
  const [open, setOpen] = useState(false);
  const BRef = useRef<HTMLDivElement>(null);
  const ARef = useRef<HTMLDivElement>(null);
  useClickOutside({
    callback: () => {
      setOpen(false);
    },
    refs: [ARef, BRef],
  });
  const pos =
    position === "top-left"
      ? "dropdown-top dropdown-end"
      : position === "top-right"
      ? "dropdown-top"
      : position === "bottom-left"
      ? "dropdown-bottom dropdown-end"
      : position === "bottom-right"
      ? "dropdown-bottom"
      : position === "left"
      ? "dropdown-left"
      : "dropdown-right";
  return (
    <div className={`dropdown dropdown-open  ${pos}`}>
      <div className="cursor-pointer" ref={ARef} onClick={() => setOpen(!open)}>
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
            style={style}
            className={`z-50 dropdown-content menu !p-0 m-2 overflow-hidden ${className}`}
          >
            <div className="p-1 gap-1 flex flex-col">
              {labels.map((option, index) => (
                <ListItem hoverColors={hoverColors} key={index} onClick={option.onClick} option={option} open={open} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { ATHOSDropDown };
