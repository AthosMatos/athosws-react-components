import { motion } from "framer-motion";
import styled from "styled-components";
import { ADDContainerProps } from "./interfaces";

export const ADDContainer = styled(motion.div)<ADDContainerProps>`
  position: fixed;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  opacity: ${({ opacity }) => opacity};
  transform: ${({ transform }) => transform};
  will-change: transform;
  background-color: #f3f3f3;
  border-radius: 5px;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.4);

  z-index: 9999;
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
export const ADDChildWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //gap: 10px;
  padding: 4px;
  width: max-content;
`;
