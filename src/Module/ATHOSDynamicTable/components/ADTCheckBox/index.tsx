import { memo, useMemo } from "react";
import { CheckState } from "../../redux/Select/interfaces";
import { ADTCheckBoxProps } from "./interfaces";
import { ADTCheckBoxWrapper, ADTCheckIcon, ADTDoubleCheckIcon } from "./styled";

const ADTCheckBox = ({ checked, check, big, clicable, highlightColor }: ADTCheckBoxProps) => {
  const Check = useMemo(() => {
    switch (checked) {
      case CheckState.ALL:
        return <ADTCheckIcon big={big} />;
      case true:
        return <ADTCheckIcon big={big} />;
      case CheckState.PAGE:
        return <ADTDoubleCheckIcon big={big} />;
      case CheckState.NONE:
        return null;
      default:
        return null;
    }
  }, [checked]);

  return (
    <ADTCheckBoxWrapper clicable={clicable} big={big} highlightColor={highlightColor!} checkedState={checked} onClick={check}>
      {Check}
    </ADTCheckBoxWrapper>
  );
};

export default memo(ADTCheckBox);
