import { useMemo } from "react";
import { AMOptColorsProps } from "../../interfaces";

import { AnimatePresence, ForwardRefComponent, HTMLMotionProps, motion } from "framer-motion";
interface ColoredDivProps extends HTMLMotionProps<"div"> {
  colors?: AMOptColorsProps;
}

const ColoredDiv = (props: ColoredDivProps) => {
  const { colors, children, className } = props;
  const borderprops = useMemo(() => {
    if (colors?.border === "none") {
      return {
        borderWidth: "1px",
        borderColor: "rgba(0,0,0,0.0)",
      };
    }
    return {
      borderWidth: colors?.border?.width,
      borderColor: colors?.border?.color,
    };
  }, [colors]);
  return (
    <motion.div
      {...props}
      className={`h-fit text-black bg-[rgba(0,0,0,0.35)] p-2 flex items-center border-[rgba(0,0,0,0.55)] gap-2 border flex-row ${className}`}
      style={{
        ...borderprops,
        color: colors?.text,
        backgroundColor: colors?.background,
        ...props.style,
      }}
    >
      {children}
    </motion.div>
  );
};

export default ColoredDiv;
