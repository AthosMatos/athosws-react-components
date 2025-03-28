import { motion } from "framer-motion";
import { useMemo } from "react";
import styled from "styled-components";
import { ATHOSColors } from "../../../../colors/colors";
import { generateColorShades, getContrastColor } from "../../../../utils/color-utils";
import { useATHOSSideMenu } from "../../../context/context";
import { ASMSOWProps, ASMSubOptionWrapperProps } from "./interfaces";
export const suboptheight = "2.4rem";
export const ASMSubOptionLabel = styled.label`
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
  justify-content: space-between;
  padding: 0.3rem 0.8rem;
  border-radius: 0.3rem;
  cursor: pointer;
  user-select: none;
  pointer-events: ${({ editing }) => (editing ? "none" : "auto")};
`;
export const ASMSubOptionsWrapper = styled(motion.div)`
  display: flex;
  width: 94%;
  align-self: flex-end;
  flex-direction: column;
  overflow: hidden;
`;

export const ASMSubOptionWrapper = (props: ASMSubOptionWrapperProps) => {
  const { clicked, label, hasChildren, children, onClick, colorConfig, hasSelectedChildren } = props;
  const {
    props: { colors },
    editing,
  } = useATHOSSideMenu();

  const { backcolor: hoverBackColor, textcolor: hoverTextColor } = useMemo(() => {
    let backcolor = "";
    let textcolor = "";
    if (clicked) {
      if (hasSelectedChildren) {
        const dftColor = colors.primary ? generateColorShades(colors.primary).darker2 : ATHOSColors.red.darker_2;
        backcolor = colorConfig?.hover?.clicked?.hasSelectedChildren?.backColor || dftColor;
        textcolor = colorConfig?.hover?.clicked?.hasSelectedChildren?.textColor || getContrastColor(dftColor);
      } else if (hasChildren) {
        const dftColor = colors.accent ? generateColorShades(colors.accent).darker : ATHOSColors.gray.dark;
        backcolor = colorConfig?.hover?.clicked?.hasChildren?.backColor || dftColor;
        textcolor = colorConfig?.hover?.clicked?.hasChildren?.textColor || getContrastColor(dftColor);
      } else {
        const dftColor = colors.primary ? generateColorShades(colors.primary).darker : ATHOSColors.red.dark;
        backcolor = colorConfig?.hover?.clicked?.backColor || dftColor;
        textcolor = colorConfig?.hover?.clicked?.textColor || getContrastColor(dftColor);
      }
    } else {
      const dftColor = colors.accent ? generateColorShades(colors.accent).default : ATHOSColors.gray.light;
      backcolor = colorConfig?.hover?.backColor || dftColor;
      textcolor = colorConfig?.hover?.textColor || getContrastColor(dftColor);
    }

    return { backcolor, textcolor };
  }, [clicked, hasSelectedChildren, hasChildren, colorConfig, colors]);

  const { backcolor, textcolor } = useMemo(() => {
    let backcolor = "";
    let textcolor = "";
    if (clicked) {
      if (hasChildren) {
        if (hasSelectedChildren) {
          const dftColor = colors.primary ? generateColorShades(colors.primary).darker : ATHOSColors.red.darker;
          backcolor = colorConfig?.clicked?.hasSelectedChildren?.backColor || dftColor;
          textcolor = colorConfig?.clicked?.hasSelectedChildren?.textColor || getContrastColor(dftColor);
        } else {
          const dftColor = colors.accent ? generateColorShades(colors.accent).light : ATHOSColors.gray.light;
          backcolor = colorConfig?.clicked?.hasChildren?.backColor || dftColor;
          textcolor = colorConfig?.clicked?.hasChildren?.textColor || getContrastColor(dftColor);
        }
      } else {
        const dftColor = colors.primary ? generateColorShades(colors.primary).dark : ATHOSColors.red.default;
        backcolor = colorConfig?.clicked?.backColor || dftColor;
        textcolor = colorConfig?.clicked?.textColor || getContrastColor(dftColor);
      }
    } else {
      backcolor = colorConfig?.backColor || "transparent";
      textcolor = colorConfig?.textColor || (colors.background ? getContrastColor(colors.background) : "black");
    }

    return { backcolor, textcolor };
  }, [clicked, hasSelectedChildren, hasChildren, colorConfig, colors]);

  return (
    <ASMSOW
      whileHover={{
        scale: 1.02,
        backgroundColor: hoverBackColor,
        color: hoverTextColor,
      }}
      whileTap={{ scale: 0.96 }}
      editing={editing}
      onClick={onClick}
      animate={{
        backgroundColor: backcolor,
        color: textcolor,
        // justifyContent: hideMenu ? "center" : "space-between",
      }}
      transition={{
        duration: 0.04,
        ease: "easeInOut",
      }}
    >
      {children}
    </ASMSOW>
  );
};
