import { PiCaretDownBold } from "react-icons/pi";
import styled from "styled-components";
import { generateColorShades, getContrastColor } from "../utils";
import {
  ASMColorsProps,
  ASMOptionWrapperProps,
  ASMSubOptionsWrapperProps,
} from "./interfaces";

export const ASMContainer = styled.div<ASMColorsProps>`
  display: flex;
  flex-direction: column;
  width: 15rem;
  padding: 0.6rem;
  justify-content: space-between;
  outline: 1px solid
    ${({ accentColor }) => generateColorShades(accentColor).light};
`;

export const ASMWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
`;

export const ASMOptionLabel = styled.label`
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0;
  padding: 0;
  color: inherit;
  pointer-events: none;
`;

export const ASMSubOptionLabel = styled.label`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  padding: 0;
  color: inherit;
  pointer-events: none;
`;

export const ASMLabelIconWrapper = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  pointer-events: none;
  height: 1.6rem;
`;
export const ASMIconWrapper = styled.div<{ iconSize: number | string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ iconSize }) =>
    typeof iconSize === "number" ? `${iconSize}rem ` : iconSize};
  height: ${({ iconSize }) =>
    typeof iconSize === "number" ? `${iconSize}rem ` : iconSize};

  pointer-events: none;
`;

export const defaulIconSize = "1.6rem";
export const ASMSubOptionsWrapper = styled.div<ASMSubOptionsWrapperProps>`
  display: flex;
  width: 80%;
  align-self: flex-end;
  flex-direction: column;
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  overflow: hidden;
  gap: ${({ isOpen }) => isOpen && "0.4rem"};
  transition: all 0.12s;
  padding: ${({ isOpen }) => (isOpen ? "0.4rem" : "0px")};
  height: ${({ isOpen, ChildrenHeight }) => (isOpen ? ChildrenHeight : "0px")};
`;

export const ASMOptionWrapper = styled.div<ASMOptionWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.72rem 0.8rem;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: all 0.14s;
  user-select: none;

  &:hover {
    ${({
      clicked,
      hasChildren,
      hasSelectedChildren,
      accentColor,
      activeColor,
    }) =>
      hasSelectedChildren && clicked
        ? `
        background-color: ${generateColorShades(accentColor).darker};
        color: ${getContrastColor(generateColorShades(accentColor).darker)}
        `
        : !clicked
        ? `
        background-color: ${generateColorShades(accentColor).light};
        color: ${getContrastColor(generateColorShades(accentColor).light)}
        `
        : hasChildren
        ? `
        background-color: ${generateColorShades(activeColor).darker};
        color: ${getContrastColor(generateColorShades(activeColor).darker)}
        `
        : `
        background-color: ${generateColorShades(activeColor).dark};
        color: ${getContrastColor(generateColorShades(activeColor).dark)}
        `}
  }
  &:active {
    transform: scale(1.04);
    ${({ clicked, accentColor, activeColor, hasSelectedChildren }) =>
      hasSelectedChildren
        ? `
        background-color: ${generateColorShades(accentColor).default};
        color: ${getContrastColor(generateColorShades(accentColor).default)}
        `
        : !clicked
        ? `
        background-color: ${generateColorShades(accentColor).light};
        color: ${getContrastColor(generateColorShades(accentColor).light)}
        `
        : `
        background-color: ${activeColor};
        color: ${getContrastColor(activeColor)}
        `}
  }

  ${({ clicked, hasChildren, hasSelectedChildren, accentColor, activeColor }) =>
    clicked &&
    `
         ${
           hasSelectedChildren
             ? `background-color: ${generateColorShades(accentColor).dark};
    color: ${getContrastColor(generateColorShades(accentColor).dark)}         
    `
             : hasChildren
             ? `background-color: ${generateColorShades(activeColor).dark};
      color: ${getContrastColor(
        generateColorShades(activeColor).dark
      )}           
      `
             : `background-color: ${activeColor};
      color: ${getContrastColor(activeColor)}           
      `
         }
    `}
`;

export const suboptheight = "2.6rem";

export const ASMSubOptionWrapper = styled.div<ASMOptionWrapperProps>`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  height: ${suboptheight};
  padding: 0rem 0.8rem;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: all 0.14s;
  user-select: none;
  color: #000;
  &:hover {
    ${({ clicked, accentColor, activeColor }) =>
      !clicked
        ? `
        background-color: ${generateColorShades(accentColor).light};
         color: ${getContrastColor(generateColorShades(accentColor).light)}
        `
        : `
        background-color: ${generateColorShades(activeColor).dark};
         color: ${getContrastColor(generateColorShades(accentColor).dark)}
        `}
  }
  //on click create a ripple effect
  &:active {
    ${({ clicked, accentColor, activeColor }) =>
      !clicked
        ? `
        background-color: ${generateColorShades(accentColor).light};
         color: ${getContrastColor(generateColorShades(accentColor).light)}
        `
        : `
        background-color: ${activeColor};
         color: ${getContrastColor(activeColor)}
        `}

    color: #fff;
    transform: scale(1.04);
  }

  ${({ clicked, accentColor, activeColor }) =>
    clicked &&
    `
        background-color: ${activeColor};
        color: ${getContrastColor(activeColor)}
    `}
`;

export const ASMOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ASMArrowDown = styled(PiCaretDownBold)<{ clicked: boolean }>`
  pointer-events: none;
  font-size: 1rem;
  margin-right: 0.2rem;
  transform: ${({ clicked }) => (clicked ? "rotate(180deg)" : "rotate(0deg)")};
  color: inherit;
  transition: transform 0.14s;
`;
