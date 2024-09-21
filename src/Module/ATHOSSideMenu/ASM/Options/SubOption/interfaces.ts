import { ASMSubOptionColorConfig, ASMSubOptionI } from "../../../interfaces";

export interface SelectedDataTrackSubOptI extends ASMSubOptionI {
  id: string;
  selected: boolean;
}

export interface ASMSubOptionProps {
  subopt: SelectedDataTrackSubOptI;
  parentId: string;
}

export interface ASMSOWProps {
  editing: boolean;
  background: string;
  textColor: string;
  width?: string;
  scale?: number;
}
export interface ASMSubOptionWrapperProps {
  label: string;
  clicked: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  colorConfig?: ASMSubOptionColorConfig;
}

export interface ASMSubOptionsWrapperProps {
  isOpen: boolean;
  ChildrenHeight: string;
}
