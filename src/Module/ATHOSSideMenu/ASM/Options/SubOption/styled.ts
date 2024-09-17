import styled from "styled-components";
import {
  generateColorShades,
  getContrastColor,
} from "../../../../utils/color-utils";
import { ASMOptionWrapperProps } from "../Option/interfaces";
import { ASMSubOptionsWrapperProps } from "./interfaces";

export const ASMSubOptionLabel = styled.label`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  padding: 0;
  color: inherit;
  pointer-events: none;
`;
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

export const suboptheight = "2.4rem";

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

  pointer-events: ${({ editing }) => (editing ? "none" : "auto")};
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
