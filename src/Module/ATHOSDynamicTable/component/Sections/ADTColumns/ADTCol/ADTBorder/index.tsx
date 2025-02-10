import { memo } from "react";
import styled from "styled-components";
import { ATHOSColors } from "../../../../../../colors/colors";
import { useADTBorder } from "./useBorder";
export const BRD = styled.div`
  width: 1px;
  height: 100%;
  background-color: ${ATHOSColors.grey.light};
  border-radius: 30px;
  opacity: 0.44;
`;
const BRDWrapper = styled.div`
  display: flex;
  width: 8px;
  height: 1rem;
  justify-content: center;
  cursor: e-resize;
`;
const ADTBorder = ({ colID }: { colID: string }) => {
  const { wrapperid } = useADTBorder(colID);
  return (
    <BRDWrapper id={wrapperid}>
      <BRD />
    </BRDWrapper>
  );
};

export default memo(ADTBorder);
