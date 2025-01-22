import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ATHOSCollapseProps {
  children: React.ReactNode;

  collpasedComponent: React.ReactNode;
  onChanges?: (isOpen: boolean) => void;
  containerClassName?: string;
}

export const ATHOSCollapse = ({ children, collpasedComponent, onChanges, containerClassName: className }: ATHOSCollapseProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const onClick = () => {
    setIsSelected(!isSelected);
  };
  const close = () => {
    setIsSelected(false);
  };
  useEffect(() => {
    return () => {
      close();
    };
  }, []);

  useEffect(() => {
    onChanges && onChanges(isSelected);
  }, [isSelected]);

  return (
    <div className={className}>
      <div onClick={onClick}>{children}</div>

      <AnimatePresence>
        {isSelected && (
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
            className="flex max-h-[40vh] overflow-auto hide-scrollbar rounded-md p-1"
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
          >
            {collpasedComponent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
