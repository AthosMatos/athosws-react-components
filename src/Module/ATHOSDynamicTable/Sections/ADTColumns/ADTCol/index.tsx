import ADTBorder from "../../../components/ADTBorder";
import { useADTContext } from "../../../context";
import { ADTColBorderWrapper, ADTColumnWrapper } from "../../../styled";

const ADTCol = ({ value, column }: { value: any; column: string }) => {
  const {
    columnsIDs,
    props: { paddingBetweenColumns },
  } = useADTContext();
  return (
    columnsIDs && (
      <ADTColumnWrapper
        id={columnsIDs[column]}
        bRight
        paddingHorizontal={paddingBetweenColumns}
      >
        <ADTColBorderWrapper>
          {value} <ADTBorder colID={columnsIDs[column]} />
        </ADTColBorderWrapper>
      </ADTColumnWrapper>
    )
  );
};

export default ADTCol;
