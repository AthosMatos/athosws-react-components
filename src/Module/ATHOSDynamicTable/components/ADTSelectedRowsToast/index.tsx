import { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { ATHOSDropDown2 } from "../../../ATHOSDropDown2";
import { ATHOSToast } from "../../../ATHOSToast";
import { forceOpacity, generateColorShades } from "../../../utils/color-utils";
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
      <ADTATWrapper
        style={{
          color: tableStyle?.textColor,
          backgroundColor: tableStyle?.accentColor2,
        }}
      >
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
                backColor={tableStyle?.textColor || "#f3f3f3"}
                onClick={() => {
                  onDismiss();
                  selectedRowsTooltip.secondaryFunc!.onClick(selectedRows.map((index) => data[index]));
                }}
              >
                {selectedRowsTooltip.secondaryFunc.label ?? selectedRowsTooltip.secondaryFunc.icon}
              </ADTSRTIconWrapper>
            )}

            {selectedRowsTooltip?.othersFunc && (
              <ATHOSDropDown2
                hoverColors={{
                  backColor: generateColorShades(tableStyle?.accentColor || "#f3f3f3").dark,
                }}
                wrapperBackColor={tableStyle?.accentColor || "#f3f3f3"}
                borderColor={forceOpacity(tableStyle?.textColor || "#f3f3f3", 0.3)}
                labelColor={tableStyle?.textColor}
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
                position="top-left"
                style={{
                  backgroundColor: tableStyle?.accentColor || "#f3f3f3",
                  color: tableStyle?.textColor,
                }}
              >
                <ADTSRTIconWrapper
                  pad={8}
                  backColor={tableStyle?.accentColor || "#f3f3f3"}
                  onClick={() => {
                    setOpenDropDown(!openDropDown);
                  }}
                >
                  <IoMenu />
                </ADTSRTIconWrapper>
              </ATHOSDropDown2>
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
