import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "../hooks/useClickOutside";
import { ATHOSModalProps } from "./interfaces";

export const ATHOSModal: React.FC<ATHOSModalProps> = (props: ATHOSModalProps) => {
  const { children, show, hide, backdrop = "rgba(255, 255, 255, 0.5)", blur = "sm" } = props;
  const ARef = useRef<HTMLDivElement>(null);
  useClickOutside({
    callback: () => {
      hide && hide();
    },
    refs: [ARef],
  });
  const bgblur =
    blur === "sm"
      ? "backdrop-blur-sm"
      : blur === "md"
      ? "backdrop-blur-md"
      : blur === "lg"
      ? "backdrop-blur-lg"
      : blur === "xl"
      ? "backdrop-blur-xl"
      : blur === "2xl"
      ? "backdrop-blur-2xl"
      : blur === "3xl"
      ? "backdrop-blur-3xl"
      : "backdrop-blur-none";
  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          style={{ backgroundColor: backdrop }}
          className={`fixed ${bgblur} top-0 z-[99999] flex items-center justify-center w-screen h-screen`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-fit h-fit" ref={ARef}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
