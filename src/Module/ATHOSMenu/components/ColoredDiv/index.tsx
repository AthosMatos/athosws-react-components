import { useMemo, useState } from "react";
import { AMOptColorsProps, ColorOptType } from "../../interfaces";

import { HTMLMotionProps, motion } from "framer-motion";
interface ColoredDivProps extends HTMLMotionProps<"div"> {
  scaleAnim?: boolean;
  selected?: boolean;
  specificColors?: AMOptColorsProps;
  colors?: ColorOptType;
}

const ColoredDiv = (props: ColoredDivProps) => {
  const { colors, children, className, scaleAnim = true, selected, specificColors } = props;
  const [isOver, setIsOver] = useState(false);

  const color = specificColors || (selected ? colors?.clicked : isOver ? colors?.hover : colors?.normal);

  const borderWidth = useMemo(() => {
    if (color?.border === "none") {
      return "1px";
    }
    return color?.border?.width;
  }, [color]);

  const borderColor = useMemo(() => {
    if (color?.border === "none") {
      return "rgba(0,0,0,0.0)";
    }
    return color?.border?.color;
  }, [color]);

  const textColor = useMemo(() => {
    return color?.text;
  }, [color]);

  const backgroundColor = useMemo(() => {
    return color?.background;
  }, [color]);

  const scaleProps = scaleAnim && {
    whileHover: {
      // scale: 1.01,
    },
    whileTap: {
      scale: 1.03,
      transition: {
        duration: 0.15,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      onMouseOver={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
      {...scaleProps}
      {...props}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
      className={`h-fit text-black bg-[rgba(0,0,0,0.35)] p-2 flex items-center border-[rgba(0,0,0,0.55)] gap-2 border flex-row ${className}`}
      style={{
        ...props.style,
      }}
      animate={{
        backgroundColor,
        borderColor,
        borderWidth,
        color: textColor,
      }}
    >
      {children}
    </motion.div>
  );
};

export default ColoredDiv;
