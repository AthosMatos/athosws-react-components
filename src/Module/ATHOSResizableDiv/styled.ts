import { TbResize } from "react-icons/tb";
import styled from "styled-components";
import { ATHOSColors } from "../colors/colors";

export const highlightBorder = (color?: string) => `3px solid ${color || ATHOSColors.aqua.default}`;

interface RDWrapperProps {
  width?: string | number;
  height?: string | number;
  showBorder?: boolean;
}

export const RDContainer = styled.div<RDWrapperProps>`
  //overflow: auto;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  // max-width: 94vw;

  ${({ showBorder }) =>
    showBorder &&
    `
  border-right: ${highlightBorder()};
  border-bottom: ${highlightBorder()};
  border-radius: 0.5rem;
  `}

  transition: border 0.08s, border-radius 0.08s;
`;
export const RDWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
export const RDPreWrapper = styled.div<{ withToogle?: boolean }>`
  ${(props) =>
    props.withToogle &&
    `
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: fit-content;
    height: fit-content;
    gap: 0.5rem;
    `}
`;
export const RDDot = styled.div`
  width: 4px;
  height: 4px;
  background-color: ${ATHOSColors.aqua.default};
  border-radius: 50%;
`;

export const RDResizeIcon = styled(TbResize)<{ toogle: boolean }>`
  width: 20px;
  height: 20px;
  color: ${ATHOSColors.grey.default};
  cursor: pointer;
  opacity: 0.5;

  transition: opacity 0.14s;

  ${(props) =>
    props.toogle &&
    `
        opacity: 1;
         color: ${ATHOSColors.aqua.default};
       
    `}
`;
