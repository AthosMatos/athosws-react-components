import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

export const CollapseTransition = {
  duration: 0.35,
  ease: "circInOut",
};

interface ATHOSCollapseProps {
  children: React.ReactNode;
  collpasedComponent: React.ReactNode;
  onToggle?: (isOpen?: boolean) => void;
  position?: "top" | "bottom" | "left" | "right";
  spacing?: number;
  initialOpen?: boolean;
  collapsedClassName?: string;
  wrapperClassName?: string;
  toggleOnWrapperClick?: boolean;
  fade?: boolean;
  hideOnClickOutside?: boolean;
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
  topandbottomWithFade: {
    initial: {
      height: 0,
      opacity: 0,
    },
    animate: {
      height: "auto",
      opacity: 1,
    },
    exit: {
      height: 0,
      opacity: 0,
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
  leftandrightWithFade: {
    initial: {
      width: 0,
      opacity: 0,
    },
    animate: {
      width: "auto",
      opacity: 1,
    },
    exit: {
      width: 0,
      opacity: 0,
    },
  },
};

export const ATHOSCollapse = ({
  children,
  collpasedComponent,
  spacing,
  position = "bottom",
  onToggle,
  initialOpen,
  collapsedClassName,
  wrapperClassName,
  toggleOnWrapperClick,
  fade,
  hideOnClickOutside,
}: ATHOSCollapseProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen || false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const collapsedRef = useRef<HTMLDivElement>(null);

  const pos =
    position === "top" ? "flex-col-reverse" : position === "bottom" ? "flex-col" : position === "left" ? "flex-row-reverse" : "flex-row";

  const onClick = () => {
    if (toggleOnWrapperClick) return;
    setIsOpen(!isOpen);
    if (onToggle) {
      onToggle(!isOpen);
    }
  };
  const onWrapperClick = () => {
    if (toggleOnWrapperClick) {
      setIsOpen(!isOpen);
      if (onToggle) {
        onToggle(!isOpen);
      }
    }
  };
  if (hideOnClickOutside) {
    useClickOutside({
      callback: () => {
        setIsOpen(false);
        if (onToggle) {
          onToggle(undefined);
        }
      },
      refs: [childRef, childRef, wrapperRef],
    });
  }
  const close = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    return () => {
      close();
    };
  }, []);

  return (
    <motion.div
      style={{
        width: "fit-content",
      }}
      ref={wrapperRef}
      animate={{
        gap: isOpen ? `${spacing}px` : 0,
      }}
      onClick={onWrapperClick}
      className={`flex ${pos} ${wrapperClassName}`}
    >
      <div ref={childRef} onClick={onClick}>
        {children}
      </div>

      <motion.div
        ref={collapsedRef}
        initial="initial"
        animate={isOpen ? "animate" : "initial"}
        variants={
          position === "top" || position === "bottom"
            ? fade
              ? variants.topandbottomWithFade
              : variants.topandbottom
            : fade
            ? variants.leftandrightWithFade
            : variants.leftandright
        }
        className="flex overflow-hidden"
        transition={CollapseTransition}
      >
        <div className={`min-w-max min-h-max ${collapsedClassName}`}>{collpasedComponent}</div>
      </motion.div>

      {/* 
      MOST PERFORMANT WAY BUT SOME PROBLEMS WITH ALIGNMENT
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
      */}
    </motion.div>
  );
};
