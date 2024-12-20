import { useMemo } from "react";
import { useSelector } from "react-redux";
import ADTBorder from "../../../components/ADTBorder";
import { ADTState } from "../../../redux/store";
import { ADTColBorderWrapper, ADTColumnWrapper } from "../../../styled";

const ADTCol = ({
  value,
  column,
  isPersistPrimaryColumn,
}: {
  value: any;
  column: string;
  isPersistPrimaryColumn?: boolean;
}) => {
  const { paddingBetweenColumns, tableStyle } = useSelector(
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
