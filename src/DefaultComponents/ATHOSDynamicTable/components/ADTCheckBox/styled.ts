import { FaCheck, FaCircle } from "react-icons/fa";
import styled from "styled-components";
import { ATHOSColors } from "../../../colors/colors";
import { generateColorShades } from "../../../utils";
import { CheckState } from "../../hooks/useADTSelectedData";

export const ADTCheckBoxWrapper = styled.div<{
  highlightColor: string;
  checkedState: number | boolean;
  big?: boolean;
  clicable?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ big }) => (big ? "1.5rem" : "1rem")};
  height: ${({ big }) => (big ? "1.5rem" : "1rem")};
  border: 1px solid ${ATHOSColors.grey.light};
  cursor: ${({ clicable }) => (clicable != false ? "pointer" : "default")};
  border-radius: 0.4rem;
  transition: all 0.1s;

  user-select: none;

  ${({ clicable }) =>
    clicable != false &&
    `
    &:active {
      transform: scale(0.9);
    }
  `}

  ${({ checkedState, highlightColor }) => {
    if (checkedState === true || checkedState === CheckState.ALL) {
      return `
          box-shadow: 0px 0px 0.2rem 1px ${highlightColor};
          color: ${generateColorShades(highlightColor).darker};
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
`;

export const ADTCheckIcon = styled(FaCheck)<{ big?: boolean }>`
  font-size: ${({ big }) => (big ? "0.7rem" : "0.5rem")};
  color: inherit;
`;

export const ADTDoubleCheckIcon = styled(FaCircle)<{ big?: boolean }>`
  font-size: ${({ big }) => (big ? "0.7rem" : "0.5rem")};
  color: inherit;
`;
