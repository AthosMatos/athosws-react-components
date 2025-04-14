import { motion } from "framer-motion";
import styled from "styled-components";

export const ADTColBorderWrapper = styled.div<{
  bold?: boolean;
}>`
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  font-weight: ${(props) => (props.bold ? 500 : 400)};
`;

interface ADTColWrapperProps {
  checkBox?: boolean;
  pLeft?: boolean;
  pRight?: boolean;
  textColor?: string;
  height?: number;
  persistent?: boolean;
}

export const ADTColumnWrapper = styled.th.attrs({
  className: "pt-2",
})<ADTColWrapperProps>`
  color: ${(props) => props.textColor};
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
    props.checkBox &&
    `
      width: 1rem;
  `}

  ${(props) =>
    props.persistent &&
    `
   /*  backdrop-filter: blur(5.6px);
    -webkit-backdrop-filter: blur(5.6px); */
    z-index: 1;
  `}
`;
export const selectedColor = "#d6f5fe";
export const ADTCellColWrapper = styled(motion.td).attrs({
  transition: {
    duration: 0.2,
  },
})<{
  persistent?: boolean;
}>`
  ${(props) =>
    props.persistent &&
    `
   /*  backdrop-filter: blur(2.6px);
    -webkit-backdrop-filter: blur(2.6px); */
    z-index: 1;
  `}
`;

export const ADTTR = styled(motion.tr)`
  text-align: left;
`;

export const persitentBorderWidth = "1px";
export const persistentBorderStyle = "solid";

export const ADTTable = styled.table`
  border-collapse: separate;
  border-spacing: 0;
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
