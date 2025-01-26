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

  /*   useEffect(() => {
    if (!open) {
      setInit(false);
    }
  }, [open]); */

  if (props.navigate) {
    const options = useSelector((state: AMState) => state.AMPropsReducer.options);
    const location = props.navigate.useLocation();

    const SetSelected = (opt: any, id: string, type: OptSTypes) => {
      setInit(true);
      dispatch(
        selectData({
          label: opt.label,
          icon: opt.icon,
        })
      );
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
      let optindex = -1;
      let subindex = -1;
      let subsubindex = -1;
      let option;
      let subOption;
      let subSubOption;
      option = options.find((opt, index) => {
        if (opt.path === path) {
          optindex = index;
          return true;
        }
        return false;
      });
      for (let i = 0; i < options.length; i++) {
        const opt = options[i];
        subOption = opt.subOpts?.find((subopt, index) => {
          if (opt.path === path) {
            option = opt;
            subOption = subopt;
            subindex = index;
            optindex = i;
            return true;
          }
          return false;
        });
        if (subOption) break;
      }

      for (let i = 0; i < options.length; i++) {
        const opt = options[i];
        if (!opt.subOpts) continue;
        for (let j = 0; j < opt.subOpts.length; j++) {
          const subOpt = opt.subOpts[j];
          subSubOption = subOpt.subSubOpts?.find((subsubopt, index) => {
            if (subsubopt.path === path) {
              option = opt;
              subOption = subOpt;
              subSubOption = subsubopt;

              subindex = j;
              subsubindex = index;
              optindex = i;
              return true;
            }
            return false;
          });
          if (subSubOption) break;
        }
        if (subSubOption) break;
      }
      if (option) {
        SetSelected(option, optindex.toString(), "opt");
      }
      if (subOption) {
        SetSelected(subOption, `${optindex}-${subindex}`, "subopt");
      }
      if (subSubOption) {
        SetSelected(subSubOption, `${optindex}-${subindex}-${subsubindex}`, "subsubopt");
      }
    }, [location, options, open]);
  }

  return (
    <div className="flex flex-col gap-2 select-none leading-tight z-[999]">
      <div className="relative">
        <Selected aRef={ARef} click={() => setOpen(!open)} />
        <HeightAnimDiv Bref={BRef} className="w-full absolute mt-2" show={open}>
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
