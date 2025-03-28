import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ATHOSColors } from "../../../../colors/colors";
import { forceOpacity, generateColorShades, getContrastColor } from "../../../../utils/color-utils";
import { useATHOSSideMenu } from "../../../context/context";
import { ASMSOWProps, ASMSubOptionWrapperProps } from "../SubOption/interfaces";
export const suboptheight = "2.4rem";
export const ASMSubSubOptionLabel = styled.label`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  padding: 0;
  color: inherit;
  pointer-events: none;
  width: max-content;
`;

const ASMSOW = styled(motion.div)<ASMSOWProps>`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  padding: 0.2rem 0.8rem;
  border-radius: 0.2rem;
  cursor: pointer;
  user-select: none;
  pointer-events: ${({ editing }) => (editing ? "none" : "auto")};
`;
export const ASMSubSubOptionsWrapper = styled(motion.div)`
  display: flex;
  width: 94%;
  align-self: flex-end;
  flex-direction: column;
  overflow: hidden;
`;

export const ASMSubSubOptionWrapper = (props: ASMSubOptionWrapperProps) => {
  const { clicked, label, children, onClick, colorConfig } = props;

  const {
    props: { colors },
    editing,
  } = useATHOSSideMenu();

  const [backColor, setBackColor] = useState(colorConfig?.backColor || "rgba(0,0,0,0)");
  const [borderColor, setBorderColor] = useState(backColor);
  const [textColor, setTextColor] = useState(colorConfig?.textColor || (colors.background ? getContrastColor(colors.background) : "black"));
  const [isOver, setIsOver] = useState(false);

  const setHoverColor = () => {
    if (clicked) {
      const dftColor = colors.primary ? generateColorShades(colors.primary).darker : ATHOSColors.red.darker;
      setBackColor(colorConfig?.hover?.clicked?.backColor || dftColor);
      setTextColor(colorConfig?.hover?.clicked?.textColor || getContrastColor(dftColor));
    } else {
      const dftColor = colors.accent ?? ATHOSColors.gray.light;
      setBackColor(colorConfig?.hover?.backColor || dftColor);
      setTextColor(colorConfig?.hover?.textColor || getContrastColor(dftColor));
    }
  };

  const setClickedColor = () => {
    if (clicked) {
      const dftColor = colors.primary ? generateColorShades(colors.primary).default : ATHOSColors.red.default;
      const dftBackColor = forceOpacity(dftColor, 0.1);
      setBackColor(colorConfig?.clicked?.backColor || dftBackColor);
      setTextColor(colorConfig?.clicked?.textColor || dftColor);
      setBorderColor(dftColor);
    } else {
      setBackColor(colorConfig?.backColor || "transparent");
      setTextColor(colorConfig?.textColor || (colors.background ? getContrastColor(colors.background) : "black"));
      setBorderColor("transparent");
    }
  };

  useEffect(() => {
    if (isOver) {
      setHoverColor();
    } else {
      setClickedColor();
    }
  }, [clicked, isOver]);

  const onOver = () => {
    setIsOver(true);
  };
  const onOut = () => {
    setIsOver(false);
  };

  return (
    <ASMSOW
      editing={editing}
      onMouseOver={onOver}
      onMouseOut={onOut}
      onClick={onClick}
      whileHover={{
        scale: 1.02,
      }}
      animate={{
        backgroundColor: backColor,
        color: textColor,
        border: `1px solid ${borderColor}`,
      }}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </ASMSOW>
  );
};
