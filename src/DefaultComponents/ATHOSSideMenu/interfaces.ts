import { IconType } from "react-icons";

export interface SubOptionI {
  label: string;
  onClick?: () => void;
}
export interface ASMColorsProps {
  accentColor: string;
  activeColor: string;
}

export interface ASMOptionWrapperProps extends ASMColorsProps {
  clicked?: boolean;
  hasChildren?: boolean;
  hasSelectedChildren?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}
export interface ASMSubOptionProps {
  label: string;
  index: number;
  parentIndex: number;
}
export interface ASMOWProps {
  hoverColor: string;
  activeColor: string;
  clickedColor?: string;
}
export interface ASMOptionProps {
  Icon?: IconType;
  iconSize?: string | number;
  label: string;
  children?: React.ReactNode;
  index: number;
}

export interface ASMSubOptionsWrapperProps {
  isOpen: boolean;
  ChildrenHeight: string;
}
export interface ATHOSSideMenuDataI {
  label: string;
  Icon?: any;
  iconSize?: string | number;
  subOptions?: SubOptionI[];
  onClick?: () => void;
}

export interface SelecetDataTrackSubOptI {
  label: string;
  onClick?: () => void;
  show: boolean;
}

export interface SelecetDataTrackI {
  label: string;
  onClick?: () => void;
  show: boolean;
  subOptions?: SelecetDataTrackSubOptI[];
}

export interface ATHOSSideMenuContextProps {
  selectOption: (index: number) => void;
  selectedDataTrack: SelecetDataTrackI[];
  selectSubOption: (parentIndex: number, index: number) => void;
  props: ATHOSSideMenuProps;
  hideMenu: boolean;
  setHideMenu: (hide: boolean) => void;
}

export interface ATHOSSideMenuProps {
  onExit?: () => void;
  goToFirstSubOnOpen?: boolean;
  options: ATHOSSideMenuDataI[];
  colors: {
    accent: string;
    active: string;
    background?: string;
  };
}
