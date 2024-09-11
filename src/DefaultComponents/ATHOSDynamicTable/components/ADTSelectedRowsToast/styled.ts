import styled from "styled-components";
import { generateColorShades, getContrastColor } from "../../../utils";

export const ADTSRTFSWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const ADTSRTIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  background-color: #f3f3f3;
  outline: 1px solid #e0e0e0;
  user-select: none;

  transition: all 0.14s;
  &:active {
    transform: scale(0.92);
  }

  &:hover {
    background-color: #e0e0e0;
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
