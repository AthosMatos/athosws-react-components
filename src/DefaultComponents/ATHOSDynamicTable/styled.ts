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
    props.checkBox &&
    `
      width: 1rem;
  `}
`;

export const ADTCellWrapper = styled.td<{ bRight?: boolean }>`
  font-size: 1rem;
  font-weight: 400;
  ${(props) =>
    props.bRight &&
    `
   
    padding-left: 0.8rem;
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
