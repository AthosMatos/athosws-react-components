import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useADTContext } from "../../context";
import ADTCell from "./ADTCell";

const ADTCells = () => {
  const {
    selectMethods: { checkCellClick },
    selectData: { selectedRows, checkState },
    props: {
      data,
      columns,
      paddingBetweenCells,
      paddingBetweenColumns,
      highlightColor,
      colConfig,
      globalConfig,
      extraColumns,
    },
  } = useADTContext();

  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    setIsInit(true);
  }, []);

  return (
    <AnimatePresence>
      {data.map((row, rowIndex) => (
        <ADTCell
          key={row.id ?? rowIndex}
          isCheck={selectedRows.includes(rowIndex)}
          rowIndex={rowIndex}
          row={row}
          columns={columns}
          paddingBetweenCells={paddingBetweenCells}
          paddingBetweenColumns={paddingBetweenColumns}
          highlightColor={highlightColor}
          isInit={isInit}
          checkCellClick={checkCellClick}
          checkState={checkState}
          colConfig={colConfig}
          globalConfig={globalConfig}
          extraColumns={extraColumns}
        />
      ))}
    </AnimatePresence>
  );
};

export default ADTCells;
