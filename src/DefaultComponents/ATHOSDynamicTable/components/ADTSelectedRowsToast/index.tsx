import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import ATHOSDropDown from "../../../ATHOSDropDown";
import ATHOSToast from "../../../ATHOSToast";
import { useADTContext } from "../../context";
import { ADTBRDSimple } from "../ADTBorder";
import ADTCheckBox from "../ADTCheckBox";
import {
  ADTSRTFSWrapper,
  ADTSRTIconWrapper,
  ADTSRTLabel,
  ADTSRTMainFunc,
} from "./styled";

const ADTSelectedRowsToast = () => {
  const {
    selectData,
    uncheckAll,
    props: { tableID, highlightColor },
  } = useADTContext();

  const [openDropDown, setOpenDropDown] = useState(false);

  const onDismiss = () => {
    uncheckAll();
    setOpenDropDown(false);
  };

  /* 
   useEffect(() => {
    verifyPos(selectData.selectedRows.length == 0);
  }, [selectData.selectedRows]);

  return (
    <AnimatePresence>
      {selectData.selectedRows.length > 0 && (
  */
  return (
    <ATHOSToast
      updateState={selectData.selectedRows}
      renderCondition={selectData.selectedRows.length > 0}
      removeOnUpdateCondition={selectData.selectedRows.length == 0}
      id={tableID}
    >
      <ADTSRTFSWrapper>
        <ADTCheckBox
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
      <ADTSRTMainFunc highlightColor={highlightColor!}>
        Main Func
      </ADTSRTMainFunc>
      <ATHOSDropDown
        id={tableID}
        positionVert="top"
        positionHor="left"
        open={openDropDown}
      >
        {(ref) => (
          <ADTSRTIconWrapper
            ref={ref}
            onClick={() => {
              setOpenDropDown(!openDropDown);
            }}
          >
            <IoMenu />
          </ADTSRTIconWrapper>
        )}
      </ATHOSDropDown>
      <ADTSRTIconWrapper onClick={onDismiss}>
        <IoClose />
      </ADTSRTIconWrapper>
    </ATHOSToast>
  );
};

export default ADTSelectedRowsToast;
