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

export interface DefaultOptProps {
  label: string;
  icon?: string;
}

export interface SubSubOptionProps extends DefaultOptProps {}

export interface SubOptionProps extends DefaultOptProps {
  subSubOpt?: SubSubOptionProps[];
}

export interface OptionProps extends DefaultOptProps {
  subOpt?: SubOptionProps[];
}

export interface ATHOSMenuProps {
  colors?: AMColorsProps;
  options: OptionProps[];
}
