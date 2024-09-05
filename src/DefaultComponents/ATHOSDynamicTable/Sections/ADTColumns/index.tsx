import { useEffect, useState } from "react";
import { v4 } from "uuid";
import ADTCheckBox from "../../components/ADTCheckBox";
import { useADTContext } from "../../context";
import { ADTColumnWrapper, ADTTR } from "../../styled";
import ADTCol from "./ADTCol";

const ADTColumns = () => {
  const {
    selectMethods,
    selectData,
    props: { columns, colConfig, paddingColumn, data },
  } = useADTContext();
  const [colH, setColH] = useState<number>();

  const id = v4().toString();
  useEffect(() => {
    const DTColumnWrapperDiv = document.getElementById(id);
    if (!DTColumnWrapperDiv || !paddingColumn) return;
    const h = DTColumnWrapperDiv.getBoundingClientRect().height + paddingColumn;
    setColH(h);
  }, []);

  return (
    <ADTTR id={id} height={colH}>
      <ADTColumnWrapper checkBox>
        <ADTCheckBox
          checked={selectData.checkState}
          check={() => selectMethods.checkAllButtonClick(data.length)}
        />
      </ADTColumnWrapper>
      {columns.map((column: any, index) => (
        <ADTCol
          value={
            colConfig && colConfig[column]?.label
              ? colConfig[column]?.label
              : column
          }
          key={index}
          column={column}
        />
      ))}
    </ADTTR>
  );
};

export default ADTColumns;
