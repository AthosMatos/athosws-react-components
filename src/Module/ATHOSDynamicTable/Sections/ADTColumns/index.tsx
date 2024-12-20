import React from "react";
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
  const { columns, colConfig, paddingBetweenColumns, tableStyle } = useSelector(
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
      {columns?.map((column: any, index) => {
        if (isPersistPrimaryColumn && index > 0) return null;
        let value: React.ReactNode = column;
        if (colConfig) {
          if (colConfig[column]?.colComponent) {
            value = colConfig[column]?.colComponent;
          } else if (colConfig[column]?.label) {
            value = colConfig[column]?.label;
          }
        }
        return (
          <ADTCol
            key={`${column}-${index}`}
            isPersistPrimaryColumn={isPersistPrimaryColumn}
            value={value}
            column={column}
          />
        );
      })}
    </ADTTR>
  );
};

export default ADTColumns;
