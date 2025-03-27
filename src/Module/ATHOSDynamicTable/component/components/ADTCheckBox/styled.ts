import { motion } from "framer-motion";
import { FaCheck, FaCircle } from "react-icons/fa";
import styled from "styled-components";
import { checkStates } from "../../redux/Select/interfaces";

export const CheckBoxWidth = "1rem";

export const ADTCheckBoxWrapper = styled(motion.div).attrs({
  className: `flex items-center justify-center 
  w-4 h-4 rounded-md border
  border-zinc-400 dark:border-zinc-500 select-none
  cursor-pointer
  `,
})<{
  checkedState: checkStates | boolean;
  big?: boolean;
  clicable?: boolean;
}>``;

/* 
 box-shadow: 0px 0px 0.2rem 1px ${ATHOSColors.white.eggshell};
        color: ${ATHOSColors.white.eggshell};
*/
// border-color: ${ATHOSColors.white.eggshell} !important;
/* ${({ checkedState, highlightColor, accentColor }) => {
    return ``;
    if (checkedState === true || checkedState === CheckState.ALL) {
      if (!highlightColor) {
        return `
          box-shadow: 0px 0px 0.2rem 1px ${ATHOSColors.grey.default};
          color: ${ATHOSColors.grey.dark};
          border-color: ${ATHOSColors.grey.dark};
        `;
      }
      return `
          box-shadow: 0px 0px 0.2rem 1px ${generateColorShades(highlightColor).darker};
          color: ${getContrastColor(highlightColor)};
          border-color: ${getContrastColor(highlightColor)};
        `;
    } else {
      return `
          box-shadow: 0px 0px 0.2rem 1px ${accentColor || ATHOSColors.grey.default};
          color: ${accentColor || ATHOSColors.grey.dark};
          border-color: ${accentColor || ATHOSColors.grey.dark};
        `;
    }
  }} */
export const ADTCheckIcon = styled(FaCheck)<{ big?: boolean }>`
  font-size: ${({ big }) => (big ? "0.7rem" : "0.5rem")};
  color: inherit;
`;

export const ADTDoubleCheckIcon = styled(FaCircle)<{ big?: boolean }>`
  font-size: ${({ big }) => (big ? "0.7rem" : "0.5rem")};
  color: inherit;
`;
