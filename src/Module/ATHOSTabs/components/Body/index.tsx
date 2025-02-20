import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { transition } from "../../consts";
import { ATState } from "../../redux/store";

interface ATBodyProps {
  activeTab: number;
  gap?: number;
}

const ATBody = (props: ATBodyProps) => {
  const { activeTab, gap } = props;
  const body = useSelector((state: ATState) => state.ATHOSTabsPropsReducer.tabs[activeTab]?.content);
  const globalBodyClassName = useSelector((state: ATState) => state.ATHOSTabsPropsReducer.className?.body);
  const globalBodyStyle = useSelector((state: ATState) => state.ATHOSTabsPropsReducer.colors?.body);
  const className = body?.className || globalBodyClassName;
  const style = body?.style || globalBodyStyle;
  // const swipeDir = useSelector((state: ATState) => state.BodyDirReducer.direction);
  const scale = false;
  const fade = true;
  const slide = false;
  const Anim = {
    initial: Object.assign([
      scale && {
        scale: 0,
      },
      fade && {
        opacity: 0,
      },
      slide && {
        translateX: "100%",
      },
    ]),
    animate: Object.assign([
      scale && {
        scale: 1,
      },
      fade && {
        opacity: 1,
      },
      slide && {
        translateX: "0%",
      },
    ]),

    exit: Object.assign([
      scale && {
        scale: 0,
      },
      fade && {
        opacity: 0,
      },
      slide && {
        translateX: "100%",
      },
    ]),
  };

  return (
    <motion.div
      transition={transition}
      animate={Object.assign([
        activeTab == 0 &&
          !gap && {
            borderTopLeftRadius: 0,
          },
      ])}
      style={style}
      className={`${className} shadow-sm w-full bg-black rounded-xl p-6 overflow-x-hidden `}
    >
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} {...Anim} transition={transition}>
          {body?.value}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default ATBody;
