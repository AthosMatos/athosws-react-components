import { useEffect } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { useSelector } from "react-redux";
import { ATHOSDropDown } from "../../../../ATHOSDropDown/component";
import { ATHOSToast } from "../../../../ATHOSToast";
import { useADTSelect } from "../../redux/Select/hook";
import { ADTState } from "../../redux/store";
import ADTCheckBox from "../ADTCheckBox";
import { ADTATWrapper, ADTBRDSimple, ADTSRTFSWrapper, ADTSRTIconWrapper, ADTSRTLabel, ADTSRTMainFunc } from "./styled";
import useSelectors_ADTSelectedRowsToast from "./useSelectors";

const ADTSelectedRowsToast = () => {
  const { selectedRows, selectedRowsToastOpen, checkState, tableStyle, selectedRowsTooltip, data, tableName } =
    useSelectors_ADTSelectedRowsToast();

  const { uncheckAll, openSelectedRowsToast, closeSelectedRowsToast } = useADTSelect();

  const onDismiss = () => {
    uncheckAll();
  };
  const containerColor = useSelector((state: ADTState) => state.ADTPropsReducer.selectedRowsToast?.containerColor);

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
      <ADTATWrapper
        className={containerColor?.className}
        style={{
          // color: tableStyle?.textColor,

          ...containerColor?.style,
        }}
      >
        <ADTSRTFSWrapper>
          <ADTCheckBox clicable={false} big checked={checkState == 0 ? true : checkState} />
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
                  selectedRowsTooltip.mainFunc!.onClick(data.filter((row) => selectedRows.includes(row.uniqueId)));
                  onDismiss();
                }}
                //highlightColor={tableStyle?.highlightColor!}
              >
                {selectedRowsTooltip.mainFunc.icon ?? selectedRowsTooltip.mainFunc.label}
              </ADTSRTMainFunc>
            )}
            {selectedRowsTooltip?.secondaryFunc && (
              <ADTSRTIconWrapper
                pad={8}
                backColor={"#f3f3f3"}
                onClick={() => {
                  onDismiss();
                  selectedRowsTooltip.secondaryFunc!.onClick(data.filter((row) => selectedRows.includes(row.uniqueId)));
                }}
              >
                {selectedRowsTooltip.secondaryFunc.label ?? selectedRowsTooltip.secondaryFunc.icon}
              </ADTSRTIconWrapper>
            )}

            {selectedRowsTooltip?.othersFunc && (
              <ATHOSDropDown
                labels={selectedRowsTooltip.othersFunc.map((func) => {
                  return {
                    label: func.label,
                    onClick: () => {
                      func.onClick(data.filter((row) => selectedRows.includes(row.uniqueId)));
                      onDismiss();
                    },
                  };
                })}
                position="top-left"
                style={{
                  /* backgroundColor: tableStyle?.accentColor || "#f3f3f3",
                  color: tableStyle?.textColor,
                  borderColor: forceOpacity(tableStyle?.textColor || "#f3f3f3", 0.3), */
                  borderWidth: 1,
                }}
              >
                <ADTSRTIconWrapper pad={8} backColor={"#f3f3f3"}>
                  <IoMenu />
                </ADTSRTIconWrapper>
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
