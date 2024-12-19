import { memo } from "react";
import { useSelector } from "react-redux";
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

const duration = 1.4;

const WrapperPos = ({ children }: { children: any }) => (
  <ADTTR
    layout={"position"}
    transition={{
      duration,
      ease: "anticipate",
    }}
  >
    {children}
  </ADTTR>
);
const WrapperNoPos = ({ children }: { children: any }) => (
  <ADTTR
    animate={{
      translateX: 0,
    }}
    initial={{
      translateX: "-100%",
    }}
    transition={{
      duration,
      ease: "anticipate",
    }}
    exit={{
      scale: 0,
    }}
  >
    {children}
  </ADTTR>
);

const Wrapper = memo(
  ({ children, slided }: { children: any; slided: boolean }) =>
    slided ? (
      <WrapperPos>{children}</WrapperPos>
    ) : (
      <WrapperNoPos>{children}</WrapperNoPos>
    )
);

const ADTCell = memo((props: ADTCellProps) => {
  const { rowIndex, row, isPersistPrimaryColumn } = props;
  const { columns, extraColumns } = useSelector(
    (state: ADTState) => state.ADTPropsReducer
  );

  return (
    <ADTTR layout="position">
      <ADTCellCheckBox
        rowIndex={rowIndex}
        isPersistPrimaryColumn={isPersistPrimaryColumn}
      />

      {(columns as any[])
        .filter((_, index) => !(isPersistPrimaryColumn && index > 0))
        .map((column, index) => (
          <ADTCellColumn
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
