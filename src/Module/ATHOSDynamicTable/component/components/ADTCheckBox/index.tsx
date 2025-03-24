import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { CheckState } from "../../redux/Select/interfaces";
import { ADTState } from "../../redux/store";
import { ADTCheckBoxProps } from "./interfaces";
import { ADTCheckBoxWrapper, ADTCheckIcon, ADTDoubleCheckIcon } from "./styled";

const ADTCheckBox = ({ checked, check, big, clicable, isRow }: ADTCheckBoxProps) => {
  const page = useSelector((state: ADTState) => state.ADTFilteringReducer.page);
  const selectedPages = useSelector((state: ADTState) => state.ADTSelectReducer.selectedPages);
  const highlightColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.highlightColor);
  const accentColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.accentColor);

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
    if (!isRow && (typeof checked == "object" || isPageSelected)) {
      return <ADTDoubleCheckIcon big={big} />;
    }

    if (checked == CheckState.NONE) {
      return null;
    }
  }, [checked, isPageSelected]);

  console.log("ADTCheckBox", checked, isPageSelected);

  return (
    <ADTCheckBoxWrapper
      accentColor={accentColor}
      clicable={clicable}
      big={big}
      highlightColor={highlightColor}
      checkedState={checked || isPageSelected}
      onClick={check}
    >
      {Check}
    </ADTCheckBoxWrapper>
  );
};

export default memo(ADTCheckBox);
