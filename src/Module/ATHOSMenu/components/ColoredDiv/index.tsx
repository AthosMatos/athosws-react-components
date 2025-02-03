import { useMemo, useState } from "react";
import { AMOptColorsProps, ColorOptType } from "../../interfaces";

import { HTMLMotionProps, motion } from "framer-motion";
interface ColoredDivProps extends HTMLMotionProps<"div"> {
  scaleAnim?: boolean;
  selected?: boolean;
  specificColors?: AMOptColorsProps;
  colors?: ColorOptType;
  aRef?: any;
}

const ColoredDiv = (props: ColoredDivProps) => {
  const { colors, children, className, scaleAnim = true, selected, specificColors } = props;
  const [isOver, setIsOver] = useState(false);

  const cs = specificColors || (selected ? colors?.clicked : isOver ? colors?.hover : colors?.normal);
  const color = {
    text: cs?.text || colors?.defaults?.text,
    background: cs?.background || colors?.defaults?.background,
    border: cs?.border || colors?.defaults?.border,
  };
  const animProps = useMemo(() => {
    return {
      borderWidth: color?.border === "none" ? "1px" : color?.border?.width,
      borderColor: color?.border === "none" ? "rgba(0,0,0,0.0)" : color?.border?.color,
      color: color?.text,
      backgroundColor: color?.background,
    };
  }, [color]);

  const scaleProps = scaleAnim && {
    whileHover: {
      // scale: 1.01,
    },
    whileTap: {
      scale: 1.02,
    },
  };

  return (
    <motion.div
      onMouseOver={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
      {...scaleProps}
      {...props}
      ref={props.aRef}
      className={`h-fit transition-colors duration-100 ease-in-out text-black  bg-[rgba(0,0,0,0.35)] flex items-center border-[rgba(0,0,0,0.55)] border flex-row ${className}`}
      style={{
        ...props.style,
        ...animProps,
      }}
      transition={{
        duration: 0.15,
        ease: "easeInOut",
      }}
      //animate={}
    >
      {children}
    </motion.div>
  );
};

export default ColoredDiv;
