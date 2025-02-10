import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import ATBody from "./components/Body";
import { ATTab, ATTabOverlay } from "./components/Tab";
import { transition } from "./consts";
import { ATHOSTabsProps } from "./interfaces";
import { setProps } from "./redux/Props";
import { ATStore } from "./redux/store";

const AT = (props: ATHOSTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProps(props));
  }, [props]);
  return (
    <motion.div
      className="flex flex-col"
      transition={transition}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      style={{
        gap: props.gap,
      }}
    >
      <div className="flex">
        {props.tabs.map((tab, index) => (
          <ATTab
            key={index}
            label={tab.title.value}
            active={() => setActiveTab(index)}
            isActive={activeTab === index}
            className={tab.title.className}
          />
        ))}
        <ATTabOverlay />
      </div>
      <ATBody gap={props.gap} activeTab={activeTab} />
    </motion.div>
  );
};

export const ATHOSTabs = (props: ATHOSTabsProps) => {
  return (
    <Provider store={ATStore}>
      <AT {...props} />
    </Provider>
  );
};
