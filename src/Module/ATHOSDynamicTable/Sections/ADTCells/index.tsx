import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";
import ADTCell from "./ADTCell";

interface ADTCellsProps {
  isPersistPrimaryColumn?: boolean;
}

const ADTCells = ({ isPersistPrimaryColumn }: ADTCellsProps) => {
  const filteredData = useSelector(
    (state: ADTState) => state.ADTFilteredPropsReducer.filteredData
  );
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    setData(filteredData);
  }, [filteredData]);
  return (
    <AnimatePresence>
      {data?.map((row, rowIndex) => (
        <ADTCell
          key={`${rowIndex}-${row.id}`}
          rowIndex={rowIndex}
          row={row}
          isPersistPrimaryColumn={isPersistPrimaryColumn}
        />
      ))}
    </AnimatePresence>
  );
};

export default ADTCells;
