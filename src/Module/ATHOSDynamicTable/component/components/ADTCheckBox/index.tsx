import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { CheckState } from "../../redux/Select/interfaces";
import { ADTState } from "../../redux/store";
import { ADTCheckBoxProps } from "./interfaces";
import { ADTCheckBoxWrapper, ADTCheckIcon, ADTDoubleCheckIcon } from "./styled";

const ADTCheckBox = ({ checked, check, big, clicable, isRow }: ADTCheckBoxProps) => {
  const page = useSelector((state: ADTState) => state.ADTFilteringReducer.page);
  const selectedPages = useSelector((state: ADTState) => state.ADTSelectReducer.selectedPages);
  const checkIconColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.selected?.selectedIconColor);

  const isPageSelected = useMemo(() => {
    return selectedPages.includes(page);
  }, [selectedPages, page]);

  const Check = useMemo(() => {
    if (checked == CheckState.ALL || checked == true) {
      return <ADTCheckIcon big={big} />;
    } else if (!isRow && (typeof checked == "object" || isPageSelected)) {
      return <ADTDoubleCheckIcon big={big} />;
    } else if (checked == CheckState.NONE) {
      return null;
    }
  }, [checked, isPageSelected]);
  const isCheck = (checked || isPageSelected) === true || checked === CheckState.ALL;
  return (
    <ADTCheckBoxWrapper
      style={{
        borderColor: isCheck ? checkIconColor : undefined,
        color: isCheck ? checkIconColor : undefined,
        boxShadow: isCheck ? `0px 0px 0.2rem 1px ${checkIconColor}` : undefined,
        fontSize: big ? "0.7rem" : "0.5rem",
      }}
      clicable={clicable}
      big={big}
      checkedState={checked || isPageSelected}
      onClick={check}
    >
      {Check}
    </ADTCheckBoxWrapper>
  );
};

export default memo(ADTCheckBox);
