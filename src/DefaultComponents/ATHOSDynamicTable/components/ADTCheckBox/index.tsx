import { useADTContext } from "../../context";
import { CheckState } from "../../hooks/useADTSelectedData";
import { ADTCheckBoxProps } from "./interfaces";
import { ADTCheckBoxWrapper, ADTCheckIcon, ADTDoubleCheckIcon } from "./styled";

const ADTCheckBox = ({ checked, check, big, clicable }: ADTCheckBoxProps) => {
  const {
    props: { highlightColor },
  } = useADTContext();

  return (
    <ADTCheckBoxWrapper
      clicable={clicable}
      big={big}
      highlightColor={highlightColor!}
      checkedState={checked}
      onClick={() => {
        check();
      }}
    >
      {typeof checked === "boolean" ? (
        checked ? (
          <ADTCheckIcon big={big} />
        ) : null
      ) : checked == CheckState.NONE ? null : checked == CheckState.ALL ? (
        <ADTCheckIcon big={big} />
      ) : (
        <ADTDoubleCheckIcon big={big} />
      )}
    </ADTCheckBoxWrapper>
  );
};

export default ADTCheckBox;
