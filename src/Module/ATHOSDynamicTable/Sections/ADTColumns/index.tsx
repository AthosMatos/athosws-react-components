import React from "react";
import ADTCheckBox from "../../components/ADTCheckBox";
import { useADTContext } from "../../context";
import { ADTColumnWrapper, ADTTR } from "../../styled";
import ADTCol from "./ADTCol";

interface ADTColumnsProps {
  isPersistPrimaryColumn?: boolean;
}

const ADTColumns = ({ isPersistPrimaryColumn }: ADTColumnsProps) => {
  const {
    selectMethods,
    selectData,
    colsTRId,
    colH,
    props: { columns, colConfig, data, paddingBetweenColumns, tableStyle },
  } = useADTContext();

  return (
    <ADTTR id={colsTRId} height={colH}>
      <ADTColumnWrapper
        style={isPersistPrimaryColumn ? { paddingLeft: "0.4rem" } : {}}
        checkBox
        paddingHorizontal={paddingBetweenColumns}
      >
        <ADTCheckBox
          highlightColor={tableStyle?.highlightColor!}
          checked={selectData.checkState}
          check={() => selectMethods.checkAllButtonClick(data.length)}
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
