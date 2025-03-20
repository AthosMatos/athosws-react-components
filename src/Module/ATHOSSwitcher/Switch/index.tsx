import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { select } from "../redux/Selected";
import { ASState } from "../redux/store";
import { StyleI, SwitchProps } from "./interfaces";
const duration = 0.24;
const transition = { duration: duration, ease: [0.43, 0.13, 0.23, 0.96] };

export const Switch = ({ icon, label, className, style, dftClassName, dftStyle, index, id, onSelected }: SwitchProps) => {
  const hasId = useSelector((state: ASState) => !!state.ATHOSSwitcherPropsReducer.selectedId);
  const onChange = useSelector((state: ASState) => state.ATHOSSwitcherPropsReducer.onChange);
  const selectedi = useSelector((state: ASState) => state.ASSelectedPropsReducer.selected);

  const selected = selectedi === index;

  const dftStl = selected ? style?.active : style?.default;
  const stl = { ...dftStyle, ...dftStl };
  const dftCls = selected ? dftClassName?.active : dftClassName?.default;
  const cls = `${className} ${dftCls}`;

  const dispatch = useDispatch();

  const onclick = () => {
    if (!selected) {
      onChange && id && onChange(id);
    }

    if (!hasId) dispatch(select(index));

    onSelected && onSelected();
  };

  return (
    <div
      id={`${id}-${index}`}
      style={stl}
      onClick={onclick}
      className={`${cls} !bg-transparent text-black ${selected ? "" : "opacity-30"} flex z-10
          transition-all duration-300 gap-2 select-none cursor-pointer 
          text-sm rounded-lg p-1 px-2 items-center font-semibold !bg-transparent !border-none`}
    >
      {icon}
      {label}
    </div>
  );
};

export const Floating = (props: StyleI & { aRef: any }) => {
  const { className, style, dftClassName, dftStyle } = props;

  const dftStl = style?.active;
  const stl = { ...dftStyle, ...dftStl };
  const dftCls = dftClassName?.active;
  const cls = `${className} ${dftCls}`;

  return <motion.div ref={props.aRef} initial={false} transition={transition} style={stl} className={`${cls} absolute select-none `} />;
};
