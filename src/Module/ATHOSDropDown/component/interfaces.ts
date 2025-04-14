import { ReactNode } from "react";
import { CSSProperties } from "styled-components";
import { PopUpPosition } from "../../hooks/private/usePopUp";

interface ATHOSDDDPPBaseProps {
  position?: PopUpPosition;
  style?: React.CSSProperties;
  className?: string;
  labelClassName?: string;
  labelsStyle?: React.CSSProperties;
  spacing?: number;
  matchChildrenWidth?: boolean;
  onToggle?: (isOpen: boolean) => void;
  buttonClassName?: string;
  buttonStyle?: CSSProperties;
}

export interface LabelI {
  label: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}
interface ATHOSDropDownBaseProps extends ATHOSDDDPPBaseProps {
  children: React.ReactNode;
}
export interface ATHOSDropDownPropsList extends ATHOSDropDownBaseProps {
  labels: LabelI[];
}

export interface ATHOSDropDownPropsCols extends ATHOSDropDownBaseProps {
  cols: LabelI[][];
  colClassName?: string;
  colStyle?: CSSProperties;
}
export type ATHOSDropDownProps = ATHOSDropDownPropsList | ATHOSDropDownPropsCols;
