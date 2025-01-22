import { ASMOptionColorConfig, ASMOptionI } from "../../../interfaces";
import { SelectedDataTrackSubOptI } from "../SubOption/interfaces";
export interface SelectedDataTrackOptI extends ASMOptionI {
  id: string;
  selected: boolean;
  subOptions?: SelectedDataTrackSubOptI[];
}
export interface ASMOWProps {
  editing?: boolean;
  hideMenu?: boolean;
}

export interface ASMOptionWrapperProps {
  clicked?: boolean;
  hasChildren?: boolean;
  hasSelectedChildren?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  label: string;
  colorConfig?: ASMOptionColorConfig;
}
export interface ASMOptionProps {
  option: SelectedDataTrackOptI;
  children?: React.ReactNode;
  index: number;
}
