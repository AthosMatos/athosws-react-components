import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";
import ADTCell from "./ADTCell";

interface ADTCellsProps {
  isPersistPrimaryColumn?: boolean;
}

const ADTCells = ({ isPersistPrimaryColumn }: ADTCellsProps) => {
  const data = useSelector(
    (state: ADTState) => state.ADTFilteredPropsReducer.filteredData
  );

  return (
    <AnimatePresence mode="popLayout">
      {data?.map((row, rowIndex) => (
        <ADTCell
          key={`row-${rowIndex}-${row.id}`}
          rowIndex={rowIndex}
          row={row}
          isPersistPrimaryColumn={isPersistPrimaryColumn}
        />
      ))}
    </AnimatePresence>
  );
};

export default ADTCells;
