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
};
export type ColorOptType = {
  hover?: AMOptColorsProps;
  clicked?: AMOptColorsProps;
  normal?: AMOptColorsProps;
};
interface AMMenuColorsProps extends AMOptColorsProps {
  option: ColorOptType;
  subOption?: ColorOptType;
  subSubOption?: ColorOptType;
}

interface AMColorsProps {
  selected?: AMOptColorsProps;
  menu?: AMMenuColorsProps;
  arrows?: string;
}

///COLOR////

///OPTIONS///

export interface DefaultOptProps {
  label: string;
  icon?: ReactNode;
  path?: string;
}

export interface SubSubOptionProps extends DefaultOptProps {}

export interface SubOptionProps extends DefaultOptProps {
  subSubOpts?: SubSubOptionProps[];
}

export interface OptionProps extends DefaultOptProps {
  subOpts?: SubOptionProps[];
}

///OPTIONS///

export interface ATHOSMenuProps {
  colors?: AMColorsProps;
  options: OptionProps[];
  navigate?: {
    useNavigate: any;
    useLocation: any;
  };
}
