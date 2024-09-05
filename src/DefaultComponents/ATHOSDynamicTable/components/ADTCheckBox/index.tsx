import { FaCheck, FaCircle } from "react-icons/fa";
import styled from "styled-components";
import { ATHOSColors } from "../../../colors/colors";
import { generateColorShades } from "../../../utils";
import { useADTContext } from "../../context";
import { CheckState } from "../../hooks/useADTSelectedData";

const ADTCheckBoxWrapper = styled.div<{
  highlightColor: string;
  checkedState: number | boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  border: 1px solid ${ATHOSColors.grey.light};
  cursor: pointer;
  border-radius: 0.4rem;
  transition: all 0.1s;

  user-select: none;

  &:active {
    transform: scale(0.9);
  }

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

const ADTCheckIcon = styled(FaCheck)`
  font-size: 0.5rem;
  color: inherit;
`;

const ADTDoubleCheckIcon = styled(FaCircle)`
  font-size: 0.5rem;
  color: inherit;
`;

interface ADTCheckBoxDftProps {
  checked: boolean;
  check: () => void;
}

interface ADTCheckBoxAltProps {
  checked: 0 | 1 | 2;
  check: () => void;
}

type ADTCheckBoxProps = ADTCheckBoxDftProps | ADTCheckBoxAltProps;

const ADTCheckBox = ({ checked, check }: ADTCheckBoxProps) => {
  const { highlightColor } = useADTContext();

  return (
    <ADTCheckBoxWrapper
      highlightColor={highlightColor}
      checkedState={checked}
      onClick={() => {
        console.log("clicked");
        check();
      }}
    >
      {typeof checked === "boolean" ? (
        checked ? (
          <ADTCheckIcon />
        ) : null
      ) : checked == CheckState.NONE ? null : checked == CheckState.ALL ? (
        <ADTCheckIcon />
      ) : (
        <ADTDoubleCheckIcon />
      )}
    </ADTCheckBoxWrapper>
  );
};

export default ADTCheckBox;
