import { motion } from "framer-motion";
import styled from "styled-components";

export const ATTooltipWrapper = styled(motion.div).attrs({
  initial: { opacity: 0 },
  exit: { opacity: 0 },
  transition: { duration: 0.14 },
})<{ maxWidth?: string | number }>`
  position: fixed;
  pointer-events: none;
  user-select: none;
  max-width: ${(props) =>
    props.maxWidth
      ? typeof props.maxWidth === "number"
        ? `${props.maxWidth}px`
        : props.maxWidth
      : "300px"};
  color: white;
  background-color: black;
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 0.3rem;
`;
