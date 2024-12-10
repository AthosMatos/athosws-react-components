import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";
import ADTCell from "./ADTCell";

interface ADTCellsProps {
  isPersistPrimaryColumn?: boolean;
}

const ADTCells = ({ isPersistPrimaryColumn }: ADTCellsProps) => {
  const [isInit, setIsInit] = useState(false);
  const data = useSelector((state: ADTState) => state.ADTPropsReducer.data);

  useEffect(() => {
    setIsInit(true);
  }, []);

  return data?.map((row, rowIndex) => (
    <ADTCell
      key={row.id ?? rowIndex}
      rowIndex={rowIndex}
      row={row}
      isInit={isInit}
      isPersistPrimaryColumn={isPersistPrimaryColumn}
    />
  ));
};

export default ADTCells;
