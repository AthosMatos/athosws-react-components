import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import HeightAnimDiv from "./components/HeightAnimDiv";
import { ATHOSMenuProps } from "./interfaces";
import { fillProps } from "./redux/Props";
import { AMStore } from "./redux/store";
import Menu from "./sections/Menu";
import Selected from "./sections/Selected";

const AM = (props: ATHOSMenuProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fillProps(props));
  }, [props]);

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 select-none">
      <Selected click={() => setOpen(!open)} />
      <HeightAnimDiv className="pl-0" show={open}>
        <Menu />
      </HeightAnimDiv>
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
