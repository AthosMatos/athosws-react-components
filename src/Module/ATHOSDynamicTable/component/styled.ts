import { motion } from "framer-motion";
import styled from "styled-components";
import { ATHOSColors } from "../../colors/colors";

export const ADTColBorderWrapper = styled.div<{
  bold?: boolean;
}>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  ${(props) =>
    props.bold &&
    `
    font-weight: 500;
  `}
`;

interface ADTColWrapperProps {
  checkBox?: boolean;
  pLeft?: boolean;
  pRight?: boolean;
  paddingHorizontal?: number;
  paddingBottom?: number;
  textColor?: string;
  height?: number;
  persistent?: boolean;
}

export const ADTColumnWrapper = styled.th<ADTColWrapperProps>`
  font-size: 1rem;
  font-weight: 400;
  color: ${(props) => props.textColor ?? ATHOSColors.grey.dark_05};
  white-space: nowrap;
  user-select: none;

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
    props.paddingBottom &&
    `
    padding-bottom: ${props.paddingBottom}px;
  `}

  ${(props) =>
    props.checkBox &&
    `
      width: 1rem;
  `}

  ${(props) =>
    props.persistent &&
    `
    backdrop-filter: blur(5.6px);
    -webkit-backdrop-filter: blur(5.6px);
    z-index: 1;
  `}
`;

export const ADTCellWrapper = styled.td<{
  persistent?: boolean;
}>`
  font-size: 1rem;
  font-weight: 400;

  ${(props) =>
    props.persistent &&
    `
    backdrop-filter: blur(5.6px);
    -webkit-backdrop-filter: blur(5.6px);
    z-index: 1;
  `}
`;

export const ADTTR = styled(motion.tr)`
  text-align: left;
`;

export const persitentBorderWidth = "1px";
export const persistentBorderStyle = "solid";

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
