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

  const cs = specificColors || (selected ? colors?.clicked : isOver ? colors?.hover : colors?.normal) || colors?.defaults;

  const color: AMOptColorsProps = {
    text: cs?.text || colors?.defaults?.text,
    background: cs?.background || colors?.defaults?.background,
    border: cs?.border || colors?.defaults?.border,
    className: cs?.className || colors?.defaults?.className,
    icon: cs?.icon || colors?.defaults?.icon,
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
      className={`h-fit transition-colors duration-150 flex items-center  flex-row ${className} ${color?.className}`}
      style={{
        ...props.style,
        ...animProps,
      }}
    >
      {children}
    </motion.div>
  );
};

export default ColoredDiv;
