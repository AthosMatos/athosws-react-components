import { IconType } from "react-icons";
import { Location, NavigateFunction } from "react-router";

export interface ASMOptionColorConfig {
  backColor?: string;
  textColor?: string;
  hover?: {
    backColor?: string;
    textColor?: string;
    clicked?: {
      backColor?: string;
      textColor?: string;
      hasChildren?: {
        backColor?: string;
        textColor?: string;
      };
      hasSelectedChildren?: {
        backColor?: string;
        textColor?: string;
      };
    };
  };
  clicked?: {
    backColor?: string;
    textColor?: string;
    hasChildren?: {
      backColor?: string;
      textColor?: string;
    };
    hasSelectedChildren?: {
      backColor?: string;
      textColor?: string;
    };
  };
}
export interface DefaultOptI {
  id?: string;
  label: string;
  path?: string;
  pageText?: {
    backColor?: string;
    title: {
      color?: string;
      value: string;
    };
    subTitle?: {
      color?: string;
      value: string;
    };
  };
}
export interface ASMOptionI extends DefaultOptI {
  Icon?: IconType | React.ReactNode;
  iconSize?: string | number;
  subOptions?: ASMSubOptionI[];
  colorConfig?: ASMOptionColorConfig;
  onClick?: () => void;
}
export interface ASMSubSubOptionI extends DefaultOptI {
  onClick?: () => void;
  colorConfig?: ASMOptionColorConfig;
}
export interface ASMSubOptionI extends DefaultOptI {
  Icon?: IconType | React.ReactNode;
  iconSize?: string | number;
  onClick?: () => void;
  colorConfig?: ASMOptionColorConfig;
  subsubOptions?: ASMSubSubOptionI[];
}

export interface ASMColorsProps {
  background?: string;
  sideBorder?: string;
  primary?: string;
  accent?: string;
}

export type ATHOSSideMenuBaseProps = {
  onExitIcon?: {
    onClick: () => void;
    Icon?: IconType;
    label: string;
  };
  editableIcon?: {
    Icon?: IconType;
    label?: string;
  };
  collapsableIcon?: {
    Icon?: IconType;
    label?: string;
  };
  goToFirstSubOnOpen?: boolean;
  options: ASMOptionI[];
  colors: ASMColorsProps;
  onReorder?: (result: ASMOptionI[]) => void;
  asOverlay?: boolean;
  overlayFitScreen?: boolean;
  usesRouter?: {
    navigate: NavigateFunction;
    location: Location<any>;
  };
  extraHeader?: React.ReactNode;
};

export interface ATHOSSideMenuNoOverlayProps extends ATHOSSideMenuBaseProps {
  asOverlay?: false | undefined;
}

export interface ATHOSSideMenuOverlayProps extends ATHOSSideMenuBaseProps {
  asOverlay: true;
  children: React.ReactNode;
  overlayStyle?: React.CSSProperties;
}

export type ATHOSSideMenuProps = ATHOSSideMenuNoOverlayProps | ATHOSSideMenuOverlayProps;
