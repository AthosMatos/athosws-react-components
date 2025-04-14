import { motion } from "framer-motion";
import { FaCheck, FaCircle } from "react-icons/fa";
import styled from "styled-components";
import { checkStates } from "../../redux/Select/interfaces";

export const CheckBoxWidth = "1rem";

export const ADTCheckBoxWrapper = styled(motion.div).attrs({
  className: `flex items-center justify-center 
  w-4 h-4 rounded-md border active:scale-90
  border-zinc-400 dark:border-zinc-500 select-none
  `,
})<{
  checkedState: checkStates | boolean;
  big?: boolean;
  clicable?: boolean;
}>`
  width: ${({ big }) => (big ? "1.7rem" : CheckBoxWidth)};
  height: ${({ big }) => (big ? "1.7rem" : CheckBoxWidth)};
  ${({ big }) => big && "border-radius: 0.5rem;"}
  cursor: ${({ clicable }) => (clicable != false ? "pointer" : "default")};
  transition: all 0.14s;
`;
/* 
${({ checkedState, highlightColor }) => {
    if (checkedState === true || checkedState === CheckState.ALL) {
      return `
          box-shadow: 0px 0px 0.2rem 1px ${generateColorShades(highlightColor).darker};
          color: ${generateColorShades(highlightColor).darker2};
          border-color: ${highlightColor};
        `;
    } else if (checkedState === CheckState.PAGE) {
      return `
          box-shadow: 0px 0px 0.2rem 1px ${ATHOSColors.grey.default};
          color: ${ATHOSColors.grey.dark};
          border-color: ${ATHOSColors.grey.dark};
        `;
    }
  }}
*/

export const ADTCheckIcon = styled(FaCheck)<{ big?: boolean }>`
  color: inherit;
`;

export const ADTDoubleCheckIcon = styled(FaCircle)<{ big?: boolean }>`
  color: inherit;
`;
