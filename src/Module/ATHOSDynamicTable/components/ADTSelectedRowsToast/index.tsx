import { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { ATHOSDropDown } from "../../../ATHOSDropDown";
import { ATHOSToast } from "../../../ATHOSToast";
import { useADTSelect } from "../../redux/Select/hook";
import ADTCheckBox from "../ADTCheckBox";
import { ADTATWrapper, ADTBRDSimple, ADTSRTFSWrapper, ADTSRTIconWrapper, ADTSRTLabel, ADTSRTMainFunc } from "./styled";
import useSelectors_ADTSelectedRowsToast from "./useSelectors";

const ADTSelectedRowsToast = () => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const { selectedRows, selectedRowsToastOpen, checkState, tableStyle, selectedRowsTooltip, data, tableName } =
    useSelectors_ADTSelectedRowsToast();

  const { uncheckAll, openSelectedRowsToast, closeSelectedRowsToast } = useADTSelect();

  const onDismiss = () => {
    setOpenDropDown(false);
    uncheckAll();
  };

  useEffect(() => {
    if (selectedRows.length > 0) {
      openSelectedRowsToast();
    } else {
      closeSelectedRowsToast();
    }
  }, [selectedRows]);

  return (
    <ATHOSToast
      position="bottom-right"
      updateState={selectedRows}
      renderCondition={selectedRowsToastOpen}
      removeCondition={selectedRows.length == 0}
      id={tableName}
    >
      <ADTATWrapper>
        <ADTSRTFSWrapper>
          <ADTCheckBox
            highlightColor={tableStyle?.highlightColor!}
            clicable={false}
            big
            checked={checkState == 0 ? true : checkState}
            check={() => {}}
          />
          <ADTSRTLabel>{selectedRows.length} Items</ADTSRTLabel>
        </ADTSRTFSWrapper>
        <ADTBRDSimple w={1} h={20} />
        <ADTSRTLabel>{tableName}</ADTSRTLabel>
        <ADTBRDSimple w={1} h={20} />

        {(selectedRowsTooltip?.mainFunc || selectedRowsTooltip?.secondaryFunc || selectedRowsTooltip?.othersFunc) && (
          <ADTSRTFSWrapper>
            {selectedRowsTooltip?.mainFunc && (
              <ADTSRTMainFunc
                onClick={() => {
                  onDismiss();
                  selectedRowsTooltip.mainFunc!.onClick(selectedRows.map((index) => data[index]));
                }}
                highlightColor={tableStyle?.highlightColor!}
              >
                {selectedRowsTooltip.mainFunc.icon ?? selectedRowsTooltip.mainFunc.label}
              </ADTSRTMainFunc>
            )}
            {selectedRowsTooltip?.secondaryFunc && (
              <ADTSRTIconWrapper
                pad={8}
                backColor="#f3f3f3"
                onClick={() => {
                  onDismiss();
                  selectedRowsTooltip.secondaryFunc!.onClick(selectedRows.map((index) => data[index]));
                }}
              >
                {selectedRowsTooltip.secondaryFunc.label ?? selectedRowsTooltip.secondaryFunc.icon}
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
                      func.onClick(selectedRows.map((index) => data[index]));
                      onDismiss();
                    },
                  };
                })}
                id={tableName}
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
