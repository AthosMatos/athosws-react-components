import { useEffect, useState } from "react";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { Provider, useDispatch, useSelector } from "react-redux";
import ColoredDiv from "./components/ColoredDiv";
import { ATHOSMenuProps } from "./interfaces";
import { fillProps } from "./redux/Props";
import { AMState, AMStore } from "./redux/store";
import { AnimatePresence, motion } from "framer-motion";

const Selected = ({ click }: { click: () => void }) => {
  const colors = useSelector((state: AMState) => state.AMPropsReducer.colors?.selected);
  return (
    <ColoredDiv onClick={click} colors={colors} className="w-60 px-4 rounded-full cursor-pointer">
      <BsFillGrid1X2Fill />
      Dashboard
    </ColoredDiv>
  );
};

const MenuOption = () => {
  const opts = useSelector((state: AMState) => state.AMPropsReducer.colors?.menu?.option);
  const [selected, setSelected] = useState(false);
  const colors = selected ? opts?.selected : opts?.normal;
  return (
    <ColoredDiv onClick={() => setSelected(!selected)} colors={colors} className="w-full rounded-md cursor-pointer">
      <BsFillGrid1X2Fill />
      Dashboard
    </ColoredDiv>
  );
};

const Menu = () => {
  const colors = useSelector((state: AMState) => state.AMPropsReducer.colors?.menu);
  return (
    <ColoredDiv colors={colors} className="w-60 rounded-lg flex-col">
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

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Selected click={() => setOpen(!open)} />
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
            <Menu />
          </motion.div>
        )}
      </AnimatePresence>
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
