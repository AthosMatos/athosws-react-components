import { useCallback, useState } from "react";

interface useADTSelectedDataProps {
  pageSize: number;
}

type checkStates = 0 | 1 | 2; // 0: none, 1: all, 2: page

export const CheckState = {
  NONE: 0 as checkStates,
  ALL: 1 as checkStates,
  PAGE: 2 as checkStates,
};

const useADTSelectedData = ({ pageSize }: useADTSelectedDataProps) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [checkState, setCheckState] = useState(CheckState.NONE);

  const checkAll = (dataAmount: number) => {
    setSelectedRows(Array.from({ length: dataAmount }, (_, i) => i));
    setCheckState(1);
  };

  const uncheckAll = () => {
    setSelectedRows([]);
    setCheckState(0);
  };

  const pageCheck = () => {
    setSelectedRows(Array.from({ length: pageSize }, (_, i) => i));
    setCheckState(2);
  };

  const checkAllButtonClick = useCallback(
    (dataAmount: number) => {
      switch (checkState) {
        case 0:
          console.log("checkAll");
          checkAll(dataAmount);
          break;
        case 1:
          console.log("pageCheck");
          pageCheck();
          break;
        case 2:
          console.log("uncheckAll");
          uncheckAll();
          break;
        default:
          break;
      }
    },
    [checkState]
  );

  const checkCellClick = useCallback((row: number) => {
    setSelectedRows((prev) => {
      if (prev.includes(row)) {
        return prev.filter((r) => r !== row);
      }
      return [...prev, row];
    });
  }, []);

  const selectData = {
    selectedRows,
    checkState,
  };
  const selectMethods = {
    checkCellClick,
    checkAllButtonClick,
  };

  return {
    selectData,
    selectMethods,

    uncheckAll,
  };
};

export default useADTSelectedData;
