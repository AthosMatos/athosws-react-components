import { useATHOSSideMenu } from "../context";
import {
  ASMArrowLeft,
  ASMMenuHiderWrapper,
  ASMMH,
  hidenMenuWidth,
  sideMenuWidth,
} from "../styled";

interface ASMMenuHiderProps {
  color: string;
  extraContainerHeight: number;
}

const ASMMenuHider = (props: ASMMenuHiderProps) => {
  const { hideMenu, setHideMenu } = useATHOSSideMenu();

  return (
    <ASMMenuHiderWrapper
      height={props.extraContainerHeight}
      width={
        hideMenu
          ? `calc(${hidenMenuWidth} + 1.2rem)`
          : `calc(${sideMenuWidth} + 1.2rem)`
      }
    >
      <ASMMH onClick={() => setHideMenu(!hideMenu)} accentColor={props.color}>
        <ASMArrowLeft activeColor={props.color} clicked={hideMenu} />
      </ASMMH>
    </ASMMenuHiderWrapper>
  );
};

export default ASMMenuHider;
