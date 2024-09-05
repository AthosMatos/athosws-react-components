import styled from "styled-components";
import { ATHOSColors } from "../../../colors/colors";
import { useADTBorder } from "./useBorder";

const BRD = styled.div<{ active: boolean }>`
  width: 1px;
  height: 100%;
  background-color: ${ATHOSColors.grey.light_2};
  transition: all 0.14s;
  border-radius: 30px;

  transition: all 0.14s;

  ${(props) =>
    props.active &&
    `
      width: 80%;
      background-color: ${ATHOSColors.grey.dark_05};
    `}
`;
/* 
${(props) =>
    props.over &&
    `
      background-color: ${ATHOSColors.grey.dark_05};
    `}

  
*/
const BRDWrapper = styled.div<{ resizable: boolean }>`
  display: flex;
  width: 8px;
  height: 100%;
  justify-content: center;
  cursor: col-resize;
  /* ${(props) =>
    props.resizable &&
    `
      
    `} */
`;
const ADTBorder = ({ colID }: { colID: string }) => {
  const { id, wrapperid, doubleClicked, setDoubleClicked } =
    useADTBorder(colID);

  return (
    <BRDWrapper
      resizable={doubleClicked}
      onDoubleClick={() => {
        console.log("Double Clicked");
        setDoubleClicked(!doubleClicked);
      }}
      id={wrapperid}
    >
      <BRD active={doubleClicked} id={id} />
    </BRDWrapper>
  );
};

export default ADTBorder;
