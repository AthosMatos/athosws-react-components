import { useEffect, useState } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import styled from "styled-components";
import { ATHOSColors } from "../../../../colors/colors";
import { generateColorShades, getContrastColor } from "../../../../utils/color-utils";
import { useATHOSSideMenu } from "../../../context/context";
import { ASMOptionWrapperProps, ASMOWProps } from "./interfaces";

export const optionPad = "calc(0.6rem * 2)";
export const optionIconSize = "2.8rem";
export const ASMOW = styled.div<ASMOWProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.52rem 0.68rem;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: background-color 0.14s, color 0.14s, transform 0.14s;
  user-select: none;
  width: ${({ width }) => width};

  pointer-events: ${({ editing }) => (editing ? "none" : "auto")};

  background-color: ${({ background }) => background};
  color: ${({ textColor }) => textColor};
  transform: ${({ scale }) => `scale(${scale})`};
`;

/* 
 const dft = useMemo(() => {
    if (clicked) {
      if (hasSelectedChildren) {
        return {
          backgroundColor: accentShades.dark,
          color: getContrastColor(accentShades.dark),
        };
      } else if (hasChildren) {
        return {
          backgroundColor: activeShades.dark,
          color: getContrastColor(activeShades.dark),
        };
      } else {
        return {
          backgroundColor: activeColor,
          color: getContrastColor(activeColor),
        };
      }
    } else {
      return {
        color: getContrastColor(colors.background ?? "white"),
        //backgroundColor: "blue",
      };
    }
  }, [
    hasSelectedChildren,
    accentShades,
    activeShades,
    activeColor,
    clicked,
    hasChildren,
  ]);

  const active = useMemo(() => {
    if (editing) return null;

    if (hasSelectedChildren) {
      return {
        backgroundColor: accentShades.default,
        color: getContrastColor(accentShades.default),
        transform: 1.04,
      };
    } else if (!clicked) {
      return {
        backgroundColor: accentShades.light,
        color: getContrastColor(accentShades.light),
        transform: 1.04,
      };
    } else {
      return {
        backgroundColor: activeShades.default,
        color: getContrastColor(activeShades.default),
        transform: 1.04,
      };
    }
  }, [editing, hasSelectedChildren, accentShades, activeShades, clicked]);

  const hover = useMemo(() => {
    if (editing) return null;

    if (hasSelectedChildren && clicked) {
      return {
        backgroundColor: accentShades.darker,
        color: getContrastColor(accentShades.dark),
      };
    } else if (!clicked) {
      return {
        backgroundColor: accentShades.light,
        color: getContrastColor(accentShades.light),
      };
    } else if (hasChildren) {
      return {
        backgroundColor: activeShades.darker,
        color: getContrastColor(activeShades.darker),
      };
    } else {
      return {
        backgroundColor: activeShades.dark,
        color: getContrastColor(activeShades.dark),
      };
    }
  }, [
    editing,
    hasSelectedChildren,
    accentShades,
    activeShades,
    clicked,
    hasChildren,
  ]);
*/

export const ASMOptionWrapper = (props: ASMOptionWrapperProps) => {
  const { clicked, hasSelectedChildren, hasChildren, children, onClick, label, colorConfig } = props;

  const {
    props: { colors },
    editing,
    hideMenu,
  } = useATHOSSideMenu();

  const width = hideMenu ? "fit-content" : "auto";

  //todo create a autocolor generate when theres only primary and/or accent colors

  const [backColor, setBackColor] = useState(colorConfig?.backColor || "transparent");
  const [textColor, setTextColor] = useState(colorConfig?.textColor || (colors.background ? getContrastColor(colors.background) : "black"));
  const [isOver, setIsOver] = useState(false);
  const [scale, setScale] = useState(1);

  const setHoverColor = () => {
    if (clicked) {
      if (hasSelectedChildren) {
        const dftColor = colors.primary ? generateColorShades(colors.primary).darker : ATHOSColors.red.darker;
        setBackColor(colorConfig?.hover?.clicked?.hasSelectedChildren?.backColor || dftColor);
        setTextColor(colorConfig?.hover?.clicked?.hasSelectedChildren?.textColor || getContrastColor(dftColor));
      } else if (hasChildren) {
        const dftColor = colors.accent ? generateColorShades(colors.accent).dark : ATHOSColors.grey.dark;
        setBackColor(colorConfig?.hover?.clicked?.hasChildren?.backColor || dftColor);
        setTextColor(colorConfig?.hover?.clicked?.hasChildren?.textColor || getContrastColor(dftColor));
      } else {
        const dftColor = colors.primary ? generateColorShades(colors.primary).dark : ATHOSColors.red.dark;
        setBackColor(colorConfig?.hover?.clicked?.backColor || dftColor);
        setTextColor(colorConfig?.hover?.clicked?.textColor || getContrastColor(dftColor));
      }
    } else {
      const dftColor = colors.accent ? generateColorShades(colors.accent).default : ATHOSColors.grey.light;
      setBackColor(colorConfig?.hover?.backColor || dftColor);
      setTextColor(colorConfig?.hover?.textColor || getContrastColor(dftColor));
    }
  };

  useEffect(() => {
    if (isOver) {
      setHoverColor();
    } else {
      if (clicked) {
        if (hasChildren) {
          if (hasSelectedChildren) {
            const dftColor = colors.primary ? generateColorShades(colors.primary).dark : ATHOSColors.red.dark;
            setBackColor(colorConfig?.clicked?.hasSelectedChildren?.backColor || dftColor);
            setTextColor(colorConfig?.clicked?.hasSelectedChildren?.textColor || getContrastColor(dftColor));
          } else {
            const dftColor = colors.accent ? generateColorShades(colors.accent).light : ATHOSColors.grey.light;
            setBackColor(colorConfig?.clicked?.hasChildren?.backColor || dftColor);
            setTextColor(colorConfig?.clicked?.hasChildren?.textColor || getContrastColor(dftColor));
          }
        } else {
          const dftColor = colors.primary ? generateColorShades(colors.primary).default : ATHOSColors.red.default;
          setBackColor(colorConfig?.clicked?.backColor || dftColor);
          setTextColor(colorConfig?.clicked?.textColor || getContrastColor(dftColor));
        }
      } else {
        setBackColor(colorConfig?.backColor || "transparent");
        setTextColor(colorConfig?.textColor || (colors.background ? getContrastColor(colors.background) : "black"));
      }
    }
  }, [clicked, isOver, hasSelectedChildren, hasChildren]);

  const onOver = () => {
    setIsOver(true);
  };
  const onOut = () => {
    setIsOver(false);
  };
  const onMouseDown = () => {
    setScale(1.04);
  };
  const onMouseUp = () => {
    setScale(1);
  };

  return (
    <ASMOW
      title={hideMenu ? label : ""}
      editing={editing}
      background={backColor}
      textColor={textColor}
      onClick={onClick}
      width={width}
      scale={scale}
      onMouseOver={onOver}
      onMouseOut={onOut}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      hideMenu={hideMenu}
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

export const ASMOptionLabel = styled.label<{
  hide?: boolean;
  hasIcon: boolean;
}>`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  padding: 0;
  color: inherit;
  pointer-events: none;

  transition: opacity 0.2s;

  opacity: ${({ hide }) => (hide ? "0" : "1")};
  position: ${({ hide, hasIcon }) => (hide && !hasIcon ? "absolute" : "relative")};
  display: ${({ hide }) => (hide ? "none" : "block")};
`;
