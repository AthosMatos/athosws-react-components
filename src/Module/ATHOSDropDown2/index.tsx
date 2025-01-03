import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { ATHOSDropDownProps } from "./interfaces";
/**
 *
 */
const transition = {
  duration: 0.3,
  ease: "easeInOut",
};

const List = ({ children }: { children: React.ReactNode }) => (
  <motion.ul
    className="min-w-24 text-gray-500"
    initial={{ height: 0 }}
    animate={{ height: "auto" }}
    exit={{ height: 0 }}
    transition={transition}
  >
    {children}
  </motion.ul>
);
const ListItem = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  const [open, setOpen] = useState(false);
  return (
    <li
      onClick={() => {
        setOpen(!open);
        onClick && onClick();
      }}
    >
      <div className={`p-2 cursor-pointer hover:bg-gray-200 flex flex-row ${open ? "bg-gray-300 " : ""}`}>{children}</div>
    </li>
  );
};
const ATHOSDropDown2 = ({ children, forceOpen, onClose, position = "top", id = v4(), labels, style }: ATHOSDropDownProps) => {
  const [open, setOpen] = useState(false);
  const BRef = useRef<HTMLDivElement>(null);
  const ARef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //if click outside of dropdown, close it
    const handleClick = (e: MouseEvent) => {
      if (BRef.current && !BRef.current.contains(e.target as Node) && ARef.current && !ARef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="dropdown dropdown-left dropdown-open ">
      <div ref={ARef} onClick={() => setOpen(!open)}>
        {children}
      </div>
      <AnimatePresence>
        {(open || forceOpen) && (
          <motion.div
            initial={{ width: 0, padding: 0 }}
            animate={{ width: "auto" }}
            exit={{ width: 0 }}
            transition={transition}
            ref={BRef}
            className={`dropdown-content menu z-[1] mr-2 overflow-hidden !p-0 bg-white rounded-md border border-gray-300 `}
          >
            <div className="p-1">
              <List>
                {labels.map((option, index) => (
                  <ListItem key={index} onClick={option.onClick}>
                    {typeof option.label === "function" ? option.label(open) : option.label}
                  </ListItem>
                ))}
              </List>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { ATHOSDropDown2 };
