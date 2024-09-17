export interface SubOptionI {
  label: string;
  onClick?: () => void;
}
export interface SelectedDataTrackSubOptI extends SubOptionI {
  id: string;
  show: boolean;
}

export interface ASMSubOptionProps {
  subopt: SelectedDataTrackSubOptI;
  parentId: string;
}

export interface ASMSubOptionsWrapperProps {
  isOpen: boolean;
  ChildrenHeight: string;
}
