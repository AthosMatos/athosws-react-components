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
  bLeft?: boolean;
}

export const ADTCellWrapper = styled(motion.td)<ADTCellWrapperProps>`
  font-size: 1rem;
  font-weight: 400;
  ${(props) =>
    props.bLeft &&
    `
      padding-left: 0.8rem;
    `}
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

export const bWidth = "2px";
export const borderStyle = "solid";

export const ADTTable = styled(motion.table)`
  border-collapse: separate;
  border-spacing: 0px;
  width: 100%;
`;

export const ADTHeader = styled.thead``;

export const ADTBody = styled.tbody``;

export const ADTTableWrapper = styled.div<{ resizable?: boolean }>`
  padding: 0.8rem;
  position: relative;
  overflow: auto;
  ${(props) =>
    props.resizable &&
    `
    width: 100%;
  `}
`;
