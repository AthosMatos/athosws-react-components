import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";
import ADTCell from "./ADTCell";
import { ADTTR } from "../../styled";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setMovingPage } from "../../redux/Paging/provider";

interface ADTCellsProps {
  isPersistPrimaryColumn?: boolean;
}

const ADTCells = ({ isPersistPrimaryColumn }: ADTCellsProps) => {
  const { movingPage, filteredData } = useSelector(
    (state: ADTState) => state.ADTPagingReducer
  );

  return (
    <AnimatePresence mode={movingPage ? "wait" : "sync"}>
      {filteredData?.map((row, rowIndex) => (
        <ADTCell
          key={row.id}
          rowIndex={rowIndex}
          row={row}
          isPersistPrimaryColumn={isPersistPrimaryColumn}
        />
      ))}
    </AnimatePresence>
  );
};

export default ADTCells;
