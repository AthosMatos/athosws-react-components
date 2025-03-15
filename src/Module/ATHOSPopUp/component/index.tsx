import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { ATHOSPopUpProps } from "./interfaces";
/**
 *
 */
const transition = {
  duration: 0.3,
  ease: "easeInOut",
};

const ATHOSPopUp = ({
  children,
  forceOpen,

  onClose,
  position = "top-center",
  className,
  contentClassName,
  contentStyle,
  content,
  style,
}: ATHOSPopUpProps) => {
  const [open, setOpen] = useState(false);
  const BRef = useRef<HTMLDivElement>(null);
  const ARef = useRef<HTMLDivElement>(null);
  useClickOutside({
    callback: () => {
      setOpen(false);
      onclose && onClose();
    },
    refs: [ARef, BRef],
  });
  /* const pos =
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
      : "dropdown-right"; */
  const pos = useMemo(() => {
    switch (position) {
      case "top-left":
        return "dropdown-top dropdown-end";
      case "top-right":
        return "dropdown-top";
      case "bottom-left":
        return "dropdown-bottom dropdown-end";
      case "bottom-right":
        return "dropdown-bottom";
      case "left":
        return "dropdown-left";
      case "right":
        return "dropdown-right";
      case "top-center":
        return "dropdown-top dropdown-center";
      case "bottom-center":
        return "dropdown-bottom dropdown-center";
    }
  }, [position]);

  const margin = useMemo(() => {
    if (position.includes("top")) return "mb-2";
    if (position.includes("bottom")) return "mt-2";
  }, [position]);
  return (
    <div className={`dropdown dropdown-open ${pos}`}>
      <div style={style} className={`cursor-pointer ${className}`} ref={ARef} onClick={() => setOpen(!open)}>
        {children}
      </div>
      <AnimatePresence>
        {(open || forceOpen) && (
          <motion.div
            ref={BRef}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={transition}
            style={contentStyle}
            className={`${contentClassName} z-50 dropdown-content menu !p-0 ${margin}`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { ATHOSPopUp };
