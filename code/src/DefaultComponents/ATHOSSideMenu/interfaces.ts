import { IconType } from "react-icons";

export interface SubOptionI {
  label: string;
  onClick?: () => void;
}
export interface ASBColorsProps {
  accentColor: string;
  activeColor: string;
}

export interface ASBOptionWrapperProps extends ASBColorsProps {
  clicked?: boolean;
  hasChildren?: boolean;
  hasSelectedChildren?: boolean;
}
export interface ASBSubOptionProps {
  label: string;
  index: number;
  parentIndex: number;
}

export interface ASBOptionProps {
  Icon: IconType;
  iconSize?: string | number;
  label: string;
  children?: React.ReactNode;
  index: number;
}

export interface ASBSubOptionsWrapperProps {
  isOpen: boolean;
  ChildrenHeight: string;
}
export interface ATHOSSideMenuDataI {
  label: string;
  Icon: any;
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
