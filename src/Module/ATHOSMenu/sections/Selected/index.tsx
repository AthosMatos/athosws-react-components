import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import ColoredDiv from "../../components/ColoredDiv";
import { AMState } from "../../redux/store";
interface SelectedProps {
  click: () => void;
  aRef: any;
}

const Selected = ({ click, aRef }: SelectedProps) => {
  const selected = useSelector((state: AMState) => state.AMSelectedReducer.selectedData);
  const colors = useSelector((state: AMState) => state.AMPropsReducer.generalColors?.selected);
  const blur = !!useSelector((state: AMState) => state.AMPropsReducer.blur?.selected);

  return (
    <ColoredDiv
      aRef={aRef}
      onClick={click}
      specificColors={colors}
      className={`w-full px-5 py-2 rounded-full cursor-pointer ${blur ? "backdrop-blur-[2px]" : ""} ${colors?.className}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={selected?.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center gap-2"
        >
          {selected?.icon}
          <p>{selected?.label ?? "Select an option"}</p>
        </motion.div>
      </AnimatePresence>
    </ColoredDiv>
  );
};

export default Selected;
