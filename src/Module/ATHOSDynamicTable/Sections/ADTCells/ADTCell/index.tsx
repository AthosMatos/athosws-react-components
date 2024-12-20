import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovingPage } from "../../../redux/Paging/provider";
import { ADTState } from "../../../redux/store";
import { ADTTR } from "../../../styled";
import ADTCellCheckBox from "./ADTCellCheckBox";
import ADTCellColumn from "./ADTCellColumn";
import ADTCellExtraCols from "./ADTCellExtraCols";

interface ADTCellProps {
  rowIndex: number;
  row: any;
  isPersistPrimaryColumn?: boolean;
}

const ADTCell = memo((props: ADTCellProps) => {
  const { rowIndex, row, isPersistPrimaryColumn } = props;
  const { columns, extraColumns } = useSelector(
    (state: ADTState) => state.ADTPropsReducer
  );
  const { movingPage, goingForward } = useSelector(
    (state: ADTState) => state.ADTPagingReducer
  );
  const dispatch = useDispatch();
  return (
    <ADTTR
      layout={"position"}
      onAnimationComplete={(anim: any) => {
        if (anim.translateX === 0) {
          dispatch(setMovingPage(false));
        }
      }}
      initial={
        movingPage
          ? {
              translateX: goingForward ? "100%" : "-100%",
            }
          : {
              scale: 0,
            }
      }
      animate={
        movingPage
          ? {
              translateX: 0,
            }
          : {
              scale: 1,
            }
      }
      exit={
        movingPage
          ? {
              translateX: goingForward ? "-100%" : "100%",
            }
          : {
              scale: 0,
            }
      }
      transition={{ duration: 0.24, ease: "easeInOut" }}
    >
      <ADTCellCheckBox
        rowIndex={rowIndex}
        isPersistPrimaryColumn={isPersistPrimaryColumn}
      />

      {(columns as any[])
        .filter((_, index) => !(isPersistPrimaryColumn && index > 0))
        .map((column, index) => (
          <ADTCellColumn
            key={column}
            column={column}
            index={index}
            row={row}
            rowIndex={rowIndex}
          />
        ))}

      {extraColumns && (
        <ADTCellExtraCols
          isPersistPrimaryColumn={isPersistPrimaryColumn}
          row={row}
        />
      )}
    </ADTTR>
  );
});

export default ADTCell;
