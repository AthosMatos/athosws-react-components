import { motion } from "framer-motion";
import styled from "styled-components";

export const ATTooltipWrapper = styled(motion.div)`
  position: fixed;
  pointer-events: none;
  user-select: none;

  color: white;
  background-color: black;
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 0.3rem;
  z-index: 9999;
`;
