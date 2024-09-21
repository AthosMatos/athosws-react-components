import { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { ATHOSDropDown } from "../../../ATHOSDropDown";
import { ATHOSToast } from "../../../ATHOSToast";
import { useADTContext } from "../../context";
import { ADTBRDSimple } from "../ADTBorder";
import ADTCheckBox from "../ADTCheckBox";
import {
  ADTATWrapper,
  ADTSRTFSWrapper,
  ADTSRTIconWrapper,
  ADTSRTLabel,
  ADTSRTMainFunc,
} from "./styled";

const ADTSelectedRowsToast = () => {
  const {
    selectData,
    selectedRowsToastOpen,
    setSelectedRowsToastOpen,
    uncheckAll,
    props: { tableName: tableID, selectedRowsTooltip, data, tableStyle },
  } = useADTContext();

  const [openDropDown, setOpenDropDown] = useState(false);

  const onDismiss = () => {
    setOpenDropDown(false);
    uncheckAll();
  };

  useEffect(() => {
    if (selectData.selectedRows.length > 0) {
      setSelectedRowsToastOpen(true);
    } else {
      setSelectedRowsToastOpen(false);
    }
  }, [selectData.selectedRows]);

  return (
    <ATHOSToast
      position="bottom-right"
      updateState={selectData.selectedRows}
      renderCondition={selectedRowsToastOpen}
      removeCondition={selectData.selectedRows.length == 0}
      id={tableID}
    >
      <ADTATWrapper>
        <ADTSRTFSWrapper>
          <ADTCheckBox
            highlightColor={tableStyle?.highlightColor!}
            clicable={false}
            big
            checked={selectData.checkState == 0 ? true : selectData.checkState}
            check={() => {}}
          />
          <ADTSRTLabel>{selectData.selectedRows.length} Items</ADTSRTLabel>
        </ADTSRTFSWrapper>
        <ADTBRDSimple w={1} h={20} />
        <ADTSRTLabel>{tableID}</ADTSRTLabel>
        <ADTBRDSimple w={1} h={20} />

        {(selectedRowsTooltip?.mainFunc ||
          selectedRowsTooltip?.secondaryFunc ||
          selectedRowsTooltip?.othersFunc) && (
          <ADTSRTFSWrapper>
            {selectedRowsTooltip?.mainFunc && (
              <ADTSRTMainFunc
                onClick={() => {
                  onDismiss();
                  selectedRowsTooltip.mainFunc!.onClick(
                    selectData.selectedRows.map((index) => data[index])
                  );
                }}
                highlightColor={tableStyle?.highlightColor!}
              >
                {selectedRowsTooltip.mainFunc.icon ??
                  selectedRowsTooltip.mainFunc.label}
              </ADTSRTMainFunc>
            )}
            {selectedRowsTooltip?.secondaryFunc && (
              <ADTSRTIconWrapper
                pad={8}
                backColor="#f3f3f3"
                onClick={() => {
                  onDismiss();
                  selectedRowsTooltip.secondaryFunc!.onClick(
                    selectData.selectedRows.map((index) => data[index])
                  );
                }}
              >
                {selectedRowsTooltip.secondaryFunc.label ??
                  selectedRowsTooltip.secondaryFunc.icon}
              </ADTSRTIconWrapper>
            )}

            {selectedRowsTooltip?.othersFunc && (
              <ATHOSDropDown
                onClose={() => {
                  setOpenDropDown(false);
                }}
                labels={selectedRowsTooltip.othersFunc.map((func) => {
                  return {
                    label: func.label,
                    onClick: () => {
                      func.onClick(
                        selectData.selectedRows.map((index) => data[index])
                      );
                      onDismiss();
                    },
                  };
                })}
                id={tableID}
                position="top"
                isOpen={openDropDown}
              >
                {(ref) => (
                  <ADTSRTIconWrapper
                    pad={8}
                    backColor="#f3f3f3"
                    ref={ref}
                    onClick={() => {
                      setOpenDropDown(!openDropDown);
                    }}
                  >
                    <IoMenu />
                  </ADTSRTIconWrapper>
                )}
              </ATHOSDropDown>
            )}
          </ADTSRTFSWrapper>
        )}
        <ADTSRTIconWrapper pad={5} backColor="#EE3131" onClick={onDismiss}>
          <IoClose color="white" />
        </ADTSRTIconWrapper>
      </ADTATWrapper>
    </ATHOSToast>
  );
};

export default ADTSelectedRowsToast;
