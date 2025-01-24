import { useMemo } from "react";
import { AMOptColorsProps } from "../../interfaces";

import { HTMLMotionProps, motion } from "framer-motion";
interface ColoredDivProps extends HTMLMotionProps<"div"> {
  colors?: AMOptColorsProps;
  scaleAnim?: boolean;
}

const ColoredDiv = (props: ColoredDivProps) => {
  const { colors, children, className, scaleAnim = true } = props;
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
      {...scaleProps}
      {...props}
      className={`h-fit transition-colors text-black bg-[rgba(0,0,0,0.35)] p-2 flex items-center border-[rgba(0,0,0,0.55)] gap-2 border flex-row ${className}`}
      style={{
        color: colors?.text,
        backgroundColor: colors?.background,
        ...borderprops,
        ...props.style,
      }}
    >
      {children}
    </motion.div>
  );
};

export default ColoredDiv;
