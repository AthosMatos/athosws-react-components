import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ATHOSCollapseProps {
  children: React.ReactNode;
  collpasedComponent: React.ReactNode;
  onOpen?: (isOpen: boolean) => void;
  position?: "top" | "bottom" | "left" | "right";
  spacing?: number;
  initialOpen?: boolean;
  collapsedClassName?: string;
}

const variants = {
  topandbottom: {
    initial: {
      height: 0,
    },
    animate: {
      height: "auto",
    },
    exit: {
      height: 0,
    },
  },
  leftandright: {
    initial: {
      width: 0,
    },
    animate: {
      width: "auto",
    },
    exit: {
      width: 0,
    },
  },
};

export const ATHOSCollapse = ({
  children,
  collpasedComponent,
  spacing,
  position = "bottom",
  onOpen: onChanges,
  initialOpen,
  collapsedClassName,
}: ATHOSCollapseProps) => {
  const [isSelected, setIsSelected] = useState(initialOpen || false);

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

  const pos =
    position === "top" ? "flex-col-reverse" : position === "bottom" ? "flex-col" : position === "left" ? "flex-row-reverse" : "flex-row";

  return (
    <div
      style={{
        gap: spacing,
      }}
      className={`flex ${pos}`}
    >
      <div onClick={onClick}>{children}</div>

      <AnimatePresence initial={false}>
        {isSelected && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={position === "top" || position === "bottom" ? variants.topandbottom : variants.leftandright}
            className="flex overflow-hidden"
            transition={{
              duration: 0.35,
              ease: "circInOut",
            }}
          >
            <div className={`min-w-max min-h-max ${collapsedClassName}`}>{collpasedComponent}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
