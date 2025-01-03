import { memo, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
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

const ADTCell = (props: ADTCellProps) => {
  const { rowIndex, row, isPersistPrimaryColumn } = props;
  const { columns, extraColumns, pageSize } = useSelector((state: ADTState) => ({
    columns: state.ADTPropsReducer.columns,
    extraColumns: state.ADTPropsReducer.extraColumns,
    pageSize: state.ADTPagingReducer.pageSize,
  }));
  /* const { columns, extraColumns, pageSize, goingForward, movingPage, searchFilter, beingMoved } = useSelector((state: ADTState) => ({
    columns: state.ADTPropsReducer.columns,
    extraColumns: state.ADTPropsReducer.extraColumns,
    pageSize: state.ADTPagingReducer.pageSize,
    goingForward: state.ADTPagingReducer.goingForward,
    movingPage: state.ADTPagingReducer.movingPage,
    searchFilter: state.ADTPagingReducer.searchFilter,
    beingMoved: state.ADTPagingReducer.beingMoved,
  })); */
  //const hasSearchFilter = useMemo(() => searchFilter !== "", [searchFilter]);
  const isLast = useMemo(() => rowIndex === pageSize - 1, [rowIndex, pageSize]);
  /* const initial = useMemo(
    () => (movingPage ? (!goingForward ? "slideOutLeft" : "slideOutRight") : hasSearchFilter ? "fadeOut" : "blinkInit"),
    [movingPage, goingForward, hasSearchFilter]
  );
  const animate = useMemo(
    () => (movingPage ? "slideIn" : !beingMoved.includes(row.id) ? "blinkIn" : hasSearchFilter && "fadeIn"),
    [movingPage, beingMoved, row.id, hasSearchFilter]
  );
  const exit = useMemo(
    () => (movingPage ? (!goingForward ? "slideOutRight" : "slideOutLeft") : hasSearchFilter ? "fadeOut" : "blinkOut"),
    [movingPage, goingForward, hasSearchFilter]
  ); */
  const dispatch = useDispatch();
  return (
    <ADTTR
    /*  onAnimationComplete={(anim) => {
        if (anim === "slideIn" && movingPage) {
          dispatch(setMovingPage(false));
        }
      }}
      variants={DefaultVariants}
      
      initial={initial}
      animate={animate}
      exit={exit} */
    //layout="preserve-aspect"
    >
      <ADTCellCheckBox isLast={isLast} rowIndex={rowIndex} />
      {(columns as any[]).map((column, index) => (
        <ADTCellColumn key={column[row]} isLast={isLast} column={column} index={index} row={row} rowIndex={rowIndex} />
      ))}

      {extraColumns && <ADTCellExtraCols isPersistPrimaryColumn={isPersistPrimaryColumn} row={row} />}
    </ADTTR>
  );
};

export default memo(ADTCell);
