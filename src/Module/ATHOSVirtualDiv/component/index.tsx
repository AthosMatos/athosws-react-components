import { AnimatePresence, motion } from "framer-motion";
import React, { ReactElement, useEffect, useRef, useState } from "react";

export const ATHOSVirtualDiv = ({
  children,
  className,
  style,
  offset = 100,
  viewportId,
}: {
  children: ReactElement;
  className?: string;
  style?: React.CSSProperties;
  offset?: number;
  viewportId?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);

  function isInViewport() {
    if (!ref.current) return false;
    //if is in viewport with a 100px offset
    let innerHeight = window.innerHeight;
    let innerWidth = window.innerWidth;
    const rect = ref.current.getBoundingClientRect();
    let top = rect.top;
    let left = rect.left;
    let bottom = rect.bottom;
    let right = rect.right;
    const viewport = document.getElementById(viewportId);
    if (viewport) {
      innerHeight = viewport.clientHeight;
      innerWidth = viewport.clientWidth;
      const viewportRect = viewport.getBoundingClientRect();
      top = rect.top - viewportRect.top;
      left = rect.left - viewportRect.left;
      bottom = rect.bottom - viewportRect.top;
      right = rect.right - viewportRect.left;
    }

    return top >= -offset && left >= -offset && bottom <= innerHeight + offset && right <= innerWidth;
  }

  useEffect(() => {
    const handleScroll = () => {
      if (isInViewport()) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    handleScroll();
    let viewport: any = window;
    if (viewportId) viewport = document.getElementById(viewportId);
    viewport.addEventListener("scroll", handleScroll);

    return () => {
      viewport.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
