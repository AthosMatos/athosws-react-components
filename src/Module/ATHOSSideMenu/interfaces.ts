import { IconType } from "react-icons";
import { SubOptionI } from "./ASM/Options/SubOption/interfaces";

export interface ASMColorsProps {
  accentColor: string;
  activeColor: string;
}

export interface ATHOSSideMenuDataI {
  label: string;
  Icon?: any;
  iconSize?: string | number;
  subOptions?: SubOptionI[];
  onClick?: () => void;
}

export interface ATHOSSideMenuBaseProps {
  onExit?: {
    onClick: () => void;
    Icon?: IconType;
    label: string;
  };
  editable?: {
    Icon?: IconType;
    label?: string;
  };
  collapsable?: {
    Icon?: IconType;
    label?: string;
  };
  goToFirstSubOnOpen?: boolean;
  options: ATHOSSideMenuDataI[];
  colors: {
    accent: string;
    active: string;
    background?: string;
  };
  onReorder?: (result: ATHOSSideMenuDataI[]) => void;
  asOverlay?: false | undefined;
}

export interface ATHOSSideMenuOverlayProps {
  onExit?: {
    onClick: () => void;
    Icon?: IconType;
    label: string;
  };
  editable?: {
    Icon?: IconType;
    label?: string;
  };
  collapsable?: {
    Icon?: IconType;
    label?: string;
  };
  goToFirstSubOnOpen?: boolean;
  options: ATHOSSideMenuDataI[];
  colors: {
    accent: string;
    active: string;
    background?: string;
  };
  onReorder?: (result: ATHOSSideMenuDataI[]) => void;

  asOverlay: true;
  children: React.ReactNode;
}

export type ATHOSSideMenuProps =
  | ATHOSSideMenuBaseProps
  | ATHOSSideMenuOverlayProps;
