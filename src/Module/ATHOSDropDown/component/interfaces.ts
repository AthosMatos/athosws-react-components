import { ReactNode } from "react";
import { CSSProperties } from "styled-components";

export type LabelWithIconType = {
  icon: ReactNode;
  text: string;
};

export interface LabelI {
  label: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}
export interface HoverColorsI {
  backColor?: string;
  textColor?: string;
}

export interface ATHOSDropDownProps {
  children: React.ReactNode;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "left" | "right" | "top" | "bottom";
  labels: LabelI[];
  style?: React.CSSProperties;
  className?: string;
  labelsClassName?: string;
  labelsStyle?: React.CSSProperties;
  spacing?: number;
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
