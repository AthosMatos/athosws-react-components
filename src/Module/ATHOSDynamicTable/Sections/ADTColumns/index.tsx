import { useSelector } from "react-redux";
import ADTCheckBox from "../../components/ADTCheckBox";
import { useADTSelect } from "../../redux/Select/hook";
import { ADTState } from "../../redux/store";
import { ADTColumnWrapper, ADTTR } from "../../styled";
import ADTCol from "./ADTCol";

interface ADTColumnsProps {
  isPersistPrimaryColumn?: boolean;
}

const ADTColumns = ({ isPersistPrimaryColumn }: ADTColumnsProps) => {
  const checkState = useSelector(
    (state: ADTState) => state.ADTSelectReducer.checkState
  );
  const { columns, paddingBetweenColumns, tableStyle } = useSelector(
    (state: ADTState) => state.ADTPropsReducer
  );
  const { colH, colsTRId } = useSelector(
    (state: ADTState) => state.ADTCustomStatesReducer
  );

  const { checkAllButtonClick } = useADTSelect();
  return (
    <ADTTR id={colsTRId} height={colH}>
      <ADTColumnWrapper
        style={isPersistPrimaryColumn ? { paddingLeft: "0.4rem" } : undefined}
        checkBox
        paddingHorizontal={paddingBetweenColumns}
      >
        <ADTCheckBox
          highlightColor={tableStyle?.highlightColor!}
          checked={checkState}
          check={() => checkAllButtonClick()}
        />
      </ADTColumnWrapper>
      {columns
        ?.filter((_, index) => !(isPersistPrimaryColumn && index > 0))
        .map((column: any, index) => (
          <ADTCol
            key={`${column}-${index}`}
            isPersistPrimaryColumn={isPersistPrimaryColumn}
            column={column}
          />
        ))}
    </ADTTR>
  );
};

export default ADTColumns;
