import { PiCaretDownBold, PiCaretLeftBold } from "react-icons/pi";
import styled from "styled-components";

import { generateColorShades, getContrastColor } from "../utils/color-utils";
import { ASMOptionWrapperProps } from "./ASM/Options/Option/interfaces";
import { optionIconSize, optionPad } from "./ASM/Options/Option/styled";
import { ASMColorsProps } from "./interfaces";

export const sideMenuWidth = "15rem";
export const hiddenMenuWidth = `calc(${optionPad} + ${optionIconSize})`;

export const ASMMenuHiderWrapper = styled.div<{
  height: number;
  width: string;
}>`
  position: absolute;
  width: ${({ width }) => width};
  height: ${({ height }) => `${height}px`};
`;
export const ASMContainer = styled.div`
  flex: 1;
  overflow: auto;
`;

export const ASMOverlayWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: row;
`;
export const ASMMH = styled.div<{ accentColor: string }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: -0.5rem;
  top: calc(50% - 0.7rem);
  width: 1rem;
  height: 1.4rem;
  border-radius: 2rem;
  background-color: ${({ accentColor }) => accentColor};
  cursor: pointer;
  z-index: 3;

  transition: all 0.14s;

  &:hover {
    transform: scale(1.2);
  }

  &:active {
    transform: scale(1);
  }
`;

export const ASMExtraContainer = styled.div<{ accentColor: string }>`
  display: flex;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  outline: 1px solid
    ${({ accentColor }) => generateColorShades(accentColor).light};
`;

export const ASMC = styled.div<ASMColorsProps & { width: string }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width};
  padding: 0.6rem;
  max-width: 50vw;
  justify-content: space-between;
  transition: width 0.34s;
`;

export const ASMWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 0.4rem; */
  width: 100%;
`;

export const IconlessLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 800;
  margin: 0;
  padding: 0;
  color: inherit;

  //fade in when created
  opacity: 0;
  transition: opacity 0.14s;

  animation: fadeIn 0.14s forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
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

export const defaulIconSize = "1.4rem";

export const ASMBottomIconOptionWrapper = styled.div<ASMOptionWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: all 0.14s;
  user-select: none;
  width: fit-content;
  border-radius: 0.3rem;
  outline: 1px solid
    ${({ accentColor }) => generateColorShades(accentColor).light};
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

export const ASMArrowDown = styled(PiCaretDownBold)<{ clicked: boolean }>`
  pointer-events: none;
  font-size: 1rem;
  margin-right: 0.2rem;
  transform: ${({ clicked }) => (clicked ? "rotate(180deg)" : "rotate(0deg)")};
  color: inherit;
  transition: transform 0.14s;
`;

export const ASMArrowLeft = styled(PiCaretLeftBold)<{
  clicked?: boolean;
  activeColor: string;
}>`
  pointer-events: none;
  font-size: 1.8rem;
  transform: ${({ clicked }) => (clicked ? "rotate(180deg)" : "rotate(0deg)")};
  color: ${({ activeColor }) => activeColor};
  transition: transform 0.14s;
`;

export const BottomIconsWrapper = styled.div<{ hideMenu: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ hideMenu }) => (hideMenu ? "0.8rem 0rem;" : "0.8rem 1.2rem;")};

  transition: padding 0.14s;
`;
