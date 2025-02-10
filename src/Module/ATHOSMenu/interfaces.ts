///COLOR////

import { ReactNode } from "react";

export type AMOptColorsProps = {
  background?: string;
  border?:
    | {
        color?: string;
        width?: string;
      }
    | "none";
  text?: string;
  icon?: string;
  className?: string;
};
export interface ColorOptType {
  hover?: AMOptColorsProps;
  clicked?: AMOptColorsProps;
  normal?: AMOptColorsProps;
  defaults?: AMOptColorsProps;
}
interface AMMenuColorsProps extends AMOptColorsProps {
  option: ColorOptType;
  subOption?: ColorOptType;
  subSubOption?: ColorOptType;
}

interface AMColorsProps {
  selected?: AMOptColorsProps;
  menu?: AMMenuColorsProps;
}

///COLOR////

///OPTIONS///

export interface DefaultOptProps {
  label: string;
  icon?: ReactNode;
  path?: string;
  onClick?: () => void;
  specificColors?: ColorOptType;
}

export interface SubSubOptionProps extends DefaultOptProps {}

export interface SubOptionProps extends DefaultOptProps {
  subSubOpts?: SubSubOptionProps[];
}

export interface OptionProps extends DefaultOptProps {
  subOpts?: SubOptionProps[];
}

export interface ATHOSMenuProps {
  generalColors?: AMColorsProps;
  options: OptionProps[];

  navigate?: {
    useNavigate: any;
    useLocation: any;
  };
  maxMenuHeight?: number;
  blur?: {
    menu?: boolean;
    selected?: boolean;
  };
}
