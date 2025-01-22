import { useEffect } from "react";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { Provider, useDispatch, useSelector } from "react-redux";
import ColoredDiv from "./components/ColoredDiv";
import { ATHOSMenuProps } from "./interfaces";
import { fillProps } from "./redux/Props";
import { AMState, AMStore } from "./redux/store";

const Selected = () => {
  const colors = useSelector((state: AMState) => state.AMPropsReducer.colors?.selected);
  return (
    <ColoredDiv
      colors={colors}
      className="w-60 h-fit text-black bg-gray-200 p-2 px-4 
      flex items-center gap-2 rounded-full border border-gray-400 cursor-pointer"
    >
      <BsFillGrid1X2Fill />
      Dashboard
    </ColoredDiv>
  );
};

const MenuOption = () => {
  const colors = useSelector((state: AMState) => state.AMPropsReducer.colors?.menu?.optionSelected);
  return (
    <ColoredDiv
      colors={colors}
      className="w-full h-fit text-black bg-gray-200 p-2  
    flex items-center gap-2 rounded-md border border-gray-400 cursor-pointer"
    >
      <BsFillGrid1X2Fill />
      Dashboard
    </ColoredDiv>
  );
};

const Menu = () => {
  const colors = useSelector((state: AMState) => state.AMPropsReducer.colors?.menu);
  return (
    <ColoredDiv
      colors={colors}
      className="w-60 h-fit text-black bg-gray-200 p-2  
  flex items-center gap-2 rounded-lg border border-gray-400 flex-col"
    >
      <MenuOption />
      <MenuOption />
      <MenuOption />
      <MenuOption />
      <MenuOption />
    </ColoredDiv>
  );
};

const AM = (props: ATHOSMenuProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fillProps(props));
  }, [props]);
  return (
    <div className="flex flex-col gap-2">
      <Selected />
      <div className="overflow-hidden">
        <Menu />
      </div>
    </div>
  );
};
export const ATHOSMenu = (props: ATHOSMenuProps) => {
  return (
    <Provider store={AMStore}>
      <AM {...props} />
    </Provider>
  );
};
