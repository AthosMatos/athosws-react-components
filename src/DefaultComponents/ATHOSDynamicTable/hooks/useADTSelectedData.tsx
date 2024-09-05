import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ADTSelectedRowsToast from "../components/ADTSelectedRowsToast";

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
  const [selectedRowsToastID, setSelectedRowsToastID] = useState<string | null>(
    null
  );
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [checkState, setCheckState] = useState(CheckState.NONE);

  useEffect(() => {
    console.log("Selected rows: ", selectedRows);
    if (selectedRows.length) {
      const id = toast(
        (t) => (
          <ADTSelectedRowsToast
            selectedRows={selectedRows.length}
            toastID={t.id}
            uncheckAll={uncheckAll}
          />
        ),
        { id: selectedRowsToastID ?? undefined }
      );
      setSelectedRowsToastID(id);
    } else {
      toast.dismiss(selectedRowsToastID!);
      setSelectedRowsToastID(null);
    }
  }, [selectedRows]);

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

  return { selectData, selectMethods };
};

export default useADTSelectedData;
