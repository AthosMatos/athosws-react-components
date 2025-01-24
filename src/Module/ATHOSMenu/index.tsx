import { useEffect, useRef, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import HeightAnimDiv from "./components/HeightAnimDiv";
import { ATHOSMenuProps } from "./interfaces";
import { fillProps } from "./redux/Props";
import { AMStore } from "./redux/store";
import Menu from "./sections/Menu";
import Selected from "./sections/Selected";
import { useClickOutside } from "../hooks/useClickOutside";

const AM = (props: ATHOSMenuProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fillProps(props));
  }, [props]);

  const [open, setOpen] = useState(false);

  const BRef = useRef<HTMLDivElement>(null);
  const ARef = useRef<HTMLDivElement>(null);
  useClickOutside({
    callback: () => {
      setOpen(false);
    },
    refs: [ARef, BRef],
  });

  return (
    <div className="flex flex-col gap-2 select-none leading-tight">
      <Selected aRef={ARef} click={() => setOpen(!open)} />
      <HeightAnimDiv Bref={BRef} className="w-full" show={open}>
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
