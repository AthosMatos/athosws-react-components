import styled from "styled-components";
import { ATHOSColors } from "../colors/colors";

export const ADTColBorderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
`;

export const ADTColumnWrapper = styled.th<{
  checkBox?: boolean;
  bRight?: boolean;
  paddingHorizontal?: number;
}>`
  font-size: 1rem;
  font-weight: 400;
  color: ${ATHOSColors.grey.dark_05};
  white-space: nowrap;
  ${(props) =>
    props.bRight &&
    `
      
    padding-left: 0.8rem;
  `}

  ${(props) =>
    props.paddingHorizontal &&
    `
    padding-left: ${props.paddingHorizontal}px;
    padding-right: ${props.paddingHorizontal}px;
  `}

  ${(props) =>
    props.checkBox &&
    `
      width: 1rem;
  `}
`;

export const ADTCellWrapper = styled.td<{
  bRightLeft?: boolean;
  vertPad?: number;
  paddingHorizontal?: number;
}>`
  font-size: 1rem;
  font-weight: 400;
  ${(props) =>
    props.bRightLeft &&
    `
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    
  `}
  ${(props) =>
    props.paddingHorizontal &&
    `
    padding-left: ${props.paddingHorizontal}px;
    padding-right: ${props.paddingHorizontal}px;
  `}
  ${(props) =>
    props.vertPad &&
    `
    padding-top: ${props.vertPad}px;
    padding-bottom: ${props.vertPad}px;
  `}
`;

export const ADTTR = styled.tr<{ height?: number }>`
  text-align: left;

  ${(props) =>
    props.height &&
    `
    height: ${props.height}px
    `}
`;

export const ADTTable = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
`;

export const ADTHeader = styled.thead`
  padding: 0.5rem;
`;

export const ADTBody = styled.tbody``;

export const ADTTableWrapper = styled.div`
  padding: 0.8rem;
  width: 100%;
`;
