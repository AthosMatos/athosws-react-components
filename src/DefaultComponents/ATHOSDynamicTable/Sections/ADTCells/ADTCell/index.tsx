import { memo, useEffect, useState } from "react";
import { v4 } from "uuid";
import { ATHOSTooltip } from "../../../../ATHOSTooltip";
import ADTCheckBox from "../../../components/ADTCheckBox";
import { useADTContext } from "../../../context";
import { CheckState } from "../../../hooks/useADTSelectedData";
import { ColConfig } from "../../../interfaces";
import { ADTCellWrapper, ADTTR } from "../../../styled";

const ADTC = ({
  row,
  column,
  colConfig,
  minColWidthToShort,
}: {
  row: any;
  column: string;
  colConfig?: ColConfig<any>;
  minColWidthToShort?: number;
}) => {
  const [isCut, setIsCut] = useState(false);
  /* const maxCharToCut = colConfig
          ? colConfig[column]?.maxCharToCut
          : false;
        let isCut = false;
        let rowValue = row[column] as string;
        if (maxCharToCut && rowValue.length > maxCharToCut) {
          rowValue = `${rowValue.slice(0, maxCharToCut)}...`;
          isCut = true;
        } */
  const maxW = colConfig ? colConfig[column]?.maxWidth : false;

  let rowValue = row[column] as string;
  /* if (maxW && rowValue.length > maxCharToCut) {
    //rowValue = `${rowValue.slice(0, maxCharToCut)}...`;
    isCut = true;
  } */
  const { columnsIDs } = useADTContext();

  useEffect(() => {
    //console.log(column, "isCut", isCut);
  }, [isCut]);

  useEffect(() => {
    if (!columnsIDs || !minColWidthToShort) return;
    const DTColDiv = document.getElementById(columnsIDs[column]);
    if (!DTColDiv) return;

    const mouseMove = (e: MouseEvent) => {
      const ColRect = DTColDiv.getBoundingClientRect();

      if (ColRect.width < minColWidthToShort) {
        if (!isCut) {
          setIsCut(true);
        }
        //trigger a mouse up event

        console.log(column, true, isCut);
        //document.removeEventListener("mousemove", mouseMove);
      } else {
        isCut && setIsCut(false);
        /* document.dispatchEvent(new MouseEvent("mouseup"));
        document.dispatchEvent(new MouseEvent("mousedown")); */
        console.log(column, false, isCut);
        //document.removeEventListener("mousemove", mouseMove);
      }
    };

    const mousedown = (e: MouseEvent) => {
      e.preventDefault();
      document.addEventListener("mousemove", mouseMove);

      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", mouseMove);
      });
    };

    document.addEventListener("mousedown", mousedown);

    return () => {
      document.removeEventListener("mousedown", mousedown);
    };
  }, [columnsIDs]);

  return (
    <ADTCellWrapper
      style={{
        backgroundColor: isCut ? "red" : "transparent",
      }}
      bRight
      key={column as string}
    >
      {isCut ? (
        <ATHOSTooltip
          toolTipStyle={{
            maxWidth: "200px",
          }}
          position="top"
          float
          content={row[column]}
        >
          {rowValue}
        </ATHOSTooltip>
      ) : (
        rowValue
      )}
    </ADTCellWrapper>
  );
};

const ADTCell = ({
  row,
  columns,
  rowIndex,
  check,
  isCheck,
  checkState,
  colConfig,
  paddingBetweenRows,
  minColWidthToShort,
}: {
  row: any;
  columns: any[];
  rowIndex: number;
  check: (row: number) => void;
  isCheck: boolean;
  checkState: 0 | 1 | 2;
  colConfig?: ColConfig<any>;
  paddingBetweenRows?: number;
  minColWidthToShort?: number;
}) => {
  const [H, setH] = useState<number>();
  const divID = v4().toString();

  useEffect(() => {
    const DTColumnWrapperDiv = document.getElementById(divID);
    console.log(paddingBetweenRows);
    if (!DTColumnWrapperDiv || !paddingBetweenRows) return;
    const h =
      DTColumnWrapperDiv.getBoundingClientRect().height + paddingBetweenRows;
    setH(h);
  }, []);

  return (
    <ADTTR id={divID} height={H}>
      <ADTCellWrapper>
        <ADTCheckBox
          checked={
            checkState === CheckState.PAGE && isCheck ? checkState : isCheck
          }
          check={() => check(rowIndex)}
        />
      </ADTCellWrapper>
      {columns.map((column: string) => (
        <ADTC
          minColWidthToShort={minColWidthToShort}
          row={row}
          column={column}
          colConfig={colConfig}
        />
      ))}
    </ADTTR>
  );
};

export default memo(ADTCell);
