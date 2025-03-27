import { configureStore } from "@reduxjs/toolkit";
import { animate } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ATHOSSwitcherProps } from "./interfaces";
import ATHOSSwitcherPropsReducer, { setATHOSSwitcherProps } from "./redux/Props";
import ASSelectedPropsReducer, { select } from "./redux/Selected";
import { ASState } from "./redux/store";
import { Floating, Switch } from "./Switch";

const AS: React.FC<ATHOSSwitcherProps> = (props: ATHOSSwitcherProps) => {
  const { switchs, style, className } = props;
  const dispatch = useDispatch();

  const selectedi = useSelector((state: ASState) => state.ASSelectedPropsReducer.selected);

  const switchDims = useRef<{ width: number; height: number }[]>([]);
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(setATHOSSwitcherProps(props));

    if (props.selectedId) {
      const selSwitch = switchs.findIndex((sw) => sw.id === props.selectedId);
      if (selSwitch !== -1) dispatch(select(selSwitch));
      else console.error("SelectedId not found in switchs");
    }
  }, [props]);

  const onResize = useCallback(() => {
    const floating = floatingRef.current;
    let currSwitch: any;
    switchs.forEach((selSwitch, i) => {
      const selected = document.getElementById(`${selSwitch?.id}-${i}`);
      if (i === selectedi) currSwitch = selected;
      if (!selected) return;
      const dims = selected.getBoundingClientRect();

      if (dims) {
        const { width, height } = dims;
        switchDims.current[i] = { width, height };
      }
    });
    if (!currSwitch) return;
    const dims = currSwitch.getBoundingClientRect();
    if (dims) {
      const { width, height } = dims;
      const padding = "0.2rem";
      const gap = `(0.5rem * ${selectedi})`;
      const allswiWidhs = switchs.reduce((acc, _, i) => {
        const swi = switchDims.current[i];
        if (swi && i < selectedi) {
          acc += swi.width;
        }
        return acc;
      }, 0);
      floating?.style.setProperty("width", `${width}px`);
      floating?.style.setProperty("height", `${height}px`);
      floating?.style.setProperty("left", `calc(${padding} + ${gap} + ${allswiWidhs}px)`);
    }
  }, [selectedi, floatingRef.current]);

  useEffect(() => {
    const selSwitch = switchs.find((_, i) => i === selectedi);
    const selected = document.getElementById(`${selSwitch?.id}-${selectedi}`);
    const floating = floatingRef.current;
    if (selected && floating) {
      const dims = selected.getBoundingClientRect();
      if (dims) {
        const { width, height } = dims;
        const padding = "0.2rem";
        const gap = `(0.5rem * ${selectedi})`;
        const allswiWidhs = switchs.reduce((acc, _, i) => {
          const swi = switchDims.current[i];
          if (swi && i < selectedi) {
            acc += swi.width;
          }
          return acc;
        }, 0);

        animate(floating, {
          width,
          height,
          left: `calc(${padding} + ${gap} + ${allswiWidhs}px)`,
        });
      }
    }

    onResize();
    window.addEventListener("resize", onResize);
    window.addEventListener("focus", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("focus", onResize);
    };
  }, [selectedi, floatingRef.current]);

  return (
    <div style={style?.container} className={`${className?.container} relative flex gap-2 bg-zinc-200 p-[0.2rem] rounded-xl`}>
      <Floating aRef={floatingRef} dftClassName={className?.switches} dftStyle={style?.switches} />
      {switchs.map((sw, i) => (
        <Switch index={i} dftClassName={className?.switches} dftStyle={style?.switches} key={i} {...sw} />
      ))}
    </div>
  );
};

const ATHOSSwitcher = (props: ATHOSSwitcherProps) => {
  const store = useMemo(
    () =>
      configureStore({
        reducer: {
          ATHOSSwitcherPropsReducer,
          ASSelectedPropsReducer,
        },
      }),
    []
  );
  return (
    <Provider store={store}>
      <AS {...props} />
    </Provider>
  );
};

export { ATHOSSwitcher };
