import { useEffect, useRef, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useClickOutside } from "../hooks/useClickOutside";
import HeightAnimDiv from "./components/HeightAnimDiv";
import { ATHOSMenuProps } from "./interfaces";
import { fillProps } from "./redux/Props";
import { OptSTypes, selectData, selectOption, selectSubOption, selectSubSubOption } from "./redux/Selected";
import { AMState, AMStore } from "./redux/store";
import Menu from "./sections/Menu";
import Selected from "./sections/Selected";

const AM = (props: ATHOSMenuProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fillProps(props));
  }, [props]);

  const [open, setOpen] = useState(false);
  const [init, setInit] = useState(false);
  const BRef = useRef<HTMLDivElement>(null);
  const ARef = useRef<HTMLDivElement>(null);
  useClickOutside({
    callback: () => {
      setOpen(false);
    },
    refs: [ARef, BRef],
  });

  if (props.navigate) {
    const options = useSelector((state: AMState) => state.AMPropsReducer.options);
    const location = props.navigate.useLocation();

    const SetSelected = (opt: any, id: string, type: OptSTypes) => {
      setInit(true);
      dispatch(selectData(opt));
      switch (type) {
        case "opt":
          dispatch(selectOption(id));
          break;
        case "subopt":
          dispatch(selectSubOption(id));
          break;
        case "subsubopt":
          dispatch(selectSubSubOption(id));
          break;
      }
    };

    useEffect(() => {
      if (!options.length || init) return;
      const path = location.pathname;
      let stop = false;
      options.forEach((opt, index) => {
        if (opt.path === path && !stop) {
          //stop here
          SetSelected(opt, index.toString(), "opt");
          stop = true;
          return;
        }
      });
      if (stop) return;

      options.forEach((opt, index) => {
        if (!opt.subOpts || stop) return;
        return opt.subOpts.forEach((subopt, subindex) => {
          if (subopt.path === path && !stop) {
            SetSelected(opt, index.toString(), "opt");
            SetSelected(subopt, `${index}-${subindex}`, "subopt");
            stop = true;
            return;
          }
        });
      });

      if (stop) return;

      options.forEach((opt, index) => {
        if (!opt.subOpts || stop) return;
        opt.subOpts.forEach((subopt, subindex) => {
          if (!subopt.subSubOpts || stop) return;
          subopt.subSubOpts.forEach((subsubopt, subsubindex) => {
            if (subsubopt.path === path && !stop) {
              SetSelected(opt, index.toString(), "opt");
              SetSelected(subopt, `${index}-${subindex}`, "subopt");
              SetSelected(subsubopt, `${index}-${subindex}-${subsubindex}`, "subsubopt");
              stop = true;
              return;
            }
          });
        });
      });
    }, [location, options]);
  }

  return (
    <div className="flex flex-col gap-2 select-none leading-tight ">
      <div className="relative">
        <Selected aRef={ARef} click={() => setOpen(!open)} />
        <HeightAnimDiv Bref={BRef} className="w-full absolute mt-2 z-[999]" show={open}>
          <Menu />
        </HeightAnimDiv>
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
