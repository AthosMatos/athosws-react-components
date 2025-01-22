import { motion } from "framer-motion";
import { useMemo } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import styled from "styled-components";
import { ATHOSColors } from "../../../../colors/colors";
import { generateColorShades, getContrastColor } from "../../../../utils/color-utils";
import { useATHOSSideMenu } from "../../../context/context";
import { ASMOptionWrapperProps, ASMOWProps } from "./interfaces";

export const IconlessLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 800;
  margin: 0;
  padding: 0;
  color: inherit;
`;

const ASMOW = styled(motion.div)<ASMOWProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.52rem 0.68rem;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: background-color 0.14s, color 0.14s, transform 0.14s;
  user-select: none;

  pointer-events: ${({ editing }) => (editing ? "none" : "auto")};
`;

export const ASMOptionWrapper = (props: ASMOptionWrapperProps) => {
  const { clicked, hasSelectedChildren, hasChildren, children, onClick, label, colorConfig } = props;

  const {
    props: { colors },
    editing,
    hideMenu,
  } = useATHOSSideMenu();

  const { backcolor: hoverBackColor, textcolor: hoverTextColor } = useMemo(() => {
    let backcolor = "";
    let textcolor = "";
    if (clicked) {
      if (hasSelectedChildren) {
        const dftColor = colors.primary ? generateColorShades(colors.primary).darker : ATHOSColors.red.darker;
        backcolor = colorConfig?.hover?.clicked?.hasSelectedChildren?.backColor || dftColor;
        textcolor = colorConfig?.hover?.clicked?.hasSelectedChildren?.textColor || getContrastColor(dftColor);
      } else if (hasChildren) {
        const dftColor = colors.accent ? generateColorShades(colors.accent).dark : ATHOSColors.grey.dark;
        backcolor = colorConfig?.hover?.clicked?.hasChildren?.backColor || dftColor;
        textcolor = colorConfig?.hover?.clicked?.hasChildren?.textColor || getContrastColor(dftColor);
      } else {
        const dftColor = colors.primary ? generateColorShades(colors.primary).dark : ATHOSColors.red.dark;
        backcolor = colorConfig?.hover?.clicked?.backColor || dftColor;
        textcolor = colorConfig?.hover?.clicked?.textColor || getContrastColor(dftColor);
      }
    } else {
      const dftColor = colors.accent ? generateColorShades(colors.accent).default : ATHOSColors.grey.light;
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
          const dftColor = colors.primary ? generateColorShades(colors.primary).dark : ATHOSColors.red.dark;
          backcolor = colorConfig?.clicked?.hasSelectedChildren?.backColor || dftColor;
          textcolor = colorConfig?.clicked?.hasSelectedChildren?.textColor || getContrastColor(dftColor);
        } else {
          const dftColor = colors.accent ? generateColorShades(colors.accent).light : ATHOSColors.grey.light;
          backcolor = colorConfig?.clicked?.hasChildren?.backColor || dftColor;
          textcolor = colorConfig?.clicked?.hasChildren?.textColor || getContrastColor(dftColor);
        }
      } else {
        const dftColor = colors.primary ? generateColorShades(colors.primary).default : ATHOSColors.red.default;
        backcolor = colorConfig?.clicked?.backColor || dftColor;
        textcolor = colorConfig?.clicked?.textColor || getContrastColor(dftColor);
      }
    } else {
      backcolor = colorConfig?.backColor || "transparent";
      textcolor = colorConfig?.textColor || (colors.background ? getContrastColor(colors.background) : "black");
    }

    return { backcolor, textcolor };
  }, [clicked, hasSelectedChildren, hasChildren, colorConfig, colors]);

  //  justify-content: space-between;
  return (
    <ASMOW
      whileHover={{
        scale: 1.02,
        backgroundColor: hoverBackColor,
        color: hoverTextColor,
      }}
      whileTap={{ scale: 0.96 }}
      title={hideMenu ? label : ""}
      editing={editing}
      onClick={onClick}
      hideMenu={hideMenu}
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
    </ASMOW>
  );
};

const ASMOC = styled.div<{
  editing: boolean;
  backColor: string;
  // textColor: string;
}>`
  margin: 0.2rem 0rem;
  transition: box-shadow 0.2s;
  box-shadow: ${({ editing, backColor }) => (editing ? `0 0 0 1px ${generateColorShades(backColor).darker}` : "none")};
  border-radius: 0.3rem;
  background-color: ${({ editing, backColor }) => (editing ? backColor : "transparent")};

  //if editing is true animate infinity a up and down effect (floating)
`;
//color: ${({ textColor }) => textColor};
const ASMFade = styled.div<{ editing: boolean }>`
  opacity: ${({ editing }) => (editing ? 0.2 : 1)};
  transition: opacity 0.2s;
  display: flex;
  flex-direction: column;
`;

export const ASMOptionContainer = ({
  backColor,
  //textColor,
  children,
  provided,
}: {
  backColor: string;
  children: React.ReactNode;
  provided: DraggableProvided;
  //textColor: string;
}) => {
  const { editing } = useATHOSSideMenu();

  return (
    <ASMOC
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={provided.draggableProps.style}
      editing={editing}
      backColor={backColor}
      // textColor={textColor}
    >
      <ASMFade editing={editing}>{children}</ASMFade>
    </ASMOC>
  );
};

export const ASMOptionLabel = styled(motion.label)<{
  hide?: boolean;
  hasIcon: boolean;
}>`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  padding: 0;
  color: inherit;
  pointer-events: none;
  width: max-content;
`;
