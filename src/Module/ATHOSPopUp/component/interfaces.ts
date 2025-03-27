import { PopUpPosition } from "../../hooks/private/usePopUp";

export interface ATHOSPopUpProps {
  children: React.ReactNode;

  onToggle?: (isOpen: boolean) => void;
  position?: PopUpPosition;
  style?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  contentClassName?: string;
  className?: string;
  content: React.ReactNode;
  spacing?: number;
  matchChildrenWidth?: boolean;
}

export type APUContainerProps = {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  width?: number | string;
  height?: number | string;
  opacity?: number;
  transform?: string;
};
