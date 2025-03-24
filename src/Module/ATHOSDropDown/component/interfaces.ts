import { ReactNode } from "react";
import { CSSProperties } from "styled-components";

export interface LabelI {
  label: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
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
  matchChildrenWidth?: boolean;
  onOpen?: (isOpen: boolean) => void;
}
