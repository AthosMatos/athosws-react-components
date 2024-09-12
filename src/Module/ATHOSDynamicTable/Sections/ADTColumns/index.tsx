import React, { useEffect, useState } from "react";
import ADTCheckBox from "../../components/ADTCheckBox";
import { useADTContext } from "../../context";
import { ADTColumnWrapper, ADTTR } from "../../styled";
import ADTCol from "./ADTCol";

const ADTColumns = () => {
  const {
    selectMethods,
    selectData,
    colsTRId,
    props: {
      columns,
      colConfig,
      paddingHeader,
      data,
      paddingBetweenColumns,
      highlightColor,
    },
  } = useADTContext();
  const [colH, setColH] = useState<number>();

  useEffect(() => {
    const DTColumnWrapperDiv = document.getElementById(colsTRId);
    if (!DTColumnWrapperDiv || !paddingHeader) return;
    const h = DTColumnWrapperDiv.getBoundingClientRect().height + paddingHeader;
    setColH(h);
  }, []);

  return (
    <ADTTR id={colsTRId} height={colH}>
      <ADTColumnWrapper checkBox paddingHorizontal={paddingBetweenColumns}>
        <ADTCheckBox
          highlightColor={highlightColor!}
          checked={selectData.checkState}
          check={() => selectMethods.checkAllButtonClick(data.length)}
        />
      </ADTColumnWrapper>
      {columns.map((column: any) => {
        let value: React.ReactNode = column;
        if (colConfig) {
          if (colConfig[column]?.colComponent) {
            value = colConfig[column]?.colComponent;
          } else if (colConfig[column]?.label) {
            value = colConfig[column]?.label;
          }
        }
        return <ADTCol value={value} key={column} column={column} />;
      })}
    </ADTTR>
  );
};

export default ADTColumns;
