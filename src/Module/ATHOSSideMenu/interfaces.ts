import { IconType } from "react-icons";

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
export interface ASMSubOptionColorConfig {
  backColor?: string;
  textColor?: string;
  hover?: {
    backColor?: string;
    textColor?: string;
    clicked?: {
      backColor?: string;
      textColor?: string;
    };
  };
  clicked?: {
    backColor?: string;
    textColor?: string;
  };
}
export interface ASMOptionI {
  label: string;
  Icon?: IconType | React.ReactNode;
  iconSize?: string | number;
  subOptions?: ASMSubOptionI[];
  colorConfig?: ASMOptionColorConfig;
  onClick?: () => void;
}
export interface ASMSubOptionI {
  label: string;
  onClick?: () => void;
  colorConfig?: ASMSubOptionColorConfig;
}

export interface ASMColorsProps {
  background?: string;
  sideBorder?: string;
  primary?: string;
  accent?: string;
}

/*
  const colors = {
      backColor: "transparent",
      textColor: "white",
      hover: {
        backColor: "#5c5c5c",
        textColor: "white",
        clicked: {
          backColor: "#2c7919",
          textColor: "white",
        },
      },
      clicked: {
        backColor: "#38a01e",
        textColor: "white",
      },
  }; 
*/

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
