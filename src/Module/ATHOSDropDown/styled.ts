import { motion } from "framer-motion";
import styled from "styled-components";
import { ADDContainerProps } from "./interfaces";

export const ADDWrapper = styled(motion.div).attrs({
  initial: { opacity: 0 },
  exit: { opacity: 0 },
  transition: { duration: 0.14 },
})`
  position: fixed;
  max-width: 200px;
  color: black;
  background-color: white;
  font-size: 0.9rem;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  //gap: 10px;
  padding: 4px;
  width: max-content;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const ADDLabel = styled(motion.div)<ADDContainerProps>`
  font-size: 1rem;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;

  transition: all 0.14s;

  user-select: none;

  &:hover {
    background-color: #e0e0e0;
  }

  &:active {
    transform: scale(0.92);
  }
`;
