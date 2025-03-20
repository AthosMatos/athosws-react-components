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
  hoverColors?: {
    backColor?: string;
    textColor?: string;
  };
}
export interface HoverColorsI {
  backColor?: string;
  textColor?: string;
}

export interface ATHOSDropDownProps {
  children: React.ReactNode;
  forceOpen?: boolean;
  onClose?: () => void;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "left" | "right";
  id?: string;
  labels: LabelI[];

  style?: React.CSSProperties;
  className?: string;
  hoverColors?: HoverColorsI;
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
