import { useState } from "react";
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
    uncheckAll,
    props: { tableID, highlightColor, selectedRowsTooltip, data },
  } = useADTContext();

  const [openDropDown, setOpenDropDown] = useState(false);

  const onDismiss = () => {
    setTimeout(() => {
      uncheckAll();
    }, 5);
    setOpenDropDown(false);
  };

  return (
    <ATHOSToast
      position="bottom-right"
      updateState={selectData.selectedRows}
      renderCondition={selectData.selectedRows.length > 0}
      removeCondition={selectData.selectedRows.length == 0}
      id={tableID}
    >
      <ADTATWrapper>
        <ADTSRTFSWrapper>
          <ADTCheckBox
            highlightColor={highlightColor!}
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
                  uncheckAll();
                  selectedRowsTooltip.mainFunc!.onClick(
                    selectData.selectedRows.map((index) => data[index])
                  );
                }}
                highlightColor={highlightColor!}
              >
                {selectedRowsTooltip.mainFunc.label}
              </ADTSRTMainFunc>
            )}
            {selectedRowsTooltip?.secondaryFunc && (
              <ADTSRTIconWrapper
                pad={8}
                backColor="#f3f3f3"
                onClick={() => {
                  uncheckAll();
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
                close={() => {
                  setOpenDropDown(false);
                }}
                labels={selectedRowsTooltip.othersFunc.map((func) => {
                  return {
                    label: func.label,
                    onClick: () => {
                      uncheckAll();
                      func.onClick(
                        selectData.selectedRows.map((index) => data[index])
                      );
                    },
                  };
                })}
                id={tableID}
                positionVert="top"
                positionHor="left"
                open={openDropDown}
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
