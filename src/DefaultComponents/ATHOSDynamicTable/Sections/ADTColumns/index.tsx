import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import ADTCheckBox from "../../components/ADTCheckBox";
import { useADTContext } from "../../context";
import { ADTColumnWrapper, ADTTR } from "../../styled";
import ADTCol from "./ADTCol";

const ADTColumns = () => {
  const {
    selectMethods,
    selectData,
    props: { columns, colConfig, paddingHeader, data, paddingBetweenColumns },
  } = useADTContext();
  const [colH, setColH] = useState<number>();

  const id = v4().toString();
  useEffect(() => {
    const DTColumnWrapperDiv = document.getElementById(id);
    if (!DTColumnWrapperDiv || !paddingHeader) return;
    const h = DTColumnWrapperDiv.getBoundingClientRect().height + paddingHeader;
    setColH(h);
  }, []);

  return (
    <ADTTR id={id} height={colH}>
      <ADTColumnWrapper checkBox paddingHorizontal={paddingBetweenColumns}>
        <ADTCheckBox
          checked={selectData.checkState}
          check={() => selectMethods.checkAllButtonClick(data.length)}
        />
      </ADTColumnWrapper>
      {columns.map((column: any, index) => {
        let value: React.ReactNode = column;
        if (colConfig) {
          if (colConfig[column]?.component) {
            value = colConfig[column]?.component;
          } else if (colConfig[column]?.label) {
            value = colConfig[column]?.label;
          }
        }
        return <ADTCol value={value} key={index} column={column} />;
      })}
    </ADTTR>
  );
};

export default ADTColumns;
