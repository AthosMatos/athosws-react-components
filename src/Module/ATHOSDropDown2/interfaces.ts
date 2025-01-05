import { ReactNode } from "react";

export type LabelWithIconType = {
  icon: ReactNode;
  text: string;
};
export const isLabelWithIconType = (label: LabelType): label is LabelWithIconType => {
  return (label as LabelWithIconType).icon !== undefined;
};
type LabelType = ((open: boolean) => ReactNode) | ReactNode | string | LabelWithIconType;
export interface LabelI {
  label: LabelType;
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
