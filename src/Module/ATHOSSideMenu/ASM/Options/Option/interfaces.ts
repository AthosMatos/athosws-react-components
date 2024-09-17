import { ASMColorsProps } from "../../../interfaces";
import { SelectedDataTrackSubOptI } from "../SubOption/interfaces";
export interface SelectedDataTrackOptI {
  id: string;
  label: string;
  Icon?: any;
  iconSize?: string | number;
  subOptions?: SelectedDataTrackSubOptI[];
  show: boolean;
  onClick?: () => void;
}
export interface ASMOWProps {
  hoverback?: string;
  hovercolor?: string;
  activeback?: string;
  activecolor?: string;
  dftback?: string;
  dftcolor?: string;
  scale?: number;
  width?: string;
  editing?: boolean;
}

export interface ASMOptionWrapperProps extends ASMColorsProps {
  clicked?: boolean;
  hasChildren?: boolean;
  hasSelectedChildren?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  editing?: boolean;
  width?: string;
}
export interface ASMOptionProps {
  option: SelectedDataTrackOptI;
  children?: React.ReactNode;
  index: number;
}
