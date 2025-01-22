import { ASMOptionColorConfig, ASMSubOptionI } from "../../../interfaces";
import { SelectedDataTrackSubSubOptI } from "../SubSubOption/interfaces";

export interface SelectedDataTrackSubOptI extends ASMSubOptionI {
  id: string;
  selected: boolean;
  subSubOptions?: SelectedDataTrackSubSubOptI[];
}

export interface ASMSubOptionProps {
  subopt: SelectedDataTrackSubOptI;
  parentId: string;
  children?: React.ReactNode;
}

export interface ASMSOWProps {
  editing: boolean;
}
export interface ASMSubOptionWrapperProps {
  label: string;
  clicked: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  hasSelectedChildren?: boolean;
  colorConfig?: ASMOptionColorConfig;
  hasChildren?: boolean;
}
