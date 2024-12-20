import { ReactNode, useMemo } from "react";
import { useSelector } from "react-redux";
import ADTBorder from "../../../components/ADTBorder";
import { ADTState } from "../../../redux/store";
import { ADTColBorderWrapper, ADTColumnWrapper } from "../../../styled";

const ADTCol = ({
  column,
  isPersistPrimaryColumn,
}: {
  column: string;
  isPersistPrimaryColumn?: boolean;
}) => {
  const { paddingBetweenColumns, tableStyle, colConfig } = useSelector(
    (state: ADTState) => state.ADTPropsReducer
  );
  const { columnsIDs } = useSelector(
    (state: ADTState) => state.ADTCustomStatesReducer
  );

  const textColor = useMemo(() => {
    const globalColor = tableStyle?.columnTextColor?.global;
    const specificColor =
      tableStyle?.columnTextColor?.specific &&
      tableStyle?.columnTextColor?.specific[column];

    return specificColor ?? globalColor;
  }, [tableStyle?.columnTextColor]);

  const value = useMemo(() => {
    let v: ReactNode = column;
    if (colConfig) {
      if (colConfig[column]?.colComponent) {
        v = colConfig[column]?.colComponent;
      } else if (colConfig[column]?.label) {
        v = colConfig[column]?.label;
      }
    }
    return v;
  }, [column, colConfig]);

  return (
    columnsIDs && (
      <ADTColumnWrapper
        id={columnsIDs[column]}
        pLeft
        pRight={isPersistPrimaryColumn}
        paddingHorizontal={paddingBetweenColumns}
        textColor={textColor}
      >
        <ADTColBorderWrapper>
          {value}
          {!isPersistPrimaryColumn && <ADTBorder colID={columnsIDs[column]} />}
        </ADTColBorderWrapper>
      </ADTColumnWrapper>
    )
  );
};

export default ADTCol;
