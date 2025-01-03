import { motion, Variants } from "framer-motion";
import { memo } from "react";
export const defaultDuration = 0.34;
export const slideDuration = 0.15;
const exittDelay = defaultDuration + 0.45;
const initialDelay = exittDelay * 2;

interface CellExitWrapperProps {
  children: any;
}
const slideTransition = {
  duration: slideDuration,
};
export const DefaultVariants: Variants = {
  slideIn: {
    translateX: 0,
    transition: slideTransition,
    //opacity: 1,
  },
  slideOutLeft: {
    translateX: "-100%",
    transition: slideTransition,
    // opacity: 0,
  },
  slideOutRight: {
    translateX: "100%",
    transition: slideTransition,
    //opacity: 0,
  },
  fadeIn: {
    opacity: 1,
  },
  fadeOut: {
    opacity: 0,
  },
  collapse: (custom) => ({
    height: 0,
    /* transition: {
      delay: custom ? exittDelay : 0,
    }, */
  }),
  show: (custom) => ({
    height: "auto",
    /* transition: {
      delay: custom ? initialDelay : 0,
    }, */
  }),
  unPad: {
    paddingTop: 0,
    paddingBottom: 0,
    /* transition: {
      delay: exittDelay,
    }, */
  },
  blinkInit: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  blinkOut: {
    backgroundColor: "rgba(255, 0, 0, 0.5)",
    transition: {
      duration: 0.35,
      repeat: 3,
      repeatType: "reverse",
    },
  },
  blinkIn: {
    backgroundColor: "rgba(9, 255, 0, 0.5)",
    transition: {
      //delay: initialDelay,
      duration: 0.35,
      repeat: 3,
      repeatType: "reverse",
    },
  },
};

const CellExitWrapper = ({ children }: CellExitWrapperProps) => {
  /* const movingPage = useSelector((state: ADTState) => state.ADTPagingReducer.movingPage);
  const searchFilter = useSelector((state: ADTState) => state.ADTPagingReducer.searchFilter);
  const fistOpen = useSelector((state: ADTState) => state.ADTPagingReducer.firstOpen);

  const hasSearchFilter = searchFilter !== "";
  const initial = movingPage ? undefined : "collapse";
  const animate = movingPage ? undefined : "show";
  const exit = movingPage ? undefined : "collapse"; */

  /*  const props = !fistOpen
    ? {
         initial,
        animate,
        exit,
        variants: DefaultVariants,
      }
    : undefined; */

  return (
    <motion.div /* custom={!hasSearchFilter && !movingPage}  */ /* className="overflow-hidden" */ /* {...props} */>{children}</motion.div>
  );
};

export default memo(CellExitWrapper);
