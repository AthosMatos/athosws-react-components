import { ReactNode } from "react";

export interface LabelI {
  label: ((open: boolean) => ReactNode) | ReactNode;
  onClick?: () => void;
}

export interface ATHOSDropDownProps {
  children: React.ReactNode;
  forceOpen?: boolean;
  onClose?: () => void;
  position?: "top" | "bottom";
  id?: string;
  labels: LabelI[];
  style?: React.CSSProperties;
}

export type ADDContainerProps = {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  width?: number | string;
  height?: number | string;
  opacity?: number;
  transform?: string;
};
