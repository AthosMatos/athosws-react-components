import styled from "styled-components";
import {
  generateColorShades,
  getContrastColor,
} from "../../../utils/color-utils";

/* 
export const ATWrapper = styled(motion.div)`
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
  padding: 8px 14px;
  border-radius: 8px;
  pointer-events: auto;
  transition: all 0.14s;

  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.4);

  background-color: white;
`;
*/

export const ADTATWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
  padding: 8px 14px;
  border-radius: 8px;

  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.4);

  background-color: white;
`;

export const ADTSRTFSWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const ADTSRTIconWrapper = styled.div<{ backColor: string; pad: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.pad}px;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${(props) => props.backColor};
  /* outline: 1px solid ${(props) =>
    generateColorShades(props.backColor).dark}; */
  user-select: none;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
  transition: all 0.14s;
  &:active {
    transform: scale(0.92);
  }

  &:hover {
    background-color: ${(props) => generateColorShades(props.backColor).dark};
  }
`;

export const ADTSRTMainFunc = styled.div<{ highlightColor: string }>`
  background-color: ${(props) => props.highlightColor};
  padding: 8px 18px;
  font-size: 1rem;
  border-radius: 6px;
  font-weight: 500;
  color: ${(props) => getContrastColor(props.highlightColor)};
  cursor: pointer;

  transition: all 0.14s;

  &:active {
    transform: scale(0.92);
  }

  &:hover {
    ${(props) => {
      const bColor = generateColorShades(props.highlightColor).dark;
      const color = getContrastColor(bColor);

      return `background-color: ${bColor}; color: ${color};`;
    }};
  }
`;

export const ADTSRTLabel = styled.label`
  font-size: 1rem;
`;
