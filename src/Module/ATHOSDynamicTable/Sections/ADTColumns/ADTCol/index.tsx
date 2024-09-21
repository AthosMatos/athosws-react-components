import { useMemo } from "react";
import ADTBorder from "../../../components/ADTBorder";
import { useADTContext } from "../../../context";
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
  const {
    columnsIDs,
    props: { paddingBetweenColumns, tableStyle, persistPrimaryColumn },
  } = useADTContext();

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
