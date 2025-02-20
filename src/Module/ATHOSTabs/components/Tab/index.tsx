import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { duration, transition } from "../../consts";
import { TabColorsProps } from "../../interfaces";
import { swipeLeft, swipeRight } from "../../redux/BodyDir";
import { ATState } from "../../redux/store";
import { setActiveTabDim, setInit } from "../../redux/TabDim";
interface TabProps {
  label: ReactNode;
  active: () => void;
  isActive: boolean;
  className?: {
    active?: string;
    default?: string;
  };
  style?: TabColorsProps;
}

export const ATTab = (props: TabProps) => {
  const { label, active, isActive, className: clsnm, style: styl } = props;
  const tabRef = useRef<HTMLDivElement>(null);
  const gap = useSelector((state: ATState) => state.ATHOSTabsPropsReducer.gap);
  const activeTabDimLeft = useSelector((state: ATState) => state.ActiveTabDimReducer.left);
  const globalClassName = useSelector((state: ATState) => state.ATHOSTabsPropsReducer.className?.tab);
  const globalTabStyle = useSelector((state: ATState) => state.ATHOSTabsPropsReducer.colors?.tab);
  const style = styl || globalTabStyle;
  const className = clsnm || globalClassName;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isActive && tabRef.current) {
      const left = tabRef.current.getBoundingClientRect().left;
      const width = tabRef.current.getBoundingClientRect().width;
      const height = tabRef.current.getBoundingClientRect().height;
      dispatch(setActiveTabDim({ left, width, height }));
      if (activeTabDimLeft && activeTabDimLeft > left) {
        dispatch(swipeLeft());
      } else if (activeTabDimLeft && activeTabDimLeft < left) {
        dispatch(swipeRight());
      }
    }
  }, [isActive, tabRef.current]);

  return (
    <div
      style={isActive ? style?.active : style?.default}
      ref={tabRef}
      onClick={active}
      className={` ${isActive ? `${className?.active}` : `${className?.default}`}
         !bg-transparent z-10 cursor-pointer transition-colors duration-500 select-none px-3 py-2 ${gap ? "" : "pb-2"}  `}
    >
      {label}
    </div>
  );
};

export const ATTabOverlay = () => {
  const activeTabDim = useSelector((state: ATState) => state.ActiveTabDimReducer);
  const isInited = useSelector((state: ATState) => state.ActiveTabDimReducer.init);
  const gap = useSelector((state: ATState) => state.ATHOSTabsPropsReducer.gap);
  const dispatch = useDispatch();
  const globalClassName = useSelector((state: ATState) => state.ATHOSTabsPropsReducer.className?.tab);
  const globalTabStyle = useSelector((state: ATState) => state.ATHOSTabsPropsReducer.colors?.tab);

  useEffect(() => {
    if (!isInited) {
      setTimeout(() => {
        dispatch(setInit());
      }, duration * 1000);
    }
  }, [isInited]);
  return (
    <motion.div
      style={globalTabStyle?.active}
      animate={{
        left: activeTabDim.left,
        width: activeTabDim.width,
        height: activeTabDim.height,
      }}
      transition={isInited ? transition : { duration: 0 }}
      className={`${globalClassName?.active} cursor-pointer select-none absolute ${!gap ? "rounded-b-none" : ""} z-0
    p-2 rounded-xl bg-black`}
    />
  );
};
