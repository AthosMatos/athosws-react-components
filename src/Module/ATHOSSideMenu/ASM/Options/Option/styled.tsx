import { useMemo } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { BiSolidPencil } from "react-icons/bi";
import styled from "styled-components";
import {
  generateColorShades,
  getContrastColor,
} from "../../../../utils/color-utils";
import { useATHOSSideMenu } from "../../../context/context";
import { ASMOptionWrapperProps, ASMOWProps } from "./interfaces";

export const optionPad = "calc(0.6rem * 2)";
export const optionIconSize = "1.4rem";
export const ASMOW = styled.div<ASMOWProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.52rem 0.6rem;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: background-color 0.14s, color 0.14s, transform 0.14s;
  user-select: none;
  width: ${({ width }) => width};

  pointer-events: ${({ editing }) => (editing ? "none" : "auto")};

  &:hover {
    ${({ hoverback, hovercolor }) =>
      hoverback &&
      hovercolor &&
      `
      background-color: ${hoverback};
      color: ${hovercolor};
    `}
  }
  &:active {
    ${({ activeback, activecolor, scale }) =>
      activeback &&
      activecolor &&
      scale &&
      `
      background-color: ${activeback};
      color: ${activecolor};
      transform: scale(${scale});
      
    `}
  }

  ${({ dftback, dftcolor }) =>
    dftback &&
    dftcolor &&
    ` 
    background-color: ${dftback};
    color: ${dftcolor};
  `}//if editing is true animate infinity a shake effect
`;
/* ${({ editing }) =>
    editing &&
    `
    animation: shake 0.4s infinite;
    @keyframes shake {
      0% { transform: rotate(0deg); }
      25% { transform: rotate(1deg); }
      50% { transform: rotate(-1deg); }
      75% { transform: rotate(1deg); }
      100% { transform: rotate(0deg); }
    }
    `} */
export const ASMOptionWrapper = (props: ASMOptionWrapperProps) => {
  const {
    clicked,
    accentColor,
    activeColor,
    hasSelectedChildren,
    hasChildren,
    editing,
    children,
    width,
    onClick,
  } = props;
  const accentShades = generateColorShades(accentColor);
  const activeShades = generateColorShades(activeColor);

  const dft = useMemo(() => {
    if (clicked) {
      if (hasSelectedChildren) {
        return {
          backgroundColor: accentShades.dark,
          color: getContrastColor(accentShades.darker),
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
        color: getContrastColor(accentShades.darker),
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
  return (
    <ASMOW
      {...props}
      editing={editing}
      dftback={dft?.backgroundColor}
      dftcolor={dft?.color}
      activeback={active?.backgroundColor}
      activecolor={active?.color}
      hoverback={hover?.backgroundColor}
      hovercolor={hover?.color}
      onClick={onClick}
      width={width}
      scale={active?.transform}
    >
      {children}
    </ASMOW>
  );
};

const ASMOC = styled.div<{ editing: boolean; accent: string }>`
  margin: 0.2rem 0rem;
  transition: box-shadow 0.2s;
  box-shadow: ${({ editing, accent }) =>
    editing ? `0 0 0 1px ${accent}` : "none"};
  border-radius: 0.3rem;
  background-color: ${({ editing, accent }) =>
    editing ? generateColorShades(accent).light : "transparent"};
  //if editing is true animate infinity a up and down effect (floating)
`;

const ASMFade = styled.div<{ editing: boolean }>`
  opacity: ${({ editing }) => (editing ? 0.2 : 1)};
  transition: opacity 0.2s;
  display: flex;
  flex-direction: column;
`;

const EditPencilIcon = styled(BiSolidPencil)<{
  editing: boolean;
  accent: string;
}>`
  position: absolute;

  font-size: 2.4rem;

  transition: opacity 0.2s;
  opacity: ${({ editing }) => (editing ? 1 : 0)};
  color: ${({ accent }) => getContrastColor(generateColorShades(accent).light)};
`;

export const ASMOptionContainer = ({
  accent,

  children,
  provided,
  childrenHeight,
}: {
  accent: string;
  children: React.ReactNode;
  provided: DraggableProvided;
  childrenHeight: string;
}) => {
  const { editing } = useATHOSSideMenu();

  return (
    <ASMOC
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={provided.draggableProps.style}
      editing={editing}
      accent={accent}
    >
      {/*  <div
        style={{
          position: "absolute",
          display: "flex",
          flex: 1,
          width: hiddenMenuWidth,
          height: `calc((1.6rem + (0.52rem * 2)) + ${childrenHeight})`,
          pointerEvents: "none",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <EditPencilIcon accent={accent} editing={editing} />
      </div> */}
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
  position: ${({ hide, hasIcon }) =>
    hide && !hasIcon ? "absolute" : "relative"};
`;
