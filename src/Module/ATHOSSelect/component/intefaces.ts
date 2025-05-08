import { ReactNode } from "react";
import { CSSProperties } from "styled-components";
import { PopUpPosition } from "../../hooks/private/usePopUp";

export interface SelectedItemI {
  label: ReactNode;
  value: string | number;
  className?: string;
  style?: CSSProperties;
}

interface ATHOSSelectBaseProps {
  selected: (string | number)[] | string | number;
  position?: PopUpPosition;
  style?: React.CSSProperties;
  className?: string;
  labelClassName?: string;
  selectedLabelClassName?: string;
  selectedLabelStyle?: CSSProperties;
  labelsStyle?: React.CSSProperties;
  spacing?: number;
  matchLabelWidth?: boolean;
  onToggleOpen?: (isOpen: boolean) => void;
  inline?: boolean;
  listContainerClassName?: string;
  listContainerStyle?: CSSProperties;
  multiSelect?: boolean;
  onChange?: ((selected: (string | number)[]) => Promise<any>) | ((selected: (string | number)[]) => void);
}
export interface ATHOSSelectPropsList extends ATHOSSelectBaseProps {
  labels: SelectedItemI[];
}

export interface ATHOSSelectPropsCols extends ATHOSSelectBaseProps {
  cols: SelectedItemI[][];
  colClassName?: string;
  colStyle?: CSSProperties;
}
export type ATHOSSelectedProps = ATHOSSelectPropsList | ATHOSSelectPropsCols;
