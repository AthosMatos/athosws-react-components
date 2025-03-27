import { ReactNode } from "react";
import { CSSProperties } from "styled-components";
import { PopUpPosition } from "../../hooks/private/usePopUp";

export interface LabelI {
  label: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export interface ATHOSDropDownProps {
  children: React.ReactNode;
  position?: PopUpPosition;
  labels?: LabelI[];
  style?: React.CSSProperties;
  className?: string;
  labelClassName?: string;
  labelsStyle?: React.CSSProperties;
  spacing?: number;
  matchChildrenWidth?: boolean;
  onToggle?: (isOpen: boolean) => void;
}
