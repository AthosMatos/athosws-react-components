import styled from "styled-components";
import { ATHOSColors } from "../../../colors/colors";
import { useADTBorder } from "./useBorder";

export const ADTBRDSimple = styled.div<{ w: number; h: number }>`
  width: ${(props) => props.w}px;
  height: ${(props) => props.h}px;
  background-color: ${ATHOSColors.grey.light};
`;

export const BRD = styled.div<{ active?: boolean }>`
  width: 1px;
  height: 100%;
  background-color: ${ATHOSColors.grey.light};
  transition: all 0.14s;
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
  const { id, wrapperid } = useADTBorder(colID);
  console.log("ADTBorder");
  return (
    <BRDWrapper id={wrapperid}>
      <BRD id={id} />
    </BRDWrapper>
  );
};

export default ADTBorder;
