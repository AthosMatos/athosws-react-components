import { motion } from "framer-motion";
import { PiCaretDownBold, PiCaretLeftBold } from "react-icons/pi";
import styled from "styled-components";
import { generateColorShades } from "../utils/color-utils";

export const sideMenuWidth = "15rem";

export const ASMContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
export const ASMExtraContainer = styled.div<{ accentColor: string }>`
  display: flex;
  height: 100%;
  min-width: fit-content;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: 1px solid ${({ accentColor }) => generateColorShades(accentColor).light};
`;
export const ASMOverlayWrapper = styled.div<{ overlayFitScreen?: boolean }>`
  display: flex;
  flex-direction: row;
  ${({ overlayFitScreen }) =>
    overlayFitScreen
      ? `
  height: 100vh;
  width: 100vw;
  `
      : `
  height: 100%;
  width: 100%;

`}
`;

export const ASMLabelIconWrapper = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  pointer-events: none;
  height: 1.6rem;
  overflow: hidden;
`;
export const ASMIconWrapper = styled(motion.div)<{ iconSize: number | string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ iconSize }) => (typeof iconSize === "number" ? `${iconSize}rem ` : iconSize)};
  height: ${({ iconSize }) => (typeof iconSize === "number" ? `${iconSize}rem ` : iconSize)};

  pointer-events: none;
`;

export const defaulIconSize = "1.4rem";

export const ASMBottomIconOptionWrapper = styled.div`
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
`;
/* outline: 1px solid
    ${({ accentColor }) => generateColorShades(accentColor).light}; */
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

export const BottomIconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
