import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { CheckState } from "../../redux/Select/interfaces";
import { ADTState } from "../../redux/store";
import { ADTCheckBoxProps } from "./interfaces";
import { ADTCheckBoxWrapper, ADTCheckIcon, ADTDoubleCheckIcon } from "./styled";

const ADTCheckBox = ({ checked, check, big, clicable, highlightColor }: ADTCheckBoxProps) => {
  const page = useSelector((state: ADTState) => state.ADTFilteringReducer.page);
  const selectedPages = useSelector((state: ADTState) => state.ADTSelectReducer.selectedPages);

  const isPageSelected = useMemo(() => {
    return selectedPages.includes(page);
  }, [selectedPages, page]);

  const Check = useMemo(() => {
    if (checked == CheckState.ALL) {
      return <ADTCheckIcon big={big} />;
    }
    if (checked == true) {
      return <ADTCheckIcon big={big} />;
    }
    if (typeof checked == "object" || isPageSelected) {
      return <ADTDoubleCheckIcon big={big} />;
    }

    if (checked == CheckState.NONE) {
      return null;
    }
  }, [checked, isPageSelected]);

  return (
    <ADTCheckBoxWrapper
      clicable={clicable}
      big={big}
      highlightColor={highlightColor!}
      checkedState={isPageSelected || checked}
      onClick={check}
    >
      {Check}
    </ADTCheckBoxWrapper>
  );
};

export default memo(ADTCheckBox);
