import { motion } from "framer-motion";
import styled from "styled-components";
import { ATHOSColors } from "../colors/colors";

export const ADTColBorderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
`;

interface ADTColWrapperProps {
  checkBox?: boolean;
  pLeft?: boolean;
  pRight?: boolean;
  paddingHorizontal?: number;
  textColor?: string;
  height?: number;
}

export const ADTColumnWrapper = styled.th<ADTColWrapperProps>`
  font-size: 1rem;
  font-weight: 400;
  color: ${(props) => props.textColor ?? ATHOSColors.grey.dark_05};
  white-space: nowrap;

  ${(props) =>
    props.height &&
    `
    height: ${props.height}px;
  `}

  ${(props) =>
    props.pLeft &&
    `
    padding-left: 0.8rem;
  `}

  ${(props) =>
    props.pRight &&
    `
    padding-right: 0.8rem;
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

interface ADTCellWrapperProps {
  bRightLeft?: boolean;
  vertPad?: number;
  paddingHorizontal?: number;
}

export const ADTCellWrapper = styled.td<ADTCellWrapperProps>`
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

export const ADTTR = styled(motion.tr)<{ height?: number }>`
  text-align: left;

  ${(props) =>
    props.height &&
    `
    height: ${props.height}px
    `}
`;

interface ADTTableProps {
  isPersistant?: boolean;
  width?: number;
  height?: number;
  backgroundColor?: string;
  autoLockHeight?: boolean;
}

export const ADTTable = styled(motion.table)<ADTTableProps>`
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
  ${(props) =>
    props.autoLockHeight
      ? `
    height: fit-content;
  `
      : `height: ${props.height ? `${props.height}px` : "100%"};`}

  border-collapse: collapse;
  overflow: hidden;
  ${(props) =>
    props.isPersistant &&
    `
    position: absolute;
    /* pointer-events: none;
    user-select: none; */
    background-color: ${props.backgroundColor ?? "white"};
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
    width: fit-content;
   
  `}
`;

export const ADTHeader = styled.thead``;

export const ADTBody = styled.tbody``;

export const ADTTableWrapper = styled.div<{ resizable?: boolean }>`
  padding: 0.8rem;
  position: relative;
  overflow: hidden;
  ${(props) =>
    props.resizable &&
    `
    width: 100%;
    overflow:auto
  `}
`;
