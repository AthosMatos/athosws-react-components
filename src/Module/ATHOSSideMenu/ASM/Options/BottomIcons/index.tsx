import { BiSolidPencil } from "react-icons/bi";
import { GoSignOut } from "react-icons/go";
import { ATHOSColors } from "../../../../colors/colors";
import { useATHOSSideMenu } from "../../../context/context";
import { ASMArrowLeft, BottomIconsWrapper } from "../../../styled";
import ASMEditOption from "./EditOption";
import ASMExitOption from "./ExitOption";
import ASMHideOption from "./HideOption";

const BottomIcons = () => {
  const {
    props: { onExitIcon: onExit, collapsableIcon: collapsable, editableIcon: editable },
    hideMenu,
  } = useATHOSSideMenu();
  return (
    <BottomIconsWrapper>
      {onExit && !hideMenu && <ASMExitOption onClick={onExit.onClick} Icon={onExit.Icon ?? GoSignOut} label={onExit.label} />}
      {editable && !hideMenu && <ASMEditOption Icon={editable.Icon ?? BiSolidPencil} label={editable.label ?? ""} />}
      {collapsable && (
        <ASMHideOption
          Icon={collapsable.Icon ?? <ASMArrowLeft clicked={hideMenu} activeColor={ATHOSColors.grey.default} />}
          label={collapsable.label ?? ""}
        />
      )}
    </BottomIconsWrapper>
  );
};

export default BottomIcons;
