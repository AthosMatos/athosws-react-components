import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";
import ADTCell from "./ADTCell";

interface ADTCellsProps {
  isPersistPrimaryColumn?: boolean;
}

const ADTCells = ({ isPersistPrimaryColumn }: ADTCellsProps) => {
  const [isInit, setIsInit] = useState(false);
  const data = useSelector(
    (state: ADTState) => state.ADTFilteredPropsReducer.filteredData
  );

  useEffect(() => {
    setIsInit(true);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {data?.map((row, rowIndex) => (
        <ADTCell
          key={row.id ?? rowIndex}
          rowIndex={rowIndex}
          row={row}
          isInit={isInit}
          isPersistPrimaryColumn={isPersistPrimaryColumn}
        />
      ))}
    </AnimatePresence>
  );
};

export default ADTCells;
