import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useADTContext } from "../../context";
import ADTCell from "./ADTCell";

interface ADTCellsProps {
  isPersistPrimaryColumn?: boolean;
}

const ADTCells = ({ isPersistPrimaryColumn }: ADTCellsProps) => {
  const {
    selectMethods: { checkCellClick },
    selectData: { selectedRows, checkState },
    columnsIDs,
    props: {
      data,
      columns,
      paddingBetweenCells,
      paddingBetweenColumns,
      tableStyle,
      colConfig,
      globalConfig,
      extraColumns,
      startShort,
      paddingBetweenExtraColumns,
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
          isPersistPrimaryColumn={isPersistPrimaryColumn}
          columnsIDs={columnsIDs}
          key={row.id ?? rowIndex}
          isCheck={selectedRows.includes(rowIndex)}
          rowIndex={rowIndex}
          row={row}
          columns={columns}
          tableStyle={tableStyle}
          paddingBetweenCells={paddingBetweenCells}
          paddingBetweenColumns={paddingBetweenColumns}
          isInit={isInit}
          checkCellClick={checkCellClick}
          checkState={checkState}
          colConfig={colConfig}
          globalConfig={globalConfig}
          extraColumns={extraColumns}
          startShort={startShort}
          paddingBetweenExtraColumns={paddingBetweenExtraColumns}
        />
      ))}
    </AnimatePresence>
  );
};

export default ADTCells;
