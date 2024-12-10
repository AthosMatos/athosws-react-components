import React from "react";
import { useSelector } from "react-redux";
import ADTCheckBox from "../../components/ADTCheckBox";
import { useADTContext } from "../../context";
import { useADTSelectprops } from "../../redux/SelectProps/provider";
import { ADTState } from "../../redux/store";
import { ADTColumnWrapper, ADTTR } from "../../styled";
import ADTCol from "./ADTCol";

interface ADTColumnsProps {
  isPersistPrimaryColumn?: boolean;
}

const ADTColumns = ({ isPersistPrimaryColumn }: ADTColumnsProps) => {
  const {
    colsTRId,
    colH,
    props: { columns, colConfig, data, paddingBetweenColumns, tableStyle },
  } = useADTContext();

  const checkState = useSelector(
    (state: ADTState) => state.ADTSelectPropsReducer.checkState
  );
  const { checkAllButtonClick } = useADTSelectprops();
  return (
    <ADTTR id={colsTRId} height={colH}>
      <ADTColumnWrapper
        style={isPersistPrimaryColumn ? { paddingLeft: "0.4rem" } : {}}
        checkBox
        paddingHorizontal={paddingBetweenColumns}
      >
        <ADTCheckBox
          highlightColor={tableStyle?.highlightColor!}
          checked={checkState}
          check={() => checkAllButtonClick()}
        />
      </ADTColumnWrapper>
      {columns.map((column: any, index) => {
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
            isPersistPrimaryColumn={isPersistPrimaryColumn}
            value={value}
            key={column}
            column={column}
          />
        );
      })}
    </ADTTR>
  );
};

export default ADTColumns;
